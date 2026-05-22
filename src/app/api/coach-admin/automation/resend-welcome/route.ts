import { NextRequest, NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { enroll, sendNow } from "@/lib/email-sequences";

export const runtime = "nodejs";
export const maxDuration = 15;

export async function POST(request: NextRequest) {
  await requireCoachAdminActor("admin");

  const body = (await request.json().catch(() => ({}))) as { email?: string; firstName?: string; lastName?: string };
  const email = (body.email ?? "").toString().trim().toLowerCase();
  const firstName = (body.firstName ?? "").toString().trim();
  const lastName = (body.lastName ?? "").toString().trim();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Valid email address required." }, { status: 400 });
  }

  // Cancel any existing trial_onboarding enrollment so enroll() doesn't early-return.
  await prisma.emailSequenceEnrollment.updateMany({
    where: { email, sequence: "trial_onboarding", canceledAt: null, completedAt: null },
    data: { canceledAt: new Date() },
  });

  // Re-enroll at step 0, then immediately fire the welcome email.
  await enroll("trial_onboarding", email, { firstName, lastName });
  await sendNow("trial_onboarding", email);

  return NextResponse.json({ ok: true, email });
}
