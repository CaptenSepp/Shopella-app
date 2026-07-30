"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import AdminDashboard from "./AdminDashboard"

const ADMIN_EMAIL = "admin@shopella.demo"

const AdminPage = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  if (user?.email !== ADMIN_EMAIL) {
    return (
      <section className="admin-access app-page-shell">
        <p className="admin-eyebrow">Admin demo</p>
        <h1>Access denied</h1>
        <p>This frontend demo is available to the demo admin only.</p>
        <a className="btn btn-secondary" href="/">Return to shop</a>
      </section>
    )
  }

  return <AdminDashboard />
}

export default AdminPage
