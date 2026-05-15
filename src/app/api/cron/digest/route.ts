// Weekly founder digest — sent to Steve every Monday at 8am UTC.
// Aggregates the past 7 days of business metrics and emails a formatted report.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/resend";
import { render } from "@react-email/render";
import * as React from "react";
import { WeeklyDigest } from "@/lib/email-sequences/emails/digest";

export const runtime = "nodejs";
export const maxDuration = 60;

const FOUNDER_EMAIL = process.env.FOUNDER_EMAIL ?? "docteureminem@gmail.com";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 86_400_000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 86_400_000);

  const weekOf = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  // New users this week
  const newUsers = await prisma.user.count({ where: { createdAt: { gte: weekAgo } } });

  // Active trials
  const activeTrials = await prisma.subscription.count({ where: { status: "trialing" } });

  // New paid this week (first-time activation)
  const newPaidEvents = await prisma.appEvent.count({
    where: { eventName: "checkout_completed", createdAt: { gte: weekAgo } },
  });

  // Payment failures this week
  const paymentFailures = await prisma.appEvent.count({
    where: { eventName: "subscription_payment_failed", createdAt: { gte: weekAgo } },
  });

  // Churn this week
  const churnedThisWeek = await prisma.appEvent.count({
    where: { eventName: "subscription_canceled", createdAt: { gte: weekAgo } },
  });

  // Sessions this week
  const sessionsThisWeek = await prisma.coachingSession.count({
    where: { status: "complete", createdAt: { gte: weekAgo } },
  });

  // Active users this week (users who had a session)
  const activeUserCount = await prisma.coachingSession.groupBy({
    by: ["userId"],
    where: { status: "complete", createdAt: { gte: weekAgo } },
  });
  const avgSessionsPerUser = activeUserCount.length > 0
    ? sessionsThisWeek / activeUserCount.length
    : 0;

  // At-risk count (active subscribers with health score < 50)
  // Approximate: paid users with no session in 14 days
  const paidUsers = await prisma.user.findMany({
    where: { subscription: { status: { in: ["active", "trialing"] } } },
    select: {
      id: true,
      coachingSessions: {
        where: { status: "complete" },
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { createdAt: true },
      },
    },
  });
  const atRiskCount = paidUsers.filter((u: { coachingSessions: { createdAt: Date }[] }) => {
    const last = u.coachingSessions[0]?.createdAt;
    if (!last) return true;
    return (now.getTime() - last.getTime()) > 14 * 86_400_000;
  }).length;

  // MRR (sum of active subscription amounts)
  const activeSubs = await prisma.subscription.findMany({
    where: { status: "active" },
    select: { planName: true },
  });
  const planPrices: Record<string, number> = {
    "Search": 39, "Pro": 39,
    "Growth": 89, "Premium": 89,
    "Executive": 149, "Team": 149,
  };
  const mrr = activeSubs.reduce((sum: number, s: { planName: string | null }) => {
    const planKey = Object.keys(planPrices).find(k => s.planName?.includes(k));
    return sum + (planKey ? planPrices[planKey] : 39);
  }, 0);

  const prevActiveSubs = await prisma.subscription.count({ where: { status: "active", createdAt: { lt: weekAgo } } });
  const mrrLastWeek = prevActiveSubs * 39;
  const mrrDelta = mrr - mrrLastWeek;

  // NPS score this week (true NPS = % promoters - % detractors, scaled 0-100)
  const npsEvents = await prisma.appEvent.findMany({
    where: { eventName: "nps_submitted", createdAt: { gte: weekAgo } },
    select: { metadataJson: true },
  });
  const npsScores = (npsEvents as { metadataJson: unknown }[])
    .map((e) => (e.metadataJson as { score?: number })?.score)
    .filter((s): s is number => typeof s === "number");
  const promoters = npsScores.filter((s: number) => s >= 9).length;
  const detractors = npsScores.filter((s: number) => s <= 6).length;
  const npsAvg = npsScores.length > 0
    ? Math.round(((promoters - detractors) / npsScores.length) * 100)
    : undefined;

  // Top engaged users this week
  const topSessions = await prisma.coachingSession.groupBy({
    by: ["userId"],
    where: { status: "complete", createdAt: { gte: weekAgo } },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 5,
  });
  const topUserIds = topSessions.map((s: { userId: string; _count: { id: number } }) => s.userId);
  const topUsers = await prisma.user.findMany({
    where: { id: { in: topUserIds } },
    select: { id: true, firstName: true, lastName: true, email: true },
  });
  const topEngagedUsers = topSessions.map((s: { userId: string; _count: { id: number } }) => {
    const u = topUsers.find((u: { id: string; firstName: string | null; lastName: string | null; email: string }) => u.id === s.userId);
    return {
      name: (`${u?.firstName ?? ""} ${u?.lastName ?? ""}`.trim()) || (u?.email ?? "Unknown"),
      email: u?.email ?? "",
      sessions: s._count.id,
    };
  });

  const html = await render(React.createElement(WeeklyDigest, {
    weekOf,
    newUsers,
    activeTrials,
    newPaidThisWeek: newPaidEvents,
    mrr,
    mrrDelta,
    churnedThisWeek,
    sessionsThisWeek,
    avgSessionsPerUser,
    atRiskCount,
    npsAvg,
    topEngagedUsers,
    paymentFailures,
  }));

  await sendEmail({
    to: FOUNDER_EMAIL,
    subject: `Zari Weekly: ${newUsers} new users · $${mrr.toLocaleString()} MRR · ${sessionsThisWeek} sessions`,
    html,
  });

  return NextResponse.json({ ok: true, weekOf, newUsers, mrr, sessionsThisWeek });
}
