import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma, isDatabaseReady } from "@/lib/db";
import { getStripeClient } from "@/lib/stripe";
import {
  addBonusTokensToAccount,
  canAccessSubscriptionStatus,
  getBillingTokensPerCredit,
  isPaymentIssueSubscriptionStatus,
  logAppEvent,
  mapStripeStatusToAccountStatus,
  syncMvpUserToBillingIdentity,
} from "@/lib/billing";
import { mapStripePlanTier, syncStripeSubscriptionToAccount, syncUsersForAccountPlan } from "@/lib/subscription-sync";
import { syncSubscriptionChange, syncChurn } from "@/lib/zoho-crm";

export const runtime = "nodejs";

function getInvoiceSubscriptionId(invoice: Stripe.Invoice) {
  const fromParent = invoice.parent?.subscription_details?.subscription;
  if (typeof fromParent === "string") return fromParent;
  if (fromParent && typeof fromParent === "object" && "id" in fromParent) return fromParent.id;
  return null;
}

async function resolveAccountId(input: {
  metadataAccountId?: string | null;
  stripeSubscriptionId?: string | null;
  stripeCustomerId?: string | null;
  externalAuthId?: string | null;
  customerEmail?: string | null;
}) {
  if (input.metadataAccountId) return input.metadataAccountId;

  if (input.stripeSubscriptionId) {
    const bySubscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: input.stripeSubscriptionId },
    });
    if (bySubscription?.accountId) return bySubscription.accountId;
  }

  if (input.stripeCustomerId) {
    const byCustomer = await prisma.subscription.findUnique({
      where: { stripeCustomerId: input.stripeCustomerId },
    });
    if (byCustomer?.accountId) return byCustomer.accountId;
  }

  if (input.externalAuthId) {
    const identity = await syncMvpUserToBillingIdentity(input.externalAuthId);
    if (identity?.account?.id) return identity.account.id;
  }

  if (input.customerEmail) {
    const user = await prisma.user.findUnique({ where: { email: input.customerEmail.toLowerCase() } });
    if (user?.accountId) return user.accountId;
    if (user) {
      const account = await prisma.account.findFirst({ where: { ownerUserId: user.id } });
      if (account?.id) return account.id;
    }
  }

  return null;
}

