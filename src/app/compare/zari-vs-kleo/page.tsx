import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Kleo — LinkedIn Content vs Career Coaching (2025)",
  description:
    "Kleo helps you create and schedule LinkedIn content to build followers and visibility. Zari optimizes your LinkedIn profile for recruiter search, then coaches your resume, interviews, and salary. Honest comparison.",
  keywords: ["Zari vs Kleo", "Kleo alternative", "Kleo review 2025", "Kleo vs AI career coach", "linkedin content vs career coaching", "kleo linkedin tool comparison"],
  alternates: { canonical: "/compare/zari-vs-kleo" },
  openGraph: {
    title: "Zari vs Kleo — LinkedIn Content Tool vs Career Coach (2025)",
    description: "Kleo builds your LinkedIn audience. Zari builds your LinkedIn profile for recruiter search — then coaches everything else. Understanding which problem you have.",
    url: "/compare/zari-vs-kleo",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What is Kleo and what does it do?",
    answer: "Kleo is a Chrome extension and web app focused on LinkedIn content creation and personal branding. Core features: AI post writing (drafts posts based on prompts or topics), post templates from top LinkedIn creators, content scheduling, a creator library for inspiration, and engagement analytics. It's priced around $19/month. Kleo's goal is to help you build an audience on LinkedIn through consistent content.",
  },
  {
    question: "What's the difference between Kleo and Zari?",
    answer: "Kleo and Zari solve fundamentally different problems. Kleo is about LinkedIn as a content platform — writing posts that get followers and engagement. Zari is about LinkedIn as a job search tool — optimizing your profile so recruiters find you in searches, and then coaching you through the full job search. They don't really overlap.",
  },
  {
    question: "Can I use Kleo and Zari together?",
    answer: "Yes, and for some professionals it makes sense. Kleo for building a LinkedIn following and thought leadership presence; Zari for resume optimization, interview prep, and salary negotiation. If you're a consultant, freelancer, or executive building a personal brand while also job searching, both tools serve distinct purposes.",
  },
  {
    question: "Does Kleo help with getting a job?",
    answer: "Indirectly — if you build a strong LinkedIn audience, some inbound opportunities will come through content. But Kleo doesn't optimize your profile for recruiter keyword searches, doesn't help with your resume or interview prep, and doesn't cover salary negotiation. It's a content tool, not a job search coaching platform.",
  },
  {
    question: "Which matters more for job searching: LinkedIn content or LinkedIn profile optimization?",
    answer: "For most job seekers, profile optimization drives more interviews than content. Recruiters search LinkedIn by skills, titles, and keywords — they're looking for candidates who match what they need, not necessarily content creators. Publishing posts helps with visibility broadly, but an optimized headline, About section, and experience bullets will produce more recruiter-initiated conversations than most posting strategies.",
  },
];

const DIMENSIONS = [
  {
    category: "LinkedIn Content Creation",
    kleo: "Kleo's core product. AI drafts LinkedIn posts based on your topic inputs, pulls inspiration from a library of top-performing creator posts, helps format carousels and long-form posts, and schedules content. Excellent for professionals who want to post consistently but don't know what to write.",
    zari: "Zari doesn't help you create LinkedIn posts or build a posting calendar. It's not a content creation tool.",
    winner: "kleo",
    winnerNote: "If you want to build a LinkedIn audience through regular content, Kleo was built for exactly this.",
  },
  {
    category: "LinkedIn Profile Optimization",
    kleo: "Kleo provides some profile guidance as part of its broader LinkedIn strategy, but its primary focus is on content creation. It's not a profile optimization tool that rewrites your headline, About section, or experience bullets for recruiter search keywords.",
    zari: "Rewrites your LinkedIn headline, About section, and experience bullets with the specific keywords recruiters use when searching for your role. Goal is recruiter findability — showing up in searches when someone is looking for your skill set, not just building a following.",
    winner: "zari",
    winnerNote: "Profile optimization for recruiter search and content for audience growth are different strategies.",
  },
  {
    category: "Resume Coaching",
    kleo: "Not offered. Kleo is LinkedIn-only.",
    zari: "AI resume coaching: keyword gap analysis against specific job descriptions, bullet rewrites, ATS formatting review, and positioning strategy. Output is a ready-to-submit resume for the specific roles you're targeting.",
    winner: "zari",
    winnerNote: "Most jobs require a resume. Kleo doesn't touch it.",
  },
  {
    category: "Interview Preparation",
    kleo: "Not offered.",
    zari: "Full AI mock interview coach — behavioral (STAR evaluation), common questions, role-specific prep. Real-time feedback on structure, specificity, and where answers fall apart. Session memory means Zari knows your background and can ask targeted follow-up questions.",
    winner: "zari",
    winnerNote: "Content creation doesn't prepare you for a behavioral interview.",
  },
  {
    category: "Personal Brand Building",
    kleo: "This is Kleo's genuine value. Consistent, well-crafted LinkedIn content builds your professional reputation and makes you visible to people who weren't searching for you. Over months, it compounds into inbound opportunities, speaking invitations, and network growth.",
    zari: "Zari's positioning is career coaching rather than personal brand strategy. It can help you think through your professional narrative and value proposition, but it's not a content creation or distribution tool.",
    winner: "kleo",
    winnerNote: "Building a long-term professional brand on LinkedIn is what Kleo was designed for.",
  },
  {
    category: "Salary Negotiation",
    kleo: "Not offered.",
    zari: "Simulates salary negotiation conversations — anchoring, countering, responding to standard pushbacks. Covers salary, equity, signing bonus, title, and remote work as negotiable dimensions.",
    winner: "zari",
    winnerNote: "Content creation has no bearing on offer negotiation.",
  },
  {
    category: "Who Benefits Most",
    kleo: "Consultants, freelancers, executives, and founders who are building a professional brand for business development or long-term career reputation. Also useful for job seekers with a longer time horizon who want inbound opportunities rather than applying directly.",
    zari: "Job seekers who need to get hired in the next 30–90 days. Professionals optimizing for recruiter findability, interview performance, and maximum offer value. Also useful for anyone navigating internal promotion conversations.",
    winner: "tie",
    winnerNote: "Different problems, different users. Clarify which describes you.",
  },
];

