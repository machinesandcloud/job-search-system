import { describe, it, expect } from "vitest";
import Stripe from "stripe";
import { verifyStripeSignature } from "./stripe-webhook";

const stripe = new Stripe("sk_test_123");

describe("stripe webhook signature", () => {
  it("verifies a valid signature", () => {
    const secret = "whsec_test_secret";
    const payload = JSON.stringify({ id: "evt_123", type: "checkout.session.completed" });
    const header = stripe.webhooks.generateTestHeaderString({ payload, secret });
    const event = verifyStripeSignature(payload, header, secret) as any;
    expect(event.type).toBe("checkout.session.completed");
  });
});
