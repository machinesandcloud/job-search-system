import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Is LinkedIn Premium Worth It in 2025? Honest Review",
  description: "Is LinkedIn Premium worth it in 2025? An honest review of LinkedIn Premium Career, the InMail credits, who viewed your profile, and whether it actually helps you find a job faster.",
  keywords: ["is linkedin premium worth it", "linkedin premium review", "linkedin premium 2025", "linkedin premium career", "linkedin premium cost", "linkedin premium features", "should i get linkedin premium", "linkedin premium job search", "linkedin premium vs free", "linkedin premium worth the money"],
  alternates: { canonical: "/blog/is-linkedin-premium-worth-it" },
  openGraph: { title: "Is LinkedIn Premium Worth It in 2025? Honest Review", description: "Honest review of LinkedIn Premium — which features matter for job seekers, which are overrated, and when it's worth paying for.", url: "/blog/is-linkedin-premium-worth-it" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What does LinkedIn Premium Career include?", answer: "LinkedIn Premium Career ($39.99/month in 2025) includes: (1) InMail credits — 5 per month to message people outside your network, (2) See who viewed your profile — full 90-day list vs 5 viewers on free, (3) Featured Applicant status — your application is highlighted to recruiters, (4) Applicant Insights — see how you compare to other applicants for a role, (5) LinkedIn Learning — access to LinkedIn's course library, (6) Open Profile — allows anyone to message you for free (bypasses InMail), (7) AI-powered tools — LinkedIn's AI writing assistant for messages and profiles (introduced 2023–2024). The most valuable features for job seekers are typically: seeing who viewed your profile (lets you identify active recruiters) and Open Profile (increases inbound recruiter messages)." },
  { question: "Does LinkedIn Premium actually help you find a job faster?", answer: "The evidence is mixed. The 'Featured Applicant' badge does increase your application's visibility to recruiters — LinkedIn's own data suggests Premium applicants are viewed ~2x more. However, this is correlation as much as causation — candidates motivated enough to pay for Premium also tend to apply more strategically. The InMail credits (5/month) are genuinely useful for reaching out to hiring managers directly, but 5/month is a very limited budget. The 'see who viewed your profile' feature is more valuable than it sounds — when a recruiter from your target company views your profile, reaching out immediately ('I noticed you viewed my profile...') has a meaningful response rate. Verdict: worth it for an active 3–6 month job search; probably not worth it for passive browsing." },
  { question: "Is LinkedIn Premium worth it for recruiters?", answer: "This review covers LinkedIn Premium Career (for job seekers). LinkedIn Recruiter (the tool recruiters use) is a separate, significantly more expensive product ($8,000–$10,000+/year for full Recruiter, $169.99/month for Recruiter Lite). Most individual recruiters at staffing agencies use Recruiter Lite. Internal corporate talent teams typically have Recruiter seats. The Premium plans (Career, Business, Sales Navigator) are for individuals — not the same as what recruiters use to search for candidates. Your Open to Work settings and profile optimization affect your visibility in Recruiter searches regardless of which Premium plan (if any) you have." },
  { question: "What's the best alternative to LinkedIn Premium for job seekers?", answer: "The most impactful thing a job seeker can do is optimize their free LinkedIn profile — specifically the headline (LinkedIn's most-searched field), the About section, and turning on Open to Work for recruiter-only visibility. These changes cost nothing and have more impact on recruiter inbound than the Premium badge. For reaching out to hiring managers without InMail credits: a personalized LinkedIn connection request (not InMail) has a ~50–60% acceptance rate and lets you message for free after connecting. Premium is a multiplier on top of a good profile — it doesn't substitute for a weak one." },
];

const FEATURES = [
  { feature: "See who viewed your profile", verdict: "High value", why: "Identify active recruiters at target companies; reach out immediately for best response rate" },
  { feature: "InMail credits (5/month)", verdict: "Medium value", why: "Useful but limited; connection request + DM is often better anyway" },
  { feature: "Featured Applicant status", verdict: "Medium value", why: "Increases visibility in recruiter view; not a magic bullet" },
  { feature: "Applicant Insights", verdict: "Low value", why: "Comparing yourself to other applicants rarely changes your strategy" },
  { feature: "Open Profile", verdict: "High value", why: "Allows anyone to contact you free — increases inbound from recruiters" },
  { feature: "LinkedIn Learning", verdict: "Low-medium value", why: "Coursera and YouTube are better for most skills; certificate value is low" },
  { feature: "AI writing assistant", verdict: "Medium value", why: "Useful for message drafting; specialized resume AI does more for job search" },
];

export default async function IsLinkedInPremiumWorthItPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-06-01";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Is LinkedIn Premium Worth It in 2025? Honest Review"
        description="Honest review of LinkedIn Premium — which features matter for job seekers, which are overrated, and when it's worth paying for."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/is-linkedin-premium-worth-it`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Is LinkedIn Premium Worth It", url: `${BASE_URL}/blog/is-linkedin-premium-worth-it` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0A66C2 50%, #0D7182 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            LinkedIn Premium · Career · Job Search 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Is LinkedIn Premium<br />
            <span className="text-white/50">Worth It in 2025?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            An honest feature-by-feature breakdown — which Premium features actually help job seekers, which are overrated, and when $39.99/month makes sense.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · 7 min read · $39.99/month</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">LinkedIn Premium features — rated for job seekers</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Feature-by-feature assessment for job seekers. Verdict is relative to the $39.99/month cost.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-3 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Feature</span><span>Value for job seekers</span><span>Why</span>
            </div>
            {FEATURES.map(({ feature, verdict, why }) => (
              <div key={feature} className="grid grid-cols-3 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{feature}</span>
                <span className={`font-semibold ${verdict === "High value" ? "text-[#059669]" : verdict === "Medium value" ? "text-[#D97706]" : "text-[var(--muted)]"}`}>{verdict}</span>
                <span className="text-[var(--muted)] text-[12px]">{why}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">When LinkedIn Premium is worth it — and when it isn&apos;t</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#059669]/30 bg-white p-6">
              <h3 className="mb-3 font-bold text-[14px] text-[#059669]">Worth it if...</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["You're in an active job search for 3–6 months", "You have specific target companies where you want to monitor recruiter activity", "You want to increase inbound recruiter contact via Open Profile", "You're targeting senior roles where InMail to hiring managers is useful", "A $39.99/month job search expense is reasonable vs your target salary"].map(p => <li key={p} className="flex gap-2"><span className="text-[#059669] flex-shrink-0">✓</span>{p}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <h3 className="mb-3 font-bold text-[14px] text-[#EF4444]">Not worth it if...</h3>
              <ul className="space-y-2 text-[13px] text-[var(--muted)]">
                {["You're passively looking and applying occasionally", "Your free profile isn't optimized yet (fix that first)", "You're hoping Premium compensates for a weak profile", "You're not using InMail credits or the 'who viewed you' feature actively", "You just want LinkedIn Learning (cheaper alternatives exist)"].map(p => <li key={p} className="flex gap-2"><span className="text-[#EF4444] flex-shrink-0">✗</span>{p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="mb-2 font-bold text-[14px]">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0A66C2 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Optimize your LinkedIn profile first.</h2>
          <p className="mb-8 text-[15px] text-white/55">Zari rewrites your LinkedIn headline and About section for recruiter searches — the free change that beats Premium. Free to start.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0A66C2]">Optimise my LinkedIn free</Link>
            <Link href="/linkedin-profile-writer" className="inline-block rounded-xl border border-white/20 bg-white/[0.08] px-6 py-4 text-[14px] font-semibold text-white">LinkedIn profile writer →</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
