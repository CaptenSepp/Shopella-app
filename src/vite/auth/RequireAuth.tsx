import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import type { RootState } from "@/app/store"
import RouteLoadingState from "@/components/ui/RouteLoadingState"
import { useAuthSession } from "./auth-session-context"

const RequireAuth = () => {
  const location = useLocation()
  const user = useSelector((state: RootState) => state.auth.user)
  const { isAuthLoading } = useAuthSession()

  if (isAuthLoading) return <RouteLoadingState label="Checking your account..." />
  if (!user) {
    const redirectPath = `${location.pathname}${location.search}`
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirectPath)}`} replace />
  }

  return <Outlet />
}

export default RequireAuth
