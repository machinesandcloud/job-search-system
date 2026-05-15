// Public endpoint for capturing marketing leads (website forms, landing pages, etc.)
// Rate-limited to 3 per IP per hour.

import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/utils";
import { onLeadCaptured } from "@/lib/zoho-engine";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = await rateLimit(`lead:${ip}`, 3, 60 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? "").toLowerCase().trim();
  const firstName = String(body.firstName ?? body.first_name ?? "").trim();
  const lastName = String(body.lastName ?? body.last_name ?? "").trim();
  const source = String(body.source ?? "Website Form").trim();
  const campaignName = String(body.campaignName ?? body.campaign ?? "").trim() || undefined;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  void onLeadCaptured({ email, firstName, lastName, source, campaignName });

  return NextResponse.json({ ok: true });
}
