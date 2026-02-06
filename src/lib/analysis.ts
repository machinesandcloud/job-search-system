import type { AssessmentAnswers } from "@/lib/validation";
import { computeScore } from "@/lib/scoring";
import { groqChatJSON } from "@/lib/llm";
import { gatherMarketIntel } from "@/lib/market-intel";

type ParsedData = {
  resumeParsedData?: any;
  linkedinParsedData?: any;
  resumeRawText?: string | null;
  linkedinRawText?: string | null;
};

function safeStringify(value: unknown, maxLength = 6000) {
  try {
    const raw = JSON.stringify(value ?? {});
    if (raw.length <= maxLength) return raw;
    return `${raw.slice(0, maxLength)}...`;
  } catch {
    return "{}";
  }
}

function safeText(value: unknown, maxLength = 6000) {
  if (typeof value !== "string") return "";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength)}...`;
}

export async function runFullAnalysis(
  answers: AssessmentAnswers,
  parsed?: ParsedData,
  options?: { includePro?: boolean }
) {
  const scoreResult = computeScore(answers);
  const resumeParsed = parsed?.resumeParsedData || null;
  const linkedinParsed = parsed?.linkedinParsedData || null;
  const resumeRawText = parsed?.resumeRawText || null;
  const linkedinRawText = parsed?.linkedinRawText || null;
  const linkedinManual = (answers as any).linkedinManualData || null;
  const jobDescription = (answers as any).jobDescription || null;
  const targetRole = answers.targetRoles?.[0]?.name;
  if (!targetRole) {
    return {
      marketIntelligence: null,
      week1Plan: null,
      personalizationData: null,
      aiInsights: null,
      resumeAnalysis: null,
      linkedinAnalysis: null,
      companyMatches: null,
      actionPlan: null,
      personalizedScripts: null,
      coverLetterKit: null,
      interviewPrep: null,
      companyStrategies: null,
      careerAnalysis: null,
      aiModel: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      aiFailed: true,
      aiFailureReason: "Missing target role for AI analysis.",
    };
  }

  let marketIntel: any = null;
  try {
    marketIntel = await gatherMarketIntel(
      targetRole,
      (answers.targetCompanies || []).map((company) => company.name).filter(Boolean)
    );
  } catch (err: any) {
    marketIntel = null;
  }

  const systemPrompt =
    "You are a senior tech career coach with a clear niche in tech hiring. Return ONLY valid JSON. Your tone is direct, supportive, and coaching-focused. Every recommendation must reference specific evidence from the user's real data (resume, LinkedIn, assessment, market intel). Use explicit evidence strings that quote or paraphrase exact items from their resume/LinkedIn.";

  const includePro = Boolean(options?.includePro);

  const userPrompt = `
Create a complete personalization bundle for this assessment. Use the user's real data and be specific.

ASSESSMENT:
${safeStringify(answers, 4000)}

RESUME:
${safeStringify(resumeParsed, 6000)}

RESUME RAW TEXT (for evidence quotes):
${safeText(resumeRawText, 6000)}

LINKEDIN:
${safeStringify(linkedinParsed, 4000)}

LINKEDIN RAW TEXT (for evidence quotes):
${safeText(linkedinRawText, 4000)}

LINKEDIN MANUAL INPUT (if provided):
${safeStringify(linkedinManual, 3000)}

JOB DESCRIPTION (if provided):
${safeStringify(jobDescription, 4000)}

SCORES:
${safeStringify(scoreResult, 1500)}

MARKET INTEL (current):
${safeStringify(marketIntel, 6000)}

EVIDENCE RULES (MANDATORY):
- Quote or paraphrase exact resume bullets, LinkedIn headline/about lines, skills, and company targets.
- Every insight must include at least 2 evidence strings that cite real items from the resume/LinkedIn/assessment.
- Use marketIntel to add 1-2 current job-signal facts (keyword frequency, salary band, company news).
- If a job description is provided, include at least one evidence string referencing it.

RESUME ANALYSIS RULES:
- For each resume issue, set currentText to a real snippet from RESUME RAW TEXT when available.
- Missing keywords must come from marketIntel.roleKeywords where gap = true.
- Before/after must use the user's actual text, not generic placeholders.

LINKEDIN ANALYSIS RULES:
- Headline.current must match their LinkedIn headline (manual or parsed).
- About.current must reference their actual About text (manual or parsed).
- Experience optimizations must reference real roles/titles from LinkedIn or resume.

