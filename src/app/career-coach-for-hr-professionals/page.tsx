import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for HR Professionals — Resume, Interviews & Strategy",
  description:
    "Zari is the AI career coach for HR professionals. HR resume optimization, CHRO interview prep, talent acquisition career coaching, and HR leadership salary negotiation.",
  keywords: ["career coach for HR professionals", "HR career coach", "human resources career coach", "AI career coach HR", "CHRO coaching", "talent acquisition career coach", "HR director career coach", "HR resume help", "HR career coaching"],
  alternates: { canonical: "/career-coach-for-hr-professionals" },
  openGraph: { title: "AI Career Coach for HR Professionals", description: "HR resume optimization, CHRO interview prep, and HR leadership salary negotiation.", url: "/career-coach-for-hr-professionals" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does Zari optimize HR resumes?", answer: "HR resumes require a specific mix: business impact metrics (time-to-hire, retention rates, headcount managed, offer acceptance rates), program design credibility (benefits redesign, performance management systems, L&D programs), and the SHRM/HRCI certifications that signal professional depth. Zari rewrites HR resume bullets to quantify people and business outcomes — not just list HR programs — and optimizes for the ATS systems that HR professionals know better than most." },
  { question: "Does Zari help with CHRO and VP HR interviews?", answer: "Yes. Senior HR interviews focus on talent strategy, organizational design, culture architecture, and board-level communication. Zari prepares HR leaders for the strategic questions that define CHRO interviews: how you'd approach a talent gap in a hypergrowth company, how you'd design a compensation philosophy, how you've influenced CEO and board on people strategy. Different questions than manager-level HR roles require." },
  { question: "Can Zari help HR professionals move from TA or HRBP to HR leadership?", answer: "Yes — both transitions are common Zari coaching scenarios. Moving from talent acquisition to broader HR leadership requires expanding the narrative beyond recruiting. Moving from HRBP to HR director or VP requires building the case for strategic influence over operational execution. Zari helps HR professionals identify their highest-leverage experiences and reframe them for the leadership path." },
];

export default async function CareerCoachForHRPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach for HR Professionals", url: `${BASE_URL}/career-coach-for-hr-professionals` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", left: "-8%", background: "#10B981", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Career Coach · Human Resources · HRBP → Director → CHRO
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            AI career coaching<br />
            <span style={{ background: "linear-gradient(135deg,#10B981,#34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>built for HR professionals.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            From impact-driven HR resumes to CHRO interview prep and HR leadership salary negotiation — Zari understands the business metrics, strategic frameworks, and people outcomes that advance HR careers.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(16,185,129,0.4)] transition-all hover:-translate-y-0.5" style={{ background: "#10B981" }}>
              Start HR coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari delivers for HR professionals</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { accent: "#10B981", title: "HR resume optimization", body: "Time-to-hire, retention rates, offer acceptance rates, headcount managed, eNPS — the people and business metrics HR hiring teams scan for. Zari rewrites your resume bullets to quantify program impact, not just list HR responsibilities. ATS-optimized for HR-specific tools and certifications." },
              { accent: "#0D7182", title: "Talent acquisition coaching", body: "Recruiting metrics, sourcing strategies, candidate experience design, offer close rates, employer branding — TA interviews go deep on the operational and strategic side. Zari preps talent acquisition professionals for the full interview loop across TA manager and TA leader roles." },
              { accent: "#7a8dff", title: "HRBP and generalist coaching", body: "Employee relations, performance management, compensation structure, org design — HRBP roles sit at the intersection of business and people strategy. Zari preps you for the 'tell me how you handled a difficult manager situation' and 'how did you influence without authority' questions that define HRBP interviews." },
              { accent: "#EC4899", title: "HR leadership interview prep", body: "VP HR and CHRO interviews focus on talent strategy at scale: succession planning, culture design, compensation philosophy, DE&I strategy, and board communication. Zari prepares HR leaders for the strategic questions that distinguish director from C-suite candidates." },
              { accent: "#F97316", title: "HR salary negotiation", body: "HR comp is notoriously compressed — Zari gives you market benchmarks across TA, HRBP, L&D, total rewards, and HR leadership roles. Includes negotiation scripts for navigating conversations with hiring managers who know how compensation works." },
              { accent: "#4ca7e6", title: "LinkedIn for HR professionals", body: "HR professionals get significant inbound on LinkedIn — Zari optimizes your headline and About section for recruiter search and positions your strategic HR work in business terms that non-HR hiring stakeholders understand." },
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

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#001a0f 0%,#10B981 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your next HR role or level-up — free to start.</h2>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[#10B981] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
