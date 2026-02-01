"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { CompanyLogo } from "@/components/company-logo";

export type CompanyOption = {
  name: string;
  domain?: string | null;
  logoUrl?: string | null;
  industry?: string | null;
  size?: string | null;
};

export function CompanySelect({
  value,
  onChange,
}: {
  value: CompanyOption[];
  onChange: (companies: CompanyOption[]) => void;
}) {
  const logoDevKey = process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY;
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
      <p className="text-xs text-slate-400">Search across 1000+ companies or add your own.</p>
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
              <CompanyLogo
                name={company.name}
                domain={company.domain}
                logoUrl={company.logoUrl}
                size={32}
                className="h-8 w-8 rounded-full border border-slate-700 bg-slate-950"
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
      {logoDevKey && (
        <a href="https://logo.dev" className="text-[11px] text-slate-500 underline">
          Logos provided by Logo.dev
        </a>
      )}
    </div>
  );
}
