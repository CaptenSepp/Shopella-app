import { createClient } from "@supabase/supabase-js"
import type { ApiRequest } from "./http.js"
import { getServerConfig } from "./server-config.js"

export const createServerSupabase = () => {
  const { supabaseUrl, supabaseSecretKey } = getServerConfig()
  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  })
}

export const authenticateRequest = async (request: ApiRequest) => {
  const authorization = String(request.headers.authorization ?? "")
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : ""
  if (!token) throw new Error("Please sign in to continue.")

  // getUser checks the token with Supabase Auth before any private order data is read.
  const supabase = createServerSupabase()
  const result = await supabase.auth.getUser(token)
  if (result.error || !result.data.user?.email) throw new Error("Your session is invalid or expired.")
  return { supabase, user: result.data.user }
}
