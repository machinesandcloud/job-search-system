import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { dashboardData, linkedinReview, resumeReview } from "./data";
import type {
  ActionPlanItem,
  CoachingMode,
  DashboardPayload,
  DocumentRecord,
  ReviewOutput,
  SessionRecord,
  UserProfile,
  UsageLimit,
} from "./types";

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

type StoredReview = {
  id: string;
  userId: string;
  documentId?: string;
  type: "resume" | "linkedin";
  output: ReviewOutput;
  updatedAt: string;
};

type StoredSession = SessionRecord & {
  userId: string;
  notes: string[];
  transcript: Array<{ time: string; role: "coach" | "user"; message: string }>;
};

type MvpStore = {
  users: StoredUser[];
  documents: StoredDocument[];
  reviews: StoredReview[];
  sessions: StoredSession[];
};

// On Vercel / serverless: cwd() is read-only. Use /tmp instead.
const DATA_DIR = process.env.VERCEL || process.env.NETLIFY
  ? "/tmp"
  : path.join(process.cwd(), ".data");
const storePath = path.join(DATA_DIR, "mvp-store.json");

function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

function cloneUsage() {
  return dashboardData.usage.map((item) => ({ ...item }));
}

function cloneActionPlan() {
  return dashboardData.actionPlan.map((item) => ({ ...item }));
}

function cloneProfile(overrides?: Partial<UserProfile>): UserProfile {
  return {
    ...dashboardData.user,
    ...overrides,
    goals: overrides?.goals || [...dashboardData.user.goals],
    painPoints: overrides?.painPoints || [...dashboardData.user.painPoints],
  };
}

function createSeedStore(): MvpStore {
  const demoUserId = "user_demo";

  return {
    users: [
      {
        id: demoUserId,
        email: dashboardData.user.email,
        passwordHash: hashPassword("demo12345"),
        profile: cloneProfile(),
        usage: cloneUsage(),
        actionPlan: cloneActionPlan(),
      },
    ],
    documents: dashboardData.documents.map((document) => ({
      ...document,
      userId: demoUserId,
      mimeType: document.type === "linkedin"
        ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        : "application/pdf",
      sizeBytes: 120_000,
    })),
    reviews: [
      {
        id: "review_resume_seed",
        userId: demoUserId,
        documentId: "doc_resume",
        type: "resume",
        output: resumeReview,
        updatedAt: new Date().toISOString(),
      },
      {
        id: "review_linkedin_seed",
        userId: demoUserId,
        documentId: "doc_linkedin",
        type: "linkedin",
        output: linkedinReview,
        updatedAt: new Date().toISOString(),
      },
    ],
    sessions: dashboardData.sessions.map((session) => ({
      ...session,
      userId: demoUserId,
      notes: [
        "Current task: resume critique mode",
        "Target role: Technical Program Manager",
        "Fallback state available: audio-only",
      ],
      transcript: [
        {
          time: "00:00",
          role: "coach",
          message: "What outcome matters most for this session: sharper stories, a stronger resume, or mock interview practice?",
        },
        {
          time: "00:08",
          role: "user",
          message: "I need to reposition for TPM roles and stop sounding too vague.",
        },
      ],
    })),
  };
}

async function ensureStoreFile() {
  await mkdir(path.dirname(storePath), { recursive: true });
  try {
    await readFile(storePath, "utf8");
  } catch {
    await writeFile(storePath, JSON.stringify(createSeedStore(), null, 2), "utf8");
  }
}

async function readStore() {
  try {
    await ensureStoreFile();
    const contents = await readFile(storePath, "utf8");
    return JSON.parse(contents) as MvpStore;
  } catch {
    // Filesystem unavailable (e.g. read-only in some edge runtimes) —
    // return seed store in-memory so the demo user always exists.
    return createSeedStore();
  }
}

async function writeStore(store: MvpStore) {
  try {
    await ensureStoreFile();
    await writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
  } catch {
    // Best-effort — silently ignore write failures on read-only filesystems.
  }
}

function buildDashboard(user: StoredUser, store: MvpStore): DashboardPayload {
  return {
    user: user.profile,
    usage: user.usage,
    actionPlan: user.actionPlan,
    documents: store.documents.filter((document) => document.userId === user.id),
    sessions: store.sessions.filter((session) => session.userId === user.id),
  };
}

function createReviewFromTemplate(type: "resume" | "linkedin", targetRole?: string): ReviewOutput {
  const base = type === "resume" ? resumeReview : linkedinReview;
  const roleSuffix = targetRole ? ` for ${targetRole}` : "";

  return {
    ...base,
    strengths: base.strengths.map((item, index) =>
      index === 0 ? `${item}${roleSuffix}` : item,
    ),
    tailoringSuggestions: targetRole
      ? [`Tailor the positioning explicitly for ${targetRole}.`, ...base.tailoringSuggestions]
      : [...base.tailoringSuggestions],
  };
}

export async function getUserById(userId: string) {
  const store = await readStore();
  return store.users.find((user) => user.id === userId) || null;
}

export async function getUserByEmail(email: string) {
  const store = await readStore();
  return store.users.find((user) => user.email === email.toLowerCase()) || null;
}

export async function createUser(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const store = await readStore();
  const email = input.email.trim().toLowerCase();

  if (store.users.some((user) => user.email === email)) {
    throw new Error("Account already exists.");
  }

  const user: StoredUser = {
    id: `user_${crypto.randomUUID()}`,
    email,
    passwordHash: hashPassword(input.password),
    profile: cloneProfile({
      name: `${input.firstName} ${input.lastName}`.trim(),
      email,
      currentRole: "",
      targetRole: "",
      experienceLevel: "",
      geography: "",
      goals: [],
      painPoints: [],
      onboardingComplete: false,
    }),
    usage: cloneUsage(),
    actionPlan: cloneActionPlan(),
  };

  store.users.unshift(user);
  await writeStore(store);
  return user;
}

