import type { AssessmentAnswers } from "@/lib/validation";
import { computeScore } from "@/lib/scoring";
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

function generateScriptFallback(answers: AssessmentAnswers, resumeParsedData?: any) {
  const targetRole = answers.targetRoles[0]?.name || "your target role";
  const currentRole = resumeParsedData?.currentRole?.title || "your current role";
  const currentCompany = resumeParsedData?.currentRole?.company || "your company";
  const topSkill = resumeParsedData?.topSkills?.[0] || "your expertise";
  const compTarget = answers.compTarget || "your target range";
  const companies = answers.targetCompanies.slice(0, 2).map((c) => c.name).join(" and ") || "your target companies";
  return {
    scripts: [
      {
        id: "referral-ask",
        category: "Outreach",
        title: "Referral Ask",
        description: "Use for warm introductions.",
        content: `Subject: Quick question about [Company Name]\n\nHi [Name],\n\nI noticed you're at [Company Name] — congrats on the role!\n\nI'm a ${currentRole} at ${currentCompany} with a focus on ${topSkill}. I'm exploring ${targetRole} opportunities and [Company Name] is a top target. Would you be open to a quick 15-minute chat about your experience there?\n\nThanks,\n[Your Name]`,
        whenToUse: "When you have a 1st/2nd degree connection.",
        variables: [{ name: "[Name]", description: "Connection first name" }, { name: "[Company Name]", description: "Target company" }],
        successTips: ["Keep the ask short", "Offer flexible times"],
      },
      {
        id: "recruiter-cold",
        category: "Outreach",
        title: "Recruiter Cold Email",
        description: "Cold outreach to recruiters.",
        content: `Subject: ${answers.level} ${targetRole} — open to opportunities\n\nHi [Recruiter Name],\n\nI'm a ${answers.level} ${currentRole} at ${currentCompany} with ${topSkill} experience. I'm targeting roles in the ${compTarget} range and interested in companies like ${companies}. Are you working on anything that could be a fit?\n\nBest,\n[Your Name]`,
        whenToUse: "When you don’t have a direct connection.",
        variables: [{ name: "[Recruiter Name]", description: "Recruiter name" }],
        successTips: ["Reference one achievement", "Keep it under 120 words"],
      },
    ],
  };
}

function safeStringify(value: unknown, maxLength = 6000) {
  try {
    const raw = JSON.stringify(value ?? {});
    if (raw.length <= maxLength) return raw;
    return `${raw.slice(0, maxLength)}...`;
  } catch {
    return "{}";
  }
}

