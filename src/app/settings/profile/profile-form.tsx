"use client";

import { useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", fontSize: 14, borderRadius: 10,
  border: "1.5px solid #E2E8F0", background: "#fff", color: "#1E293B",
  outline: "none", transition: "border 0.15s", boxSizing: "border-box",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "22px 24px", marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#94A3B8", marginBottom: 16 }}>{title}</div>
      {children}
    </div>
  );
}

export function ProfileSettingsForm({
  initialFirstName,
  initialLastName,
  email,
  hasPassword,
}: {
  initialFirstName: string;
  initialLastName: string;
  email: string;
  hasPassword: boolean;
}) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [nameLoading, setNameLoading] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [pwdError, setPwdError] = useState<string | null>(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  async function saveName() {
    if (!firstName.trim() || !lastName.trim()) { setNameError("First and last name are required."); return; }
    setNameLoading(true); setNameError(null); setNameSuccess(false);
    const res = await fetch("/api/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName: firstName.trim(), lastName: lastName.trim() }),
    });
    const data = await res.json().catch(() => ({}));
    setNameLoading(false);
    if (!res.ok) { setNameError(data.error ?? "Failed to update name."); return; }
    setNameSuccess(true);
    setTimeout(() => setNameSuccess(false), 3000);
  }

  async function savePassword() {
    if (hasPassword && !currentPassword) { setPwdError("Enter your current password."); return; }
    if (newPassword.length < 8) { setPwdError("New password must be at least 8 characters."); return; }
    if (newPassword !== confirmPassword) { setPwdError("Passwords do not match."); return; }
    setPwdLoading(true); setPwdError(null); setPwdSuccess(false);
    const res = await fetch("/api/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: hasPassword ? currentPassword : undefined, newPassword }),
    });
    const data = await res.json().catch(() => ({}));
    setPwdLoading(false);
    if (!res.ok) { setPwdError(data.error ?? "Failed to update password."); return; }
    setPwdSuccess(true);
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    setTimeout(() => setPwdSuccess(false), 3000);
  }

  function EyeToggle({ show, onToggle }: { show: boolean; onToggle: () => void }) {
    return (
      <button type="button" onClick={onToggle} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 0 }}>
        {show
          ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        }
      </button>
    );
  }

  return (
    <>
      {/* Name section */}
      <Section title="Name">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>First name</label>
            <input
              style={inputStyle} value={firstName} onChange={e => setFirstName(e.target.value)}
              onFocus={e => (e.target.style.border = "1.5px solid #2563EB")}
              onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Last name</label>
            <input
              style={inputStyle} value={lastName} onChange={e => setLastName(e.target.value)}
              onFocus={e => (e.target.style.border = "1.5px solid #2563EB")}
              onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")}
            />
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email address</label>
          <input style={{ ...inputStyle, background: "#F8FAFC", color: "#94A3B8", cursor: "not-allowed" }} value={email} readOnly />
          <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 6 }}>Email changes are not supported yet. Contact support if needed.</p>
        </div>
        {nameError && <p style={{ fontSize: 13, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 12 }}>{nameError}</p>}
        {nameSuccess && <p style={{ fontSize: 13, color: "#059669", background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 8, padding: "10px 14px", marginBottom: 12 }}>Name updated successfully.</p>}
        <button
          onClick={() => void saveName()} disabled={nameLoading}
          style={{ padding: "10px 20px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: nameLoading ? "not-allowed" : "pointer", opacity: nameLoading ? 0.7 : 1 }}
        >
          {nameLoading ? "Saving…" : "Save name"}
        </button>
      </Section>

      {/* Password section */}
      <Section title="Password">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {hasPassword && (
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Current password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showCurrent ? "text" : "password"} style={{ ...inputStyle, paddingRight: 42 }}
                  value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}
                  onFocus={e => (e.target.style.border = "1.5px solid #2563EB")}
                  onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")}
                  placeholder="Enter current password"
                />
                <EyeToggle show={showCurrent} onToggle={() => setShowCurrent(p => !p)} />
              </div>
            </div>
          )}
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>New password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showNew ? "text" : "password"} style={{ ...inputStyle, paddingRight: 42 }}
                value={newPassword} onChange={e => setNewPassword(e.target.value)}
                onFocus={e => (e.target.style.border = "1.5px solid #2563EB")}
                onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")}
                placeholder="At least 8 characters"
              />
              <EyeToggle show={showNew} onToggle={() => setShowNew(p => !p)} />
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Confirm new password</label>
            <input
              type="password" style={inputStyle}
              value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
              onFocus={e => (e.target.style.border = "1.5px solid #2563EB")}
              onBlur={e => (e.target.style.border = "1.5px solid #E2E8F0")}
              placeholder="Repeat new password"
            />
          </div>
        </div>
        {pwdError && <p style={{ fontSize: 13, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginTop: 14 }}>{pwdError}</p>}
        {pwdSuccess && <p style={{ fontSize: 13, color: "#059669", background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 8, padding: "10px 14px", marginTop: 14 }}>Password updated successfully.</p>}
        <button
          onClick={() => void savePassword()} disabled={pwdLoading}
          style={{ marginTop: 16, padding: "10px 20px", borderRadius: 10, border: "none", background: "#2563EB", color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: pwdLoading ? "not-allowed" : "pointer", opacity: pwdLoading ? 0.7 : 1 }}
        >
          {pwdLoading ? "Saving…" : "Update password"}
        </button>
      </Section>
    </>
  );
}
