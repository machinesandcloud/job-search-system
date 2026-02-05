"use client";

import { useMemo, useState } from "react";
import { buildLogoCandidates, initialsSvg } from "@/lib/logo";

export function CompanyLogo({
  name,
  domain,
  logoUrl,
  size = 40,
  className = "",
}: {
  name: string;
  domain?: string | null;
  logoUrl?: string | null;
  size?: number;
  className?: string;
}) {
  const candidates = useMemo(() => {
    const list = buildLogoCandidates(domain, name, logoUrl);
    if (!list.length) {
      list.push(initialsSvg(name));
      return list;
    }
    list.push(initialsSvg(name));
    return list;
  }, [domain, name, logoUrl]);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const src = candidates[index] || initialsSvg(name);

  if (failed) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-[#0f172a] text-xs font-semibold text-white/80 ${className}`}
        style={{ width: size, height: size }}
      >
        {name
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((part) => part[0])
          .join("")
          .toUpperCase() || "CO"}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => {
        if (index < candidates.length - 1) {
          setIndex((prev) => prev + 1);
          return;
        }
        setFailed(true);
      }}
    />
  );
}
