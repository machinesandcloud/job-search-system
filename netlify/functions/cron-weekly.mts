import type { Config } from "@netlify/functions";

// Runs at 8am UTC every Monday — sends the weekly founder digest.
export const config: Config = {
  schedule: "0 8 * * 1",
};

export default async function handler() {
  const baseUrl = process.env.URL;

  if (!baseUrl) {
    console.error("[cron-weekly] URL env var is not set");
    return;
  }

  const headers: Record<string, string> = {};
  if (process.env.CRON_SECRET) headers["Authorization"] = `Bearer ${process.env.CRON_SECRET}`;

  const res = await fetch(`${baseUrl}/api/cron/digest`, {
    method: "GET",
    headers,
  });

  const body = await res.json().catch(() => ({}));
  console.log(`[cron-weekly] status=${res.status}`, body);
}
