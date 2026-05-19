import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { getCurrentUserId } from "@/lib/mvp/auth";
import { ROLE_SALARIES, CITIES, getSalaryData, formatSalary } from "@/lib/salary-data";

export const metadata: Metadata = {
  title: "Tech Salary Guides — Software Engineer, PM, Data Scientist & More (2025)",
  description:
    "Salary ranges by role and city — software engineers, product managers, data scientists, ML engineers, and 20+ other tech roles across 14 major markets. Updated 2025 with negotiation tactics.",
  keywords: ["tech salary guide 2025", "software engineer salary", "product manager salary", "data scientist salary", "tech salaries by city", "engineering salary guide", "salary negotiation guide"],
  alternates: { canonical: "/salary" },
  openGraph: {
    title: "Tech Salary Guides — Software Engineer, PM, Data Scientist & More (2025)",
    description: "Salary ranges by role and city for 20+ tech roles across 14 markets. Updated 2025.",
    url: "/salary",
  },
};

const FEATURED_COMBOS = [
  { roleKey: "software-engineer", cityKey: "san-francisco" },
  { roleKey: "software-engineer", cityKey: "new-york-city" },
  { roleKey: "software-engineer", cityKey: "seattle" },
  { roleKey: "product-manager", cityKey: "san-francisco" },
  { roleKey: "machine-learning-engineer", cityKey: "san-francisco" },
  { roleKey: "data-scientist", cityKey: "new-york-city" },
  { roleKey: "engineering-manager", cityKey: "san-francisco" },
  { roleKey: "frontend-developer", cityKey: "austin" },
  { roleKey: "software-engineer", cityKey: "remote" },
  { roleKey: "devops-engineer", cityKey: "seattle" },
  { roleKey: "ai-engineer", cityKey: "san-francisco" },
  { roleKey: "product-manager", cityKey: "new-york-city" },
];

export default async function SalaryIndexPage() {
  const userId = await getCurrentUserId();

  return (
    <PageFrame authenticated={Boolean(userId)}>
      <section className="relative overflow-hidden bg-[var(--dark)] pb-20 pt-16 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Salary Data · 20 Roles · 14 Markets
          </div>
          <h1 className="text-[2.8rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3.4rem]">Tech Salary Guides</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/55">
            Salary ranges by experience level and city for 20+ tech roles — software engineers, PMs, data scientists, ML engineers, and more. Updated 2025.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/salary-calculator" className="inline-flex h-11 items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-5 text-[13px] font-semibold text-white transition-all hover:bg-white/15">
              Salary Calculator →
            </Link>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--brand)] px-5 text-[13px] font-semibold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Negotiate your offer with Zari
            </Link>
          </div>
        </div>
      </section>

      {/* Featured salary guides */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Most-searched salary guides</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_COMBOS.map(({ roleKey, cityKey }) => {
              const data = getSalaryData(roleKey, cityKey);
              if (!data) return null;
              const { role, city, salaries } = data;
              const sym = city.currencySymbol;
              const slug = `${roleKey}-salary-${cityKey}`;
              return (
                <Link key={slug} href={`/salary/${slug}`} className="group rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] hover:border-[var(--brand)]/30">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">{city.displayName}, {city.stateOrCountry}</p>
                  <p className="mt-1 font-bold text-[var(--ink)] group-hover:text-[var(--brand)]">{role.displayName}</p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-[1.3rem] font-extrabold text-[var(--ink)]">{formatSalary(salaries.senior.median, sym)}</span>
                    <span className="text-[12px] text-[var(--muted)]">median senior base</span>
                  </div>
                  <p className="mt-1 text-[12px] text-[var(--muted)]">{formatSalary(salaries.junior.p25, sym)}–{formatSalary(salaries.staff.p75, sym)} range all levels</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Browse by role */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Browse salary guides by role</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(ROLE_SALARIES).map(([roleKey, role]) => (
              <div key={roleKey} className="rounded-xl border border-[var(--border)] bg-white p-4">
                <p className="font-bold text-[var(--ink)]">{role.displayName}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["san-francisco", "new-york-city", "seattle", "austin", "remote"].map((cityKey) => (
                    <Link key={cityKey} href={`/salary/${roleKey}-salary-${cityKey}`} className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--brand)] hover:bg-[var(--brand)]/5">
                      {CITIES[cityKey].displayName}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by city */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[1.7rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">Browse salary guides by city</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(CITIES).map(([cityKey, city]) => (
              <div key={cityKey} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <p className="font-bold text-[var(--ink)]">{city.displayName} <span className="font-normal text-[var(--muted)]">· {city.stateOrCountry}</span></p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["software-engineer", "product-manager", "data-scientist", "machine-learning-engineer", "engineering-manager"].map((roleKey) => (
                    <Link key={roleKey} href={`/salary/${roleKey}-salary-${cityKey}`} className="rounded-full border border-[var(--border)] bg-white px-2.5 py-0.5 text-[11px] font-medium text-[var(--brand)] hover:bg-[var(--brand)]/5">
                      {ROLE_SALARIES[roleKey].shortName}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/[0.04] p-10 text-center">
            <p className="mb-2 text-[18px] font-bold text-[var(--ink)]">Know your number. Now negotiate it.</p>
            <p className="mb-7 text-[14px] text-[var(--muted)]">Most candidates accept the first offer — which is typically 15–30% below what the company will actually pay. Zari coaches the negotiation conversation that closes the gap.</p>
            <Link href={userId ? "/dashboard" : "/signup"} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--brand)] px-8 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5">
              Try Zari free <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
