import type { AssessmentAnswers } from "@/lib/validation";
import { groqChatJSON } from "@/lib/llm";

type ParsedData = {
  resumeParsedData?: any;
  linkedinParsedData?: any;
};

const ROLE_REQUIREMENTS: Record<string, string[]> = {
  "DevOps Engineer": ["Kubernetes", "AWS", "Terraform", "CI/CD", "Docker", "Monitoring", "Automation"],
  "Site Reliability Engineer": ["SLO", "SLA", "Incident Response", "Kubernetes", "Observability", "Linux"],
  "Platform Engineer": ["Platform", "Kubernetes", "Infrastructure as Code", "CI/CD", "Developer Experience"],
  "Engineering Manager": ["Leadership", "Delivery", "Hiring", "Roadmaps", "Execution"],
  "Director of Engineering": ["Org Leadership", "Strategy", "Scaling Teams", "Hiring", "Execution"],
  "Senior Backend Engineer": ["APIs", "Databases", "Distributed Systems", "Performance", "Testing"],
  "Senior Frontend Engineer": ["React", "TypeScript", "Performance", "Accessibility", "Design Systems"],
  "Staff Engineer": ["System Design", "Architecture", "Technical Leadership", "Mentoring"],
  "Principal Engineer": ["Architecture", "Influence", "System Design", "Strategy"],
  "Cloud Architect": ["AWS", "Azure", "GCP", "Networking", "Security"],
};

function normalizeSkills(skills: string[]) {
  return skills.map((skill) => skill.toLowerCase());
}

function getRoleRequirements(roleName: string) {
  return ROLE_REQUIREMENTS[roleName] || ROLE_REQUIREMENTS["DevOps Engineer"];
}

function getSkillMatch(skills: string[], required: string[]) {
  const normalized = normalizeSkills(skills);
  const matches = required.filter((req) => normalized.includes(req.toLowerCase()));
  const percentage = required.length ? Math.round((matches.length / required.length) * 100) : 0;
  return { matches, missing: required.filter((req) => !normalized.includes(req.toLowerCase())), percentage };
}

function generateActionPlan(answers: AssessmentAnswers) {
  const hours = answers.hoursPerWeek || 8;
  const tasksPerWeek = hours <= 3 ? 2 : hours <= 5 ? 3 : hours <= 8 ? 4 : 6;
  const baseWeek1 = [
    "Audit LinkedIn headline for target role keywords",
    "Build a 20-company target list",
    "Draft 3 outreach scripts",
    "Customize resume for top 5 roles",
    "Identify 5 warm network connections",
    "Schedule 2 mock interviews",
  ];
  const baseWeek2 = [
    "Send 10 warm connection requests",
    "Apply to 3 high-fit roles",
    "Follow up on 5 applications",
    "Prepare STAR stories for interviews",
    "Publish one proof-of-work post",
    "Refine negotiation strategy",
  ];

  return {
    week1: {
      title: "Foundation",
      tasks: baseWeek1.slice(0, tasksPerWeek).map((task) => ({
        task,
        timeEstimate: "30-60 minutes",
        priority: "HIGH",
        why: "Directly impacts response rate",
      })),
    },
    week2: {
      title: "Execution",
      tasks: baseWeek2.slice(0, tasksPerWeek).map((task) => ({
        task,
        timeEstimate: "30-60 minutes",
        priority: "MEDIUM",
        why: "Builds momentum toward interviews",
      })),
    },
  };
}

function analyzeResume(answers: AssessmentAnswers, resumeParsedData?: any) {
  if (!resumeParsedData) return null;
  const targetRole = answers.targetRoles[0]?.name || "Target role";
  const required = getRoleRequirements(targetRole);
  const skills = resumeParsedData.topSkills || [];
  const match = getSkillMatch(skills, required);

  const issues = match.missing.slice(0, 6).map((keyword, index) => ({
    id: `keyword-${index}`,
    category: "Keywords",
    severity: "HIGH",
    issue: `Missing keyword: ${keyword}`,
    location: "Skills section",
    currentText: "",
    suggestedFix: `Add "${keyword}" to your skills section and include it in a recent project bullet.`,
    reasoning: `Required for ${targetRole} roles.`,
    impactScore: 70,
  }));

  return {
    overallScore: Math.max(40, 100 - match.missing.length * 5),
    atsScore: Math.max(40, 100 - match.missing.length * 4),
    issues,
    missingKeywords: match.missing.slice(0, 5).map((keyword) => ({
      keyword,
      importance: "high",
      whereToAdd: "Skills section",
      howToAdd: `Add ${keyword} to skills and highlight in a recent role.`,
    })),
    weakAchievements: [],
    strengthsToEmphasize: (resumeParsedData.achievements || []).slice(0, 3).map((achievement: string) => ({
      strength: achievement,
      evidence: achievement,
      howToHighlight: "Move this to top bullet under most recent role.",
    })),
    quickWins: [
      {
        fix: "Add missing keywords to Skills section",
        impact: "+10 ATS match",
      },
    ],
  };
}

