import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserSession } from "@/lib/user-auth";

export async function GET() {
  const session = await getUserSession();
  if (!session) {
    return NextResponse.json({ ok: false }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  const assessment = await prisma.assessment.findFirst({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    select: { token: true },
  });
  if (!assessment) {
    return NextResponse.json({ ok: true, token: null }, { headers: { "Cache-Control": "no-store" } });
  }
  return NextResponse.json({ ok: true, token: assessment.token }, { headers: { "Cache-Control": "no-store" } });
}
