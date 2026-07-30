"use client"

import { useRef, useState } from "react"
import { useAppDispatch } from "@/app/store"
import { setUser } from "@/features/auth/authSlice"
import { signIn, signUp } from "@/features/auth/auth-service"
import LoginField from "./LoginField"
import { focusRingClass, type LoginFormErrors, type LoginFormValues, validateLoginForm } from "@/features/auth/login-tools"

type AuthMode = "sign-in" | "sign-up"

const AuthForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const dispatch = useAppDispatch()
  const [mode, setMode] = useState<AuthMode>("sign-in")
  const [values, setValues] = useState<LoginFormValues>({ name: "", email: "", password: "" })
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [requestError, setRequestError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const emailInputRef = useRef<HTMLInputElement | null>(null)
  const passwordInputRef = useRef<HTMLInputElement | null>(null)

  const updateField = (field: keyof LoginFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const submit = async () => {
    const nextErrors = validateLoginForm(values, mode === "sign-up")
    setErrors(nextErrors)
    if (nextErrors.name) return nameInputRef.current?.focus()
    if (nextErrors.email) return emailInputRef.current?.focus()
    if (nextErrors.password) return passwordInputRef.current?.focus()

    setRequestError("")
    setIsSubmitting(true)
    try {
      const email = values.email.trim().toLowerCase()
      const user = mode === "sign-up"
        ? await signUp(values.name.trim(), email, values.password)
        : await signIn(email, values.password)
      if (!user) throw new Error("The account could not be loaded.")
      dispatch(setUser(user))
      onSuccess()
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : "Authentication failed.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode)
    setErrors({})
    setRequestError("")
  }

  return (
    <div className="auth-form">
      <div className="auth-form__tabs" aria-label="Account action">
        <button type="button" className={`auth-form__tab ${mode === "sign-in" ? "auth-form__tab--active" : ""}`} onClick={() => changeMode("sign-in")}>Sign in</button>
        <button type="button" className={`auth-form__tab ${mode === "sign-up" ? "auth-form__tab--active" : ""}`} onClick={() => changeMode("sign-up")}>Create account</button>
      </div>

      <form onSubmit={(event) => { event.preventDefault(); if (!isSubmitting) void submit() }} noValidate>
        {requestError ? <p className="auth-form__error" role="alert">{requestError}</p> : null}
        {mode === "sign-up" ? <LoginField id="name" label="Name" value={values.name} inputRef={nameInputRef} onChange={(value) => updateField("name", value)} onBlur={() => undefined} error={errors.name} describedBy="login-name-error" /> : null}
        <LoginField id="email" label="Email" value={values.email} inputRef={emailInputRef} onChange={(value) => updateField("email", value)} onBlur={() => undefined} error={errors.email} describedBy="login-email-error" type="email" />
        <LoginField id="password" label="Password" value={values.password} inputRef={passwordInputRef} onChange={(value) => updateField("password", value)} onBlur={() => undefined} error={errors.password} describedBy="login-password-error" type="password" />
        <button type="submit" className={`submit-button ${focusRingClass}`} disabled={isSubmitting}>{isSubmitting ? "Please wait..." : mode === "sign-up" ? "Create account" : "Sign in"}</button>
      </form>
    </div>
  )
}

export default AuthForm
