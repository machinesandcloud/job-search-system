export default function SettingsLoading() {
  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ width: 140, height: 12, borderRadius: 4, background: "#E2E8F0", marginBottom: 20 }} className="pulse" />
        <div style={{ width: 420, height: 36, borderRadius: 10, background: "#E2E8F0", marginBottom: 40 }} className="pulse" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "20px 22px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F1F5F9", flexShrink: 0 }} className="pulse" />
              <div style={{ flex: 1 }}>
                <div style={{ width: 140, height: 14, borderRadius: 4, background: "#E2E8F0", marginBottom: 8 }} className="pulse" />
                <div style={{ width: "80%", height: 12, borderRadius: 4, background: "#F1F5F9" }} className="pulse" />
              </div>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: "#F1F5F9", flexShrink: 0 }} className="pulse" />
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}.pulse{animation:pulse 1.6s ease-in-out infinite}`}</style>
    </div>
  );
}
