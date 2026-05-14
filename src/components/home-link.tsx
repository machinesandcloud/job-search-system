import Link from "next/link";

export function HomeLink({
  className = "",
  label = "Zari",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <Link
      href="/job-search-system"
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/30 hover:text-white ${className}`}
    >
      <span className="text-[10px]">◈</span>
      {label}
    </Link>
  );
}
