import { NextResponse } from "next/server";
import { OPENAI_VOICES } from "../speak/route";

type Gender = "f" | "m";

// Only these voices are shown — all work on ElevenLabs Free plan
const ALLOWED = new Set(["jessica","charlie"]);

function inferGender(labels?: { gender?: string }, name?: string): Gender {
  if (labels?.gender === "male")   return "m";
  if (labels?.gender === "female") return "f";
  const n = (name ?? "").toLowerCase();
  if (n.includes("charlie") || n.includes("chris") || n.includes("eric") || n.includes("liam") || n.includes("roger") || n.includes("will")) return "m";
  return "f";
}

export async function GET() {
  const elKey  = process.env.ELEVENLABS_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  if (elKey) {
    try {
      const r = await fetch("https://api.elevenlabs.io/v1/voices", {
        headers: { "xi-api-key": elKey },
        cache: "no-store",
      });

      if (!r.ok) {
        console.error(`[voices] GET /v1/voices → ${r.status}: ${await r.text().catch(() => "")}`);
      } else {
        type ELVoice = { voice_id: string; name: string; labels?: { gender?: string } };
        const data = await r.json() as { voices: ELVoice[] };

        if (data.voices?.length) {
          const voices = data.voices
            .filter(v => ALLOWED.has(v.name.toLowerCase().split(/[\s\-_]/)[0]))
            .map(v => ({
              key:      v.voice_id,
              label:    v.name,
              gender:   inferGender(v.labels, v.name),
              provider: "elevenlabs" as const,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));

          if (voices.length) {
            return NextResponse.json({ voices, provider: "elevenlabs", hasGroq });
          }
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
