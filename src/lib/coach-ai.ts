import type { AssessmentAnswers } from "@/lib/validation";
import { groqChatJSON, groqChatText } from "@/lib/llm";

type ParsedPayload = {
  resumeParsedData?: any;
  linkedinParsedData?: any;
};

export async function generateCoachFeedback(answers: AssessmentAnswers, parsed?: ParsedPayload) {
  const resumeParsed = parsed?.resumeParsedData || null;
  const linkedinParsed = parsed?.linkedinParsedData || null;

  const llmPrompt = `Provide brief, specific coaching insights in JSON for a ${answers.level} targeting ${answers.targetRoles
    .map((r) => r.name)
    .join(", ")}. Use resume data if present. Resume: ${JSON.stringify(resumeParsed)}. LinkedIn: ${JSON.stringify(
    linkedinParsed
  )}. Return JSON with primaryGap, secondaryGap, quickWin, weeklyPlan, companyFit, routeReasoning.`;

  const llmResponse = await groqChatJSON(
    "You are an expert tech career coach. Return valid JSON only.",
    llmPrompt
  );
  return llmResponse || null;
}

export async function generateCoachPulse(answers: AssessmentAnswers, step?: string) {
  const role = answers.targetRoles[0]?.name;
  if (!role) return null;
  const prompt = `Write a one-sentence coaching nudge for step "${step || "current"}" for a ${answers.level} targeting ${role} on a ${answers.timeline} timeline. Use their actual answers.`;
  const response = await groqChatText(
    "You are a senior tech career coach. Keep it under 25 words. Be direct and specific.",
    prompt
  );
  return response || null;
}

export async function generateAssetReview(answers: AssessmentAnswers) {
  const prompt = `Create a JSON asset review for ${answers.targetRoles[0]?.name || "DevOps Engineer"} with mustHaveKeywords, niceToHaveKeywords, missingFromYourResume, and howToAdd. Use concise, practical guidance.`;
  const response = await groqChatJSON(
    "You are a tech career coach. Return JSON only.",
    prompt
  );
  return response || null;
}
