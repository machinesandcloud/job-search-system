import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Online Career Coach — AI-Powered Career Coaching Available 24/7 (2025)",
  description: "Zari is the world's most comprehensive online career coach. Resume, LinkedIn, interview, salary negotiation, and promotion coaching — available instantly, anywhere.",
  keywords: ["online career coach", "career coaching online", "virtual career coach", "career coaching platform", "best online career coach", "online career counseling", "career coach app", "career coaching service online", "AI online career coach", "online career coaching 2025"],
  alternates: { canonical: "/online-career-coach" },
  openGraph: { title: "Online Career Coach — AI Career Coaching 24/7", description: "Resume, LinkedIn, interview, salary, and promotion coaching available instantly. The most comprehensive online career coach.", url: "/online-career-coach" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const FAQS = [
  { question: "What can an online career coach do that a book or YouTube video can't?", answer: "Generic advice doesn't account for your specific background, target role, and the exact job description you're applying for. An online career coach that works with your actual resume, your actual answers, and your actual career context produces actionable output — not general frameworks. Zari reads your resume, scores it against your specific JD, and produces targeted rewrites. That's the difference between knowing a framework and actually implementing it." },
  { question: "Is online career coaching legitimate?", answer: "Yes. The coaching industry has moved significantly online since 2020. Many of the most respected career coaches in their fields now operate primarily online. The quality of coaching depends on the coach's methodology and expertise, not whether sessions are conducted remotely." },
  { question: "How does Zari compare to a human online career coach?", answer: "Human online career coaches bring judgment, empathy, and real-world professional context. They're best for high-stakes situations requiring nuanced human judgment. Zari provides faster, more consistent output at a fraction of the cost — available immediately without scheduling. For most job seekers, the combination of Zari for systematic preparation and a human coach for specific high-stakes moments (final round at your dream company) produces the best results." },
  { question: "What certifications or qualifications should I look for in an online career coach?", answer: "For resume-specific coaching, look for CPRW (Certified Professional Resume Writer) credentials. For broader career coaching, ICF (International Coach Federation) certification. For interview coaching, no standardised credential exists — evaluate by methodology and client outcomes. Zari's coaching surfaces are built on frameworks validated by senior hiring managers and recruiters across tech, finance, consulting, and healthcare." },
];

export default async function OnlineCareerCoachPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Online Career Coach", url: `${BASE_URL}/online-career-coach` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 40%, #7C3AED 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                Online Career Coach
              </div>
              <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.4rem]">
                The World&apos;s Most Comprehensive<br />
                <span className="text-white/50">Online Career Coach.</span>
              </h1>
              <p className="mt-5 max-w-lg text-[16px] leading-7 text-white/55">
                Resume. LinkedIn. Interviews. Salary negotiation. Promotion. Career strategy. Six coaching surfaces, one platform, available right now — no scheduling, no waitlist.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/platform" className="rounded-xl bg-white px-6 py-3 text-[14px] font-extrabold text-[#0D7182]">Start free — no credit card</Link>
                <Link href="/ai-career-coach" className="rounded-xl border border-white/20 bg-white/[0.08] px-6 py-3 text-[14px] font-semibold text-white">Learn more →</Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 lg:w-[360px] lg:flex-shrink-0">
              {["Resume", "LinkedIn", "Interviews", "Salary", "Promotion", "Strategy"].map(s => (
                <div key={s} className="rounded-xl border border-white/10 bg-white/[0.06] p-3 text-center">
                  <div className="text-[12px] font-bold text-white/70">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={6} label="coaching surfaces in one platform" accent="#0D7182" />
            <StatCard value={89} suffix="%" label="of users improve their ATS score in the first session" accent="#7C3AED" />
            <StatCard value={10} label="minutes to first actionable output" accent="#059669" />
            <StatCard value={29} label="per month Pro plan — free tier available" accent="#D97706" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center text-[2rem] font-extrabold tracking-[-0.02em]">Six coaching surfaces. One platform.</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "📝", title: "Resume & ATS Optimisation", desc: "Score your resume against your target JD. Get keyword gaps and bullet rewrites in minutes.", href: "/ai-resume-writer", color: "#0D7182" },
              { icon: "🎤", title: "Mock Interview Coaching", desc: "Behavioral, technical, and panel simulations with real-time STAR scoring and language feedback.", href: "/ai-interview-coach", color: "#7C3AED" },
              { icon: "💼", title: "LinkedIn Optimisation", desc: "Headline, About, and experience rewrites that move you from 54 to 91 visibility score.", href: "/ai-linkedin-optimizer", color: "#0A66C2" },
              { icon: "💰", title: "Salary Negotiation", desc: "Market data, counter-offer scripts, and live simulation so you never leave money on the table.", href: "/salary-negotiation-coach", color: "#059669" },
              { icon: "📈", title: "Promotion Coaching", desc: "Build your promotion case, simulate the manager conversation, and prep for performance reviews.", href: "/promotion-coach", color: "#D97706" },
              { icon: "🎯", title: "Career Strategy", desc: "Role fit mapping, gap analysis, target company shortlist, and 30-day action plan.", href: "/ai-career-coach", color: "#DC2626" },
            ].map(({ icon, title, desc, href, color }) => (
              <Link key={title} href={href} className="group rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 transition-colors hover:border-[var(--brand)]/30">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-xl" style={{ background: `${color}15` }}>{icon}</div>
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
                <div className="mt-3 text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>Learn more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2.2rem] font-extrabold tracking-[-0.02em]">Career coaching, available now.</h2>
          <p className="mb-8 text-[15px] text-white/55">No scheduling. No waitlist. No commute. Start your first session in the next 60 seconds.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
