import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "How to Get a Job at Netflix — Interview Process & Culture (2025)",
  description:
    "Netflix's hiring process is different from any other tech company — Freedom & Responsibility culture, keeper test, and salary philosophy change how you need to prepare. Full breakdown of the Netflix interview process, what they look for, and how to negotiate a Netflix offer.",
  keywords: ["how to get a job at netflix", "netflix interview process", "netflix software engineer interview", "netflix hiring", "netflix culture", "netflix keeper test", "netflix salary negotiation", "working at netflix 2025"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-netflix" },
  openGraph: {
    title: "How to Get a Job at Netflix — Interview Process & Culture (2025)",
    description: "Netflix's Freedom & Responsibility culture changes how you need to interview. Full process breakdown and salary negotiation guide.",
    url: "/blog/how-to-get-a-job-at-netflix",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const NETFLIX_DIFFERENTIATORS = [
  {
    signal: "The Keeper Test — hiring only 'stunning colleagues'",
    detail: "Netflix's culture memo famously states that managers ask themselves: 'If this person told me they were leaving, would I fight to keep them?' If the honest answer is no, they give that person a generous severance and hire someone they would fight to keep. In interviews, this means Netflix is not screening for 'good enough' — they're asking whether you're among the best in your field. They're unafraid to hire slowly or extend a search rather than settle. Candidates who perform adequately in Netflix interviews often don't advance; candidates who are genuinely exceptional in their domain do.",
  },
  {
    signal: "Context over control — judgment over process",
    detail: "Netflix's model gives employees significant autonomy and expects them to make decisions that serve the business — without requiring approval for everything. This means Netflix interviews probe for judgment heavily: how you make decisions under uncertainty, how you handle situations where there's no clear rule, and how you've navigated situations where you had the autonomy to do something but had to decide whether you should. They're looking for people who set context well, not people who follow instructions well.",
  },
  {
    signal: "Candor and feedback culture",
    detail: "Netflix has an explicit culture of direct feedback — including giving and receiving critical feedback as a normal part of professional life. In interviews, they probe for your relationship with candor: have you given difficult feedback to a peer or manager? How did you receive critical feedback that turned out to be right? How do you distinguish between feedback to act on and feedback to disagree with? Candidates who avoid conflict or who have a defensive relationship with criticism do not fit the Netflix culture.",
  },
  {
    signal: "Market-rate salary philosophy — top of market",
    detail: "Netflix pays at the top of the market, with a unique compensation philosophy: they offer high base salaries with minimal equity and bonuses, and expect employees to invest their own compensation as they see fit. This means Netflix salaries are often significantly higher than equivalent FAANG base salaries — but without the RSU upside of companies like Google or Meta. Understanding this philosophy before negotiations prevents common mistakes (asking for more equity when Netflix doesn't primarily compete on equity).",
  },
];

const INTERVIEW_STAGES = [
  {
    stage: "1. Recruiter screen (30-45 min)",
    what_happens: "Netflix recruiters screen for culture alignment more explicitly than most companies — they may ask directly about your understanding of the Netflix culture memo and your relationship to concepts like Freedom & Responsibility, radical candor, and the keeper test. They also assess compensation alignment early — Netflix pays top of market and expects candidates to have realistic expectations.",
    how_to_prepare: "Read the Netflix culture memo (available publicly) before this call. Have specific examples of autonomy you've exercised and candid feedback you've given or received. Be ready to discuss compensation openly — Netflix won't play games about their philosophy.",
  },
  {
    stage: "2. Hiring manager screen (45-60 min)",
    what_happens: "Deep dive into your experience, judgment, and fit for the specific team. Netflix hiring managers tend to probe for specific decisions you've made and why — they want to understand your thinking process, not just your outcomes. They may ask about failures and how you learned from them with unusual directness.",
    how_to_prepare: "Prepare 4-5 detailed decision stories that show how you exercised judgment when there was no clear answer. Include at least one story about a decision you made that turned out to be wrong and what you did about it. Netflix values self-awareness and learning agility.",
  },
  {
    stage: "3. Technical rounds (2-3 rounds)",
    what_happens: "Engineering roles include coding (LeetCode medium/hard) and system design. Netflix system design questions often focus on streaming infrastructure, content delivery, distributed systems at scale, and recommendation systems — specific to Netflix's actual technical domain. Non-engineering roles have domain-specific technical components.",
    how_to_prepare: "For engineering: practice system design at Netflix scale (150M+ subscribers, global streaming, personalization at scale). Study Netflix tech blog posts to understand their real architecture — asking specific questions about their systems signals genuine interest and preparation.",
  },
  {
    stage: "4. Culture interviews (1-2 rounds)",
    what_happens: "Netflix explicitly includes culture fit as part of their process — often with behavioral rounds that probe specifically for freedom/responsibility alignment, candor, and judgment. Questions like 'Tell me about a time you disagreed with a decision your company made and what you did about it' are common.",
    how_to_prepare: "Prepare stories that show you've exercised judgment independently, given difficult feedback, received critical feedback and acted on it, and disagreed with a process or decision you thought was wrong. Diplomatic non-answers will not impress Netflix interviewers.",
  },
  {
    stage: "5. Offer and negotiation",
    what_happens: "Netflix offers are typically straightforward — high base salary, limited equity, limited bonus. They tend to move faster than other FAANG companies once they've decided. Their compensation philosophy means there's less multi-band flexibility than at companies with complex equity structures.",
    how_to_prepare: "Understand Netflix's top-of-market philosophy before negotiating. The most effective leverage is competing offers at comparable companies. Focus negotiation on base salary — Netflix is less flexible on equity than, say, Google or Meta because equity isn't their primary compensation vehicle.",
  },
];

const NETFLIX_VS_FAANG = [
  { label: "vs Google", detail: "Google is more process-driven and hierarchical despite its size. Netflix gives employees more genuine autonomy but with higher performance expectations. Google's interview is more algorithmically focused; Netflix's probes cultural fit and judgment more explicitly." },
  { label: "vs Meta", detail: "Meta is faster-moving and more data-driven. Netflix is more deliberate about culture — the Freedom & Responsibility framework is more deeply embedded in daily decision-making than Meta's value system. Meta has more equity upside; Netflix has higher base." },
  { label: "vs Amazon", detail: "Amazon's Leadership Principles are explicit and explicit in interviews. Netflix's culture values are similarly embedded but often tested less explicitly — through judgment stories rather than LP-labeled questions. Amazon has more hierarchy; Netflix has flatter decision-making." },
  { label: "vs Apple", detail: "Apple prioritizes craft, secrecy, and domain depth. Netflix prioritizes judgment, candor, and autonomy. Both have strong cultures, but they're almost opposite in character — Apple is about quality control and collaboration; Netflix is about individual accountability and freedom." },
];

const FAQS = [
  { question: "Is the Netflix keeper test applied to new employees too?", answer: "Yes — the keeper test is applied continuously, not just to tenured employees. Netflix expects managers to only retain people they're genuinely enthusiastic about keeping. New employees who perform adequately but not exceptionally may be let go with generous severance rather than given a long runway to improve. This makes Netflix a high-risk, high-reward company for career-stage employees. The upside is that if you are a keeper, you're given exceptional autonomy, compensation, and resources." },
  { question: "Does Netflix do LeetCode interviews?", answer: "Yes, engineering interviews include coding problems at LeetCode medium-to-hard difficulty, plus system design rounds. The system design component is particularly important at Netflix — they expect candidates to understand streaming infrastructure, distributed systems at scale, and the specific technical challenges of their domain. Non-engineers have domain-specific technical components instead." },
  { question: "How does Netflix's no-bonus policy work for negotiation?", answer: "Netflix's philosophy is to pay a high base salary and let employees decide how to invest it — rather than holding compensation at risk through bonuses. This means the negotiation conversation is simpler but higher-stakes: there's no bonus component to adjust. The primary lever is base salary, where Netflix is willing to pay at or above market. Competing offers from Google, Meta, or Stripe are the most effective leverage for pushing the base higher." },
];

export default async function HowToGetAJobAtNetflixPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Get a Job at Netflix — Interview Process & Culture (2025)"
        description="Netflix's Freedom & Responsibility culture changes how you need to interview. Full process breakdown and salary negotiation guide."
        url={`${BASE_URL}/blog/how-to-get-a-job-at-netflix`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Get a Job at Netflix", url: `${BASE_URL}/blog/how-to-get-a-job-at-netflix` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Netflix</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Get a Job at Netflix</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            The keeper test, Freedom &amp; Responsibility culture, and top-of-market compensation — Netflix hires differently than any other FAANG company. Here&apos;s how to prepare.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={13000} suffix="+" label="Netflix employees globally (2025) — smaller and more selective than other FAANG" accent="#DC2626" />
            <StatCard value={3} suffix="%" label="Estimated acceptance rate — among the most selective in tech" accent="#DC2626" />
            <StatCard value={150} suffix="M+" label="Subscribers Netflix serves — the scale context for system design interviews" accent="#7C3AED" />
            <StatCard value={5} label="Interview stages — including an explicit culture round that most companies skip" accent="#D97706" />
          </div>
        </div>
      </section>

      {/* What Netflix looks for */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Netflix looks for that no other tech company emphasizes as strongly</h2>
          <div className="mt-6 space-y-4">
            {NETFLIX_DIFFERENTIATORS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-[13px] font-bold text-red-600">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                  <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview stages */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Netflix&apos;s interview process — stage by stage</h2>
          <div className="mt-6 space-y-4">
            {INTERVIEW_STAGES.map((stage) => (
              <div key={stage.stage} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{stage.stage}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">What happens</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{stage.what_happens}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">How to prepare</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{stage.how_to_prepare}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Netflix vs FAANG */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Netflix vs other FAANG companies</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {NETFLIX_VS_FAANG.map((item) => (
              <div key={item.label} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-red-600 mb-2">{item.label}</p>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Preparing for a Netflix interview? Zari coaches the full process.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches you on Netflix-specific behavioral questions (keeper test alignment, candor examples, judgment under autonomy), helps tailor your resume to Netflix&apos;s domain focus, and coaches the top-of-market salary negotiation conversation.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
