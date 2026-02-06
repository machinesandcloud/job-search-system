"use client";

import { useEffect, useMemo, useState } from "react";
import { PremiumTaskCard } from "@/components/premium/premium-task-card";

type WeekPlan = any;

export function Week1Experience({
  assessmentId,
  createdAt,
  week1Plan,
}: {
  assessmentId: string;
  createdAt: string;
  week1Plan: WeekPlan | null;
}) {
  const [completionMap, setCompletionMap] = useState<Record<string, boolean>>({});
  const tasks = week1Plan?.tasks || [];

  const currentDay = useMemo(() => {
    const start = new Date(createdAt);
    const diff = Math.floor((Date.now() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(7, Math.max(1, diff + 1));
  }, [createdAt]);

  useEffect(() => {
    if (!assessmentId || !tasks.length) return;
    let active = true;
    const fetchStatuses = async () => {
      const entries = await Promise.all(
        tasks.map(async (task: any) => {
          try {
            const res = await fetch(`/api/tasks/${assessmentId}/${task.id}/status`);
            const data = await res.json();
            return [task.id, Boolean(data?.completed)] as const;
          } catch {
            return [task.id, false] as const;
          }
        })
      );
      if (!active) return;
      setCompletionMap(Object.fromEntries(entries));
    };
    fetchStatuses();
    return () => {
      active = false;
    };
  }, [assessmentId, tasks]);

  const toggleTask = async (taskId: string) => {
    setCompletionMap((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
    try {
      await fetch(`/api/tasks/${assessmentId}/${taskId}/toggle`, { method: "POST" });
    } catch {
      setCompletionMap((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
    }
  };

  if (!week1Plan) {
    return null;
  }

  const dailyPlan = week1Plan?.dailyPlan?.[`day${currentDay}`];
  const todaysTasks = tasks.filter((task: any) => task.day === currentDay);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-[#06B6D4]/30 bg-[#06B6D4]/10 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Today</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Day {currentDay}: {dailyPlan?.theme || "Today's focus"}
            </h3>
            <p className="mt-2 text-sm text-white/70">{dailyPlan?.focus || ""}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/60">
            {dailyPlan?.timeNeeded || "—"} • {todaysTasks.length} tasks
          </div>
        </div>
        {dailyPlan?.motivational && (
          <p className="mt-4 text-sm text-white/70">💡 {dailyPlan.motivational}</p>
        )}
      </div>

      <div className="space-y-4">
        {todaysTasks.length ? (
          todaysTasks.map((task: any) => (
            <PremiumTaskCard
              key={task.id}
              task={task}
              completed={Boolean(completionMap[task.id])}
              onToggle={() => toggleTask(task.id)}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            No tasks scheduled for today.
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Week 1 roadmap</h3>
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">7 days</span>
        </div>
        <div className="mt-4 space-y-4">
          {Object.entries(week1Plan?.dailyPlan || {}).map(([dayKey, plan]: any) => {
            const dayNumber = Number(dayKey.replace("day", "")) || 0;
            const dayTasks = tasks.filter((task: any) => task.day === dayNumber);
            return (
              <div key={dayKey} className="rounded-2xl border border-white/10 bg-[#0B1220] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50">Day {dayNumber}</p>
                    <p className="text-sm font-semibold text-white">{plan.theme}</p>
                    <p className="text-xs text-white/60">{plan.focus}</p>
                  </div>
                  <div className="text-xs text-white/60">{plan.timeNeeded}</div>
                </div>
                <div className="mt-3 space-y-3">
                  {dayTasks.map((task: any) => (
                    <PremiumTaskCard
                      key={task.id}
                      task={task}
                      completed={Boolean(completionMap[task.id])}
                      onToggle={() => toggleTask(task.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
