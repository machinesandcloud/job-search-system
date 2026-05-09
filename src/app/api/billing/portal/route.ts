import { NextRequest, NextResponse } from "next/server";
import { ensureSameOrigin } from "@/lib/utils";
import { syncCurrentUserToBillingIdentity } from "@/lib/billing";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";
export const maxDuration = 15;

export async function POST(request: NextRequest) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const identity = await syncCurrentUserToBillingIdentity().catch(() => null);
  if (!identity) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const stripeCustomerId = identity.subscription?.stripeCustomerId;
  if (!stripeCustomerId) {
    return NextResponse.json({ error: "No billing account found." }, { status: 400 });
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Stripe is not configured.";
    return NextResponse.json({ error: message }, { status: 501 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${request.nextUrl.origin}/dashboard`,
  });

  return NextResponse.json({ url: session.url });
}
