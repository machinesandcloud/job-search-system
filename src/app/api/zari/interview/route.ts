import { NextResponse } from "next/server";

import { requirePaidRouteAccess } from "@/lib/billing";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { buildUserContext } from "@/lib/mvp/context";
import { openaiChat } from "@/lib/openai";
import { ensureSameOrigin } from "@/lib/utils";

export const runtime     = "nodejs";
export const maxDuration = 60;

function cleanLine(value: string, max = 140) {
  const cleaned = value.replace(/\s+/g, " ").trim();
  return cleaned.length > max ? `${cleaned.slice(0, max - 1)}…` : cleaned;
}

function extractPromotionField(source: string, label: string) {
  const match = source.match(new RegExp(`${label}:\\s*([^\\n]+)`, "i"));
  return match?.[1]?.trim() ?? "";
}

function extractPromotionBlock(source: string, label: string) {
  const match = source.match(new RegExp(`${label}:\\s*([\\s\\S]*?)(?:\\n[A-Z][^\\n]+:\\s|$)`, "i"));
  return match?.[1]?.trim() ?? "";
}

function buildPromotionQuestionFallback(round: string, criteriaText: string, contextText = "", resumeText = "") {
  const currentRole = extractPromotionField(contextText, "Current role");
  const targetRole = extractPromotionField(contextText, "Target role");
  const managerSupport = extractPromotionField(contextText, "Manager support");
  const visibility = extractPromotionField(contextText, "Visibility");
  const barClarity = extractPromotionField(contextText, "Bar clarity");
  const projectSignal = cleanLine(extractPromotionBlock(contextText, "Projects and wins") || resumeText.split(/\n+/).find(line => line.trim().length > 24) || "");
  const reviewSignal = cleanLine(extractPromotionBlock(contextText, "Review notes"));
  const moveText = currentRole && targetRole ? `${currentRole} to ${targetRole}` : targetRole || "this promotion";
  const targetSignal = criteriaText.trim()
    ? "Use the pasted criteria to make each answer feel tied to the actual promotion bar."
    : "State the next-level signal directly since you do not have a fully explicit rubric.";
  const rolePrompt = moveText ? `You are trying to move from ${moveText}.` : "You are trying to make a real promotion case.";
  const projectPrompt = projectSignal ? `Your packet currently leans on work like: "${projectSignal}".` : "Your packet still needs sharper project proof.";
  const managerPrompt = managerSupport ? `You said manager support is "${managerSupport}".` : "Your manager stance is not fully clear yet.";
  const visibilityPrompt = visibility ? `You said visibility is "${visibility}".` : "Your visibility story may still be local.";
  const reviewPrompt = reviewSignal ? `Your review context currently sounds like: "${reviewSignal}".` : "Your review context still needs to do real work for the case.";
  const barPrompt = barClarity ? `You described bar clarity as "${barClarity}".` : targetSignal;

  const FALLBACKS: Record<string, { sections: { name: string; description: string; questions: { cat: string; level: string; q: string }[] }[] }> = {
    manager: {
      sections: [
        {
          name: "Your Case",
          description: "State the promotion case and why it should be believable now.",
          questions: [
            { cat: "Promotion case", level: "Readiness signal", q: `${rolePrompt} Why should I believe you are ready now instead of simply on a decent trajectory?` },
            { cat: "Scope jump", level: "Next-level scope", q: `${projectPrompt} Which part of that work already looks bigger than your current title, and how would you prove it concretely?` },
            { cat: "Timing", level: "Promotion timing", q: `${managerPrompt} Why is this the right cycle to push the ask instead of waiting for stronger proof?` },
            { cat: "Rubric", level: "Bar clarity", q: `${barPrompt} What do you think the next level actually expects, and where is your cleanest match to that bar?` },
          ],
        },
        {
          name: "Scope & Impact",
          description: "Pressure-test results, ownership, and business effect.",
          questions: [
            { cat: "Business impact", level: "Results", q: `${projectPrompt} Walk me through the strongest outcome you would want in a promotion packet. What changed because of your work?` },
            { cat: "Ownership", level: "Decision-making", q: "What did you personally own in that work that would not have happened without you?" },
            { cat: "Complexity", level: "Scope", q: `${rolePrompt} What made that work read as more complex than strong execution at your current level?` },
            { cat: "Proof gap", level: "Evidence quality", q: "If I challenged the metrics, scope, or business effect behind your best example, what proof would you actually have?" },
          ],
        },
        {
          name: "Gaps & Objections",
          description: "Handle the objections a manager is likely to raise.",
          questions: [
            { cat: "Missing proof", level: "Risk", q: "What part of your promotion case still feels weakest or easiest for someone to question?" },
            { cat: "Manager pushback", level: "Objection handling", q: "If I said you are strong but not clearly next-level yet, what would your best evidence-based response be?" },
            { cat: "Support", level: "Visibility", q: `${visibilityPrompt} Who besides your manager would need to believe the case, and do they actually see enough today?` },
          ],
        },
      ],
    },
    committee: {
      sections: [
        {
          name: "Rubric Alignment",
          description: "Map examples to next-level expectations.",
          questions: [
            { cat: "Criteria fit", level: "Rubric alignment", q: `${barPrompt} Which exact next-level expectations can you clearly prove today, and with what examples?` },
            { cat: "Edge cases", level: "Calibration risk", q: "Where would a calibration committee say your case still reads as strong current-level performance rather than a level-up?" },
            { cat: "Consistency", level: "Repeatability", q: "Is your best proof a one-off win or a repeatable pattern of next-level operating?" },
            { cat: "Comparative risk", level: "Promotion bar", q: `${rolePrompt} Why should this case survive comparison with other people being considered for the same level?` },
          ],
        },
        {
          name: "Influence & Complexity",
          description: "Defend influence, judgment, and operating range.",
          questions: [
            { cat: "Influence", level: "Cross-functional signal", q: "Where have you influenced outcomes outside your direct control in a way that reads as next-level?" },
            { cat: "Judgment", level: "Decision-making", q: "What hard tradeoff or ambiguous situation best proves the judgment expected at the next level?" },
            { cat: "Scope", level: "Complexity", q: "How large was the blast radius of your strongest work, and who cared about it?" },
            { cat: "Leadership test", level: "Organizational impact", q: `${projectPrompt} What changed in the team, system, or org because of your work rather than just in your own output?` },
          ],
        },
        {
          name: "Calibration Risks",
          description: "Expose the risks that could block the decision.",
          questions: [
            { cat: "Weakness", level: "Risk", q: "If the committee said the proof is still too thin, where would they be most justified?" },
            { cat: "Timing", level: "Readiness timing", q: "What is the honest case against promoting you this cycle?" },
            { cat: "Support", level: "Advocacy", q: `${managerPrompt} Who in the room would likely defend your case, and what would they actually say?` },
          ],
        },
      ],
    },
    sponsor: {
      sections: [
        {
          name: "Case Summary",
          description: "Make the case easy for a sponsor to repeat.",
          questions: [
            { cat: "Narrative", level: "Executive clarity", q: `${rolePrompt} Give me the 90-second version of why you are ready for the next level.` },
            { cat: "Proof", level: "Supportable evidence", q: `${projectPrompt} Which two proof points would you want me to repeat if I advocated for you when you were not in the room?` },
            { cat: "Timing", level: "Promotion timing", q: `${reviewPrompt} Why is this a timely case rather than a premature one?` },
          ],
        },
        {
          name: "Proof Points",
          description: "Surface the evidence a sponsor can safely use.",
          questions: [
            { cat: "Outcomes", level: "Business impact", q: "Which result best proves next-level impact in language a senior leader would trust immediately?" },
            { cat: "Influence", level: "Cross-functional signal", q: "Where did you create leverage beyond your own execution?" },
            { cat: "Risk", level: "Defensibility", q: "What part of the case would make an executive nervous to advocate for today?" },
          ],
        },
        {
          name: "Advocacy Ask",
          description: "Practice the actual ask without sounding vague or awkward.",
          questions: [
            { cat: "Ask", level: "Sponsor ask", q: "What exactly are you asking a sponsor to do for you?" },
            { cat: "Specificity", level: "Executive clarity", q: "How would you make that ask concrete enough that the sponsor knows how to help?" },
            { cat: "Readiness signal", level: "Trust", q: `${visibilityPrompt} What would make a sponsor feel confident you are not asking them to overreach on your behalf?` },
          ],
        },
      ],
    },
    "self-review": {
      sections: [
        {
          name: "Narrative Arc",
          description: "State the case cleanly in your own voice.",
          questions: [
            { cat: "Opening", level: "Narrative", q: `${rolePrompt} How would you open your self-review so it clearly frames next-level readiness instead of a list of tasks?` },
            { cat: "Scope", level: "Role fit", q: `${projectPrompt} Which sentence best captures how your scope has grown beyond your current title?` },
            { cat: "Impact", level: "Business outcomes", q: "Which outcome best proves the work mattered beyond effort?" },
            { cat: "Timing", level: "Forward signal", q: `${reviewPrompt} How would you explain why the next level is the right fit now?` },
          ],
        },
        {
          name: "Evidence",
          description: "Pressure-test whether the proof is concrete enough.",
          questions: [
            { cat: "Metrics", level: "Evidence quality", q: "Where is your best evidence still too vague, and how would you rewrite it?" },
            { cat: "Ownership", level: "Decision-making", q: "How would you separate your personal contribution from team effort in your strongest example?" },
            { cat: "Influence", level: "Cross-functional signal", q: `${visibilityPrompt} What example best shows influence, judgment, or leverage beyond your own output?` },
            { cat: "Weak spot", level: "Risk", q: "What part of the self-review still sounds flattering rather than provable?" },
          ],
        },
        {
          name: "Forward Signal",
          description: "Show readiness for the next level, not just strength today.",
          questions: [
            { cat: "Readiness", level: "Next-level signal", q: "What makes your case read as already operating at the next level rather than simply growing toward it?" },
            { cat: "Gaps", level: "Honesty", q: "Which gap would you acknowledge directly so the review sounds credible instead of inflated?" },
            { cat: "Ask", level: "Clarity", q: "If you had to write one sentence asking reviewers to conclude something about your readiness, what would it be?" },
          ],
        },
      ],
    },
  };

  return FALLBACKS[round] ?? FALLBACKS.manager;
}

