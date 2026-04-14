"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Eyebrow } from "@/components/mvp";

const inputClass =
  "rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 text-[var(--ink)] outline-none";

export function MvpInterviewSetup() {
  const router = useRouter();
  const [role, setRole] = useState("Technical Program Manager");
  const [companyType, setCompanyType] = useState("Growth-stage B2B SaaS");
  const [level, setLevel] = useState("Mid-level");
  const [duration, setDuration] = useState("20 minutes");

  async function startInterview() {
    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "interview", title: `${role} mock interview` }),
    });
    if (response.ok) {
      router.push("/coach");
      router.refresh();
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <Eyebrow>Interview Preparation</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">Configure the mock interview before the session starts.</h1>
        <div className="mt-5 grid gap-4">
          <input className={inputClass} value={role} onChange={(event) => setRole(event.target.value)} />
          <input className={inputClass} value={companyType} onChange={(event) => setCompanyType(event.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <input className={inputClass} value={level} onChange={(event) => setLevel(event.target.value)} />
            <input className={inputClass} value={duration} onChange={(event) => setDuration(event.target.value)} />
          </div>
          <button onClick={startInterview} className="rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--bg-soft)] transition hover:bg-[var(--teal)]">Start mock interview</button>
        </div>
      </Card>
      <Card className="bg-[var(--surface-strong)]">
        <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">Coach evaluation</p>
        <div className="mt-5 grid gap-3">
          {[
            "Content quality and role fit",
            "Structure, concision, and storytelling",
            "Evidence, specificity, and missed opportunities",
            "Confidence, pacing, and follow-up handling",
          ].map((item) => (
            <div key={item} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-sm text-[var(--muted)]">{item}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}
