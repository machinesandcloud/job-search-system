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
type ELVoice = { name: string; labels?: { gender?: string } };
type SharedVoice = { voice_id: string; public_owner_id: string; name: string; gender?: string };

async function fetchFromLibrary(id: string, elKey: string): Promise<ELVoice | null> {
  try {
    const r = await fetch(`https://api.elevenlabs.io/v1/voices/${id}`, {
      headers: { "xi-api-key": elKey },
      cache: "no-store",
    });
    if (r.ok) return await r.json() as ELVoice;
    console.error(`[voices] GET /v1/voices/${id} → ${r.status}`);
  } catch { /* network error */ }
  return null;
}

// Search the public ElevenLabs voice library for a specific voice_id
// Returns { name, gender, public_owner_id } if found
async function fetchFromShared(id: string, elKey: string): Promise<SharedVoice | null> {
  try {
    // Page through shared voices to find this specific ID
    // ElevenLabs shared-voices endpoint supports filtering; voice_id is not a direct param
    // so we use a large page_size and scan — this is a one-time cost, cached by Next.js
    const r = await fetch(
      `https://api.elevenlabs.io/v1/shared-voices?page_size=500&sort=trending&featured=false`,
      {
        headers: { "xi-api-key": elKey },
        next: { revalidate: 3600 },
      },
    );
    if (!r.ok) {
      console.error(`[voices] GET /v1/shared-voices → ${r.status}`);
      return null;
    }
    const data = await r.json() as { voices: SharedVoice[] };
    return data.voices.find(v => v.voice_id === id) ?? null;
  } catch {
    return null;
  }
}

// Add a shared voice to the account's personal library so TTS can use it
async function addToLibrary(publicOwnerId: string, voiceId: string, name: string, elKey: string): Promise<boolean> {
  try {
    const r = await fetch(
      `https://api.elevenlabs.io/v1/voices/add/${publicOwnerId}/${voiceId}`,
      {
        method: "POST",
        headers: { "xi-api-key": elKey, "Content-Type": "application/json" },
        body: JSON.stringify({ new_name: name }),
      },
    );
    if (r.ok) {
      console.log(`[voices] Added ${name} (${voiceId}) to library`);
      return true;
    }
    console.error(`[voices] POST add ${voiceId} → ${r.status}: ${await r.text().catch(() => "")}`);
  } catch { /* non-fatal */ }
  return false;
}

export async function GET() {
  const elKey  = process.env.ELEVENLABS_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  if (elKey) {
    try {
      const results = await Promise.all(
        VOICES_CONFIG.map(async (cfg) => {
          // Step 1: Try to get from personal library (fastest, most reliable)
          const inLib = await fetchFromLibrary(cfg.id, elKey);
          if (inLib) {
            const gender: Gender = inLib.labels?.gender === "male" ? "m" : "f";
            return { key: cfg.id, label: inLib.name, gender, provider: "elevenlabs" };
          }

          // Step 2: Not in library — search the public shared-voice catalogue
          const shared = await fetchFromShared(cfg.id, elKey);
          if (shared) {
            const gender: Gender = shared.gender === "male" ? "m" : "f";
            // Step 3: Auto-add to personal library so TTS will work going forward
            await addToLibrary(shared.public_owner_id, cfg.id, shared.name, elKey);
            return { key: cfg.id, label: shared.name, gender, provider: "elevenlabs" };
          }

          // Step 4: Voice not found anywhere — show with fallback name (user may need to add manually)
          console.error(`[voices] Voice ${cfg.id} not found in library or shared catalogue`);
          return { key: cfg.id, label: cfg.label, gender: cfg.gender as Gender, provider: "elevenlabs" };
        }),
      );

      return NextResponse.json({ voices: results, provider: "elevenlabs", hasGroq });
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
