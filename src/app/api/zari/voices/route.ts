import { NextResponse } from "next/server";
import { OPENAI_VOICES } from "../speak/route";

type Gender = "f" | "m";

// Lauren B's ID — pinned as default when present
const DEFAULT_VOICE_ID = "DODLEQrClDo8wCz460ld";

function inferGender(labels?: { gender?: string }, name?: string): Gender {
  if (labels?.gender === "male")   return "m";
  if (labels?.gender === "female") return "f";
  // Fallback: infer from name keywords
  const n = (name ?? "").toLowerCase();
  if (n.includes(" male") || n.includes("adam") || n.includes("gabriel") || n.includes(" man") || n.includes("guy")) return "m";
  return "f";
}

export async function GET() {
  const elKey  = process.env.ELEVENLABS_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  if (elKey) {
    try {
      // Fetch ALL voices in the account library — no hardcoded IDs needed
      const r = await fetch("https://api.elevenlabs.io/v1/voices", {
        headers: { "xi-api-key": elKey },
        cache: "no-store",
      });

      if (!r.ok) {
        console.error(`[voices] GET /v1/voices → ${r.status}: ${await r.text().catch(() => "")}`);
      } else {
        type ELVoice = { voice_id: string; name: string; category?: string; labels?: { gender?: string } };
        const data = await r.json() as { voices: ELVoice[] };

        if (data.voices?.length) {
          // Exclude ElevenLabs built-in default voices (Alice, Bella, Bill, etc.)
          // "premade" = ElevenLabs defaults; everything else = user's own/added voices
          const custom = data.voices.filter(v => v.category !== "premade");
          const voices = custom.map(v => ({
            key:      v.voice_id,
            label:    v.name,
            gender:   inferGender(v.labels, v.name),
            provider: "elevenlabs" as const,
          }));

          // Pin Lauren B first, then sort the rest alphabetically
          voices.sort((a, b) => {
            if (a.key === DEFAULT_VOICE_ID) return -1;
            if (b.key === DEFAULT_VOICE_ID) return  1;
            return a.label.localeCompare(b.label);
          });

          return NextResponse.json({ voices, provider: "elevenlabs", hasGroq, total: data.voices.length, custom: custom.length });
        }
      }
    } catch (e) {
      console.error("[voices] Unexpected error:", e);
    }
  }

  // Fallback: OpenAI voices
  const voices = OPENAI_VOICES.map(v => ({
    key:      v,
    label:    v.charAt(0).toUpperCase() + v.slice(1),
    gender:   (["nova", "shimmer"].includes(v) ? "f" : "m") as Gender,
    provider: "openai" as const,
  }));
  return NextResponse.json({ voices, provider: elKey ? "elevenlabs" : "openai", hasGroq });
}
