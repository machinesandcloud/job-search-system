import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Resume Format Guide: Which Format Is Best for You? (2025)",
  description:
    "Chronological, functional, or hybrid? The complete guide to resume formats — which one to use based on your experience, career history, and target role.",
  keywords: ["resume format", "best resume format", "resume format 2025", "chronological resume", "functional resume", "hybrid resume format", "resume layout", "resume format guide", "which resume format should I use"],
  alternates: { canonical: "/blog/resume-format-guide" },
  openGraph: { title: "Resume Format Guide: Which Format Is Best for You? (2025)", description: "Chronological, functional, or hybrid? The complete guide to choosing the right resume format.", url: "/blog/resume-format-guide" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-01";
const MODIFIED = "2025-05-16";

export default async function ResumeFormatGuidePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Resume Format Guide: Which Format Is Best for You? (2025)"
        description="Chronological, functional, or hybrid? The complete guide to choosing the right resume format."
        url={`${BASE_URL}/blog/resume-format-guide`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Resume Format Guide", url: `${BASE_URL}/blog/resume-format-guide` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Resume</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">Resume Format Guide: Which Format Is Best for You? (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 9 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              The format of your resume affects how recruiters read it, how ATS systems process it, and how quickly you make an impression. There are three main formats — and the right one depends on your situation.
            </p>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 3 resume formats</h2>
            <div className="mt-6 space-y-6">
              {[
                {
                  name: "1. Chronological (reverse-chronological)",
                  use: "Best for: Most job seekers with steady career progression",
                  color: "#0D7182",
                  desc: "Lists your experience starting with your most recent role and working backward. This is the standard format — 90%+ of resumes use it, and it's what recruiters and ATS systems expect. Your most recent experience is at the top where it gets the most attention.",
                  pros: ["ATS-friendly — systems parse it correctly", "Recruiter-familiar — easiest to scan", "Shows career progression clearly", "Works for most experience levels"],
                  cons: ["Shows gaps clearly", "Puts older experience at the bottom where it gets less attention"],
                  best: "You have 2+ years of relevant work experience with no major gaps. Your most recent roles are your strongest. You're staying in the same field.",
                },
                {
                  name: "2. Functional (skills-based)",
                  use: "Best for: Specific situations — not recommended for most job seekers",
                  color: "#EC4899",
                  desc: "Groups your experience by skill category rather than by employer. The goal is to highlight capabilities without drawing attention to employment history. In practice, ATS systems struggle with this format, and recruiters often find it suspicious.",
                  pros: ["Hides gaps and short tenures", "De-emphasizes employment dates"],
                  cons: ["ATS systems often can't parse it correctly", "Triggers recruiter skepticism", "Makes it hard to assess actual scope and impact"],
                  best: "Almost never. If you have gaps or short tenures, a chronological format with a strong summary that addresses the gap is better. Functional resumes raise red flags with most recruiters.",
                },
                {
                  name: "3. Hybrid (combination)",
                  use: "Best for: Career changers and senior professionals",
                  color: "#7a8dff",
                  desc: "Combines a prominent skills or summary section at the top with a standard chronological work history below. The summary section lets you front-load the most relevant skills and framing before the recruiter sees the work history.",
                  pros: ["ATS-friendly (the work history section is chronological)", "Lets you control the narrative before they see your history", "Strong for career changers"],
                  cons: ["Can feel redundant if skills section repeats work history", "Requires more careful writing to add real value at the top"],
                  best: "You're making a career change and need to reframe transferable skills. You're a senior professional with broad skills that don't fit neatly into recent roles. You have an unusual career path that needs narrative context.",
                },
              ].map((fmt) => (
                <div key={fmt.name} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                  <div className="mb-1 text-[11px] font-bold uppercase tracking-wider" style={{ color: fmt.color }}>{fmt.use}</div>
                  <h3 className="mb-3 text-[17px] font-extrabold text-[var(--ink)]">{fmt.name}</h3>
                  <p className="mb-4 text-[13.5px] leading-6 text-[var(--muted)]">{fmt.desc}</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 text-[12px] font-bold text-emerald-600">Pros</p>
                      <ul className="space-y-1">
                        {fmt.pros.map((p) => <li key={p} className="text-[13px] leading-5 text-[var(--muted)]">+ {p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-[12px] font-bold text-red-500">Cons</p>
                      <ul className="space-y-1">
                        {fmt.cons.map((c) => <li key={c} className="text-[13px] leading-5 text-[var(--muted)]">− {c}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl border border-[var(--border)] bg-white p-4">
                    <p className="text-[12px] font-bold text-[var(--ink)]">Use this format when:</p>
                    <p className="mt-1 text-[13px] leading-5 text-[var(--muted)]">{fmt.best}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Which format to use — by situation</h2>
            <div className="mt-5 space-y-3">
              {[
                { situation: "Recent graduate with internships", format: "Chronological", why: "Lead with education, follow with internships. Education goes above experience for recent grads only." },
                { situation: "Mid-career with steady progression", format: "Chronological", why: "Standard format. Most recent role first. Your career trajectory is your strongest selling point." },
                { situation: "Career changer (different industry)", format: "Hybrid", why: "Use a strong summary to frame transferable skills before the recruiter sees the work history." },
                { situation: "Long gap in employment", format: "Chronological", why: "Don't try to hide it with a functional format — recruiters notice. Address the gap briefly in a summary or cover letter instead." },
                { situation: "Many short-tenure roles", format: "Chronological + explain briefly", why: "If the short tenures are legitimate (startup failures, layoffs, contract work), say so. Don't try to obscure it — it makes it worse." },
                { situation: "Senior executive or C-suite", format: "Hybrid", why: "Executive resumes typically lead with a brief profile and core competencies, then chronological experience. Boards and executive search firms expect a narrative, not just a list." },
              ].map((item) => (
                <div key={item.situation} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[var(--ink)]">{item.situation}</p>
                    <p className="text-[12px] font-semibold text-[var(--brand)]">→ {item.format}</p>
                    <p className="mt-1 text-[13px] leading-5 text-[var(--muted)]">{item.why}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Resume formatting rules that apply to all formats</h2>
            <div className="mt-5 space-y-3">
              {[
                { rule: "One page if under 10 years of experience", detail: "Two pages are acceptable for 10+ years. Three pages is almost never appropriate." },
                { rule: "Standard fonts only", detail: "Calibri, Arial, Garamond, or Georgia at 10-12pt. Decorative fonts cause ATS parsing errors." },
                { rule: "No tables, columns, or text boxes in the main content", detail: "ATS systems often can't read text inside tables or columns. Use simple left-aligned sections." },
                { rule: "Margins between 0.5\" and 1\"", detail: "Tight margins (0.5\") maximize space. Wider margins (1\") look more traditional. Don't go below 0.5\"." },
                { rule: "Consistent date formatting", detail: "Pick one format (Month YYYY or just YYYY) and use it everywhere." },
                { rule: "PDF unless specifically asked for Word", detail: "PDF preserves your formatting. Word files can display differently on different machines." },
              ].map((item) => (
                <div key={item.rule} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="mb-1 font-bold text-[var(--ink)]">{item.rule}</p>
                  <p className="text-[13px] leading-5 text-[var(--muted)]">{item.detail}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Get your resume format analyzed — free</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Zari&apos;s <Link href="/ai-resume-writer" className="text-[var(--brand)] underline underline-offset-2">AI resume writer</Link> checks your format for ATS compatibility, rewrites your bullets to lead with impact, and scores your resume against the specific job you&apos;re targeting — in under 3 minutes.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Get your resume ATS score — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Upload your resume and a job description. Zari scores your ATS match and rewrites the bullets that are hurting you.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Check my resume free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
