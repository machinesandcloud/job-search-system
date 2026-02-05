import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ companies: [] });
  const companies = await prisma.company.findMany({
    where: { name: { contains: q, mode: "insensitive" } },
    orderBy: [{ isPopular: "desc" }, { sortOrder: "asc" }],
    take: 8,
    select: {
      id: true,
      name: true,
      slug: true,
      logoUrl: true,
      website: true,
      category: true,
      isPopular: true,
    },
  });
  return NextResponse.json({ companies });
}
