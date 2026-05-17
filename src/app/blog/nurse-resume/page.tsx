import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Nurse Resume — Examples, Skills & ATS Tips (2025)",
  description:
    "How to write a nursing resume that passes hospital ATS systems and impresses nurse managers. Includes before/after bullet examples for RN, BSN, travel nurse, and specialty tracks — with ATS keyword strategy by department.",
  keywords: ["nurse resume", "nursing resume", "RN resume", "BSN resume", "travel nurse resume", "ICU nurse resume", "nursing resume examples", "nurse resume 2025"],
  alternates: { canonical: "/blog/nurse-resume" },
  openGraph: {
    title: "Nurse Resume — Examples, Skills & ATS Tips (2025)",
    description: "Write a nursing resume that passes ATS and lands interviews — by specialty, experience level, and setting.",
    url: "/blog/nurse-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_THEY_EVALUATE = [
  {
    signal: "Clinical competency by unit or specialty",
    detail: "Nurse managers are experts in their unit — they read for specific competencies, patient populations, and acuity levels relevant to their floor. A generic 'patient care' bullet tells them nothing. Unit-specific skills (PICC line management, vent weaning protocols, sepsis bundle compliance, telemetry monitoring) signal you can hit the ground running without 3 months of remediation.",
    commonMistake: "Writing generic duties like 'Provided patient care' or 'Administered medications' — these could describe any CNA. Managers skim past them.",
    strongExample: "Managed 5–6 patient assignments in 32-bed trauma ICU; proficient in arterial line management, continuous renal replacement therapy (CRRT), and post-cardiac surgery protocol.",
  },
  {
    signal: "Patient outcomes and safety record",
    detail: "Healthcare hiring prioritizes safety metrics over everything. Evidence of outcome ownership — fall prevention rates, CAUTI/CLABSI reduction, HCAHPS scores, rapid response initiations — positions you as a nurse who drives quality, not just completes tasks. Even floor nurses can quantify: percentage of patients discharged with correct medication reconciliation, pressure ulcer prevention compliance.",
    commonMistake: "Treating nursing as task-based rather than outcome-based. Most nurses list what they did, not what happened as a result.",
    strongExample: "Co-led unit fall prevention initiative that reduced patient falls by 34% over 6 months; maintained zero CAUTI events across 18-month tenure on med-surg unit.",
  },
  {
    signal: "Certifications and specialty credentials",
    detail: "Certifications carry enormous weight in nursing hiring — they signal specialty knowledge, commitment to professional development, and in many facilities, they trigger pay differentials. CCRN, CEN, PCCN, CNOR, ONC, and specialty certs should be prominently listed. BLS/ACLS/PALS are table stakes for most roles and don't need to lead the resume — but must appear.",
    commonMistake: "Burying certifications in a footer or listing only BLS/ACLS without specialty credentials that differentiate.",
    strongExample: "Certifications: CCRN (Critical Care RN) — Certified 2022; ACLS; BLS; NIH Stroke Scale Certified.",
  },
  {
    signal: "Charge nurse and leadership experience",
    detail: "Charge nurse, preceptor, or committee work signals readiness for senior or leadership roles. Even informal leadership — charge on weekends, precepting new grads, serving on a shared governance committee — demonstrates that you're trusted by your organization beyond basic staff responsibilities.",
    commonMistake: "Not mentioning charge or preceptor experience because 'everyone does it' — it absolutely differentiates you for senior RN, lead, or supervisory positions.",
    strongExample: "Served as charge nurse 2–3 shifts/week on 28-bed progressive care unit; precepted 6 new graduate RNs over 3-year tenure, with 100% retention at 90-day mark.",
  },
];

const BULLET_TRANSFORMATIONS = [
  {
    level: "New Grad RN",
    before: "Provided nursing care to patients on medical-surgical unit",
    after: "Cared for 5-patient assignment on 30-bed med-surg unit managing post-op recovery, wound care, and IV medication administration; completed NDNQI fall risk assessments on 100% of patients each shift",
    fix: "Specificity replaces vagueness. Unit type, patient ratio, specific interventions, and a compliance metric all belong in the bullet.",
  },
  {
    level: "Staff RN (3–7 Years)",
    before: "Worked in the ICU caring for critically ill patients",
    after: "Delivered care to 2-patient ICU assignment managing sepsis bundles, vent management, and continuous vasopressor titration; reduced unplanned extubation rate to zero during 6-month tenure as unit safety champion",
    fix: "ICU nurses must name the interventions and the outcomes. 'Critically ill' is obvious — the specific therapies and measurable results are what distinguish.",
  },
  {
    level: "Travel Nurse",
    before: "Completed travel nursing assignments across multiple facilities",
    after: "Completed 6 travel contracts (13-week terms) across CICU, CTICU, and MICU settings; maintained full competency with joint commission standards across varied EHR systems including Epic, Meditech, and Cerner",
    fix: "Travel nurses must prove adaptability and breadth. Contract count, specialty mix, and EHR fluency are the differentiators that justify the travel premium.",
  },
];

