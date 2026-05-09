"use client";

import { useEffect, useState } from "react";

export function SettingsThemeWrapper({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    try { setDark(localStorage.getItem("zari_dark") === "1"); } catch {}
  }, []);

  return (
    <div
      style={{
        "--s-bg":    dark ? "#0B0F1A"                  : "#F8FAFC",
        "--s-card":  dark ? "#111827"                  : "#ffffff",
        "--s-bd":    dark ? "rgba(255,255,255,0.08)"   : "#E2E8F0",
        "--s-text":  dark ? "rgba(255,255,255,0.94)"   : "#0F172A",
        "--s-text2": dark ? "rgba(255,255,255,0.50)"   : "#64748B",
        "--s-text3": dark ? "rgba(255,255,255,0.28)"   : "#94A3B8",
        "--s-input": dark ? "#1A2235"                  : "#ffffff",
        "--s-input-bd": dark ? "rgba(255,255,255,0.12)" : "#E2E8F0",
        background: dark ? "#0B0F1A" : "#F8FAFC",
        minHeight: "100vh",
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
