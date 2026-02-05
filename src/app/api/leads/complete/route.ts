import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { Prisma } from "@prisma/client";
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
    coachRead: aiInsights?.primaryGapExplanation || `Your score is ${score}/100.`,
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

  const existingAssessment = assessmentId
    ? await prisma.assessment.findUnique({
        where: { id: assessmentId },
        select: {
          resumeParsedData: true,
          linkedinParsedData: true,
        },
      })
    : null;

  const analysis = await runFullAnalysis(answers, {
    resumeParsedData: existingAssessment?.resumeParsedData || null,
    linkedinParsedData: existingAssessment?.linkedinParsedData || null,
  });

  if (analysis.aiFailed || !analysis.aiInsights) {
    return NextResponse.json(
      { error: analysis.aiFailureReason || "AI analysis failed. Please try again." },
      { status: 503 }
    );
  }
  if (!analysis.actionPlan) {
    return NextResponse.json(
      { error: "AI action plan unavailable. Please try again." },
      { status: 503 }
    );
  }
  if (!analysis.resumeAnalysis || !analysis.linkedinAnalysis || !analysis.companyMatches || !analysis.personalizedScripts) {
    return NextResponse.json(
      { error: "AI personalization incomplete. Please try again." },
      { status: 503 }
    );
  }
  if (!analysis.coverLetterKit || !analysis.interviewPrep || !analysis.companyStrategies || !analysis.careerAnalysis) {
    return NextResponse.json(
      { error: "AI strategy bundle incomplete. Please try again." },
      { status: 503 }
    );
  }
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
    aiInsights: analysis.aiInsights as Prisma.InputJsonValue,
    aiAnalysisStatus: "complete" as const,
    aiProcessedAt: new Date(),
    aiModel: analysis.aiModel || "groq",
    aiFailureReason: null,
    completedAt: new Date(),
    resumeAnalysis: analysis.resumeAnalysis as Prisma.InputJsonValue,
    linkedinAnalysis: analysis.linkedinAnalysis as Prisma.InputJsonValue,
    companyMatches: analysis.companyMatches as Prisma.InputJsonValue,
    actionPlan: analysis.actionPlan as Prisma.InputJsonValue,
    personalizedScripts: analysis.personalizedScripts as Prisma.InputJsonValue,
    coverLetterKit: analysis.coverLetterKit as Prisma.InputJsonValue,
    interviewPrep: analysis.interviewPrep as Prisma.InputJsonValue,
    companyStrategies: analysis.companyStrategies as Prisma.InputJsonValue,
    careerAnalysis: analysis.careerAnalysis as Prisma.InputJsonValue,
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
  });
}
