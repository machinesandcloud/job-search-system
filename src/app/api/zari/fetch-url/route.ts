import { NextResponse } from "next/server";
import { ensureSameOrigin } from "@/lib/utils";
import { getCurrentUserId } from "@/lib/mvp/auth";

export const maxDuration = 15;

// Specific enough to not appear in JS/CSS code — require at least 2 to match
const JOB_KEYWORDS = [
  "responsibilities", "requirements", "qualifications",
  "compensation", "benefits", "salary", "candidate",
  "hiring manager", "we are looking", "you will", "you'll",
  "what you'll", "about the role", "about the job",
  "job description", "equal opportunity",
];

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await request.json().catch(() => ({})) as { url?: string };
  const url = (body.url ?? "").trim();

  if (!url || !/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: "Valid URL required" }, { status: 400 });
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
        { error: `Couldn't access that page (${res.status}). Try opening the job posting, copying all the text, and pasting it below.` },
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

    // Require at least 2 distinct job-specific phrases — single matches like
    // "position" or "role" appear in JS/CSS and produce false positives
    const lower = text.toLowerCase();
    const matchCount = JOB_KEYWORDS.filter(kw => lower.includes(kw)).length;

    if (text.length < 200 || matchCount < 2) {
      return NextResponse.json(
        { error: "This page requires JavaScript to load so we couldn't read the content. Open the job posting, select all the text (Cmd+A), copy it, and paste it below." },
        { status: 422 },
      );
    }

    return NextResponse.json({ text: text.slice(0, 5000) });
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach that URL. Check the link, or open the posting and paste the text below." },
      { status: 422 },
    );
  }
}
