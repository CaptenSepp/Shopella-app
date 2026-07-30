import { useNavigate, useSearchParams } from "react-router-dom"
import AuthForm from "../components/AuthForm"

type LoginPageProps = { onSuccess?: () => void }

const LoginPage = ({ onSuccess }: LoginPageProps) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectPath = searchParams.get("redirect") || "/account"

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="login-box__title">Your Shopella account</h1>
        <p className="login-box__note">Sign in to check out and view your saved orders.</p>
        <AuthForm onSuccess={() => { onSuccess?.(); navigate(redirectPath, { replace: true }) }} />
      </div>
    </div>
  )
}

export default LoginPage
