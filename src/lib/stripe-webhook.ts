import Stripe from "stripe";

export function verifyStripeSignature(payload: string, signature: string, secret: string) {
  // constructEvent is pure HMAC — no Stripe API call is made, so the key is
  // only needed to satisfy the client constructor; it is never sent to Stripe.
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder");
  return stripe.webhooks.constructEvent(payload, signature, secret);
}
