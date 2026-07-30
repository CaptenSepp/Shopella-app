import RequireAuth from "@/features/auth/next/RequireAuth"
import AdminPage from "@/features/admin/AdminPage"

export default function AdminRoute() {
  return (
    <RequireAuth>
      <AdminPage />
    </RequireAuth>
  )
}
