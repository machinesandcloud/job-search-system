import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { purchases: true },
  });
  return NextResponse.json({ leads });
}
