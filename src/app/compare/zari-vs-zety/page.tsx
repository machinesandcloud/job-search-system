import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Zety — AI Career Coach vs Resume Builder (2025)",
  description:
    "Zety builds resumes from templates with pre-written content suggestions. Zari coaches your entire job search — resume optimization, interview prep, LinkedIn, and salary negotiation. Here's when each wins.",
  keywords: ["Zari vs Zety", "Zety alternative", "Zety vs AI career coach", "is Zety worth it", "Zety review", "best resume builder vs career coach"],
  alternates: { canonical: "/compare/zari-vs-zety" },
  openGraph: {
    title: "Zari vs Zety — AI Career Coach vs Resume Builder (2025)",
    description: "Zety makes polished resumes from templates. Zari coaches your full job search. Here's when each tool is the right choice.",
    url: "/compare/zari-vs-zety",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FEATURE_ROWS = [
  {
    feature: "Resume templates",
    zety: "18+ professionally designed templates with real visual polish. Strong for creative industries and roles where a printed resume matters.",
    zari: "ATS-optimized structure without visual templates. Focuses on keyword placement, section ordering, and impact phrasing — not visual design.",
    winner: "Zety",
    winnerNote: "If you need a beautiful print-ready resume, Zety's templates are genuinely good.",
  },
  {
    feature: "AI content suggestions",
    zety: "Pre-written bullet points organized by job title. Useful starting point but often generic — 'responsible for managing team projects' type language.",
    zari: "Generates bullets from your actual experience with specificity and metrics. Reviews your bullets for impact framing and ATS keyword density.",
    winner: "Zari",
    winnerNote: "Generic pre-written bullets rarely pass ATS or impress recruiters. Zari's approach produces stronger, more specific content.",
  },
  {
    feature: "ATS optimization",
    zety: "Basic ATS tips and a general score. Doesn't do job-description-specific keyword analysis or tell you which keywords you're missing.",
    zari: "Real-time ATS scoring against the specific job description you're targeting. Identifies missing keywords, keyword density, and section-level gaps.",
    winner: "Zari",
    winnerNote: "Job-description-specific ATS analysis is the critical difference. Generic ATS scores don't help you get past the filter for a particular role.",
  },
  {
    feature: "Cover letter",
    zety: "Template-based cover letter builder with pre-written phrases. Produces a formatted document quickly.",
    zari: "AI-generated cover letter tailored to the specific role, company, and your background — not template-assembled.",
    winner: "Zari",
    winnerNote: "Generic cover letters and templates signal low effort to hiring managers. Personalization matters.",
  },
  {
    feature: "Interview coaching",
    zety: "Not offered. Zety is a document creation tool.",
    zari: "Full STAR framework coaching with real-time feedback on behavioral answers. Coaches you on question types specific to your target role.",
    winner: "Zari",
    winnerNote: "Zety stops at the resume. The interview is where most candidates actually lose — Zari covers it.",
  },
  {
    feature: "LinkedIn optimization",
    zety: "Not offered.",
    zari: "Full LinkedIn profile coaching — headline, About section, experience bullets, Skills, and recruiter search visibility.",
    winner: "Zari",
    winnerNote: "60% of offers come through LinkedIn. Ignoring it while perfecting your resume is a misallocation of effort.",
  },
  {
    feature: "Salary negotiation coaching",
    zety: "Not offered.",
    zari: "Coaches you through the negotiation conversation — scripts, tactics, how to handle pushback, and how to evaluate comp structures.",
    winner: "Zari",
    winnerNote: "The average negotiation adds $5,000–$25,000 to compensation. Skipping it is expensive.",
  },
  {
    feature: "Pricing",
    zety: "Free version is limited (watermarked download). Paid plans start at ~$6/month for basic, up to ~$24/month for full access.",
    zari: "Free to start — no credit card. Coaching sessions begin immediately without a paywall.",
    winner: "Zari",
    winnerNote: "You can evaluate Zari without committing financially. Zety's free tier is restrictive.",
  },
];

export default async function ZariVsZetyPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Zety", url: `${BASE_URL}/compare/zari-vs-zety` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22D3EE]" /> Side-by-Side Comparison
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em]">Zari vs Zety</h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] text-white/55">
            Zety builds polished resume templates. Zari coaches your entire job search. They&apos;re solving different problems — here&apos;s when each one is the right tool.
          </p>
        </div>
      </section>

      {/* What each tool is */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">What Zety is</p>
              <p className="text-[15px] font-bold text-[var(--ink)]">A resume builder with templates and AI content suggestions</p>
              <p className="mt-3 text-[13.5px] leading-6 text-[var(--muted)]">Zety helps you create a formatted, visually polished resume quickly. It offers 18+ templates and pre-written bullet points organized by job title. The tool is document-creation focused — it produces a resume but doesn&apos;t coach your job search strategy, prepare you for interviews, or optimize your LinkedIn presence.</p>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">What Zari is</p>
              <p className="text-[15px] font-bold text-[var(--ink)]">An AI career coach for the full job search</p>
              <p className="mt-3 text-[13.5px] leading-6 text-[var(--muted)]">Zari coaches resume writing with ATS scoring, interview preparation with STAR framework evaluation, LinkedIn profile optimization, and salary negotiation. It remembers your job search context across sessions and adapts to the specific roles you&apos;re targeting — not just the document you&apos;re building right now.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature comparison */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <div className="mt-8 space-y-5">
            {FEATURE_ROWS.map((row) => (
              <div key={row.feature} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-3">
                  <p className="font-bold text-[var(--ink)]">{row.feature}</p>
                </div>
                <div className="grid sm:grid-cols-2">
                  <div className="border-b border-[var(--border)] p-5 sm:border-b-0 sm:border-r">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Zety</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{row.zety}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{row.zari}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <span className="text-[11px] font-bold text-[var(--muted)]">Edge:</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${row.winner === "Zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" : "bg-gray-100 text-gray-600"}`}>{row.winner}</span>
                  <span className="text-[12px] text-[var(--muted)]">— {row.winnerNote}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When each is right */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">When each tool makes sense</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
              <p className="mb-3 font-bold text-[var(--ink)]">Use Zety when...</p>
              <ul className="space-y-2.5 text-[13.5px] text-[var(--muted)]">
                <li className="flex gap-2"><span className="mt-0.5 text-gray-400">→</span> You need a visually polished resume for a creative or design role where aesthetics matter</li>
                <li className="flex gap-2"><span className="mt-0.5 text-gray-400">→</span> You want a one-time resume refresh and don&apos;t need ongoing coaching</li>
                <li className="flex gap-2"><span className="mt-0.5 text-gray-400">→</span> You already have strong interview skills and just need a clean document</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6">
              <p className="mb-3 font-bold text-[var(--ink)]">Use Zari when...</p>
              <ul className="space-y-2.5 text-[13.5px] text-[var(--muted)]">
                <li className="flex gap-2"><span className="mt-0.5 text-[var(--brand)]">→</span> You&apos;re actively job searching and need coaching across multiple stages</li>
                <li className="flex gap-2"><span className="mt-0.5 text-[var(--brand)]">→</span> You want ATS-specific optimization for jobs you&apos;re actually applying to</li>
                <li className="flex gap-2"><span className="mt-0.5 text-[var(--brand)]">→</span> You need interview prep, LinkedIn coaching, or salary negotiation guidance — not just a document</li>
                <li className="flex gap-2"><span className="mt-0.5 text-[var(--brand)]">→</span> You want to start without paying and evaluate before committing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Honest verdict</p>
            <p className="text-[17px] font-bold text-[var(--ink)]">Different tools for different jobs — but most active job seekers need Zari</p>
            <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">Zety is a solid resume builder. If you need a beautiful formatted document quickly, it delivers. But a resume is only the first gate. Most candidates who aren&apos;t getting offers aren&apos;t losing on their resume — they&apos;re losing in interviews, or not getting found on LinkedIn, or leaving money on the table in salary negotiation.</p>
            <p className="mt-4 text-[14px] leading-7 text-[var(--muted)]">Zari covers all of it. For anyone in an active search, the scope difference is significant. You can start Zari for free and immediately begin coaching on whatever is blocking your search.</p>
            <div className="mt-6">
              <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
                Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
