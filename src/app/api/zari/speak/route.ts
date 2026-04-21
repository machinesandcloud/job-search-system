import { ensureSameOrigin } from "@/lib/utils";

// ElevenLabs pre-built voices — stable IDs
export const ELEVENLABS_VOICES: Record<string, { id: string; label: string; gender: string }> = {
  lauren:  { id: "DODLEQrClDo8wCz460ld", label: "Lauren",  gender: "f" },
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

  /* ── ElevenLabs (preferred) ── */
  if (elKey) {
    // Accept either a direct ElevenLabs voice ID (20+ alphanum chars) or a named key
    const isDirectId = voice.length >= 18 && /^[a-zA-Z0-9]+$/.test(voice);
    const voiceId = isDirectId ? voice : (ELEVENLABS_VOICES[voice]?.id ?? ELEVENLABS_VOICES["aria"].id);
    const v = { id: voiceId };
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${v.id}/stream`,
      {
        method: "POST",
        headers: { "xi-api-key": elKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
        body: JSON.stringify({
          text,
          model_id: "eleven_flash_v2_5",
          // Lower stability = more expressive/natural, higher style = more emotion
          voice_settings: { stability: 0.28, similarity_boost: 0.75, style: 0.6, use_speaker_boost: true },
        }),
      },
    );
    if (res.ok) {
      return new Response(res.body, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
    }
    // ElevenLabs failed — log and fall through to OpenAI
    console.error(`ElevenLabs TTS ${res.status}: ${await res.text().catch(() => "")}`);
  }

  /* ── OpenAI TTS fallback ── */
  if (!oaiKey) return new Response("No TTS provider configured", { status: 500 });
  const oaiVoice = (OPENAI_VOICES as readonly string[]).includes(voice) ? voice : "shimmer";
  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${oaiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "tts-1", input: text.slice(0, 4096), voice: oaiVoice, response_format: "mp3" }),
  });
  if (!res.ok) {
    console.error(`OpenAI TTS ${res.status}: ${await res.text().catch(() => "")}`);
    return new Response("TTS failed", { status: 500 });
  }
  return new Response(res.body, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
}
