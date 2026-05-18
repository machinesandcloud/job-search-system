import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { WinScore } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Zari vs ChatGPT for Career Coaching — What's the Real Difference? (2025)",
  description:
    "ChatGPT can help with resume writing and interview prep — if you know exactly how to prompt it. Zari is built specifically for career coaching with session memory, ATS scoring, and STAR evaluation built in.",
  keywords: ["Zari vs ChatGPT", "ChatGPT for career coaching", "ChatGPT resume writing", "ChatGPT interview prep", "ChatGPT career advice 2025", "AI career coach vs ChatGPT", "ChatGPT for job search", "is ChatGPT good for resumes"],
  alternates: { canonical: "/compare/zari-vs-chatgpt" },
  openGraph: {
    title: "Zari vs ChatGPT for Career Coaching (2025)",
    description: "ChatGPT is a general AI that can do career tasks with skilled prompting. Zari is built specifically for career coaching — no prompting required.",
    url: "/compare/zari-vs-chatgpt",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "Can ChatGPT really help with resumes and interview prep?",
    answer: "Yes — with the right prompts. The problem is most people don't know what 'the right prompts' look like for career work. Ask ChatGPT to 'improve my resume' and you get generic suggestions. Ask it to 'act as a senior hiring manager reviewing this resume against this JD, identify the top 5 ATS keyword gaps, and rewrite the 3 weakest bullets in STAR format with quantified impact' — and you get something useful. Zari does that setup automatically. You just talk to it.",
  },
  {
    question: "What does Zari do that ChatGPT can't?",
    answer: "Zari was built specifically for job search coaching — it has built-in session memory that knows your background across conversations, ATS scoring that compares your resume directly against a specific JD, STAR structure evaluation on your interview answers, and LinkedIn visibility scoring. You don't have to explain your career history every time, configure it for ATS analysis, or construct prompts to get career-relevant output. It already knows the job.",
  },
  {
    question: "Is ChatGPT free and Zari paid?",
    answer: "ChatGPT has a free tier (GPT-3.5) and a Plus tier (~$20/month for GPT-4). Zari has a free tier that includes one session on every coaching surface — resume, LinkedIn, interview, and negotiation — with paid plans for unlimited access. Both have accessible entry points.",
  },
  {
    question: "Should I use both?",
    answer: "They're complementary rather than competitive. Use ChatGPT for general writing, brainstorming, drafting emails, and tasks that don't require career-specific context. Use Zari when you need focused career coaching: ATS analysis, mock interviews with structured feedback, LinkedIn optimization, and negotiation prep. The session memory and career-specific defaults in Zari reduce the overhead that makes ChatGPT frustrating for career work.",
  },
  {
    question: "Doesn't ChatGPT have memory now too?",
    answer: "ChatGPT added memory features, but they're different from Zari's session context. Zari's memory is structured around career coaching — it knows your target role, your resume content, which interviews you've practiced, your salary target. ChatGPT's memory is general-purpose recall. The career-specific context means Zari can ask relevant follow-up questions without you re-establishing context every time.",
  },
];

