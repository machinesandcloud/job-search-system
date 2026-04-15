"use client";

import { useEffect, useState } from "react";

const WORDS = ["hired.", "callbacks.", "that offer.", "unstuck.", "momentum."];

export function WordCycle() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 280);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      className="gradient-text-animated inline-block"
      style={{
        transition: "opacity 0.28s ease, transform 0.28s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
      }}
    >
      {WORDS[idx]}
    </span>
  );
}
