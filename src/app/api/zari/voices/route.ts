import { NextResponse } from "next/server";
import { OPENAI_VOICES } from "../speak/route";

type Gender = "f" | "m";

const DEFAULT_VOICE_ID = "DODLEQrClDo8wCz460ld"; // Lauren B — pinned first

// ElevenLabs built-in default voice IDs — these are the same across all accounts
// We exclude these so only the user's own/added voices appear in the picker
const EL_DEFAULT_IDS = new Set([
  "21m00Tcm4TlvDq8ikWAM", // Rachel
  "AZnzlk1XvdvUeBnXmlld", // Domi
  "EXAVITQu4vr4xnSDxMaL", // Bella
  "ErXwobaYiN019PkySvjV",  // Antoni
  "MF3mGyEYCl7XYWbV9V6O", // Elli
  "TxGEqnHWrfWFTfGW9XjX", // Josh
  "VR6AewLTigWG4xSOukaG", // Arnold
  "pNInz6obpgDQGcFmaJgB", // Adam
  "yoZ06aMxZJJ28mfd3POQ", // Sam
  "onwK4e9ZLuTAKqWW03F9", // Daniel
  "N2lVS1w4EtoT3dr4eOWO", // Callum
  "CYw3kZ02Hs0563khs1Fj", // Charlotte
  "XB0fDUnXU5powFXDhCwa", // Charlotte (alt)
  "Xb7hH8MSUJpSbSDYk0k2", // Alice
  "nPczCjzI2devNBz1zQrb", // Brian
  "iP95p4xoKVk53GoZ742B", // Chris
  "cgSgspJ2msm6clMCkdW9", // Jessica
  "cjVigY5qzO86Huf0OWal", // Eric
  "pFZP5JQG7iQjIQuC4Bku", // Lily
  "bIHbv24MWmeRgasZH58o", // Will
  "SAz9YHcvj6GT2YYXdXww", // River
  "TX3LPaxmHKxFdv7VOQHJ", // Liam
  "XrExE9yKIg1WjnnlVkGX", // Matilda
  "t0jbNlBVZ17f02VDIeMI", // Fin
  "GBv7mTt0atIp3Br8iCZE", // Thomas
  "IKne3meq5aSn9XLyUdCD", // Charlie
  "JBFqnCBsd6RMkjVDRZzb", // George
  "N2lVS1w4EtoT3dr4eOWO", // Callum (dup)
  "SOYHLrjzK2X1ezoPC6cr", // Harry
  "zcAOhNBS3c14rBihAFp1", // Giovanni
  "flq6f7yk4E4fJM5XTYuZ", // Michael
  "g5CIjZEefAph4nQFvHAz", // Ethan
  "onwK4e9ZLuTAKqWW03F9", // Daniel (dup)
  "piTKgcLEGmPE4e6mEKli", // Nicole
  "jBpfuIE2acCO8z3wKNLl", // Freya
  "jsCqWAovK2LkecY7zXl4", // Clyde
  "oWAxZDx7w5VEj9dCyTzz", // Grace
  "z9fAnlkpzviPz146aGWa", // Glinda
  "29vD33N1CtxCmqQRPOHJ", // Drew
  "D38z5RcWu1voky8WS1ja", // Serena
  "LcfcDJNUP1GQjkzn1xUU", // Emily
  "5Q0t7uMcjvnagumLfvZi", // Paul
  "wViXBPUzp2ZZixB1xQuM", // Wayne
  "yoZ06aMxZJJ28mfd3POQ", // Sam (dup)
]);

function inferGender(labels?: { gender?: string }, name?: string): Gender {
  if (labels?.gender === "male")   return "m";
  if (labels?.gender === "female") return "f";
  const n = (name ?? "").toLowerCase();
  if (n.match(/\b(adam|gabriel|brian|callum|charlie|chris|daniel|eric|george|harry|josh|liam|roger|sam|thomas|will|michael|ethan|paul|wayne|clyde|drew|giovanni|fin)\b/)) return "m";
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
        type ELVoice = { voice_id: string; name: string; category?: string; labels?: { gender?: string } };
        const data = await r.json() as { voices: ELVoice[] };

        if (data.voices?.length) {
          // Log what we got so we can diagnose category values in Netlify logs
          console.log(`[voices] ${data.voices.length} total voices. Categories: ${[...new Set(data.voices.map(v => v.category ?? "none"))].join(", ")}`);

          // Primary filter: exclude known ElevenLabs default voice IDs
          // This is more reliable than filtering by category (category values vary by plan/workspace)
          let custom = data.voices.filter(v => !EL_DEFAULT_IDS.has(v.voice_id));

          // Secondary filter: also exclude by category if it's explicitly "premade"
          // (catches any defaults not in our blocklist above)
          if (custom.length > 0) {
            const byCategory = custom.filter(v => v.category !== "premade");
            // Only apply category filter if it leaves at least one voice
            if (byCategory.length > 0) custom = byCategory;
          }

          // Safety net: if both filters removed everything, show all voices
          // (better to show too many than to break TTS by returning empty)
          if (custom.length === 0) {
            console.error("[voices] All voices filtered out — showing full library as fallback");
            custom = data.voices;
          }

          const voices = custom.map(v => ({
            key:      v.voice_id,
            label:    v.name,
            gender:   inferGender(v.labels, v.name),
            provider: "elevenlabs" as const,
          }));

          voices.sort((a, b) => {
            if (a.key === DEFAULT_VOICE_ID) return -1;
            if (b.key === DEFAULT_VOICE_ID) return  1;
            return a.label.localeCompare(b.label);
          });

          return NextResponse.json({ voices, provider: "elevenlabs", hasGroq });
        }
      }
    } catch (e) {
      console.error("[voices] Unexpected error:", e);
    }
  }

  const voices = OPENAI_VOICES.map(v => ({
    key:      v,
    label:    v.charAt(0).toUpperCase() + v.slice(1),
    gender:   (["nova", "shimmer"].includes(v) ? "f" : "m") as Gender,
    provider: "openai" as const,
  }));
  return NextResponse.json({ voices, provider: elKey ? "elevenlabs" : "openai", hasGroq });
}
