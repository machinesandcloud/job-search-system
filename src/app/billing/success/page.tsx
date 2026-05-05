"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ZariLogo } from "@/components/zari-logo";

type BillingState = "checking" | "ready" | "waiting" | "error";

export default function BillingSuccessPage() {
  const router = useRouter();
  const [state, setState] = useState<BillingState>("checking");
  const [message, setMessage] = useState("Confirming your subscription and unlocking the workspace.");

  useEffect(() => {
    let cancelled = false;

    async function confirmAccess() {
      for (let attempt = 0; attempt < 10; attempt += 1) {
        try {
          const response = await fetch("/api/billing/status", {
            method: "GET",
            cache: "no-store",
          });

          if (response.ok) {
            if (cancelled) return;
            setState("ready");
            setMessage("Your plan is active. Sending you into Zari now.");
            router.replace("/dashboard?billing=success");
            return;
          }

          const payload = await response.json().catch(() => ({}));
          if (response.status === 402) {
            if (cancelled) return;
            setState("waiting");
            setMessage(
              payload?.subscriptionStatus
                ? `Stripe confirmed checkout. Waiting for the subscription sync (${payload.subscriptionStatus}) before opening the workspace.`
                : "Stripe confirmed checkout. Waiting for the subscription sync before opening the workspace."
            );
          } else {
            throw new Error(payload?.error || "Unable to verify subscription access yet.");
          }
        } catch (error) {
          if (cancelled) return;
          setState("error");
          setMessage(error instanceof Error ? error.message : "Unable to confirm your billing state yet.");
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      if (!cancelled) {
        setState("error");
        setMessage("Checkout succeeded, but the billing sync is taking longer than expected. Use the link below to reopen plan selection or refresh in a moment.");
      }
    }

    void confirmAccess();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#F4F7FF_0%,#F8FAFC_38%,#EEF2FF_100%)] text-slate-900">
      <header className="flex items-center justify-between px-8 py-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <ZariLogo size={32} />
          <span className="text-[20px] font-black tracking-[-0.04em] text-[#0A0A0F]">Zari</span>
        </Link>
        <Link href="/onboarding/plan" className="text-sm font-medium text-slate-500 hover:text-slate-900">
          Back to plan selection
        </Link>
      </header>

      <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-6 pb-16">
        <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white px-8 py-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
          <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
            Billing confirmation
          </span>

          <h1 className="mt-6 text-[2.2rem] font-black tracking-[-0.05em] text-[#0A0A0F]">
            {state === "ready" ? "Plan unlocked." : "Finalizing your access."}
          </h1>

          <p className="mt-4 text-[15px] leading-7 text-slate-600">{message}</p>

          <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-[#4361EE]" />
              <p className="text-sm font-semibold text-slate-900">
                {state === "ready"
                  ? "Opening the workspace now"
                  : state === "error"
                    ? "Waiting on billing sync"
                    : "Polling subscription status"}
              </p>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Zari will not treat the account as paid until Stripe checkout and subscription sync are both confirmed.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-2xl bg-[#4361EE] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(67,97,238,0.26)] transition hover:-translate-y-0.5"
            >
              Refresh status
            </button>
            <Link
              href="/onboarding/plan"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Return to plans
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
