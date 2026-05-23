import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zari vs Handshake — Best for Early-Career Job Seekers? (2025)",
  description:
    "Handshake connects students and recent grads with early-career employers. Zari coaches them through getting hired — resume, interview prep, and offer negotiation. Here's what each does and when you need both.",
  keywords: ["zari vs handshake", "handshake job search", "best tools for recent graduates", "handshake alternatives", "entry level job search tools", "college job search 2025"],
  alternates: { canonical: "/compare/zari-vs-handshake" },
  openGraph: {
    title: "Zari vs Handshake (2025) — For Students and Recent Grads",
    description: "Handshake finds early-career opportunities. Zari coaches you to compete for them. The complete comparison for students and recent graduates.",
    url: "/compare/zari-vs-handshake",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const TASK_COMPARISON = [
  {
    task: "Early-career and campus-recruiting job discovery",
    handshake: { capable: true, detail: "Handshake is the dominant platform for early-career job discovery — over 1,400 universities connected, employers specifically targeting recent graduates, and campus recruiting events integrated. For students and recent graduates, it's the most relevant job board." },
    zari: { capable: false, detail: "Zari doesn't aggregate job listings. It's a coaching platform — you find the opportunity on Handshake, then Zari helps you compete for it with ATS-optimized resume, interview prep, and offer coaching." },
    winner: "handshake",
  },
  {
    task: "ATS resume optimization for entry-level roles",
    handshake: { capable: false, detail: "Handshake provides a basic profile and resume upload, but doesn't analyze your resume against specific job descriptions or provide ATS keyword optimization. Most entry-level applicants don't optimize their resume for ATS — which is a significant competitive disadvantage." },
    zari: { capable: true, detail: "Zari optimizes your resume for the specific job description — identifying missing keywords, rewriting bullets to show impact rather than activity, and checking ATS formatting. Entry-level candidates who optimize their resume stand out significantly in pools where most don't." },
    winner: "zari",
  },
  {
    task: "On-campus recruiting event access",
    handshake: { capable: true, detail: "Handshake integrates campus career fair and employer event calendars — letting students discover and register for on-campus interviews, info sessions, and virtual recruiting events directly through the platform." },
    zari: { capable: false, detail: "Zari doesn't list events or connect you to employers. It coaches the skills that make you successful when you get to those events — interview preparation, elevator pitch coaching, and follow-up strategy." },
    winner: "handshake",
  },
  {
    task: "Interview preparation (early-career specific)",
    handshake: { capable: false, detail: "Handshake provides some general career resources and employer-specific prep materials, but no mock interview coaching or behavioral question practice with feedback on your specific answers." },
    zari: { capable: true, detail: "Zari runs behavioral and competency-based interview coaching specific to early-career candidates — the STAR method, how to answer 'tell me about a time' with limited work experience, and what recent grads commonly get wrong in their first real interviews." },
    winner: "zari",
  },
  {
    task: "Offer evaluation and negotiation for first jobs",
    handshake: { capable: false, detail: "Handshake surfaces comp data on many listings, which helps with research, but doesn't coach the negotiation itself. Most recent graduates don't negotiate their first offer — which costs them significantly over the long run." },
    zari: { capable: true, detail: "Zari coaches first-job offer negotiation — when it's appropriate to counter, what to say, how to evaluate total comp including benefits and equity, and the specific scripts for first-time negotiators who don't want to seem aggressive." },
    winner: "zari",
  },
  {
    task: "LinkedIn profile optimization",
    handshake: { capable: false, detail: "No LinkedIn integration or optimization. Handshake is a separate ecosystem. Many campus recruiters who post on Handshake also search LinkedIn — optimizing both profiles matters for early-career candidates." },
    zari: { capable: true, detail: "Zari audits and rewrites your LinkedIn headline, About section, and skills for recruiter search discoverability — especially important for recent graduates whose profiles often read as academic CVs rather than professional profiles." },
    winner: "zari",
  },
];

const SCORE_DATA = (() => {
  const zari = TASK_COMPARISON.filter(r => r.winner === "zari").length;
  const handshake = TASK_COMPARISON.filter(r => r.winner === "handshake").length;
  return { zari, handshake, total: TASK_COMPARISON.length };
})();

const EARLY_CAREER_TIPS = [
  { tip: "Optimize your resume before every application, not once", detail: "Entry-level pools are large. ATS systems at target employers filter for specific keywords, and those keywords vary by role. A resume optimized for a marketing internship differs from one for a finance rotational program. Use Zari to tailor for each Handshake application that matters." },
  { tip: "Don't skip the first offer negotiation", detail: "Most recent graduates accept first offers without countering — which anchors their compensation for years. A 10% counter on a $60,000 first salary, compounded with each subsequent raise and offer, is worth $150,000+ over a career. The risk of a gracious counter being rejected is nearly zero." },
  { tip: "Your Handshake profile and your LinkedIn profile need to be consistent", detail: "Campus recruiters cross-reference. Inconsistencies in dates, roles, or skills between platforms raise questions. Keep them aligned and optimized together." },
  { tip: "On-campus recruiting moves fast — prepare before you apply", detail: "Handshake makes it easy to apply — which means competition is high and decisions happen quickly. Have your resume optimized and your interview prep done before you register for any recruiting event. Most candidates prepare after getting the interview; the ones who prepare before consistently outperform them." },
];

const FAQS = [
  { question: "Is Handshake only for college students?", answer: "Handshake is designed primarily for current college students and recent graduates (typically within 2–3 years of graduation). Many employers use Handshake specifically for campus recruiting and early-career pipelines — which makes it the most relevant platform for that demographic. For candidates more than 2–3 years out of school, Indeed and LinkedIn typically offer more relevant opportunities." },
  { question: "Should recent graduates use Handshake or LinkedIn?", answer: "Both — they serve different purposes. Handshake is purpose-built for campus recruiting and early-career opportunities, with employers specifically hiring for entry-level roles. LinkedIn is where recruiters search for candidates at all levels, and where your professional network lives. Build both profiles and optimize both — they complement rather than replace each other." },
  { question: "Can you negotiate a salary offer from Handshake?", answer: "Yes — and most early-career candidates don't, which means the ones who do have a real advantage. Handshake shows comp ranges on many listings, which gives you market data for a counter. Most employers who post on Handshake expect professional candidates who know their market value — countering 10–15% above the offer is reasonable, professional, and rarely risks the offer." },
];

export default async function ZariVsHandshakePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs Handshake", url: `${BASE_URL}/compare/zari-vs-handshake` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Tool Comparison · 2025</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Zari vs Handshake</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Handshake connects students and recent grads with campus recruiters and early-career employers. Zari coaches you to compete for those roles — resume, interviews, and first-offer negotiation.
          </p>
          <div className="mx-auto mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-[var(--cyan)]">{SCORE_DATA.zari}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Zari wins</p>
            </div>
            <div className="flex-1 py-5 text-center">
              <p className="text-[2.5rem] font-extrabold text-white/30">{SCORE_DATA.handshake}</p>
              <p className="mt-1 text-[12px] font-semibold text-white/50">Handshake wins</p>
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
                  <div className={`px-5 py-4 ${row.winner === "handshake" ? "bg-emerald-50/40" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.handshake.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Handshake {row.handshake.capable ? "✓" : "✗"}</p>
                      {row.winner === "handshake" && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.handshake.detail}</p>
                  </div>
                  <div className={`px-5 py-4 ${row.winner === "zari" ? "bg-[var(--brand)]/[0.04]" : ""}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${row.zari.capable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Zari {row.zari.capable ? "✓" : "✗"}</p>
                      {row.winner === "zari" && <span className="ml-auto rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4361EE]">Wins</span>}
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{row.zari.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early career tips */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 tips for early-career job seekers using both tools</h2>
          <div className="mt-7 space-y-3">
            {EARLY_CAREER_TIPS.map((item, i) => (
              <div key={item.tip} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.tip}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-white p-5">
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Found your target role on Handshake? Now compete for it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for the specific job description, coaches your interview answers with real feedback, and helps you negotiate your first offer confidently. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
