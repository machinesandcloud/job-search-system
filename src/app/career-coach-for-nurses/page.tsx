import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Nurses — RN Resume, Interview & Specialty Coaching",
  description:
    "Zari is the AI career coach for nurses. RN and NP resume optimization, nursing interview prep, specialty transition coaching (ICU, travel nursing, NP), and nurse salary negotiation.",
  keywords: ["career coach for nurses", "nursing career coach", "RN career coach", "nurse resume help", "travel nurse career coaching", "NP career coach", "nurse practitioner career coaching", "nursing interview prep", "nurse salary negotiation"],
  alternates: { canonical: "/career-coach-for-nurses" },
  openGraph: { title: "AI Career Coach for Nurses", description: "RN resume optimization, nursing interview prep, specialty transition, and nurse salary negotiation.", url: "/career-coach-for-nurses" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does Zari help nurses with their resume?", answer: "Nursing resumes have specific requirements that differ from general resumes: certifications, clinical specialties, unit-specific experience, and licensure information must be presented correctly for ATS and nurse recruiters. Zari formats and optimizes nursing resumes for hospital systems, travel agencies, and clinic positions — ensuring your specialty, certifications, and clinical hours are presented to pass ATS and impress nurse hiring managers." },
  { question: "Can Zari help nurses transition to a new specialty?", answer: "Yes. Specialty transitions — from med-surg to ICU, ED to case management, bedside to nurse education — require reframing clinical experience to highlight transferable skills. Zari helps nurses identify the crossover between their current and target specialty and rebuild their resume and interview answers to make the case for the transition." },
  { question: "Does Zari help with travel nursing?", answer: "Yes. Travel nursing compensation is negotiable in ways staff positions often aren't. Zari helps travel nurses evaluate contract packages (stipends, housing, hourly rates), prepare negotiation approaches with travel agencies, and optimize their resume for the compact licensure and specialty keywords that travel agencies and hospital systems search for." },
];

export default async function CareerCoachForNursesPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach for Nurses", url: `${BASE_URL}/career-coach-for-nurses` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-15%", right: "-8%", background: "#10B981", opacity: 0.07, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Career Coach · Nurses · RN → NP → Leadership
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            AI career coaching<br />
            <span style={{ background: "linear-gradient(135deg,#10B981,#34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>built for nurses.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            From ATS-optimized nursing resumes to specialty transition coaching and travel nurse contract negotiation — Zari understands the specific dynamics of nursing careers at every stage.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(16,185,129,0.4)] transition-all hover:-translate-y-0.5" style={{ background: "#10B981" }}>
              Start nursing coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari delivers for nurses</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { accent: "#10B981", title: "Nursing resume optimization", body: "Certifications, licensure, clinical specialties, BLS/ACLS/PALS — formatted correctly for hospital ATS systems and travel nursing agencies. Bullet rewrites that quantify patient ratios, unit scope, and clinical outcomes." },
              { accent: "#0D7182", title: "Specialty transition coaching", body: "Moving from med-surg to ICU, ED to case management, or bedside to education? Zari maps transferable clinical skills and rewrites your resume and interview answers for the target specialty." },
              { accent: "#7a8dff", title: "Nursing interview prep", body: "Behavioral questions specific to nursing: prioritization scenarios, conflict with physicians, patient deterioration response. Zari drills the clinical judgment and teamwork questions that nursing interviews use." },
              { accent: "#F97316", title: "Travel nursing coaching", body: "Contract evaluation, agency negotiation, stipend vs. hourly optimization, compact licensure strategy. Zari helps travel nurses maximize compensation and navigate the complexity of agency contracts." },
              { accent: "#EC4899", title: "NP career coaching", body: "From RN to NP transition, NP resume positioning for clinic vs. hospital vs. specialty practice, and NP salary negotiation — including productivity bonuses and equity in private practice settings." },
              { accent: "#4ca7e6", title: "Nurse leadership pipeline", body: "Charge nurse to nurse manager, nurse educator, CNO — Zari helps bedside nurses build the evidence and narrative for leadership roles, including interview coaching for management positions." },
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

      <section className="noise-overlay relative overflow-hidden py-24 text-white" style={{ background: "linear-gradient(135deg,#022e20 0%,#10B981 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your next nursing role or specialty — free to start.</h2>
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
