import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Product Manager Interview Questions — The 4 Categories With Strong Answers (2025)",
  description:
    "PM interviews have 4 distinct question types: product design, product estimation, product strategy, and behavioral. Here's what each tests, strong answer frameworks, and the mistakes that eliminate candidates at every stage.",
  keywords: ["product manager interview questions", "PM interview questions", "product manager interview prep", "how to prepare for PM interview", "product design interview questions", "product estimation questions", "product strategy interview", "PM behavioral interview"],
  alternates: { canonical: "/blog/product-manager-interview-questions" },
  openGraph: {
    title: "Product Manager Interview Questions — 4 Categories With Strong Answers (2025)",
    description: "Product design, estimation, strategy, and behavioral — what each PM question type tests and how to answer each one well.",
    url: "/blog/product-manager-interview-questions",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const QUESTION_TYPES = [
  {
    type: "Product Design",
    accent: "#7C3AED",
    whatItTests: "Your ability to structure ambiguous problems, identify users, define their needs, generate solutions, and prioritize — all in real time. Interviewers are watching your process, not just your output.",
    exampleQ: "Design a product for elderly people to stay connected with their grandchildren.",
    framework: [
      "Clarify scope — ask if there are constraints (platform, market, existing product context). Don't assume.",
      "Define users — identify 2–3 specific user segments with different needs. 'Elderly people' is too broad. '72-year-old retired teacher who is comfortable with smartphones' is a user.",
      "Surface pain points — for each user, list their specific frustrations with current alternatives.",
      "Prioritize one user — explain why and move forward with that choice explicitly.",
      "Generate solutions — brainstorm 4–5 ideas without filtering. Then explicitly prioritize with criteria (impact, feasibility, novelty).",
      "Define success — what metrics would tell you the product is working? Name 1 north star and 2 supporting metrics.",
    ],
    commonMistake: "Jumping to solution before defining the user. Interviewers will let you do this and then score you lower for the lack of structure. The 3 minutes you spend defining the user before ideating is the most differentiating part of the answer.",
    strongSignal: "Naming a specific, real-feeling user ('my 68-year-old mother-in-law who uses WhatsApp but doesn't understand video calling') grounds the entire answer. Abstract users produce abstract solutions.",
  },
  {
    type: "Product Estimation",
    accent: "#0891B2",
    whatItTests: "Your ability to structure numerical problems, make defensible assumptions, break down complex quantities, and sanity-check your own answers. The exact number matters less than the approach.",
    exampleQ: "How many piano tuners are there in Chicago?",
    framework: [
      "State your approach upfront — 'I'll estimate the number of pianos in Chicago, then estimate how often they need tuning, then estimate how much work one tuner can do per year.'",
      "Work top-down from known anchors — population of Chicago (~2.7M people), average household size (~2.5), so ~1M households.",
      "Layer in reasonable assumptions — '1 in 10 households has a piano' → 100K pianos. Add institutions (schools, churches, bars) → maybe 120K total.",
      "Estimate demand — pianos tuned once per year = 120K tunings/year.",
      "Estimate supply — a tuner does ~4 tunings/day × 250 working days = 1,000 tunings/year.",
      "Divide — 120K ÷ 1,000 = approximately 120 piano tuners.",
      "Sanity check — does this feel right? Google says ~200. You're in the right order of magnitude. That's the goal.",
    ],
    commonMistake: "Getting stuck on 'I don't know the exact number.' Estimation questions aren't knowledge tests — they're process tests. State your assumption, make it explicit, and move forward. Every assumption can be wrong by 2x and the answer is still useful.",
    strongSignal: "Narrating your reasoning continuously — 'I'm going to assume X because Y, which gives me Z' — is what separates PM candidates who score well on estimation from those who don't. Silence during estimation reads as confusion.",
  },
  {
    type: "Product Strategy",
    accent: "#D97706",
    whatItTests: "Your ability to think about market dynamics, competitive position, user psychology, and long-term product bets. These questions have no single right answer — interviewers are evaluating the quality of your reasoning and the depth of your mental models.",
    exampleQ: "Google enters the ride-sharing market. How does Uber respond?",
    framework: [
      "Understand the threat — what does Google bring that Uber doesn't have? (Maps data, Android distribution, DeepMind for autonomous, Google Pay, brand trust with advertisers.) This sets the competitive stakes.",
      "Segment the impact — where does Google's entry hurt most? (Urban markets where Maps is dominant, not suburban/rural where Uber's network effects are weaker.)",
      "Evaluate Uber's moats — what does Uber have that Google doesn't? (Two-sided network effects, driver relationships, global operations, pricing elasticity data, 10+ years of routing optimization.)",
      "Generate strategic responses — partnerships (lock in Google Maps before they launch own service), preemptive autonomous vehicle investment, international markets where Google Maps is weaker, lobbying on regulatory complexity.",
      "Recommend one — make a call. 'If I were Uber's CPO, I would prioritize locking in mapping partnerships with Apple, HERE, and TomTom to reduce Google Maps dependency while accelerating AV investment.' Opinion is a positive signal in strategy questions.",
    ],
    commonMistake: "Giving both sides without making a call. Interviewers want to see judgment, not a balanced summary. Being wrong with a clear reason is better than being vague with no position.",
    strongSignal: "Using specific competitive moats (network effects, switching costs, data advantages) rather than generic strategy language ('focus on customer experience'). The vocabulary you use signals PM fluency.",
  },
  {
    type: "Behavioral / Leadership",
    accent: "#059669",
    whatItTests: "Specific past behavior as a predictor of future performance. PM behavioral questions probe for: cross-functional influence, prioritization under constraint, stakeholder management, product failures, and customer empathy.",
    exampleQ: "Tell me about a time you had to ship a product with less than ideal resources.",
    framework: [
      "Situation — what was the product, what was the constraint (time, budget, team size), and what was at stake? Be specific with context.",
      "Decision — what did you cut, why, and how did you decide? This is the core of the answer. PM interviewers want to see your prioritization logic.",
      "Execution — what did you do to ship within the constraint? Who did you align with and how?",
      "Result — what shipped, what was the reception, and what would you do differently? Quantify if possible.",
      "Learning — one sentence on what you'd do differently. This signals self-awareness and growth.",
    ],
    commonMistake: "Telling a team story in a PM behavioral interview. 'We decided,' 'our team built,' 'we shipped' — interviewers cannot assess your specific contribution. Use 'I decided,' 'I prioritized,' 'I convinced.' If the team did it, explain specifically what you did within the team.",
    strongSignal: "Connecting the behavioral answer to a product outcome. 'We shipped on time and hit our launch target of X users in 30 days' is a strong close. 'It went well' is not.",
  },
];

const FAQS = [
  { question: "How are PM interviews different from engineering interviews?", answer: "Engineering interviews test specific technical skills — coding, system design, algorithmic thinking. PM interviews test judgment, communication, and product thinking — skills that are harder to evaluate objectively. Because PM interviews are more subjective, calibration matters: different interviewers score the same answer differently. Strong PMs understand this and frame answers in ways that make the quality of their thinking explicitly visible — rather than assuming it's obvious from the content." },
  { question: "How do you prepare for product design questions?", answer: "Practice the structured format until it's automatic: clarify → user → pain points → prioritize → ideate → prioritize solutions → metrics. Time yourself — a good product design answer takes 15–20 minutes in an interview. Practice with real products: 'Design a feature for Gmail to reduce email anxiety.' 'Redesign the airport security experience.' The question type is predictable; the practice is in applying the structure quickly to any domain." },
  { question: "What companies ask the hardest PM interview questions?", answer: "Meta, Google, and Amazon have the most rigorous and structured PM interview processes. Meta's PM interviews heavily emphasize product sense and data-driven decision-making. Google's APM program has extremely competitive behavioral and product design rounds. Amazon's PM interviews are structured around their Leadership Principles — the same LP system as engineering, applied to product decisions. Smaller, fast-growing companies often have less structured PM interviews but evaluate product thinking more holistically through take-home exercises or extended conversations." },
  { question: "How long should PM interview answers be?", answer: "Product design and strategy answers: 12–20 minutes. These need room to develop. Estimation answers: 5–8 minutes — efficient and structured. Behavioral answers: 3–5 minutes per STAR story. The most common PM interview mistake is rushing — candidates give abbreviated answers because they're nervous and then get scored low on depth. Better to ask 'Do you want me to go deeper on any part of this?' than to rush through everything." },
];

export default async function ProductManagerInterviewQuestionsPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Product Manager Interview Questions — The 4 Categories With Strong Answers (2025)"
        description="Product design, estimation, strategy, and behavioral — what each PM question type tests and how to answer each one."
        datePublished="2025-05-01"
        url={`${BASE_URL}/blog/product-manager-interview-questions`}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Product Manager Interview Questions", url: `${BASE_URL}/blog/product-manager-interview-questions` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Interview Prep</span>
            <span className="text-[11px] text-white/30">13 min read</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">
            Product manager<br /><span className="gradient-text-animated">interview questions</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            PM interviews test four fundamentally different skills — and most candidates prepare for only one or two of them. Here&apos;s the complete breakdown: what each question type tests, the framework for answering it, and the specific mistake that eliminates candidates at each stage.
          </p>
        </div>
      </section>

      {/* Question types */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8">
          {QUESTION_TYPES.map((qt, i) => (
            <div key={qt.type} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
              <div className="border-b border-[var(--border)] px-6 py-5" style={{ borderTopColor: qt.accent, borderTopWidth: 3 }}>
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ backgroundColor: qt.accent }}>{i + 1}</span>
                  <h2 className="text-[1.2rem] font-extrabold text-[var(--ink)]">{qt.type}</h2>
                </div>
                <p className="mt-3 text-[13.5px] leading-6 text-[var(--muted)]"><strong className="text-[var(--ink)]">What it tests:</strong> {qt.whatItTests}</p>
              </div>

              <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">Example question</p>
                <p className="font-semibold text-[var(--ink)]">&ldquo;{qt.exampleQ}&rdquo;</p>
              </div>

              <div className="border-b border-[var(--border)] px-6 py-5">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: qt.accent }}>Answer framework</p>
                <ol className="space-y-2">
                  {qt.framework.map((step, j) => (
                    <li key={j} className="flex gap-3 text-[13.5px] leading-6 text-[var(--muted)]">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: qt.accent }}>{j + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                <div className="px-6 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-500">Common mistake</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{qt.commonMistake}</p>
                </div>
                <div className="px-6 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: qt.accent }}>Strong signal</p>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{qt.strongSignal}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What interviewers score */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What PM interviewers are actually scoring</h2>
          <div className="mt-8 space-y-4">
            {[
              { criterion: "Structured thinking", detail: "Can you organize a complex, ambiguous problem into a logical sequence? This shows up in design questions (user → pain points → solutions → prioritize) and estimation questions (top-down decomposition). The structure is the answer." },
              { criterion: "Product intuition", detail: "Do you think like someone who cares deeply about users? The best PM answers reference specific user behaviors, specific pain points, and specific decisions — not abstract principles." },
              { criterion: "Decisiveness", detail: "PM interviewers penalize candidates who present both sides of every question without making a call. In strategy and design questions, making a specific recommendation with reasoning is required. Analytical parity signals indecision." },
              { criterion: "Communication efficiency", detail: "Can you be clear, complete, and concise simultaneously? Rambling through a product design answer loses the interviewer. A tight, structured answer that covers all elements in 15 minutes demonstrates the communication skill that product work demands daily." },
            ].map((c) => (
              <div key={c.criterion} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--brand)]" />
                <div>
                  <p className="font-bold text-[var(--ink)]">{c.criterion}</p>
                  <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">PM interview FAQs</h2>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Get AI coaching for your PM interview</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari coaches you through behavioral answers with STAR evaluation, product design structure practice, and the specific competency signals PM interviewers score for.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Start coaching free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
