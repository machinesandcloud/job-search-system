import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Legal Resume Examples — Attorney, Paralegal & Law Clerk Templates (2025)",
  description:
    "Legal employers read resumes differently — they scan bar admissions, practice area keywords, deal/matter experience, and court systems before reading a single bullet. Most legal resumes list responsibilities instead of deal flow, matter volume, and outcomes. Before/after examples for attorneys, paralegals, and law clerks.",
  keywords: ["legal resume", "attorney resume", "paralegal resume", "law clerk resume", "lawyer resume examples", "legal resume template 2025", "associate attorney resume", "legal resume ATS keywords"],
  alternates: { canonical: "/blog/legal-resume" },
  openGraph: {
    title: "Legal Resume Examples — Attorney, Paralegal & Law Clerk (2025)",
    description: "Legal employers scan bar admissions, practice areas, and deal flow before reading bullets. Before/after examples by practice area and role type.",
    url: "/blog/legal-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_THEY_SCAN_FOR = [
  { signal: "Bar admission status", why: "Unlicensed practice of law is a liability — hiring attorneys confirm bar membership and good standing before anything else. List jurisdiction, admission year, and any additional bars as the first item under credentials.", ats_tip: "Include your full bar name: 'New York State Bar (2021)' not just 'NY Bar'. Multi-state practitioners: list each jurisdiction." },
  { signal: "Practice area alignment", why: "Litigation attorneys don't hire transactional candidates and vice versa. General commercial litigation is different from securities litigation, employment defense, or mass tort. Be specific about your lane.", ats_tip: "Use the exact practice area terms from the job posting — 'M&A,' 'corporate governance,' 'employment litigation,' 'regulatory compliance.' Match the vocabulary of the firm or in-house legal team." },
  { signal: "Court systems and deal size", why: "For litigators: what courts, what docket volume, first-chair vs. second-chair experience. For transactional attorneys: deal size ($10M vs. $500M vs. $5B), deal complexity, and your actual role in the transaction — not just 'supported transactions.'", ats_tip: "ATS platforms used by Am Law 100 firms and legal departments parse deal values and court identifiers. '$ deal values' and 'U.S. District Court' or 'Delaware Chancery Court' are highly searchable." },
  { signal: "Law school and academic credentials", why: "Law school name, class rank, journal membership, and clerkship experience carry significant weight through mid-level associate hiring — especially at elite firms. These signals are scanned before work experience for junior candidates.", ats_tip: "Law Review, Moot Court, and clinical programs are keyword-searched. List journal position (not just membership): 'Articles Editor, Harvard Law Review' vs. 'Harvard Law Review member.'" },
];

const BULLET_TRANSFORMATIONS = [
  {
    role: "Associate Attorney — M&A",
    before: "Assisted with mergers and acquisitions transactions and reviewed transaction documents.",
    after: "Led due diligence for $1.2B acquisition of SaaS company by PE-backed strategic buyer — reviewed 400+ contracts, identified $8M in contractual exposure, and negotiated cure provisions that reduced closing adjustments by $2.4M.",
    why: "The 'before' bullet could describe any junior associate at any firm. The 'after' names deal size, buyer type, work product volume, and a quantified outcome that demonstrates independent judgment — the signals that separate associates who were in the room from those who drove the work.",
  },
  {
    role: "Senior Associate — Employment Litigation",
    before: "Managed employment discrimination cases and handled depositions and motion practice.",
    after: "Managed portfolio of 14 active employment discrimination matters (Title VII, ADA, ADEA) for Fortune 500 retail client — defended 40+ depositions, briefed 8 summary judgment motions (5 granted), and negotiated 12 pre-trial settlements totaling $1.8M against $7.2M in claimed damages.",
    why: "Motion outcomes, deposition volume, and settlement efficiency against claimed damages are the specific metrics that demonstrate effective case management and negotiating skill — not just that you 'handled' litigation.",
  },
  {
    role: "Paralegal — Real Estate",
    before: "Supported real estate transactions and prepared closing documents for commercial properties.",
    after: "Coordinated closing logistics for 80–100 commercial real estate transactions annually — drafted purchase agreements, prepared title insurance commitments, managed lender condition checklists, and maintained closing binders for deals ranging from $2M to $150M. Zero delayed closings attributed to documentation error over 3 years.",
    why: "Volume, deal size range, and a clean reliability record convert a generic support-role description into a demonstration of the organizational precision and deal flow capacity that law firms and in-house teams specifically hire paralegals to provide.",
  },
];

