import { ensureSameOrigin } from "@/lib/utils";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return new Response("Forbidden", { status: 403 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response("No API key configured", { status: 500 });
  }

  const body = await request.json().catch(() => ({})) as { text?: string };
  const text = (body.text ?? "").trim();
  if (!text) {
    return new Response("No text provided", { status: 400 });
  }

  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "tts-1",
      input: text.slice(0, 4096),
      voice: "shimmer",
      response_format: "mp3",
    }),
  });

  if (!res.ok) {
    return new Response("TTS failed", { status: 500 });
  }

  // Proxy stream directly — client starts playing on first bytes, no buffering
  return new Response(res.body, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
