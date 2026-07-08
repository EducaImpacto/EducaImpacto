# Supabase

Este diretório guarda as migrações do banco do Educa Impacto.

## Como aplicar a primeira migração

1. Abra o projeto no Supabase.
2. Vá em `SQL Editor`.
3. Crie uma nova query.
4. Cole o conteúdo de `supabase/migrations/20260708200000_initial_schema.sql`.
5. Clique em `Run`.

Depois disso, confira em `Table Editor` se estas tabelas apareceram:

- `profiles`
- `business_projects`
- `diagnostics`
- `mission_answers`
- `personas`
- `chat_sessions`
- `chat_messages`
- `business_plans`

## Proximo passo

Depois da migração aplicada, copie de `Project Settings > API`:

- Project URL
- anon public key

Esses valores vao entrar no front como:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
