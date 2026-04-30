import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";

export async function POST(
  request: NextRequest,
  { params }: RouteContext<"/api/coach-admin/accounts/[accountId]/notes">
) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const { user } = await requireCoachAdminActor("support");
  const { accountId } = await params;
  const body = await request.json().catch(() => ({}));
  const note = String(body.note || "").trim();
  if (!note) {
    return NextResponse.json({ error: "Note is required." }, { status: 400 });
  }

  const account = await prisma.account.findUnique({ where: { id: accountId } });
  if (!account) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  const adminNote = await prisma.adminNote.create({
    data: {
      accountId,
      userId: user.id,
      note,
    },
  });

  return NextResponse.json({ ok: true, noteId: adminNote.id });
}
