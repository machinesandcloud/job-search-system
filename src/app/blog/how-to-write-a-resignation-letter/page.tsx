import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Write a Resignation Letter — Templates & Tips (2025)",
  description:
    "A resignation letter does one thing: formally documents your departure with a notice period start date. It doesn't need to explain your reasons or apologize for leaving. Exact templates for every situation — standard resignation, immediate departure, difficult relationships, and more.",
  keywords: ["how to write a resignation letter", "resignation letter", "resignation letter template", "how to resign from a job", "resignation letter examples", "professional resignation letter 2025", "two weeks notice letter", "simple resignation letter"],
  alternates: { canonical: "/blog/how-to-write-a-resignation-letter" },
  openGraph: {
    title: "How to Write a Resignation Letter — Templates & Tips (2025)",
    description: "A resignation letter documents your departure date. It doesn't need to explain your reasons. Exact templates for every situation — from standard notice to immediate departure.",
    url: "/blog/how-to-write-a-resignation-letter",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const THE_RULES = {
  what_it_is: "A resignation letter is a formal document that notifies your employer of your intent to resign, states your last day of work, and creates a written record of your notice period. That's all it needs to do.",
  what_it_isnt: "It's not a performance review of your time at the company. It's not a platform for grievances. It's not a thank-you speech. The more you write beyond the basics, the more surface area you create for something to be misread, taken out of context, or held against you.",
  core_elements: [
    "Clear statement that you're resigning",
    "Your last day of work (specific date)",
    "Brief expression of appreciation (optional but professional)",
    "Offer to help with transition (optional but often expected)",
  ],
};

const TEMPLATES = [
  {
    scenario: "Standard resignation (2 weeks notice)",
    template: `[Your Name]
[Date]

[Manager's Name]
[Their Title]
[Company Name]

Dear [Manager's Name],

I am writing to formally notify you of my resignation from my position as [Your Title] at [Company Name]. My last day of work will be [Date — typically 2 weeks from the date above].

I'm grateful for the opportunities I've had during my time here and for the support of you and the team.

I'm committed to making this transition as smooth as possible. Please let me know how I can best assist during my remaining time — whether that's documentation, knowledge transfer, or training.

Thank you again for the experience.

Sincerely,
[Your Name]`,
    notes: "This covers 95% of resignation situations. Keep it short, professional, and without any hint of the real reason you're leaving. Your last day is the most important information — make it unambiguous.",
  },
  {
    scenario: "Resignation with longer notice period",
    template: `Dear [Manager's Name],

I am writing to formally resign from my position as [Your Title]. My last day of work will be [Date — your agreed notice period], giving [Company Name] [X weeks/months] of notice as outlined in my contract.

I've valued my time here and appreciate the opportunities I've had to grow with this team.

I'll do everything I can to ensure a thorough handover during my notice period. I'm happy to discuss transition priorities and documentation needs.

Thank you for everything.

Sincerely,
[Your Name]`,
    notes: "If your contract specifies a notice period longer than 2 weeks, reference it explicitly. This protects you legally and avoids any ambiguity about the contractual timeline.",
  },
  {
    scenario: "Immediate resignation (no notice period)",
    template: `Dear [Manager's Name],

I am writing to notify you of my immediate resignation from [Company Name], effective today, [Date].

I understand that this is shorter notice than is typically expected, and I apologize for any disruption this causes. Due to [personal circumstances / the circumstances of my departure], I am unable to provide the standard notice period.

I am willing to [provide written documentation of key processes / be available for brief questions by email for X days] to support the transition.

Thank you for the time I spent with the company.

Sincerely,
[Your Name]`,
    notes: "Use immediate resignation only when truly necessary — toxic environment, health reasons, personal circumstances, or situations where the standard notice period is genuinely untenable. The consequences (forfeiting accrued PTO in some states, potential bridges burned) are real. If you can give even 3-5 days notice, do it.",
  },
  {
    scenario: "Resignation after a difficult relationship with your manager",
    template: `Dear [Manager's Name],

I'm writing to formally resign from my role as [Your Title] at [Company Name]. My last day will be [Date].

I'm committed to completing my responsibilities through my last day and ensuring a smooth handover.

Sincerely,
[Your Name]`,
    notes: "When the relationship is strained, less is more. Do not use the resignation letter to address grievances, summarize interpersonal tensions, or explain why you're leaving. A short, professional letter keeps your reputation intact. Save any difficult feedback for an exit interview where it can be delivered constructively and documented properly.",
  },
  {
    scenario: "Resignation with specific transition offer (senior role)",
    template: `Dear [Manager's Name],

I am writing to inform you of my decision to resign from my position as [Your Title], effective [Date].

During my time at [Company Name], [one sentence about something you're proud of — optional]. I'm grateful for the trust and opportunities extended to me.

Given the scope of my responsibilities, I want to be intentional about the handover. I'm happy to prepare detailed documentation for [specific projects or processes], suggest internal or external candidates who could support in my absence, and be available for any questions during a reasonable transition period beyond my last day.

Please let me know how you'd like to structure this, and I'll make it as seamless as possible.

Thank you.

Sincerely,
[Your Name]`,
    notes: "For senior roles with significant responsibilities, a proactive transition offer is expected and professionally appropriate. It protects your reputation and demonstrates leadership even in your exit.",
  },
];

const WHAT_NOT_TO_INCLUDE = [
  { item: "Why you're leaving", why: "Your reasons are not the company's business, and whatever you write will be read by HR and potentially shared. If you're leaving for a better offer, leaving because of management, or leaving due to burnout — none of these need to be in the document." },
  { item: "Complaints about coworkers or culture", why: "Exit grievances in a resignation letter are one of the most reliably career-damaging moves a professional can make. The HR department will keep this letter. Future employers may ask for references from this company. Any grievances you want to articulate belong in an exit interview, not in a formal resignation." },
  { item: "Promises about returning in the future", why: "'I hope to work with you again someday' is fine. Specific promises — 'I'll be available as a contractor' or 'I'll come back when things change' — create implied commitments you may not want to keep and can be awkward for both parties." },
  { item: "A detailed account of your new role or company", why: "Telling your current employer where you're going, what you'll be doing, and how excited you are is rarely appropriate in the letter itself. Discretion here protects you from any potential non-compete concerns and keeps the relationship professional." },
];

const FAQS = [
  { question: "How long should a resignation letter be?", answer: "One page maximum. Most resignation letters should be 3-5 sentences — just enough to state your resignation formally, name your last day, express brief appreciation, and offer to help with transition. Longer letters create more surface area for misinterpretation, require more careful review, and rarely add professional value. The goal of a resignation letter is legal documentation of your departure, not a comprehensive narrative of your tenure." },
  { question: "Do you have to give a reason for resigning?", answer: "No — you are not obligated to give a reason for resigning in your resignation letter, and in most cases you shouldn't. If your manager or HR asks directly, you can be honest in conversation (a better opportunity, career growth, personal reasons) without putting it in writing. The exception: if you're leaving for legal or safety reasons (hostile work environment, FLSA violations, etc.) and intend to file a complaint, document your reasons carefully — but consult an employment attorney about how to do so before writing anything." },
  { question: "Should you resign by letter, email, or in person?", answer: "The professional standard is to resign in person or by video call first, then follow up with a written resignation letter (email or physical letter) to create the formal record. Tell your manager before HR. Don't resign via text or Slack without a follow-up formal letter. In situations where an in-person conversation is genuinely not possible (remote position, manager unavailable, safety concerns), an email resignation is acceptable — but send it to both your manager and HR to ensure it's formally received and documented." },
];

export default async function HowToWriteAResignationLetterPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Write a Resignation Letter — Templates & Tips (2025)"
        description="A resignation letter documents your departure date. It doesn't need to explain your reasons. Exact templates for every situation — from standard notice to immediate departure."
        url={`${BASE_URL}/blog/how-to-write-a-resignation-letter`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Write a Resignation Letter", url: `${BASE_URL}/blog/how-to-write-a-resignation-letter` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Career Management · Leaving a Job</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Write a Resignation Letter</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            A resignation letter does one thing: formally documents your departure date. It doesn&apos;t need to explain your reasons, summarize your tenure, or address grievances. Templates for every situation.
          </p>
        </div>
      </section>

      {/* The rules */}
      <section className="bg-[var(--bg)] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-6 space-y-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1">What it is</p>
              <p className="text-[14px] font-semibold leading-6 text-[var(--ink)]">{THE_RULES.what_it_is}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">What it isn&apos;t</p>
              <p className="text-[14px] leading-6 text-[var(--muted)]">{THE_RULES.what_it_isnt}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2">What to include</p>
              <ul className="space-y-1">
                {THE_RULES.core_elements.map((el) => (
                  <li key={el} className="flex gap-2 text-[13px] text-[var(--muted)]">
                    <span className="text-emerald-500 font-bold flex-shrink-0">✓</span> {el}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Resignation letter templates</h2>
          <div className="mt-6 space-y-6">
            {TEMPLATES.map((tpl) => (
              <div key={tpl.scenario} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{tpl.scenario}</p>
                </div>
                <div className="px-5 py-4 font-mono text-[12px] leading-7 text-[var(--muted)] whitespace-pre-line bg-white">{tpl.template}</div>
                <div className="border-t border-[var(--border)] bg-[var(--brand)]/[0.03] px-5 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)] mb-1">Usage note</p>
                  <p className="text-[12.5px] leading-5 text-[var(--muted)]">{tpl.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What not to include */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What not to include</h2>
          <div className="mt-6 space-y-3">
            {WHAT_NOT_TO_INCLUDE.map((item) => (
              <div key={item.item} className="rounded-xl border border-red-100 bg-red-50/30 p-5">
                <div className="flex gap-3">
                  <span className="text-red-400 font-bold flex-shrink-0">✗</span>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{item.item}</p>
                    <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Leaving for a new role? Zari helps with the next chapter.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Whether you&apos;re already in an offer negotiation or starting your next job search, Zari coaches your resume, interview, and negotiation. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
