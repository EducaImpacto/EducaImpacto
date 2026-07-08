-- Educa Impacto initial Supabase schema
-- Run this file in Supabase SQL Editor after creating the project.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'student' check (role in ('student', 'mentor', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null default 'Meu plano de negocio',
  description text,
  status text not null default 'draft' check (status in ('draft', 'in_progress', 'ready', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.diagnostics (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.business_projects(id) on delete cascade,
  profile_level text not null,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id)
);

create table if not exists public.mission_answers (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.business_projects(id) on delete cascade,
  module_id integer not null,
  module_title text not null,
  mission_id integer not null,
  mission_title text not null,
  question text not null,
  answer text not null,
  status text not null default 'answered' check (status in ('draft', 'answered', 'reviewed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, mission_id)
);

create table if not exists public.personas (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.business_projects(id) on delete cascade,
  name text not null,
  segment text,
  pain_points jsonb not null default '[]'::jsonb,
  goals jsonb not null default '[]'::jsonb,
  objections jsonb not null default '[]'::jsonb,
  behavior_notes text,
  source text not null default 'simulated' check (source in ('simulated', 'manual', 'ai_generated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.business_projects(id) on delete cascade,
  persona_id uuid references public.personas(id) on delete set null,
  title text not null default 'Conversa com IA',
  purpose text not null default 'business_plan',
  status text not null default 'open' check (status in ('open', 'closed', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  role text not null check (role in ('system', 'user', 'assistant', 'persona')),
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.business_plans (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.business_projects(id) on delete cascade,
  version integer not null default 1,
  title text not null default 'Plano de negocios',
  content jsonb not null default '{}'::jsonb,
  generated_from jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'generated', 'approved', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, version)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email))
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists set_business_projects_updated_at on public.business_projects;
create trigger set_business_projects_updated_at
  before update on public.business_projects
  for each row execute function public.set_updated_at();

drop trigger if exists set_diagnostics_updated_at on public.diagnostics;
create trigger set_diagnostics_updated_at
  before update on public.diagnostics
  for each row execute function public.set_updated_at();

drop trigger if exists set_mission_answers_updated_at on public.mission_answers;
create trigger set_mission_answers_updated_at
  before update on public.mission_answers
  for each row execute function public.set_updated_at();

drop trigger if exists set_personas_updated_at on public.personas;
create trigger set_personas_updated_at
  before update on public.personas
  for each row execute function public.set_updated_at();

drop trigger if exists set_chat_sessions_updated_at on public.chat_sessions;
create trigger set_chat_sessions_updated_at
  before update on public.chat_sessions
  for each row execute function public.set_updated_at();

drop trigger if exists set_business_plans_updated_at on public.business_plans;
create trigger set_business_plans_updated_at
  before update on public.business_plans
  for each row execute function public.set_updated_at();

create index if not exists business_projects_user_id_idx on public.business_projects(user_id);
create index if not exists diagnostics_project_id_idx on public.diagnostics(project_id);
create index if not exists mission_answers_project_id_idx on public.mission_answers(project_id);
create index if not exists personas_project_id_idx on public.personas(project_id);
create index if not exists chat_sessions_project_id_idx on public.chat_sessions(project_id);
create index if not exists chat_messages_session_id_idx on public.chat_messages(session_id);
create index if not exists business_plans_project_id_idx on public.business_plans(project_id);

alter table public.profiles enable row level security;
alter table public.business_projects enable row level security;
alter table public.diagnostics enable row level security;
alter table public.mission_answers enable row level security;
alter table public.personas enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.business_plans enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Users can manage own projects" on public.business_projects;
create policy "Users can manage own projects"
  on public.business_projects for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can manage own diagnostics" on public.diagnostics;
create policy "Users can manage own diagnostics"
  on public.diagnostics for all
  using (
    exists (
      select 1 from public.business_projects p
      where p.id = diagnostics.project_id and p.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.business_projects p
      where p.id = diagnostics.project_id and p.user_id = auth.uid()
    )
  );

drop policy if exists "Users can manage own mission answers" on public.mission_answers;
create policy "Users can manage own mission answers"
  on public.mission_answers for all
  using (
    exists (
      select 1 from public.business_projects p
      where p.id = mission_answers.project_id and p.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.business_projects p
      where p.id = mission_answers.project_id and p.user_id = auth.uid()
    )
  );

drop policy if exists "Users can manage own personas" on public.personas;
create policy "Users can manage own personas"
  on public.personas for all
  using (
    exists (
      select 1 from public.business_projects p
      where p.id = personas.project_id and p.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.business_projects p
      where p.id = personas.project_id and p.user_id = auth.uid()
    )
  );

drop policy if exists "Users can manage own chat sessions" on public.chat_sessions;
create policy "Users can manage own chat sessions"
  on public.chat_sessions for all
  using (
    exists (
      select 1 from public.business_projects p
      where p.id = chat_sessions.project_id and p.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.business_projects p
      where p.id = chat_sessions.project_id and p.user_id = auth.uid()
    )
  );

drop policy if exists "Users can manage own chat messages" on public.chat_messages;
create policy "Users can manage own chat messages"
  on public.chat_messages for all
  using (
    exists (
      select 1
      from public.chat_sessions s
      join public.business_projects p on p.id = s.project_id
      where s.id = chat_messages.session_id and p.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.chat_sessions s
      join public.business_projects p on p.id = s.project_id
      where s.id = chat_messages.session_id and p.user_id = auth.uid()
    )
  );

drop policy if exists "Users can manage own business plans" on public.business_plans;
create policy "Users can manage own business plans"
  on public.business_plans for all
  using (
    exists (
      select 1 from public.business_projects p
      where p.id = business_plans.project_id and p.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.business_projects p
      where p.id = business_plans.project_id and p.user_id = auth.uid()
    )
  );
