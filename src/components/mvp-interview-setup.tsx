"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Eyebrow } from "@/components/mvp";

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
        <h1 className="mt-5 text-4xl font-semibold tracking-tight">Configure the mock interview before the session starts.</h1>
        <div className="mt-5 grid gap-4">
          <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" value={role} onChange={(event) => setRole(event.target.value)} />
          <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" value={companyType} onChange={(event) => setCompanyType(event.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" value={level} onChange={(event) => setLevel(event.target.value)} />
            <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" value={duration} onChange={(event) => setDuration(event.target.value)} />
          </div>
          <button onClick={startInterview} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">Start mock interview</button>
        </div>
      </Card>
      <Card>
        <p className="text-sm uppercase tracking-[0.22em] text-white/45">Coach evaluation</p>
        <div className="mt-5 grid gap-3">
          {[
            "Content quality and role fit",
            "Structure, concision, and storytelling",
            "Evidence, specificity, and missed opportunities",
            "Confidence, pacing, and follow-up handling",
          ].map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-black/15 px-4 py-4 text-sm text-white/74">{item}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}
