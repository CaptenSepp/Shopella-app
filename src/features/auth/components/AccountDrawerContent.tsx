import type { AuthUser } from "../authSlice"
import { signOut } from "../auth-service"

const AccountDrawerContent = ({ onSignedOut, user }: { onSignedOut: () => void; user: AuthUser }) => (
  <div className="account-drawer-content">
    <p className="account-drawer-content__name">{user.name}</p>
    <p className="account-drawer-content__email">{user.email}</p>
    <button type="button" className="btn btn-secondary btn-sm" onClick={() => { void signOut().then(onSignedOut) }}>Sign out</button>
  </div>
)

export default AccountDrawerContent
