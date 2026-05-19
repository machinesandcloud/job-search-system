"use client";

import { useState } from "react";
import Link from "next/link";
import { PageFrame } from "@/components/mvp";
import { ROLE_SALARIES, CITIES, getSalaryData, formatSalary } from "@/lib/salary-data";

export default function SalaryCalculatorPage() {
  const [roleKey, setRoleKey] = useState("software-engineer");
  const [cityKey, setCityKey] = useState("san-francisco");
  const [level, setLevel] = useState<"junior" | "mid" | "senior" | "staff">("senior");

  const data = getSalaryData(roleKey, cityKey);
  const sym = data?.city.currencySymbol ?? "$";
  const salaryRange = data?.salaries[level];
  const totalComp = level === "senior" ? data?.totalCompSenior : undefined;

  const LEVELS = [
    { key: "junior", label: "Junior (0–2 yrs)" },
    { key: "mid",    label: "Mid (3–5 yrs)" },
    { key: "senior", label: "Senior (5–8 yrs)" },
    { key: "staff",  label: "Staff / Principal (8+ yrs)" },
  ] as const;

  return (
    <PageFrame authenticated={false}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--dark)] pb-16 pt-14 text-white">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Free Tool · Salary Data
          </div>
          <h1 className="text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[3rem]">Salary Calculator</h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/55">
            See salary ranges for your role, city, and experience level — then get coached on how to negotiate to the top of the band.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-[var(--bg)] py-14">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
            <h2 className="text-[1.3rem] font-extrabold tracking-[-0.02em] text-[var(--ink)]">Your role and market</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {/* Role */}
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Role</label>
                <select
                  value={roleKey}
                  onChange={(e) => setRoleKey(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[14px] text-[var(--ink)] focus:border-[var(--brand)] focus:outline-none"
                >
                  {Object.entries(ROLE_SALARIES).map(([key, role]) => (
                    <option key={key} value={key}>{role.displayName}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">City / Market</label>
                <select
                  value={cityKey}
                  onChange={(e) => setCityKey(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[14px] text-[var(--ink)] focus:border-[var(--brand)] focus:outline-none"
                >
                  {Object.entries(CITIES).map(([key, city]) => (
                    <option key={key} value={key}>{city.displayName} — {city.stateOrCountry}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Level */}
            <div className="mt-5">
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Experience Level</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {LEVELS.map((l) => (
                  <button
                    key={l.key}
                    onClick={() => setLevel(l.key)}
                    className={`rounded-xl border px-3 py-2.5 text-[12px] font-semibold transition-all ${
                      level === l.key
                        ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                        : "border-[var(--border)] bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--brand)]/40"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            {salaryRange && data && (
              <div className="mt-8 rounded-xl border-2 border-[var(--brand)]/20 bg-[var(--brand)]/[0.03] p-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand)]">
                  {ROLE_SALARIES[roleKey].displayName} · {data.city.displayName} · {LEVELS.find(l => l.key === level)?.label}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">25th %ile</p>
                    <p className="mt-1 text-[1.6rem] font-extrabold text-[var(--ink)]">{formatSalary(salaryRange.p25, sym)}</p>
                    <p className="text-[11px] text-[var(--muted)]">base salary</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">Median</p>
                    <p className="mt-1 text-[1.6rem] font-extrabold text-[var(--brand)]">{formatSalary(salaryRange.median, sym)}</p>
                    <p className="text-[11px] text-[var(--muted)]">base salary</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">75th %ile</p>
                    <p className="mt-1 text-[1.6rem] font-extrabold text-[var(--ink)]">{formatSalary(salaryRange.p75, sym)}</p>
                    <p className="text-[11px] text-[var(--muted)]">base salary</p>
                  </div>
                </div>
                {totalComp && (
                  <div className="mt-4 rounded-lg bg-white/80 border border-[var(--border)] px-4 py-3 text-center">
                    <p className="text-[11px] text-[var(--muted)]">Senior total comp (base + equity + bonus): <strong className="text-[var(--ink)]">{formatSalary(totalComp.p25, sym)}–{formatSalary(totalComp.p75, sym)}</strong></p>
                  </div>
                )}
                <p className="mt-3 text-[11px] text-[var(--muted)] text-center">Data in {data.city.currency}. {data.city.techHubNotes}</p>
              </div>
            )}

            {/* Negotiation nudge */}
            {salaryRange && (
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/60 px-5 py-4">
                <p className="text-[13px] text-amber-800">
                  <strong>Most candidates get the 25th percentile.</strong> The gap between the 25th and 75th percentile is{" "}
                  <strong>{formatSalary(salaryRange.p75 - salaryRange.p25, sym)}</strong> — and most of it is recoverable with the right negotiation conversation.
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {data && (
                <Link
                  href={`/salary/${roleKey}-salary-${cityKey}`}
                  className="flex-1 rounded-xl border border-[var(--border)] py-3 text-center text-[13px] font-semibold text-[var(--ink)] hover:border-[var(--brand)]/40 transition-all"
                >
                  Full salary guide for this role →
                </Link>
              )}
              <Link
                href="/signup"
                className="flex-1 rounded-xl bg-[var(--brand)] py-3 text-center text-[13px] font-bold text-white shadow-[0_4px_20px_rgba(67,97,238,0.3)] transition-all hover:-translate-y-0.5"
              >
                Coach me to negotiate this offer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How to use the data */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[var(--ink)]">How to use salary data in your negotiation</h2>
          <div className="mt-6 space-y-4">
            {[
              { title: "Don't anchor to the median", body: "The median is where most candidates land after negotiation — not where to start. Use the 75th percentile as your opening ask. You can always come down; you can never go back up." },
              { title: "Salary data is leverage, not the argument", body: "Saying 'the median salary is $X' doesn't persuade anyone. Salary data is context for you — it tells you when an offer is low. The actual leverage comes from competing offers, your specific skills, and the cost to the company of not hiring you." },
              { title: "Total comp is what matters, not base alone", body: "A $15K lower base paired with a $60K signing bonus and larger RSU grant is worth more in year 1. Always calculate total comp before evaluating an offer." },
              { title: "Use Zari to run the conversation", body: "Knowing the numbers is the research phase. The coaching phase is knowing what to say, in what order, with what tone — and how to handle each recruiter response. Zari coaches the conversation, not just the data." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[var(--border)] p-5">
                <p className="font-bold text-[var(--ink)]">{item.title}</p>
                <p className="mt-1.5 text-[13px] leading-6 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
