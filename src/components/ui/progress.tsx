import * as React from "react";
import { cn } from "@/lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 w-full rounded-full bg-slate-200", className)}>
      <div
        className="h-full rounded-full bg-slate-900 transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
