import type { Config } from "@netlify/functions";

// Posts to LinkedIn Mon/Wed/Fri at 1pm UTC (9am ET) — career tips + stats.
// Skips weekends automatically (cron only fires on weekdays).
export const config: Config = {
  schedule: "0 13 * * 1,3,5",
};

export default async function handler() {
  const baseUrl = process.env.URL;
  if (!baseUrl) {
    console.error("[cron-linkedin] URL env var is not set");
    return;
  }

  const headers: Record<string, string> = {};
  if (process.env.CRON_SECRET) headers["Authorization"] = `Bearer ${process.env.CRON_SECRET}`;

  const res = await fetch(`${baseUrl}/api/cron/linkedin-post`, {
    method: "GET",
    headers,
  });

  const body = await res.json().catch(() => ({}));
  console.log(`[cron-linkedin] status=${res.status}`, body);
}
