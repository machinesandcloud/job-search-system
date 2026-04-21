import { NextResponse } from "next/server";
import { OPENAI_VOICES } from "../speak/route";

export async function GET() {
  const elKey = process.env.ELEVENLABS_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  if (elKey) {
    try {
      const res = await fetch("https://api.elevenlabs.io/v1/voices", {
        headers: { "xi-api-key": elKey },
        // cache at the edge for 5 min so it's fast on repeat opens
        next: { revalidate: 300 },
      });
      if (res.ok) {
        type ELVoice = { voice_id: string; name: string; labels?: { gender?: string } };
        const data = await res.json() as { voices: ELVoice[] };
        const voices = data.voices.map(v => ({
          key: v.voice_id,          // send the real ID so speak route can use it directly
          label: v.name,
          gender: v.labels?.gender === "female" ? "f" : "m",
          provider: "elevenlabs",
        }));
        return NextResponse.json({ voices, provider: "elevenlabs", hasGroq });
      }
    } catch { /* fall through */ }
  }

  // Fallback to OpenAI voices
  const voices = OPENAI_VOICES.map(v => ({
    key: v,
    label: v.charAt(0).toUpperCase() + v.slice(1),
    gender: ["nova","shimmer"].includes(v) ? "f" : "m",
    provider: "openai",
  }));
  return NextResponse.json({ voices, provider: elKey ? "elevenlabs" : "openai", hasGroq });
}
