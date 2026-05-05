"use client";

import { useState, type ReactNode } from "react";

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
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      window.location.assign(redirectTo);
    }
  }

  return (
    <button type="button" onClick={logout} disabled={loading} className={className}>
      {loading ? "Signing out..." : children}
    </button>
  );
}
