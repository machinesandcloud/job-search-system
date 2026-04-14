"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Eyebrow } from "@/components/mvp";

type AuthMode = "login" | "signup";

const inputClass =
  "rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 text-[var(--ink)] outline-none placeholder:text-[var(--muted)]";

export function MvpAuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(mode === "login" ? "steve@askiatech.com" : "");
  const [password, setPassword] = useState(mode === "login" ? "demo12345" : "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setError(null);
    const response = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(payload.error || "Unable to continue.");
      setLoading(false);
      return;
    }
    router.push(mode === "login" ? "/dashboard" : "/onboarding");
    router.refresh();
  }

  return (
    <Card className="mx-auto max-w-2xl border-none bg-transparent p-0 shadow-none">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[32px] bg-[var(--ink)] p-8 text-[var(--bg-soft)] shadow-[var(--shadow)]">
          <Eyebrow>{mode === "login" ? "Authentication" : "Get Started"}</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em]">
            {mode === "login" ? "Return to your coaching workspace." : "Set up your coaching profile."}
          </h1>
          <p className="mt-4 text-base leading-7 text-[rgba(246,241,232,0.72)]">
            {mode === "login"
              ? "Use the demo account or your own credentials to reopen the dashboard, live room, reviews, and saved session history."
              : "Create an account first, then use onboarding to capture goals, role direction, and the friction points the coach should remember."}
          </p>
          {mode === "login" ? (
            <div className="mt-6 rounded-[24px] bg-[rgba(255,255,255,0.08)] p-5 text-sm">
              <p className="uppercase tracking-[0.18em] text-[rgba(246,241,232,0.55)]">Demo account</p>
              <p className="mt-3 font-medium">steve@askiatech.com</p>
              <p className="mt-1">demo12345</p>
            </div>
          ) : null}
        </div>

        <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">
          <div className="grid gap-3 md:grid-cols-2">
            {mode === "signup" ? (
              <>
                <input className={inputClass} placeholder="First name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                <input className={inputClass} placeholder="Last name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
              </>
            ) : null}
            <input className={`${inputClass} md:col-span-2`} placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input className={`${inputClass} md:col-span-2`} placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          {error ? <p className="mt-4 text-sm text-[var(--danger)]">{error}</p> : null}
          <button onClick={submit} disabled={loading} className="mt-8 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--bg-soft)] transition hover:bg-[var(--teal)] disabled:opacity-60">
            {loading ? "Working..." : mode === "login" ? "Continue" : "Continue to onboarding"}
          </button>
        </div>
      </div>
    </Card>
  );
}
