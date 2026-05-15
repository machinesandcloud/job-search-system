import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { prisma, isDatabaseReady } from "@/lib/db";
import { logAppEvent } from "@/lib/billing";

export const runtime = "nodejs";

// POST /api/onboarding/intake
// Saves the goal-based signup survey into CoachProfile.
// Body: { goal, currentRole?, targetRole?, experienceLevel?, challenge? }
//
// goal: "job_search" | "promotion" | "salary" | "career_change" | "executive"
// challenge: free-text, user's biggest stated obstacle

const VALID_GOALS = ["job_search", "promotion", "salary", "career_change", "executive"] as const;
const VALID_EXPERIENCE = ["entry", "mid", "senior", "lead", "executive"] as const;

export async function POST(request: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  if (!isDatabaseReady()) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const body = (await request.json().catch(() => ({}))) as {
    goal?: string;
    currentRole?: string;
    targetRole?: string;
    experienceLevel?: string;
    challenge?: string;
  };

  const goal = VALID_GOALS.includes(body.goal as (typeof VALID_GOALS)[number])
    ? body.goal!
    : null;
  const experienceLevel = VALID_EXPERIENCE.includes(body.experienceLevel as (typeof VALID_EXPERIENCE)[number])
    ? body.experienceLevel!
    : null;
  const currentRole = typeof body.currentRole === "string" ? body.currentRole.trim().slice(0, 200) : null;
  const targetRole = typeof body.targetRole === "string" ? body.targetRole.trim().slice(0, 200) : null;
  const challenge = typeof body.challenge === "string" ? body.challenge.trim().slice(0, 500) : null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, accountId: true, email: true },
  });
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

  await prisma.coachProfile.upsert({
    where: { userId },
    update: {
      ...(currentRole ? { currentRole } : {}),
      ...(targetRole ? { targetRole } : {}),
      ...(experienceLevel ? { experienceLevel } : {}),
      goals: goal ? [goal] : [],
      painPoints: challenge ? [challenge] : [],
      onboardingAnswers: { goal, currentRole, targetRole, experienceLevel, challenge },
    },
    create: {
      userId,
      currentRole,
      targetRole,
      experienceLevel,
      goals: goal ? [goal] : [],
      painPoints: challenge ? [challenge] : [],
      onboardingAnswers: { goal, currentRole, targetRole, experienceLevel, challenge },
    },
  });

  await logAppEvent("onboarding_intake_submitted", {
    accountId: user.accountId ?? undefined,
    userId,
    metadataJson: { goal, experienceLevel, hasCurrentRole: Boolean(currentRole), hasTargetRole: Boolean(targetRole), hasChallenge: Boolean(challenge) },
  });

  return NextResponse.json({ ok: true });
}
