"use client"

import { useRouter, useSearchParams } from "next/navigation"
import AuthForm from "@/features/auth/components/AuthForm"

type LoginPageProps = { onSuccess?: () => void }

const LoginPage = ({ onSuccess }: LoginPageProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get("redirect") || "/account"

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="login-box__title">Your Shopella account</h1>
        <p className="login-box__note">Sign in to check out and view your saved orders.</p>
        <AuthForm onAdminSuccess={() => { onSuccess?.(); router.replace("/admin") }} onSuccess={() => { onSuccess?.(); router.replace(redirectPath) }} />
      </div>
    </div>
  )
}

export default LoginPage

