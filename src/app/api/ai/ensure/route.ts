import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { sanitizeAnswers } from "@/lib/validation";
import { runFullAnalysis } from "@/lib/analysis";
import { AiAnalysisStatus, Prisma } from "@prisma/client";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!ensureSameOrigin(request)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }
    if (!isDatabaseReady()) {
      return NextResponse.json({ error: "Database not ready" }, { status: 500 });
    }

    const body = await request.json().catch(() => ({}));
    const token = typeof body?.token === "string" ? body.token : null;
    const assessmentId = typeof body?.assessmentId === "string" ? body.assessmentId : null;
    if (!token && !assessmentId) {
      return NextResponse.json({ error: "Missing token or assessmentId" }, { status: 400 });
    }

    const assessment = await prisma.assessment.findUnique({
      where: token ? { token } : { id: assessmentId! },
    });
    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }

    if (assessment.aiAnalysisStatus === AiAnalysisStatus.complete && assessment.week1Plan) {
      return NextResponse.json({ status: "ready" });
    }

    await prisma.assessment.update({
      where: { id: assessment.id },
      data: {
        aiAnalysisStatus: AiAnalysisStatus.processing,
        aiFailureReason: null,
        lastActivityAt: new Date(),
      },
    });

    const answers = sanitizeAnswers({
      targetRoles: assessment.targetRoles,
      level: assessment.level,
      compTarget: assessment.compTarget,
      timeline: assessment.timeline,
      locationPreference: assessment.locationPreference,
      locationCity: assessment.locationCity,
      hoursPerWeek: assessment.hoursPerWeek,
      resumeStatus: assessment.resumeStatus,
      linkedinStatus: assessment.linkedinStatus,
      portfolioStatus: assessment.portfolioStatus,
      interviewReady: assessment.interviewReady,
      resumeFileUrl: assessment.resumeFileUrl,
      resumeFileName: assessment.resumeFileName,
      resumeFileSize: assessment.resumeFileSize,
      linkedinFileUrl: assessment.linkedinFileUrl,
      linkedinFileName: assessment.linkedinFileName,
      linkedinManualData: assessment.linkedinManualData,
      jobDescription: assessment.jobDescription,
      networkStrength: assessment.networkStrength,
      outreachComfort: assessment.outreachComfort,
      targetCompanies: assessment.targetCompanies,
      biggestBlocker: assessment.biggestBlocker,
      additionalContext: assessment.additionalContext,
    });

    const analysis = await runFullAnalysis(
      answers,
      {
        resumeParsedData: assessment.resumeParsedData,
        linkedinParsedData: assessment.linkedinParsedData,
      },
      { includePro: assessment.hasPurchasedPro }
    );

    const aiReady = !analysis.aiFailed && analysis.aiInsights && analysis.week1Plan;
    await prisma.assessment.update({
      where: { id: assessment.id },
      data: {
        aiInsights: (analysis.aiInsights ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        aiAnalysisStatus: aiReady ? AiAnalysisStatus.complete : AiAnalysisStatus.failed,
        aiProcessedAt: aiReady ? new Date() : null,
        aiModel: analysis.aiModel || "groq",
        aiFailureReason: analysis.aiFailed ? analysis.aiFailureReason : null,
        marketIntelligence: (analysis.marketIntelligence ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        week1Plan: (analysis.week1Plan ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        personalizationData: (analysis.personalizationData ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        resumeAnalysis: (analysis.resumeAnalysis ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        linkedinAnalysis: (analysis.linkedinAnalysis ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        companyMatches: (analysis.companyMatches ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        actionPlan: (analysis.actionPlan ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        personalizedScripts: (analysis.personalizedScripts ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        coverLetterKit: (analysis.coverLetterKit ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        interviewPrep: (analysis.interviewPrep ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        companyStrategies: (analysis.companyStrategies ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        careerAnalysis: (analysis.careerAnalysis ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        lastActivityAt: new Date(),
      },
    });

    return NextResponse.json({ status: aiReady ? "ready" : "failed" });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to ensure AI" }, { status: 500 });
  }
}
