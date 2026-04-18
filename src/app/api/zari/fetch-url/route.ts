import { NextResponse } from "next/server";
import { ensureSameOrigin } from "@/lib/utils";

// Job boards confirmed to be JavaScript SPAs — server-side fetch only gets an empty shell.
// Pattern matches anywhere in the hostname so subdomains are covered automatically.
const SPA_PATTERNS: { pattern: RegExp; name: string }[] = [
  { pattern: /workforcenow\.adp\.com/i,        name: "ADP Workforce Now" },
  { pattern: /myworkdayjobs\.com/i,             name: "Workday" },
  { pattern: /linkedin\.com\/jobs/i,            name: "LinkedIn" },
  { pattern: /taleo\.net/i,                     name: "Taleo" },
  { pattern: /icims\.com/i,                     name: "iCIMS" },
  { pattern: /successfactors\.(com|eu)/i,       name: "SAP SuccessFactors" },
  { pattern: /sapsf\.com/i,                     name: "SAP SuccessFactors" },
  { pattern: /smartrecruiters\.com/i,           name: "SmartRecruiters" },
  { pattern: /ultipro\.com/i,                   name: "UKG/UltiPro" },
  { pattern: /jobvite\.com/i,                   name: "Jobvite" },
  { pattern: /bamboohr\.com/i,                  name: "BambooHR" },
  { pattern: /breezy\.hr/i,                     name: "Breezy HR" },
  { pattern: /jazz\.hr/i,                       name: "JazzHR" },
  { pattern: /rippling\.com/i,                  name: "Rippling" },
  { pattern: /ashbyhq\.com/i,                   name: "Ashby" },
];

// Keywords that confirm we actually got real job content (not a JS-app shell)
const JOB_KEYWORDS = [
  "responsibilities", "requirements", "qualifications", "experience",
  "skills", "benefits", "salary", "position", "role", "opportunity",
];

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as { url?: string };
  const url = (body.url ?? "").trim();

  if (!url || !/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: "Valid URL required" }, { status: 400 });
  }

  // Detect known SPA job boards immediately — no point fetching
  const matched = SPA_PATTERNS.find(({ pattern }) => pattern.test(url));
  if (matched) {
    return NextResponse.json(
      { error: `${matched.name} loads with JavaScript and can't be scraped directly. Open the posting, select all text (Cmd+A / Ctrl+A), copy it, and paste it in the field below.` },
      { status: 422 },
    );
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Couldn't access that page (${res.status}) — paste the job description instead.` },
        { status: 422 },
      );
    }

    const html = await res.text();

    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/[ \t]{2,}/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (text.length < 100) {
      return NextResponse.json(
        { error: "This page didn't return readable content — it likely requires JavaScript. Paste the job description instead." },
        { status: 422 },
      );
    }

    // Heuristic: if text is short and has no job-related keywords, it's probably a JS shell
    const lower = text.toLowerCase();
    const hasJobContent = JOB_KEYWORDS.some(kw => lower.includes(kw));
    if (!hasJobContent && text.length < 800) {
      return NextResponse.json(
        { error: "This page appears to be a JavaScript app — the job content didn't load. Open the posting, copy all visible text, and paste it instead." },
        { status: 422 },
      );
    }

    return NextResponse.json({ text: text.slice(0, 5000) });
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach that URL — check the link or paste the job description instead." },
      { status: 422 },
    );
  }
}
