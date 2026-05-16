import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Entrepreneurs Returning to Corporate — Zari",
  description:
    "Career coaching for founders and entrepreneurs transitioning back to corporate roles. Resume translation, interview prep for 'why corporate now?' questions, and positioning your entrepreneurial experience as an asset.",
  keywords: ["career coach for entrepreneurs", "founder to corporate transition", "entrepreneur returning to work", "startup founder career change", "entrepreneur resume help"],
  alternates: { canonical: "/career-coach-for-entrepreneurs" },
  openGraph: {
    title: "AI Career Coach for Entrepreneurs Returning to Corporate — Zari",
    description: "You built something. Now you want to join something. Zari coaches the translation — how to make entrepreneurial experience read as leadership, not a gap.",
    url: "/career-coach-for-entrepreneurs",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const HIRING_MANAGER_CONCERNS = [
  {
    concern: "Will they follow direction, or do they always need to be the boss?",
    accent: "#DC2626",
    why: "This is the #1 concern — and it's legitimate. Founders make decisions autonomously by default. Corporate roles require operating within constraints, getting buy-in, and executing on priorities you didn't set. Hiring managers want to know you've genuinely internalized this shift, not just that you'll say the right thing in the interview.",
    howToAddress: "Talk specifically about times during your company when you operated as an IC or contributor, not just a decision-maker. Describe decisions where you deferred to others' expertise. Frame your interest in the role around learning from domain experts and operating at scale — not around having more stability.",
  },
  {
    concern: "Is this a bridge while they try to raise another round?",
    accent: "#D97706",
    why: "Hiring managers worry that an entrepreneur taking a corporate job is in 'between startups' mode — they'll leave in 18 months when the next opportunity appears. This concern is sometimes valid and sometimes unfair, but you'll need to address it directly.",
    howToAddress: "Have a clear, honest answer for why you want this specifically — not why you want a job in general. If you genuinely want to work at scale, build on an established platform, or apply your skills in a specific domain, say that. Vague answers ('I want new challenges') feed the concern.",
  },
  {
    concern: "Can they handle ambiguity without creating their own structure?",
    accent: "#7C3AED",
    why: "Counterintuitively, many founders struggle in corporate roles because they try to rebuild the startup inside the bigger company — building their own processes, creating new systems, reorganizing teams. This is disruptive, even when well-intentioned. Hiring managers want to know you'll operate within existing systems, not refactor them.",
    howToAddress: "Show that you understand the difference between building and optimizing. Demonstrate that you can drive results inside existing constraints. If your goal is eventually to lead at a higher level, that's fine — but frame it as 'I want to understand this organization before trying to change it'.",
  },
  {
    concern: "Is their salary expectation realistic?",
    accent: "#059669",
    why: "If you've been running your own company, your mental model of your market value may be misaligned with what corporate roles pay at your target level. Or the reverse: you may be targeting VP-level roles because you were a CEO, but the experience that maps to a corporate VP role is different from founding experience.",
    howToAddress: "Research comp for the specific roles you're targeting before any conversation about salary. Know the band. Don't anchor off your founder salary or distributions — anchor off market rate for the specific role and level you're targeting.",
  },
];

const RESUME_TRANSLATION = [
  {
    problem: "Company name no one knows + 'CEO/Founder' title reads as unemployed",
    accent: "#DC2626",
    raw: "CEO & Co-founder, Stria Inc., 2020–2024",
    fix: "CEO & Co-Founder, Stria Inc. (B2B SaaS, $1.8M ARR, 12-person team), 2020–2024",
    why: "Adding context — what you built, at what scale — immediately reframes the entry from 'ran their own thing' to 'led a real business'. Revenue, team size, and product category are the three fastest credibility signals.",
  },
  {
    problem: "Founder bullets describe what the company did, not what you personally drove",
    accent: "#7C3AED",
    raw: "Built product used by 200+ enterprise clients in the logistics vertical.",
    fix: `"Sold and closed 200+ enterprise contracts personally — average ACV $48K, 6-month sales cycle. Developed the sales playbook, hired and onboarded the first 2 account executives, and hit $1.8M ARR in 36 months from launch."`,
    why: "Founders do everything, which makes it easy to write vague bullets. Be specific about what you personally owned vs. what the company accomplished. AEs can own what they personally closed; hiring managers is your job.",
  },
  {
    problem: "Exit story is missing or buried",
    accent: "#D97706",
    raw: "(no context about why the role ended)",
    fix: "Add a brief parenthetical or resume note: 'Company wound down following Series A bridge not closing in Q4 2024 amid macro conditions; team soft-landed across 3 companies.' Or: 'Acquired by [Company] in 2023; transitioned operational responsibilities post-close.'",
    why: "An unexplained end date for a founder role will generate questions in every screen. Address it proactively — a one-line explanation is infinitely better than silence and speculation.",
  },
  {
    problem: "Scope sounds like a small lifestyle business even when it wasn't",
    accent: "#059669",
    raw: "Managed all aspects of business operations including sales, marketing, product, and customer success.",
    fix: `"Operated as a $1.8M ARR B2B SaaS business with enterprise clients in 8 countries — personally owned product roadmap (shipped 24 features in 2023), sales (200+ enterprise contracts), and a 12-person team across engineering, CS, and sales."`,
    why: "Founders often undersell scope. Quantify everything: revenue, headcount, customers, markets, contracts, growth rate. The goal is to make the scale legible to someone who's never built a company.",
  },
];

const TARGET_ROLES = [
  {
    role: "General Manager / Business Unit Lead",
    accent: "#7C3AED",
    fitReason: "Running a company is the closest analog to running a P&L inside a larger organization. Your founder experience maps almost 1:1 to a GM role — you own outcomes, manage a team, and operate across functions.",
    whatTheyWant: "P&L ownership experience, cross-functional leadership, evidence of growing a business, and the ability to operate within a parent org's reporting structure",
    levelTarget: "Often enters at GM or Senior Director level depending on company size and revenue scale of your startup",
  },
  {
    role: "VP of Product",
    accent: "#DC2626",
    fitReason: "Founders who built product-led companies often have stronger product instincts than career PMs — you owned the roadmap from day one, talked directly to customers, and made prioritization calls with incomplete information.",
    whatTheyWant: "Evidence of product decision-making at scale, customer discovery discipline, roadmap strategy, and the ability to work with engineering without overriding them",
    levelTarget: "Senior PM to Director depending on team size managed; VP-level for founders with larger teams and strong process evidence",
  },
  {
    role: "VP of Sales / Revenue Leader",
    accent: "#D97706",
    fitReason: "If you sold your company's product — especially in enterprise — you have sales experience that most VP-track candidates don't: you built the pitch from scratch, you closed deals with no brand support, and you had no playbook to fall back on.",
    whatTheyWant: "Closed pipeline numbers, evidence of building and managing a sales team, and scalable process creation — not just founder hustle",
    levelTarget: "Director to VP depending on size of sales org you managed and revenue you're attributing",
  },
  {
    role: "Chief of Staff / Head of Strategy",
    accent: "#059669",
    fitReason: "CoS roles inside larger companies are often specifically designed for people with operating experience who can think across functions. Founders are strong candidates because they've operated across every function by default.",
    whatTheyWant: "Cross-functional operating experience, ability to work directly for a senior executive, project management at scale, and a reputation for getting things done without a dedicated team",
    levelTarget: "Senior Manager to Director for early-stage founders; VP-equivalent for founders with larger companies",
  },
];

const FAQS = [
  { question: "Does running a startup count as work experience on a resume?", answer: "Yes — but it has to be framed correctly. Unformatted 'Founder' entries with no context look like a gap or a side project. A well-formatted startup entry with revenue, team size, product description, and specific accomplishments reads as serious operating experience. The rule is the same as any resume entry: make the scope legible and the impact quantified." },
  { question: "Will corporate employers see my founder experience as a red flag?", answer: "Some will, some won't — and you can't control that. The ones who see it as a red flag are usually worried about autonomy, fit, and tenure risk. The ones who value it are looking for operators who've built from scratch, handled ambiguity, and delivered without institutional support. Your job is to address the concerns directly in the interview and target companies where the culture values that background." },
  { question: "What level should I target when returning from a startup?", answer: "It depends on what you built and how large it was. A founder with $500K ARR and a 3-person team should target IC-to-manager roles, not VP-level. A founder with $5M ARR and a 15-person team has a credible case for senior director or VP. The mistake founders make most often is anchoring on their CEO title and targeting C-suite or VP roles regardless of company size — which often leads to rejections that could have been avoided by targeting one level lower initially." },
];

export default async function CareerCoachForEntrepreneursPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Career Coach for Entrepreneurs", url: `${BASE_URL}/career-coach-for-entrepreneurs` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Career Coach · Entrepreneurs & Founders
          </div>
          <h1 className="max-w-4xl text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.5rem]">
            You built something.<br /><span className="gradient-text-animated">Now you want to join something.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/55">
            The founder-to-corporate transition is one of the hardest to navigate — not because your experience isn&apos;t valuable, but because it&apos;s hard to make it legible. Zari coaches the translation: resume framing, interview narratives, level targeting, and how to address every concern a hiring manager will have before they say it.
          </p>
          <div className="mt-8">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_24px_rgba(13,113,130,0.4)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Hiring manager concerns */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What every hiring manager is actually thinking</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Entrepreneur candidates face specific, predictable concerns. Knowing them in advance lets you address them before they become objections.</p>
          <div className="mt-10 space-y-5">
            {HIRING_MANAGER_CONCERNS.map((c) => (
              <div key={c.concern} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: c.accent, borderLeftWidth: 4 }}>
                  <p className="font-bold text-[var(--ink)]">&ldquo;{c.concern}&rdquo;</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="px-5 py-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Why they&apos;re worried</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{c.why}</p>
                  </div>
                  <div className="bg-[var(--bg)] px-5 py-4">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">How to address it</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{c.howToAddress}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume translation */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Resume translation — before & after</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Four specific changes that make a founder resume read as operating experience — not a gap or a lifestyle business.</p>
          <div className="mt-8 space-y-5">
            {RESUME_TRANSLATION.map((r) => (
              <div key={r.problem} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: r.accent, borderLeftWidth: 4 }}>
                  <p className="font-bold text-[var(--ink)]">{r.problem}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="bg-white px-5 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-500">Before</p>
                    <p className="font-mono text-[12px] leading-5 text-[var(--muted)]">{r.raw}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">After</p>
                    <p className="font-mono text-[12px] leading-5 text-[var(--ink)]">{r.fix}</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-amber-50/40 px-5 py-3">
                  <p className="text-[12.5px] leading-5 text-[var(--muted)]"><span className="font-semibold text-amber-800">Why it works: </span>{r.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target roles */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 roles where founder experience is a genuine advantage</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {TARGET_ROLES.map((role) => (
              <div key={role.role} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="px-6 py-4 border-b border-[var(--border)]" style={{ borderTopColor: role.accent, borderTopWidth: 3 }}>
                  <p className="font-extrabold text-[var(--ink)]">{role.role}</p>
                </div>
                <div className="px-6 py-5 space-y-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">Why founders fit</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{role.fitReason}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">What hiring managers look for</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{role.whatTheyWant}</p>
                  </div>
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: role.accent }}>Level target</p>
                    <p className="text-[12.5px] text-[var(--muted)]">{role.levelTarget}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Founder-to-corporate FAQs</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Let&apos;s translate your founder story.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches the resume reframe, the interview narrative, the level targeting, and the specific objections you&apos;ll face as a founder returning to a corporate role. Start with your resume.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
