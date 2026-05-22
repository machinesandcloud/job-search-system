import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { prisma } from "@/lib/db";
import { getOrCreateReferralCode, buildReferralUrl, getReferralStats } from "@/lib/referral";

export const runtime = "nodejs";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const code = await getOrCreateReferralCode(user.email);
  const url = buildReferralUrl(code);
  const stats = await getReferralStats(user.email);

  return NextResponse.json({ code, url, ...stats });
}
