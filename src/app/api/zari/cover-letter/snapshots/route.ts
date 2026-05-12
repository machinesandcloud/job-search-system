import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { saveCoverLetterSnapshot, getCoverLetterSnapshots } from "@/lib/mvp/store";
import { ensureSameOrigin } from "@/lib/utils";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ snapshots: [] });
  const snapshots = await getCoverLetterSnapshots(userId);
  return NextResponse.json({ snapshots });
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await request.json().catch(() => ({})) as {
    subject?: string;
    company?: string;
    targetRole?: string;
    tone?: string;
    stage?: string;
    coverLetter?: string;
    tailoringNotes?: { decision: string; impact: string }[];
    keyStrengths?: { strength: string; evidence: string }[];
    openingHook?: string;
  };

  if (!body.coverLetter) {
    return NextResponse.json({ error: "coverLetter required" }, { status: 400 });
  }

  const record = await saveCoverLetterSnapshot(userId, {
    subject: body.subject || "Cover Letter",
    company: body.company || "",
    targetRole: body.targetRole || "",
    tone: body.tone || "professional",
    stage: body.stage || "job-search",
    coverLetter: body.coverLetter,
    tailoringNotes: body.tailoringNotes,
    keyStrengths: body.keyStrengths,
    openingHook: body.openingHook,
  });

  return NextResponse.json({ ok: true, id: record.id });
}
