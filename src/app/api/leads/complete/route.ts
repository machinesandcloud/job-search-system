import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { leadCompleteSchema, sanitizeAnswers } from "@/lib/validation";
import { computeScore } from "@/lib/scoring";
import { buildResults } from "@/lib/results";
import { generateToken, getClientIp, hashIp, ensureSameOrigin } from "@/lib/utils";
import { logEvent } from "@/lib/events";

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
  const parsed = leadCompleteSchema.safeParse(normalizedBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { answers, leadId } = parsed.data;
  const answersJson = JSON.parse(JSON.stringify(answers)) as Prisma.InputJsonValue;
  const { score, subscores, route } = computeScore(answers);

  const ipHash = hashIp(getClientIp(request));

  const lead = leadId
    ? await prisma.lead.update({
        where: { id: leadId },
        data: {
          answers: answersJson,
          score,
          subscores,
          route,
          ipHash,
        },
      })
    : await prisma.lead.create({
        data: {
          answers: answersJson,
          score,
          subscores,
          route,
          token: generateToken(16),
          ipHash,
          userAgent: request.headers.get("user-agent") || "",
        },
      });

  const companyIds: string[] = [];
  for (const company of answers.companyTargets) {
    const existing = await prisma.company.findFirst({
      where: {
        OR: [
          { name: company.name },
          company.domain ? { domain: company.domain } : undefined,
        ].filter(Boolean) as any,
      },
    });
    if (existing) {
      companyIds.push(existing.id);
      continue;
    }
    const logoUrl = company.domain
      ? `https://logo.clearbit.com/${company.domain}`
      : `https://www.google.com/s2/favicons?domain=${encodeURIComponent(company.name)}&sz=128`;
    const created = await prisma.company.create({
      data: {
        name: company.name,
        domain: company.domain || null,
        logoUrl,
        industry: company.industry || null,
        sizeRange: company.size || null,
        source: company.domain ? "MANUAL" : "MANUAL",
      },
    });
    companyIds.push(created.id);
  }
  if (companyIds.length) {
    await prisma.leadCompany.createMany({
      data: companyIds.map((companyId) => ({ leadId: lead.id, companyId })),
      skipDuplicates: true,
    });
  }

  await logEvent("wizard_completed", { score, route }, lead.id);
  const results = buildResults(answers);
  return NextResponse.json({
    token: lead.token,
    teaser: {
      score: results.score,
      subscores: results.subscores,
      coachRead: results.coachRead,
      positioningSummary: results.positioningSummary,
      insights: results.insights,
      cadencePreview: results.cadence[0]?.actions[0],
    },
  });
}
