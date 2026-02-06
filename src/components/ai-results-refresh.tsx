"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AiResultsRefresh({
  token,
  isReady,
}: {
  token: string;
  isReady: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!token || isReady) return;
    let active = true;

    const ensureAi = async () => {
      try {
        await fetch("/api/ai/ensure", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      } catch (_err) {
        // best-effort
      }
    };

    const poll = async () => {
      try {
        const res = await fetch(`/api/results/${token}`, { cache: "no-store" });
        const payload = await res.json();
        if (!active) return false;
        const status = payload?.assessment?.aiAnalysisStatus;
        const hasWeek1 = Boolean(payload?.assessment?.week1Plan?.week1?.tasks?.length);
        if (status === "complete" && hasWeek1) {
          router.refresh();
          return true;
        }
      } catch (_err) {
        // ignore
      }
      return false;
    };

    ensureAi();
    poll();
    const interval = setInterval(async () => {
      await ensureAi();
      const ready = await poll();
      if (ready) clearInterval(interval);
    }, 9000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [token, isReady, router]);

  return null;
}
