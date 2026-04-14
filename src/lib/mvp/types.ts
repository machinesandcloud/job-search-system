export type CoachingMode =
  | "resume"
  | "linkedin"
  | "interview"
  | "career"
  | "confidence"
  | "recap";

export type SessionStatus = "ready" | "live" | "reviewing" | "complete";

export type UsageKey = "resume_review" | "linkedin_review" | "mock_interview" | "voice_minutes";

export type UsageLimit = {
  key: UsageKey;
  label: string;
  used: number;
  limit: number;
  unit: string;
};

export type UserProfile = {
  name: string;
  email: string;
  currentRole: string;
  targetRole: string;
  experienceLevel: string;
  geography: string;
  goals: string[];
  painPoints: string[];
  onboardingComplete: boolean;
};

export type DocumentRecord = {
  id: string;
  title: string;
  type: "resume" | "linkedin" | "notes";
  updatedAt: string;
  status: "indexed" | "reviewing" | "ready";
};

export type ActionPlanItem = {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  dueLabel: string;
  completed: boolean;
};

export type SessionRecord = {
  id: string;
  title: string;
  mode: CoachingMode;
  status: SessionStatus;
  startedAt: string;
  summary: string;
  transcriptTurns: number;
};

export type ReviewOutput = {
  overallScore: number;
  dimensionScores: Array<{ label: string; score: number }>;
  strengths: string[];
  issues: string[];
  missingSignals: string[];
  rewrittenBullets: string[];
  tailoringSuggestions: string[];
};

export type DashboardPayload = {
  user: UserProfile;
  usage: UsageLimit[];
  documents: DocumentRecord[];
  sessions: SessionRecord[];
  actionPlan: ActionPlanItem[];
};
