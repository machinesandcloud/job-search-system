import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { saveLinkedInSnapshot, getLinkedInSnapshots } from "@/lib/mvp/store";
import { ensureSameOrigin } from "@/lib/utils";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ snapshots: [] });
  const snapshots = await getLinkedInSnapshots(userId);
  return NextResponse.json({ snapshots });
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await request.json().catch(() => ({})) as {
    label?: string;
    headline?: string;
    overallScore?: number;
    targetRole?: string;
    stage?: string;
    resultJson?: string;
    profileJson?: string;
  };

  if (!body.resultJson) {
    return NextResponse.json({ error: "resultJson required" }, { status: 400 });
  }

  const record = await saveLinkedInSnapshot(userId, {
    label: body.label || "LinkedIn Review",
    headline: body.headline || "",
    overallScore: body.overallScore ?? 0,
    targetRole: body.targetRole || "",
    stage: body.stage || "job-search",
    resultJson: body.resultJson,
    profileJson: body.profileJson,
  });

  return NextResponse.json({ ok: true, id: record.id });
}
