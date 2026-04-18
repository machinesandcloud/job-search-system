import { NextResponse } from "next/server";
import { ensureSameOrigin } from "@/lib/utils";

const JOB_KEYWORDS = [
  "responsibilities", "requirements", "qualifications", "experience",
  "skills", "benefits", "salary", "position", "role", "opportunity",
  "candidate", "apply", "hiring", "team", "compensation",
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

    // Check if we got actual job content or just a JS-app shell
    const lower = text.toLowerCase();
    const hasJobContent = JOB_KEYWORDS.some(kw => lower.includes(kw));

    if (text.length < 200 || !hasJobContent) {
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
