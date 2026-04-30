import { NextResponse } from "next/server";
import { requirePaidRouteAccess } from "@/lib/billing";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime = "nodejs";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse/lib/pdf-parse") as (buf: Buffer) => Promise<{ text: string }>;

export type ParsedJob = {
  company: string;
  title: string;
  dateRange: string;
  description: string;
};

export type ParsedProfile = {
  headline: string;
  summary: string;
  experienceJobs: ParsedJob[];
  education: string;
  skills: string;
  linkedinUrl: string;
  hasPhoto: boolean;
  recommendations: string;
};

async function extractSectionsWithAI(rawText: string): Promise<Omit<ParsedProfile, "hasPhoto">> {
  const systemPrompt = `You are a LinkedIn profile parser. Extract structured data from raw text taken from a LinkedIn PDF export.

Return ONLY valid JSON matching this exact structure:
{
  "headline": "<line directly under their name — job title and key skills>",
  "summary": "<full About/Summary section>",
  "experienceJobs": [
    {
      "company": "<company name>",
      "title": "<job title>",
      "dateRange": "<e.g. March 2023 - Present>",
      "description": "<all bullets/descriptions for this role>"
    }
  ],
  "education": "<all education entries: school, degree, dates>",
  "skills": "<comma-separated skills list>",
  "linkedinUrl": "<linkedin.com/in/username if visible, else empty string>",
  "recommendations": "<number and brief text of any recommendations listed, else empty string>"
}

Rules:
- Return up to 8 most recent jobs in experienceJobs (most recent first)
- Each job must have its bullets/description separated, NOT concatenated across jobs
- If a section is absent return empty string or empty array
- Do NOT fabricate content — only extract what is actually present`;

  const reply = await openaiChat(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Parse this LinkedIn profile:\n\n${rawText.slice(0, 9000)}` },
    ],
    { model: "gpt-4o-mini", temperature: 0.1, maxTokens: 2500, jsonMode: true }
  );

  if (!reply) throw new Error("AI parsing failed");
  const parsed = JSON.parse(reply) as Omit<ParsedProfile, "hasPhoto">;
  // Ensure experienceJobs is always an array
  if (!Array.isArray(parsed.experienceJobs)) parsed.experienceJobs = [];
  return parsed;
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const access = await requirePaidRouteAccess("zari_linkedin_parse_profile");
  if (!access.ok) return access.response;

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
      const result = await pdfParse(buffer);
      rawText = result.text;
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
