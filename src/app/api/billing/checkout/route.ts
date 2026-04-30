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

  const identity = await syncCurrentUserToBillingIdentity();
  if (!identity) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const existingSubscription = identity.subscription;
  if (existingSubscription && ["active", "trialing"].includes(existingSubscription.status)) {
    return NextResponse.json({ error: "An active subscription already exists for this account." }, { status: 409 });
  }

  const priceId = getStripeSubscriptionPriceId();
  if (!priceId) {
    return NextResponse.json({ error: "Monthly Stripe price is not configured." }, { status: 501 });
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Stripe is not configured." }, { status: 501 });
  }

  const trialDays = Number.parseInt(process.env.STRIPE_TRIAL_DAYS || "", 10);
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: getBillingSuccessUrl(),
    cancel_url: getBillingCancelUrl(),
    allow_promotion_codes: true,
    client_reference_id: identity.account.id,
    metadata: {
      accountId: identity.account.id,
      userId: identity.user.id,
      externalAuthId: identity.mvpUser.id,
    },
    ...(existingSubscription?.stripeCustomerId
      ? { customer: existingSubscription.stripeCustomerId }
      : { customer_email: identity.user.email }),
    subscription_data: {
      metadata: {
        accountId: identity.account.id,
        userId: identity.user.id,
        externalAuthId: identity.mvpUser.id,
      },
      ...(Number.isFinite(trialDays) && trialDays > 0 ? { trial_period_days: trialDays } : {}),
    },
  });

  await logAppEvent("checkout_started", {
    accountId: identity.account.id,
    userId: identity.user.id,
    metadataJson: {
      sessionId: session.id,
      priceId,
      mode: "subscription",
    },
  });

  return NextResponse.json({ url: session.url, sessionId: session.id });
}
