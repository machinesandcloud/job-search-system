import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job at Microsoft — Interview Process & Tips (2025)",
  description:
    "Microsoft's interview process is structured, values-forward, and significantly more collaborative than Amazon or Google. The Growth Mindset framework runs through every stage. How the loop is structured, what interviewers actually evaluate, how to answer behavioral questions with Microsoft's model, and what separates offers from rejections.",
  keywords: ["how to get a job at microsoft", "microsoft interview process", "microsoft interview questions 2025", "microsoft behavioral interview", "microsoft growth mindset interview", "microsoft loop interview", "microsoft swe interview", "microsoft pm interview"],
  alternates: { canonical: "/blog/how-to-get-a-job-at-microsoft" },
  openGraph: {
    title: "How to Get a Job at Microsoft — Interview Process & Tips (2025)",
    description: "Microsoft's loop is values-forward and collaborative. Growth Mindset runs through every stage. How the process works and what interviewers evaluate at each step.",
    url: "/blog/how-to-get-a-job-at-microsoft",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "How long does the Microsoft interview process take?",
    answer: "From application to offer, expect 4–8 weeks for most roles. The recruiter screen is typically scheduled within 1–2 weeks of application. The hiring loop is usually scheduled 2–3 weeks after the recruiter screen. Post-loop decision and offer extension typically takes 1–2 weeks. Timelines vary significantly by team and hiring urgency — some roles move in 3 weeks, others take 3 months.",
  },
  {
    question: "Does Microsoft use LeetCode-style coding interviews?",
    answer: "Yes — for software engineering roles. Expect 2–3 technical rounds in the loop covering data structures, algorithms, and system design. Difficulty is typically LeetCode medium, with some hard problems for senior roles. Microsoft interviewers tend to be more collaborative during coding than Google — they'll often guide you if you're stuck rather than waiting silently. System design is typically part of the SDE II and above loops.",
  },
  {
    question: "What is the 'as appropriate' hire at Microsoft?",
    answer: "The 'as appropriate' (AA) hire is a designated interviewer who acts as a cross-team quality check — similar in concept to Amazon's bar raiser but less formal. The AA interviewer is not from your target team and evaluates fit at the broader Microsoft level, not just for the specific role. They have the ability to veto an offer independently. If you're in a loop with 6 interviewers and one of them isn't from the team, it's likely the AA hire.",
  },
  {
    question: "How important is the Growth Mindset framework in Microsoft interviews?",
    answer: "It's foundational. Satya Nadella made Growth Mindset central to Microsoft's culture when he became CEO in 2014, and it shows up in every interview stage. Interviewers are explicitly evaluating: how do you respond to failure? How do you learn? How do you incorporate feedback? Behavioral answers that show defensiveness about past failures, that deflect responsibility, or that don't demonstrate learning will register as poor cultural fit regardless of technical strength.",
  },
  {
    question: "Can I reapply to Microsoft after a rejection?",
    answer: "Yes — Microsoft's cooldown period is typically 6 months after a rejection. The exception is if the recruiter communicates a different timeline. Reapplication is common and doesn't carry a stigma at Microsoft. Some candidates interview multiple times across different teams before landing an offer — the hiring decision is team-level, so a rejection from one team doesn't affect your candidacy at another.",
  },
];

