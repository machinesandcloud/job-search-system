import type { LeadAnswers } from "@/lib/validation";

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";

export async function generateCoachFeedback(answers: LeadAnswers) {
  if (!apiKey) return null;
  const prompt = `You are a senior career coach. Write a concise, specific, encouraging coach note (4-6 sentences) based on the user's inputs. Use direct "you" language, mention their role, timeline, hours/week, and one constraint or blocker if present. Include a one‑sentence overview of the plan (week 1 focus). End with a clear first focus area. Keep it under 140 words.

Inputs:
Role(s): ${answers.roles.join(", ")}
Level: ${answers.level}
Current title: ${answers.currentTitle || "N/A"}
Experience: ${answers.experienceYears} years
Leadership scope: ${answers.leadershipScope}
Comp target: ${answers.compTarget} (${answers.compensationPriority})
Timeline: ${answers.timeline}
Location: ${answers.locationType} ${answers.city || ""}
Industry: ${answers.targetIndustry}
Company stage: ${answers.companyStage}
Hours/week: ${answers.hoursPerWeek}
Assets: resume ${answers.assets.resume}, LinkedIn ${answers.assets.linkedin}, interview ${answers.assets.interview}, portfolio ${answers.assets.portfolio}
Network: ${answers.networkStrength}, outreach comfort ${answers.outreachComfort}
Constraints: ${(answers.constraints || []).join(", ") || "None"}
Biggest blocker: ${answers.biggestBlocker}${answers.blockerNote ? ` (${answers.blockerNote})` : ""}
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 220,
          },
        }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("")
      .trim();
    return text ? text.slice(0, 1000) : null;
  } catch {
    return null;
  }
}

export async function generateCoachPulse(answers: LeadAnswers, step?: string) {
  if (!apiKey) return null;
  const prompt = `You are a senior career coach. Write a short, conversational pulse (1-2 sentences) reacting to the user's inputs so far. Mention their role, timeline, and one priority. End with a gentle prompt for the current step: ${step || "next step"}. Keep it under 40 words.

Inputs:
Role(s): ${answers.roles.join(", ")}
Level: ${answers.level}
Timeline: ${answers.timeline}
Hours/week: ${answers.hoursPerWeek}
Constraints: ${(answers.constraints || []).join(", ") || "None"}
Biggest blocker: ${answers.biggestBlocker}${answers.blockerNote ? ` (${answers.blockerNote})` : ""}
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 120,
          },
        }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("")
      .trim();
    return text ? text.slice(0, 220) : null;
  } catch {
    return null;
  }
}

export async function generateAssetReview(answers: LeadAnswers) {
  if (!apiKey) return null;
  const prompt = `You are a senior career coach and recruiter. Review the user's resume notes and LinkedIn details and provide:
1) 2-3 specific resume improvements,
2) 2-3 specific LinkedIn improvements,
3) one credibility gap to close,
4) one immediate action for this week.
Keep it concise and supportive. Use bullets. If inputs are missing, mention what to add.

Role: ${answers.roles.join(", ")}
Level: ${answers.level}
Timeline: ${answers.timeline}
Resume notes: ${answers.resumeText || "Not provided"}
LinkedIn headline: ${answers.linkedinHeadline || "Not provided"}
LinkedIn summary: ${answers.linkedinSummary || "Not provided"}
LinkedIn URL: ${answers.linkedinUrl || "Not provided"}
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 320,
          },
        }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("")
      .trim();
    return text ? text.slice(0, 1500) : null;
  } catch {
    return null;
  }
}
