import { ensureSameOrigin } from "@/lib/utils";

// ElevenLabs pre-built voices — stable IDs
export const ELEVENLABS_VOICES: Record<string, { id: string; label: string; gender: string }> = {
  aria:    { id: "9BWtsMINqrJLrRacOk9x", label: "Aria",    gender: "f" },
  rachel:  { id: "21m00Tcm4TlvDq8ikWAM", label: "Rachel",  gender: "f" },
  jessica: { id: "cgSgspJ2msm6clMCkdW9", label: "Jessica", gender: "f" },
  roger:   { id: "CwhRBWXzGAHq8TQ4Fs17", label: "Roger",   gender: "m" },
  adam:    { id: "pNInz6obpgDQGcFmaJgB", label: "Adam",    gender: "m" },
  charlie: { id: "IKne3meq5aSn9XLyUdCD", label: "Charlie", gender: "m" },
};

export const OPENAI_VOICES = ["shimmer", "nova", "alloy", "echo", "onyx", "fable"] as const;

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return new Response("Forbidden", { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as { text?: string; voice?: string };
  const text  = (body.text  ?? "").trim();
  const voice = (body.voice ?? "").toLowerCase().trim();

  if (!text) return new Response("No text provided", { status: 400 });

  const elKey = process.env.ELEVENLABS_API_KEY;
  const oaiKey = process.env.OPENAI_API_KEY;

  /* ── ElevenLabs (preferred: better quality, lower latency) ── */
  if (elKey) {
    const v = ELEVENLABS_VOICES[voice] ?? ELEVENLABS_VOICES["aria"];
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${v.id}/stream`, {
      method: "POST",
      headers: {
        "xi-api-key": elKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_flash_v2_5",
        voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.45, use_speaker_boost: true },
        output_format: "mp3_44100_128",
      }),
    });
    if (!res.ok) return new Response("ElevenLabs TTS failed", { status: 500 });
    return new Response(res.body, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
  }

  /* ── OpenAI TTS fallback ── */
  if (!oaiKey) return new Response("No API key configured", { status: 500 });
  const oaiVoice = (OPENAI_VOICES as readonly string[]).includes(voice) ? voice : "shimmer";
  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${oaiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "tts-1", input: text.slice(0, 4096), voice: oaiVoice, response_format: "mp3" }),
  });
  if (!res.ok) return new Response("TTS failed", { status: 500 });
  return new Response(res.body, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
}
