import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Sales Professionals — Resume, Interviews & Strategy",
  description:
    "Zari is the AI career coach for sales professionals. Sales resume optimization, quota and pipeline interview prep, VP Sales coaching, and sales compensation negotiation.",
  keywords: ["career coach for sales professionals", "sales career coach", "AI career coach sales", "sales resume help", "VP Sales coaching", "account executive career coach", "SDR career coach", "sales director career coaching", "sales compensation negotiation"],
  alternates: { canonical: "/career-coach-for-sales-professionals" },
  openGraph: { title: "AI Career Coach for Sales Professionals", description: "Sales resume with quota metrics, interview prep for AE and VP roles, and sales comp negotiation.", url: "/career-coach-for-sales-professionals" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does Zari optimize sales resumes?", answer: "Sales resumes live or die on numbers: quota attainment (as % and absolute), average deal size, win rate, sales cycle length, and pipeline coverage. Zari identifies which metrics your target roles prioritize — enterprise vs SMB, hunter vs farmer, SaaS vs field — and rewrites your experience bullets to lead with the right performance indicators in the right language. ATS keyword optimization for sales tools (Salesforce, HubSpot, Outreach, Gong) is included." },
  { question: "Does Zari help with VP Sales and CRO interviews?", answer: "Yes. VP Sales interviews go beyond quota attainment: how you built your team, how you designed your comp plan, how you segmented your territory, how you forecast, and how you'd approach this specific market. Zari prepares sales leaders for the strategic questions that separate VP candidates — team structure, go-to-market strategy, top-of-funnel architecture, and the operational questions about RevOps alignment." },
  { question: "Can Zari help with sales comp negotiation?", answer: "Yes — and sales comp negotiation is uniquely complex. Base vs variable split, OTE expectations, accelerators, territory definition, ramping period, and equity in Series A+ companies all require careful negotiation. Zari gives you market benchmarks by role and company stage, and scripts for negotiating each component of a sales compensation package — including how to push on territory and quota before accepting." },
];

export default async function CareerCoachForSalesPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach for Sales Professionals", url: `${BASE_URL}/career-coach-for-sales-professionals` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", right: "-8%", background: "#F97316", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Career Coach · Sales · SDR → AE → VP → CRO
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            AI career coaching<br />
            <span style={{ background: "linear-gradient(135deg,#F97316,#FB923C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>built for sales professionals.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            From quota-led resume rewrites to VP Sales interview prep and OTE negotiation — Zari knows the metrics, frameworks, and comp structures that drive sales careers.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(249,115,22,0.4)] transition-all hover:-translate-y-0.5" style={{ background: "#F97316" }}>
              Start sales coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari delivers for sales professionals</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { accent: "#F97316", title: "Sales resume optimization", body: "Quota attainment %, average deal size, win rate, sales cycle, pipeline coverage — the performance numbers that sales hiring managers scan for first. Zari rewrites your bullets to lead with the right metrics for the role: enterprise AE vs SMB, hunter vs farmer, SaaS vs field sales." },
              { accent: "#0D7182", title: "AE and SDR interview prep", body: "Sales interviews include role plays, mock cold calls, deal reviews, and pipeline questions. Zari preps you for all of it: how to walk through a deal you lost, how to answer 'what's your process for researching an account', and how to do the discovery role play that most candidates fail." },
              { accent: "#7a8dff", title: "VP Sales and CRO coaching", body: "Team structure, comp plan design, territory segmentation, forecasting methodology, RevOps alignment — the strategic questions that define VP and CRO interviews. Zari prepares sales leaders to speak to board-level metrics and org design, not just personal quota performance." },
              { accent: "#EC4899", title: "Sales comp negotiation", body: "Base vs variable split, OTE, accelerators, territory definition, ramp period, equity. Zari gives you market benchmarks by company stage and role — and the scripts to negotiate each component, including how to push on territory and quota before you accept." },
              { accent: "#10B981", title: "Career transition coaching", body: "SDR to AE, AE to Sales Manager, individual contributor to VP, field sales to SaaS — each transition requires reframing your metrics and experience for the target audience. Zari identifies what transfers and what needs to be repositioned." },
              { accent: "#4ca7e6", title: "LinkedIn for sales professionals", body: "Sales professionals should have strong LinkedIn presence — buyers and recruiters both look. Zari rebuilds your headline for search visibility and rewrites your About to lead with revenue impact rather than job function." },
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

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#2e1400 0%,#F97316 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your next sales role or leadership level — free to start.</h2>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#F97316] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
