import { NextRequest, NextResponse } from "next/server";
import { getCurrentPeriodTokenUsage, getCurrentSubscriptionAccess } from "@/lib/billing";
import { getStripeClient } from "@/lib/stripe";
import { syncStripeSubscriptionToAccount } from "@/lib/subscription-sync";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  let access = await getCurrentSubscriptionAccess();

  const sessionId =
    request.nextUrl.searchParams.get("session_id") ||
    request.nextUrl.searchParams.get("sessionId");

  if (!access.ok && access.status === 402 && sessionId && access.account) {
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
        await syncStripeSubscriptionToAccount(access.account.id, subscription);
        access = await getCurrentSubscriptionAccess();
      }
    } catch (error) {
      console.error("[billing/status] unable to reconcile subscription during status poll", {
        sessionId,
        accountId: access.account.id,
        error,
      });
    }
  }

  if (!access.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: access.error,
        subscriptionStatus: access.subscription?.status || null,
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
