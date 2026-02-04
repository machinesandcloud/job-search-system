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
  const { assessmentId, token } = parsed.data;
  const assessment = await prisma.assessment.findUnique({ where: { id: assessmentId } });
  if (!assessment) return NextResponse.json({ error: "Assessment not found" }, { status: 404 });

  const priceId = getStripePriceId();
  const baseUrl = getBaseUrl();

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Stripe not configured" }, { status: 501 });
  }
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: priceId
      ? [{ price: priceId, quantity: 1 }]
      : [{ price_data: { currency: "usd", unit_amount: 4900, product_data: { name: "Pro Pack" } }, quantity: 1 }],
    success_url: `${baseUrl}/job-search-system/results/${token}?upgrade=success`,
    cancel_url: `${baseUrl}/job-search-system/results/${token}?upgrade=cancel`,
    metadata: {
      assessmentId,
      token,
    },
    customer_email: assessment.userId ? undefined : undefined,
  });

  await prisma.assessment.update({
    where: { id: assessmentId },
    data: { stripeSessionId: session.id },
  });

  await logEvent("checkout_started", { sessionId: session.id }, assessmentId);

  return NextResponse.json({ url: session.url });
}
