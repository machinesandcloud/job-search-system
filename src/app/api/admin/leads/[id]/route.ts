import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const assessment = await prisma.assessment.findUnique({ where: { id } });
  if (!assessment) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ assessment });
}
