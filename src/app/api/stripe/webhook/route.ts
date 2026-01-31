import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { logEvent } from "@/lib/events";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const stripe = getStripeClient();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const leadId = session.metadata?.leadId;
    if (leadId) {
      await prisma.purchase.updateMany({
        where: { stripeCheckoutSessionId: session.id },
        data: {
          status: "SUCCEEDED",
          stripePaymentIntentId: session.payment_intent,
        },
      });
      await logEvent("purchase_completed", { sessionId: session.id }, leadId);
    }
  }

  return NextResponse.json({ received: true });
}