export async function validateUser(email: string, password: string) {
  // Always allow the demo account — works even when the store file
  // doesn't exist yet (fresh Vercel deploy, first cold start, etc.)
  if (
    email.toLowerCase() === "steve@askiatech.com" &&
    password === "demo12345"
  ) {
    const store = await readStore();
    let demo = store.users.find((u) => u.id === "user_demo");
    if (!demo) {
      // Seed user is missing — recreate and persist
      const seed = createSeedStore();
      await writeStore(seed);
      demo = seed.users[0];
    }
    return demo;
  }

  const user = await getUserByEmail(email);
  if (!user) return null;
  return user.passwordHash === hashPassword(password) ? user : null;
}

export async function getDashboardForUser(userId: string) {
  const store = await readStore();
  const user = store.users.find((entry) => entry.id === userId);
  if (!user) return null;
  return buildDashboard(user, store);
}

export async function updateProfile(userId: string, input: Partial<UserProfile>) {
  const store = await readStore();
  const user = store.users.find((entry) => entry.id === userId);
  if (!user) return null;

  user.profile = {
    ...user.profile,
    ...input,
    goals: input.goals || user.profile.goals,
    painPoints: input.painPoints || user.profile.painPoints,
  };
  user.profile.onboardingComplete = true;

  await writeStore(store);
  return user.profile;
}

export async function listDocumentsForUser(userId: string) {
  const store = await readStore();
  return store.documents.filter((document) => document.userId === userId);
}

export async function createDocumentForUser(
  userId: string,
  input: { title: string; type: "resume" | "linkedin" | "notes"; mimeType?: string; sizeBytes?: number },
) {
  const store = await readStore();
  const document: StoredDocument = {
    id: `doc_${crypto.randomUUID()}`,
    userId,
    title: input.title,
    type: input.type,
    updatedAt: "Just now",
    status: "indexed",
    mimeType: input.mimeType || "application/octet-stream",
    sizeBytes: input.sizeBytes || 0,
  };

  store.documents.unshift(document);
  await writeStore(store);
  return document;
}

export async function createSessionForUser(userId: string, mode: CoachingMode, title?: string) {
  const store = await readStore();
  const session: StoredSession = {
    id: `sess_${crypto.randomUUID()}`,
    userId,
    title: title || `${mode[0].toUpperCase()}${mode.slice(1)} coaching session`,
    mode,
    status: "live",
    startedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    summary: "Live session started. Transcript and recap will update as events arrive.",
    transcriptTurns: 0,
    notes: [
      `Current task: ${mode} mode`,
      "Captions available",
      "Avatar fallback available: audio-only",
    ],
    transcript: [],
  };

  store.sessions.unshift(session);
  await writeStore(store);
  return session;
}

export async function listSessionsForUser(userId: string) {
  const store = await readStore();
  return store.sessions.filter((session) => session.userId === userId);
}

export async function getSessionForUser(userId: string, sessionId: string) {
  const store = await readStore();
  return store.sessions.find((session) => session.userId === userId && session.id === sessionId) || null;
}

export async function appendSessionEvent(
  userId: string,
  sessionId: string,
  input: { role?: "coach" | "user"; message?: string },
) {
  const store = await readStore();
  const session = store.sessions.find((entry) => entry.userId === userId && entry.id === sessionId);
  if (!session) return null;

  if (input.message) {
    session.transcript.push({
      time: new Date().toLocaleTimeString("en-US", { minute: "2-digit", second: "2-digit" }),
      role: input.role || "user",
      message: input.message,
    });
    session.transcriptTurns += 1;
    session.summary = "Session updated with latest transcript and task context.";
  }

  await writeStore(store);
  return session;
}

export async function completeSessionForUser(userId: string, sessionId: string) {
  const store = await readStore();
  const session = store.sessions.find((entry) => entry.userId === userId && entry.id === sessionId);
  if (!session) return null;

  session.status = "complete";
  session.summary = "Session recap generated with next actions and updated coaching memory.";
  await writeStore(store);
  return session;
}

export async function createReviewForUser(
  userId: string,
  input: { type: "resume" | "linkedin"; documentId?: string; targetRole?: string },
) {
  const store = await readStore();
  const review: StoredReview = {
    id: `review_${crypto.randomUUID()}`,
    userId,
    documentId: input.documentId,
    type: input.type,
    output: createReviewFromTemplate(input.type, input.targetRole),
    updatedAt: new Date().toISOString(),
  };

  const existingIndex = store.reviews.findIndex(
    (entry) =>
      entry.userId === userId &&
      entry.type === input.type &&
      entry.documentId === input.documentId,
  );

  if (existingIndex >= 0) {
    store.reviews[existingIndex] = review;
  } else {
    store.reviews.unshift(review);
  }

  const usageKey = input.type === "resume" ? "resume_review" : "linkedin_review";
  const user = store.users.find((entry) => entry.id === userId);
  if (user) {
    user.usage = user.usage.map((item) =>
      item.key === usageKey ? { ...item, used: Math.min(item.limit, item.used + 1) } : item,
    );
  }

  await writeStore(store);
  return review;
}

export async function getLatestReviewForUser(userId: string, type: "resume" | "linkedin") {
  const store = await readStore();
  return store.reviews.find((entry) => entry.userId === userId && entry.type === type) || null;
}
