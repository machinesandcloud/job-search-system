import { recordAiTokenUsage, syncCurrentUserToBillingIdentity } from "@/lib/billing";

export type OAIMessage = { role: "system" | "user" | "assistant"; content: string };

interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
  usageFeature?: string;
  usageMetadata?: Record<string, unknown>;
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

function collapseRequestPreview(value?: string | null, maxLength = 260) {
  const collapsed = `${value || ""}`.replace(/\s+/g, " ").trim();
  if (!collapsed) return null;
  if (collapsed.length <= maxLength) return collapsed;
  return `${collapsed.slice(0, maxLength - 1)}…`;
}

function buildUsageMetadata(messages: OAIMessage[], opts: ChatOptions, input: { maxTokens: number }) {
  const lastUserMessage = [...messages].reverse().find((message) => message.role === "user")?.content || "";
  const requestPreview =
    typeof opts.usageMetadata?.requestPreview === "string"
      ? collapseRequestPreview(opts.usageMetadata.requestPreview)
      : collapseRequestPreview(lastUserMessage);

  return {
    ...opts.usageMetadata,
    requestPreview,
    messageCount: messages.length,
    maxTokens: input.maxTokens,
    jsonMode: Boolean(opts.jsonMode),
  };
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
  const usageMetadata = buildUsageMetadata(messages, opts, { maxTokens });

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
      usage?: {
        prompt_tokens?: number;
        completion_tokens?: number;
        total_tokens?: number;
      };
    };

    try {
      const identity = await syncCurrentUserToBillingIdentity();
      if (identity && data.usage) {
        await recordAiTokenUsage({
          accountId: identity.account.id,
          userId: identity.user.id,
          model,
          featureName: opts.usageFeature || "llm_request",
          inputTokens: data.usage.prompt_tokens || 0,
          outputTokens: data.usage.completion_tokens || 0,
          totalTokens: data.usage.total_tokens || 0,
          metadataJson: usageMetadata,
        });
      }
    } catch (usageError) {
      console.error("[openai] failed to record token usage", usageError);
    }

    return data.choices?.[0]?.message?.content?.trim() ?? null;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[openai] error", err);
    _lastError = { code: "network_error", message };
    return null;
  }
}
