import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { SalaryBar } from "@/components/animated-stat";
import { SALARY_PAGES, getSalaryData, formatSalary, ROLE_SALARIES, CITIES } from "@/lib/salary-data";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://zaricoach.com";

export async function generateStaticParams() {
  return SALARY_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = SALARY_PAGES.find((p) => p.slug === slug);
  if (!page) return {};

  const data = getSalaryData(page.roleKey, page.cityKey);
  if (!data) return {};

  const { role, city, salaries } = data;
  const sym = city.currencySymbol;
  const title = `${role.displayName} Salary in ${city.displayName} (${city.stateOrCountry}) — 2025 Guide`;
  const description = `${role.displayName} salary in ${city.displayName}: ${formatSalary(salaries.mid.p25, sym)}–${formatSalary(salaries.senior.p75, sym)} base. Median pay by experience level, total comp with equity, and how to negotiate your offer.`;

  return {
    title,
    description,
    keywords: [
      `${role.displayName.toLowerCase()} salary ${city.displayName.toLowerCase()}`,
      `${role.shortName} salary ${city.displayName.toLowerCase()} 2025`,
      `how much do ${role.displayName.toLowerCase()}s make in ${city.displayName.toLowerCase()}`,
      `${role.displayName.toLowerCase()} pay ${city.displayName.toLowerCase()}`,
      `${role.shortName} compensation ${city.stateOrCountry}`,
      `average ${role.displayName.toLowerCase()} salary ${city.stateOrCountry}`,
    ],
    alternates: { canonical: `/salary/${slug}` },
    openGraph: { title, description, url: `/salary/${slug}` },
  };
}

const LEVEL_LABELS: Record<string, { label: string; years: string; color: string; bg: string }> = {
  junior: { label: "Junior",        years: "0–2 yrs", color: "#059669", bg: "#d1fae5" },
  mid:    { label: "Mid Level",     years: "3–5 yrs", color: "#0D7182", bg: "#cffafe" },
  senior: { label: "Senior",        years: "5–8 yrs", color: "#7C3AED", bg: "#ede9fe" },
  staff:  { label: "Staff / Principal", years: "8+ yrs", color: "#D97706", bg: "#fef3c7" },
};

