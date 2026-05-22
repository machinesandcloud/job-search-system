import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/resend";
import { getStripeClient } from "@/lib/stripe";

const APP_URL =
  (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "") || "https://app.zaricoach.com";

function generateCode(): string {
  // 8 hex chars — readable, unique enough, e.g. "a3f7d2b1"
  return crypto.randomBytes(4).toString("hex");
}

// ─── Code management ──────────────────────────────────────────────────────────

export async function getOrCreateReferralCode(referrerEmail: string): Promise<string> {
  const existing = await prisma.referral.findFirst({
    where: { referrerEmail },
    orderBy: { createdAt: "asc" },
    select: { referralCode: true },
  });
  if (existing) return existing.referralCode;

  let code = generateCode();
  // Retry on collision (astronomically rare but safe)
  while (await prisma.referral.findUnique({ where: { referralCode: code } })) {
    code = generateCode();
  }

  await prisma.referral.create({
    data: { referrerEmail, referralCode: code, status: "pending" },
  });
  return code;
}

export function buildReferralUrl(code: string): string {
  return `${APP_URL}/?ref=${code}`;
}

export async function getReferralStats(referrerEmail: string) {
  const referrals = await prisma.referral.findMany({
    where: { referrerEmail },
    select: { status: true, creditGranted: true },
  });
  return {
    signedUp: referrals.filter((r) => r.status === "signed_up" || r.status === "converted").length,
    converted: referrals.filter((r) => r.status === "converted").length,
    creditsEarned: referrals.filter((r) => r.creditGranted).length,
  };
}

// ─── Lifecycle hooks ──────────────────────────────────────────────────────────

/**
 * Call after a new user signs up via a referral link.
 * Idempotent — silently no-ops if code is invalid, already used, or self-referral.
 */
export async function recordReferralSignup(
  code: string,
  referreeEmail: string
): Promise<void> {
  if (!code) return;

  const referral = await prisma.referral.findFirst({
    where: { referralCode: code, status: "pending" },
  });
  if (!referral) return;
  if (referral.referrerEmail.toLowerCase() === referreeEmail.toLowerCase()) return;

  await prisma.referral.update({
    where: { id: referral.id },
    data: { referreeEmail, status: "signed_up" },
  });

  // Notify referrer — fire-and-forget
  void sendEmail({
    to: referral.referrerEmail,
    subject: "Your referral just signed up for Zari",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0F172A;max-width:480px;margin:0 auto;">
        <h2 style="font-size:20px;font-weight:800;margin-bottom:8px;">Almost there! ⏳</h2>
        <p style="color:#475569;margin-bottom:16px;">Your referral just created a free Zari account using your link — nice work.</p>
        <p style="color:#475569;margin-bottom:16px;padding:14px 16px;background:#F8F4FF;border-radius:8px;border-left:3px solid #7c3aed;"><strong>You earn your free month once they subscribe to a paid plan.</strong> We'll email you the moment it happens and apply the credit automatically.</p>
        <p style="color:#475569;margin-bottom:24px;">No limit on how many you can earn — keep sharing.</p>
        <a href="${APP_URL}/dashboard" style="background:#7c3aed;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;display:inline-block;font-weight:700;font-size:14px;">View your dashboard →</a>
      </div>
    `,
  }).catch(() => {});
}

/**
 * Call when a referred user completes their first subscription payment.
 * Applies a Stripe customer credit (1 month of referrer's plan) and marks the referral converted.
 */
export async function processReferralConversion(referreeEmail: string): Promise<void> {
  if (!referreeEmail) return;

  const referral = await prisma.referral.findFirst({
    where: {
      referreeEmail: referreeEmail.toLowerCase(),
      status: "signed_up",
      creditGranted: false,
    },
  });
  if (!referral) return;

  // Mark converted immediately to prevent double-processing
  await prisma.referral.update({
    where: { id: referral.id },
    data: { status: "converted", creditGranted: true },
  });

  // Apply Stripe credit to referrer's account
  let creditApplied = false;
  try {
    const referrer = await prisma.user.findUnique({
      where: { email: referral.referrerEmail },
      select: { accountId: true },
    });
    if (referrer?.accountId) {
      const sub = await prisma.subscription.findUnique({
        where: { accountId: referrer.accountId },
        select: { stripeCustomerId: true, stripePriceId: true },
      });
      if (
        sub?.stripeCustomerId &&
        sub?.stripePriceId &&
        process.env.STRIPE_SECRET_KEY &&
        !sub.stripeCustomerId.startsWith("pending_")
      ) {
        const stripe = getStripeClient();
        const price = await stripe.prices.retrieve(sub.stripePriceId);
        const amount = price.unit_amount ?? 0;
        if (amount > 0) {
          await stripe.customers.createBalanceTransaction(sub.stripeCustomerId, {
            amount: -amount, // negative = credit on account
            currency: price.currency ?? "usd",
            description: `Referral reward — ${referreeEmail} subscribed`,
          });
          creditApplied = true;
        }
      }
    }
  } catch (err) {
    console.error("[referral] Stripe credit failed:", err);
  }

  // Notify referrer of earned credit
  void sendEmail({
    to: referral.referrerEmail,
    subject: "You earned 1 free month on Zari! 🎁",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0F172A;max-width:480px;margin:0 auto;">
        <h2 style="font-size:20px;font-weight:800;margin-bottom:8px;">You earned a free month! 🎁</h2>
        <p style="color:#475569;margin-bottom:16px;">Your referral just subscribed to Zari. As promised, we've added <strong style="color:#7c3aed;">1 free month</strong> to your account.</p>
        ${
          creditApplied
            ? `<p style="color:#475569;margin-bottom:24px;">The credit has been applied to your Stripe account and will automatically reduce your next bill. No action needed.</p>`
            : `<p style="color:#475569;margin-bottom:24px;">We'll apply the credit to your account — reach out to support if you have any questions.</p>`
        }
        <p style="color:#475569;margin-bottom:24px;">Keep sharing — there's no limit to how many free months you can earn.</p>
        <a href="${APP_URL}/dashboard" style="background:#7c3aed;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;display:inline-block;font-weight:700;font-size:14px;">View your dashboard →</a>
      </div>
    `,
  }).catch(() => {});
}
