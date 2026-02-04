import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { assessmentCompleteSchema, sanitizeAnswers } from "@/lib/validation";
import { computeScore } from "@/lib/scoring";
import { generateCoachFeedback } from "@/lib/coach-ai";
import { ensureSameOrigin } from "@/lib/utils";
import { logEvent } from "@/lib/events";

function buildTeaser(answers: any, score: number, subscores: any) {
  return {
    score,
    subscores,
    coachRead: `Your score is ${score}/100. We’ll focus on the highest-leverage gaps first.`,
    insights: [
      answers.networkStrength === "weak"
        ? "Your network strength is limiting reach. Prioritize warm outreach over cold applications."
        : "Your targeting is solid. Tighten your narrative to boost response rates.",
      answers.interviewReady
        ? "You’re close. Improve conversion by refining interview execution."
        : "Interview readiness is a risk. Build reps early to avoid late-stage stalls.",
    ],
    previewActions: [
      "Audit LinkedIn headline for target role keywords",
      "Build a 20-company target list",
      "Draft 3 outreach scripts",
    ],
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

  const aiInsights = await generateCoachFeedback(answers);
  const recommendedRoute: Prisma.RecommendedRoute =
    route === "Fast Track" ? "FastTrack" : route === "Guided" ? "Guided" : "DIY";

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
    aiAnalysisStatus: aiInsights ? ("complete" as const) : ("failed" as const),
    aiProcessedAt: aiInsights ? new Date() : null,
    aiModel: aiInsights ? "local-heuristic" : null,
    completedAt: new Date(),
  };

  const assessment = assessmentId
    ? await prisma.assessment.update({
        where: { id: assessmentId },
        data,
      })
    : await prisma.assessment.create({
        data: {
          ...data,
          ipAddress: request.headers.get("x-forwarded-for") || "",
          userAgent: request.headers.get("user-agent") || "",
        },
      });

  await logEvent("assessment_completed", { score, route }, assessment.id);

  return NextResponse.json({
    token: assessment.token,
    assessmentId: assessment.id,
    teaser: buildTeaser(answers, score, subscores),
  });
}
