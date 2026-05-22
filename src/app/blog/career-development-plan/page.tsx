import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Write a Career Development Plan 2025 — Template & Examples",
  description: "Build a career development plan that actually works. Step-by-step framework, free template, and real examples for building a 1-year, 3-year, and 5-year career plan.",
  keywords: ["career development plan", "career development plan template", "how to write a career development plan", "career plan", "5 year career plan", "professional development plan", "career growth plan", "individual development plan", "career planning template 2025"],
  alternates: { canonical: "/blog/career-development-plan" },
  openGraph: { title: "How to Write a Career Development Plan 2025 — Template & Examples", description: "Step-by-step framework for building a 1-year, 3-year, and 5-year career plan that actually works.", url: "/blog/career-development-plan" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What should a career development plan include?", answer: "A useful career development plan has five components: (1) Your current state — skills, role, and honest gap analysis. (2) Your target state — the specific role, level, and company type you want in 1, 3, and 5 years. (3) Gap identification — the skills, experience, and credentials you need to bridge the gap. (4) Concrete actions — courses, projects, mentors, lateral moves, with owners and deadlines. (5) Review cadence — quarterly check-ins to adjust the plan based on what's changed." },
  { question: "How often should I update my career development plan?", answer: "Review it quarterly, update it annually or when something significant changes (new role, layoff, career pivot). Most career plans fail because they're written once and never revisited. A career plan is a living document — the goal is directional, the actions should be updated based on what's actually working. Rigid 5-year plans are rarely useful; directional 5-year plans reviewed quarterly are." },
  { question: "What's the difference between a career development plan and an IDP?", answer: "An Individual Development Plan (IDP) is typically an employer-initiated document focused on your development within your current role and company — it's written with your manager and usually tied to performance review cycles. A career development plan is personally owned, can span multiple employers, and is focused on your long-term career trajectory — not just what your current employer needs from you. You should have both." },
  { question: "How do I create a 5-year career plan?", answer: "Work backwards from the 5-year target. Define the specific role you want in 5 years (title, company type, industry). Then ask: what does someone with that job look like? What skills, credentials, and experience do they have? Where did they work for 3 years before that role? Then define the 3-year checkpoint (the job that leads to the 5-year target) and the 1-year milestone (what you need to achieve in the next year to be on track). This reverse-engineering approach is more reliable than forward-planning from your current state." },
];

const STEPS = [
  { n: "1", title: "Audit your current state", items: ["List every skill you have (technical, functional, soft)", "Document your achievements with metrics from the last 3 years", "Be honest about your gaps — what consistently limits you?", "Map your current role, level, company type, and compensation"] },
  { n: "2", title: "Define your 1 / 3 / 5-year targets", items: ["1 year: one level up or a specific skill acquired", "3 years: the job title and company type you want to be in", "5 years: the career position you're building toward", "Write each target as a specific role, not just a direction"] },
  { n: "3", title: "Identify the gaps", items: ["What credentials do you need? (certifications, degrees, training)", "What experience do you not yet have? (company size, function, industry)", "Who do you need to know? (mentors, sponsors, network nodes)", "What behaviors need to change? (executive presence, delegation, etc.)"] },
  { n: "4", title: "Build a 90-day action plan", items: ["Choose 3–5 actions from your gap list for the next 90 days", "Assign each action a specific owner (you) and deadline", "Include lead indicators, not just lag indicators", "Schedule your first quarterly review date now"] },
];

export default async function CareerDevelopmentPlanPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-01-15";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How to Write a Career Development Plan 2025 — Template & Examples"
        description="Step-by-step framework for building a 1-year, 3-year, and 5-year career plan that actually works."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/career-development-plan`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Career Development Plan", url: `${BASE_URL}/blog/career-development-plan` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            Career Planning · Framework · Template
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Development Plan<br />
            <span className="text-white/50">That Actually Works</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            A four-step framework for building a 1-year, 3-year, and 5-year career plan — with a template you can use today and examples across functions and industries.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated 2025 · 8 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-8 text-[15px] leading-8 text-[var(--muted)]">Most career development plans fail for the same reason: they&apos;re written once, filed, and never looked at again. A plan that collects dust isn&apos;t a plan — it&apos;s a wish list. This framework is designed to be used, updated, and acted on.</p>

          {STEPS.map(({ n, title, items }) => (
            <div key={n} className="mb-10">
              <h2 className="mb-4 text-[1.5rem] font-extrabold tracking-[-0.02em]">Step {n}: {title}</h2>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-3 text-[14px] leading-6 text-[var(--muted)]">
                    <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-[10px] font-bold text-[#7C3AED]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Career development plan template</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Section</span><span>What to write</span><span>Example</span>
            </div>
            {[
              { s: "1-year goal", w: "Specific role + skill or credential to acquire", e: "\"Promoted to Senior PM, or joined a Series B+ startup as PM\"" },
              { s: "3-year goal", w: "Title + company type you want to be at", e: "\"Group PM / Director of Product at a Series C fintech or at FAANG\"" },
              { s: "5-year goal", w: "Career position — not just a job", e: "\"VP Product or CPO at a $100M+ company or my own startup\"" },
              { s: "Key gaps", w: "3–5 specific gaps between now and 1-year goal", e: "\"Need P&L ownership, need to manage a PM, need ML product exposure\"" },
              { s: "90-day actions", w: "Concrete steps you will take in next 90 days", e: "\"Find PM mentor by March, launch ML feature by April, apply to 5 Director roles\"" },
              { s: "Review date", w: "Set a hard date to review progress", e: "\"Quarterly review: April 1, July 1, October 1\"" },
            ].map(({ s, w, e }) => (
              <div key={s} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold">{s}</span>
                <span className="text-[var(--muted)]">{w}</span>
                <span className="text-[12px] italic text-[var(--muted)]">{e}</span>
              </div>
            ))}
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Build your career plan with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">Career strategy coaching that maps your gaps, builds your 90-day action plan, and tracks your progress — available now, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#7C3AED]">Start career coaching free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
