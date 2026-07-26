import RequireAuth from "@/features/auth/next/RequireAuth"
import OrdersPage from "@/features/orders/next/pages/Orders"

export default function OrdersRoute() {
  return <RequireAuth><OrdersPage /></RequireAuth>
}
