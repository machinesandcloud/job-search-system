import { NextResponse } from "next/server";
import { getStripeClient, getStripePriceId } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { stripeCheckoutSchema } from "@/lib/validation";
import { getBaseUrl, ensureSameOrigin } from "@/lib/utils";
import { logEvent } from "@/lib/events";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const body = await request.json();
  const parsed = stripeCheckoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const { leadId, token } = parsed.data;
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  const priceId = getStripePriceId();
  const baseUrl = getBaseUrl();

  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: priceId
      ? [{ price: priceId, quantity: 1 }]
      : [{ price_data: { currency: "usd", unit_amount: 4900, product_data: { name: "Pro Pack" } }, quantity: 1 }],
    success_url: `${baseUrl}/job-search-system/results/${token}?upgrade=success`,
    cancel_url: `${baseUrl}/job-search-system/results/${token}?upgrade=cancel`,
    metadata: {
      leadId,
      token,
    },
    customer_email: lead.email || undefined,
  });

  await prisma.purchase.create({
    data: {
      leadId,
      stripeCheckoutSessionId: session.id,
      amount: 4900,
      currency: "usd",
      status: "PENDING",
    },
  });

  await logEvent("checkout_started", { sessionId: session.id }, leadId);

  return NextResponse.json({ url: session.url });
}
