type Record = {
  count: number;
  resetAt: number;
};

const windowMs = 60 * 60 * 1000;
const limitMap = new Map<string, Record>();

export function rateLimit(key: string, limit = 10) {
  const now = Date.now();
  const record = limitMap.get(key);
  if (!record || record.resetAt < now) {
    limitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (record.count >= limit) {
    return { ok: false, remaining: 0, retryAt: record.resetAt };
  }
  record.count += 1;
  return { ok: true, remaining: limit - record.count };
}
