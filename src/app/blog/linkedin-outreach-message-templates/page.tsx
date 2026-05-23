import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "LinkedIn Outreach Message Templates That Get Replies (2025)",
  description:
    "Cold LinkedIn messages get ignored because they lead with what you want. These templates lead with value, keep it short, and make replying easy. Copy-paste templates for cold outreach, referral asks, informational interviews, and reconnecting.",
  keywords: ["linkedin outreach message templates", "linkedin cold message", "linkedin connection request message", "how to reach out on linkedin", "linkedin message for job referral", "linkedin informational interview request", "linkedin networking message 2025"],
  alternates: { canonical: "/blog/linkedin-outreach-message-templates" },
  openGraph: {
    title: "LinkedIn Outreach Message Templates That Get Replies (2025)",
    description: "Cold LinkedIn messages that lead with value and make replying easy — templates for every outreach scenario.",
    url: "/blog/linkedin-outreach-message-templates",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHY_MOST_FAIL = [
  {
    mistake: "Leading with what you need",
    fix: "Every effective outreach message leads with a specific reason the recipient should care — shared context, a genuine compliment on their work, a mutual connection's name, or a relevant observation. 'I'm looking for a job and saw you work at X' is a request with no offering. 'I read your post on distributed systems tradeoffs — it clarified something I've been thinking about' opens a conversation the person might want to have.",
  },
  {
    mistake: "Messages over 5 sentences",
    fix: "InMails and connection requests are read on mobile, in notification panes, between meetings. A 4-paragraph outreach message signals that you're going to be high-effort if they respond. Three sentences maximum: why you're reaching out, one specific thing that connects you to them, and a single low-friction ask. Short messages have higher response rates because they're easier to say yes to.",
  },
  {
    mistake: "Vague or high-commitment asks",
    fix: "'Would you be open to a quick chat sometime?' sounds harmless but requires the recipient to mentally schedule, commit, and coordinate — all before replying. 'I have one specific question about how your team evaluates system design candidates — would a 2-line reply work?' is infinitely easier to answer yes to. Match the size of your ask to where you are in the relationship.",
  },
  {
    mistake: "No specificity about who you are",
    fix: "Recruiters and senior professionals get dozens of generic messages. 'I'm a software engineer interested in your company' describes 10,000 people. 'I'm a senior backend engineer at Stripe, 6 years in distributed payments infrastructure, thinking about fintech-adjacent infrastructure roles next' gives them something to work with — and makes you memorable.",
  },
];

const TEMPLATES = [
  {
    scenario: "Cold connection request (no shared context)",
    when: "Reaching out to someone at a target company you have no shared connection with",
    template: `Hi [Name],

I've been following your work on [specific thing — their team, a post they wrote, a project they're associated with]. I'm a [your role] currently thinking about [relevant transition or goal] and your experience at [Company] seems directly relevant.

Would you be open to a brief question by message?

[Your name]`,
    tips: ["Reference something specific — not 'your career' but a post, project, or team", "Keep the ask to 'a question by message' — lowest possible commitment", "Don't attach a resume or mention you're job searching in the first message"],
  },
  {
    scenario: "Referral ask (warm — mutual connection)",
    when: "Someone in your network knows the person you want to reach, and they've agreed to make the intro",
    template: `Hi [Name],

[Mutual connection] suggested I reach out — they thought our work backgrounds might overlap usefully. I'm a [role/background] with [specific relevant experience], currently exploring [type of role] at companies like [Company].

If you have 15 minutes in the next few weeks, I'd genuinely value your perspective on how [Company] evaluates [specific thing — system design, culture fit, leveling]. No pressure at all.

[Your name]`,
    tips: ["Name the mutual connection in the first sentence — it provides instant credibility", "Be specific about what you want their perspective on — not 'anything you can share'", "The 'no pressure' line reduces friction and signals you're not desperate"],
  },
  {
    scenario: "Referral ask (cold — no shared contact)",
    when: "Applying to a role and wanting an internal referral from someone you don't know",
    template: `Hi [Name],

I'm applying for [Job Title] on your team (posted [date]) and noticed we have a shared background in [specific overlap — same school, same previous company, same technical area].

I have a strong match on the core requirements ([2-3 specific skills from the JD]) and would appreciate an internal referral if you feel comfortable after reviewing my background. I'm happy to share my resume for context.

Either way, I appreciate the connection.

[Your name]`,
    tips: ["Be direct — this is clearly a referral ask, don't pretend it's something else", "Name the specific role and date — shows you're organized and focused", "Give them an easy out ('if you feel comfortable') — removes pressure and paradoxically increases yes rate"],
  },
  {
    scenario: "Informational interview request",
    when: "Genuinely learning about a role, company, or career path — not primarily job searching",
    template: `Hi [Name],

I came across your background while researching [Company/role type]. I'm a [current role] thinking about transitioning into [target role/area] and your trajectory from [their background] to [their current role] is exactly the path I'm curious about.

I have two specific questions I'd love to get your take on: [Question 1]? And [Question 2]?

If you'd rather answer by message than a call, that works perfectly for me too.

[Your name]`,
    tips: ["State the two specific questions upfront — it proves you've thought about it and makes reply-by-message easy", "Referencing their specific career trajectory shows you researched them", "Offering the message option removes the meeting scheduling barrier entirely"],
  },
  {
    scenario: "Reconnecting with a dormant contact",
    when: "Reaching out to someone you knew but haven't spoken to in 1-3+ years",
    template: `Hi [Name],

It's been a while — I think the last time we caught up was [specific context: at X company, at Y event, in the Z program]. I hope things are going well at [their current company].

I've been [brief genuine update — what you've been building or working on]. I'm starting to think about [next move] and would love to reconnect — both to catch up and because your work at [their company] seems genuinely relevant to where I'm headed.

Open to a quick call if timing works?

[Your name]`,
    tips: ["A specific shared memory ('the last time we caught up was at...') immediately differentiates you from a generic reconnection", "Genuine update on yourself before the ask — don't lead with what you need", "Keep it warm but purposeful — awkward if it's purely transactional"],
  },
  {
    scenario: "Recruiter response (inbound)",
    when: "A recruiter messaged you first — optimizing your reply",
    template: `Hi [Name],

Thanks for reaching out — I appreciate it. [Company] is definitely on my radar, particularly the [specific area — engineering culture, product focus, mission].

I'm currently [open to roles/passively looking/happy where I am but curious]. If [specific role type] at [level] is what you're hiring for, I'd be glad to learn more — happy to start with a quick call or share more context about what I'm looking for.

[Your name]`,
    tips: ["Mention something specific about the company — it signals you're not responding to every recruiter", "State your status clearly so they can assess fit without guessing", "Don't ask 'what's the comp range?' in the first reply — it reads as transactional before you've established interest"],
  },
];

const FAQS = [
  { question: "What's the ideal length for a LinkedIn outreach message?", answer: "3-5 sentences for a connection request; 5-8 sentences maximum for a full InMail. Every word beyond that costs response rate. The goal of the first message is not to fully explain yourself — it's to get a reply. You can provide more context after they've responded. If you find yourself writing more than 5 sentences, you're trying to do too much in one message." },
  { question: "Should I mention I'm job searching in my first LinkedIn message?", answer: "No — not in a cold connection request. Mentioning job searching in the first message converts a potential conversation into a favor request before any relationship is established. Lead with genuine interest in the person's work, background, or perspective. Let the job search context emerge naturally in the reply — or wait until they've agreed to talk before mentioning it." },
  { question: "How do I ask for a referral without it being awkward?", answer: "Directness reduces awkwardness more than softening language does. 'I'm applying for [Role] and was hoping you might feel comfortable providing an internal referral' is cleaner than elaborate preamble that both parties know is building to a referral ask. Give them an easy out ('only if you feel comfortable after seeing my background') — people who have an out are more likely to say yes, not less. Also: send your resume in the same message so they don't have to ask." },
];

export default async function LinkedInOutreachTemplatesPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-18";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="LinkedIn Outreach Message Templates That Get Replies (2025)"
        description="Cold LinkedIn messages that lead with value and make replying easy — templates for every outreach scenario."
        url={`${BASE_URL}/blog/linkedin-outreach-message-templates`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "LinkedIn Outreach Templates", url: `${BASE_URL}/blog/linkedin-outreach-message-templates` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">LinkedIn · Networking</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">LinkedIn Outreach Message Templates</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most cold messages get ignored because they lead with what you need. These templates lead with value, stay short, and make replying easy — for every scenario.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={85} suffix="%" label="Of cold LinkedIn messages get no response" accent="#DC2626" />
            <StatCard value={3} suffix="x" label="Higher reply rate for messages under 5 sentences vs longer ones" accent="#059669" />
            <StatCard value={70} suffix="%" label="Of jobs filled through networking — LinkedIn is the primary channel" accent="#7C3AED" />
            <StatCard value={6} label="Outreach templates covering every scenario from cold to warm reconnect" accent="#0D7182" />
          </div>
        </div>
      </section>

      {/* Why most fail */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Why most LinkedIn messages get ignored — and how to fix each mistake</h2>
          <div className="mt-6 space-y-4">
            {WHY_MOST_FAIL.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] bg-white p-5">
                <div className="flex items-start gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-[11px] font-bold text-red-600">✗</span>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{item.mistake}</p>
                    <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Copy-paste templates for every outreach scenario</h2>
          <p className="mt-2 text-[13.5px] text-[var(--muted)]">Customize the bracketed fields. Keep everything else as close to the template as possible — the structure is what drives reply rate.</p>
          <div className="mt-6 space-y-6">
            {TEMPLATES.map((t, i) => (
              <div key={i} className="rounded-2xl border border-[var(--border)] overflow-hidden bg-white">
                <div className="border-b border-[var(--border)] bg-[var(--brand)]/[0.04] px-5 py-3">
                  <p className="font-bold text-[var(--ink)]">{t.scenario}</p>
                  <p className="text-[12px] text-[var(--muted)] mt-0.5">When to use: {t.when}</p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#4361EE] mb-3">Template</p>
                    <pre className="text-[12.5px] leading-6 text-[var(--ink)] whitespace-pre-wrap font-mono bg-[var(--bg)] border border-[var(--border)] rounded-xl p-4">{t.template}</pre>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-3">Key tips</p>
                    <ul className="space-y-2.5">
                      {t.tips.map((tip) => (
                        <li key={tip} className="flex gap-2 text-[13px] leading-5 text-[var(--muted)]"><span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">✓</span>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Common questions</h2>
          <div className="mt-7 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <p className="font-bold text-[var(--ink)]">{faq.question}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Need a custom outreach message? Zari writes it for you.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Tell Zari who you&apos;re reaching out to, your context, and what you want from the conversation. It writes a personalized message matched to your specific situation — not a generic template.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