export default async function ZariVsKleoPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Kleo", url: `${BASE_URL}/compare/zari-vs-kleo` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Head-to-Head</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Kleo</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Kleo and Zari use LinkedIn differently. Kleo is for building an audience — writing posts that get followers and engagement. Zari is for getting hired — optimizing your profile for recruiter searches and coaching the full job search. Here&apos;s the real difference.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">Kleo is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Writing LinkedIn posts consistently without running dry on ideas",
                  "Building a following and thought leadership presence over time",
                  "Consultants, freelancers, and founders who need business development through content",
                  "Professionals with a long-term brand-building strategy on LinkedIn",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/70">
                    <span className="mt-0.5 text-white/40">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]/70">Zari is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Optimizing your profile to appear in recruiter keyword searches",
                  "Resume coaching and ATS optimization for specific target roles",
                  "Interview preparation and offer negotiation coaching",
                  "Anyone actively job searching who needs to get hired in the next 90 days",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/80">
                    <span className="mt-0.5 text-[var(--brand)]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The two different LinkedIn strategies */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Two ways to use LinkedIn for career growth</h2>
          <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
            LinkedIn serves two distinct purposes — and Kleo vs. Zari maps almost perfectly to which one you&apos;re optimizing for:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--border)] bg-white p-5">
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-500 mb-3">LinkedIn as a content platform</p>
              <p className="text-[14px] leading-6 text-[var(--muted)]">
                You post regularly. People in your industry follow you. Over time, inbound opportunities come through DMs, comments, and people who remember your content when a role opens up. This is a long game — takes 6–18 months to compound meaningfully.
              </p>
              <p className="mt-3 text-[12px] font-semibold text-[var(--brand)]">Kleo is built for this</p>
            </div>
            <div className="rounded-xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-5">
              <p className="text-[12px] font-bold uppercase tracking-wider text-[var(--brand)] mb-3">LinkedIn as a recruiter search database</p>
              <p className="text-[14px] leading-6 text-[var(--muted)]">
                Recruiters search for candidates by skills, titles, and keywords. Your headline says &ldquo;Senior Product Manager | B2B SaaS | 0→1 Products&rdquo; and you show up when they search for those terms. Your About section confirms you&apos;re the right fit. You get a message.
              </p>
              <p className="mt-3 text-[12px] font-semibold text-[var(--brand)]">Zari is built for this</p>
            </div>
          </div>
          <p className="mt-6 text-[14px] leading-7 text-[var(--muted)]">
            Neither strategy is wrong. They&apos;re just different bets with different timelines. If you need a job in the next 60 days, profile optimization drives more interviews than content. If you&apos;re thinking 18 months out, content builds compounding brand value.
          </p>
        </div>
      </section>

      {/* Dimension breakdown */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Where each tool genuinely wins — including the dimensions where Kleo is stronger.</p>

          <div className="mt-10 space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.category} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.category}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    dim.winner === "zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" :
                    dim.winner === "kleo" ? "bg-slate-100 text-slate-500" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                    {dim.winner === "zari" ? "Zari wins" : dim.winner === "kleo" ? "Kleo wins" : "Tie"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Kleo</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.kleo}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.zari}</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Bottom line: </span>{dim.winnerNote}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-amber-100 bg-amber-50/40 p-8">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">The honest verdict</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Kleo is genuinely good at what it does. If you want to build a LinkedIn following — for business development, consulting clients, or long-term brand value — Kleo makes it significantly easier to post consistently with quality content.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              But content creation and career coaching are different problems. A great LinkedIn post won&apos;t optimize your headline for recruiter search terms, rewrite your resume bullets for a specific job description, or prep you for a behavioral interview. Zari was built for active job seekers who need to get hired — not for building a content presence.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              For most people comparing these tools: if you&apos;re in an active job search with a 30–90 day horizon, Zari is the right call. If you&apos;re thinking about your career brand over the next year or two and have more patience for the content game, Kleo has real value. Some professionals need both.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-8 space-y-4">
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
      <section className="noise-overlay relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">Try the complete AI career coach — free.</h2>
          <p className="mx-auto mt-4 text-[16px] text-white/55">One free session on every coaching surface. No card required.</p>
          <div className="mt-8">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-13 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              Start with Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
