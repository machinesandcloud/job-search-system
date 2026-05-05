import type Stripe from "stripe";
import { prisma } from "@/lib/db";
import {
  buildSubscriptionSnapshot,
  canAccessSubscriptionStatus,
  getPricingCatalogPlanId,
  mapStripeStatusToAccountStatus,
} from "@/lib/billing";

export function mapStripePlanTier(planName?: string | null, priceId?: string | null) {
  const planId = getPricingCatalogPlanId(planName, priceId);
  if (planId === "search") return "pro" as const;
  if (planId === "growth") return "pro" as const;
  if (planId === "executive") return "premium" as const;

  const normalized = `${planName || ""} ${priceId || ""}`.toLowerCase();
  if (normalized.includes("premium")) return "premium" as const;
  if (normalized.includes("team")) return "team" as const;
  if (normalized.includes("pro") || normalized.includes("monthly")) return "pro" as const;
  return "free" as const;
}

export async function syncUsersForAccountPlan(accountId: string, planTier: "free" | "pro" | "premium" | "team") {
  await prisma.user.updateMany({
    where: { accountId },
    data: { planTier },
  });
}

export async function syncStripeSubscriptionToAccount(
  accountId: string,
  subscription: Stripe.Subscription,
  overrides?: Partial<{
    status: string;
    paymentIssue: boolean;
  }>
) {
  const snapshot = buildSubscriptionSnapshot(subscription);
  const status = overrides?.status || snapshot.status;
  const paymentIssue = typeof overrides?.paymentIssue === "boolean" ? overrides.paymentIssue : snapshot.paymentIssue;
  const payload = {
    ...snapshot,
    status,
    paymentIssue,
  };

  const [existingByAccount, existingByStripeSubscription, existingByStripeCustomer] = await Promise.all([
    prisma.subscription.findUnique({ where: { accountId } }),
    payload.stripeSubscriptionId
      ? prisma.subscription.findUnique({ where: { stripeSubscriptionId: payload.stripeSubscriptionId } }).catch(() => null)
      : Promise.resolve(null),
    payload.stripeCustomerId
      ? prisma.subscription.findUnique({ where: { stripeCustomerId: payload.stripeCustomerId } }).catch(() => null)
      : Promise.resolve(null),
  ]);

  const legacyConflicts = [existingByStripeSubscription, existingByStripeCustomer]
    .filter((record, index, records): record is NonNullable<typeof record> => {
      if (!record) return false;
      if (record.accountId === accountId) return false;
      return records.findIndex((candidate) => candidate?.id === record.id) === index;
    });

  const record = await prisma.$transaction(async (tx: any) => {
    for (const conflict of legacyConflicts) {
      if (!existingByAccount || conflict.id !== existingByAccount.id) {
        await tx.subscription.delete({
          where: { id: conflict.id },
        });
      }
    }

    if (existingByAccount) {
      return tx.subscription.update({
        where: { accountId },
        data: payload,
      });
    }

    if (existingByStripeSubscription) {
      return tx.subscription.update({
        where: { id: existingByStripeSubscription.id },
        data: {
          accountId,
          ...payload,
        },
      });
    }

    if (existingByStripeCustomer) {
      return tx.subscription.update({
        where: { id: existingByStripeCustomer.id },
        data: {
          accountId,
          ...payload,
        },
      });
    }

    return tx.subscription.create({
      data: {
        accountId,
        ...payload,
      },
    });
  });

  await prisma.account.update({
    where: { id: accountId },
    data: {
      status: mapStripeStatusToAccountStatus(status),
      paymentIssue,
    },
  });

  await syncUsersForAccountPlan(accountId, mapStripePlanTier(record.planName, record.stripePriceId));
  return {
    record,
    ready: canAccessSubscriptionStatus(status),
  };
}
