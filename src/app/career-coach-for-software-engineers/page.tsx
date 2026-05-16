import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Software Engineers — Resume, Interviews & Leveling Up",
  description:
    "Zari is the AI career coach built for software engineers. ATS resume optimization for tech roles, behavioral and technical interview prep, staff/senior level-up strategy, and salary negotiation for engineers.",
  keywords: ["career coach for software engineers", "AI career coach software engineer", "software engineer interview coach", "software engineer resume coach", "tech career coach", "engineer level up coaching", "staff engineer coach", "software engineer salary negotiation"],
  alternates: { canonical: "/career-coach-for-software-engineers" },
  openGraph: { title: "AI Career Coach for Software Engineers", description: "Resume optimization for tech roles, technical interview prep, staff-level coaching, and engineer salary negotiation.", url: "/career-coach-for-software-engineers" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does Zari help software engineers with their resume?", answer: "Zari optimizes software engineer resumes for ATS systems used by tech companies like Google, Meta, Amazon, and Stripe. It analyzes keyword coverage against the specific role (backend, frontend, full-stack, ML, data), scores every bullet for impact and metric density, and rewrites them for the target level — from SWE to Staff." },
  { question: "Does Zari help with technical interview preparation for software engineers?", answer: "Yes. Zari covers behavioral interview questions (the 'leadership principles' and 'tell me about a time' questions that trip up many engineers), system design framing, and technical deep-dive responses. It scores your answers using STAR methodology and coaches you to demonstrate scope, scale, and impact." },
  { question: "Can Zari help software engineers negotiate their compensation?", answer: "Yes. Zari provides market compensation data for engineering roles by level and location, generates specific counter-offer language, and runs negotiation simulations with the objections you're likely to face — including equity and total comp conversations." },
];

export default async function CareerCoachForSoftwareEngineersPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach for Software Engineers", url: `${BASE_URL}/career-coach-for-software-engineers` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", left: "-8%", background: "#0D7182", opacity: 0.08, filter: "blur(140px)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", width: "400px", height: "400px", top: "-5%", right: "-5%", background: "#7a8dff", opacity: 0.06, filter: "blur(120px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Career Coach · Software Engineers · SWE → Staff
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            The AI career coach<br />
            <span className="gradient-text-animated">built for engineers.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            From ATS-optimized resumes for Google, Meta, and Stripe to technical interview prep and staff-level coaching — Zari understands the specific signals that matter in engineering careers.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari does for software engineers</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { accent: "#0D7182", title: "Tech-role resume optimization", body: "Zari knows the difference between backend, frontend, ML, and platform engineering keywords. Your resume is analyzed against the specific role and level — SWE II, Senior, Staff, Principal." },
              { accent: "#7a8dff", title: "Behavioral interview coaching", body: "The leadership principles questions that trips up many engineers — conflict, scope, cross-functional influence. Zari drills these with STAR scoring until your answers demonstrate the leadership signal interviewers need to see." },
              { accent: "#4ca7e6", title: "System design framing", body: "How to structure and communicate system design decisions in an interview. Scope, trade-offs, scalability — the narrative that separates senior engineers from staff-level candidates." },
              { accent: "#10B981", title: "Engineer salary negotiation", body: "Equity, base, signing bonus, and total comp — Zari gives you market data for your level and location and runs the negotiation with you until it doesn't feel awkward." },
              { accent: "#F97316", title: "Staff-level coaching", body: "The specific signals that get engineers promoted to Staff: scope of influence, technical strategy, cross-organizational impact. Zari identifies where your narrative is still IC-level and helps you reframe it." },
              { accent: "#EC4899", title: "LinkedIn for engineers", body: "Your LinkedIn headline and About rebuilt for recruiter search. Technical specialties, seniority signal, and openness — optimized for the searches that lead to the right DMs." },
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
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[2rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
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
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your next engineering role or level-up — starts here.</h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/55">Free to start. Resume, interviews, and salary coaching — all in one.</p>
          <div className="mt-9">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-white px-10 text-[15px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              {userId ? "Go to dashboard" : "Start free"} <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
