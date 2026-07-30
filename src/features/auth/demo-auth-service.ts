import type { AuthUser } from "./authSlice"

const DEMO_AUTH_STORAGE_KEY = "shopella-demo-user"
const DEMO_AUTH_EVENT = "shopella-demo-auth-change"

export const getDemoUser = (): AuthUser | null => {
  // Read the browser-only session defensively because storage may be malformed.
  if (typeof window === "undefined") return null

  try {
    const savedUser = window.localStorage.getItem(DEMO_AUTH_STORAGE_KEY)
    return savedUser ? JSON.parse(savedUser) as AuthUser : null
  } catch {
    return null
  }
}

const saveDemoUser = (user: AuthUser | null) => {
  // Emit a same-window event because the native storage event only reaches other tabs.
  if (typeof window === "undefined") return

  if (user) window.localStorage.setItem(DEMO_AUTH_STORAGE_KEY, JSON.stringify(user))
  else window.localStorage.removeItem(DEMO_AUTH_STORAGE_KEY)
  window.dispatchEvent(new Event(DEMO_AUTH_EVENT))
}

export const signInDemo = (email: string): AuthUser => {
  // Reuse a saved display name when the same demo email signs in again.
  const savedUser = getDemoUser()
  const normalizedEmail = email.trim().toLowerCase()
  const name = savedUser?.email === normalizedEmail ? savedUser.name : normalizedEmail.split("@")[0]
  const user = { id: `demo-${normalizedEmail}`, name, email: normalizedEmail }

  saveDemoUser(user)
  return user
}

export const signUpDemo = (name: string, email: string): AuthUser => {
  const normalizedEmail = email.trim().toLowerCase()
  const user = { id: `demo-${normalizedEmail}`, name: name.trim(), email: normalizedEmail }

  saveDemoUser(user)
  return user
}

export const signInCustomerDemo = (): AuthUser => {
  const user = { id: "demo-customer@shopella.demo", name: "Demo Customer", email: "customer@shopella.demo" }
  saveDemoUser(user)

  const profileKey = `shopella-account-profile:${user.id}`
  if (!window.localStorage.getItem(profileKey)) {
    window.localStorage.setItem(profileKey, JSON.stringify({
      name: user.name,
      email: user.email,
      phone: "+1 555 010 2040",
      address: "24 Market Street, Portland, OR 97205",
    }))
  }
  window.sessionStorage.setItem("checkout-customer-session", JSON.stringify({
    name: user.name,
    email: user.email,
    address: "24 Market Street, Portland, OR 97205",
  }))
  return user
}

export const signOutDemo = () => saveDemoUser(null)

export const listenForDemoAuthChanges = (callback: (user: AuthUser | null) => void) => {
  // Listen for both same-window changes and cross-tab storage updates.
  if (typeof window === "undefined") return () => undefined

  const syncUser = () => callback(getDemoUser())
  window.addEventListener(DEMO_AUTH_EVENT, syncUser)
  window.addEventListener("storage", syncUser)

  return () => {
    window.removeEventListener(DEMO_AUTH_EVENT, syncUser)
    window.removeEventListener("storage", syncUser)
  }
}
