export default function PlanLoading() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #F4F7FF 0%, #F8FAFC 38%, #EEF2FF 100%)", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", borderBottom: "1px solid #E2E8F0", background: "#fff" }}>
        <div style={{ width: 80, height: 24, borderRadius: 6, background: "#E2E8F0" }} className="pulse" />
        <div style={{ width: 120, height: 16, borderRadius: 6, background: "#E2E8F0" }} className="pulse" />
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ width: 320, height: 36, borderRadius: 10, background: "#E2E8F0", margin: "0 auto 16px" }} className="pulse" />
          <div style={{ width: 480, height: 20, borderRadius: 6, background: "#F1F5F9", margin: "0 auto" }} className="pulse" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ background: "#fff", borderRadius: 24, border: "1px solid #E2E8F0", padding: "32px 28px" }}>
              <div style={{ width: 80, height: 14, borderRadius: 4, background: "#E2E8F0", marginBottom: 16 }} className="pulse" />
              <div style={{ width: 100, height: 36, borderRadius: 8, background: "#F1F5F9", marginBottom: 8 }} className="pulse" />
              <div style={{ width: 60, height: 14, borderRadius: 4, background: "#F1F5F9", marginBottom: 24 }} className="pulse" />
              {[1,2,3,4,5].map(j => (
                <div key={j} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#E2E8F0", flexShrink: 0 }} className="pulse" />
                  <div style={{ flex: 1, height: 12, borderRadius: 4, background: "#F1F5F9" }} className="pulse" />
                </div>
              ))}
              <div style={{ height: 46, borderRadius: 12, background: i === 2 ? "#DBEAFE" : "#F1F5F9", marginTop: 24 }} className="pulse" />
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:.45}} .pulse{animation:pulse 1.6s ease-in-out infinite}`}</style>
    </div>
  );
}
