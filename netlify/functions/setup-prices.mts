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

export default async function handler(request: Request) {
  // Auth gate — must send the admin password
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

    // Create new monthly prices
    const monthly: Record<string, string> = {};
    const monthlyConfigs: Record<string, { amount: number; nickname: string }> = {
      search:    { amount: 2900,   nickname: "Search Monthly $29" },
      growth:    { amount: 9900,   nickname: "Growth Monthly $99" },
      executive: { amount: 24900,  nickname: "Executive Monthly $249" },
    };
    for (const [plan, cfg] of Object.entries(monthlyConfigs)) {
      const price = await stripe.prices.create({
        product: productIds[plan],
        unit_amount: cfg.amount,
        currency: "usd",
        recurring: { interval: "month" },
        nickname: cfg.nickname,
        lookup_key: `${plan}_monthly_v2`,
        transfer_lookup_key: true,
      });
      monthly[plan] = price.id;
    }

    // Create new annual prices
    const annual: Record<string, string> = {};
    const annualConfigs: Record<string, { amount: number; nickname: string }> = {
      search:    { amount: 27600,  nickname: "Search Annual $276" },
      growth:    { amount: 94800,  nickname: "Growth Annual $948" },
      executive: { amount: 238800, nickname: "Executive Annual $2388" },
    };
    for (const [plan, cfg] of Object.entries(annualConfigs)) {
      const price = await stripe.prices.create({
        product: productIds[plan],
        unit_amount: cfg.amount,
        currency: "usd",
        recurring: { interval: "year" },
        nickname: cfg.nickname,
        lookup_key: `${plan}_annual_v2`,
        transfer_lookup_key: true,
      });
      annual[plan] = price.id;
    }

    // Archive old monthly prices
    for (const priceId of Object.values(OLD_PRICE_IDS)) {
      await stripe.prices.update(priceId, { active: false });
    }

    return new Response(JSON.stringify({ ok: true, monthly, annual, productIds }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
