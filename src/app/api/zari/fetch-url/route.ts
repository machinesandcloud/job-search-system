import { NextResponse } from "next/server";
import { ensureSameOrigin } from "@/lib/utils";

// Job boards that are JavaScript SPAs — server-side fetch only gets an empty shell
const SPA_PATTERNS = [
  /workforcenow\.adp\.com/i,
  /myworkdayjobs\.com/i,
  /wd\d+\.myworkdayjobs\.com/i,
  /taleo\.net/i,
  /icims\.com/i,
  /successfactors\.(com|eu)/i,
  /sapsf\.com/i,
  /jobs\.smartrecruiters\.com/i,
  /recruiting\.ultipro\.com/i,
  /jobs\.jobvite\.com/i,
  /hire\.withgoogle\.com/i,
];

// Keywords that indicate we actually got real job content (not a shell)
const JOB_KEYWORDS = ["responsibilities", "requirements", "qualifications", "experience", "skills", "benefits", "salary", "position", "role", "opportunity"];

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
  if (SPA_PATTERNS.some(p => p.test(url))) {
    return NextResponse.json(
      { error: "This job board loads with JavaScript, so we can't scrape it directly. Open the posting, copy all the text, and paste it instead." },
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

    // Check if we got actual job content or just a JS-app shell
    const lower = text.toLowerCase();
    const hasJobContent = JOB_KEYWORDS.some(kw => lower.includes(kw));
    if (!hasJobContent && text.length < 800) {
      return NextResponse.json(
        { error: "This page appears to be a JavaScript app — the job description didn't load. Open the posting, copy all the text, and paste it instead." },
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
