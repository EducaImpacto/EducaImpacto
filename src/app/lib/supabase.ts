import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const FALLBACK_SUPABASE_URL = 'https://example.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'missing-supabase-anon-key';

function normalizeEnvValue(value: string | undefined): string {
  const trimmed = value?.trim().replace(/^['"]|['"]$/g, '') ?? '';
  const markdownLinkMatch = trimmed.match(/^\[([^\]]+)\]\([^)]+\)$/);
  return markdownLinkMatch?.[1] ?? trimmed;
}

function isValidSupabaseUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.endsWith('.supabase.co');
  } catch {
    return false;
  }
}

const supabaseUrl = normalizeEnvValue(import.meta.env.VITE_SUPABASE_URL);
const supabaseAnonKey = normalizeEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY);

export const isSupabaseConfigured = Boolean(
  isValidSupabaseUrl(supabaseUrl) && supabaseAnonKey && supabaseAnonKey !== FALLBACK_SUPABASE_ANON_KEY
);

if (!isSupabaseConfigured) {
  console.warn('Supabase nao configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env.');
}

export const supabase = createClient<Database>(
  isSupabaseConfigured ? supabaseUrl : FALLBACK_SUPABASE_URL,
  isSupabaseConfigured ? supabaseAnonKey : FALLBACK_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
