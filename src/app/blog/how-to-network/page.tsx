import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Network Professionally — The Complete Guide (2025)",
  description:
    "Professional networking without being awkward or transactional. A practical guide to building genuine relationships that advance your career — with specific tactics for introverts, job seekers, and professionals building for the long term.",
  keywords: ["how to network", "professional networking", "networking for job seekers", "networking tips 2025", "how to network professionally", "networking for introverts", "career networking guide"],
  alternates: { canonical: "/blog/how-to-network" },
  openGraph: {
    title: "How to Network Professionally — The Complete Guide (2025)",
    description: "Build genuine professional relationships that advance your career — without feeling transactional or awkward.",
    url: "/blog/how-to-network",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const NETWORKING_MYTHS = [
  {
    myth: "Networking means going to events and collecting business cards",
    truth: "Most career-changing networking happens through 1:1 conversations, not group events. Events are useful for warm-up exposure, but the relationship is built in the follow-up. The most effective networkers spend 80% of their time deepening 20 key relationships, not broadcasting to hundreds.",
  },
  {
    myth: "Networking is only for when you need a job",
    truth: "Job-search networking is the hardest kind — you're asking for help from relationships that haven't been maintained. The professionals who consistently land good opportunities build their network when they're not looking, creating a pipeline of trust that activates naturally when they're ready to move.",
  },
  {
    myth: "Networking means asking people for jobs or referrals",
    truth: "Asking for a referral from someone who doesn't know your work is not networking — it's cold application with extra steps. Effective networking is about building relationships where the referral eventually comes naturally, because someone knows your caliber and thinks of you when the right role opens.",
  },
  {
    myth: "Introverts can't network effectively",
    truth: "Introverts often build stronger professional networks than extroverts because they invest in fewer, deeper relationships. The introvert advantage: a shorter but genuinely warm network of 20–30 people is worth more in career advancement than 500 weak LinkedIn connections. Depth over breadth works — and plays to introverts' natural strengths.",
  },
];

const NETWORKING_TACTICS = [
  {
    tactic: "The 10-person target list",
    when: "Always — build this proactively",
    how: "Identify 10 specific people whose career trajectory or knowledge would be genuinely valuable to you — not just 'useful contacts.' These aren't necessarily the most senior people you can find; they're people whose work you follow, admire, or want to understand better. Write down their names, why you want to connect, and what you'd genuinely like to ask them about.",
    why: "A named list forces specificity. You can't 'network more' in the abstract — you can reach out to one of these 10 people this week. The list creates actionability from an otherwise vague goal.",
  },
  {
    tactic: "The give-first message",
    when: "Every new outreach",
    how: "Lead every first message with something useful to the recipient — an article relevant to their work, an observation about their company or field, or a genuine specific compliment about their recent work or post. Then, briefly, a specific and limited ask. Not 'can we grab coffee,' which is open-ended, but 'would you have 20 minutes for a phone call about your transition from consulting to product?'",
    why: "Give-first reframes the exchange from 'can you do something for me' to 'I've been paying attention to your work and have something to share.' It works because it's not transactional — or at least it doesn't feel that way when done genuinely.",
  },
  {
    tactic: "The weekly outreach cadence",
    when: "Ongoing maintenance",
    how: "Block 30 minutes per week for networking maintenance: one proactive reach-out (new connection), two re-engagement messages (to existing contacts you haven't spoken to in 3–6 months), and one piece of content engagement (a thoughtful comment on someone's LinkedIn post that adds a perspective beyond 'great insight!'). This is 30 minutes weekly — not hours per day.",
    why: "Consistency beats intensity. A relationship maintained monthly is worth more than one reactivated in desperation. The 30-minute cadence means your network never goes entirely cold.",
  },
  {
    tactic: "The referral setup — not the referral ask",
    when: "When you're actively job searching",
    how: "Don't ask your network for a referral directly. Instead, share that you're exploring new opportunities, describe specifically the type of role and company you're targeting, and ask if they can suggest anyone who might be worth speaking to. Then ask: 'Would you be comfortable making an introduction?' The referral often follows naturally once you've had the conversation — you don't need to request it directly.",
    why: "A direct referral request puts people in an uncomfortable position if they don't know your work well enough to vouch for you. This approach lets them help in a way that feels comfortable — making an introduction — without needing to stake their reputation on a formal referral.",
  },
  {
    tactic: "The post-connection follow-through",
    when: "After every conversation",
    how: "Within 24 hours of any networking conversation, send a 3-sentence follow-up: (1) thank them for the specific thing you found most valuable, (2) mention something from the conversation you're going to act on, (3) offer something in return — an article, a connection, a resource. Then set a 90-day calendar reminder to reach out again with an update on what you acted on.",
    why: "The follow-through is where 90% of networkers fail. A follow-up that references the actual conversation and shows you acted on it is how a single conversation becomes a lasting relationship.",
  },
];

const LINKEDIN_NETWORKING = [
  { action: "Connect with a personalized note", detail: "Default LinkedIn connection requests get ignored at much higher rates. A 2–3 sentence note explaining why you want to connect and referencing something specific about their work dramatically improves acceptance rate — especially from strangers." },
  { action: "Engage before you reach out", detail: "Comment on someone's post 2–3 times before sending a connection request. By the time you reach out, you're not a stranger — you're someone who's been paying attention to their ideas." },
  { action: "Use LinkedIn to warm cold outreach", detail: "Before emailing someone cold, connect on LinkedIn and engage with their content. By the time you send the email, they may already recognize your name — turning cold outreach into a warm touch." },
  { action: "Share your own perspective regularly", detail: "Even one LinkedIn post per month sharing a professional observation, lesson, or resource makes you a known presence in your network. When you reach out, you're no longer a passive profile — you're a person with visible expertise." },
];

const FAQS = [
  { question: "How do you network if you don't know anyone in your target industry?", answer: "Start with warm second-degree connections — people in your target industry who are connected to someone you already know. Ask your current contacts for introductions. Then move to LinkedIn outreach using the give-first approach. Industry events, online communities (Slack groups, subreddits, Discord servers), and conference networking are useful for meeting people outside your existing network. Alumni networks are particularly underused — a shared school connection creates immediate common ground." },
  { question: "How long does networking take before it produces results?", answer: "For proactive networking (building relationships before you need them), meaningful results — introductions to jobs, referrals, opportunities — typically materialize in 3–12 months of consistent effort. For reactive networking during an active job search, referrals can produce interviews within 2–4 weeks when the request is specific and the relationship is already warm. The investment-to-return timeline for networking is longer than job board applications, but the conversion rate at each stage is dramatically higher." },
  { question: "Is it awkward to network with people you don't know?", answer: "Yes, for most people — and that's okay. The discomfort comes from the expectation that you're bothering someone or being transparently self-interested. The reframe that actually works: genuine curiosity about someone's career path or expertise is not a burden. Most professionals are willing to share 20 minutes of perspective when asked specifically and respectfully. The people who say yes are the right connections; the people who don't respond are simply busy, not offended." },
];

export default async function HowToNetworkPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-17";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="How to Network Professionally — The Complete Guide (2025)"
        description="Build genuine professional relationships that advance your career — without feeling transactional or awkward."
        url={`${BASE_URL}/blog/how-to-network`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "How to Network", url: `${BASE_URL}/blog/how-to-network` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Career Strategy · Networking</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">How to Network Professionally</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Most people network wrong — transactionally, during desperation, or not at all. The professionals who consistently land good opportunities do something different: they build genuine relationships before they need them. Here&apos;s how.
          </p>
        </div>
      </section>

      {/* Myths */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">4 networking myths that keep professionals stuck</h2>
          <div className="mt-8 space-y-4">
            {NETWORKING_MYTHS.map((item) => (
              <div key={item.myth} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex-shrink-0 rounded-lg bg-red-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600">Myth</span>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{item.myth}</p>
                    <div className="mt-3 flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 rounded-lg bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Truth</span>
                      <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.truth}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tactics */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">5 networking tactics that actually work</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">These are specific, repeatable actions — not vague advice like &ldquo;be authentic.&rdquo;</p>
          <div className="mt-8 space-y-5">
            {NETWORKING_TACTICS.map((item, i) => (
              <div key={item.tactic} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[14px] font-extrabold text-white">{i + 1}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-[var(--ink)]">{item.tactic}</h3>
                      <span className="rounded-full bg-[var(--brand)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">{item.when}</span>
                    </div>
                    <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]"><span className="font-semibold">How: </span>{item.how}</p>
                    <div className="mt-3 rounded-xl bg-[var(--brand)]/[0.05] p-3">
                      <p className="text-[12px] font-semibold text-[#4361EE]">Why it works: {item.why}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LinkedIn Networking */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">LinkedIn-specific networking tactics</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">LinkedIn is where most professional networking happens in 2025. These actions make you a presence, not just a profile.</p>
          <div className="mt-8 space-y-4">
            {LINKEDIN_NETWORKING.map((item, i) => (
              <div key={item.action} className="flex gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[12px] font-extrabold text-[#4361EE]">{i + 1}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.action}</p>
                  <p className="mt-1 text-[13.5px] text-[var(--muted)]">{item.detail}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Your network opens doors. Zari helps you walk through them.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Once you have the introduction, Zari optimizes your resume for the role, coaches your interview, and helps you negotiate the offer. Start free.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