const BY_SPECIALTY = [
  {
    specialty: "ICU / Critical Care",
    resumeEmphasis: "Ventilator management, hemodynamic monitoring, arterial lines, CRRT, vasopressor titration, ECMO experience, rapid sequence intubation (RSI) awareness",
    topCerts: "CCRN (AACN), TNCC (trauma), CSC (cardiac surgery specialty)",
    keyATS: "hemodynamic monitoring, CRRT, ventilator weaning, arterial line, central line, sepsis bundle, vasoactive medications",
    seniorSignal: "Rapid response team membership, code blue leadership, preceptor for new ICU RNs",
  },
  {
    specialty: "Emergency Department",
    resumeEmphasis: "Triage (ESI level assignment), stroke/MI recognition, trauma activation, conscious sedation, rapid assessment under high volume (patient-per-hour throughput)",
    topCerts: "CEN (Emergency Nurses Association), TNCC, ENPC (pediatric emergency), ACLS, PALS",
    keyATS: "triage, ESI, trauma activation, conscious sedation, STEMI, stroke protocol, rapid assessment",
    seniorSignal: "Charge nurse in high-census ED, mass casualty incident (MCI) experience, disaster committee",
  },
  {
    specialty: "Med-Surg / Telemetry",
    resumeEmphasis: "High patient ratios (5–7:1), telemetry interpretation, complex discharge planning, multidisciplinary team coordination, rapid deterioration recognition",
    topCerts: "PCCN (Progressive Care Certified Nurse), ACLS, basic cardiac rhythm interpretation",
    keyATS: "telemetry, discharge planning, case management coordination, medication reconciliation, fall prevention, NDNQI",
    seniorSignal: "Charge nurse, HCAHPS improvement initiatives, readmission reduction programs",
  },
  {
    specialty: "OR / Perioperative",
    resumeEmphasis: "Sterile field maintenance, surgical instrument handling, AORN protocols, positioning, count documentation, anesthesia team communication",
    topCerts: "CNOR (Certified Perioperative Nurse), ACLS",
    keyATS: "sterile technique, AORN, surgical positioning, instrumentation, scrub/circulator role, counts, Universal Protocol",
    seniorSignal: "First assist (RNFA), service line lead (ortho, cardiac, neuro), charge RN for OR block schedule",
  },
];

const ATS_MISTAKES = [
  { mistake: "Non-standard section headers", fix: "Use 'Work Experience,' 'Skills,' 'Education,' 'Certifications' — not 'My Journey,' 'What I Bring,' or 'Credentials'" },
  { mistake: "Tables for skills/certifications", fix: "Most hospital ATS systems can't parse tables. Use a flat comma-separated or line-by-line list." },
  { mistake: "Missing license information", fix: "Include your RN license number, state, and expiration. Many healthcare ATS systems filter by license." },
  { mistake: "Generic objective statement", fix: "Use a targeted professional summary that includes your specialty, years of experience, and 2–3 clinical strengths." },
  { mistake: "Text in headers/footers", fix: "ATS systems often skip text in document headers and footers. Your name and contact info belong in the main body." },
];

export default async function NurseResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-16";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Nurse Resume — Examples, Skills & ATS Tips (2025)"
        description="How to write a nursing resume that passes hospital ATS systems and impresses nurse managers."
        url={`${BASE_URL}/blog/nurse-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Nurse Resume", url: `${BASE_URL}/blog/nurse-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume · Nursing</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Nurse Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            How to write a nursing resume that passes hospital ATS systems and gets read by nurse managers — with real before/after examples across ICU, ED, med-surg, OR, and travel nursing.
          </p>
        </div>
      </section>

      {/* What They Evaluate */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What nurse managers read for</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Before optimizing your resume, understand how nursing hiring managers evaluate candidates — and what makes them stop reading.</p>
          <div className="mt-8 space-y-5">
            {WHAT_THEY_EVALUATE.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{item.signal}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-red-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">Common mistake</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.commonMistake}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Strong example</p>
                    <p className="text-[13px] text-[var(--muted)]">{item.strongExample}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet Transformations */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before & after: bullet rewrites by experience level</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">The same experience, written two ways. The difference is specificity — and specificity is what ATS systems and nurse managers both reward.</p>
          <div className="mt-8 space-y-6">
            {BULLET_TRANSFORMATIONS.map((item) => (
              <div key={item.level} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{item.level}</p>
                </div>
                <div className="grid gap-0 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-500">Before</p>
                    <p className="rounded-lg bg-red-50 p-3 text-[13px] italic text-[var(--muted)]">&ldquo;{item.before}&rdquo;</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600">After</p>
                    <p className="rounded-lg bg-emerald-50 p-3 text-[13px] italic text-[var(--muted)]">&ldquo;{item.after}&rdquo;</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-bold text-[var(--brand)]">What changed: </span>{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Specialty */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Resume strategy by nursing specialty</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Different units require different keyword and certification strategies. Don't use a generic nursing resume across specialties.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {BY_SPECIALTY.map((s) => (
              <div key={s.specialty} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{s.specialty}</h3>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Lead with</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{s.resumeEmphasis}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Top certifications</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{s.topCerts}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">ATS keywords</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{s.keyATS}</p>
                  </div>
                  <div className="rounded-lg bg-[var(--brand)]/[0.05] p-3">
                    <p className="text-[12px] font-semibold text-[var(--brand)]">Senior signal: {s.seniorSignal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Mistakes */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 ATS mistakes specific to nursing resumes</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Hospital ATS systems are often older and stricter than tech company systems. These mistakes get nurses auto-rejected before a human ever reads their resume.</p>
          <div className="mt-7 space-y-4">
            {ATS_MISTAKES.map((item, i) => (
              <div key={item.mistake} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-[12px] font-extrabold text-red-600">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.mistake}</p>
                  <p className="mt-1 text-[13.5px] text-[var(--muted)]">{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Optimize your nursing resume for ATS and interviews.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your resume against the specific nursing job description — finds missing clinical keywords, rewrites weak bullets, and checks ATS formatting. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