const DIMENSIONS = [
  {
    category: "ATS Resume Scoring",
    chatgpt: "ChatGPT can analyze your resume against a job description, but only if you construct the right prompt and include both texts. A well-crafted prompt might yield useful keyword gap analysis — but you need to know what to ask, how to format the request, and then interpret generic output as ATS-specific advice.",
    zari: "ATS scoring is a built-in function. Paste your resume and JD, and Zari automatically produces a match rate, identifies keyword gaps by category, and prioritizes which gaps matter most for this specific role. No prompt engineering required.",
    winner: "zari",
    winnerNote: "The difference is whether the setup work falls on you or on the tool.",
  },
  {
    category: "Resume Bullet Rewrites",
    chatgpt: "ChatGPT can rewrite resume bullets effectively with a good prompt: 'Rewrite this bullet to include [keyword], add a quantified metric, and start with a strong action verb.' Without that level of specificity in the prompt, it produces generic improvements.",
    zari: "Produces rewrites with specificity baked in — it knows the target JD, your level, and what a strong bullet in this role category looks like. You describe what you did; Zari writes the optimized version. The coaching conversation extracts details most people forget to include.",
    winner: "zari",
    winnerNote: "Both can produce strong rewrites. Zari requires less expertise to get there.",
  },
  {
    category: "Interview Coaching",
    chatgpt: "ChatGPT can role-play as an interviewer and give feedback on your answers — but you have to set that up explicitly each conversation, provide your target role, and prompt for STAR evaluation specifically. The output is often 'here's a stronger version' rather than 'here's why your answer lost the interviewer at the R in STAR.'",
    zari: "STAR evaluation is a built-in function. Zari evaluates your answer against the framework, identifies where you were vague (usually the Result), and gives targeted feedback on what's weak rather than just rewriting the answer. Session memory means it knows which question types you consistently struggle with.",
    winner: "zari",
    winnerNote: "Structured interview coaching vs. ad hoc conversation produce different quality of preparation.",
  },
  {
    category: "Session Memory",
    chatgpt: "ChatGPT has memory features, but they're general-purpose. You have to re-explain your career context in new conversations, and the memory doesn't have structured awareness of your resume, target role, or coaching history.",
    zari: "Session memory is structured around career coaching. Zari knows your target role, your resume, which sessions you've completed, what skills you've said you have, and which areas you've been coached on. Context carries forward without re-establishment.",
    winner: "zari",
    winnerNote: "Career coaching without persistent context means starting over every session.",
  },
  {
    category: "LinkedIn Optimization",
    chatgpt: "Can review and rewrite your LinkedIn headline, About section, and experience bullets with good prompts. Similar to resume work — useful output is available but requires prompt expertise.",
    zari: "LinkedIn optimization is a dedicated surface — analyzes your profile for keyword gaps against your target role and produces headline, About, and experience rewrites optimized for recruiter search visibility.",
    winner: "zari",
    winnerNote: "Dedicated surface vs. general capability means Zari produces more relevant output with less effort.",
  },
  {
    category: "Salary Negotiation",
    chatgpt: "Can help you prepare for salary negotiation with good setup: 'Role play as a recruiter who says the offer is firm. I'll counter. Give me feedback after.' That's useful. Again — you have to know to set it up that way.",
    zari: "Salary negotiation is a dedicated coaching surface with built-in role-play scenarios, counter-offer strategy, and feedback on specific tactics. Covers salary, equity, signing bonus, and remote work flexibility.",
    winner: "zari",
    winnerNote: "The setup overhead consistently favors the purpose-built tool for regular use.",
  },
  {
    category: "General Flexibility",
    chatgpt: "ChatGPT can do almost anything: write emails, debug code, explain concepts, help with non-career tasks. It's a general-purpose intelligence tool. If you need something outside career coaching, Zari won't help.",
    zari: "Zari is focused specifically on career coaching. It doesn't do email writing, code review, or general research. The narrow scope is a tradeoff — depth over breadth.",
    winner: "chatgpt",
    winnerNote: "General-purpose AI beats specialized tools on breadth. Specialized beats general on depth.",
  },
  {
    category: "Cost",
    chatgpt: "Free tier (GPT-3.5) or Plus at $20/month (GPT-4). For pure resume and interview work, free GPT-3.5 with good prompts can get you surprisingly far.",
    zari: "Free first session on all coaching surfaces. Paid plans start lower than ChatGPT Plus and are purpose-built for career coaching. At comparable price points, Zari produces more actionable career output per session.",
    winner: "tie",
    winnerNote: "Both are accessible at similar price points. The comparison is ROI per session, not raw cost.",
  },
];

