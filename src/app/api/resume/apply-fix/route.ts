import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  if (!isDatabaseReady()) {
    return NextResponse.json({ error: "Database not ready" }, { status: 500 });
  }
  const body = await request.json();
  const assessmentId = body?.assessmentId as string | undefined;
  const issueId = body?.issueId as string | undefined;
  if (!assessmentId || !issueId) {
    return NextResponse.json({ error: "Missing assessmentId or issueId" }, { status: 400 });
  }
  const existing = await prisma.appliedFix.findUnique({
    where: { assessmentId_issueId: { assessmentId, issueId } },
  });
  if (existing) {
    return NextResponse.json({ success: true, applied: true });
  }
  await prisma.appliedFix.create({
    data: { assessmentId, issueId },
  });
  return NextResponse.json({ success: true, applied: true });
}
