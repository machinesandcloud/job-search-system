import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";

// Called by a scheduled job (e.g. Netlify scheduled function, cron-job.org)
// Protect with CRON_SECRET env var so it can't be triggered by anyone
export const maxDuration = 60;

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!isDatabaseReady()) {
    return NextResponse.json({ ok: false, error: "Database not configured." }, { status: 503 });
  }

  const now = new Date();

  const [sessions, resetTokens] = await Promise.all([
    prisma.appSession.deleteMany({ where: { expiresAt: { lt: now } } }),
    prisma.passwordResetToken.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: now } },
          { usedAt: { not: null } },
        ],
      },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    deleted: {
      expiredSessions: sessions.count,
      usedOrExpiredResetTokens: resetTokens.count,
    },
    ts: now.toISOString(),
  });
}
