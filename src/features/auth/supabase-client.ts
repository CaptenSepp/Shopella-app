import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "http://127.0.0.1:54321"
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "missing-publishable-key"

// The fallback values let tests render helpful configuration errors without crashing on import.
export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
)

export const supabase = createClient(supabaseUrl, supabaseKey)
