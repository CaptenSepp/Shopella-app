import Account from "@/features/account/next/pages/Account"
import RequireAuth from "@/features/auth/next/RequireAuth"

export default function AccountRoute() {
  return <RequireAuth><Account /></RequireAuth>
}
