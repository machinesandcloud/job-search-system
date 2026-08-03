import { NextRequest, NextResponse } from "next/server";
import { type Prisma } from "@prisma/client";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { getStripeClient } from "@/lib/stripe";
import { sendEmail } from "@/lib/resend";
import { mapStripeStatusToAccountStatus } from "@/lib/billing";
import { mapStripePlanTier, syncUsersForAccountPlan } from "@/lib/subscription-sync";

export const runtime = "nodejs";
export const maxDuration = 15;

const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

// A subscription row whose stripe ids are placeholders (comp_/pending_) is NOT a
// real Stripe subscription — it is either an admin comp or a stub. Real Stripe
// operations must be skipped for these.
function isRealStripeSub(stripeSubscriptionId?: string | null): boolean {
  return (
    !!stripeSubscriptionId &&
    !stripeSubscriptionId.startsWith("comp_") &&
    !stripeSubscriptionId.startsWith("pending_")
  );
}

function normalizeTier(tier?: string): "search" | "growth" | "executive" {
  const t = `${tier || ""}`.trim().toLowerCase();
  if (t === "search") return "search";
  if (t === "executive") return "executive";
  return "growth";
}

function tierLabel(tier: "search" | "growth" | "executive"): string {
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ accountId: string }> }
) {
  if (!ensureSameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const actor = await requireCoachAdminActor();
  if (!actor || actor.session.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { accountId } = await params;
  const body = await request.json().catch(() => ({})) as {
    type?: "months" | "discount";
    months?: number;
    discountPct?: number;
    discountMonths?: number;
    tier?: string;
    reason?: string;
  };

  const type = body.type === "discount" ? "discount" : "months";
  const reason = String(body.reason || "").trim().slice(0, 500);

  const account = await prisma.account.findUnique({
    where: { id: accountId },
    include: {
      subscription: true,
      ownerUser: { select: { id: true, email: true, firstName: true } },
    },
  });

  if (!account) return NextResponse.json({ error: "Account not found" }, { status: 404 });

  const sub = account.subscription;
  const hasStripeSub = isRealStripeSub(sub?.stripeSubscriptionId);

  const stripe = getStripeClient();
  const user = account.ownerUser;
  let emailSubject = "";
  let emailBody = "";
  let eventMeta: Record<string, unknown> = { reason, grantedBy: actor.session.email };

  if (type === "months") {
    const months = Number(body.months);
    if (!months || months < 1 || months > 3) {
      return NextResponse.json({ error: "months must be 1, 2, or 3" }, { status: 400 });
    }

    if (hasStripeSub) {
      // Real subscription: extend the Stripe trial so their next bill moves out.
      const currentEnd = sub!.currentPeriodEnd
        ? Math.floor(sub!.currentPeriodEnd.getTime() / 1000)
        : Math.floor(Date.now() / 1000);
      const newEnd = currentEnd + months * 30 * 24 * 60 * 60;

      await stripe.subscriptions.update(sub!.stripeSubscriptionId, {
        trial_end: newEnd,
        proration_behavior: "none",
      });

      eventMeta = { ...eventMeta, type: "months", months, newPeriodEnd: new Date(newEnd * 1000).toISOString() };
    } else {
      // No real subscription (no plan, or an existing comp): grant complimentary
      // access directly in the DB, mirroring the webhook's placeholder-id pattern.
      const tier = normalizeTier(body.tier);
      const planName = tierLabel(tier);

      // Extend from an existing future comp end date if there is one, else from now.
      const base = sub?.currentPeriodEnd && sub.currentPeriodEnd.getTime() > Date.now()
        ? sub.currentPeriodEnd.getTime()
        : Date.now();
      const end = new Date(base + months * MONTH_MS);

      await prisma.subscription.upsert({
        where: { accountId },
        update: {
          status: "trialing",
          planName,
          trialEnd: end,
          currentPeriodEnd: end,
          currentPeriodStart: sub?.currentPeriodStart ?? new Date(),
          cancelAtPeriodEnd: false,
          canceledAt: null,
          paymentIssue: false,
        },
        create: {
          accountId,
          stripeCustomerId: `comp_${accountId}`,
          stripeSubscriptionId: `comp_${accountId}`,
          status: "trialing",
          planName,
          trialEnd: end,
          currentPeriodStart: new Date(),
          currentPeriodEnd: end,
        },
      });

      await prisma.account.update({
        where: { id: accountId },
        data: { status: mapStripeStatusToAccountStatus("trialing"), paymentIssue: false },
      }).catch(() => null);

      await syncUsersForAccountPlan(accountId, mapStripePlanTier(planName)).catch(() => null);

      eventMeta = { ...eventMeta, type: "months", months, tier, comp: true, newPeriodEnd: end.toISOString() };
    }

    const monthLabel = months === 1 ? "1 free month" : `${months} free months`;
    emailSubject = `You've been credited ${monthLabel} on Zari`;
    emailBody = `
      <h2 style="font-size:20px;font-weight:800;margin-bottom:8px;">Good news — ${monthLabel} added to your account.</h2>
      <p style="color:#475569;">Hey ${user.firstName ?? "there"} — we've added ${monthLabel} to your Zari account. Your access is active and ready to use.</p>
      ${reason ? `<p style="color:#475569;">${reason}</p>` : ""}
    `;

  } else {
    // Discount: only meaningful against a real, billable Stripe subscription.
    if (!hasStripeSub) {
      return NextResponse.json({
        error: "This account has no paid subscription to discount. Grant free months for complimentary access instead.",
      }, { status: 409 });
    }

    const discountPct = Number(body.discountPct);
    const discountMonths = Number(body.discountMonths);
    if (!discountPct || discountPct < 1 || discountPct > 100) {
      return NextResponse.json({ error: "discountPct must be 1–100" }, { status: 400 });
    }
    if (!discountMonths || discountMonths < 1 || discountMonths > 12) {
      return NextResponse.json({ error: "discountMonths must be 1–12" }, { status: 400 });
    }

    const coupon = await stripe.coupons.create({
      percent_off: discountPct,
      duration: "repeating",
      duration_in_months: discountMonths,
      name: `Admin grant — ${discountPct}% off ${discountMonths}mo`,
    });

    await stripe.subscriptions.update(sub!.stripeSubscriptionId, {
      discounts: [{ coupon: coupon.id }],
    });

    eventMeta = { ...eventMeta, type: "discount", discountPct, discountMonths, couponId: coupon.id };

    const moLabel = discountMonths === 1 ? "1 month" : `${discountMonths} months`;
    emailSubject = `You've got ${discountPct}% off on Zari`;
    emailBody = `
      <h2 style="font-size:20px;font-weight:800;margin-bottom:8px;">Good news — ${discountPct}% off for ${moLabel}.</h2>
      <p style="color:#475569;">Hey ${user.firstName ?? "there"} — we've applied a ${discountPct}% discount to your Zari subscription for the next ${moLabel}. It will be reflected on your next invoice.</p>
      ${reason ? `<p style="color:#475569;">${reason}</p>` : ""}
    `;
  }

  await prisma.appEvent.create({
    data: {
      accountId,
      userId: user.id,
      eventName: "admin_credit_granted",
      metadataJson: eventMeta as Prisma.InputJsonValue,
    },
  }).catch(() => null);

  await sendEmail({
    to: user.email,
    subject: emailSubject,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#0F172A;max-width:480px;">${emailBody}<p style="color:#475569;">If you have any questions, just reply here.</p></div>`,
  }).catch(() => null);

  return NextResponse.json({ ok: true, ...eventMeta });
}

// ── Revoke the most recent grant for this account ─────────────────────────────
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ accountId: string }> }
) {
  if (!ensureSameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const actor = await requireCoachAdminActor();
  if (!actor || actor.session.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { accountId } = await params;

  const account = await prisma.account.findUnique({
    where: { id: accountId },
    include: {
      subscription: true,
      ownerUser: { select: { id: true, email: true, firstName: true } },
    },
  });
  if (!account) return NextResponse.json({ error: "Account not found" }, { status: 404 });

  const sub = account.subscription;
  if (!sub) return NextResponse.json({ error: "No subscription to revoke." }, { status: 409 });

  // Find the last grant to determine what to revoke
  const lastGrant = await prisma.appEvent.findFirst({
    where: { accountId, eventName: "admin_credit_granted" },
    orderBy: { createdAt: "desc" },
  });
  if (!lastGrant) return NextResponse.json({ error: "No grant found for this account." }, { status: 404 });

  const meta = lastGrant.metadataJson as Record<string, unknown>;

  if (isRealStripeSub(sub.stripeSubscriptionId)) {
    const stripe = getStripeClient();
    if (meta?.type === "discount") {
      // Remove all discounts from the subscription
      await stripe.subscriptions.update(sub.stripeSubscriptionId, { discounts: [] });
    } else {
      // End the trial immediately (restores normal billing)
      await stripe.subscriptions.update(sub.stripeSubscriptionId, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        trial_end: "now" as any,
        proration_behavior: "none",
      });
    }
  } else {
    // Complimentary (non-Stripe) grant: cancel access in the DB now.
    const now = new Date();
    await prisma.subscription.update({
      where: { accountId },
      data: { status: "canceled", canceledAt: now, currentPeriodEnd: now, trialEnd: now, cancelAtPeriodEnd: false },
    });
    await prisma.account.update({
      where: { id: accountId },
      data: { status: mapStripeStatusToAccountStatus("canceled") },
    }).catch(() => null);
    await syncUsersForAccountPlan(accountId, "free").catch(() => null);
  }

  await prisma.appEvent.create({
    data: {
      accountId,
      userId: account.ownerUser.id,
      eventName: "admin_credit_revoked",
      metadataJson: { revokedBy: actor.session.email, originalType: meta?.type, originalMeta: meta } as Prisma.InputJsonValue,
    },
  }).catch(() => null);

  return NextResponse.json({ ok: true });
}
