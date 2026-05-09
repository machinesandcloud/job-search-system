"use client";

import { useRouter } from "next/navigation";

export function LegalBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 13,
        fontWeight: 600,
        color: "#64748B",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "6px 10px 6px 4px",
        borderRadius: 8,
        marginLeft: "auto",
      }}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
        <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Back
    </button>
  );
}
