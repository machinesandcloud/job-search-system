export default function CoachAdminLoading() {
  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "Inter, system-ui, sans-serif", padding: "32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ width: 200, height: 28, borderRadius: 8, background: "#E2E8F0", marginBottom: 8 }} className="pulse" />
        <div style={{ width: 320, height: 16, borderRadius: 6, background: "#F1F5F9", marginBottom: 32 }} className="pulse" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "20px" }}>
              <div style={{ width: 80, height: 12, borderRadius: 4, background: "#E2E8F0", marginBottom: 12 }} className="pulse" />
              <div style={{ width: 60, height: 28, borderRadius: 6, background: "#F1F5F9" }} className="pulse" />
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "24px" }}>
          <div style={{ width: 160, height: 18, borderRadius: 6, background: "#E2E8F0", marginBottom: 20 }} className="pulse" />
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", padding: "14px 0", borderBottom: "1px solid #F1F5F9" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F1F5F9", flexShrink: 0 }} className="pulse" />
              <div style={{ flex: 1 }}>
                <div style={{ width: 160, height: 13, borderRadius: 4, background: "#E2E8F0", marginBottom: 8 }} className="pulse" />
                <div style={{ width: 220, height: 11, borderRadius: 4, background: "#F1F5F9" }} className="pulse" />
              </div>
              <div style={{ width: 80, height: 26, borderRadius: 99, background: "#F1F5F9" }} className="pulse" />
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}.pulse{animation:pulse 1.6s ease-in-out infinite}`}</style>
    </div>
  );
}
