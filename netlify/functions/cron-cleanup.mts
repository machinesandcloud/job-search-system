import type { Config } from "@netlify/functions";

// Runs at 3am UTC every day — purges expired sessions and used password reset tokens.
export const config: Config = {
  schedule: "0 3 * * *",
};

export default async function handler() {
  const baseUrl = process.env.URL;

  if (!baseUrl) {
    console.error("[cron-cleanup] URL env var is not set");
    return;
  }

  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("[cron-cleanup] CRON_SECRET env var is not set — skipping");
    return;
  }

  const res = await fetch(`${baseUrl}/api/cron/cleanup`, {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}` },
  });

  const body = await res.json().catch(() => ({}));
  console.log(`[cron-cleanup] status=${res.status}`, body);
}
