import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { sanitizeAnswers } from "@/lib/validation";
import { runFullAnalysis, enhanceEvidenceBundle } from "@/lib/analysis";
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
    if (!assessment.userId) {
      return NextResponse.json({ status: "pending_auth" });
    }

    const existingInsights = assessment.aiInsights as any;
    const existingSummary = (assessment.careerAnalysis as any)?.executiveSummary;
    const hasEvidence =
      Array.isArray(existingInsights?.primaryGapEvidence) &&
      existingInsights.primaryGapEvidence.length > 0;
    const hasCoachSummary = Boolean(existingSummary?.coachSummary);
    const hasInsights = Boolean(existingInsights);
    const hasWeek1 = Boolean((assessment.week1Plan as any)?.week1?.tasks?.length);
    const hasResumeAnalysis = Boolean(assessment.resumeAnalysis);
    const hasLinkedinAnalysis = Boolean(assessment.linkedinAnalysis);
    const baseReady =
      assessment.aiAnalysisStatus === AiAnalysisStatus.complete &&
      hasWeek1 &&
      hasResumeAnalysis &&
      hasLinkedinAnalysis &&
      hasInsights;
    const needsEnhancement = !hasEvidence || !hasCoachSummary;

    if (assessment.aiAnalysisStatus === AiAnalysisStatus.failed) {
      return NextResponse.json({ status: "failed", reason: assessment.aiFailureReason || "AI generation failed." });
    }

    if (baseReady) {
      if (needsEnhancement) {
        try {
          const enhancement = await enhanceEvidenceBundle(
            sanitizeAnswers({
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
            }),
            {
              resumeParsedData: assessment.resumeParsedData,
              linkedinParsedData: assessment.linkedinParsedData,
              resumeRawText: assessment.resumeRawText,
              linkedinRawText: assessment.linkedinRawText,
            },
            assessment.marketIntelligence,
            assessment.aiInsights,
            assessment.careerAnalysis
          );

          if (enhancement) {
            const mergedInsights = {
              ...(assessment.aiInsights as any),
              ...(enhancement.aiInsights || {}),
            };
            const mergedCareerAnalysis = {
              ...(assessment.careerAnalysis as any),
              executiveSummary: {
                ...(assessment.careerAnalysis as any)?.executiveSummary,
                ...(enhancement.careerAnalysis?.executiveSummary || {}),
              },
            };
            await prisma.assessment.update({
              where: { id: assessment.id },
              data: {
                aiInsights: mergedInsights as Prisma.InputJsonValue,
                careerAnalysis: mergedCareerAnalysis as Prisma.InputJsonValue,
              },
            });
          }
        } catch (_err) {
          // best-effort enhancement; do not block readiness
        }
      }
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

    let analysis: any = null;
    try {
      analysis = await runFullAnalysis(
        answers,
        {
          resumeParsedData: assessment.resumeParsedData,
          linkedinParsedData: assessment.linkedinParsedData,
          resumeRawText: assessment.resumeRawText,
          linkedinRawText: assessment.linkedinRawText,
        },
        { includePro: assessment.hasPurchasedPro }
      );
    } catch (err: any) {
      analysis = {
        aiFailed: true,
        aiFailureReason: err?.message || "AI generation failed",
      };
    }

    const requiredSections = Boolean(
      analysis?.aiInsights && analysis?.resumeAnalysis && analysis?.linkedinAnalysis && analysis?.week1Plan
    );
    const aiFailed =
      !analysis ||
      analysis.aiFailed ||
      !requiredSections;
    const failureReason =
      analysis?.aiFailureReason || (!requiredSections ? "AI response missing required sections." : null);
    const aiReady = !aiFailed;

    const updatedAssessment = await prisma.assessment.update({
      where: { id: assessment.id },
      data: {
        totalScore: analysis?.readinessScore?.overall ?? assessment.totalScore,
        networkScore: analysis?.readinessScore?.breakdown?.network ?? assessment.networkScore,
        aiInsights: (analysis?.aiInsights ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        aiAnalysisStatus: aiReady ? AiAnalysisStatus.complete : AiAnalysisStatus.failed,
        aiProcessedAt: new Date(),
        aiModel: analysis?.aiModel || "groq",
        aiFailureReason: aiFailed ? failureReason : null,
        marketIntelligence: (analysis?.marketIntelligence ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        week1Plan: (analysis?.week1Plan ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        personalizationData: (analysis?.personalizationData ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        resumeAnalysis: (analysis?.resumeAnalysis ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        linkedinAnalysis: (analysis?.linkedinAnalysis ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        skillMatchData: (analysis?.skillMatchData ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        companyMatches: (analysis?.companyMatches ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        actionPlan: (analysis?.actionPlan ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        personalizedScripts: (analysis?.personalizedScripts ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        coverLetterKit: (analysis?.coverLetterKit ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        interviewPrep: (analysis?.interviewPrep ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        companyStrategies: (analysis?.companyStrategies ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        careerAnalysis: (analysis?.careerAnalysis ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        lastActivityAt: new Date(),
      },
    });

    if (aiReady) {
      const hasNewEvidence =
        Array.isArray((analysis?.aiInsights as any)?.primaryGapEvidence) &&
        (analysis?.aiInsights as any)?.primaryGapEvidence?.length > 0;
      const hasNewCoachSummary = Boolean((analysis?.careerAnalysis as any)?.executiveSummary?.coachSummary);
      if (!hasNewEvidence || !hasNewCoachSummary) {
        try {
          const enhancement = await enhanceEvidenceBundle(
            answers,
            {
              resumeParsedData: assessment.resumeParsedData,
              linkedinParsedData: assessment.linkedinParsedData,
              resumeRawText: assessment.resumeRawText,
              linkedinRawText: assessment.linkedinRawText,
            },
            analysis?.marketIntelligence || assessment.marketIntelligence,
            analysis?.aiInsights || updatedAssessment.aiInsights,
            analysis?.careerAnalysis || updatedAssessment.careerAnalysis
          );
          if (enhancement) {
            const mergedInsights = {
              ...(analysis?.aiInsights || updatedAssessment.aiInsights || {}),
              ...(enhancement.aiInsights || {}),
            };
            const mergedCareerAnalysis = {
              ...(analysis?.careerAnalysis || updatedAssessment.careerAnalysis || {}),
              executiveSummary: {
                ...(analysis?.careerAnalysis as any)?.executiveSummary,
                ...(updatedAssessment.careerAnalysis as any)?.executiveSummary,
                ...(enhancement.careerAnalysis?.executiveSummary || {}),
              },
            };
            await prisma.assessment.update({
              where: { id: assessment.id },
              data: {
                aiInsights: mergedInsights as Prisma.InputJsonValue,
                careerAnalysis: mergedCareerAnalysis as Prisma.InputJsonValue,
              },
            });
          }
        } catch (_err) {
          // best-effort enhancement
        }
      }
    }

    return NextResponse.json({ status: aiReady ? "ready" : "failed", reason: aiFailed ? failureReason : null });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to ensure AI" }, { status: 500 });
  }
}
