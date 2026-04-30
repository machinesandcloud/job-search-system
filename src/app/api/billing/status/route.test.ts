import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getCurrentSubscriptionAccess: vi.fn(),
  getCurrentPeriodTokenUsage: vi.fn(),
}));

vi.mock("@/lib/billing", () => ({
  getCurrentSubscriptionAccess: mocks.getCurrentSubscriptionAccess,
  getCurrentPeriodTokenUsage: mocks.getCurrentPeriodTokenUsage,
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

    const response = await GET();
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

    const response = await GET();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      account: { id: "account_1", name: "Acme" },
      tokenUsage: { used: 1200, limit: 3000000 },
    });
  });
});
