import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: { purchases: true, companies: { include: { company: true } }, events: true },
  });
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ lead });
}
