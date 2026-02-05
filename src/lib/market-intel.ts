import { groqChatJSON } from "@/lib/llm";

const BRAVE_ENDPOINT = "https://api.search.brave.com/res/v1/web/search";

type SearchResult = {
  title?: string;
  description?: string;
  url?: string;
};

async function braveSearch(query: string, count = 5) {
  const apiKey = process.env.BRAVE_API_KEY;
  if (!apiKey) {
    throw new Error("BRAVE_API_KEY is missing");
  }
  const url = new URL(BRAVE_ENDPOINT);
  url.searchParams.set("q", query);
  url.searchParams.set("count", String(count));
  const res = await fetch(url.toString(), {
    headers: {
      "Accept": "application/json",
      "X-Subscription-Token": apiKey,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Brave search failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  const results = (data?.web?.results || []) as SearchResult[];
  return results.map((item) => ({
    title: item.title || "",
    description: item.description || "",
    url: item.url || "",
  }));
}

export async function gatherMarketIntel(targetRole: string, companies: string[]) {
  const roleQuery = `${targetRole} job requirements 2024`;
  const salaryQuery = `${targetRole} salary 2024 total compensation`;
  const newsQuery = `${companies.slice(0, 3).join(" ")} hiring news 2024`;

  const [roleResults, salaryResults, newsResults] = await Promise.all([
    braveSearch(roleQuery, 6),
    braveSearch(salaryQuery, 6),
    braveSearch(newsQuery, 6),
  ]);

  const analysis = await groqChatJSON(
    "You are a job market analyst. Return valid JSON only.",
    `Extract actionable market intelligence from these results.

ROLE RESULTS:
${JSON.stringify(roleResults)}

SALARY RESULTS:
${JSON.stringify(salaryResults)}

NEWS RESULTS:
${JSON.stringify(newsResults)}

Return JSON with:
{
  "roleKeywords": [{ "keyword": "", "frequency": "", "notes": "" }],
  "salarySignals": { "range": "", "sources": [""], "notes": "" },
  "companyTrends": [{ "company": "", "signal": "", "source": "" }]
}`
  );

  if (!analysis) {
    throw new Error("Market intelligence parsing failed");
  }

  return {
    roleKeywords: analysis.roleKeywords || [],
    salarySignals: analysis.salarySignals || null,
    companyTrends: analysis.companyTrends || [],
    sources: {
      roleResults,
      salaryResults,
      newsResults,
    },
  };
}
