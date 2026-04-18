import { NextResponse } from "next/server";
// pdf-parse v1 — default export is a function: pdfParse(buffer) => Promise<{text}>
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string }>;
import mammoth from "mammoth";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const mime = file.type || "";
    const name = (file as File).name?.toLowerCase() ?? "";

    let text = "";

    if (mime === "application/pdf" || name.endsWith(".pdf")) {
      const result = await pdfParse(buffer);
      text = result.text;
    } else if (
      mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      name.endsWith(".docx")
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      // TXT / plain text
      text = buffer.toString("utf-8");
    }

    text = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();

    if (!text || text.length < 20) {
      return NextResponse.json(
        { error: "Could not extract readable text from this file. Try saving as TXT or DOCX." },
        { status: 422 },
      );
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error("[extract]", err);
    return NextResponse.json(
      { error: "Failed to read file — try a PDF, DOCX, or TXT." },
      { status: 500 },
    );
  }
}
