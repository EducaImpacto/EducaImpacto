create table public.plan_download_orders (
  plan_id uuid primary key references public.business_plans(id) on delete cascade,
  reference uuid not null unique default gen_random_uuid(),
  checkout_url text
);

alter table public.plan_download_orders enable row level security;
revoke all on public.plan_download_orders from anon, authenticated;
grant select, insert, update on public.plan_download_orders to service_role;
