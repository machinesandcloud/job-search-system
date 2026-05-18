import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "How to Get a Job at McKinsey — Interview Process & Case Tips (2025)",
  description:
    "McKinsey's case interview process is the most rigorous structured evaluation in hiring. Full breakdown of the Problem Solving Test, case interview structure, PEI rounds, what McKinsey actually looks for, and how to navigate the recruiting funnel.",
  keywords: ["how to get a job at mckinsey", "mckinsey interview process", "mckinsey case interview", "mckinsey hiring 2025", "mckinsey recruiting tips", "mckinsey PST", "mckinsey PEI"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-mckinsey" },
  openGraph: {
    title: "How to Get a Job at McKinsey — Interview Process & Case Tips (2025)",
    description: "McKinsey's PST, structured case interviews, and PEI — the full process breakdown with prep strategy.",
    url: "/blog/how-to-get-a-job-at-mckinsey",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const MCKINSEY_DIFFERENTIATORS = [
  { signal: "The PST and Solve — structured problem-solving tests", detail: "McKinsey's Problem Solving Test (PST) or its digital replacement (Solve) is a timed, data-intensive assessment of quantitative reasoning, logical deduction, and structured problem-solving. It's not an IQ test — it's a test of whether you can parse complex data exhibits, eliminate false answers, and synthesize insights under pressure. Approximately 70% of applicants fail to advance past this stage. Preparation specifically for PST/Solve (not general GMAT prep) is the highest-leverage investment you can make in the McKinsey recruiting process." },
  { signal: "Hypothesis-driven case structure", detail: "McKinsey cases are different from BCG or Bain in their emphasis on hypothesis-driven problem-solving. You're expected to state an initial hypothesis quickly, then use data to confirm or disprove it, not to 'explore' open-endedly. Interviewers score heavily on structure upfront, efficiency of issue identification, and the clarity of your recommendation. Candidates who explore without structure, or who reach conclusions without stating them clearly, typically don't advance regardless of technical correctness." },
  { signal: "The PEI — Personal Experience Interview", detail: "McKinsey's Personal Experience Interview (PEI) is a deep dive into one behavioral story — not a series of quick STAR answers. An interviewer will spend 20-30 minutes on a single scenario, probing deeply for how you think, how you lead, and how you handle adversity. The PEI tests four themes: leadership, impact, entrepreneurial drive, and problem-solving in ambiguity. Your single story needs to be rich enough to withstand that level of scrutiny — surface-level stories collapse under PEI questioning." },
  { signal: "The 'brilliant friend' bar — communication over credentials", detail: "McKinsey's brand is built on the quality of insight delivered to clients, not the quality of the analytical work done in isolation. Interviewers explicitly evaluate whether you communicate like someone clients would trust and respect — the 'brilliant friend with business knowledge' standard. This means clarity over complexity, confident recommendations over hedged conclusions, and the ability to explain your thinking to someone who doesn't share your assumptions. This communication bar is as important as the analytical bar." },
];

const INTERVIEW_STAGES = [
  { stage: "1. Application and resume screen", what_happens: "McKinsey screens for target schools (a short list of global universities where they actively recruit), GPA, and prior professional achievement. Experienced hire and digital tracks have different screens — industry expertise, career trajectory, and specialized skills.", how_to_prepare: "Your resume needs to show leadership, initiative, and impact at scale. McKinsey recruiters look for 'stepping up' — moments when you took responsibility beyond your role. Quantify everything. 'Led team of 4' is fine; 'Led 4-person team that delivered X outcome in Y timeframe, resulting in Z' is what advances." },
  { stage: "2. McKinsey Solve (digital assessment)", what_happens: "A 70-minute game-based digital assessment replacing the PST. Tests ecosystem management, problem-solving under information constraints, and quick synthesis. Scored on percentile among all candidates.", how_to_prepare: "Practice with McKinsey Solve practice tests and the official sample cases. The Solve assessment requires familiarity with the format — it's not intuitive on first encounter. Aim for 70th+ percentile to advance. Solve.McKinsey.com offers practice cases." },
  { stage: "3. First-round cases (2 case interviews)", what_happens: "Two 40-45 minute case interviews with consultants or managers. Each has a 5-10 minute case introduction followed by a 30-35 minute structured case problem. No behavioral questions in round 1.", how_to_prepare: "200+ case practice hours is the standard for McKinsey-track preparation. Use the MECE framework, lead with your structure before diving in, and practice verbalizing your hypothesis. Case in Point (Cosentino) and McKinsey's own practice cases are the best resources. Work with a case partner who'll push back aggressively." },
  { stage: "4. Final-round cases + PEI (partner-level)", what_happens: "Two case interviews at partner level (harder cases, more ambiguity, more pushback) plus one or two PEI conversations. Partners evaluate fit as much as problem-solving — they're deciding whether they'd put you in front of a CEO.", how_to_prepare: "PEI prep: select one rich leadership story from your life and practice it until you can go 30 minutes deep on any aspect of it. Case prep: partner-level cases often have no clear right answer — the evaluation is on your framework quality, hypothesis clarity, and confidence under ambiguity. Don't be rattled when the partner challenges your conclusion." },
];

const FAQS = [
  { question: "How hard is it to get a job at McKinsey?", answer: "Extremely hard — McKinsey accepts approximately 1% of all applicants. At top target schools (HBS, Wharton, INSEAD, LBS), acceptance rates are higher but still highly selective. The process involves multiple elimination stages: the Solve assessment screens out ~70% of applicants, first-round cases screen further, and final rounds are the last filter. The good news: preparation significantly improves your odds. The average unprepared candidate fails at the case stage; candidates with 200+ hours of structured practice have meaningfully better outcomes." },
  { question: "Should I apply to McKinsey, BCG, or Bain?", answer: "Apply to all three if you're targeting MBB. The differentiation: McKinsey is the largest and most globally diversified, with the strongest tech and digital practice post-COVID. BCG is known for intellectual rigor and more collaborative culture than McKinsey. Bain is known for the strongest private equity and tech practice, and typically has the highest client impact focus. The case interview format differs slightly: McKinsey is more interviewer-led with heavy hypothesis emphasis; BCG and Bain are more candidate-led. Most serious candidates apply to all three simultaneously." },
  { question: "Can I get into McKinsey without an MBA?", answer: "Yes — McKinsey has significant undergraduate recruiting at target schools (junior analyst track) and experienced hire recruiting for specialists (data science, technology, healthcare, or specific industries). The undergraduate path is extremely competitive — campus OCR is the main channel, and GPA + campus leadership matter heavily. Experienced hires without MBAs are evaluated entirely on their industry track record and the depth of specialized expertise they bring. The MBA is one pathway, not the only one." },
];

export default async function HowToGetAJobAtMcKinseyPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Get a Job at McKinsey — Interview Process & Case Tips (2025)" description="McKinsey's PST, structured case interviews, and PEI — the full process breakdown with prep strategy." url={`${BASE_URL}/blog/how-to-get-a-job-at-mckinsey`} datePublished={publishDate} dateModified={publishDate} />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job at McKinsey", url: `${BASE_URL}/blog/how-to-get-a-job-at-mckinsey` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Consulting</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Get a Job at McKinsey</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">The Solve assessment, hypothesis-driven case interviews, and the deep-dive PEI. McKinsey&apos;s process is unlike any other employer — here&apos;s the full breakdown and what to prepare for each stage.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={1} suffix="%" label="Acceptance rate at McKinsey — the most selective hiring process in business" accent="#003087" />
            <StatCard value={4} label="PEI themes evaluated in a single 30-minute behavioral deep-dive" accent="#7C3AED" />
            <StatCard value={200} suffix="+" label="Case practice hours recommended for McKinsey-track preparation" accent="#D97706" />
            <StatCard value={4} label="Interview stages from Solve assessment to partner-level PEI" accent="#059669" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What McKinsey looks for and why their process is different</h2>
          <div className="mt-6 space-y-4">
            {MCKINSEY_DIFFERENTIATORS.map((item, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#003087]/10 text-[13px] font-bold text-[#003087]">{i + 1}</span>
                <div><p className="font-bold text-[var(--ink)]">{item.signal}</p><p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">McKinsey&apos;s interview process — stage by stage</h2>
          <div className="mt-6 space-y-4">
            {INTERVIEW_STAGES.map((stage) => (
              <div key={stage.stage} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3"><p className="font-bold text-[var(--ink)]">{stage.stage}</p></div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">What happens</p><p className="text-[13px] leading-6 text-[var(--muted)]">{stage.what_happens}</p></div>
                  <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">How to prepare</p><p className="text-[13px] leading-6 text-[var(--muted)]">{stage.how_to_prepare}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (<div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5"><p className="font-bold text-[var(--ink)]">{faq.question}</p><p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p></div>))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Preparing for McKinsey? Zari coaches the PEI and behavioral prep.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches McKinsey&apos;s PEI deep-dive (all 4 themes with interrogation-depth practice), your leadership story development, and the communication bar that separates candidates who advance from those who don&apos;t.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
