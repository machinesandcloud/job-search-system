import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "LinkedIn Optimization for Recruiter Search — The Complete 2025 Guide",
  description:
    "How LinkedIn's search algorithm actually ranks profiles — and the specific changes that get you surfaced to recruiters. Headline formula, About section structure, skills strategy, and activity signals that move your profile up.",
  keywords: ["linkedin optimization for recruiters", "how to optimize linkedin for recruiter search", "linkedin profile optimization", "linkedin seo", "get found on linkedin by recruiters", "linkedin recruiter search"],
  alternates: { canonical: "/blog/linkedin-optimization-for-recruiters" },
  openGraph: {
    title: "LinkedIn Optimization for Recruiter Search — The 2025 Guide",
    description: "The specific changes that surface your LinkedIn profile to recruiters searching your target roles — headline, About, skills, and activity signals.",
    url: "/blog/linkedin-optimization-for-recruiters",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const ALGORITHM_FACTORS = [
  {
    factor: "Keyword match to search query",
    weight: "Very high",
    accent: "#DC2626",
    how: "Recruiters search using specific job titles, skills, and location. LinkedIn matches these against your headline, current title, skills section, and About section. The closer the match — and the more prominent the placement — the higher you rank.",
    optimize: "Put the exact job title you want to be found for in your headline. If you want to be found as a 'Senior Product Manager', those exact words should be in your headline — not 'Product Leader' or 'PM'.",
  },
  {
    factor: "Profile completeness score",
    weight: "High",
    accent: "#D97706",
    how: "LinkedIn assigns a completeness score and uses it as a ranking signal. All-Star profiles (the highest tier) rank higher for the same keyword match than incomplete profiles. LinkedIn calculates this based on: profile photo, headline, summary, current role with description, education, skills (5+), and 50+ connections.",
    optimize: "Achieve All-Star status by completing every section. Photo, headline, About, current role description, skills, education — all required. Add at least 5 skills. Connect to 50+ people.",
  },
  {
    factor: "Recency of updates",
    weight: "Medium-high",
    accent: "#7C3AED",
    how: "LinkedIn boosts profiles with recent activity — not just profile updates, but also posts, comments, and likes. A profile that was last updated 2 years ago ranks lower than an identical profile with recent activity.",
    optimize: "Update a section of your profile (or post something short) every 2–4 weeks during an active search. You don't need to publish long-form content — any profile activity signals recency.",
  },
  {
    factor: "Connection degree to recruiter",
    weight: "Medium",
    accent: "#059669",
    how: "LinkedIn surfaces profiles that are 1st or 2nd degree connections to the recruiter more prominently than 3rd-degree or out-of-network profiles. This is a significant advantage — a 2nd-degree connection in your target industry can push you up in searches you'd otherwise rank low for.",
    optimize: "Connect with people in your target industry and companies. Even reaching 2nd-degree connection status with recruiters at target companies improves your visibility meaningfully.",
  },
  {
    factor: "Open to Work signal",
    weight: "Medium",
    accent: "#0D7182",
    how: "The Open to Work feature signals recruiters directly that you're available. In LinkedIn Recruiter, there's a filter specifically for 'Open to Work' candidates. If you're actively searching, this is a direct visibility lever — but it's visible to your entire network if you use the green frame. Use the recruiter-only setting if discretion matters.",
    optimize: "Enable Open to Work with the recruiter-only setting if you're employed and looking privately. If you're openly searching, the public green frame adds visibility but makes your search status visible to your current employer.",
  },
];

const HEADLINE_FORMULA = [
  { component: "Current or target title", example: "Senior Product Manager", why: "The exact title you want to be found for — what recruiters will search" },
  { component: "Specialization or industry", example: "B2B SaaS | Fintech", why: "Narrows to the specific niche, improves relevance signal for specialized searches" },
  { component: "Value proposition (optional)", example: "0→1 products & platform scale", why: "Adds differentiation — what specifically you do well that others don't" },
];

const ABOUT_STRUCTURE = [
  { part: "Opening hook (1–2 sentences)", detail: "Start with your current role or target, then one specific thing that makes you different. Not 'I'm passionate about product management' — something specific: 'I've launched 4 B2B SaaS products from zero to $10M ARR and built the teams that sustain them after launch.'" },
  { part: "What you do and for whom (2–3 sentences)", detail: "Describe your actual work — the function, the scale, the context. Who do you work with? What problems do you solve? What's the scope of what you own? Be specific enough that a recruiter can tell whether you match their role." },
  { part: "Your top 2–3 achievements (as short bullets)", detail: "Convert your best resume bullets into the About section. These should be quantified and concrete: 'Grew user retention from 61% to 84% by redesigning the onboarding flow.' Not 'Led significant improvements in user metrics.'" },
  { part: "What you're looking for (optional but useful)", detail: "If you're actively searching, one sentence about what you want next removes ambiguity for recruiters: 'Currently exploring Senior PM or Director of Product roles at growth-stage B2B companies in fintech and infrastructure.' This also contains keywords." },
  { part: "Contact CTA", detail: "End with how to reach you: 'Reach me at [email] or send a LinkedIn message.' Don't assume recruiters will use InMail — give them your preferred channel." },
];

const SKILLS_STRATEGY = [
  { rule: "Lead with the skills you want to be found for", detail: "LinkedIn allows you to reorder skills. Put the 5 most relevant-to-your-search skills at the top — these are the ones that appear without expanding the section and carry the most algorithmic weight." },
  { rule: "Have at least 30 skills listed", detail: "More skills = more keyword coverage for recruiter searches. The cap is 50. Aim for 30–50 skills that are genuine — don't list skills you'd need to Google in an interview, but be comprehensive about what you actually know." },
  { rule: "Get endorsements on your top skills", detail: "LinkedIn uses endorsement count as a quality signal for skills. Skills with 10+ endorsements rank higher than unen endorsed skills. Ask colleagues to endorse the specific skills that matter for your target role." },
  { rule: "Align skills to job descriptions", detail: "Search 10–15 job postings for your target role and note which skills appear most frequently. Add those exact terms to your skills section if they're genuinely applicable. Skill name matching matters — 'SQL' and 'MySQL' are different strings." },
];

const FAQS = [
  { question: "How long does it take for LinkedIn profile changes to improve recruiter search ranking?", answer: "LinkedIn's index updates continuously, but ranking changes are typically visible within 24–72 hours of profile updates. The bigger factor is that some changes (like adding new skills or updating your headline) have immediate keyword impact, while others (like recency signals from activity) take a few weeks of consistent behavior to accumulate. Most people see measurable change in recruiter contact rate within 2–4 weeks of comprehensive profile optimization." },
  { question: "Does the LinkedIn banner/background image affect search ranking?", answer: "No — the background image doesn't affect search ranking. It's a visual impression tool for people who visit your profile but not an algorithmic factor. Spend your optimization time on headline, About, skills, and activity rather than the background image." },
  { question: "Should I connect with recruiters I don't know to improve my ranking?", answer: "Yes, with some selectivity. Connecting with recruiters — especially in your target industries and companies — moves them from 3rd-degree to 1st-degree, which makes you visible in their searches. Personalize connection requests briefly: 'I'm exploring [role type] opportunities in [industry] and wanted to connect.' Connecting with 10–20 relevant recruiters during an active search is a legitimate and effective strategy." },
  { question: "Does LinkedIn Premium improve my profile ranking?", answer: "LinkedIn Premium provides benefits for your visibility to recruiters (you show up in more searches, your profile is marked as Premium), but it doesn't directly boost your keyword search ranking algorithmically. The bigger Premium benefit is seeing who viewed your profile and having InMail credits. For most job seekers, profile optimization delivers more ranking improvement than Premium alone." },
];

export default async function LinkedInOptimizationForRecruitersPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="LinkedIn Optimization for Recruiter Search — The Complete 2025 Guide"
        description="The specific changes that surface your LinkedIn profile to recruiters searching your target roles."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/linkedin-optimization-for-recruiters`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "LinkedIn Optimization for Recruiters", url: `${BASE_URL}/blog/linkedin-optimization-for-recruiters` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">LinkedIn</span>
            <span className="text-[11px] text-white/30">11 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            LinkedIn optimization<br /><span className="gradient-text-animated">to get found by recruiters who are already searching</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Recruiters don&apos;t browse profiles randomly — they search with specific filters and rank results. This guide covers exactly how LinkedIn&apos;s algorithm surfaces profiles to those searches, and the changes that move you up.
          </p>
        </div>
      </section>

      {/* Algorithm factors */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 factors LinkedIn uses to rank profiles in recruiter search</h2>
          <div className="mt-8 space-y-4">
            {ALGORITHM_FACTORS.map((f) => (
              <div key={f.factor} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4" style={{ borderLeftColor: f.accent, borderLeftWidth: 4 }}>
                  <p className="font-extrabold text-[var(--ink)]">{f.factor}</p>
                  <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${f.accent}14`, color: f.accent }}>{f.weight}</span>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <p className="px-6 py-4 text-[13.5px] leading-6 text-[var(--muted)]">{f.how}</p>
                  <div className="bg-[var(--bg)] px-6 py-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: f.accent }}>How to optimize</p>
                    <p className="text-[13px] leading-5 text-[var(--muted)]">{f.optimize}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Headline formula */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The headline formula that wins recruiter searches</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Your headline is the highest-weight field for keyword matching. Most people waste it with their job title + company — which is the default, not an optimization.</p>
          <div className="mt-7 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
            <div className="border-b border-[var(--border)] px-6 py-4">
              <p className="font-mono text-[13px] text-[var(--brand)]">Senior Product Manager | B2B SaaS &amp; Fintech | 0→1 products &amp; platform scale</p>
            </div>
            {HEADLINE_FORMULA.map((h, i) => (
              <div key={h.component} className={`flex items-start gap-4 px-6 py-4 ${i < HEADLINE_FORMULA.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-semibold text-[var(--ink)]">{h.component}</p>
                  <p className="mt-0.5 font-mono text-[11.5px] text-[var(--brand)]">{h.example}</p>
                  <p className="mt-1 text-[12.5px] text-[var(--muted)]">{h.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">About section structure that works</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">The About section is the second-highest keyword field and the primary impression point for recruiters who click through. Most profiles waste it on generic phrases.</p>
          <div className="mt-7 space-y-3">
            {ABOUT_STRUCTURE.map((item, i) => (
              <div key={item.part} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.part}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills strategy */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Skills section strategy</h2>
          <div className="mt-7 space-y-4">
            {SKILLS_STRATEGY.map((item) => (
              <div key={item.rule} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{item.rule}</p>
                <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">LinkedIn recruiter optimization FAQs</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your LinkedIn profile recruiter-optimized by AI.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari audits your LinkedIn profile against your target role, identifies keyword gaps, and rewrites your headline, About section, and skills for maximum recruiter visibility.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
