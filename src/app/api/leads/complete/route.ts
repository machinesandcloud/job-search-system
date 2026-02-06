import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { Prisma, AiAnalysisStatus } from "@prisma/client";
import { assessmentCompleteSchema, sanitizeAnswers } from "@/lib/validation";
import { computeScore } from "@/lib/scoring";
import { ensureSameOrigin } from "@/lib/utils";
import { logEvent } from "@/lib/events";

async function buildTeaser(answers: any, score: number, subscores: any, aiInsights: any, actionPlan: any) {
  const insights = [
    aiInsights?.primaryGap,
    aiInsights?.quickWin,
  ].filter(Boolean);

  const previewActions = Array.isArray(actionPlan?.week1?.tasks)
    ? actionPlan.week1.tasks.slice(0, 3).map((task: any) => task.task || task)
    : [];

  return {
    score,
    subscores,
    coachRead: aiInsights?.primaryGapExplanation || "Your personalized coach read will appear in the dashboard.",
    insights,
    previewActions,
  };
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  if (!isDatabaseReady()) {
    return NextResponse.json(
      {
        error:
          "Database URL is invalid. Ensure DATABASE_URL (or NETLIFY_DATABASE_URL) starts with postgresql://",
      },
      { status: 500 }
    );
  }
  const body = await request.json();
  const normalizedBody = {
    ...body,
    answers: sanitizeAnswers(body?.answers),
  };
  const parsed = assessmentCompleteSchema.safeParse(normalizedBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { answers, assessmentId } = parsed.data;
  const { score, subscores, route } = computeScore(answers);

  const targetRolesJson = JSON.parse(JSON.stringify(answers.targetRoles)) as Prisma.InputJsonValue;
  const targetCompaniesJson = JSON.parse(JSON.stringify(answers.targetCompanies)) as Prisma.InputJsonValue;
  const linkedinManualJson = answers.linkedinManualData
    ? (JSON.parse(JSON.stringify(answers.linkedinManualData)) as Prisma.InputJsonValue)
    : Prisma.JsonNull;

  const aiReady = false;
  const recommendedRoute =
    (route === "Fast Track" ? "FastTrack" : route === "Guided" ? "Guided" : "DIY") as Prisma.AssessmentCreateInput["recommendedRoute"];

  const data = {
    ...answers,
    targetRoles: targetRolesJson,
    targetCompanies: targetCompaniesJson,
    totalScore: score,
    clarityScore: subscores.clarity,
    assetsScore: subscores.assets,
    networkScore: subscores.network,
    executionScore: subscores.execution,
    recommendedRoute,
    aiInsights: Prisma.JsonNull as unknown as Prisma.InputJsonValue,
    aiAnalysisStatus: AiAnalysisStatus.pending,
    aiProcessedAt: null,
    aiModel: null,
    aiFailureReason: null,
    completedAt: new Date(),
    linkedinManualData: linkedinManualJson,
    marketIntelligence: Prisma.JsonNull as unknown as Prisma.InputJsonValue,
    week1Plan: Prisma.JsonNull as unknown as Prisma.InputJsonValue,
    personalizationData: Prisma.JsonNull as unknown as Prisma.InputJsonValue,
    progressPercentage: 0,
    lastActivityAt: new Date(),
    resumeAnalysis: Prisma.JsonNull as unknown as Prisma.InputJsonValue,
    linkedinAnalysis: Prisma.JsonNull as unknown as Prisma.InputJsonValue,
    companyMatches: Prisma.JsonNull as unknown as Prisma.InputJsonValue,
    actionPlan: Prisma.JsonNull as unknown as Prisma.InputJsonValue,
    personalizedScripts: Prisma.JsonNull as unknown as Prisma.InputJsonValue,
    coverLetterKit: Prisma.JsonNull as unknown as Prisma.InputJsonValue,
    interviewPrep: Prisma.JsonNull as unknown as Prisma.InputJsonValue,
    companyStrategies: Prisma.JsonNull as unknown as Prisma.InputJsonValue,
    careerAnalysis: Prisma.JsonNull as unknown as Prisma.InputJsonValue,
  };

  let assessment = null;
  if (assessmentId) {
    try {
      assessment = await prisma.assessment.update({
        where: { id: assessmentId },
        data,
      });
    } catch (_err) {
      assessment = null;
    }
  }
  if (!assessment) {
    assessment = await prisma.assessment.create({
      data: {
        ...data,
        ipAddress: request.headers.get("x-forwarded-for") || "",
        userAgent: request.headers.get("user-agent") || "",
      },
    });
  }

  await logEvent("assessment_completed", { score, route }, assessment.id);

  return NextResponse.json({
    token: assessment.token,
    assessmentId: assessment.id,
    teaser: await buildTeaser(answers, score, subscores, null, null),
    aiStatus: aiReady ? "complete" : "pending",
  });
}
