import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { leadStartSchema, sanitizeAnswers } from "@/lib/validation";
import { generateToken, getClientIp, hashIp, ensureSameOrigin } from "@/lib/utils";
import { getUserSession } from "@/lib/user-auth";
import { rateLimit } from "@/lib/rate-limit";
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
  const parsed = leadStartSchema.safeParse(normalizedBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const ip = getClientIp(request);
  const ipHash = hashIp(ip);
  const session = await getUserSession();
  const limit = rateLimit(ipHash, 10);
  if (!limit.ok) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }
  const answersJson = parsed.data.answers
    ? (JSON.parse(JSON.stringify(parsed.data.answers)) as Prisma.InputJsonValue)
    : {};
  const lead = await prisma.lead.create({
    data: {
      email: null,
      answers: answersJson,
      score: 0,
      subscores: {},
      route: "DIY",
      token: generateToken(16),
      ipHash,
      userAgent: request.headers.get("user-agent") || "",
      userId: session?.userId || null,
      ...(session?.email ? { email: session.email } : {}),
    },
  });
  await logEvent("wizard_started", {}, lead.id);
  return NextResponse.json({ leadId: lead.id });
}
