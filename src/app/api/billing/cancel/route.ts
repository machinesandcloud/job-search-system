import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { syncCurrentUserToBillingIdentity } from "@/lib/billing";
import { getStripeClient } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await request.json().catch(() => ({})) as { reason?: string };

  const identity = await syncCurrentUserToBillingIdentity().catch(() => null);
  const subscription = identity?.subscription;

  if (!subscription?.stripeSubscriptionId) {
    return NextResponse.json({ error: "No active subscription found." }, { status: 400 });
  }
  if (subscription.status !== "active" && subscription.status !== "trialing") {
    return NextResponse.json({ error: "Subscription is not active." }, { status: 400 });
  }

  try {
    const stripe = getStripeClient();
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
      metadata: {
        cancel_reason: body.reason?.slice(0, 500) ?? "",
        cancelled_by_user_id: userId,
        cancelled_at: new Date().toISOString(),
      },
    });

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { cancelAtPeriodEnd: true },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/billing/cancel]", err);
    return NextResponse.json({ error: "Failed to cancel subscription. Please contact support." }, { status: 500 });
  }
}
