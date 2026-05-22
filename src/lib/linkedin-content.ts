import { openaiChat } from "@/lib/openai";

export type PostType = "career_tip" | "linkedin_stat" | "job_market" | "interview_tip";

export interface PostContent {
  type: PostType;
  cardHeadline: string;
  cardSubtext: string;
  postText: string;
}

// Mon=career_tip, Tue=linkedin_stat, Wed=career_tip, Thu=interview_tip, Fri=job_market
const TYPE_BY_DAY: Record<number, PostType> = {
  1: "career_tip",
  2: "linkedin_stat",
  3: "career_tip",
  4: "interview_tip",
  5: "job_market",
};

export function getPostTypeForToday(): PostType {
  return TYPE_BY_DAY[new Date().getDay()] ?? "career_tip";
}

const PROMPTS: Record<PostType, string> = {
  career_tip: `You write LinkedIn posts for Zari, an AI career coaching platform (zaricoach.com).

Voice: direct, confident, practical — like a smart friend who knows hiring inside out. Zero fluff. No "game-changer" or "hustle" language.
Audience: job seekers, career changers, ambitious professionals.

Generate a specific, non-generic career tip post. Return ONLY valid JSON:
{
  "cardHeadline": "<punchy 5-8 word hook for the visual card>",
  "cardSubtext": "<one sentence expanding on it, max 15 words>",
  "postText": "<full LinkedIn post: strong hook line, 3-4 concrete tips or short paragraphs, CTA. 180-250 words. Use line breaks. End with: Try Zari free → zaricoach.com and 4-5 relevant hashtags>"
}`,

  linkedin_stat: `You write LinkedIn posts for Zari, an AI career coaching platform (zaricoach.com).

Voice: data-driven, surprising, scroll-stopping. Lead with a real or realistic stat.
Audience: job seekers, professionals optimizing their LinkedIn presence.

Generate a LinkedIn/hiring stat post. Return ONLY valid JSON:
{
  "cardHeadline": "<the stat or data point in 6-10 words, e.g. '87% of recruiters check LinkedIn before interviews'>",
  "cardSubtext": "<what smart job seekers should do about it, max 15 words>",
  "postText": "<full LinkedIn post: open with the stat, explain why it matters, 2-3 actionable takeaways, CTA. 150-200 words. End with: Optimize your LinkedIn free → zaricoach.com and 4-5 hashtags>"
}`,

  job_market: `You write LinkedIn posts for Zari, an AI career coaching platform (zaricoach.com).

Voice: insightful, forward-looking, grounded. Focus on real hiring trends or job market shifts.
Audience: professionals navigating the current job market.

Generate a job market insight post. Return ONLY valid JSON:
{
  "cardHeadline": "<a trend or insight in 6-9 words>",
  "cardSubtext": "<what job seekers should do about it, max 15 words>",
  "postText": "<full LinkedIn post: key market insight, why it matters now, 3 concrete actions job seekers can take, CTA. 150-200 words. End with: Get your AI career plan → zaricoach.com and 4-5 hashtags>"
}`,

  interview_tip: `You write LinkedIn posts for Zari, an AI career coaching platform (zaricoach.com).

Voice: conversational, confidence-boosting, tactical. Specific and surprising — not generic advice.
Audience: professionals preparing for job interviews.

Generate a non-obvious interview prep post. Return ONLY valid JSON:
{
  "cardHeadline": "<specific interview tip in 5-8 words>",
  "cardSubtext": "<why this works, max 15 words>",
  "postText": "<full LinkedIn post: surprising interview insight, a concrete example or short script, 3 quick tactical tips, CTA. 160-220 words. End with: Practice with Zari's AI coach → zaricoach.com and 4-5 hashtags>"
}`,
};

export async function generatePostContent(type: PostType): Promise<PostContent> {
  const reply = await openaiChat(
    [
      { role: "system", content: PROMPTS[type] },
      {
        role: "user",
        content:
          "Generate a fresh post. Be concrete and specific — avoid overused phrases. Make the hook impossible to scroll past.",
      },
    ],
    {
      model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
      temperature: 0.85,
      maxTokens: 900,
      jsonMode: true,
      usageFeature: "linkedin_post_generation",
    }
  );

  if (!reply) throw new Error("LinkedIn content generation failed");

  const parsed = JSON.parse(reply) as Partial<PostContent>;
  return {
    type,
    cardHeadline: parsed.cardHeadline ?? "Career Insight",
    cardSubtext: parsed.cardSubtext ?? "",
    postText: parsed.postText ?? "",
  };
}
