import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { BreadcrumbJsonLd } from "@/components/json-ld";
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
  const description = `${role.displayName} salary in ${city.displayName}: ${formatSalary(salaries.mid.p25, sym)}–${formatSalary(salaries.senior.p75, sym)} base. See median pay by experience level, total comp including equity, and how to negotiate your offer.`;

  return {
    title,
    description,
    keywords: [
      `${role.displayName.toLowerCase()} salary ${city.displayName.toLowerCase()}`,
      `${role.shortName} salary ${city.displayName.toLowerCase()} 2025`,
      `how much do ${role.displayName.toLowerCase()}s make in ${city.displayName.toLowerCase()}`,
      `${role.displayName.toLowerCase()} pay ${city.displayName.toLowerCase()}`,
      `${role.shortName} compensation ${city.stateOrCountry}`,
    ],
    alternates: { canonical: `/salary/${slug}` },
    openGraph: {
      title,
      description,
      url: `/salary/${slug}`,
    },
  };
}

const LEVEL_LABELS: Record<string, { label: string; years: string; color: string }> = {
  junior: { label: "Junior / Entry Level",  years: "0–2 years", color: "#059669" },
  mid:    { label: "Mid Level",              years: "3–5 years", color: "#0D7182" },
  senior: { label: "Senior",                 years: "5–8 years", color: "#7C3AED" },
  staff:  { label: "Staff / Principal",      years: "8+ years",  color: "#D97706" },
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

  // Related roles (same city, different roles)
  const relatedRoles = Object.keys(ROLE_SALARIES)
    .filter((r) => r !== page.roleKey)
    .slice(0, 5)
    .map((r) => ({ slug: `${r}-salary-${page.cityKey}`, label: `${ROLE_SALARIES[r].displayName} in ${city.displayName}` }));

  // Same role, other cities
  const otherCities = Object.keys(CITIES)
    .filter((c) => c !== page.cityKey)
    .slice(0, 5)
    .map((c) => ({ slug: `${page.roleKey}-salary-${c}`, label: `${role.displayName} in ${CITIES[c].displayName}` }));

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
          "text": `A senior ${role.displayName} in ${city.displayName} typically earns ${formatSalary(totalCompSenior.p25, sym)}–${formatSalary(totalCompSenior.p75, sym)} in total compensation (base salary plus equity and bonus), with a median of ${formatSalary(totalCompSenior.median, sym)}.`,
        },
      },
    ],
  };

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: BASE_URL },
        { name: "Salary Guides", url: `${BASE_URL}/salary` },
        { name: `${role.displayName} in ${city.displayName}`, url: `${BASE_URL}/salary/${slug}` },
      ]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Salary Guide · {city.stateOrCountry}
          </div>
          <h1 className="text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3rem]">
            {role.displayName} Salary in {city.displayName}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/55">
            {formatSalary(salaries.junior.p25, sym)}–{formatSalary(salaries.staff.p75, sym)} base salary across all experience levels. Updated 2025.
          </p>
        </div>
      </section>

      {/* Quick stats bar */}
      <section className="bg-[var(--brand)]/[0.04] border-b border-[var(--brand)]/10 py-6">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(["junior","mid","senior","staff"] as const).map((lvl) => (
              <div key={lvl} className="rounded-xl border border-[var(--border)] bg-white p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">{LEVEL_LABELS[lvl].label}</p>
                <p className="mt-1 text-[1.4rem] font-extrabold text-[var(--ink)]">{formatSalary(salaries[lvl].median, sym)}</p>
                <p className="text-[11px] text-[var(--muted)]">{LEVEL_LABELS[lvl].years}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Salary table */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.9rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">
            {role.displayName} salary by experience — {city.displayName} ({new Date().getFullYear()})
          </h2>
          <p className="mt-3 text-[14px] text-[var(--muted)]">{city.techHubNotes}</p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)]">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Level</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Experience</th>
                  <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">25th %ile</th>
                  <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">Median</th>
                  <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">75th %ile</th>
                </tr>
              </thead>
              <tbody>
                {(["junior","mid","senior","staff"] as const).map((lvl, i) => (
                  <tr key={lvl} className={`border-b border-[var(--border)] ${i % 2 === 1 ? "bg-[var(--bg)]/50" : "bg-white"}`}>
                    <td className="px-5 py-4">
                      <span className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: `${LEVEL_LABELS[lvl].color}15`, color: LEVEL_LABELS[lvl].color }}>
                        {LEVEL_LABELS[lvl].label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[var(--muted)]">{LEVEL_LABELS[lvl].years}</td>
                    <td className="px-4 py-4 text-right font-medium text-[var(--ink)]">{formatSalary(salaries[lvl].p25, sym)}</td>
                    <td className="px-4 py-4 text-right font-extrabold text-[var(--brand)]">{formatSalary(salaries[lvl].median, sym)}</td>
                    <td className="px-5 py-4 text-right font-medium text-[var(--ink)]">{formatSalary(salaries[lvl].p75, sym)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12px] text-[var(--muted)]">Base salary in {city.currency}. Data reflects 2025 compensation trends from public surveys, Levels.fyi, Glassdoor, and Zari user data.</p>
        </div>
      </section>

      {/* Total comp callout */}
      <section className="bg-[var(--bg)] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
            <h2 className="text-[1.4rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">
              Senior {role.displayName} total compensation in {city.displayName}
            </h2>
            <p className="mt-2 text-[13.5px] text-[var(--muted)]">
              Total comp (base + equity vesting + annual bonus) for senior {role.shortName} roles:
            </p>
            <div className="mt-5 grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-[var(--bg)] p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">25th %ile</p>
                <p className="mt-1 text-[1.5rem] font-extrabold text-[var(--ink)]">{formatSalary(totalCompSenior.p25, sym)}</p>
              </div>
              <div className="rounded-xl border-2 border-[var(--brand)] p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Median Total Comp</p>
                <p className="mt-1 text-[1.5rem] font-extrabold text-[var(--brand)]">{formatSalary(totalCompSenior.median, sym)}</p>
              </div>
              <div className="rounded-xl bg-[var(--bg)] p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">75th %ile</p>
                <p className="mt-1 text-[1.5rem] font-extrabold text-[var(--ink)]">{formatSalary(totalCompSenior.p75, sym)}</p>
              </div>
            </div>
            <p className="mt-4 text-[12px] text-[var(--muted)]">
              Most candidates accept the first offer — which is typically at the 25th percentile. Zari coaches the negotiation conversation to push toward the 75th percentile.
            </p>
          </div>
        </div>
      </section>

      {/* Negotiation tactics */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">
            How to negotiate a {role.displayName} offer in {city.displayName}
          </h2>
          <div className="mt-6 space-y-4">
            {[
              { step: "1. Anchor above the median", detail: `When asked for your number, ask for ${formatSalary(salaries.senior.p75, sym)} — the 75th percentile. This gives you room to "meet in the middle" at the median. Never give a range; give a specific number at the top of what you'd accept.` },
              { step: "2. Use competing offers as leverage", detail: `A competing offer — even from a less desirable company — is the single most powerful negotiating tool. In ${city.displayName}, FAANG, high-growth startup, or established tech company offers give you the most leverage with any employer.` },
              { step: "3. Negotiate total comp, not just base", detail: `Base salary is often the hardest component to move. In ${city.displayName}, signing bonus and RSU grant size are frequently more negotiable than base. A ${formatSalary(20_000, sym)} higher signing bonus has the same year-1 value as a ${formatSalary(20_000, sym)} base increase.` },
              { step: "4. Never accept on the call", detail: `Ask for the offer in writing and tell the recruiter you'll follow up in 24-48 hours. This creates space to counter-offer without pressure. No legitimate employer rescinds an offer because a candidate asked for time to review.` },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 rounded-xl border border-[var(--border)] p-5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-[11px] font-bold text-white">{item.step[0]}</span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.step}</p>
                  <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related salary pages */}
      <section className="bg-[var(--bg)] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-[14px] font-bold text-[var(--ink)]">Other roles in {city.displayName}</h3>
              <ul className="space-y-2">
                {relatedRoles.map((r) => (
                  <li key={r.slug}><Link href={`/salary/${r.slug}`} className="text-[13px] text-[var(--brand)] hover:underline">{r.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-[14px] font-bold text-[var(--ink)]">{role.displayName} salary in other cities</h3>
              <ul className="space-y-2">
                {otherCities.map((r) => (
                  <li key={r.slug}><Link href={`/salary/${r.slug}`} className="text-[13px] text-[var(--brand)] hover:underline">{r.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/salary" className="text-[13px] font-semibold text-[var(--brand)] hover:underline">View all salary guides →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Know your number. Now negotiate it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">
              Zari coaches you through the negotiation conversation — what to say when the recruiter asks your number, how to counter, and how to use competing offers to push above the median {role.shortName} salary in {city.displayName}.
            </p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
