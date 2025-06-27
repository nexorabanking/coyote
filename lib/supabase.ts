import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      packages: {
        Row: {
          id: string
          tracking_id: string
          recipient_name: string
          recipient_email: string | null
          recipient_phone: string | null
          current_location: string
          destination: string
          estimated_delivery: string
          status: string
          weight: string | null
          dimensions: string | null
          service_type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tracking_id: string
          recipient_name: string
          recipient_email?: string | null
          recipient_phone?: string | null
          current_location: string
          destination: string
          estimated_delivery: string
          status?: string
          weight?: string | null
          dimensions?: string | null
          service_type?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tracking_id?: string
          recipient_name?: string
          recipient_email?: string | null
          recipient_phone?: string | null
          current_location?: string
          destination?: string
          estimated_delivery?: string
          status?: string
          weight?: string | null
          dimensions?: string | null
          service_type?: string
          created_at?: string
          updated_at?: string
        }
      }
      tracking_events: {
        Row: {
          id: string
          package_id: string
          event_date: string
          event_time: string
          location: string
          status: string
          description: string
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          package_id: string
          event_date: string
          event_time: string
          location: string
          status: string
          description: string
          completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          package_id?: string
          event_date?: string
          event_time?: string
          location?: string
          status?: string
          description?: string
          completed?: boolean
          created_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          password_hash: string
          full_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          full_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          full_name?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