const BY_PRACTICE_AREA = [
  {
    area: "Corporate / M&A",
    what_they_look_for: "Deal flow, deal size, role in transaction (lead, support, or specific workstream), types of deals (buyout, merger, carve-out, JV, minority investment), and industry specialization",
    keywords: "M&A, private equity, venture capital, due diligence, purchase agreement, representations and warranties, disclosure schedule, Hart-Scott-Rodino, closing mechanics, post-closing adjustment",
    red_flags: "Vague deal descriptions with no $ values or transaction types; listing 'participated in' or 'assisted with' without ownership of any workstream",
  },
  {
    area: "Litigation",
    what_they_look_for: "Court systems, case types, matter volume, deposition/trial experience (first vs. second chair), motion practice outcomes, and client industry",
    keywords: "motion practice, discovery, depositions, summary judgment, trial experience, appellate briefing, class action, MDL, arbitration, mediation",
    red_flags: "No mention of specific courts or outcomes; listing 'legal research' as a primary skill for attorneys above junior associate level; no indication of first-chair experience",
  },
  {
    area: "In-House / Corporate Legal",
    what_they_look_for: "Business partnership experience, commercial contract volume and complexity, regulatory exposure, cross-functional collaboration, and progression from generalist to subject-matter depth",
    keywords: "commercial contracts, SaaS agreements, NDAs, vendor agreements, procurement, regulatory compliance, employment law, data privacy, GDPR, CCPA, SEC reporting, board governance",
    red_flags: "Using law firm terminology (billings, client matters) for in-house roles; no mention of business stakeholders or commercial outcomes; pure legal process descriptions with no business context",
  },
  {
    area: "Government / Public Sector",
    what_they_look_for: "Relevant agency experience, regulatory authority exercised, enforcement actions, policy work, and security clearance status (if required)",
    keywords: "regulatory enforcement, administrative law, rulemaking, FOIA, congressional oversight, federal procurement, GS grade (if applicable), security clearance",
    red_flags: "No mention of specific statutes or regulatory authorities; missing clearance status when applying to agencies where it's required; omitting federal clerkship experience",
  },
];

const FAQS = [
  { question: "How long should a legal resume be?", answer: "For attorneys with fewer than 10 years of experience: one page (two pages is acceptable for associates with extensive deal or matter experience). For partners and senior counsel: two pages maximum. In-house attorneys typically follow corporate resume conventions — one to two pages. Federal clerkship applications follow different conventions — check the specific judge's preferences, as many have detailed application requirements. Academic legal positions (law school faculty, fellowships) use a CV format, which can be longer." },
  { question: "Should attorneys list their law school GPA and class rank?", answer: "Yes — for attorneys within 5–7 years of graduation, and for any attorney applying to positions where elite credentials are valued (top-tier BigLaw, federal judiciary clerkships, prestigious public interest positions). After 7–10 years, GPA and rank can be dropped in favor of work experience depth. If your rank was in the top third, include it. If not, omit rank and consider whether GPA adds or detracts from your application. Always include bar admissions, regardless of years of experience." },
  { question: "What's the right way to list deal experience on a legal resume?", answer: "List representative deal experience in a dedicated 'Representative Transactions' or 'Deal Experience' section, separate from your bullet-format work history. For each deal: client industry (not client name, due to confidentiality), transaction type, deal size, your role, and outcome if notable. This format is standard at Am Law 100 firms and is preferred because it lets hiring attorneys quickly assess your deal depth without parsing sentence-form bullets. For paralegals and legal assistants, transaction volume and deal size range are more relevant than individual deal details." },
];

export default async function LegalResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Legal Resume Examples — Attorney, Paralegal & Law Clerk Templates (2025)"
        description="Legal employers scan bar admissions, practice areas, and deal flow before reading bullets. Before/after examples by practice area and role type."
        url={`${BASE_URL}/blog/legal-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Legal Resume", url: `${BASE_URL}/blog/legal-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · Legal</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Legal Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Legal employers scan bar admissions, practice area alignment, and deal or matter experience before reading a single bullet. Most legal resumes list responsibilities — the ones that land interviews quantify deal flow, matter outcomes, and courtroom depth.
          </p>
        </div>
      </section>

      {/* What they scan for */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What legal employers scan for first</h2>
          <div className="mt-6 space-y-4">
            {WHAT_THEY_SCAN_FOR.map((item) => (
              <div key={item.signal} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <p className="font-bold text-[var(--ink)]">{item.signal}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.why}</p>
                <div className="mt-3 rounded-xl bg-[var(--bg)] p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1">ATS tip</p>
                  <p className="text-[12.5px] text-[var(--muted)]">{item.ats_tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bullet transformations */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before and after — by role</h2>
          <div className="mt-6 space-y-6">
            {BULLET_TRANSFORMATIONS.map((item) => (
              <div key={item.role} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="bg-[var(--dark)] px-5 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/50">{item.role}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="p-5 bg-red-50/30">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-2">Before</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)] italic">&ldquo;{item.before}&rdquo;</p>
                  </div>
                  <div className="p-5 bg-emerald-50/30">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">After</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">&ldquo;{item.after}&rdquo;</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] px-5 py-3 bg-[var(--bg)]">
                  <p className="text-[12px] leading-5 text-[var(--muted)]"><span className="font-bold text-[var(--ink)]">Why it works: </span>{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By practice area */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">By practice area</h2>
          <div className="mt-6 space-y-4">
            {BY_PRACTICE_AREA.map((area) => (
              <div key={area.area} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <p className="font-bold text-[var(--ink)] text-[16px]">{area.area}</p>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">What they look for</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{area.what_they_look_for}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1">ATS keywords</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{area.keywords}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">Red flags</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{area.red_flags}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari optimizes your legal resume for the specific role and firm — then coaches your interview.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari analyzes your resume against the job description — identifying practice area keyword gaps, rewriting weak bullets for legal hiring conventions, and validating ATS formatting for law firm applicant tracking systems. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
