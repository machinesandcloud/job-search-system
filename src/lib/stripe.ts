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

function firstDefinedEnv(keys: string[]) {
  for (const key of keys) {
    const value = process.env[key];
    if (value) return value;
  }
  return null;
}

export function getStripeSubscriptionPriceId(planId?: string | null) {
  const normalized = `${planId || ""}`.trim().toLowerCase();

  if (normalized === "search") {
    return firstDefinedEnv(["STRIPE_PRICE_ID_SEARCH_MONTHLY", "STRIPE_PRICE_ID_SEARCH"]);
  }

  if (normalized === "growth" || normalized === "pro") {
    return firstDefinedEnv([
      "STRIPE_PRICE_ID_GROWTH_MONTHLY",
      "STRIPE_PRICE_ID_GROWTH",
      "STRIPE_PRICE_ID_MONTHLY",
      "STRIPE_SUBSCRIPTION_PRICE_ID",
      "STRIPE_PRICE_ID",
    ]);
  }

  if (normalized === "executive" || normalized === "premium" || normalized === "team") {
    return firstDefinedEnv(["STRIPE_PRICE_ID_EXECUTIVE_MONTHLY", "STRIPE_PRICE_ID_EXECUTIVE"]);
  }

  return firstDefinedEnv(["STRIPE_PRICE_ID_MONTHLY", "STRIPE_SUBSCRIPTION_PRICE_ID", "STRIPE_PRICE_ID"]);
}
