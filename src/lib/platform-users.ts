import crypto from "node:crypto";
import { prisma, isDatabaseReady } from "@/lib/db";
import { getCoachAdminRole } from "@/lib/billing";
import type { UserProfile } from "@/lib/mvp/types";
import {
  createUser as createMvpUser,
  getUserByEmail as getMvpUserByEmail,
  upsertUserMirror,
  validateUser as validateMvpUser,
} from "@/lib/mvp/store";

const PASSWORD_PREFIX = "scrypt";

function splitFullName(name?: string | null) {
  const trimmed = (name || "").trim();
  if (!trimmed) return { firstName: "", lastName: "" };
  const parts = trimmed.split(/\s+/);
  return {
    firstName: parts[0] || "",
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
}

function buildFullName(firstName?: string | null, lastName?: string | null) {
  return `${firstName || ""} ${lastName || ""}`.trim();
}

function resolvePlatformRole(email: string, currentRole?: string | null) {
  if (currentRole === "admin" || currentRole === "support") return currentRole;
  return getCoachAdminRole(email) || "member";
}

function defaultProfile(input: {
  name: string;
  email: string;
  currentRole?: string | null;
  targetRole?: string | null;
  experienceLevel?: string | null;
  geography?: string | null;
  goals?: string[];
  painPoints?: string[];
  onboardingComplete?: boolean;
}): UserProfile {
  return {
    name: input.name,
    email: input.email,
    currentRole: input.currentRole || "",
    targetRole: input.targetRole || "",
    experienceLevel: input.experienceLevel || "",
    geography: input.geography || "",
    goals: input.goals || [],
    painPoints: input.painPoints || [],
    onboardingComplete: input.onboardingComplete ?? false,
  };
}

export function hashPlatformPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashed = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${PASSWORD_PREFIX}:${salt}:${hashed}`;
}

export function verifyPlatformPassword(password: string, stored?: string | null) {
  if (!stored) return false;
  const [prefix, salt, hashed] = stored.split(":");
  if (prefix !== PASSWORD_PREFIX || !salt || !hashed) return false;
  const computed = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(computed, "hex"), Buffer.from(hashed, "hex"));
}

async function ensureDatabaseUserShape(user: any) {
  let ensuredUser = user;

  if (!ensuredUser.accountId) {
    const account = await prisma.account.create({
      data: {
        name: `${buildFullName(ensuredUser.firstName, ensuredUser.lastName) || ensuredUser.email.split("@")[0] || "Customer"} Account`,
        ownerUserId: ensuredUser.id,
        status: "incomplete",
        paymentIssue: false,
      },
    });

    ensuredUser = await prisma.user.update({
      where: { id: ensuredUser.id },
      data: { accountId: account.id },
    });
  }

  await prisma.coachProfile.upsert({
    where: { userId: ensuredUser.id },
    update: {},
    create: {
      userId: ensuredUser.id,
      goals: [],
      painPoints: [],
    },
  });

  return ensuredUser;
}

async function mirrorDatabaseUser(user: any) {
  const fullName = buildFullName(user.firstName, user.lastName) || user.email.split("@")[0] || "User";
  const coachProfile = await prisma.coachProfile.findUnique({
    where: { userId: user.id },
  });

  const mirrored = await upsertUserMirror({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profile: defaultProfile({
      name: fullName,
      email: user.email,
      currentRole: coachProfile?.currentRole || "",
      targetRole: coachProfile?.targetRole || "",
      experienceLevel: coachProfile?.experienceLevel || "",
      geography: coachProfile?.geography || "",
      goals: Array.isArray(coachProfile?.goals) ? (coachProfile?.goals as string[]) : [],
      painPoints: Array.isArray(coachProfile?.painPoints) ? (coachProfile?.painPoints as string[]) : [],
      onboardingComplete: Boolean(
        coachProfile?.currentRole ||
        coachProfile?.targetRole ||
        (Array.isArray(coachProfile?.goals) && coachProfile.goals.length) ||
        (Array.isArray(coachProfile?.painPoints) && coachProfile.painPoints.length)
      ),
    }),
  });

  return mirrored;
}

export async function createPlatformUser(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const email = input.email.trim().toLowerCase();

  if (!isDatabaseReady()) {
    const user = await createMvpUser(input);
    return { userId: user.id, profile: user.profile, source: "mvp" as const };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    let user = existing;

    if (!user.passwordHash) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash: hashPlatformPassword(input.password),
          firstName: input.firstName.trim() || user.firstName || null,
          lastName: input.lastName.trim() || user.lastName || null,
          role: resolvePlatformRole(email, user.role),
          planTier: user.planTier || "free",
        },
      });

      user = await ensureDatabaseUserShape(user);
      const mirrored = await mirrorDatabaseUser(user);
      return { userId: user.id, profile: mirrored.profile, source: "db" as const };
    }

    if (!user.accountId) {
      user = await ensureDatabaseUserShape(user);
      await mirrorDatabaseUser(user);
    }

    throw new Error("Account already exists. Sign in instead.");
  }

  let user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashPlatformPassword(input.password),
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      role: resolvePlatformRole(email),
      planTier: "free",
    },
  });

  user = await ensureDatabaseUserShape(user);
  const mirrored = await mirrorDatabaseUser(user);
  return { userId: user.id, profile: mirrored.profile, source: "db" as const };
}

export async function authenticateGooglePlatformUser(input: {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
}) {
  const email = input.email.trim().toLowerCase();
  const firstName = (input.firstName || "").trim();
  const lastName = (input.lastName || "").trim();
  const displayName = (input.name || buildFullName(firstName, lastName) || email.split("@")[0] || "User").trim();

  if (!isDatabaseReady()) {
    const existingMvpUser = await getMvpUserByEmail(email);
    if (existingMvpUser) {
      const mirrored = await upsertUserMirror({
        id: existingMvpUser.id,
        email,
        firstName: firstName || splitFullName(existingMvpUser.profile?.name).firstName,
        lastName: lastName || splitFullName(existingMvpUser.profile?.name).lastName,
        profile: {
          ...existingMvpUser.profile,
          name: displayName,
          email,
        },
      });
      return { userId: mirrored.id, profile: mirrored.profile, source: "mvp" as const, isNewUser: false };
    }

    const created = await createMvpUser({
      firstName: firstName || displayName,
      lastName,
      email,
      password: crypto.randomBytes(24).toString("hex"),
    });

    return { userId: created.id, profile: created.profile, source: "mvp" as const, isNewUser: true };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  const role = resolvePlatformRole(email, existing?.role);

  let user = existing
    ? await prisma.user.update({
        where: { id: existing.id },
        data: {
          firstName: existing.firstName || firstName || null,
          lastName: existing.lastName || lastName || null,
          role,
        },
      })
    : await prisma.user.create({
        data: {
          email,
          firstName: firstName || null,
          lastName: lastName || null,
          role,
          planTier: "free",
        },
      });

  user = await ensureDatabaseUserShape(user);

  await prisma.coachProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      goals: [],
      painPoints: [],
    },
  });

  const mirrored = await upsertUserMirror({
    id: user.id,
    email,
    firstName: user.firstName || firstName || displayName,
    lastName: user.lastName || lastName || "",
    profile: {
      name: displayName,
      email,
      onboardingComplete: false,
    },
  });

  return {
    userId: user.id,
    profile: mirrored.profile,
    source: "db" as const,
    isNewUser: !existing,
  };
}

export async function authenticatePlatformUser(emailInput: string, password: string) {
  const email = emailInput.trim().toLowerCase();

  if (isDatabaseReady()) {
    let existing = await prisma.user.findUnique({ where: { email } });
    if (existing?.passwordHash && verifyPlatformPassword(password, existing.passwordHash)) {
      if (existing.role !== resolvePlatformRole(email, existing.role)) {
        existing = await prisma.user.update({
          where: { id: existing.id },
          data: { role: resolvePlatformRole(email, existing.role) },
        });
      }
      const user = await ensureDatabaseUserShape(existing);
      const mirrored = await mirrorDatabaseUser(user);
      return { userId: user.id, profile: mirrored.profile, source: "db" as const };
    }

    const adminPassword = process.env.COACH_ADMIN_PASSWORD || "";
    if (
      existing &&
      !existing.passwordHash &&
      adminPassword &&
      password === adminPassword &&
      (existing.role === "admin" || existing.role === "support")
    ) {
      existing = await prisma.user.update({
        where: { id: existing.id },
        data: { passwordHash: hashPlatformPassword(password) },
      });
      const user = await ensureDatabaseUserShape(existing);
      const mirrored = await mirrorDatabaseUser(user);
      return { userId: user.id, profile: mirrored.profile, source: "db" as const };
    }
  }

  const legacyUser = await validateMvpUser(email, password);
  if (!legacyUser) return null;

  if (!isDatabaseReady()) {
    return { userId: legacyUser.id, profile: legacyUser.profile, source: "mvp" as const };
  }

  const { firstName, lastName } = splitFullName(legacyUser.profile?.name);
  const passwordHash = hashPlatformPassword(password);
  const existing = await prisma.user.findUnique({ where: { email } });

  let user = existing
    ? await prisma.user.update({
        where: { id: existing.id },
        data: {
          passwordHash,
          firstName: existing.firstName || firstName || null,
          lastName: existing.lastName || lastName || null,
          role: resolvePlatformRole(email, existing.role),
        },
      })
    : await prisma.user.create({
        data: {
          email,
          passwordHash,
          firstName: firstName || null,
          lastName: lastName || null,
          role: resolvePlatformRole(email),
          planTier: "free",
        },
      });

  user = await ensureDatabaseUserShape(user);
  const mirrored = await mirrorDatabaseUser(user);
  return { userId: user.id, profile: mirrored.profile, source: "db" as const };
}

export async function syncPlatformProfile(userId: string, profile: UserProfile) {
  if (!isDatabaseReady()) return null;

  const { firstName, lastName } = splitFullName(profile.name);
  await prisma.user.updateMany({
    where: { id: userId },
    data: {
      email: profile.email.trim().toLowerCase(),
      firstName: firstName || null,
      lastName: lastName || null,
    },
  });

  await prisma.coachProfile.upsert({
    where: { userId },
    update: {
      currentRole: profile.currentRole || null,
      targetRole: profile.targetRole || null,
      experienceLevel: profile.experienceLevel || null,
      geography: profile.geography || null,
      goals: profile.goals,
      painPoints: profile.painPoints,
      onboardingAnswers: {
        onboardingComplete: profile.onboardingComplete,
      },
    },
    create: {
      userId,
      currentRole: profile.currentRole || null,
      targetRole: profile.targetRole || null,
      experienceLevel: profile.experienceLevel || null,
      geography: profile.geography || null,
      goals: profile.goals,
      painPoints: profile.painPoints,
      onboardingAnswers: {
        onboardingComplete: profile.onboardingComplete,
      },
    },
  });

  return true;
}
