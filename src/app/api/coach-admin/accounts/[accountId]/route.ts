import { NextRequest, NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { getStripeClient } from "@/lib/stripe";
import { logAppEvent } from "@/lib/billing";
import { deleteContact } from "@/lib/zoho-crm";

function isOperatorRole(role?: string | null) {
  const v = `${role || ""}`.trim().toLowerCase();
  return v === "admin" || v === "support";
}

export async function DELETE(
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
    include: { users: true, subscription: true },
  });

  if (!account) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  if (account.users.some((u: { role?: string | null }) => isOperatorRole(u.role))) {
    return NextResponse.json({ error: "Internal operator accounts cannot be deleted." }, { status: 400 });
  }

  const memberEmails = account.users.map((u: { email: string }) => u.email).filter(Boolean);
  const memberUserIds = account.users.map((u: { id: string }) => u.id);

  // Cancel Stripe subscription if one exists.
  if (account.subscription?.stripeSubscriptionId) {
    try {
      const stripe = getStripeClient();
      await stripe.subscriptions.cancel(account.subscription.stripeSubscriptionId);
    } catch (error: any) {
      console.error("[coach-admin/delete-account] stripe cancel failed", error?.message || error);
    }
  }

  // Cancel all active email sequences and remove suppressions for every member email.
  // Run in parallel — these are non-fatal if they fail.
  await Promise.allSettled(
    memberEmails.flatMap((email) => [
      prisma.emailSequenceEnrollment.updateMany({
        where: { email, canceledAt: null, completedAt: null },
        data: { canceledAt: new Date() },
      }),
      prisma.emailSuppression.deleteMany({ where: { email } }),
      deleteContact(email),
    ])
  );

  try {
    // Delete the account (cascades: subscription, tickets, events, notes, token usage).
    // Account.users FK is onDelete: SetNull so user rows survive account deletion.
    await prisma.account.delete({ where: { id: accountId } });

    // Delete the member users (they have no account anymore after SetNull cascade).
    if (memberUserIds.length > 0) {
      await prisma.user.deleteMany({ where: { id: { in: memberUserIds } } });
    }

    await logAppEvent("account_deleted", {
      userId: user.id,
      metadataJson: { source: "coach_admin", deletedAccountId: accountId, deletedBy: user.email },
    });

    return NextResponse.json({ ok: true, accountId });
  } catch (error: any) {
    console.error("[coach-admin/delete-account] failed", error?.message || error);
    return NextResponse.json({ error: error?.message || "Unable to delete account." }, { status: 500 });
  }
}
