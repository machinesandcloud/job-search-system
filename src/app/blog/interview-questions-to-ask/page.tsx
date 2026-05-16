import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Best Questions to Ask in a Job Interview — 30 Examples (2025)",
  description:
    "30 smart questions to ask at the end of a job interview. Includes questions for hiring managers, recruiters, future teammates, and executives — with what each question signals.",
  keywords: ["questions to ask in an interview", "interview questions to ask", "good questions to ask in an interview", "what to ask at end of interview", "smart interview questions to ask", "questions to ask interviewer", "interview questions to ask employer", "what questions to ask in job interview"],
  alternates: { canonical: "/blog/interview-questions-to-ask" },
  openGraph: { title: "Best Questions to Ask in a Job Interview — 30 Examples (2025)", description: "30 smart questions to ask at the end of a job interview — with what each one signals to the interviewer.", url: "/blog/interview-questions-to-ask" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";
const PUBLISHED = "2025-05-10";
const MODIFIED = "2025-05-16";

const CATEGORIES = [
  {
    heading: "Questions for the hiring manager",
    subhead: "These show strategic thinking and signal that you're evaluating the role seriously.",
    questions: [
      { q: "What does success look like in this role in the first 90 days?", why: "Shows you're thinking about performance from day one. Also gives you crucial information." },
      { q: "What are the biggest challenges the person in this role will face?", why: "Gets honest signal about the hardest parts of the job before you accept it." },
      { q: "How does this role contribute to the company's top priorities right now?", why: "Shows strategic awareness. Also helps you assess whether this role has real visibility." },
      { q: "What's the one thing you most want this hire to accomplish in year one?", why: "A direct, bold question that often gets the most honest answer of the whole interview." },
      { q: "How would you describe the management style on this team?", why: "Culture signal. The specificity of their answer tells you as much as the content." },
      { q: "What do you wish you'd known about this team before you joined?", why: "Invites honest reflection. Often surfaces real information that rehearsed answers don't." },
      { q: "How does the team make decisions? Who's in the room for major calls?", why: "Reveals whether your role will have real authority or be decorative." },
    ],
  },
  {
    heading: "Questions about the team and culture",
    subhead: "Ask these of any interviewer — they're especially powerful with future peers.",
    questions: [
      { q: "How does the team handle disagreements?", why: "The answer reveals the real culture better than any 'values' question." },
      { q: "What does a typical week look like for someone in this role?", why: "Practical, specific, useful. Hiring managers who struggle to answer this are a signal." },
      { q: "Who are the most successful people on this team and what do they have in common?", why: "Pattern recognition. Tells you what actually gets rewarded here." },
      { q: "What do people on the team do for fun outside of work?", why: "Optional — but good for culture assessment if you care about it." },
      { q: "How does this team give feedback — is it formal, informal, frequent?", why: "Feedback culture is the single best predictor of professional growth in a role." },
    ],
  },
  {
    heading: "Questions about growth and the future",
    subhead: "Signal long-term thinking and genuine investment in the company.",
    questions: [
      { q: "Where have people in this role typically gone in their career at this company?", why: "Shows you're thinking about trajectory. Also reveals whether this is a launching pad or a dead end." },
      { q: "What's the biggest opportunity this company hasn't fully capitalized on yet?", why: "Tests strategic thinking from the interviewer. Their answer tells you a lot about the company's ambition." },
      { q: "How has this role changed since it was created?", why: "Shows whether the company has evolved its thinking or is stuck in a static org structure." },
      { q: "What's one thing you'd change about this company if you could?", why: "Risky question — but powerful. An honest answer means you can trust the other answers too." },
    ],
  },
  {
    heading: "Questions to ask the recruiter",
    subhead: "Recruiters have different information than hiring managers. Use it.",
    questions: [
      { q: "How long has this position been open, and why?", why: "If it's been open a long time, find out why. High bar, unclear role, or culture issues all show up here." },
      { q: "What does the interview process look like from here?", why: "Practical. Sets expectations. Also shows you're ready to move." },
      { q: "Is there anything in my background that might be a concern for the hiring manager?", why: "Gives you a chance to address objections before they cost you the offer." },
      { q: "What do you think makes someone successful in your company's culture?", why: "Recruiters have seen the most candidates — their pattern recognition is valuable." },
    ],
  },
  {
    heading: "Questions never to ask",
    subhead: "These signal wrong priorities, low research, or desperation.",
    questions: [
      { q: "What does your company do?", why: "Disqualifying. You should know this before you walked in." },
      { q: "What's the salary?", why: "Wait until they bring it up or until late in the process. Asking early signals comp is your primary motivation." },
      { q: "How quickly can I get promoted?", why: "Sounds entitled before you've demonstrated anything. Ask about career paths instead." },
      { q: "Do you have any concerns about my background?", why: "Weak and invites a polite non-answer. Ask 'Is there anything I can clarify about my experience?' instead." },
    ],
  },
];

export default async function InterviewQuestionsToAskPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Best Questions to Ask in a Job Interview — 30 Examples (2025)"
        description="30 smart questions to ask at the end of a job interview — with what each one signals to the interviewer."
        url={`${BASE_URL}/blog/interview-questions-to-ask`}
        datePublished={PUBLISHED}
        dateModified={MODIFIED}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Interview Questions to Ask", url: `${BASE_URL}/blog/interview-questions-to-ask` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Interviews</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em]">Best Questions to Ask in a Job Interview — 30 Examples (2025)</h1>
          <p className="mt-5 text-[15px] text-white/50">Updated {MODIFIED} · 9 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-base max-w-none text-[var(--ink)]">
            <p className="lead text-[17px] leading-relaxed text-[var(--muted)]">
              &ldquo;Do you have any questions for us?&rdquo; is not a formality — it&apos;s an evaluation. Strong questions signal preparation, strategic thinking, and genuine interest. Weak questions (or &ldquo;no, I think you covered everything&rdquo;) signal the opposite.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">Always have 3-5 questions ready. Adapt them to the specific conversation — the best questions reference something discussed earlier in the interview. Here are 30 by category.</p>

            {CATEGORIES.map((cat) => (
              <div key={cat.heading}>
                <h2 className="mt-12 text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">{cat.heading}</h2>
                <p className="mt-3 text-[14px] text-[var(--muted)]">{cat.subhead}</p>
                <div className="mt-5 space-y-3">
                  {cat.questions.map((item) => (
                    <div key={item.q} className={`rounded-xl border p-4 ${cat.heading === "Questions never to ask" ? "border-red-100 bg-red-50/40" : "border-[var(--border)] bg-[var(--bg)]"}`}>
                      <p className={`mb-1.5 font-semibold ${cat.heading === "Questions never to ask" ? "font-mono text-[12px] text-red-600" : "text-[var(--ink)]"}`}>
                        {cat.heading === "Questions never to ask" ? `✗ "${item.q}"` : `"${item.q}"`}
                      </p>
                      <p className="text-[13px] leading-5 text-[var(--muted)]">{item.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <p className="mb-2 text-[17px] font-bold text-[var(--ink)]">Prepare for every interview question — free</p>
            <p className="mb-6 text-[14px] text-[var(--muted)]">Zari coaches you through every stage of the interview — including the questions you should ask at the end.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start interview prep free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
