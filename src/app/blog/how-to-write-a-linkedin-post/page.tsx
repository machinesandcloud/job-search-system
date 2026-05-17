import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Write a LinkedIn Post That Gets Seen (2025)",
  description:
    "LinkedIn's algorithm rewards posts that generate early engagement — but most professionals write posts that no one sees or comments on. The hook problem, the structure that drives comments, what topics consistently outperform, and how to build a presence that brings inbound recruiter interest without posting every day.",
  keywords: ["how to write a linkedin post", "linkedin post ideas", "linkedin content strategy", "linkedin algorithm 2025", "linkedin personal brand", "linkedin posts that get engagement", "linkedin visibility", "linkedin for job seekers"],
  alternates: { canonical: "/blog/how-to-write-a-linkedin-post" },
  openGraph: {
    title: "How to Write a LinkedIn Post That Gets Seen (2025)",
    description: "LinkedIn rewards early engagement. Most posts get none because the hook loses the reader in the first line. The structure, topics, and cadence that builds genuine visibility.",
    url: "/blog/how-to-write-a-linkedin-post",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  {
    question: "How often should I post on LinkedIn to build visibility?",
    answer: "Consistency matters more than volume. Two to three posts per week that generate genuine engagement will build more visibility than daily posts that get no comments. LinkedIn's algorithm heavily weights early engagement — a post that gets 5 comments in the first hour outperforms a post that gets 20 likes over 3 days. Quality and timing beat frequency.",
  },
  {
    question: "Should I post about my job search on LinkedIn?",
    answer: "Yes — but not in the way most people do. 'I'm open to opportunities' as a standalone post rarely generates meaningful engagement. More effective: post about what you learned from your last role, a problem you solved, or a perspective on your industry. That demonstrates competence while signaling availability. Recruiters respond to evidence of expertise, not announcements of need.",
  },
  {
    question: "What's the best time to post on LinkedIn?",
    answer: "Tuesday through Thursday, between 8–10am and 5–6pm in your target audience's timezone, historically outperforms. But the research-based answer is: look at your own LinkedIn analytics after posting a few times. Your specific audience has their own habits. The bigger lever is the hook — a great post at a suboptimal time outperforms a weak post at peak hours.",
  },
  {
    question: "Does LinkedIn penalize posts with external links?",
    answer: "LinkedIn's algorithm does reduce the reach of posts that include external URLs — because LinkedIn wants users to stay on LinkedIn, not click away. The standard workaround: don't include the link in the post body. Put it in the first comment and mention in the post 'link in comments.' This is widely known and effective.",
  },
  {
    question: "How do I write a LinkedIn post about a job loss or layoff?",
    answer: "Be direct but forward-looking. The posts that get the most positive engagement from layoffs lead with the accomplishment at the company, not the loss — then end with what you're looking for and invite connection. Vulnerability resonates; neediness doesn't. 'After 4 years at [Company] where I built X and achieved Y, I'm now exploring opportunities in Z — I'd love to connect with anyone in [space]' is far stronger than 'Unfortunately, I was laid off today.'",
  },
];

const POST_STRUCTURES = [
  {
    name: "The Counterintuitive Insight",
    hook: "Everyone says [common belief]. Here's why that's wrong.",
    body: "Explain the nuance with a specific example, data point, or experience. The disagreement is what drives engagement — people want to agree, disagree, or share the post to spark discussion.",
    bestFor: "Senior professionals with genuine opinions. Works especially well in strategy, product, finance, and leadership.",
    example: '"Everyone says you need to quantify every bullet on your resume. Here\'s the real answer: if you can\'t quantify it specifically, making up a number is worse than nothing. What matters is specificity — not fake precision."',
  },
  {
    name: "The Specific Lesson",
    hook: "I [did/learned/failed/noticed something specific]. Here's what it taught me.",
    body: "One concrete thing that happened, what you took from it, and why it applies beyond your situation. The more specific the incident, the more universal the takeaway feels.",
    bestFor: "Anyone with genuine experience. The key is the specificity — 'I got passed over for a promotion' is weaker than 'I got passed over for a promotion despite having the highest close rate on my team. Here's what I found out.'",
    example: '"I negotiated my last offer by $22,000. The only thing I said differently: instead of asking \'is there any flexibility?\' I said \'Based on my research, the market range for this role is $X–$Y. Is $Y achievable?\' The framing mattered."',
  },
  {
    name: "The Short Framework",
    hook: "[Number] things I wish I knew about [topic] before [experience].",
    body: "Numbered lists outperform prose for LinkedIn reach because they're easy to skim. Keep each point to 1–2 lines. The value density is what drives saves and shares.",
    bestFor: "Tactical, actionable topics. Works well for career advice, job search, industry observations, tool recommendations.",
    example: '"5 things I wish I knew before my first executive interview:\n1. They\'re testing judgment, not knowledge\n2. \'Tell me about yourself\' has a right answer structure\n3. The questions you ask matter as much as the ones you answer\n4. Silence is normal — don\'t fill it\n5. They\'ve already decided before the final round"',
  },
  {
    name: "The Honest Observation",
    hook: "Something I've noticed: [observation that others haven't said out loud].",
    body: "LinkedIn rewards saying what everyone is thinking but hasn't posted. Industry trends, hiring patterns, workplace dynamics. The post that names a shared frustration or validates a common experience generates comments fastest.",
    bestFor: "Industry veterans. Requires enough experience to have genuine observations that are non-obvious.",
    example: '"Something I\'ve noticed in 200+ resume reviews: the candidates who got the most callbacks didn\'t have the most impressive titles. They had the clearest before/after language. \'Inherited a team with 40% attrition, reduced it to 8% in 12 months\' beats \'Director at Fortune 500\' every time."',
  },
];

export default async function HowToWriteLinkedInPostPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Write a LinkedIn Post That Gets Seen (2025)"
        description="LinkedIn's algorithm rewards early engagement. Most posts get none. The hook problem, the post structures that drive comments, and how to build a presence that generates inbound recruiter interest."
        url={`${BASE_URL}/blog/how-to-write-a-linkedin-post`}
        datePublished="2025-05-17"
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Write a LinkedIn Post", url: `${BASE_URL}/blog/how-to-write-a-linkedin-post` },
      ]} />

      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">LinkedIn</div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.07] tracking-[-0.03em]">How to Write a LinkedIn Post That Gets Seen</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/55">LinkedIn&apos;s algorithm rewards early engagement — but most professionals write posts that generate no comments in the first hour and disappear. The hook, structure, and topic choices that change that.</p>
          <div className="mt-6 flex items-center gap-4 text-[12px] text-white/35">
            <span>10 min read</span><span>·</span><span>May 2025</span>
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Why most LinkedIn posts get no engagement</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              LinkedIn&apos;s algorithm is built around one thing: early engagement. When you post, LinkedIn shows your content to a small initial sample — roughly 2–5% of your connections. If that sample engages (likes, comments, shares) within the first 60–90 minutes, LinkedIn expands distribution. If it doesn&apos;t, the post effectively dies.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              Most posts fail at the hook — the first one or two lines visible before the reader clicks &ldquo;see more.&rdquo; Those lines determine whether anyone reads the rest. Generic opening lines like &ldquo;I&apos;m excited to share...&rdquo; or &ldquo;Grateful for this opportunity...&rdquo; train readers to scroll past. The posts that generate early comments start with something that creates a reason to keep reading.
            </p>
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50/30 p-6">
              <p className="text-[13px] font-bold uppercase tracking-wider text-red-400 mb-3">Hooks that kill reach</p>
              <div className="space-y-2">
                {[
                  '"Excited to share that I just started a new role at..."',
                  '"Grateful and humbled to announce..."',
                  '"I\'ve been thinking a lot about [broad topic] lately..."',
                  '"Here are my thoughts on [topic]:"',
                ].map((hook, i) => (
                  <div key={i} className="flex gap-2 text-[13.5px] text-[var(--muted)]">
                    <span className="text-red-400 shrink-0">✗</span> {hook}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] text-[var(--muted)]">These lines are technically fine, but they give the reader no reason to click &ldquo;see more.&rdquo; They signal: this post is about you, not for me.</p>
            </div>
            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/30 p-6">
              <p className="text-[13px] font-bold uppercase tracking-wider text-emerald-600 mb-3">Hooks that earn the click</p>
              <div className="space-y-2">
                {[
                  '"I got rejected from 14 companies before getting the offer I wanted. Here\'s the one thing I changed."',
                  '"Most salary negotiations fail in the first sentence. Here\'s why."',
                  '"I\'ve reviewed 200+ resumes this year. The pattern that separates callbacks from rejections is not what you think."',
                  '"Everyone says to follow up after a job interview. Almost no one does it correctly."',
                ].map((hook, i) => (
                  <div key={i} className="flex gap-2 text-[13.5px] text-[var(--muted)]">
                    <span className="text-emerald-500 shrink-0">✓</span> {hook}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] text-[var(--muted)]">Each of these creates a gap — an unanswered question that the reader wants resolved. That&apos;s what earns the &ldquo;see more&rdquo; click.</p>
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Four post structures that consistently outperform</h2>
            <div className="mt-6 space-y-6">
              {POST_STRUCTURES.map((structure, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-[var(--border)]">
                  <div className="border-b border-[var(--border)] bg-[var(--bg)] px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[12px] font-bold text-[var(--brand)]">{i + 1}</div>
                      <h3 className="font-bold text-[var(--ink)]">{structure.name}</h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5">Hook formula</p>
                      <p className="text-[14px] text-[var(--ink)] italic">{structure.hook}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5">How it works</p>
                      <p className="text-[13.5px] leading-6 text-[var(--muted)]">{structure.body}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5">Best for</p>
                      <p className="text-[13.5px] leading-6 text-[var(--muted)]">{structure.bestFor}</p>
                    </div>
                    <div className="rounded-lg border border-[var(--brand)]/15 bg-[var(--brand)]/[0.03] px-5 py-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)] mb-2">Example</p>
                      <p className="text-[13.5px] leading-6 text-[var(--muted)] whitespace-pre-line">{structure.example}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">The post format that gets more reach</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">LinkedIn&apos;s mobile-first rendering means formatting matters. A few rules that affect reach:</p>
            <div className="mt-5 space-y-3">
              {[
                { rule: "Short first line", detail: "Your hook needs to be 1–2 sentences, ending before the 'see more' cut (roughly 210 characters). After that, you have unlimited space — but you've lost most readers if the hook didn't hook." },
                { rule: "Line breaks between paragraphs", detail: "Dense paragraph text looks like work on mobile. Single-sentence lines separated by white space are dramatically easier to read and get longer scroll time. LinkedIn's algorithm notices scroll time." },
                { rule: "No external links in the post body", detail: "LinkedIn reduces reach on posts with external URLs. Put any links in the first comment and reference it in the post text ('link in first comment'). This is well-established and widely used." },
                { rule: "End with an invitation to engage", detail: "Not 'like and share' — that's spam. Instead: a genuine question ('What's your experience been?'), a soft challenge ('Disagree? Let me know why.'), or an invitation ('If this was useful, share it with someone in a job search'). Engagement triggers more reach." },
                { rule: "Post timing", detail: "Tuesday–Thursday, 8–10am or 5–6pm in your audience's timezone. But timing is a distant second to hook quality. A great hook at 11pm outperforms a weak hook at peak hours." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[11px] font-bold text-[var(--brand)]">{i + 1}</div>
                  <div>
                    <p className="font-semibold text-[var(--ink)] text-[14px]">{item.rule}</p>
                    <p className="mt-1 text-[13.5px] leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[1.5rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">LinkedIn content for job seekers specifically</h2>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              If you&apos;re in an active job search, LinkedIn content serves a specific purpose: demonstrating competence so that recruiters find you, and keeping you visible to your network before you need to ask for anything. The mistake most job seekers make is posting only when they need something.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { topic: "Lessons from your most recent role", why: "Shows depth and reflection. Signals domain expertise to recruiters who scan profiles. 'Three things I learned building the sales ops function at [company] from scratch' is more valuable than any LinkedIn headline." },
                { topic: "A counterintuitive observation from your industry", why: "Demonstrates that you think beyond the obvious — which is exactly what hiring managers want to see in senior hires. Works especially well for strategy, product, and leadership roles." },
                { topic: "A specific problem you solved and how", why: "Case-study format is the most persuasive content format on LinkedIn. 'We were losing customers at month 3. Here's what we found and what we changed.' This is a job interview in public." },
                { topic: "A reaction to a relevant industry development", why: "Shows you're current and engaged. Easier to write than original insights because you're responding to existing content. The key is having a real opinion — not just 'this is interesting.'" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                  <p className="font-bold text-[var(--ink)] text-[14px]">{item.topic}</p>
                  <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.why}</p>
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
            <h3 className="text-[1.2rem] font-extrabold text-[var(--ink)]">Get your LinkedIn profile optimized for recruiter visibility</h3>
            <p className="mt-3 text-[14px] text-[var(--muted)]">Zari coaches your full LinkedIn profile — headline, About section, experience bullets, and skills ordering — so you show up in recruiter searches before you even need to post. Posts work better when your profile converts the traffic they send.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-7 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.25)] transition-all hover:-translate-y-0.5">
              Optimize my LinkedIn profile →
            </Link>
          </section>

        </div>
      </article>
    </PageFrame>
  );
}
