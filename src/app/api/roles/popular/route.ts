import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const roles = await prisma.role.findMany({
    where: { isPopular: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    take: 8,
    select: {
      id: true,
      name: true,
      isPopular: true,
    },
  });
  return NextResponse.json({ roles });
}
