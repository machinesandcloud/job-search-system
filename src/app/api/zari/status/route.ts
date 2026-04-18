import { NextResponse } from "next/server";

export async function GET() {
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

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json({
        ok: false,
        status: res.status,
        error: text.slice(0, 400),
      });
    }

    return NextResponse.json({
      ok: true,
      status: res.status,
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      keyPrefix: apiKey.slice(0, 12) + "…",
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) });
  }
}
