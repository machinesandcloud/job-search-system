import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Denver 2025 — AI Career Coaching for Denver Colorado Professionals",
  description: "AI career coaching for Denver professionals. Denver salary benchmarks for tech, aerospace, and government. Resume optimization and interview prep for Lockheed Martin, Raytheon, and Denver's top employers.",
  keywords: ["career coach denver", "career counselor denver", "denver career coach", "career coaching denver co", "denver tech jobs 2025", "denver salary negotiation", "career coach colorado", "lockheed martin denver", "aerospace career coach", "denver startup jobs"],
  alternates: { canonical: "/career-coach-denver" },
  openGraph: { title: "Career Coach Denver 2025 — AI Career Coaching for Denver Colorado Professionals", description: "Denver salary benchmarks for tech, aerospace, and government. Resume optimization for Denver's growing tech scene.", url: "/career-coach-denver" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What industries are growing in Denver in 2025?", answer: "Denver's economy is increasingly tech-driven, with strong roots in aerospace and government. Key sectors: (1) Technology — Denver/Boulder has become one of the strongest mid-tier tech markets in the US. Major employers include Palantir HQ, Re/Max HQ, Dish Network HQ, and large offices of Google, Amazon, and Twitter/X. The Denver startup scene is strong with CleanTech, HealthTech, and SaaS. (2) Aerospace and defense — Lockheed Martin Space HQ (Littleton), Raytheon Space & Airborne Systems, Northrop Grumman, Ball Aerospace (now BAE Systems), and the US Space Force (Schriever AFB / Space Command). (3) Government and federal contractors — significant federal government presence including the DoD, FEMA, and multiple military installations." },
  { question: "What are Denver's salary levels compared to other tech cities?", answer: "Denver is a mid-tier tech market by compensation — significantly below SF/Seattle/NYC, somewhat below Austin, but with a lower cost of living than any coastal city. 2025 benchmarks: Senior SWE: $130,000–$200,000 TC; Aerospace Engineer: $100,000–$160,000; Government/Cleared Engineer: $100,000–$170,000 (plus clearance premium); Data Scientist: $110,000–$175,000 TC. Colorado has a flat income tax of 4.4% — lower than most states. Denver's quality of life (proximity to mountains, outdoor recreation) creates a talent retention factor that makes the compensation levels competitive in real terms for many professionals." },
  { question: "Is a security clearance required for Denver aerospace jobs?", answer: "Many — though not all. The aerospace and defense companies in the Denver area (Lockheed Martin Space, Raytheon, Northrop, Ball Aerospace) have a mix of clearance-required and non-clearance roles. The US Space Force HQ presence has increased demand for cleared professionals. Key fact: having an active security clearance (Secret or TS/SCI) commands a meaningful salary premium in this market — typically 10–20% above equivalent non-cleared roles. If you're transitioning from another cleared environment (military, another defense contractor, government), this is a significant asset in the Denver job market. Zari's resume coaching highlights clearance credentials in the format contractors look for." },
  { question: "What makes Denver a good city for remote work?", answer: "Denver has become one of the preferred remote work destinations in the US. The combination of no proximity to a single dominant employer, Mountain Time Zone (advantageous for both East and West Coast overlap), high quality of life, and a relatively affordable cost of living (compared to coastal cities) make it a popular choice for remote workers from SF, NYC, and Seattle. The Denver tech ecosystem has grown in part because of this trend — many remote-first companies have employees in the Denver area, which has fed the local startup community. For job seekers, Denver-based remote roles in tech are plentiful, and the local networking community is welcoming to newcomers." },
];

const SALARIES = [
  { role: "Senior Software Engineer", company: "Palantir / Google Denver / AWS", range: "$130,000–$200,000 TC", note: "Strong SaaS + GovTech market" },
  { role: "Aerospace Engineer", company: "Lockheed Martin Space / Raytheon", range: "$100,000–$160,000", note: "Clearance premium adds ~15–20%" },
  { role: "Cleared Software Engineer", company: "Defense contractors / Gov", range: "$130,000–$190,000 TC", note: "Clearance commands premium in Denver" },
  { role: "Data Scientist", company: "Tech / Health / Startup", range: "$110,000–$175,000 TC", note: "HealthTech demand growing" },
  { role: "Product Manager", company: "Denver SaaS / Startup", range: "$120,000–$190,000 TC", note: "Strong Boulder–Denver SaaS corridor" },
  { role: "Healthcare (RN)", company: "UCHealth / SCL Health", range: "$75,000–$110,000", note: "Mountain West premium below coastal" },
  { role: "Marketing Manager", company: "Tech / Startup / Consumer", range: "$80,000–$125,000", note: "Outdoor/lifestyle brands strong in CO" },
];

export default async function CareerCoachDenverPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Denver 2025 — AI Career Coaching for Denver Colorado Professionals"
        description="Denver salary benchmarks for tech, aerospace, and government. Resume optimization for Denver's growing tech scene."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-denver`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Denver", url: `${BASE_URL}/career-coach-denver` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #2563EB 45%, #059669 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🏔️ Denver CO · Tech · Aerospace · Defense
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Denver</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for Denver&apos;s growing tech scene and world-class aerospace and defense market. Security clearance coaching, salary negotiation, and resume optimization 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Denver salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">Colorado flat income tax of 4.4% + high quality of life makes Denver compensation competitive in real terms.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range (TC)</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#2563EB]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for Denver job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Aerospace & defense prep", desc: "Lockheed Martin, Raytheon, Ball Aerospace, and US Space Force contractor interview coaching and resume optimization." },
              { title: "Security clearance positioning", desc: "Resume highlighting of active clearances (Secret/TS/SCI) in the format Denver defense contractors expect." },
              { title: "Denver tech interview prep", desc: "Palantir, GovTech, and Denver SaaS startup interview coaching. GovTech and defense tech specific technical prep." },
              { title: "Denver salary negotiation", desc: "Denver market comp benchmarks with clearance premium calculations and Colorado tax context." },
              { title: "Remote work job strategy", desc: "Strategy for landing remote roles while based in Denver — Mountain Time Zone positioning and remote-first company targeting." },
              { title: "LinkedIn for Denver recruiters", desc: "Headline and About section optimization for Denver aerospace, tech, and government contractor recruiter searches." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #2563EB 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your Denver job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching for Denver&apos;s tech, aerospace, and defense markets — 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#2563EB]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
