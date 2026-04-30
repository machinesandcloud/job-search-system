import { NextResponse } from "next/server";
import { requirePaidRouteAccess } from "@/lib/billing";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { createDocumentForUser } from "@/lib/mvp/store";

export async function POST(request: Request) {
  const access = await requirePaidRouteAccess("documents_upload", {}, { enforceTokenLimit: false });
  if (!access.ok) return access.response;
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const file = formData.get("file");
    const rawType = formData.get("type");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const document = await createDocumentForUser(userId, {
      title: file.name,
      type: rawType === "linkedin" || rawType === "notes" ? rawType : "resume",
      mimeType: file.type || "application/octet-stream",
      sizeBytes: file.size,
    });

    return NextResponse.json(document, { status: 201 });
  }

  const body = await request.json();
  const document = await createDocumentForUser(userId, {
    title: String(body.title || "Untitled document"),
    type: body.type === "linkedin" || body.type === "notes" ? body.type : "resume",
    mimeType: body.mimeType ? String(body.mimeType) : undefined,
    sizeBytes: typeof body.sizeBytes === "number" ? body.sizeBytes : undefined,
  });

  return NextResponse.json(document, { status: 201 });
}
