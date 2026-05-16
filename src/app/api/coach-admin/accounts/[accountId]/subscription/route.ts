import { NextRequest, NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { getStripeClient } from "@/lib/stripe";
import { logAppEvent } from "@/lib/billing";
import { syncStripeSubscriptionToAccount } from "@/lib/subscription-sync";

function isOperatorRole(role?: string | null) {
  const normalized = `${role || ""}`.trim().toLowerCase();
  return normalized === "admin" || normalized === "support";
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ accountId: string }> }
) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const { user } = await requireCoachAdminActor("admin");
  const { accountId } = await params;

  const account = await prisma.account.findUnique({
    where: { id: accountId },
    include: {
      users: true,
      subscription: true,
    },
  });

  if (!account) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  if (account.users.some((member: { role?: string | null }) => isOperatorRole(member.role))) {
    return NextResponse.json({ error: "Internal operator accounts cannot be canceled from this flow." }, { status: 400 });
  }

  const subscription = account.subscription;
  const { reason, note: noteText } = await request.json().catch(() => ({}));

  // No Stripe subscription — just mark the account canceled in the DB.
  if (!subscription?.stripeSubscriptionId) {
    try {
      await prisma.account.update({ where: { id: accountId }, data: { status: "canceled" } });
      await Promise.all([
        logAppEvent("subscription_canceled", {
          accountId,
          userId: user.id,
          metadataJson: { source: "coach_admin", canceledBy: user.email, reason: reason || "admin_action", noStripeSubscription: true },
        }),
        prisma.adminNote.create({
          data: { accountId, userId: user.id, note: `Account marked canceled from coach admin (no Stripe subscription).${noteText ? ` Note: ${noteText}` : ""}` },
        }),
      ]);
      return NextResponse.json({ ok: true, accountId, status: "canceled" });
    } catch (error: any) {
      return NextResponse.json({ error: error?.message || "Unable to cancel account." }, { status: 500 });
    }
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Stripe is not configured." }, { status: 501 });
  }

  try {
    const canceled = await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);
    await syncStripeSubscriptionToAccount(accountId, canceled, {
      status: "canceled",
      paymentIssue: false,
    });

    await Promise.all([
      logAppEvent("subscription_canceled", {
        accountId,
        userId: user.id,
        metadataJson: {
          source: "coach_admin",
          stripeSubscriptionId: canceled.id,
          canceledBy: user.email,
          reason: reason || "admin_action",
        },
      }),
      prisma.adminNote.create({
        data: {
          accountId,
          userId: user.id,
          note: `Subscription canceled immediately from coach admin. Stripe subscription ${canceled.id}.${noteText ? ` Note: ${noteText}` : ""}`,
        },
      }),
    ]);

    return NextResponse.json({
      ok: true,
      accountId,
      status: "canceled",
      stripeSubscriptionId: canceled.id,
    });
  } catch (error: any) {
    console.error("[coach-admin/cancel-subscription] failed", {
      accountId,
      stripeSubscriptionId: subscription.stripeSubscriptionId,
      error: error?.message || error,
    });
    return NextResponse.json(
      { error: error?.message || "Unable to cancel the Stripe subscription right now." },
      { status: 500 }
    );
  }
}
