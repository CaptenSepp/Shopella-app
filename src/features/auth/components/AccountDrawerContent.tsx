import type { AuthUser } from "@/features/auth/authSlice"
import { signOut } from "@/features/auth/auth-service"

const AccountDrawerContent = ({ onSignedOut, user }: { onSignedOut: () => void; user: AuthUser }) => (
  <div className="account-drawer-content">
    <p className="account-drawer-content__name">{user.name}</p>
    <p className="account-drawer-content__email">{user.email}</p>
    <button type="button" className="btn btn-secondary btn-sm" onClick={() => { void signOut().then(onSignedOut) }}>Sign out</button>
  </div>
)

export default AccountDrawerContent
