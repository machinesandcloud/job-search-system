import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";

export const runtime = "nodejs";

export async function GET() {
  await requireCoachAdminActor("support");

  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const [
    activeEnrollments,
    completedToday,
    canceledToday,
    suppressions,
    churnSurveys,
    recentNpsEvents,
    recentFunnelEvents,
  ] = await Promise.all([
    prisma.emailSequenceEnrollment.findMany({
      where: { completedAt: null, canceledAt: null },
      orderBy: { nextSendAt: "asc" },
      take: 150,
    }),
    prisma.emailSequenceEnrollment.count({
      where: { completedAt: { gte: todayStart } },
    }),
    prisma.emailSequenceEnrollment.count({
      where: { canceledAt: { gte: todayStart } },
    }),
    prisma.emailSuppression.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.churnSurvey.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
    prisma.appEvent.findMany({
      where: { eventName: "nps_submitted" },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.appEvent.findMany({
      where: {
        eventName: {
          in: [
            "checkout_completed",
            "subscription_cancel_requested",
            "cancel_offer_accepted",
            "cancel_survey_submitted",
            "topup_completed",
          ],
        },
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
  ]);

  const npsDetractors = recentNpsEvents.filter(
    (e: { metadataJson: unknown }) => typeof (e.metadataJson as any)?.score === "number" && (e.metadataJson as any).score <= 6
  ).length;

  return NextResponse.json({
    stats: {
      queueSize: activeEnrollments.length,
      completedToday,
      canceledToday,
      suppressions: suppressions.length,
      churnSurveys: churnSurveys.length,
      npsDetractors,
    },
    activeEnrollments,
    suppressions,
    churnSurveys,
    recentNpsEvents,
    recentFunnelEvents,
  });
}
