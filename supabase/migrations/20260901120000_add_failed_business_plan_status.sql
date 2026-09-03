-- Adiciona 'failed' aos status válidos de public.business_plans.
-- Necessário para a integração com o agente de IA (educaimpacto-agents):
-- quando a geração falha (erro de LLM, resposta fora do formato esperado,
-- content malformado), o backend grava status='failed' em vez de deixar
-- o registro preso em 'draft' indefinidamente.
--
-- A constraint original é inline/sem nome explícito (ver
-- 20260708200000_initial_schema.sql), então o Postgres gerou o nome
-- automaticamente. Descobrimos e removemos dinamicamente qualquer CHECK
-- constraint na coluna `status` antes de recriá-la, em vez de assumir
-- o nome padrão (`business_plans_status_check`) às cegas.

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
  check (status in ('draft', 'generated', 'approved', 'archived', 'failed'));
