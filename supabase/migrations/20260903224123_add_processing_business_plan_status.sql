-- Adiciona 'processing' aos status válidos de public.business_plans.
-- Necessário para a integração com o agente de IA (educaimpacto-agents):
-- ao iniciar uma geração, `run_generation()` grava status='processing' como
-- estado intermediário (draft -> processing -> generated | failed). Sem esse
-- valor na constraint, o UPDATE falha com check_violation (23514), o erro é
-- engolido no backend e, pior, `recover_stuck_generations()` — que varre
-- linhas presas em status='processing' no startup da API para re-enfileirar
-- gerações órfãs — nunca encontra nada, deixando registros presos em 'draft'.
--
-- Mesmo padrão de 20260901120000_add_failed_business_plan_status.sql: a
-- constraint original é inline/sem nome explícito (ver
-- 20260708200000_initial_schema.sql), então descobrimos e removemos
-- dinamicamente qualquer CHECK constraint na coluna `status` antes de recriá-la.

do $$
declare
  constraint_name text;
begin
  select con.conname
    into constraint_name
    from pg_constraint con
    join pg_class rel on rel.oid = con.conrelid
    join pg_namespace nsp on nsp.oid = rel.relnamespace
    where nsp.nspname = 'public'
      and rel.relname = 'business_plans'
      and con.contype = 'c'
      and pg_get_constraintdef(con.oid) like '%status%';

  if constraint_name is not null then
    execute format('alter table public.business_plans drop constraint %I', constraint_name);
  end if;
end $$;

alter table public.business_plans
  add constraint business_plans_status_check
  check (status in ('draft', 'processing', 'generated', 'approved', 'archived', 'failed'));
