import Link from "next/link";
import { AiResultsRefresh } from "@/components/ai-results-refresh";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "✦", path: "" },
  { id: "resume", label: "Resume", icon: "📄", path: "/resume" },
  { id: "linkedin", label: "LinkedIn", icon: "💼", path: "/linkedin" },
  { id: "cover-letter", label: "Cover Letter", icon: "✉️", path: "/cover-letter" },
  { id: "interview-prep", label: "Interview Prep", icon: "🎯", path: "/interview-prep" },
  { id: "company-strategy", label: "Company Strategy", icon: "🏢", path: "/company-strategy" },
  { id: "scripts", label: "Scripts", icon: "📝", path: "/scripts" },
];

export function PortalShell({
  token,
  active,
  userEmail,
  score,
  statusLabel,
  aiReady,
  children,
}: {
  token: string;
  active: string;
  userEmail?: string | null;
  score: number;
  statusLabel: string;
  aiReady?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0A0E27] text-white">
      <aside className="hidden w-64 flex-shrink-0 border-r border-white/10 bg-[#0A0E27]/95 p-5 lg:flex lg:flex-col">
        <div className="border-b border-white/10 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Askia Coaching</p>
          <p className="text-xs text-white/50">Command Center</p>
        </div>
        <nav className="mt-4 flex-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const href = `/job-search-system/results/${token}${item.path}`;
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-[#06B6D4]/15 text-white" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <span className={`${isActive ? "text-[#06B6D4]" : "text-white/40"}`}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[#0F172A] text-2xl font-bold text-transparent bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text">
            {score}
          </div>
          <p className="mt-2 text-sm font-semibold">{statusLabel}</p>
        </div>
        <div className="mt-4 border-t border-white/10 pt-4 text-xs text-white/60">
          <p className="text-sm font-semibold text-white/80">{userEmail || "Your account"}</p>
        </div>
      </aside>

      <main className="flex-1 px-6 py-10 lg:px-10">
        <AiResultsRefresh token={token} isReady={Boolean(aiReady)} />
        {children}
      </main>
    </div>
  );
}
