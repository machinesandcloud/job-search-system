import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { assessmentCompleteSchema, sanitizeAnswers } from "@/lib/validation";
import { computeScore } from "@/lib/scoring";
import { generateCoachFeedback } from "@/lib/coach-ai";
import { ensureSameOrigin } from "@/lib/utils";
import { logEvent } from "@/lib/events";
import { runFullAnalysis } from "@/lib/analysis";
import { groqChatText } from "@/lib/llm";

async function buildTeaser(answers: any, score: number, subscores: any, aiInsights: any, actionPlan: any) {
  const fallbackInsights = [
    aiInsights?.primaryGap,
    aiInsights?.quickWin,
  ].filter(Boolean);

  const previewActions = Array.isArray(actionPlan?.week1?.tasks)
    ? actionPlan.week1.tasks.slice(0, 3).map((task: any) => task.task || task)
    : [];

  if (fallbackInsights.length || previewActions.length) {
    return {
      score,
      subscores,
      coachRead: aiInsights?.primaryGapExplanation || `Your score is ${score}/100.`,
      insights: fallbackInsights,
      previewActions,
    };
  }

  const aiFallback = await groqChatText(
    "You are a tech career coach. Write a single sentence preview insight.",
    `Provide one short preview insight for a ${answers.level} targeting ${answers.targetRoles?.[0]?.name || "their target role"}.`
  );

  return {
    score,
    subscores,
    coachRead: aiFallback || `Your score is ${score}/100.`,
    insights: aiFallback ? [aiFallback] : [],
    previewActions: [],
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

  const aiInsights =
    analysis.aiInsights ||
    (await generateCoachFeedback(answers, {
      resumeParsedData: existingAssessment?.resumeParsedData,
      linkedinParsedData: existingAssessment?.linkedinParsedData,
    }));
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
    aiInsights: aiInsights ? (aiInsights as Prisma.InputJsonValue) : undefined,
    aiAnalysisStatus: aiInsights && !analysis.aiFailed ? ("complete" as const) : ("failed" as const),
    aiProcessedAt: aiInsights ? new Date() : null,
    aiModel: aiInsights ? analysis.aiModel || "groq" : null,
    aiFailureReason: analysis.aiFailed ? analysis.aiFailureReason : null,
    completedAt: new Date(),
    resumeAnalysis: analysis.resumeAnalysis ? (analysis.resumeAnalysis as Prisma.InputJsonValue) : undefined,
    linkedinAnalysis: analysis.linkedinAnalysis ? (analysis.linkedinAnalysis as Prisma.InputJsonValue) : undefined,
    companyMatches: analysis.companyMatches ? (analysis.companyMatches as Prisma.InputJsonValue) : undefined,
    actionPlan: analysis.actionPlan ? (analysis.actionPlan as Prisma.InputJsonValue) : undefined,
    personalizedScripts: analysis.personalizedScripts
      ? (analysis.personalizedScripts as Prisma.InputJsonValue)
      : undefined,
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
    teaser: await buildTeaser(answers, score, subscores, aiInsights, analysis.actionPlan),
  });
}