export async function runFullAnalysis(answers: AssessmentAnswers, parsed?: ParsedData) {
  const scoreResult = computeScore(answers);
  const resumeParsed = parsed?.resumeParsedData || null;
  const linkedinParsed = parsed?.linkedinParsedData || null;

  const systemPrompt =
    "You are a senior tech career coach. Return ONLY valid JSON. Every recommendation must reference the user's real data (resume, LinkedIn, assessment).";

  const userPrompt = `
Create a complete personalization bundle for this assessment. Use the user's real data and be specific.

ASSESSMENT:
${safeStringify(answers, 4000)}

RESUME:
${safeStringify(resumeParsed, 6000)}

LINKEDIN:
${safeStringify(linkedinParsed, 4000)}

SCORES:
${safeStringify(scoreResult, 1500)}

Return JSON with this exact structure:
{
  "aiInsights": {
    "primaryGap": "",
    "primaryGapExplanation": "",
    "secondaryGap": "",
    "secondaryGapExplanation": "",
    "quickWin": "",
    "quickWinReasoning": "",
    "strengthsToLeverage": [
      { "strength": "", "evidence": "", "howToUse": "" }
    ],
    "criticalActions": [
      { "action": "", "why": "", "impact": "", "timeframe": "" }
    ],
    "companyFitAnalysis": "",
    "routeReasoning": "",
    "realityCheck": ""
  },
  "resumeAnalysis": {
    "overallScore": 0,
    "atsScore": 0,
    "issues": [
      {
        "id": "",
        "category": "Keywords",
        "severity": "HIGH",
        "issue": "",
        "location": "",
        "currentText": "",
        "suggestedFix": "",
        "reasoning": "",
        "impactScore": 0,
        "timeToFix": "",
        "stepByStepFix": [""]
      }
    ],
    "missingKeywords": [
      {
        "keyword": "",
        "importance": "high",
        "currentlyPresent": false,
        "whereToAdd": "",
        "howToAdd": "",
        "reason": ""
      }
    ],
    "weakAchievements": [
      {
        "currentText": "",
        "whyWeak": "",
        "improvedText": "",
        "metricsToAdd": "",
        "location": ""
      }
    ],
    "formatIssues": [
      { "issue": "", "fix": "", "example": "" }
    ],
    "strengthsToEmphasize": [
      { "strength": "", "currentPlacement": "", "suggestedPlacement": "", "newPhrasing": "" }
    ],
    "quickWins": [
      { "fix": "", "impact": "", "instructions": [""] }
    ]
  },
  "linkedinAnalysis": {
    "overallScore": 0,
    "headline": {
      "current": "",
      "score": 0,
      "issues": [""],
      "optimized": "",
      "keywords": [""],
      "reasoning": "",
      "alternatives": [""]
    },
    "about": {
      "current": "",
      "score": 0,
      "issues": [""],
      "optimized": "",
      "structure": {
        "paragraph1": "",
        "paragraph2": "",
        "paragraph3": "",
        "paragraph4": ""
      },
      "reasoning": "",
      "keywordsUsed": [""]
    },
    "skills": {
      "current": [""],
      "currentCount": 0,
      "score": 0,
      "toAdd": [
        { "skill": "", "reason": "", "priority": 1 }
      ],
      "toRemove": [""],
      "reorderedTop5": [""],
      "reasoning": ""
    },
    "experience": {
      "score": 0,
      "roleOptimizations": [
        { "role": "", "currentDescription": "", "optimizedDescription": "", "reasoning": "" }
      ]
    },
    "missingElements": [
      { "element": "", "importance": "HIGH", "why": "", "howToAdd": [""] }
    ],
    "comparisonWithResume": {
      "inconsistencies": [
        { "issue": "", "location": "", "fix": "" }
      ]
    },
    "actionChecklist": [
      {
        "task": "",
        "section": "",
        "timeEstimate": "",
        "priority": 1,
        "detailedSteps": [""],
        "impact": ""
      }
    ],
    "recruiterVisibility": {
      "currentEstimate": "medium",
      "afterOptimization": "high",
      "keyChanges": [""]
    }
  },
  "weeklyActionPlan": {
    "week1": {
      "title": "",
      "focusArea": "",
      "tasks": [
        {
          "id": "week1_task1",
          "task": "",
          "category": "",
          "priority": "HIGH",
          "timeEstimate": "",
          "why": "",
          "detailedSteps": [""],
          "expectedOutcome": "",
          "resources": [
            { "type": "", "description": "", "howToUse": "" }
          ],
          "successCriteria": ""
        }
      ],
      "dailyBreakdown": { "day1": ["week1_task1"] },
      "weeklyGoal": "",
      "checkpointQuestions": [""]
    },
    "week2": {
      "title": "",
      "focusArea": "",
      "tasks": [
        {
          "id": "week2_task1",
          "task": "",
          "category": "",
          "priority": "MEDIUM",
          "timeEstimate": "",
          "why": "",
          "detailedSteps": [""],
          "expectedOutcome": "",
          "resources": [
            { "type": "", "description": "", "howToUse": "" }
          ],
          "successCriteria": ""
        }
      ],
      "dailyBreakdown": { "day1": ["week2_task1"] },
      "weeklyGoal": "",
      "checkpointQuestions": [""]
    }
  },
  "companyMatches": {
    "matches": [
      {
        "company": "",
        "matchScore": 0,
        "matchBreakdown": {
          "skillMatch": 0,
          "experienceMatch": 0,
          "cultureMatch": 0,
          "compensationMatch": 0
        },
        "whyGoodFit": "",
        "matchingStrengths": [
          { "strength": "", "why": "", "howToHighlight": "" }
        ],
        "gapsToAddress": [
          { "gap": "", "importance": "HIGH", "howToFill": "", "timeframe": "" }
        ],
        "applicationStrategy": {
          "bestApproach": "",
          "reasoning": "",
          "specificSteps": [""],
          "timeline": ""
        },
        "talkingPoints": [
          { "point": "", "relevance": "", "howToFrame": "" }
        ],
        "insiderTips": [""],
        "estimatedCompensation": {
          "range": "",
          "reasoning": ""
        },
        "interviewPrep": {
          "likelyQuestions": [""],
          "howToAnswer": [""]
        }
      }
    ],
    "topMatches": [""],
    "recommendedFocus": "",
    "companyCategories": {
      "highProbability": [""],
      "mediumProbability": [""],
      "reachCompanies": [""]
    }
  },
  "personalizedScripts": {
    "scripts": [
      {
        "id": "",
        "category": "",
        "title": "",
        "description": "",
        "content": "",
        "variables": [{ "name": "", "description": "" }],
        "whenToUse": "",
        "successTips": [""]
      }
    ]
  }
}
`;

  const aiBundle = await groqChatJSON(systemPrompt, userPrompt);
  if (aiBundle) {
    return {
      aiInsights: aiBundle.aiInsights || null,
      resumeAnalysis: aiBundle.resumeAnalysis || null,
      linkedinAnalysis: aiBundle.linkedinAnalysis || null,
      companyMatches: aiBundle.companyMatches || null,
      actionPlan: aiBundle.weeklyActionPlan || null,
      personalizedScripts: aiBundle.personalizedScripts || null,
      aiModel: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      aiFailed: false,
      aiFailureReason: null,
    };
  }

  return {
    aiInsights: null,
    resumeAnalysis: analyzeResume(answers, resumeParsed),
    linkedinAnalysis: analyzeLinkedIn(answers, linkedinParsed, resumeParsed),
    companyMatches: generateCompanyMatches(answers, resumeParsed),
    actionPlan: generateActionPlan(answers),
    personalizedScripts: generateScriptFallback(answers, resumeParsed),
    aiModel: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    aiFailed: true,
    aiFailureReason: "Groq response unavailable or invalid JSON",
  };
}
