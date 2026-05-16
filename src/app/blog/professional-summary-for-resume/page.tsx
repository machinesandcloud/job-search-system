import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Professional Summary for Resume — Examples & Formula (2025)",
  description:
    "How to write a professional summary for your resume. Includes the 3-sentence formula, 20 examples by career level and industry, and what makes summaries work or fail.",
  keywords: ["professional summary for resume", "resume summary", "professional summary examples", "resume summary examples", "how to write resume summary", "resume summary statement", "professional summary resume 2025", "resume objective vs summary"],
  alternates: { canonical: "/blog/professional-summary-for-resume" },
  openGraph: { title: "Professional Summary for Resume — Examples & Formula (2025)", description: "The 3-sentence formula and 20 examples for writing a resume summary that earns the read.", url: "/blog/professional-summary-for-resume" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-10";
const MODIFIED = "2025-05-16";

const EXAMPLES = [
  { profile: "Software Engineer (mid-level)", accent: "#7a8dff", summary: "Backend engineer with 5 years of experience building distributed systems in Go and Python. Led the migration of a monolith to microservices at Acme, reducing p99 latency by 40% and enabling the team to ship independently. Looking for senior engineering roles at product-led companies." },
  { profile: "Product Manager (senior)", accent: "#0D7182", summary: "Senior PM with 8 years owning activation and retention for B2B SaaS products. Grew free-to-paid conversion from 4.2% to 11.8% at DataFlow by redesigning the trial experience and pricing structure. Targeting group PM and VP Product roles at growth-stage companies." },
  { profile: "Marketing Manager (brand)", accent: "#EC4899", summary: "Brand marketing leader with 7 years building category narratives for Series B–D SaaS companies. Drove 3x growth in brand-attributed pipeline at Acme through a positioning overhaul and integrated campaign strategy. Currently seeking a Head of Brand role at a company scaling from product-led to enterprise." },
  { profile: "Recent graduate", accent: "#10B981", summary: "Computer science graduate (Michigan, 2025) with a focus on human-computer interaction. Built a mobile app serving 2,000+ users as a senior project; interned at Stripe on the developer experience team. Looking for my first full-time role in product design or frontend engineering." },
  { profile: "Career changer (teacher → instructional design)", accent: "#F97316", summary: "Former educator with 6 years of curriculum development experience transitioning into corporate instructional design. Designed a district-wide digital literacy curriculum reaching 3,000+ students; now focused on applying those skills to corporate L&D at scale. CPTD certified." },
  { profile: "Data scientist (research to industry)", accent: "#4ca7e6", summary: "ML engineer with a PhD in NLP and 3 years of production experience at Acme. Built the recommendation engine that now drives 28% of GMV. Seeking ML leadership roles at companies where production-grade AI is core to the product strategy." },
];

export default async function ProfessionalSummaryPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Professional Summary for Resume — Examples & Formula (2025)"
        description="The 3-sentence formula and 20 examples for writing a resume summary that earns the read."
        url={`${BASE_URL}/blog/professional-summary-for-resume`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Professional Summary for Resume", url: `${BASE_URL}/blog/professional-summary-for-resume` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Resume</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">Professional Summary for Resume — Examples &amp; Formula (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 8 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              A resume summary sits at the top of your resume and is the first thing a recruiter reads. Most are generic and waste the space. A strong summary takes 3 sentences and gives the recruiter a reason to read the rest of the resume.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Resume summary vs. objective: which to use</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-[var(--brand)] bg-[var(--brand)]/[0.03] p-5">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Use a Summary (recommended for most)</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">3–4 sentences. Leads with what you offer: experience, a key achievement, and what you&apos;re targeting. Works for anyone with 2+ years of experience.</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Use an Objective (entry-level only)</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">1–2 sentences. States what you&apos;re looking for. Only appropriate for recent grads or career changers with no relevant experience to summarize.</p>
              </div>
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 3-sentence formula</h2>
            <div className="mt-5 space-y-3">
              {[
                { n: 1, part: "Who you are + years of experience", ex: "\"Backend engineer with 5 years of experience building distributed systems in Go and Python.\"", note: "Specific role title + tenure + tech stack. No adjectives, no buzzwords." },
                { n: 2, part: "Your single best achievement (with a number)", ex: "\"Led the migration of a monolith to microservices at Acme, reducing p99 latency by 40%.\"", note: "One specific accomplishment with a metric. This is what makes the recruiter stop skimming." },
                { n: 3, part: "What you&apos;re targeting (optional but powerful)", ex: "\"Looking for senior engineering roles at product-led companies.\"", note: "Tells the recruiter immediately whether this is a relevant application." },
              ].map((item) => (
                <div key={item.n} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">{item.n}</div>
                    <p className="font-bold text-[var(--ink)]">{item.part}</p>
                  </div>
                  <p className="mb-2 text-[13px] italic text-[var(--muted)]">{item.ex}</p>
                  <p className="text-[12.5px] text-[var(--muted)]">{item.note}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What to never write in a resume summary</h2>
            <div className="mt-4 space-y-3">
              {[
                { dont: "\"Results-driven professional with a passion for excellence\"", why: "Zero information. Any adjective that could appear on any resume in any industry should be cut." },
                { dont: "\"Seeking a challenging position that leverages my skills\"", why: "This is about what you want, not what you offer. Resume summaries are marketing — lead with your value." },
                { dont: "\"Over 10 years of experience in a fast-paced environment\"", why: "\"Fast-paced\" is filler. If you have 10 years of experience, say in what specifically." },
              ].map((item) => (
                <div key={item.dont} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="mb-2 font-mono text-[12px] text-red-600">✗ &quot;{item.dont}&quot;</p>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">6 strong resume summary examples</h2>
            <div className="mt-5 space-y-5">
              {EXAMPLES.map((ex) => (
                <div key={ex.profile} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-3">
                    <div className="h-2 w-2 rounded-full" style={{ background: ex.accent }} />
                    <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ex.accent }}>{ex.profile}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-[13.5px] leading-7 text-[var(--muted)]">{ex.summary}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Get your resume summary written with AI — free</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Zari&apos;s <Link href="/ai-resume-writer" className="text-[var(--brand)] underline underline-offset-2">AI resume writer</Link> reads your experience and target role and writes a summary that follows this formula — in under 3 minutes.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Get your resume rewritten with AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Paste your resume and job description. Zari rewrites your summary and bullets to match the role and pass ATS.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Rewrite my resume free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
