"use client";

import { useState } from "react";

type Task = any;

const priorityStyles: Record<string, string> = {
  CRITICAL: "border-red-500/40 bg-red-500/10",
  HIGH: "border-amber-500/40 bg-amber-500/10",
  MEDIUM: "border-blue-500/40 bg-blue-500/10",
};

export function PremiumTaskCard({
  task,
  completed,
  onToggle,
}: {
  task: Task;
  completed: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const tone = priorityStyles[task.priority] || "border-white/10 bg-white/5";

  return (
    <div className={`rounded-2xl border p-5 ${tone}`}>
      <div className="flex flex-wrap items-start gap-4">
        <button
          type="button"
          onClick={onToggle}
          className={`mt-1 flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-semibold ${
            completed ? "border-emerald-400/50 bg-emerald-400/20 text-emerald-100" : "border-white/20"
          }`}
        >
          {completed ? "✓" : "○"}
        </button>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className={`text-sm font-semibold ${completed ? "line-through text-white/50" : "text-white"}`}>
              {task.title || task.task}
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-white/60">
              <span className="rounded-full border border-white/10 px-2 py-1">{task.category}</span>
              <span className="rounded-full border border-white/10 px-2 py-1">{task.priority}</span>
              <span className="rounded-full border border-white/10 px-2 py-1">{task.timeEstimate}</span>
            </div>
          </div>
          <p className="text-xs text-white/70">{task.context?.whyNow}</p>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="text-xs font-semibold text-[#06B6D4]"
          >
            {expanded ? "Hide guide" : "View full guide"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 text-xs text-white/70">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Current state</p>
            <p className="mt-2 text-white/90">{task.currentState?.issue}</p>
            <p className="mt-1 text-white/60">{task.currentState?.consequence}</p>
          </div>
          {task.beforeAfter && (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Before</p>
                <p className="mt-2">{task.beforeAfter.before}</p>
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">After</p>
                <p className="mt-2 text-white/90">{task.beforeAfter.after}</p>
              </div>
            </div>
          )}
          {Array.isArray(task.exactSteps) && task.exactSteps.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Exact steps</p>
              <ol className="mt-2 list-decimal space-y-2 pl-4">
                {task.exactSteps.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
          {task.template && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Templates</p>
              <div className="mt-2 space-y-3">
                {Object.entries(task.template).map(([key, value]) => (
                  <div key={key} className="rounded-lg border border-white/10 bg-black/40 p-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">{key}</p>
                    <p className="mt-2 text-white/80">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {task.validation?.checkpoints?.length ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Success checklist</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                {task.validation.checkpoints.map((item: string, index: number) => (
                  <li key={index}>{item.replace("☐ ", "")}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
