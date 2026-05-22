import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "AI Career Coach India 2025 — Career Coaching in India (₹ Salary Data)",
  description: "Zari is the AI career coach for India's job market. Resume ATS scoring for Naukri & LinkedIn, interview prep for TCS/Infosys/FAANG India, salary benchmarks in INR, and salary negotiation coaching.",
  keywords: ["AI career coach India", "career coach India", "career coaching India", "online career coach India", "AI resume writer India", "job interview coaching India", "salary negotiation India", "career counselling India", "best career coach India 2025", "career guidance India"],
  alternates: { canonical: "/ai-career-coach-india" },
  openGraph: { title: "AI Career Coach India 2025 — Career Coaching for the Indian Job Market", description: "Resume, LinkedIn, interview, and salary coaching built for India's job market — Naukri, LinkedIn, TCS, Infosys, and FAANG India.", url: "/ai-career-coach-india" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How is the Indian job market different for resume writing?", answer: "Indian resumes typically run 2–3 pages and include details that US/UK resumes exclude — date of birth, photograph (in some sectors), and marital status are still common, though large multinationals and FAANG India increasingly prefer the shorter, achievement-focused international format. For tech roles at Indian product companies or FAANG, ATS optimisation matters as much as in the US. Zari optimises for both Naukri ATS and international LinkedIn/Workday formats." },
  { question: "What salary benchmarks does Zari use for Indian job markets?", answer: "Zari uses market data spanning Tier 1 cities (Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai) and adjusts for sector, experience band, and company type (Big 4 IT services, Indian product startups, MNC India offices, FAANG India). Salaries in India vary dramatically by company type — a 5-year SWE at TCS vs. a 5-year SWE at a Series B startup or Google India can differ 3–5x." },
  { question: "Does Zari help with interviews at Indian companies like TCS, Infosys, and Wipro?", answer: "Yes. Zari's interview coach covers the specific formats used by large Indian IT services companies (competency interviews, technical assessments, HR rounds) as well as product company and FAANG India interview formats (DSA-heavy technical rounds, system design, and behavioural interviews mapped to company-specific leadership principles)." },
  { question: "Can Zari help with salary negotiation in India?", answer: "Yes. Salary negotiation in India is culturally different from the US — offers often include a complex mix of CTC components (basic, HRA, PF contributions, variable pay, joining bonus, ESOPs). Zari's salary coaching helps you understand your true CTC, benchmark against market, and negotiate the components that matter most for your take-home." },
];

export default async function AICareerCoachIndiaPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach India", url: `${BASE_URL}/ai-career-coach-india` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #FF9933 0%, #0D1B2A 45%, #138808 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                🇮🇳 AI Career Coach — India
              </div>
              <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.4rem]">
                AI Career Coach<br />
                <span className="text-white/50">Built for India&apos;s Job Market.</span>
              </h1>
              <p className="mt-5 max-w-lg text-[16px] leading-7 text-white/55">
                Resume ATS scoring for Naukri and LinkedIn. Interview coaching for TCS, Infosys, Wipro, and FAANG India. Salary benchmarks in INR across Bangalore, Mumbai, Delhi NCR, Hyderabad, and Pune.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/platform" className="rounded-xl bg-white px-6 py-3 text-[14px] font-extrabold text-[#FF9933]">Start free — no credit card</Link>
                <Link href="/ai-career-coach" className="rounded-xl border border-white/20 bg-white/[0.08] px-6 py-3 text-[14px] font-semibold text-white">Learn more →</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:w-[340px] lg:flex-shrink-0">
              {[
                { v: "Naukri", l: "ATS optimisation" },
                { v: "₹INR", l: "salary benchmarks by city" },
                { v: "FAANG", l: "India interview prep" },
                { v: "24/7", l: "available across all IST timezones" },
              ].map(({ v, l }) => (
                <div key={l} className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center">
                  <div className="text-[1.6rem] font-extrabold leading-none">{v}</div>
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
            <StatCard value={6} label="coaching surfaces: resume, LinkedIn, interview, salary, promotion, career strategy" accent="#FF9933" />
            <StatCard value={89} suffix="%" label="of users improve their ATS score in first session" accent="#138808" />
            <StatCard value={10} label="minutes to first actionable output — no scheduling needed" accent="#0D7182" />
            <StatCard value={29} label="per month — fraction of local career coaching rates" accent="#7C3AED" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center text-[2rem] font-extrabold tracking-[-0.02em]">Built for India&apos;s job market</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "📄", title: "Naukri & LinkedIn ATS", desc: "Score your resume against Naukri's ATS and international applicant tracking systems. Keyword gap analysis for Indian and global roles.", href: "/ai-resume-writer", color: "#FF9933" },
              { icon: "🎤", title: "Interview Coaching (All Formats)", desc: "TCS/Infosys HR rounds, product company interviews, FAANG India DSA prep, and system design mock interviews with STAR scoring.", href: "/ai-interview-coach", color: "#138808" },
              { icon: "💼", title: "LinkedIn Optimisation", desc: "Headline, About, and experience rewrites optimised for Indian recruiter search and global visibility.", href: "/ai-linkedin-optimizer", color: "#0A66C2" },
              { icon: "💰", title: "CTC & Salary Negotiation", desc: "Decode complex CTC structures (basic, HRA, variable, PF, ESOPs) and negotiate the components that matter most for take-home pay.", href: "/salary-negotiation-coach", color: "#0D7182" },
              { icon: "📈", title: "Promotion Coaching", desc: "Build your promotion case, prep the manager conversation, and navigate the Indian corporate ladder from IC to leadership.", href: "/promotion-coach", color: "#D97706" },
              { icon: "🎯", title: "Career Strategy", desc: "IT services vs product companies vs startups vs MNC India — role fit mapping, gap analysis, and 30-day action plan.", href: "/ai-career-coach", color: "#7C3AED" },
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

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Salary benchmarks — India 2025 (₹ LPA)</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-6 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span className="col-span-2">Role</span><span>Bangalore</span><span>Mumbai</span><span>Delhi NCR</span><span>Hyderabad</span>
            </div>
            {[
              { role: "Software Engineer (3–5 yrs)", b: "₹18–35L", m: "₹16–32L", d: "₹16–30L", h: "₹16–32L" },
              { role: "Senior SWE / Tech Lead", b: "₹35–70L", m: "₹30–65L", d: "₹30–60L", h: "₹32–68L" },
              { role: "Product Manager", b: "₹25–55L", m: "₹22–50L", d: "₹22–48L", h: "₹22–50L" },
              { role: "Data Scientist", b: "₹20–45L", m: "₹18–40L", d: "₹18–38L", h: "₹18–42L" },
              { role: "Business Analyst", b: "₹12–22L", m: "₹12–22L", d: "₹10–20L", h: "₹10–20L" },
              { role: "FAANG SWE (all levels)", b: "₹50–200L+", m: "₹45–180L+", d: "₹45–180L+", h: "₹50–200L+" },
            ].map(({ role, b, m, d, h }) => (
              <div key={role} className="grid grid-cols-6 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="col-span-2 font-bold">{role}</span>
                <span className="font-semibold text-[#FF9933]">{b}</span>
                <span>{m}</span><span>{d}</span><span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
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

      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #FF9933 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2.2rem] font-extrabold tracking-[-0.02em]">Your AI career coach. Available now across India.</h2>
          <p className="mb-8 text-[15px] text-white/55">No scheduling. No commute. Naukri ATS scoring, FAANG interview prep, and CTC negotiation coaching — start your first session in 60 seconds.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#FF9933]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