function scoreFromAnswer(answer: string) {
  const words = answer.trim().split(/\s+/).filter(Boolean).length;
  const hasNumber = /\b\d+[%x]?\b/.test(answer);
  const hasOwnership = /\b(i|my|owned|led|drove|built|decided|influenced)\b/i.test(answer);
  const hasImpact = /\b(result|impact|reduced|increased|saved|launched|improved|grew|shipped)\b/i.test(answer);
  const score = Math.max(35, Math.min(88, 38 + Math.min(words, 180) * 0.18 + (hasNumber ? 10 : 0) + (hasOwnership ? 8 : 0) + (hasImpact ? 8 : 0)));
  return Math.round(score);
}

function isPlaceholderAnswer(answer: string) {
  const cleaned = answer.trim().toLowerCase();
  if (!cleaned) return true;
  if (cleaned.length <= 18 && /\b(idk|i don't know|dont know|don't know|not sure|no idea|n\/a|na|none|nothing)\b/.test(cleaned)) return true;
  return false;
}

function buildPromotionAnswerFallback(answer: string) {
  if (isPlaceholderAnswer(answer)) {
    return {
      overallScore: 6,
      headline: "You did not answer the question.",
      dimensions: [
        { label: "Rubric alignment", score: 5 },
        { label: "Impact proof", score: 4 },
        { label: "Scope & complexity", score: 6 },
        { label: "Influence", score: 5 },
        { label: "Executive clarity", score: 12 },
        { label: "Confidence", score: 8 },
      ],
      coachNote: `Saying "${answer.trim()}" gives the reviewer nothing to work with. In a real promotion conversation, that reads as unprepared and it makes the whole case feel thinner, because you are signaling that you cannot defend your own evidence on the spot.`,
      suggestedLabel: "How to rebuild this answer",
      suggestedResult: "Do not invent something on the fly. Pick one real project and answer with four things in order: the problem, what you owned, the decision or leverage you provided, and what changed because of it.",
    };
  }

  const fallbackScore = Math.max(18, Math.min(58, scoreFromAnswer(answer) - 10));
  const excerpt = answer.trim().replace(/\s+/g, " ").slice(0, 120);
  return {
    overallScore: fallbackScore,
    headline: excerpt.length <= 72 ? `"${excerpt}${answer.trim().length > 120 ? "…" : ""}" is still too vague to defend upward.` : "I still cannot tell what you actually owned here.",
    dimensions: [
      { label: "Rubric alignment", score: Math.max(16, fallbackScore - 5) },
      { label: "Impact proof", score: Math.max(12, fallbackScore - 9) },
      { label: "Scope & complexity", score: Math.max(14, fallbackScore - 4) },
      { label: "Influence", score: Math.max(14, fallbackScore - 6) },
      { label: "Executive clarity", score: Math.max(18, fallbackScore - 3) },
      { label: "Confidence", score: Math.max(15, fallbackScore - 4) },
    ],
    coachNote: `Right now the answer still sounds too general to defend upward. If your real answer is "${excerpt}${answer.trim().length > 120 ? "…" : ""}", I still do not know the scope you owned, what decision was actually yours, or what changed because of it.`,
    suggestedLabel: "How to tighten it",
    suggestedResult: "Re-answer it in one clean arc: name the situation, what you personally owned, the decision or leverage you provided, and the concrete outcome or consequence. If you do not have a metric, say exactly what changed and who cared.",
  };
}

