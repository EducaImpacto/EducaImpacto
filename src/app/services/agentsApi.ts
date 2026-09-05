import { supabase } from '../lib/supabase';

const AGENTS_API_URL = import.meta.env.VITE_AGENTS_API_URL;

export class AgentsApiError extends Error {}

const HEALTH_TIMEOUT_MS = 4000;
const WARM_UP_THROTTLE_MS = 60_000;
let lastWarmUpAt = 0;

/** Espera cancelavel (usada entre tentativas do retry). */
function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new DOMException('Aborted', 'AbortError'));
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    };
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

/**
 * "Acorda" o servico do agente no Render (free tier hiberna apos ~15 min
 * ociosa; cold start de 30-60s). Best-effort: qualquer erro/timeout e
 * engolido — nunca lanca, nunca bloqueia a UI. Chamadas em rajada sao
 * coalescidas por um throttle de 60s.
 */
export async function warmUpAgentsApi(): Promise<void> {
  if (!AGENTS_API_URL) return;
  if (Date.now() - lastWarmUpAt < WARM_UP_THROTTLE_MS) return;
  lastWarmUpAt = Date.now();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);
  try {
    await fetch(`${AGENTS_API_URL}/health`, { method: 'GET', signal: controller.signal });
  } catch {
    // ignora: so precisamos cutucar o servico, nao ler a resposta
  } finally {
    clearTimeout(timer);
  }
}

const ATTEMPT_TIMEOUT_MS = 15_000;
const MAX_ATTEMPTS = 6;
// Espera ANTES da tentativa i (0-based). Pior caso ~= 6x15s de request + 54s de
// espera ~= 145s; um cold start normal resolve na tentativa 3-4 (~40-70s).
const BACKOFF_MS = [0, 3_000, 6_000, 10_000, 15_000, 20_000];

const RETRIABLE_STATUS = new Set([502, 503, 504, 429]);
const HARD_FAIL_STATUS = new Set([400, 401, 403, 404, 422]);

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

/**
 * Dispara a geracao do plano de negocios com IA no backend Python
 * (educaimpacto-agents). Chamada direta do frontend, autenticada com o
 * JWT da sessao Supabase atual; a API valida o token e confere que o
 * usuario e dono do projeto antes de gerar qualquer conteudo.
 *
 * Tolera o cold start do Render free: cada tentativa tem timeout proprio
 * (15s) e falhas transitorias (rede, timeout, 502/503/504/429) sao
 * re-tentadas com backoff ate ~2,5 min no total. Um 409 significa que a
 * geracao ja foi disparada (linha nao esta mais em `draft`) e e tratado
 * como sucesso. 4xx deterministicos (401/403/404/422) falham na hora.
 *
 * Retorna assim que o backend confirma que a geracao comecou (202) — o
 * resultado deve ser observado via polling do status em `business_plans`
 * (ver useBusinessPlanPolling).
 */
export async function triggerBusinessPlanGeneration(businessPlanId: string): Promise<void> {
  if (!AGENTS_API_URL) {
    throw new AgentsApiError('VITE_AGENTS_API_URL nao configurada.');
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new AgentsApiError('Usuario precisa estar autenticado para gerar o plano com IA.');
  }

  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    if (BACKOFF_MS[attempt]) {
      await sleep(BACKOFF_MS[attempt]);
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ATTEMPT_TIMEOUT_MS);

    try {
      const response = await fetch(`${AGENTS_API_URL}/api/v1/plan/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ business_plan_id: businessPlanId }),
        signal: controller.signal,
      });

      if (response.ok) return;

      // 409: a linha ja saiu de `draft` — geracao ja disparada. Sucesso.
      if (response.status === 409) {
        console.info('Geracao do plano ja estava em andamento (409).');
        return;
      }

      if (HARD_FAIL_STATUS.has(response.status)) {
        const body = await response.json().catch(() => null);
        const detail = body?.detail ?? response.statusText;
        throw new AgentsApiError(`Falha ao iniciar geracao do plano: ${detail}`);
      }

      if (RETRIABLE_STATUS.has(response.status)) {
        lastError = new AgentsApiError(`Servico indisponivel (${response.status}).`);
        continue;
      }

      // Qualquer outro status inesperado: falha na hora (conservador).
      const body = await response.json().catch(() => null);
      const detail = body?.detail ?? response.statusText;
      throw new AgentsApiError(`Falha ao iniciar geracao do plano: ${detail}`);
    } catch (error) {
      if (error instanceof AgentsApiError) throw error;
      // AbortError do nosso timeout, ou erro de rede (TypeError): re-tenta.
      if (isAbortError(error) || error instanceof TypeError) {
        lastError = error;
        continue;
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  throw new AgentsApiError('A IA nao respondeu a tempo. Tente novamente em instantes.', {
    cause: lastError,
  });
}
