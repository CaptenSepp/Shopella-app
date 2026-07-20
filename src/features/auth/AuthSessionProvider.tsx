import { useEffect, useState, type ReactNode } from "react"
import { useAppDispatch } from "@/app/store"
import { clearUser, setUser } from "./authSlice"
import { AuthSessionContext } from "./auth-session-context"
import { getCurrentSession, listenForAuthChanges, mapSupabaseUser } from "./auth-service"

const AuthSessionProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    // Supabase owns the real session; Redux only mirrors the safe fields used by the current UI.
    const syncSession = (session: Awaited<ReturnType<typeof getCurrentSession>>) => {
      const nextUser = mapSupabaseUser(session?.user ?? null)
      if (nextUser) dispatch(setUser(nextUser))
      else dispatch(clearUser())
      setIsAuthLoading(false)
    }

    void getCurrentSession().then(syncSession).catch(() => syncSession(null))
    return listenForAuthChanges(syncSession)
  }, [dispatch])

  return <AuthSessionContext.Provider value={{ isAuthLoading }}>{children}</AuthSessionContext.Provider>
}

export default AuthSessionProvider
