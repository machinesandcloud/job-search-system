import type { Config } from "@netlify/functions";

// Runs at 7am CT (noon UTC) every day.
// Calls the app's cron endpoint (which processes email queues + health checks).
export const config: Config = {
  schedule: "0 12 * * *",
};

export default async function handler() {
  const baseUrl = process.env.URL;

  if (!baseUrl) {
    console.error("[cron-daily] URL env var is not set");
    return;
  }

  const headers: Record<string, string> = {};
  if (process.env.CRON_SECRET) headers["Authorization"] = `Bearer ${process.env.CRON_SECRET}`;

  const res = await fetch(`${baseUrl}/api/cron/zoho-health`, {
    method: "GET",
    headers,
  });

  const body = await res.json().catch(() => ({}));
  console.log(`[cron-daily] status=${res.status}`, body);
}
