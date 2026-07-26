import { createClient } from "@supabase/supabase-js"

const viteEnv = import.meta.env
const nextSupabaseUrl = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL : undefined
const nextSupabaseKey = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY : undefined
const configuredSupabaseUrl = viteEnv?.VITE_SUPABASE_URL || nextSupabaseUrl
const configuredSupabaseKey = viteEnv?.VITE_SUPABASE_PUBLISHABLE_KEY || nextSupabaseKey
const supabaseUrl = configuredSupabaseUrl || "http://127.0.0.1:54321"
const supabaseKey = configuredSupabaseKey || "missing-publishable-key"

// The fallback values let tests render helpful configuration errors without crashing on import.
export const isSupabaseConfigured = Boolean(configuredSupabaseUrl && configuredSupabaseKey)

export const supabase = createClient(supabaseUrl, supabaseKey)
