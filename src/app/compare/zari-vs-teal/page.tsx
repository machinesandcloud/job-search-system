import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Teal HQ — Job Tracker vs AI Career Coach (2025)",
  description:
    "Teal helps you organize your job search. Zari helps you win it. Honest comparison of Teal HQ vs Zari on resume, LinkedIn, interviews, and what actually drives more callbacks.",
  keywords: ["Zari vs Teal", "Teal HQ alternative", "Teal HQ vs Zari", "Teal HQ review 2025", "Teal career tool comparison", "job tracker vs career coach", "teal hq worth it"],
  alternates: { canonical: "/compare/zari-vs-teal" },
  openGraph: {
    title: "Zari vs Teal HQ (2025) — Which Moves the Needle?",
    description: "Teal makes you organized. Zari makes your applications land. Understanding which problem you actually have.",
    url: "/compare/zari-vs-teal",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "What does Teal HQ actually do?",
    answer: "Teal HQ is a job search management platform. Core features: a kanban-style application tracker (applied, phone screen, interview, offer), a resume builder with basic AI writing assistance, a browser extension for saving jobs from any site, and a 'LinkedIn Score' metric that evaluates your profile. Free plan available; premium is around $29/month.",
  },
  {
    question: "Can I use Teal and Zari at the same time?",
    answer: "Yes, and it's actually a strong combination. Teal handles the organizational layer — tracking where you've applied, what stage each application is in, saving jobs you find. Zari handles the coaching layer — making your resume and LinkedIn strong enough to get responses, then prepping you for every interview you track in Teal.",
  },
  {
    question: "Does Teal help you improve your resume?",
    answer: "Teal has a resume builder with AI content suggestions and basic ATS guidance. It's more template-and-builder than active coaching — useful for formatting and organization, less useful for the kind of specific, JD-targeted keyword optimization and bullet rewriting that Zari provides.",
  },
  {
    question: "What does Zari do that Teal doesn't?",
    answer: "Zari provides AI-powered resume coaching with specific bullet rewrites (not just suggestions), LinkedIn profile optimization for recruiter search rankings, mock interview coaching with STAR answer evaluation, salary negotiation simulation, and session memory across all coaching. Teal's strength is on the organizational side: tracking, saving jobs, and workflow management.",
  },
  {
    question: "Which should I prioritize: a job tracker or a career coach?",
    answer: "Most job seekers overinvest in organization and underinvest in quality. If you're applying to 40 jobs and getting no callbacks, a better tracker won't fix that — better materials and prep will. If you're getting interviews but losing track of which stage each application is in, a tracker is the right tool. Diagnose the actual bottleneck first.",
  },
];

const DIMENSIONS = [
  {
    category: "Application Tracking",
    teal: "Teal's core strength. Kanban-style pipeline: saved, applied, phone screen, interview, offer, rejected. Chrome extension lets you save jobs from any board with one click. Clean interface for keeping track of 20–50 active applications.",
    zari: "Not a tracker. Zari doesn't manage application pipelines or save job listings. For organization, a tool like Teal is better.",
    winner: "teal",
    winnerNote: "If you're running a high-volume search and need to stay organized, Teal's tracker is genuinely useful.",
  },
  {
    category: "Resume Coaching & Rewrites",
    teal: "Teal's resume builder includes AI writing suggestions and basic ATS tips. It helps you structure your resume and provides some keyword guidance — but it's a builder with assistance, not an active coaching platform.",
    zari: "Analyzes your resume against a specific job description, identifies keyword gaps and weak bullets, and produces the rewritten versions. Not suggestions — actual replacement bullets ready to paste. The session is a back-and-forth until your resume is genuinely strong for the target role.",
    winner: "zari",
    winnerNote: "Building a resume vs. coaching it to win a specific role are meaningfully different tasks.",
  },
  {
    category: "LinkedIn Optimization",
    teal: "Teal provides a 'LinkedIn Score' — a metric evaluating your profile completeness and optimization. Shows what's missing but doesn't rewrite sections for you.",
    zari: "Rewrites your LinkedIn headline, About section, and experience bullets with keywords that show up in recruiter searches for your specific target role. The output is copy you can paste directly into your profile.",
    winner: "zari",
    winnerNote: "Knowing your LinkedIn score is less useful than having an optimized profile.",
  },
  {
    category: "Interview Preparation",
    teal: "Not offered. Teal is focused on the pre-interview stage: organizing applications and building materials.",
    zari: "Full AI mock interview coach. Practice common questions, behavioral questions with STAR scoring, role-specific technical questions, and situational questions. Real-time feedback on specificity, structure, and where answers fall flat.",
    winner: "zari",
    winnerNote: "A well-tracked application means nothing if you're not ready for the interview.",
  },
  {
    category: "Salary Negotiation",
    teal: "Not offered.",
    zari: "Simulates the offer negotiation conversation. Practice anchoring your number, countering a lowball offer, and responding to common negotiation deflections: 'we're at the top of the band,' 'the offer is firm,' 'we can revisit at 90 days.'",
    winner: "zari",
    winnerNote: "Offer negotiation is the highest-leverage hour in a job search. Most candidates don't practice it.",
  },
  {
    category: "Job Discovery",
    teal: "Teal integrates with job boards and allows you to save jobs from LinkedIn, Indeed, and other sites via browser extension. It doesn't generate new job listings but makes managing ones you find much easier.",
    zari: "Not a job board. Zari doesn't aggregate listings. Find your roles through Teal, LinkedIn, or any job board — bring the JD to Zari for resume and interview prep.",
    winner: "teal",
    winnerNote: "Teal is built around the job discovery and application workflow. Zari starts where the application goes in.",
  },
  {
    category: "Career Coaching Depth",
    teal: "Teal's AI assistance is template-and-builder style — it helps you fill in a resume structure and provides writing suggestions. Deep conversational coaching is not the product.",
    zari: "Conversational AI coaching that builds context session over session. You can explore career strategy, get coached on a difficult conversation, work through a specific interview question that tripped you up, or rethink your positioning entirely.",
    winner: "zari",
    winnerNote: "Organization and coaching are different jobs. Teal does the first. Zari does the second.",
  },
];

