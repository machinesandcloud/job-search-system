import { describe, it, expect, beforeAll, afterAll } from "vitest";
import Stripe from "stripe";
import { verifyStripeSignature } from "./stripe-webhook";

const TEST_KEY = "sk_test_123";
const stripe = new Stripe(TEST_KEY);

beforeAll(() => { process.env.STRIPE_SECRET_KEY = TEST_KEY; });
afterAll(() => { delete process.env.STRIPE_SECRET_KEY; });

describe("stripe webhook signature", () => {
  it("verifies a valid signature", () => {
    const secret = "whsec_test_secret";
    const payload = JSON.stringify({ id: "evt_123", type: "checkout.session.completed" });
    const header = stripe.webhooks.generateTestHeaderString({ payload, secret });
    const event = verifyStripeSignature(payload, header, secret) as any;
    expect(event.type).toBe("checkout.session.completed");
  });
});
