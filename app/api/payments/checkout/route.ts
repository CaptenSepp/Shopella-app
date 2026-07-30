import { authenticateRequest } from "../../../../api/_lib/supabase-server"
import { assertStripeTestMode, getStripe } from "../../../../api/_lib/stripe-server"

export async function POST(request: Request) {
  try {
    assertStripeTestMode()
    const { supabase, user } = await authenticateRequest({
      method: "POST",
      headers: { authorization: request.headers.get("authorization") ?? undefined },
    } as never)
    const { orderId } = await request.json() as { orderId?: string }
    if (!orderId) return Response.json({ message: "Order ID is required." }, { status: 400 })

    const result = await supabase.from("orders").select("*").eq("id", orderId).eq("user_id", user.id).eq("status", "pending").single()
    if (result.error || !result.data) return Response.json({ message: "Pending order was not found." }, { status: 404 })

    const origin = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: `Shopella order ${orderId}` },
          unit_amount: Math.round(Number(result.data.total) * 100),
        },
        quantity: 1,
      }],
      metadata: { orderId, userId: user.id },
      payment_intent_data: { metadata: { orderId } },
      success_url: `${origin}/order-confirmation?orderId=${orderId}&payment=success`,
      cancel_url: `${origin}/checkout?payment=cancelled`,
    }, { idempotencyKey: `checkout:${orderId}` })

    return Response.json({ url: session.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment could not be started."
    return Response.json({ message }, { status: message.includes("sign in") ? 401 : 400 })
  }
}
