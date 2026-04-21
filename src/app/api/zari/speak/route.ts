import { ensureSameOrigin } from "@/lib/utils";

export const OPENAI_VOICES = ["shimmer", "nova", "alloy", "echo", "onyx", "fable"] as const;

// Models to try in order — first one that succeeds wins
// eleven_turbo_v2_5 is available on Creator plan+; eleven_multilingual_v2 on all paid plans
const EL_MODELS = ["eleven_turbo_v2_5", "eleven_multilingual_v2"] as const;

const VOICE_SETTINGS = {
  stability:        0.35,  // lower = more expressive, emotional variation per sentence
  similarity_boost: 0.80,  // stay true to the voice character
  style:            0.55,  // dynamic delivery — higher brings out personality
  use_speaker_boost: true,
};

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return new Response("Forbidden", { status: 403 });
  }

  const body = await request.json().catch(() => ({})) as { text?: string; voice?: string };
  const text  = (body.text ?? "").trim();
  // DO NOT lowercase — ElevenLabs voice IDs are case-sensitive
  const voice = (body.voice ?? "").trim();

  if (!text) return new Response("No text provided", { status: 400 });

  const elKey  = process.env.ELEVENLABS_API_KEY;
  const oaiKey = process.env.OPENAI_API_KEY;

  /* ── ElevenLabs — try each model until one succeeds ── */
  if (elKey && voice) {
    for (const model_id of EL_MODELS) {
      const res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
        {
          method: "POST",
          headers: { "xi-api-key": elKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
          body: JSON.stringify({ text, model_id, voice_settings: VOICE_SETTINGS }),
        },
      );
      if (res.ok) {
        // Buffer fully — Netlify serverless functions don't reliably stream res.body
        const audio = await res.arrayBuffer();
        return new Response(audio, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
      }
      const errBody = await res.text().catch(() => "");
      console.error(`ElevenLabs TTS [${model_id}] ${res.status} for voice "${voice}": ${errBody}`);
      // 422 on this model = not available on plan → try next model
      // 403 = voice not in library → no point retrying with another model
      if (res.status === 403) break;
    }
  }

  /* ── OpenAI TTS fallback ── */
  if (!oaiKey) return new Response("No TTS provider configured", { status: 500 });
  const oaiVoice = (OPENAI_VOICES as readonly string[]).includes(voice as typeof OPENAI_VOICES[number]) ? voice : "shimmer";
  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${oaiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "tts-1", input: text.slice(0, 4096), voice: oaiVoice, response_format: "mp3" }),
  });
  if (!res.ok) {
    console.error(`OpenAI TTS ${res.status}: ${await res.text().catch(() => "")}`);
    return new Response("TTS failed", { status: 500 });
  }
  const audio = await res.arrayBuffer();
  return new Response(audio, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
}
