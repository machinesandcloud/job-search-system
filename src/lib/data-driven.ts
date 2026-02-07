import { groqChatJSON } from "@/lib/llm";
import { gatherMarketIntel } from "@/lib/market-intel";

type ParsedData = {
  resumeParsedData?: any;
  linkedinParsedData?: any;
  resumeRawText?: string | null;
  linkedinRawText?: string | null;
};

type SkillItem = {
  name: string;
  foundIn: "resume" | "linkedin" | "both" | "job" | "market";
  requiredLevel?: "critical" | "preferred" | "nice-to-have";
  whereInJobDescription?: string;
  exampleUsage?: string;
};

type SkillsAnalysis = {
  overallScore: number;
  matchPercentage: number;
  yourSkills: SkillItem[];
  requiredSkills: SkillItem[];
  matchingSkills: SkillItem[];
  missingCriticalSkills: SkillItem[];
  missingNiceToHaveSkills: SkillItem[];
};

type ReadinessScore = {
  overall: number;
  breakdown: {
    resume: number;
    linkedin: number;
    skillsMatch: number;
    network: number;
    experience: number;
  };
  gaps: string[];
  strengths: string[];
};

const METRIC_REGEX = /\d+%|\$\d+|(?:increased|decreased|improved|reduced|saved|grew)\b/i;

const COMMON_SKILLS = [
  "python",
  "java",
  "javascript",
  "typescript",
  "react",
  "node.js",
  "aws",
  "azure",
  "gcp",
  "docker",
  "kubernetes",
  "terraform",
  "sql",
  "mongodb",
  "postgresql",
  "redis",
  "devops",
  "ci/cd",
  "jenkins",
  "github actions",
  "linux",
  "bash",
  "networking",
  "observability",
];

function normalizeSkill(value: string) {
  return value.trim().toLowerCase();
}

