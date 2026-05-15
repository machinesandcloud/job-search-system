import type { Config } from "@netlify/functions";

// Runs at 8am UTC every Monday — sends the weekly founder digest.
export const config: Config = {
  schedule: "0 8 * * 1",
};

export default async function handler() {
  const secret = process.env.CRON_SECRET;
  const baseUrl = process.env.URL;

  if (!secret || !baseUrl) {
    console.error("[cron-weekly] CRON_SECRET or URL env var is not set");
    return;
  }

  const res = await fetch(`${baseUrl}/api/cron/digest`, {
    method: "GET",
    headers: { Authorization: `Bearer ${secret}` },
  });

  const body = await res.json().catch(() => ({}));
  console.log(`[cron-weekly] status=${res.status}`, body);
}
