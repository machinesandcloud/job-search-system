import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job at Meta — Interview Process & Tips (2025)",
  description:
    "Meta's interview process is built around one framework: impact. The values, the behavioral question structure, how the E5/E6/E7 engineering levels are calibrated, what product sense means in a Meta PM interview, and the moves that separate offers from rejections across every function.",
  keywords: ["how to get a job at meta", "meta interview process", "meta interview questions 2025", "facebook interview", "meta behavioral interview", "meta engineering levels", "meta pm interview", "how to get hired at meta", "meta values interview"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-meta" },
  openGraph: {
    title: "How to Get a Job at Meta — Interview Process & Tips (2025)",
    description: "Meta's process is built around impact. The values framework, how each function is evaluated, and what separates offers from rejections.",
    url: "/blog/how-to-get-a-job-at-meta",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "How many rounds are in a Meta interview loop?",
    answer: "For engineering roles: typically 2 coding rounds, 1 system design round (E5+), and 1–2 behavioral rounds. For PM roles: 2 product sense rounds, 1–2 execution/analytical rounds, and 1–2 leadership/behavioral rounds. The loop is usually conducted in a single virtual day or across two consecutive days. Total interview time is typically 4–6 hours excluding breaks.",
  },
  {
    question: "What are Meta's core values and how are they evaluated?",
    answer: "Meta's current values framework (post-2023 restructuring) emphasizes: Move Fast, Be Direct, Build Awesome Things, Live in the Future, and Build for Everyone. The behavioral round specifically probes these through questions like 'Tell me about a time you moved quickly and what happened' and 'Tell me about a time you gave direct feedback that was hard to deliver.' Candidates who give vague, conflict-avoiding answers fail the 'Be Direct' dimension consistently.",
  },
  {
    question: "What is the Meta product sense interview?",
    answer: "The product sense interview evaluates whether you think like a product leader — how you define user problems, generate solutions, prioritize, and measure success. A typical prompt: 'How would you improve Instagram Reels?' The evaluation dimensions: How well do you understand the user? How creative and structured is your solution space? How do you prioritize? How do you define success metrics? Candidates who jump to solutions without establishing user understanding fail this round most often.",
  },
  {
    question: "How does Meta level-setting work and can I negotiate my level?",
    answer: "Meta's engineering levels are E3 (new grad) through E9 (distinguished engineer). PM levels are IC3 through IC7. Your level is determined during the hiring process based on interview performance, years of experience, and scope of past work. Level directly determines comp — the E5 vs E6 difference can be $100K+ in total comp. Level is negotiable to some degree: if you believe you were evaluated at the wrong level, you can ask your recruiter to discuss this before you receive the formal offer. Have specific evidence of scope and impact that supports the higher level.",
  },
  {
    question: "Can I reapply to Meta after a rejection?",
    answer: "Yes — Meta's standard cooldown is 6 months after a rejection at the phone screen or loop stage. Some rejections at the very end of process (post-loop, pre-offer) may have a 12-month wait. Meta tracks all previous applications. When reapplying, recruiters can see your previous performance — so the second attempt should address the specific gaps from your first loop, not be identical preparation.",
  },
];

