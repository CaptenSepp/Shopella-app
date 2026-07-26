import RequireAuth from "@/features/auth/next/RequireAuth"
import Checkout from "@/features/checkout/next/pages/Checkout"

export default function CheckoutRoute() {
  return <RequireAuth><Checkout /></RequireAuth>
}
