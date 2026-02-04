import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { assessmentStartSchema, sanitizeAnswers } from "@/lib/validation";
import { getClientIp, ensureSameOrigin } from "@/lib/utils";
import { getUserSession } from "@/lib/user-auth";
import { rateLimit } from "@/lib/rate-limit";
import { logEvent } from "@/lib/events";
import { defaultAnswers } from "@/lib/defaults";

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
  const parsed = assessmentStartSchema.safeParse(normalizedBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const ip = getClientIp(request);
  const session = await getUserSession();
  const limit = rateLimit(ip, 10);
  if (!limit.ok) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const merged = {
    ...defaultAnswers,
    ...(parsed.data.answers || {}),
  };
  const rolesJson = JSON.parse(JSON.stringify(merged.targetRoles)) as Prisma.InputJsonValue;
  const companiesJson = JSON.parse(JSON.stringify(merged.targetCompanies)) as Prisma.InputJsonValue;

  const assessment = await prisma.assessment.create({
    data: {
      ...merged,
      targetRoles: rolesJson,
      targetCompanies: companiesJson,
      ipAddress: ip,
      userAgent: request.headers.get("user-agent") || "",
      userId: session?.userId || null,
    },
  });
  await logEvent("wizard_started", {}, assessment.id);
  return NextResponse.json({ assessmentId: assessment.id });
}
