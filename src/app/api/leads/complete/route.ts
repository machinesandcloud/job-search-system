import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { assessmentCompleteSchema, sanitizeAnswers } from "@/lib/validation";
import { computeScore } from "@/lib/scoring";
import { generateCoachFeedback } from "@/lib/coach-ai";
import { ensureSameOrigin } from "@/lib/utils";
import { logEvent } from "@/lib/events";
import { runFullAnalysis } from "@/lib/analysis";
import {
  buildAchievements,
  buildApplications,
  buildProfileData,
  buildResumeHealthData,
  buildSkillMatchData,
  buildTaskProgress,
} from "@/lib/profile-data";

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

  const profileData = buildProfileData(
    answers,
    (existingAssessment?.resumeParsedData as any) || null,
    (existingAssessment?.linkedinParsedData as any) || null
  );
  const resumeHealthData = buildResumeHealthData(answers, (existingAssessment?.resumeParsedData as any) || null);
  const skillMatchData = buildSkillMatchData(answers, (existingAssessment?.resumeParsedData as any) || null);
  const taskProgress = buildTaskProgress(answers);
  const achievements = buildAchievements(answers);
  const applications = buildApplications(answers);

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
    profileData: profileData as Prisma.InputJsonValue,
    resumeHealthData: resumeHealthData as Prisma.InputJsonValue,
    skillMatchData: skillMatchData as Prisma.InputJsonValue,
    taskProgress: taskProgress as Prisma.InputJsonValue,
    achievements: achievements as Prisma.InputJsonValue,
    applications: applications as Prisma.InputJsonValue,
    resumeAnalysis: analysis.resumeAnalysis ? (analysis.resumeAnalysis as Prisma.InputJsonValue) : undefined,
    linkedinAnalysis: analysis.linkedinAnalysis ? (analysis.linkedinAnalysis as Prisma.InputJsonValue) : undefined,
    companyMatches: analysis.companyMatches ? (analysis.companyMatches as Prisma.InputJsonValue) : undefined,
    actionPlan: analysis.actionPlan ? (analysis.actionPlan as Prisma.InputJsonValue) : undefined,
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
    teaser: buildTeaser(answers, score, subscores),
  });
}
