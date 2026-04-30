export type PricingPlanId = "search" | "growth" | "executive";

export type PricingPlan = {
  id: PricingPlanId;
  name: string;
  price: string;
  period: string;
  tag: string;
  accessLabel: string;
  summary: string;
  description: string;
  tokenLine: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "search",
    name: "Search",
    price: "$39",
    period: "/month",
    tag: "Job search only",
    accessLabel: "Resume, LinkedIn, cover letter, interview prep, and action plans",
    summary: "For candidates actively applying right now.",
    description: "All of the core job-search workflows, without promotion, salary, career-change, or executive surfaces.",
    tokenLine: "120 Zari tokens every month",
    cta: "Choose Search",
    features: [
      "Job-search workspace only",
      "Resume Review and Magic Rewrite",
      "LinkedIn optimization",
      "Mock interviews and answer scoring",
      "Cover-letter generation",
      "Buy more tokens anytime",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$89",
    period: "/month",
    tag: "Most popular",
    accessLabel: "Everything except executive leadership tools",
    summary: "For people navigating job search plus the next move after it.",
    description: "Unlock promotion, salary, and career-change workflows, plus Zari Live Coach.",
    tokenLine: "400 Zari tokens every month",
    cta: "Choose Growth",
    featured: true,
    features: [
      "Everything in Search",
      "Promotion coaching and pitch prep",
      "Salary and negotiation workflows",
      "Career-change strategy tools",
      "Zari Live Coach access",
      "Top-up packs when you need more",
    ],
  },
  {
    id: "executive",
    name: "Executive",
    price: "$179",
    period: "/month",
    tag: "Leadership included",
    accessLabel: "Everything, including leadership and executive positioning",
    summary: "For senior operators, directors, VPs, and exec-track candidates.",
    description: "Adds the leadership and executive surfaces that stay locked in Growth.",
    tokenLine: "1,000 Zari tokens every month",
    cta: "Choose Executive",
    features: [
      "Everything in Growth",
      "Leadership and executive positioning",
      "Executive mock interviews",
      "Board / C-suite narrative work",
      "High-stakes comp and negotiation prep",
      "Priority access to advanced workflows",
    ],
  },
];

export const FREE_PREVIEW_FEATURES = [
  "1 resume review",
  "1 LinkedIn review",
  "1 mock interview",
  "No card required",
];

export const TOP_UP_PACKS = [
  { tokens: "40 tokens", price: "$19" },
  { tokens: "120 tokens", price: "$49" },
  { tokens: "300 tokens", price: "$99" },
];

export const PRICING_TRUST_ITEMS = [
  "Monthly plans, cancel anytime",
  "Included tokens reset each billing cycle",
  "Top-ups last for 90 days",
  "Secure Stripe checkout",
];

export const PRICING_FAQS = [
  {
    q: "Do I still get a free preview before paying?",
    a: "Yes. Every account includes 1 resume review, 1 LinkedIn review, and 1 mock interview before you subscribe. The paid plans are for continued access and deeper workflows.",
  },
  {
    q: "What exactly is a Zari token?",
    a: "Zari tokens are product credits. Text, deeper analyses, and live-coach minutes all burn from the same balance so pricing stays simple even though the AI stack behind the scenes is not.",
  },
  {
    q: "What happens when I run out of included monthly tokens?",
    a: "Your included monthly balance resets on your renewal date. If you need more before then, you can buy top-up packs without changing plans.",
  },
  {
    q: "Which plan includes live coach access?",
    a: "Growth and Executive include Zari Live Coach. Search is intentionally limited to the job-search workspace only.",
  },
  {
    q: "Which plan includes the executive and leadership tools?",
    a: "Executive. Growth includes everything except the leadership and executive surfaces.",
  },
];

export const PRICING_TESTIMONIALS = [
  {
    name: "Priya M.",
    role: "PM → Senior PM at Notion",
    company: "Search plan",
    initials: "PM",
    accent: "#4361EE",
    tag: "Job search",
    quote:
      "The resume feedback was specific enough to be uncomfortable, which is exactly why it worked. I fixed the story, then the callbacks showed up.",
  },
  {
    name: "Sofia L.",
    role: "IC → Engineering Manager",
    company: "Growth plan",
    initials: "SL",
    accent: "#06B6D4",
    tag: "Promotion",
    quote:
      "I used Zari to rehearse my manager pitch every day for two weeks. By the real conversation, the weak parts of the case were already gone.",
  },
  {
    name: "Ryan O.",
    role: "Sales Lead → Google APM",
    company: "Growth plan",
    initials: "RO",
    accent: "#059669",
    tag: "Salary",
    quote:
      "The negotiation workflow paid for itself immediately. I stopped reacting emotionally, made a cleaner counter, and landed more than the original offer.",
  },
  {
    name: "Camille D.",
    role: "Finance → Stripe PM",
    company: "Growth plan",
    initials: "CD",
    accent: "#8B5CF6",
    tag: "Career change",
    quote:
      "Career-change advice is usually vague. Zari made it concrete: which story to lead with, which proof to cut, and which gaps still needed real work.",
  },
  {
    name: "James T.",
    role: "Director → VP Engineering",
    company: "Executive plan",
    initials: "JT",
    accent: "#F59E0B",
    tag: "Leadership",
    quote:
      "At my level, the issue was not a resume bullet. It was positioning, judgment, and how the story reads to other executives. Zari understood that immediately.",
  },
  {
    name: "Nadia F.",
    role: "COO → Advisor & Board",
    company: "Executive plan",
    initials: "NF",
    accent: "#DC2626",
    tag: "Executive",
    quote:
      "Most tools collapse at executive level because they don't understand governance, positioning, or narrative risk. This one didn't.",
  },
];
