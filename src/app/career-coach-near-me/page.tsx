import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Career Coach Near Me — Online Career Coaching That's Better (2025)",
  description: "Looking for a career coach near you? Zari is an AI career coach available 24/7, anywhere in the world — no commute, no scheduling, at a fraction of the cost of local career coaches.",
  keywords: ["career coach near me", "career coaching near me", "local career coach", "career counselor near me", "career coach online", "career coaching services near me", "professional career coach near me", "best career coach near me", "affordable career coach", "career coaching online vs in person"],
  alternates: { canonical: "/career-coach-near-me" },
  openGraph: {
    title: "Career Coach Near Me — Why Online Coaching Outperforms Local",
    description: "Zari is an AI career coach available 24/7, anywhere — no commute, no scheduling wait, at a fraction of local coach rates.",
    url: "/career-coach-near-me",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const FAQS = [
  { question: "Is online career coaching as effective as in-person?", answer: "For the core coaching work — resume optimisation, interview preparation, salary negotiation coaching, and career strategy — online coaching delivers the same or better outcomes than in-person, because the content and quality of coaching matters more than physical proximity. The cases where in-person has a clear advantage are for body language coaching (posture, facial expression, presentation skills), which is better observed on video anyway. For everything else, geographic proximity to your coach adds no value." },
  { question: "How much does a career coach near me cost?", answer: "Local career coaches typically charge $100–$300 per hour for one-on-one sessions, with coaching packages ranging from $500 to $5,000+. Resume writing services from career coaches typically cost $200–$600. Zari's Pro plan starts at $29/month and includes unlimited coaching across resume, LinkedIn, interview preparation, salary negotiation, and promotion coaching — with no minimum commitment." },
  { question: "What's the difference between a career coach and a career counselor?", answer: "Career coaches focus on practical job search execution: resume optimisation, interview preparation, salary negotiation, and career strategy. Career counselors often have a therapeutic or psychometric component — assessing personality, values, and interests to help with direction-finding. If you know what you want to do and need help executing the job search, a career coach is what you need. If you're unsure of your direction, a career counselor may be more appropriate." },
  { question: "How quickly can Zari help me compared to a local coach?", answer: "Zari starts immediately — no intake forms, no scheduling wait, no commute. Most job seekers complete a full resume optimisation session in under 20 minutes and see their first results (ATS score, bullet rewrites) in the same session. A local coach typically requires a 30–60 minute intake session before substantive work begins, scheduled days or weeks in advance." },
];

const COMPARE = [
  { dimension: "Availability", local: "Scheduled appointments, business hours, 2–7 day booking wait", zari: "24/7 — start now, any timezone" },
  { dimension: "Cost", local: "$100–$300/hour, $500–$5,000+ packages", zari: "Free tier + from $29/month unlimited" },
  { dimension: "Resume Optimisation", local: "Human feedback, 2–5 day turnaround", zari: "ATS scoring and rewrites in minutes" },
  { dimension: "Interview Coaching", local: "Role-play in scheduled sessions, limited by time", zari: "Unlimited mock sessions, STAR scoring, 24/7" },
  { dimension: "Salary Negotiation", local: "Strategy session, scripting support", zari: "Live negotiation simulation + benchmarks" },
  { dimension: "Commute", local: "Office visit or video call at their schedule", zari: "None — laptop or phone, anywhere" },
  { dimension: "Memory across sessions", local: "Depends on the coach's notes", zari: "Structured career memory built in" },
];

export default async function CareerCoachNearMePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Near Me", url: `${BASE_URL}/career-coach-near-me` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 45%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1">
              <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.4rem]">
                Career Coach Near Me?<br />
                <span className="text-white/50">Everywhere Is Near Enough.</span>
              </h1>
              <p className="mt-5 max-w-lg text-[16px] leading-7 text-white/55">
                The best career coach isn&apos;t the closest one — it&apos;s the one available at 11pm the night before your interview, with no commute, no scheduling wait, and no hourly billing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/platform" className="rounded-xl bg-white px-6 py-3 text-[14px] font-extrabold text-[#7C3AED]">Start free — no credit card</Link>
                <Link href="/pricing" className="rounded-xl border border-white/20 bg-white/[0.08] px-6 py-3 text-[14px] font-semibold text-white">See pricing →</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:w-[320px] lg:flex-shrink-0">
              {[{ v: "24/7", l: "available — any timezone" }, { v: "$29", l: "per month vs $100–$300/hr local" }, { v: "0", l: "commute, scheduling wait, or intake forms" }, { v: "10m", l: "from start to first actionable output" }].map(({ v, l }) => (
                <div key={l} className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center">
                  <div className="text-[1.8rem] font-extrabold leading-none">{v}</div>
                  <div className="mt-1 text-[10px] text-white/40 leading-4">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={89} suffix="%" label="of job seekers see ATS score improvement in first session" accent="#7C3AED" />
            <StatCard value={31} suffix="%" label="average salary increase with Zari negotiation coaching" accent="#059669" />
            <StatCard value={6} label="coaching surfaces: resume, LinkedIn, interview, salary, career, promotion" accent="#0D7182" />
            <StatCard value={29} label="per month — vs $100–$300/hr for local career coaches" accent="#D97706" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">Online vs. local career coach — honest comparison</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Where each approach actually wins.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 bg-[var(--bg)] border-b border-[var(--border)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Dimension</span><span>Local career coach</span><span className="text-[var(--brand)]">Zari</span>
            </div>
            {COMPARE.map(({ dimension, local, zari }) => (
              <div key={dimension} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-3">
                <span className="font-bold">{dimension}</span>
                <span className="text-[var(--muted)]">{local}</span>
                <span className="font-semibold text-[var(--brand)]">{zari}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em] text-center">What Zari coaches you on</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "📄", title: "Resume Optimisation", desc: "ATS scoring, keyword gap analysis, and bullet rewrites for your specific target role.", href: "/ai-resume-writer" },
              { icon: "🎤", title: "Interview Coaching", desc: "Mock behavioral, technical, and panel simulations with STAR scoring and language feedback.", href: "/ai-interview-coach" },
              { icon: "💼", title: "LinkedIn Optimisation", desc: "Headline, About, and experience rewrites for maximum recruiter search visibility.", href: "/ai-linkedin-optimizer" },
              { icon: "💰", title: "Salary Negotiation", desc: "Market benchmarks, counter-offer scripts, and live negotiation simulations.", href: "/salary-negotiation-coach" },
              { icon: "🚀", title: "Career Strategy", desc: "Role fit mapping, gap analysis, target company shortlist, and 30-day action plan.", href: "/ai-career-coach" },
              { icon: "📈", title: "Promotion Coaching", desc: "Promotion case building, manager conversation prep, and performance review strategy.", href: "/promotion-coach" },
            ].map(({ icon, title, desc, href }) => (
              <Link key={title} href={href} className="group rounded-2xl border border-[var(--border)] bg-white p-5 transition-colors hover:border-[var(--brand)]/30">
                <div className="mb-2 text-2xl">{icon}</div>
                <h3 className="mb-1 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Common questions</h2>
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

      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2.2rem] font-extrabold tracking-[-0.02em]">Your career coach is already here.</h2>
          <p className="mb-8 text-[15px] text-white/55">No commute. No waitlist. No $200/hr. Start your first session now and get actionable output in under 20 minutes.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#7C3AED]">Start for free — no credit card</Link>
          <p className="mt-4 text-[12px] text-white/30">Free tier: one full session per coaching surface. Pro from $29/month.</p>
        </div>
      </section>
    </PageFrame>
  );
}
