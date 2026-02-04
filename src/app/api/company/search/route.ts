import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { companySearchSchema } from "@/lib/validation";

const cache = new Map<string, { results: any[]; expiresAt: number }>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  return handleSearch(query);
}

export async function POST(request: Request) {
  const body = await request.json();
  const query = body?.q || "";
  return handleSearch(query);
}

async function handleSearch(query: string) {
  const parsed = companySearchSchema.safeParse({ q: query });
  if (!parsed.success) {
    return NextResponse.json({ results: [] });
  }

  const cached = cache.get(query.toLowerCase());
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json({ results: cached.results });
  }

  const dbResults = await prisma.company.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
    take: 8,
    select: {
      id: true,
      name: true,
      logoUrl: true,
      category: true,
    },
  });

  const results = dbResults.map((company) => ({
    id: company.id,
    name: company.name,
    logoUrl: company.logoUrl,
    category: company.category,
  }));

  cache.set(query.toLowerCase(), { results, expiresAt: Date.now() + 1000 * 60 * 60 * 24 });
  return NextResponse.json({ results });
}
