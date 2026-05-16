import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "50 LinkedIn Headline Examples That Get Recruiter Attention (2025)",
  description:
    "50 LinkedIn headline examples for every profession and career stage. Learn the exact formula that gets recruiters to click your profile — with examples for software engineers, PMs, marketers, and more.",
  keywords: ["LinkedIn headline examples", "best LinkedIn headlines", "LinkedIn headline formula", "LinkedIn headline ideas", "how to write LinkedIn headline", "LinkedIn profile tips", "LinkedIn recruiter tips"],
  alternates: { canonical: "/blog/linkedin-headline-examples" },
  openGraph: { title: "50 LinkedIn Headline Examples That Get Recruiter Attention (2025)", description: "The formula for writing a LinkedIn headline that gets recruiter clicks — with 50 examples.", url: "/blog/linkedin-headline-examples" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-02-10";
const MODIFIED = "2025-05-15";

export default async function LinkedinHeadlineExamplesPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="50 LinkedIn Headline Examples That Get Recruiter Attention (2025)"
        description="The formula for writing a LinkedIn headline that gets recruiter clicks — with 50 examples."
        url={`${BASE_URL}/blog/linkedin-headline-examples`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "LinkedIn Headline Examples", url: `${BASE_URL}/blog/linkedin-headline-examples` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">LinkedIn</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">50 LinkedIn Headline Examples That Get Recruiter Attention (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 10 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Your LinkedIn headline is your most-read piece of copy. It appears in search results, connection requests, recruiter search, and messages. Most people default to their job title. The ones who get recruited don't.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The LinkedIn headline formula that works</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The most effective LinkedIn headlines follow this structure:
            </p>
            <div className="mt-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)] p-6 font-mono text-[14px] text-[var(--ink)]">
              [Role/Identity] · [Specialization or Domain] · [Value signal or outcome]
            </div>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The first segment anchors the recruiter keyword search. The second narrows your relevance — "software engineer" is not the same as "backend engineer" in recruiter search. The third signals what you deliver, not just what your title is.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              LinkedIn headlines have a 220-character limit. Most recruiters scan the first 60 characters in search results. Put the most important keyword first.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Software engineer LinkedIn headlines</h2>
            <div className="mt-4 space-y-2">
              {[
                "Backend Engineer · Python & Go · Distributed Systems at Scale",
                "Senior Software Engineer · Full-Stack React/Node · Open to Senior Roles",
                "Staff Engineer · Platform Infrastructure · Led Migration of 200M+ Daily Events",
                "Frontend Engineer · React & TypeScript · Design System & Performance Specialist",
                "ML Engineer · LLM Fine-Tuning & Inference · Built Production AI at Series B",
                "DevOps Engineer · Kubernetes & AWS · Reduced Deploy Failures by 94%",
                "SWE II → Senior · Backend Java · Actively Exploring New Opportunities",
                "Software Engineer · iOS & Swift · Consumer Apps with 10M+ Downloads",
                "Data Engineer · Spark, dbt, BigQuery · Built Real-Time Pipelines at Fintech Scale",
                "Security Engineer · AppSec & Cloud · Pen Tester Turned Builder",
              ].map((h) => (
                <div key={h} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[13.5px] text-[var(--ink)]">{h}</div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Product manager LinkedIn headlines</h2>
            <div className="mt-4 space-y-2">
              {[
                "Senior Product Manager · B2B SaaS · Grew ARR from $4M to $18M",
                "Product Manager · Consumer Mobile · 0→1 and Scaling · Ex-Meta",
                "APM → PM · Platform Products · Actively Job Searching",
                "Group Product Manager · Marketplace & Monetization · P&L Owner",
                "Director of Product · Growth & Retention · Series A–C Experience",
                "Product Manager · AI/ML Products · Shipped Features Used by 2M+ Users",
                "PM · E-commerce & Payments · Led Integration of 3 Acquisition Products",
                "Senior PM · Developer Tools · Open to Staff PM or Head of Product Roles",
                "Product Lead · Enterprise B2B · Reduced Churn 38% Through Platform Redesign",
                "Head of Product · Healthcare Tech · HIPAA-Compliant Product Experience",
              ].map((h) => (
                <div key={h} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[13.5px] text-[var(--ink)]">{h}</div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Marketing LinkedIn headlines</h2>
            <div className="mt-4 space-y-2">
              {[
                "Growth Marketer · SEO & Paid Acquisition · Scaled to 2M Monthly Visitors",
                "Content Marketing Manager · B2B SaaS · Built Organic from 0 to 400K/month",
                "Performance Marketing Lead · Meta & Google Ads · $2M+ Monthly Ad Spend",
                "Brand Strategist · CPG & DTC · Led Rebrands for 3 Series B Companies",
                "Head of Marketing · PLG SaaS · Pipeline Generation & Demand Gen Focus",
                "Email Marketing Specialist · Klaviyo · Grew Revenue per Email 60%",
                "VP Marketing · B2B Enterprise · Built & Led Team of 22 · Open to CMO Roles",
                "Product Marketing Manager · Developer Tools · GTM & Competitive Intel",
                "SEO Manager · Technical SEO & Content · Ranked 200+ Keywords Page 1",
                "Social Media Manager · B2C & Creator Economy · 500K+ Organic Growth",
              ].map((h) => (
                <div key={h} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[13.5px] text-[var(--ink)]">{h}</div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Sales LinkedIn headlines</h2>
            <div className="mt-4 space-y-2">
              {[
                "Account Executive · Mid-Market SaaS · 140% Quota 3 Years Running",
                "Enterprise AE · $100K–$500K Deals · CLoses Complex Multi-Stakeholder Sales",
                "SDR → AE Transition · Outbound Pipeline Builder · Open to AE Opportunities",
                "Sales Manager · Built & Ramped 12-Person SDR Team · Fintech & HR Tech",
                "VP Sales · $0 to $8M ARR · Seed to Series B Growth Stages",
                "Revenue Operations Manager · Salesforce · Reduced Sales Cycle 28%",
                "Customer Success Manager · Enterprise SaaS · $12M ARR Book · 0 Churn",
                "Director of Sales · EMEA Region · Opened UK & Germany Markets",
                "Sales Engineer · Technical SaaS & APIs · Pre-Sales Specialist",
                "Account Manager · Agency & Brand Partnerships · $5M+ Annual Revenue",
              ].map((h) => (
                <div key={h} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[13.5px] text-[var(--ink)]">{h}</div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Career changer and job seeker LinkedIn headlines</h2>
            <div className="mt-4 space-y-2">
              {[
                "Finance → Data Analytics · SQL, Python & Tableau · Open to Analyst Roles",
                "Teacher → Instructional Designer · eLearning & LMS Implementation",
                "Operations Manager · Transitioning to Product Management · MBA 2025",
                "New Grad · Computer Science · Software Engineer · Open to SWE Roles",
                "Marketing Professional · Available Immediately · B2B SaaS Specialist",
                "Ex-Founder → Growth Marketing · 0–1 GTM Experience · Exploring New Roles",
                "Recent Graduate · Business & Finance · Targeting FP&A or Strategy Roles",
                "Consultant → In-House Strategy · Former McKinsey · Open to VP/Director",
                "Career Break Return · 3 Years Parenting → Back in Product Management",
                "Laid Off → Actively Searching · Senior Data Scientist · Available Now",
              ].map((h) => (
                <div key={h} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[13.5px] text-[var(--ink)]">{h}</div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">3 mistakes that kill your headline's effectiveness</h2>
            <div className="mt-4 space-y-4">
              {[
                { mistake: "Using your current job title only", fix: "\"Senior Product Manager at Acme Corp\" tells a recruiter nothing distinctive. Your title is already on your experience section. Use the headline for keywords and value signal, not to duplicate your profile." },
                { mistake: "Writing for your current employer, not your next one", fix: "If you're looking for a new role, your headline should be optimized for who you want to be found by — not what satisfies your current employer. Open to work signals matter more than loyalty signals." },
                { mistake: "Vague value statements with no specificity", fix: "\"Passionate about building great products\" is invisible in search and meaningless to a recruiter. Replace adjectives with nouns: specialization, domain, outcome, number." },
              ].map((item) => (
                <div key={item.mistake} className="rounded-2xl border border-red-100 bg-red-50/50 p-5">
                  <p className="mb-2 font-bold text-red-700">✗ {item.mistake}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.fix}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Optimize your full LinkedIn profile, not just the headline</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The headline is the highest-leverage element, but recruiters who click through also read your About section, your featured section, and your experience bullets. Zari's <Link href="/ai-linkedin-optimizer" className="text-[var(--brand)] underline underline-offset-2">AI LinkedIn optimizer</Link> rewrites all of it — headline, About, experience — for the role you're targeting, not the role you have.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Get your LinkedIn headline rewritten by AI</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Zari optimizes your full LinkedIn profile for recruiter search — free to start.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Optimize my LinkedIn free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
