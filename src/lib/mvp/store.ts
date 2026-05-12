import crypto from "node:crypto";
import { prisma, isDatabaseReady } from "@/lib/db";
import { dashboardData } from "./data";
import type {
  ActionPlanItem,
  CoachingMode,
  DashboardPayload,
  DocumentRecord,
  SessionRecord,
  UserProfile,
  UsageLimit,
} from "./types";

// ─── Types ────────────────────────────────────────────────────────────────────

type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
  profile: UserProfile;
  usage: UsageLimit[];
  actionPlan: ActionPlanItem[];
};

type StoredDocument = DocumentRecord & {
  userId: string;
  mimeType: string;
  sizeBytes: number;
};

type StoredSession = SessionRecord & {
  userId: string;
  notes: string[];
  transcript: Array<{ time: string; role: "coach" | "user"; message: string }>;
};

type ResumeScoreRecord = {
  id: string;
  userId: string;
  filename: string;
  submittedAt: string;
  mode: "general" | "targeted";
  targetRole?: string;
  scores: { overall: number; ats: number; impact: number; clarity: number };
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function defaultUsage(): UsageLimit[] {
  return dashboardData.usage.map((item) => ({ ...item }));
}

function defaultActionPlan(): ActionPlanItem[] {
  return dashboardData.actionPlan.map((item) => ({ ...item }));
}

function defaultProfile(overrides?: Partial<UserProfile>): UserProfile {
  return {
    ...dashboardData.user,
    ...overrides,
    goals: overrides?.goals || [],
    painPoints: overrides?.painPoints || [],
  };
}

function mapSessionStatus(s: string): SessionRecord["status"] {
  if (s === "complete") return "complete";
  if (s === "live") return "live";
  if (s === "reviewing") return "reviewing";
  return "ready";
}

function mapDocumentType(t: string): "resume" | "linkedin" | "notes" {
  if (t === "linkedin") return "linkedin";
  if (t === "miscellaneous" || t === "interview_notes" || t === "cover_letter") return "notes";
  return "resume";
}

function toPrismaDocumentType(t: "resume" | "linkedin" | "notes") {
  if (t === "linkedin") return "linkedin" as const;
  if (t === "notes") return "miscellaneous" as const;
  return "resume" as const;
}

function toPrismaSessionMode(m: CoachingMode) {
  return m as "resume" | "linkedin" | "interview" | "career" | "confidence" | "recap";
}

// ─── User functions ───────────────────────────────────────────────────────────

export async function getUserById(userId: string): Promise<StoredUser | null> {
  if (!isDatabaseReady()) return null;
  try {
    const u = await prisma.user.findUnique({
      where: { id: userId },
      include: { coachProfile: true },
    });
    if (!u) return null;
    return buildStoredUser(u);
  } catch {
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<StoredUser | null> {
  if (!isDatabaseReady()) return null;
  try {
    const u = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { coachProfile: true },
    });
    if (!u) return null;
    return buildStoredUser(u);
  } catch {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildStoredUser(u: any): StoredUser {
  const cp = u.coachProfile;
  const profile: UserProfile = {
    name: [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email.split("@")[0],
    email: u.email,
    currentRole: cp?.currentRole || "",
    targetRole: cp?.targetRole || "",
    experienceLevel: cp?.experienceLevel || "",
    geography: cp?.geography || "",
    goals: Array.isArray(cp?.goals) ? cp.goals : [],
    painPoints: Array.isArray(cp?.painPoints) ? cp.painPoints : [],
    onboardingComplete: !!(cp?.currentRole || cp?.targetRole),
  };
  return {
    id: u.id,
    email: u.email,
    passwordHash: u.passwordHash || "",
    profile,
    usage: defaultUsage(),
    actionPlan: defaultActionPlan(),
  };
}

export async function createUser(input: {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<StoredUser> {
  const email = input.email.trim().toLowerCase();
  // createPlatformUser in platform-users.ts handles the actual Prisma write.
  // This function is called as a fallback mirror — return a synthetic object.
  const id = input.id || `user_${crypto.randomUUID()}`;
  const profile = defaultProfile({
    name: `${input.firstName} ${input.lastName}`.trim(),
    email,
    currentRole: "",
    targetRole: "",
    experienceLevel: "",
    geography: "",
    goals: [],
    painPoints: [],
    onboardingComplete: false,
  });
  return {
    id,
    email,
    passwordHash: hashPassword(input.password),
    profile,
    usage: defaultUsage(),
    actionPlan: defaultActionPlan(),
  };
}

export async function upsertUserMirror(input: {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  passwordHash?: string | null;
  profile?: Partial<UserProfile>;
}): Promise<StoredUser> {
  // Prisma is the source of truth — this now just returns a StoredUser shape
  const profile = defaultProfile({
    name: [input.firstName, input.lastName].filter(Boolean).join(" ") || input.email.split("@")[0],
    email: input.email.trim().toLowerCase(),
    ...(input.profile || {}),
  });
  return {
    id: input.id,
    email: input.email.trim().toLowerCase(),
    passwordHash: input.passwordHash || "",
    profile,
    usage: defaultUsage(),
    actionPlan: defaultActionPlan(),
  };
}

export async function validateUser(email: string, password: string): Promise<StoredUser | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;
  return user.passwordHash === hashPassword(password) ? user : null;
}

export async function getDashboardForUser(userId: string): Promise<DashboardPayload | null> {
  const user = await getUserById(userId);
  if (!user) return null;

  const [documents, sessions] = await Promise.all([
    listDocumentsForUser(userId),
    listSessionsForUser(userId),
  ]);

  return {
    user: user.profile,
    usage: user.usage,
    actionPlan: user.actionPlan,
    documents,
    sessions,
  };
}

export async function updateProfile(userId: string, input: Partial<UserProfile>): Promise<UserProfile | null> {
  if (!isDatabaseReady()) return null;
  try {
    await prisma.coachProfile.upsert({
      where: { userId },
      update: {
        currentRole: input.currentRole,
        targetRole: input.targetRole,
        experienceLevel: input.experienceLevel,
        geography: input.geography,
        goals: input.goals ?? [],
        painPoints: input.painPoints ?? [],
      },
      create: {
        userId,
        currentRole: input.currentRole,
        targetRole: input.targetRole,
        experienceLevel: input.experienceLevel,
        geography: input.geography,
        goals: input.goals ?? [],
        painPoints: input.painPoints ?? [],
      },
    });
    const updated = await getUserById(userId);
    return updated?.profile ?? null;
  } catch {
    return null;
  }
}

// ─── Documents ────────────────────────────────────────────────────────────────

export async function listDocumentsForUser(userId: string): Promise<StoredDocument[]> {
  if (!isDatabaseReady()) return [];
  try {
    const docs = await prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return docs.map((d: any) => ({
      id: d.id,
      userId: d.userId,
      title: d.fileName,
      type: mapDocumentType(d.type),
      updatedAt: d.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "indexed" as const,
      mimeType: d.mimeType,
      sizeBytes: d.sizeBytes,
    }));
  } catch {
    return [];
  }
}

export async function createDocumentForUser(
  userId: string,
  input: { title: string; type: "resume" | "linkedin" | "notes"; mimeType?: string; sizeBytes?: number },
): Promise<StoredDocument> {
  const id = crypto.randomUUID();

  if (isDatabaseReady()) {
    try {
      const doc = await prisma.document.create({
        data: {
          id,
          userId,
          fileName: input.title,
          type: toPrismaDocumentType(input.type),
          status: "indexed",
          mimeType: input.mimeType || "application/octet-stream",
          sizeBytes: input.sizeBytes || 0,
          storagePath: "",
        },
      });
      return {
        id: doc.id,
        userId: doc.userId,
        title: doc.fileName,
        type: input.type,
        updatedAt: "Just now",
        status: "indexed",
        mimeType: doc.mimeType,
        sizeBytes: doc.sizeBytes,
      };
    } catch {
      // fall through to in-memory
    }
  }

  return {
    id: `doc_${id}`,
    userId,
    title: input.title,
    type: input.type,
    updatedAt: "Just now",
    status: "indexed",
    mimeType: input.mimeType || "application/octet-stream",
    sizeBytes: input.sizeBytes || 0,
  };
}

// ─── Sessions ─────────────────────────────────────────────────────────────────

export async function createSessionForUser(
  userId: string,
  mode: CoachingMode,
  title?: string,
): Promise<StoredSession> {
  const sessionTitle = title || `${mode[0].toUpperCase()}${mode.slice(1)} session`;

  if (isDatabaseReady()) {
    try {
      const s = await prisma.coachingSession.create({
        data: {
          userId,
          mode: toPrismaSessionMode(mode),
          status: "live",
          title: sessionTitle,
          startedAt: new Date(),
        },
      });
      return toStoredSession(s);
    } catch {
      // fall through
    }
  }

  return {
    id: `sess_${crypto.randomUUID()}`,
    userId,
    title: sessionTitle,
    mode,
    status: "live",
    startedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    summary: "",
    transcriptTurns: 0,
    notes: [],
    transcript: [],
  };
}

export async function listSessionsForUser(userId: string): Promise<StoredSession[]> {
  if (!isDatabaseReady()) return [];
  try {
    const sessions = await prisma.coachingSession.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { _count: { select: { messages: true } } },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return sessions.map((s: any) => ({
      ...toStoredSession(s),
      transcriptTurns: s._count.messages,
    }));
  } catch {
    return [];
  }
}

export async function getSessionForUser(userId: string, sessionId: string): Promise<StoredSession | null> {
  if (!isDatabaseReady()) return null;
  try {
    const s = await prisma.coachingSession.findFirst({
      where: { id: sessionId, userId },
      include: { _count: { select: { messages: true } } },
    });
    if (!s) return null;
    return { ...toStoredSession(s), transcriptTurns: s._count.messages };
  } catch {
    return null;
  }
}

export async function appendSessionEvent(
  userId: string,
  sessionId: string,
  input: { role?: "coach" | "user"; message?: string },
): Promise<StoredSession | null> {
  if (!isDatabaseReady()) return null;
  try {
    if (input.message) {
      await prisma.sessionMessage.create({
        data: {
          sessionId,
          role: input.role === "coach" ? "assistant" : "user",
          content: input.message,
        },
      });
      await prisma.coachingSession.update({
        where: { id: sessionId },
        data: { summary: "Session in progress.", updatedAt: new Date() },
      });
    }
    return getSessionForUser(userId, sessionId);
  } catch {
    return null;
  }
}

export async function completeSessionForUser(userId: string, sessionId: string): Promise<StoredSession | null> {
  if (!isDatabaseReady()) return null;
  try {
    await prisma.coachingSession.update({
      where: { id: sessionId },
      data: {
        status: "complete",
        endedAt: new Date(),
        summary: "Session complete.",
      },
    });
    return getSessionForUser(userId, sessionId);
  } catch {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toStoredSession(s: any): StoredSession {
  return {
    id: s.id,
    userId: s.userId,
    title: s.title,
    mode: s.mode as CoachingMode,
    status: mapSessionStatus(s.status),
    startedAt: (s.startedAt ?? s.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    summary: s.summary || "",
    transcriptTurns: 0,
    notes: [],
    transcript: [],
  };
}

// ─── Reviews (legacy — kept for compatibility) ────────────────────────────────

export async function createReviewForUser(
  userId: string,
  input: { type: "resume" | "linkedin"; documentId?: string; targetRole?: string },
) {
  // No-op returning minimal shape; actual reviews are saved by /api/zari/resume
  return { id: `review_${crypto.randomUUID()}`, userId, type: input.type, output: null, updatedAt: new Date().toISOString() };
}

export async function getLatestReviewForUser(userId: string, type: "resume" | "linkedin") {
  return null;
}

// ─── Resume score history ─────────────────────────────────────────────────────

export async function saveResumeScore(
  userId: string,
  data: {
    filename: string;
    mode: "general" | "targeted";
    targetRole?: string;
    scores: { overall: number; ats: number; impact: number; clarity: number };
  },
): Promise<ResumeScoreRecord> {
  const record: ResumeScoreRecord = {
    id: `rscore_${crypto.randomUUID()}`,
    userId,
    filename: data.filename,
    submittedAt: new Date().toISOString(),
    mode: data.mode,
    targetRole: data.targetRole,
    scores: data.scores,
  };

  if (isDatabaseReady()) {
    try {
      const existing = await prisma.userPortalState.findUnique({
        where: { userId_key: { userId, key: "resume_scores" } },
      });
      const scores: ResumeScoreRecord[] = existing
        ? (existing.data as { scores: ResumeScoreRecord[] }).scores ?? []
        : [];
      scores.unshift(record);
      await prisma.userPortalState.upsert({
        where: { userId_key: { userId, key: "resume_scores" } },
        update: { data: { scores: scores.slice(0, 100) } },
        create: { userId, key: "resume_scores", data: { scores: scores.slice(0, 100) } },
      });
    } catch {
      // best-effort
    }
  }

  return record;
}

export async function getResumeScoreHistory(userId: string): Promise<ResumeScoreRecord[]> {
  if (!isDatabaseReady()) return [];
  try {
    const state = await prisma.userPortalState.findUnique({
      where: { userId_key: { userId, key: "resume_scores" } },
    });
    if (!state) return [];
    return (state.data as { scores: ResumeScoreRecord[] }).scores ?? [];
  } catch {
    return [];
  }
}

export async function clearResumeScoreHistory(userId: string): Promise<void> {
  if (!isDatabaseReady()) return;
  try {
    await prisma.userPortalState.deleteMany({ where: { userId, key: "resume_scores" } });
  } catch {
    // best-effort
  }
}

// ─── Generated Resume Snapshots ───────────────────────────────────────────────

export type GeneratedResumeRecord = {
  id: string;
  type: "power_optimized" | "revised";
  label: string;
  filename: string;
  resumeText: string;
  scores?: { overall: number; ats: number; impact: number; clarity: number };
  createdAt: string;
};

export async function saveGeneratedResume(
  userId: string,
  data: {
    type: "power_optimized" | "revised";
    label: string;
    filename: string;
    resumeText: string;
    scores?: { overall: number; ats: number; impact: number; clarity: number };
  },
): Promise<GeneratedResumeRecord> {
  const record: GeneratedResumeRecord = {
    id: `gen_${crypto.randomUUID()}`,
    ...data,
    createdAt: new Date().toISOString(),
  };

  if (isDatabaseReady()) {
    try {
      const existing = await prisma.userPortalState.findUnique({
        where: { userId_key: { userId, key: "resume_generated" } },
      });
      const records: GeneratedResumeRecord[] = existing
        ? (existing.data as { records: GeneratedResumeRecord[] }).records ?? []
        : [];
      records.unshift(record);
      await prisma.userPortalState.upsert({
        where: { userId_key: { userId, key: "resume_generated" } },
        update: { data: { records: records.slice(0, 10) } },
        create: { userId, key: "resume_generated", data: { records: records.slice(0, 10) } },
      });
    } catch {
      // best-effort
    }
  }

  return record;
}

export async function getGeneratedResumeHistory(userId: string): Promise<GeneratedResumeRecord[]> {
  if (!isDatabaseReady()) return [];
  try {
    const state = await prisma.userPortalState.findUnique({
      where: { userId_key: { userId, key: "resume_generated" } },
    });
    if (!state) return [];
    return (state.data as { records: GeneratedResumeRecord[] }).records ?? [];
  } catch {
    return [];
  }
}

// ─── LinkedIn Snapshots ────────────────────────────────────────────────────────

export type LinkedInSnapshotRecord = {
  id: string;
  label: string;
  headline: string;
  overallScore: number;
  targetRole: string;
  stage: string;
  resultJson: string;
  createdAt: string;
};

export async function saveLinkedInSnapshot(
  userId: string,
  data: {
    label: string;
    headline: string;
    overallScore: number;
    targetRole: string;
    stage: string;
    resultJson: string;
  },
): Promise<LinkedInSnapshotRecord> {
  const record: LinkedInSnapshotRecord = {
    id: `li_${crypto.randomUUID()}`,
    ...data,
    createdAt: new Date().toISOString(),
  };

  if (isDatabaseReady()) {
    try {
      const existing = await prisma.userPortalState.findUnique({
        where: { userId_key: { userId, key: "linkedin_snapshots" } },
      });
      const records: LinkedInSnapshotRecord[] = existing
        ? (existing.data as { records: LinkedInSnapshotRecord[] }).records ?? []
        : [];
      records.unshift(record);
      await prisma.userPortalState.upsert({
        where: { userId_key: { userId, key: "linkedin_snapshots" } },
        update: { data: { records: records.slice(0, 10) } },
        create: { userId, key: "linkedin_snapshots", data: { records: records.slice(0, 10) } },
      });
    } catch { /* best-effort */ }
  }

  return record;
}

export async function getLinkedInSnapshots(userId: string): Promise<LinkedInSnapshotRecord[]> {
  if (!isDatabaseReady()) return [];
  try {
    const state = await prisma.userPortalState.findUnique({
      where: { userId_key: { userId, key: "linkedin_snapshots" } },
    });
    if (!state) return [];
    return (state.data as { records: LinkedInSnapshotRecord[] }).records ?? [];
  } catch {
    return [];
  }
}

// ─── Cover Letter Snapshots ────────────────────────────────────────────────────

export type CoverLetterSnapshotRecord = {
  id: string;
  subject: string;
  company: string;
  targetRole: string;
  tone: string;
  stage: string;
  coverLetter: string;
  createdAt: string;
};

export async function saveCoverLetterSnapshot(
  userId: string,
  data: {
    subject: string;
    company: string;
    targetRole: string;
    tone: string;
    stage: string;
    coverLetter: string;
  },
): Promise<CoverLetterSnapshotRecord> {
  const record: CoverLetterSnapshotRecord = {
    id: `cl_${crypto.randomUUID()}`,
    ...data,
    createdAt: new Date().toISOString(),
  };

  if (isDatabaseReady()) {
    try {
      const existing = await prisma.userPortalState.findUnique({
        where: { userId_key: { userId, key: "cover_letter_snapshots" } },
      });
      const records: CoverLetterSnapshotRecord[] = existing
        ? (existing.data as { records: CoverLetterSnapshotRecord[] }).records ?? []
        : [];
      records.unshift(record);
      await prisma.userPortalState.upsert({
        where: { userId_key: { userId, key: "cover_letter_snapshots" } },
        update: { data: { records: records.slice(0, 10) } },
        create: { userId, key: "cover_letter_snapshots", data: { records: records.slice(0, 10) } },
      });
    } catch { /* best-effort */ }
  }

  return record;
}

export async function getCoverLetterSnapshots(userId: string): Promise<CoverLetterSnapshotRecord[]> {
  if (!isDatabaseReady()) return [];
  try {
    const state = await prisma.userPortalState.findUnique({
      where: { userId_key: { userId, key: "cover_letter_snapshots" } },
    });
    if (!state) return [];
    return (state.data as { records: CoverLetterSnapshotRecord[] }).records ?? [];
  } catch {
    return [];
  }
}
