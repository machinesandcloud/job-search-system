import { NextResponse } from "next/server";
import { OPENAI_VOICES } from "../speak/route";

// Ordered list — Lauren B is default (first)
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
      // Fetch each voice individually — works even if not in account library
      const results = await Promise.all(
        VOICES_CONFIG.map(async (cfg) => {
          try {
            const r = await fetch(`https://api.elevenlabs.io/v1/voices/${cfg.id}`, {
              headers: { "xi-api-key": elKey },
              next: { revalidate: 300 },
            });
            if (r.ok) {
              type ELVoice = { name: string; labels?: { gender?: string } };
              const v = await r.json() as ELVoice;
              const gender: Gender = v.labels?.gender === "male" ? "m" : "f";
              return { key: cfg.id, label: v.name, gender, provider: "elevenlabs" };
            }
          } catch { /* ignore, use fallback */ }
          // Fallback: use hardcoded config so voice always appears
          return { key: cfg.id, label: cfg.label, gender: cfg.gender as Gender, provider: "elevenlabs" };
        }),
      );

      return NextResponse.json({ voices: results, provider: "elevenlabs", hasGroq });
    } catch { /* fall through to OpenAI */ }
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
