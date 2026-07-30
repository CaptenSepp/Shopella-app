import type { AuthUser } from "@/features/auth/authSlice"
import { signOut } from "@/features/auth/auth-service"
import { isSupabaseConfigured } from "@/features/auth/supabase-client"
import { Heart, LogOut, Package, ShieldCheck, UserRound } from "lucide-react"

const AccountDrawerContent = ({ onSignedOut, user }: { onSignedOut: () => void; user: AuthUser }) => {
  const initials = user.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()

  return (
    <div className="account-drawer-content">
      {!isSupabaseConfigured ? (
        <div className="account-drawer-content__demo">
          <ShieldCheck aria-hidden="true" />
          <div><strong>Demo account</strong><span>No real customer data or payments</span></div>
        </div>
      ) : null}
      <div className="account-drawer-content__profile">
        <div className="account-drawer-content__avatar">{initials || <UserRound aria-hidden="true" />}</div>
        <div>
          <p className="account-drawer-content__name">{user.name}</p>
          <p className="account-drawer-content__email">{user.email}</p>
        </div>
      </div>
      <nav className="account-drawer-content__nav" aria-label="Account shortcuts">
        <a href="/account"><UserRound aria-hidden="true" /><span><strong>Profile</strong><small>Contact and delivery details</small></span></a>
        <a href="/orders"><Package aria-hidden="true" /><span><strong>Orders</strong><small>Receipts and status history</small></span></a>
        <a href="/wishlist"><Heart aria-hidden="true" /><span><strong>Wishlist</strong><small>Your saved products</small></span></a>
      </nav>
      <button type="button" className="account-drawer-content__signout" onClick={() => { void signOut().then(onSignedOut) }}>
        <LogOut aria-hidden="true" /> Sign out
      </button>
    </div>
  )
}

export default AccountDrawerContent
