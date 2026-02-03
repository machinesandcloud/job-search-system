"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight || 1;
      const pct = scrolled / total;
      setVisible(pct >= 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[90%] max-w-3xl -translate-x-1/2 rounded-full border border-slate-700 bg-slate-950/80 px-4 py-3 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-200">
        <span>Ready? Start your assessment →</span>
        <Link
          href="/job-search-system/start"
          data-cta="sticky"
          aria-label="Start free assessment"
          className="cmd-cta rounded-full px-5 py-2 text-xs font-semibold text-slate-950"
        >
          Start Free Assessment
        </Link>
      </div>
    </div>
  );
}
