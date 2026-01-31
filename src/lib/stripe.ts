import Stripe from "stripe";

export function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Stripe secret key missing");
  }
  return new Stripe(key);
}

export function getStripePriceId() {
  const price = process.env.STRIPE_PRICE_ID;
  if (!price) {
    return null;
  }
  return price;
}
