import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Respond to a Job Rejection — Emails That Keep the Door Open (2025)",
  description:
    "Word-for-word rejection response emails for every situation — post-interview rejection, automated rejection, and late-stage rejection. How to keep the door open, request feedback, and turn a rejection into a future referral.",
  keywords: ["how to respond to a job rejection", "job rejection email response", "how to reply to job rejection", "rejection letter response", "job rejection response email", "responding to job rejection professionally"],
  alternates: { canonical: "/blog/how-to-respond-to-job-rejection" },
  openGraph: {
    title: "How to Respond to a Job Rejection — Emails That Keep the Door Open (2025)",
    description: "Word-for-word rejection response emails for every situation — and how to turn a rejection into a future opportunity.",
    url: "/blog/how-to-respond-to-job-rejection",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHY_RESPOND_MATTERS = [
  { reason: "Companies re-engage silver medalists", detail: "Hiring managers frequently come back to their second-choice candidate when the first choice doesn't work out — whether the offer falls through, the hire quits within 90 days, or a new headcount opens up. A well-handled rejection keeps you at the top of that list." },
  { reason: "Rejections are often temporary", detail: "The role you were rejected for today may not have been the right fit, but the company may have a better-fitting role in 6–12 months. Candidates who respond graciously are far more likely to get a call when that role opens." },
  { reason: "Recruiters remember how candidates behave", detail: "Recruiters work across multiple roles and often move between companies. How you handle a rejection directly affects whether that recruiter thinks of you for other positions — now or at their next company." },
  { reason: "Referrals flow from good impressions", detail: "Hiring managers often know other hiring managers. A candidate who handles a rejection well is one they'd recommend to a colleague with a relevant opening. One gracious email can unlock a warm introduction you'd never have gotten otherwise." },
];

const REJECTION_TYPES = [
  {
    type: "Automated / generic rejection",
    whenItHappens: "Shortly after applying, before or without a human review. Usually a boilerplate email from an ATS or recruiting platform.",
    whatToDoFirst: "Identify whether this came from a human or an automated system. If it's clearly automated (sent within 24 hours, no personalization), a response is optional — the recruiter may never see it.",
    shouldYouRespond: "Only if you have a contact name or if you had previous human communication with this company. Otherwise, there's no one to respond to meaningfully.",
    emailTemplate: `Subject: Re: [Role Title] — Thank you

Hi [Recruiter Name],

Thank you for letting me know. I understand — I know you receive many applications, and the timing may not have been right.

I remain genuinely interested in [Company] and the work your team is doing on [specific thing]. If a relevant role opens in the future, I hope you'll keep me in mind.

Best,
[Your Name]`,
  },
  {
    type: "Post-phone-screen rejection",
    whenItHappens: "After an initial recruiter call or phone screen. You had human contact but didn't advance to the next round.",
    whatToDoFirst: "Respond quickly (within 24 hours). Thank the recruiter specifically, mention something from your conversation, and make a direct but low-pressure ask to stay connected.",
    shouldYouRespond: "Yes — always. You had a human conversation and the recruiter is now the person who can flag you for future roles.",
    emailTemplate: `Subject: Re: [Role Title] at [Company]

Hi [Recruiter Name],

Thank you for letting me know, and for the time you spent talking with me about the role and team.

I understand the decision — timing and fit don't always line up. I came away from our conversation even more impressed with what [Company] is building, and I'd welcome the chance to reconnect if a more fitting role comes up.

I'll follow you on LinkedIn — if you're open to staying in touch, I'd appreciate that.

Best,
[Your Name]`,
  },
  {
    type: "Post-interview rejection (1–2 rounds)",
    whenItHappens: "After investing time in technical screens, case interviews, or early hiring manager conversations. You have a real relationship with at least one person.",
    whatToDoFirst: "Send a specific, personal response — not a template. Reference something specific from the interview. Ask explicitly for feedback. Express genuine interest in future opportunities.",
    shouldYouRespond: "Yes — always. This is your highest-value response scenario. You've built a real relationship and the hiring manager or recruiter can become an ongoing advocate.",
    emailTemplate: `Subject: Re: [Role Title]

Hi [Interviewer's Name],

Thank you for letting me know, and for the time you and the team invested in the process. I genuinely enjoyed our conversations — especially [specific topic discussed, e.g., "the discussion about your approach to pricing strategy"].

I respect the decision. I'm still very impressed by [Company] and the direction you're taking [product/team/initiative].

If you're open to sharing what the deciding factors were or where I could strengthen my candidacy, I'd really value that feedback — it would help me in future conversations.

I hope to stay in touch. I'll follow your work at [Company] and would welcome the chance to reconnect if the timing is ever right for a future role.

Thanks again,
[Your Name]`,
  },
  {
    type: "Final round / late-stage rejection",
    whenItHappens: "After 3+ rounds, a case study, references, or after you were the finalist. You were close — possibly the runner-up.",
    whatToDoFirst: "Take 24 hours if needed — late-stage rejections sting. Then send a gracious, brief email that keeps the door open without expressing bitterness. Explicitly acknowledge the difficulty of the decision and leave space for the relationship.",
    shouldYouRespond: "Yes — absolutely. Late-stage rejections are the most likely to reverse (first hire doesn't work out, role re-opens, new budget). This email matters more than any other.",
    emailTemplate: `Subject: Re: [Role Title]

Hi [Hiring Manager's Name],

Thank you for letting me know directly — I appreciate that.

I won't pretend this isn't disappointing; I was genuinely excited about this role and the team. That said, I understand these decisions are rarely easy and are rarely about one thing.

I came away from this process with real respect for [Company] and the way your team thinks about [specific challenge or approach discussed]. If the right opportunity comes up in the future, I hope you'll think of me — I'd come back to the conversation without hesitation.

I'll stay in touch. Thank you for the time you invested in getting to know my work.

[Your Name]`,
  },
];

const HOW_TO_ASK_FOR_FEEDBACK = [
  {
    approach: "In the rejection response email",
    howToAsk: "\"If you're open to sharing what the deciding factors were or where I could have been stronger, I'd genuinely value that feedback — it would help me in future conversations.\"",
    responseRate: "Low — most companies have policies against giving specific feedback due to legal risk. Don't expect a detailed response, but the ask itself demonstrates self-awareness.",
  },
  {
    approach: "Via a follow-up call request",
    howToAsk: "\"Would you be open to a 10-minute call? I'd love to understand the feedback from the panel, and I promise I won't take it personally — I'm genuinely trying to improve.\"",
    responseRate: "Medium — works best when you built real rapport with the interviewer. Interviewers who liked you personally are more likely to say yes to a brief call.",
  },
  {
    approach: "From a recruiter you built rapport with",
    howToAsk: "Ask the recruiter specifically, not the hiring manager — recruiters have more experience delivering feedback and are often less concerned about legal risk for general impressions.",
    responseRate: "Highest — especially if you thanked the recruiter warmly and stayed professional throughout. Recruiters who liked you will often share general impressions off the record.",
  },
];

const WHAT_NOT_TO_DO = [
  "Ask why they chose someone else. It's unanswerable and puts the interviewer on the defensive.",
  "Express disappointment in a way that makes the reader feel guilty. One sentence of acknowledgment is appropriate; dwelling on it reads as entitled.",
  "Ask to be reconsidered for the same role in the same process. Unless they invite this, it's awkward.",
  "Follow up multiple times asking for feedback after receiving no response. One ask is appropriate; two or more is a relationship cost.",
  "Ghost entirely — no response. The recruiter will assume you're angry or unprofessional. A 2-sentence gracious reply costs you 3 minutes and buys you significant goodwill.",
];

const FAQS = [
  {
    question: "Should you always respond to a job rejection email?",
    answer: "Almost always — with one exception. If you received an automated rejection with no human contact (within hours of applying, from a no-reply address with zero personalization), responding serves no practical purpose since no human will read it. For every other situation — phone screen rejection, post-interview rejection, late-stage rejection — responding graciously is almost always worth it. The cost is 5 minutes. The potential upside is a re-engagement call in 6 months, a referral to another role, or staying in a recruiter's mind across their entire career."
  },
  {
    question: "What do you say in response to a job rejection email?",
    answer: "Three things: (1) thank them for their time and the opportunity, (2) acknowledge the decision with one sentence of genuine graciousness (not hollow positivity, not bitterness), and (3) express continued interest in the company or relationship without being pushy. Keep it short — 4–6 sentences is appropriate. The goal is to leave a positive final impression, not to re-open the conversation or get a second chance at the same role."
  },
  {
    question: "How do you respond to a job rejection after a final interview?",
    answer: "Acknowledge the disappointment briefly and genuinely — late-stage rejections are harder to process and your response can reflect that. Then redirect to gratitude and forward-looking statements: what you valued about the process, genuine appreciation for the time invested, and an explicit note that you'd welcome future opportunities. Late-stage rejections reverse more often than any other stage — 'the first hire didn't work out' is a real scenario, and the candidate who handled the rejection graciously is the first call."
  },
  {
    question: "Is it worth asking for feedback after a job rejection?",
    answer: "Worth asking once, with low expectations. Most companies have policies against specific feedback due to legal risk — 'they might argue we discriminated' — so hiring managers and recruiters are often instructed not to give it. When feedback does come, it's usually general: 'we went with a candidate with more X experience.' That said, some interviewers will share genuine impressions, especially when you've built real rapport and made the ask graciously. One ask in your rejection response email is appropriate; don't follow up on the ask."
  },
];

export default async function HowToRespondToJobRejectionPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Respond to a Job Rejection — Emails That Keep the Door Open (2025)"
        description="Word-for-word rejection response emails for every situation — and how to turn a rejection into a future opportunity."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/how-to-respond-to-job-rejection`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Respond to a Job Rejection", url: `${BASE_URL}/blog/how-to-respond-to-job-rejection` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Job Search Strategy</span>
            <span className="text-[11px] text-white/30">9 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            How to respond to a job rejection<br /><span className="gradient-text-animated">emails that keep the door open</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most candidates either ghost rejections or send a bitter note. A gracious, professional response is rare — and it&apos;s how rejections sometimes turn into re-engagements, referrals, or the next role at the same company. Here&apos;s exactly what to say.
          </p>
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Why responding well matters more than most candidates think</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {WHY_RESPOND_MATTERS.map((item) => (
              <div key={item.reason} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <p className="font-bold text-[var(--ink)] mb-2">{item.reason}</p>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By rejection type */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Word-for-word responses — by rejection type</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Each stage has a different relationship context. The email that works after a final round isn&apos;t the same as what works after an automated rejection.</p>
          <div className="mt-7 space-y-6">
            {REJECTION_TYPES.map((item) => (
              <div key={item.type} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="border-b border-[var(--border)] bg-white px-6 py-4">
                  <p className="font-extrabold text-[var(--ink)]">{item.type}</p>
                  <p className="mt-1 text-[12.5px] text-[var(--muted)]">{item.whenItHappens}</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                    <div className="px-6 py-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">First step</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{item.whatToDoFirst}</p>
                    </div>
                    <div className="px-6 py-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Should you respond?</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{item.shouldYouRespond}</p>
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">Email template</p>
                    <pre className="whitespace-pre-wrap rounded-xl bg-white border border-[var(--border)] px-5 py-4 font-mono text-[12.5px] leading-7 text-[var(--ink)]">{item.emailTemplate}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asking for feedback */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to ask for feedback (and what to expect)</h2>
          <div className="mt-7 space-y-4">
            {HOW_TO_ASK_FOR_FEEDBACK.map((item) => (
              <div key={item.approach} className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
                <div className="border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{item.approach}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="px-5 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">How to ask</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)] italic">{item.howToAsk}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Response rate reality</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.responseRate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What NOT to do */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What not to do</h2>
          <div className="mt-6 space-y-3">
            {WHAT_NOT_TO_DO.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/40 px-5 py-4">
                <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">✕</span>
                </span>
                <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Job rejection FAQs</h2>
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
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Ready to build a pipeline that produces fewer rejections?</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari optimizes your resume for ATS, coaches interview preparation, and helps you negotiate — so you advance more often and get rejected less. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
