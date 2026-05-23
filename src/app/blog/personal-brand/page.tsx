import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Personal Branding for Professionals — How to Build Yours (2025)",
  description:
    "Personal branding isn't about becoming an influencer. It's about controlling what comes up when a recruiter Googles you. A practical guide to LinkedIn, content, and professional visibility for job seekers and professionals.",
  keywords: ["personal brand", "personal branding for professionals", "personal branding career", "how to build a personal brand", "personal brand linkedin", "professional personal brand 2025"],
  alternates: { canonical: "/blog/personal-brand" },
  openGraph: {
    title: "Personal Branding for Professionals — How to Build Yours (2025)",
    description: "Control what recruiters find when they search your name. A practical guide to personal branding for career growth.",
    url: "/blog/personal-brand",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const WHAT_PERSONAL_BRAND_ACTUALLY_IS = [
  {
    myth: "Personal brand = being a social media influencer",
    reality: "Personal brand is what people think when they hear your name. That impression is formed by your LinkedIn profile, your Google search results, what colleagues say about you, and whether you come up in conversations as 'the person who does X.' Most of this happens invisibly, without you ever posting content.",
  },
  {
    myth: "You only need a personal brand if you're job searching",
    reality: "The strongest personal brands are built between job searches — when you're not desperate. Candidates who are known in their field get recruited. People with a strong professional reputation negotiate from strength. Waiting until you need a job to build visibility is like buying car insurance after the accident.",
  },
  {
    myth: "Personal branding requires constant content creation",
    reality: "90% of personal brand impact comes from 3 things: a fully optimized LinkedIn profile, a specific professional identity (what you're known for), and a network that can vouch for you. Content creation is a multiplier — it's not the foundation.",
  },
];

const FOUNDATION_LAYERS = [
  {
    layer: "Your professional identity — the one sentence",
    priority: "Foundation",
    what: "The single sentence that defines what you do, who you do it for, and what you're known for. This is not your job title. It's the answer to 'what do you do?' that makes people immediately understand your value.",
    howTo: "Complete this template: 'I help [specific audience] achieve [specific outcome] through [specific method/expertise].' Example: 'I help Series B SaaS companies build the revenue operations infrastructure that scales from $5M to $50M ARR.'",
    whereItGoes: "LinkedIn headline, LinkedIn About summary, email signature, conference bio, portfolio site tagline — everywhere you appear professionally.",
  },
  {
    layer: "LinkedIn profile — your permanent first impression",
    priority: "Highest impact",
    what: "When recruiters, colleagues, or potential clients search your name, LinkedIn is the first result 90% of the time. Your LinkedIn profile IS your personal brand for most professional interactions.",
    howTo: "Optimize headline with primary keyword + value proposition (not just job title). Write About section as a 3-paragraph narrative: what you do, how you got there, what you're building toward. Fill every section: experience with outcome-oriented bullets, featured with your best work, skills with the 50 that matter for your target role.",
    whereItGoes: "Recruiter searches, Google searches of your name, every professional introduction, every cold email thread where someone looks you up.",
  },
  {
    layer: "Google search result — own your name",
    priority: "Defense layer",
    what: "Type your full name into Google. What comes up? If nothing comes up, you don't exist professionally. If something negative comes up, that's what people see. For most professionals, owning page 1 of your name search is achievable with a few low-effort assets.",
    howTo: "At minimum: LinkedIn (will rank #1 for most names), a personal website or About.me page (ranks #2–3), any industry publications or guest posts you've written, professional association membership pages. Set up a Google Alert for your name to monitor what appears.",
    whereItGoes: "Every time someone Googles you after meeting you — which is every time you meet someone.",
  },
  {
    layer: "Network reputation — what people say when you're not in the room",
    priority: "Highest leverage",
    what: "The most powerful personal brand is what people say about you to others. Referrals, recommendations, introductions — these come from a reputation built over time through reliable delivery, specific expertise, and being genuinely helpful to people in your network.",
    howTo: "Identify the 10 people in your network who, if they mentioned your name positively, would have the most career impact. Invest in those relationships proactively — share useful information, make introductions, offer help before you need anything. Give LinkedIn recommendations before asking for them.",
    whereItGoes: "Every job referral, every internal advocacy for your promotion, every introduction that opens a door — these flow through the reputation you've built with specific people.",
  },
];

const CONTENT_BY_EFFORT = [
  {
    effort: "Minimum viable (1–2 hours/month)",
    actions: ["Update LinkedIn 'Open to Work' status for targeted search when active", "Like and comment thoughtfully on 3–5 posts/week from people in your target industry", "Share one piece of industry news or insight per month with your own 2-sentence take"],
    impact: "Keeps you visible to your network without significant time investment. Enough to surface in LinkedIn feed and remind your network you exist.",
  },
  {
    effort: "Moderate (2–4 hours/month)",
    actions: ["Write 1 LinkedIn post per week sharing a lesson from your work, a framework you use, or an observation from your field", "Engage meaningfully with 10 specific people in your target field — comment, share, reply", "Request one LinkedIn recommendation from a recent collaborator per quarter"],
    impact: "Begins to build a searchable content archive on LinkedIn. Algorithm starts surfacing your profile in searches. Reinforces your professional identity externally.",
  },
  {
    effort: "Strategic (4–8 hours/month)",
    actions: ["Write one longer-form piece (newsletter, blog post, LinkedIn article) per month on a specific topic you own", "Guest post or speak at one industry event, webinar, or podcast per quarter", "Build a simple portfolio site or personal domain with your best work"],
    impact: "At this level, you're building a content trail that compounds. Recruiters and potential clients find you without you applying. The content works for you while you sleep.",
  },
];

const FAQS = [
  { question: "How long does it take to build a personal brand?", answer: "The passive layer (LinkedIn profile, Google search result) takes 2–4 hours of one-time work and shows effect immediately. The network reputation layer builds over 12–24 months of consistent professional engagement. The content layer — if you pursue it — shows measurable inbound effects after roughly 6 months of consistent posting. Most professionals dramatically overestimate how long it takes to get the foundational layer right and underestimate the compounding effect of the network layer." },
  { question: "Do I need to post on LinkedIn to build a personal brand?", answer: "No. LinkedIn posting is a multiplier, not the foundation. A fully optimized LinkedIn profile, a clear professional identity, and a strong network are more impactful than posting regularly with a weak profile or unclear expertise. Start with the foundation. Add content when you have something worth saying." },
  { question: "What's the difference between personal branding and self-promotion?", answer: "Self-promotion is talking about yourself. Personal branding is being known for something specific and valuable. The distinction matters because the most effective personal brand is built by creating value for others — sharing useful knowledge, making introductions, offering help. When people remember you for how you helped them, you have a brand. When they remember you for talking about yourself, you have a reputation problem." },
  { question: "Should I have a personal website?", answer: "For most professionals, LinkedIn is sufficient as a primary presence. A personal website adds value in specific situations: you're a freelancer or consultant (credibility), you're in a creative field where portfolio matters (proof of work), or your name is common and hard to own in search. If you're a salaried professional not actively freelancing, a well-optimized LinkedIn profile delivers more ROI than a personal site that requires ongoing maintenance." },
];

export default async function PersonalBrandPage() {
  const userId = await getCurrentUserId();
  const publishDate = "2025-05-16";

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd
        title="Personal Branding for Professionals — How to Build Yours (2025)"
        description="Control what recruiters find when they search your name. A practical guide to personal branding for career growth."
        url={`${BASE_URL}/blog/personal-brand`}
        datePublished={publishDate}
        dateModified={publishDate}
      />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Personal Brand", url: `${BASE_URL}/blog/personal-brand` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">Career Strategy · LinkedIn</div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Personal Branding for Professionals</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Personal branding isn&apos;t about becoming an influencer. It&apos;s about controlling what comes up when a recruiter Googles you — and being the name people think of when an opportunity opens in your field.
          </p>
        </div>
      </section>

      {/* Myths */}
      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">What personal branding actually is (and isn&apos;t)</h2>
          <div className="mt-8 space-y-4">
            {WHAT_PERSONAL_BRAND_ACTUALLY_IS.map((item) => (
              <div key={item.myth} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0 rounded-lg bg-red-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-red-600">Myth</div>
                  <div>
                    <p className="font-bold text-[var(--ink)]">{item.myth}</p>
                    <div className="mt-3 flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 rounded-lg bg-emerald-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Reality</div>
                      <p className="text-[13.5px] leading-6 text-[var(--muted)]">{item.reality}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foundation Layers */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">The 4 layers of a professional brand</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Build in this order. Each layer reinforces the next.</p>
          <div className="mt-8 space-y-5">
            {FOUNDATION_LAYERS.map((layer, i) => (
              <div key={layer.layer} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[14px] font-extrabold text-white">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-[var(--ink)]">{layer.layer}</h3>
                      <span className="rounded-full bg-[var(--brand)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">{layer.priority}</span>
                    </div>
                    <p className="mt-2 text-[13.5px] leading-6 text-[var(--muted)]">{layer.what}</p>
                    <div className="mt-4 rounded-xl border border-[var(--border)] bg-white p-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">How to do it</p>
                      <p className="text-[13px] leading-6 text-[var(--muted)]">{layer.howTo}</p>
                    </div>
                    <p className="mt-3 text-[12px] text-[var(--muted)]"><span className="font-semibold">Where it shows up: </span>{layer.whereItGoes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content by Effort */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Content strategy by time investment</h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">Pick the level that fits your schedule. The minimum viable option still works — the compounding is lower but the foundation is built.</p>
          <div className="mt-8 space-y-5">
            {CONTENT_BY_EFFORT.map((tier) => (
              <div key={tier.effort} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="font-bold text-[var(--ink)]">{tier.effort}</h3>
                <ul className="mt-3 space-y-2">
                  {tier.actions.map((action) => (
                    <li key={action} className="flex items-start gap-2 text-[13.5px] text-[var(--muted)]">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand)]" />
                      {action}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-lg bg-[var(--brand)]/[0.05] p-3">
                  <p className="text-[12px] font-semibold text-[#4361EE]">Impact: {tier.impact}</p>
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
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Start with the layer that matters most: your LinkedIn profile.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Zari audits and rewrites your LinkedIn headline, About section, and skills to maximize recruiter discoverability — the highest-ROI personal branding action you can take today.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(13,113,130,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
