import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Cover Letter Examples — By Situation, With Exact Language (2025)",
  description:
    "Real cover letter examples for 5 job search situations: standard application, career change, internal promotion, cold outreach, and referral. Each includes exact opening language, body structure, and close — with what makes it work.",
  keywords: ["cover letter examples", "cover letter examples 2025", "cover letter sample", "career change cover letter", "internal promotion cover letter", "cold outreach cover letter", "how to write a cover letter"],
  alternates: { canonical: "/blog/cover-letter-examples" },
  openGraph: {
    title: "Cover Letter Examples — By Situation, With Exact Language (2025)",
    description: "Five cover letter examples with exact language — for standard applications, career changes, internal promotion, cold outreach, and referrals.",
    url: "/blog/cover-letter-examples",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const COVER_LETTER_PRINCIPLES = [
  {
    principle: "Lead with the match, not your excitement",
    detail: "The most common opening mistake: 'I am excited to apply for...' Nobody who hires cares about your excitement. The hiring manager wants to know, in the first two sentences, why you are the right candidate for this specific role. Lead with the match between what they need and what you bring — not how enthusiastic you are to apply.",
    example: "Weak: 'I am thrilled to apply for the Marketing Manager position at Acme.' Strong: 'I've spent five years building demand generation programs for B2B SaaS companies — most recently owning a $2M pipeline from content and paid across three product lines. Your job description mentions the same challenge I solved at my last two companies: scaling pipeline without scaling headcount.'",
  },
  {
    principle: "One specific story — not a resume summary",
    detail: "A cover letter that re-summarizes the resume adds no information. Use the body paragraph to tell one specific story: a situation you navigated, an outcome you drove, a problem you solved that maps directly to what the employer is asking for. The goal is to give the hiring manager one concrete thing to remember about you.",
    example: "Instead of listing 3 accomplishments from your resume, pick the one most relevant to this role and tell it with context: why the problem was hard, what you specifically did, and what the measurable result was.",
  },
  {
    principle: "Close with a specific ask",
    detail: "Weak closes: 'I look forward to hearing from you' / 'I would love the opportunity to discuss further.' Strong close: a specific, confident statement about next steps. You don't need to beg — you need to make it easy for the reader to take action.",
    example: "'I'd welcome 30 minutes to walk through how I approached [specific challenge relevant to role]. I'm available any time next week — [Name].'",
  },
];

const EXAMPLES_BY_SITUATION = [
  {
    situation: "Standard Application (Qualified Candidate)",
    when: "You meet most of the requirements and found the role through a job board",
    opening: "Your job description asks for someone who can [core requirement from JD]. I've done exactly this — [one-sentence summary of your most relevant experience and result]. I want to show you how that experience maps to what you're building.",
    body: "At [Company], I [specific action] to solve [specific problem]. The result was [specific metric]. The reason this matters for your team: [explicit connection between your experience and their stated need from the JD]. I understand [technical or industry-specific challenge they mentioned] because I spent [time] working on [direct parallel].",
    close: "I'd welcome the chance to walk through this work in more detail. I'm happy to share examples, references, or additional context — whatever would be most useful for your evaluation. [Name].",
    what_works: "The opening leads with the specific requirement from the job description. The body tells one story with a metric and makes the connection to their team explicit. The close is confident but not overreaching.",
  },
  {
    situation: "Career Change (Different Industry or Function)",
    when: "Your background is in a different industry or you're moving from one function to an adjacent one",
    opening: "I'm applying for [Role] from an unusual direction — I've spent [X years] in [different field], not [their field]. I'm not going to pretend that's not visible. What I want to show you is why the skills transfer more directly than the title suggests.",
    body: "In [previous role/industry], the core challenge was [describe challenge in terms that map to their industry]. I solved it by [skill/approach]. That's the same underlying problem you face as [company context] — the actors are different but the mechanics are identical. Specifically: [1–2 sentence bridge connecting your experience to their specific context]. The part I'd need to learn fast: [honest acknowledgment of gap]. Here's my plan for that: [brief, specific plan].",
    close: "I recognize this is a non-traditional application. I'm not asking you to take a leap of faith on potential — I'm asking for 20 minutes to show you the specific evidence that the skills are there. [Name].",
    what_works: "Acknowledges the non-linear background directly rather than hiding it. Identifies the skill bridge explicitly. Admits the gap and shows a learning plan — which builds more trust than pretending the gap doesn't exist.",
  },
  {
    situation: "Internal Promotion or Lateral Move",
    when: "You're applying for a more senior role or different team within the same company",
    opening: "I'm applying for [Role] after [X months/years] as [current role]. I've had a front-row seat to the problems this role is meant to solve, and I believe I'm ready to own them — here's my case.",
    body: "In my current role, I've [specific accomplishment directly relevant to the open role]. This gave me direct exposure to [challenge or domain of the new role]. I've also taken on [relevant stretch work or project] over the past [time period], which produced [result]. The managers who've seen my work directly — [names, if appropriate to share internally] — can speak to [specific competency the new role requires]. What I'd be learning: [honest list of 1–2 things that would be new]. What I'd be bringing from day one: [honest list of 2–3 things you already do well that map to the new role].",
    close: "I'd appreciate the chance to have a formal conversation about this role. I've put together [brief / examples / a short deck] to make the case more concrete — happy to share it whenever is useful. [Name].",
    what_works: "References your existing credibility inside the company. Offers evidence (stretch work, results, references) instead of just expressing desire for the role. The honest gap analysis reads as self-awareness, not weakness.",
  },
  {
    situation: "Cold Outreach (No Open Role Listed)",
    when: "You're reaching out to a company that hasn't posted a relevant job, or you want to connect before a role is listed",
    opening: "I'm not responding to a job posting — I'm reaching out because [specific reason you want to work at this company: a product decision, a recent hire, an interview or article that revealed how they think]. I want to be on your radar before the right role is listed.",
    body: "I'm a [title] with [X years] in [domain]. The work I'm most proud of: [one specific accomplishment with metric]. The type of problem I do best: [specific description that matches what this company works on]. I'm not asking you to create a role — I'm asking you to keep this conversation if something relevant opens. To make that worth your time, I can offer [specific thing: an insight about their market, a question about their roadmap, or a concrete skill relevant to their current initiative].",
    close: "If there's nothing relevant right now, I'd still welcome a 15-minute conversation — even just to understand what the team is building and what skills are hardest to find. I'll follow up once in 2 weeks if I don't hear back. [Name].",
    what_works: "Explains the why before the ask. Acknowledges that no role exists. Frames the follow-up as given — which removes ambiguity and signals someone who is organized and committed rather than passive.",
  },
  {
    situation: "Referral-Based Application",
    when: "Someone inside the company referred you or agreed to be mentioned",
    opening: "[Referrer's name] suggested I reach out — they thought my background in [domain] would be relevant to what your team is working on. I'll be direct about why they may be right.",
    body: "[Referrer] and I worked together at [context] — they saw me [specific thing you did that is directly relevant to the new role]. The most relevant thing I've done for a team like yours: [one specific accomplishment with metric]. The problem I heard you're focused on [from the referrer or from public sources]: [name the problem]. I've worked on that problem directly — here's how: [brief, direct answer].",
    close: "[Referrer] offered to put in a word on my behalf. I'll let them do that in their own timing — I just wanted to introduce myself directly and give you something concrete to consider alongside their recommendation. Happy to share more at your convenience. [Name].",
    what_works: "Names the referral immediately but doesn't lean on it as the only argument. Provides independent evidence. Distinguishes between your direct outreach and the referral — which prevents the cover letter from feeling like name-dropping without substance.",
  },
];

const FAQS = [
  { question: "Does anyone actually read cover letters anymore?", answer: "Hiring managers are split. In a survey of recruiting professionals, roughly 50% say cover letters influence their decision, and the other 50% say they rarely read them. The practical implication: a bad cover letter can hurt you, a mediocre one is usually ignored, and a strong one can meaningfully differentiate you — especially when the hiring manager reads applications personally rather than through an ATS. Write a cover letter for every application where one is optional. Make it strong enough to matter if it's read, and short enough not to waste anyone's time if it isn't." },
  { question: "How long should a cover letter be?", answer: "3–4 short paragraphs. A cover letter longer than half a page is almost never read in full. The hiring manager is deciding within the first two sentences whether to keep reading — everything after that is either reinforcing a positive first impression or being skipped. Structure: opening paragraph (the match), body paragraph (one specific story with a metric), optional second body paragraph (direct connection to their specific challenge), close (confident next step). No more than 300–400 words." },
  { question: "Should I customize every cover letter?", answer: "Yes — at minimum, customize the opening paragraph and the body story for every application. A generic cover letter that could have been sent to any company is detectable in the first sentence and typically reads as low effort. The customization doesn't need to be extensive: one sentence referencing a specific aspect of the role or company, and one story selected specifically because it matches their highest-priority need. That's the difference between a template and a targeted letter." },
];

export default async function CoverLetterExamplesPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Cover Letter Examples — By Situation, With Exact Language (2025)"
        description="Five cover letter examples with exact language — for standard applications, career changes, internal promotion, cold outreach, and referrals."
        url={`${BASE_URL}/blog/cover-letter-examples`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Cover Letter Examples", url: `${BASE_URL}/blog/cover-letter-examples` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Job Search · Cover Letter</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Cover Letter Examples</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Five situations, five cover letters — with exact opening language, body structure, and close. Not templates to fill in, but examples you can learn a structure from and write your own.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">3 principles that separate strong cover letters from weak ones</h2>
          <div className="mt-8 space-y-5">
            {COVER_LETTER_PRINCIPLES.map((item, i) => (
              <div key={item.principle} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[14px] font-extrabold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-[var(--ink)]">{item.principle}</h3>
                    <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                    <div className="mt-3 rounded-xl bg-[var(--brand)]/[0.05] p-4">
                      <p className="text-[12px] font-semibold text-[var(--brand)]">{item.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 cover letter examples by situation</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Each example includes the opening, body, and close — plus what makes the structure work for that specific situation.</p>
          <div className="mt-8 space-y-8">
            {EXAMPLES_BY_SITUATION.map((item, i) => (
              <div key={item.situation} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-6 py-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[12px] font-extrabold text-white">{i + 1}</span>
                    <h3 className="font-bold text-[var(--ink)]">{item.situation}</h3>
                  </div>
                  <p className="mt-1.5 text-[12px] text-[var(--muted)]"><span className="font-semibold">Use when: </span>{item.when}</p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Opening paragraph</p>
                    <p className="rounded-xl border border-[var(--border)] bg-white p-4 text-[13px] leading-6 italic text-[var(--muted)]">{item.opening}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Body paragraph</p>
                    <p className="rounded-xl border border-[var(--border)] bg-white p-4 text-[13px] leading-6 italic text-[var(--muted)]">{item.body}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Close</p>
                    <p className="rounded-xl border border-[var(--border)] bg-white p-4 text-[13px] leading-6 italic text-[var(--muted)]">{item.close}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Why this structure works</p>
                    <p className="text-[13px] leading-6 text-[var(--muted)]">{item.what_works}</p>
                  </div>
                </div>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Let Zari write your cover letter from the job description.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Paste the job description and your resume — Zari generates a cover letter matched to the specific role, coaches you through the interview, and helps you negotiate the offer. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
