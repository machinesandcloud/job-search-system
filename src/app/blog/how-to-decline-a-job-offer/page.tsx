import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Decline a Job Offer — Email Templates & Scripts (2025)",
  description:
    "Declining a job offer without burning the bridge is a skill. The same recruiter who placed you could refer you to the next role. Exact email templates for every scenario — accepted another offer, compensation, role fit, timing — and what never to put in a decline email.",
  keywords: ["how to decline a job offer", "how to turn down a job offer", "decline job offer email", "how to reject a job offer politely", "turn down job offer email template", "decline offer letter", "job offer rejection email 2025"],
  alternates: { canonical: "/blog/how-to-decline-a-job-offer" },
  openGraph: {
    title: "How to Decline a Job Offer — Email Templates & Scripts (2025)",
    description: "Exact decline email templates for every scenario — accepted another offer, compensation, role fit, timing. Decline professionally and keep the relationship.",
    url: "/blog/how-to-decline-a-job-offer",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const THE_RULES = [
  {
    rule: "Decline in writing, not by phone",
    detail: "An email creates a clear record and lets the recruiter update their system cleanly. Phone calls put them on the spot to respond immediately and can make an already awkward interaction longer. The exception: if you've built a genuine relationship with the hiring manager over multiple rounds, a brief call followed by a written follow-up is appropriate — the call honors the relationship, the email documents it.",
  },
  {
    rule: "Respond within 24–48 hours of deciding",
    detail: "Every day you delay is a day the company isn't moving their second choice forward. Prompt declines are a professional courtesy — and hiring teams remember them. If you're waiting on another offer, it's fine to ask for an extension on your decision deadline, but once you've decided, respond immediately.",
  },
  {
    rule: "Give a reason — but keep it brief and unchallengeable",
    detail: "You don't owe a detailed explanation, but a brief reason reduces awkwardness and closes the loop professionally. 'I've accepted another offer' is the cleanest reason — it's not challengeable. 'The compensation wasn't competitive' opens a counteroffer conversation you may not want. 'It wasn't the right fit' invites questions. Name your reason once, don't elaborate.",
  },
  {
    rule: "Express genuine appreciation — but don't overdo it",
    detail: "Thank them for the time, the offer, and the process. One to two sentences. Don't apologize excessively, don't say you're devastated, and don't manufacture enthusiasm you don't have. Genuine appreciation for a real process is appropriate; performative regret reads as inauthentic.",
  },
  {
    rule: "Leave the door open explicitly",
    detail: "If there's any realistic chance you'd consider the company in the future — another role, a different team, different timing — say so explicitly: 'I hope our paths cross again.' Recruiters and hiring managers move between companies. The person you're declining today may be your hiring manager, client, or investor in five years.",
  },
];

const EMAIL_TEMPLATES = [
  {
    scenario: "Accepted another offer (most common)",
    subject: "Re: [Job Title] Offer — [Your Name]",
    body: `Hi [Recruiter/Hiring Manager Name],

Thank you so much for the offer and for the time you and the team invested in the interview process. I was genuinely impressed by [something specific — the team, the mission, the product].

After careful consideration, I've decided to accept another offer that I feel is a better fit for where I want to go in my career right now.

I have a lot of respect for what [Company] is building, and I hope our paths cross again in the future.

Thank you again for the opportunity.

Best,
[Your Name]`,
    notes: "Keep this short. Do not name the other company. Do not explain why the other offer is better — that information doesn't help them and invites unnecessary conversation.",
  },
  {
    scenario: "Compensation doesn't meet your expectations",
    subject: "Re: [Job Title] Offer — [Your Name]",
    body: `Hi [Recruiter Name],

Thank you for the offer and for the thorough process — I genuinely appreciated the conversations with [hiring manager] and the team.

After careful consideration, I've decided to decline. The compensation package doesn't align with what I need at this stage of my career, and I don't think we'd be able to reach a number that works for both sides.

I have a lot of respect for [Company] and hope to stay in touch. Thank you again for the consideration.

Best,
[Your Name]`,
    notes: "Only use this reason if compensation is truly the issue AND you've already tried to negotiate and reached an impasse. Don't lead with compensation if you're using it to soften a different reason (role fit, culture concern) — that creates false hope and potential counteroffer conversations.",
  },
  {
    scenario: "Role isn't the right fit",
    subject: "Re: [Job Title] Offer — [Your Name]",
    body: `Hi [Recruiter Name],

Thank you for the offer and for the time the team invested throughout the process. It was a genuinely strong interview experience, and I came away with a lot of respect for the team.

After reflection, I've decided to decline — through the process, I realized the scope of the role isn't quite aligned with the direction I'm trying to move in my career right now.

I'd love to stay in touch and hope the door is open for future conversations. Thank you again.

Best,
[Your Name]`,
    notes: "Vague on purpose — 'the direction I'm trying to move' doesn't invite a negotiation. Don't specify what aspect of the role doesn't fit, as that becomes actionable feedback that invites counter-proposals you'll need to decline again.",
  },
  {
    scenario: "Timing isn't right (personal reasons, family, relocation)",
    subject: "Re: [Job Title] Offer — [Your Name]",
    body: `Hi [Recruiter Name],

Thank you so much for the offer — I was very impressed by the role, the team, and everything I learned about [Company] through the process.

I've made the difficult decision to decline. My personal circumstances have shifted in a way that makes this timing not quite right for me to take on a new role.

I genuinely hope to reconnect when the timing is better — I have a lot of respect for what [Company] is building. Thank you for understanding.

Best,
[Your Name]`,
    notes: "You don't need to explain your personal circumstances. 'Personal circumstances' is sufficient — hiring managers understand this and don't push for elaboration. Never manufacture a personal reason to soften a different decline; stick to the real reason or use the accepted-another-offer template.",
  },
];

const WHAT_NOT_TO_DO = [
  { mistake: "Ghosting the recruiter", why: "Going silent after receiving an offer is one of the most remembered professional discourtesies in hiring. Recruiters share candidate feedback across networks — ghosting leaves a lasting negative impression. Always send the email." },
  { mistake: "Over-explaining your decision", why: "More reasons create more surface area for counter-argument. 'The compensation wasn't competitive AND I felt the role was too narrow AND the commute concerned me' gives a recruiter three things to address. One clean reason closes the conversation." },
  { mistake: "Criticizing the company or the process", why: "Even if the interview process was disorganized, the compensation was insulting, or you had a bad experience — a decline email is not the place to say so. If you want to share feedback, wait until you're asked in an exit survey or do so only if you have a genuine relationship with someone at the company." },
  { mistake: "Promising to reconsider if things change", why: "'Maybe next year' or 'check back with me in 6 months' is almost never true — and creates work for the recruiter who may actually follow up. Leave the door open with 'I hope our paths cross again' but don't give a specific timeline you won't honor." },
  { mistake: "Waiting to see if a better offer comes", why: "If you've decided to decline, decline. Stringing a company along while you wait on another offer is transparent to experienced recruiters. If you're genuinely waiting on a competing offer, ask for a reasonable deadline extension — don't simply go silent." },
];

const FAQS = [
  { question: "Do you have to give a reason for declining a job offer?", answer: "No — you're not obligated to explain your decision. That said, a brief reason reduces awkwardness and closes the conversation professionally. 'I've accepted another offer' is the cleanest and most complete explanation most situations need. You don't owe details about why the other offer was better, who offered it, or what you'll be doing. A polite, brief reason once — not elaborated upon — is the professional standard." },
  { question: "Can a company rescind their offer if you decline?", answer: "By definition, if you decline the offer, there's no offer to rescind — you've already rejected it. What you might be wondering: can you un-decline? Yes, in rare cases. If you immediately realize you've made a mistake, you can reach out within hours of declining to see if the offer is still on the table. Companies are sometimes willing to reinstate — but not always, and not always on the same terms, especially if they've already moved to their second-choice candidate. The better strategy: take the time you need to decide before declining, so you don't need to un-decline." },
  { question: "Is it okay to decline an offer after accepting it?", answer: "Technically yes — until you've signed a contract and started work, you can withdraw an acceptance. But declining after accepting is significantly more disruptive than declining before accepting: the company has likely rejected other candidates, potentially rescinded other offers, and stopped their search. Do this only if truly necessary, and do it immediately when you decide — the longer you wait after accepting, the more damage you cause. Be direct, take full responsibility, apologize sincerely, and don't over-explain. Some bridges will be burned regardless." },
];

export default async function HowToDeclineAJobOfferPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Decline a Job Offer — Email Templates & Scripts (2025)"
        description="Exact decline email templates for every scenario — accepted another offer, compensation, role fit, timing. Decline professionally and keep the relationship."
        url={`${BASE_URL}/blog/how-to-decline-a-job-offer`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Decline a Job Offer", url: `${BASE_URL}/blog/how-to-decline-a-job-offer` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Job Offer · Negotiation Guide</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Decline a Job Offer</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            The same recruiter who placed you could refer you to the next role. Declining well keeps the relationship intact — declining poorly burns it. Exact email templates for every scenario.
          </p>
        </div>
      </section>

      {/* Rules */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 5 rules of declining professionally</h2>
          <div className="mt-6 space-y-3">
            {THE_RULES.map((item, i) => (
              <div key={item.rule} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[11px] font-bold text-[#4361EE]">{i + 1}</span>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{item.rule}</p>
                    <p className="mt-1.5 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email templates */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Email templates by scenario</h2>
          <div className="mt-6 space-y-6">
            {EMAIL_TEMPLATES.map((tpl) => (
              <div key={tpl.scenario} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{tpl.scenario}</p>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">Subject: {tpl.subject}</p>
                </div>
                <div className="px-5 py-4 font-mono text-[12.5px] leading-7 text-[var(--muted)] whitespace-pre-line bg-white">{tpl.body}</div>
                <div className="border-t border-[var(--border)] bg-amber-50/50 px-5 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1">Usage note</p>
                  <p className="text-[12.5px] leading-5 text-[var(--muted)]">{tpl.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What not to do */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What not to do</h2>
          <div className="mt-6 space-y-3">
            {WHAT_NOT_TO_DO.map((item) => (
              <div key={item.mistake} className="rounded-xl border border-red-100 bg-red-50/30 p-5">
                <div className="flex gap-3">
                  <span className="text-red-400 font-bold flex-shrink-0 text-[14px]">✗</span>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{item.mistake}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Evaluating a job offer before you decide?</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari helps you evaluate total compensation, negotiate the best possible package, and make an informed decision — so you decline with confidence when it&apos;s not right, or negotiate until it is. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
