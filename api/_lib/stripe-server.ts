import Stripe from "stripe"

let stripeClient: Stripe | undefined

export const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) throw new Error("Stripe test mode is not configured.")
  stripeClient ??= new Stripe(secretKey)
  return stripeClient
}

export const assertStripeTestMode = () => {
  if (!process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_")) {
    throw new Error("This demo accepts Stripe test-mode keys only.")
  }
}
