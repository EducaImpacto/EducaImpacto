# Pendências — geração de plano com IA

Contexto: correção do bug de ontem (02/09), em que a geração de plano registrava
traceback `business_plans_status_check (23514)` e registros ficavam presos em `draft`.
Diagnóstico e plano completos em `~/.claude/plans/ajusta-so-o-2-eager-toast.md`.

---

## Feito

- [x] **Migration `processing`** (`supabase/migrations/20260903224123_add_processing_business_plan_status.sql`)
      — rodada no SQL Editor do Supabase e validada (`update ... set status='processing'` passa).
- [x] **Tipos do front** (`src/app/lib/database.types.ts`) — `'processing'` nas 3 uniões de `status`.
- [x] **Doc do contrato** (`supabase/ai-business-plan-contract.md`) — ciclo de vida do `status` atualizado.
- [x] **Warm-up + retry no front** (código, não deployado):
  - `src/app/services/agentsApi.ts` — `warmUpAgentsApi()` (GET `/health`, timeout 4s, throttle 60s)
    e retry em `triggerBusinessPlanGeneration` (6 tentativas, 15s cada, backoff `[0,3,6,10,15,20]s`,
    re-tenta rede/timeout/502/503/504/429, 409 = sucesso, 401/403/404/422 falham na hora).
  - `src/app/App.tsx` — 3 `useEffect` de warm-up (load, entrada em dashboard/business-plan,
    keep-alive 10min enquanto aba visível) + ping no início de `handleGenerateBusinessPlan`.
  - `src/app/hooks/useBusinessPlanPolling.ts` — timeout 3min → 6min; relógio reinicia
    quando a linha entra em `processing`.
- [x] `npm run build` passa.

---

## Falta fazer

### 1. Redeploy da API no Render
Para `recover_stuck_generations()` voltar a rodar sem erro no startup (agora que
`processing` existe na constraint).
- Dashboard do Render → serviço `Agente-EducaImpacto` → **Manual Deploy** → *Deploy latest commit*
  (ou push no repo `github.com/MiguelCandido21/Agente-EducaImpacto`, autoDeploy está ligado).
- Depois, conferir nos logs que aparece o startup sem traceback (e, se houver linha presa
  em `processing` antiga, `Recuperando business_plan ...`).

### 2. Commit das mudanças de código
```bash
cd monolito
git add -A
git commit   # migration + agentsApi + App.tsx + useBusinessPlanPolling + database.types + docs
```
(A migration nova e este arquivo entram no mesmo commit.)

### 3. Build + deploy do front (Cloudflare Pages)
```bash
cd monolito
npm run build
npm run deploy        # npx wrangler pages deploy dist --project-name educaimpacto
```
- Requer `npx wrangler login` uma vez, conta com acesso ao projeto `educaimpacto`.
- **Conferir antes de buildar:** `monolito/.env` → `VITE_AGENTS_API_URL=https://agente-educaimpacto.onrender.com`
  **sem barra no final** (as env vars são "baked" no build, não vêm do Cloudflare).

### 4. (Não feito) Bug da barra dupla na URL — item 1 do diagnóstico
Ontem apareceu `POST //api/v1/plan/generate → 404`. Causa provável: `VITE_AGENTS_API_URL`
com `/` no final em algum ambiente de build, concatenado com `/api/v1/plan/generate`.
- Correção definitiva: normalizar em `agentsApi.ts` —
  `const BASE = AGENTS_API_URL?.replace(/\/+$/, '')` e usar `BASE` nas duas chamadas.
- Enquanto não for feito: garantir a env var sem barra final (ver item 3).

### 5. (Opcional) Limpar registros de teste presos em `draft`
`1e975cac-fd3d-4c34-89ae-579084a99a18` e `893b187e-cded-4161-b4ab-e7b575dbf8d4`
(project `b545b596...`) ficaram em `draft` de tentativas falhas de 02/09. Não são
recuperados automaticamente (a recuperação só olha `processing`). Podem ser deletados
ou marcados `failed` no SQL Editor se incomodarem.

### 6. (Follow-up, fora de escopo) Keep-alive externo
O keep-alive do front só roda com aba aberta. Se o produto crescer e quiser geração
sempre instantânea, criar um cron externo (GitHub Actions / cron-job.org) batendo em
`https://agente-educaimpacto.onrender.com/health` a cada ~12min em horário comercial
(~300h/mês, dentro das 750h do Render free).

---

## Verificação end-to-end (depois do deploy)

1. Deixar a API do Render hibernar >15min:
   `curl -w '%{time_total}\n' -o /dev/null -s https://agente-educaimpacto.onrender.com/health`
   deve levar 30-60s.
2. Abrir o front (hard reload) → Network mostra `GET /health` no load.
3. Gerar um plano → Network mostra 1-4 `POST /api/v1/plan/generate` (502/timeout) e então 202;
   linha vai `draft → processing → generated`; banner spinner → verde, **sem** timeout/erro visível.
