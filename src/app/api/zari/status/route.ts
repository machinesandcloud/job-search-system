import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "OPENAI_API_KEY is not set" });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        messages: [{ role: "user", content: "Say OK" }],
        max_tokens: 5,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ ok: false, status: res.status, error: text.slice(0, 200) });
    }

    return NextResponse.json({ ok: true, model: process.env.OPENAI_MODEL ?? "gpt-4o-mini" });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) });
  }
}
