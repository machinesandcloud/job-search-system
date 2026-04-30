import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";

const VALID_STATUS = new Set(["open", "in_progress", "resolved", "closed"]);

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext<"/api/coach-admin/tickets/[ticketId]">
) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const { user } = await requireCoachAdminActor("support");
  const { ticketId } = await params;
  const body = await request.json().catch(() => ({}));
  const status = String(body.status || "").trim();
  const assignedToId = body.assignedTo ? String(body.assignedTo).trim() : null;

  const ticket = await prisma.supportTicket.findUnique({ where: { id: ticketId } });
  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
  }

  const updated = await prisma.supportTicket.update({
    where: { id: ticketId },
    data: {
      ...(VALID_STATUS.has(status) ? { status } : {}),
      ...(body.hasOwnProperty("assignedTo") ? { assignedToId: assignedToId || null } : {}),
      ...(status === "resolved" || status === "closed" ? { resolvedAt: new Date() } : body.hasOwnProperty("status") ? { resolvedAt: null } : {}),
    },
  });

  await prisma.adminNote.create({
    data: {
      accountId: updated.accountId,
      userId: user.id,
      supportTicketId: updated.id,
      note: `Ticket updated${VALID_STATUS.has(status) ? `: status → ${status}` : ""}${body.hasOwnProperty("assignedTo") ? `, assignedTo → ${assignedToId || "unassigned"}` : ""}.`,
    },
  });

  return NextResponse.json({ ok: true, ticketId: updated.id });
}
