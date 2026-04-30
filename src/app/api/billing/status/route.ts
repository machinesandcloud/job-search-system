import { NextResponse } from "next/server";
import { getCurrentPeriodTokenUsage, getCurrentSubscriptionAccess } from "@/lib/billing";

export const runtime = "nodejs";

export async function GET() {
  const access = await getCurrentSubscriptionAccess();
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
