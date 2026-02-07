import { gatherMarketIntel } from "@/lib/market-intel";
import { groqChatJSON } from "@/lib/llm";
import { formatTargetRole } from "@/lib/helpers/role-formatter";

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

type ATSKeyword = {
  keyword: string;
  category: "technical" | "soft" | "domain" | "tool" | "certification";
  importance: "critical" | "important" | "nice-to-have";
  frequency: number;
  context?: string;
};

type ATSAnalysis = {
  score: number;
  totalKeywords: number;
  matchedKeywords: ATSKeyword[];
  missingKeywords: ATSKeyword[];
  matchPercentage: number;
};

type SkillsAnalysis = {
  overallScore: number;
  matchPercentage: number;
  atsPass: boolean;
  yourSkills: SkillItem[];
  requiredSkills: SkillItem[];
  matchingSkills: SkillItem[];
  missingCriticalSkills: SkillItem[];
  missingNiceToHaveSkills: SkillItem[];
  requiredEducation?: string | null;
  educationMet?: boolean;
  roleAlignmentScore?: number;
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
  "go",
  "golang",
  "terraform",
  "ansible",
  "helm",
  "prometheus",
  "grafana",
  "splunk",
  "datadog",
  "sre",
];

const EDUCATION_KEYWORDS = ["bachelor", "bs", "ba", "master", "ms", "phd", "b.sc", "m.sc"];

function normalizeSkill(value: string) {
  return value.trim().toLowerCase();
}

