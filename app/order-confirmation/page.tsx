import { Suspense } from "react"
import RouteLoadingState from "@/components/ui/RouteLoadingState"
import RequireAuth from "@/features/auth/next/RequireAuth"
import OrderConfirmation from "@/features/checkout/next/pages/OrderConfirmation"

export default function OrderConfirmationRoute() {
  return (
    <RequireAuth>
      <Suspense fallback={<RouteLoadingState label="Loading confirmation..." />}>
        <OrderConfirmation />
      </Suspense>
    </RequireAuth>
  )
}
