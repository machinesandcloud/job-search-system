import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { groqChatText } from "@/lib/llm";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  if (!isDatabaseReady()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const body = await request.json();
  const assessmentId = body?.assessmentId;
  const message = body?.message?.toString?.() || "";

  if (!assessmentId || !message.trim()) {
    return NextResponse.json({ error: "Missing assessmentId or message" }, { status: 400 });
  }

  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    select: {
      targetRoles: true,
      level: true,
      compTarget: true,
      timeline: true,
      hoursPerWeek: true,
      targetCompanies: true,
      resumeParsedData: true,
      linkedinParsedData: true,
      aiInsights: true,
    },
  });

  const systemPrompt =
    "You are an expert tech career coach. Provide concise, specific answers based on the user's actual resume, LinkedIn, and assessment data. Avoid generic advice.";

  const userPrompt = `
User question:
${message}

Assessment:
${JSON.stringify(
  {
    targetRoles: assessment?.targetRoles,
    level: assessment?.level,
    compTarget: assessment?.compTarget,
    timeline: assessment?.timeline,
    hoursPerWeek: assessment?.hoursPerWeek,
    targetCompanies: assessment?.targetCompanies,
  },
  null,
  2
)}

Resume:
${JSON.stringify(assessment?.resumeParsedData || {}, null, 2)}

LinkedIn:
${JSON.stringify(assessment?.linkedinParsedData || {}, null, 2)}

AI Insights:
${JSON.stringify(assessment?.aiInsights || {}, null, 2)}

Return a short, actionable response in plain text.
`;

  const aiMessage = await groqChatText(systemPrompt, userPrompt);

  if (!aiMessage) {
    return NextResponse.json({
      message:
        "AI is unavailable right now. Please try again in a moment. Your data is saved.",
      aiEnabled: false,
    });
  }

  return NextResponse.json({ message: aiMessage, aiEnabled: true });
}
