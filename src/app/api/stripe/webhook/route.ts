import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { logEvent } from "@/lib/events";
import { buildProPack } from "@/lib/pro-pack";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Stripe not configured" }, { status: 501 });
  }
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (_err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const existing = await prisma.stripeWebhook.findUnique({ where: { eventId: event.id } });
  if (existing) {
    return NextResponse.json({ received: true });
  }

  await prisma.stripeWebhook.create({
    data: {
      eventId: event.id,
      eventType: event.type,
      payload: event as any,
      processed: false,
    },
  });

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const assessmentId = session.metadata?.assessmentId;
    if (assessmentId) {
      const assessment = await prisma.assessment.findUnique({ where: { id: assessmentId } });
      const proPackData =
        assessment && assessment.targetRoles ? await buildProPack(assessment as any) : null;
      await prisma.assessment.update({
        where: { id: assessmentId },
        data: {
          hasPurchasedPro: true,
          stripePaymentIntent: session.payment_intent,
          purchaseDate: new Date(),
          purchaseAmount: session.amount_total || 4900,
          proPackData: proPackData ? (proPackData as any) : undefined,
        },
      });
      await prisma.stripeWebhook.update({
        where: { eventId: event.id },
        data: { assessmentId, processed: true },
      });
      await logEvent("purchase_completed", { sessionId: session.id }, assessmentId);
    }
  }

  return NextResponse.json({ received: true });
}
