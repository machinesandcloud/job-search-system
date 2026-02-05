import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const body = await request.json();
  const assessmentId = body?.assessmentId;
  if (!assessmentId) {
    return NextResponse.json({ error: "Missing assessmentId" }, { status: 400 });
  }
  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    select: {
      resumeRawText: true,
      resumeAnalysis: true,
    },
  });
  if (!assessment?.resumeRawText) {
    return NextResponse.json({ error: "Resume text unavailable" }, { status: 400 });
  }

  const issues = (assessment.resumeAnalysis as any)?.issues || [];
  const fixes = issues.map((issue: any) => `- ${issue.suggestedFix}`).join("\n");
  const optimizedText = `${assessment.resumeRawText}\n\n--- Optimized Suggestions ---\n${fixes || "No fixes available yet."}\n`;

  return new NextResponse(optimizedText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": "attachment; filename=optimized_resume.txt",
    },
  });
}
