"use client";

import { useMemo, useState } from "react";
import { roleOptions } from "@/lib/roles";
import { Input } from "@/components/ui/input";

export function RoleSelect({
  value,
  onChange,
}: {
  value: string[];
  onChange: (roles: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query) return roleOptions;
    return roleOptions.filter((role) => role.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const addRole = (role: string) => {
    if (!role.trim()) return;
    if (value.includes(role)) return;
    onChange([...value, role]);
    setQuery("");
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Search or add a role (e.g., DevOps Engineer)"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            addRole(query);
          }
        }}
      />
      <div className="flex flex-wrap gap-2">
        {filtered.slice(0, 8).map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => addRole(role)}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 hover:border-slate-400"
          >
            {role}
          </button>
        ))}
        {query && !filtered.length && (
          <button
            type="button"
            onClick={() => addRole(query)}
            className="rounded-full border border-dashed border-slate-300 px-3 py-1 text-sm text-slate-700"
          >
            Add "{query}"
          </button>
        )}
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((role) => (
            <span key={role} className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">
              {role}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
