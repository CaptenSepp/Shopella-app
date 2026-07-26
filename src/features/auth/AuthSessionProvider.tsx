import { useEffect, useState, type ReactNode } from "react"
import { useAppDispatch } from "@/app/store"
import { clearUser, setUser } from "./authSlice"
import { AuthSessionContext } from "./auth-session-context"
import { getCurrentUser, listenForAuthUserChanges } from "./auth-service"

const AuthSessionProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    // The provider mirrors either the demo user or the Supabase user into Redux.
    const syncUser = (user: Awaited<ReturnType<typeof getCurrentUser>>) => {
      if (user) dispatch(setUser(user))
      else dispatch(clearUser())
      setIsAuthLoading(false)
    }

    void getCurrentUser().then(syncUser).catch(() => syncUser(null))
    return listenForAuthUserChanges(syncUser)
  }, [dispatch])

  return <AuthSessionContext.Provider value={{ isAuthLoading }}>{children}</AuthSessionContext.Provider>
}

export default AuthSessionProvider
