"use client"

import { User } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import AuthForm from "@/features/auth/components/AuthForm"
import { focusRingClass, getIconLinkClassName } from "./header-tools"
import { useHeaderDrawer } from "./use-header-drawer"
import AccountDrawerContent from "@/features/auth/components/AccountDrawerContent"

const LoginDrawer = () => {
  const { isDrawerOpen, openButtonRef, drawerRef, openDrawer, closeDrawer } = useHeaderDrawer() // shared drawer behavior
  const user = useSelector((state: RootState) => state.auth.user) // read signed-in user
  const shortName = user?.name.trim().slice(0, 6) // keep label small under the icon

  return (
    <>
      <button
        type="button"
        ref={openButtonRef}
        onClick={openDrawer}
        className={`${getIconLinkClassName(isDrawerOpen)} ${focusRingClass}`}
        aria-pressed={isDrawerOpen}
        aria-haspopup="dialog"
        aria-controls="login-drawer"
        aria-label="Open login drawer"
      >
        <span className="flex flex-col items-center justify-center leading-none">
          <User size={20} />
          {shortName ? <span className="mt-1 max-w-12 truncate text-[10px] font-medium">{shortName}</span> : null}
        </span>
      </button>

      {isDrawerOpen && <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs" onClick={closeDrawer} />}

      <aside
        ref={drawerRef}
        id="login-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-drawer-title"
        aria-hidden={!isDrawerOpen}
        inert={!isDrawerOpen}
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-[color:var(--app-surface)] text-[color:var(--app-text)] shadow-lg transition-opacity duration-200 ${isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <button type="button" onClick={closeDrawer} className={`absolute right-4 top-4 u-text-2xl ${focusRingClass}`} aria-label="Close login drawer">×</button>
        <div className="space-y-4 p-6">
          <h2 id="login-drawer-title" className="u-text-xl u-font-semibold">Shopella account</h2>
          {user ? <AccountDrawerContent user={user} onSignedOut={closeDrawer} /> : <AuthForm onAdminSuccess={closeDrawer} onSuccess={closeDrawer} />}
          {!user ? <a href="/login" className={`btn btn-primary btn-sm ${focusRingClass}`} onClick={closeDrawer}>Open Login Page</a> : null}
        </div>
      </aside>
    </>
  )
}

export default LoginDrawer
