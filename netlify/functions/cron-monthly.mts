import type { Config } from "@netlify/functions";

// Runs at 9am UTC on the 1st of every month — sends the monthly newsletter.
export const config: Config = {
  schedule: "0 9 1 * *",
};

export default async function handler() {
  const baseUrl = process.env.URL;

  if (!baseUrl) {
    console.error("[cron-monthly] URL env var is not set");
    return;
  }

  const headers: Record<string, string> = {};
  if (process.env.CRON_SECRET) headers["Authorization"] = `Bearer ${process.env.CRON_SECRET}`;

  const res = await fetch(`${baseUrl}/api/cron/newsletter`, {
    method: "GET",
    headers,
  });

  const body = await res.json().catch(() => ({}));
  console.log(`[cron-monthly] status=${res.status}`, body);
}
