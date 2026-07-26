"use client"

import { useEffect, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import RouteLoadingState from "@/components/ui/RouteLoadingState"
import { useAuthSession } from "@/features/auth/auth-session-context"

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  const user = useSelector((state: RootState) => state.auth.user)
  const { isAuthLoading } = useAuthSession()

  useEffect(() => {
    if (isAuthLoading || user) return
    const redirectPath = `${pathname}${window.location.search}`
    router.replace(`/login?redirect=${encodeURIComponent(redirectPath)}`)
  }, [isAuthLoading, pathname, router, user])

  if (isAuthLoading) return <RouteLoadingState label="Checking your account..." />
  if (!user) return <RouteLoadingState label="Redirecting to login..." />

  return children
}

export default RequireAuth
