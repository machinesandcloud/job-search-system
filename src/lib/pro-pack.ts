import type { AssessmentAnswers } from "./validation";
import { groqChatJSON } from "@/lib/llm";

export async function buildProPack(answers: AssessmentAnswers) {
  const prompt = `
Create Pro Pack content using ONLY the candidate's assessment data. Return JSON with:
{
  "topCompanies": [{ "name": "", "logoUrl": "", "whyGoodFit": "", "roleTypes": [""], "avgComp": "", "keyContacts": "", "researchNotes": "", "applicationStrategy": "", "interviewProcess": "" }],
  "atsKeywords": { "role": "", "mustHaveKeywords": [""], "niceToHaveKeywords": [""], "missingFromYourResume": [""], "howToAdd": "" },
  "scripts": {
    "referralAsk": "",
    "recruiterOutreach": "",
    "followUpSequence": [""]
  },
  "interviewPrep": [""],
  "negotiation": { "anchor": "", "counter": "", "email": "" }
}

ASSESSMENT:
${JSON.stringify(answers)}

Be specific to their target roles, companies, timeline, and comp target.`;

  const response = await groqChatJSON(
    "You are an expert career coach. Return ONLY valid JSON.",
    prompt
  );
  return response || null;
}
