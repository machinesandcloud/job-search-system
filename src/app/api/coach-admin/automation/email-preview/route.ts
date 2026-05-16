import { NextRequest, NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { getSequencePreviewSteps } from "@/lib/email-sequences";
import type { ZariSequence } from "@/lib/email-sequences";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(request: NextRequest) {
  await requireCoachAdminActor("support");

  const { searchParams } = new URL(request.url);
  const sequence = searchParams.get("sequence") as ZariSequence | null;
  const step = parseInt(searchParams.get("step") ?? "0", 10);

  if (!sequence) {
    return new NextResponse("Missing sequence", { status: 400 });
  }

  const steps = await getSequencePreviewSteps(sequence);
  const found = steps.find(s => s.stepIndex === step);

  if (!found) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(found.html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
