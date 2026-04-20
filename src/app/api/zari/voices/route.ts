import { NextResponse } from "next/server";
import { ELEVENLABS_VOICES, OPENAI_VOICES } from "../speak/route";

export async function GET() {
  const hasElevenLabs = !!process.env.ELEVENLABS_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  const voices = hasElevenLabs
    ? Object.entries(ELEVENLABS_VOICES).map(([key, v]) => ({ key, label: v.label, gender: v.gender, provider: "elevenlabs" }))
    : OPENAI_VOICES.map(v => ({ key: v, label: v.charAt(0).toUpperCase() + v.slice(1), gender: ["nova","shimmer"].includes(v) ? "f" : "m", provider: "openai" }));

  return NextResponse.json({ voices, provider: hasElevenLabs ? "elevenlabs" : "openai", hasGroq });
}