const HIRING_STAGES = [
  {
    stage: "Application & Resume Screen",
    duration: "1–3 weeks to recruiter contact",
    what: "Resume review and initial qualification. Meta receives extremely high application volume — referrals are the most effective path. Cold applications go through an ATS before a recruiter reviews them. Engineering roles require a strong technical profile; PM roles look for product impact and relevant domain experience at appropriate scale.",
    tip: "Quantify everything on your resume with Meta-relevant metrics: DAU/MAU, revenue impact, adoption rates, retention. Meta is intensely data-driven — a PM resume without metrics or an engineering resume without scale signals reads as weak. If you have a Meta connection, a referral is worth 3× a cold application for getting the first call.",
  },
  {
    stage: "Recruiter Screen",
    duration: "30 minutes, phone or video",
    what: "Background, motivation, timeline, and high-level technical or domain calibration. Meta recruiters are assessing: Is this person at the right experience level? Do they have relevant domain background? Can they communicate clearly? For engineering, some recruiters ask a lightweight coding question to prevent obviously misaligned candidates from taking loop slots.",
    tip: "Come with a sharp 'why Meta' answer. Vague enthusiasm about scale and impact reads the same from every candidate. Reference something specific: a product, a technical direction, a business challenge Meta is working on that connects to your background. Specificity signals preparation and genuine interest.",
  },
  {
    stage: "Technical/Role Screen",
    duration: "45–60 minutes",
    what: "For engineering: one coding interview (LeetCode medium difficulty, data structures and algorithms). For PMs: one product sense question or an execution case. This screen is a filter — candidates who pass advance to the full loop. Candidates who fail are rejected before the org invests in a full day of interviewer time.",
    tip: "For the engineering screen: practice talking through your approach before writing code. Meta interviewers specifically evaluate communication and problem decomposition, not just the final answer. For PMs: don't skip defining the user and the problem before proposing solutions — this is the most common failure pattern at this stage.",
  },
  {
    stage: "Virtual On-Site Loop",
    duration: "4–6 rounds, one or two days",
    what: "The full evaluation across: technical depth (coding + system design for engineers), role-specific skills (product sense + execution for PMs), and behavioral/values assessment (1–2 rounds for all functions). Each interviewer submits independent written feedback and a hire/no-hire recommendation. The debrief panel makes the hiring decision.",
    tip: "The behavioral rounds are not a break from the hard part. Meta's values interview is scored with the same weight as technical rounds — candidates with strong coding who give vague, unprepared behavioral answers fail. Prepare 6–8 STAR stories that map to Meta's values and can be adapted to different questions.",
  },
  {
    stage: "Debrief & Offer",
    duration: "1–2 weeks post-loop",
    what: "Interviewers debrief together, review scorecards, and make a hire/no-hire recommendation. Unlike Google (which has an independent hiring committee), Meta's debrief is conducted by the interviewers and hiring manager. The hiring manager's recommendation carries significant weight. Offers include base salary, RSU grant (4-year vesting), and annual bonus.",
    tip: "Meta's RSU grants are significant and often the largest component of total comp at senior levels. When evaluating an offer, model the full 4-year value including stock. Meta's comp is aggressive at E5–E6 — don't negotiate only the base. RSU quantity and refresh rate are often more negotiable than the base band.",
  },
];

const VALUES_DIMENSIONS = [
  {
    value: "Move Fast",
    whatTheyProbe: "Have you shipped things before they were perfect? Have you made a call without full information? Have you created a process specifically to increase speed?",
    failurePattern: "Stories where you moved cautiously, waited for consensus, or ran a thorough process that took a long time. Meta reads deliberate slowness as institutional risk-aversion.",
    strongAnswer: "A decision made under time pressure where you explicitly traded off completeness for speed — and can articulate the judgment call you made. 'We had two weeks of data instead of the six I wanted. I decided the directional signal was strong enough to ship to 10% and read results' is Meta language.",
  },
  {
    value: "Be Direct",
    whatTheyProbe: "Have you delivered hard feedback? Have you disagreed with someone senior and said so clearly? Have you named a problem others were avoiding?",
    failurePattern: "Stories where you 'shared concerns through appropriate channels' or 'provided feedback diplomatically.' Meta culture values bluntness — stories with softened, hedged, or indirect communication read as cultural mismatch.",
    strongAnswer: "A specific instance where you told someone something they didn't want to hear, directly and clearly, and the outcome. The conflict and the directness are the point — the story loses its value if you softened the message.",
  },
  {
    value: "Build for Everyone",
    whatTheyProbe: "For PMs specifically: how do you think about underserved users? How do you design for scale across languages, devices, and geographies? For engineers: how do you build systems that work for diverse users at global scale?",
    failurePattern: "PM answers that are US/English-centric or assume high-end device access. Meta operates at massive global scale — interviewing for Meta while showing no awareness of global product challenges is a signal mismatch.",
    strongAnswer: "Evidence of thinking about users who aren't like you — low-bandwidth users, non-English speakers, users without high-end devices, users in markets with different norms. Specific examples of how that thinking changed a product or technical decision.",
  },
  {
    value: "Build Awesome Things",
    whatTheyProbe: "What's the best product you've ever built? What are you most proud of? Where have you pushed beyond what was asked to make something genuinely excellent?",
    failurePattern: "Listing features shipped on schedule. 'We delivered what was committed' is execution, not excellence. Meta wants evidence of going beyond the spec, pushing for quality, or advocating for a better version of something that others were fine with.",
    strongAnswer: "Something you built or shaped that you're genuinely proud of — with specifics on what made it excellent, what you fought for that others didn't prioritize, and the user or business outcome it produced.",
  },
];

export default async function HowToGetJobAtMetaPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Get a Job at Meta — Interview Process & Tips (2025)"
        description="Meta's process is built around impact. Values framework, engineering levels, PM product sense evaluation, and what separates offers from rejections at every stage."
        url={`${BASE_URL}/blog/how-to-get-a-job-at-meta`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Get a Job at Meta", url: `${BASE_URL}/blog/how-to-get-a-job-at-meta` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Company Guide</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">How to Get a Job at Meta</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">Meta&apos;s process is built around one filter: impact. The values framework, how each function is evaluated, what &ldquo;product sense&rdquo; actually means in a Meta PM loop, and the specific moves that separate offers from rejections.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>13 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">What makes Meta different</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Meta&apos;s hiring culture has one organizing principle: impact at scale. Every evaluation dimension — technical, behavioral, product sense — maps back to the question: can this person drive meaningful outcomes in a fast-moving, high-ambiguity environment affecting billions of users?
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              This creates a distinct interview character. Meta interviewers are looking for directness — candidates who say what they think, who disagree with evidence, who move before they have perfect information. Conflict-avoidant, consensus-seeking, or deliberate-process candidates consistently underperform in Meta loops even when their technical skills are strong.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The second distinctive factor is scale calibration. Meta operates at 3+ billion users across its family of apps. Interview answers that show small-scale thinking — whether in technical architecture, product design, or business framing — signal a candidate who won&apos;t be effective in Meta&apos;s environment. Explicitly demonstrating scale awareness (global users, diverse devices, multiple geographies, high-traffic systems) is a positive signal at every stage.
            </p>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">The hiring process — stage by stage</h2>
            <div className="mt-6 space-y-5">
              {HIRING_STAGES.map((stage, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="flex items-start gap-4 border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[12px] font-bold text-[#4361EE]">{i + 1}</div>
                    <div>
                      <p className="font-bold text-[var(--ink)]">{stage.stage}</p>
                      <p className="text-[12px] text-[var(--muted)]">{stage.duration}</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{stage.what}</p>
                    <div className="rounded-lg border border-[var(--brand)]/15 bg-[var(--brand)]/[0.03] px-4 py-3">
                      <p className="text-[12px] font-bold text-[#4361EE] mb-1">Prep tip</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{stage.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Meta&apos;s values in behavioral interviews — what they actually probe</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Meta&apos;s values interview is structured, not conversational. Each dimension has specific probe questions and a failure pattern. Most candidates who fail the behavioral round fail because they give generically positive answers that could apply to any company — not because they lack relevant experience.
            </p>
            <div className="mt-6 space-y-5">
              {VALUES_DIMENSIONS.map((dim, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                    <h3 className="font-bold text-[var(--ink)]">{dim.value}</h3>
                  </div>
                  <div className="p-6 space-y-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5">What they probe</p>
                      <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.whatTheyProbe}</p>
                    </div>
                    <div className="rounded-lg border border-red-100 bg-red-50/30 px-4 py-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-red-400 mb-1">Failure pattern</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{dim.failurePattern}</p>
                    </div>
                    <div className="rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-500 mb-1">What a strong answer sounds like</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{dim.strongAnswer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">The Meta PM product sense interview</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Product sense is the most function-specific evaluation at Meta and the one PM candidates most often misunderstand. It&apos;s not a case interview — there&apos;s no &ldquo;right answer.&rdquo; It&apos;s an evaluation of how you think, not what you conclude. The structure interviewers expect:
            </p>
            <div className="mt-5 space-y-3">
              {[
                { step: "Clarify the goal and scope", detail: "Before proposing anything, establish: what is the core goal of this product/feature? What does success mean for Meta and for users? Candidates who skip this step and jump to solutions get called out for lack of structure." },
                { step: "Define the user", detail: "Identify who you're designing for — specifically. Not 'Instagram users' but 'users aged 25–34 who primarily consume Reels on mobile in emerging markets.' The specificity of your user definition determines the quality of your solution." },
                { step: "Identify user problems or opportunities", detail: "What are the actual pain points or unmet needs for this user? What's preventing them from getting value? This is the step most candidates rush through to get to solutions. Meta interviewers slow candidates down here on purpose." },
                { step: "Generate and prioritize solutions", detail: "Propose 3–4 solutions, then explain your prioritization logic using explicit trade-offs: impact vs. effort, short-term vs. long-term, user value vs. business value. The prioritization reasoning matters as much as the ideas." },
                { step: "Define success metrics", detail: "How would you know if this worked? Lead metric, guardrail metrics (things you don't want to harm), and countermetrics. This signals that you think in terms of outcomes, not outputs." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[11px] font-bold text-[#4361EE]">{i + 1}</div>
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.step}</p>
                    <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Common questions</h2>
            <div className="mt-4 space-y-4">
              {FAQS.map(faq => (
                <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-8 text-center">
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Prep your Meta interview with Zari</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari coaches Meta values behavioral answers — identifies conflict-avoidant stories, vague impact claims, and the patterns that fail the &ldquo;Move Fast&rdquo; and &ldquo;Be Direct&rdquo; bars. Also coaches PM product sense structure, system design framing, and Meta&apos;s comp negotiation (base + RSU + bonus).</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Prep my Meta interview →
            </Link>
          </section>

        </div>
      </article>
    </PageFrame>
  );
}
