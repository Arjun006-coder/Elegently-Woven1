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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          display_name: string | null
          phone: string | null
          phone_verified: boolean | null
          avatar_url: string | null
          date_of_birth: string | null
          gender: 'female' | 'male' | 'non_binary' | 'prefer_not_to_say' | null
          anniversary_date: string | null
          role: 'customer' | 'admin' | 'super_admin' | 'staff' | 'warehouse'
          is_active: boolean | null
          is_verified: boolean | null
          preferred_language: string | null
          currency: string | null
          referral_code: string | null
          referred_by: string | null
          total_orders: number | null
          total_spent: number | null
          last_login_at: string | null
          deleted_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          // ... other fields omitted for brevity
        }
        Update: {
          id?: string
          email?: string
          // ...
        }
      }
      // Add other tables as needed...
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
