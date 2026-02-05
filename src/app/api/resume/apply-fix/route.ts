import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const body = await request.json();
  const assessmentId = body?.assessmentId;
  const issueId = body?.issueId;
  if (!assessmentId || !issueId) {
    return NextResponse.json({ error: "Missing assessmentId or issueId" }, { status: 400 });
  }
  const existing = await prisma.appliedFix.findUnique({
    where: {
      assessmentId_issueId: { assessmentId, issueId },
    },
  });
  if (existing) {
    return NextResponse.json(existing);
  }
  const created = await prisma.appliedFix.create({
    data: {
      assessmentId,
      issueId,
    },
  });
  return NextResponse.json(created);
}
