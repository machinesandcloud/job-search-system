import type { AssessmentAnswers } from "@/lib/validation";
import { computeScore } from "@/lib/scoring";
import { groqChatJSON } from "@/lib/llm";
import { gatherMarketIntel } from "@/lib/market-intel";

type ParsedData = {
  resumeParsedData?: any;
  linkedinParsedData?: any;
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

export async function runFullAnalysis(answers: AssessmentAnswers, parsed?: ParsedData) {
  const scoreResult = computeScore(answers);
  const resumeParsed = parsed?.resumeParsedData || null;
  const linkedinParsed = parsed?.linkedinParsedData || null;
  const targetRole = answers.targetRoles?.[0]?.name;
  if (!targetRole) {
    return {
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
    return {
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
      aiFailureReason: err?.message || "Market intelligence unavailable.",
    };
  }

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

MARKET INTEL (current):
${safeStringify(marketIntel, 6000)}

WEEK 1 REQUIREMENTS:
- Provide 15-20 ultra-detailed tasks for Week 1 (resume, LinkedIn, company research, positioning, networking)
- Each task must be actionable, specific to this user, and include clear steps + success criteria
- Week 2 must be a preview only for non-pro users (use week2Preview fields)

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
    "week2Preview": {
      "title": "",
      "summary": "",
      "previewTasks": [""],
      "upgradeMessage": ""
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
      "currentState": "",
      "targetState": "",
      "primaryChallenge": "",
      "estimatedTimeline": "",
      "confidenceLevel": ""
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
