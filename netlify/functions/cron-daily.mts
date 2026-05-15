import type { Config } from "@netlify/functions";

// Runs at 9am UTC every day.
// Calls the app's cron endpoint (which processes email queues + health checks).
export const config: Config = {
  schedule: "0 9 * * *",
};

export default async function handler() {
  const secret = process.env.CRON_SECRET;
  const baseUrl = process.env.URL;

  if (!secret || !baseUrl) {
    console.error("[cron-daily] CRON_SECRET or URL env var is not set");
    return;
  }

  const res = await fetch(`${baseUrl}/api/cron/zoho-health`, {
    method: "GET",
    headers: { Authorization: `Bearer ${secret}` },
  });

  const body = await res.json().catch(() => ({}));
  console.log(`[cron-daily] status=${res.status}`, body);
}
