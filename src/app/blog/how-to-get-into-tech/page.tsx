import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "How to Get Into Tech 2025 — No CS Degree Required",
  description: "A realistic guide to breaking into the tech industry in 2025. Covers software engineering, product management, data science, UX design, and tech sales — with and without a CS degree.",
  keywords: ["how to get into tech", "how to break into tech", "getting into tech without a degree", "tech career change", "how to get a tech job", "breaking into tech 2025", "how to get into software engineering", "tech career for beginners", "how to get into product management", "how to start a career in tech"],
  alternates: { canonical: "/blog/how-to-get-into-tech" },
  openGraph: { title: "How to Get Into Tech 2025 — No CS Degree Required", description: "Realistic paths into software engineering, PM, data science, UX, and tech sales — with or without a CS degree.", url: "/blog/how-to-get-into-tech" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const FAQS = [
  { question: "Can I get into tech without a CS degree?", answer: "Yes — and it's increasingly common. The majority of working engineers at major tech companies do have CS degrees, but the percentage of career changers and bootcamp graduates has grown significantly. Product management, UX design, data analytics, technical writing, and tech sales rarely require CS degrees. For software engineering specifically, a portfolio of shipped projects, technical interview performance, and a relevant bootcamp or self-taught background can compete with a degree at many companies." },
  { question: "What's the fastest way to get into tech?", answer: "The fastest path depends on your starting point and target role. For software engineering: an intensive bootcamp (3–6 months) followed by aggressive portfolio building and networking can get you to a first role in 8–14 months. For PM: lateral moves from product-adjacent roles (operations, analyst, customer success) with a strong narrative is typically faster than going through a bootcamp. For data analytics: SQL + Python + a portfolio project can be job-ready in 4–6 months." },
  { question: "Is it too late to get into tech at 30, 35, or 40?", answer: "No. Tech companies hire at all ages. The concern about age discrimination is real in some parts of the industry, but it's most relevant for senior roles at consumer tech companies — not for entry or mid-level roles at enterprise, fintech, healthcare tech, and B2B SaaS companies. Career changers at 30–40 often have the advantage of business context, professional maturity, and specific domain expertise that CS graduates lack." },
  { question: "What tech role should I target first?", answer: "Match your current skills to the lowest-friction entry path. Data analyst if you have spreadsheet/analysis experience. Technical account manager if you have sales or customer-facing experience. Quality assurance if you're detail-oriented and want to learn testing. Product coordinator if you have project management experience. The goal is to get inside the industry — lateral moves within tech are much easier than the initial entry." },
];

const PATHS = [
  { role: "Software Engineer", timeline: "8–18 months", cost: "Low–High", degree: "Not required", path: "Bootcamp or self-study → portfolio projects (GitHub) → technical interview prep → junior roles", salary: "$80K–$130K entry", color: "#0D7182" },
  { role: "Product Manager", timeline: "6–24 months", cost: "Low", degree: "Not required", path: "Pivot from adjacent role (ops, analyst, sales) → product courses + case studies → PM interviews at smaller companies", salary: "$100K–$140K entry", color: "#7C3AED" },
  { role: "Data Analyst", timeline: "3–8 months", cost: "Very low", degree: "Not required", path: "SQL + Python basics → Tableau/Looker → portfolio project with real data → business analyst or data analyst roles", salary: "$70K–$100K entry", color: "#059669" },
  { role: "UX Designer", timeline: "4–10 months", cost: "Low–Medium", degree: "Not required", path: "UX bootcamp or Google UX certificate → portfolio of 3–5 case studies → junior designer roles", salary: "$65K–$100K entry", color: "#D97706" },
  { role: "Tech Sales / AE", timeline: "1–4 months", cost: "Very low", degree: "Not required", path: "Sales skills transfer directly. Target SDR (sales development rep) roles as entry point → AE promotion", salary: "$70K–$120K OTE entry", color: "#DC2626" },
];

export default async function HowToGetIntoTechPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="How to Get Into Tech 2025" description="Realistic paths into tech for career changers — software engineering, PM, data science, UX, and tech sales." url={`${BASE_URL}/blog/how-to-get-into-tech`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get Into Tech", url: `${BASE_URL}/blog/how-to-get-into-tech` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 50%, #7C3AED 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Career Change</span>
            <span className="text-[12px] text-white/35">18 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">How to Get Into Tech in 2025</h1>
          <p className="mt-4 text-[14px] font-bold uppercase tracking-wider text-white/40">5 Realistic Paths — No CS Degree Required</p>
          <p className="mt-3 text-[15px] leading-7 text-white/50">The tech industry has more entry points than most career changers realise. Here&apos;s the realistic guide — timelines, costs, and what you need to know before you start.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={35} suffix="%" label="of tech professionals are career changers" accent="#0D7182" />
            <StatCard value={58} suffix="%" label="of PMs at top tech companies didn't study CS" accent="#7C3AED" />
            <StatCard value={8} label="months median time from career change start to first tech role" accent="#059669" />
            <StatCard value={40} suffix="%" label="average salary increase in the first tech role vs prior career" accent="#D97706" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-6 text-[1.7rem] font-extrabold tracking-[-0.02em]">5 paths into tech — realistic timelines and costs</h2>
          <div className="mb-14 space-y-4">
            {PATHS.map(({ role, timeline, cost, degree, path, salary, color }) => (
              <div key={role} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center gap-3 p-4 border-b border-[var(--border)]" style={{ background: `${color}08` }}>
                  <h3 className="font-extrabold text-[16px]" style={{ color }}>{role}</h3>
                  <span className="ml-auto text-[12px] font-bold text-[var(--muted)]">{salary}</span>
                </div>
                <div className="grid grid-cols-3 border-b border-[var(--border)] divide-x divide-[var(--border)]">
                  {[{ l: "Timeline", v: timeline }, { l: "Cost", v: cost }, { l: "Degree", v: degree }].map(({ l, v }) => (
                    <div key={l} className="p-3 text-center">
                      <div className="text-[10px] font-bold uppercase text-[var(--muted)]">{l}</div>
                      <div className="mt-1 text-[12px] font-bold">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-[var(--bg)]">
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{path}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">The 4 mistakes career changers make</h2>
          <div className="mb-12 space-y-3">
            {[
              { mistake: "Targeting FAANG as a first tech role", fix: "FAANG is brutally competitive. Start with Series B–D startups, mid-size SaaS companies, or companies in your domain (if you're changing from healthcare, target health tech). Lateral moves within tech come quickly once you're inside." },
              { mistake: "Building skills without building a portfolio", fix: "A GitHub with 0 projects, or a Figma profile with no case studies, is invisible. Before you apply anywhere, build 2–3 real things that demonstrate what you can do. Share them publicly." },
              { mistake: "Not reframing domain experience as an asset", fix: "5 years in healthcare operations isn't irrelevant for a health tech PM role — it's your strongest differentiator. Reframe your previous career as domain expertise, not as a gap to explain." },
              { mistake: "Preparing for interviews before fixing the resume", fix: "73% of resumes are rejected by ATS before anyone reads them. If your resume isn't passing ATS for the specific role you're targeting, no amount of interview prep matters. Fix the resume first." },
            ].map(({ mistake, fix }) => (
              <div key={mistake} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 font-bold text-[14px] text-[#DC2626]">✗ {mistake}</div>
                <div className="text-[13px] leading-6 text-[var(--muted)]"><span className="font-semibold text-[#059669]">Fix: </span>{fix}</div>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">How to frame your career change in interviews</h2>
          <div className="mb-10 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
            <p className="mb-3 font-bold text-[14px]">The formula for &ldquo;Why tech?&rdquo; and &ldquo;Why now?&rdquo;</p>
            <div className="space-y-3 text-[13px] leading-6 text-[var(--muted)]">
              <p><span className="font-bold text-[var(--ink)]">1. The genuine pull:</span> &ldquo;I&apos;ve been working at the intersection of [your domain] and [tech application] for [X years]. I found myself spending increasing time on the [data/product/technical] side and realised that was where I had the most leverage...&rdquo;</p>
              <p><span className="font-bold text-[var(--ink)]">2. The bridge:</span> &ldquo;My background in [previous role] gives me [specific advantage] — I understand [domain] in a way that most [target role] candidates don&apos;t, which means I can [specific value add]...&rdquo;</p>
              <p><span className="font-bold text-[var(--ink)]">3. The signal of commitment:</span> &ldquo;Over the past [X months] I&apos;ve [built X project / completed X course / shipped X thing]. Here&apos;s a link to the work.&rdquo;</p>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">Break in. Then break through.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari builds a career-change resume that reframes your background for tech, coaches your &ldquo;why tech?&rdquo; interview narrative, and helps you negotiate your first tech offer at full market value.</p>
          <Link href="/platform" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Start career change coaching free</Link>
          <p className="mt-3 text-[12px] text-white/30">See also: <Link href="/career-change-coach" className="hover:underline text-white/50">Career Change Coach</Link> · <Link href="/blog/career-change-guide" className="hover:underline text-white/50">Career change guide</Link></p>
        </div>
      </section>
    </PageFrame>
  );
}
