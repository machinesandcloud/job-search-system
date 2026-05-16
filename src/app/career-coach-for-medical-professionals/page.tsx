import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "AI Career Coach for Medical Professionals — Non-Clinical Transition, Leadership & Career Path (2025)",
  description:
    "Career coaching for physicians, nurses, NPs, PAs, and healthcare professionals. Clinical-to-non-clinical transition paths, CV-to-resume transformation, compensation benchmarking, and interview prep for medical professionals leaving or advancing in healthcare.",
  keywords: ["career coach for medical professionals", "physician career coaching", "non-clinical careers for physicians", "healthcare career coach", "doctor career change", "nurse career coaching", "NP career coach", "medical professional career transition", "physician resume help"],
  alternates: { canonical: "/career-coach-for-medical-professionals" },
  openGraph: {
    title: "AI Career Coach for Medical Professionals — Non-Clinical Transition & Career Path (2025)",
    description: "Clinical-to-non-clinical paths, CV-to-resume transformation, and interview coaching for physicians, nurses, NPs, and PAs.",
    url: "/career-coach-for-medical-professionals",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const NON_CLINICAL_PATHS = [
  {
    path: "Pharmaceutical & biotech",
    accent: "#7C3AED",
    roles: "Medical Science Liaison (MSL), Clinical Research Physician, Medical Affairs, Drug Safety / Pharmacovigilance, Medical Director",
    why: "Pharma values clinical credibility for roles that require explaining complex science to HCPs, evaluating safety data, or engaging with KOLs. MD or DO is often a requirement for Medical Affairs and MSL roles. NPs and PAs are competitive for some MSL positions.",
    compensation: "MSL roles: $150–220K+ total comp. Medical Affairs Director: $250–400K. Medical Director at pharma: $350K–$600K+.",
    transitionNote: "MSL is the most common first non-clinical role for physicians — it uses clinical knowledge in a commercial context and doesn't require an MBA. The interview tests your ability to communicate clinical data compellingly to peers.",
  },
  {
    path: "Health technology",
    accent: "#0891B2",
    roles: "Chief Medical Officer, Medical Director, Clinical Informaticist, Clinical Product Manager, Health AI Advisor",
    why: "The intersection of medicine and technology is one of the fastest-growing talent markets. Companies building clinical AI, EHR systems, telemedicine platforms, and digital health tools need physicians who can evaluate clinical accuracy, inform product decisions, and engage with healthcare system buyers.",
    compensation: "Clinical CMO roles at health tech startups: $250–500K+ (with equity that may be significant). Product and informatics roles: $180–300K.",
    transitionNote: "Health tech interviews often test both clinical depth and product thinking. Prepare to speak about clinical workflows, the EHR landscape, and what makes a clinically sound digital health product — not just your patient care experience.",
  },
  {
    path: "Consulting (healthcare practice)",
    accent: "#059669",
    roles: "Healthcare Strategy Consultant, Hospital Operations Consultant, Healthcare Management Consultant, Policy Advisor",
    why: "Strategy consulting firms and boutiques with healthcare practices (McKinsey Health Systems, Huron, Sg2, Evolent Health) recruit physicians and nurses for clinical credibility in engagements that require understanding of care delivery, hospital operations, and clinical quality.",
    compensation: "Manager-level healthcare consulting: $200–280K. Associate Principal and above: $300K+.",
    transitionNote: "Consulting interviews require case preparation — often healthcare-specific (hospital capacity optimization, payer strategy, care pathway redesign). Behavioral preparation matters equally: consulting firms test for communication adaptability, which clinical training doesn't emphasize.",
  },
  {
    path: "Hospital and health system leadership",
    accent: "#D97706",
    roles: "Chief Medical Officer, VP Medical Affairs, Service Line Director, Quality and Patient Safety Director, Clinical Department Chair",
    why: "The internal path — staying in healthcare but moving out of direct patient care into leadership. CMO, VPMA, and department chair roles pay significantly more than clinical practice for physicians who want to shape systems rather than see individual patients.",
    compensation: "Service Line Director: $250–400K. VP Medical Affairs: $350–500K. CMO at large health system: $600K–$1M+.",
    transitionNote: "Leadership roles in health systems often go to physicians who've demonstrated administrative engagement alongside clinical excellence — quality committees, credentialing, EHR implementation, P&L oversight for a practice. Build this profile before you need it.",
  },
  {
    path: "Medtech and medical devices",
    accent: "#DC2626",
    roles: "Clinical Affairs Manager, Regulatory Affairs with Clinical Background, Medical Education Director, Clinical Field Specialist",
    why: "Medical device companies need clinical expertise for regulatory submissions, clinical study design, physician training, and commercial support. Surgical specialties are particularly valued — companies selling complex devices into OR environments need people who understand the clinical context.",
    compensation: "Clinical Affairs Manager: $150–220K. Medical Education roles: $180–250K. Clinical Director at medtech: $250–400K.",
    transitionNote: "Medtech interviews often involve product demonstrations and clinical scenario discussions. The ability to speak clearly about clinical evidence — study design, endpoints, real-world data — is the core competency being tested.",
  },
];

const CV_TO_RESUME = [
  { issue: "Length: academic CV vs industry resume", detail: "Physician CVs can run 10–20 pages listing every publication, presentation, and rotation. Industry resumes should be 1–2 pages maximum. The transformation requires ruthless selection: keep only what demonstrates impact relevant to the target role. Publications, presentations, and committee memberships belong in a separate one-page addendum — not the main document." },
  { issue: "Language: clinical vs business vocabulary", detail: "CVs document clinical activity in clinical language: 'maintained board certification,' 'managed panel of 400 patients,' 'supervised residents.' Industry resumes need business framing: 'delivered care to 400+ patients annually with 97% satisfaction scores,' 'trained 12 resident physicians in complex procedure techniques,' 'reduced 30-day readmission rate from 14% to 9% through protocol redesign.'" },
  { issue: "Missing functional keywords for ATS", detail: "ATS systems scan industry job descriptions for terms like 'cross-functional collaboration,' 'stakeholder engagement,' 'KPI management,' 'P&L oversight.' Medical credentials (ABIM, ACGME, USMLE scores) are meaningful to medical licensing boards — not to ATS systems filtering healthcare leadership applications. Zari identifies which keywords each target role requires." },
  { issue: "No quantification of business impact", detail: "Clinical CVs rarely quantify business outcomes. The industry equivalents exist — patient volume, quality metrics, cost per case, revenue per physician, satisfaction scores, protocol adoption rates. These numbers reframe clinical experience as business impact, which is exactly what non-clinical employers need to see." },
];

const FAQS = [
  { question: "What are the best non-clinical careers for physicians?", answer: "Medical Science Liaison (MSL) roles are the most accessible first step — they use clinical expertise in a commercial context and pay well ($150–220K+). Medical Affairs and Pharmacovigilance roles at pharma and biotech offer similar entry points. Health technology CMO and Medical Director roles are highly paid but competitive. Healthcare consulting provides broad exposure and strong compensation, but requires case interview preparation. Hospital leadership (CMO, VPMA) is the internal path for physicians who want to lead systems without leaving healthcare entirely." },
  { question: "Do I need an MBA to transition to a non-clinical role?", answer: "For most non-clinical physician transitions — MSL, Medical Affairs, health tech, medtech — no MBA is required. The MD is the credential; the MBA is redundant in most of these contexts and the opportunity cost is significant. An MBA may add value specifically for healthcare consulting (some firms prefer it) or general management ambitions (VP, C-suite at non-healthcare companies). Evaluate the specific doors the MBA opens before committing to 2 years and $150K+." },
  { question: "How is job searching different for physicians and healthcare professionals?", answer: "Several ways. First, networks matter more — most non-clinical healthcare roles are filled through connections, not job boards. Your residency program, hospital network, and specialty society are the most important networks to activate. Second, the CV-to-resume transformation is non-trivial — submitting a 15-page academic CV to a pharma company is an immediate filter-out. Third, salary negotiation norms differ — physicians sometimes undervalue their clinical credibility in commercial roles, accepting below-market offers out of uncertainty. Zari coaches all three." },
  { question: "What's the best way to transition from clinical to non-clinical without losing income?", answer: "The highest-income non-clinical transitions from physician-level practice: pharma Medical Director ($350K+), health system CMO ($600K+), health tech CMO ($300–500K with equity), and healthcare consulting Director ($300K+). MSL roles are often a 30–40% pay cut from specialist physician income — but they're a bridge, not a destination. Plan a 2-step transition: MSL or Medical Affairs (year 1–3) → Medical Director or senior strategic role (year 4+). The income ceiling in the non-clinical track is actually higher than most clinical tracks for those who advance." },
];

export default async function CareerCoachMedicalProfessionalsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "AI Career Coach for Medical Professionals", url: `${BASE_URL}/career-coach-for-medical-professionals` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-24 pt-20 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
            For Physicians, Nurses, NPs, PAs & Healthcare Leaders
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.5rem]">
            AI Career Coach for<br /><span className="gradient-text-animated">Medical Professionals</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/60">
            Whether you&apos;re a physician looking to leave clinical practice, a nurse advancing into leadership, or a healthcare professional pivoting to pharma, health tech, or consulting — clinical training is exceptional preparation for a wide range of non-clinical careers. The challenge is translating it. Zari does that coaching.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_24px_rgba(13,113,130,0.4)] transition-all hover:-translate-y-0.5">
              Start free coaching <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/ai-career-coach" className="inline-flex h-12 items-center rounded-xl border border-white/15 px-7 text-[14px] font-semibold text-white/70 transition-all hover:border-white/30 hover:text-white">
              How Zari works
            </Link>
          </div>
        </div>
      </section>

      {/* Non-clinical paths */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Clinical-to-non-clinical career paths</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Five distinct paths where clinical credentials create significant competitive advantage — each with different entry points, compensation, and transition requirements.</p>
          <div className="mt-10 space-y-6">
            {NON_CLINICAL_PATHS.map((path) => (
              <div key={path.path} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] bg-white px-6 py-5" style={{ borderLeftColor: path.accent, borderLeftWidth: 4 }}>
                  <p className="text-[17px] font-bold text-[var(--ink)]">{path.path}</p>
                  <p className="mt-1 text-[12px] font-medium" style={{ color: path.accent }}>Key roles: {path.roles}</p>
                  <p className="mt-3 text-[13.5px] leading-6 text-[var(--muted)]">{path.why}</p>
                </div>
                <div className="grid sm:grid-cols-2">
                  <div className="border-b border-[var(--border)] p-5 sm:border-b-0 sm:border-r">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Compensation context</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{path.compensation}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: path.accent }}>Transition note</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{path.transitionNote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CV to resume */}
      <section className="bg-[var(--bg)] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The CV-to-resume transformation</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">A physician CV sent to an industry employer will almost always be filtered out — not because your qualifications are wrong, but because the document isn&apos;t translated into industry language. These are the four transformation problems.</p>
          <div className="mt-10 space-y-5">
            {CV_TO_RESUME.map((item, i) => (
              <div key={item.issue} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-white p-6">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-bold text-white">{i + 1}</span>
                <div>
                  <p className="mb-2 font-bold text-[var(--ink)]">{item.issue}</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Zari coaches */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What Zari coaches for medical professionals</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { title: "CV-to-resume transformation", body: "Converting a 10–20 page academic CV into a 1–2 page industry resume that speaks the language of the target employer — quantified impact, business framing, ATS-optimized language." },
              { title: "Non-clinical role positioning", body: "Coaching on how to frame clinical experience for pharma, health tech, medtech, consulting, and hospital leadership roles — including the specific narratives that make your transition credible, not questionable." },
              { title: "MSL and Medical Affairs interview prep", body: "MSL interviews test clinical depth, KOL engagement skills, and the ability to translate data for HCP audiences. Zari coaches the specific competency questions that these roles use." },
              { title: "Healthcare leadership interviews", body: "CMO, VPMA, and service line director interviews probe for strategic vision, operational judgment, and stakeholder management. Coaching on the behavioral patterns that healthcare leadership roles score." },
              { title: "LinkedIn for non-clinical positioning", body: "Transitioning your LinkedIn presence from clinician to industry professional — headline restructuring, About section reframing, and keyword optimization for recruiter searches in your target sector." },
              { title: "Salary negotiation for non-clinical roles", body: "Physicians often undervalue themselves in first non-clinical offers. Coaching on market rates by role type, how to evaluate equity and variable compensation, and the negotiation conversation for industry-standard offer structures." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="mb-2 font-bold text-[var(--ink)]">{item.title}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Medical career coaching FAQs</h2>
          <div className="mt-8 space-y-4">
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
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[19px] font-bold text-[var(--ink)]">Medical career coaching — start free</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">CV-to-resume transformation, non-clinical role positioning, interview coaching, and salary negotiation — purpose-built for physicians, nurses, NPs, PAs, and healthcare leaders making their next move.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