async function upsertInvoiceStatus(input: {
  accountId: string;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  status: "active" | "past_due" | "unpaid" | "canceled";
  currentPeriodEnd?: Date | null;
  currentPeriodStart?: Date | null;
}) {
  const existing = await prisma.subscription.findUnique({ where: { accountId: input.accountId } });
  const record = await prisma.subscription.upsert({
    where: { accountId: input.accountId },
    update: {
      status: input.status,
      paymentIssue: isPaymentIssueSubscriptionStatus(input.status),
      stripeCustomerId: existing?.stripeCustomerId || input.stripeCustomerId || "",
      stripeSubscriptionId: existing?.stripeSubscriptionId || input.stripeSubscriptionId || "",
      currentPeriodEnd: input.currentPeriodEnd || existing?.currentPeriodEnd || null,
      currentPeriodStart: input.currentPeriodStart || existing?.currentPeriodStart || null,
    },
    create: {
      accountId: input.accountId,
      stripeCustomerId: input.stripeCustomerId || `pending_${input.accountId}`,
      stripeSubscriptionId: input.stripeSubscriptionId || `pending_${input.accountId}`,
      status: input.status,
      paymentIssue: isPaymentIssueSubscriptionStatus(input.status),
      currentPeriodEnd: input.currentPeriodEnd || null,
      currentPeriodStart: input.currentPeriodStart || null,
    },
  });

  await prisma.account.update({
    where: { id: input.accountId },
    data: {
      status: mapStripeStatusToAccountStatus(input.status),
      paymentIssue: isPaymentIssueSubscriptionStatus(input.status),
    },
  });

  await syncUsersForAccountPlan(input.accountId, mapStripePlanTier(record.planName, record.stripePriceId));
  return record;
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json({ error: "Missing webhook signature." }, { status: 400 });
  }

  if (!isDatabaseReady()) {
    return NextResponse.json({ error: "Billing database is not configured." }, { status: 503 });
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Stripe is not configured." }, { status: 501 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const existing = await prisma.stripeEvent.findUnique({ where: { stripeEventId: event.id } });
  if (existing && ["processed", "skipped"].includes(existing.status)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const logRecord = existing
    ? await prisma.stripeEvent.update({
        where: { stripeEventId: event.id },
        data: { payload: event as any, status: "pending", errorMessage: null },
      })
    : await prisma.stripeEvent.create({
        data: {
          stripeEventId: event.id,
          eventType: event.type,
          payload: event as any,
          status: "pending",
        },
      });

  try {
    let accountId: string | null = null;

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // One-time top-up payment
        if (session.mode === "payment" && session.metadata?.topup === "true") {
          accountId = await resolveAccountId({
            metadataAccountId: session.metadata?.accountId || session.client_reference_id,
            stripeCustomerId: typeof session.customer === "string" ? session.customer : session.customer?.id || null,
            customerEmail: session.customer_details?.email || session.customer_email || null,
          });

          if (!accountId) throw new Error("Unable to resolve account for top-up payment.");

          const credits = parseInt(session.metadata.credits || "0", 10);
          const tokensToAdd = credits * getBillingTokensPerCredit();
          await addBonusTokensToAccount(accountId, tokensToAdd);

          await logAppEvent("topup_completed", {
            accountId,
            metadataJson: {
              sessionId: session.id,
              packId: session.metadata.packId,
              credits,
              tokensToAdd,
            },
          });
          break;
        }

        if (session.mode !== "subscription") {
          await prisma.stripeEvent.update({
            where: { stripeEventId: event.id },
            data: { status: "skipped", processedAt: new Date() },
          });
          return NextResponse.json({ received: true, skipped: true });
        }

        accountId = await resolveAccountId({
          metadataAccountId: session.metadata?.accountId || session.client_reference_id,
          stripeCustomerId: typeof session.customer === "string" ? session.customer : session.customer?.id || null,
          stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : null,
          externalAuthId: session.metadata?.externalAuthId || null,
          customerEmail: session.customer_details?.email || session.customer_email || null,
        });

        if (!accountId) throw new Error("Unable to resolve account for checkout.session.completed.");

        if (typeof session.subscription === "string") {
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
        await syncStripeSubscriptionToAccount(accountId, subscription);
        }

        await logAppEvent("checkout_completed", {
          accountId,
          metadataJson: {
            sessionId: session.id,
            customerId: typeof session.customer === "string" ? session.customer : session.customer?.id || null,
            subscriptionId: typeof session.subscription === "string" ? session.subscription : null,
          },
        });
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        accountId = await resolveAccountId({
          metadataAccountId: subscription.metadata?.accountId || null,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id || null,
          externalAuthId: subscription.metadata?.externalAuthId || null,
        });

        if (!accountId) throw new Error(`Unable to resolve account for ${event.type}.`);

        const finalStatus = event.type === "customer.subscription.deleted" ? "canceled" : undefined;
        await syncStripeSubscriptionToAccount(accountId, subscription, {
          status: finalStatus,
          paymentIssue: finalStatus ? isPaymentIssueSubscriptionStatus(finalStatus) : undefined,
        });

        // Zoho CRM sync (fire-and-forget)
        const owner = await prisma.user.findFirst({ where: { accountId } });
        if (owner) {
          const price = subscription.items.data[0]?.price;
          const planName = (price?.nickname ?? subscription.metadata?.planName ?? "Unknown Plan") as string;
          const planTier = mapStripePlanTier(planName, price?.id ?? null);
          const subscriptionStatus = finalStatus ?? subscription.status;

          if (subscriptionStatus === "canceled") {
            void syncChurn({ email: owner.email, planTier, reason: "Subscription canceled" });
          } else {
            void syncSubscriptionChange({
              userId: owner.id,
              accountId,
              email: owner.email,
              firstName: owner.firstName ?? "",
              lastName: owner.lastName ?? "",
              planName,
              planTier,
              subscriptionStatus,
              stripeCustomerId: typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id,
              stripeSubscriptionId: subscription.id,
              trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
              currentPeriodEnd: (subscription as unknown as { current_period_end?: number }).current_period_end ? new Date((subscription as unknown as { current_period_end: number }).current_period_end * 1000) : null,
              amount: (price?.unit_amount ?? 0) / 100,
            });
          }
        }

        const eventName =
          event.type === "customer.subscription.created"
            ? "subscription_created"
            : event.type === "customer.subscription.deleted"
              ? "subscription_canceled"
              : "subscription_updated";

        await logAppEvent(eventName, {
          accountId,
          metadataJson: {
            stripeSubscriptionId: subscription.id,
            status: finalStatus || subscription.status,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
        });
        break;
      }

      case "invoice.payment_succeeded":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const stripeSubscriptionId = getInvoiceSubscriptionId(invoice);
        const stripeCustomerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id || null;

        accountId = await resolveAccountId({
          stripeSubscriptionId,
          stripeCustomerId,
        });

        if (!accountId) throw new Error(`Unable to resolve account for ${event.type}.`);

        if (stripeSubscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
          await syncStripeSubscriptionToAccount(accountId, subscription, {
            status: event.type === "invoice.payment_failed" ? "past_due" : "active",
            paymentIssue: isPaymentIssueSubscriptionStatus(event.type === "invoice.payment_failed" ? "past_due" : "active"),
          });
        } else {
          const linePeriod = invoice.lines.data[0]?.period;
          await upsertInvoiceStatus({
            accountId,
            stripeCustomerId,
            stripeSubscriptionId,
            status: event.type === "invoice.payment_failed" ? "past_due" : "active",
            currentPeriodStart: linePeriod?.start ? new Date(linePeriod.start * 1000) : null,
            currentPeriodEnd: linePeriod?.end ? new Date(linePeriod.end * 1000) : null,
          });
        }

        await logAppEvent(
          event.type === "invoice.payment_failed" ? "subscription_payment_failed" : "subscription_payment_succeeded",
          {
            accountId,
            metadataJson: {
              invoiceId: invoice.id,
              stripeSubscriptionId,
              amountDue: invoice.amount_due,
              amountPaid: invoice.amount_paid,
            },
          }
        );
        break;
      }

      default: {
        await prisma.stripeEvent.update({
          where: { stripeEventId: event.id },
          data: { status: "skipped", processedAt: new Date() },
        });
        return NextResponse.json({ received: true, skipped: true });
      }
    }

    await prisma.stripeEvent.update({
      where: { stripeEventId: logRecord.stripeEventId },
      data: {
        accountId,
        status: "processed",
        processedAt: new Date(),
        errorMessage: null,
      },
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown webhook processing error.";
    console.error("[stripe-webhook]", message, error);
    await prisma.stripeEvent.update({
      where: { stripeEventId: logRecord.stripeEventId },
      data: {
        status: "failed",
        errorMessage: message.slice(0, 500),
      },
    });
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
