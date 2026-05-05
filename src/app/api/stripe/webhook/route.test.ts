import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  prisma: {
    stripeEvent: {
      findUnique: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
    },
    subscription: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
    },
    account: {
      update: vi.fn(),
      findFirst: vi.fn(),
    },
    user: {
      updateMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
  getStripeClient: vi.fn(),
  buildSubscriptionSnapshot: vi.fn(),
  canAccessSubscriptionStatus: vi.fn(),
  isPaymentIssueSubscriptionStatus: vi.fn(),
  logAppEvent: vi.fn(),
  mapStripeStatusToAccountStatus: vi.fn(),
  syncMvpUserToBillingIdentity: vi.fn(),
  syncStripeSubscriptionToAccount: vi.fn(),
  syncUsersForAccountPlan: vi.fn(),
  mapStripePlanTier: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  prisma: mocks.prisma,
  isDatabaseReady: () => true,
}));

vi.mock("@/lib/stripe", () => ({
  getStripeClient: mocks.getStripeClient,
}));

vi.mock("@/lib/billing", () => ({
  canAccessSubscriptionStatus: mocks.canAccessSubscriptionStatus,
  isPaymentIssueSubscriptionStatus: mocks.isPaymentIssueSubscriptionStatus,
  logAppEvent: mocks.logAppEvent,
  mapStripeStatusToAccountStatus: mocks.mapStripeStatusToAccountStatus,
  syncMvpUserToBillingIdentity: mocks.syncMvpUserToBillingIdentity,
}));

vi.mock("@/lib/subscription-sync", () => ({
  syncStripeSubscriptionToAccount: mocks.syncStripeSubscriptionToAccount,
  syncUsersForAccountPlan: mocks.syncUsersForAccountPlan,
  mapStripePlanTier: mocks.mapStripePlanTier,
}));

import { POST } from "./route";

describe("stripe webhook route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    mocks.canAccessSubscriptionStatus.mockImplementation((status?: string | null) =>
      ["active", "trialing"].includes(String(status || "").toLowerCase())
    );
    mocks.isPaymentIssueSubscriptionStatus.mockImplementation((status?: string | null) =>
      ["past_due", "unpaid"].includes(String(status || "").toLowerCase())
    );
    mocks.mapStripeStatusToAccountStatus.mockImplementation((status?: string | null) => status || "incomplete");
    mocks.prisma.stripeEvent.create.mockResolvedValue({ stripeEventId: "evt_test" });
    mocks.prisma.stripeEvent.update.mockResolvedValue({});
    mocks.prisma.subscription.upsert.mockResolvedValue({
      planName: "Pro Monthly",
      stripePriceId: "price_pro_monthly",
    });
    mocks.prisma.account.update.mockResolvedValue({});
    mocks.prisma.user.updateMany.mockResolvedValue({});
    mocks.syncStripeSubscriptionToAccount.mockResolvedValue({
      record: { planName: "Pro Monthly", stripePriceId: "price_pro_monthly" },
      ready: true,
    });
    mocks.mapStripePlanTier.mockReturnValue("pro");
  });

  it("is idempotent for already processed events", async () => {
    mocks.prisma.stripeEvent.findUnique.mockResolvedValue({ stripeEventId: "evt_done", status: "processed" });
    mocks.getStripeClient.mockReturnValue({
      webhooks: {
        constructEvent: vi.fn().mockReturnValue({
          id: "evt_done",
          type: "invoice.payment_succeeded",
          data: { object: {} },
        }),
      },
    });

    const response = await POST(
      new Request("http://localhost:3000/api/stripe/webhook", {
        method: "POST",
        headers: { "stripe-signature": "sig" },
        body: "{}",
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ received: true, duplicate: true });
    expect(mocks.prisma.stripeEvent.create).not.toHaveBeenCalled();
  });

  it("marks failed payments as past_due", async () => {
    mocks.prisma.stripeEvent.findUnique.mockResolvedValue(null);
    mocks.prisma.subscription.findUnique.mockResolvedValue({ accountId: "account_1" });

    const stripe = {
      webhooks: {
        constructEvent: vi.fn().mockReturnValue({
          id: "evt_failed",
          type: "invoice.payment_failed",
          data: {
            object: {
              id: "in_123",
              customer: "cus_123",
              amount_due: 1900,
              amount_paid: 0,
              parent: {
                subscription_details: {
                  subscription: "sub_123",
                },
              },
            },
          },
        }),
      },
      subscriptions: {
        retrieve: vi.fn().mockResolvedValue({
          id: "sub_123",
          customer: "cus_123",
          status: "active",
          cancel_at_period_end: false,
          canceled_at: null,
          trial_end: null,
          items: {
            data: [
              {
                current_period_start: 1711929600,
                current_period_end: 1714521600,
                price: { id: "price_pro_monthly" },
              },
            ],
          },
        }),
      },
    };

    mocks.getStripeClient.mockReturnValue(stripe);

    const response = await POST(
      new Request("http://localhost:3000/api/stripe/webhook", {
        method: "POST",
        headers: { "stripe-signature": "sig" },
        body: "{}",
      })
    );

    expect(response.status).toBe(200);
    expect(mocks.syncStripeSubscriptionToAccount).toHaveBeenCalledWith(
      "account_1",
      expect.objectContaining({ id: "sub_123" }),
      expect.objectContaining({
        status: "past_due",
        paymentIssue: true,
      })
    );
  });

  it("marks deleted subscriptions as canceled", async () => {
    mocks.prisma.stripeEvent.findUnique.mockResolvedValue(null);
    mocks.prisma.subscription.findUnique.mockResolvedValue({ accountId: "account_1" });

    mocks.getStripeClient.mockReturnValue({
      webhooks: {
        constructEvent: vi.fn().mockReturnValue({
          id: "evt_deleted",
          type: "customer.subscription.deleted",
          data: {
            object: {
              id: "sub_123",
              customer: "cus_123",
              status: "canceled",
              metadata: {},
              cancel_at_period_end: false,
              canceled_at: 1711929600,
              trial_end: null,
              items: {
                data: [
                  {
                    current_period_start: 1711929600,
                    current_period_end: 1714521600,
                    price: { id: "price_pro_monthly" },
                  },
                ],
              },
            },
          },
        }),
      },
    });

    const response = await POST(
      new Request("http://localhost:3000/api/stripe/webhook", {
        method: "POST",
        headers: { "stripe-signature": "sig" },
        body: "{}",
      })
    );

    expect(response.status).toBe(200);
    expect(mocks.syncStripeSubscriptionToAccount).toHaveBeenCalledWith(
      "account_1",
      expect.objectContaining({ id: "sub_123" }),
      expect.objectContaining({
        status: "canceled",
        paymentIssue: false,
      })
    );
  });
});
