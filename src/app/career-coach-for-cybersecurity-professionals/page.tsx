import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Cybersecurity Professionals — Resume, Interviews & Strategy",
  description:
    "Zari is the AI career coach for cybersecurity professionals. Security resume optimization, CISO interview prep, security engineer career coaching, and cybersecurity salary negotiation.",
  keywords: ["career coach for cybersecurity professionals", "cybersecurity career coach", "CISO coaching", "security engineer career coach", "AI career coach cybersecurity", "cybersecurity resume help", "penetration tester career coach", "security analyst career coach", "infosec career coaching"],
  alternates: { canonical: "/career-coach-for-cybersecurity-professionals" },
  openGraph: { title: "AI Career Coach for Cybersecurity Professionals", description: "Security resume optimization, CISO interview prep, and cybersecurity salary negotiation.", url: "/career-coach-for-cybersecurity-professionals" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "How does Zari optimize cybersecurity resumes?", answer: "Security resumes require precise credential and technical stack signaling: certifications (CISSP, CISM, CEH, OSCP, Security+), technical domains (cloud security, penetration testing, threat intelligence, incident response, SIEM/SOAR), and the governance frameworks (NIST, ISO 27001, SOC 2, FedRAMP) that hiring managers and compliance teams look for. Zari rewrites your resume bullets to lead with risk reduction outcomes, vulnerability impact, and security program scope — not just tools and responsibilities." },
  { question: "Does Zari help with CISO interviews?", answer: "Yes. CISO interviews are distinct from technical security interviews — they focus on risk communication to the board, security budget justification, vendor governance, and the organizational influence required to build a security-first culture without slowing the business. Zari prepares security leaders for the executive-level questions that distinguish CISO candidates, including how to present security posture to non-technical executives and how to frame security investment as business risk management." },
  { question: "Can Zari help security professionals get higher clearances or federal roles?", answer: "Zari coaches cybersecurity professionals on federal and defense contractor positioning: security clearance discussion strategy in interviews, resume optimization for GS-series and federal contracting roles, and the specific frameworks (CMMC, FedRAMP, FISMA) that federal security hiring requires. For clearance-related career questions, Zari focuses on the positioning strategy rather than clearance-specific legal guidance." },
];

export default async function CareerCoachForCybersecurityPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "AI Career Coach for Cybersecurity Professionals", url: `${BASE_URL}/career-coach-for-cybersecurity-professionals` }]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white md:pb-32 md:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position: "absolute", width: "600px", height: "600px", top: "-10%", right: "-8%", background: "#0D7182", opacity: 0.09, filter: "blur(140px)", borderRadius: "50%" }} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            AI Career Coach · Cybersecurity · Analyst → Engineer → CISO
          </div>
          <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[4rem]">
            AI career coaching<br />
            <span className="gradient-text-animated">built for security professionals.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/55">
            From CISSP-credentialed resume optimization to CISO board communication prep — Zari understands the certifications, frameworks, and risk language that advance cybersecurity careers.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-[var(--brand)] px-10 text-[15px] font-bold text-white shadow-[0_8px_40px_rgba(13,113,130,0.45)] transition-all hover:-translate-y-0.5">
              Start security coaching free <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-14 text-center text-[2.4rem] font-extrabold tracking-[-0.03em] text-[var(--ink)]">What Zari delivers for cybersecurity professionals</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { accent: "#0D7182", title: "Security resume optimization", body: "CISSP, CISM, CEH, OSCP, Security+ — credentials that must be front-and-center. Zari rewrites security resume bullets to quantify vulnerability reduction, incident response outcomes, and program scope. ATS-optimized for NIST, SOC 2, ISO 27001, and cloud security keywords." },
              { accent: "#7a8dff", title: "Security engineer interview prep", body: "Technical security interviews cover threat modeling, secure architecture, pen testing methodology, and incident response playbooks. Zari preps security engineers for the full technical loop — architecture reviews, live threat scenarios, and the coding/scripting questions that appear in security engineering interviews." },
              { accent: "#EC4899", title: "Penetration testing career coaching", body: "Red team, bug bounty, and offensive security careers have specific credential paths (OSCP, PNPT, CEH) and portfolio requirements. Zari helps penetration testers position their CVE discoveries, responsible disclosure history, and technical achievements for career advancement." },
              { accent: "#F97316", title: "CISO and security leadership prep", body: "Board-level risk communication, security budget justification, vendor governance, security culture programs — CISO interviews test executive judgment and business alignment, not just technical depth. Zari prepares security leaders for the strategic questions that define VP Security and CISO roles." },
              { accent: "#10B981", title: "Cybersecurity salary negotiation", body: "Security comp is high and variable by specialization: CISO at a Fortune 500 vs. a startup, offensive vs. defensive tracks, federal vs. private sector. Zari gives you market benchmarks by role and sector — and negotiation scripts for a field where professionals often undersell." },
              { accent: "#4ca7e6", title: "Federal and cleared roles coaching", body: "FedRAMP, CMMC, FISMA, TS/SCI — federal and defense security roles require specific resume positioning. Zari optimizes resumes for GS-series and contracting roles, and coaches on clearance discussion strategy in interviews." },
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
          <h2 className="text-[2.8rem] font-extrabold tracking-[-0.03em]">Your next security role or level-up — free to start.</h2>
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
