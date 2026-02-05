import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";

export async function GET(request: Request, { params }: { params: Promise<{ assessmentId: string; taskId: string }> }) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  if (!isDatabaseReady()) {
    return NextResponse.json({ error: "Database not ready" }, { status: 500 });
  }
  const { assessmentId, taskId } = await params;
  const completion = await prisma.taskCompletion.findUnique({
    where: {
      assessmentId_taskId: { assessmentId, taskId },
    },
  });
  return NextResponse.json({
    completed: completion?.completed || false,
    completedAt: completion?.completedAt || null,
  });
}
