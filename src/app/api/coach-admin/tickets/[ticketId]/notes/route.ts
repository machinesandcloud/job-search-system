import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";

export async function POST(
  request: NextRequest,
  { params }: RouteContext<"/api/coach-admin/tickets/[ticketId]/notes">
) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const { user } = await requireCoachAdminActor("support");
  const { ticketId } = await params;
  const body = await request.json().catch(() => ({}));
  const note = String(body.note || "").trim();
  if (!note) {
    return NextResponse.json({ error: "Note is required." }, { status: 400 });
  }

  const ticket = await prisma.supportTicket.findUnique({ where: { id: ticketId } });
  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
  }

  const adminNote = await prisma.adminNote.create({
    data: {
      accountId: ticket.accountId,
      userId: user.id,
      supportTicketId: ticket.id,
      note,
    },
  });

  return NextResponse.json({ ok: true, noteId: adminNote.id });
}
