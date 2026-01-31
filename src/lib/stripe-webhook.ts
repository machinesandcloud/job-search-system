import Stripe from "stripe";

const stripe = new Stripe("sk_test_123");

export function verifyStripeSignature(payload: string, signature: string, secret: string) {
  return stripe.webhooks.constructEvent(payload, signature, secret);
}
