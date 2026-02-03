"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function ExitIntent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (event.clientY <= 0 && window.innerWidth > 1024) {
        setOpen(true);
      }
    };
    window.addEventListener("mouseout", handler);
    return () => window.removeEventListener("mouseout", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <div className="cmd-panel cmd-panel-strong w-full max-w-lg rounded-3xl p-6 text-center">
        <p className="text-xs uppercase tracking-wide text-slate-400">Before you go</p>
        <h3 className="mt-3 text-2xl font-semibold text-slate-100">
          Wait — get your score in 8 questions. It&apos;s free.
        </h3>
        <p className="mt-2 text-sm text-slate-300">
          Build your career system in 10 minutes. No credit card. Results delivered instantly.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/job-search-system/start"
            data-cta="exit-intent"
            className="cmd-cta rounded-full px-6 py-3 text-sm font-semibold text-slate-950"
          >
            Start Free Assessment
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
