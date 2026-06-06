import type { Config } from "@netlify/functions";
import Stripe from "stripe";

export const config: Config = {
  path: "/api/setup-prices",
};

const OLD_PRICE_IDS = {
  search:    "price_1TS150JW47xiUUpYGtwVk1tH",
  growth:    "price_1TS15QJW47xiUUpYZqkDj6h2",
  executive: "price_1TS15vJW47xiUUpYFhRx5NzK",
};

const MONTHLY_CONFIGS: Record<string, { amount: number; nickname: string; lookupKey: string }> = {
  search:    { amount: 2900,   nickname: "Search Monthly $29",     lookupKey: "search_monthly_v2" },
  growth:    { amount: 9900,   nickname: "Growth Monthly $99",     lookupKey: "growth_monthly_v2" },
  executive: { amount: 24900,  nickname: "Executive Monthly $249", lookupKey: "executive_monthly_v2" },
};

const ANNUAL_CONFIGS: Record<string, { amount: number; nickname: string; lookupKey: string }> = {
  search:    { amount: 27600,  nickname: "Search Annual $276",     lookupKey: "search_annual_v2" },
  growth:    { amount: 94800,  nickname: "Growth Annual $948",     lookupKey: "growth_annual_v2" },
  executive: { amount: 238800, nickname: "Executive Annual $2388", lookupKey: "executive_annual_v2" },
};

async function getOrCreatePrice(
  stripe: Stripe,
  productId: string,
  cfg: { amount: number; nickname: string; lookupKey: string },
  interval: "month" | "year",
): Promise<string> {
  // Check if a price with this lookup key already exists
  const existing = await stripe.prices.list({ lookup_keys: [cfg.lookupKey], limit: 1 });
  if (existing.data.length > 0) {
    return existing.data[0].id;
  }
  // Create fresh
  const price = await stripe.prices.create({
    product: productId,
    unit_amount: cfg.amount,
    currency: "usd",
    recurring: { interval },
    nickname: cfg.nickname,
    lookup_key: cfg.lookupKey,
    transfer_lookup_key: true,
  });
  return price.id;
}

export default async function handler(request: Request) {
  const auth = request.headers.get("x-admin-password") || "";
  const expected = process.env.COACH_ADMIN_PASSWORD || "";
  if (!expected || auth !== expected) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return new Response(JSON.stringify({ error: "STRIPE_SECRET_KEY not set" }), { status: 500 });
  }

  const stripe = new Stripe(stripeKey, { maxNetworkRetries: 2 });

  try {
    // Fetch product IDs from existing prices
    const productIds: Record<string, string> = {};
    for (const [plan, priceId] of Object.entries(OLD_PRICE_IDS)) {
      const price = await stripe.prices.retrieve(priceId);
      productIds[plan] = typeof price.product === "string" ? price.product : price.product.id;
    }

    // Get or create monthly prices
    const monthly: Record<string, string> = {};
    for (const [plan, cfg] of Object.entries(MONTHLY_CONFIGS)) {
      monthly[plan] = await getOrCreatePrice(stripe, productIds[plan], cfg, "month");
    }

    // Get or create annual prices
    const annual: Record<string, string> = {};
    for (const [plan, cfg] of Object.entries(ANNUAL_CONFIGS)) {
      annual[plan] = await getOrCreatePrice(stripe, productIds[plan], cfg, "year");
    }

    // Archive old prices — skip if they are a product's default price
    const archiveResults: Record<string, string> = {};
    for (const [plan, priceId] of Object.entries(OLD_PRICE_IDS)) {
      try {
        await stripe.prices.update(priceId, { active: false });
        archiveResults[plan] = "archived";
      } catch (err: unknown) {
        archiveResults[plan] = err instanceof Error ? err.message : "skipped";
      }
    }

    return new Response(JSON.stringify({ ok: true, monthly, annual, productIds, archiveResults }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
