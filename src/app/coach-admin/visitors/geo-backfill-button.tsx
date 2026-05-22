"use client";

import { useState } from "react";

type Result = {
  sessionsProcessed: number;
  uniqueIps: number;
  updated: number;
  skipped: number;
  errors: number;
};

export function GeoBackfillButton() {
  const [state, setState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [result, setResult] = useState<Result | null>(null);

  async function run() {
    setState("running");
    setResult(null);
    try {
      const res = await fetch("/api/coach-admin/backfill-geo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nullOnly: false }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json() as Result;
      setResult(data);
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button
        onClick={run}
        disabled={state === "running"}
        style={{
          fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 6,
          border: "1px solid var(--ca-bd)", background: state === "running" ? "var(--ca-raise)" : "var(--ca-card)",
          color: state === "error" ? "#EF4444" : "var(--ca-text2)", cursor: state === "running" ? "wait" : "pointer",
          transition: "all 0.15s",
        }}
      >
        {state === "running" ? "Re-geocoding…" : "Re-geocode all visitors"}
      </button>
      {state === "done" && result && (
        <span style={{ fontSize: 11, color: "#22C55E" }}>
          Updated {result.updated} sessions across {result.uniqueIps} unique IPs
          {result.skipped > 0 ? ` · ${result.skipped} IPs not in DB` : ""}
        </span>
      )}
      {state === "error" && (
        <span style={{ fontSize: 11, color: "#EF4444" }}>Failed — check console</span>
      )}
    </div>
  );
}
