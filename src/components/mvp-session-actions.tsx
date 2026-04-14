"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DemoStartButton({
  href = "/dashboard",
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function start() {
    setLoading(true);
    const response = await fetch("/api/auth/session", { method: "POST" });
    if (response.ok) {
      router.push(href);
      router.refresh();
      return;
    }
    setLoading(false);
  }

  return (
    <button onClick={start} disabled={loading} className={className}>
      {loading ? "Starting..." : children}
    </button>
  );
}

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button onClick={logout} disabled={loading} className={className}>
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}
