import { NextResponse } from "next/server";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string }>;

type ParsedProfile = {
  headline: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  linkedinUrl: string;
  hasPhoto: boolean;
  rawText: string;
};

async function extractSectionsWithAI(rawText: string): Promise<Omit<ParsedProfile, "rawText" | "hasPhoto">> {
  const systemPrompt = `You are a LinkedIn profile parser. Given raw text extracted from a LinkedIn PDF download, extract the structured sections.

Return ONLY valid JSON:
{
  "headline": "<the person's LinkedIn headline — the line that appears directly under their name, usually contains job title and key skills>",
  "summary": "<the About/Summary section content — their personal pitch>",
  "experience": "<all job entries: company, title, dates, and bullet descriptions concatenated>",
  "education": "<all education entries: school, degree, dates>",
  "skills": "<skills listed in the Skills section, comma-separated>",
  "linkedinUrl": "<linkedin.com/in/username if visible anywhere in the text, else empty string>"
}

Rules:
- If a section is absent or you can't find it, return an empty string for that field
- Do NOT fabricate content — only extract what's actually in the text
- For experience: keep the full text of each role including bullets
- The headline is typically 1-2 lines directly after the person's name at the top`;

  const reply = await openaiChat(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Parse this LinkedIn profile:\n\n${rawText.slice(0, 8000)}` },
    ],
    { model: "gpt-4o-mini", temperature: 0.1, maxTokens: 2000, jsonMode: true }
  );

  if (!reply) throw new Error("AI parsing failed");
  return JSON.parse(reply) as Omit<ParsedProfile, "rawText" | "hasPhoto">;
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") ?? "";

  // ── PDF / file upload path ──
  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!file || typeof file === "string") {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }

      const buffer = Buffer.from(await (file as File).arrayBuffer());
      const name = (file as File).name?.toLowerCase() ?? "";
      const mime = (file as File).type ?? "";

      let rawText = "";
      if (mime === "application/pdf" || name.endsWith(".pdf")) {
        const parsed = await pdfParse(buffer);
        rawText = parsed.text;
      } else {
        rawText = buffer.toString("utf-8");
      }

      rawText = rawText.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();

      if (!rawText || rawText.length < 50) {
        return NextResponse.json({ error: "Could not extract text from this file." }, { status: 422 });
      }

      const sections = await extractSectionsWithAI(rawText);
      return NextResponse.json({ ...sections, hasPhoto: false, rawText });
    } catch (err) {
      console.error("[linkedin/parse-profile file]", err);
      return NextResponse.json({ error: "Failed to parse profile file." }, { status: 500 });
    }
  }

  // ── LinkedIn URL fetch path ──
  try {
    const body = await request.json().catch(() => ({})) as { url?: string };
    const url = (body.url ?? "").trim();

    if (!url || !url.includes("linkedin.com")) {
      return NextResponse.json({ error: "Valid LinkedIn URL required" }, { status: 400 });
    }

    const proxycurlKey = process.env.PROXYCURL_API_KEY;

    // ── Proxycurl path (requires API key) ──
    if (proxycurlKey) {
      const pcRes = await fetch(
        `https://nubela.co/proxycurl/api/v2/linkedin?url=${encodeURIComponent(url)}&skills=include&extra=include`,
        {
          headers: { Authorization: `Bearer ${proxycurlKey}` },
          signal: AbortSignal.timeout(15000),
        }
      );

      if (!pcRes.ok) {
        const msg = pcRes.status === 404 ? "Profile not found — check the URL." :
                    pcRes.status === 402 ? "LinkedIn API credits exhausted." :
                    "Could not retrieve that profile. Try the PDF upload instead.";
        return NextResponse.json({ error: msg }, { status: 422 });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pc = await pcRes.json() as Record<string, any>;

      const headline = (pc.headline ?? "") as string;
      const summary  = (pc.summary ?? "") as string;
      const skills   = ((pc.skills ?? []) as string[]).join(", ");
      const education = ((pc.education ?? []) as {school?:{name?:string}; degree_name?:string; starts_at?:{year?:number}; ends_at?:{year?:number}}[])
        .map(e => [e.school?.name, e.degree_name, e.ends_at?.year ?? e.starts_at?.year].filter(Boolean).join(", "))
        .join("\n");
      const experience = ((pc.experiences ?? []) as {company?:string; title?:string; starts_at?:{year?:number}; ends_at?:{year?:number}; description?:string}[])
        .slice(0, 5)
        .map(e => {
          const dateRange = [e.starts_at?.year, e.ends_at?.year ?? "Present"].filter(Boolean).join(" – ");
          return [e.title, e.company, dateRange, e.description].filter(Boolean).join("\n");
        })
        .join("\n\n");

      return NextResponse.json({
        headline, summary, experience, education, skills,
        linkedinUrl: url, hasPhoto: !!(pc.profile_pic_url),
        rawText: "",
      });
    }

    // ── No Proxycurl key: LinkedIn blocks server-side fetching ──
    // LinkedIn's pages are JavaScript-rendered; a plain fetch returns an auth wall.
    return NextResponse.json(
      { error: "URL analysis requires a LinkedIn data API key (PROXYCURL_API_KEY). Please use the PDF upload option instead — it works just as well and takes 30 seconds." },
      { status: 422 }
    );
  } catch {
    return NextResponse.json(
      { error: "Could not reach LinkedIn. Please use the PDF upload option instead." },
      { status: 422 }
    );
  }
}
