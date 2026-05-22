"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Captures ?ref=CODE from any page and persists it to localStorage + a
 * cookie so it survives navigation and multi-step OAuth flows.
 * Mounted globally in the root layout inside <Suspense>.
 */
export function ReferralCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("ref")?.trim();
    if (!code || code.length > 32) return;

    try {
      localStorage.setItem("zari_ref", code);
    } catch { /* noop */ }

    // Also set a short-lived cookie so the Google OAuth callback can read it
    // even after the full-page redirect wipes the URL params.
    try {
      const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `zari_ref=${encodeURIComponent(code)};path=/;expires=${expires};SameSite=Lax`;
    } catch { /* noop */ }
  }, [searchParams]);

  return null;
}