export default async function ZariVsTealPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Teal", url: `${BASE_URL}/compare/zari-vs-teal` },
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
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs Teal HQ</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            Teal and Zari solve different problems. Teal is an organization tool — it keeps your search structured and your applications tracked. Zari is a coaching tool — it makes your materials strong enough to get responses and preps you to win the interviews. Here&apos;s the full comparison.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">Teal is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Tracking 30–50 active applications across multiple job boards",
                  "Saving jobs from any site with one click via browser extension",
                  "Staying organized when you're deep in a high-volume search",
                  "Managing pipeline stages from saved to offer",
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
                  "Making your resume strong enough to actually get callbacks",
                  "Optimizing LinkedIn so recruiters find you instead of you applying",
                  "Mock interview coaching so you win the interviews you track in Teal",
                  "Salary negotiation when you get to the offer stage",
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

      {/* Tracking vs coaching */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Diagnosing the real bottleneck</h2>
          <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
            Most job seekers don&apos;t have an organization problem — they have a conversion problem. The question to ask before choosing a tool:
          </p>
          <div className="mt-6 space-y-4">
            {[
              {
                symptom: "You're applying but not getting responses",
                problem: "Your resume isn't passing ATS filters, or the LinkedIn profile isn't generating inbound interest. Organization isn't the issue — quality is.",
                tool: "Zari",
              },
              {
                symptom: "You're getting interviews but not offers",
                problem: "Your application is strong but your interview performance needs work. Practice and specific feedback will close this gap.",
                tool: "Zari",
              },
              {
                symptom: "You're applying to many roles and losing track of where you are",
                problem: "This is an organization problem. A tracker like Teal directly addresses it.",
                tool: "Teal",
              },
              {
                symptom: "You have both: weak materials AND too many applications to track",
                problem: "Fix the quality first — high-volume applications with weak materials just produce organized rejections. Then use Teal to manage the pipeline once your conversion rate improves.",
                tool: "Both (Zari first)",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.symptom}</p>
                    <p className="mt-1.5 text-[13.5px] text-[var(--muted)]">{item.problem}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${item.tool === "Zari" || item.tool === "Both (Zari first)" ? "bg-[var(--brand)]/10 text-[var(--brand)]" : "bg-slate-100 text-slate-600"}`}>
                    {item.tool}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dimension breakdown */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Where each tool genuinely wins — including where Teal wins.</p>

          <div className="mt-10 space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.category} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.category}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    dim.winner === "zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" : "bg-slate-100 text-slate-500"
                  }`}>
                    {dim.winner === "zari" ? "Zari wins" : "Teal wins"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Teal HQ</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.teal}</p>
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
              Teal and Zari aren&apos;t really competitors — they&apos;re different layers of the job search stack. Teal is the organizational layer: where did I apply, what stage is it, when do I follow up. Zari is the performance layer: is my resume strong enough to get the interview, and am I ready to win it.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The more common mistake is over-optimizing for organization when the actual problem is conversion. If you&apos;re sending out 50 applications a month with no responses, getting better at tracking them won&apos;t help. Tightening your resume and LinkedIn for the specific roles you&apos;re targeting will.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              For most job seekers, the right sequence is: fix the quality first with Zari, then if volume becomes the bottleneck, add Teal for organization. They complement each other cleanly — they just don&apos;t overlap.
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
          <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">Get more responses, not just more tracking.</h2>
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
