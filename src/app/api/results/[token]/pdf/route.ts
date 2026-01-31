import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildResults } from "@/lib/results";
import { buildProPack } from "@/lib/pro-pack";
import { logEvent } from "@/lib/events";
import { ResultsPdf } from "@/lib/pdf";
import { renderToBuffer } from "@react-pdf/renderer";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: { token: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { token: params.token },
    include: { purchases: true },
  });
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const results = buildResults(lead.answers as any);
  const purchased = lead.purchases.some((purchase) => purchase.status === "SUCCEEDED");
  const proPack = purchased ? buildProPack(lead.answers as any) : undefined;
  const pdf = await renderToBuffer(ResultsPdf({ results, proPack }));
  const pdfBytes = new Uint8Array(pdf);
  await logEvent("pdf_downloaded", {}, lead.id);
  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=job-search-system.pdf",
    },
  });
}
