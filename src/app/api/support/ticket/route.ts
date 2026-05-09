import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureSameOrigin } from "@/lib/utils";
import { syncCurrentUserToBillingIdentity, logAppEvent } from "@/lib/billing";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 15;

const VALID_CATEGORIES = new Set(["billing", "technical", "product", "account", "other"]);

export async function POST(request: NextRequest) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const ip = getClientIp(request);
  const rl = await rateLimit(`support-ticket:${ip}`, 5, 60 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const identity = await syncCurrentUserToBillingIdentity().catch(() => null);
  if (!identity) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({})) as {
    subject?: string;
    description?: string;
    category?: string;
  };

  const subject = String(body.subject ?? "").trim();
  const description = String(body.description ?? "").trim();
  const category = VALID_CATEGORIES.has(String(body.category ?? "").trim())
    ? String(body.category).trim()
    : "other";

  if (!subject) return NextResponse.json({ error: "Subject is required." }, { status: 400 });
  if (!description) return NextResponse.json({ error: "Description is required." }, { status: 400 });
  if (subject.length > 200) return NextResponse.json({ error: "Subject must be under 200 characters." }, { status: 400 });
  if (description.length > 5000) return NextResponse.json({ error: "Description must be under 5000 characters." }, { status: 400 });

  const ticket = await prisma.supportTicket.create({
    data: {
      accountId: identity.account.id,
      userId: identity.user.id,
      subject,
      description,
      category,
      priority: "medium",
      status: "open",
    },
  });

  await logAppEvent("support_ticket_created", {
    accountId: identity.account.id,
    userId: identity.user.id,
    metadataJson: {
      supportTicketId: ticket.id,
      category,
      source: "user_portal",
    },
  });

  return NextResponse.json({ ok: true, ticketId: ticket.id });
}
