export type OAIMessage = { role: "system" | "user" | "assistant"; content: string };

interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
}

/**
 * Single OpenAI chat call. Used for coaching chat, document generation,
 * structured analysis, and everything else that needs the LLM.
 */
export async function openaiChat(
  messages: OAIMessage[],
  opts: ChatOptions = {},
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = opts.model ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const temperature = opts.temperature ?? 0.7;
  const maxTokens = opts.maxTokens ?? 800;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        ...(opts.jsonMode ? { response_format: { type: "json_object" } } : {}),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[openai] HTTP ${res.status} for model=${model}:`, text.slice(0, 500));
      return null;
    }

    const data = await res.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return data.choices?.[0]?.message?.content?.trim() ?? null;
  } catch (err) {
    console.error("[openai] error", err);
    return null;
  }
}