const HIRING_STAGES = [
  {
    stage: "Online Application",
    duration: "1–2 weeks to recruiter contact",
    what: "Resume and cover letter review. Microsoft uses Workday for most applications. Referrals from internal employees significantly accelerate review — internal referrals are routed to a recruiter within days vs. weeks for cold applications.",
    tip: "Mirror the job description language in your resume. Microsoft's ATS is Workday, and keyword matching matters more for cold applications. For engineering roles, GitHub profile and open-source contributions can help — some recruiters check them.",
  },
  {
    stage: "Recruiter Screen",
    duration: "30 minutes, phone or Teams",
    what: "Standard background and motivation questions: why Microsoft, relevant experience, salary expectations, timeline. The recruiter is calibrating fit for this specific role and team — not technical depth. They're also assessing communication and enthusiasm.",
    tip: "Have a clear answer to 'why Microsoft specifically' that goes beyond 'great products.' Reference something specific about the team, product area, or Microsoft's mission that you find compelling. Recruiters hear vague enthusiasm all day.",
  },
  {
    stage: "Hiring Manager Screen",
    duration: "30–60 minutes, Teams",
    what: "For many roles, there's a hiring manager screen before the full loop. This covers role-specific background, team context, and mutual fit. The manager is evaluating whether to invest the loop scheduling effort — they're deciding if you're worth 5 other people's time.",
    tip: "Ask substantive questions about the team's current priorities, biggest challenges, and what success looks like in the first 90 days. This signals strategic thinking and preparation. Avoid questions answerable by a 5-minute Google search.",
  },
  {
    stage: "The Hiring Loop",
    duration: "4–6 interviews, usually in one day (virtual or on-site)",
    what: "The core evaluation stage. Typically 4–6 one-hour interviews with the hiring manager, team members, peer-level interviewers from related teams, and the 'as appropriate' hire (AA). Each interviewer owns a dimension: technical depth, behavioral/cultural fit, role-specific skills, cross-team collaboration.",
    tip: "Microsoft loops are collaborative by design — interviewers are encouraged to help candidates succeed, not to catch them failing. If you get stuck on a technical problem, ask clarifying questions and think out loud. Silence reads as 'I don't know.' Thinking aloud reads as 'I work through problems systematically.'",
  },
  {
    stage: "Debrief and Decision",
    duration: "1–2 weeks post-loop",
    what: "Interviewers submit written feedback and a hire/no-hire recommendation. The hiring manager convenes a debrief. The AA hire can veto. Offers require consensus — a split panel (some hire, some no-hire) typically results in a no-hire unless the hiring manager can address specific objections.",
    tip: "Send a brief, specific thank-you email to your recruiter within 24 hours. Mention one specific thing you found compelling about the team or conversation. Recruiters share these with hiring managers occasionally, and it adds a data point about genuine interest and professionalism.",
  },
];

const GROWTH_MINDSET_DIMENSIONS = [
  {
    dimension: "Learning from failure",
    whatTheyTest: "Can you describe a significant professional failure without deflecting blame or minimizing the outcome? Do you show genuine learning?",
    commonTrap: "Choosing a failure that wasn't really a failure ('I worked too hard' / 'I cared too much'). Interviewers recognize the pattern immediately.",
    goodAnswer: "Describe a real failure with a clear outcome, your specific contribution to it, what you learned, and how you've applied that learning since. The more specific the incident and the clearer the behavioral change, the stronger the answer.",
  },
  {
    dimension: "Incorporating feedback",
    whatTheyTest: "How do you respond when you receive critical feedback? Do you get defensive, or do you genuinely integrate it?",
    commonTrap: "Describing how you received feedback graciously but not showing how you changed. The feedback story needs a behavioral change outcome, not just 'I thanked them and kept it in mind.'",
    goodAnswer: "Describe specific feedback you received (ideally critical), your initial reaction honestly, and the concrete change you made. 'My manager told me I was presenting data without a recommendation. I realized I was conflict-averse. I changed X habit and the next presentation landed differently.'",
  },
  {
    dimension: "Helping others grow",
    whatTheyTest: "Microsoft strongly values collaborative success — do you invest in the people around you, or optimize for personal output?",
    commonTrap: "Generic mentorship stories with no specifics. 'I helped junior teammates' is weak. 'I worked with [person] specifically on X skill gap, and here's what happened' is strong.",
    goodAnswer: "A specific example of identifying someone's growth gap, the approach you took, and the outcome — ideally where you can point to their improvement or a promotion/opportunity they received.",
  },
  {
    dimension: "Curiosity and breadth",
    whatTheyTest: "Microsoft values people who learn across domains — not just deepen in one area. Do you have genuine intellectual curiosity outside your immediate role?",
    commonTrap: "Framing learning as purely career-strategic ('I learned Python because it would help my career'). Genuine curiosity sounds different from instrumental learning.",
    goodAnswer: "An example of something you learned driven by genuine interest, that connected to your work in an unexpected way. Cross-domain curiosity is especially valued — a PM who reads about cognitive science, an engineer who studies design systems.",
  },
];

export default async function HowToGetJobAtMicrosoftPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Get a Job at Microsoft — Interview Process & Tips (2025)"
        description="Microsoft's loop is collaborative, values-forward, and Growth Mindset-driven. How each stage works, what interviewers evaluate, and how to prep behavioral questions the right way."
        url={`${BASE_URL}/blog/how-to-get-a-job-at-microsoft`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Get a Job at Microsoft", url: `${BASE_URL}/blog/how-to-get-a-job-at-microsoft` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Company Guide</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">How to Get a Job at Microsoft</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">Microsoft&apos;s interview process is more collaborative than Amazon&apos;s and more values-forward than Google&apos;s. Growth Mindset runs through every stage. Here&apos;s what each stage evaluates and how to prepare the right way.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>13 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">What makes Microsoft different</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Microsoft interviews differently from most big tech companies in two important ways. First, the process is explicitly collaborative — interviewers are trained to help candidates succeed, not to catch them failing. If you&apos;re stuck, they&apos;ll guide you. Silence is a worse signal than a wrong answer, because Microsoft wants to see how you think through problems.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Second, Culture — specifically Growth Mindset — is evaluated as rigorously as technical skill. Satya Nadella built this into Microsoft&apos;s hiring DNA when he became CEO. Interviewers have specific behavioral questions designed to probe: how do you respond to failure? How do you learn? How do you invest in others? A technically excellent candidate who shows defensiveness about failures or takes credit without acknowledging others will fail the culture bar.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Collaborative loops", detail: "Interviewers help you through problems — thinking aloud is encouraged, not penalized" },
                { label: "Growth Mindset bar", detail: "Failure, feedback, and learning are explicit evaluation dimensions at every stage" },
                { label: "Team-level hiring", detail: "Each team makes its own offer decision — a rejection from one team doesn't affect others" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <p className="font-bold text-[var(--ink)] text-[13px]">{item.label}</p>
                  <p className="mt-1.5 text-[12.5px] leading-5 text-[var(--muted)]">{item.detail}</p>
                </div>
              ))}
            </div>
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
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Growth Mindset: what interviewers actually evaluate</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Growth Mindset is not a soft checkbox. It&apos;s a structured evaluation dimension with specific behavioral probes. Interviewers are trained on it. Here are the four dimensions they probe, what they test for, and the pattern that sinks most candidates:
            </p>
            <div className="mt-6 space-y-5">
              {GROWTH_MINDSET_DIMENSIONS.map((dim, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                    <h3 className="font-bold text-[var(--ink)]">{dim.dimension}</h3>
                  </div>
                  <div className="p-6 space-y-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">What they&apos;re testing</p>
                      <p className="text-[13.5px] leading-6 text-[var(--muted)]">{dim.whatTheyTest}</p>
                    </div>
                    <div className="rounded-lg border border-red-100 bg-red-50/30 px-4 py-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-red-400 mb-1">Common trap</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{dim.commonTrap}</p>
                    </div>
                    <div className="rounded-lg border border-emerald-100 bg-emerald-50/30 px-4 py-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-500 mb-1">What a strong answer looks like</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{dim.goodAnswer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">What separates offers from rejections</h2>
            <div className="mt-5 space-y-3">
              {[
                { signal: "Thinking out loud during technical problems", detail: "Microsoft interviewers want to understand how you reason. Candidates who go silent and then either produce a correct answer or don't consistently under-index. Narrate your approach: 'My first instinct is X because Y — let me test whether that holds given this constraint.'" },
                { signal: "Growth Mindset stories with behavioral specifics", detail: "Failure stories that name a real failure, a specific contribution, and a concrete behavioral change. The specificity is what makes them credible. 'I learned to ask more questions' is not specific. 'I started blocking 30 minutes after every stakeholder meeting to write open questions before proceeding' is specific." },
                { signal: "Genuine curiosity about the team's problems", detail: "The best interview questions aren't about compensation, growth trajectory, or what a day looks like — they're about the team's current challenges and how they're thinking about them. This signals that you'll contribute, not just occupy a role." },
                { signal: "Collaboration signals in all stories", detail: "Microsoft values 'we' outcomes. If all your STAR stories make you the sole hero — 'I built this, I fixed this, I drove this result' — it reads as poor collaborative instinct. Strong Microsoft candidates give credit in their stories naturally." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[11px] font-bold text-[#4361EE]">{i + 1}</div>
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.signal}</p>
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
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Prep your Microsoft interview with Zari</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari coaches Growth Mindset behavioral answers with real-time feedback — identifies deflection patterns, vague failure stories, and missing behavioral specifics before your loop. Also optimizes your resume for Microsoft&apos;s ATS and coaches salary negotiation for Microsoft&apos;s comp structure (base + stock refresh + bonus).</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Prep my Microsoft interview →
            </Link>
          </section>

        </div>
      </article>
    </PageFrame>
  );
}
