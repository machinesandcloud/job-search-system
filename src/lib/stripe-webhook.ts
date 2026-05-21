import Stripe from "stripe";

export function verifyStripeSignature(payload: string, signature: string, secret: string) {
  // constructEvent is pure HMAC — no Stripe API call is made, so the key is
  // only needed to satisfy the Stripe client constructor; it is never sent to Stripe.
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  const stripe = new Stripe(key);
  return stripe.webhooks.constructEvent(payload, signature, secret);
}
