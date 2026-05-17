import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Workopolis — Best for Job Seekers in Canada? (2025)",
  description:
    "Workopolis is one of Canada's major job boards — with listings across Toronto, Vancouver, Calgary, and beyond. Zari is an AI career coach that optimizes your resume, coaches interviews, and helps you negotiate offers. Comparison for Canadian job seekers.",
  keywords: ["zari vs workopolis", "workopolis canada", "workopolis job board", "canada job search 2025", "ai career coach canada", "workopolis alternatives", "best job search canada"],
  alternates: { canonical: "/compare/zari-vs-workopolis" },
  openGraph: {
    title: "Zari vs Workopolis (2025) — Best for Canadian Job Seekers?",
    description: "Workopolis finds jobs across Canada. Zari coaches you to land them — ATS optimization, interview prep, and salary negotiation. Full comparison.",
    url: "/compare/zari-vs-workopolis",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Job listing discovery in Canada",
    workopolis: { capable: true, detail: "Workopolis is one of the major job boards in Canada — aggregating listings across Toronto, Vancouver, Calgary, Ottawa, Montreal, and smaller markets. For Canadian job seekers, Workopolis provides broad national coverage and is actively used by Canadian employers and recruitment agencies across industries. It operates alongside Indeed.ca and LinkedIn as a primary channel for Canadian job discovery." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings in any geography. For Canadian job seekers: use Workopolis, Indeed.ca, and LinkedIn to find your target roles — then bring the job description to Zari to optimize your application materials and prepare for the interview." },
    winner: "workopolis",
  },
  {
    task: "Salary data for the Canadian market",
    workopolis: { capable: true, detail: "Workopolis provides salary information for the Canadian market — covering role-specific data across Canadian cities and provinces. This is particularly useful for candidates navigating compensation differences between markets like Toronto vs. Calgary vs. Vancouver, which can be significant for the same role." },
    zari: { capable: true, detail: "Zari incorporates compensation context into negotiation coaching — helping you use Canadian market rate data strategically in a counter offer conversation, including the communication norms specific to Canadian workplace culture." },
    winner: "workopolis",
  },
  {
    task: "ATS resume optimization",
    workopolis: { capable: false, detail: "Workopolis allows resume upload and profile creation but doesn't analyze your resume against specific job descriptions or provide ATS keyword optimization. Applications from Workopolis typically route through employer ATS systems — Workopolis gets you to the application portal, not through the ATS screening that follows." },
    zari: { capable: true, detail: "Zari analyzes your resume against the specific Workopolis job description — identifying keyword gaps, rewriting weak bullets, and validating formatting for the ATS systems used by Canadian employers. Canadian resume conventions (2-page format is more accepted, skills sections are common) are handled alongside ATS optimization." },
    winner: "zari",
  },
  {
    task: "Interview preparation",
    workopolis: { capable: false, detail: "Workopolis provides job listings and some career resources but no personalized interview coaching. Interview preparation is entirely the candidate's responsibility — the platform ends at the application stage." },
    zari: { capable: true, detail: "Zari generates role-specific interview questions from the Workopolis job description, evaluates your STAR-method answers, and coaches both behavioral and technical interview patterns. Canadian interviews typically emphasize behavioral questions and cultural fit alongside technical competency — Zari prepares you for the full format." },
    winner: "zari",
  },
  {
    task: "Profile visibility to Canadian recruiters",
    workopolis: { capable: true, detail: "Workopolis maintains a searchable resume database used by Canadian employers and recruitment agencies. Uploading a complete profile creates passive discoverability — Canadian recruiters actively search these databases alongside LinkedIn when sourcing candidates for both permanent and contract roles." },
    zari: { capable: false, detail: "Zari doesn't create employer-visible profiles. However, Zari's LinkedIn optimization improves your discoverability to the same Canadian recruiters who source on LinkedIn — which is the primary professional sourcing platform used alongside Workopolis for most professional roles in Canada." },
    winner: "workopolis",
  },
  {
    task: "LinkedIn profile optimization",
    workopolis: { capable: false, detail: "No LinkedIn integration or profile optimization capability. Workopolis and LinkedIn are parallel channels for most Canadian professional roles — optimizing your Workopolis profile doesn't improve your LinkedIn discoverability to recruiters sourcing across both platforms." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and experience bullets for recruiter search visibility. Canadian professional roles — especially in Toronto's finance and tech sectors, Vancouver's tech market, and Calgary's energy industry — increasingly source passively on LinkedIn alongside job board postings." },
    winner: "zari",
  },
  {
    task: "Salary negotiation coaching",
    workopolis: { capable: false, detail: "Workopolis provides salary data but no negotiation coaching. Canadian workplace culture has specific norms around salary negotiation — direct counter-offers are common but the conversation tone differs from US negotiation style, and factors like benefits, vacation (minimum 2 weeks by law), pension matching, and RRSP contributions are often part of total compensation discussions." },
    zari: { capable: true, detail: "Zari coaches salary negotiation accounting for Canadian workplace norms — covering counter offer framing, total compensation negotiation (base, benefits, vacation, RRSP matching, bonus structure), and the pushback scripts calibrated for Canadian hiring practices across provinces and industries." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const workopolis = TASK_COMPARISON.filter(r => r.winner === "workopolis").length;
  return { zari, workopolis, total: TASK_COMPARISON.length };
})();

const FAQS = [
  { question: "Is Workopolis still the best job board in Canada?", answer: "Workopolis is one of the major Canadian job boards, but the Canadian job search landscape is distributed across several platforms. Indeed.ca typically has the largest listing volume in Canada across all industries. LinkedIn is dominant for professional and managerial roles. Workopolis remains relevant especially for mid-market Canadian employers and recruitment agencies. The practical approach for Canadian job seekers: use Indeed.ca and LinkedIn for primary discovery; Workopolis adds coverage for roles not appearing elsewhere, particularly from Canadian employers who prefer Canadian platforms." },
  { question: "Do Canadian employers use ATS systems the same way US employers do?", answer: "Yes — ATS filtering is the same in Canada. Most Canadian employers with more than 50 employees use applicant tracking systems (Workday, Taleo, Greenhouse, Lever, and others) that parse and filter resumes before any human reviews them. The keyword matching, formatting rules, and optimization principles are identical to the US. One Canadian-specific note: Canadian resumes are typically 2 pages (vs. the US 1-page preference), which is ATS-compatible as long as the formatting is clean and parseable." },
  { question: "How is salary negotiation different in Canada vs. the US?", answer: "Several important differences: (1) Canadian base salaries are quoted in Canadian dollars — a $100K CAD offer is roughly $73K USD, which matters when comparing offers or relocating; (2) Benefits packages in Canada often include provincial health coverage supplementation (private dental, prescription, vision), not full health replacement as in the US; (3) Vacation is governed by provincial Employment Standards — minimum 2 weeks in most provinces, 3 weeks in some — so negotiating above the statutory minimum is common for professional roles; (4) RRSP matching (Canada's 401K equivalent) is a negotiable component; (5) The negotiation conversation itself tends to be slightly more indirect than US-style negotiation — confident but relationship-preserving." },
];

export default async function ZariVsWorkopolisPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Workopolis", url: `${BASE_URL}/compare/zari-vs-workopolis` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Workopolis</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Workopolis is one of Canada&apos;s major job boards — actively used by Canadian employers and recruiters across Toronto, Vancouver, Calgary, and beyond. Zari coaches you to win the roles you find there.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.workopolis}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Workopolis wins</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-white/25">Across {SCORE_DATA.total} evaluated job search tasks</p>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-4">
            {TASK_COMPARISON.map((row) => (
              <div key={row.task} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] px-5 py-3.5">
                  <p className="font-bold text-[var(--ink)]">{row.task}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className={`px-5 py-4 ${row.winner === "workopolis" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.workopolis.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Workopolis {row.workopolis.capable ? "✓" : "✗"}</p>
                      {row.winner === "workopolis" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.workopolis.detail}</p>
                  </div>
                  <div className={`px-5 py-4 ${row.winner === "zari" ? "bg-[var(--brand)]/[0.04]" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.zari.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Zari {row.zari.capable ? "✓" : "✗"}</p>
                      {row.winner === "zari" && <span className="ml-auto rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--brand)]">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found a role on Workopolis? Let Zari help you land it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for Canadian ATS systems, coaches your interview for the specific role, and helps you negotiate the full Canadian offer package. Start free — no card required.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
