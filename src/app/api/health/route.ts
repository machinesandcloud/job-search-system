import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";

export async function GET() {
  const checks: Record<string, "ok" | "error" | "unconfigured"> = {};

  // Database
  if (!isDatabaseReady()) {
    checks.database = "unconfigured";
  } else {
    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.database = "ok";
    } catch {
      checks.database = "error";
    }
  }

  // Required env vars
  checks.stripe = process.env.STRIPE_SECRET_KEY ? "ok" : "unconfigured";
  checks.openai = process.env.OPENAI_API_KEY ? "ok" : "unconfigured";
  checks.resend = process.env.RESEND_API_KEY ? "ok" : "unconfigured";

  const allOk = Object.values(checks).every(v => v === "ok");

  return NextResponse.json(
    { ok: allOk, checks, ts: new Date().toISOString() },
    { status: allOk ? 200 : 503 }
  );
}
