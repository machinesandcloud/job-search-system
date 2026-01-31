import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export function getStripePriceId() {
  const price = process.env.STRIPE_PRICE_ID;
  if (!price) {
    return null;
  }
  return price;
}
