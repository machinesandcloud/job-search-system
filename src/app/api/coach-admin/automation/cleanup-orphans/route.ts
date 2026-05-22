import { NextResponse } from "next/server";
import { requireCoachAdminActor } from "@/lib/coach-admin-auth";
import { prisma } from "@/lib/db";
import { deleteContact } from "@/lib/zoho-crm";

export const runtime = "nodejs";
export const maxDuration = 120;

/**
 * Find all emails in EmailSequenceEnrollment or EmailSuppression
 * that have no corresponding User record (orphaned after account deletion),
 * then cancel their enrollments, remove suppressions, and delete Zoho contacts.
 */
export async function POST() {
  await requireCoachAdminActor("admin");

  // Collect all orphaned emails — present in email tables but no User row
  const [activeEnrollments, suppressions] = await Promise.all([
    prisma.emailSequenceEnrollment.findMany({
      where: { canceledAt: null, completedAt: null },
      select: { email: true },
      distinct: ["email"],
    }),
    prisma.emailSuppression.findMany({ select: { email: true } }),
  ]);

  const candidateEmails = Array.from(
    new Set([
      ...activeEnrollments.map((r) => r.email),
      ...suppressions.map((r) => r.email),
    ])
  );

  if (candidateEmails.length === 0) {
    return NextResponse.json({ ok: true, orphans: 0, enrollmentsCanceled: 0, suppressionsRemoved: 0 });
  }

  // Find which of these emails still have a User record
  const existingUsers = await prisma.user.findMany({
    where: { email: { in: candidateEmails } },
    select: { email: true },
  });
  const liveEmails = new Set(existingUsers.map((u) => u.email));

  const orphanedEmails = candidateEmails.filter((e) => !liveEmails.has(e));

  if (orphanedEmails.length === 0) {
    return NextResponse.json({ ok: true, orphans: 0, enrollmentsCanceled: 0, suppressionsRemoved: 0 });
  }

  // Cancel enrollments and remove suppressions in DB (fast, parallel)
  const [cancelResult, suppressResult] = await Promise.all([
    prisma.emailSequenceEnrollment.updateMany({
      where: { email: { in: orphanedEmails }, canceledAt: null, completedAt: null },
      data: { canceledAt: new Date() },
    }),
    prisma.emailSuppression.deleteMany({
      where: { email: { in: orphanedEmails } },
    }),
  ]);

  // Delete Zoho contacts one at a time — rate-limit-safe, non-fatal
  let zohoDeleted = 0;
  for (const email of orphanedEmails) {
    try {
      await deleteContact(email);
      zohoDeleted++;
    } catch {
      // already logged inside deleteContact
    }
  }

  console.log(`[cleanup-orphans] ${orphanedEmails.length} orphaned emails cleaned up`);

  return NextResponse.json({
    ok: true,
    orphans: orphanedEmails.length,
    enrollmentsCanceled: cancelResult.count,
    suppressionsRemoved: suppressResult.count,
    zohoDeleted,
    emails: orphanedEmails,
  });
}
