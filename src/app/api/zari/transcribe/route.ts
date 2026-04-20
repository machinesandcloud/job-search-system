import { NextResponse } from "next/server";
import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "No API key configured" }, { status: 500 });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const audio = formData.get("audio") as Blob | null;
  if (!audio) {
    return NextResponse.json({ error: "No audio provided" }, { status: 400 });
  }

  const oaiForm = new FormData();
  oaiForm.append("file", audio, "audio.webm");
  oaiForm.append("model", "whisper-1");
  oaiForm.append("language", "en");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: oaiForm,
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }

  const data = await res.json() as { text?: string };
  return NextResponse.json({ text: data.text ?? "" });
}
