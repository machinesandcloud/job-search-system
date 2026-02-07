import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logEvent } from "@/lib/events";

export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const assessment = await prisma.assessment.findUnique({
    where: { token },
  });
  if (!assessment) return NextResponse.json({ error: "Not found" }, { status: 404, headers: { "Cache-Control": "no-store" } });
  await logEvent("results_viewed", {}, assessment.id);
  return NextResponse.json({
    assessmentId: assessment.id,
    assessment,
    purchased: assessment.hasPurchasedPro,
  }, { headers: { "Cache-Control": "no-store" } });
}
