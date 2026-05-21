// Monthly newsletter broadcast — called by netlify/functions/cron-monthly.mts
// on the 1st of each month at 9am UTC.
// Sends to all non-suppressed users (free + trial + paid).

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/resend";
import { render } from "@react-email/render";
import * as React from "react";
import { NewsletterMonthly } from "@/lib/email-sequences/emails/newsletter";

export const runtime = "nodejs";
export const maxDuration = 60;

const APP_URL =
  (process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "") ||
  "https://app.zaricoach.com";

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured" }, { status: 500 });
  }
  if (request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const monthIndex = now.getMonth(); // 0–11
  const monthLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Member-role users only (excludes admin and support accounts)
  const users = await prisma.user.findMany({
    where: { role: "member" },
    select: { email: true, firstName: true },
  }) as { email: string; firstName: string | null }[];

  if (users.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, skipped: 0 });
  }

  // Batch suppression check
  const emails = users.map(u => u.email);
  const suppressed = await prisma.emailSuppression.findMany({
    where: { email: { in: emails } },
    select: { email: true },
  }) as { email: string }[];
  const suppressedSet = new Set(suppressed.map(s => s.email));

  let sent = 0;
  let skipped = 0;
  let errors = 0;

  for (const user of users) {
    if (suppressedSet.has(user.email)) {
      skipped++;
      continue;
    }

    try {
      const unsubscribeUrl = `${APP_URL}/api/email/unsubscribe?email=${encodeURIComponent(user.email)}`;
      const dashboardUrl = `${APP_URL}/dashboard`;

      const element = React.createElement(NewsletterMonthly, {
        firstName: user.firstName ?? undefined,
        monthIndex,
        monthLabel,
        unsubscribeUrl,
        dashboardUrl,
      });

      const [html, text] = await Promise.all([
        render(element),
        render(element, { plainText: true }),
      ]);

      await sendEmail({
        to: user.email,
        subject: `Zari Career Dispatch · ${monthLabel}`,
        html,
        text,
        unsubscribeUrl,
      });

      await prisma.appEvent.create({
        data: {
          eventName: "email_sent",
          metadataJson: {
            email: user.email,
            sequence: "newsletter",
            step: 0,
            subject: `Zari Career Dispatch · ${monthLabel}`,
            type: "newsletter",
            monthLabel,
          },
        },
      }).catch(() => null);

      sent++;
    } catch (err) {
      console.error(`[newsletter] error sending to ${user.email}:`, err);
      errors++;
    }
  }

  console.log(`[newsletter] ${monthLabel}: sent=${sent} skipped=${skipped} errors=${errors}`);
  return NextResponse.json({ ok: true, monthLabel, sent, skipped, errors });
}
