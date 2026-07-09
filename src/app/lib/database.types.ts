export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: 'student' | 'mentor' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role?: 'student' | 'mentor' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          role?: 'student' | 'mentor' | 'admin';
          updated_at?: string;
        };
      };
      business_projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          status: 'draft' | 'in_progress' | 'ready' | 'archived';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string;
          description?: string | null;
          status?: 'draft' | 'in_progress' | 'ready' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          status?: 'draft' | 'in_progress' | 'ready' | 'archived';
          updated_at?: string;
        };
      };
      diagnostics: {
        Row: {
          id: string;
          project_id: string;
          profile_level: string;
          answers: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          profile_level: string;
          answers?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          profile_level?: string;
          answers?: Json;
          updated_at?: string;
        };
      };
      mission_answers: {
        Row: {
          id: string;
          project_id: string;
          module_id: number;
          module_title: string;
          mission_id: number;
          mission_title: string;
          question: string;
          answer: string;
          status: 'draft' | 'answered' | 'reviewed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          module_id: number;
          module_title: string;
          mission_id: number;
          mission_title: string;
          question: string;
          answer: string;
          status?: 'draft' | 'answered' | 'reviewed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          module_id?: number;
          module_title?: string;
          mission_id?: number;
          mission_title?: string;
          question?: string;
          answer?: string;
          status?: 'draft' | 'answered' | 'reviewed';
          updated_at?: string;
        };
      };
      personas: {
        Row: {
          id: string;
          project_id: string | null;
          name: string;
          segment: string | null;
          pain_points: Json;
          goals: Json;
          objections: Json;
          behavior_notes: string | null;
          source: 'simulated' | 'manual' | 'ai_generated';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id?: string | null;
          name: string;
          segment?: string | null;
          pain_points?: Json;
          goals?: Json;
          objections?: Json;
          behavior_notes?: string | null;
          source?: 'simulated' | 'manual' | 'ai_generated';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          project_id?: string | null;
          name?: string;
          segment?: string | null;
          pain_points?: Json;
          goals?: Json;
          objections?: Json;
          behavior_notes?: string | null;
          source?: 'simulated' | 'manual' | 'ai_generated';
          updated_at?: string;
        };
      };
      chat_sessions: {
        Row: {
          id: string;
          project_id: string;
          persona_id: string | null;
          title: string;
          purpose: string;
          status: 'open' | 'closed' | 'archived';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          persona_id?: string | null;
          title?: string;
          purpose?: string;
          status?: 'open' | 'closed' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          persona_id?: string | null;
          title?: string;
          purpose?: string;
          status?: 'open' | 'closed' | 'archived';
          updated_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          session_id: string;
          role: 'system' | 'user' | 'assistant' | 'persona';
          content: string;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          role: 'system' | 'user' | 'assistant' | 'persona';
          content: string;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          role?: 'system' | 'user' | 'assistant' | 'persona';
          content?: string;
          metadata?: Json;
        };
      };
      business_plans: {
        Row: {
          id: string;
          project_id: string;
          version: number;
          title: string;
          content: Json;
          generated_from: Json;
          status: 'draft' | 'generated' | 'approved' | 'archived';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          version?: number;
          title?: string;
          content?: Json;
          generated_from?: Json;
          status?: 'draft' | 'generated' | 'approved' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          version?: number;
          title?: string;
          content?: Json;
          generated_from?: Json;
          status?: 'draft' | 'generated' | 'approved' | 'archived';
          updated_at?: string;
        };
      };
    };
  };
}
