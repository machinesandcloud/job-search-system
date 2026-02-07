"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to log in");
      }
      const latest = await fetch("/api/results/latest");
      const latestData = await latest.json();
      if (latest.ok && latestData?.token) {
        window.location.href = `/job-search-system/results/${latestData.token}`;
        return;
      }
      setNotice("No saved results yet. Start a new assessment to generate your dashboard.");
    } catch (err: any) {
      setError(err.message || "Unable to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0A0E27] px-6 pb-20 pt-24 text-white">
      <div className="pointer-events-none absolute right-[-200px] top-[-120px] h-[600px] w-[600px] rounded-full bg-[#06B6D4]/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-160px] left-[-140px] h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/20 blur-[160px]" />

      <div className="mx-auto flex w-full max-w-[640px] flex-col gap-6">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>Return to your saved dashboard</span>
          <Link href="/job-search-system/start" className="text-[#06B6D4] underline underline-offset-4">
            Back to assessment
          </Link>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-[rgba(15,23,42,0.85)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-[16px]">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#06B6D4]">Sign in</p>
          <h1 className="mt-3 text-3xl font-semibold">Log in to your results</h1>
          <p className="mt-3 text-sm text-white/70">
            We’ll take you straight back to your most recent command center with the latest updates.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <Label className="text-sm text-white/80">Email address</Label>
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@domain.com"
                className="mt-2 h-[54px] rounded-xl border border-white/15 bg-white/5 px-4 text-sm"
              />
            </div>
            <div>
              <Label className="text-sm text-white/80">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                className="mt-2 h-[54px] rounded-xl border border-white/15 bg-white/5 px-4 text-sm"
              />
            </div>
          </div>

          <Button
            className="mt-6 h-14 w-full rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] text-sm font-bold"
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Log in"}
          </Button>

          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          {notice && (
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              <p>{notice}</p>
              <Link href="/job-search-system/start" className="mt-2 inline-flex text-[#06B6D4] underline underline-offset-4">
                Start the assessment →
              </Link>
            </div>
          )}

          <div className="my-6 h-px w-full bg-white/10" />

          <p className="text-sm text-white/60">
            New here?{" "}
            <Link href="/job-search-system/start" className="text-[#06B6D4] underline underline-offset-4">
              Start a free assessment
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
