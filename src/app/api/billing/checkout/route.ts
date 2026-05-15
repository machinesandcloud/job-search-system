import { NextRequest, NextResponse } from "next/server";
import { getStripeClient, getStripeSubscriptionPriceId } from "@/lib/stripe";
import { ensureSameOrigin } from "@/lib/utils";
import {
  getBillingCancelUrl,
  getBillingSuccessUrl,
  logAppEvent,
  syncCurrentUserToBillingIdentity,
} from "@/lib/billing";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = (await request.json().catch(() => ({}))) as { planId?: string; billing?: string };
  const requestedPlanId = typeof body.planId === "string" ? body.planId.trim().toLowerCase() : null;
  const requestedBilling: "monthly" | "annual" = body.billing === "annual" ? "annual" : "monthly";

  const identity = await syncCurrentUserToBillingIdentity();
  if (!identity) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const existingSubscription = identity.subscription;
  if (existingSubscription && ["active", "trialing"].includes(existingSubscription.status)) {
    return NextResponse.json({ error: "An active subscription already exists for this account." }, { status: 409 });
  }

  const priceId = getStripeSubscriptionPriceId(requestedPlanId, requestedBilling);
  if (!priceId) {
    return NextResponse.json(
      { error: requestedPlanId ? `Stripe price for plan "${requestedPlanId}" is not configured.` : "Monthly Stripe price is not configured." },
      { status: 501 }
    );
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Stripe is not configured.";
    return NextResponse.json({ error: message }, { status: 501 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${getBillingSuccessUrl(request.nextUrl.origin)}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: getBillingCancelUrl(request.nextUrl.origin),
    allow_promotion_codes: true,
    client_reference_id: identity.account.id,
    metadata: {
      accountId: identity.account.id,
      userId: identity.user.id,
      externalAuthId: identity.mvpUser?.id || identity.user.id,
      requestedPlanId: requestedPlanId || "default",
      billing: requestedBilling,
    },
    ...(existingSubscription?.stripeCustomerId
      ? { customer: existingSubscription.stripeCustomerId }
      : { customer_email: identity.user.email }),
    subscription_data: {
      metadata: {
        accountId: identity.account.id,
        userId: identity.user.id,
        externalAuthId: identity.mvpUser?.id || identity.user.id,
        requestedPlanId: requestedPlanId || "default",
        billing: requestedBilling,
      },
    },
  });

  await logAppEvent("checkout_started", {
    accountId: identity.account.id,
    userId: identity.user.id,
    metadataJson: {
      sessionId: session.id,
      priceId,
      requestedPlanId,
      billing: requestedBilling,
      mode: "subscription",
    },
  });

  return NextResponse.json({ url: session.url, sessionId: session.id });
}
