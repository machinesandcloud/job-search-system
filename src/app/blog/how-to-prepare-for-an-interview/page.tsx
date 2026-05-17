import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Prepare for a Job Interview — Complete Guide (2025)",
  description:
    "Most candidates prepare by reviewing their resume and hoping for the best. The candidates who consistently land offers prepare differently: they research the company deeply, build role-specific answer libraries, and practice until delivery stops feeling rehearsed. A complete preparation system.",
  keywords: ["how to prepare for an interview", "job interview preparation", "interview prep tips 2025", "how to prepare for job interview", "interview preparation checklist", "what to do before a job interview"],
  alternates: { canonical: "/blog/how-to-prepare-for-an-interview" },
  openGraph: {
    title: "How to Prepare for a Job Interview — Complete Guide (2025)",
    description: "Most candidates review their resume and hope. Candidates who land offers research deeply, build answer libraries, and practice until delivery feels natural. The complete system.",
    url: "/blog/how-to-prepare-for-an-interview",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const PREPARATION_LAYERS = [
  {
    layer: "Company research — 1 week before",
    time: "3–4 hours",
    what: "Most candidates Google the company name and read the about page. Hiring managers can tell. Deep research means: understanding the business model (how they make money), recent performance (earnings calls, press releases, growth metrics), competitive context (who they're competing with and why they think they win), recent product or strategy moves, and what's publicly known about the team or function you'd be joining.",
    how_to: [
      "Read the company's 10-K or investor presentations if public; use Crunchbase, PitchBook, or CB Insights for startups",
      "Listen to the 2 most recent earnings calls — the Q&A section reveals what investors are worried about, which is often what leadership is focused on internally",
      "Read Glassdoor reviews from the last 12 months, filtering for current employees in your target function",
      "Find the LinkedIn profiles of your interviewers — note their backgrounds, tenure, and what they've shared publicly",
      "Read any press coverage from the last 6 months — both positive stories and critical coverage",
    ],
    output: "A 1-page brief with: company snapshot, 3 things that excite you about the company, 2 risks or challenges the company faces, and 2 questions that demonstrate this research.",
  },
  {
    layer: "Role analysis — 5 days before",
    time: "2 hours",
    what: "The job description is a map of every question you'll be asked. Most candidates read it once. The candidates who prepare well annotate it: matching every requirement to a specific example from their history and flagging any gaps that need to be addressed preemptively.",
    how_to: [
      "Print or paste the job description and highlight every requirement and 'nice to have'",
      "For each requirement: write a one-sentence example from your experience that demonstrates it",
      "For requirements you can't match directly: identify the closest adjacent experience and prepare a bridge ('I haven't done X specifically, but my experience with Y gave me...')",
      "Identify the 3 requirements that appear most important based on position in the JD, frequency of mention, and interview format hints",
      "Research the technical or domain knowledge areas mentioned — read 1-2 primary sources on any topic you're weak on",
    ],
    output: "A requirements-to-examples mapping table you can use to build your answer library.",
  },
  {
    layer: "Answer library — 4 days before",
    time: "4–6 hours",
    what: "Behavioral interviews ask you to prove skills with specific stories. The STAR method (Situation, Task, Action, Result) gives structure to those stories. The mistake is having the same 2–3 stories you tell for every question. The professionals who interview well have 8–12 distinct STAR stories ready, each demonstrating a different skill, and they match them dynamically to whatever question is asked.",
    how_to: [
      "Write 8–12 STAR stories covering: leadership without authority, handling conflict or failure, navigating ambiguity, driving a result under constraints, influencing stakeholders, learning quickly in a new area, managing competing priorities, receiving and acting on difficult feedback",
      "Each story should be 2–3 minutes when told aloud — not shorter (too thin) and not longer (loses the room)",
      "For technical roles: prepare worked examples or system design scenarios that you can walk through clearly",
      "For case interviews (consulting, strategy, some finance): practice 2–3 case frameworks until the structure is automatic",
    ],
    output: "A written answer library — 8–12 stories each with a headline (what skill it demonstrates), the 4 STAR components, and the key result number.",
  },
  {
    layer: "Mock practice — 2–3 days before",
    time: "2–3 hours across sessions",
    what: "Reading answers is not preparation. Speaking answers is preparation. Most candidates skip this step because it's uncomfortable to hear themselves stumble. But stumbling in practice is the whole point — you want to find the weak parts of your answers, the places where your timing is off, and the moments where you lose momentum before it happens in the real interview.",
    how_to: [
      "Practice your 5–6 most likely behavioral questions out loud — not silently, and not in your head",
      "Record yourself on your phone and watch it back — look for filler words ('um,' 'like,' 'you know'), rambling, and answers that run over 3 minutes",
      "Practice with a partner if possible — ideally someone who will ask follow-up questions rather than just listen passively",
      "Do at least one full mock interview with 45–60 minutes of questions in sequence, simulating the full interview pressure",
    ],
    output: "A list of the answers that still feel weak after practice — these get additional rehearsal time the day before.",
  },
  {
    layer: "Logistics and mindset — 1 day before",
    time: "30 minutes",
    what: "The day-before prep is underrated. Most of what goes wrong in interviews isn't content — it's logistics (tech failure, late arrival, wrong building) or mindset (anxiety that clouds thinking, blank-drawing on an easy question). Both are fully preventable.",
    how_to: [
      "For remote: test your camera, microphone, and internet connection. Know the video platform (Zoom, Teams, Google Meet) and have a backup (phone hotspot, headset ready)",
      "For in-person: confirm address, parking, and building entry. Plan to arrive 15 minutes early. Know who you're meeting and have their contact information",
      "Review your answer library once — not to memorize, but to refresh the key moments of each story",
      "Prepare your 3 best questions for the end of the interview — questions that demonstrate research and genuine curiosity, not questions about salary or vacation",
      "Sleep. The cognitive difference between 7 hours and 5 hours of sleep is measurable and will show in how you think under pressure",
    ],
    output: "Confirmed logistics + 3 smart closing questions ready.",
  },
];

const COMMON_MISTAKES = [
  { mistake: "Only preparing for questions you expect", fix: "Prepare for the questions you don't expect — especially 'Tell me about a failure,' 'Describe a conflict with a manager,' and 'Why are you leaving your current role?' These are guaranteed to be asked and the least-prepared candidates stumble on them." },
  { mistake: "Memorizing answers instead of owning them", fix: "Memorized answers sound memorized. Know the structure and the key beats of each story — situation, what you specifically did, the result — without scripting every word. The delivery should feel fluent, not recited." },
  { mistake: "Asking no questions or asking generic questions", fix: "'What does success look like in the first 90 days?' and 'What's the biggest challenge the team is currently facing?' are strong. 'What's the company culture like?' and 'What do you like about working here?' are weak and signal shallow preparation." },
  { mistake: "Not researching the interviewers specifically", fix: "30 minutes on the LinkedIn profiles of your interviewers changes the dynamic. You can reference their work, frame questions around their experience, and calibrate your answers to their background. Interviewers who feel seen engage more." },
];

const FAQS = [
  { question: "How many days before should you start preparing for an interview?", answer: "For a standard screening call: 1–2 days is sufficient. For a full interview loop (multiple rounds with different interviewers): start 1 week out. Spread preparation across multiple shorter sessions — 2–3 hours per day — rather than cramming everything the night before. Spaced practice across several days produces better recall and more natural delivery than a single marathon session. The day before should be light review and logistics, not first-time preparation." },
  { question: "How do you prepare for unexpected interview questions?", answer: "The key is building a flexible answer library rather than scripted responses. When you have 8–12 strong STAR stories prepared, you can mix and match them to almost any behavioral question — 'Tell me about a time you had a conflict with a teammate' and 'Tell me about a time you demonstrated leadership' might both be answered with the same underlying story, just with different emphasis. For truly unexpected questions: pause, say 'let me think about that for a moment,' and think about which of your prepared stories comes closest. Interviewers rarely mind a 5-second pause — they do mind rambling answers that go nowhere." },
  { question: "What should you bring to a job interview?", answer: "For in-person interviews: 5 copies of your resume (more than you expect to need), a notepad and pen for taking notes, a copy of the job description with your annotations, a list of your references, and any portfolio work samples relevant to the role. For remote interviews: your resume open on a second monitor or printed beside you, your STAR story notes nearby (out of camera view), the job description, a glass of water, and your 3–5 closing questions written down. Knowing you have your notes nearby reduces anxiety even if you never look at them." },
];

export default async function HowToPrepareForAnInterviewPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Prepare for a Job Interview — Complete Guide (2025)"
        description="Most candidates review their resume and hope. Candidates who land offers research deeply, build answer libraries, and practice until delivery feels natural. The complete system."
        url={`${BASE_URL}/blog/how-to-prepare-for-an-interview`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Prepare for an Interview", url: `${BASE_URL}/blog/how-to-prepare-for-an-interview` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Interview Prep · Complete Guide</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Prepare for an Interview</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most candidates review their resume and hope for the best. The ones who consistently get offers research the company deeply, build a library of role-specific answers, and practice until delivery stops feeling rehearsed.
          </p>
        </div>
      </section>

      {/* Preparation layers */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 5-layer preparation system</h2>
          <div className="mt-6 space-y-5">
            {PREPARATION_LAYERS.map((layer, i) => (
              <div key={layer.layer} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex items-start gap-4 mb-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[14px] font-extrabold text-white">{i + 1}</span>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{layer.layer}</p>
                    <p className="text-[11px] text-[var(--muted)] mt-0.5">Time investment: {layer.time}</p>
                  </div>
                </div>
                <p className="text-[13.5px] leading-6 text-[var(--muted)] mb-3">{layer.what}</p>
                <div className="rounded-xl bg-[var(--bg)] p-4 mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">How to do it</p>
                  <ul className="space-y-1.5">
                    {layer.how_to.map((step, j) => (
                      <li key={j} className="flex gap-2 text-[12.5px] leading-5 text-[var(--muted)]">
                        <span className="text-[var(--brand)] font-bold flex-shrink-0">→</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-emerald-50 p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1">Output</p>
                  <p className="text-[12.5px] text-[var(--muted)]">{layer.output}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Mistakes that cost offers</h2>
          <div className="mt-6 space-y-3">
            {COMMON_MISTAKES.map((item) => (
              <div key={item.mistake} className="rounded-xl border border-[var(--border)] p-5">
                <div className="flex gap-3 mb-2">
                  <span className="text-red-500 font-bold flex-shrink-0">✗</span>
                  <p className="font-bold text-[var(--ink)] text-[13.5px]">{item.mistake}</p>
                </div>
                <div className="flex gap-3 ml-6">
                  <span className="text-emerald-500 font-bold flex-shrink-0">✓</span>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{item.fix}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Zari builds your interview answer library from the job description — then coaches you through practice.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari generates role-specific questions from the job posting, evaluates your STAR answers, and coaches you through every behavioral and technical question you&apos;re likely to face. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
