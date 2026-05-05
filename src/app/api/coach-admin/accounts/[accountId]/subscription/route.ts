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
  if (!subscription) {
    return NextResponse.json({ error: "This account does not have an active subscription record." }, { status: 400 });
  }

  if (!subscription.stripeSubscriptionId) {
    return NextResponse.json({ error: "Stripe subscription ID is missing for this account." }, { status: 400 });
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
      paymentIssue: true,
    });

    await Promise.all([
      logAppEvent("subscription_canceled", {
        accountId,
        userId: user.id,
        metadataJson: {
          source: "coach_admin",
          stripeSubscriptionId: canceled.id,
          canceledBy: user.email,
        },
      }),
      prisma.adminNote.create({
        data: {
          accountId,
          userId: user.id,
          note: `Subscription canceled immediately from coach admin. Stripe subscription ${canceled.id}.`,
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
