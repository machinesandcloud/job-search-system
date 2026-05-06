export default function DashboardLoading() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", background: "#F8FAFC", fontFamily: "Inter, system-ui, sans-serif", overflow: "hidden" }}>
      {/* Sidebar skeleton */}
      <div style={{ width: 244, flexShrink: 0, background: "#fff", borderRight: "1px solid #E2E8F0", display: "flex", flexDirection: "column", padding: "0 0 16px" }}>
        {/* Logo row */}
        <div style={{ padding: "18px 16px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "#E2E8F0" }} className="zari-pulse" />
          <div style={{ width: 48, height: 16, borderRadius: 6, background: "#E2E8F0" }} className="zari-pulse" />
          <div style={{ marginLeft: "auto", width: 30, height: 30, borderRadius: 8, background: "#E2E8F0" }} className="zari-pulse" />
        </div>
        {/* Stage pill */}
        <div style={{ margin: "0 10px 10px" }}>
          <div style={{ height: 38, borderRadius: 10, background: "#E2E8F0" }} className="zari-pulse" />
        </div>
        {/* Chat CTA */}
        <div style={{ padding: "0 10px 10px" }}>
          <div style={{ height: 40, borderRadius: 10, background: "#DBEAFE" }} className="zari-pulse" />
        </div>
        <div style={{ height: 1, margin: "0 10px 10px", background: "#E2E8F0" }} />
        {/* Nav items */}
        <div style={{ flex: 1, padding: "0 8px", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ height: 10, width: 60, borderRadius: 4, background: "#E2E8F0", margin: "8px 8px 4px" }} className="zari-pulse" />
          {[1,2,3,4].map(i => (
            <div key={i} style={{ height: 34, borderRadius: 8, background: "#F1F5F9" }} className="zari-pulse" />
          ))}
          <div style={{ height: 10, width: 60, borderRadius: 4, background: "#E2E8F0", margin: "12px 8px 4px" }} className="zari-pulse" />
          {[1,2].map(i => (
            <div key={i} style={{ height: 34, borderRadius: 8, background: "#F1F5F9" }} className="zari-pulse" />
          ))}
        </div>
        {/* Account button */}
        <div style={{ margin: "8px 10px 0", height: 54, borderRadius: 10, background: "#F1F5F9" }} className="zari-pulse" />
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ height: 54, background: "#fff", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", padding: "0 26px", gap: 12 }}>
          <div style={{ width: 160, height: 16, borderRadius: 6, background: "#E2E8F0" }} className="zari-pulse" />
          <div style={{ marginLeft: "auto", width: 100, height: 28, borderRadius: 99, background: "#E2E8F0" }} className="zari-pulse" />
          <div style={{ width: 120, height: 36, borderRadius: 10, background: "#F1F5F9" }} className="zari-pulse" />
        </div>
        {/* Content area */}
        <div style={{ flex: 1, padding: "32px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ width: 280, height: 28, borderRadius: 8, background: "#E2E8F0" }} className="zari-pulse" />
          <div style={{ width: "100%", height: 120, borderRadius: 16, background: "#F1F5F9" }} className="zari-pulse" />
          <div style={{ width: "100%", height: 200, borderRadius: 16, background: "#F1F5F9" }} className="zari-pulse" />
        </div>
      </div>

      <style>{`
        @keyframes zari-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
        .zari-pulse { animation: zari-pulse 1.6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
