"use client";

import { useEffect, useState } from "react";

type LiveCounterProps = {
  start: number;
  className?: string;
};

export function LiveCounter({ start, className }: LiveCounterProps) {
  const [value, setValue] = useState(start);
  const [animating, setAnimating] = useState(false);
  const [updates, setUpdates] = useState(0);

  useEffect(() => {
    if (updates >= 5) return;
    const interval = setInterval(() => {
      setAnimating(true);
      setValue((prev) => prev + 1);
      setUpdates((prev) => prev + 1);
      setTimeout(() => setAnimating(false), 300);
    }, 8000);
    return () => clearInterval(interval);
  }, [updates]);

  return (
    <span className={`cmd-live-counter ${animating ? "is-animating" : ""} ${className || ""}`}>
      {value}
    </span>
  );
}
