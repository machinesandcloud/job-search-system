"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Eyebrow } from "@/components/mvp";

type AuthMode = "login" | "signup";

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
    <Card className="mx-auto max-w-2xl">
      <Eyebrow>{mode === "login" ? "Authentication" : "Get Started"}</Eyebrow>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight">
        {mode === "login" ? "Log in to continue your coaching history." : "Create your profile and launch the first coaching session."}
      </h1>
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {mode === "signup" ? (
          <>
            <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35" placeholder="First name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
            <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35" placeholder="Last name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
          </>
        ) : null}
        <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35 md:col-span-2" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35 md:col-span-2" placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      {mode === "login" ? (
        <p className="mt-4 text-sm text-white/55">Demo account: `steve@askiatech.com` / `demo12345`</p>
      ) : null}
      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
      <button onClick={submit} disabled={loading} className="mt-8 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60">
        {loading ? "Working..." : mode === "login" ? "Continue" : "Continue to onboarding"}
      </button>
    </Card>
  );
}
