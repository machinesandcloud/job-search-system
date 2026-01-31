import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadStartSchema } from "@/lib/validation";
import { generateToken, getClientIp, hashIp, ensureSameOrigin } from "@/lib/utils";
import { rateLimit } from "@/lib/rate-limit";
import { logEvent } from "@/lib/events";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const body = await request.json();
  const parsed = leadStartSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const ip = getClientIp(request);
  const ipHash = hashIp(ip);
  const limit = rateLimit(ipHash, 10);
  if (!limit.ok) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }
  const lead = await prisma.lead.create({
    data: {
      email: null,
      answers: parsed.data.answers ?? {},
      score: 0,
      subscores: {},
      route: "DIY",
      token: generateToken(16),
      ipHash,
      userAgent: request.headers.get("user-agent") || "",
    },
  });
  await logEvent("wizard_started", {}, lead.id);
  return NextResponse.json({ leadId: lead.id });
}
