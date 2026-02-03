"use client";

import { useEffect, useRef, useState } from "react";

type RotatingWordsProps = {
  words: string[];
  intervalMs?: number;
  className?: string;
};

export function RotatingWords({ words, intervalMs = 2400, className }: RotatingWordsProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!words.length) return;
    intervalRef.current = setInterval(() => {
      setPhase("out");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIndex((current) => (current + 1) % words.length);
        setPhase("in");
      }, 320);
    }, intervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [words, intervalMs]);

  if (!words.length) return null;

  return (
    <span className={`cmd-rotator ${className ?? ""}`.trim()} aria-live="polite">
      <span className={`cmd-rotator-word ${phase === "out" ? "is-out" : "is-in"}`.trim()}>
        {words[index]}
      </span>
    </span>
  );
}
