import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { logEvent } from "@/lib/events";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  if (!isDatabaseReady()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const form = await request.formData();
  const leadId = form.get("leadId")?.toString();
  const kind = form.get("kind")?.toString() || "resume";
  const file = form.get("file") as File | null;

  if (!leadId || !file) {
    return NextResponse.json({ error: "Missing lead or file" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const content = Buffer.from(arrayBuffer);

  await prisma.leadAsset.create({
    data: {
      leadId,
      kind,
      filename: file.name,
      mimeType: file.type,
      size: file.size,
      content,
    },
  });

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (lead) {
    const answers = (lead.answers || {}) as Record<string, unknown>;
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        answers: {
          ...answers,
          resumeUploaded: true,
        },
      },
    });
  }

  await logEvent("resume_uploaded", { filename: file.name, size: file.size }, leadId);

  return NextResponse.json({ ok: true });
}
