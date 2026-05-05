import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  getCurrentSubscriptionAccess: vi.fn(),
  getCurrentPeriodTokenUsage: vi.fn(),
  getStripeClient: vi.fn(),
  syncStripeSubscriptionToAccount: vi.fn(),
}));

vi.mock("@/lib/billing", () => ({
  getCurrentSubscriptionAccess: mocks.getCurrentSubscriptionAccess,
  getCurrentPeriodTokenUsage: mocks.getCurrentPeriodTokenUsage,
}));

vi.mock("@/lib/stripe", () => ({
  getStripeClient: mocks.getStripeClient,
}));

vi.mock("@/lib/subscription-sync", () => ({
  syncStripeSubscriptionToAccount: mocks.syncStripeSubscriptionToAccount,
}));

import { GET } from "./route";

describe("billing status route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("blocks access when the subscription is canceled", async () => {
    mocks.getCurrentSubscriptionAccess.mockResolvedValue({
      ok: false,
      status: 402,
      error: "Subscription has been canceled.",
      subscription: { status: "canceled" },
    });

    const response = await GET(new NextRequest("http://localhost:3000/api/billing/status"));
    expect(response.status).toBe(402);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      error: "Subscription has been canceled.",
      subscriptionStatus: "canceled",
    });
  });

  it("returns token usage for an active subscription", async () => {
    mocks.getCurrentSubscriptionAccess.mockResolvedValue({
      ok: true,
      account: { id: "account_1", name: "Acme", status: "active", paymentIssue: false },
      subscription: { status: "active", planName: "Pro Monthly" },
    });
    mocks.getCurrentPeriodTokenUsage.mockResolvedValue({
      used: 1200,
      limit: 3000000,
      remaining: 2998800,
    });

    const response = await GET(new NextRequest("http://localhost:3000/api/billing/status"));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      account: { id: "account_1", name: "Acme" },
      tokenUsage: { used: 1200, limit: 3000000 },
    });
  });

  it("reconciles a session during polling when access is still pending", async () => {
    mocks.getCurrentSubscriptionAccess
      .mockResolvedValueOnce({
        ok: false,
        status: 402,
        error: "Active subscription required.",
        account: { id: "account_1" },
      })
      .mockResolvedValueOnce({
        ok: true,
        account: { id: "account_1", name: "Acme", status: "active", paymentIssue: false },
        subscription: { status: "active", planName: "Growth" },
      });
    mocks.getCurrentPeriodTokenUsage.mockResolvedValue({
      used: 0,
      limit: 3000000,
      remaining: 3000000,
    });
    mocks.getStripeClient.mockReturnValue({
      checkout: {
        sessions: {
          retrieve: vi.fn().mockResolvedValue({
            subscription: {
              id: "sub_123",
              status: "active",
            },
          }),
        },
      },
    });

    const response = await GET(
      new NextRequest("http://localhost:3000/api/billing/status?session_id=cs_123"),
    );

    expect(mocks.syncStripeSubscriptionToAccount).toHaveBeenCalledWith(
      "account_1",
      expect.objectContaining({ id: "sub_123", status: "active" }),
    );
    expect(response.status).toBe(200);
  });
});
