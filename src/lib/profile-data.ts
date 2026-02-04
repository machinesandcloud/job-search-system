type AssessmentInput = {
  targetRoles?: Array<{ name: string }>;
  targetCompanies?: Array<{ name: string; logoUrl?: string | null }>;
  level?: string;
  compTarget?: string;
  locationPreference?: string;
  resumeStatus?: string;
  linkedinStatus?: string;
  portfolioStatus?: boolean;
  interviewReady?: boolean;
  hoursPerWeek?: number;
  totalScore?: number;
  resumeFileUrl?: string | null;
  linkedinFileUrl?: string | null;
};

type ResumeParsed = {
  fullName?: string;
  email?: string;
  phone?: string;
  currentRole?: string | null;
  currentCompany?: string | null;
  yearsExperience?: number | null;
  topSkills?: string[];
  recentProjects?: Array<{
    title: string;
    description?: string;
    impact?: string;
    technologies?: string[];
  }>;
  achievements?: string[];
  certifications?: string[];
  education?: {
    degree?: string;
    school?: string;
    graduationYear?: number | null;
  };
};

type LinkedInParsed = {
  headline?: string;
  about?: string;
  skills?: string[];
  endorsements?: number | null;
  recommendations?: number | null;
  connectionCount?: number | null;
  activityLevel?: "high" | "medium" | "low";
};

type MatchRow = {
  company: string;
  role: string;
  score: number;
  strong: string[];
  missing: string[];
};

const ROLE_SKILLS: Record<string, string[]> = {
  "DevOps Engineer": ["Kubernetes", "AWS", "Terraform", "CI/CD", "Docker", "Python", "Monitoring"],
  "Site Reliability Engineer": ["SLO/SLI", "Incident Response", "Kubernetes", "Observability", "Linux", "Automation"],
  "Platform Engineer": ["Kubernetes", "Infrastructure as Code", "Developer Experience", "Terraform", "CI/CD"],
  "Engineering Manager": ["Leadership", "Delivery", "Hiring", "Roadmaps", "Execution"],
  "Director of Engineering": ["Org Leadership", "Strategy", "Scaling Teams", "Hiring", "Execution"],
  "Senior Backend Engineer": ["APIs", "Databases", "Distributed Systems", "Performance", "Testing"],
  "Senior Frontend Engineer": ["React", "TypeScript", "Performance", "Accessibility", "Design Systems"],
  "Staff Engineer": ["System Design", "Architecture", "Technical Leadership", "Mentoring", "Influence"],
  "Principal Engineer": ["Architecture", "Cross-org Impact", "System Design", "Influence", "Strategy"],
  "Cloud Architect": ["AWS", "Azure", "GCP", "Networking", "Security", "Infrastructure"],
};

const DEFAULT_PROJECTS = [
  {
    title: "Kubernetes Monitoring Dashboard",
    time: "2-3 hours",
    difficulty: "Intermediate",
    skills: ["Observability", "Prometheus", "Grafana", "K8s"],
    steps: [
      "Set up Prometheus + Grafana on a test cluster",
      "Create SLI/SLO dashboards with alerting",
      "Document outcomes and add a GitHub readme",
    ],
  },
  {
    title: "GitOps CI/CD Pipeline",
    time: "2 hours",
    difficulty: "Intermediate",
    skills: ["GitOps", "ArgoCD", "CI/CD", "Automation"],
    steps: [
      "Bootstrap a GitOps repo and pipeline",
      "Deploy a sample service with automated rollbacks",
      "Add a release note workflow",
    ],
  },
];

function estimateYears(level?: string) {
  switch (level) {
    case "Mid-Level":
      return 4;
    case "Senior":
      return 8;
    case "Staff":
      return 10;
    case "Principal":
      return 12;
    case "Manager":
      return 10;
    case "Director":
      return 14;
    default:
      return 8;
  }
}

function getPrimaryRole(input: AssessmentInput) {
  return input.targetRoles?.[0]?.name || "Target role";
}

function matchScore(skills: string[], required: string[], compTarget?: string) {
  const overlap = required.filter((skill) => skills.includes(skill)).length;
  const skillMatch = required.length ? overlap / required.length : 0;
  const compBoost = compTarget?.includes("200") || compTarget?.includes("300") ? 0.1 : 0.0;
  const score = Math.min(1, skillMatch + compBoost);
  return Math.round(score * 100);
}

