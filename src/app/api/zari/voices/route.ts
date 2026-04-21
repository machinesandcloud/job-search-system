import { NextResponse } from "next/server";
import { OPENAI_VOICES } from "../speak/route";

// Ordered list — Lauren B is default (first)
// These must be voice IDs present in the ElevenLabs account linked to ELEVENLABS_API_KEY
const VOICES_CONFIG = [
  { id: "DODLEQrClDo8wCz460ld", label: "Lauren",  gender: "f" },
  { id: "l4Coq6695JDX9xtLqXDE", label: "Voice 2", gender: "f" },
  { id: "ljX1ZrXuDIIRVcmiVSyR", label: "Voice 3", gender: "f" },
  { id: "4O1sYUnmtThcBoSBrri7", label: "Voice 4", gender: "m" },
  { id: "inGcvmoPgbvKUk9uCvHu", label: "Voice 5", gender: "m" },
  { id: "Bwff1jnzl1s94AEcntUq", label: "Voice 6", gender: "m" },
] as const;

type Gender = "f" | "m";

export async function GET() {
  const elKey  = process.env.ELEVENLABS_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  if (elKey) {
    try {
      // Single call — GET /v1/voices returns ALL voices in the account library at once
      // Much faster and more reliable than 6 individual calls or a shared-voices search
      const r = await fetch("https://api.elevenlabs.io/v1/voices", {
        headers: { "xi-api-key": elKey },
        cache: "no-store",
      });

      if (!r.ok) {
        console.error(`[voices] GET /v1/voices → ${r.status}: ${await r.text().catch(() => "")}`);
      } else {
        type ELVoice = { voice_id: string; name: string; labels?: { gender?: string } };
        const data = await r.json() as { voices: ELVoice[] };
        const byId = new Map(data.voices.map(v => [v.voice_id, v]));

        const voices = VOICES_CONFIG.map(cfg => {
          const v = byId.get(cfg.id);
          if (v) {
            const gender: Gender = v.labels?.gender === "male" ? "m" : "f";
            return { key: cfg.id, label: v.name, gender, provider: "elevenlabs" };
          }
          // Voice ID not found in library — will still show, TTS may fall back to OpenAI
          console.error(`[voices] ${cfg.id} not in library (${data.voices.length} voices returned). Add it at elevenlabs.io/voice-library.`);
          return { key: cfg.id, label: cfg.label, gender: cfg.gender as Gender, provider: "elevenlabs" };
        });

        return NextResponse.json({ voices, provider: "elevenlabs", hasGroq });
      }
    } catch (e) {
      console.error("[voices] Unexpected error:", e);
    }
  }

  // Fallback: OpenAI voices
  const voices = OPENAI_VOICES.map(v => ({
    key: v,
    label: v.charAt(0).toUpperCase() + v.slice(1),
    gender: (["nova", "shimmer"].includes(v) ? "f" : "m") as Gender,
    provider: "openai",
  }));
  return NextResponse.json({ voices, provider: elKey ? "elevenlabs" : "openai", hasGroq });
}
