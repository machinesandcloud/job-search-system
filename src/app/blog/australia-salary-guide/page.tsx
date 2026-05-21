import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { StatCard } from "@/components/animated-stat";

export const metadata: Metadata = {
  title: "Australia Salary Guide 2025 — Average Salaries by Role, City, and Industry (AUD)",
  description: "Comprehensive Australia salary guide for 2025. Average salaries in AUD by role, city (Sydney, Melbourne, Brisbane, Perth), and industry — plus negotiation benchmarks from SEEK data.",
  keywords: ["australia salary guide", "average salary australia 2025", "australian salaries", "salary in australia", "average wage australia", "sydney salary", "melbourne salary", "australian salary by industry", "australia pay rates 2025", "average salary sydney"],
  alternates: { canonical: "/blog/australia-salary-guide" },
  openGraph: { title: "Australia Salary Guide 2025 — AUD Salaries by Role and City", description: "Average salaries in Australia by role, city, and industry. Updated for 2025 with SEEK data.", url: "/blog/australia-salary-guide" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is the average salary in Australia in 2025?", answer: "The median full-time salary in Australia is approximately AUD $98,000 (including superannuation). Before super, median full-time earnings are around AUD $90,000. However, this varies significantly by state: Sydney and Melbourne command 10–20% premiums over Brisbane and Adelaide for equivalent roles, while Perth is competitive with Melbourne for resources and engineering roles." },
  { question: "Is the salary in Australia higher than the UK?", answer: "At current exchange rates, mid-level professional salaries in Australia are broadly comparable to the UK, with Australian salaries being higher in nominal AUD terms. Healthcare, engineering, and trades pay significantly better in Australia than equivalent UK roles. Tech roles are broadly comparable. Australian salaries also come with mandatory 11% superannuation (retirement contributions), making total compensation higher than the nominal figure suggests." },
  { question: "How does Australian salary negotiation work?", answer: "SEEK salary insights are the standard benchmark tool. Australians negotiate salary directly — there&apos;s no cultural awkwardness about it. The standard approach is to research the market rate on SEEK, have a specific number in mind, and raise it when offered the role (not before). Most employers expect negotiation. Saying &apos;the market rate for this role in Sydney is $X&apos; is a perfectly normal opener." },
  { question: "What is superannuation and how does it affect my total pay?", answer: "Superannuation ('super') is Australia's mandatory employer retirement contribution, currently 11% of your base salary, paid directly to your superannuation fund. It's in addition to your salary — a $120,000 package should be stated as '$120,000 + super' if super is not included, or '$120,000 including super' if it is. Always clarify whether a quoted salary is inclusive or exclusive of super. Exclusive is standard and more generous." },
];

const ROLES_BY_SECTOR = [
  {
    sector: "Technology", color: "#0D7182", roles: [
      { role: "Software Engineer (mid)", syd: "$130–155k", mel: "$120–148k", bris: "$110–135k", per: "$115–140k" },
      { role: "Senior Engineer", syd: "$155–200k", mel: "$145–185k", bris: "$135–170k", per: "$140–175k" },
      { role: "Product Manager", syd: "$135–175k", mel: "$125–165k", bris: "$115–150k", per: "$115–148k" },
      { role: "Data Scientist", syd: "$120–155k", mel: "$115–145k", bris: "$105–135k", per: "$110–138k" },
      { role: "UX Designer", syd: "$100–135k", mel: "$95–125k", bris: "$88–115k", per: "$90–118k" },
    ]
  },
  {
    sector: "Finance & Banking", color: "#7C3AED", roles: [
      { role: "Financial Analyst", syd: "$90–120k", mel: "$85–115k", bris: "$80–105k", per: "$82–108k" },
      { role: "Investment Banker (VP)", syd: "$180–280k", mel: "$165–250k", bris: "$140–200k", per: "$140–195k" },
      { role: "Risk Manager", syd: "$120–155k", mel: "$115–145k", bris: "$100–130k", per: "$105–135k" },
      { role: "Accountant (CA)", syd: "$80–115k", mel: "$78–110k", bris: "$72–100k", per: "$75–105k" },
    ]
  },
  {
    sector: "Healthcare", color: "#059669", roles: [
      { role: "Registered Nurse", syd: "$75–95k", mel: "$72–90k", bris: "$70–88k", per: "$72–92k" },
      { role: "Pharmacist", syd: "$90–115k", mel: "$88–110k", bris: "$85–108k", per: "$88–112k" },
      { role: "GP / General Practitioner", syd: "$200–320k", mel: "$190–305k", bris: "$185–295k", per: "$195–310k" },
      { role: "Physiotherapist", syd: "$75–100k", mel: "$72–96k", bris: "$70–92k", per: "$72–95k" },
    ]
  },
  {
    sector: "Mining & Resources", color: "#D97706", roles: [
      { role: "Mining Engineer", syd: "$110–145k", mel: "$105–140k", bris: "$110–145k", per: "$130–180k" },
      { role: "Geologist", syd: "$90–120k", mel: "$88–115k", bris: "$90–118k", per: "$105–145k" },
      { role: "Site Manager", syd: "$120–160k", mel: "$115–152k", bris: "$118–155k", per: "$135–195k" },
    ]
  },
];

export default async function AustraliaSalaryGuidePage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <ArticleJsonLd title="Australia Salary Guide 2025" description="Average salaries in Australia by role, city, and industry in AUD — updated for 2025." url={`${BASE_URL}/blog/australia-salary-guide`} datePublished="2025-05-20" dateModified="2025-05-20" />
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "Australia Salary Guide", url: `${BASE_URL}/blog/australia-salary-guide` }]} />

      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #002244 0%, #0D7182 55%, #059669 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All articles
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">Salary · Australia</span>
            <span className="text-[12px] text-white/35">16 min read · May 2025</span>
          </div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[3.2rem]">Australia Salary Guide 2025</h1>
          <p className="mt-4 text-[15px] leading-7 text-white/50">Average salaries in AUD by role, city, and sector — with negotiation benchmarks and super explained.</p>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={98} label="k AUD median full-time salary including super (2025)" accent="#0D7182" />
            <StatCard value={11} suffix="%" label="mandatory superannuation on top of base salary" accent="#7C3AED" />
            <StatCard value={20} suffix="%" label="Perth premium over eastern states in mining & resources" accent="#D97706" />
            <StatCard value={31} suffix="%" label="average salary increase with Zari negotiation coaching" accent="#059669" />
          </div>
        </div>
      </section>

      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="mb-4 text-[1.7rem] font-extrabold tracking-[-0.02em]">Understanding Australian salary packages</h2>
          <p className="mb-6 text-[14px] leading-7 text-[var(--muted)]">Australian salaries are quoted in one of three ways — always clarify which before accepting:</p>
          <div className="mb-10 grid gap-3 sm:grid-cols-3">
            {[
              { type: "Base salary", desc: "Your take-home salary before super. The number you pay income tax on. Excludes super contributions.", color: "#0D7182" },
              { type: "Base + super", desc: "Standard Australian quoting method. E.g. '$100k + 11% super' means $111k total cost to employer.", color: "#059669" },
              { type: "Total Package (TFR)", desc: "Total Fixed Remuneration — base + super + any allowances bundled. Common in government and large corporates.", color: "#7C3AED" },
            ].map(({ type, desc, color }) => (
              <div key={type} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="mb-1 text-[12px] font-bold" style={{ color }}>{type}</div>
                <p className="text-[12px] leading-5 text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>

          {ROLES_BY_SECTOR.map(({ sector, color, roles }) => (
            <div key={sector} className="mb-10">
              <h2 className="mb-4 text-[1.4rem] font-extrabold tracking-[-0.02em]" style={{ color }}>{sector} salaries (AUD, 2025)</h2>
              <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <div className="grid grid-cols-5 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
                  <span className="col-span-1">Role</span><span>Sydney</span><span>Melbourne</span><span>Brisbane</span><span>Perth</span>
                </div>
                {roles.map(({ role, syd, mel, bris, per }) => (
                  <div key={role} className="grid grid-cols-5 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                    <span className="font-bold">{role}</span>
                    <span>{syd}</span><span>{mel}</span><span>{bris}</span><span>{per}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <h2 className="mb-5 text-[1.7rem] font-extrabold tracking-[-0.02em]">How to negotiate salary in Australia</h2>
          <div className="mb-10 space-y-3">
            {[
              { step: "1", title: "Research using SEEK Salary Insights", body: "SEEK's salary data tool shows market ranges for specific job titles in your city. This is the benchmark Australian employers use — cite it directly." },
              { step: "2", title: "Wait until the offer stage", body: "Don&apos;t raise salary in the first interview. Wait until you have an offer — then negotiate. Saying 'I'm very interested — I was expecting something closer to $X based on SEEK data' is standard." },
              { step: "3", title: "Anchor to the top of the range", body: "Start high within the realistic range. If market is $120–145k, open at $140k. You'll rarely get above your opening ask." },
              { step: "4", title: "Negotiate super separately if possible", body: "If the employer won&apos;t budge on base, try to negotiate additional super contributions, extra annual leave (common in Australia), or a review at 6 months." },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#0D7182]/10 text-[14px] font-extrabold text-[#0D7182]">{step}</div>
                <div>
                  <div className="mb-1 font-bold text-[14px]">{title}</div>
                  <p className="text-[13px] leading-6 text-[var(--muted)]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-[1.7rem] font-extrabold">FAQ</h2>
          <div className="space-y-4">
            {FAQS.map(({ question, answer }) => (
              <div key={question} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <h3 className="mb-2 text-[14px] font-bold">{question}</h3>
                <p className="text-[13px] leading-6 text-[var(--muted)]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #002244 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-3 text-[2rem] font-extrabold">Negotiate your Australian salary with confidence.</h2>
          <p className="mb-6 text-[15px] text-white/50">Zari&apos;s salary negotiation coach uses SEEK-aligned benchmarks to help you make a data-backed case for the salary you deserve.</p>
          <Link href="/salary-negotiation-coach" className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#002244]">Start salary coaching free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
