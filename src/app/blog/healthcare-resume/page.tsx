import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Healthcare Resume — RN, Allied Health & Clinical Examples (2025)",
  description:
    "Healthcare hiring managers and ATS systems scan for licensure, certifications, clinical specialties, and patient volume metrics before reading a single bullet. Most healthcare resumes list duties instead of patient outcomes, unit complexity, and scope of care. Before/after examples for registered nurses, allied health professionals, and clinical administrators.",
  keywords: ["healthcare resume", "nursing resume", "RN resume", "healthcare resume examples", "clinical resume", "allied health resume", "nurse practitioner resume", "physical therapist resume", "healthcare resume ATS keywords 2025", "medical resume"],
  alternates: { canonical: "/blog/healthcare-resume" },
  openGraph: {
    title: "Healthcare Resume — RN, Allied Health & Clinical Examples (2025)",
    description: "Healthcare hiring managers scan for licensure, certifications, and patient volume before reading bullets. Before/after examples with ATS keyword strategy by healthcare role.",
    url: "/blog/healthcare-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "Should I include my license number on my resume?",
    answer: "Not on the resume itself — license numbers are verified through state licensing boards and background checks, not on resumes. What you should include: the license type (RN, LPN, NP, PA-C, PT, OT), the state(s) where you're licensed, and your license status (active, compact). If you hold a compact nursing license, list 'Multistate Compact License (NLC)' — this matters for travel and cross-state positions.",
  },
  {
    question: "How do I list clinical experience on a resume?",
    answer: "List clinical rotations, placements, or contracts in reverse chronological order under a 'Clinical Experience' section separate from 'Work Experience' if you're a new grad or student. For experienced clinicians, clinical experience goes under Work Experience. Include: facility name, unit/specialty, dates, and 2–3 bullets per role showing patient acuity, volume (daily patient load or bed capacity), and 1–2 specific clinical skills or procedures you performed regularly.",
  },
  {
    question: "Do certifications matter more than experience in healthcare resumes?",
    answer: "They work together — certifications demonstrate baseline competency, experience demonstrates application. For ATS: most healthcare ATS systems filter on specific certifications (BLS, ACLS, CCRN, CEN, etc.) before human review. Missing a certification listed as 'required' in the job description will often disqualify you automatically. List certifications prominently: either in your header alongside your license or in a dedicated 'Certifications' section near the top of the resume.",
  },
  {
    question: "How should a travel nurse write their resume?",
    answer: "Travel nurse resumes should list each contract as a separate entry under the staffing agency (e.g., 'AMN Healthcare — contract positions') with the facility name, unit, city/state, and dates for each. Don't consolidate multiple contracts into one entry — hiring managers want to see the breadth of facility types, unit acuities, and patient populations you've worked in. Highlight: highest-acuity environments, rapid onboarding evidence ('achieved independent practice within 1 week at new facilities'), and any contracts extended or converted to permanent.",
  },
  {
    question: "What metrics should nurses and allied health professionals include on their resume?",
    answer: "The metrics that matter: patient-to-nurse ratio (your unit and how you managed it), bed capacity of the unit, daily patient volume or case load, specific procedures performed with frequency ('performed 20–30 IV insertions daily'), quality metrics if available (HCAHPS scores, infection rates, patient satisfaction), and any process improvements with outcomes ('reduced medication error rate by 18% through double-check protocol implementation'). If your facility tracks these and you have access, use them — they're highly differentiating.",
  },
];

