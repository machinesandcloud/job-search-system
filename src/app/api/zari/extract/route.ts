import { NextResponse } from "next/server";
import mammoth from "mammoth";

async function extractPdfText(buffer: Buffer): Promise<string> {
  // pdf-parse v2 uses PDFParse class
  const { PDFParse } = await import("pdf-parse") as unknown as { PDFParse: new () => { loadPDF: (buf: Buffer) => Promise<{ pages: Array<{ lines: Array<{ words: Array<{ text: string }> }> }> }> } };
  const parser = new PDFParse();
  const doc = await parser.loadPDF(buffer);
  const lines: string[] = [];
  for (const page of doc.pages) {
    for (const line of page.lines) {
      lines.push(line.words.map((w) => w.text).join(" "));
    }
  }
  return lines.join("\n");
}

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
      text = await extractPdfText(buffer);
    } else if (
      mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      name.endsWith(".docx")
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      // TXT or anything else — treat as plain text
      text = buffer.toString("utf-8");
    }

    text = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();

    if (!text) {
      return NextResponse.json({ error: "Could not extract text from this file." }, { status: 422 });
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error("[extract]", err);
    return NextResponse.json({ error: "Failed to read file — try a PDF, DOCX, or TXT." }, { status: 500 });
  }
}
