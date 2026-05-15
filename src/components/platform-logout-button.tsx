"use client";

import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

function SigningOutOverlay() {
  return createPortal(
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: "var(--z-card, #fff)", borderRadius: 18,
        border: "1px solid var(--z-bd, #e5e7eb)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
        padding: "36px 48px", textAlign: "center", minWidth: 240,
      }}>
        <div style={{ display: "flex", gap: 7, justifyContent: "center", marginBottom: 18 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 9, height: 9, borderRadius: "50%", background: "#2563EB",
              animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>
        <p style={{ fontSize: 15, fontWeight: 700, color: "var(--z-text, #111)", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
          Signing you out…
        </p>
        <p style={{ fontSize: 12.5, color: "var(--z-text3, #888)", margin: 0 }}>
          See you next time
        </p>
      </div>
    </div>,
    document.body
  );
}

export function PlatformLogoutButton({
  className = "",
  children = "Sign out",
  redirectTo = "/login",
}: {
  className?: string;
  children?: ReactNode;
  redirectTo?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
    } finally {
      window.location.assign(redirectTo);
    }
  }

  return (
    <>
      {loading && <SigningOutOverlay />}
      <button type="button" onClick={logout} disabled={loading} className={className}
        style={className ? { cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 } : { all: "unset" as const, display: "contents" }}>
        {children}
      </button>
    </>
  );
}
