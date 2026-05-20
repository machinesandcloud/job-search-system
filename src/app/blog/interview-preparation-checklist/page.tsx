import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Interview Preparation Checklist 2025 — Week-by-Week Plan to Land the Offer",
  description:
    "A complete interview preparation checklist covering company research, behavioral prep, technical prep, logistics, and follow-up. Week-by-week plan from first contact to offer.",
  keywords: [
    "interview preparation checklist",
    "interview prep checklist",
    "how to prepare for a job interview",
    "interview preparation tips",
    "job interview checklist",
    "interview preparation guide 2025",
    "behavioral interview preparation",
    "technical interview preparation checklist",
    "what to do before a job interview",
    "interview prep plan",
  ],
  alternates: { canonical: "/blog/interview-preparation-checklist" },
  openGraph: {
    title: "Interview Preparation Checklist 2025 — Week-by-Week Plan",
    description: "Complete checklist: company research, behavioral prep, technical prep, logistics, and follow-up. From first contact to offer.",
    url: "/blog/interview-preparation-checklist",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "How many days before an interview should I start preparing?",
    answer: "Ideally 7–14 days for a senior role. For an initial screen, 2–3 days of targeted prep is enough. For a full loop or assessment centre, 2 weeks gives you enough time to complete company research, prepare 8–10 behavioral stories, practise technical questions (if applicable), and run mock interview sessions. Cramming the night before is the most common interview mistake.",
  },
  {
    question: "What's the most important thing to research before an interview?",
    answer: "The company's current strategic priorities and how your target role connects to them. Most candidates research what the company does but not where it's going. Find a recent earnings call, a founder interview, or a recent product announcement and understand what the company is trying to achieve in the next 12–18 months. Then frame your answers as someone who helps achieve that mission.",
  },
  {
    question: "How many behavioral stories do I need?",
    answer: "8–10 versatile stories is enough to cover all major competency areas. Each story should cover multiple frameworks: a good 'conflict' story can also serve as a 'leadership' or 'decision-making' story. Tag each story against the frameworks it demonstrates, and practise adapting them to different question formats. Don't memorise word-for-word — know the arc.",
  },
  {
    question: "What should I do the night before an interview?",
    answer: "Light review, not cramming. Re-read your 5 strongest behavioral stories. Skim the company's LinkedIn page for recent news. Confirm logistics: time zone, dial-in link, recruiter contact. Lay out your clothes or test your tech. Sleep 7–8 hours. The night before is not the time to learn new material — it's the time to let what you know settle.",
  },
];

const WEEKS = [
  {
    week: "14+ days before",
    title: "Research phase",
    color: "#7C3AED",
    items: [
      "Read the full job description 3 times. Highlight keywords and required competencies.",
      "Research the company: mission, product, recent news, business model, competitors.",
      "Find recent interviews or talks by the CEO/founder — what's the strategic focus?",
      "Research your interviewers on LinkedIn if you know their names.",
      "Join relevant communities (LinkedIn, Reddit, Glassdoor) to find recent interview reports.",
      "Map the company's interview process — number of rounds, format, known frameworks.",
    ],
  },
  {
    week: "7–14 days before",
    title: "Story preparation",
    color: "#0A66C2",
    items: [
      "Write out 8–10 behavioral stories using the STAR framework (Situation, Task, Action, Result).",
      "For each story, tag which competencies it covers (leadership, conflict, failure, innovation, etc.).",
      "Prepare your 'Tell me about yourself' answer — 90-second career arc with forward hook.",
      "Prepare 3 'Why this company?' points that are specific and research-backed.",
      "Prepare 3 'Why this role?' points connected to your career trajectory.",
      "Prepare your salary expectation range using real market data.",
    ],
  },
  {
    week: "3–7 days before",
    title: "Practice & mock sessions",
    color: "#059669",
    items: [
      "Run at least 2 mock behavioral interview sessions out loud — not just in your head.",
      "For technical roles: complete 10–15 relevant practice problems or case studies.",
      "Record yourself answering the top 5 questions for your role. Watch it back.",
      "Time your STAR answers — they should be 90–120 seconds each, no longer.",
      "Prepare 5 intelligent questions to ask interviewers (not HR questions — strategic ones).",
      "Get feedback on a practice session from Zari's mock interview coach.",
    ],
  },
  {
    week: "1–2 days before",
    title: "Logistics & final prep",
    color: "#D97706",
    items: [
      "Confirm the interview time and time zone with the recruiter.",
      "Test your video/audio setup if it's a remote interview.",
      "Print or have your resume open on a separate screen.",
      "Prepare a notepad for taking notes during the interview.",
      "Skim your top 5 behavioral stories one last time.",
      "Read recent company news or product updates — something to reference.",
    ],
  },
  {
    week: "Interview day",
    title: "On the day",
    color: "#DC2626",
    items: [
      "Log in or arrive 5 minutes early, not 30.",
      "Have your resume and key notes visible (for virtual: on a second screen, not printout).",
      "Drink water before — you'll need it during long loops.",
      "Listen fully before answering. A 2-second pause is fine. Rushing looks nervous.",
      "Ask your prepared questions. Interviewers remember candidates who ask smart questions.",
      "Note any names and details mentioned — useful for follow-up.",
    ],
  },
  {
    week: "Within 24h after",
    title: "Follow-up",
    color: "#0D7182",
    items: [
      "Send a personalised thank-you email to each interviewer within 24 hours.",
      "Reference a specific conversation topic from the interview — not a generic template.",
      "If you felt a question went poorly, a brief follow-up via email can address it.",
      "Reflect on what went well and what you'd improve. Document it.",
      "Follow up with the recruiter if you haven't heard within the stated timeline.",
    ],
  },
];

export default async function InterviewPreparationChecklistPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Interview Preparation Checklist 2025"
        description="Complete week-by-week interview preparation checklist covering research, behavioral prep, technical prep, and follow-up."
        url={`${BASE_URL}/blog/interview-preparation-checklist`}
        datePublished="2025-05-20"
        dateModified="2025-05-20"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: "Interview Preparation Checklist", url: `${BASE_URL}/blog/interview-preparation-checklist` },
        ]}
      />

      <section
        className="relative overflow-hidden pb-16 pt-14 text-white"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0D7182 50%, #052830 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Interview Prep</span>
            <span className="text-[12px] text-white/35">12 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Interview Preparation Checklist 2025
          </h1>
          <p className="mt-4 text-[14px] font-bold uppercase tracking-wider text-white/40">Week-by-Week Plan from Offer Invite to Signed Contract</p>
          <p className="mt-3 text-[15px] leading-7 text-white/50">
            Most candidates do 20% of the prep and wonder why they don&apos;t get offers. This checklist covers every phase — company research, behavioral prep, technical readiness, logistics, and follow-up.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={75} suffix="%" label="of candidates don't complete thorough company research" accent="#0D7182" />
            <StatCard value={8} label="behavioral stories covers all major interview frameworks" accent="#7C3AED" />
            <StatCard value={2} suffix="×" label="more offers when candidates ask thoughtful questions" accent="#059669" />
            <StatCard value={14} label="days is the ideal prep window for a full loop" accent="#DC2626" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-8 text-[1.7rem] font-extrabold tracking-[-0.02em]">The complete checklist — phase by phase</h2>

          <div className="space-y-6 mb-14">
            {WEEKS.map(({ week, title, color, items }) => (
              <div key={week} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center gap-3 border-b border-[var(--border)] p-4" style={{ background: `${color}08` }}>
                  <div className="h-3 w-3 rounded-full flex-shrink-0" style={{ background: color }} />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color }}>{week}</div>
                    <div className="font-extrabold text-[15px]">{title}</div>
                  </div>
                </div>
                <div className="p-4 bg-[var(--bg)]">
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 flex-shrink-0 rounded border border-[var(--border)] bg-white" />
                        <p className="text-[13px] leading-6 text-[var(--muted)]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">The 5 most underrated interview prep tasks</h2>
          <div className="mb-12 space-y-3">
            {[
              { num: "1", tip: "Record yourself answering questions", detail: "Nobody knows how they sound until they hear themselves. Filler words, rushed delivery, and vague answers are invisible until recorded. Watch 2 recordings and your self-awareness jumps immediately." },
              { num: "2", tip: "Research your interviewers, not just the company", detail: "Check each interviewer's LinkedIn. What did they work on before? What articles have they written? A question like 'I noticed you worked on the payments rewrite in 2022 — what was the most surprising challenge?' signals preparation that generic candidates don't do." },
              { num: "3", tip: "Prepare smart questions — not HR questions", detail: "Not 'what does success look like in this role?' That's an HR question. Instead: 'What's the biggest open problem the team is trying to solve right now that I'd be working on?' Specific, substantive, shows genuine interest." },
              { num: "4", tip: "Know your salary range before the first call", detail: "Salary questions come early, sometimes in the first screening call. Know your number, range, and the market data backing it before you pick up the phone. Being unprepared here costs you thousands." },
              { num: "5", tip: "Practise STAR answers out loud, not in writing", detail: "Writing your stories is step 1. Speaking them fluently is step 2. The gap is larger than you expect. Run at least 3 spoken practice sessions — with a partner, Zari, or into a recording." },
            ].map(({ num, tip, detail }) => (
              <div key={num} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#0D7182]/10 text-[14px] font-extrabold text-[#0D7182]">{num}</div>
                <div>
                  <div className="mb-1 font-bold text-[14px]">{tip}</div>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{detail}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold tracking-[-0.02em]">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0D7182 100%)" }} className="py-16 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold tracking-[-0.02em]">Reading is prep. Practicing is readiness.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari runs full mock interview simulations — behavioral, technical, and panel formats — with STAR scoring and specific language feedback. Practice until your answers feel automatic.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/platform" className="rounded-xl bg-white px-6 py-3 text-[14px] font-extrabold text-[#0D7182]">Start mock interview free</Link>
            <Link href="/ai-interview-coach" className="rounded-xl border border-white/20 bg-white/[0.08] px-6 py-3 text-[14px] font-semibold text-white">Interview Coach →</Link>
          </div>
          <p className="mt-4 text-[12px] text-white/30">
            Related:{" "}
            <Link href="/blog/behavioral-interview-questions" className="hover:underline text-white/50">Behavioral questions</Link>
            {" · "}
            <Link href="/blog/star-method-interview" className="hover:underline text-white/50">STAR method guide</Link>
            {" · "}
            <Link href="/blog/common-interview-questions" className="hover:underline text-white/50">Common interview questions</Link>
          </p>
        </div>
      </section>
    </PageFrame>
  );
}
