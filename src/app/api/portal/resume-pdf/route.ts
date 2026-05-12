import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { prisma, isDatabaseReady } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";

export const maxDuration = 20;

const PDF_KEY = "resume_pdf_v1";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ pdf: null });
  if (!isDatabaseReady()) return NextResponse.json({ pdf: null });
  try {
    const record = await prisma.userPortalState.findUnique({
      where: { userId_key: { userId, key: PDF_KEY } },
    });
    const pdf = record ? (record.data as string) : null;
    const res = NextResponse.json({ pdf });
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  } catch {
    return NextResponse.json({ pdf: null });
  }
}

export async function POST(request: NextRequest) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDatabaseReady()) return NextResponse.json({ ok: true });
  try {
    const body = await request.json() as { pdf?: string };
    const pdf = body.pdf;
    if (!pdf || typeof pdf !== "string") {
      return NextResponse.json({ error: "pdf required" }, { status: 400 });
    }
    // Reject payloads over 6 MB (base64 of ~4.5 MB PDF)
    if (pdf.length > 6 * 1024 * 1024) {
      return NextResponse.json({ error: "PDF too large" }, { status: 413 });
    }
    await prisma.userPortalState.upsert({
      where: { userId_key: { userId, key: PDF_KEY } },
      update: { data: pdf as unknown as object },
      create: { userId, key: PDF_KEY, data: pdf as unknown as object },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
