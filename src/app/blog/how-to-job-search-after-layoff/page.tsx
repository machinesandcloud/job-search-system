import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Job Search After a Layoff — The Complete Playbook (2025)",
  description:
    "A layoff disrupts your routine, your identity, and your timeline all at once. Here's the week-by-week playbook for getting back on track — from the first week to your first offer, including how to explain the layoff, what to say on LinkedIn, and how to preserve your financial runway while you search.",
  keywords: ["job search after layoff", "how to find a job after layoff", "laid off what to do", "job search after being laid off", "layoff job search strategy 2025", "how to explain layoff interview", "laid off job hunting tips"],
  alternates: { canonical: "/blog/how-to-job-search-after-layoff" },
  openGraph: {
    title: "How to Job Search After a Layoff — The Complete Playbook (2025)",
    description: "Week-by-week guide to job searching after a layoff — from first week stabilization to first offer, with scripts for LinkedIn, interviews, and networking.",
    url: "/blog/how-to-job-search-after-layoff",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "How long does it typically take to find a job after a layoff?",
    answer: "The median job search after a layoff is 3–5 months for mid-career professionals, though it varies significantly by field, level, and economic conditions. Senior roles (VP+) often take 4–8 months. Tech layoffs in 2023–2024 averaged 4–6 months at senior IC and management levels because multiple people with identical profiles hit the market simultaneously. Starting systematically — network first, resume second, volume third — compresses this timeline meaningfully.",
  },
  {
    question: "Should I update my LinkedIn before or after telling my network I was laid off?",
    answer: "Update LinkedIn first, so when people check your profile after seeing your post, they see a consistent picture. Set your headline to something like '[Role] · Open to [target roles]' and turn on the Open to Work frame for recruiters (you can set it to recruiters-only visibility). Then post about the layoff. The sequence matters — you want the profile to be ready when traffic comes in.",
  },
  {
    question: "Can I negotiate a better severance after accepting the initial package?",
    answer: "Sometimes. It depends on your situation: how long you were there, whether you had equity, your level, whether you were part of a larger RIF (companies often treat RIF severance as fixed to avoid discrimination claims, making individual negotiation harder). The most common angles: extended health coverage if you have a specific medical need, extended laptop access if you need time to transfer data, outplacement services, or a reference letter as a condition of signing the separation agreement. Always consult an employment attorney before signing if the package is significant.",
  },
  {
    question: "What if I was laid off right before a vesting cliff?",
    answer: "This is worth investigating carefully. If your layoff happened suspiciously close to a vesting date — especially a 1-year cliff — and you were one of few people laid off, it may be worth consulting an employment attorney. Some companies have faced claims of timing layoffs around vesting events. Whether anything is actionable depends on your jurisdiction, your equity agreement, and the circumstances. At minimum, get your equity situation documented in writing before you sign anything.",
  },
  {
    question: "Should I take the first offer I get, or hold out?",
    answer: "It depends on your runway. If you have 3+ months of savings and the offer doesn't fit your target, you have leverage to continue searching. If your runway is under 6 weeks, it's worth taking the offer and continuing to quietly search from a position of employment. Financial pressure is the single biggest factor in accepting bad offers — which is why protecting runway is the first priority in week one.",
  },
];

export default async function HowToJobSearchAfterLayoffPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Job Search After a Layoff — The Complete Playbook (2025)"
        description="Week-by-week guide to job searching after a layoff — from first week stabilization to first offer."
        url={`${BASE_URL}/blog/how-to-job-search-after-layoff`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Job Search After Layoff", url: `${BASE_URL}/blog/how-to-job-search-after-layoff` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">Job Search Strategy</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">How to Job Search After a Layoff</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">A layoff hits your routine, your income, and your sense of direction at the same time. Here&apos;s the week-by-week playbook — from the first 48 hours to your first offer.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>13 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Before you do anything else: the first 48 hours</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The first instinct after a layoff is to start applying immediately. That&apos;s the wrong move. The first 48 hours should be about stabilization, not searching. You&apos;ll make worse decisions under acute stress, and rushing into applications without a clear target produces worse outcomes than taking a few days to get oriented.
            </p>

            <div className="mt-5 space-y-3">
              {[
                {
                  action: "Document everything before your access is cut",
                  detail: "This window closes fast. Before your email, Slack, and work systems go dark: save any work samples, performance reviews, commendations, project documentation, or contacts you&apos;ll need later. Do this legally — don&apos;t take proprietary data — but get what you&apos;re entitled to: your own performance reviews, your own work product where permitted, personal contacts you need.",
                },
                {
                  action: "Understand exactly what you were offered",
                  detail: "Read the separation agreement carefully. Don&apos;t sign it on day one — you typically have 21 days (or 45 days for group layoffs under the OWBPA) to review it. Understand: how many weeks of severance, when COBRA kicks in and how much it costs, what happens to unvested equity, and whether there are non-compete or non-disparagement clauses. If the package is large or the equity situation is complex, a 1-hour consultation with an employment attorney often pays for itself.",
                },
                {
                  action: "File for unemployment the day you&apos;re eligible",
                  detail: "In most US states, you can file the same week as your layoff. Don&apos;t wait. Processing can take 2–4 weeks, and benefits often run for 26 weeks. It&apos;s not a lot of money, but it extends your runway — which is the most important variable in a job search.",
                },
                {
                  action: "Calculate your real runway",
                  detail: "Monthly expenses minus severance, minus unemployment, minus any other income = how many months you can search without financial pressure. Build a simple spreadsheet. Being honest about this number tells you what kind of search pace you actually need to run.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[11px] font-bold text-[#4361EE]">{i + 1}</div>
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.action}</p>
                    <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Week 1: target clarity before job applications</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Most people start week one with their resume. The better move is to start with your target — because your resume, LinkedIn, and outreach all depend on knowing who you&apos;re targeting and why.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              The three questions to answer before you open a job board:
            </p>
            <div className="mt-4 space-y-3">
              {[
                { q: "What type of role am I targeting?", detail: "Same role at a different company? A step up in title? A pivot to an adjacent function? Being specific doesn&apos;t limit you — it makes your resume, your LinkedIn, and your networking conversations more coherent and more effective. A resume written for 'any PM role' is weaker than one written for 'senior PM at a B2B SaaS company'." },
                { q: "What size and stage of company do I want?", detail: "Series B startup, growth-stage company (Series C–D), large tech, enterprise, or Fortune 500 each require different things from candidates and offer different tradeoffs. Figure out which you&apos;re optimizing for before you start applying, because it affects which job boards you use, how you talk about your experience, and what equity expectations are realistic." },
                { q: "What am I not willing to compromise on?", detail: "Comp floor, remote/hybrid, industry, specific tech stack, team size. Writing down your actual constraints — not wishful thinking — prevents you from applying to roles you&apos;d turn down anyway, and from burning time on interviews that will never turn into offers you&apos;d accept." },
              ].map(item => (
                <div key={item.q} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="font-bold text-[var(--ink)]">{item.q}</p>
                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Week 1–2: your LinkedIn post and profile</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Posting about your layoff on LinkedIn is one of the highest-leverage early moves — if you do it right. It surfaces you to your network, signals availability to recruiters, and often generates warm outreach you wouldn&apos;t have gotten otherwise.
            </p>

            <div className="mt-5 rounded-xl border border-[var(--border)] overflow-hidden">
              <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                <h3 className="font-bold text-[var(--ink)]">The LinkedIn post that works</h3>
                <p className="mt-1 text-[13px] text-[var(--muted)]">Brief, professional, specific about what you&apos;re targeting. Don&apos;t make it an emotional eulogy for your last job.</p>
              </div>
              <div className="p-6">
                <blockquote className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-5 py-4 text-[14px] leading-7 text-[var(--ink)] italic">
                  &ldquo;After [X years] at [Company], I&apos;m among the group affected by [the recent reduction in force / the reorg / the team restructuring]. It was a strong team and I&apos;m proud of what we built — [brief, specific thing: 'scaled the data platform from 3 to 22 engineers' / 'launched the enterprise tier that became 40% of revenue'].
                  <br /><br />
                  I&apos;m now looking for my next [role type] role, ideally at [type of company]. If you know of anything or anyone worth talking to, I&apos;d genuinely appreciate the intro. Happy to do the same.
                  <br /><br />
                  [Your name] | [Your specialization] | [Location / Remote]&rdquo;
                </blockquote>
                <div className="mt-4 space-y-2">
                  <p className="text-[13px] font-semibold text-[var(--ink)]">What makes this work:</p>
                  <ul className="space-y-1 text-[13.5px] leading-6 text-[var(--muted)]">
                    <li>→ Names the accomplishment, not just the company — this tells readers what you&apos;re capable of</li>
                    <li>→ Specific about what you&apos;re targeting — easy for people to match you to opportunities</li>
                    <li>→ Offers reciprocity — &ldquo;happy to do the same&rdquo; — makes it feel less like a pure ask</li>
                    <li>→ Doesn&apos;t overshare or seek sympathy — professional, brief, forward-looking</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
              <p className="font-semibold text-[var(--ink)] mb-2">Update your profile in this order before the post goes live:</p>
              <ol className="space-y-2 text-[13.5px] leading-6 text-[var(--muted)]">
                <li>1. Headline → add &ldquo;· Open to [target roles]&rdquo; or &ldquo;· Exploring new opportunities&rdquo;</li>
                <li>2. Turn on &ldquo;Open to Work&rdquo; → set to &ldquo;Recruiters only&rdquo; or &ldquo;All LinkedIn members&rdquo; (both are fine; recruiters-only is subtler)</li>
                <li>3. Update your About section to reflect your target, not just your last role</li>
                <li>4. Make sure your most recent role has an end date — an open role with no end date confuses recruiters and ATS systems</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Week 2–4: the search system</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              A job search after a layoff is a funnel management problem. You need to track what&apos;s in each stage, know your conversion rates, and put your effort where it produces the most responses. Here&apos;s the system:
            </p>

            <div className="mt-5 space-y-4">
              {[
                {
                  channel: "Network (highest ROI, underused)",
                  target: "5–8 meaningful outreach messages per week",
                  guidance: "Not mass messages — specific asks to specific people. 'I saw [Company X] is hiring for [role]. Do you know anyone there I should talk to?' or 'I&apos;m targeting [type of role] and I&apos;d love 20 minutes to hear your perspective on [specific thing they know well].' Referrals convert to offers at 3–5x the rate of cold applications.",
                },
                {
                  channel: "Inbound from LinkedIn (medium ROI, passive)",
                  target: "Optimize profile once, then let it run",
                  guidance: "Recruiters search LinkedIn daily. If your headline, skills section, and About section use the right keywords for your target roles, inbound recruiter messages come in passively while you focus on active outreach. This is a one-time setup effort with ongoing returns.",
                },
                {
                  channel: "Direct applications (variable ROI)",
                  target: "5–10 targeted applications per week",
                  guidance: "Targeted, not spray. Tailor your resume to each job description — at minimum, adjust your summary and keywords to match the posting. Tools like Zari can do this quickly. Applying to 50 generic roles per week consistently underperforms 10 tailored applications.",
                },
                {
                  channel: "Recruiter outreach (medium ROI)",
                  target: "3–5 direct messages to recruiters per week",
                  guidance: "Search LinkedIn for recruiters at your target companies (search: 'recruiter [company name] [your target function]'). Message briefly: your background, your target, and a specific role you saw posted. Keep it to 3–4 sentences.",
                },
              ].map(item => (
                <div key={item.channel} className="rounded-xl border border-[var(--border)] bg-white p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="font-bold text-[var(--ink)] text-[14px]">{item.channel}</p>
                    <span className="shrink-0 rounded-full bg-[var(--brand)]/10 px-3 py-0.5 text-[11px] font-bold text-[#4361EE]">{item.target}</span>
                  </div>
                  <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.guidance}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">How to explain the layoff in interviews</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              This question carries almost no stigma when answered correctly. Layoffs are understood — especially after the mass tech and startup layoffs of 2023–2025. What interviewers are evaluating is whether you&apos;re self-aware, honest, and forward-looking.
            </p>

            <div className="mt-5 rounded-xl border border-[var(--border)] overflow-hidden">
              <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                <h3 className="font-bold text-[var(--ink)]">Script: explaining a layoff</h3>
              </div>
              <div className="p-6">
                <blockquote className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-5 py-4 text-[14px] leading-7 text-[var(--ink)] italic">
                  &ldquo;[Company] went through a significant reduction in force in [month] — [my role was eliminated / the [team] was restructured]. It wasn&apos;t performance-related; [X]% of the company was affected. I&apos;ve used the time since to [research my next move more carefully / complete a certification / do some advisory work], and I&apos;m now focusing specifically on [target role type]. What attracted me to this opportunity is [specific, relevant thing].&rdquo;
                </blockquote>
                <div className="mt-4 space-y-2 text-[13.5px] leading-6 text-[var(--muted)]">
                  <p><span className="font-semibold text-[var(--ink)]">Keep it short.</span> One to two sentences on the layoff, then immediately pivot to what you did next and why this role interests you.</p>
                  <p><span className="font-semibold text-[var(--ink)]">Don&apos;t editorialize.</span> Saying &ldquo;the company made some really bad decisions&rdquo; or &ldquo;the culture was already broken before the layoff&rdquo; doesn&apos;t help your candidacy even if it&apos;s true.</p>
                  <p><span className="font-semibold text-[var(--ink)]">Have the scale ready.</span> Interviewers often want to understand whether it was a targeted layoff (just you and a few others, which can raise questions) or a large RIF (which removes any ambiguity).</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Protecting your mental health during the search</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Job searching is structurally demoralizing — you get far more rejection than acceptance, most of your effort produces no visible result, and the timeline is uncertain. The psychological toll of a layoff compounds this. A few things that actually help:
            </p>
            <div className="mt-4 space-y-3">
              {[
                { tip: "Treat the search like a job with hours", detail: "Work defined hours on the search — 9am to 1pm, say — then stop. Searching all day every day leads to burnout faster than it leads to offers. The quality of 4 focused hours beats the quantity of 10 distracted ones." },
                { tip: "Track activity, not outcomes", detail: "You can&apos;t control response rates. You can control how many tailored applications you send, how many networking messages you write, how many interviews you prep for. Track the inputs. The outputs will follow." },
                { tip: "Build in structure that isn&apos;t the search", detail: "Exercise, social commitments, learning projects. The job search is only part of your week — if it becomes your entire identity, every rejection hits harder and you have less resilience for the next one." },
                { tip: "Tell people you trust, early", detail: "The instinct is to hide a layoff until you have a new job. The reality is that the people in your network are your best job search asset, and they can&apos;t help you if they don&apos;t know. Tell the people who can actually help — managers, mentors, close colleagues — within the first two weeks." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <span className="mt-0.5 text-[#4361EE] shrink-0">→</span>
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.tip}</p>
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
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Accelerate your post-layoff search with AI coaching</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari helps you tailor your resume to each role, optimize your LinkedIn for recruiter search, practice your layoff explanation and interview answers — so every application and conversation is as strong as possible.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Start coaching free →
            </Link>
          </section>
        </div>
      </article>
    </PageFrame>
  );
}
