import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Career Coach San Diego 2025 — AI Career Coaching for San Diego Professionals",
  description: "AI career coaching for San Diego, CA professionals. San Diego salary benchmarks, biotech and defense interview prep, resume optimization for Qualcomm, Illumina, and San Diego's top employers.",
  keywords: ["career coach san diego", "career coach san diego ca", "career coaching san diego", "san diego career counselor", "san diego job search 2025", "qualcomm careers", "illumina careers san diego", "san diego biotech jobs", "san diego defense jobs", "san diego salary negotiation"],
  alternates: { canonical: "/career-coach-san-diego" },
  openGraph: { title: "Career Coach San Diego 2025 — AI Career Coaching for San Diego Professionals", description: "San Diego salary benchmarks, biotech and defense interview prep, and resume optimization for America's Finest City's top employers.", url: "/career-coach-san-diego" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What industries dominate hiring in San Diego?", answer: "San Diego has three defining industry pillars: Biotech & Life Sciences: San Diego is one of the top three biotech clusters in the world (alongside Boston and San Francisco). Key employers: Illumina (genomic sequencing — HQ in San Diego), Tandem Diabetes Care, Neurocrine Biosciences, Ligand Pharmaceuticals, Dexcom, and hundreds of biotech startups in the Torrey Pines and Sorrento Valley corridors. Defense & Aerospace: San Diego hosts one of the largest military presences in the US. SAIC (HQ), L3Harris, Leidos, Northrop Grumman, General Atomics, and Booz Allen all have major San Diego operations. Technology: Qualcomm (HQ — the city&apos;s largest private employer by revenue), ServiceNow San Diego, NetSol, and a growing tech startup scene. Tourism & Hospitality: Hotels, resorts, and the Port of San Diego, but these are less relevant to professional career seekers." },
  { question: "What are typical salaries in San Diego?", answer: "San Diego salaries are high California wages but 10–15% below San Francisco for most roles. California income tax (up to 13.3%) applies. 2025 benchmarks: Chip/RF Engineer at Qualcomm: $140,000–$250,000 TC; Biotech Research Scientist (PhD): $110,000–$175,000; Biotech Director / VP: $180,000–$320,000 TC; Defense Engineer (clearance): $110,000–$180,000; Software Engineer: $130,000–$220,000 TC; Clinical Research Associate: $80,000–$130,000; Data Scientist: $110,000–$175,000. San Diego housing costs are high (median home price ~$900,000) but slightly better than SF or LA. No city income tax beyond California state." },
  { question: "How do I get a job at Qualcomm in San Diego?", answer: "Qualcomm is San Diego&apos;s largest private employer and one of the most prestigious engineering employers in the world. Hiring process: 1) Resume screening — Qualcomm uses keyword-heavy ATS screening. For hardware/silicon roles: chip design, RF, modem, baseband, 5G, DSP are essential terms. For software: embedded systems, Linux, Android, firmware, RTOS. 2) Phone/video technical screen (60–90 min, coding or circuit design). 3) Onsite interviews — typically 5–6 back-to-back technical sessions. For hardware: analog/digital design, signal integrity, system-level thinking. For software: data structures, algorithms, system design. Key differentiator: Qualcomm values deep domain expertise. Generalist engineers are less competitive than specialists in wireless, RF, or modem technology. Zari coaches technical interview preparation and behavioral rounds." },
  { question: "Is a security clearance important for San Diego jobs?", answer: "Yes — significantly. San Diego has one of the highest concentrations of defense-related employment in the US, and most defense contractor roles either require or prefer a security clearance. Types to know: SECRET clearance — required for most defense programs at SAIC, L3Harris, Leidos, General Atomics. TOP SECRET/SCI — required for more sensitive programs; typically tied to intelligence or special access programs. Clearance eligibility: US citizenship required; typically 5–10 year background check. Having an active clearance is worth $20,000–$40,000 in additional salary value because cleared candidates are scarce. If you&apos;re eligible but don&apos;t have a clearance, many contractors will sponsor you through the process. Your career coach should help you frame &apos;clearable&apos; vs. &apos;cleared&apos; status in your resume." },
];

