import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildResults } from "@/lib/results";
import { logEvent } from "@/lib/events";

export async function GET(_request: Request, { params }: { params: { token: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { token: params.token },
    include: { purchases: true, companies: { include: { company: true } } },
  });
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const results = buildResults(lead.answers as any);
  await logEvent("results_viewed", {}, lead.id);
  return NextResponse.json({
    leadId: lead.id,
    results,
    purchased: lead.purchases.some((p) => p.status === "SUCCEEDED"),
  });
}
