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
      persistSession: true,       // Session survives page refresh
      autoRefreshToken: true,     // Keeps session alive automatically
      detectSessionInUrl: true,   // Handles OAuth hash/query params
      flowType: "pkce",           // Most secure OAuth flow — tokens can't be intercepted/replayed
      storageKey: "ew_auth_token",// Custom key so it's identifiable in browser storage
    },
  }
);
