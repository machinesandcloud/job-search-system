import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Job Acceptance Letter — Email Templates & What to Confirm (2025)",
  description:
    "A job acceptance email does more than say yes — it confirms the terms you negotiated, creates a written record, and sets the tone for your first day. Exact templates for every scenario, with a checklist of what to confirm before you send.",
  keywords: ["job acceptance letter", "job offer acceptance email", "how to accept a job offer email", "job acceptance email template", "accepting a job offer letter 2025", "how to formally accept a job offer"],
  alternates: { canonical: "/blog/job-acceptance-letter" },
  openGraph: {
    title: "Job Acceptance Letter — Email Templates & What to Confirm (2025)",
    description: "Accepting a job offer in writing confirms negotiated terms and protects you. Exact templates for standard acceptance, negotiated offers, and delayed start dates.",
    url: "/blog/job-acceptance-letter",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_TO_CONFIRM = [
  {
    item: "Compensation — base salary and pay period",
    why: "Confirm the exact number you negotiated, not the original offer. If the conversation was verbal, this email is where you create a written record of the agreed-upon number before you sign anything.",
    example: "...and I'm confirming my acceptance of the offer as discussed: a base salary of $[X] per year, paid [bi-weekly/monthly].",
  },
  {
    item: "Start date",
    why: "Confirm the specific date you agreed to. If your start date is still being negotiated, don't send the acceptance email until it's confirmed — the date is part of the offer.",
    example: "...with a start date of Monday, June 16, 2025.",
  },
  {
    item: "Title and reporting structure",
    why: "For any role where title was negotiated or where there was ambiguity (e.g., 'Senior' vs. 'Staff'), confirm the title in writing. For senior roles, confirm who you'll be reporting to.",
    example: "...in the role of Senior Product Manager, reporting to [Name, VP of Product].",
  },
  {
    item: "Signing bonus (if applicable)",
    why: "If a signing bonus was part of your negotiation, confirm the amount and terms (paid on first paycheck? Tied to staying X months?) in your acceptance email.",
    example: "...including the $15,000 signing bonus to be paid with my first paycheck.",
  },
  {
    item: "Remote/hybrid arrangement",
    why: "If remote or hybrid was negotiated (especially if it differs from the posted job), confirm it explicitly in writing. Verbal agreements about flexible arrangements are the first thing that gets challenged when a new manager arrives.",
    example: "...with the arrangement of 3 days remote / 2 days in-office as discussed.",
  },
];

const EMAIL_TEMPLATES = [
  {
    scenario: "Standard acceptance (no negotiation)",
    body: `Hi [Hiring Manager / Recruiter Name],

I'm delighted to formally accept the offer for the [Job Title] position at [Company Name].

To confirm the details: [Job Title], starting [Start Date], with a base salary of $[Amount].

Thank you for the opportunity — I'm genuinely excited to join the team and hit the ground running. Please let me know if there's anything I need to complete before my start date.

Looking forward to [Start Date].

Best,
[Your Name]`,
    notes: "Keep it warm but brief. You don't need to gush. Confirm the key terms in one sentence — this creates a written record without making the email feel like a contract negotiation.",
  },
  {
    scenario: "Acceptance after successful negotiation",
    body: `Hi [Recruiter Name],

Thank you for working through the compensation conversation with me — I appreciate the flexibility.

I'm happy to formally accept the offer with the updated terms we discussed: [Job Title], starting [Start Date], with a base salary of $[Negotiated Amount] and a signing bonus of $[Amount] to be paid [timing].

I'm looking forward to joining the team. Please send over any paperwork or onboarding instructions when you're ready.

Best,
[Your Name]`,
    notes: "When accepting a negotiated offer, confirm every term you negotiated explicitly. The recruiter is tired and relieved — they may not remember to update all the paperwork to the final number. Your email is the last clear reference point before the official offer letter is issued.",
  },
  {
    scenario: "Acceptance with delayed start date",
    body: `Hi [Recruiter Name],

I'm very pleased to accept the offer for [Job Title] at [Company Name].

As discussed, I'll be starting [Start Date] — I appreciate [Company's] flexibility on timing given my current notice period commitments.

I'm confirming: [Job Title], starting [Start Date], base salary of $[Amount][, remote/hybrid arrangement as discussed].

Looking forward to joining the team. Let me know what onboarding steps I can complete in the meantime.

Best,
[Your Name]`,
    notes: "If your start date required negotiation (e.g., longer notice period, vacation already booked), explicitly confirm it. Don't assume it's locked in — always get delayed start dates in writing.",
  },
  {
    scenario: "Acceptance when you need time to review the formal offer letter",
    body: `Hi [Recruiter Name],

Thank you so much — I'm excited about the opportunity and fully intend to accept. I've received the formal offer letter and want to take [today / the next 24 hours] to review it carefully before signing.

I'll return the signed letter by [specific time/date]. Please let me know if there's any urgency I should be aware of.

Best,
[Your Name]`,
    notes: "Use this when you've received the formal offer letter but want time to review it carefully — especially if it's longer than expected or contains non-compete, IP assignment, or bonus clawback clauses. You're not stalling; you're being professionally careful.",
  },
];

const BEFORE_YOU_SIGN = [
  { check: "Non-compete clause scope and duration", detail: "Many offer letters include non-compete agreements. Read the geography (local, national, global?), duration (3 months? 2 years?), and scope (your specific function or the entire industry?). Non-competes are unenforceable in California and increasingly restricted in other states — but you still need to know what you're signing." },
  { check: "Bonus structure and conditions", detail: "If there's a performance bonus, signing bonus, or equity, check the vesting schedule, performance criteria, and any clawback provisions. Signing bonuses are frequently tied to minimum tenure requirements — leaving before 12 months may require you to repay a pro-rated portion." },
  { check: "Equity terms (if applicable)", detail: "For equity compensation: confirm the strike price, vesting schedule (4-year with 1-year cliff is standard), acceleration provisions on change of control, and whether options are ISOs or NSOs. These details matter significantly at tax time and exit." },
  { check: "At-will employment language", detail: "Most US employment is at-will. Confirm whether your letter specifies a fixed term, notice period requirements, or any other employment duration terms that differ from standard at-will arrangements." },
  { check: "IP assignment agreement", detail: "Most offer letters include intellectual property assignment — anything you build while employed belongs to the company. Check if the agreement is limited to work-related IP or if it includes side projects created on personal time (most should exclude these, but some don't)." },
];

const FAQS = [
  { question: "Do you have to accept a job offer in writing?", answer: "You're not legally required to accept in writing — a verbal acceptance is generally binding. But written acceptance is strongly recommended because: it confirms you received the offer (and the specific terms), it creates a record if there's any later dispute about compensation or start date, and it gives the company a clear signal to stop their search and begin onboarding. In practice, most companies will send you a formal offer letter that requires a signature — your acceptance email is the step between verbal agreement and signed document." },
  { question: "How long do you have to accept a job offer?", answer: "Most companies give 24–72 hours for a decision, though this varies. Tech and startup roles often have faster timelines. Corporate and government roles may allow more time. If you need more time — to wait on another offer, or to discuss with family — it's appropriate to ask: 'I'm very interested and want to make a thoughtful decision. Can I have until [specific date] to review?' Most companies will agree to a reasonable extension, typically adding 2–5 days. Don't ask for more than a week without a compelling reason — longer delays signal ambivalence that can cause companies to move to their backup candidate." },
  { question: "Can you negotiate after saying you'll accept?", answer: "Technically yes — if you said 'yes' verbally but haven't signed yet, there's usually a narrow window to negotiate. But it puts both parties in an awkward position. The cleaner approach: do all negotiating before accepting, so your acceptance email is a clean confirmation of already-agreed terms. If you've accepted and then discover a material issue (like a non-compete that covers your entire field, or a bonus clawback with unusually harsh terms), it's reasonable to raise it — frame it as 'before I sign, I wanted to discuss one item I noticed in the formal offer letter.'" },
];

export default async function JobAcceptanceLetterPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Job Acceptance Letter — Email Templates & What to Confirm (2025)"
        description="Accepting a job offer in writing confirms negotiated terms and protects you. Exact templates for standard acceptance, negotiated offers, and delayed start dates."
        url={`${BASE_URL}/blog/job-acceptance-letter`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Job Acceptance Letter", url: `${BASE_URL}/blog/job-acceptance-letter` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Offer Stage · Acceptance Guide</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Job Acceptance Letter</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            A job acceptance email does more than say yes — it confirms the terms you negotiated, creates a written record before the formal paperwork, and sets the tone before your first day.
          </p>
        </div>
      </section>

      {/* What to confirm */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What to confirm in your acceptance email</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">Confirm these in writing before or alongside signing the formal offer letter.</p>
          <div className="mt-6 space-y-4">
            {WHAT_TO_CONFIRM.map((item) => (
              <div key={item.item} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{item.item}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
                <div className="mt-3 rounded-lg bg-[var(--bg)] px-4 py-2.5 font-mono text-[12px] text-[#4361EE]">{item.example}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email templates */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Acceptance email templates</h2>
          <div className="mt-6 space-y-6">
            {EMAIL_TEMPLATES.map((tpl) => (
              <div key={tpl.scenario} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{tpl.scenario}</p>
                </div>
                <div className="px-5 py-4 font-mono text-[12.5px] leading-7 text-[var(--muted)] whitespace-pre-line bg-white">{tpl.body}</div>
                <div className="border-t border-[var(--border)] bg-[var(--brand)]/[0.03] px-5 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#4361EE] mb-1">Usage note</p>
                  <p className="text-[12.5px] leading-5 text-[var(--muted)]">{tpl.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before you sign */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Before you sign the formal offer letter</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">Your acceptance email confirms the terms. Your signature on the formal offer letter is binding — check these before signing.</p>
          <div className="mt-6 space-y-3">
            {BEFORE_YOU_SIGN.map((item) => (
              <div key={item.check} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)]">{item.check}</p>
                <p className="mt-1.5 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Ready to accept — but want to negotiate first?</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches you through offer evaluation, compensation negotiation, and the exact language to use at each stage — so you accept with confidence and on the best possible terms. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
