import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "References on a Resume — Should You Include Them? (2025)",
  description:
    "Most resume advice about references is wrong: 'References available upon request' wastes space and no employer wants it. What employers actually do with references — and how to manage yours strategically.",
  keywords: ["references on resume", "should you put references on a resume", "how to list references on a resume", "references available upon request", "professional references 2025", "resume references examples"],
  alternates: { canonical: "/blog/references-on-resume" },
  openGraph: {
    title: "References on a Resume — Should You Include Them? (2025)",
    description: "'References available upon request' wastes space and no employer wants it. What employers actually do with references — and how to manage yours strategically.",
    url: "/blog/references-on-resume",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const THE_CURRENT_CONSENSUS = {
  rule: "Do not include references on your resume and do not write 'References available upon request.'",
  why: "References are checked late in the hiring process — usually only for finalists. Including them on your resume wastes limited space that should be used for experience and skills. 'References available upon request' is implied and adds zero value: every candidate has references, and no employer needs to be told you'll provide them when asked.",
  exceptions: [
    "Academic CVs and faculty positions — where a list of professional references is standard and expected in the application package",
    "Government and public sector applications — some federal and state application systems explicitly request references as part of the application",
    "UK and Australian CVs — where it is common convention to list 2 named referees at the bottom of the CV (or 'Referees available on request')",
    "Executive search — where a executive search firm may request references as part of their initial candidate profile to share with clients",
  ],
};

const REFERENCE_TYPES = [
  {
    type: "Direct manager (most valuable)",
    what_employers_learn: "Your performance, work quality, reliability, how you handled difficult situations, and whether your manager would re-hire you. This is the highest-signal reference.",
    who_to_choose: "The manager who knows your work best and will speak most positively — not necessarily your most recent manager. A manager who saw your strongest work 3 years ago is more valuable than a current manager with limited context.",
    how_to_prepare: "Brief them before they're called: remind them of 2–3 specific projects or accomplishments you'd like them to mention. Give them the job description so they can connect your experience to what the employer needs.",
  },
  {
    type: "Skip-level or senior leader",
    what_employers_learn: "Your strategic impact, visibility in the organization, and how senior leaders perceive your potential. A reference from someone two levels above you carries significant weight.",
    who_to_choose: "A VP, Director, or C-suite leader who knows your work directly — either through collaborative projects, presentations you made to them, or cross-functional work. Avoid leaders who know your name but not your work.",
    how_to_prepare: "Same as direct manager — but also remind them of the context of how you worked together, since senior leaders have many direct reports and skip-levels competing for their memory.",
  },
  {
    type: "Peer or cross-functional colleague",
    what_employers_learn: "How you collaborate, communicate, and handle conflict with people who aren't reporting to you. Particularly valuable for roles that require strong cross-functional influence.",
    who_to_choose: "A colleague who worked closely with you on a significant project, who can speak to your specific contributions and how you made the collaboration better. Peers from different teams are more credible than peers from your immediate team.",
    how_to_prepare: "Peers are sometimes nervous about what to say — give them specific examples of what you accomplished together so they're not starting from scratch.",
  },
  {
    type: "Client or external stakeholder (underused)",
    what_employers_learn: "How you manage relationships outside your organization — a distinct and highly credible signal. A client saying you're the best vendor they've worked with is a reference most candidates don't think to collect.",
    who_to_choose: "A client, partner, or external stakeholder who benefited directly from your work. Most valuable if they're at a recognizable company or hold a credible title.",
    how_to_prepare: "These references may be less familiar with corporate reference conventions — walk them through what's typically asked: your work ethic, collaboration style, outcomes you delivered, and whether they'd work with you again.",
  },
];

const REFERENCE_DOCUMENT_FORMAT = `**Reference List (separate document)**

[Your Name] — Professional References

---

[Reference Name]
[Title], [Company]
[Email] | [Phone]
Relationship: Direct manager, [Company], 2021–2024
Context: Led our data engineering team through a platform migration; can speak to my technical architecture decisions and cross-team leadership.

---

[Reference Name]
[Title], [Company]
[Email] | [Phone]
Relationship: Senior VP, [Company], 2019–2022
Context: Presented quarterly roadmaps to her; collaborated on the 2021 product strategy initiative.

---`;

const MANAGING_REFERENCES_STRATEGICALLY = [
  { action: "Ask before listing", detail: "Always confirm with a reference before providing their contact information. Ask explicitly: 'I'm in final interviews at [Company] for [Role] — are you comfortable being a reference and taking a call if they reach out in the next few weeks?' Surprises to references are bad for everyone." },
  { action: "Brief them on the specific role", detail: "Send your reference the job description and 2–3 talking points about what you'd want emphasized for this specific role. Different roles benefit from different stories — your reference for a leadership role should lead with different examples than your reference for an individual contributor role." },
  { action: "Follow up after they're contacted", detail: "If you know a reference has been called, send a short thank you within 24 hours. They did you a favor. This also keeps them engaged for the next reference check — references who feel appreciated are warmer participants the next time." },
  { action: "Build your reference list proactively", detail: "The worst time to think about references is when a hiring manager asks for them in 24 hours. Maintain a running list of 5–6 people who've seen your best work and have agreed to serve as references. Update it after each role and each strong project." },
];

const FAQS = [
  { question: "Should you include 'References available upon request' on your resume?", answer: "No. This phrase was common on resumes 20 years ago and has no function today. Every candidate will provide references when asked — stating it explicitly adds nothing and uses a line that could hold a bullet point demonstrating your impact. Modern resumes don't include this phrase." },
  { question: "How many references should you have?", answer: "Provide 3 references when asked — this is the standard expectation for most hiring processes. Have 5–6 in your network who have agreed to serve as references, so you can select the most relevant for each role type. For senior roles (Director+), 3 professional references are standard. For some executive searches, you may be asked for more, or for a specific category of reference (e.g., 'a direct report you've managed')." },
  { question: "What do employers actually ask references?", answer: "Reference calls typically run 10–20 minutes and cover: How long did you work with the candidate and in what capacity? What were their primary responsibilities? How would you describe their work quality and reliability? Can you describe a specific accomplishment they led? How do they handle pressure or conflict? What are their development areas? Would you hire them again? The last question is the highest-signal one — how a reference answers it tells a hiring manager almost everything. Prepare your references to answer it with a clear 'yes, absolutely' and a specific reason." },
];

export default async function ReferencesOnResumePage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="References on a Resume — Should You Include Them? (2025)"
        description="'References available upon request' wastes space and no employer wants it. What employers actually do with references — and how to manage yours strategically."
        url={`${BASE_URL}/blog/references-on-resume`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "References on a Resume", url: `${BASE_URL}/blog/references-on-resume` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Resume Guide · References</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">References on a Resume</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most resume advice about references is outdated. &ldquo;References available upon request&rdquo; wastes space, and including them on your resume tells employers nothing useful. Here&apos;s what actually matters.
          </p>
        </div>
      </section>

      {/* The rule */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-2">The current standard</p>
            <p className="text-[16px] font-bold text-[var(--ink)] mb-3">{THE_CURRENT_CONSENSUS.rule}</p>
            <p className="text-[13.5px] leading-6 text-[var(--muted)]">{THE_CURRENT_CONSENSUS.why}</p>
          </div>
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/60 p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-2">Exceptions</p>
            <ul className="space-y-1.5">
              {THE_CURRENT_CONSENSUS.exceptions.map((exc, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-5 text-[var(--muted)]">
                  <span className="text-amber-600 font-bold flex-shrink-0">→</span>
                  {exc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reference types */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 4 types of references — and how to use each</h2>
          <div className="mt-6 space-y-4">
            {REFERENCE_TYPES.map((ref) => (
              <div key={ref.type} className="rounded-2xl border border-[var(--border)] p-6">
                <p className="font-bold text-[var(--ink)] text-[16px]">{ref.type}</p>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">What they reveal</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{ref.what_employers_learn}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1">Who to choose</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{ref.who_to_choose}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">How to prepare them</p>
                    <p className="text-[12.5px] leading-5 text-[var(--muted)]">{ref.how_to_prepare}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Format */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to format a reference document</h2>
          <p className="mt-3 text-[13.5px] text-[var(--muted)]">References go on a separate document — not your resume. Provide it only when asked.</p>
          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white p-6 font-mono text-[12.5px] leading-7 text-[var(--muted)] whitespace-pre-line">{REFERENCE_DOCUMENT_FORMAT}</div>
        </div>
      </section>

      {/* Managing references strategically */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Managing references strategically</h2>
          <div className="mt-6 space-y-3">
            {MANAGING_REFERENCES_STRATEGICALLY.map((item) => (
              <div key={item.action} className="rounded-xl border border-[var(--border)] p-5">
                <p className="font-bold text-[var(--ink)]">{item.action}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
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
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari optimizes your resume so your references are the final push — not the first hurdle.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari rewrites your resume for the specific role, coaches your interview, and helps you negotiate the offer. By the time references are called, you&apos;ve already made the strongest case possible.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
