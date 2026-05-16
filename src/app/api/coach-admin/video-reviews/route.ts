import { NextRequest, NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { getStripeClient } from "@/lib/stripe";
import { sendEmail } from "@/lib/resend";

export const runtime = "nodejs";
export const maxDuration = 15;

export async function GET(request: NextRequest) {
  if (!ensureSameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const actor = await requireCoachAdminActor();
  if (!actor) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const reviews = await prisma.videoReview.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ reviews });
}

export async function POST(request: NextRequest) {
  if (!ensureSameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const actor = await requireCoachAdminActor();
  if (!actor || actor.session.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({})) as { reviewId?: string; action?: string };
  const { reviewId, action } = body;

  if (!reviewId || !action) return NextResponse.json({ error: "reviewId and action required" }, { status: 400 });

  const review = await prisma.videoReview.findUnique({ where: { id: reviewId } });
  if (!review) return NextResponse.json({ error: "Review not found" }, { status: 404 });

  if (action === "reject") {
    await prisma.videoReview.update({ where: { id: reviewId }, data: { status: "rejected" } });
    return NextResponse.json({ ok: true });
  }

  if (action === "approve") {
    if (review.creditGranted) return NextResponse.json({ error: "Credit already granted" }, { status: 409 });

    // Find user's subscription to grant a free month
    const user = await prisma.user.findUnique({
      where: { id: review.userId },
      select: { email: true, firstName: true, accounts: { select: { subscription: { select: { stripeCustomerId: true, stripeSubscriptionId: true, currentPeriodEnd: true } } } } },
    });

    const subscription = user?.accounts?.[0]?.subscription;

    if (subscription?.stripeSubscriptionId) {
      const stripe = getStripeClient();

      // Extend trial_end (or current period end) by 30 days
      const currentEnd = subscription.currentPeriodEnd
        ? Math.floor(subscription.currentPeriodEnd.getTime() / 1000)
        : Math.floor(Date.now() / 1000);
      const newEnd = currentEnd + 30 * 24 * 60 * 60;

      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        trial_end: newEnd,
        proration_behavior: "none",
      });
    }

    await prisma.videoReview.update({
      where: { id: reviewId },
      data: { status: "approved", creditGranted: true },
    });

    // Notify user
    if (user?.email) {
      await sendEmail({
        to: user.email,
        subject: "Your free month is ready — thank you for the video!",
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0F172A;max-width:480px;">
            <h2 style="font-size:20px;font-weight:800;margin-bottom:8px;">Your free month is confirmed.</h2>
            <p style="color:#475569;">Hey ${user.firstName ?? "there"} — we watched your video. Thank you, genuinely.</p>
            <p style="color:#475569;">One free month has been added to your Zari account. You'll see the updated billing date reflected in your next invoice.</p>
            <p style="color:#475569;">If you have questions, just reply here.</p>
          </div>
        `,
      }).catch(() => null);
    }

    await prisma.appEvent.create({
      data: {
        userId: review.userId,
        eventName: "video_review_approved",
        metadataJson: { reviewId, videoUrl: review.videoUrl, creditGranted: true },
      },
    }).catch(() => null);

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
