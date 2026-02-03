"use client";

import { useEffect, useRef, useState } from "react";

type TickerMarqueeProps = {
  items: string[];
};

export function TickerMarquee({ items }: TickerMarqueeProps) {
  const [paused, setPaused] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  const onEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setPaused(true);
    }, 2000);
  };

  const onLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setPaused(false);
  };

  return (
    <div className="cmd-ticker-wrap" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className={`cmd-ticker ${paused ? "is-paused" : ""}`}>
        {items.concat(items).map((item, index) => (
          <span key={`${item}-${index}`}>• {item}</span>
        ))}
      </div>
    </div>
  );
}
