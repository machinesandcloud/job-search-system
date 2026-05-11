import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { ensureSameOrigin, getBaseUrl } from "@/lib/utils";
import { logAppEvent, syncCurrentUserToBillingIdentity } from "@/lib/billing";

export const runtime = "nodejs";

const TOPUP_PACKS = {
  "40":  { credits: 40,  amountCents: 2000, label: "40 Credit Top-up Pack"  },
  "120": { credits: 120, amountCents: 5000, label: "120 Credit Top-up Pack" },
  "300": { credits: 300, amountCents: 12000, label: "300 Credit Top-up Pack" },
} as const;

type PackId = keyof typeof TOPUP_PACKS;

// Custom top-up rate: 2 credits per dollar ($0.50/credit)
// Same as the small pack rate — packs are always equal or better value.
const CUSTOM_CREDITS_PER_DOLLAR = 2;

export async function POST(request: NextRequest) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    packId?: string;
    customDollars?: number;
  };

  let pack: { credits: number; amountCents: number; label: string };

  if (body.customDollars !== undefined) {
    const dollars = Math.floor(Number(body.customDollars));
    if (!Number.isFinite(dollars) || dollars < 5) {
      return NextResponse.json({ error: "Minimum custom amount is $5." }, { status: 400 });
    }
    const credits = dollars * CUSTOM_CREDITS_PER_DOLLAR;
    pack = {
      credits,
      amountCents: dollars * 100,
      label: `${credits} Credit Top-up`,
    };
  } else {
    const packId = (body.packId ?? "") as PackId;
    const found = TOPUP_PACKS[packId];
    if (!found) {
      return NextResponse.json({ error: "Invalid pack. Choose 40, 120, or 300." }, { status: 400 });
    }
    pack = found;
  }

  const identity = await syncCurrentUserToBillingIdentity();
  if (!identity) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Stripe is not configured.";
    return NextResponse.json({ error: message }, { status: 501 });
  }

  const base = request.nextUrl.origin || getBaseUrl();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: {
          name: pack.label,
          description: `Adds ${pack.credits} credits to your account. Credits are added immediately after payment.`,
        },
        unit_amount: pack.amountCents,
      },
      quantity: 1,
    }],
    success_url: `${base}/billing/success?topup=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/portal`,
    allow_promotion_codes: true,
    client_reference_id: identity.account.id,
    metadata: {
      accountId: identity.account.id,
      userId: identity.user.id,
      topup: "true",
      credits: String(pack.credits),
      ...(body.customDollars !== undefined
        ? { customDollars: String(Math.floor(Number(body.customDollars))) }
        : { packId: body.packId ?? "" }),
    },
    ...(identity.subscription?.stripeCustomerId
      ? { customer: identity.subscription.stripeCustomerId }
      : { customer_email: identity.user.email }),
  });

  await logAppEvent("topup_checkout_started", {
    accountId: identity.account.id,
    userId: identity.user.id,
    metadataJson: {
      sessionId: session.id,
      credits: pack.credits,
      amountCents: pack.amountCents,
      ...(body.customDollars !== undefined ? { custom: true } : { packId: body.packId }),
    },
  });

  return NextResponse.json({ url: session.url });
}