export function buildProfileData(input: AssessmentInput, resumeParsed?: ResumeParsed | null, linkedinParsed?: LinkedInParsed | null) {
  if (!resumeParsed && !linkedinParsed) return null;
  const primaryRole = resumeParsed?.currentRole || getPrimaryRole(input);
  const yearsExperience =
    resumeParsed?.yearsExperience && resumeParsed.yearsExperience > 0
      ? resumeParsed.yearsExperience
      : estimateYears(input.level);
  const topSkills = resumeParsed?.topSkills?.length
    ? resumeParsed.topSkills
    : linkedinParsed?.skills?.length
    ? linkedinParsed.skills
    : [];

  return {
    fullName: resumeParsed?.fullName,
    email: resumeParsed?.email,
    currentRole: resumeParsed?.currentRole || null,
    currentCompany: resumeParsed?.currentCompany || null,
    yearsExperience,
    yearsSource: resumeParsed?.yearsExperience ? "resume" : "estimated",
    targetRole: primaryRole,
    topSkills,
    recentProjects: resumeParsed?.recentProjects || [],
    achievements: resumeParsed?.achievements || [],
    certifications: resumeParsed?.certifications || [],
    education: resumeParsed?.education || null,
    linkedin: {
      headline: linkedinParsed?.headline || null,
      about: linkedinParsed?.about || null,
      endorsements: linkedinParsed?.endorsements ?? null,
      recommendations: linkedinParsed?.recommendations ?? null,
      connectionCount: linkedinParsed?.connectionCount ?? null,
      activityLevel: linkedinParsed?.activityLevel || null,
    },
  };
}

export function buildResumeHealthData(input: AssessmentInput, resumeParsed?: ResumeParsed | null) {
  const base = input.resumeStatus === "updated_30" ? 0.35 : input.resumeStatus === "needs_work" ? 0.2 : 0.05;
  const linkedin = input.linkedinStatus === "optimized" ? 0.25 : input.linkedinStatus === "basic" ? 0.1 : 0.05;
  const portfolio = input.portfolioStatus ? 0.15 : 0.0;
  const interview = input.interviewReady ? 0.1 : 0.0;
  const score = Math.min(1, base + linkedin + portfolio + interview + 0.15);

  const issues: string[] = [];
  if (!resumeParsed?.topSkills?.length) {
    issues.push("No skills detected from resume yet");
  }
  if (!resumeParsed?.achievements?.length) {
    issues.push("Add quantified achievements to strengthen signal");
  }

  return {
    score: Math.round(score * 100),
    issues,
    quickWins: [
      { label: "Add 2 quantified achievements", impact: "+10% signal strength", time: "10 min" },
      { label: "Update skills section with top tools", impact: "+8% ATS match", time: "5 min" },
    ],
  };
}

export function buildSkillMatchData(input: AssessmentInput, resumeParsed?: ResumeParsed | null): MatchRow[] {
  const primaryRole = getPrimaryRole(input);
  const required = ROLE_SKILLS[primaryRole] || ROLE_SKILLS["DevOps Engineer"];
  const topSkills = resumeParsed?.topSkills || [];
  const companies = input.targetCompanies?.length ? input.targetCompanies.slice(0, 3).map((c) => c.name) : [];

  return companies.map((company) => ({
    company,
    role: primaryRole,
    score: matchScore(topSkills, required, input.compTarget),
    strong: topSkills,
    missing: required.filter((skill) => !topSkills.includes(skill)).slice(0, 3),
  }));
}

export function buildTaskProgress(input: AssessmentInput) {
  const points = input.resumeFileUrl ? 5 : 0;
  return {
    streakDays: 0,
    points,
    level: points > 0 ? "Getting Started" : "New User",
    milestones: {
      applicationsSent: 0,
      connectionRequests: 0,
      interviews: 0,
    },
  };
}

export function buildAchievements(input: AssessmentInput) {
  return [
    { id: "resume-uploaded", label: "Resume Uploaded", unlocked: Boolean(input.resumeFileUrl) },
    { id: "linkedin-added", label: "LinkedIn Added", unlocked: Boolean(input.linkedinFileUrl) },
    { id: "targets", label: "5 Targets Selected", unlocked: (input.targetCompanies?.length || 0) >= 5 },
    { id: "portfolio", label: "Portfolio Ready", unlocked: Boolean(input.portfolioStatus) },
    { id: "interview-ready", label: "Interview Ready", unlocked: Boolean(input.interviewReady) },
  ];
}

export function buildApplications(_input: AssessmentInput) {
  return [];
}

export function buildProofProjects() {
  return DEFAULT_PROJECTS;
}

export type { ResumeParsed, LinkedInParsed };
