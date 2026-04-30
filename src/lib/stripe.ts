import Stripe from "stripe";

export function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Stripe secret key missing");
  }
  return new Stripe(key, {
    maxNetworkRetries: 2,
  });
}

export function getStripePriceId() {
  const price = process.env.STRIPE_PRICE_ID;
  if (!price) {
    return null;
  }
  return price;
}

export function getStripeSubscriptionPriceId() {
  return process.env.STRIPE_PRICE_ID_MONTHLY || process.env.STRIPE_SUBSCRIPTION_PRICE_ID || getStripePriceId();
}