function analyzeLinkedIn(answers: AssessmentAnswers, linkedinParsedData?: any, resumeParsedData?: any) {
  if (!linkedinParsedData) return null;
  const targetRole = answers.targetRoles[0]?.name || "Target role";
  const topSkills = resumeParsedData?.topSkills || [];
  const optimizedHeadline = topSkills.length
    ? `${targetRole} | ${topSkills.slice(0, 3).join(" • ")}`
    : `${targetRole} | Highlight your top skills`;

  return {
    overallScore: 70,
    sections: {
      headline: {
        current: linkedinParsedData.headline || "",
        score: linkedinParsedData.headline ? 70 : 40,
        issues: linkedinParsedData.headline ? [] : ["Missing a keyword-focused headline"],
        optimized: optimizedHeadline,
        keywords: topSkills.slice(0, 5),
        reasoning: "Highlights target role + top skills for recruiter searches.",
      },
      about: {
        current: linkedinParsedData.about || "",
        score: linkedinParsedData.about ? 70 : 40,
        issues: linkedinParsedData.about ? [] : ["Missing About section"],
        optimized: `Senior ${targetRole} specializing in ${topSkills.slice(0, 5).join(", ")}.`,
        structure: {
          paragraph1: "Hook",
          paragraph2: "Achievements",
          paragraph3: "What you want",
          paragraph4: "Call to action",
        },
        reasoning: "Structured for clarity and credibility.",
      },
      skills: {
        current: linkedinParsedData.skills || [],
        score: 60,
        missing: topSkills.slice(0, 5),
        toRemove: [],
        priority: topSkills.slice(0, 5).map((skill: string) => ({
          skill,
          reason: "High alignment to target role",
          action: "Add/Move to top",
        })),
      },
      experience: {
        score: 60,
        improvements: [],
      },
    },
    missingElements: [
      {
        element: "Recommendations",
        importance: "MEDIUM",
        howToAdd: "Request 2 recommendations from recent managers or peers.",
      },
    ],
    comparisonWithResume: {
      inconsistencies: [],
    },
    actionChecklist: [
      {
        task: "Update headline with target role + skills",
        time: "10 minutes",
        priority: 8,
        instructions: "Use the optimized headline above.",
      },
    ],
  };
}

function generateCompanyMatches(answers: AssessmentAnswers, resumeParsedData?: any) {
  if (!resumeParsedData) return [];
  const targetRole = answers.targetRoles[0]?.name || "Target role";
  const required = getRoleRequirements(targetRole);
  const skills = resumeParsedData.topSkills || [];
  return answers.targetCompanies.map((company) => {
    const match = getSkillMatch(skills, required);
    const matchScore = Math.max(30, Math.min(100, match.percentage));
    return {
      company,
      matchScore,
      skillMatchPercentage: match.percentage,
      matchingSkills: match.matches,
      missingSkills: match.missing,
      insights: {
        whyGoodFit: `Your ${match.matches.slice(0, 2).join(", ")} experience aligns with ${company.name}.`,
        gapsToAddress: match.missing.slice(0, 2),
      },
    };
  });
}

export async function runFullAnalysis(answers: AssessmentAnswers, parsed?: ParsedData) {
  const resumeAnalysis = analyzeResume(answers, parsed?.resumeParsedData);
  const linkedinAnalysis = analyzeLinkedIn(answers, parsed?.linkedinParsedData, parsed?.resumeParsedData);
  const companyMatches = generateCompanyMatches(answers, parsed?.resumeParsedData);
  const actionPlan = generateActionPlan(answers);

  const prompt = `Provide a short JSON insight summary for ${answers.targetRoles
    .map((r) => r.name)
    .join(", ")} based on resume: ${JSON.stringify(parsed?.resumeParsedData)} and LinkedIn: ${JSON.stringify(
    parsed?.linkedinParsedData
  )}. Return JSON with primaryGap, secondaryGap, quickWin, routeReasoning, companyFit.`;

  const aiInsights = await groqChatJSON(
    "You are a senior tech career coach. Return valid JSON only.",
    prompt
  );

  return {
    aiInsights,
    resumeAnalysis,
    linkedinAnalysis,
    companyMatches,
    actionPlan,
  };
}