const SALARIES = [
  { role: "Chip / RF / Modem Engineer", company: "Qualcomm, Entropic, Cohu", range: "$140,000–$250,000 TC", note: "Qualcomm = largest San Diego employer" },
  { role: "Biotech Research Scientist (PhD)", company: "Illumina, Neurocrine, Dexcom", range: "$110,000–$175,000", note: "Top-3 global biotech cluster" },
  { role: "Biotech Director / VP", company: "Illumina, Tandem, Ligand", range: "$180,000–$320,000 TC", note: "Equity-heavy at biotech; CA stock gains taxed" },
  { role: "Defense Engineer (cleared)", company: "SAIC, L3Harris, Leidos", range: "$110,000–$180,000", note: "Active clearance adds $20–40k premium" },
  { role: "Software Engineer", company: "Qualcomm, ServiceNow, Catch", range: "$130,000–$220,000 TC", note: "CA state tax up to 13.3% — plan for it" },
  { role: "Clinical Research Associate", company: "IQVIA, PPD, Neurocrine", range: "$80,000–$130,000", note: "CRO industry well-represented in SD" },
  { role: "Data Scientist", company: "Qualcomm, SAIC, Sharp Health", range: "$110,000–$175,000", note: "Strong demand across tech and health" },
];

export default async function CareerCoachSanDiegoPage() {
  const userId = await getCurrentUserId();
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="Career Coach San Diego 2025 — AI Career Coaching for San Diego Professionals"
        description="San Diego salary benchmarks, biotech and defense interview prep, and resume optimization for America's Finest City's top employers."
        datePublished="2025-06-01"
        dateModified="2025-06-01"
        url={`${BASE_URL}/career-coach-san-diego`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Career Coach San Diego", url: `${BASE_URL}/career-coach-san-diego` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0066CC 0%, #003087 50%, #00A3E0 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            San Diego · Biotech · Qualcomm · Defense · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            Career Coach<br />
            <span className="text-white/50">San Diego, California</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            AI career coaching for San Diego&apos;s world-class biotech cluster, Qualcomm engineering, and defense/aerospace sector. Resume optimization, interview prep, and salary negotiation available 24/7.
          </p>
          <p className="mt-3 text-[11px] text-white/30">2025 · AI-powered · Top-3 global biotech hub · Qualcomm HQ city</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-[1.9rem] font-extrabold tracking-[-0.02em]">San Diego salary benchmarks 2025</h2>
          <p className="mb-8 text-[14px] text-[var(--muted)]">San Diego compensation data across biotech, defense, and technology. California state income tax applies (up to 13.3%).</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-4 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Role</span><span>Employer</span><span>Range</span><span>Notes</span>
            </div>
            {SALARIES.map(({ role, company, range, note }) => (
              <div key={role} className="grid grid-cols-4 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{role}</span>
                <span className="text-[var(--muted)] text-[12px]">{company}</span>
                <span className="font-semibold text-[#0066CC]">{range}</span>
                <span className="text-[var(--muted)] text-[12px]">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">What Zari does for San Diego job seekers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Qualcomm interview prep", desc: "Technical and behavioral interview coaching for Qualcomm chip, RF, modem, and software engineering roles." },
              { title: "San Diego resume optimization", desc: "ATS scoring against San Diego job postings. Keyword gap analysis for biotech, defense, and semiconductor descriptions." },
              { title: "Salary negotiation coaching", desc: "San Diego comp benchmarks with California tax modeling. Know your net before you negotiate — defense vs. biotech vs. tech." },
              { title: "Biotech career coaching", desc: "Interview coaching for Illumina, Dexcom, Neurocrine, and San Diego biotech roles from scientist to director level." },
              { title: "Defense and clearance positioning", desc: "Coach candidates on framing clearance status, defense sector terminology, and SAIC / L3Harris interview formats." },
              { title: "LinkedIn for SD recruiters", desc: "Optimize your LinkedIn to rank in searches by San Diego biotech, defense, and tech recruiters." },
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0066CC 0%, #003087 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Start your San Diego job search with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">AI career coaching built for San Diego&apos;s biotech, semiconductor, and defense sectors. Available 24/7, no scheduling.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0066CC]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
