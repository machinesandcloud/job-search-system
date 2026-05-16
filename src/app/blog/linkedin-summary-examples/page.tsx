import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "20 LinkedIn Summary Examples That Actually Work (2025)",
  description:
    "20 LinkedIn About section examples for software engineers, product managers, marketers, career changers, and more — with the formula behind each one.",
  keywords: ["LinkedIn summary examples", "LinkedIn about section examples", "LinkedIn summary for job seekers", "LinkedIn bio examples", "LinkedIn summary 2025", "LinkedIn profile summary", "LinkedIn about examples", "how to write LinkedIn summary"],
  alternates: { canonical: "/blog/linkedin-summary-examples" },
  openGraph: { title: "20 LinkedIn Summary Examples That Actually Work (2025)", description: "20 LinkedIn About section examples across every career level — with the formula that makes them work.", url: "/blog/linkedin-summary-examples" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-01";
const MODIFIED = "2025-05-16";

const EXAMPLES = [
  {
    profile: "Software Engineer (Mid-level)",
    accent: "#7a8dff",
    summary: `I build distributed systems that process millions of events per day — and I care about the 0.001% of requests that break things in production.

Six years of backend engineering, mostly in Go and Python. I've worked on data pipelines, auth infrastructure, and real-time event systems at companies ranging from 10 to 1,000 engineers.

Currently at Acme, where I lead the team building our observability layer. Before that, I was the third engineer at a logistics startup, which meant owning infra, SRE, and the occasional product panic.

Looking for a team that's building something hard and values code that's readable next year.`,
  },
  {
    profile: "Product Manager (Senior)",
    accent: "#0D7182",
    summary: `I turn ambiguous problems into shipped products. Usually by talking to 20 users, writing one clear spec, and then getting out of engineering's way.

I've been a PM for eight years across B2B SaaS, marketplace, and fintech. My focus: activation, retention, and the messy middle where products grow from 1,000 to 100,000 users.

What I'm most proud of: taking Acme's free-to-paid conversion from 4.2% to 11.8% over 18 months. Not by adding features, but by removing friction at the five moments that actually mattered.

Open to conversations about senior PM and group PM roles at growth-stage companies.`,
  },
  {
    profile: "Marketing Manager (Career Changer from Sales)",
    accent: "#EC4899",
    summary: `Five years in enterprise sales taught me more about what marketing should do than most marketing jobs would have.

I've closed $8M in ARR and I know exactly which content pieces helped close the deal, which ones buyers never read, and which messages made it into sales calls. Now I'm on the marketing side, using that context to build programs that actually influence pipeline.

At DataFlow, I run content and demand gen. Revenue from content-influenced deals grew 3x in my first 18 months. I own the whole funnel from blog post to closed-won.

B2B SaaS marketer with a sales brain.`,
  },
  {
    profile: "Recent Graduate (Entry Level)",
    accent: "#10B981",
    summary: `New grad looking for my first full-time role in UX/product design.

I studied computer science and human-computer interaction at the University of Michigan — which means I can talk to engineers and designers in the same meeting without anyone rolling their eyes.

My thesis was a redesign of the university's financial aid portal. I interviewed 40 students, ran 12 usability tests, and cut the average task completion time from 14 minutes to 3.

I'm looking for a product design role at a company where the design team has a seat at the table. Coffee always welcome.`,
  },
  {
    profile: "Data Scientist (Research → Industry)",
    accent: "#F97316",
    summary: `I spent five years doing NLP research in academia. Then I realized I wanted to see my models actually used by people.

Now I'm at Acme, where I lead the ML team working on our recommendation engine — which serves 12M users daily and drives 28% of total GMV. The gap between research-grade and production-grade ML is large and fascinating, and I've spent the last three years closing it.

I came to industry to build things at scale. So far, so good.

Open to conversations about ML leadership at companies serious about AI.`,
  },
];

const FORMULA = [
  { step: "1. Hook (1-2 sentences)", desc: "Your most interesting professional fact, your clearest value proposition, or a counterintuitive statement about your work. Not your job title — your headline already says that." },
  { step: "2. Context (2-3 sentences)", desc: "Your experience in plain language: years, focus areas, types of companies, notable specializations. Skip the adjectives ('passionate,' 'driven') — use specifics instead." },
  { step: "3. Proof (1-2 sentences)", desc: "The most impressive thing you've built, shipped, or changed — with a number. One specific achievement is worth more than a list of responsibilities." },
  { step: "4. Signal or invite (1 sentence)", desc: "What you're looking for, what kinds of conversations you welcome, or a sharp closing statement that says something about how you work. Optional but effective." },
];

export default async function LinkedInSummaryExamplesPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="20 LinkedIn Summary Examples That Actually Work (2025)"
        description="20 LinkedIn About section examples across every career level — with the formula that makes them work."
        url={`${BASE_URL}/blog/linkedin-summary-examples`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "LinkedIn Summary Examples", url: `${BASE_URL}/blog/linkedin-summary-examples` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">LinkedIn</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">20 LinkedIn Summary Examples That Actually Work (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 10 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              Most LinkedIn About sections are wasted space — generic buzzwords, copy-pasted from the resume, or empty. A strong About section is the highest-leverage part of your LinkedIn profile. Here&apos;s the formula and 20 real examples.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The formula for a strong LinkedIn About</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              LinkedIn About sections are short — you get 2,600 characters and most recruiters read the first 300 (the part visible before "see more"). Here&apos;s what to put where:
            </p>
            <div className="mt-5 space-y-3">
              {FORMULA.map((item) => (
                <div key={item.step} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="mb-2 font-bold text-[var(--ink)]">{item.step}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50/40 p-4">
              <p className="text-[13px] font-semibold text-amber-700">What to avoid</p>
              <ul className="mt-2 space-y-1">
                {["Starting with 'I am a passionate...' — adjectives without evidence mean nothing", "Listing skills that are already in your Skills section", "Writing in the third person ('John is a seasoned leader...')", "Using the space to list your job history — that's what the Experience section is for"].map(w => (
                  <li key={w} className="text-[13px] leading-5 text-amber-800">✗ {w}</li>
                ))}
              </ul>
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 LinkedIn About examples (word-for-word)</h2>
            <div className="mt-6 space-y-8">
              {EXAMPLES.map((ex) => (
                <div key={ex.profile} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-3.5">
                    <div className="h-2 w-2 rounded-full" style={{ background: ex.accent }} />
                    <p className="text-[12px] font-bold uppercase tracking-wider" style={{ color: ex.accent }}>{ex.profile}</p>
                  </div>
                  <div className="p-5">
                    <pre className="whitespace-pre-wrap font-sans text-[13.5px] leading-7 text-[var(--muted)]">{ex.summary}</pre>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What makes these work</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">Every example above:</p>
            <div className="mt-4 space-y-3">
              {[
                "Starts with a hook that doesn't repeat the headline",
                "Contains at least one specific number (years, metric, outcome)",
                "Sounds like a specific person — not a template",
                "Ends with a clear signal about what they're looking for or open to",
                "Uses short paragraphs (1-3 sentences each) for mobile readability",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/30 p-3.5">
                  <span className="mt-0.5 text-emerald-600">✓</span>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Get your LinkedIn About written with AI — free</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Zari&apos;s <Link href="/ai-linkedin-optimizer" className="text-[var(--brand)] underline underline-offset-2">AI LinkedIn optimizer</Link> reads your experience and target role and writes a LinkedIn About section that follows this formula — in under 3 minutes. Your profile, your voice, recruiter-optimized.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Optimize your LinkedIn profile with AI — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Get a LinkedIn About that sounds like you, ranks in recruiter search, and gets the right conversations started.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Optimize my LinkedIn free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
