import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const FALLBACK_SUPABASE_URL = 'https://jsmsyjzdziavmphzmfci.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzbXN5anpkemlhdm1waHptZmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NDE4NDIsImV4cCI6MjA5OTExNzg0Mn0.uhY7nxIKMISemykKAdyhm2PlHJ-Sa3-Gga3mjcKUV7I';

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
  isValidSupabaseUrl(supabaseUrl) && supabaseAnonKey
);

if (!isSupabaseConfigured) {
  console.warn('Variaveis do Supabase nao encontradas. Usando configuracao publica de fallback.');
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
