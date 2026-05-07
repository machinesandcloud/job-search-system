import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { prisma, isDatabaseReady } from "@/lib/db";

export const maxDuration = 15;

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDatabaseReady()) return NextResponse.json({});

  try {
    const states = await prisma.userPortalState.findMany({ where: { userId } });
    const result: Record<string, unknown> = {};
    for (const s of states) {
      result[s.key] = s.data;
    }
    const res = NextResponse.json(result);
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  } catch {
    return NextResponse.json({});
  }
}

export async function PUT(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDatabaseReady()) return NextResponse.json({ ok: true });

  try {
    const body = await req.json();
    const { key, data } = body as { key: string; data: unknown };
    if (!key || typeof key !== "string") {
      return NextResponse.json({ error: "Invalid key" }, { status: 400 });
    }
    await prisma.userPortalState.upsert({
      where: { userId_key: { userId, key } },
      update: { data: data as object },
      create: { userId, key, data: data as object },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