WEEK 1 REQUIREMENTS:
- Provide 15-20 ultra-detailed tasks for Week 1 (resume, LinkedIn, company research, positioning, networking)
- Each task must be actionable, specific to this user, and include clear steps + success criteria
- Each task must include: context, currentState, exactSteps, beforeAfter, template, validation, resources, successMetrics, nextSteps
- Week 2 must be a preview only for non-pro users (use week2Preview fields and set week2 to null)
- If includePro = ${includePro}, then include Week 2 full tasks (same structure as Week 1). If false, leave week2 as null.

EXECUTIVE SUMMARY REQUIREMENTS:
- Write like a real career coach: direct, supportive, and specific.
- CoachSummary should be 3-5 sentences synthesizing resume + LinkedIn + assessment + market intel.
- EvidenceHighlights must list concrete items (resume bullet, LinkedIn headline/about snippet, skills, company targets, market signals).

Return JSON with this exact structure:
{
  "aiInsights": {
    "primaryGap": "",
    "primaryGapExplanation": "",
    "primaryGapEvidence": [""],
    "secondaryGap": "",
    "secondaryGapExplanation": "",
    "secondaryGapEvidence": [""],
    "quickWin": "",
    "quickWinReasoning": "",
    "quickWinEvidence": [""],
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
      "theme": "",
      "objectives": [""],
      "totalTime": "",
      "expectedOutcomes": [""],
      "tasks": [
        {
          "id": "week1_task1",
          "day": 1,
          "title": "",
          "task": "",
          "category": "",
          "priority": "CRITICAL",
          "difficulty": "Easy",
          "timeEstimate": "",
          "order": 1,
          "context": {
            "whyNow": "",
            "impact": "HIGH",
            "marketData": ""
          },
          "currentState": {
            "issue": "",
            "location": "",
            "consequence": ""
          },
          "exactSteps": [""],
          "beforeAfter": {
            "before": "",
            "after": "",
            "improvement": ""
          },
          "template": {
            "example": ""
          },
          "validation": {
            "checkpoints": [""],
            "commonMistakes": [""]
          },
          "resources": [
            { "type": "", "title": "", "content": "" }
          ],
          "successMetrics": {
            "immediate": "",
            "shortTerm": "",
            "longTerm": ""
          },
          "nextSteps": ""
        }
      ],
      "dailyBreakdown": { "day1": ["week1_task1"] },
      "weeklyGoal": "",
      "checkpointQuestions": [""]
    },
    "week2Preview": {
      "title": "",
      "summary": "",
      "previewTasks": [""],
      "upgradeMessage": ""
    },
    "week2": ${includePro ? `{
      "title": "",
      "focusArea": "",
      "tasks": [
        {
          "id": "week2_task1",
          "day": 1,
          "title": "",
          "task": "",
          "category": "",
          "priority": "MEDIUM",
          "timeEstimate": "",
          "difficulty": "Medium",
          "order": 1,
          "context": {
            "whyNow": "",
            "impact": "MEDIUM",
            "marketData": ""
          },
          "currentState": {
            "issue": "",
            "location": "",
            "consequence": ""
          },
          "exactSteps": [""],
          "beforeAfter": {
            "before": "",
            "after": "",
            "improvement": ""
          },
          "template": {
            "example": ""
          },
          "validation": {
            "checkpoints": [""],
            "commonMistakes": [""]
          },
          "resources": [
            { "type": "", "title": "", "content": "" }
          ],
          "successMetrics": {
            "immediate": "",
            "shortTerm": "",
            "longTerm": ""
          },
          "nextSteps": ""
        }
      ],
      "dailyBreakdown": { "day1": ["week2_task1"] },
      "weeklyGoal": "",
      "checkpointQuestions": [""]
    }` : "null"}
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
  },
  "coverLetterKit": {
    "overview": "",
    "companySpecific": [
      {
        "company": "",
        "hook": "",
        "keyPoints": [""],
        "template": ""
      }
    ],
    "customizationChecklist": [""]
  },
  "interviewPrep": {
    "starStories": [
      {
        "category": "",
        "prompt": "",
        "starAnswer": {
          "situation": "",
          "task": "",
          "action": "",
          "result": ""
        },
        "fullAnswer": "",
        "whyThisWorks": ""
      }
    ],
    "technicalQuestions": [
      {
        "question": "",
        "topicArea": "",
        "suggestedApproach": "",
        "exampleAnswer": ""
      }
    ],
    "behavioralQuestions": [
      {
        "question": "",
        "whyTheyAskThis": "",
        "answerFramework": ""
      }
    ],
    "questionsToAsk": [
      {
        "question": "",
        "category": "",
        "whyAskThis": ""
      }
    ],
    "practiceSchedule": {
      "day1": "",
      "day2": "",
      "day3": "",
      "day4": "",
      "day5": "",
      "day6": "",
      "day7": ""
    }
  },
  "companyStrategies": {
    "companyStrategies": [
      {
        "company": "",
        "overallStrategy": {
          "approach": "",
          "reasoning": "",
          "estimatedSuccess": "",
          "timeline": ""
        },
        "applicationTactics": {
          "resumeCustomization": [
            {
              "section": "",
              "currentText": "",
              "customizedText": "",
              "why": ""
            }
          ],
          "coverLetterPoints": [""]
        },
        "networkingPath": {
          "whoToTarget": [
            {
              "role": "",
              "howToFind": "",
              "whatToSay": "",
              "timing": ""
            }
          ]
        },
        "interviewPrep": {
          "likelyQuestions": [""],
          "storiesToPrepare": [""]
        }
      }
    ]
  },
  "careerAnalysis": {
    "executiveSummary": {
      "coachSummary": "",
      "currentState": "",
      "targetState": "",
      "primaryChallenge": "",
      "estimatedTimeline": "",
      "confidenceLevel": "",
      "evidenceHighlights": [""]
    },
    "deepDive": {
      "strengths": [
        { "strength": "", "evidence": "", "marketValue": "", "howToLeverage": "" }
      ],
      "gaps": [
        { "gap": "", "severity": "", "impact": "", "solution": "", "timeToFill": "" }
      ],
      "redFlags": [
        { "flag": "", "likelihood": "", "howToAddress": "" }
      ]
    },
    "personalizedInsights": {
      "whyYoureCompetitive": "",
      "yourUniqueEdge": "",
      "realityCheck": "",
      "motivationalNote": ""
    }
  }
}
`;

  const aiBundle = await groqChatJSON(systemPrompt, userPrompt);
  if (!aiBundle) {
    return {
      marketIntelligence: marketIntel,
      week1Plan: null,
      personalizationData: buildPersonalizationData(answers, resumeParsed, scoreResult),
      aiInsights: null,
      resumeAnalysis: null,
      linkedinAnalysis: null,
      companyMatches: null,
      actionPlan: null,
      personalizedScripts: null,
      coverLetterKit: null,
      interviewPrep: null,
      companyStrategies: null,
      careerAnalysis: null,
      aiModel: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      aiFailed: true,
      aiFailureReason: "Groq response unavailable or invalid JSON",
    };
  }

  return {
    marketIntelligence: marketIntel,
    week1Plan: aiBundle.weeklyActionPlan
      ? { week1: aiBundle.weeklyActionPlan.week1 || null, week2Preview: aiBundle.weeklyActionPlan.week2Preview || null }
      : null,
    personalizationData: buildPersonalizationData(answers, resumeParsed, scoreResult),
    aiInsights: aiBundle.aiInsights || null,
    resumeAnalysis: aiBundle.resumeAnalysis || null,
    linkedinAnalysis: aiBundle.linkedinAnalysis || null,
    companyMatches: aiBundle.companyMatches || null,
    actionPlan: aiBundle.weeklyActionPlan || null,
    personalizedScripts: aiBundle.personalizedScripts || null,
    coverLetterKit: aiBundle.coverLetterKit || null,
    interviewPrep: aiBundle.interviewPrep || null,
    companyStrategies: aiBundle.companyStrategies || null,
    careerAnalysis: aiBundle.careerAnalysis || null,
    aiModel: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    aiFailed: false,
    aiFailureReason: null,
  };
}

function buildPersonalizationData(answers: AssessmentAnswers, resumeParsed: any, scoreResult: any) {
  const linkedinManual = (answers as any).linkedinManualData || null;
  const fullName =
    resumeParsed?.contact?.fullName ||
    resumeParsed?.personalInfo?.fullName ||
    resumeParsed?.fullName ||
    "";
  const firstName = fullName ? fullName.split(" ")[0] : "";
  return {
    firstName,
    currentTitle:
      resumeParsed?.currentRole?.title ||
      resumeParsed?.currentRole ||
      linkedinManual?.currentRole ||
      "",
    currentCompany:
      resumeParsed?.currentRole?.company ||
      resumeParsed?.currentCompany ||
      linkedinManual?.currentCompany ||
      "",
    yearsExperience: resumeParsed?.totalYearsExperience || resumeParsed?.yearsExperience || null,
    topSkill: resumeParsed?.topSkills?.[0] || "",
    targetRole: answers.targetRoles?.[0]?.name || "",
    dreamCompany: answers.targetCompanies?.[0]?.name || "",
    biggestGap: "",
    quickestWin: "",
    resumeScore: null,
    linkedinScore: null,
    readinessScore: scoreResult?.score ?? null,
  };
}