const BEFORE_AFTERS = [
  {
    role: "Registered Nurse (ICU)",
    color: "#0D7182",
    before: "Provided patient care in the ICU. Monitored vital signs, administered medications, and collaborated with the care team. Maintained patient safety and documentation.",
    after: "Delivered direct patient care in a 24-bed Medical ICU (patient ratio 1:2) — managed ventilated patients, continuous renal replacement therapy (CRRT), and vasoactive drip titration. Preceptored 4 new grad nurses over 18 months; all achieved independent practice within 90-day orientation.",
    insight: "ICU nursing resumes need to show acuity signals: unit size, patient ratio, specific high-complexity interventions (vent management, CRRT, pressors), and any teaching or leadership. 'Provided patient care' applies to every nurse — the differentiation is in the complexity of what you managed.",
  },
  {
    role: "Physical Therapist",
    color: "#7C3AED",
    before: "Evaluated and treated patients with musculoskeletal and neurological conditions. Developed individualized treatment plans and communicated with interdisciplinary team.",
    after: "Evaluated and treated 14–18 outpatient patients/day with post-surgical, orthopedic, and neurological diagnoses — specialized caseload in post-ACL reconstruction and total joint replacement. Implemented evidence-based return-to-sport protocol for high school athletes; 94% of athletes returned to full competition within projected timelines.",
    insight: "PT resumes need: daily patient volume (caseload), specialty caseload composition, specific patient populations, and outcomes. 'Developed individualized treatment plans' is every PT's job description — 'return-to-sport protocol with 94% success rate' is evidence of clinical outcomes.",
  },
  {
    role: "Healthcare Administrator / Practice Manager",
    color: "#F97316",
    before: "Managed operations for a multi-specialty medical practice. Oversaw staff, billing, and compliance activities. Improved patient satisfaction scores.",
    after: "Managed operations for a 12-provider multi-specialty practice ($8.4M annual revenue, 22,000 patient visits/year) — reduced accounts receivable days from 52 to 31 days through billing workflow redesign, implemented new EHR (Epic) with zero downtime during transition, and improved CAHPS satisfaction scores from 74th to 91st percentile over 2 years.",
    insight: "Healthcare administrator resumes need financial scope (revenue, visit volume), specific operational improvements with metrics (AR days, CAHPS percentile), and technology ownership (EHR transitions are major operational signals). 'Improved patient satisfaction' needs a percentile or number — without it, it's unverifiable.",
  },
  {
    role: "Nurse Practitioner (Primary Care)",
    color: "#059669",
    before: "Provided primary care services to adult patients. Diagnosed and treated acute and chronic conditions, prescribed medications, and managed patient panels.",
    after: "Managed an independent primary care panel of 1,800 patients (adults, ages 18–85) — diagnosed and treated acute, chronic, and preventive care needs with full prescriptive authority across 35 states. Reduced 30-day hospital readmission rate for panel from 14.2% to 8.7% through post-discharge follow-up protocol and improved care coordination with hospitalists.",
    insight: "NP resumes need: panel size, patient demographics, prescriptive authority scope, and a quality or outcomes metric. 'Reduced hospital readmission rate' is the kind of population health metric that differentiates NPs who see patients from NPs who actively manage health outcomes.",
  },
];

const ATS_KEYWORDS = [
  {
    category: "Licensure & Credentials",
    keywords: ["RN", "LPN", "NP", "APRN", "PA-C", "PT", "OT", "LCSW", "CRNA", "CNM", "MD", "DO", "NLC (Compact License)", "State licensure"],
  },
  {
    category: "Core Certifications",
    keywords: ["BLS", "ACLS", "PALS", "TNCC", "NRP", "CCRN", "CEN", "CMSRN", "CNOR", "OCN", "Oncology Certified Nurse", "CPN", "CPNP", "FNP-BC", "AGNP"],
  },
  {
    category: "Clinical Skills & Specialties",
    keywords: ["Critical care", "Emergency medicine", "Labor and delivery", "Perioperative", "Telemetry", "Med-surg", "Oncology", "Pediatrics", "Geriatrics", "Wound care", "IV therapy", "Ventilator management", "CRRT", "Chemotherapy administration"],
  },
  {
    category: "EHR & Technology",
    keywords: ["Epic", "Cerner", "Meditech", "Allscripts", "eClinicalWorks", "athenahealth", "CPOE", "Epic MyChart", "Dragon Medical"],
  },
  {
    category: "Quality & Compliance",
    keywords: ["HIPAA", "Joint Commission", "HCAHPS", "CMS", "Quality improvement", "Infection control", "Patient safety", "NDNQI", "Evidence-based practice", "Care coordination", "Case management"],
  },
];

