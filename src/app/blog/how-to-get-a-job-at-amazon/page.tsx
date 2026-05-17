import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job at Amazon — The Complete Guide (2025)",
  description:
    "Amazon's hiring process is structured around 16 Leadership Principles that govern every interview, every offer decision, and every promotion. How to apply, what each stage actually evaluates, how the bar raiser works, and what makes Amazon's process fundamentally different from FAANG peers.",
  keywords: ["how to get a job at amazon", "amazon interview process", "amazon leadership principles interview", "amazon bar raiser", "amazon hiring process 2025", "amazon software engineer interview", "amazon sde interview"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-amazon" },
  openGraph: {
    title: "How to Get a Job at Amazon — The Complete Guide (2025)",
    description: "Amazon's Leadership Principles govern every interview and hiring decision. Stage-by-stage breakdown with prep strategy for each LP and the bar raiser process.",
    url: "/blog/how-to-get-a-job-at-amazon",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "How long does Amazon's hiring process take?",
    answer: "Most Amazon hiring processes run 4–8 weeks from application to offer. The loop (4–5 interviews in one day or across consecutive days) is typically scheduled 2–4 weeks after the phone screen. Offers usually come within 3–5 business days after the loop. Timelines vary by team, level, and current headcount — offer team roles and org-level positions take longer. If you're through a loop and haven't heard in 7+ days, one follow-up to the recruiter is appropriate.",
  },
  {
    question: "What is a bar raiser and can they block my hire?",
    answer: "Yes — a bar raiser can block your hire, and their veto is typically final. The bar raiser is an experienced Amazonian (from a different team than the one hiring) whose job is to ensure the hire raises the overall quality of the team, not just fills the position. They interview you on behavioral competencies and have authority to recommend 'No Hire' even if the hiring team wants you. Their goal is to prevent hiring managers from rationalizing a mediocre candidate because of urgency or personal rapport.",
  },
  {
    question: "How many Leadership Principles are there and do I have to know all of them?",
    answer: "Amazon has 16 Leadership Principles (they added 'Strive to be Earth's Best Employer' and 'Success and Scale Bring Broad Responsibility' in 2021). You should have at least 2–3 strong STAR stories per LP, with some stories flexible enough to apply to multiple LPs depending on which angle the interviewer asks. The 8–10 LPs most frequently tested in interviews are: Customer Obsession, Dive Deep, Deliver Results, Ownership, Bias for Action, Earn Trust, Invent and Simplify, Hire and Develop the Best, Insist on the Highest Standards, and Think Big.",
  },
  {
    question: "Can I apply to Amazon after a previous rejection?",
    answer: "Yes. Amazon has a 6-month cooldown period between applications for the same role. You can reapply to a different role sooner (there's no cross-role restriction). Many successful Amazon hires were rejected once or twice first — the bar is high, and if you didn't get far into the process the first time, the second attempt with better LP story prep often produces different results.",
  },
  {
    question: "Do I need Amazon-specific experience to get a job there?",
    answer: "No. Amazon hires from all backgrounds and industries, and the LP framework is intentionally designed to surface leadership behaviors that exist independent of industry. What matters is that your STAR stories are specific and demonstrate the LP being tested — the context (Amazon vs. non-Amazon company) is less important than the clarity, specificity, and outcome of the story. Former Amazon employees do have an advantage in knowing the LP vocabulary, but it's surmountable with preparation.",
  },
];

export default async function HowToGetAJobAtAmazonPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Get a Job at Amazon — The Complete Guide (2025)"
        description="Amazon's Leadership Principles govern every interview and hiring decision. Stage-by-stage breakdown with prep strategy for the bar raiser and LP interviews."
        url={`${BASE_URL}/blog/how-to-get-a-job-at-amazon`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Get a Job at Amazon", url: `${BASE_URL}/blog/how-to-get-a-job-at-amazon` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Interviews</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">How to Get a Job at Amazon</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">Amazon&apos;s 16 Leadership Principles aren&apos;t a cultural poster on the wall — they&apos;re the evaluation framework for every interview, every hiring decision, and every promotion. Here&apos;s how the process actually works.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>14 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">What makes Amazon&apos;s hiring different</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Every major tech company has a values-based interview component. Amazon&apos;s is different in two important ways.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              First, the Leadership Principles are the primary evaluation framework — not a supplement to technical screens. At Google, your coding and system design scores drive most of the hire decision. At Amazon, LP behavioral interviews carry equal or greater weight, and a strong LP failure can kill a hire even when the technical signal is good.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Second, the bar raiser system is genuinely independent. At most companies, &quot;culture fit&quot; interviews are conducted by the hiring team with a bias toward hiring. The bar raiser has no stake in filling the role and a mandate to block hires that don&apos;t meet the bar — regardless of how much the team wants the candidate.
            </p>
            <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50/40 p-5">
              <p className="text-[14px] leading-7 text-[var(--ink)]">
                <span className="font-bold">The implication for your prep:</span> Technical interview prep without LP story prep is incomplete preparation for Amazon. Candidates who &quot;should&quot; get the job based on their resume and technical skills get rejected at Amazon every week because their behavioral stories are vague, generic, or don&apos;t demonstrate the LP being tested at the right depth.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">The hiring stages</h2>

            <div className="mt-5 space-y-4">
              {[
                {
                  stage: "Application & resume screen",
                  detail: "Amazon uses ATS (Workday) and recruiter screens. Your resume needs to pass keyword matching for the role and demonstrate scope, impact, and technical credibility relevant to the level you're applying for. L4 (SDE II equivalent), L5 (senior), and L6 (staff/principal) each have different signal thresholds. Amazon recruiters look for measurable outcomes in bullets — not responsibilities. A resume that says 'responsible for maintaining microservices' loses to one that says 'built and maintained 4 Python microservices processing 200M daily events with 99.95% uptime.'",
                  tip: "Tailor your resume to the specific job description. Amazon JDs include LP language — mirror it. If the JD says 'Deliver Results' and 'Dive Deep,' those are signals about which LPs the team prioritizes.",
                },
                {
                  stage: "Recruiter screen (30 min)",
                  detail: "A recruiter will walk through your background, confirm your interest, and give you an overview of the role. They'll likely ask 1–2 LP-style behavioral questions. This stage is about fit and interest confirmation — not a deep technical or behavioral assessment. Be prepared to articulate why Amazon specifically (not just 'I want a big tech job').",
                  tip: "Have a specific, authentic reason ready. Saying 'I'm drawn to Amazon's customer obsession and the scale at which you operate' is fine. Being able to connect it to a specific product, team, or business problem is better.",
                },
                {
                  stage: "Online Assessment or technical phone screen (1 hr)",
                  detail: "For software roles, this is typically 2 LeetCode-style coding problems with a 70-minute window (OA) or a live coding interview with a Kindle device or CoderPad (phone screen). The OA is around medium difficulty. Phone screens range from medium to hard. Some roles skip the OA and go straight to the loop.",
                  tip: "Amazon's OA includes not just coding but also 'Work Simulation' and 'Work Style Survey' components — the latter measures LP alignment through behavioral preference questions. Don't rush through them.",
                },
                {
                  stage: "The loop (4–5 interviews, usually 1 day)",
                  detail: "This is the main hiring event. Typically: 2–3 behavioral LP interviews, 1–2 technical interviews (coding, system design, or both depending on role/level), and 1 bar raiser interview. Each interviewer is assigned specific LPs to cover — they don't all ask the same things. The bar raiser interview is usually 45–60 minutes and goes deeper on behavioral stories than any other round.",
                  tip: "Every single interview at Amazon — including technical ones — will include LP questions. Plan for 15–20 minutes of behavioral questions in a coding interview. Have stories ready, not just solutions.",
                },
                {
                  stage: "Debrief and hiring committee",
                  detail: "After the loop, each interviewer submits a written debrief including a hire/no-hire vote and specific LP ratings. The bar raiser facilitates the debrief and has veto authority. The hiring manager can advocate for a candidate but cannot override the bar raiser. Offers are extended 3–5 business days after the debrief in most cases.",
                  tip: "You have no visibility into the debrief. The only thing you can influence is the quality of your stories in the loop — which is why preparation matters more than performance anxiety management.",
                },
              ].map((item, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4 flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[12px] font-bold text-[var(--brand)]">{i + 1}</div>
                    <h3 className="font-bold text-[var(--ink)]">{item.stage}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                    <div className="mt-4 rounded-lg border border-[var(--brand)]/15 bg-[var(--brand)]/[0.04] px-4 py-3">
                      <p className="text-[12.5px] leading-6 text-[var(--ink)]"><span className="font-bold">Prep note: </span>{item.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">The Leadership Principles: what each actually tests</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              You need 2–3 strong STAR stories per LP. Some stories can flex across multiple LPs with different framing. Here are the 10 most commonly tested in loops, and what the interviewer is actually looking for:
            </p>

            <div className="mt-5 space-y-3">
              {[
                {
                  lp: "Customer Obsession",
                  signal: "Did you start with the customer and work backwards? Stories should show you sought out customer feedback, made a decision that was right for the customer even when it was costly or inconvenient, or changed course based on customer signal.",
                  trap: "Don't confuse 'stakeholder' with 'customer.' Amazon means end-user customer. A story about improving a developer tool for internal engineers can work if you frame the impact on the end-user product.",
                },
                {
                  lp: "Ownership",
                  signal: "Did you act as if you owned the problem, even outside your direct responsibilities? Stories should show you stepped in on something that was 'not your job,' prevented a failure rather than waiting for someone else to catch it, or made a call without waiting for permission.",
                  trap: "Don't pick stories where you asked for help immediately or escalated upward at the first sign of difficulty. Ownership means you took the problem personally.",
                },
                {
                  lp: "Dive Deep",
                  signal: "Did you get into the details rather than accepting surface-level information? Stories should show you ran your own analysis, found data that contradicted the initial assumption, or identified a root cause others had missed.",
                  trap: "The story needs to show you personally got into the data — not that you 'reviewed the team's analysis.' Dive Deep means you dove.",
                },
                {
                  lp: "Deliver Results",
                  signal: "Did you produce a meaningful outcome, on time, against real constraints? This LP is the most results-focused — the 'Result' in your STAR story needs to be specific, measurable, and significant. Vague outcomes ('we improved performance') don't demonstrate this LP.",
                  trap: "Don't pick stories where you 'contributed to' a team outcome without a clear line to what you personally did. The result should be directly traceable to your action.",
                },
                {
                  lp: "Bias for Action",
                  signal: "Did you make a calculated decision under uncertainty rather than waiting for perfect information? Stories should show you moved faster than others thought was prudent, made a reversible decision quickly and iterated, or acted to prevent a problem rather than waiting for it to materialize.",
                  trap: "This LP is often confused with 'Deliver Results.' The distinction: Deliver Results is about the outcome. Bias for Action is about the pace and decisiveness of the action taken under uncertainty.",
                },
                {
                  lp: "Earn Trust",
                  signal: "Did you demonstrate honesty and transparency even when it was uncomfortable? Stories should show you delivered bad news directly, disagreed with a decision and said so (even to someone senior), or acknowledged a mistake openly and took responsibility.",
                  trap: "Don't sanitize the story. Interviewers testing Earn Trust want to hear about real tension — a moment where the honest thing was uncomfortable. Anodyne 'I always communicate openly' stories don't demonstrate this LP.",
                },
                {
                  lp: "Invent and Simplify",
                  signal: "Did you find a simpler solution to a complex problem, or invent something new that others hadn't considered? Stories should show you eliminated unnecessary complexity, proposed a novel approach, or challenged an assumption that was slowing everyone down.",
                  trap: "Don't confuse incremental improvement with invention. This LP wants innovation — something meaningfully different, not just a bit better.",
                },
                {
                  lp: "Insist on the Highest Standards",
                  signal: "Did you raise the quality bar even when others thought it was good enough? Stories should show you pushed back on work that wasn't ready, set a higher quality standard on your team, or refused to ship something that didn't meet the bar.",
                  trap: "This LP requires some friction in the story. If everyone agreed the quality standard needed to be raised, it doesn't demonstrate that you 'insisted.'",
                },
                {
                  lp: "Think Big",
                  signal: "Did you propose a vision or goal that was larger than what others thought was realistic? Stories should show you challenged conventional thinking about what was possible, proposed a multi-year roadmap, or created a bold goal that transformed how the team approached the problem.",
                  trap: "The story needs actual scale — a genuinely ambitious vision with business impact. 'We thought about improving the checkout experience' is not Think Big.",
                },
                {
                  lp: "Hire and Develop the Best",
                  signal: "Did you invest in making the people around you more effective? Stories should show you mentored someone who grew meaningfully because of your investment, made a strong hiring decision, or raised the quality bar in an interview process.",
                  trap: "For individual contributors: you don't need to have been a manager. Mentoring a junior engineer, coaching an intern, or giving substantive interview feedback all count.",
                },
              ].map(item => (
                <div key={item.lp} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="font-bold text-[var(--ink)]">{item.lp}</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]"><span className="font-semibold text-[var(--ink)]">What they&apos;re testing: </span>{item.signal}</p>
                  <p className="mt-2 text-[13px] leading-6 text-amber-700 bg-amber-50/60 rounded-lg px-3 py-2"><span className="font-semibold">Common trap: </span>{item.trap}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">How to structure your LP stories</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Amazon uses STAR, but with important nuances. Here&apos;s how each component should be calibrated:
            </p>
            <div className="mt-4 space-y-3">
              {[
                { part: "Situation", guidance: "Set the context briefly — company, team size, what was at stake. 2–3 sentences maximum. Most candidates over-index here. The evaluator wants enough context to understand why the problem mattered, not a full history of the company." },
                { part: "Task", guidance: "What specifically were you responsible for? This is where you establish that the story is about YOUR decision and action, not a team effort you participated in. If the story is collaborative, be clear about which part was yours." },
                { part: "Action", guidance: "This is where most LP points are won or lost. Be specific about what YOU did, what you considered, what tradeoffs you weighed, and why you chose your approach over alternatives. Amazon interviewers will probe here with follow-ups — 'Why did you take that approach?' 'What else did you consider?' The richer your action detail, the more LP signals you create." },
                { part: "Result", guidance: "Be specific and quantified wherever possible. 'We improved the system' is weak. 'We reduced p99 latency from 840ms to 210ms, enabling the team to launch the mobile feature on schedule and contributing to a 14% improvement in checkout completion rate' is strong. If you don't have a number, describe what changed qualitatively — but always describe what was different after your action than before." },
              ].map(item => (
                <div key={item.part} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">{item.part[0]}</div>
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.part}</p>
                    <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.guidance}</p>
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
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Practice your Amazon LP stories before the loop</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari simulates Amazon-style LP behavioral interviews — assigns specific Leadership Principles, evaluates your STAR story depth and specificity, and tells you exactly what the bar raiser would probe on. Practice every LP until the stories feel natural under pressure.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Practice Amazon LP interviews →
            </Link>
          </section>
        </div>
      </article>
    </PageFrame>
  );
}
