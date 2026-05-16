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
  const body = await request.json().catch(() => ({})) as { months?: number; reason?: string };
  const months = Number(body.months);
  const reason = String(body.reason || "").trim().slice(0, 500);

  if (!months || months < 1 || months > 3) {
    return NextResponse.json({ error: "months must be 1, 2, or 3" }, { status: 400 });
  }

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
  const currentEnd = sub.currentPeriodEnd
    ? Math.floor(sub.currentPeriodEnd.getTime() / 1000)
    : Math.floor(Date.now() / 1000);
  const newEnd = currentEnd + months * 30 * 24 * 60 * 60;

  await stripe.subscriptions.update(sub.stripeSubscriptionId, {
    trial_end: newEnd,
    proration_behavior: "none",
  });

  await prisma.appEvent.create({
    data: {
      accountId,
      userId: account.ownerUser.id,
      eventName: "admin_credit_granted",
      metadataJson: { months, reason, grantedBy: actor.session.email },
    },
  }).catch(() => null);

  // Notify user
  const user = account.ownerUser;
  const monthLabel = months === 1 ? "1 free month" : `${months} free months`;
  await sendEmail({
    to: user.email,
    subject: `You've been credited ${monthLabel} on Zari`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0F172A;max-width:480px;">
        <h2 style="font-size:20px;font-weight:800;margin-bottom:8px;">Good news — ${monthLabel} added to your account.</h2>
        <p style="color:#475569;">Hey ${user.firstName ?? "there"} — we've added ${monthLabel} to your Zari subscription. Your next billing date has been updated accordingly.</p>
        ${reason ? `<p style="color:#475569;">${reason}</p>` : ""}
        <p style="color:#475569;">If you have any questions, just reply here.</p>
      </div>
    `,
  }).catch(() => null);

  return NextResponse.json({ ok: true, months, newPeriodEnd: new Date(newEnd * 1000).toISOString() });
}
