"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "signup";

const fieldClass =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--brand)] focus:bg-white";

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
    <div className="mx-auto w-full max-w-4xl">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left panel — brand / messaging */}
        <div className="flex flex-col justify-between rounded-2xl bg-[var(--dark)] p-8 text-white md:p-10">
          <div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand)] text-sm font-black text-white">
              A
            </div>
            <h1 className="mt-8 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
              {mode === "login"
                ? "Welcome back to your coaching workspace."
                : "Set up your coaching profile."}
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/50">
              {mode === "login"
                ? "Use the demo account or your own credentials to reopen your dashboard, live room, document reviews, and saved session history."
                : "Create an account, then complete onboarding to capture your goals, target roles, and the friction points the coach should remember between sessions."}
            </p>
          </div>

          {mode === "login" && (
            <div className="mt-8 rounded-xl border border-white/[0.07] bg-white/[0.04] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                Demo account
              </p>
              <div className="mt-4 space-y-1.5">
                <p className="flex items-center justify-between text-sm">
                  <span className="text-white/45">Email</span>
                  <span className="font-medium text-white/80">steve@askiatech.com</span>
                </p>
                <p className="flex items-center justify-between text-sm">
                  <span className="text-white/45">Password</span>
                  <span className="font-medium text-white/80">demo12345</span>
                </p>
              </div>
            </div>
          )}

          {mode === "signup" && (
            <div className="mt-8 space-y-3">
              {["Free to start, no credit card", "Session memory built in", "Document reviews on day one"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-white/50">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--teal-soft)]/10">
                      <svg className="h-3 w-3 text-[var(--teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </span>
                    {item}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Right panel — form */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-[var(--shadow)] md:p-10">
          <h2 className="text-xl font-bold tracking-tight text-[var(--ink)]">
            {mode === "login" ? "Sign in to your account" : "Create your account"}
          </h2>
          <p className="mt-1.5 text-sm text-[var(--muted)]">
            {mode === "login" ? (
              <>
                New here?{" "}
                <Link href="/signup" className="font-semibold text-[var(--brand)] hover:underline">
                  Create an account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-[var(--brand)] hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </p>

          <div className="mt-7 space-y-3">
            {mode === "signup" && (
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className={fieldClass}
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className={fieldClass}
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            )}
            <input
              className={fieldClass}
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={fieldClass}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-[var(--danger-soft)] bg-[var(--danger-soft)] px-4 py-3 text-sm text-[var(--danger)]">
              {error}
            </div>
          )}

          <button
            onClick={submit}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition-colors hover:bg-[var(--brand-hover)] disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Working…
              </>
            ) : mode === "login" ? (
              "Continue to dashboard →"
            ) : (
              "Continue to onboarding →"
            )}
          </button>

          {mode === "login" && (
            <p className="mt-5 text-center text-xs text-[var(--muted)]">
              Demo credentials are pre-filled above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
