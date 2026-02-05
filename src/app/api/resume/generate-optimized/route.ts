import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { groqChatText } from "@/lib/llm";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  if (!isDatabaseReady()) {
    return NextResponse.json({ error: "Database not ready" }, { status: 500 });
  }
  const body = await request.json();
  const assessmentId = body?.assessmentId as string | undefined;
  if (!assessmentId) {
    return NextResponse.json({ error: "Missing assessmentId" }, { status: 400 });
  }
  const assessment = await prisma.assessment.findUnique({ where: { id: assessmentId } });
  if (!assessment) {
    return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
  }
  if (!assessment.hasPurchasedPro) {
    return NextResponse.json({ error: "Pro Pack required for optimized resume export." }, { status: 403 });
  }
  const resumeText = assessment.resumeRawText;
  if (!resumeText) {
    return NextResponse.json({ error: "Resume text unavailable. Re-upload your resume." }, { status: 400 });
  }

  const systemPrompt =
    "You are an expert tech resume writer. Rewrite resumes to be concise, ATS-optimized, and impact-focused. Return plain text only.";
  const userPrompt = `
Rewrite this resume to be optimized for the target roles. Keep it factual and faithful to the original content, but tighten language, add impact, and fix formatting. Return plain text only.

TARGET ROLES:
${JSON.stringify(assessment.targetRoles || [])}

TARGET LEVEL:
${assessment.level}

RESUME:
${resumeText}
`;

  const optimized = await groqChatText(systemPrompt, userPrompt);
  if (!optimized) {
    return NextResponse.json({ error: "AI optimization failed. Please try again." }, { status: 503 });
  }

  return new NextResponse(optimized, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": "attachment; filename=optimized_resume.txt",
    },
  });
}
