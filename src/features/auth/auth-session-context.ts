import { createContext, useContext } from "react"

export type AuthSessionContextValue = { isAuthLoading: boolean }

export const AuthSessionContext = createContext<AuthSessionContextValue | null>(null)

export const useAuthSession = () => {
  const context = useContext(AuthSessionContext)
  if (!context) throw new Error("useAuthSession must be used inside AuthSessionProvider")
  return context
}
