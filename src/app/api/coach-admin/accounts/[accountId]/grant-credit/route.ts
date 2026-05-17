import { NextRequest, NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { getStripeClient } from "@/lib/stripe";
import { sendEmail } from "@/lib/resend";

export const runtime = "nodejs";
export const maxDuration = 15;

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
  if (!sub?.stripeSubscriptionId) {
    return NextResponse.json({ error: "Account has no active Stripe subscription." }, { status: 409 });
  }

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

    const currentEnd = sub.currentPeriodEnd
      ? Math.floor(sub.currentPeriodEnd.getTime() / 1000)
      : Math.floor(Date.now() / 1000);
    const newEnd = currentEnd + months * 30 * 24 * 60 * 60;

    await stripe.subscriptions.update(sub.stripeSubscriptionId, {
      trial_end: newEnd,
      proration_behavior: "none",
    });

    const monthLabel = months === 1 ? "1 free month" : `${months} free months`;
    emailSubject = `You've been credited ${monthLabel} on Zari`;
    emailBody = `
      <h2 style="font-size:20px;font-weight:800;margin-bottom:8px;">Good news — ${monthLabel} added to your account.</h2>
      <p style="color:#475569;">Hey ${user.firstName ?? "there"} — we've added ${monthLabel} to your Zari subscription. Your next billing date has been updated accordingly.</p>
      ${reason ? `<p style="color:#475569;">${reason}</p>` : ""}
    `;
    eventMeta = { ...eventMeta, type: "months", months, newPeriodEnd: new Date(newEnd * 1000).toISOString() };

  } else {
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

    await stripe.subscriptions.update(sub.stripeSubscriptionId, {
      discounts: [{ coupon: coupon.id }],
    });

    const moLabel = discountMonths === 1 ? "1 month" : `${discountMonths} months`;
    emailSubject = `You've got ${discountPct}% off on Zari`;
    emailBody = `
      <h2 style="font-size:20px;font-weight:800;margin-bottom:8px;">Good news — ${discountPct}% off for ${moLabel}.</h2>
      <p style="color:#475569;">Hey ${user.firstName ?? "there"} — we've applied a ${discountPct}% discount to your Zari subscription for the next ${moLabel}. It will be reflected on your next invoice.</p>
      ${reason ? `<p style="color:#475569;">${reason}</p>` : ""}
    `;
    eventMeta = { ...eventMeta, type: "discount", discountPct, discountMonths, couponId: coupon.id };
  }

  await prisma.appEvent.create({
    data: {
      accountId,
      userId: user.id,
      eventName: "admin_credit_granted",
      metadataJson: eventMeta,
    },
  }).catch(() => null);

  await sendEmail({
    to: user.email,
    subject: emailSubject,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#0F172A;max-width:480px;">${emailBody}<p style="color:#475569;">If you have any questions, just reply here.</p></div>`,
  }).catch(() => null);

  return NextResponse.json({ ok: true, ...eventMeta });
}
