"use client";

import { useEffect, useState } from "react";

type LiveCounterProps = {
  start: number;
  intervalMs?: number;
  maxUpdates?: number;
  className?: string;
};

export function LiveCounter({ start, intervalMs = 12000, maxUpdates = 8, className }: LiveCounterProps) {
  const [value, setValue] = useState(start);
  const [animating, setAnimating] = useState(false);
  const [updates, setUpdates] = useState(0);

  useEffect(() => {
    if (updates >= maxUpdates) return;
    const interval = setInterval(() => {
      setAnimating(true);
      setValue((prev) => prev + 1);
      setUpdates((prev) => prev + 1);
      setTimeout(() => setAnimating(false), 300);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [updates, intervalMs, maxUpdates]);

  return (
    <span className={`cmd-live-counter ${animating ? "is-animating" : ""} ${className || ""}`}>
      {value}
    </span>
  );
}
