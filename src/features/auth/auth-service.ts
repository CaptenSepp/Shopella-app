import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js"
import { isSupabaseConfigured, supabase } from "./supabase-client"
import type { AuthUser } from "./authSlice"
import { getDemoUser, listenForDemoAuthChanges, signInDemo, signOutDemo, signUpDemo } from "./demo-auth-service"

export const mapSupabaseUser = (user: User | null): AuthUser | null => {
  // Reduce the provider-specific user record to the shape consumed by Redux.
  if (!user?.email) return null
  const savedName = String(user.user_metadata?.name ?? "").trim()
  return { id: user.id, name: savedName || user.email.split("@")[0], email: user.email }
}

export const signIn = async (email: string, password: string) => {
  // Local demo auth is the fallback when Supabase environment variables are absent.
  if (!isSupabaseConfigured) return signInDemo(email)

  const result = await supabase.auth.signInWithPassword({ email, password })
  if (result.error) throw result.error
  return mapSupabaseUser(result.data.user)
}

export const signUp = async (name: string, email: string, password: string) => {
  // Store the display name as provider metadata during registration.
  if (!isSupabaseConfigured) return signUpDemo(name, email)

  const result = await supabase.auth.signUp({ email, password, options: { data: { name } } })
  if (result.error) throw result.error
  return mapSupabaseUser(result.data.user)
}

export const signOut = async () => {
  if (!isSupabaseConfigured) {
    signOutDemo()
    return
  }

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
  // API services use this helper to consistently reject anonymous requests.
  const session = await getCurrentSession()
  if (!session?.access_token) throw new Error("Please sign in to continue.")
  return session.access_token
}

export const getCurrentUser = async () => {
  if (!isSupabaseConfigured) return getDemoUser()
  const session = await getCurrentSession()
  return mapSupabaseUser(session?.user ?? null)
}

export const listenForAuthUserChanges = (callback: (user: AuthUser | null) => void) => {
  // Normalize both demo and Supabase events before exposing them to React.
  if (!isSupabaseConfigured) return listenForDemoAuthChanges(callback)
  return listenForAuthChanges((session) => callback(mapSupabaseUser(session?.user ?? null)))
}

export const listenForAuthChanges = (callback: (session: Session | null) => void) => {
  const listener = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session) => callback(session))
  return () => listener.data.subscription.unsubscribe()
}
