import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Finance Professionals — Resume, Interviews & Strategy",
  description:
    "Zari is the AI career coach for finance professionals. Investment banking resume optimization, finance interview prep, CFA career coaching, CFO strategy, and finance salary negotiation.",
  keywords: ["career coach for finance professionals", "finance career coach", "investment banking career coach", "AI career coach finance", "finance resume help", "CFA career coaching", "CFO coaching", "financial analyst career coach", "Wall Street career coach"],
  alternates: { canonical: "/career-coach-for-finance-professionals" },
  openGraph: { title: "AI Career Coach for Finance Professionals", description: "Investment banking resume optimization, finance interview prep, and CFO-level career strategy.", url: "/career-coach-for-finance-professionals" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does Zari optimize finance resumes?", answer: "Finance resumes have strict conventions: deal experience, transaction size, industries covered, financial modeling skills (LBO, DCF, 3-statement), and certification status (CFA, CPA, CAIA). Zari restructures your resume to lead with the credentials and deal metrics that finance hiring managers immediately scan for — and tailors the language for IB, PE, AM, or corporate finance depending on your target. ATS optimization for finance-specific software (Bloomberg, FactSet, Capital IQ) is included." },
  { question: "Does Zari help with investment banking and private equity interviews?", answer: "Yes. IB and PE interviews are among the most technically demanding in any industry: LBO modeling, valuation multiples, deal structuring, market sizing, and the 'fit' questions that determine cultural match. Zari preps you with finance-specific question banks, walk-through coaching for technical questions, and STAR-method coaching for the behavioral interview that almost always accompanies technical rounds in finance." },
  { question: "Can Zari help finance professionals move into corporate finance or the C-suite?", answer: "Yes — the IB-to-corporate-finance and the FP&A-to-CFO tracks are common transitions Zari coaches. Moving from investment banking to corporate development, or from VP Finance to CFO, requires reframing deal experience as operational ownership and business strategy. Zari helps finance professionals translate Wall Street credentials and experience into the language of corporate leadership." },
];

export default async function CareerCoachForFinancePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach for Finance Professionals", url: `${BASE_URL}/career-coach-for-finance-professionals` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", left: "-8%", background: "#0D7182", opacity: 0.1, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Career Coach · Finance · Analyst → VP → CFO
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            AI career coaching<br />
            <span className="gradient-text-animated">built for finance professionals.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            From IB analyst resume optimization to PE interview prep and CFO career strategy — Zari understands deal credentials, financial modeling signals, and the career paths that define finance.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Start finance coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari delivers for finance professionals</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { accent: "#0D7182", title: "Investment banking resume optimization", body: "Deal experience, transaction size, industries covered, LBO and DCF skills, CFA/CPA status — the precise signals IB hiring managers scan for. Zari restructures your resume with the right format and metrics for investment banking, private equity, and asset management recruiting." },
              { accent: "#7a8dff", title: "Finance technical interview prep", body: "LBO modeling, valuation multiples, DCF analysis, accounting questions, market sizing — Zari preps you for the technical questions that define IB, PE, and hedge fund interviews. Walk-through coaching on how to explain your deal experience, your assumptions, and your models." },
              { accent: "#10B981", title: "Private equity and VC coaching", body: "PE interviews include case studies, modeling tests, and fit questions all in one process. Zari prepares you for the deal discussion (what makes a good LBO target), the modeling test (what to prioritize in 3 hours), and the cultural fit that determines whether you get the offer." },
              { accent: "#F97316", title: "Corporate finance and FP&A coaching", body: "FP&A, corporate development, treasury — corporate finance interviews focus on business partnering, budget ownership, and financial modeling in operational context. Zari helps corporate finance professionals position their experience for the next role in or out of IB." },
              { accent: "#EC4899", title: "Finance salary negotiation", body: "Finance comp is complex: base, bonus (percentage of salary, discretionary vs. guaranteed), carry, co-investment rights, and deferred compensation. Zari gives you market benchmarks by firm type and level — and scripts for negotiating each component." },
              { accent: "#4ca7e6", title: "CFO and finance leadership coaching", body: "CFO interviews focus on board communication, fundraising strategy, capital allocation, and team leadership. Zari coaches finance professionals for VP Finance and CFO roles: how to frame your deal experience as operational and strategic credibility." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${item.accent}18` }}>
                  <div className="h-2 w-2 rounded-full" style={{ background: item.accent }} />
                </div>
                <h3 className="mb-2 text-[14.5px] font-bold text-[var(--ink)]">{item.title}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6 space-y-4">
          {FAQS.map((f) => (
            <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-2 text-[14px] font-bold text-[var(--ink)]">{f.question}</h3>
              <p className="text-[13.5px] leading-6 text-[var(--muted)]">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your next finance role or level-up — free to start.</h2>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
