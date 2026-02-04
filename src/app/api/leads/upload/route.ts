import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import path from "path";
import fs from "fs/promises";
import { ensureSameOrigin } from "@/lib/utils";

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

    const dataUrl = storedUrl || `data:${file.type};base64,${buffer.toString("base64")}`;

    if (kind === "resume") {
      await prisma.assessment.update({
        where: { id: assessmentId },
        data: {
          resumeFileUrl: dataUrl,
          resumeFileName: file.name,
          resumeFileSize: file.size,
        },
      });
    }

    if (kind === "linkedin") {
      await prisma.assessment.update({
        where: { id: assessmentId },
        data: {
          linkedinFileUrl: dataUrl,
          linkedinFileName: file.name,
        },
      });
    }

    return NextResponse.json({
      url: dataUrl,
      name: file.name,
      size: file.size,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Upload failed" },
      { status: 500 }
    );
  }
}
