import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";

export async function GET() {
  let database: "ok" | "error" | "unconfigured";

  if (!isDatabaseReady()) {
    database = "unconfigured";
  } else {
    try {
      await prisma.$queryRaw`SELECT 1`;
      database = "ok";
    } catch {
      database = "error";
    }
  }

  // Only expose database status — third-party service presence leaks env var info
  const ok = database === "ok";
  return NextResponse.json(
    { ok, database, ts: new Date().toISOString() },
    { status: ok ? 200 : 503 },
  );
}
