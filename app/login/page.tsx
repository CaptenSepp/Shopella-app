import { Suspense } from "react"
import RouteLoadingState from "@/components/ui/RouteLoadingState"
import LoginPage from "@/features/auth/next/pages/Login"

export default function LoginRoute() {
  return (
    <Suspense fallback={<RouteLoadingState label="Loading login..." />}>
      <LoginPage />
    </Suspense>
  )
}
