import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createUserSession, verifyPassword } from "@/lib/user-auth";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  leadId: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { email, password, leadId } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await verifyPassword(password, user.password);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  if (leadId) {
    await prisma.lead.updateMany({
      where: { id: leadId },
      data: { userId: user.id, email },
    });
  }

  await createUserSession(user.id);
  return NextResponse.json({ ok: true });
}
