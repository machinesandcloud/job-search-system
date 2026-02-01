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