export default async function ZariVsChatGPTPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Compare", url: `${BASE_URL}/compare` },
        { name: "Zari vs ChatGPT", url: `${BASE_URL}/compare/zari-vs-chatgpt` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Link href="/compare" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All comparisons
          </Link>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">Head-to-Head</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Zari vs ChatGPT</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55">
            ChatGPT can do career coaching work — with the right prompts. Zari was built specifically for career coaching, so it does that work by default. The real difference isn&apos;t capability, it&apos;s the prompting overhead and career-specific depth.
          </p>

          <div className="mt-8 flex justify-center">
            <WinScore zariWins={6} total={8} competitorName="ChatGPT" />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/40">ChatGPT is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "General writing, brainstorming, and research outside career topics",
                  "Skilled users who know how to prompt for specific career outputs",
                  "Non-career tasks like emails, code, and explanations",
                  "People who want maximum general-purpose flexibility",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/70">
                    <span className="mt-0.5 text-white/40">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/[0.08] p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]/70">Zari is better for</p>
              <ul className="mt-3 space-y-2">
                {[
                  "ATS analysis, resume rewrites, and LinkedIn optimization — built-in, no setup",
                  "Structured interview coaching with STAR evaluation and session memory",
                  "Salary negotiation simulation with career-specific context",
                  "Anyone who doesn't want to prompt-engineer their way to good career advice",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/80">
                    <span className="mt-0.5 text-[var(--brand)]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Prompting overhead */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The prompting overhead problem</h2>
          <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
            ChatGPT is highly capable for career work, but the output quality depends almost entirely on how well you frame the request. Compare these two interactions:
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-[var(--border)] bg-white p-5">
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-2">What most people type into ChatGPT</p>
              <p className="text-[13.5px] leading-6 text-[var(--ink)] bg-slate-50 rounded-lg px-4 py-3 border border-slate-100 font-mono">
                &ldquo;Improve my resume for a product manager role at a tech company.&rdquo;
              </p>
              <p className="mt-3 text-[13px] text-[var(--muted)]">Result: generic tips about action verbs and metrics. The same feedback every PM resume gets.</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-white p-5">
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-2">What actually gets useful output from ChatGPT</p>
              <p className="text-[13.5px] leading-6 text-[var(--ink)] bg-slate-50 rounded-lg px-4 py-3 border border-slate-100 font-mono text-[12px]">
                &ldquo;You are a senior ATS specialist and hiring manager with 15 years at B2B SaaS companies. Here is my current resume: [paste]. Here is the job description: [paste]. Identify the top 5 keyword gaps that will cause this resume to score below 70% in ATS, then rewrite the 3 experience bullets most likely to get me rejected — using STAR format, quantified impact, and language from the JD.&rdquo;
              </p>
              <p className="mt-3 text-[13px] text-[var(--muted)]">Result: actually useful. But most job seekers don&apos;t know to write prompts this way.</p>
            </div>
          </div>
          <p className="mt-6 text-[14px] leading-7 text-[var(--muted)]">
            Zari does the setup in the second prompt automatically. You paste your resume and the JD — it does the ATS comparison, identifies the gaps, and asks you targeted questions to produce the rewrites. No prompt engineering required.
          </p>
        </div>
      </section>

      {/* Dimension breakdown */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Feature-by-feature breakdown</h2>
          <p className="mt-3 text-[15px] text-[var(--muted)]">Where each tool genuinely wins — including where ChatGPT comes out ahead.</p>

          <div className="mt-10 space-y-6">
            {DIMENSIONS.map((dim) => (
              <div key={dim.category} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                  <p className="font-bold text-[var(--ink)]">{dim.category}</p>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    dim.winner === "zari" ? "bg-[var(--brand)]/10 text-[var(--brand)]" :
                    dim.winner === "chatgpt" ? "bg-slate-100 text-slate-500" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                    {dim.winner === "zari" ? "Zari wins" : dim.winner === "chatgpt" ? "ChatGPT wins" : "Tie"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">ChatGPT</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.chatgpt}</p>
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Zari</p>
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.zari}</p>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-3">
                  <p className="text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">Bottom line: </span>{dim.winnerNote}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-amber-100 bg-amber-50/40 p-8">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">The honest verdict</h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              ChatGPT is a powerful general AI. Skilled users who know how to prompt effectively can get very good career coaching output from it — and that&apos;s worth acknowledging.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The gap is that most people don&apos;t know how to prompt for career work at that level of specificity — and shouldn&apos;t have to. The prompting overhead, the lack of career-specific memory, and the absence of built-in structures like STAR evaluation make ChatGPT a capable but inefficient tool for job search coaching.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Zari eliminates that overhead. ATS scoring, STAR evaluation, session memory, and LinkedIn optimization are baked in — you bring your career context and Zari knows what to do with it. For job seekers who want focused coaching without the setup friction, that&apos;s the meaningful difference.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-8 space-y-4">
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
      <section className="noise-overlay relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg,#052830 0%,var(--brand) 45%,var(--dark) 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">Career coaching without the prompt engineering.</h2>
          <p className="mx-auto mt-4 text-[16px] text-white/55">ATS scoring, resume rewrites, interview coaching, and salary negotiation — built in. Free to start.</p>
          <div className="mt-8">
            <Link href={userId ? "/dashboard" : "/signup"} className="group inline-flex h-13 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[var(--brand)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
