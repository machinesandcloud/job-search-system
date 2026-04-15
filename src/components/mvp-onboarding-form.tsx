"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { UserProfile } from "@/lib/mvp/types";

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

const fieldClass =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--brand)] focus:bg-white";

const labelClass = "block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)] mb-2";

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
    <div className="mx-auto w-full max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-3.5 py-1.5 text-xs font-semibold text-[var(--brand)]">
          Onboarding
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--ink)] md:text-4xl">
          Tell the coach who you are.
        </h1>
        <p className="mt-3 max-w-xl text-base leading-7 text-[var(--muted)]">
          This context makes every session smarter. You only need to do this once — the coach will
          carry it forward.
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-[var(--border)] bg-white p-7 shadow-[var(--shadow)] md:p-9">
        {/* Role grid */}
        <div>
          <h2 className="mb-5 text-sm font-bold text-[var(--ink)]">Your role</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Current role</label>
              <input
                className={fieldClass}
                placeholder="e.g. Operations Manager"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Target role</label>
              <input
                className={fieldClass}
                placeholder="e.g. Technical Program Manager"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Experience level</label>
              <input
                className={fieldClass}
                placeholder="e.g. 8 years, senior level"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Location / geography</label>
              <input
                className={fieldClass}
                placeholder="e.g. San Francisco, open to remote"
                value={geography}
                onChange={(e) => setGeography(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="my-7 border-t border-[var(--border)]" />

        {/* Goals */}
        <div>
          <h2 className="mb-1 text-sm font-bold text-[var(--ink)]">Goals & pain points</h2>
          <p className="mb-5 text-xs text-[var(--muted)]">Enter one per line.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Goals</label>
              <textarea
                className={`${fieldClass} min-h-32 resize-none`}
                placeholder={"Land a TPM role at a Series B company\nImprove technical interview performance"}
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Pain points</label>
              <textarea
                className={`${fieldClass} min-h-32 resize-none`}
                placeholder={"Callbacks are low despite strong applications\nStruggles with STAR-format storytelling"}
                value={painPoints}
                onChange={(e) => setPainPoints(e.target.value)}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-[var(--danger-soft)] bg-[var(--danger-soft)] px-4 py-3 text-sm text-[var(--danger)]">
            {error}
          </div>
        )}

        <div className="mt-7 flex items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            This information is stored only to personalize your coaching sessions.
          </p>
          <button
            onClick={submit}
            disabled={loading}
            className="inline-flex h-11 flex-shrink-0 items-center gap-2 rounded-xl bg-[var(--brand)] px-6 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition-colors hover:bg-[var(--brand-hover)] disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Saving…
              </>
            ) : (
              "Save and enter dashboard →"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
