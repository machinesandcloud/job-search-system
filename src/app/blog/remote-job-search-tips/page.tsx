import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Remote Job Search Tips — How to Find and Land a Real Remote Role (2025)",
  description:
    "Remote job searching is fundamentally different from in-person. Learn where real remote jobs are posted, how remote hiring works, and how to signal remote readiness in your resume and interviews.",
  keywords: ["remote job search tips", "how to find remote jobs", "remote job search strategy", "remote work job hunting", "best remote job boards", "how to get a remote job", "remote job interview tips"],
  alternates: { canonical: "/blog/remote-job-search-tips" },
  openGraph: {
    title: "Remote Job Search Tips — How to Find and Land a Real Remote Role (2025)",
    description: "Where remote jobs are actually posted, how remote hiring differs, and how to signal remote readiness in your resume and interviews.",
    url: "/blog/remote-job-search-tips",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const REMOTE_MYTHS = [
  {
    label: "Remote-friendly",
    reality: "Remote is tolerated, not the norm. Usually means the team is in-office and one or two people work remote by exception. You may be expected to travel for onboarding, QBRs, and team events.",
    verdict: "Not truly remote",
    color: "#DC2626",
  },
  {
    label: "Hybrid",
    reality: "Officially 2–3 days per week in office. In practice, often more. 'Hybrid' has become the polite way to say the company wants you back in-person but doesn't want to say so outright.",
    verdict: "Not remote",
    color: "#D97706",
  },
  {
    label: "Flexible",
    reality: "Flexible about which days or hours — not about whether you show up. This is an in-office role with schedule flexibility.",
    verdict: "In-office",
    color: "#D97706",
  },
  {
    label: "Distributed team",
    reality: "This is the real signal. Companies that describe themselves as 'distributed-first' or 'async-first' are genuinely remote. Look for this language in the job description.",
    verdict: "Actually remote",
    color: "#059669",
  },
];

const PLATFORMS = [
  { name: "We Work Remotely", url: "weworkremotely.com", note: "The largest dedicated remote job board. Strong for engineering, design, and marketing roles. Very little noise — all postings are remote." },
  { name: "Remote.co", url: "remote.co", note: "Curated remote jobs with a Q&A section on each company's remote culture. Good for understanding how distributed the company actually is before applying." },
  { name: "Himalayas.app", url: "himalayas.app", note: "Well-filtered, fast-growing board. Companies list their timezone requirements explicitly — useful for knowing upfront if you fit their async/sync model." },
  { name: "FlexJobs", url: "flexjobs.com", note: "Paid ($15/month) but aggressively vetted — every listing is manually reviewed. Worth it if you're tired of fake remote postings on free boards." },
  { name: "LinkedIn (with filter)", url: "linkedin.com/jobs", note: "Use the 'Remote' workplace type filter and then search the job description for '100% remote' or 'fully remote' — LinkedIn's definition of remote includes hybrid." },
];

const WHAT_REMOTE_COMPANIES_EVALUATE = [
  {
    trait: "Written communication clarity",
    why: "Remote teams run on async communication. If you can't write a clear, well-structured Slack message or document, you become a bottleneck. Companies test this in application emails, take-home exercises, and by observing your interview follow-ups.",
    howToSignal: "Write polished application emails. Send a thoughtful follow-up after each interview stage. If given a take-home, document your reasoning in writing — not just your outputs.",
  },
  {
    trait: "Self-direction and proactiveness",
    why: "No one sees you working. Remote environments require people who identify blockers and move around them rather than waiting to be managed. This is the single most common failure mode for people who struggle remote.",
    howToSignal: "Frame experience in terms of outcomes you drove without being directed. 'Built X with zero oversight' and 'identified the gap in Y and fixed it before it became a problem' are the patterns they're looking for.",
  },
  {
    trait: "Timezone and overlap availability",
    why: "Even async companies have a core overlap window — typically 4 hours where everyone is expected to be available. If your timezone creates zero overlap with the team, it can be a dealbreaker regardless of how good you are.",
    howToSignal: "Proactively mention your timezone and overlap availability in your cover letter. 'I'm UTC+5 and available 3–7pm my time, which gives 4 hours of overlap with Eastern' is exactly the kind of specificity remote hiring managers need.",
  },
  {
    trait: "Previous remote experience",
    why: "Companies prefer candidates who have already proven they can work remotely. If you have it, it's almost a checkbox.",
    howToSignal: "Add 'Remote' next to roles where you worked distributed. Even if it was only part-remote, note it — 'Hybrid (3 days remote)' still signals familiarity with async tools and distributed culture.",
  },
];

const RESUME_SIGNALS = [
  { signal: "Label remote experience explicitly", example: "Software Engineer — Remote  |  Company Name  |  2021–2024" },
  { signal: "Name async tools in context", example: "Coordinated async across 4 timezones using Linear, Notion, and Loom" },
  { signal: "Show outcomes, not activity", example: `"Shipped X in 6 weeks with no synchronous standups" (async-native teams measure output, not presence)` },
  { signal: "Include timezone in your LinkedIn header", example: "Software Engineer · EST/UTC-5 · Open to fully remote" },
];

const FAQS = [
  { question: "How do I know if a remote job posting is actually remote?", answer: "Read the full job description carefully. Look for: explicit 'work from anywhere' or 'no office required' language; timezone requirements (legitimate remote companies list them); tools like Notion, Linear, Loom, or Async; language about distributed teams or async culture. Avoid applying to roles that only use the word 'remote' without any of this context — they're often hybrid in disguise." },
  { question: "Do I need to disclose my location when applying for remote jobs?", answer: "In the US, many remote companies still restrict hiring to certain states due to tax and compliance reasons. If a posting says 'US only' or lists specific states, check whether your state is included before spending time on the application. Some global companies have country restrictions too. It's better to verify this before applying than to get to an offer only to find out you're not in an eligible state." },
  { question: "How should I handle the remote work interview itself?", answer: "Your interview is a live demonstration of your remote readiness. Show up 5 minutes early. Have a clean, professional background. Use good audio — poor audio quality signals poor home office setup. Respond to scheduling emails within 2–4 hours. Send a thoughtful follow-up after each stage. These aren't just courtesy — they're data points on how you communicate and operate asynchronously." },
  { question: "Can I negotiate remote work for a job that isn't listed as remote?", answer: "Yes, but timing matters. Don't raise it during the first interview. Let the company decide they want you first, then negotiate from a position of mutual interest. After an offer, you have leverage. Frame it in terms of output, not preference: 'I've been fully productive working distributed for the past 3 years — I'd love to discuss continuing that arrangement here.'" },
];

export default async function RemoteJobSearchTipsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Remote Job Search Tips — How to Find and Land a Real Remote Role (2025)"
        description="Where remote jobs are actually posted, how remote hiring differs, and how to signal remote readiness."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/remote-job-search-tips`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Remote Job Search Tips", url: `${BASE_URL}/blog/remote-job-search-tips` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Remote Work</span>
            <span className="text-[11px] text-white/30">10 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Remote job search tips<br /><span className="gradient-text-animated">that actually work</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            The remote job market is smaller, more competitive, and more confusing than most job seekers realize. Most postings labeled &quot;remote&quot; aren&apos;t really remote. Here&apos;s how to find the real ones — and land them.
          </p>
        </div>
      </section>

      {/* Remote myths */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What &quot;remote&quot; actually means (and doesn&apos;t mean)</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Most job boards are flooded with roles that use &quot;remote&quot; loosely. Know what you&apos;re looking at before you apply.</p>
          <div className="mt-8 space-y-3">
            {REMOTE_MYTHS.map((m) => (
              <div key={m.label} className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-bold text-[var(--ink)]">{m.label}</span>
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: m.color }}>{m.verdict}</span>
                  </div>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{m.reality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to find real remote jobs */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Where real remote jobs are posted</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">General job boards are optimistic with their &quot;remote&quot; filter. These platforms are built specifically for distributed work.</p>
          <div className="mt-8 space-y-4">
            {PLATFORMS.map((p, i) => (
              <div key={p.name} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{p.name} <span className="font-normal text-[13px] text-[var(--muted)]">— {p.url}</span></p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{p.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What remote employers evaluate */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What remote employers actually evaluate</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Remote hiring criteria are materially different from in-person. These are the traits that weight heavily — and how to signal each one.</p>
          <div className="mt-8 space-y-5">
            {WHAT_REMOTE_COMPANIES_EVALUATE.map((item) => (
              <div key={item.trait} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{item.trait}</p>
                  <p className="mt-1 text-[13px] text-[var(--muted)]">{item.why}</p>
                </div>
                <div className="px-6 py-4">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">How to signal this</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.howToSignal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume signals */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to signal remote readiness on your resume</h2>
          <div className="mt-8 space-y-4">
            {RESUME_SIGNALS.map((s) => (
              <div key={s.signal} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="mb-2 font-bold text-[var(--ink)]">{s.signal}</p>
                <code className="block rounded-lg bg-[var(--bg)] px-4 py-2.5 text-[13px] text-[var(--brand)]">{s.example}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Remote job search FAQs</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get your remote job search right</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches you on resume signaling, interview prep, and positioning — including for remote roles that have different hiring criteria than in-person jobs.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
