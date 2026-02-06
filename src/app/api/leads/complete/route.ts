import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { Prisma, AiAnalysisStatus } from "@prisma/client";
import { assessmentCompleteSchema, sanitizeAnswers } from "@/lib/validation";
import { computeScore } from "@/lib/scoring";
import { ensureSameOrigin } from "@/lib/utils";
import { logEvent } from "@/lib/events";
import { runFullAnalysis } from "@/lib/analysis";

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

  const existingAssessment = assessmentId
    ? await prisma.assessment.findUnique({
        where: { id: assessmentId },
      select: {
        resumeParsedData: true,
        linkedinParsedData: true,
        resumeRawText: true,
        linkedinRawText: true,
      },
    })
    : null;

  const analysis = await runFullAnalysis(
    answers,
    {
      resumeParsedData: existingAssessment?.resumeParsedData || null,
      linkedinParsedData: existingAssessment?.linkedinParsedData || null,
      resumeRawText: existingAssessment?.resumeRawText || null,
      linkedinRawText: existingAssessment?.linkedinRawText || null,
    },
    { includePro: false }
  );

  const aiReady =
    !analysis.aiFailed &&
    analysis.aiInsights &&
    analysis.resumeAnalysis &&
    analysis.linkedinAnalysis &&
    analysis.careerAnalysis &&
    analysis.marketIntelligence &&
    analysis.week1Plan;
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
    aiInsights: (analysis.aiInsights ?? Prisma.JsonNull) as Prisma.InputJsonValue,
    aiAnalysisStatus: aiReady ? AiAnalysisStatus.complete : AiAnalysisStatus.processing,
    aiProcessedAt: aiReady ? new Date() : null,
    aiModel: analysis.aiModel || "groq",
    aiFailureReason: analysis.aiFailed ? analysis.aiFailureReason : null,
    completedAt: new Date(),
    linkedinManualData: linkedinManualJson,
    marketIntelligence: (analysis.marketIntelligence ?? Prisma.JsonNull) as Prisma.InputJsonValue,
    week1Plan: (analysis.week1Plan ?? Prisma.JsonNull) as Prisma.InputJsonValue,
    personalizationData: (analysis.personalizationData ?? Prisma.JsonNull) as Prisma.InputJsonValue,
    progressPercentage: 0,
    lastActivityAt: new Date(),
    resumeAnalysis: (analysis.resumeAnalysis ?? Prisma.JsonNull) as Prisma.InputJsonValue,
    linkedinAnalysis: (analysis.linkedinAnalysis ?? Prisma.JsonNull) as Prisma.InputJsonValue,
    companyMatches: (analysis.companyMatches ?? Prisma.JsonNull) as Prisma.InputJsonValue,
    actionPlan: (analysis.actionPlan ?? Prisma.JsonNull) as Prisma.InputJsonValue,
    personalizedScripts: (analysis.personalizedScripts ?? Prisma.JsonNull) as Prisma.InputJsonValue,
    coverLetterKit: (analysis.coverLetterKit ?? Prisma.JsonNull) as Prisma.InputJsonValue,
    interviewPrep: (analysis.interviewPrep ?? Prisma.JsonNull) as Prisma.InputJsonValue,
    companyStrategies: (analysis.companyStrategies ?? Prisma.JsonNull) as Prisma.InputJsonValue,
    careerAnalysis: (analysis.careerAnalysis ?? Prisma.JsonNull) as Prisma.InputJsonValue,
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
    teaser: await buildTeaser(answers, score, subscores, analysis.aiInsights, analysis.actionPlan),
    aiStatus: aiReady ? "complete" : "processing",
  });
}
