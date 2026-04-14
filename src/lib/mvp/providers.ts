export type AvatarProviderStatus = {
  provider: "tavus";
  sessionId: string;
  state: "ready" | "degraded";
  fallback: "audio-only";
};

export type RealtimeTokenStatus = {
  provider: "openai-realtime";
  token: string;
  expiresInSeconds: number;
  model: string;
};

export function createRealtimeToken(sessionId: string): RealtimeTokenStatus {
  return {
    provider: "openai-realtime",
    token: `rt_${sessionId}_${Math.random().toString(36).slice(2, 10)}`,
    expiresInSeconds: 300,
    model: "gpt-realtime",
  };
}

export function createAvatarSession(sessionId: string): AvatarProviderStatus {
  return {
    provider: "tavus",
    sessionId: `avatar_${sessionId}`,
    state: "ready",
    fallback: "audio-only",
  };
}
