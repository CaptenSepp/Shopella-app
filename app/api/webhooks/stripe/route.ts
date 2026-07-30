import type Stripe from "stripe"
import { createServerSupabase } from "../../../../api/_lib/supabase-server"
import { assertStripeTestMode, getStripe } from "../../../../api/_lib/stripe-server"

export async function POST(request: Request) {
  try {
    assertStripeTestMode()
    const signature = request.headers.get("stripe-signature")
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!signature || !webhookSecret) throw new Error("Stripe webhook is not configured.")

    const stripe = getStripe()
    const event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret)
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = session.metadata?.orderId
    if (!orderId || !["checkout.session.completed", "checkout.session.async_payment_succeeded"].includes(event.type)) {
      return Response.json({ received: true })
    }

    let receiptUrl: string | undefined
    if (typeof session.payment_intent === "string") {
      const intent = await stripe.paymentIntents.retrieve(session.payment_intent, { expand: ["latest_charge"] })
      const charge = intent.latest_charge
      receiptUrl = typeof charge === "object" && charge ? charge.receipt_url ?? undefined : undefined
    }

    const result = await createServerSupabase().rpc("apply_stripe_payment", {
      stripe_event_id: event.id,
      order_id: orderId,
      payment_intent_id: String(session.payment_intent ?? ""),
      receipt_url: receiptUrl ?? null,
    })
    if (result.error) throw result.error
    return Response.json({ received: true })
  } catch {
    return Response.json({ message: "Invalid webhook." }, { status: 400 })
  }
}
