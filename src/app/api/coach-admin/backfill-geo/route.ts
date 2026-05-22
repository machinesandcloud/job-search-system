import { NextRequest, NextResponse } from "next/server";
import { getCoachAdminSession } from "@/lib/coach-admin-auth";
import { isDatabaseReady, prisma } from "@/lib/db";
import { lookupCity } from "@/lib/geoip";

export const runtime = "nodejs";

const PRIVATE_IP = /^(127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|::1$|fc|fd)/i;

// GET — return how many sessions have IP addresses (eligible for backfill)
export async function GET() {
  const admin = await getCoachAdminSession();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDatabaseReady()) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });

  const total = await prisma.visitorSession.count({
    where: { ipAddress: { not: null } },
  });
  return NextResponse.json({ total });
}

// POST — re-geocode all sessions that have an IP address.
// Groups by unique IP so we do one lookup per IP, not per session.
export async function POST(req: NextRequest) {
  const admin = await getCoachAdminSession();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDatabaseReady()) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });

  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  // Optional: only update sessions where city IS NULL (skip re-checking known good data)
  const nullOnly = body.nullOnly === true;

  const where = nullOnly
    ? { ipAddress: { not: null }, city: null }
    : { ipAddress: { not: null } };

  const sessions = await prisma.visitorSession.findMany({
    where,
    select: { id: true, ipAddress: true },
  });

  // Group session IDs by IP so we look each IP up once
  const byIp = new Map<string, string[]>();
  for (const s of sessions) {
    if (!s.ipAddress || PRIVATE_IP.test(s.ipAddress)) continue;
    const ids = byIp.get(s.ipAddress) ?? [];
    ids.push(s.id);
    byIp.set(s.ipAddress, ids);
  }

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const [ip, ids] of byIp) {
    try {
      const geo = await lookupCity(ip);
      if (!geo || (!geo.city && !geo.region && !geo.country)) {
        skipped++;
        continue;
      }
      await prisma.visitorSession.updateMany({
        where: { id: { in: ids } },
        data: {
          ...(geo.city     !== null ? { city:     geo.city }     : {}),
          ...(geo.region   !== null ? { region:   geo.region }   : {}),
          ...(geo.country  !== null ? { country:  geo.country }  : {}),
          ...(geo.timezone !== null ? { timezone: geo.timezone } : {}),
        },
      });
      updated += ids.length;
    } catch {
      errors += ids.length;
    }
  }

  return NextResponse.json({
    ok: true,
    sessionsProcessed: sessions.length,
    uniqueIps: byIp.size,
    updated,
    skipped,
    errors,
  });
}
