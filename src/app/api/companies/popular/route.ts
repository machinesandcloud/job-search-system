import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const companies = await prisma.company.findMany({
    where: { isPopular: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    take: 16,
  });
  return NextResponse.json({ companies });
}
