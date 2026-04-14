"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Eyebrow } from "@/components/mvp";
import type { UserProfile } from "@/lib/mvp/types";

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function MvpOnboardingForm({ profile }: { profile: UserProfile }) {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState(profile.currentRole);
  const [targetRole, setTargetRole] = useState(profile.targetRole);
  const [experienceLevel, setExperienceLevel] = useState(profile.experienceLevel);
  const [geography, setGeography] = useState(profile.geography);
  const [goals, setGoals] = useState(profile.goals.join("\n"));
  const [painPoints, setPainPoints] = useState(profile.painPoints.join("\n"));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentRole,
        targetRole,
        experienceLevel,
        geography,
        goals: splitLines(goals),
        painPoints: splitLines(painPoints),
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(payload.error || "Unable to save onboarding.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card>
      <Eyebrow>Onboarding</Eyebrow>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight">Capture the context that makes coaching feel continuous, not generic.</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" value={currentRole} onChange={(event) => setCurrentRole(event.target.value)} placeholder="Current role" />
        <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" value={targetRole} onChange={(event) => setTargetRole(event.target.value)} placeholder="Target role" />
        <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" value={experienceLevel} onChange={(event) => setExperienceLevel(event.target.value)} placeholder="Experience level" />
        <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" value={geography} onChange={(event) => setGeography(event.target.value)} placeholder="Geography" />
        <textarea className="min-h-32 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none md:col-span-2" value={goals} onChange={(event) => setGoals(event.target.value)} placeholder="One goal per line" />
        <textarea className="min-h-32 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none md:col-span-2" value={painPoints} onChange={(event) => setPainPoints(event.target.value)} placeholder="One pain point per line" />
      </div>
      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
      <button onClick={submit} disabled={loading} className="mt-8 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60">
        {loading ? "Saving..." : "Save and enter dashboard"}
      </button>
    </Card>
  );
}
