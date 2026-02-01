import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { companySearchSchema } from "@/lib/validation";
import { companySeed } from "@/lib/company-data";

const cache = new Map<string, { results: any[]; expiresAt: number }>();

function getFavicon(domain?: string | null) {
  if (!domain) return null;
  return `https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`;
}

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

  let results: any[] = [];
  if (process.env.CLEARBIT_API_KEY) {
    const res = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(query)}`);
    if (res.ok) {
      const data = await res.json();
      results = data.slice(0, 8).map((item: any) => ({
        name: item.name,
        domain: item.domain,
        logoUrl: getFavicon(item.domain) || item.logo || null,
        industry: item.category?.industry || null,
        size: item.metrics?.employees ? `${item.metrics.employees}+` : null,
      }));
    }
  }

  if (!results.length) {
    try {
      const dbResults = await prisma.company.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { domain: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 8,
      });
      if (dbResults.length) {
        results = dbResults.map((company) => ({
          name: company.name,
          domain: company.domain,
          logoUrl: company.logoUrl || getFavicon(company.domain),
          industry: company.industry,
          size: company.sizeRange,
        }));
      }
    } catch {
      results = [];
    }
  }

  if (!results.length) {
    const local = companySeed
      .filter((company) => company.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8)
      .map((company) => ({
        name: company.name,
        domain: company.domain,
        logoUrl: getFavicon(company.domain),
        industry: company.industry,
        size: company.size,
      }));
    results = local;
  }

  cache.set(query.toLowerCase(), { results, expiresAt: Date.now() + 1000 * 60 * 60 * 24 });
  return NextResponse.json({ results });
}
