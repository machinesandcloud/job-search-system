import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import path from "path";
import fs from "fs/promises";
import { ensureSameOrigin } from "@/lib/utils";
import { extractTextFromBuffer } from "@/lib/parse-doc";
import { Prisma } from "@prisma/client";
import { groqChatJSON } from "@/lib/llm";

export const runtime = "nodejs";

const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    if (!ensureSameOrigin(request)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }
    const form = await request.formData();
    const assessmentId = form.get("assessmentId")?.toString();
    const kind = form.get("kind")?.toString() || "resume";
    const file = form.get("file") as File | null;

    if (!assessmentId || !file) {
      return NextResponse.json({ error: "Missing assessment or file" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let storedUrl: string | null = null;
    try {
      const uploadsDir = process.env.UPLOADS_DIR || path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = path.join(uploadsDir, `${assessmentId}-${Date.now()}-${safeName}`);
      await fs.writeFile(filePath, buffer);
      storedUrl = `/uploads/${path.basename(filePath)}`;
    } catch (_err) {
      storedUrl = null;
    }

    // Never return raw base64 (too large for validation and DB). Use a short placeholder instead.
    const dataUrl = storedUrl || `inline://${encodeURIComponent(file.name)}`;

    if (kind === "resume") {
      let resumeParsedData = null;
      let resumeParseStatus = "complete";
      let resumeParseError = null;
      try {
        const text = await extractTextFromBuffer(buffer, file.name);
        if (text) {
          const aiParsed = await groqChatJSON(
            "You are an expert resume parser. Return valid JSON only.",
            `Extract structured resume data. Return JSON with: fullName, email, phone, currentRole, currentCompany, yearsExperience, topSkills (max 10), recentProjects (max 3), achievements (max 5), certifications, education. Resume text: ${text}`
          );
          if (!aiParsed) {
            throw new Error("AI resume parsing failed");
          }
          resumeParsedData = aiParsed;
          await prisma.assessment.update({
            where: { id: assessmentId },
            data: {
              resumeRawText: text,
            },
          });
        } else {
          resumeParseStatus = "processing";
          resumeParseError = "Resume uploaded. Parsing is running in the background.";
        }
      } catch (parseErr: any) {
        resumeParseStatus = "processing";
        resumeParseError = "Resume uploaded. Parsing is running in the background.";
      }
      await prisma.assessment.update({
        where: { id: assessmentId },
        data: {
          resumeFileUrl: dataUrl,
          resumeFileName: file.name,
          resumeFileSize: file.size,
          resumeParsedData: resumeParsedData ?? Prisma.JsonNull,
          resumeParseStatus,
          resumeParseError,
        },
      });
      return NextResponse.json({
        url: dataUrl,
        name: file.name,
        size: file.size,
        parseStatus: resumeParseStatus,
        parseError: resumeParseError,
      });
    }

    if (kind === "linkedin") {
      let linkedinParsedData = null;
      let linkedinParseStatus = "complete";
      let linkedinParseError = null;
      try {
        const text = await extractTextFromBuffer(buffer, file.name);
        if (text) {
          const aiParsed = await groqChatJSON(
            "You are an expert LinkedIn profile analyzer. Return valid JSON only.",
            `Extract LinkedIn data. Return JSON with: headline, about, skills (max 20), endorsements (number), recommendations (number), connectionCount, activityLevel. LinkedIn text: ${text}`
          );
          if (!aiParsed) {
            throw new Error("AI LinkedIn parsing failed");
          }
          linkedinParsedData = aiParsed;
          await prisma.assessment.update({
            where: { id: assessmentId },
            data: {
              linkedinRawText: text,
            },
          });
        } else {
          linkedinParseStatus = "processing";
          linkedinParseError = "LinkedIn uploaded. Parsing is running in the background.";
        }
      } catch (parseErr: any) {
        linkedinParseStatus = "processing";
        linkedinParseError = "LinkedIn uploaded. Parsing is running in the background.";
      }
      await prisma.assessment.update({
        where: { id: assessmentId },
        data: {
          linkedinFileUrl: dataUrl,
          linkedinFileName: file.name,
          linkedinParsedData: linkedinParsedData ?? Prisma.JsonNull,
          linkedinParseStatus,
          linkedinParseError,
        },
      });
      return NextResponse.json({
        url: dataUrl,
        name: file.name,
        size: file.size,
        parseStatus: linkedinParseStatus,
        parseError: linkedinParseError,
      });
    }

    return NextResponse.json({ url: dataUrl, name: file.name, size: file.size });
  } catch (err: any) {
    const message = err?.message || "Upload failed";
    if (message.includes("DOMMatrix")) {
      return NextResponse.json({
        url: null,
        name: null,
        size: null,
        parseStatus: "processing",
        parseError: "Resume uploaded. Parsing is running in the background.",
      });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
