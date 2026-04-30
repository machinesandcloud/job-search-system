import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { logAppEvent } from "@/lib/billing";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";

const VALID_CATEGORIES = new Set(["billing", "technical", "product", "account", "other"]);
const VALID_PRIORITIES = new Set(["low", "medium", "high", "urgent"]);

export async function POST(request: NextRequest) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const { user } = await requireCoachAdminActor("support");
  const body = await request.json().catch(() => ({}));
  const accountId = String(body.accountId || "").trim();
  const subject = String(body.subject || "").trim();
  const description = String(body.description || "").trim();
  const category = VALID_CATEGORIES.has(String(body.category || "").trim()) ? String(body.category).trim() : "other";
  const priority = VALID_PRIORITIES.has(String(body.priority || "").trim()) ? String(body.priority).trim() : "medium";
  const reporterId = String(body.userId || "").trim() || null;

  if (!accountId || !subject || !description) {
    return NextResponse.json({ error: "Account, subject, and description are required." }, { status: 400 });
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      accountId,
      userId: reporterId,
      subject,
      description,
      category,
      priority,
      status: "open",
    },
  });

  await prisma.adminNote.create({
    data: {
      accountId,
      userId: user.id,
      supportTicketId: ticket.id,
      note: "Ticket created from coach admin.",
    },
  });

  await logAppEvent("support_ticket_created", {
    accountId,
    userId: user.id,
    metadataJson: {
      supportTicketId: ticket.id,
      category,
      priority,
    },
  });

  return NextResponse.json({ ok: true, ticketId: ticket.id });
}
