type GroqMessage = {
  role: "system" | "user";
  content: string;
};

type GroqResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export async function groqChatJSON(systemPrompt: string, userPrompt: string) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  const url = "https://api.groq.com/openai/v1/chat/completions";
  const model = process.env.GROQ_MODEL || "llama-3.1-70b-versatile";

  const messages: GroqMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.2,
        response_format: { type: "json_object" },
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as GroqResponse;
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;
    return JSON.parse(content);
  } catch {
    return null;
  }
}
