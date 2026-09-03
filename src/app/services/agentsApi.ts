import { supabase } from '../lib/supabase';

const AGENTS_API_URL = import.meta.env.VITE_AGENTS_API_URL;

export class AgentsApiError extends Error {}

/**
 * Dispara a geracao do plano de negocios com IA no backend Python
 * (educaimpacto-agents). Chamada direta do frontend, autenticada com o
 * JWT da sessao Supabase atual; a API valida o token e confere que o
 * usuario e dono do projeto antes de gerar qualquer conteudo.
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

  const response = await fetch(`${AGENTS_API_URL}/api/v1/plan/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ business_plan_id: businessPlanId }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const detail = body?.detail ?? response.statusText;
    throw new AgentsApiError(`Falha ao iniciar geracao do plano: ${detail}`);
  }
}
