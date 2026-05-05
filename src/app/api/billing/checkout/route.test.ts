import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  getStripeClient: vi.fn(),
  getStripeSubscriptionPriceId: vi.fn(),
  syncCurrentUserToBillingIdentity: vi.fn(),
  logAppEvent: vi.fn(),
  getBillingSuccessUrl: vi.fn(),
  getBillingCancelUrl: vi.fn(),
}));

vi.mock("@/lib/stripe", () => ({
  getStripeClient: mocks.getStripeClient,
  getStripeSubscriptionPriceId: mocks.getStripeSubscriptionPriceId,
}));

vi.mock("@/lib/billing", () => ({
  syncCurrentUserToBillingIdentity: mocks.syncCurrentUserToBillingIdentity,
  logAppEvent: mocks.logAppEvent,
  getBillingSuccessUrl: mocks.getBillingSuccessUrl,
  getBillingCancelUrl: mocks.getBillingCancelUrl,
}));

vi.mock("@/lib/utils", () => ({
  ensureSameOrigin: () => true,
}));

import { POST } from "./route";

describe("billing checkout route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getBillingSuccessUrl.mockReturnValue("http://localhost:3000/billing/success");
    mocks.getBillingCancelUrl.mockReturnValue("http://localhost:3000/onboarding/plan?billing=cancelled");
    mocks.getStripeSubscriptionPriceId.mockReturnValue("price_pro_monthly");
    delete process.env.STRIPE_TRIAL_DAYS;
  });

  it("creates a subscription checkout session for an authenticated account", async () => {
    mocks.syncCurrentUserToBillingIdentity.mockResolvedValue({
      mvpUser: { id: "mvp_user_1" },
      user: { id: "user_1", email: "owner@example.com" },
      account: { id: "account_1" },
      subscription: null,
    });

    const create = vi.fn().mockResolvedValue({
      id: "cs_test_123",
      url: "https://checkout.stripe.test/session",
    });

    mocks.getStripeClient.mockReturnValue({
      checkout: {
        sessions: {
          create,
        },
      },
    });

    const request = Object.assign(
      new Request("http://localhost:3000/api/billing/checkout", {
        method: "POST",
        headers: {
          origin: "http://localhost:3000",
          host: "localhost:3000",
          "content-type": "application/json",
        },
        body: JSON.stringify({ planId: "growth" }),
      }),
      {
        nextUrl: new URL("http://localhost:3000/api/billing/checkout"),
      },
    ) as unknown as NextRequest;

    const response = await POST(request);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      url: "https://checkout.stripe.test/session",
      sessionId: "cs_test_123",
    });

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "subscription",
        client_reference_id: "account_1",
        metadata: expect.objectContaining({
          accountId: "account_1",
          userId: "user_1",
          externalAuthId: "mvp_user_1",
          requestedPlanId: "growth",
        }),
      })
    );

    expect(mocks.getStripeSubscriptionPriceId).toHaveBeenCalledWith("growth");
    expect(mocks.getBillingSuccessUrl).toHaveBeenCalledWith("http://localhost:3000");
    expect(mocks.getBillingCancelUrl).toHaveBeenCalledWith("http://localhost:3000");

    expect(mocks.logAppEvent).toHaveBeenCalledWith(
      "checkout_started",
      expect.objectContaining({
        accountId: "account_1",
        userId: "user_1",
      })
    );
  });
});