function normalizeKeyword(value: string) {
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

function extractJobDescriptionSkills(jobDescription: string): SkillItem[] {
  const text = jobDescription.toLowerCase();
  const sentences = jobDescription
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const skills: SkillItem[] = [];
  COMMON_SKILLS.forEach((skill) => {
    if (!text.includes(skill)) return;
    const sentence = sentences.find((line) => line.toLowerCase().includes(skill)) || "";
    const requiredLevel =
      /required|must|need to|needs to|strongly|required|minimum|5\+ years|3\+ years/i.test(sentence)
        ? "critical"
        : "preferred";
    skills.push({
      name: skill
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      requiredLevel,
      whereInJobDescription: sentence,
      foundIn: "job",
    });
  });
  return skills;
}

function extractEducationRequirement(jobDescription: string) {
  const sentence =
    jobDescription
      .split(/(?<=[.!?])\s+/)
      .find((line) => /bachelor|master|phd|degree/i.test(line)) || "";
  if (!sentence) return null;
  const match = sentence.match(/(bachelor|master|phd)[^.,;]*/i);
  return match?.[0] || sentence;
}

function hasEducationMatch(resumeParsed: any, requirement: string | null) {
  if (!requirement) return true;
  const edu = resumeParsed?.education || resumeParsed?.raw?.education || [];
  const text = JSON.stringify(edu).toLowerCase();
  return EDUCATION_KEYWORDS.some((keyword) => requirement.toLowerCase().includes(keyword) && text.includes(keyword));
}

function getResumeText(parsed?: ParsedData, resumeParsed?: any) {
  if (parsed?.resumeRawText) return parsed.resumeRawText;
  if (resumeParsed?.rawText) return resumeParsed.rawText;
  const fallback = resumeParsed || parsed?.resumeParsedData || {};
  return JSON.stringify(fallback);
}

async function extractJobDescriptionKeywordsGroq(jobDescription: string): Promise<ATSKeyword[]> {
  const prompt = `Analyze this job description and extract the most important ATS keywords.

Rules:
- Return at most 25 keywords.
- Include technical skills, tools, certifications, domain terms, and key soft skills.
- Provide frequency (approximate count of mentions).
- Importance levels: critical, important, nice-to-have.

Job Description:
${jobDescription}

Return JSON:
{
  "keywords": [
    {
      "keyword": "Kubernetes",
      "category": "technical",
      "importance": "critical",
      "frequency": 5,
      "context": "5+ years experience with Kubernetes required"
    }
  ]
}`;

  const response = await groqChatJSON(
    "You extract ATS keywords from job descriptions. Return valid JSON only.",
    prompt
  );
  const keywords = response?.keywords;
  if (!Array.isArray(keywords)) return [];
  return keywords
    .filter((item: any) => item?.keyword)
    .map((item: any) => ({
      keyword: String(item.keyword),
      category: item.category || "technical",
      importance: item.importance || "important",
      frequency: Number(item.frequency || 1),
      context: item.context || item.whereInJobDescription || "",
    }));
}

async function extractResumeKeywordsGroq(resumeText: string): Promise<ATSKeyword[]> {
  const prompt = `Extract keywords from this resume.

Rules:
- Include technical skills, tools, certifications, methodologies, and key soft skills.
- Return at most 40 keywords.

Resume:
${resumeText}

Return JSON:
{
  "keywords": [
    { "keyword": "Python", "category": "technical" }
  ]
}`;

  const response = await groqChatJSON(
    "You extract resume keywords for ATS matching. Return valid JSON only.",
    prompt
  );
  const keywords = response?.keywords;
  if (!Array.isArray(keywords)) return [];
  return keywords
    .filter((item: any) => item?.keyword)
    .map((item: any) => ({
      keyword: String(item.keyword),
      category: item.category || "technical",
      importance: "nice-to-have",
      frequency: 0,
    }));
}

function buildATSFallback(jobDescription: string, resumeParsed: any): ATSAnalysis {
  const jdSkills = extractJobDescriptionSkills(jobDescription).map((skill) => ({
    keyword: skill.name,
    category: "technical" as const,
    importance: (skill.requiredLevel === "critical" ? "critical" : "important") as ATSKeyword["importance"],
    frequency: 1,
    context: skill.whereInJobDescription,
  }));
  const resumeSkills = extractResumeSkills(resumeParsed).map((skill) => ({
    keyword: skill.name,
    category: "technical" as const,
    importance: "nice-to-have" as const,
    frequency: 0,
  }));

  return calculateATSFromKeywords(jdSkills, resumeSkills);
}

function calculateATSFromKeywords(jobKeywords: ATSKeyword[], resumeKeywords: ATSKeyword[]): ATSAnalysis {
  const matchedKeywords: ATSKeyword[] = [];
  const missingKeywords: ATSKeyword[] = [];

  jobKeywords.forEach((job) => {
    const jobKey = normalizeKeyword(job.keyword);
    const match = resumeKeywords.find((res) => {
      const resKey = normalizeKeyword(res.keyword);
      return resKey === jobKey || resKey.includes(jobKey) || jobKey.includes(resKey);
    });
    if (match) {
      matchedKeywords.push(job);
    } else {
      missingKeywords.push(job);
    }
  });

  const criticalTotal = jobKeywords.filter((k) => k.importance === "critical").length || 0;
  const importantTotal = jobKeywords.filter((k) => k.importance === "important").length || 0;
  const niceTotal = jobKeywords.filter((k) => k.importance === "nice-to-have").length || 0;

  const criticalMatches = matchedKeywords.filter((k) => k.importance === "critical").length;
  const importantMatches = matchedKeywords.filter((k) => k.importance === "important").length;
  const niceMatches = matchedKeywords.filter((k) => k.importance === "nice-to-have").length;

  const criticalScore = criticalTotal ? (criticalMatches / criticalTotal) * 60 : 60;
  const importantScore = importantTotal ? (importantMatches / importantTotal) * 30 : 30;
  const niceScore = niceTotal ? (niceMatches / niceTotal) * 10 : 10;

  const score = Math.round(criticalScore + importantScore + niceScore);
  const matchPercentage = jobKeywords.length
    ? Math.round((matchedKeywords.length / jobKeywords.length) * 100)
    : 0;

  return {
    score,
    totalKeywords: jobKeywords.length,
    matchedKeywords,
    missingKeywords,
    matchPercentage,
  };
}

async function calculateATSAnalysis(jobDescription: string, resumeText: string, resumeParsed: any): Promise<ATSAnalysis> {
  const [jobKeywords, resumeKeywords] = await Promise.all([
    extractJobDescriptionKeywordsGroq(jobDescription),
    extractResumeKeywordsGroq(resumeText),
  ]);

  if (!jobKeywords.length || !resumeKeywords.length) {
    return buildATSFallback(jobDescription, resumeParsed);
  }
  return calculateATSFromKeywords(jobKeywords, resumeKeywords);
}

type SalaryData = {
  role: string;
  level: string;
  ranges: {
    min: number;
    max: number;
    median: number;
    currency: string;
  };
  source: string;
  location?: string;
  lastUpdated: string;
  breakdown?: {
    base?: { min: number; max: number };
    bonus?: { min: number; max: number };
    equity?: { min: number; max: number };
  };
};

async function extractSalaryFromJobDescription(jobDescription: string): Promise<SalaryData | null> {
  const response = await groqChatJSON(
    "You extract salary information from job descriptions. Return valid JSON only.",
    `Analyze the job description and extract salary info if present.

Return JSON:
{
  "found": true,
  "min": 150000,
  "max": 200000,
  "currency": "USD",
  "notes": "Salary range mentioned in benefits section"
}

If none found: {"found": false}

Job Description:
${jobDescription}`
  );

  if (!response || response.found !== true) return null;
  const min = Number(response.min || 0);
  const max = Number(response.max || 0);
  if (!min || !max) return null;
  return {
    role: "From Job Description",
    level: "",
    ranges: {
      min,
      max,
      median: Math.round((min + max) / 2),
      currency: response.currency || "USD",
    },
    source: "Job Description",
    lastUpdated: new Date().toISOString(),
  };
}

async function analyzeMarketSalary(results: any[], targetRole: string, level: string, location?: string) {
  const response = await groqChatJSON(
    "You analyze salary data from search results. Return valid JSON only.",
    `Based on these search results, estimate the salary range for a ${level} ${targetRole}.

Search Results:
${JSON.stringify(results.slice(0, 5))}

Return JSON:
{
  "min": 120000,
  "max": 180000,
  "median": 150000,
  "source": "Levels.fyi, Glassdoor",
  "currency": "USD"
}`
  );

  if (!response?.min || !response?.max) return null;
  return {
    role: targetRole,
    level,
    ranges: {
      min: Number(response.min),
      max: Number(response.max),
      median: Number(response.median || Math.round((response.min + response.max) / 2)),
      currency: response.currency || "USD",
    },
    source: response.source || "Market research",
    location,
    lastUpdated: new Date().toISOString(),
  } satisfies SalaryData;
}

function fallbackSalary(targetRole: string, level: string, location?: string): SalaryData {
  const defaults: Record<string, { min: number; max: number }> = {
    entry: { min: 60000, max: 90000 },
    junior: { min: 80000, max: 110000 },
    mid: { min: 100000, max: 140000 },
    senior: { min: 140000, max: 190000 },
    staff: { min: 180000, max: 250000 },
    principal: { min: 220000, max: 320000 },
    lead: { min: 160000, max: 220000 },
    manager: { min: 150000, max: 210000 },
    director: { min: 200000, max: 300000 },
    vp: { min: 250000, max: 400000 },
  };
  const range = defaults[level?.toLowerCase?.() || ""] || { min: 100000, max: 150000 };
  return {
    role: targetRole,
    level,
    ranges: {
      min: range.min,
      max: range.max,
      median: Math.round((range.min + range.max) / 2),
      currency: "USD",
    },
    source: "Industry estimates",
    location,
    lastUpdated: new Date().toISOString(),
  };
}

async function getSalaryIntelligence(input: {
  targetRole: string;
  level: string;
  jobDescription?: string;
  marketIntel?: any;
  location?: string;
}): Promise<SalaryData | null> {
  if (input.jobDescription) {
    const extracted = await extractSalaryFromJobDescription(input.jobDescription);
    if (extracted) return extracted;
  }
  const salaryResults = input.marketIntel?.sources?.salaryResults || [];
  if (Array.isArray(salaryResults) && salaryResults.length) {
    const parsed = await analyzeMarketSalary(salaryResults, input.targetRole, input.level, input.location);
    if (parsed) return parsed;
  }
  return fallbackSalary(input.targetRole, input.level, input.location);
}

function calculateRoleAlignment(targetRole: string | null | undefined, resumeParsed: any, linkedinData: ReturnType<typeof getLinkedinData>) {
  const normalizedTarget = targetRole?.toLowerCase() || "";
  if (!normalizedTarget) return 0;
  if (!targetRole) return 0;
  const resumeRoles = (resumeParsed?.experience || resumeParsed?.raw?.experience || [])
    .map((exp: any) => exp?.title || "")
    .join(" ")
    .toLowerCase();
  const linkedinHeadline = linkedinData.headline?.toLowerCase() || "";
  const linkedinRole = linkedinData.currentRole?.toLowerCase() || "";
  const hits = [resumeRoles, linkedinHeadline, linkedinRole].filter((val) => val.includes(normalizedTarget)).length;
  return Math.min(100, hits * 35);
}

export async function analyzeSkillsMatch(input: {
  resumeParsed: any;
  linkedinData: ReturnType<typeof getLinkedinData>;
  jobDescription: string;
  marketIntel: any;
  targetRole?: string | null;
}): Promise<SkillsAnalysis> {
  const resumeSkills: SkillItem[] = extractResumeSkills(input.resumeParsed);
  const linkedinSkills: SkillItem[] = (input.linkedinData.skills || []).map((name: string) => ({
    name,
    foundIn: resumeSkills.find((s) => normalizeSkill(s.name) === normalizeSkill(name)) ? "both" : "linkedin",
  }));
  const yourSkills: SkillItem[] = [...resumeSkills, ...linkedinSkills].filter(Boolean);

  const jdSkills = extractJobDescriptionSkills(input.jobDescription);
  const marketSkills: SkillItem[] =
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

  const requiredEducation = extractEducationRequirement(input.jobDescription);
  const educationMet = hasEducationMatch(input.resumeParsed, requiredEducation);
  const roleAlignmentScore = calculateRoleAlignment(
    input.targetRole,
    input.resumeParsed,
    input.linkedinData
  );
  const atsPass = matchPercentage >= 70;

  return {
    overallScore: matchPercentage,
    matchPercentage,
    atsPass,
    yourSkills,
    requiredSkills,
    matchingSkills,
    missingCriticalSkills,
    missingNiceToHaveSkills,
    requiredEducation,
    educationMet,
    roleAlignmentScore,
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

export function generateExecutiveSummary(
  assessment: any,
  scores: ReadinessScore,
  skills: SkillsAnalysis,
  ats?: ATSAnalysis
) {
  const targetRole = formatTargetRole(
    assessment.targetRoles?.[0]?.name || "your target role",
    assessment.level || "mid"
  );
  const targetCompany = assessment.targetCompanies?.[0]?.name || "top companies";
  let coachSummary = "";
  if (ats?.score ? ats.score >= 70 : skills.atsPass) {
    coachSummary = `You clear ATS screening for ${targetRole} roles. The next bottleneck is hiring-manager alignment: summary clarity, role relevance, and proof.`;
  } else {
    coachSummary = `You are at risk of ATS rejection for ${targetRole} roles. The immediate priority is adding missing technical keywords from the job description.`;
  }

  const evidenceHighlights = [
    ...(skills.missingCriticalSkills.slice(0, 2).map((s) => `Missing critical skill: ${s.name}`) || []),
    ...(skills.matchingSkills.slice(0, 2).map((s) => `Matching skill: ${s.name}`) || []),
    ...(skills.requiredEducation && !skills.educationMet ? [`Education requirement not verified: ${skills.requiredEducation}`] : []),
  ];

  return {
    coachSummary,
    currentState: scores.gaps[0] || "",
    targetState: `ATS pass + hiring-manager alignment for ${targetRole} roles`,
    primaryChallenge: scores.gaps[0] || "",
    estimatedTimeline: assessment.timeline || "4-6 weeks",
    confidenceLevel: scores.overall >= 70 ? "High" : "Moderate",
    evidenceHighlights,
  };
}

export function generateDataDrivenInsights(
  assessment: any,
  scores: ReadinessScore,
  skills: SkillsAnalysis,
  ats?: ATSAnalysis
) {
  const targetRole = formatTargetRole(
    assessment.targetRoles?.[0]?.name || "your target role",
    assessment.level || "mid"
  );
  const targetCompany = assessment.targetCompanies?.[0]?.name || "your target company";

  const missing = (ats?.missingKeywords || []).filter((item) => item.importance === "critical").slice(0, 3);
  const missingFallback = skills.missingCriticalSkills.slice(0, 3).map((skill) => ({
    keyword: skill.name,
    category: "technical" as const,
    importance: "critical" as const,
    frequency: 1,
    context: skill.whereInJobDescription,
  }));
  const missingKeywords = missing.length ? missing : missingFallback;

  const primaryGap = missingKeywords.length
    ? `You're missing ${missingKeywords.length} required skills`
    : "Your ATS coverage is solid. The next gap is hiring-manager alignment.";
  const primaryGapExplanation = missingKeywords.length
    ? `The job description lists ${missingKeywords.map((s) => `"${s.keyword}"`).join(", ")} as required, but they're not in your resume or LinkedIn.`
    : `Your resume and LinkedIn need clearer role alignment and proof for ${targetRole}.`;

  const primaryGapEvidence = missingKeywords.length
    ? [
      `Job description mentions: "${missingKeywords[0]?.context || missingKeywords[0]?.keyword}"`,
      "Your resume: missing from Skills section",
      "Your LinkedIn: not listed in skills",
    ]
    : [];

  const quickWin = missingKeywords.length
    ? `Add ${missingKeywords[0]?.keyword} to your resume Skills section`
    : `Align your summary to ${targetRole} with concrete proof`;
  const quickWinReasoning = missingKeywords.length
    ? "ATS systems prioritize exact keyword matches from the job description."
    : "Hiring managers scan the summary first to validate role fit.";
  const quickWinEvidence = missingKeywords.length
    ? [`Missing: ${missingKeywords.map((s) => s.keyword).join(", ")}`]
    : [];

  const atsMatches = ats?.matchedKeywords?.filter((item) => item.importance !== "nice-to-have") || [];
  const strengthsToLeverage = atsMatches.length
    ? [
        {
          strength: `You have ${atsMatches.slice(0, 3).map((item) => item.keyword).join(", ")}`,
          evidence: atsMatches.map((item) => `✓ ${item.keyword} mentioned ${item.frequency || 1}x in the job description`).join(" • "),
          howToUse: `Move ${atsMatches[0]?.keyword} to your first resume bullet and add "${atsMatches
            .slice(0, 3)
            .map((item) => item.keyword)
            .join(" | ")}" to your LinkedIn headline.`,
        },
      ]
    : scores.breakdown.experience >= 80
      ? [
          {
            strength: "Strong experience level",
            evidence: "Your experience level meets senior role expectations.",
            howToUse: "Lead with scope, ownership, and scale in your summary.",
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
    realityCheck: `ATS clears you or blocks you. After that, hiring managers validate role alignment, experience, and LinkedIn consistency.`,
  };
}

export function buildResumeAnalysis(assessment: any, skills: SkillsAnalysis, ats?: ATSAnalysis) {
  const overallScore = calculateResumeScore(assessment);
  const atsMissing = ats?.missingKeywords?.filter((item) => item.importance === "critical") || [];
  const missingKeywords = (atsMissing.length
    ? atsMissing.map((skill) => ({
        keyword: skill.keyword,
        importance: "high",
        currentlyPresent: false,
        whereToAdd: "Skills section + relevant experience bullet",
        howToAdd: `Add "${skill.keyword}" to Skills and one experience bullet with context.`,
        reason: skill.context || "Required by the job description.",
      }))
    : skills.missingCriticalSkills.map((skill) => ({
        keyword: skill.name,
        importance: "high",
        currentlyPresent: false,
        whereToAdd: "Skills section + relevant experience bullet",
        howToAdd: `Add "${skill.name}" to Skills and one experience bullet with context.`,
        reason: skill.whereInJobDescription || "Required by the job description.",
      })));

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

  const educationIssue =
    skills.requiredEducation && !skills.educationMet
      ? [
          {
            id: "education-required",
            category: "Requirements",
            severity: "HIGH",
            issue: "Education requirement not clearly stated",
            location: "Education section",
            currentText: "",
            suggestedFix: `Add your degree info to match: "${skills.requiredEducation}"`,
            reasoning: "Hiring managers verify minimum requirements after ATS screening.",
            impactScore: 85,
            timeToFix: "10 min",
            stepByStepFix: ["Open Education section", "Add degree, major, school, and year"],
          },
        ]
      : [];

  return {
    overallScore,
    atsScore: Math.round(overallScore * 0.9),
    issues: [...issues, ...educationIssue],
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

export function buildWeek1Plan(assessment: any, skills: SkillsAnalysis, ats?: ATSAnalysis) {
  const targetRole = formatTargetRole(
    assessment.targetRoles?.[0]?.name || "your target role",
    assessment.level || "mid"
  );
  const targetCompany = assessment.targetCompanies?.[0]?.name || "target companies";
  const criticalMissing =
    ats?.missingKeywords?.filter((item) => item.importance === "critical") ||
    skills.missingCriticalSkills.map((skill) => ({
      keyword: skill.name,
      context: skill.whereInJobDescription,
      importance: "critical" as const,
      category: "technical" as const,
      frequency: 1,
    }));

  const tasks: any[] = [];
  let taskId = 1;

  criticalMissing.slice(0, 3).forEach((keyword) => {
    tasks.push({
      id: `week1-task-${taskId++}`,
      day: 1,
      title: `Add critical keyword: "${keyword.keyword}" to your resume`,
      category: "Resume Optimization",
      priority: "CRITICAL",
      timeEstimate: "20 min",
      context: {
        whyNow: keyword.context ? `Job description: "${keyword.context}"` : "ATS screening depends on exact keyword matches.",
      },
      currentState: {
        issue: `Missing ${keyword.keyword} in your resume and LinkedIn.`,
        consequence: "ATS filters may reject your application.",
      },
      beforeAfter: {
        before: "Skills section missing required keyword.",
        after: `Skills section includes ${keyword.keyword} + one experience bullet.`,
      },
      exactSteps: [
        "Open your resume",
        "Add the keyword to Skills",
        "Update one relevant experience bullet",
        "Add the keyword to LinkedIn Skills",
      ],
      template: {
        example: `Implemented ${keyword.keyword} to improve deployment reliability.`,
      },
      validation: {
        checkpoints: [
          `☐ ${keyword.keyword} appears in Skills section`,
          `☐ ${keyword.keyword} appears in one experience bullet`,
        ],
      },
    });
  });

  tasks.push({
    id: `week1-task-${taskId++}`,
    day: 2,
    title: `Rewrite your resume summary for ${targetRole}`,
    category: "Resume Optimization",
    priority: "HIGH",
    timeEstimate: "30 min",
    context: { whyNow: "Hiring managers scan the summary first." },
    currentState: {
      issue: "Summary doesn’t clearly position you for the target role.",
      consequence: "Hiring managers doubt role fit.",
    },
    beforeAfter: {
      before: "Experienced engineer with a background in infrastructure.",
      after: `Senior ${targetRole} delivering measurable impact across infrastructure, reliability, and automation.`,
    },
    exactSteps: [
      "Open resume summary",
      "Write 3-4 lines aligned to target role",
      "Include 2-3 top skills + impact metric",
    ],
    template: {
      example: `Senior ${targetRole} with 8+ years scaling cloud platforms and reducing incident rates by 30%.`,
    },
    validation: {
      checkpoints: ["☐ Summary includes target role", "☐ Summary includes 2-3 keywords", "☐ Summary includes one metric"],
    },
  });

  tasks.push({
    id: `week1-task-${taskId++}`,
    day: 2,
    title: "Add metrics to your top 3 resume bullets",
    category: "Resume Optimization",
    priority: "HIGH",
    timeEstimate: "45 min",
    context: { whyNow: "Quantified achievements increase interview rates." },
    currentState: {
      issue: "Impact is implied, not measured.",
      consequence: "Your work looks smaller than it is.",
    },
    beforeAfter: {
      before: "Improved reliability.",
      after: "Improved reliability by 30% through automated failover.",
    },
    exactSteps: [
      "Select 3 most important bullets",
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

  tasks.push({
    id: `week1-task-${taskId++}`,
    day: 3,
    title: `Update LinkedIn headline for ${targetRole} searches`,
    category: "LinkedIn Profile",
    priority: "CRITICAL",
    timeEstimate: "15 min",
    context: { whyNow: "Recruiters search by headline keywords." },
    currentState: {
      issue: "Headline doesn't include your target role + top skills.",
      consequence: "You won’t appear in recruiter searches.",
    },
    beforeAfter: {
      before: "DevOps leader | Cloud",
      after: `${targetRole} | ${criticalMissing.slice(0, 3).map((item) => item.keyword).join(" | ")}`,
    },
    exactSteps: [
      "Open LinkedIn profile",
      "Edit headline",
      "Add target role + 2-3 keywords",
    ],
    template: {
      example: `${targetRole} | Kubernetes | Terraform | AWS`,
    },
    validation: {
      checkpoints: ["☐ Headline includes target role", "☐ 2-3 keywords included"],
    },
  });

  tasks.push({
    id: `week1-task-${taskId++}`,
    day: 4,
    title: "Write a 500+ word LinkedIn About section",
    category: "LinkedIn Profile",
    priority: "HIGH",
    timeEstimate: "60 min",
    context: { whyNow: "Hiring managers validate story alignment on LinkedIn." },
    currentState: {
      issue: "About section is missing or generic.",
      consequence: "Your story doesn’t build trust.",
    },
    beforeAfter: {
      before: "Experienced engineer focused on cloud systems.",
      after: `Senior ${targetRole} delivering measurable outcomes in reliability, automation, and scale.`,
    },
    exactSteps: [
      "Open LinkedIn About section",
      "Write 3 short paragraphs with impact",
      "Include target role + 3 keywords",
    ],
    template: {
      example: `Senior ${targetRole} with 8+ years building reliable, automated infrastructure. Recent wins include reducing incidents by 30% and cutting deploy time by 40%.`,
    },
    validation: {
      checkpoints: ["☐ 500+ words", "☐ Includes target role", "☐ Includes 3 keywords"],
    },
  });

  tasks.push({
    id: `week1-task-${taskId++}`,
    day: 5,
    title: `Research ${targetCompany}'s engineering stack`,
    category: "Company Research",
    priority: "MEDIUM",
    timeEstimate: "30 min",
    context: { whyNow: "Tailor your resume and outreach to company tech stack." },
    currentState: {
      issue: "Company-specific context not collected.",
      consequence: "Outreach feels generic.",
    },
    exactSteps: [
      "Read engineering blog",
      "List 5 key tools/technologies",
      "Map overlap with your skills",
    ],
    validation: {
      checkpoints: ["☐ 5 tools collected", "☐ 3 overlap points identified"],
    },
  });

  tasks.push({
    id: `week1-task-${taskId++}`,
    day: 6,
    title: "Send 10 targeted LinkedIn connection requests",
    category: "Networking",
    priority: "MEDIUM",
    timeEstimate: "45 min",
    context: { whyNow: "Warm connections raise response rates." },
    currentState: {
      issue: "No warm intros to target roles.",
      consequence: "Low response rate on applications.",
    },
    exactSteps: [
      "Find 10 employees in target role",
      "Send personalized connection note",
      "Track who accepts",
    ],
    template: {
      example: "Hi [Name], I’m targeting ${targetRole} roles and loved your recent post on [topic]. Would love to connect.",
    },
    validation: {
      checkpoints: ["☐ 10 requests sent", "☐ Personalization in each message"],
    },
  });

  tasks.push({
    id: `week1-task-${taskId++}`,
    day: 7,
    title: "Prepare a 60-second interview intro",
    category: "Interview Prep",
    priority: "MEDIUM",
    timeEstimate: "30 min",
    context: { whyNow: "Hiring managers want a clear, confident summary." },
    currentState: {
      issue: "Intro feels improvised.",
      consequence: "First impression lacks clarity.",
    },
    exactSteps: [
      "Write a 4-5 sentence intro",
      "Include target role + 2 metrics",
      "Practice out loud twice",
    ],
    validation: {
      checkpoints: ["☐ 60 seconds or less", "☐ Includes target role", "☐ Includes 2 metrics"],
    },
  });

  const dailyPlan: Record<string, any> = {
    day1: { theme: "ATS Coverage", focus: "Fix critical keyword gaps.", timeNeeded: "1-2 hours", motivational: "Your highest leverage ATS fix." },
    day2: { theme: "Resume Positioning", focus: "Rewrite summary + add metrics.", timeNeeded: "1-2 hours", motivational: "Clarity increases interview rate." },
    day3: { theme: "LinkedIn Headline", focus: "Align headline with target role.", timeNeeded: "30-60 min", motivational: "Visibility = opportunity." },
    day4: { theme: "LinkedIn Story", focus: "Build trust with your About section.", timeNeeded: "1 hour", motivational: "Consistency builds confidence." },
    day5: { theme: "Company Intel", focus: "Collect stack + context.", timeNeeded: "30-60 min", motivational: "Specific outreach converts." },
    day6: { theme: "Networking", focus: "Warm introductions.", timeNeeded: "45-60 min", motivational: "Relationships beat volume." },
    day7: { theme: "Interview Prep", focus: "Practice your intro.", timeNeeded: "30 min", motivational: "Confidence wins interviews." },
  };

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
    targetRole: answers.targetRoles?.[0]?.name || "",
  });
  const atsAnalysis = await calculateATSAnalysis(
    answers.jobDescription,
    getResumeText(parsed, parsed?.resumeParsedData),
    parsed?.resumeParsedData || {}
  );
  const readiness = calculateReadinessScore(
    { ...answers, resumeParsedData: parsed?.resumeParsedData, linkedinParsedData: parsed?.linkedinParsedData },
    skillsAnalysis
  );
  const aiInsights = generateDataDrivenInsights(answers, readiness, skillsAnalysis, atsAnalysis);
  const resumeAnalysis = buildResumeAnalysis(
    { ...answers, resumeParsedData: parsed?.resumeParsedData },
    skillsAnalysis,
    atsAnalysis
  );
  const linkedinAnalysis = buildLinkedinAnalysis({ ...answers, linkedinParsedData: parsed?.linkedinParsedData }, skillsAnalysis);
  const week1Plan = buildWeek1Plan(answers, skillsAnalysis, atsAnalysis);
  const salaryData = await getSalaryIntelligence({
    targetRole: answers.targetRoles?.[0]?.name || "target role",
    level: answers.level || "mid",
    jobDescription: answers.jobDescription,
    marketIntel,
    location: answers.location || answers.workPreference || undefined,
  });
  const careerAnalysis = {
    executiveSummary: generateExecutiveSummary(answers, readiness, skillsAnalysis, atsAnalysis),
  };

  return normalizeSecondPersonDeep({
    marketIntelligence: { ...marketIntel, salaryData },
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
    skillMatchData: { ...skillsAnalysis, readinessScore: readiness, atsAnalysis, atsScore: atsAnalysis.score },
  });
}
