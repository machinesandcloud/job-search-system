import type Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import {
  buildSubscriptionSnapshot,
  canAccessSubscriptionStatus,
  getPricingCatalogPlanId,
  mapStripeStatusToAccountStatus,
  syncCurrentUserToBillingIdentity,
  syncMvpUserToBillingIdentity,
} from "@/lib/billing";
import { getStripeClient } from "@/lib/stripe";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";

function mapPlanTier(planName?: string | null, priceId?: string | null) {
  const planId = getPricingCatalogPlanId(planName, priceId);
  if (planId === "growth") return "pro" as const;
  if (planId === "executive") return "premium" as const;
  if (planId === "search") return "free" as const;

  const normalized = `${planName || ""} ${priceId || ""}`.toLowerCase();
  if (normalized.includes("premium")) return "premium" as const;
  if (normalized.includes("team")) return "team" as const;
  if (normalized.includes("pro") || normalized.includes("monthly")) return "pro" as const;
  return "free" as const;
}

async function syncUsersForAccount(accountId: string, planTier: "free" | "pro" | "premium" | "team") {
  await prisma.user.updateMany({
    where: { accountId },
    data: { planTier },
  });
}

async function resolveAccountId(input: {
  metadataAccountId?: string | null;
  stripeSubscriptionId?: string | null;
  stripeCustomerId?: string | null;
  externalAuthId?: string | null;
  customerEmail?: string | null;
}) {
  if (input.metadataAccountId) return input.metadataAccountId;

  if (input.stripeSubscriptionId) {
    const bySubscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: input.stripeSubscriptionId },
    });
    if (bySubscription?.accountId) return bySubscription.accountId;
  }

  if (input.stripeCustomerId) {
    const byCustomer = await prisma.subscription.findUnique({
      where: { stripeCustomerId: input.stripeCustomerId },
    });
    if (byCustomer?.accountId) return byCustomer.accountId;
  }

  if (input.externalAuthId) {
    const identity = await syncMvpUserToBillingIdentity(input.externalAuthId);
    if (identity?.account?.id) return identity.account.id;
  }

  if (input.customerEmail) {
    const user = await prisma.user.findUnique({
      where: { email: input.customerEmail.toLowerCase() },
    });
    if (user?.accountId) return user.accountId;
    if (user) {
      const account = await prisma.account.findFirst({
        where: { ownerUserId: user.id },
      });
      if (account?.id) return account.id;
    }
  }

  return null;
}

async function upsertSubscription(accountId: string, subscription: Stripe.Subscription) {
  const snapshot = buildSubscriptionSnapshot(subscription);
  const record = await prisma.subscription.upsert({
    where: { accountId },
    update: snapshot,
    create: {
      accountId,
      ...snapshot,
    },
  });

  await prisma.account.update({
    where: { id: accountId },
    data: {
      status: mapStripeStatusToAccountStatus(snapshot.status),
      paymentIssue: snapshot.paymentIssue,
    },
  });

  await syncUsersForAccount(accountId, mapPlanTier(record.planName, record.stripePriceId));
  return record;
}

export async function POST(request: NextRequest) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  if (!isDatabaseReady()) {
    return NextResponse.json({ error: "Billing database is not configured." }, { status: 503 });
  }

  const identity = await syncCurrentUserToBillingIdentity();
  if (!identity) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  if (identity.subscription && canAccessSubscriptionStatus(identity.subscription.status)) {
    return NextResponse.json({ ok: true, ready: true, source: "existing" });
  }

  const body = (await request.json().catch(() => ({}))) as { sessionId?: string };
  const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
  if (!sessionId) {
    return NextResponse.json({ error: "Checkout session id missing." }, { status: 400 });
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Stripe is not configured.";
    return NextResponse.json({ error: message }, { status: 501 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["subscription"],
  });

  if (session.mode !== "subscription") {
    return NextResponse.json({ error: "Checkout session is not a subscription session." }, { status: 400 });
  }

  const accountId =
    (await resolveAccountId({
      metadataAccountId: session.metadata?.accountId || session.client_reference_id,
      stripeCustomerId: typeof session.customer === "string" ? session.customer : session.customer?.id || null,
      stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : session.subscription?.id || null,
      externalAuthId: session.metadata?.externalAuthId || null,
      customerEmail: session.customer_details?.email || session.customer_email || null,
    })) || identity.account.id;

  if (accountId !== identity.account.id && identity.user.role !== "admin" && identity.user.role !== "support") {
    return NextResponse.json({ error: "Checkout session does not belong to the signed-in account." }, { status: 403 });
  }

  const subscriptionCandidate = session.subscription;
  if (!subscriptionCandidate) {
    return NextResponse.json({ ok: false, ready: false, status: "processing" }, { status: 202 });
  }

  const subscription =
    typeof subscriptionCandidate === "string"
      ? await stripe.subscriptions.retrieve(subscriptionCandidate)
      : subscriptionCandidate;

  await upsertSubscription(accountId, subscription);

  return NextResponse.json({
    ok: true,
    ready: canAccessSubscriptionStatus(subscription.status),
    status: subscription.status,
  });
}