function toSecondPerson(text: string) {
  return text
    .replace(/\bthe candidate\b/gi, "you")
    .replace(/\bthe applicant\b/gi, "you")
    .replace(/\bcandidate's\b/gi, "your")
    .replace(/\bapplicant's\b/gi, "your");
}

export function normalizeSecondPersonDeep<T>(input: T): T {
  if (typeof input === "string") {
    return toSecondPerson(input) as T;
  }
  if (Array.isArray(input)) {
    return input.map((item) => normalizeSecondPersonDeep(item)) as T;
  }
  if (input && typeof input === "object") {
    const copy: Record<string, unknown> = {};
    Object.entries(input as Record<string, unknown>).forEach(([key, value]) => {
      copy[key] = normalizeSecondPersonDeep(value);
    });
    return copy as T;
  }
  return input;
}

export function getLinkedinData(answers: any, parsed?: ParsedData) {
  const manual = answers?.linkedinManualData || {};
  const parsedLinkedin = parsed?.linkedinParsedData || {};
  const skills = [
    ...(manual?.skills || []),
    ...(parsedLinkedin?.skills || parsedLinkedin?.topSkills || []),
  ].filter(Boolean);
  return {
    headline: manual?.headline || parsedLinkedin?.headline || parsedLinkedin?.profileBasics?.headline || "",
    about: manual?.about || parsedLinkedin?.about || "",
    currentRole: manual?.currentRole || parsedLinkedin?.currentRole || parsedLinkedin?.experience?.[0]?.title || "",
    currentCompany: manual?.currentCompany || parsedLinkedin?.currentCompany || parsedLinkedin?.experience?.[0]?.company || "",
    skills,
    connections: parsedLinkedin?.connectionCount || 0,
  };
}

export function extractResumeSkills(resumeParsed: any): SkillItem[] {
  const skills: SkillItem[] = [];
  const directSkills = resumeParsed?.skills || resumeParsed?.topSkills || resumeParsed?.raw?.skills || [];
  directSkills.forEach((skill: any) => {
    const name = typeof skill === "string" ? skill : skill?.name;
    if (!name) return;
    skills.push({ name, foundIn: "resume" });
  });

  const experience = resumeParsed?.experience || resumeParsed?.raw?.experience || [];
  experience.forEach((exp: any) => {
    const desc = exp?.description || exp?.summary || "";
    COMMON_SKILLS.forEach((keyword) => {
      if (desc.toLowerCase().includes(keyword) && !skills.find((s) => normalizeSkill(s.name) === keyword)) {
        skills.push({
          name: keyword,
          foundIn: "resume",
          exampleUsage: desc,
        });
      }
    });
  });
  return skills;
}

async function extractJobDescriptionSkills(jobDescription: string): Promise<SkillItem[]> {
  const prompt = `
Analyze this job description and extract all technical skills and tools.
Classify each as "critical" (required/must have) or "preferred".
Return JSON only:
{ "skills": [ { "name": "", "requiredLevel": "critical", "whereInJobDescription": "" } ] }

Job description:
${jobDescription}
`;
  const parsed = await groqChatJSON(
    "You extract structured skills from job descriptions. Return valid JSON only.",
    prompt
  );
  if (!parsed?.skills) return [];
  return parsed.skills
    .map((skill: any) => ({
      name: skill.name,
      requiredLevel: skill.requiredLevel === "preferred" ? "preferred" : "critical",
      whereInJobDescription: skill.whereInJobDescription || "",
      foundIn: "job",
    }))
    .filter((skill: SkillItem) => skill.name);
}

export async function analyzeSkillsMatch(input: {
  resumeParsed: any;
  linkedinData: ReturnType<typeof getLinkedinData>;
  jobDescription: string;
  marketIntel: any;
}): Promise<SkillsAnalysis> {
  const resumeSkills: SkillItem[] = extractResumeSkills(input.resumeParsed);
  const linkedinSkills: SkillItem[] = (input.linkedinData.skills || []).map((name: string) => ({
    name,
    foundIn: resumeSkills.find((s) => normalizeSkill(s.name) === normalizeSkill(name)) ? "both" : "linkedin",
  }));
  const yourSkills: SkillItem[] = [...resumeSkills, ...linkedinSkills].filter(Boolean);

  const jdSkills = await extractJobDescriptionSkills(input.jobDescription);
  const marketSkills =
    input.marketIntel?.roleKeywords?.map((item: any) => ({
      name: item.keyword,
      requiredLevel: "preferred",
      foundIn: "market",
    })) || [];

  const requiredSkills: SkillItem[] = [...jdSkills, ...marketSkills].filter((s) => s.name);

  const matchingSkills: SkillItem[] = [];
  const missingCriticalSkills: SkillItem[] = [];
  const missingNiceToHaveSkills: SkillItem[] = [];

  requiredSkills.forEach((required) => {
    const match = yourSkills.find((skill) => {
      const a = normalizeSkill(skill.name);
      const b = normalizeSkill(required.name);
      return a === b || a.includes(b) || b.includes(a);
    });
    if (match) {
      matchingSkills.push({
        ...(match as SkillItem),
        requiredLevel: required.requiredLevel || "preferred",
      });
    } else if (required.requiredLevel === "critical") {
      missingCriticalSkills.push(required);
    } else {
      missingNiceToHaveSkills.push(required);
    }
  });

  const matchPercentage = requiredSkills.length
    ? Math.round((matchingSkills.length / requiredSkills.length) * 100)
    : 0;

  return {
    overallScore: matchPercentage,
    matchPercentage,
    yourSkills,
    requiredSkills,
    matchingSkills,
    missingCriticalSkills,
    missingNiceToHaveSkills,
  };
}

function calculateResumeScore(assessment: any): number {
  const resume = assessment.resumeParsedData || {};
  let score = 0;
  if (resume?.email || resume?.contact?.email || resume?.personalInfo?.email) score += 10;
  if (resume?.summary || resume?.objective) score += 10;
  if ((resume?.experience || resume?.raw?.experience || []).length) score += 20;
  const hasMetrics = (resume?.experience || resume?.raw?.experience || []).some((exp: any) =>
    METRIC_REGEX.test(exp?.description || exp?.summary || "")
  );
  if (hasMetrics) score += 20;
  const skills = resume?.skills || resume?.topSkills || resume?.raw?.skills || [];
  if (skills.length) score += 15;
  const education = resume?.education || resume?.raw?.education || [];
  if (education.length) score += 10;
  const formattingIssues = assessment.resumeAnalysis?.issues?.filter(
    (i: any) => i.category === "formatting" || i.category === "grammar"
  ).length || 0;
  score += Math.max(0, 15 - formattingIssues * 5);
  return Math.min(100, score);
}

function calculateLinkedinScore(assessment: any): number {
  const linkedin = getLinkedinData(assessment, {
    linkedinParsedData: assessment.linkedinParsedData,
  } as ParsedData);
  let score = 0;
  const targetRole = assessment.targetRoles?.[0]?.name || "";
  if (linkedin.headline && linkedin.headline.length > 20) score += 20;
  if (targetRole && linkedin.headline.toLowerCase().includes(targetRole.toLowerCase().split(" ")[0])) score += 10;
  if (linkedin.about && linkedin.about.length > 100) score += 20;
  if (linkedin.about && linkedin.about.length > 500) score += 10;
  if (linkedin.currentRole && linkedin.currentCompany) score += 15;
  if (linkedin.skills && linkedin.skills.length >= 5) score += 15;
  if (linkedin.skills && linkedin.skills.length >= 10) score += 10;
  return Math.min(100, score);
}

function calculateNetworkScore(assessment: any): number {
  const connections = getLinkedinData(assessment, {
    linkedinParsedData: assessment.linkedinParsedData,
  } as ParsedData).connections || 0;
  if (connections >= 500) return 100;
  if (connections >= 300) return 80;
  if (connections >= 100) return 60;
  if (connections >= 50) return 40;
  if (connections >= 10) return 20;
  return 0;
}

function calculateExperienceScore(assessment: any): number {
  const resume = assessment.resumeParsedData || {};
  const years =
    resume?.totalYearsExperience ||
    resume?.yearsExperience ||
    resume?.totalExperience?.years ||
    0;
  const expectedYears: Record<string, number> = {
    entry: 0,
    junior: 1,
    mid: 3,
    senior: 5,
    staff: 8,
    principal: 10,
    lead: 7,
    manager: 6,
    director: 8,
  };
  const target = expectedYears[(assessment.level || "mid").toLowerCase()] ?? 3;
  if (years >= target) return 100;
  return Math.round((years / target) * 100);
}

export function calculateReadinessScore(assessment: any, skills: SkillsAnalysis): ReadinessScore {
  const resumeScore = calculateResumeScore(assessment);
  const linkedinScore = calculateLinkedinScore(assessment);
  const skillsScore = skills.overallScore;
  const networkScore = calculateNetworkScore(assessment);
  const experienceScore = calculateExperienceScore(assessment);

  const overall = Math.round(
    resumeScore * 0.3 +
      linkedinScore * 0.25 +
      skillsScore * 0.25 +
      networkScore * 0.1 +
      experienceScore * 0.1
  );

  const gaps: string[] = [];
  const strengths: string[] = [];
  if (skillsScore < 60) gaps.push("Missing critical skills for your target role");
  if (resumeScore < 70) gaps.push("Resume needs ATS-ready optimization");
  if (linkedinScore < 60) gaps.push("LinkedIn profile is incomplete or not optimized");
  if (experienceScore >= 90) strengths.push("Strong experience level for target role");
  if (skillsScore >= 70) strengths.push("Skills alignment with job requirements");
  if (resumeScore >= 80) strengths.push("Resume is structured with strong signal");

  return {
    overall,
    breakdown: {
      resume: resumeScore,
      linkedin: linkedinScore,
      skillsMatch: skillsScore,
      network: networkScore,
      experience: experienceScore,
    },
    gaps,
    strengths,
  };
}

export function generateExecutiveSummary(assessment: any, scores: ReadinessScore, skills: SkillsAnalysis) {
  const targetRole = assessment.targetRoles?.[0]?.name || "your target role";
  const targetCompany = assessment.targetCompanies?.[0]?.name || "top companies";
  let coachSummary = "";
  if (scores.overall >= 80) {
    coachSummary = `You're well-positioned for ${targetRole} roles at ${targetCompany}. Your profile shows strong alignment with job requirements.`;
  } else if (scores.overall >= 60) {
    coachSummary = `You have a solid foundation for ${targetRole} roles, but you need to tighten skills alignment and positioning to be competitive at ${targetCompany}.`;
  } else {
    coachSummary = `You need focused improvements to compete for ${targetRole} roles. Start with critical skills, resume optimization, and LinkedIn signal.`;
  }

  const evidenceHighlights = [
    ...(skills.missingCriticalSkills.slice(0, 2).map((s) => `Missing critical skill: ${s.name}`) || []),
    ...(skills.matchingSkills.slice(0, 2).map((s) => `Matching skill: ${s.name}`) || []),
  ];

  return {
    coachSummary,
    currentState: scores.gaps[0] || "",
    targetState: `80%+ skills match for ${targetRole} roles`,
    primaryChallenge: scores.gaps[0] || "",
    estimatedTimeline: assessment.timeline || "4-6 weeks",
    confidenceLevel: scores.overall >= 70 ? "High" : "Moderate",
    evidenceHighlights,
  };
}

export function generateDataDrivenInsights(assessment: any, scores: ReadinessScore, skills: SkillsAnalysis) {
  const targetRole = assessment.targetRoles?.[0]?.name || "your target role";
  const targetCompany = assessment.targetCompanies?.[0]?.name || "your target company";

  const missing = skills.missingCriticalSkills.slice(0, 3);
  const primaryGap = missing.length
    ? `You're missing ${missing.length} critical skills`
    : "Your profile is close, but needs stronger positioning";
  const primaryGapExplanation = missing.length
    ? `The job description explicitly requires ${missing.map((s) => `"${s.name}"`).join(", ")} but these don't appear in your resume or LinkedIn.`
    : `Your profile needs sharper positioning for ${targetRole} roles.`;

  const primaryGapEvidence = missing.length
    ? [
        `Job description mentions: "${missing[0]?.whereInJobDescription || missing[0]?.name}"`,
        "Your resume: missing from Skills section",
        "Your LinkedIn: not listed in skills",
      ]
    : [];

  const quickWin =
    scores.breakdown.linkedin < 60
      ? `Update your LinkedIn headline with "${targetRole}" and top skills`
      : `Add missing keywords from the job description to your resume`;
  const quickWinReasoning =
    scores.breakdown.linkedin < 60
      ? "Recruiters search by title + skill keywords. A headline change immediately improves discoverability."
      : "ATS systems weight keyword coverage heavily for screening.";
  const quickWinEvidence = missing.length
    ? [`Missing: ${missing.map((s) => s.name).join(", ")}`]
    : [];

  const strengthsToLeverage = skills.matchingSkills.length
    ? [
        {
          strength: `${skills.matchingSkills[0].name} experience`,
          evidence: `Found in your ${skills.matchingSkills[0].foundIn}`,
          howToUse: `Lead with ${skills.matchingSkills[0].name} in your headline and first resume bullets.`,
        },
      ]
    : [];

  return {
    primaryGap,
    primaryGapExplanation,
    primaryGapEvidence,
    secondaryGap: "",
    secondaryGapExplanation: "",
    secondaryGapEvidence: [],
    quickWin,
    quickWinReasoning,
    quickWinEvidence,
    strengthsToLeverage,
    criticalActions: [],
    companyFitAnalysis: "",
    routeReasoning: "",
    realityCheck: `Competition for ${targetRole} roles is high. Candidates with 80%+ skills match and ATS-ready resumes move fastest.`,
  };
}

export function buildResumeAnalysis(assessment: any, skills: SkillsAnalysis) {
  const overallScore = calculateResumeScore(assessment);
  const missingKeywords = skills.missingCriticalSkills.map((skill) => ({
    keyword: skill.name,
    importance: "high",
    currentlyPresent: false,
    whereToAdd: "Skills section + relevant experience bullet",
    howToAdd: `Add "${skill.name}" to Skills and one experience bullet with context.`,
    reason: skill.whereInJobDescription || "Required by the job description.",
  }));

  const issues = missingKeywords.slice(0, 4).map((item, index) => ({
    id: `missing-keyword-${index}`,
    category: "Keywords",
    severity: "HIGH",
    issue: `Missing ${item.keyword}`,
    location: "Skills section",
    currentText: "",
    suggestedFix: item.howToAdd,
    reasoning: item.reason,
    impactScore: 90,
    timeToFix: "15 min",
    stepByStepFix: [
      "Open your resume",
      "Find the Skills section",
      `Add "${item.keyword}" with related tools`,
      "Save as updated resume",
    ],
  }));

  return {
    overallScore,
    atsScore: Math.round(overallScore * 0.9),
    issues,
    missingKeywords,
    weakAchievements: [],
    formatIssues: [],
    strengthsToEmphasize: [],
    quickWins: [],
  };
}

export function buildLinkedinAnalysis(assessment: any, skills: SkillsAnalysis) {
  const overallScore = calculateLinkedinScore(assessment);
  const targetRole = assessment.targetRoles?.[0]?.name || "your target role";
  const topSkills = skills.matchingSkills.slice(0, 3).map((s) => s.name).join(" | ");
  const headline = `${targetRole} | ${topSkills}`;

  return {
    overallScore,
    headline: {
      current: getLinkedinData(assessment).headline || "",
      score: overallScore,
      issues: [],
      optimized: headline,
      keywords: skills.matchingSkills.slice(0, 5).map((s) => s.name),
      reasoning: "Recruiters search by title + skills.",
      alternatives: [headline],
    },
    about: {
      current: getLinkedinData(assessment).about || "",
      score: overallScore,
      issues: [],
      optimized: "",
      keywords: skills.matchingSkills.slice(0, 5).map((s) => s.name),
      reasoning: "",
      alternatives: [],
    },
    experienceOptimizations: [],
    quickWins: [],
    strengths: [],
    improvementAreas: [],
  };
}

export function buildWeek1Plan(assessment: any, skills: SkillsAnalysis) {
  const missing = skills.missingCriticalSkills.slice(0, 5);
  const tasks = missing.map((skill, index) => ({
    id: `skill-${skill.name}-${index}`,
    day: Math.min(7, index + 1),
    title: `Add ${skill.name} to resume + LinkedIn`,
    category: "Resume Optimization",
    priority: "CRITICAL",
    timeEstimate: "2 hours",
    context: {
      whyNow: `The job description explicitly requires ${skill.name}.`,
    },
    currentState: {
      issue: `Missing ${skill.name} in your resume and LinkedIn`,
      consequence: "ATS filters may reject your application.",
    },
    beforeAfter: {
      before: "Resume does not mention the required skill.",
      after: `Resume includes ${skill.name} in Skills and at least one impact bullet.`,
    },
    exactSteps: [
      "Open your resume",
      "Add the skill to your Skills section",
      "Find one relevant experience bullet",
      `Insert ${skill.name} with context`,
      "Update LinkedIn Skills list",
    ],
    template: {
      example: `Implemented ${skill.name} to improve deployment reliability.`,
    },
    validation: {
      checkpoints: [
        `☐ ${skill.name} appears in Skills section`,
        `☐ ${skill.name} appears in one experience bullet`,
      ],
    },
  }));

  const dailyPlan: Record<string, any> = {};
  for (let day = 1; day <= 7; day += 1) {
    dailyPlan[`day${day}`] = {
      theme: day === 1 ? "Skills Alignment" : "Execution",
      focus: "Address critical gaps and polish your profile.",
      timeNeeded: "2-3 hours",
      motivational: "Small improvements compound quickly.",
    };
  }

  while (tasks.length < 15) {
    const index = tasks.length + 1;
    tasks.push({
      id: `task-${index}`,
      day: Math.min(7, (index % 7) + 1),
      title: "Strengthen resume impact metrics",
      category: "Resume Optimization",
      priority: "HIGH",
      timeEstimate: "90 min",
      context: { whyNow: "Quantified achievements improve ATS ranking." },
      currentState: {
        issue: "Bullets lack measurable impact.",
        consequence: "Recruiters can’t see your impact quickly.",
      },
      beforeAfter: {
        before: "Improved reliability.",
        after: "Improved reliability by 30% by automating deployments.",
      },
      exactSteps: [
        "Identify top 3 resume bullets",
        "Add a number/percentage to each",
        "Rewrite using action + metric",
      ],
      template: {
        example: "Reduced incident rate by 25% through automation.",
      },
      validation: {
        checkpoints: ["☐ 3 bullets include metrics", "☐ Each bullet has action + impact"],
      },
    });
  }

  return {
    title: "Week 1 Execution",
    dailyPlan,
    tasks,
  };
}

export async function buildDataDrivenBundle(answers: any, parsed?: ParsedData, options?: { includePro?: boolean }) {
  if (!answers?.jobDescription) {
    return {
      aiFailed: true,
      aiFailureReason: "Job description is required for personalized insights.",
      aiModel: "data-driven",
    };
  }

  const targetRole = answers.targetRoles?.[0]?.name;
  const marketIntel = await gatherMarketIntel(
    targetRole || "target role",
    (answers.targetCompanies || []).map((company: any) => company.name).filter(Boolean)
  ).catch(() => ({
    roleKeywords: [],
    salarySignals: null,
    companyTrends: [],
    sources: null,
  }));

  const linkedinData = getLinkedinData(answers, parsed);
  const skillsAnalysis = await analyzeSkillsMatch({
    resumeParsed: parsed?.resumeParsedData || {},
    linkedinData,
    jobDescription: answers.jobDescription,
    marketIntel,
  });
  const readiness = calculateReadinessScore({ ...answers, resumeParsedData: parsed?.resumeParsedData, linkedinParsedData: parsed?.linkedinParsedData }, skillsAnalysis);
  const aiInsights = generateDataDrivenInsights(answers, readiness, skillsAnalysis);
  const resumeAnalysis = buildResumeAnalysis({ ...answers, resumeParsedData: parsed?.resumeParsedData }, skillsAnalysis);
  const linkedinAnalysis = buildLinkedinAnalysis({ ...answers, linkedinParsedData: parsed?.linkedinParsedData }, skillsAnalysis);
  const week1Plan = buildWeek1Plan(answers, skillsAnalysis);
  const careerAnalysis = {
    executiveSummary: generateExecutiveSummary(answers, readiness, skillsAnalysis),
  };

  return normalizeSecondPersonDeep({
    marketIntelligence: marketIntel,
    week1Plan: { week1: week1Plan, week2Preview: { title: "Execution Week", previewTasks: [] } },
    personalizationData: null,
    aiInsights,
    resumeAnalysis,
    linkedinAnalysis,
    companyMatches: null,
    actionPlan: { week1: week1Plan, week2Preview: { title: "Execution Week", previewTasks: [] } },
    personalizedScripts: null,
    coverLetterKit: null,
    interviewPrep: null,
    companyStrategies: null,
    careerAnalysis,
    aiModel: "data-driven",
    aiFailed: false,
    aiFailureReason: null,
    readinessScore: readiness,
    skillMatchData: { ...skillsAnalysis, readinessScore: readiness },
  });
}
