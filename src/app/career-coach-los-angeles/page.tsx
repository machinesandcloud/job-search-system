import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Los Angeles 2025 — AI Career Coaching for LA Professionals",
  description: "AI career coaching for Los Angeles professionals. LA salary benchmarks for tech, entertainment, aerospace, and creative industries. Resume optimization and interview prep for LA jobs.",
  keywords: ["career coach los angeles", "career coach la", "career counselor los angeles", "la career coach", "los angeles career coaching", "career coach southern california", "career coaching la 2025", "los angeles job search", "la salary negotiation", "career coach beverly hills"],
  alternates: { canonical: "/career-coach-los-angeles" },
  openGraph: { title: "Career Coach Los Angeles 2025 — AI Career Coaching for LA Professionals", description: "LA salary benchmarks, entertainment industry career coaching, and tech interview prep for Los Angeles professionals.", url: "/career-coach-los-angeles" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What industries are hiring the most in Los Angeles in 2025?", answer: "Los Angeles has a uniquely diversified economy. Top hiring sectors in 2025: Technology (Snap, TikTok US, Hulu, Riot Games, SpaceX's software division), Entertainment and streaming (Netflix, Disney, Warner Bros. Discovery, NBCUniversal — all major studio hubs), Aerospace and defense (SpaceX, Northrop Grumman, Raytheon, L3Harris), Healthcare (Cedars-Sinai, UCLA Health, Kaiser Permanente), Finance (hedge funds and private equity on the West Side), and Creative industries (advertising, UX/design, content). LA's tech sector has grown significantly, with Silicon Beach (Venice/Santa Monica) now a major startup corridor." },
  { question: "What are typical salaries in Los Angeles?", answer: "LA salaries are high but generally below SF/NYC for tech roles. 2025 benchmarks: Software Engineer at Snap/TikTok: $160,000–$280,000 TC; Senior SWE at Netflix/Hulu: $200,000–$350,000+ TC; Aerospace Engineer at SpaceX: $130,000–$200,000; Entertainment Executive (Director level): $150,000–$300,000; UX Designer: $110,000–$180,000; Healthcare (RN): $90,000–$140,000 (CA nursing premium is significant); Marketing Manager: $85,000–$135,000. California has no equity tax break — stock compensation is taxed as ordinary income at CA's top rate (13.3%)." },
  { question: "How competitive is the LA job market in 2025?", answer: "Highly competitive, especially in entertainment and tech. Entertainment roles routinely receive 200–500+ applications. Netflix's engineering roles get 1,000+ applicants per opening. The key differentiators: relevant portfolio work (especially in gaming, media, and design), prior relevant company experience, and a strong LinkedIn presence with LA-based network. For entertainment-adjacent tech roles (streaming platforms, gaming, VFX software), demonstrating passion for the product is weighted more heavily than at pure enterprise software companies." },
  { question: "Is Los Angeles good for remote work jobs?", answer: "Yes — LA has one of the strongest remote work cultures outside of SF. The cost of living (high, but lower than SF) and the large freelance/creative economy means LA professionals frequently work in hybrid or fully remote arrangements. For traditional industries like entertainment, in-person is still expected on set and in production — but business and technology roles at studios have largely gone hybrid. Companies like Snap and TikTok LA have flexible remote policies for many roles." },
];

const SALARIES = [
  { role: "Senior Software Engineer", company: "Netflix / Hulu / Disney+", range: "$200,000–$350,000+ TC", note: "RSU-heavy at streaming cos" },
  { role: "Software Engineer (Mid)", company: "Snap / TikTok US", range: "$160,000–$280,000 TC", note: "Strong Snap equity historically" },
  { role: "Aerospace Engineer", company: "SpaceX / Northrop / Raytheon", range: "$130,000–$200,000", note: "SpaceX pays below market, high mission-driven attrition" },
  { role: "Entertainment Executive (Dir)", company: "Disney / Warner / Netflix", range: "$150,000–$300,000", note: "Varies widely by tenure & division" },
  { role: "UX / Product Designer", company: "Tech / Creative agencies", range: "$110,000–$180,000", note: "Portfolio is the interview" },
  { role: "Marketing Manager", company: "Consumer brands / Studios", range: "$85,000–$135,000", note: "Broad range by sector" },
  { role: "Registered Nurse (RN)", company: "Cedars-Sinai / UCLA Health", range: "$90,000–$140,000", note: "CA nursing premium applies" },
];

export default async function CareerCoachLosAngelesPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Los Angeles 2025 — AI Career Coaching for LA Professionals"
        description="LA salary benchmarks, entertainment industry career coaching, and tech interview prep for Los Angeles professionals."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-los-angeles`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Los Angeles", url: `${BASE_URL}/career-coach-los-angeles` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 45%, #EC4899 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🌴 Los Angeles · Entertainment · Tech · Aerospace
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Los Angeles</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for LA&apos;s most competitive industries — streaming, gaming, aerospace, and Silicon Beach tech. Resume optimization, interview prep, and salary negotiation 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Los Angeles salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">LA compensation data. Note: California taxes equity as ordinary income (top rate 13.3%) — factor into TC comparisons.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#7C3AED]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for LA job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Entertainment industry prep", desc: "Interview coaching for Netflix, Disney, Warner, and streaming company roles — from engineering to content and business operations." },
              { title: "LA resume optimization", desc: "ATS scoring for LA job postings. Keyword optimization for entertainment, gaming, aerospace, and Silicon Beach tech roles." },
              { title: "Salary negotiation for CA", desc: "California-specific comp benchmarks. Equity compensation guidance including CA's ordinary income tax treatment of RSUs." },
              { title: "Aerospace & defense prep", desc: "Interview prep for SpaceX, Northrop Grumman, Raytheon, and LA's growing defense tech sector." },
              { title: "LinkedIn for LA recruiters", desc: "Headline and About section rewrite optimized for LA-based entertainment and tech recruiter searches." },
              { title: "Gaming industry coaching", desc: "Riot Games, Activision, and startup gaming company interview prep — including portfolio review and culture fit." },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="mb-2 font-bold text-[14px]">{title}</h3>
                <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #7C3AED 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your LA job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching for entertainment, tech, and aerospace roles in Los Angeles — available 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#7C3AED]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
