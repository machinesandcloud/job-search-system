type AssessmentInput = {
  targetRoles?: Array<{ name: string }>;
  targetCompanies?: Array<{ name: string; logoUrl?: string }>;
  level?: string;
  compTarget?: string;
  locationPreference?: string;
  resumeStatus?: string;
  linkedinStatus?: string;
  portfolioStatus?: boolean;
  interviewReady?: boolean;
  hoursPerWeek?: number;
  totalScore?: number;
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
  return input.targetRoles?.[0]?.name || "Senior DevOps Engineer";
}

function matchScore(skills: string[], required: string[], compTarget?: string) {
  const overlap = required.filter((skill) => skills.includes(skill)).length;
  const skillMatch = required.length ? overlap / required.length : 0.6;
  const compBoost = compTarget?.includes("200") || compTarget?.includes("300") ? 0.1 : 0.0;
  const score = Math.min(1, skillMatch + compBoost);
  return Math.round(score * 100);
}

export function buildProfileData(input: AssessmentInput) {
  const primaryRole = getPrimaryRole(input);
  const yearsExperience = estimateYears(input.level);
  const baseSkills = ROLE_SKILLS[primaryRole] || ROLE_SKILLS["DevOps Engineer"];
  const topSkills = baseSkills.slice(0, 5);

  return {
    currentRole: primaryRole,
    currentCompany: "Current company",
    yearsExperience,
    topSkills,
    recentProjects: [
      {
        title: "Migrated monolith to microservices",
        impact: "35% deployment speed increase",
        technologies: ["Docker", "Kubernetes", "Terraform"],
      },
    ],
    achievements: [
      "99.9% uptime across 500+ servers",
      "Reduced deployment time by 40%",
      "Built CI/CD automation for multi-team platform",
    ],
    certifications: ["AWS Solutions Architect", "CKA"],
    education: {
      degree: "BS Computer Science",
      school: "University of Wisconsin",
    },
    linkedin: {
      headline: `${primaryRole} | Cloud Infrastructure`,
      about: `Senior technical leader specializing in ${topSkills.join(", ")}.`,
      endorsements: 40,
      recommendations: 6,
      activityLevel: "Moderate",
      connectionCount: 850,
      completeness: 78,
    },
  };
}

export function buildResumeHealthData(input: AssessmentInput) {
  const base = input.resumeStatus === "updated_30" ? 0.35 : input.resumeStatus === "needs_work" ? 0.2 : 0.05;
  const linkedin = input.linkedinStatus === "optimized" ? 0.25 : input.linkedinStatus === "basic" ? 0.1 : 0.05;
  const portfolio = input.portfolioStatus ? 0.15 : 0.0;
  const interview = input.interviewReady ? 0.1 : 0.0;
  const score = Math.min(1, base + linkedin + portfolio + interview + 0.15);

  return {
    score: Math.round(score * 100),
    issues: [
      "Missing keywords: Observability, SLO/SLI",
      "Add leadership examples for Staff-level roles",
      "Skills section could list 5 more tools",
    ],
    quickWins: [
      { label: "Add Observability to skills section", impact: "+8% ATS match", time: "2 min" },
      { label: "Rewrite summary for Staff roles", impact: "+20% recruiter interest", time: "10 min" },
    ],
  };
}

export function buildSkillMatchData(input: AssessmentInput): MatchRow[] {
  const primaryRole = getPrimaryRole(input);
  const baseSkills = ROLE_SKILLS[primaryRole] || ROLE_SKILLS["DevOps Engineer"];
  const topSkills = baseSkills.slice(0, 5);
  const companies = input.targetCompanies?.length
    ? input.targetCompanies.slice(0, 3).map((c) => c.name)
    : ["Stripe", "Google", "Datadog"];

  return companies.map((company) => ({
    company,
    role: primaryRole,
    score: matchScore(topSkills, baseSkills, input.compTarget),
    strong: topSkills,
    missing: baseSkills.filter((skill) => !topSkills.includes(skill)).slice(0, 3),
  }));
}

export function buildTaskProgress(input: AssessmentInput) {
  return {
    streakDays: 3,
    points: 42,
    level: "Active Searcher",
    milestones: {
      applicationsSent: 3,
      connectionRequests: 7,
      interviews: 0,
    },
  };
}

export function buildAchievements(_input: AssessmentInput) {
  return [
    { id: "resume", label: "Resume Master", unlocked: true },
    { id: "week1", label: "Week 1 Done", unlocked: false },
    { id: "apps", label: "5 Apps Sent", unlocked: true },
    { id: "interview", label: "Interview Ready", unlocked: false },
    { id: "offer", label: "Offer Getter", unlocked: false },
  ];
}

export function buildApplications(input: AssessmentInput) {
  const companies = input.targetCompanies?.length ? input.targetCompanies.slice(0, 2) : [{ name: "Stripe" }, { name: "Google" }];
  const primaryRole = getPrimaryRole(input);
  return companies.map((company, index) => ({
    id: `app-${index + 1}`,
    company: company.name,
    role: primaryRole,
    status: index === 0 ? "Interview" : "Applied",
    appliedAt: "Jan 20",
    lastUpdate: index === 0 ? "Jan 28" : "Jan 22",
    nextStep: index === 0 ? "Onsite scheduled Feb 5" : "Follow up in 6 days",
    checklist: [
      "Review system design patterns",
      "Prepare 3 STAR stories",
      "Research company architecture",
    ],
  }));
}

export function buildProofProjects() {
  return DEFAULT_PROJECTS;
}
