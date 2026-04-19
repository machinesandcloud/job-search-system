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
};

async function extractSectionsWithAI(rawText: string): Promise<Omit<ParsedProfile, "hasPhoto">> {
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
  return JSON.parse(reply) as Omit<ParsedProfile, "hasPhoto">;
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "File upload required" }, { status: 400 });
  }

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
    return NextResponse.json({ ...sections, hasPhoto: false });
  } catch (err) {
    console.error("[linkedin/parse-profile]", err);
    return NextResponse.json({ error: "Failed to parse profile file." }, { status: 500 });
  }
}
