import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type RateLimitResult = { ok: boolean; remaining: number; retryAt: number };

// In-memory fallback for local dev or when Upstash env vars aren't set
type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();

function inMemoryRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAt: 0 };
  }
  if (entry.count >= limit) {
    return { ok: false, remaining: 0, retryAt: entry.resetAt };
  }
  entry.count += 1;
  return { ok: true, remaining: limit - entry.count, retryAt: 0 };
}

// Build Upstash client lazily — only when env vars are present
let upstashLimiters: Map<string, Ratelimit> | null = null;

function getUpstashLimiter(limit: number, windowMs: number): Ratelimit | null {
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  if (!upstashLimiters) upstashLimiters = new Map();

  const cacheKey = `${limit}:${windowMs}`;
  if (!upstashLimiters.has(cacheKey)) {
    const redis = new Redis({ url, token });
    upstashLimiters.set(
      cacheKey,
      new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${Math.round(windowMs / 1000)} s`),
        analytics: false,
      }),
    );
  }
  return upstashLimiters.get(cacheKey)!;
}

export async function rateLimit(
  key: string,
  limit = 10,
  windowMs = 60 * 60 * 1000,
): Promise<RateLimitResult> {
  const limiter = getUpstashLimiter(limit, windowMs);
  if (!limiter) return inMemoryRateLimit(key, limit, windowMs);

  try {
    const result = await limiter.limit(key);
    return {
      ok:        result.success,
      remaining: result.remaining,
      retryAt:   result.success ? 0 : result.reset,
    };
  } catch {
    // Upstash unavailable — fall back to in-memory so auth still works
    return inMemoryRateLimit(key, limit, windowMs);
  }
}
