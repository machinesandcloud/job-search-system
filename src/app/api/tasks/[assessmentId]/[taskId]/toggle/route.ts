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
  const completion = existing
    ? await prisma.taskCompletion.update({
      where: { id: existing.id },
      data: {
        completed: !existing.completed,
        completedAt: !existing.completed ? new Date() : null,
      },
    })
    : await prisma.taskCompletion.create({
        data: {
          assessmentId,
          taskId,
          completed: true,
          completedAt: new Date(),
        },
      });

  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    select: { week1Plan: true, skillMatchData: true, totalScore: true },
  });

  const tasks = (assessment?.week1Plan as any)?.week1?.tasks || [];
  if (tasks.length) {
    const completedCount = await prisma.taskCompletion.count({
      where: { assessmentId, completed: true },
    });
    const baseScore =
      (assessment?.skillMatchData as any)?.readinessScore?.overall ?? assessment?.totalScore ?? 0;
    const bonus = Math.round((completedCount / tasks.length) * 5);
    await prisma.assessment.update({
      where: { id: assessmentId },
      data: { totalScore: Math.min(100, baseScore + bonus) },
    });
  }

  return NextResponse.json(completion);
}
