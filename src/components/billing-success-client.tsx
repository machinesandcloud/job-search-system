"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type BillingState = "checking" | "ready" | "celebrating" | "waiting" | "delayed" | "error";

const PLAN_FEATURES: Record<string, { color: string; emoji: string; features: string[] }> = {
  search: {
    color: "#2563EB",
    emoji: "🎯",
    features: ["Resume review & AI rewrite", "Cover letter generation", "LinkedIn optimization", "Mock interviews", "120 monthly credits"],
  },
  growth: {
    color: "#7C3AED",
    emoji: "🚀",
    features: ["Everything in Search", "Zari Live Coach sessions", "Promotion & salary tools", "Negotiation simulator", "400 monthly credits"],
  },
  executive: {
    color: "#D97706",
    emoji: "⭐",
    features: ["Everything in Growth", "Executive positioning", "Market intelligence", "Leadership coaching", "1,000 monthly credits"],
  },
};

export function BillingSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [state, setState] = useState<BillingState>("checking");
  const [message, setMessage] = useState("Activating your plan and opening the workspace.");
  const [planId, setPlanId] = useState<string | null>(null);
  const [planName, setPlanName] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPlanInfo() {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json().catch(() => ({})) as { planId?: string; planName?: string };
          if (!cancelled) {
            setPlanId(data.planId ?? null);
            setPlanName(data.planName ?? null);
          }
        }
      } catch { /* ignore */ }
    }

    async function confirmAccess() {
      for (let attempt = 0; attempt < 120; attempt += 1) {
        try {
          if (sessionId) {
            const finalizeResponse = await fetch("/api/billing/finalize", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              cache: "no-store",
              body: JSON.stringify({ sessionId }),
            });

            if (finalizeResponse.ok) {
              const finalizePayload = await finalizeResponse.json().catch(() => ({})) as { ready?: boolean };
              if (finalizePayload.ready) {
                if (cancelled) return;
                await fetchPlanInfo();
                setState("celebrating");
                setTimeout(() => {
                  if (!cancelled) router.replace("/dashboard?billing=success");
                }, 3500);
                return;
              }
              if (!cancelled) {
                setState(attempt >= 6 ? "waiting" : "checking");
                setMessage("We are processing your plan and opening your workspace.");
              }
            } else if (finalizeResponse.status === 401 || finalizeResponse.status === 403) {
              const payload = await finalizeResponse.json().catch(() => ({}));
              throw new Error(payload?.error || "We could not confirm your plan yet.");
            }
          }

          const response = await fetch(`/api/billing/status${sessionId ? `?session_id=${encodeURIComponent(sessionId)}` : ""}`, {
            method: "GET",
            cache: "no-store",
          });

          if (response.ok) {
            if (cancelled) return;
            await fetchPlanInfo();
            setState("celebrating");
            setTimeout(() => {
              if (!cancelled) router.replace("/dashboard?billing=success");
            }, 3500);
            return;
          }

          const payload = await response.json().catch(() => ({}));
          if (response.status === 402) {
            if (cancelled) return;
            setState(attempt >= 9 ? "delayed" : "waiting");
            setMessage(
              attempt >= 9
                ? "Still processing. We are continuing to activate your plan in the background."
                : "Processing your payment and unlocking your workspace.",
            );
          } else if (response.status === 401 || response.status === 403) {
            throw new Error(payload?.error || "We could not confirm your plan yet.");
          } else {
            if (!cancelled) {
              setState(attempt >= 9 ? "delayed" : "waiting");
              setMessage(
                attempt >= 9
                  ? "Still processing. We are continuing to activate your plan in the background."
                  : "Processing your payment and unlocking your workspace.",
              );
            }
          }
        } catch {
          if (cancelled) return;
          if (attempt >= 30) {
            setState("delayed");
            setMessage("We are still processing your activation. Hold tight while we keep working in the background.");
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      if (!cancelled) {
        setState("delayed");
        setMessage("We still need a little more time. Your plan activation is still being processed.");
      }
    }

    void confirmAccess();
    return () => { cancelled = true; };
  }, [router, sessionId]);

  const planMeta = planId ? (PLAN_FEATURES[planId] ?? null) : null;
  const displayPlanName = planName ?? (planId ? planId.charAt(0).toUpperCase() + planId.slice(1) : "your plan");

  if (state === "celebrating") {
    return (
      <div className="mt-8">
        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-6 py-6">
          <div className="flex items-center gap-3 mb-4">
            <span style={{ fontSize: 28 }}>{planMeta?.emoji ?? "✅"}</span>
            <div>
              <p className="text-base font-bold text-slate-900">{displayPlanName} is active!</p>
              <p className="text-sm text-slate-600">Opening your workspace in a moment…</p>
            </div>
          </div>
          {planMeta && (
            <div className="grid gap-2 mt-2">
              {planMeta.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14, flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="7" fill={planMeta.color} fillOpacity={0.15}/>
                    <path d="M5 8l2 2 4-4" stroke={planMeta.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm text-slate-700">{f}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <Link href="/dashboard" className="mt-4 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold text-white transition" style={{ background: planMeta?.color ?? "#2563EB" }}>
          Open Zari now →
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5">
        <div className="flex items-center gap-3">
          {state === "checking" || state === "waiting" ? (
            <svg className="animate-spin" viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#4361EE" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          ) : (
            <div className="h-3 w-3 rounded-full bg-[#4361EE]" />
          )}
          <p className="text-sm font-semibold text-slate-900">
            {state === "error"
              ? "We need a little more time"
              : state === "delayed"
                ? "Still processing"
                : "Activating your plan"}
          </p>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {state === "error" ? "We are still working on your plan activation." : message}
        </p>
      </div>

      {state === "error" ? (
        <div className="mt-8">
          <Link
            href="/onboarding/plan"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Back to plans
          </Link>
        </div>
      ) : null}
    </>
  );
}
