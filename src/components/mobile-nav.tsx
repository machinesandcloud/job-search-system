"use client";

import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open navigation menu"
        className="cmd-hamburger"
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>
      {open && (
        <div className="cmd-mobile-overlay">
          <div className="cmd-mobile-panel">
            <button
              type="button"
              aria-label="Close navigation menu"
              className="cmd-mobile-close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <a href="#problem" className="cmd-mobile-link" onClick={() => setOpen(false)}>
              Problem
            </a>
            <a href="#system" className="cmd-mobile-link" onClick={() => setOpen(false)}>
              System
            </a>
            <a href="#offer" className="cmd-mobile-link" onClick={() => setOpen(false)}>
              Assessment
            </a>
            <a href="/job-search-system/start" className="cmd-mobile-cta">
              Start Free Assessment
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
