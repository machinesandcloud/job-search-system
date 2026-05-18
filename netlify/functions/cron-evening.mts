import type { Config } from "@netlify/functions";

// Runs at 7pm CT (midnight UTC) every day.
// Second daily pass — catches afternoon/evening enrollments so they go out same day.
export const config: Config = {
  schedule: "0 0 * * *",
};

export default async function handler() {
  const baseUrl = process.env.URL;

  if (!baseUrl) {
    console.error("[cron-evening] URL env var is not set");
    return;
  }

  const headers: Record<string, string> = {};
  if (process.env.CRON_SECRET) headers["Authorization"] = `Bearer ${process.env.CRON_SECRET}`;

  const res = await fetch(`${baseUrl}/api/cron/zoho-health`, {
    method: "GET",
    headers,
  });

  const body = await res.json().catch(() => ({}));
  console.log(`[cron-evening] status=${res.status}`, body);
}
