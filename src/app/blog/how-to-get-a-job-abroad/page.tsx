import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { FaqJsonLd, ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Get a Job Abroad 2025 — Complete Guide for International Job Seekers",
  description: "How to get a job abroad in 2025: the best countries for expats, visa routes, international resume tips, and where to find jobs for international candidates. Full guide.",
  keywords: ["how to get a job abroad", "get a job abroad", "work abroad", "international job search", "jobs abroad 2025", "working abroad guide", "how to find a job in another country", "expat job search", "work abroad visa", "best countries to work abroad"],
  alternates: { canonical: "/blog/how-to-get-a-job-abroad" },
  openGraph: { title: "How to Get a Job Abroad 2025 — Complete International Job Search Guide", description: "Best countries for expats, visa routes, international resume tips, and where to find jobs abroad in 2025.", url: "/blog/how-to-get-a-job-abroad" },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

const FAQS = [
  { question: "What is the easiest country to get a job in as a foreigner?", answer: "In 2025, the most accessible markets for skilled foreign workers are: Germany (Skilled Immigration Act makes it the most open European market for non-EU workers in shortage occupations), Canada (Express Entry and Provincial Nominee Programs are well-structured, high intake), UAE/Dubai (employer-sponsored Employment Visa is fast and well-understood, no language requirement beyond English in most sectors), Singapore (Employment Pass for salary above SGD 5,000/month), and Australia (TSS 482 visa and Skills in Demand visa for shortage occupations)." },
  { question: "Do I need to be in the country to get a job abroad?", answer: "For most white-collar professional roles: no. Remote interviews are standard globally since 2020. The typical sequence for skilled workers is: apply from your home country → first and second round interviews by video → receive offer → begin visa process → relocate. Many employers also accept job seekers currently on tourist visas who interview in-person. The exception is roles requiring security clearance or those in highly regulated sectors (some healthcare, government roles) where presence may be required earlier in the process." },
  { question: "How do I adapt my resume for international job applications?", answer: "The key adaptations depend on destination: UK wants no photo, 2-page max, achievement-focused. UAE/Dubai allows and often expects photo, nationality, and marital status. Australia is similar to UK — 2–3 pages, achievement-focused, no photo. Canada aligns with North American standard (no photo, 1–2 pages, metric achievements). Germany: a Lebenslauf (CV with photo, detailed personal info) is standard for German companies; international format acceptable at MNCs. Singapore: professional international format, LinkedIn URL mandatory. Zari's resume coaching adjusts format for your target market." },
  { question: "What are the best websites for international job searches?", answer: "LinkedIn is global and works across all major markets. Beyond LinkedIn: Indeed has country-specific versions (Indeed.co.uk, Indeed.com.au, Indeed.ca, Indeed.de). Glassdoor for company research globally. Region-specific: SEEK (Australia/NZ), JobStreet (Southeast Asia), Bayt/GulfTalent (Middle East), Naukri/LinkedIn (India), StepStone/Xing (Germany/DACH), CV-Library/Reed (UK). For remote-first international roles: Remote.co, We Work Remotely, and Remotive aggregate global remote jobs across companies that explicitly hire internationally." },
];

const COUNTRIES = [
  { country: "🇩🇪 Germany", visa: "Skilled Immigration Act (Skilled Worker Visa)", language: "German (English OK at MNCs)", sectors: "Engineering, IT, healthcare, trades", difficulty: "Medium" },
  { country: "🇨🇦 Canada", visa: "Express Entry, Provincial Nominee Program", language: "English / French", sectors: "Tech, finance, healthcare, trades", difficulty: "Medium" },
  { country: "🇦🇺 Australia", visa: "TSS 482, Skills in Demand, Employer Sponsor", language: "English", sectors: "Mining, construction, tech, healthcare, finance", difficulty: "Medium" },
  { country: "🇦🇪 UAE / Dubai", visa: "Employment Visa (employer-sponsored)", language: "English (business standard)", sectors: "Finance, tech, construction, hospitality, logistics", difficulty: "Low-Medium" },
  { country: "🇸🇬 Singapore", visa: "Employment Pass (SGD 5,000+/month)", language: "English", sectors: "Finance, tech, logistics, biotech", difficulty: "Medium-High" },
  { country: "🇬🇧 United Kingdom", visa: "Skilled Worker Visa (sponsor required)", language: "English", sectors: "Finance, tech, healthcare, professional services", difficulty: "Medium" },
  { country: "🇳🇱 Netherlands", visa: "Highly Skilled Migrant (salary threshold)", language: "English (most tech/MNC roles)", sectors: "Tech, logistics, agri-tech, finance", difficulty: "Medium" },
];

export default async function HowToGetAJobAbroadPage() {
  const userId = await getCurrentUserId();
  const publishedDate = "2025-02-20";
  const modifiedDate = "2025-06-01";
  return (
    <PageFrame authenticated={Boolean(userId)}>
      <FaqJsonLd faqs={FAQS} />
      <ArticleJsonLd
        title="How to Get a Job Abroad 2025 — Complete Guide for International Job Seekers"
        description="Best countries for expats, visa routes, international resume tips, and where to find jobs abroad in 2025."
        datePublished={publishedDate}
        dateModified={modifiedDate}
        url={`${BASE_URL}/blog/how-to-get-a-job-abroad`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", url: BASE_URL }, { name: "Blog", url: `${BASE_URL}/blog` }, { name: "How to Get a Job Abroad", url: `${BASE_URL}/blog/how-to-get-a-job-abroad` }]} />

      <section className="relative overflow-hidden pb-20 pt-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 40%, #7C3AED 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
            International Job Search · Visa Guide · 2025
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[3.4rem]">
            How to Get a Job<br />
            <span className="text-white/50">Abroad in 2025</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/55">
            The best countries for skilled workers, visa routes, resume adaptation for international applications, and the job boards that actually work for international job seekers.
          </p>
          <p className="mt-3 text-[11px] text-white/30">Updated June 2025 · 10 min read</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-[1.9rem] font-extrabold tracking-[-0.02em]">Best countries for skilled workers in 2025</h2>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="grid grid-cols-5 border-b border-[var(--border)] bg-[var(--bg)] p-3 text-[11px] font-bold uppercase text-[var(--muted)]">
              <span>Country</span><span className="col-span-1">Visa route</span><span>Language req.</span><span>Key sectors</span><span>Difficulty</span>
            </div>
            {COUNTRIES.map(({ country, visa, language, sectors, difficulty }) => (
              <div key={country} className="grid grid-cols-5 border-b border-[var(--border)] p-4 text-[13px] last:border-0 items-start gap-2">
                <span className="font-bold">{country}</span>
                <span className="text-[var(--muted)] text-[12px]">{visa}</span>
                <span>{language}</span>
                <span className="text-[var(--muted)] text-[12px]">{sectors}</span>
                <span className="font-semibold">{difficulty}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-[1.9rem] font-extrabold tracking-[-0.02em]">The international job search sequence</h2>
          <div className="space-y-4">
            {[
              { n: "1", title: "Research visa eligibility before applying", desc: "There is no point applying to roles in countries where you won't qualify for a work visa. Check your target country's skilled worker visa requirements first — salary thresholds, occupation lists, and employer sponsorship requirements. Germany's Skilled Immigration Act, Australia's Skills in Demand visa, and Canada's Express Entry have public eligibility tools." },
              { n: "2", title: "Adapt your resume for the target market", desc: "Different countries have genuinely different CV norms. UK: 2-page max, no photo. UAE: photo, nationality, marital status expected. Germany: photo, date of birth, Lebenslauf format for German companies. Australia: 2–3 pages, professional tone. Getting the format wrong signals that you don't understand the market." },
              { n: "3", title: "Use the right job boards for each market", desc: "LinkedIn works globally. But SEEK dominates Australia, Bayt and GulfTalent dominate the UAE, and StepStone dominates Germany. Using only LinkedIn misses a significant portion of active listings in most international markets." },
              { n: "4", title: "Network into the market from a distance", desc: "Join professional associations in your target country. Connect with expats from your target country who are currently working there — they are the most useful network nodes for understanding the hiring process and finding referrals. LinkedIn filters by location + job title + 'connection of connection' make this practical from anywhere." },
              { n: "5", title: "Prepare for the visa process timeline", desc: "Most skilled worker visas take 4–12 weeks to process once you have a job offer. Plan accordingly — accept offers with appropriate notice periods, and discuss visa timelines transparently with employers. Most experienced international employers understand and expect this." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex gap-5 rounded-2xl border border-[var(--border)] bg-white p-5">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#0D7182]/10 flex items-center justify-center text-[13px] font-extrabold text-[#0D7182]">{n}</div>
                <div>
                  <h3 className="mb-1 font-bold text-[14px]">{title}</h3>
                  <p className="text-[13px] leading-5 text-[var(--muted)]">{desc}</p>
                </div>
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

      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0D7182 100%)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold">Land your international role with Zari.</h2>
          <p className="mb-8 text-[15px] text-white/55">Market-specific resume coaching, interview prep, and salary benchmarks for Australia, UK, UAE, Canada, Singapore, and more.</p>
          <Link href={userId ? "/dashboard" : "/signup"} className="inline-block rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-[#0D7182]">Start for free</Link>
        </div>
      </section>
    </PageFrame>
  );
}
