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
      findFirst: vi.fn(),
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
  isDatabaseReady: vi.fn().mockReturnValue(true),
}));

vi.mock("@/lib/db", () => ({
  prisma: mocks.prisma,
  isDatabaseReady: () => mocks.isDatabaseReady(),
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

vi.mock("@/lib/zoho-engine", () => ({
  onSubscriptionChanged: vi.fn(),
  onUserChurned: vi.fn(),
  onPaymentFailed: vi.fn(),
  onPaymentRecovered: vi.fn(),
  onTrialEnding: vi.fn(),
}));

import { POST } from "./route";

describe("stripe webhook route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.isDatabaseReady.mockReturnValue(true);
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

  it("returns 400 when stripe-signature header is missing", async () => {
    const response = await POST(
      new Request("http://localhost:3000/api/stripe/webhook", {
        method: "POST",
        body: "{}",
      })
    );
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toMatch(/signature/i);
  });

  it("returns 400 when STRIPE_WEBHOOK_SECRET is not configured", async () => {
    delete process.env.STRIPE_WEBHOOK_SECRET;
    const response = await POST(
      new Request("http://localhost:3000/api/stripe/webhook", {
        method: "POST",
        headers: { "stripe-signature": "sig" },
        body: "{}",
      })
    );
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toMatch(/signature/i);
  });

  it("returns 400 when webhook signature is invalid", async () => {
    mocks.getStripeClient.mockReturnValue({
      webhooks: {
        constructEvent: vi.fn().mockImplementation(() => {
          throw new Error("No signatures found matching the expected signature for payload.");
        }),
      },
    });
    const response = await POST(
      new Request("http://localhost:3000/api/stripe/webhook", {
        method: "POST",
        headers: { "stripe-signature": "bad_sig" },
        body: "{}",
      })
    );
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toMatch(/invalid signature/i);
  });

  it("returns 503 when the database is not ready", async () => {
    mocks.isDatabaseReady.mockReturnValue(false);
    const response = await POST(
      new Request("http://localhost:3000/api/stripe/webhook", {
        method: "POST",
        headers: { "stripe-signature": "sig" },
        body: "{}",
      })
    );
    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body.error).toMatch(/database/i);
  });

  it("returns 200 with skipped:true for unhandled event types", async () => {
    mocks.prisma.stripeEvent.findUnique.mockResolvedValue(null);
    mocks.getStripeClient.mockReturnValue({
      webhooks: {
        constructEvent: vi.fn().mockReturnValue({
          id: "evt_unknown",
          type: "payment_intent.created",
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
    const body = await response.json();
    expect(body.received).toBe(true);
    expect(body.skipped).toBe(true);
  });

  it("records event as failed and returns 500 when processing throws", async () => {
    mocks.prisma.stripeEvent.findUnique.mockResolvedValue(null);
    mocks.prisma.subscription.findUnique.mockResolvedValue({ accountId: "account_1" });
    mocks.syncStripeSubscriptionToAccount.mockRejectedValue(new Error("Sync failure"));
    mocks.getStripeClient.mockReturnValue({
      webhooks: {
        constructEvent: vi.fn().mockReturnValue({
          id: "evt_err",
          type: "customer.subscription.deleted",
          data: {
            object: {
              id: "sub_err",
              customer: "cus_err",
              status: "canceled",
              metadata: {},
              cancel_at_period_end: false,
              canceled_at: null,
              trial_end: null,
              items: { data: [{ current_period_start: 0, current_period_end: 0, price: { id: "price_1" } }] },
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
    expect(response.status).toBe(500);
    expect(mocks.prisma.stripeEvent.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: "failed" }),
      })
    );
  });

  it("processes subscription.updated and syncs the account", async () => {
    mocks.prisma.stripeEvent.findUnique.mockResolvedValue(null);
    mocks.prisma.subscription.findUnique.mockResolvedValue({ accountId: "account_1" });
    mocks.prisma.user.findFirst.mockResolvedValue(null);
    mocks.getStripeClient.mockReturnValue({
      webhooks: {
        constructEvent: vi.fn().mockReturnValue({
          id: "evt_updated",
          type: "customer.subscription.updated",
          data: {
            object: {
              id: "sub_123",
              customer: "cus_123",
              status: "active",
              metadata: {},
              cancel_at_period_end: false,
              canceled_at: null,
              trial_end: null,
              items: { data: [{ current_period_start: 0, current_period_end: 0, price: { id: "price_pro_monthly" } }] },
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
      expect.objectContaining({ status: undefined })
    );
  });
});
