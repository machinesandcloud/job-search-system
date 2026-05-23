import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Executive Career Coaching 2025 — AI Career Coach for VP, Director & C-Suite",
  description: "Executive career coaching for VP, Director, and C-suite professionals. Leadership positioning, board search strategy, executive resume writing, and C-suite interview prep.",
  keywords: ["executive career coaching", "executive career coach", "c-suite career coach", "vp career coach", "director career coaching", "executive job search", "c-level career coaching", "senior executive career coach", "executive transition coaching", "executive coaching 2025"],
  alternates: { canonical: "/executive-career-coaching" },
  openGraph: { title: "Executive Career Coaching 2025 — AI Career Coach for VP, Director & C-Suite", description: "AI executive career coaching for VP, Director, and C-suite. Leadership positioning, executive search strategy, and C-suite interview prep.", url: "/executive-career-coaching" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What does executive career coaching include?", answer: "Executive career coaching for VP, Director, and C-suite professionals covers: (1) Leadership positioning — articulating your leadership narrative, P&L scope, and strategic impact in a way that resonates with boards and executive search firms. (2) Executive search strategy — how to work with retained search firms (Spencer Stuart, Korn Ferry, Heidrick & Struggles), build board relationships, and activate your network at the senior level. (3) Executive resume and LinkedIn — writing that communicates organizational scale, not just task completion. (4) C-suite interview preparation — CEO, CFO, CHRO, and functional VP interview formats differ significantly from individual contributor or manager interviews. (5) Offer and compensation negotiation — executive packages include equity, severance, change-of-control provisions, and non-compete clauses that require specific expertise to evaluate." },
  { question: "How is executive job searching different from regular job searching?", answer: "Executive searches operate differently from mid-level job searches in almost every dimension: (1) Most C-suite roles are never posted publicly — they're filled through executive search firms (retained search) and board networks. Posting a VP/C-suite role on Indeed is often a signal that the top candidates have already passed. (2) Retained search firms (Spencer Stuart, Korn Ferry, Heidrick & Struggles) control access to most senior roles. Building relationships with these firms before you need them is essential. (3) The timeline is longer — executive searches routinely take 6–12 months from first conversation to signed offer. (4) Reference and background checks are more extensive. (5) The interview format emphasizes strategic judgment and leadership philosophy, not individual capabilities." },
  { question: "How much does executive career coaching cost?", answer: "Traditional executive career coaching runs $300–$600/hour for senior coaches, with full executive career programs ranging from $5,000–$25,000+. These typically include multiple 1:1 sessions over 3–6 months, executive resume writing, LinkedIn optimization, and interview coaching. Retainer-based executive coaches often charge $2,000–$5,000/month. Zari's AI executive career coaching provides executive-calibrated resume writing, leadership narrative coaching, C-suite interview preparation, and salary negotiation guidance — available 24/7, with the full cost a fraction of traditional executive coaching. For time-pressed executives, the on-demand availability is as valuable as the price difference." },
  { question: "What do executive search firms look for in candidates?", answer: "Retained executive search firms (the kind that fill VP and C-suite roles) are looking for: (1) Quantified track record at scale — revenue grown, organizations built, transformations led, with specific numbers. (2) Board-level communication ability — can this person present clearly to a board? Executive presence and written communication are assessed early. (3) Fit with the specific company's challenge — a turnaround CEO profile is different from a growth CEO profile. (4) Reference quality — senior executives' references come from other senior executives and board members. (5) LinkedIn credibility — search firms always check your LinkedIn before reaching out. An outdated or thin profile signals low attention to your personal brand." },
];

export default async function ExecutiveCareerCoachingPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Executive Career Coaching 2025 — AI Career Coach for VP, Director & C-Suite"
        description="AI executive career coaching for VP, Director, and C-suite. Leadership positioning, executive search strategy, and C-suite interview prep."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/executive-career-coaching`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Executive Career Coaching", url: `${BASE_URL}/executive-career-coaching` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1E3A5F 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Executive Coaching · VP · Director · C-Suite
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Executive<br />
            <span className="text-white/50">Career Coaching</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for VP, Director, and C-suite professionals. Leadership positioning, executive search strategy, C-suite interview prep, and compensation negotiation — available 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · For VP / Director / C-Suite · Available 24/7</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for executives</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Leadership narrative coaching", desc: "Articulate your P&L scope, organizational scale, and strategic impact in the language executive search firms and boards expect." },
              { title: "Executive resume writing", desc: "Achievement-led, board-ready resume. Leadership scope quantification (team size, budget, revenue), not task descriptions." },
              { title: "C-suite interview prep", desc: "CEO, CFO, CPO, CHRO, and VP interview coaching — strategic judgment questions, vision articulation, and board presentation practice." },
              { title: "Executive LinkedIn optimization", desc: "LinkedIn profile rewrite calibrated to executive search firm queries and board member searches." },
              { title: "Executive comp negotiation", desc: "Total package evaluation — base, bonus, equity (type, cliff, acceleration), severance, non-compete terms, and change-of-control provisions." },
              { title: "Executive search strategy", desc: "How to work with retained search firms, build board relationships, and activate your senior network before you need it." },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">Executive search: the hidden market</h2>
          <div className="space-y-4 text-[14px] leading-7 text-[var(--muted)]">
            <p><strong className="text-[var(--ink)]">Most C-suite roles are never posted publicly.</strong> Retained executive search firms (Spencer Stuart, Korn Ferry, Heidrick &amp; Struggles) fill the vast majority of VP and C-suite roles before they&apos;re visible to the general market. Building relationships with these firms before you need them is one of the most high-leverage actions a senior executive can take.</p>
            <p><strong className="text-[var(--ink)]">Your LinkedIn profile is your executive search engine.</strong> Senior search consultants actively search LinkedIn for candidates. An executive profile that clearly communicates organizational scale, strategic impact, and leadership philosophy will generate inbound outreach from retained search firms — without you ever applying to a job posting.</p>
            <p><strong className="text-[var(--ink)]">References determine more outcomes than interviews at the executive level.</strong> A CEO search will speak with 15–20 of your professional references — not just the 3 you provide. Board members, former CEOs you&apos;ve worked with, investors who know your work, and peers who&apos;ve observed your leadership. Proactively managing your reference network is a component of executive career management that most executives underinvest in.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1E3A5F 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start executive career coaching with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">Leadership positioning, C-suite interview prep, and executive compensation coaching — available 24/7, free to start.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#1E3A5F]">Start executive coaching free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
