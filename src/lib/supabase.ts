import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Please check your .env file.");
}

export const supabase = createClient<Database>(
  supabaseUrl || "",
  supabaseAnonKey || "",
  {
    auth: {
      // PKCE flow: tokens never appear in URL — secure by default
      flowType: "pkce",
      // Keep session alive across browser refreshes via localStorage
      persistSession: true,
      // Auto-refresh token before expiry
      autoRefreshToken: true,
      // Detect session from URL hash (for implicit flow fallback)
      detectSessionInUrl: true,
      // Use localStorage so session survives page reload
      storage: window.localStorage,
    },
  }
);
