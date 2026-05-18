import type { Config } from "@netlify/functions";

// Runs at 7pm CT (midnight UTC) every day.
// Second daily pass — catches afternoon/evening enrollments so they go out same day.
export const config: Config = {
  schedule: "0 0 * * *",
};

export default async function handler() {
  const secret = process.env.CRON_SECRET;
  const baseUrl = process.env.URL;

  if (!secret || !baseUrl) {
    console.error("[cron-evening] CRON_SECRET or URL env var is not set");
    return;
  }

  const res = await fetch(`${baseUrl}/api/cron/zoho-health`, {
    method: "GET",
    headers: { Authorization: `Bearer ${secret}` },
  });

  const body = await res.json().catch(() => ({}));
  console.log(`[cron-evening] status=${res.status}`, body);
}
