import type { DashboardPayload, ReviewOutput } from "./types";

export const dashboardData: DashboardPayload = {
  user: {
    name: "Steve",
    email: "steve@zaricoach.com",
    currentRole: "",
    targetRole: "",
    experienceLevel: "",
    geography: "",
    goals: [],
    painPoints: [],
    onboardingComplete: true,
  },
  usage: [
    { key: "resume_review", label: "Resume reviews", used: 0, limit: 1, unit: "review" },
    { key: "linkedin_review", label: "LinkedIn reviews", used: 0, limit: 1, unit: "review" },
    { key: "mock_interview", label: "Mock interviews", used: 0, limit: 1, unit: "session" },
    { key: "voice_minutes", label: "Voice minutes", used: 12, limit: 30, unit: "minutes" },
  ],
  documents: [
    { id: "doc_resume", title: "Steve_Ngoumnai_Resume.pdf", type: "resume", updatedAt: "2 hours ago", status: "indexed" },
    { id: "doc_linkedin", title: "linkedin-profile-export.docx", type: "linkedin", updatedAt: "Yesterday", status: "ready" },
    { id: "doc_notes", title: "interview-notes-q2.pdf", type: "notes", updatedAt: "3 days ago", status: "reviewing" },
  ],
  sessions: [],
  actionPlan: [],
};

export const resumeReview: ReviewOutput = {
  overallScore: 78,
  dimensionScores: [
    { label: "ATS", score: 81 },
    { label: "Clarity", score: 76 },
    { label: "Impact", score: 72 },
    { label: "Positioning", score: 83 },
  ],
  strengths: [
    "Role progression is clear and shows broader ownership over time.",
    "The resume already signals collaboration with technical and executive stakeholders.",
    "The document has enough structure to tailor toward program and operations roles quickly.",
  ],
  issues: [
    "Several bullets describe activity but not measurable outcome.",
    "The summary section is too generic for a TPM transition.",
    "Tooling, systems, and operational complexity are under-explained.",
  ],
  missingSignals: [
    "Cross-functional program leadership across engineering, ops, and GTM.",
    "Risk management, dependency coordination, and decision-making under ambiguity.",
    "Evidence of process design or systems improvement at scale.",
  ],
  rewrittenBullets: [
    "Led a cross-functional onboarding redesign across support, sales, and product, cutting time-to-value by 28% and reducing escalations by 17%.",
    "Built operating cadences, risk reviews, and stakeholder updates for a 6-workstream initiative serving 40+ internal partners.",
    "Translated customer pain trends into product and process priorities, improving adoption on key workflows by 19%.",
  ],
  tailoringSuggestions: [
    "Anchor the headline and summary around program execution, cross-functional leadership, and operational scale.",
    "Add a compact skills block with delivery tools, reporting systems, and collaboration platforms.",
    "Reorder experience bullets so the strongest coordination and execution examples appear first.",
  ],
};

export const linkedinReview: ReviewOutput = {
  overallScore: 74,
  dimensionScores: [
    { label: "Headline", score: 69 },
    { label: "About", score: 72 },
    { label: "Experience", score: 77 },
    { label: "Keywords", score: 78 },
  ],
  strengths: [
    "The profile shows credible customer-facing leadership experience.",
    "Experience entries include operational improvement signals that can map to target roles.",
    "The tone is professional and easy to scan.",
  ],
  issues: [
    "The headline does not state the role transition clearly enough.",
    "The About section buries differentiators and does not carry a strong point of view.",
    "Keyword density for program delivery and systems leadership is too light.",
  ],
  missingSignals: [
    "Delivery leadership keywords such as roadmap execution, dependencies, and stakeholder alignment.",
    "Language around metrics, operating cadence, and organizational scale.",
    "A concise transition narrative tying current strengths to the target role.",
  ],
  rewrittenBullets: [
    "Technical Program Manager | Cross-functional delivery, operational systems, and customer-centered execution",
    "I help teams turn messy, cross-functional work into clear operating plans, stronger execution, and measurable customer outcomes.",
    "Recent work spans onboarding redesign, process improvement, stakeholder alignment, and translating frontline insight into execution priorities.",
  ],
  tailoringSuggestions: [
    "Rewrite the headline for target role plus two proof points.",
    "Use the About section to connect customer insight, operational rigor, and program ownership.",
    "Refresh the top two roles with sharper outcome-based bullets and delivery language.",
  ],
};

export const liveTranscript = [
  ["00:00", "coach", "What outcome matters most for this session: sharper stories, a stronger resume, or mock interview practice?"],
  ["00:08", "user", "I need to reposition for TPM roles and stop sounding too vague."],
  ["00:15", "coach", "Good. I’m reviewing your resume and prior session summary now. I’ll focus on evidence of scale, coordination, and execution."],
];
