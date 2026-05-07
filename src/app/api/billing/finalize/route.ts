import type Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import {
  buildSubscriptionSnapshot,
  canAccessSubscriptionStatus,
  getCheckoutCompletionAccessStatus,
  mapStripeStatusToAccountStatus,
  syncCurrentUserToBillingIdentity,
  syncMvpUserToBillingIdentity,
} from "@/lib/billing";
import { getStripeClient } from "@/lib/stripe";
import { mapStripePlanTier, syncStripeSubscriptionToAccount, syncUsersForAccountPlan } from "@/lib/subscription-sync";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime     = "nodejs";
export const maxDuration = 30;

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

async function reconcileSignedInUserToAccount(input: {
  userId: string;
  currentAccountId: string;
  targetAccountId: string;
  expectedEmail?: string | null;
}) {
  if (input.currentAccountId === input.targetAccountId) return true;

  const [user, targetAccount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: input.userId },
      select: { id: true, email: true, role: true, accountId: true },
    }),
    prisma.account.findUnique({
      where: { id: input.targetAccountId },
      select: { id: true, ownerUserId: true },
    }),
  ]);

  if (!user || !targetAccount) return false;
  if (user.role === "admin" || user.role === "support") return true;

  const normalizedExpectedEmail = `${input.expectedEmail || ""}`.trim().toLowerCase();
  const emailMatches = !normalizedExpectedEmail || user.email.toLowerCase() === normalizedExpectedEmail;
  const ownershipMatches = targetAccount.ownerUserId === user.id;

  if (!emailMatches && !ownershipMatches) return false;

  await prisma.user.update({
    where: { id: user.id },
    data: { accountId: targetAccount.id },
  });

  return true;
}

async function getCurrentReadyState(input: {
  expectedAccountId: string;
}) {
  const refreshedIdentity = await syncCurrentUserToBillingIdentity().catch(() => null);
  const fallbackSubscription = await prisma.subscription.findUnique({
    where: { accountId: input.expectedAccountId },
  }).catch(() => null);
  const activeSubscription =
    refreshedIdentity?.account?.id === input.expectedAccountId
      ? refreshedIdentity?.subscription || fallbackSubscription
      : fallbackSubscription;

  return {
    identity: refreshedIdentity,
    subscription: activeSubscription,
    ready:
      refreshedIdentity?.account?.id === input.expectedAccountId &&
      canAccessSubscriptionStatus(activeSubscription?.status),
  };
}

async function forceSyncSubscriptionSnapshot(
  accountId: string,
  subscription: Stripe.Subscription,
) {
  const snapshot = buildSubscriptionSnapshot(subscription);

  await prisma.$transaction(async (tx: any) => {
    await tx.subscription.deleteMany({
      where: {
        OR: [
          { stripeCustomerId: snapshot.stripeCustomerId },
          { stripeSubscriptionId: snapshot.stripeSubscriptionId },
        ],
        NOT: { accountId },
      },
    });

    await tx.subscription.upsert({
      where: { accountId },
      update: snapshot,
      create: {
        accountId,
        ...snapshot,
      },
    });

    await tx.account.update({
      where: { id: accountId },
      data: {
        status: mapStripeStatusToAccountStatus(snapshot.status),
        paymentIssue: snapshot.paymentIssue,
      },
    });
  });

  await syncUsersForAccountPlan(accountId, mapStripePlanTier(snapshot.planName, snapshot.stripePriceId));
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

  if (accountId !== identity.account.id) {
    const reconciled = await reconcileSignedInUserToAccount({
      userId: identity.user.id,
      currentAccountId: identity.account.id,
      targetAccountId: accountId,
      expectedEmail: session.customer_details?.email || session.customer_email || identity.user.email,
    });

    if (!reconciled) {
      return NextResponse.json({ error: "Checkout session does not belong to the signed-in account." }, { status: 403 });
    }
  }

  if (identity.user.role !== "admin" && identity.user.role !== "support") {
    await prisma.user.update({
      where: { id: identity.user.id },
      data: { accountId },
    }).catch(() => null);
  }

  const subscriptionCandidate = session.subscription;
  if (!subscriptionCandidate) {
    return NextResponse.json({ ok: false, ready: false, status: "processing" }, { status: 202 });
  }

  const subscription =
    typeof subscriptionCandidate === "string"
      ? await stripe.subscriptions.retrieve(subscriptionCandidate)
      : subscriptionCandidate;

  const effectiveStripeStatus =
    getCheckoutCompletionAccessStatus({
      subscriptionStatus: subscription.status,
      sessionStatus: session.status,
      sessionPaymentStatus: session.payment_status,
      trialEnd: subscription.trial_end,
    }) || subscription.status;

  let syncFailed = false;
  try {
    await syncStripeSubscriptionToAccount(accountId, subscription, {
      status: effectiveStripeStatus,
    });
  } catch (error) {
    syncFailed = true;
    console.error("[billing/finalize] failed to sync subscription", {
      accountId,
      sessionId,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id || null,
      error,
    });
    try {
      const snapshotForFallback = {
        ...subscription,
        status: effectiveStripeStatus,
      } as Stripe.Subscription;
      await forceSyncSubscriptionSnapshot(accountId, snapshotForFallback);
      syncFailed = false;
    } catch (fallbackError) {
      console.error("[billing/finalize] fallback sync failed", {
        accountId,
        sessionId,
        stripeSubscriptionId: subscription.id,
        fallbackError,
      });
    }
  }

  const currentState = await getCurrentReadyState({ expectedAccountId: accountId });
  const effectiveStatus = currentState.subscription?.status || effectiveStripeStatus;
  const effectiveReady = canAccessSubscriptionStatus(effectiveStatus);

  if (currentState.ready || effectiveReady) {
    return NextResponse.json({
      ok: true,
      ready: true,
      status: effectiveStatus,
      accountId,
    });
  }

  return NextResponse.json({
    ok: !syncFailed,
    ready: false,
    status: currentState.subscription?.status || subscription.status,
    accountId,
    processing: true,
  }, { status: 202 });
}
