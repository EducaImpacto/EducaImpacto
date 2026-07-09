import { supabase } from '../lib/supabase';
import type { Database, Json } from '../lib/database.types';

type Tables = Database['public']['Tables'];
type BusinessProjectInsert = Tables['business_projects']['Insert'];
type DiagnosticInsert = Tables['diagnostics']['Insert'];
type MissionAnswerInsert = Tables['mission_answers']['Insert'];
type PersonaInsert = Tables['personas']['Insert'];
type ChatSessionInsert = Tables['chat_sessions']['Insert'];
type ChatMessageInsert = Tables['chat_messages']['Insert'];
type BusinessPlanInsert = Tables['business_plans']['Insert'];

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

export async function createBusinessProject(input: Omit<BusinessProjectInsert, 'user_id'>) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Usuario precisa estar autenticado para criar projeto.');

  const { data, error } = await supabase
    .from('business_projects')
    .insert({ ...input, user_id: user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserBusinessProjects() {
  const { data, error } = await supabase
    .from('business_projects')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function upsertDiagnostic(input: DiagnosticInsert) {
  const { data, error } = await supabase
    .from('diagnostics')
    .upsert(input, { onConflict: 'project_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function upsertMissionAnswer(input: MissionAnswerInsert) {
  const { data, error } = await supabase
    .from('mission_answers')
    .upsert(input, { onConflict: 'project_id,mission_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getProjectMissionAnswers(projectId: string) {
  const { data, error } = await supabase
    .from('mission_answers')
    .select('*')
    .eq('project_id', projectId)
    .order('module_id', { ascending: true })
    .order('mission_id', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createPersona(input: PersonaInsert) {
  const { data, error } = await supabase
    .from('personas')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createChatSession(input: ChatSessionInsert) {
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addChatMessage(input: ChatMessageInsert) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getChatMessages(sessionId: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createBusinessPlan(input: BusinessPlanInsert) {
  const { data, error } = await supabase
    .from('business_plans')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export function toJson<T>(value: T): Json {
  return value as Json;
}
