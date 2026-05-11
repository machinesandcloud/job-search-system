import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { saveGeneratedResume, getGeneratedResumeHistory } from "@/lib/mvp/store";
import { ensureSameOrigin } from "@/lib/utils";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ snapshots: [] });
  const snapshots = await getGeneratedResumeHistory(userId);
  return NextResponse.json({ snapshots });
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await request.json().catch(() => ({})) as {
    type?: string;
    label?: string;
    filename?: string;
    resumeText?: string;
    scores?: { overall: number; ats: number; impact: number; clarity: number };
  };

  if (!body.resumeText || !body.type) {
    return NextResponse.json({ error: "type and resumeText required" }, { status: 400 });
  }

  const record = await saveGeneratedResume(userId, {
    type: body.type === "power_optimized" ? "power_optimized" : "revised",
    label: body.label || (body.type === "power_optimized" ? "Power Optimized" : "Revised"),
    filename: body.filename || "resume",
    resumeText: body.resumeText,
    scores: body.scores,
  });

  return NextResponse.json({ ok: true, id: record.id });
}
