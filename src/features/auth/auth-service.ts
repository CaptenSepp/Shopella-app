import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js"
import { isSupabaseConfigured, supabase } from "./supabase-client"
import type { AuthUser } from "./authSlice"

const requireConfiguration = () => {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured yet.")
}

export const mapSupabaseUser = (user: User | null): AuthUser | null => {
  if (!user?.email) return null
  const savedName = String(user.user_metadata?.name ?? "").trim()
  return { id: user.id, name: savedName || user.email.split("@")[0], email: user.email }
}

export const signIn = async (email: string, password: string) => {
  requireConfiguration()
  const result = await supabase.auth.signInWithPassword({ email, password })
  if (result.error) throw result.error
  return mapSupabaseUser(result.data.user)
}

export const signUp = async (name: string, email: string, password: string) => {
  requireConfiguration()
  const result = await supabase.auth.signUp({ email, password, options: { data: { name } } })
  if (result.error) throw result.error
  return mapSupabaseUser(result.data.user)
}

export const signOut = async () => {
  requireConfiguration()
  const result = await supabase.auth.signOut()
  if (result.error) throw result.error
}

export const getCurrentSession = async () => {
  if (!isSupabaseConfigured) return null
  const result = await supabase.auth.getSession()
  if (result.error) throw result.error
  return result.data.session
}

export const getAccessToken = async () => {
  const session = await getCurrentSession()
  if (!session?.access_token) throw new Error("Please sign in to continue.")
  return session.access_token
}

export const listenForAuthChanges = (callback: (session: Session | null) => void) => {
  const listener = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session) => callback(session))
  return () => listener.data.subscription.unsubscribe()
}
