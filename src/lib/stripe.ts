import Stripe from 'stripe'

// Stripe client — server-side only
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
})

export async function createPaymentIntent(
  amountCents: number,
  metadata: { listing_id: string; guest_id: string; booking_id: string }
) {
  return stripe.paymentIntents.create({
    amount: amountCents,
    currency: 'usd',
    metadata,
    automatic_payment_methods: { enabled: true },
  })
}
