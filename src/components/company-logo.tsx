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
    if (!list.length) list.push(initialsSvg(name));
    return list;
  }, [domain, name, logoUrl]);
  const [index, setIndex] = useState(0);
  const src = candidates[index] || initialsSvg(name);

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={className}
      loading="lazy"
      onError={() => {
        if (index < candidates.length - 1) {
          setIndex((prev) => prev + 1);
        } else {
          setIndex(candidates.length - 1);
        }
      }}
    />
  );
}
