import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach Washington DC 2025 — AI Career Coaching for DC Professionals",
  description: "AI career coaching for Washington DC professionals. DC salary benchmarks for government, defense, consulting, and policy. Resume optimization and interview prep for DC's top employers.",
  keywords: ["career coach washington dc", "career counselor dc", "washington dc career coach", "career coaching dc", "dc government jobs", "federal career coach", "defense contractor career coach", "dc consulting career", "policy career coaching", "booz allen interview prep"],
  alternates: { canonical: "/career-coach-washington-dc" },
  openGraph: { title: "Career Coach Washington DC 2025 — AI Career Coaching for DC Professionals", description: "DC salary benchmarks for government, defense contracting, and consulting. Career coaching for Washington DC's unique job market.", url: "/career-coach-washington-dc" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What makes Washington DC's job market unique?", answer: "Washington DC has the most unique job market in the US — it's the only major city where the federal government is the primary economic anchor. This creates several distinctive dynamics: (1) Government and government-adjacent roles (policy, contracting, lobbying, legal) have no real equivalent elsewhere; (2) Security clearances are a meaningful career asset in the DC metro, with cleared professionals earning 15–25% premiums; (3) The consulting sector (Deloitte Federal, Booz Allen Hamilton, Leidos, SAIC, MITRE) is massive and government-focused — different from commercial consulting; (4) The political appointment cycle creates career volatility at senior government levels; (5) DC salaries are high but cost of living (Northern Virginia, DC proper) is also substantial." },
  { question: "How much do federal government jobs pay in Washington DC?", answer: "Federal civilian salaries are governed by the GS (General Schedule) pay scale. 2025 GS rates in the DC locality (DC pays a locality adjustment): GS-11 (entry professional): $75,000–$98,000; GS-12: $89,000–$116,000; GS-13: $106,000–$138,000; GS-14: $125,000–$163,000; GS-15 (senior): $147,000–$191,000; Senior Executive Service (SES): $141,000–$221,900 (capped). Federal jobs pay below comparable private sector for most technical roles, but the benefits (pension, healthcare, stability) are substantial — especially FERS (Federal Employees Retirement System) with 3% employer contribution. Defense contractors typically pay 20–40% above GS rates for equivalent roles." },
  { question: "What are the top defense contractors and consulting firms in DC?", answer: "The DC metro is the center of the defense and government consulting industry. Major defense contractors: Booz Allen Hamilton (HQ McLean VA), Leidos (HQ Reston VA), SAIC (HQ Reston VA), General Dynamics IT, Northrop Grumman (HQ Falls Church VA), Raytheon Intelligence, L3Harris, BAE Systems US. Major government consulting: Deloitte Federal, PwC Federal, McKinsey Public Sector, Accenture Federal, MITRE Corporation (nonprofit FFRDC), RAND Corporation. Policy and think tanks: Brookings Institution, CSIS, CFR, Heritage Foundation. For professionals with clearances or subject matter expertise in defense, intel, or healthcare policy, this ecosystem offers some of the most interesting and well-compensated work in the country." },
  { question: "Do I need a security clearance to work in DC?", answer: "Not necessarily, but it dramatically expands your options. Roughly 25–30% of the DC metro workforce holds some form of clearance. For government contracting, cleared roles often pay a premium — cleared software engineers at defense contractors in Northern Virginia typically earn $20,000–$40,000 more than uncleared equivalents. If you don't have a clearance but want to work in the defense/intel sector, most contractors will sponsor you for one once hired into an appropriate role — the process takes 6–18 months depending on the clearance level. Key: even applying for government contractor roles often requires US citizenship, which narrows the pool." },
];

const SALARIES = [
  { role: "Software Engineer (Cleared)", company: "Booz Allen / Leidos / SAIC", range: "$130,000–$200,000", note: "TS/SCI clearance adds 20–30% premium" },
  { role: "Federal Contractor (Senior)", company: "Defense / IT contractors", range: "$120,000–$190,000", note: "Typically 20–40% above GS equivalent" },
  { role: "Federal Employee (GS-13–15)", company: "Federal agencies", range: "$106,000–$191,000", note: "Plus pension / benefits; below pvt sector" },
  { role: "Management Consultant", company: "Deloitte Federal / Accenture Fed", range: "$100,000–$170,000 base", note: "Government consulting lower than commercial" },
  { role: "Policy Analyst / Researcher", company: "Agencies / Think tanks", range: "$70,000–$130,000", note: "Wide range by org type and level" },
  { role: "Lobbyist / Government Affairs", company: "Law firms / Associations", range: "$120,000–$250,000+", note: "Varies hugely by seniority and sector" },
  { role: "Healthcare (RN)", company: "MedStar / Inova / VA Hospitals", range: "$80,000–$120,000", note: "VA federal nursing competitive" },
];

export default async function CareerCoachWashingtonDCPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach Washington DC 2025 — AI Career Coaching for DC Professionals"
        description="DC salary benchmarks for government, defense contracting, and consulting. Career coaching for Washington DC's unique job market."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-washington-dc`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach Washington DC", url: `${BASE_URL}/career-coach-washington-dc` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1E3A5F 50%, #7C3AED 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            🏛️ Washington DC · Government · Defense · Policy
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">Washington DC</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for DC&apos;s unique job market — federal government, defense contracting, policy, and Beltway consulting. Security clearance strategy, salary negotiation, and resume optimization 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Available 24/7 · No scheduling</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">Washington DC salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">DC metro compensation data. Security clearances command 15–30% salary premiums for technical and analytical roles.</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Where</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#1E3A5F]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for DC job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Federal job application coaching", desc: "USAJOBS resume formatting, KSA (Knowledge, Skills, Abilities) statement writing, and federal application strategy." },
              { title: "Defense contractor prep", desc: "Booz Allen, Leidos, SAIC, and General Dynamics interview coaching — technical, analytical, and program management roles." },
              { title: "Security clearance positioning", desc: "Resume highlighting of active clearances (Secret/TS/SCI/Poly) in the format DC employers expect. Clearance reinvestigation prep." },
              { title: "Government consulting prep", desc: "Deloitte Federal, Accenture Federal, and McKinsey Public Sector interview coaching with government domain context." },
              { title: "DC salary negotiation", desc: "Defense contractor comp benchmarks, GS-to-contractor transition salary calculations, and clearance premium analysis." },
              { title: "Policy and think tank coaching", desc: "Resume optimization and interview prep for Brookings, CSIS, RAND, and federal agency policy roles." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1E3A5F 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your DC job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching for government, defense, and policy careers in Washington DC — 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#1E3A5F]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
