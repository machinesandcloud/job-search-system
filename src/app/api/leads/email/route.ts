import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { emailSchema } from "@/lib/validation";
import { sendResultsEmail } from "@/lib/email";
import { ensureSameOrigin } from "@/lib/utils";
import { logEvent } from "@/lib/events";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const body = await request.json();
  const parsed = emailSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const { leadId, email, website } = parsed.data;
  if (website) {
    await logEvent("honeypot_triggered", { leadId }, leadId);
    return NextResponse.json({ ok: true });
  }
  await prisma.lead.update({
    where: { id: leadId },
    data: { email },
  });
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: { purchases: true },
  });
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  await logEvent("email_submitted", { email }, leadId);
  await sendResultsEmail(email, lead.token, lead.purchases.some((p) => p.status === "SUCCEEDED"));
  return NextResponse.json({ ok: true, token: lead.token });
}
