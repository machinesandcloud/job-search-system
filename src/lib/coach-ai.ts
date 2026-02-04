import type { AssessmentAnswers } from "@/lib/validation";
import { computeScore } from "@/lib/scoring";

const ROLE_KEYWORDS: Record<string, { must: string[]; nice: string[] }> = {
  "DevOps Engineer": {
    must: ["CI/CD", "Docker", "Kubernetes", "AWS", "Terraform", "Monitoring", "Automation"],
    nice: ["Ansible", "Prometheus", "Helm", "GitLab CI", "Observability"],
  },
  "Site Reliability Engineer": {
    must: ["Reliability", "SLO/SLA", "Incident response", "Kubernetes", "Monitoring", "Automation"],
    nice: ["Chaos engineering", "Prometheus", "Grafana", "Python", "Go"],
  },
  "Platform Engineer": {
    must: ["Platform", "Kubernetes", "Infrastructure", "CI/CD", "Terraform", "Developer experience"],
    nice: ["Helm", "ArgoCD", "Internal tools", "Service catalog"],
  },
  "Engineering Manager": {
    must: ["People management", "Delivery", "Hiring", "Roadmaps", "Execution"],
    nice: ["Stakeholder management", "Metrics", "Cross-functional leadership"],
  },
  "Director of Engineering": {
    must: ["Org leadership", "Strategy", "Scaling teams", "Hiring", "Execution"],
    nice: ["Budgeting", "Cross-org alignment", "Operating cadence"],
  },
  "Senior Backend Engineer": {
    must: ["APIs", "Databases", "Distributed systems", "Performance", "Testing"],
    nice: ["System design", "Caching", "Observability", "Go/Java/Node"],
  },
  "Senior Frontend Engineer": {
    must: ["React", "TypeScript", "Performance", "Accessibility", "Design systems"],
    nice: ["Next.js", "Testing", "Animation", "SEO"],
  },
  "Staff Engineer": {
    must: ["System design", "Technical leadership", "Mentoring", "Architecture"],
    nice: ["Cross-team alignment", "RFCs", "Platform strategy"],
  },
  "Principal Engineer": {
    must: ["Architecture", "Influence", "Cross-org impact", "System design"],
    nice: ["Operating model", "Platform vision", "Risk management"],
  },
  "Cloud Architect": {
    must: ["AWS/Azure/GCP", "Networking", "Security", "Infrastructure", "Architecture"],
    nice: ["Cost optimization", "Governance", "IaC"],
  },
};

function pickRoleKeywords(answers: AssessmentAnswers) {
  const roleName = answers.targetRoles[0]?.name || "DevOps Engineer";
  return ROLE_KEYWORDS[roleName] || ROLE_KEYWORDS["DevOps Engineer"];
}

function buildWeeklyPlan(answers: AssessmentAnswers) {
  const role = answers.targetRoles[0]?.name || "your target role";
  const companies = answers.targetCompanies.slice(0, 6).map((c) => c.name);
  const companyList = companies.length ? companies.join(", ") : "your top companies";
  return {
    week1: [
      `Refine LinkedIn headline to match ${role} keywords.`,
      `Build a 20-company target list including ${companyList}.`,
      "Draft 3 outreach scripts (referral ask, recruiter opener, follow-up).",
    ],
    week2: [
      "Customize your resume for your top 5 roles.",
      "Send 10 warm connection requests with personalized notes.",
      "Apply to 3 high-fit roles using tailored materials.",
    ],
  };
}

type ParsedPayload = {
  resumeParsedData?: any;
  linkedinParsedData?: any;
};

async function tryFreeLlm(prompt: string) {
  const endpoint = process.env.OLLAMA_URL || process.env.FREE_LLM_URL;
  const model = process.env.OLLAMA_MODEL || process.env.FREE_LLM_MODEL;
  if (!endpoint || !model) return null;
  try {
    const res = await fetch(`${endpoint}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt, stream: false }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.response as string;
  } catch {
    return null;
  }
}

export async function generateCoachFeedback(answers: AssessmentAnswers, parsed?: ParsedPayload) {
  const { score, subscores, route } = computeScore(answers);
  const resumeParsed = parsed?.resumeParsedData || null;
  const linkedinParsed = parsed?.linkedinParsedData || null;
  const lowest = Object.entries(subscores).sort((a, b) => a[1] - b[1])[0]?.[0] || "clarity";
  const primaryGap =
    lowest === "clarity"
      ? "Your focus is still diffuse. Tighten role + level + target list."
      : lowest === "assets"
      ? "Your assets aren’t signal-strong yet. Fix resume + LinkedIn first."
      : lowest === "network"
      ? "Your network leverage is limiting reach. Prioritize warm outreach."
      : "Execution cadence is too light. Increase weekly reps and tracking.";

  const secondaryGap = answers.interviewReady
    ? "Conversion can improve with tighter interview loops and practice."
    : "Interview readiness is a risk. Build reps before late-stage loops.";

  const quickWin = answers.linkedinStatus === "optimized"
    ? "Send 5 targeted connection requests with a specific 2-line ask."
    : "Update your LinkedIn headline + About section to match your target role.";

  const weeklyPlan = buildWeeklyPlan(answers);
  const companyFit =
    answers.targetCompanies.length >= 10
      ? "Strong list. Add 3-5 mid-stage companies to increase response rate."
      : "Expand to 15-20 companies to diversify response rate while staying focused.";

  const routeReasoning =
    route === "Fast Track"
      ? "Your score + urgency suggest you can move fast with structured support."
      : route === "Guided"
      ? "You have solid fundamentals but need tighter execution to convert."
      : "Your timeline or clarity needs work before a fast-track push.";

  const fallback = {
    primaryGap,
    secondaryGap,
    quickWin,
    weeklyPlan,
    companyFit,
    routeReasoning,
    meta: {
      score,
      subscores,
      keywords: pickRoleKeywords(answers),
      parsed: Boolean(resumeParsed || linkedinParsed),
    },
  };

  const llmPrompt = `Provide brief, specific coaching insights in JSON for a ${answers.level} targeting ${answers.targetRoles
    .map((r) => r.name)
    .join(", ")}. Use resume data if present. Resume: ${JSON.stringify(resumeParsed)}. LinkedIn: ${JSON.stringify(
    linkedinParsed
  )}. Return JSON with primaryGap, secondaryGap, quickWin, weeklyPlan, companyFit, routeReasoning.`;

  const llmResponse = await tryFreeLlm(llmPrompt);
  if (llmResponse) {
    try {
      return JSON.parse(llmResponse);
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export async function generateCoachPulse(answers: AssessmentAnswers, step?: string) {
  const role = answers.targetRoles[0]?.name || "your target role";
  if (step === "roles") {
    return `Focus on 1–3 ${role} targets. Precision beats volume here.`;
  }
  if (step === "assets") {
    return "We’ll tighten assets first so every application converts at higher rates.";
  }
  if (step === "companies") {
    return "Pick companies you’d actually accept. Fit drives faster offers.";
  }
  return `We’ll design a ${answers.timeline} plan for ${role} roles with clear leverage points.`;
}

export async function generateAssetReview(answers: AssessmentAnswers) {
  const keywords = pickRoleKeywords(answers);
  return {
    role: answers.targetRoles[0]?.name || "DevOps Engineer",
    mustHaveKeywords: keywords.must,
    niceToHaveKeywords: keywords.nice,
    missingFromYourResume: keywords.must.slice(0, 3),
    howToAdd:
      "Add a Technical Skills section and weave key tools into recent project bullets.",
  };
}