export default async function SalaryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = SALARY_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const data = getSalaryData(page.roleKey, page.cityKey);
  if (!data) notFound();

  const { role, city, salaries, totalCompSenior } = data;
  const sym = city.currencySymbol;
  const userId = await getCurrentUserId();

  const isUK = ["GBP", "GBP"].includes(city.currency) || city.stateOrCountry.includes("UK");
  const isCanada = city.currency === "CAD";
  const isAustralia = city.currency === "AUD";

  const relatedRoles = Object.keys(ROLE_SALARIES)
    .filter((r) => r !== page.roleKey)
    .slice(0, 6)
    .map((r) => ({ slug: `${r}-salary-${page.cityKey}`, label: ROLE_SALARIES[r].displayName }));

  const otherCities = Object.keys(CITIES)
    .filter((c) => c !== page.cityKey)
    .slice(0, 6)
    .map((c) => ({ slug: `${page.roleKey}-salary-${c}`, label: CITIES[c].displayName, country: CITIES[c].stateOrCountry }));

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the average ${role.displayName} salary in ${city.displayName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The median ${role.displayName} salary in ${city.displayName} is ${formatSalary(salaries.mid.median, sym)} for mid-level roles and ${formatSalary(salaries.senior.median, sym)} for senior-level roles in 2025. Entry-level salaries start around ${formatSalary(salaries.junior.p25, sym)}.`,
        },
      },
      {
        "@type": "Question",
        "name": `What is the total compensation for a senior ${role.displayName} in ${city.displayName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A senior ${role.displayName} in ${city.displayName} typically earns ${formatSalary(totalCompSenior.p25, sym)}–${formatSalary(totalCompSenior.p75, sym)} in total compensation, with a median of ${formatSalary(totalCompSenior.median, sym)}.`,
        },
      },
      {
        "@type": "Question",
        "name": `How do I negotiate a ${role.displayName} salary in ${city.displayName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `When negotiating a ${role.displayName} offer in ${city.displayName}, anchor at the 75th percentile (${formatSalary(salaries.senior.p75, sym)}) rather than the median. Never accept the first offer — 70% of hiring managers expect negotiation. A competing offer from any employer is the single most effective negotiation tool.`,
        },
      },
    ],
  };

  const negotiationGap = salaries.senior.p75 - salaries.senior.p25;

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Salary Guides", url: `${BASE_URL}/salary` },
        { name: `${role.displayName} in ${city.displayName}`, url: `${BASE_URL}/salary/${slug}` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-14 text-white" style={{ background: "linear-gradient(135deg, #052830 0%, #0D7182 60%, #052830 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="mb-6 flex items-center gap-3">
            <Link href="/salary" className="inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              All salary guides
            </Link>
            <span className="text-white/20">·</span>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
              {isUK ? "🇬🇧 United Kingdom" : isCanada ? "🇨🇦 Canada" : isAustralia ? "🇦🇺 Australia" : "🇺🇸 United States"} · {city.currency}
            </span>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 items-center">
            <div>
              <h1 className="text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.03em] md:text-[3.2rem]">
                {role.displayName}<br />
                <span className="text-white/50">Salary in {city.displayName}</span>
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-white/55">
                {formatSalary(salaries.junior.p25, sym)}–{formatSalary(salaries.staff.p75, sym)} across all experience levels.
                Updated 2025.
              </p>
              <p className="mt-3 text-[13px] text-white/35">{city.stateOrCountry}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">Senior {role.shortName} · Median</p>
              <p className="text-[3.2rem] font-extrabold tracking-[-0.04em] leading-none text-white">{formatSalary(salaries.senior.median, sym)}</p>
              <p className="mt-2 text-[12px] text-white/40">Base salary · 5–8 years experience</p>
              <div className="mt-4 h-px bg-white/10" />
              <p className="mt-3 text-[11px] text-white/35">Total comp median: <span className="font-bold text-white/60">{formatSalary(totalCompSenior.median, sym)}</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Level-by-level salary bars */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">
                Salary by experience level — {city.displayName}
              </h2>
              <p className="mt-2 text-[14px] text-[var(--muted)]">{city.techHubNotes}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {(["junior","mid","senior","staff"] as const).map((lvl) => {
              const s = salaries[lvl];
              const info = LEVEL_LABELS[lvl];
              return (
                <div key={lvl} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ background: info.bg, color: info.color }}>
                      {info.label}
                    </span>
                    <span className="text-[12px] text-[var(--muted)]">{info.years}</span>
                  </div>
                  <p className="text-[2rem] font-extrabold tracking-[-0.04em]" style={{ color: info.color }}>
                    {formatSalary(s.median, sym)}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[var(--muted)]">median base salary</p>
                  <div className="mt-4">
                    <SalaryBar p25={s.p25} median={s.median} p75={s.p75} currencySymbol={sym} color={info.color} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full data table */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Level</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Experience</th>
                  <th className="px-4 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">25th %ile</th>
                  <th className="px-4 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Median</th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">75th %ile</th>
                </tr>
              </thead>
              <tbody>
                {(["junior","mid","senior","staff"] as const).map((lvl, i) => (
                  <tr key={lvl} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--bg)]/60" : "bg-white"}`}>
                    <td className="px-5 py-4">
                      <span className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: LEVEL_LABELS[lvl].bg, color: LEVEL_LABELS[lvl].color }}>
                        {LEVEL_LABELS[lvl].label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-[var(--muted)]">{LEVEL_LABELS[lvl].years}</td>
                    <td className="px-4 py-4 text-right font-medium text-[var(--muted)]">{formatSalary(salaries[lvl].p25, sym)}</td>
                    <td className="px-4 py-4 text-right font-extrabold text-[var(--brand)]">{formatSalary(salaries[lvl].median, sym)}</td>
                    <td className="px-5 py-4 text-right font-medium text-[var(--ink)]">{formatSalary(salaries[lvl].p75, sym)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12px] text-[var(--muted)]">Base salary in {city.currency}. Data reflects 2025 compensation benchmarks from Levels.fyi, Glassdoor, LinkedIn Salary, and Zari platform data.</p>
        </div>
      </section>

      {/* Negotiation gap callout */}
      <section className="bg-[var(--bg)] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="overflow-hidden rounded-2xl border border-[var(--brand)]/20 bg-white">
            <div className="grid sm:grid-cols-2">
              <div className="p-8 border-b sm:border-b-0 sm:border-r border-[var(--border)]">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">Senior {role.shortName} · Total Compensation</p>
                <p className="mt-3 text-[2.8rem] font-extrabold tracking-[-0.04em] leading-none text-[var(--brand)]">{formatSalary(totalCompSenior.median, sym)}</p>
                <p className="mt-2 text-[13px] text-[var(--muted)]">Median total comp (base + equity + bonus)</p>
                <div className="mt-5">
                  <SalaryBar p25={totalCompSenior.p25} median={totalCompSenior.median} p75={totalCompSenior.p75} currencySymbol={sym} label="Total comp range" />
                </div>
              </div>
              <div className="p-8">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">Negotiation opportunity</p>
                <p className="mt-3 text-[2.8rem] font-extrabold tracking-[-0.04em] leading-none" style={{ color: "#059669" }}>
                  {formatSalary(negotiationGap, sym)}
                </p>
                <p className="mt-2 text-[13px] text-[var(--muted)]">Gap between 25th and 75th percentile for senior {role.shortName} in {city.displayName}</p>
                <p className="mt-4 text-[13px] leading-6 text-[var(--muted)]">
                  Most candidates who don&apos;t negotiate land at the 25th percentile. Strong negotiation moves you toward the 75th — a difference of <strong className="text-[var(--ink)]">{formatSalary(negotiationGap, sym)}</strong> per year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Negotiation tactics */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.8rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">
            How to negotiate a {role.displayName} offer in {city.displayName}
          </h2>
          <p className="mt-3 mb-8 text-[14px] text-[var(--muted)]">
            The difference between the 25th and 75th percentile is {formatSalary(negotiationGap, sym)}/year — and it comes down to this conversation.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                step: "01",
                title: "Anchor above the median",
                detail: `Open at ${formatSalary(salaries.senior.p75, sym)} — the 75th percentile. This gives you room to "meet in the middle" at or above the median. Never give a range; ranges get taken at the low end.`,
                color: "#7C3AED",
              },
              {
                step: "02",
                title: "Use competing offers as leverage",
                detail: `A competing offer — even from a less preferred employer — is the single most powerful negotiating tool in ${city.displayName}. Get at least one before negotiating.`,
                color: "#0D7182",
              },
              {
                step: "03",
                title: "Negotiate total comp, not just base",
                detail: `Base salary is often the hardest component to move. Signing bonus and equity are frequently more flexible. In ${city.displayName}, a ${formatSalary(Math.round(negotiationGap / 3 / 1000) * 1000, sym)} signing bonus has the same year-1 value.`,
                color: "#059669",
              },
              {
                step: "04",
                title: "Never accept on the call",
                detail: `Ask for the offer in writing and follow up in 24–48 hours. This creates space to counter without pressure. No legitimate employer rescinds an offer because a candidate asked for review time.`,
                color: "#D97706",
              },
            ].map((item) => (
              <div key={item.step} className="relative overflow-hidden rounded-2xl border border-[var(--border)] p-6">
                <span className="absolute -right-2 -top-4 text-[5rem] font-extrabold leading-none opacity-[0.04]" style={{ color: item.color }}>{item.step}</span>
                <span className="mb-3 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${item.color}15`, color: item.color }}>{item.step}</span>
                <p className="font-bold text-[var(--ink)]">{item.title}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-4 text-[15px] font-extrabold text-[var(--ink)]">Other roles in {city.displayName}</h3>
              <div className="space-y-2">
                {relatedRoles.map((r) => (
                  <Link key={r.slug} href={`/salary/${r.slug}`} className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[13px] text-[var(--ink)] hover:border-[var(--brand)]/30 hover:bg-[var(--brand)]/[0.02] transition-all">
                    <span>{r.label}</span>
                    <svg className="h-3.5 w-3.5 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-[15px] font-extrabold text-[var(--ink)]">{role.displayName} in other cities</h3>
              <div className="space-y-2">
                {otherCities.map((r) => (
                  <Link key={r.slug} href={`/salary/${r.slug}`} className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[13px] text-[var(--ink)] hover:border-[var(--brand)]/30 hover:bg-[var(--brand)]/[0.02] transition-all">
                    <span>{r.label} <span className="text-[var(--muted)]">· {r.country}</span></span>
                    <svg className="h-3.5 w-3.5 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/salary" className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[13px] font-semibold text-[#4361EE] hover:bg-[var(--brand)]/[0.03] transition-all">
              All salary guides →
            </Link>
            <Link href="/salary-calculator" className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[13px] font-semibold text-[var(--ink)] hover:bg-[var(--bg)] transition-all">
              Salary calculator
            </Link>
            <Link href="/blog/salary-negotiation-tips" className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[13px] font-semibold text-[var(--ink)] hover:bg-[var(--bg)] transition-all">
              Negotiation guide
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="noise-overlay relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg, #052830 0%, #0D7182 50%, #052830 100%)" }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-white/40">Know your number</p>
          <h2 className="text-[2rem] font-extrabold tracking-[-0.03em]">
            {formatSalary(negotiationGap, sym)}/yr is on the table.<br />
            <span className="text-white/60">Learn how to get it.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-white/50">
            Zari coaches the exact negotiation conversation — what to say when the recruiter asks your number, how to counter, and how to use competing offers. Free to start.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 text-[14px] font-bold text-[#4361EE] transition-all hover:-translate-y-0.5">
              Practice negotiating free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/salary-calculator" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/[0.08] px-6 text-[14px] font-semibold text-white transition-all hover:bg-white/[0.12]">
              Salary calculator
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
