import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Executives — C-Suite Resume, Board Roles & Salary",
  description:
    "Zari is the AI career coach for senior leaders and executives. Executive resume positioning, C-suite interview prep, board role strategy, and executive compensation negotiation.",
  keywords: ["career coach for executives", "executive career coach", "AI career coach executives", "C-suite career coach", "executive resume coach", "VP director career coaching", "executive job search", "board role coaching", "executive salary negotiation"],
  alternates: { canonical: "/career-coach-for-executives" },
  openGraph: { title: "AI Career Coach for Executives", description: "Executive resume positioning, C-suite interview prep, board role strategy, and executive compensation negotiation.", url: "/career-coach-for-executives" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does Zari help executives with their resume?", answer: "Executive resumes require a fundamentally different approach than individual contributor resumes. Zari repositions your resume around P&L ownership, organizational scope, revenue impact, and transformation leadership — the signals that C-suite hiring committees and board search firms look for. It removes the operational detail that buries executive signal and replaces it with strategic narrative." },
  { question: "Can Zari help with C-suite and VP-level interviews?", answer: "Yes. Zari prepares executives for the board-facing questions, stakeholder alignment scenarios, and vision-setting discussions that define C-suite interviews. It also covers the leadership philosophy framing and cultural fit questions that often determine the final decision between equally qualified executive candidates." },
  { question: "Does Zari help with board of directors roles?", answer: "Yes. Board positioning requires a separate narrative from an executive job search — committee fit, governance experience, industry expertise, and the specific value you bring to a particular board composition. Zari helps executives develop board profiles, board bios, and the positioning strategy to get into the right director conversations." },
];

export default async function CareerCoachForExecutivesPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach for Executives", url: `${BASE_URL}/career-coach-for-executives` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "700px", height: "700px", top: "-20%", right: "-10%", background: "#7a8dff", opacity: 0.06, filter: "blur(160px)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", width: "500px", height: "500px", bottom: "-10%", left: "-5%", background: "#0D7182", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Career Coach · Executives · VP → C-Suite → Board
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            Executive career coaching<br />
            <span className="gradient-text-animated">built for leaders.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            At the executive level, the rules of job searching change completely. Zari understands the specific signals — scope, transformation, P&L ownership, board exposure — that define strong executive candidates.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Start executive coaching <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari delivers for executives</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { accent: "#0D7182", title: "Executive resume positioning", body: "Rewritten around transformation leadership, organizational scope, P&L ownership, and revenue impact — the signals that C-suite committees and executive search firms need to see. Operational detail removed; strategic narrative front and center." },
              { accent: "#7a8dff", title: "C-suite interview preparation", body: "Board presentations, stakeholder alignment scenarios, culture and vision questions, and the leadership philosophy framing that separates strong executive candidates from strong director candidates." },
              { accent: "#4ca7e6", title: "Board of directors positioning", body: "A separate narrative built for board roles: committee fit, governance expertise, the specific value you bring to a particular board composition, and strategies for getting into the right director conversations." },
              { accent: "#10B981", title: "Executive compensation negotiation", body: "Total executive comp — base, bonus, equity, benefits, and non-standard terms — with market benchmarks by company stage and industry. Counter-offer scripts and negotiation simulations calibrated for executive conversations." },
              { accent: "#F97316", title: "LinkedIn for senior leaders", body: "Executive LinkedIn profiles that signal strategic leadership, not job title seniority. Rebuilt headline, About, and featured section for board visibility, executive search, and speaking opportunities." },
              { accent: "#EC4899", title: "Executive narrative coaching", body: "Your three signature stories: transformation led, team or organization built, result delivered at scale. Coached until your narrative is compelling in any room — from a board interview to an investor meeting." },
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

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">The executive job search is different</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { label: "Roles aren't posted publicly", body: "80%+ of executive roles are filled through networks and search firms before a job posting exists. Zari helps you build the right signals for the conversations that happen before the listing." },
              { label: "The hiring process involves a board", body: "At the C-suite level, the board has final approval. Zari prepares you for the board-facing conversation — vision, governance, cultural alignment — that most executive coaches don't cover." },
              { label: "Comp is negotiated, not offered", body: "Executive compensation packages are complex and negotiable in ways that IC packages aren't. Zari walks you through total comp, equity structure, termination provisions, and the negotiation dynamics." },
              { label: "Your brand is your pipeline", body: "Speaking, writing, LinkedIn, board advisory roles — executive candidates are evaluated on their market presence before the first call. Zari helps you build the external signal that brings opportunities inbound." },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.label}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <h3 className="mb-2 text-[14px] font-bold text-[var(--ink)]">{f.question}</h3>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your next executive role — starts here.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">Free to start. Executive resume, C-suite interviews, and compensation coaching.</p>
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
