import type { AssessmentAnswers } from "./validation";

const ATS_KEYWORDS: Record<string, string[]> = {
  "DevOps Engineer": ["CI/CD", "Docker", "Kubernetes", "Terraform", "AWS", "Monitoring", "Automation"],
  "Site Reliability Engineer": ["SLO/SLA", "Incident response", "Reliability", "Kubernetes", "Observability", "On-call"],
  "Platform Engineer": ["Platform", "Developer experience", "Kubernetes", "Infrastructure", "CI/CD", "Terraform"],
  "Engineering Manager": ["People management", "Delivery", "Hiring", "Roadmaps", "Execution"],
  "Director of Engineering": ["Org leadership", "Strategy", "Scaling teams", "Hiring", "Execution"],
  "Senior Backend Engineer": ["APIs", "Databases", "Distributed systems", "Performance", "Testing"],
  "Senior Frontend Engineer": ["React", "TypeScript", "Performance", "Accessibility", "Design systems"],
  "Staff Engineer": ["System design", "Architecture", "Technical leadership", "Mentoring"],
  "Principal Engineer": ["Architecture", "Influence", "Cross-org impact", "System design"],
  "Cloud Architect": ["AWS", "Azure", "GCP", "Networking", "Security", "Infrastructure"],
};

function pickRole(answers: AssessmentAnswers) {
  return answers.targetRoles[0]?.name || "DevOps Engineer";
}

export function buildProPack(answers: AssessmentAnswers) {
  const role = pickRole(answers);
  const companies = answers.targetCompanies.slice(0, 10);
  const topCompanies = companies.map((company) => ({
    name: company.name,
    logoUrl: company.logoUrl || null,
    whyGoodFit: `High-fit ${role} teams with strong systems culture and scale.`,
    roleTypes: [role],
    avgComp: answers.compTarget,
    keyContacts: "Target hiring managers and team leads in your domain.",
    researchNotes: "Recent hiring signals suggest momentum in infrastructure teams.",
    applicationStrategy: "Apply directly + warm outreach to 2-3 team members.",
    interviewProcess: "4-5 rounds: recruiter screen, technical screen, system design, behavioral, team fit.",
  }));

  const keywords = ATS_KEYWORDS[role] || ATS_KEYWORDS["DevOps Engineer"];
  const atsKeywords = {
    role,
    mustHaveKeywords: keywords,
    niceToHaveKeywords: ["Observability", "Automation", "Security", "Performance"],
    missingFromYourResume: keywords.slice(0, 3),
    howToAdd: "Add a Technical Skills section and include keywords in recent project bullets.",
  };

  const scripts = {
    referralAsk: `Subject: Quick question about ${companies[0]?.name || "your team"}\n\nHi [Name],\n\nI saw you're at ${
      companies[0]?.name || "your company"
    }—congrats on the role! I'm exploring ${role} opportunities and ${
      companies[0]?.name || "your company"
    } is on my shortlist. Would you be open to a 15-min chat about your experience there?\n\nThanks,\n[Your Name]`,
    recruiterOutreach: `Subject: ${answers.level} ${role} — open to opportunities\n\nHi [Recruiter Name],\n\nI'm a ${
      answers.level
    } ${role} with [X years] experience. I'm exploring roles in the ${answers.compTarget} range and interested in ${
      companies[0]?.name || "high-fit teams"
    } and ${companies[1]?.name || "peer companies"}. Are you working on any roles that might be a fit?\n\nBest,\n[Your Name]`,
    followUpSequence: [
      "Email 1 (Day 0): Initial outreach",
      "Email 2 (Day 4): Following up on my note below…",
      "Email 3 (Day 7): Last follow-up — any chance to connect?",
    ],
  };

  const interviewPrep = [
    "Day 1: Prepare 3-5 STAR stories from recent work.",
    "Day 2: System design or deep technical prep aligned to role.",
    "Day 3: Behavioral questions (leadership, conflict, failure stories).",
    "Day 4: Company research and values alignment.",
    "Day 5: Mock interview with peer or coach.",
    "Day 6: Prepare 5-7 thoughtful questions to ask.",
    "Day 7: Review + logistics + mindset prep.",
  ];

  const negotiation = {
    anchor: `Based on the market for ${role} roles in ${answers.locationPreference}, I'm targeting ${answers.compTarget}.`,
    counter:
      "I'm excited about the role. Based on my experience and market rates, I was expecting closer to [target]. Is there flexibility?",
    email: "Thanks for the offer. I’m very interested. Based on scope and market data, I was targeting [target]. Can we discuss alignment?",
  };

  return {
    topCompanies,
    atsKeywords,
    scripts,
    interviewPrep,
    negotiation,
  };
}
