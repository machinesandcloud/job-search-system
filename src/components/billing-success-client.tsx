"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type BillingState = "checking" | "ready" | "waiting" | "delayed" | "error";

export function BillingSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [state, setState] = useState<BillingState>("checking");
  const [message, setMessage] = useState("Activating your plan and opening the workspace.");

  useEffect(() => {
    let cancelled = false;

    async function confirmAccess() {
      for (let attempt = 0; attempt < 45; attempt += 1) {
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
                setState("ready");
                setMessage("Your plan is active. Opening Zari now.");
                router.replace("/dashboard?billing=success");
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
            setState("ready");
            setMessage("Your plan is active. Opening Zari now.");
            router.replace("/dashboard?billing=success");
            return;
          }

          const payload = await response.json().catch(() => ({}));
          if (response.status === 402) {
            if (cancelled) return;
            setState(attempt >= 9 ? "delayed" : "waiting");
            setMessage(
              attempt >= 9
                ? "Still processing. This can take another few moments."
                : "Processing your payment and unlocking your workspace.",
            );
          } else if (response.status === 401 || response.status === 403) {
            throw new Error(payload?.error || "We could not confirm your plan yet.");
          } else {
            if (!cancelled) {
              setState(attempt >= 9 ? "delayed" : "waiting");
              setMessage(
                attempt >= 9
                  ? "Still processing. This can take another few moments."
                  : "Processing your payment and unlocking your workspace.",
              );
            }
          }
        } catch (error) {
          if (cancelled) return;
          if (attempt >= 30) {
            setState("error");
            setMessage(error instanceof Error ? error.message : "We could not finish activating your plan.");
            return;
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      if (!cancelled) {
        setState("delayed");
        setMessage("Still processing. We will keep trying automatically.");
      }
    }

    void confirmAccess();
    return () => {
      cancelled = true;
    };
  }, [router, sessionId]);

  return (
    <>
      <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-[#4361EE]" />
        <p className="text-sm font-semibold text-slate-900">
          {state === "ready"
            ? "Opening the workspace now"
            : state === "error"
              ? "We need a little more time"
              : state === "delayed"
                ? "Still processing"
                : "Activating your plan"}
        </p>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {state === "error"
          ? "We are still not done activating your plan. You can return to plan selection and try again in a moment."
          : message}
      </p>
    </div>

      {state === "error" ? (
        <div className="mt-8">
          <Link
            href="/onboarding/plan"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Return to plans
          </Link>
        </div>
      ) : null}
    </>
  );
}
