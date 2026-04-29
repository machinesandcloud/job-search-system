export type OAIMessage = { role: "system" | "user" | "assistant"; content: string };

interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
}

export type OpenAIError =
  | { code: "no_key" }
  | { code: "api_error"; status: number; body: string }
  | { code: "network_error"; message: string };

let _lastError: OpenAIError | null = null;

/** Returns the error from the most recent openaiChat call that returned null. */
export function getLastOpenAIError(): OpenAIError | null {
  return _lastError;
}

export async function openaiChat(
  messages: OAIMessage[],
  opts: ChatOptions = {},
  signal?: AbortSignal,
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    _lastError = { code: "no_key" };
    return null;
  }

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
      signal,
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
      _lastError = { code: "api_error", status: res.status, body: text.slice(0, 300) };
      return null;
    }

    _lastError = null;
    const data = await res.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return data.choices?.[0]?.message?.content?.trim() ?? null;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[openai] error", err);
    _lastError = { code: "network_error", message };
    return null;
  }
}
