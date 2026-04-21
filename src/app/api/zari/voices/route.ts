import { NextResponse } from "next/server";
import { OPENAI_VOICES } from "../speak/route";

// Exactly the 6 voices the user wants — Lauren B (default) first
const ALLOWED_VOICE_IDS = [
  "DODLEQrClDo8wCz460ld", // Lauren B — default
  "l4Coq6695JDX9xtLqXDE",
  "ljX1ZrXuDIIRVcmiVSyR",
  "4O1sYUnmtThcBoSBrri7",
  "inGcvmoPgbvKUk9uCvHu",
  "Bwff1jnzl1s94AEcntUq",
];

export async function GET() {
  const elKey  = process.env.ELEVENLABS_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  if (elKey) {
    try {
      const res = await fetch("https://api.elevenlabs.io/v1/voices", {
        headers: { "xi-api-key": elKey },
        next: { revalidate: 300 },
      });
      if (res.ok) {
        type ELVoice = { voice_id: string; name: string; labels?: { gender?: string } };
        const data = await res.json() as { voices: ELVoice[] };

        // Filter to only the 6 allowed IDs, preserve their order
        const byId = new Map(data.voices.map(v => [v.voice_id, v]));
        const voices = ALLOWED_VOICE_IDS
          .map(id => {
            const v = byId.get(id);
            return v
              ? { key: id, label: v.name, gender: v.labels?.gender === "male" ? "m" : "f", provider: "elevenlabs" }
              : null;
          })
          .filter(Boolean);

        if (voices.length > 0) {
          return NextResponse.json({ voices, provider: "elevenlabs", hasGroq });
        }
      }
    } catch { /* fall through */ }
  }

  // Fallback: OpenAI voices
  const voices = OPENAI_VOICES.map(v => ({
    key: v,
    label: v.charAt(0).toUpperCase() + v.slice(1),
    gender: ["nova", "shimmer"].includes(v) ? "f" : "m",
    provider: "openai",
  }));
  return NextResponse.json({ voices, provider: elKey ? "elevenlabs" : "openai", hasGroq });
}
