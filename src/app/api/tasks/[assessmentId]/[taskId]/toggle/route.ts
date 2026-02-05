import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request, { params }: { params: Promise<{ assessmentId: string; taskId: string }> }) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  if (!isDatabaseReady()) {
    return NextResponse.json({ error: "Database not ready" }, { status: 500 });
  }
  const { assessmentId, taskId } = await params;
  const existing = await prisma.taskCompletion.findUnique({
    where: { assessmentId_taskId: { assessmentId, taskId } },
  });
  if (existing) {
    const updated = await prisma.taskCompletion.update({
      where: { id: existing.id },
      data: {
        completed: !existing.completed,
        completedAt: !existing.completed ? new Date() : null,
      },
    });
    return NextResponse.json(updated);
  }
  const created = await prisma.taskCompletion.create({
    data: {
      assessmentId,
      taskId,
      completed: true,
      completedAt: new Date(),
    },
  });
  return NextResponse.json(created);
}
