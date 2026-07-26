import type { AuthUser } from "./authSlice"

const DEMO_AUTH_STORAGE_KEY = "shopella-demo-user"
const DEMO_AUTH_EVENT = "shopella-demo-auth-change"

export const getDemoUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null

  try {
    const savedUser = window.localStorage.getItem(DEMO_AUTH_STORAGE_KEY)
    return savedUser ? JSON.parse(savedUser) as AuthUser : null
  } catch {
    return null
  }
}

const saveDemoUser = (user: AuthUser | null) => {
  if (typeof window === "undefined") return

  if (user) window.localStorage.setItem(DEMO_AUTH_STORAGE_KEY, JSON.stringify(user))
  else window.localStorage.removeItem(DEMO_AUTH_STORAGE_KEY)
  window.dispatchEvent(new Event(DEMO_AUTH_EVENT))
}

export const signInDemo = (email: string): AuthUser => {
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

export const signOutDemo = () => saveDemoUser(null)

export const listenForDemoAuthChanges = (callback: (user: AuthUser | null) => void) => {
  if (typeof window === "undefined") return () => undefined

  const syncUser = () => callback(getDemoUser())
  window.addEventListener(DEMO_AUTH_EVENT, syncUser)
  window.addEventListener("storage", syncUser)

  return () => {
    window.removeEventListener(DEMO_AUTH_EVENT, syncUser)
    window.removeEventListener("storage", syncUser)
  }
}
