// Resend webhook — handles bounce and spam complaint events
// Configure in Resend Dashboard → Webhooks → add your domain
// Events to subscribe: email.bounced, email.complained
// Webhook URL: https://app.zaricoach.com/api/webhooks/resend

import { NextResponse } from "next/server";
import { suppress } from "@/lib/email-sequences";

export const runtime = "nodejs";

export async function POST(request: Request) {
  // Verify webhook secret
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (secret) {
    const sig = request.headers.get("svix-signature") ?? request.headers.get("resend-signature");
    if (!sig || !sig.includes(secret)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let event: { type: string; data: { email?: { to?: string[] }; to?: string[] } };
  try {
    event = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const emails: string[] = event.data?.email?.to ?? event.data?.to ?? [];

  if (event.type === "email.bounced") {
    for (const email of emails) {
      await suppress(email.toLowerCase(), "bounce").catch(() => {});
    }
  } else if (event.type === "email.complained") {
    for (const email of emails) {
      await suppress(email.toLowerCase(), "complaint").catch(() => {});
    }
  }

  return NextResponse.json({ received: true });
}
