"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

export type CompanyOption = {
  name: string;
  domain?: string | null;
  logoUrl?: string | null;
  industry?: string | null;
  size?: string | null;
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]).join("").toUpperCase();
};

const makeInitialsSvg = (name: string) => {
  const initials = getInitials(name) || "CO";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
    <rect width="100%" height="100%" rx="32" ry="32" fill="#0f172a"/>
    <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="22" fill="#e2e8f0">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export function CompanySelect({
  value,
  onChange,
}: {
  value: CompanyOption[];
  onChange: (companies: CompanyOption[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CompanyOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/company/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    const id = setTimeout(fetchResults, 200);
    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [query]);

  const addCompany = (company: CompanyOption) => {
    if (value.find((item) => item.name === company.name)) return;
    if (value.length >= 30) return;
    onChange([...value, company]);
    setQuery("");
    setResults([]);
  };

  const removeCompany = (name: string) => {
    onChange(value.filter((item) => item.name !== name));
  };

  const canAddManual = query.trim().length > 2 && !results.length;

  return (
    <div className="space-y-3">
      <Input
        placeholder="Type a company name"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {loading && <p className="text-xs text-slate-400">Searching...</p>}
      {results.length > 0 && (
        <div className="grid gap-2 rounded-xl border border-slate-700 bg-slate-950/60 p-2">
          {results.map((company) => (
            <button
              key={company.name}
              type="button"
              onClick={() => addCompany(company)}
              className="flex items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-slate-800/60"
            >
              <img
                src={
                  company.domain
                    ? `https://icons.duckduckgo.com/ip3/${encodeURIComponent(company.domain)}.ico`
                    : company.logoUrl ||
                      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(company.name)}&sz=128`
                }
                alt=""
                className="h-8 w-8 rounded-full border border-slate-700 bg-white"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(event) => {
                  const target = event.currentTarget as HTMLImageElement;
                  const fallback = company.domain
                    ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(company.domain)}&sz=128`
                    : makeInitialsSvg(company.name);
                  if (target.src !== fallback) {
                    target.src = fallback;
                  } else {
                    target.src = makeInitialsSvg(company.name);
                  }
                }}
              />
              <div>
                <p className="text-sm font-semibold text-slate-100">{company.name}</p>
                <p className="text-xs text-slate-400">
                  {company.domain ? company.domain : "Add manually"} - {company.industry || ""} {company.size || ""}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
      {canAddManual && (
        <button
          type="button"
          onClick={() => addCompany({ name: query })}
          className="rounded-full border border-dashed border-slate-500 px-3 py-1 text-sm text-slate-200"
        >
          Add "{query}"
        </button>
      )}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((company) => (
            <span
              key={company.name}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-slate-900"
            >
              {company.name}
              <button type="button" onClick={() => removeCompany(company.name)} className="text-white">
                x
              </button>
            </span>
          ))}
        </div>
      )}
      <p className="text-xs text-slate-400">Select 5-30 companies for the strongest plan.</p>
    </div>
  );
}
