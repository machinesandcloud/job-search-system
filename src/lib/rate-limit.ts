type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

export function rateLimit(key: string, limit = 10, windowMs = 60 * 60 * 1000) {
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

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
