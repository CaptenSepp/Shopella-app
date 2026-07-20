export { focusRingClass } from "@/components/ui/focus-tools"

export type LoginFormValues = {
  name: string
  email: string
  password: string
}

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>

export const validateLoginForm = (values: LoginFormValues, requiresName = true): LoginFormErrors => {
  const errors: LoginFormErrors = {}
  const name = values.name.trim() // ignore outer spaces
  const email = values.email.trim() // ignore outer spaces
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // simple email check

  if (requiresName && !name) errors.name = "Name is required."
  else if (requiresName && name.length < 2) errors.name = "Name must be at least 2 characters."
  if (!email) errors.email = "Email is required."
  else if (!emailRegex.test(email)) errors.email = "Enter a valid email address."
  if (!values.password) errors.password = "Password is required."
  else if (values.password.length < 8) errors.password = "Password must be at least 8 characters."
  return errors
}