export default async function HealthcareResumePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Healthcare Resume — RN, Allied Health & Clinical Examples (2025)"
        description="Healthcare hiring managers scan for licensure, certifications, and patient volume before reading bullets. Before/after examples for ICU nursing, PT, NP, and healthcare administration."
        url={`${BASE_URL}/blog/healthcare-resume`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Healthcare Resume", url: `${BASE_URL}/blog/healthcare-resume` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Resume</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">Healthcare Resume</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">Healthcare hiring managers scan for licensure, certifications, clinical specialties, and patient volume metrics before reading a single bullet. Most healthcare resumes list duties. The ones that get callbacks show patient acuity, unit complexity, and outcomes driven.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>10 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">What healthcare hiring managers scan for</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Healthcare hiring has a unique ATS challenge: most healthcare ATS systems (Taleo, iCIMS, Workday) filter on specific credentials before a human reads the resume. Missing a required license abbreviation or certification code can get you filtered out even if you hold the credential.
            </p>
            <div className="mt-5 space-y-3">
              {[
                { signal: "Licensure and credential abbreviations", detail: "Use the exact abbreviations recruiters and ATS systems search for: RN, LPN, NP, APRN, PA-C, PT, OT, LCSW. If your license is in multiple states or you hold a compact license, list it explicitly — multistate licensure is a hiring accelerator for health system and travel roles." },
                { signal: "Certifications listed prominently", detail: "BLS, ACLS, PALS, TNCC, CCRN, CEN — these are binary filters in healthcare ATS. If the job requires ACLS and your ACLS certification isn't visible in your resume header or a dedicated section, the system may not find it even if it's buried in a bullet. List certifications early, not at the bottom." },
                { signal: "Unit type and acuity signals", detail: "ICU vs. step-down vs. med-surg vs. ED matters enormously to healthcare recruiters — they're assessing whether your unit experience translates to their environment. Spell out the unit type explicitly (Medical ICU, Neuro ICU, Level I Trauma ED) — don't assume the reader will infer it." },
                { signal: "Patient volume and ratio", detail: "Patient-to-nurse ratio, daily patient volume (for outpatient), or case load size contextualizes the complexity of your work. A 1:2 ICU ratio reads differently than a 1:8 med-surg ratio. Include it — it's the fastest way to communicate acuity." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[11px] font-bold text-[#4361EE]">{i + 1}</div>
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.signal}</p>
                    <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Before and after: by healthcare role</h2>
            <div className="mt-6 space-y-6">
              {BEFORE_AFTERS.map(item => (
                <div key={item.role} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4" style={{ borderLeft: `4px solid ${item.color}` }}>
                    <h3 className="font-bold text-[var(--ink)]">{item.role}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-red-400">Before</p>
                      <div className="rounded-lg border border-red-100 bg-red-50/30 px-5 py-3 text-[14px] leading-7 text-[var(--ink)]">&ldquo;{item.before}&rdquo;</div>
                    </div>
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-500">After</p>
                      <div className="rounded-lg border border-emerald-100 bg-emerald-50/30 px-5 py-3 text-[14px] leading-7 text-[var(--ink)]">&ldquo;{item.after}&rdquo;</div>
                    </div>
                    <p className="text-[13px] leading-6 text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Why it works: </span>{item.insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">ATS keywords by healthcare category</h2>
            <div className="mt-5 space-y-4">
              {ATS_KEYWORDS.map(group => (
                <div key={group.category} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#4361EE]">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.keywords.map(kw => (
                      <span key={kw} className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[12px] text-[var(--ink)]">{kw}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Common questions</h2>
            <div className="mt-4 space-y-4">
              {FAQS.map(faq => (
                <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Get your healthcare resume ATS-optimized</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari analyzes your healthcare resume against the specific job description — verifies certification and licensure language matches what ATS systems scan for, rewrites duty-focused bullets to show patient acuity and outcomes, and tailors your resume for each target facility.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Optimize my healthcare resume →
            </Link>
          </section>

        </div>
      </article>
    </PageFrame>
  );
}
