import type { Config } from "@netlify/functions";

// Runs at 9am UTC on the 1st of every month — sends the monthly newsletter.
export const config: Config = {
  schedule: "0 9 1 * *",
};

export default async function handler() {
  const secret = process.env.CRON_SECRET;
  const baseUrl = process.env.URL;

  if (!secret || !baseUrl) {
    console.error("[cron-monthly] CRON_SECRET or URL env var is not set");
    return;
  }

  const res = await fetch(`${baseUrl}/api/cron/newsletter`, {
    method: "GET",
    headers: { Authorization: `Bearer ${secret}` },
  });

  const body = await res.json().catch(() => ({}));
  console.log(`[cron-monthly] status=${res.status}`, body);
}