function parsePromotionScoreReply(reply: string | null) {
  if (!reply) return null;
  try {
    const parsed = JSON.parse(reply) as Record<string, unknown>;
    const overallScore = typeof parsed.overallScore === "number" ? Math.max(0, Math.min(100, Math.round(parsed.overallScore))) : Number.NaN;
    const dimensions = Array.isArray(parsed.dimensions)
      ? parsed.dimensions
          .map(item => {
            if (!item || typeof item !== "object") return null;
            const label = typeof (item as { label?: unknown }).label === "string" ? String((item as { label?: unknown }).label).trim() : "";
            const rawScore = typeof (item as { score?: unknown }).score === "number" ? Number((item as { score?: unknown }).score) : Number.NaN;
            return label && Number.isFinite(rawScore) ? { label, score: Math.max(0, Math.min(100, Math.round(rawScore))) } : null;
          })
          .filter(Boolean)
      : [];
    const coachNote = typeof parsed.coachNote === "string" ? parsed.coachNote.trim() : "";
    const suggestedResult = typeof parsed.suggestedResult === "string" ? parsed.suggestedResult.trim() : "";
    const headline = typeof parsed.headline === "string" ? parsed.headline.trim() : "";
    const suggestedLabel = typeof parsed.suggestedLabel === "string" ? parsed.suggestedLabel.trim() : "";

    if (!Number.isFinite(overallScore) || !coachNote || !suggestedResult || !dimensions.length) return null;
    return { overallScore, dimensions, coachNote, suggestedResult, headline, suggestedLabel };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!ensureSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const body = await request.json().catch(() => ({})) as {
    action?: "generate-questions" | "score-answer";
    question?: string;
    answer?: string;
    stage?: string;
    category?: string;
    round?: string;
    resumeText?: string;
    jobDescription?: string;
    criteriaText?: string;
    contextText?: string;
  };

  const action = body.action ?? "score-answer";
  const stage  = body.stage ?? "job-search";
  const round  = body.round ?? "hiring-manager";
  const access = await requirePaidRouteAccess("zari_interview", { stage, action }, { stage });
  if (!access.ok) return access.response;

  const userId = await getCurrentUserId();
  let userContext = "";
  if (userId) {
    try { userContext = await buildUserContext(userId); } catch { /* non-fatal */ }
  }

  /* ── Generate questions by round and section ── */
  if (action === "generate-questions") {
    const resumeText     = (body.resumeText     ?? "").trim();
    const jobDescription = (body.jobDescription ?? "").trim();
    const criteriaText   = (body.criteriaText   ?? "").trim();
    const contextText    = (body.contextText    ?? "").trim();

    if (stage === "promotion") {
      const PROMOTION_SECTIONS: Record<string, { sections: { name: string; description: string; count: number }[] }> = {
        manager: { sections: [
          { name:"Your Case", description:"Frame the ask and why you're already operating at the next level", count:4 },
          { name:"Scope & Impact", description:"Pressure-test business outcomes, complexity, and ownership", count:4 },
          { name:"Gaps & Objections", description:"Handle missing proof, timing concerns, or manager pushback", count:3 },
        ]},
        committee: { sections: [
          { name:"Rubric Alignment", description:"Map concrete examples to next-level criteria", count:4 },
          { name:"Influence & Complexity", description:"Defend cross-functional leadership, judgment, and scale", count:4 },
          { name:"Calibration Risks", description:"Answer skepticism, comparison, or 'not yet' objections", count:3 },
        ]},
        sponsor: { sections: [
          { name:"Case Summary", description:"Explain the case crisply enough for an executive to repeat it", count:3 },
          { name:"Proof Points", description:"Surface the evidence a sponsor can actually advocate with", count:3 },
          { name:"Advocacy Ask", description:"Make the sponsorship request direct, specific, and low-drama", count:3 },
        ]},
        "self-review": { sections: [
          { name:"Narrative Arc", description:"State what changed, why it matters, and why now", count:4 },
          { name:"Evidence", description:"Back your claims with outcomes, scale, and stakeholder impact", count:4 },
          { name:"Forward Signal", description:"Show readiness for the next level, not just strong current-level work", count:3 },
        ]},
      };

      const roundConfig = PROMOTION_SECTIONS[round] ?? PROMOTION_SECTIONS.manager;
      const roomLens =
        round === "committee"
          ? "You are speaking as a calibration committee member who compares this person against the actual next-level bar, not against effort or popularity."
          : round === "sponsor"
            ? "You are speaking as a sponsor or skip-level leader deciding whether this case is strong enough to repeat upward and spend political capital on."
            : round === "self-review"
              ? "You are speaking as the reviewer shaping a self-review narrative into something a manager and committee would actually believe."
              : "You are speaking as the person's real direct manager deciding whether to back this promotion now, delay it, or push for more proof.";

      const systemPrompt = `You are Zari. Generate promotion-practice questions organized by section for a ${round.replace("-", " ")} conversation.

${roomLens}

${userContext ? `What you know about them:\n${userContext}\n\n` : ""}
${resumeText   ? `Promotion evidence and recent wins:\n${resumeText.slice(0, 2500)}\n\n` : ""}
${criteriaText ? `Next-level criteria / rubric:\n${criteriaText.slice(0, 1800)}\n\n` : ""}
${contextText  ? `Promotion context:\n${contextText.slice(0, 1000)}\n\n` : ""}

Return ONLY valid JSON:
{
  "sections": [
    {
      "name": "<section name>",
      "description": "<what this section tests — 1 sentence>",
      "questions": [
        {
          "cat": "<specific topic>",
          "level": "<target level or next-level signal>",
          "q": "<the question>",
          "testing": "<what next-level signal this question probes — 1 crisp sentence>",
          "strongLooks": "<what a strong answer looks like in this promotion context — 1 sentence>",
          "commonMistake": "<the most common mistake candidates make answering this — 1 sentence>"
        }
      ]
    }
  ]
}

Sections to generate (in this order):
${roundConfig.sections.map(s => `- "${s.name}" (${s.count} questions): ${s.description}`).join("\n")}

Rules:
- This is a promotion conversation, not a job interview. Never mention recruiters, job descriptions, or job search language.
- Questions must test next-level scope, business impact, influence, judgment, and promotion readiness.
- Treat the full packet as real context. Use the promotion move, rubric, projects, review context, manager support, visibility, and blockers when forming the questions.
- Reference actual evidence, projects, stakeholders, or themes from their material whenever possible.
- Assume you have already read their packet. Do not ask them to restate obvious facts unless you are challenging or pressure-testing them.
- Each question should either pressure-test a specific claim from the packet or go straight at a missing proof gap.
- Include at least one hard question per section that exposes a weak metric, unclear scope jump, weak sponsorship, or timing risk.
- Ask like a real person in that room would: direct, skeptical when needed, specific, and slightly uncomfortable when the proof is weak.
- If the user gave vague evidence, ask questions that expose the vagueness instead of filling gaps for them.
- Do not ask generic filler like "tell me about yourself" or "why do you deserve this promotion?" unless the material clearly justifies a sharper version of it.
- "level" should describe the next-level signal being tested, not generic seniority labels unless the target level is explicit.`;

      const reply = await openaiChat(
        [
          { role: "system" as const, content: systemPrompt },
          { role: "user" as const, content: "Generate my promotion-practice questions by section." },
        ],
        { model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o", temperature: 0.4, maxTokens: 2400, jsonMode: true }
      );

      const parsePromotionSections = (raw: string | null) => {
        if (!raw) return null;
        try {
          const parsed = JSON.parse(raw) as { sections?: Array<{ name?: unknown; description?: unknown; questions?: Array<{ cat?: unknown; level?: unknown; q?: unknown; testing?: unknown; strongLooks?: unknown; commonMistake?: unknown }> }> };
          const sections = Array.isArray(parsed.sections)
            ? parsed.sections
                .map(section => {
                  const name = typeof section.name === "string" ? section.name.trim() : "";
                  const description = typeof section.description === "string" ? section.description.trim() : "";
                  const questions = Array.isArray(section.questions)
                    ? section.questions
                        .map(question => ({
                          cat: typeof question.cat === "string" ? question.cat.trim() : "",
                          level: typeof question.level === "string" ? question.level.trim() : "",
                          q: typeof question.q === "string" ? question.q.trim() : "",
                          testing: typeof question.testing === "string" ? question.testing.trim() : undefined,
                          strongLooks: typeof question.strongLooks === "string" ? question.strongLooks.trim() : undefined,
                          commonMistake: typeof question.commonMistake === "string" ? question.commonMistake.trim() : undefined,
                        }))
                        .filter(question => question.cat && question.level && question.q)
                    : [];
                  return name && description && questions.length ? { name, description, questions } : null;
                })
                .filter(Boolean)
            : [];
          return sections.length ? { sections } : null;
        } catch {
          return null;
        }
      };

      let parsed = parsePromotionSections(reply);
      if (!parsed) {
        const repair = await openaiChat(
          [
            {
              role: "system" as const,
              content: `${systemPrompt}

Your previous attempt was missing structure or too generic.

Repair instructions:
- Return valid JSON only.
- Every section must include the requested number of questions.
- Ground the questions in the actual promotion packet, not generic promotion advice.
- If the packet is weak, make the questions sharper and more skeptical rather than broader.`,
            },
            {
              role: "user" as const,
              content: `SOURCE MATERIAL:
Resume evidence:
${resumeText || "(none provided)"}

Criteria:
${criteriaText || "(none provided)"}

Promotion context:
${contextText || "(none provided)"}

Previous draft:
${reply || "(no draft)"}`,
            },
          ],
          { model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o", temperature: 0.28, maxTokens: 2600, jsonMode: true }
        );
        parsed = parsePromotionSections(repair);
      }

      return NextResponse.json(parsed ?? buildPromotionQuestionFallback(round, criteriaText, contextText, resumeText));
    }

    const ROUND_SECTIONS: Record<string, { sections: { name: string; description: string; count: number }[] }> = {
      "recruiter": { sections: [
        { name:"Background & Motivation", description:"Why you're making this move and what drives you", count:5 },
        { name:"Logistics & Expectations",description:"Salary, timeline, location, and role logistics",   count:4 },
      ]},
      "hiring-manager": { sections: [
        { name:"Behavioral",              description:"Past situations that reveal how you work",                 count:6 },
        { name:"Leadership & Influence",  description:"How you lead, influence, and navigate org dynamics",      count:5 },
        { name:"Situational Judgment",    description:"How you'd handle specific scenarios in this role",        count:4 },
      ]},
      "technical": { sections: [
        { name:"Technical Depth",         description:"Core technical knowledge required for the role",          count:5 },
        { name:"Problem Solving",         description:"Approach to ambiguous or complex technical challenges",   count:4 },
        { name:"Domain Knowledge",        description:"Industry and domain-specific expertise",                  count:4 },
      ]},
      "panel": { sections: [
        { name:"Behavioral",              description:"Stories that show how you operate and handle challenges",  count:4 },
        { name:"Technical",               description:"Role-specific technical depth and credibility",           count:4 },
        { name:"Strategic Thinking",      description:"How you think about the bigger picture and long-term",    count:3 },
        { name:"Culture & Values",        description:"How you collaborate, communicate, and fit the team",      count:3 },
      ]},
    };

    const roundConfig = ROUND_SECTIONS[round] ?? ROUND_SECTIONS["hiring-manager"];

    const systemPrompt = `You are Zari, a sharp career coach. Generate interview questions organized by section for a ${round.replace("-"," ")} interview.

${userContext ? `What you know about them:\n${userContext}\n\n` : ""}
${resumeText     ? `Candidate background:\n${resumeText.slice(0, 2500)}\n\n`        : ""}
${jobDescription ? `Job they're targeting:\n${jobDescription.slice(0, 1500)}\n\n` : ""}

Return ONLY valid JSON:
{
  "sections": [
    {
      "name": "<section name>",
      "description": "<what this section tests — 1 sentence>",
      "questions": [
        {
          "cat": "<specific topic>",
          "level": "<seniority or type>",
          "q": "<the question>",
          "testing": "<what this question specifically tests — 1 crisp sentence, e.g. 'Whether you can quantify impact beyond effort'>",
          "strongLooks": "<what a strong answer looks like — 1 sentence on what signals excellence>",
          "commonMistake": "<the most common mistake candidates make on this question — 1 sentence>"
        }
      ]
    }
  ]
}

Sections to generate (in this order):
${roundConfig.sections.map(s => `- "${s.name}" (${s.count} questions): ${s.description}`).join("\n")}

Rules:
- Every question must be specific to this person's actual background — reference real companies, roles, technologies, or experiences from their resume
- Questions must match the seniority and domain of the target job, NOT generic textbook questions
- For behavioral sections, use STAR-probing language ("Tell me about a time…", "Walk me through…", "Give me a specific example…")
- For technical sections, ask about tools/technologies mentioned in BOTH the resume and job description
- Include at least one tough or challenging question per section (gap, failure, conflict, or hard tradeoff)
- Level field should match the actual role seniority (e.g. "Senior", "Manager", "IC", "Director")
- Write questions as a real hiring manager would — direct, no preamble, no softening
- testing, strongLooks, commonMistake must be specific to THIS question — never generic coaching platitudes`;

    const reply = await openaiChat(
      [
        { role: "system" as const, content: systemPrompt },
        { role: "user"   as const, content: "Generate my personalized interview questions by section." },
      ],
      { model: process.env.OPENAI_MODEL ?? "gpt-4o-mini", temperature: 0.55, maxTokens: 2500, jsonMode: true }
    );

    if (!reply) return NextResponse.json({ error: "Could not generate questions" }, { status: 503 });

    try {
      const parsed = JSON.parse(reply) as { sections?: Array<{ name?: string; description?: string; questions?: Array<{ cat?: string; level?: string; q?: string; testing?: string; strongLooks?: string; commonMistake?: string }> }> };
      // Pass through extra fields (testing, strongLooks, commonMistake) from each question
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({ error: "Could not parse questions" }, { status: 500 });
    }
  }

  /* ── Score an answer ── */
  const question = (body.question ?? "").trim();
  const answer = (body.answer ?? "").trim();
  const category = body.category ?? "";
  const resumeText = (body.resumeText ?? "").trim();
  const jobDescription = (body.jobDescription ?? "").trim();
  const criteriaText = (body.criteriaText ?? "").trim();
  const contextText = (body.contextText ?? "").trim();

  if (!question || !answer) {
    return NextResponse.json({ error: "Question and answer required" }, { status: 400 });
  }

  if (stage === "promotion") {
    const roleLens =
      round === "committee"
        ? "React like a calibration committee member comparing the answer to the real next-level bar."
        : round === "sponsor"
          ? "React like a sponsor deciding whether this answer is strong enough to repeat upward."
          : round === "self-review"
            ? "React like a reviewer deciding whether this language sounds credible in a self-review packet."
            : "React like the person's actual manager deciding whether this answer would make you more or less willing to back the promotion.";

    const systemPrompt = `You are Zari. Score this promotion answer based on whether it would actually strengthen a manager or committee case.

${roleLens}

${userContext ? `What you know about this person:\n${userContext}\n\n` : ""}
${resumeText ? `Promotion evidence and wins:\n${resumeText.slice(0, 1800)}\n\n` : ""}
${criteriaText ? `Next-level rubric / criteria:\n${criteriaText.slice(0, 1200)}\n\n` : ""}
${contextText ? `Promotion context:\n${contextText.slice(0, 800)}\n\n` : ""}

Return ONLY a valid JSON object:
{
  "overallScore": <number 0-100>,
  "headline": "<1 short sentence that bluntly captures how this answer lands>",
  "dimensions": [
    { "label": "Rubric alignment", "score": <number 0-100> },
    { "label": "Impact proof", "score": <number 0-100> },
    { "label": "Scope & complexity", "score": <number 0-100> },
    { "label": "Influence", "score": <number 0-100> },
    { "label": "Executive clarity", "score": <number 0-100> },
    { "label": "Confidence", "score": <number 0-100> }
  ],
  "coachNote": "<2-4 sentences in a human, direct voice. Sound like a real manager or reviewer reacting to the answer in the room. Say what landed, what felt weak, and what proof is still missing. Reference specifics from their answer.>",
  "suggestedLabel": "<either How I'd say it instead or How to rebuild this answer>",
  "suggestedResult": "<a tighter, stronger version of the answer they could say verbatim in the promotion conversation, or a direct rebuild instruction if the answer is too empty to rewrite honestly>"
}

Scoring rules:
- Be blunt. Most answers should land between 45 and 80, not 90+.
- Penalize vague scope, fuzzy ownership, missing metrics, unclear next-level signal, or generic leadership claims.
- If this is a manager-track answer without real people leadership, delegation, coaching, or cross-functional leadership proof, score it hard.
- If the answer sounds like strong current-level execution rather than next-level behavior, score it down.
- Reward concrete business impact, expanded scope, cross-functional influence, and crisp framing.
- If the answer dodges the question, say so plainly.
- If the answer is basically "I don't know", "not sure", or another placeholder, score it extremely low and say directly that they did not answer the question.
- The "coachNote" should not sound like a generic coach. It should sound like a smart blunt human who has to decide whether this case is credible.
- The suggestedResult should sound like a stronger version of them, not generic executive-speak.
- "headline" must be custom to the answer. Do not use a generic heading that could fit any weak answer.
- Stage: ${stage} · Mode: ${round} · Category: ${category}`;

    const reply = await openaiChat(
      [
        { role: "system" as const, content: systemPrompt },
        { role: "user" as const, content: `Question: ${question}\n\nAnswer: ${answer}` },
      ],
      {
        model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
        temperature: 0.3,
        maxTokens: 700,
        jsonMode: true,
      }
    );

    let parsed = parsePromotionScoreReply(reply);
    const placeholder = isPlaceholderAnswer(answer);
    const looksTooGeneric = parsed
      ? (!parsed.coachNote.toLowerCase().includes(answer.trim().toLowerCase()) &&
          !parsed.coachNote.toLowerCase().includes("you did not answer") &&
          !parsed.coachNote.toLowerCase().includes("don't know") &&
          parsed.coachNote.length < 260)
      : true;
    const placeholderMismatch = Boolean(parsed && placeholder && parsed.overallScore > 18);

    if (!parsed || looksTooGeneric || placeholderMismatch) {
      const repair = await openaiChat(
        [
          {
            role: "system" as const,
            content: `${systemPrompt}

Your previous attempt was missing structure, too generic, or too forgiving.

Repair rules:
- If the answer is empty, placeholder-like, or basically "I don't know", say that plainly.
- The coach note must explicitly reference the actual answer or quote it.
- Do not imply there is usable signal when there is not.
- If the answer is too weak to rewrite honestly, use suggestedLabel = "How to rebuild this answer" and explain what the user should gather before trying again.
- Return valid JSON only.`,
          },
          {
            role: "user" as const,
            content: `Question: ${question}\n\nAnswer: ${answer}\n\nPrevious draft:\n${reply || "(no draft)"}`,
          },
        ],
        {
          model: process.env.OPENAI_MODEL_QUALITY ?? process.env.OPENAI_MODEL ?? "gpt-4o",
          temperature: 0.22,
          maxTokens: 850,
          jsonMode: true,
        }
      );
      parsed = parsePromotionScoreReply(repair);
    }

    return NextResponse.json(parsed ?? buildPromotionAnswerFallback(answer));
  }

  const systemPrompt = `You are Zari, a career coach who feels like a sharp, honest friend. Score this interview answer and give feedback that's real and actionable — not generic coaching-speak.

${userContext ? `What you know about this person:\n${userContext}\n\n` : ""}
${resumeText ? `Their resume:\n${resumeText.slice(0, 1500)}\n\n` : ""}
${jobDescription ? `Role they're interviewing for:\n${jobDescription.slice(0, 800)}\n\n` : ""}

Return ONLY a valid JSON object:
{
  "overallScore": <number 0-100>,
  "dimensions": [
    { "label": "STAR Structure",    "score": <number 0-100> },
    { "label": "Evidence",          "score": <number 0-100> },
    { "label": "Impact clarity",    "score": <number 0-100> },
    { "label": "Concision",         "score": <number 0-100> },
    { "label": "Leadership signal", "score": <number 0-100> },
    { "label": "Stakeholder lens",  "score": <number 0-100> }
  ],
  "coachNote": "<2-3 sentences in a warm, direct voice — name what landed, what's missing, what to do about it. Refer to specific things they said.>",
  "suggestedResult": "<a complete, specific Result statement they could say verbatim in the interview>"
}

Scoring rules:
- Be honest — most answers score 55-80, not 90+
- The Result is almost always the weakest — if they didn't give a number or specific outcome, call it out
- coachNote must reference something specific they said (quote it if useful)
- suggestedResult should sound like them, just sharper
- Stage: ${stage} · Category: ${category}`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: `Question: ${question}\n\nAnswer: ${answer}` },
  ];

  const reply = await openaiChat(messages, {
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.3,
    maxTokens: 700,
    jsonMode: true,
  });

  if (!reply) return NextResponse.json({ error: "Scoring failed — try again" }, { status: 503 });

  try {
    return NextResponse.json(JSON.parse(reply));
  } catch {
    return NextResponse.json({ error: "Could not parse scoring" }, { status: 500 });
  }
}
