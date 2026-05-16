import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Claude — AI Career Coach vs General AI Assistant (2025)",
  description:
    "Zari vs Claude AI: can Anthropic's Claude replace a dedicated AI career coach? We compare ATS optimization, interview coaching, resume feedback, and career strategy capabilities.",
  keywords: ["zari vs claude", "claude ai career coach", "claude for job search", "claude resume help", "claude vs dedicated career ai", "anthropic claude career coaching", "best ai for job search 2025"],
  alternates: { canonical: "/compare/zari-vs-claude" },
  openGraph: {
    title: "Zari vs Claude — General AI vs Dedicated Career Coach (2025)",
    description: "Claude is a powerful general-purpose AI. Zari is purpose-built for job search coaching. Here's what that difference actually means.",
    url: "/compare/zari-vs-claude",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "Can Claude write a good resume?", answer: "Claude can generate resume content that sounds professional, but it has no access to your target job descriptions, no ATS keyword scoring, and no memory of your previous work. It produces a document — not an optimized one. Zari specifically scores your resume against the job you're applying to, identifies missing keywords, and rewrites for ATS compatibility." },
  { question: "Can Claude help me prep for job interviews?", answer: "Claude can discuss interview questions conversationally, but it has no way to evaluate whether your specific answer is strong or weak against what interviewers actually want to hear. Zari's interview coach evaluates your answers in real time — flagging vague responses, missing metrics, weak STAR structure, and specific phrases that signal low confidence to interviewers." },
  { question: "Why would I use Zari instead of just using Claude or ChatGPT?", answer: "Zari maintains memory across your entire job search — your resume, your target roles, your interview history. It knows your background and tailors coaching to your specific situation rather than responding to each prompt as if it's a new conversation. It also has purpose-built scoring models for ATS optimization, LinkedIn keyword density, and interview answer quality that general AI tools don't have." },
  { question: "Is Claude bad for job search?", answer: "Claude is an excellent general-purpose AI that can help with many aspects of a job search if you know how to prompt it well. But it requires you to be the expert — you have to know what to ask, evaluate the output yourself, and re-explain your context every session. Zari is built so you don't have to do that work." },
];

const SCENARIOS = [
  {
    scenario: "Writing a resume for a specific job",
    claude: "You paste the job description, describe your background, and Claude generates a resume. The output is grammatically polished but not scored — you don't know if it's missing critical keywords or structured in a way that ATS will reject. Every session starts fresh with no memory of prior context.",
    zari: "Paste the job description once. Zari scores your existing resume against it — keyword match percentage, missing skills, structural issues. Then it rewrites specific bullets to improve the score. You can iterate. It remembers your background.",
    edge: "zari",
  },
  {
    scenario: "Interview question practice",
    claude: "You can ask Claude to pretend to interview you and it'll generate questions. When you answer, it can give general feedback. But it has no calibrated model of what 'strong' looks like — it's pattern-matching from training data, not evaluating against an interviewer rubric.",
    zari: "Practice specific questions with real-time evaluation. Zari scores answer quality on dimensions interviewers care about: specificity, STAR structure, quantified impact, confidence signals. It flags weak answers and suggests rewrites.",
    edge: "zari",
  },
  {
    scenario: "LinkedIn headline and About optimization",
    claude: "Claude can rewrite your headline and About section if you provide your background. Output quality depends entirely on how well you brief it. No keyword scoring, no knowledge of what LinkedIn's algorithm prioritizes.",
    zari: "AI-driven LinkedIn coaching optimized for recruiter search. Headline formula based on how recruiters actually search, About section with keyword density analysis, experience bullets targeted for discoverability.",
    edge: "zari",
  },
  {
    scenario: "Open-ended career strategy questions",
    claude: "Strong. Claude is excellent at nuanced, open-ended reasoning — career pivot advice, negotiation strategy, how to think about a difficult decision. Its general intelligence shines in unstructured problems.",
    zari: "Strong. Zari can also answer career strategy questions and has the advantage of knowing your history — it can connect advice to your specific situation rather than giving generic guidance.",
    edge: "tie",
  },
  {
    scenario: "Generating cover letters quickly",
    claude: "Fast and high quality. Claude is one of the best tools for generating well-written cover letters with minimal prompting. If you know how to prompt it effectively, results are excellent.",
    zari: "Zari generates cover letters with the advantage of knowing your resume and the specific job — the connection between your experience and the role is tighter. But the drafting speed is similar.",
    edge: "tie",
  },
  {
    scenario: "Salary negotiation coaching",
    claude: "Can discuss negotiation frameworks and strategies at a general level. Doesn't know your specific offer, market data for your role, or your leverage.",
    zari: "Dedicated negotiation coach: counter-offer scripts, how to respond to specific pushbacks, equity vs. salary trade-off analysis, timing guidance. Knows your target role and market context.",
    edge: "zari",
  },
];

export default async function ZariVsClaudePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Claude", url: `${BASE_URL}/compare/zari-vs-claude` },
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
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Claude</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Claude (by Anthropic) is one of the most capable AI assistants available — excellent at reasoning, writing, and analysis. But it&apos;s a general-purpose tool. Zari is purpose-built for one thing: helping you land your next job. Here&apos;s what that difference actually means in practice.
          </p>

          {/* The core distinction */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">Claude is</p>
              <p className="mt-2 text-[20px] font-extrabold text-white">A general intelligence</p>
              <p className="mt-3 text-[13px] leading-6 text-white/50">Brilliant across thousands of domains. You bring the expertise about your situation — Claude brings the reasoning. Every session starts fresh.</p>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]/70">Zari is</p>
              <p className="mt-2 text-[20px] font-extrabold text-white">A career specialist</p>
              <p className="mt-3 text-[13px] leading-6 text-white/60">Purpose-built for job search with ATS scoring, interview evaluation, and session memory. It knows your background and coaches to your situation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scenario breakdown */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Real job search scenarios — who wins?</h2>
          <div className="mt-10 space-y-6">
            {SCENARIOS.map((s) => (
              <div key={s.scenario} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{s.scenario}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${s.edge === "zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" : s.edge === "tie" ? "bg-slate-100 text-slate-500" : "bg-slate-100 text-slate-500"}`}>
                    {s.edge === "zari" ? "Zari wins" : "Roughly equal"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Claude</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{s.claude}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{s.zari}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* The honest take */}
          <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50/50 p-8">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">The honest verdict</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Claude is not a bad tool for job searching. If you&apos;re a skilled prompter and you know exactly what to ask for, you can get useful output on any job search task. Some people do this effectively.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              But the key word is <em>if</em>. To get the most out of Claude for job search, you need to already know what a strong resume looks like, what ATS systems care about, what interviewers are evaluating, and what your market rate is. You&apos;re directing the process yourself — Claude is executing.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Zari is built so you don&apos;t need to be the expert. It knows the rubrics — what makes a resume ATS-ready, what makes an interview answer strong, how to think about salary negotiation at your level. You bring your experience; Zari brings the coaching structure.
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
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Try the purpose-built version — free</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">No prompting expertise required. Zari knows what to look for and tells you exactly what to fix.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start for free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
