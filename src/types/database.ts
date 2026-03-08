export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          status: string
          plan: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          current_period_end: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status: string
          plan: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          current_period_end?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          plan?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          current_period_end?: string | null
          created_at?: string
        }
      }
      api_keys: {
        Row: {
          id: string
          user_id: string
          provider: string
          encrypted_key: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider: string
          encrypted_key: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider?: string
          encrypted_key?: string
          created_at?: string
        }
      }
      ai_usage: {
        Row: {
          id: string
          user_id: string
          provider: string
          model: string
          tokens_used: number
          request_timestamp: string
        }
        Insert: {
          id?: string
          user_id: string
          provider: string
          model: string
          tokens_used: number
          request_timestamp?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider?: string
          model?: string
          tokens_used?: number
          request_timestamp?: string
        }
      }
      user_preferences: {
        Row: {
          user_id: string
          preferred_model: string | null
          telegram_open_dm: boolean
          updated_at: string
        }
        Insert: {
          user_id: string
          preferred_model?: string | null
          telegram_open_dm?: boolean
          updated_at?: string
        }
        Update: {
          user_id?: string
          preferred_model?: string | null
          telegram_open_dm?: boolean
          updated_at?: string
        }
      }
      telegram_messages: {
        Row: {
          id: string
          user_id: string
          chat_id: string
          is_bot: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          chat_id: string
          is_bot?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          chat_id?: string
          is_bot?: boolean
          created_at?: string
        }
      }
      instances: {
        Row: {
          id: string
          user_id: string
          name: string
          status: string
          url: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          status?: string
          url?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          status?: string
          url?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      purchases: {
        Row: {
          id: string
          github_username: string
          stripe_session_id: string
          purchase_timestamp: string
          invite_status: string
          error_message: string | null
        }
        Insert: {
          id?: string
          github_username: string
          stripe_session_id: string
          purchase_timestamp?: string
          invite_status?: string
          error_message?: string | null
        }
        Update: {
          id?: string
          github_username?: string
          stripe_session_id?: string
          purchase_timestamp?: string
          invite_status?: string
          error_message?: string | null
        }
      }
    }
  }
}
