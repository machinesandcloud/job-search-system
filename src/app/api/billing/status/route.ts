import { NextRequest, NextResponse } from "next/server";
import {
  getCheckoutCompletionAccessStatus,
  getCurrentPeriodTokenUsage,
  getCurrentSubscriptionAccess,
} from "@/lib/billing";
import { getStripeClient } from "@/lib/stripe";
import { syncStripeSubscriptionToAccount } from "@/lib/subscription-sync";

export const runtime     = "nodejs";
export const maxDuration = 15;

export async function GET(request: NextRequest) {
  let access = await getCurrentSubscriptionAccess();

  const sessionId =
    request.nextUrl.searchParams.get("session_id") ||
    request.nextUrl.searchParams.get("sessionId");

  // Reconcile after checkout when either (a) free-tier user just paid, or
  // (b) access is denied but we still have an account to sync against (e.g.
  // subscription not yet written by the webhook when the success page polls).
  const canReconcile = sessionId && access.account &&
    ((access.ok && access.isFreeTier) || (!access.ok && "account" in access && access.account));

  if (canReconcile) {
    try {
      const stripe = getStripeClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["subscription"],
      });

      const subscriptionCandidate = session.subscription;
      const subscription =
        typeof subscriptionCandidate === "string"
          ? await stripe.subscriptions.retrieve(subscriptionCandidate)
          : subscriptionCandidate;

      if (subscription) {
        const effectiveStatus =
          getCheckoutCompletionAccessStatus({
            subscriptionStatus: subscription.status,
            sessionStatus: session.status,
            sessionPaymentStatus: session.payment_status,
            trialEnd: subscription.trial_end,
          }) || subscription.status;

        await syncStripeSubscriptionToAccount(access.account.id, subscription, {
          status: effectiveStatus,
        });
        access = await getCurrentSubscriptionAccess();
      }
    } catch (error) {
      console.error("[billing/status] unable to reconcile subscription during status poll", {
        sessionId,
        accountId: access.ok ? access.account?.id : undefined,
        error,
      });
    }
  }

  if (!access.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: access.error,
        subscriptionStatus: (access as { subscription?: { status?: string } | null }).subscription?.status ?? null,
      },
      { status: access.status }
    );
  }

  const usage = await getCurrentPeriodTokenUsage(access.account.id);
  return NextResponse.json({
    ok: true,
    account: {
      id: access.account.id,
      name: access.account.name,
      status: access.account.status,
      paymentIssue: access.account.paymentIssue,
    },
    subscription: access.subscription,
    tokenUsage: usage,
  });
}
