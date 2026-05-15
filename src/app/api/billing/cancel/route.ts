import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { syncCurrentUserToBillingIdentity, logAppEvent } from "@/lib/billing";
import { getStripeClient } from "@/lib/stripe";
import { prisma, isDatabaseReady } from "@/lib/db";
import { onUserChurned } from "@/lib/zoho-engine";

export const runtime = "nodejs";
export const maxDuration = 30;

const VALID_REASONS = ["too_expensive", "not_useful", "missing_feature", "got_job", "other"] as const;
type CancelReason = (typeof VALID_REASONS)[number];

// POST /api/billing/cancel
// Body: { reason, comment?, acceptOffer? }
//   acceptOffer: true  → apply 50% coupon for 1 month, do NOT cancel
//   acceptOffer: false → cancel at period end
export async function POST(request: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await request.json().catch(() => ({})) as {
    reason?: string;
    comment?: string;
    acceptOffer?: boolean;
  };

  const reason: CancelReason = VALID_REASONS.includes(body.reason as CancelReason)
    ? (body.reason as CancelReason)
    : "other";
  const comment = typeof body.comment === "string" ? body.comment.trim().slice(0, 1000) : null;
  const acceptOffer = body.acceptOffer === true;

  const identity = await syncCurrentUserToBillingIdentity().catch(() => null);
  const { user, account, subscription } = identity ?? {};

  if (!subscription?.stripeSubscriptionId) {
    return NextResponse.json({ error: "No active subscription found." }, { status: 400 });
  }
  if (subscription.status !== "active" && subscription.status !== "trialing") {
    return NextResponse.json({ error: "Subscription is not active." }, { status: 400 });
  }

  // Always save the exit-intent survey
  if (isDatabaseReady() && account) {
    try {
      await prisma.churnSurvey.create({
        data: {
          userId: userId,
          email: user?.email ?? "",
          reason,
          comment,
          offerShown: true,
          offerAccepted: acceptOffer,
        },
      });
    } catch { /* non-fatal */ }

    try {
      await logAppEvent("cancel_survey_submitted", {
        accountId: account.id,
        userId,
        metadataJson: { reason, hasComment: Boolean(comment), acceptOffer },
      });
    } catch { /* non-fatal */ }
  }

  // ── Offer accepted: apply 50% coupon for 1 month instead of canceling ─────
  if (acceptOffer) {
    try {
      const stripe = getStripeClient();

      let coupon;
      try {
        coupon = await stripe.coupons.retrieve("ZARI_SAVE50_ONCE");
      } catch {
        coupon = await stripe.coupons.create({
          id: "ZARI_SAVE50_ONCE",
          percent_off: 50,
          duration: "once",
          name: "50% off — we want you to stay",
        });
      }

      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        discounts: [{ coupon: coupon.id }],
      });

      if (account) {
        await logAppEvent("cancel_offer_accepted", {
          accountId: account.id,
          userId,
          metadataJson: { coupon: coupon.id, reason },
        });
      }

      return NextResponse.json({
        outcome: "offer_accepted",
        message: "50% off your next billing cycle has been applied. Thank you for staying.",
      });
    } catch (err) {
      console.error("[api/billing/cancel] coupon apply failed:", err);
      // Fall through to normal cancel
    }
  }

  // ── Cancel at period end ──────────────────────────────────────────────────
  try {
    const stripe = getStripeClient();
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
      metadata: {
        cancel_reason: reason,
        cancel_comment: comment?.slice(0, 500) ?? "",
        cancelled_by_user_id: userId,
        cancelled_at: new Date().toISOString(),
      },
    });

    if (isDatabaseReady()) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { cancelAtPeriodEnd: true },
      });
    }
  } catch (err) {
    console.error("[api/billing/cancel]", err);
    return NextResponse.json({ error: "Failed to cancel subscription. Please contact support." }, { status: 500 });
  }

  if (account) {
    await logAppEvent("subscription_cancel_requested", {
      accountId: account.id,
      userId,
      metadataJson: { reason, hasComment: Boolean(comment) },
    });
  }

  // Fire CRM + win-back sequences asynchronously
  if (user) {
    void onUserChurned({
      email: user.email,
      firstName: user.firstName ?? undefined,
      planTier: user.planTier,
      reason,
    });
  }

  return NextResponse.json({
    outcome: "canceled",
    message: "Your subscription will end at the current billing period.",
    periodEnd: subscription.currentPeriodEnd,
  });
}
