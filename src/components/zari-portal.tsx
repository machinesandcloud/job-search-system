"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ZariLogo } from "@/components/zari-logo";
import { ZariAvatar, type AvatarState } from "@/components/zari-avatar";

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
type Screen = "session" | "resume" | "interview" | "linkedin" | "documents" | "plan";
type CareerStage = "job-search" | "promotion" | "salary" | "career-change" | "leadership";

const STAGE_ICONS: Record<CareerStage, React.ReactNode> = {
  "job-search":    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><circle cx="6.5" cy="6.5" r="4"/><path d="M11 11l3 3"/></svg>,
  "promotion":     <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><path d="M8 2v8M4 6l4-4 4 4"/><path d="M3 13h10"/></svg>,
  "salary":        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><rect x="1" y="4" width="14" height="9" rx="1.5"/><path d="M5 4V3a3 3 0 016 0v1"/><path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>,
  "career-change": <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><path d="M2 8h12M9 4l5 4-5 4"/></svg>,
  "leadership":    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13,flexShrink:0}}><polygon points="8,2 10,6 14,6.5 11,9.5 11.5,14 8,12 4.5,14 5,9.5 2,6.5 6,6"/></svg>,
};

const STAGE_META: Record<CareerStage, { label:string; color:string; bg:string }> = {
  "job-search":    { label:"Job Search",          color:"#4361EE", bg:"#EEF2FF" },
  "promotion":     { label:"Get Promoted",         color:"#7C3AED", bg:"#F5F3FF" },
  "salary":        { label:"Salary & Negotiation", color:"#059669", bg:"#ECFDF5" },
  "career-change": { label:"Career Change",        color:"#0284C7", bg:"#EFF6FF" },
  "leadership":    { label:"Leadership & Exec",    color:"#D97706", bg:"#FFFBEB" },
};

/* ═══════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════ */
function ScoreRing({ score, color="#4361EE", size=56 }: { score:number; color?:string; size?:number }) {
  const r = (size-8)/2, circ = 2*Math.PI*r, dash = circ*(1-score/100);
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={5}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dash} transform={`rotate(-90 ${size/2} ${size/2})`}/>
      </svg>
      <span style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.24, fontWeight:800, color }}>{score}</span>
    </div>
  );
}

function Bar({ pct, color="#4361EE", h=5 }: { pct:number; color?:string; h?:number }) {
  return (
    <div style={{ height:h, borderRadius:99, background:"#F1F5F9", overflow:"hidden" }}>
      <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:99, transition:"width 0.6s ease" }}/>
    </div>
  );
}

function Tag({ text, color, bg }:{ text:string; color:string; bg:string }) {
  return <span style={{ fontSize:10, fontWeight:700, padding:"2px 9px", borderRadius:99, background:bg, color }}>{text}</span>;
}

function Sparkline({ values, color="#4361EE", width=80, height=24 }: { values:number[]; color?:string; width?:number; height?:number }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pts = values.map((v,i) => `${(i/(values.length-1))*width},${height-4-((v-min)/range)*(height-8)}`).join(" ");
  return (
    <svg width={width} height={height} style={{ display:"block", overflow:"visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={(values.length-1)/(values.length-1)*width} cy={height-4-((values[values.length-1]-min)/range)*(height-8)} r="3" fill={color}/>
    </svg>
  );
}

/* ─── Resume text pre-processors ─── */

/** Join lines that are clearly mid-sentence continuations (PDF line-wrapping artifact).
 *  Only merges when the current line starts with a lowercase letter — a reliable signal
 *  that a sentence was broken mid-word by the PDF extractor.  Skill category lines
 *  ("Cloud & Infra: AWS…"), date lines ("July 2025 - Present"), company names, and
 *  job titles all start with a capital, so they are never incorrectly merged.
 */
function joinWrappedLines(text: string): string {
  const HEADER_RE  = /^[A-Z][A-Z\s&\/\-]{3,}$/;
  const BULLET_RE  = /^[•\-\*\u2022►▸]\s/;
  const DATE_RE    = /^\d{4}|^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|^\d{1,2}[\/-]/i;
  const COLON_RE   = /^[A-Za-z].{2,35}:\s/;   // "Category: items" — keep standalone

  const lines = text.split("\n");
  const out: string[] = [];

  for (const line of lines) {
    const t = line.trim();
    if (!t) { out.push(""); continue; }

    // Section headers, bullets, dates, and skill-category lines are always standalone
    const isStandalone = (HEADER_RE.test(t) && t.length <= 60)
      || BULLET_RE.test(t)
      || DATE_RE.test(t)
      || COLON_RE.test(t);

    if (isStandalone || !out.length) { out.push(t); continue; }

    const last = out[out.length - 1].trim();
    const lastIsStandalone = !last
      || (HEADER_RE.test(last) && last.length <= 60)
      || BULLET_RE.test(last)
      || DATE_RE.test(last)
      || COLON_RE.test(last);

    // Only merge when this line is a true lowercase continuation of the previous line
    const startsLower = /^[a-z]/.test(t);
    if (startsLower && !lastIsStandalone && /[^.!?;:]$/.test(last)) {
      out[out.length - 1] = last + " " + t;
    } else {
      out.push(t);
    }
  }
  return out.join("\n");
}

/** Re-order garbled PDF-extracted resume into canonical section order */
function normalizeResumeText(text: string): string {
  const SECTION_RE = /^(PROFESSIONAL SUMMARY|SUMMARY|PROFILE|OBJECTIVE|SKILLS|TECHNICAL SKILLS|CORE COMPETENCIES|PROFESSIONAL EXPERIENCE|WORK EXPERIENCE|EXPERIENCE|EMPLOYMENT|EMPLOYMENT HISTORY|EDUCATION|CERTIFICATIONS?|LICENSES?|AWARDS?|ACHIEVEMENTS?|PROJECTS?|VOLUNTEER|INTERESTS?)$/i;
  const NAME_RE    = /^[A-Z][A-Z\s]{4,39}[A-Z]$/;
  const CONTACT_RE = /@|\(\d{3}\)|\d{3}[\-.\s]\d{3}[\-.\s]\d{4}/;
  const CITY_ST_RE = /^[A-Za-z][A-Za-z\s]+,\s*[A-Z]{2}$/;
  const SKILL_CATEGORY_RE = /^[A-Za-z][A-Za-z\s&]{2,35}:\s+\S/;
  const CANONICAL  = ["PROFESSIONAL SUMMARY","SUMMARY","PROFILE","OBJECTIVE","SKILLS","TECHNICAL SKILLS","CORE COMPETENCIES","PROFESSIONAL EXPERIENCE","WORK EXPERIENCE","EXPERIENCE","EMPLOYMENT HISTORY","EMPLOYMENT","EDUCATION","CERTIFICATIONS","CERTIFICATION","LICENSES","AWARDS","ACHIEVEMENTS","PROJECTS","VOLUNTEER","INTERESTS"];

  type Sec = { header: string; lines: string[] };
  const nameLines: string[] = [], contactLines: string[] = [], orphaned: string[] = [];
  const sections: Sec[] = [];
  let cur: Sec | null = null;

  const BULLET_LINE_RE = /^[•\-\*\u2022►▸]\s/;
  const DATE_LINE_RE   = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\d{4})\b.*[-–]\s*(Present|\d{4})/i;

  // Detect if a block of lines looks like a job entry (company + bullets or dates)
  function looksLikeJobBlock(lines: string[]): boolean {
    const nonEmpty = lines.filter(l => l.trim());
    const hasBullet = nonEmpty.some(l => BULLET_LINE_RE.test(l.trim()));
    const hasDate   = nonEmpty.some(l => DATE_LINE_RE.test(l.trim()));
    return hasBullet || hasDate;
  }

  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t) { (cur ? cur.lines : orphaned).push(""); continue; }

    if (SECTION_RE.test(t)) {
      cur = { header: t.toUpperCase(), lines: [] };
      sections.push(cur);
      continue;
    }
    if (!cur) {
      // Before any section header
      if (NAME_RE.test(t) && !/\b(EXPERIENCE|EDUCATION|SKILLS|SUMMARY|CERTIFICATIONS|EMPLOYMENT|PROFESSIONAL)\b/i.test(t)) {
        nameLines.push(t.replace(/\s{2,}/g, " "));
      } else if ((CONTACT_RE.test(t) || CITY_ST_RE.test(t)) && t.length < 140) {
        contactLines.push(t);
      } else {
        orphaned.push(t);
      }
    } else {
      // Inside a section — still harvest stray name/contact lines
      if (NAME_RE.test(t) && !/\b(EXPERIENCE|EDUCATION|SKILLS|SUMMARY|CERTIFICATIONS|EMPLOYMENT|PROFESSIONAL)\b/i.test(t) && !nameLines.length) {
        nameLines.push(t.replace(/\s{2,}/g, " "));
      } else if ((CONTACT_RE.test(t) || CITY_ST_RE.test(t)) && t.length < 140 && !contactLines.length) {
        contactLines.push(t);
      } else {
        cur.lines.push(line);
      }
    }
  }

  // If CERTIFICATIONS section contains bullet-heavy content (misassigned job entries from PDF),
  // move those lines to PROFESSIONAL EXPERIENCE
  const certSec = sections.find(s => /CERTIFICATIONS?|LICENSES?/.test(s.header));
  const expSec  = sections.find(s => /EXPERIENCE|EMPLOYMENT/.test(s.header));
  if (certSec && looksLikeJobBlock(certSec.lines)) {
    if (expSec) {
      expSec.lines.push("", ...certSec.lines);
    } else {
      sections.push({ header: "PROFESSIONAL EXPERIENCE", lines: certSec.lines });
    }
    certSec.lines = [];
  }

  // Assign orphaned lines: skill-category lines → SKILLS, everything else → PROFESSIONAL SUMMARY
  const orphanSkills  = orphaned.filter(l => SKILL_CATEGORY_RE.test(l.trim()));
  const orphanSummary = orphaned.filter(l => l.trim() && !SKILL_CATEGORY_RE.test(l.trim()));

  if (orphanSummary.length) {
    let sumSec = sections.find(s => /SUMMARY|PROFILE|OBJECTIVE/.test(s.header));
    if (!sumSec) { sumSec = { header: "PROFESSIONAL SUMMARY", lines: [] }; sections.unshift(sumSec); }
    sumSec.lines = [...orphanSummary, ...sumSec.lines];
  }
  if (orphanSkills.length) {
    let skillSec = sections.find(s => /SKILLS|COMPETENCIES/.test(s.header));
    if (!skillSec) { skillSec = { header: "SKILLS", lines: [] }; sections.push(skillSec); }
    skillSec.lines = [...orphanSkills, ...skillSec.lines];
  }

  const canonIdx = (h: string) => {
    const i = CANONICAL.indexOf(h);
    return i >= 0 ? i : CANONICAL.length;
  };
  sections.sort((a, b) => canonIdx(a.header) - canonIdx(b.header));

  const out: string[] = [];
  const seenNames = new Set<string>();
  for (const n of nameLines) { if (!seenNames.has(n)) { seenNames.add(n); out.push(n); } }
  const seenContact = new Set<string>();
  for (const c of contactLines) { if (!seenContact.has(c)) { seenContact.add(c); out.push(c); } }
  if (out.length) out.push("");

  for (const sec of sections) {
    const content = sec.lines.filter(l => l.trim());
    if (!content.length) continue;
    out.push(sec.header);
    // Trim leading/trailing blank lines
    const trimmed = sec.lines;
    let s = 0, e = trimmed.length - 1;
    while (s < trimmed.length && !trimmed[s].trim()) s++;
    while (e >= 0 && !trimmed[e].trim()) e--;
    out.push(...trimmed.slice(s, e + 1));
    out.push("");
  }
  return out.join("\n").trim();
}

type LineFlag = { kind: "weak"; bulletIdx: number } | { kind: "no_metric" } | { kind: "too_long"; words: number } | { kind: "passive" };

function SuggestionsResume({
  text, bullets, wordIssues, activeIdx, onClickLine,
}: {
  text: string;
  bullets: ResumeBullet[];
  wordIssues?: ResumeWordIssue[];
  activeIdx: number | null;
  onClickLine: (idx: number | null) => void;
}) {
  const [activeTip, setActiveTip] = useState<number | null>(null);
  const HEADER_RE = /^[A-Z][A-Z\s&\/\-]{3,}$/;
  const BULLET_CHAR_RE = /^[•\-\*\u2022►▸]\s*/;
  const PASSIVE_RE = /\b(was|were|is|are|been|being)\s+\w+ed\b/i;
  const METRIC_RE = /\d|%|\$|#/;
  // Use raw lines — no preprocessing. PDF-extracted text is already garbled;
  // any reordering makes it worse. When a PDF is available, the parent shows
  // the iframe instead of this component entirely.
  const lines = text.slice(0, 12000).split("\n");

  // Robust line → bullet matching: strip bullet chars, try multiple slice lengths
  const lineMatch: Record<number, number> = {};
  lines.forEach((line, li) => {
    const norm = line.trim().replace(BULLET_CHAR_RE, "").toLowerCase().replace(/\s+/g, " ");
    if (norm.length < 12) return;
    let bestBi = -1;
    bullets.forEach((b, bi) => {
      if (lineMatch[li] !== undefined) return;
      const bNorm = b.before.trim().replace(BULLET_CHAR_RE, "").toLowerCase().replace(/\s+/g, " ");
      // Try progressively shorter slices for a match
      const slices = [50, 35, 25];
      for (const len of slices) {
        if (norm.slice(0, len) && bNorm.includes(norm.slice(0, len))) { bestBi = bi; break; }
        if (bNorm.slice(0, len) && norm.includes(bNorm.slice(0, len))) { bestBi = bi; break; }
      }
    });
    if (bestBi >= 0) lineMatch[li] = bestBi;
  });

  // Per-line flags (priority: weak > no_metric > too_long > passive)
  function getFlag(line: string, li: number): LineFlag | null {
    const trimmed = line.trim();
    const isBulletLine = BULLET_CHAR_RE.test(trimmed) || (trimmed.startsWith("-") && trimmed.length > 10);
    if (lineMatch[li] !== undefined) return { kind: "weak", bulletIdx: lineMatch[li] };
    if (isBulletLine && !METRIC_RE.test(trimmed)) return { kind: "no_metric" };
    const wordCount = trimmed.split(/\s+/).length;
    if (isBulletLine && wordCount > 35) return { kind: "too_long", words: wordCount };
    if (isBulletLine && PASSIVE_RE.test(trimmed)) return { kind: "passive" };
    return null;
  }

  // Word issue inline highlight map
  const wiMap = new Map<string, string>();
  (wordIssues ?? []).forEach(w => {
    const color = w.type === "weak_verb" ? "#FED7AA" : w.type === "cliche" ? "#FECACA" : "#FDE68A";
    wiMap.set(w.word.toLowerCase(), color);
  });

  function hlText(str: string): React.ReactNode {
    if (!wiMap.size) return str;
    const words = [...wiMap.keys()].map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const re = new RegExp(`\\b(${words.join("|")})\\b`, "gi");
    const parts = str.split(re);
    if (parts.length <= 1) return str;
    return parts.map((part, i) => {
      const color = wiMap.get(part.toLowerCase());
      return color
        ? <mark key={i} style={{ background: color, padding: "0 2px", borderRadius: 3, fontWeight: 600, fontStyle: "normal" }}>{part}</mark>
        : part;
    });
  }

  const FLAG_STYLES: Record<string, { border: string; bg: string; activeBg: string; badge: string; badgeBg: string; badgeColor: string }> = {
    weak:      { border: "#F59E0B", bg: "rgba(245,158,11,0.08)", activeBg: "#FEF3C7", badge: "rewrite available", badgeBg: "#FEF3C7", badgeColor: "#92400E" },
    no_metric: { border: "#EAB308", bg: "rgba(234,179,8,0.07)",  activeBg: "#FEFCE8", badge: "add metric",        badgeBg: "#FEF9C3", badgeColor: "#713F12" },
    too_long:  { border: "#3B82F6", bg: "rgba(59,130,246,0.06)", activeBg: "#EFF6FF", badge: "too long",          badgeBg: "#DBEAFE", badgeColor: "#1E40AF" },
    passive:   { border: "#A855F7", bg: "rgba(168,85,247,0.07)", activeBg: "#FAF5FF", badge: "passive voice",     badgeBg: "#F3E8FF", badgeColor: "#6B21A8" },
  };

  function getTip(flag: LineFlag): string {
    if (flag.kind === "no_metric") return "Add a number to quantify this achievement — %, $, headcount, time saved, or scale (e.g. '50K users').";
    if (flag.kind === "too_long") return `This bullet is ${flag.words} words. Aim for under 25 words — cut filler and lead with the result.`;
    if (flag.kind === "passive") return "Rewrite in active voice. Start with a strong action verb: Led, Built, Increased, Reduced, Launched, Drove…";
    return "";
  }

  const flagKey = (li: number) => `tip-${li}`;

  return (
    <div style={{ fontFamily: "inherit", fontSize: 13, lineHeight: 1.75, color: "#1E2235" }}>
      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", marginBottom: 16, padding: "10px 12px", background: "#F8FAFF", borderRadius: 10, border: "1px solid #E4E8F5" }}>
        {[
          { color: "#F59E0B", label: "Weak bullet — rewrite" },
          { color: "#EAB308", label: "No metric" },
          { color: "#3B82F6", label: "Too long" },
          { color: "#A855F7", label: "Passive voice" },
          { color: "#FED7AA", label: "Weak verb", inline: true },
          { color: "#FECACA", label: "Cliché", inline: true },
        ].map(({ color, label, inline }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            {inline
              ? <mark style={{ background: color, padding: "0 5px", borderRadius: 3, fontSize: 10, fontWeight: 700 }}>word</mark>
              : <div style={{ width: 11, height: 11, borderRadius: 3, background: color, flexShrink: 0 }} />
            }
            <span style={{ fontSize: 11, color: "#68738A" }}>{label}</span>
          </div>
        ))}
      </div>

      {lines.map((raw, li) => {
        const trimmed = raw.trim();
        if (!trimmed) return <div key={li} style={{ height: 7 }} />;

        if (HEADER_RE.test(trimmed) && trimmed.length <= 60) {
          return (
            <div key={li} style={{ marginTop: 18, marginBottom: 6, paddingBottom: 4, borderBottom: "1.5px solid #CBD5E1" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#1E2235", letterSpacing: "0.1em", textTransform: "uppercase" }}>{trimmed}</span>
            </div>
          );
        }

        const flag = getFlag(raw, li);
        const isActive = flag?.kind === "weak"
          ? activeIdx === flag.bulletIdx
          : activeTip === li;
        const fs = flag ? FLAG_STYLES[flag.kind] : null;

        return (
          <div key={li}>
            <div
              onClick={() => {
                if (!flag) return;
                if (flag.kind === "weak") onClickLine(isActive ? null : flag.bulletIdx);
                else setActiveTip(isActive ? null : li);
              }}
              title={flag ? "Click for suggestion" : undefined}
              style={{
                whiteSpace: "pre-wrap", wordBreak: "break-word",
                padding: "3px 10px 3px 12px", borderRadius: 6, marginBottom: 2,
                background: fs ? (isActive ? fs.activeBg : fs.bg) : "transparent",
                borderLeft: fs ? `3px solid ${isActive ? fs.border : fs.border + "99"}` : "3px solid transparent",
                cursor: flag ? "pointer" : "default",
                lineHeight: 1.7, fontSize: 13,
                transition: "background 0.1s",
              }}
            >
              {hlText(trimmed)}
              {fs && (
                <span style={{ fontSize: 10, fontWeight: 700, color: fs.badgeColor, background: fs.badgeBg, padding: "2px 7px", borderRadius: 99, marginLeft: 6, verticalAlign: "middle", whiteSpace: "nowrap" }}>
                  {fs.badge}
                </span>
              )}
            </div>

            {/* Inline popup for weak bullets (has AI rewrite) */}
            {flag?.kind === "weak" && isActive && (
              <div style={{ margin: "6px 10px 10px 12px", border: "1px solid #FCD34D", borderRadius: 12, background: "#FEFCE8" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 14px", background: "#FEF3C7", borderBottom: "1px solid #FCD34D", borderRadius: "12px 12px 0 0" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#92400E" }}>{bullets[flag.bulletIdx].reason}</span>
                  <button onClick={e => { e.stopPropagation(); onClickLine(null); }} style={{ fontSize: 14, background: "none", border: "none", color: "#A0AABF", cursor: "pointer", padding: "0 2px", lineHeight: 1 }}>✕</button>
                </div>
                <div style={{ padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <p style={{ flex: 1, fontSize: 13, color: "#14532D", lineHeight: 1.6, margin: 0 }}>{bullets[flag.bulletIdx].after}</p>
                  <button onClick={() => void navigator.clipboard.writeText(bullets[flag.bulletIdx].after)} style={{ fontSize: 11.5, fontWeight: 600, padding: "5px 12px", borderRadius: 8, border: "1px solid #BBF7D0", background: "white", color: "#16A34A", cursor: "pointer", flexShrink: 0 }}>Copy</button>
                </div>
              </div>
            )}

            {/* Inline tip for no_metric / too_long / passive */}
            {flag && flag.kind !== "weak" && isActive && (
              <div style={{ margin: "6px 10px 10px 12px", border: `1px solid ${FLAG_STYLES[flag.kind].border}44`, borderRadius: 12, background: FLAG_STYLES[flag.kind].activeBg }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "11px 14px" }}>
                  <p style={{ flex: 1, fontSize: 13, color: "#1E2235", lineHeight: 1.6, margin: 0 }}>{getTip(flag)}</p>
                  <button onClick={e => { e.stopPropagation(); setActiveTip(null); }} style={{ fontSize: 14, background: "none", border: "none", color: "#A0AABF", cursor: "pointer", padding: "0 2px", lineHeight: 1, flexShrink: 0 }}>✕</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {text.length > 8000 && <p style={{ fontSize: 11, color: "#A0AABF", marginTop: 10 }}>[…truncated for preview]</p>}
    </div>
  );
}

function FormattedResume({ text, keywords }: { text: string; keywords?: ResumeKeyword[] }) {
  const found = (keywords ?? []).filter(k => k.found).map(k => k.word).sort((a, b) => b.length - a.length);
  const escaped = found.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const kwRegex = found.length ? new RegExp(`(${escaped.join("|")})`, "gi") : null;

  function hlLine(str: string): React.ReactNode {
    if (!kwRegex) return str;
    return str.split(kwRegex).map((p, i) =>
      found.some(k => k.toLowerCase() === p.toLowerCase())
        ? <mark key={i} style={{ background:"#DCFCE7", color:"#14532D", borderRadius:3, padding:"0 2px", fontWeight:600 }}>{p}</mark>
        : p
    );
  }

  const HEADER_RE = /^[A-Z][A-Z\s&\/\-]{3,}$/;
  // No preprocessing — pasted text is already in user's order; PDF text is shown
  // via iframe by the parent so this renderer is only used for pasted text.
  const lines = text.split("\n");

  return (
    <div style={{ fontFamily:"inherit", fontSize:13, lineHeight:1.75, color:"#1E2235" }}>
      {lines.map((line, li) => {
        const trimmed = line.trim();
        // Blank line → small spacer
        if (!trimmed) return <div key={li} style={{ height:7 }}/>;

        // ALL-CAPS section header (e.g. "PROFESSIONAL EXPERIENCE", "EDUCATION")
        if (HEADER_RE.test(trimmed) && trimmed.length <= 60) {
          return (
            <div key={li} style={{ marginTop:18, marginBottom:6, paddingBottom:4, borderBottom:"1.5px solid #CBD5E1" }}>
              <span style={{ fontSize:12, fontWeight:800, color:"#1E2235", letterSpacing:"0.1em", textTransform:"uppercase" }}>
                {trimmed}
              </span>
            </div>
          );
        }

        // Everything else: render exactly as-is, preserving indentation via pre-wrap
        return (
          <div key={li} style={{ whiteSpace:"pre-wrap", wordBreak:"break-word", fontSize:13, lineHeight:1.7, marginBottom:2 }}>
            {hlLine(line)}
          </div>
        );
      })}
      {text.length > 3000 && <p style={{ fontSize:11, color:"#A0AABF", marginTop:10 }}>[…truncated for preview]</p>}
    </div>
  );
}

function HighlightedResume({ text, keywords }: { text:string; keywords?:ResumeKeyword[] }) {
  const found = (keywords ?? []).filter(k=>k.found).map(k=>k.word).sort((a,b)=>b.length-a.length);
  if (!found.length) {
    return <pre style={{ fontSize:11, lineHeight:1.7, color:"#1E2235", whiteSpace:"pre-wrap", wordBreak:"break-word", fontFamily:"inherit", margin:0 }}>{text.slice(0,3000)}{text.length>3000?"\n\n[…truncated]":""}</pre>;
  }
  const escaped = found.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.slice(0, 3000).split(regex);
  return (
    <pre style={{ fontSize:11, lineHeight:1.7, color:"#1E2235", whiteSpace:"pre-wrap", wordBreak:"break-word", fontFamily:"inherit", margin:0 }}>
      {parts.map((part, i) =>
        found.some(k=>k.toLowerCase()===part.toLowerCase())
          ? <mark key={i} style={{ background:"#DCFCE7", color:"#14532D", borderRadius:3, padding:"0 2px", fontWeight:600 }}>{part}</mark>
          : part
      )}
      {text.length>3000?"\n\n[…truncated]":""}
    </pre>
  );
}

/* ═══════════════════════════════════════════════════
   SIDEBAR NAV
═══════════════════════════════════════════════════ */
const BASE_ICONS: Record<Screen, React.ReactNode> = {
  session:   <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><path d="M10 2a3 3 0 00-3 3v4a3 3 0 006 0V5a3 3 0 00-3-3z"/><path d="M4 9v1a6 6 0 0012 0V9"/><line x1="10" y1="15" x2="10" y2="18"/></svg>,
  resume:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><rect x="3" y="2" width="14" height="16" rx="2"/><path d="M7 7h6M7 10h6M7 13h4"/></svg>,
  interview: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><circle cx="10" cy="6" r="3"/><path d="M3 17c0-3.866 3.134-6 7-6s7 2.134 7 6"/></svg>,
  linkedin:  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><rect x="2" y="2" width="16" height="16" rx="3"/><path d="M6 9v5M6 6.5v.5M9 14V11a2.5 2.5 0 015 0v3M9 11v3"/></svg>,
  documents: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><path d="M5 2h7l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M12 2v4h4"/></svg>,
  plan:      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M6 2v4M14 2v4M3 9h14"/><path d="M7 13l2 2 4-4"/></svg>,
};

const STAGE_NAV_LABELS: Record<CareerStage, Record<Screen, string>> = {
  "job-search": {
    session:   "Talk to Zari",
    resume:    "Resume Review",
    interview: "Mock Interview",
    linkedin:  "LinkedIn",
    documents: "My Documents",
    plan:      "Action Plan",
  },
  "promotion": {
    session:   "Talk to Zari",
    resume:    "Build My Case",
    interview: "Pitch Practice",
    linkedin:  "LinkedIn",
    documents: "My Documents",
    plan:      "Promotion Plan",
  },
  "salary": {
    session:   "Talk to Zari",
    resume:    "Salary Research",
    interview: "Negotiation Sim",
    linkedin:  "LinkedIn",
    documents: "My Documents",
    plan:      "Negotiation Plan",
  },
  "career-change": {
    session:   "Talk to Zari",
    resume:    "Reframe Resume",
    interview: "Pivot Interview",
    linkedin:  "LinkedIn",
    documents: "My Documents",
    plan:      "Transition Plan",
  },
  "leadership": {
    session:   "Talk to Zari",
    resume:    "Executive Bio",
    interview: "Story Practice",
    linkedin:  "LinkedIn",
    documents: "My Documents",
    plan:      "Leadership Plan",
  },
};

function getNav(stage: CareerStage): { id:Screen; label:string; icon:React.ReactNode }[] {
  const labels = STAGE_NAV_LABELS[stage];
  return (Object.keys(BASE_ICONS) as Screen[]).map(id => ({
    id,
    label: labels[id],
    icon:  BASE_ICONS[id],
  }));
}

/* ═══════════════════════════════════════════════════
   SCREEN: VOICE COACHING SESSION
═══════════════════════════════════════════════════ */
type ChatMsg = { role:string; text:string };
const STAGE_INIT_MSGS: Record<CareerStage, ChatMsg[]> = {
  "job-search": [
    { role:"coach", text:"Good to see you. Last session we reframed your supply chain project as a product initiative — and you got 2 recruiter responses because of it. Ready to work on interview stories today?" },
    { role:"user",  text:"Yes, let's do it. I'm feeling more confident." },
    { role:"coach", text:"Great. We'll practice the cross-functional leadership question — it's the one Senior PM panels push hardest on. Take your time and use STAR structure." },
  ],
  "promotion": [
    { role:"coach", text:"Let's build your promotion case. Tell me: what's the biggest thing you've owned in the last 6 months that no one else was doing at your level?" },
    { role:"user",  text:"I led the migration of 3 core services — it was originally scoped to someone at Staff level." },
    { role:"coach", text:"That's your lead story. Now let's quantify the impact and tie it to business outcomes your manager actually cares about. What shipped because of that migration?" },
  ],
  "salary": [
    { role:"coach", text:"Before we practice, let's anchor on your number. What's the offer on the table, and what did your research tell you about market rate for this role?" },
    { role:"user",  text:"They offered $145K. Levels.fyi shows p50 is around $162K for this title in SF." },
    { role:"coach", text:"You're $17K below market. That's a strong position to negotiate from. Let's run the conversation — I'll play the hiring manager. Ready?" },
  ],
  "career-change": [
    { role:"coach", text:"Career pivots live or die on narrative. Let's build yours. What's the most relevant part of your background for the new direction you're heading?" },
    { role:"user",  text:"I've been in finance for 6 years but I've always been closest to the product decisions." },
    { role:"coach", text:"That's your bridge — not a departure, a progression. Finance gave you commercial rigour. Now let's frame that as an asset, not a liability, for product roles." },
  ],
  "leadership": [
    { role:"coach", text:"At the executive level, how you communicate is as important as what you communicate. What's a high-stakes conversation or presentation you have coming up?" },
    { role:"user",  text:"I'm presenting the Q3 product strategy to the board next month." },
    { role:"coach", text:"Let's build that narrative. Board presentations need to answer three questions fast: what's the bet, why now, and what will success look like in 12 months? Let's start with the bet." },
  ],
};

const STAGE_PROMPTS: Record<CareerStage, string[]> = {
  "job-search": [
    "Practice a PM interview question",
    "Rewrite my resume bullet",
    "Help me answer 'Why product?'",
    "Give me a LinkedIn headline",
    "What should I work on today?",
    "Run a STAR story practice",
  ],
  "promotion": [
    "Help me build my promotion case",
    "What gaps do I still need to close?",
    "Practice my manager pitch",
    "Write my impact statement",
    "How do I get executive sponsorship?",
    "What does 'next level' look like for me?",
  ],
  "salary": [
    "What's the market rate for my role?",
    "Help me counter a low offer",
    "Practice the negotiation conversation",
    "How do I ask for a raise?",
    "What if they say no?",
    "Write my salary ask message",
  ],
  "career-change": [
    "How do I reframe my background?",
    "What transferable skills do I have?",
    "Rewrite my resume for a new industry",
    "Help me answer 'Why are you switching?'",
    "What's my story for interviews?",
    "Which roles should I target first?",
  ],
  "leadership": [
    "Build my executive presence",
    "How do I communicate to the board?",
    "Practice a leadership story",
    "Help me lead a difficult conversation",
    "Strengthen my strategic narrative",
    "What does VP-level impact look like?",
  ],
};

function ScreenSession({ stage }: { stage: CareerStage }) {
  const [avatarState, setAvatarState] = useState<AvatarState>("speaking");
  const [input, setInput] = useState("");
  const [isVoice, setIsVoice] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  /* ── Load or create a live session on mount / stage change ── */
  useEffect(() => {
    setSessionReady(false);
    setElapsed(0);
    let cancelled = false;

    async function initSession() {
      try {
        // Find an existing live session
        const res = await fetch("/api/sessions", { cache: "no-store" });
        const data = await res.json().catch(() => ({})) as {
          sessions?: Array<{
            id: string; status: string; mode: string;
            transcript?: Array<{ role: string; message: string }>;
          }>;
        };

        if (cancelled) return;
        const sessions = data.sessions ?? [];
        const live = sessions.find(s => s.status === "live");

        if (live) {
          setSessionId(live.id);
          // Restore transcript if it has real messages
          const transcript = live.transcript ?? [];
          if (transcript.length > 0) {
            setMsgs(transcript.map(t => ({ role: t.role, text: t.message })));
            if (!cancelled) setSessionReady(true);
            return;
          }
        } else {
          // Create a fresh session
          const createRes = await fetch("/api/sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mode: "career", title: `${STAGE_META[stage].label} Session` }),
          });
          const created = await createRes.json().catch(() => ({})) as { id?: string };
          if (!cancelled && created.id) setSessionId(created.id);
        }
      } catch {
        // non-fatal — continue without session persistence
      }

      // Fall back to default init messages
      if (!cancelled) {
        setMsgs(STAGE_INIT_MSGS[stage]);
        setSessionReady(true);
      }
    }

    void initSession();
    return () => { cancelled = true; };
  }, [stage]);

  useEffect(() => { const t = setInterval(() => setElapsed(e => e+1), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [msgs, isLoading]);
  useEffect(() => { if (sessionReady) setSessionReady(true); }, [sessionReady]);

  const fmt = (s:number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    // If no session yet, create one now
    let sid = sessionId;
    if (!sid) {
      try {
        const createRes = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: "career", title: `${STAGE_META[stage].label} Session` }),
        });
        const created = await createRes.json().catch(() => ({})) as { id?: string };
        if (created.id) { sid = created.id; setSessionId(created.id); }
      } catch { /* non-fatal */ }
    }

    setMsgs(m => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setAvatarState("thinking");
    setIsLoading(true);

    try {
      const res = await fetch("/api/zari/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          stage,
          history: msgs,
          sessionId: sid,
        }),
      });
      const data = await res.json().catch(() => ({})) as { message?: string };
      const reply = data.message?.trim() || "I'm having a little trouble right now — try again in a moment.";
      setMsgs(m => [...m, { role: "coach", text: reply }]);
      setAvatarState("speaking");
      setTimeout(() => setAvatarState("listening"), 3500);
    } catch {
      setMsgs(m => [...m, { role: "coach", text: "Connection issue — try again in a moment." }]);
      setAvatarState("idle");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ display:"flex", height:"calc(100vh - 56px)", overflow:"hidden" }}>

      {/* ── LEFT PANEL: Zari + prompts ── */}
      <div style={{
        width:300, flexShrink:0,
        background:"white", borderRight:"1px solid #E4E8F5",
        display:"flex", flexDirection:"column",
        padding:"24px 20px",
      }}>
        {/* Status chips */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:10.5, fontWeight:700, color:"#16A34A", padding:"3px 10px", borderRadius:99, background:"#F0FFF4", border:"1px solid #BBF7D0" }}>
            <span style={{ width:5,height:5,borderRadius:"50%",background:"#22C55E",animation:"blink 1.1s ease-in-out infinite" }}/>
            Live
          </span>
          <span style={{ fontFamily:"monospace", fontSize:10.5, color:"#68738A", padding:"3px 10px", borderRadius:99, background:"#F5F7FF", border:"1px solid #E4E8F5" }}>{fmt(elapsed)}</span>
          <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10.5, fontWeight:600, color: STAGE_META[stage].color, padding:"3px 8px", borderRadius:99, background: STAGE_META[stage].bg, border:`1px solid ${STAGE_META[stage].color}30` }}>{STAGE_ICONS[stage]} {STAGE_META[stage].label}</span>
        </div>

        {/* Avatar — centred, contained */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
          <ZariAvatar state={avatarState} size={110} interactive />
        </div>

        {/* Name */}
        <div style={{ textAlign:"center", fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:8 }}>
          Zari <span style={{ fontWeight:400, color:"#68738A" }}>— AI Career Coach</span>
        </div>

        {/* State indicator */}
        <div style={{
          textAlign:"center", fontSize:12, fontWeight:500, marginBottom:18,
          color: avatarState==="speaking"?"#4361EE": avatarState==="listening"?"#06B6D4": avatarState==="thinking"?"#A78BFA":"#A0AABF",
          display:"flex", alignItems:"center", justifyContent:"center", gap:5,
        }}>
          <span style={{ width:6,height:6,borderRadius:"50%", background: avatarState==="speaking"?"#4361EE": avatarState==="listening"?"#06B6D4": avatarState==="thinking"?"#A78BFA":"#A0AABF", animation:"blink 1.2s ease-in-out infinite" }}/>
          {avatarState==="speaking" && "Speaking…"}
          {avatarState==="listening" && "Listening…"}
          {avatarState==="thinking" && "Thinking…"}
          {avatarState==="idle" && "Ready"}
        </div>

        {/* Divider */}
        <div style={{ height:1, background:"#F1F5F9", marginBottom:16 }}/>

        {/* Quick prompts */}
        <p style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"#A0AABF", marginBottom:10 }}>Quick prompts</p>
        <div style={{ display:"flex", flexDirection:"column", gap:6, flex:1, overflowY:"auto" }}>
          {STAGE_PROMPTS[stage].map(p => (
            <button key={p} onClick={() => void sendMessage(p)} disabled={isLoading} style={{ opacity: isLoading ? 0.5 : 1,
              fontSize:12, fontWeight:500, color: STAGE_META[stage].color,
              padding:"8px 11px", borderRadius:9, textAlign:"left",
              background: STAGE_META[stage].bg, border:`1px solid ${STAGE_META[stage].color}20`,
              cursor:"pointer", lineHeight:1.4,
              transition:"opacity 0.15s",
            }}>
              {p}
            </button>
          ))}
        </div>

        {/* Voice toggle */}
        <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #F1F5F9" }}>
          <button onClick={() => setIsVoice(v=>!v)} style={{
            width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            padding:"9px", borderRadius:10, border:"none", cursor:"pointer",
            background: isVoice ? "#4361EE" : "#F5F7FF",
            color: isVoice ? "white" : "#4361EE", fontSize:12.5, fontWeight:600,
            transition:"all 0.2s",
          }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:15,height:15 }}><path d="M10 2a3 3 0 00-3 3v4a3 3 0 006 0V5a3 3 0 00-3-3z"/><path d="M4 9v1a6 6 0 0012 0V9"/><line x1="10" y1="15" x2="10" y2="18"/></svg>
            {isVoice ? "Voice on" : "Enable voice"}
          </button>
        </div>
      </div>

      {/* ── RIGHT PANEL: Transcript + input ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", background:"#FAFBFF", minWidth:0 }}>
        <div ref={chatRef} style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
          {/* Session loading skeleton */}
          {!sessionReady && msgs.length === 0 && (
            <div style={{ display:"flex", gap:10, marginBottom:16, animation:"bubble-appear 0.3s ease" }}>
              <div style={{ width:32,height:32,borderRadius:"50%",flexShrink:0,background:"linear-gradient(135deg,#4361EE,#818CF8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"white" }}>Z</div>
              <div style={{ display:"flex", alignItems:"center", gap:5, padding:"11px 16px", borderRadius:"4px 16px 16px 16px", background:"white", border:"1px solid #E4E8F5" }}>
                {[0,1,2].map(i=><div key={i} style={{ width:7,height:7,borderRadius:"50%",background:"#C7D2FE",animation:`dot-bounce 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}
              </div>
            </div>
          )}
          {msgs.map((msg, i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:16, flexDirection:msg.role==="user"?"row-reverse":"row", animation:`bubble-appear 0.3s ease ${i*0.05}s both` }}>
              <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, background:msg.role==="coach"?"linear-gradient(135deg,#4361EE,#818CF8)":"#E4E8F5", color:msg.role==="coach"?"white":"#68738A", boxShadow:msg.role==="coach"?"0 0 10px rgba(67,97,238,0.25)":"none" }}>
                {msg.role==="coach"?"Z":"S"}
              </div>
              <div style={{ maxWidth:"72%", padding:"11px 15px", fontSize:13.5, lineHeight:1.65, borderRadius:msg.role==="coach"?"4px 16px 16px 16px":"16px 4px 16px 16px", background:msg.role==="coach"?"white":"#4361EE", color:msg.role==="coach"?"#1E2235":"white", border:msg.role==="coach"?"1px solid #E4E8F5":"none", boxShadow:msg.role==="coach"?"0 2px 8px rgba(0,0,0,0.04)":"0 4px 14px rgba(67,97,238,0.28)" }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display:"flex", gap:10, marginBottom:16, animation:"bubble-appear 0.2s ease" }}>
              <div style={{ width:32,height:32,borderRadius:"50%",flexShrink:0,background:"linear-gradient(135deg,#4361EE,#818CF8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"white" }}>Z</div>
              <div style={{ display:"flex", alignItems:"center", gap:5, padding:"11px 16px", borderRadius:"4px 16px 16px 16px", background:"white", border:"1px solid #E4E8F5" }}>
                {[0,1,2].map(i=><div key={i} style={{ width:7,height:7,borderRadius:"50%",background:"#818CF8",animation:`dot-bounce 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ flexShrink:0, padding:"0 28px 20px", borderTop:"1px solid #E4E8F5", paddingTop:14, background:"white" }}>
          <div style={{ position:"relative", background:"#FAFBFF", border:`1.5px solid ${isLoading ? "#C7D2FE" : "#E0E4EF"}`, borderRadius:14, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", transition:"border-color 0.2s" }}>
            <textarea
              style={{ width:"100%", border:"none", outline:"none", fontSize:14, color:"#0A0A0F", background:"transparent", resize:"none", padding:"12px 52px 12px 14px", fontFamily:"inherit", lineHeight:1.6, display:"block", opacity: isLoading ? 0.5 : 1 }}
              rows={3}
              placeholder={isLoading ? "Zari is thinking…" : isVoice ? "Voice mode active — speak or type…" : "Ask Zari anything, or type a question to practice…"}
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();void sendMessage(input);} }}
              disabled={isLoading}
            />
            <button
              onClick={()=>void sendMessage(input)}
              disabled={isLoading || !input.trim()}
              style={{ position:"absolute", bottom:10, right:10, width:34,height:34,borderRadius:10,border:"none",cursor:isLoading||!input.trim()?"default":"pointer", background:input.trim()&&!isLoading?"#4361EE":"#E4E8F5", color:input.trim()&&!isLoading?"white":"#A0AABF", display:"flex",alignItems:"center",justifyContent:"center", transition:"all 0.15s" }}
            >
              {isLoading
                ? <span style={{ width:12,height:12,borderRadius:"50%",border:"2px solid #A0AABF",borderTopColor:"#4361EE",animation:"spin-slow 0.7s linear infinite",display:"block" }}/>
                : <svg viewBox="0 0 20 20" fill="currentColor" style={{ width:14,height:14 }}><path d="M3.105 3.105a1 1 0 011.263-.237l12 6a1 1 0 010 1.764l-12 6a1 1 0 01-1.367-1.31L4.945 10 3 4.678a1 1 0 01.105-1.573z"/></svg>
              }
            </button>
          </div>
          <p style={{ textAlign:"center", fontSize:10, color:"#C4CDD8", marginTop:6 }}>Enter to send · Shift+Enter for new line · Powered by Zari AI</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: RESUME REVIEW — drag-drop upload + full analysis
═══════════════════════════════════════════════════ */
type ResumeStep = "choose"|"job"|"upload"|"paste"|"analyzing"|"results";
type CareerLevel = "entry"|"mid"|"senior"|"executive";

type ResumeScores = { overall: number; ats: number; impact: number; clarity: number };
type ResumeBullet = { before: string; after: string; reason: string; oldScore: number; newScore: number; difficulty?: "easy"|"medium"|"hard" };
type ResumeSection = { label: string; text: string; score: number; originalText?: string };
type ResumeFinding = { type: "critical"|"warn"|"ok"; category?: string; text: string };
type ResumeKeyword = { word: string; found: boolean; importance: "required"|"preferred"; skillType?: "technical"|"soft"|"tool"|"certification"|"domain"; context?: string };
type ResumeSectionScore = { name: string; present: boolean; score: number; verdict: string };
type ResumeWordIssue = { word: string; count: number; type: "repetition"|"filler"|"weak_verb"|"cliche"; suggestion: string };
type ResumeQuickWin = { title: string; action: string; effort: string; impact: "high"|"medium"; tab: "overview"|"bullets"|"rewrite"|"keywords"; bulletRef?: string };
type ResumeBulletStats = { total: number; withMetrics: number; withStrongVerbs: number; weak: number };
type ResumeAnalysis = ResumeScores & {
  findings: ResumeFinding[];
  bullets: ResumeBullet[];
  recommendation: string;
  rewrittenSections: ResumeSection[];
  keywords?: ResumeKeyword[];
  previousScores?: ResumeScores | null;
  tailoredScore?: number;
  bulletStats?: ResumeBulletStats;
  sectionScores?: ResumeSectionScore[];
  quickWins?: ResumeQuickWin[];
  wordIssues?: ResumeWordIssue[];
};
type ResumeHistoryEntry = {
  id: string; filename: string; submittedAt: string;
  mode: string; targetRole?: string;
  scores: ResumeScores;
};
type MagicWriteMode = "refine"|"describe"|"variations";
type MagicWriteState = {
  mode: MagicWriteMode;
  input: string;
  results: string[];
  loading: boolean;
  copied: number | null;
};

/* ─── Resume HTML generator: produces a print-ready styled HTML document ─── */
function escHtml(s: string) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function generateResumeHtml(text: string, footerNote = ""): string {
  const SECTION_KW_RE = /^(PROFESSIONAL SUMMARY|PROFESSIONAL EXPERIENCE|SKILLS|EDUCATION|CERTIFICATIONS?|LICENSES?|PROJECTS?|AWARDS?|ACHIEVEMENTS?|VOLUNTEER|INTERESTS?|OBJECTIVE|PROFILE|PUBLICATIONS?|REFERENCES?|EMPLOYMENT HISTORY|WORK EXPERIENCE|CONTACT)$/i;
  const SECTION_RE    = /^[A-Z][A-Z\s&\/\-]{3,}$/;
  const BULLET_RE     = /^[•\-\*\u2022►▸]\s/;
  const DATE_RE       = /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|\d{4})\b.{0,40}\b(20\d{2}|19\d{2}|Present|Current|Now)\b/i;
  const CONTACT_RE    = /@|\(\d{3}\)|\d{3}[\-.\s]\d{3}[\-.\s]\d{4}|linkedin\.com|github\.com/i;
  // Name: all-caps 2–5 words, 5–40 chars, no section keywords, allow interior spaces (e.g. "ST EVE NGOUMNAI")
  const NAME_RE       = /^[A-Z][A-Z\s]{4,39}[A-Z]$/;
  // Skill category line: "Word(s): rest of line" where label is 2-5 words
  const SKILL_CAT_RE  = /^[A-Za-z][A-Za-z\s&]{2,35}:\s+\S/;

  const lines = text.split("\n");
  let body = "";
  let inList = false;
  let pendingBoldLine: string | null = null; // buffer company name to merge with following date

  const closeList = () => { if (inList) { body += "</ul>\n"; inList = false; } };

  const flushPending = (dateStr?: string) => {
    if (pendingBoldLine === null) return;
    if (dateStr) {
      body += `<div class="job-hdr"><span class="company">${escHtml(pendingBoldLine)}</span><span class="date-r">${escHtml(dateStr)}</span></div>\n`;
    } else {
      body += `<p class="bold-line">${escHtml(pendingBoldLine)}</p>\n`;
    }
    pendingBoldLine = null;
  };

  for (const raw of lines) {
    const t = raw.trim();
    if (!t) { closeList(); flushPending(); body += "<br>\n"; continue; }

    // Section header
    if ((SECTION_KW_RE.test(t) || (SECTION_RE.test(t) && t.length <= 60 && t.split(/\s+/).length <= 4))) {
      closeList(); flushPending();
      body += `<div class="sec-hdr">${escHtml(t)}</div>\n`;
      continue;
    }

    // Bullet
    if (BULLET_RE.test(t)) {
      flushPending();
      const txt = t.replace(/^[•\-\*\u2022►▸]\s*/, "");
      if (!inList) { body += "<ul>\n"; inList = true; }
      body += `  <li>${escHtml(txt)}</li>\n`;
      continue;
    }
    closeList();

    // Name line
    if (NAME_RE.test(t) && !/\b(EXPERIENCE|EDUCATION|SKILLS|SUMMARY|CERTIFICATIONS?|EMPLOYMENT|PROFESSIONAL|OBJECTIVE)\b/i.test(t) && t.split(/\s+/).length >= 2 && t.split(/\s+/).length <= 5) {
      flushPending();
      body += `<p class="name">${escHtml(t)}</p>\n`;
      continue;
    }

    // Contact line (phone/email/url) or City, State
    if ((CONTACT_RE.test(t) && t.length < 160) || /^[A-Za-z][A-Za-z\s]+,\s*[A-Z]{2}$/.test(t)) {
      flushPending();
      body += `<p class="contact">${escHtml(t)}</p>\n`;
      continue;
    }

    // Date line — if there's a pending company name, merge them into one row
    if (DATE_RE.test(t) && t.length < 90) {
      if (pendingBoldLine !== null) {
        flushPending(t); // merge: company name + date on same row
      } else {
        body += `<p class="date-standalone">${escHtml(t)}</p>\n`;
      }
      continue;
    }

    // Skill category line — "Cloud & Infrastructure: AWS, Kubernetes…" → bold label
    if (SKILL_CAT_RE.test(t) && t.length < 200) {
      flushPending();
      const colonIdx = t.indexOf(":");
      const label = t.slice(0, colonIdx);
      const rest  = t.slice(colonIdx + 1);
      body += `<p class="skill-line"><strong>${escHtml(label)}:</strong>${escHtml(rest)}</p>\n`;
      continue;
    }

    // Short line — could be company name or job title; buffer it so we can merge with a following date
    if (!raw.startsWith(" ") && t.length < 100 && t.split(/\s+/).length <= 8) {
      flushPending(); // flush previous if still waiting
      pendingBoldLine = t;
      continue;
    }

    flushPending();
    body += `<p>${escHtml(t)}</p>\n`;
  }
  closeList();
  flushPending();

  const footer = footerNote ? `\n<p class="footer">${escHtml(footerNote)}</p>` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Resume</title>
<style>
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Times New Roman',Times,serif;font-size:11pt;line-height:1.5;color:#000;background:#fff;padding:0.8in 1in;max-width:8.5in;margin:0 auto}
  .name{font-size:18pt;font-weight:800;text-align:center;letter-spacing:4px;text-transform:uppercase;margin-bottom:3px}
  .contact{text-align:center;font-size:10pt;color:#444;margin-bottom:2px}
  .sec-hdr{font-weight:700;text-align:center;border-top:1.5px solid #000;border-bottom:1.5px solid #000;padding:4px 0;margin:14px 0 7px;letter-spacing:.8px;text-transform:uppercase;font-size:10.5pt}
  .job-hdr{display:flex;justify-content:space-between;align-items:baseline;margin-top:8px;margin-bottom:1px}
  .company{font-weight:700;font-size:11pt}
  .date-r{font-size:10pt;color:#333;font-weight:400;white-space:nowrap;margin-left:8px}
  .date-standalone{font-size:10pt;color:#333;margin-bottom:2px}
  .bold-line{font-weight:700;margin-top:6px;margin-bottom:1px}
  .skill-line{margin-bottom:3px;line-height:1.45}
  ul{padding-left:20px;margin:4px 0 6px}
  li{margin-bottom:3px;line-height:1.45}
  p{margin-bottom:3px;line-height:1.5}
  br{display:block;margin:3px 0;content:""}
  .footer{margin-top:24pt;font-size:8.5pt;color:#aaa;text-align:center;border-top:1px solid #eee;padding-top:6pt}
  @media print{@page{margin:.75in}body{padding:0}.footer{display:none}}
</style>
</head>
<body>
${body}${footer}
</body>
</html>`;
}

function ScreenResume({ stage }: { stage: CareerStage }) {
  const [step, setStep]         = useState<ResumeStep>("choose");
  const [progress, setProgress] = useState(0);
  const [tab, setTab]           = useState<"overview"|"bullets"|"rewrite"|"keywords"|"history">("overview");
  const [careerLevel, setCareerLevel] = useState<CareerLevel>("mid");
  const [dragging, setDragging] = useState(false);
  const [resumeText,  setResumeText]  = useState("");
  const [fileName,    setFileName]    = useState("");
  const [aiResult,    setAiResult]    = useState<ResumeAnalysis | null>(null);
  const [analyzeErr,  setAnalyzeErr]  = useState("");
  // History
  const [scoreHistory,    setScoreHistory]    = useState<ResumeHistoryEntry[]>([]);
  const [historyLoading,  setHistoryLoading]  = useState(false);
  // Per-section alternative rewrites
  const [altVersions,     setAltVersions]     = useState<Record<string, string>>({});
  const [rewritingIdx,    setRewritingIdx]     = useState<number | null>(null);
  const [altAttempt,      setAltAttempt]       = useState<Record<number, number>>({});
  const [reviewMode,      setReviewMode]      = useState<"general"|"targeted">("general");
  const [targetRoleInput, setTargetRoleInput] = useState("");
  const [jdInputMode,     setJdInputMode]     = useState<"paste"|"url">("paste");
  const [jobDescription,  setJobDescription]  = useState("");
  const [jdUrl,           setJdUrl]           = useState("");
  const [fetchingJdUrl,   setFetchingJdUrl]   = useState(false);
  const [jdUrlErr,        setJdUrlErr]        = useState("");
  // Magic Write: keyed by bullet index
  const [magicWrite,      setMagicWrite]      = useState<Record<number, MagicWriteState>>({});
  // Suggestions mode on resume preview
  const [resumeViewMode,  setResumeViewMode]  = useState<"preview"|"suggestions">("preview");
  const [activeSuggestion,setActiveSuggestion]= useState<number | null>(null);
  // Quick Wins deep-link scroll target (bullet `before` text prefix)
  const [pendingBulletScroll, setPendingBulletScroll] = useState<string | null>(null);
  // Power Optimized download
  const [powerOptimizing, setPowerOptimizing] = useState(false);
  const [downloadModal, setDownloadModal] = useState<{ type: "revised" | "powerOptimized" } | null>(null);
  // Blob URL for the originally uploaded file (PDF iframe preview)
  const [rawFileUrl, setRawFileUrl] = useState<string | null>(null);
  const rawFileUrlRef = useRef<string | null>(null);

  function triggerWordDownload(html: string, name: string) {
    const wordHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">${html.replace(/<html[^>]*>/, "").replace(/<\/html>/, "")}</html>`;
    const blob = new Blob([wordHtml], { type: "application/vnd.ms-word" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name.replace(/\.html$/, ".doc"); a.click();
    URL.revokeObjectURL(url);
  }

  function triggerPdfDownload(html: string) {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 400);
  }

  function buildRevisedHtml(): string {
    if (!aiResult) return "";
    let revised = resumeText;
    (aiResult.bullets ?? []).forEach(b => {
      if (b.before && b.after) revised = revised.replace(b.before, b.after);
    });
    (aiResult.rewrittenSections ?? []).forEach((s, idx) => {
      const newText = altVersions[idx] ?? s.text;
      if (s.originalText && s.originalText.trim().length > 20) {
        revised = revised.replace(s.originalText.trim(), newText);
      }
    });
    return generateResumeHtml(revised);
  }

  function downloadReconstructed() {
    setDownloadModal({ type: "revised" });
  }

  async function downloadPowerOptimized() {
    setDownloadModal({ type: "powerOptimized" });
  }

  async function executeDownload(format: "word" | "pdf") {
    const modal = downloadModal;
    setDownloadModal(null);
    const baseName = (fileName || "resume").replace(/\.[^.]+$/, "");

    if (modal?.type === "revised") {
      const html = buildRevisedHtml();
      if (!html) return;
      if (format === "word") triggerWordDownload(html, `${baseName}-revised.html`);
      else triggerPdfDownload(html);
      return;
    }

    // Power Optimized — needs API call
    if (!aiResult || powerOptimizing) return;
    setPowerOptimizing(true);
    try {
      const res = await fetch("/api/zari/resume/power-optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, targetRole: targetRoleInput, jobDescription }),
      });
      const data = await res.json().catch(() => ({})) as { resumeText?: string; error?: string };
      if (!data.resumeText) { setPowerOptimizing(false); return; }
      const html = generateResumeHtml(data.resumeText);
      if (format === "word") triggerWordDownload(html, `${baseName}-power-optimized.html`);
      else triggerPdfDownload(html);
    } catch { /* non-fatal */ }
    setPowerOptimizing(false);
  }

  async function fetchResumeJdFromUrl() {
    if (!jdUrl.trim()) return;
    setFetchingJdUrl(true);
    setJdUrlErr("");
    try {
      const res = await fetch("/api/zari/fetch-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: jdUrl.trim() }),
      });
      const data = await res.json().catch(() => ({})) as { text?: string; error?: string };
      if (data.text) { setJobDescription(data.text); setJdUrlErr(""); }
      else setJdUrlErr(data.error ?? "Couldn't extract text — paste the job description instead.");
    } catch { setJdUrlErr("Couldn't reach that URL — paste the job description instead."); }
    setFetchingJdUrl(false);
  }

  const targetedInvalid = reviewMode === "targeted" && !targetRoleInput.trim() && !jobDescription.trim();

  const LOCAL_HISTORY_KEY = "zari_resume_history_v2";

  function readLocalHistory(): ResumeHistoryEntry[] {
    try { return JSON.parse(localStorage.getItem(LOCAL_HISTORY_KEY) ?? "[]") as ResumeHistoryEntry[]; }
    catch { return []; }
  }

  function writeLocalHistory(entries: ResumeHistoryEntry[]) {
    try { localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(entries.slice(0, 30))); } catch { /* ignore */ }
  }

  function pushLocalHistory(entry: ResumeHistoryEntry) {
    const existing = readLocalHistory();
    writeLocalHistory([entry, ...existing]);
  }

  async function fetchHistory() {
    setHistoryLoading(true);
    try {
      const res = await fetch("/api/zari/resume/history");
      const data = await res.json().catch(() => ({})) as { history?: ResumeHistoryEntry[] };
      const server = data.history ?? [];
      const local  = readLocalHistory();
      // Merge: prefer server entries, fill with local ones not already in server (by submittedAt proximity)
      const serverTs = new Set(server.map(e => e.submittedAt));
      const merged = [...server, ...local.filter(e => !serverTs.has(e.submittedAt))];
      merged.sort((a,b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      setScoreHistory(merged.slice(0, 30));
    } catch {
      setScoreHistory(readLocalHistory());
    }
    setHistoryLoading(false);
  }

  async function clearHistory() {
    try { await fetch("/api/zari/resume/history", { method: "DELETE" }); } catch { /* non-fatal */ }
    writeLocalHistory([]);
    setScoreHistory([]);
  }

  async function rewriteSection(idx: number, section: ResumeSection) {
    setRewritingIdx(idx);
    const attempt = (altAttempt[idx] ?? 1) + 1;
    setAltAttempt(prev => ({ ...prev, [idx]: attempt }));
    try {
      const res = await fetch("/api/zari/resume/rewrite-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: section.label,
          currentText: altVersions[idx] ?? section.text,
          resumeText,
          targetRole: targetRoleInput,
          jobDescription,
          stage,
          attempt,
        }),
      });
      const data = await res.json().catch(() => ({})) as { text?: string };
      if (data.text) setAltVersions(prev => ({ ...prev, [idx]: data.text! }));
    } catch { /* non-fatal */ }
    setRewritingIdx(null);
  }

  function openMagicWrite(idx: number) {
    setMagicWrite(prev => ({ ...prev, [idx]: { mode:"refine", input:"", results:[], loading:false, copied:null } }));
  }

  function closeMagicWrite(idx: number) {
    setMagicWrite(prev => { const n = { ...prev }; delete n[idx]; return n; });
  }

  async function runMagicWrite(idx: number, bullet: ResumeBullet) {
    const state = magicWrite[idx];
    if (!state) return;
    setMagicWrite(prev => ({ ...prev, [idx]: { ...prev[idx], loading:true, results:[] } }));
    try {
      const res = await fetch("/api/zari/resume/magic-write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bullet: bullet.before,
          mode: state.mode,
          userInput: state.mode === "refine" ? bullet.after : state.input,
          resumeText,
          targetRole: targetRoleInput,
          jobDescription,
        }),
      });
      const data = await res.json().catch(() => ({})) as { bullets?: string[] };
      setMagicWrite(prev => ({ ...prev, [idx]: { ...prev[idx], loading:false, results: data.bullets ?? [] } }));
    } catch {
      setMagicWrite(prev => ({ ...prev, [idx]: { ...prev[idx], loading:false } }));
    }
  }

  async function handleFile(file: File) {
    if (targetedInvalid) {
      setAnalyzeErr("Add a job title or paste a job description first — Zari needs a target to score against.");
      return;
    }
    setFileName(file.name);
    setAnalyzeErr("");
    setStep("analyzing");
    setProgress(5);
    // Store blob URL for PDF preview iframe
    if (rawFileUrlRef.current) URL.revokeObjectURL(rawFileUrlRef.current);
    const blobUrl = URL.createObjectURL(file);
    rawFileUrlRef.current = blobUrl;
    setRawFileUrl(blobUrl);

    // Extract text from file
    let extracted = "";
    try {
      const fd = new FormData();
      fd.append("file", file);
      const extractRes = await fetch("/api/zari/extract", { method: "POST", body: fd });
      const extractData = await extractRes.json().catch(() => ({})) as { text?: string; error?: string };
      if (!extractData.text) {
        setStep("paste");
        setAnalyzeErr(extractData.error ?? "Could not read file — try pasting the text instead.");
        return;
      }
      extracted = extractData.text;
      setResumeText(extracted);
    } catch {
      setStep("paste");
      setAnalyzeErr("Could not read file — try pasting the text instead.");
      return;
    }

    await runAnalysis(extracted);
  }

  async function runAnalysis(text?: string) {
    const textToAnalyze = text ?? resumeText;
    if (!textToAnalyze.trim()) return;
    if (targetedInvalid) {
      setAnalyzeErr("Add a job title or paste a job description first — Zari needs a target to score against.");
      return;
    }
    setAnalyzeErr("");
    if (step !== "analyzing") setStep("analyzing");

    let p = 5;
    const interval = setInterval(() => {
      p += Math.random() * 10 + 2;
      if (p >= 90) { clearInterval(interval); }
      setProgress(Math.min(p, 90));
    }, 200);

    try {
      const res = await fetch("/api/zari/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: textToAnalyze, filename: fileName || "resume", stage, reviewMode, targetRole: targetRoleInput, jobDescription, careerLevel }),
      });
      const data = await res.json().catch(() => null) as ResumeAnalysis | null;
      clearInterval(interval);
      setProgress(100);
      if (data && data.overall) {
        setAiResult(data);
        // Always persist to localStorage so history works regardless of auth state
        pushLocalHistory({
          id: `local_${Date.now()}`,
          filename: fileName || "resume",
          submittedAt: new Date().toISOString(),
          mode: reviewMode,
          targetRole: targetRoleInput || undefined,
          scores: { overall: data.overall, ats: data.ats, impact: data.impact, clarity: data.clarity },
        });
        setTimeout(() => { setStep("results"); setResumeViewMode("suggestions"); }, 400);
      } else {
        setStep("paste");
        setAnalyzeErr("Analysis failed — try again.");
      }
    } catch {
      clearInterval(interval);
      setStep("paste");
      setAnalyzeErr("Connection error — try again.");
    }
  }

  // Fetch history when entering results view
  useEffect(() => { if (step === "results") void fetchHistory(); }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  // Revoke blob URL when component unmounts
  useEffect(() => {
    const ref = rawFileUrlRef;
    return () => { if (ref.current) URL.revokeObjectURL(ref.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Deep-link scroll: after tab switches to "bullets", scroll to the referenced bullet
  useEffect(() => {
    if (tab === "bullets" && pendingBulletScroll) {
      const ref = pendingBulletScroll.toLowerCase().slice(0, 50);
      setPendingBulletScroll(null);
      const idx = (aiResult?.bullets ?? []).findIndex(b =>
        b.before.toLowerCase().slice(0, 50).includes(ref.slice(0, 30)) ||
        ref.includes(b.before.toLowerCase().slice(0, 30))
      );
      const targetId = idx >= 0 ? `bullet-${idx}` : "bullet-0";
      setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }, [tab, pendingBulletScroll, aiResult?.bullets]); // eslint-disable-line react-hooks/exhaustive-deps

  const ANALYSIS_STAGES = [
    "Parsing document structure…",
    "Running ATS keyword scan…",
    "Scoring impact per bullet…",
    "Comparing to 40+ job descriptions…",
    "Generating rewrites…",
    "Finalizing optimized version…",
  ];
  const [stageIdx, setStageIdx] = useState(0);
  useEffect(() => {
    if (step !== "analyzing") return;
    const t = setInterval(() => setStageIdx(i => Math.min(i+1, ANALYSIS_STAGES.length-1)), 800);
    return () => clearInterval(t);
  }, [step]);

  /* ══════════════════════════════════
     STEP: CHOOSE — landing path picker
  ══════════════════════════════════ */
  if (step === "choose") return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#F4F6FB" }}>
      <div style={{ maxWidth:700, margin:"0 auto", padding:"52px 24px 64px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#EEF2FF", border:"1px solid #C7D2FE", borderRadius:99, padding:"5px 14px", marginBottom:18 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#4361EE" }}/>
            <span style={{ fontSize:12, fontWeight:700, color:"#4361EE" }}>Resume Review</span>
          </div>
          <h1 style={{ fontSize:30, fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", marginBottom:12 }}>How do you want to review your resume?</h1>
          <p style={{ fontSize:15, color:"#68738A", lineHeight:1.65, maxWidth:420, margin:"0 auto" }}>Choose your path — Zari will score, rewrite, and give you a job-ready version to send tonight.</p>
        </div>

        {/* Two path cards */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:32 }}>
          {/* Score My Resume */}
          <button
            onClick={()=>{ setReviewMode("general"); setStep("upload"); }}
            style={{ textAlign:"left", padding:"24px 22px", borderRadius:20, border:"2px solid #E4E8F5", background:"white", cursor:"pointer", transition:"all 0.18s", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}
            onMouseEnter={e=>(e.currentTarget.style.borderColor="#4361EE",e.currentTarget.style.boxShadow="0 4px 24px rgba(67,97,238,0.12)")}
            onMouseLeave={e=>(e.currentTarget.style.borderColor="#E4E8F5",e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.04)")}
          >
            <div style={{ width:44, height:44, borderRadius:13, background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.8" style={{ width:20,height:20 }}><rect x="3" y="2" width="14" height="16" rx="2"/><path d="M7 7h6M7 10h6M7 13h4"/></svg>
            </div>
            <p style={{ fontSize:17, fontWeight:800, color:"#0A0A0F", marginBottom:6, letterSpacing:"-0.02em" }}>Score My Resume</p>
            <p style={{ fontSize:13, color:"#68738A", lineHeight:1.6, marginBottom:16 }}>Get expert feedback instantly. No job in mind yet? Zari scores ATS, impact, and clarity against universal standards.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:18 }}>
              {["ATS compatibility check","Bullet-by-bullet rewrite","Impact & clarity scoring","Downloadable optimized version"].map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <svg viewBox="0 0 12 12" fill="none" stroke="#16A34A" strokeWidth="2" style={{ width:11,height:11,flexShrink:0 }}><path d="M2 6l3 3 5-5"/></svg>
                  <span style={{ fontSize:12, color:"#1E2235" }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#4361EE", color:"white", fontSize:13, fontWeight:700, padding:"9px 18px", borderRadius:10, boxShadow:"0 4px 14px rgba(67,97,238,0.3)" }}>
              Start →
            </div>
          </button>

          {/* Targeted Resume */}
          <button
            onClick={()=>{ setReviewMode("targeted"); setStep("job"); }}
            style={{ textAlign:"left", padding:"24px 22px", borderRadius:20, border:"2px solid #E4E8F5", background:"white", cursor:"pointer", transition:"all 0.18s", boxShadow:"0 2px 12px rgba(0,0,0,0.04)", position:"relative", overflow:"hidden" }}
            onMouseEnter={e=>(e.currentTarget.style.borderColor="#7C3AED",e.currentTarget.style.boxShadow="0 4px 24px rgba(124,58,237,0.12)")}
            onMouseLeave={e=>(e.currentTarget.style.borderColor="#E4E8F5",e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.04)")}
          >
            <div style={{ position:"absolute", top:14, right:14, background:"linear-gradient(135deg,#7C3AED,#A78BFA)", color:"white", fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:99 }}>RECOMMENDED</div>
            <div style={{ width:44, height:44, borderRadius:13, background:"linear-gradient(135deg,#7C3AED,#A78BFA)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.8" style={{ width:20,height:20 }}><circle cx="9" cy="9" r="5.5"/><path d="M15 15l3 3"/><path d="M7 9l2 2 4-4"/></svg>
            </div>
            <p style={{ fontSize:17, fontWeight:800, color:"#0A0A0F", marginBottom:6, letterSpacing:"-0.02em" }}>Targeted Resume</p>
            <p style={{ fontSize:13, color:"#68738A", lineHeight:1.6, marginBottom:16 }}>Apply to a specific job. Paste a job description and Zari will score your resume against every requirement.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:18 }}>
              {["Strict keyword matching vs. the JD","Job Match score (0-100)","Rewrites using actual JD language","Missing required skills callout"].map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <svg viewBox="0 0 12 12" fill="none" stroke="#7C3AED" strokeWidth="2" style={{ width:11,height:11,flexShrink:0 }}><path d="M2 6l3 3 5-5"/></svg>
                  <span style={{ fontSize:12, color:"#1E2235" }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"linear-gradient(135deg,#7C3AED,#A78BFA)", color:"white", fontSize:13, fontWeight:700, padding:"9px 18px", borderRadius:10, boxShadow:"0 4px 14px rgba(124,58,237,0.28)" }}>
              Start →
            </div>
          </button>
        </div>

        {/* Feature strip */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
          {[
            { icon:<svg viewBox="0 0 16 16" fill="none" stroke="#4361EE" strokeWidth="1.6" style={{width:16,height:16}}><path d="M13 3L6 11l-3-3"/></svg>, label:"ATS-optimized output" },
            { icon:<svg viewBox="0 0 16 16" fill="none" stroke="#4361EE" strokeWidth="1.6" style={{width:16,height:16}}><path d="M8 2v8M4 7l4 4 4-4"/><path d="M2 13h12"/></svg>, label:"Download ready" },
            { icon:<svg viewBox="0 0 16 16" fill="none" stroke="#4361EE" strokeWidth="1.6" style={{width:16,height:16}}><path d="M3 8l4-8 3 5 2-3 3 6"/></svg>, label:"Score history" },
            { icon:<svg viewBox="0 0 16 16" fill="none" stroke="#4361EE" strokeWidth="1.6" style={{width:16,height:16}}><path d="M13 2l1 4-8.5 8.5L2 16l1.5-3.5L12 4l1-2z"/></svg>, label:"Magic Write" },
          ].map((f,i) => (
            <div key={i} style={{ background:"white", borderRadius:12, border:"1px solid #E4E8F5", padding:"12px", textAlign:"center" }}>
              <div style={{ display:"flex", justifyContent:"center", marginBottom:7 }}>{f.icon}</div>
              <p style={{ fontSize:11.5, color:"#68738A", fontWeight:600 }}>{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ══════════════════════════════════
     STEP: JOB — Step 1 of targeted flow
  ══════════════════════════════════ */
  if (step === "job") return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#F4F6FB" }}>
      <div style={{ maxWidth:600, margin:"0 auto", padding:"40px 24px" }}>

        {/* Step progress */}
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:0, marginBottom:36 }}>
          {(["1. The Job","2. Your Resume"] as const).map((label, i) => {
            const active = i === 0;
            return (
              <div key={i} style={{ display:"flex", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 18px", borderRadius:99, background:active?"#4361EE":"white", border:`1.5px solid ${active?"#4361EE":"#E4E8F5"}` }}>
                  <div style={{ width:20, height:20, borderRadius:"50%", background:active?"white":"#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:11, fontWeight:800, color:active?"#4361EE":"#A0AABF" }}>{i+1}</span>
                  </div>
                  <span style={{ fontSize:12.5, fontWeight:700, color:active?"white":"#A0AABF" }}>{label}</span>
                </div>
                {i === 0 && <div style={{ width:32, height:1.5, background:"#E4E8F5" }}/>}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div style={{ background:"white", borderRadius:20, border:"1px solid #E4E8F5", padding:"28px 28px 24px", boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize:22, fontWeight:900, letterSpacing:"-0.03em", color:"#0A0A0F", marginBottom:4 }}>1. Paste your job description</h2>
          <p style={{ fontSize:14, color:"#68738A", lineHeight:1.6, marginBottom:24 }}>Copy and paste the full job description — Zari will match your resume against every requirement and keyword.</p>

          {/* Career level */}
          <div style={{ marginBottom:20 }}>
            <p style={{ fontSize:12, fontWeight:700, color:"#0A0A0F", marginBottom:8 }}>Your career level</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7 }}>
              {([["entry","Entry","0–2 yrs"],["mid","Mid-Level","3–7 yrs"],["senior","Senior","8–15 yrs"],["executive","Executive","VP+"]] as [CareerLevel,string,string][]).map(([lvl,label,sub])=>(
                <button key={lvl} onClick={()=>setCareerLevel(lvl)} style={{ padding:"8px 6px", borderRadius:10, border:`2px solid ${careerLevel===lvl?"#4361EE":"#E4E8F5"}`, background:careerLevel===lvl?"#EEF2FF":"#FAFBFF", cursor:"pointer", textAlign:"center", transition:"all 0.12s" }}>
                  <p style={{ fontSize:12, fontWeight:700, color:careerLevel===lvl?"#4361EE":"#0A0A0F", margin:0 }}>{label}</p>
                  <p style={{ fontSize:10, color:"#A0AABF", margin:0 }}>{sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Job title */}
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:12, fontWeight:700, color:"#0A0A0F", display:"block", marginBottom:6 }}>Target job title <span style={{ color:"#A0AABF", fontWeight:400 }}>(optional)</span></label>
            <input
              type="text"
              value={targetRoleInput}
              onChange={e=>{ setTargetRoleInput(e.target.value); if(analyzeErr) setAnalyzeErr(""); }}
              placeholder="e.g. Senior DevOps Engineer, Staff SRE, Product Manager…"
              style={{ width:"100%", border:"1.5px solid #E4E8F5", borderRadius:10, padding:"10px 12px", fontSize:13.5, color:"#1E2235", outline:"none", fontFamily:"inherit", boxSizing:"border-box", background:"#FAFBFF" }}
            />
          </div>

          {/* JD input */}
          <div style={{ marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
              <label style={{ fontSize:12, fontWeight:700, color:"#0A0A0F" }}>Job description <span style={{ color:"#DC2626", fontWeight:700 }}>*</span></label>
              <div style={{ display:"flex", background:"#F1F5F9", borderRadius:8, padding:2 }}>
                {(["paste","url"] as const).map(m=>(
                  <button key={m} onClick={()=>{ setJdInputMode(m); setJdUrlErr(""); }} style={{ fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:6, border:"none", background:jdInputMode===m?"white":"transparent", color:jdInputMode===m?"#0A0A0F":"#68738A", cursor:"pointer", boxShadow:jdInputMode===m?"0 1px 3px rgba(0,0,0,0.1)":"none", transition:"all 0.12s" }}>
                    {m==="paste"?"Paste text":"Job URL"}
                  </button>
                ))}
              </div>
            </div>
            {jdInputMode==="paste" ? (
              <textarea
                value={jobDescription}
                onChange={e=>{ setJobDescription(e.target.value); if(analyzeErr) setAnalyzeErr(""); }}
                placeholder={"Paste the full job posting here (roles, responsibilities, qualifications).\n\nThe more detail, the more accurate your keyword matching.\n\nTip: exclude 'About Us' and benefits sections — focus on the requirements."}
                style={{ width:"100%", minHeight:160, border:"1.5px solid #CBD5E1", borderRadius:12, padding:"12px 14px", fontSize:13, color:"#1E2235", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"#FAFBFF", lineHeight:1.65 }}
              />
            ) : (
              <div>
                <div style={{ display:"flex", gap:8 }}>
                  <input type="url" value={jdUrl} onChange={e=>{ setJdUrl(e.target.value); setJdUrlErr(""); }} placeholder="https://jobs.lever.co/… or LinkedIn, Greenhouse…" style={{ flex:1, border:"1.5px solid #E4E8F5", borderRadius:10, padding:"10px 11px", fontSize:13, color:"#1E2235", outline:"none", fontFamily:"inherit", background:"#FAFBFF" }} onKeyDown={e=>{ if(e.key==="Enter") void fetchResumeJdFromUrl(); }}/>
                  <button onClick={()=>void fetchResumeJdFromUrl()} disabled={fetchingJdUrl||!jdUrl.trim()} style={{ padding:"10px 18px", borderRadius:10, border:"none", background:jdUrl.trim()&&!fetchingJdUrl?"#4361EE":"#E4E8F5", color:jdUrl.trim()&&!fetchingJdUrl?"white":"#A0AABF", fontSize:13, fontWeight:700, cursor:jdUrl.trim()&&!fetchingJdUrl?"pointer":"default", flexShrink:0 }}>
                    {fetchingJdUrl?"…":"Fetch"}
                  </button>
                </div>
                {jdUrlErr && <p style={{ fontSize:12, color:"#DC2626", marginTop:6, marginBottom:0 }}>{jdUrlErr} <button onClick={()=>setJdInputMode("paste")} style={{ background:"none", border:"none", color:"#4361EE", fontWeight:600, cursor:"pointer", fontSize:12, padding:0 }}>Paste instead</button></p>}
                {jobDescription && !jdUrlErr && <p style={{ fontSize:11.5, color:"#16A34A", marginTop:6, marginBottom:0, fontWeight:600 }}>✓ Fetched — {jobDescription.length.toLocaleString()} characters</p>}
              </div>
            )}
          </div>

          {/* Info tip */}
          <div style={{ display:"flex", gap:8, padding:"10px 12px", background:"#F5F3FF", borderRadius:10, border:"1px solid #DDD6FE", marginBottom:20 }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="#7C3AED" strokeWidth="1.6" style={{ width:14,height:14,flexShrink:0,marginTop:1 }}><circle cx="8" cy="8" r="6"/><path d="M8 5v4M8 10v1"/></svg>
            <p style={{ fontSize:12, color:"#5B21B6", lineHeight:1.55, margin:0 }}>Paste the roles, responsibilities, and qualifications. Skip the &quot;About Us&quot;, benefits, and salary sections — those don&apos;t affect keyword matching.</p>
          </div>

          {analyzeErr && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"9px 14px", marginBottom:14, fontSize:13, color:"#991B1B" }}>{analyzeErr}</div>}

          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>setStep("choose")} style={{ fontSize:13, fontWeight:600, padding:"11px 20px", borderRadius:11, border:"1px solid #E4E8F5", background:"white", color:"#68738A", cursor:"pointer" }}>← Back</button>
            <button
              onClick={()=>setStep("upload")}
              disabled={!jobDescription.trim() && !targetRoleInput.trim()}
              style={{ flex:1, fontSize:14, fontWeight:700, padding:"11px", borderRadius:11, border:"none", background:(jobDescription.trim()||targetRoleInput.trim())?"#4361EE":"#E4E8F5", color:(jobDescription.trim()||targetRoleInput.trim())?"white":"#A0AABF", cursor:(jobDescription.trim()||targetRoleInput.trim())?"pointer":"default", boxShadow:(jobDescription.trim()||targetRoleInput.trim())?"0 4px 16px rgba(67,97,238,0.3)":"none" }}
            >
              Next: Upload your resume →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (step === "paste") return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:660, margin:"0 auto", padding:"48px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <h1 style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", marginBottom:8 }}>Paste your resume text</h1>
          <p style={{ fontSize:14, color:"#68738A" }}>Copy and paste your full resume below — Zari will score and rewrite it.</p>
        </div>
        {analyzeErr && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 14px", marginBottom:14, fontSize:13, color:"#991B1B" }}>{analyzeErr}</div>}
        <textarea
          style={{ width:"100%", minHeight:300, border:"1.5px solid #CBD5E1", borderRadius:14, padding:"14px 16px", fontSize:13.5, lineHeight:1.7, color:"#1E2235", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"white", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}
          placeholder={"Paste your full resume here...\n\nName\nJob Title · Location · Email\n\nSummary\n...\n\nExperience\n..."}
          value={resumeText}
          onChange={e => setResumeText(e.target.value)}
        />
        <div style={{ display:"flex", gap:10, marginTop:14 }}>
          <button onClick={() => setStep("upload")} style={{ fontSize:13, fontWeight:600, padding:"10px 20px", borderRadius:10, border:"1px solid #E4E8F5", background:"white", color:"#68738A", cursor:"pointer" }}>← Back to upload</button>
          <button onClick={() => void runAnalysis()} disabled={!resumeText.trim() || targetedInvalid} style={{ flex:1, fontSize:14, fontWeight:700, padding:"11px", borderRadius:10, border:"none", background:resumeText.trim()&&!targetedInvalid?"#4361EE":"#E4E8F5", color:resumeText.trim()&&!targetedInvalid?"white":"#A0AABF", cursor:resumeText.trim()&&!targetedInvalid?"pointer":"default", boxShadow:resumeText.trim()&&!targetedInvalid?"0 4px 16px rgba(67,97,238,0.3)":"none" }}>
            Analyze with Zari →
          </button>
        </div>
      </div>
    </div>
  );

  if (step === "upload") return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#F4F6FB" }}>
      <div style={{ maxWidth:560, margin:"0 auto", padding:"40px 24px" }}>

        {/* Step progress (targeted only) */}
        {reviewMode === "targeted" && (
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:0, marginBottom:32 }}>
            {(["1. The Job","2. Your Resume"] as const).map((label, i) => {
              const done = i === 0;
              const active = i === 1;
              return (
                <div key={i} style={{ display:"flex", alignItems:"center" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 18px", borderRadius:99, background:active?"#4361EE":done?"#F0FFF4":"white", border:`1.5px solid ${active?"#4361EE":done?"#86EFAC":"#E4E8F5"}` }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background:active?"white":done?"#16A34A":"#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      {done
                        ? <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.2" style={{ width:10,height:10 }}><path d="M2 6l3 3 5-5"/></svg>
                        : <span style={{ fontSize:11, fontWeight:800, color:active?"#4361EE":"#A0AABF" }}>{i+1}</span>}
                    </div>
                    <span style={{ fontSize:12.5, fontWeight:700, color:active?"white":done?"#16A34A":"#A0AABF" }}>{label}</span>
                  </div>
                  {i === 0 && <div style={{ width:32, height:1.5, background:"#E4E8F5" }}/>}
                </div>
              );
            })}
          </div>
        )}

        {/* Card */}
        <div style={{ background:"white", borderRadius:20, border:"1px solid #E4E8F5", padding:"28px 28px 24px", boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>

          {/* Header */}
          <div style={{ marginBottom:22 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
              <h2 style={{ fontSize:21, fontWeight:900, letterSpacing:"-0.03em", color:"#0A0A0F" }}>
                {reviewMode==="targeted" ? "2. Upload your resume" : "Upload your resume"}
              </h2>
              {/* Compact career level display */}
              <div style={{ display:"flex", alignItems:"center", gap:5, background:"#F1F5F9", borderRadius:8, padding:"5px 10px" }}>
                <span style={{ fontSize:11, color:"#68738A" }}>Level:</span>
                <select
                  value={careerLevel}
                  onChange={e=>setCareerLevel(e.target.value as CareerLevel)}
                  style={{ fontSize:11.5, fontWeight:700, color:"#0A0A0F", background:"transparent", border:"none", outline:"none", cursor:"pointer", fontFamily:"inherit" }}
                >
                  <option value="entry">Entry</option>
                  <option value="mid">Mid-Level</option>
                  <option value="senior">Senior</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
            </div>
            {reviewMode==="targeted" && (jobDescription||targetRoleInput) && (
              <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:4 }}>
                <svg viewBox="0 0 12 12" fill="none" stroke="#16A34A" strokeWidth="2" style={{ width:11,height:11,flexShrink:0 }}><path d="M2 6l3 3 5-5"/></svg>
                <span style={{ fontSize:12, color:"#16A34A", fontWeight:600 }}>
                  {targetRoleInput ? `Targeting: ${targetRoleInput}` : "Job description loaded"}
                  {" · "}
                  <button onClick={()=>setStep("job")} style={{ background:"none", border:"none", color:"#4361EE", fontWeight:600, cursor:"pointer", fontSize:12, padding:0 }}>Edit</button>
                </span>
              </div>
            )}
            <p style={{ fontSize:13.5, color:"#68738A", lineHeight:1.6, marginTop:8 }}>Upload your resume and Zari will score it, rewrite every weak bullet, and give you a job-ready version to send tonight.</p>
          </div>

          {analyzeErr && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"9px 14px", marginBottom:14, fontSize:13, color:"#991B1B" }}>{analyzeErr}</div>}

          {/* Drop zone */}
          <label
            onDragOver={e=>{e.preventDefault();setDragging(true);}}
            onDragLeave={()=>setDragging(false)}
            onDrop={e=>{e.preventDefault();setDragging(false);const f=e.dataTransfer.files?.[0];if(f)void handleFile(f);}}
            style={{ display:"block", border:`2px dashed ${dragging?"#4361EE":"#CBD5E1"}`, borderRadius:16, padding:"48px 32px", textAlign:"center", cursor:"pointer", background:dragging?"#EEF2FF":"#FAFBFF", transition:"all 0.2s", boxShadow:dragging?"0 0 0 4px rgba(67,97,238,0.10)":"none", marginBottom:14 }}
          >
            <input type="file" accept=".pdf,.docx,.txt" style={{ display:"none" }} onChange={e=>{ const f=e.target.files?.[0]; if(f) void handleFile(f); e.target.value=""; }}/>
            <div style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,#EEF2FF,#F4F0FF)", border:"1px solid #C7D2FE", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#4361EE" strokeWidth="1.8" style={{ width:24, height:24 }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <p style={{ fontSize:15, fontWeight:700, color:"#0A0A0F", marginBottom:5 }}>Drop your resume here</p>
            <p style={{ fontSize:13, color:"#A0AABF", marginBottom:18 }}>PDF, DOCX, or TXT — or click to choose file</p>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:11, background:"#4361EE", color:"white", fontSize:13.5, fontWeight:700, boxShadow:"0 4px 14px rgba(67,97,238,0.3)", pointerEvents:"none" }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:15, height:15 }}><path d="M17 12v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4"/><polyline points="14,6 10,2 6,6"/><line x1="10" y1="2" x2="10" y2="13"/></svg>
              Choose file
            </div>
          </label>

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <button onClick={()=>setStep(reviewMode==="targeted"?"job":"choose")} style={{ fontSize:12.5, fontWeight:600, padding:"9px 16px", borderRadius:10, border:"1px solid #E4E8F5", background:"white", color:"#68738A", cursor:"pointer" }}>← Back</button>
            <button onClick={()=>setStep("paste")} style={{ background:"none", border:"none", color:"#4361EE", fontWeight:600, cursor:"pointer", fontSize:12.5, padding:0 }}>paste text instead</button>
          </div>
        </div>

        {/* What Zari checks */}
        <div style={{ marginTop:16, display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {SCREEN_RESUME_META[stage].features.map(f => (
            <div key={f.title} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:13, padding:"12px 14px", display:"flex", gap:10, alignItems:"flex-start" }}>
              <span style={{ fontSize:18, lineHeight:1, flexShrink:0 }}>{f.icon}</span>
              <div>
                <p style={{ fontSize:12.5, fontWeight:700, color:"#0A0A0F", marginBottom:2 }}>{f.title}</p>
                <p style={{ fontSize:11.5, color:"#68738A", lineHeight:1.5 }}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy note */}
        <p style={{ textAlign:"center", fontSize:11.5, color:"#A0AABF", marginTop:16, display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width:12,height:12 }}><rect x="3" y="7" width="10" height="8" rx="1.5"/><path d="M5 7V5a3 3 0 016 0v2"/></svg>
          Your resume is processed securely and is private to you
        </p>

      </div>
    </div>
  );

  if (step === "analyzing") return (
    <div style={{ height:"calc(100vh - 56px)", display:"flex", alignItems:"center", justifyContent:"center", background:"#FAFBFF" }}>
      <div style={{ maxWidth:480, width:"100%", padding:32, textAlign:"center" }}>
        <div style={{ width:80, height:80, borderRadius:"50%", background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", animation:"sphere-breathe 2s ease-in-out infinite" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" style={{ width:36, height:36 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <h2 style={{ fontSize:22, fontWeight:800, color:"#0A0A0F", marginBottom:8 }}>Zari is analyzing your resume…</h2>
        <p style={{ fontSize:14, color:"#68738A", marginBottom:32 }}>{ANALYSIS_STAGES[stageIdx]}</p>

        {/* Progress bar */}
        <div style={{ background:"#F1F5F9", borderRadius:99, height:8, overflow:"hidden", marginBottom:16 }}>
          <div style={{ width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#4361EE,#06B6D4)", borderRadius:99, transition:"width 0.3s ease" }}/>
        </div>
        <p style={{ fontSize:12, color:"#A0AABF" }}>{Math.round(progress)}% complete</p>

        <div style={{ marginTop:28, display:"flex", flexDirection:"column", gap:8 }}>
          {ANALYSIS_STAGES.slice(0, stageIdx+1).map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color: i===stageIdx?"#4361EE":"#A0AABF" }}>
              <svg viewBox="0 0 16 16" fill={i<stageIdx?"#22C55E":"none"} stroke={i===stageIdx?"#4361EE":"#CBD5E1"} strokeWidth="2" style={{ width:16, height:16, flexShrink:0, animation: i===stageIdx?"spin-slow 1.5s linear infinite":"none" }}>
                {i < stageIdx ? <polyline points="3,8 6,11 13,4"/> : <circle cx="8" cy="8" r="6"/>}
              </svg>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Score grade helpers
  const scoreGrade = (s: number) =>
    s >= 85 ? { label:"Excellent", color:"#16A34A" } :
    s >= 72 ? { label:"Good",      color:"#0284C7" } :
    s >= 55 ? { label:"Fair",      color:"#D97706" } :
              { label:"Needs work",color:"#DC2626" };

  const letterGrade = (s: number) =>
    s >= 95 ? "A+" : s >= 88 ? "A" : s >= 82 ? "A−" :
    s >= 77 ? "B+" : s >= 70 ? "B" : s >= 63 ? "B−" :
    s >= 57 ? "C+" : s >= 50 ? "C" : s >= 40 ? "D" : "F";

  const gradeColor = (s: number) =>
    s >= 77 ? "#16A34A" : s >= 63 ? "#0284C7" : s >= 50 ? "#D97706" : "#DC2626";

  const gradeBackground = (s: number) =>
    s >= 77 ? "#F0FFF4" : s >= 63 ? "#EFF6FF" : s >= 50 ? "#FFFBEB" : "#FEF2F2";

  return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#F4F6FB" }}>

      {/* ── Download Format Modal ── */}
      {downloadModal && (
        <div style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(10,10,15,0.55)", backdropFilter:"blur(3px)" }} onClick={()=>setDownloadModal(null)}>
          <div style={{ background:"white", borderRadius:18, padding:"28px 28px 22px", width:340, boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }} onClick={e=>e.stopPropagation()}>
            <p style={{ fontSize:16, fontWeight:800, color:"#0A0A0F", marginBottom:4 }}>Choose format</p>
            <p style={{ fontSize:12.5, color:"#68738A", marginBottom:20 }}>
              {downloadModal.type === "powerOptimized" ? "Zari will AI-optimize your resume before downloading." : "Download your resume with Zari's improvements applied."}
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
              <button onClick={()=>void executeDownload("word")} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 16px", borderRadius:12, border:"1.5px solid #E4E8F5", background:"#F8FAFF", cursor:"pointer", textAlign:"left" }}>
                <div style={{ width:36, height:36, borderRadius:8, background:"#2B579A", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg viewBox="0 0 24 24" fill="white" style={{ width:20, height:20 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="1.5"/><path d="M9 13l1.5 4 1.5-3 1.5 3L15 13" fill="none" stroke="white" strokeWidth="1.2"/></svg>
                </div>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", margin:0 }}>Word (.doc)</p>
                  <p style={{ fontSize:11, color:"#68738A", margin:0 }}>Edit in Microsoft Word or Google Docs</p>
                </div>
              </button>
              <button onClick={()=>void executeDownload("pdf")} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 16px", borderRadius:12, border:"1.5px solid #E4E8F5", background:"#F8FAFF", cursor:"pointer", textAlign:"left" }}>
                <div style={{ width:36, height:36, borderRadius:8, background:"#DC2626", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg viewBox="0 0 24 24" fill="white" style={{ width:20, height:20 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="1.5"/><text x="7" y="19" fontSize="7" fill="white" fontWeight="bold">PDF</text></svg>
                </div>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", margin:0 }}>PDF</p>
                  <p style={{ fontSize:11, color:"#68738A", margin:0 }}>Opens print dialog — save as PDF</p>
                </div>
              </button>
            </div>
            <button onClick={()=>setDownloadModal(null)} style={{ width:"100%", padding:"9px", borderRadius:10, border:"1px solid #E4E8F5", background:"white", fontSize:12.5, color:"#68738A", cursor:"pointer", fontWeight:600 }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth:1080, margin:"0 auto", padding:"24px 24px 48px" }}>

        {/* ── Top bar ── */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, gap:12, flexWrap:"wrap" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button onClick={()=>{ setStep("choose"); setAiResult(null); setResumeText(""); setFileName(""); setAltVersions({}); setAltAttempt({}); setMagicWrite({}); setTab("overview"); if (rawFileUrlRef.current) { URL.revokeObjectURL(rawFileUrlRef.current); rawFileUrlRef.current = null; } setRawFileUrl(null); }} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, fontWeight:600, color:"#68738A", background:"white", border:"1px solid #E4E8F5", borderRadius:8, padding:"6px 12px", cursor:"pointer" }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:12,height:12 }}><path d="M10 3L5 8l5 5"/></svg>
              New review
            </button>
            <div>
              <span style={{ fontSize:14, fontWeight:800, color:"#0A0A0F" }}>{fileName || "Resume"}</span>
              <span style={{ fontSize:12, color:"#A0AABF", marginLeft:8 }}>{careerLevel.charAt(0).toUpperCase()+careerLevel.slice(1)}-level · {reviewMode === "targeted" && targetRoleInput ? targetRoleInput : "General review"}</span>
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={downloadReconstructed} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, padding:"8px 14px", borderRadius:10, border:"1.5px solid #C7D2FE", background:"white", color:"#4361EE", cursor:"pointer" }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:13,height:13 }}><path d="M10 4v12M4 10l6 6 6-6"/></svg>
              Download Revised
            </button>
            {reviewMode==="targeted" && (
              <button onClick={()=>void downloadPowerOptimized()} disabled={powerOptimizing} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, padding:"8px 16px", borderRadius:10, border:"none", background: powerOptimizing?"#E4E8F5":"linear-gradient(135deg,#7C3AED,#4361EE)", color: powerOptimizing?"#A0AABF":"white", cursor: powerOptimizing?"default":"pointer", boxShadow: powerOptimizing?"none":"0 4px 14px rgba(124,58,237,0.35)" }}>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:13,height:13 }}><path d="M11 3L5 11h7l-3 6 8-10h-7l3-6z"/></svg>
                {powerOptimizing ? "Optimizing…" : "Power Optimized"}
              </button>
            )}
          </div>
        </div>

        {/* ══ Hero score card ══ */}
        {(() => {
          const kws   = aiResult?.keywords ?? [];
          const buls  = aiResult?.bullets ?? [];
          const finds = aiResult?.findings ?? [];
          const kwFound = kws.filter(k=>k.found).length;
          const kwTotal = kws.length;
          const overall = aiResult?.overall ?? 0;
          const grade   = scoreGrade(overall);
          const lgrade  = letterGrade(overall);
          const lcolor  = gradeColor(overall);
          const lbg     = gradeBackground(overall);
          const prevOverall  = aiResult?.previousScores?.overall ?? null;
          const overallDelta = prevOverall !== null ? overall - prevOverall : null;
          const tailored     = aiResult?.tailoredScore ?? null;
          const bs           = aiResult?.bulletStats;

          const subScores = [
            { label:"ATS Match", key:"ats" as const,    score:aiResult?.ats??0,    color:"#16A34A",
              icon:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13}}><path d="M13 3L6 11l-3-3"/></svg>,
              note: kwTotal>0 ? `${kwFound}/${kwTotal} keywords` : "Format & keywords" },
            { label:"Impact",    key:"impact" as const,  score:aiResult?.impact??0, color:"#4361EE",
              icon:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13}}><path d="M3 12l4-8 3 5 2-3 3 6"/></svg>,
              note: bs ? `${bs.withMetrics}/${bs.total} bullets have metrics` : "Metrics & outcomes" },
            { label:"Clarity",   key:"clarity" as const, score:aiResult?.clarity??0,color:"#7C3AED",
              icon:<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13}}><circle cx="8" cy="8" r="6"/><path d="M8 5v4M8 11v1"/></svg>,
              note: `${finds.filter(f=>f.type!=="ok").length} issue${finds.filter(f=>f.type!=="ok").length!==1?"s":""} found` },
          ];

          return (
            <div style={{ background:"white", borderRadius:20, border:"1px solid #E4E8F5", padding:"22px 28px", marginBottom:20, boxShadow:"0 4px 32px rgba(67,97,238,0.08)" }}>
              <div style={{ display:"grid", gridTemplateColumns: tailored!==null ? "160px 1fr 160px" : "160px 1fr", gap:28, alignItems:"center" }}>

                {/* Big overall score ring */}
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                  <div style={{ position:"relative" }}>
                    <ScoreRing score={overall} color={lcolor} size={110}/>
                    {/* Letter grade badge */}
                    <div style={{ position:"absolute", bottom:-6, left:"50%", transform:"translateX(-50%)", background:lbg, color:lcolor, fontSize:11, fontWeight:800, padding:"2px 10px", borderRadius:99, border:`1.5px solid ${lcolor}33`, whiteSpace:"nowrap" }}>
                      {lgrade} · {grade.label}
                    </div>
                  </div>
                  <p style={{ fontSize:11.5, fontWeight:700, color:"#68738A", marginTop:10 }}>Overall Score</p>
                  {overallDelta !== null && (
                    <span style={{ fontSize:11, color:overallDelta>0?"#16A34A":overallDelta<0?"#DC2626":"#A0AABF", fontWeight:700, display:"flex", alignItems:"center", gap:3 }}>
                      {overallDelta>0?"+":""}{overallDelta} vs last {overallDelta>0?"↑":overallDelta<0?"↓":"→"}
                    </span>
                  )}
                </div>

                {/* Sub-score bars */}
                <div style={{ display:"flex", flexDirection:"column", gap:14, paddingLeft: tailored!==null ? 4 : 12 }}>
                  {subScores.map(sc => {
                    const prev = aiResult?.previousScores?.[sc.key] ?? null;
                    const d = prev !== null ? sc.score - prev : null;
                    const sc_lgrade  = letterGrade(sc.score);
                    const sc_lcolor  = gradeColor(sc.score);
                    const sc_lbg     = gradeBackground(sc.score);
                    return (
                      <div key={sc.label}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <span style={{ color:sc.color, opacity:0.8 }}>{sc.icon}</span>
                            <span style={{ fontSize:13, fontWeight:700, color:"#0A0A0F" }}>{sc.label}</span>
                            <span style={{ fontSize:11, color:"#A0AABF" }}>{sc.note}</span>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                            <span style={{ fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:99, background:sc_lbg, color:sc_lcolor }}>{sc_lgrade}</span>
                            <span style={{ fontSize:19, fontWeight:900, color:sc_lcolor, lineHeight:1, fontVariantNumeric:"tabular-nums" }}>{sc.score}</span>
                            {d !== null && d !== 0 && (
                              <span style={{ fontSize:10.5, fontWeight:700, color:d>0?"#16A34A":"#DC2626" }}>
                                {d>0?"+":""}{d}{d>0?"↑":"↓"}
                              </span>
                            )}
                          </div>
                        </div>
                        <div style={{ height:7, borderRadius:99, background:"#F1F5F9", overflow:"hidden", position:"relative" }}>
                          <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.4))", zIndex:1, borderRadius:99, pointerEvents:"none" }}/>
                          <div style={{ width:`${sc.score}%`, height:"100%", borderRadius:99, background:`linear-gradient(90deg,${sc.color}BB,${sc.color})`, transition:"width 1s cubic-bezier(0.4,0,0.2,1)" }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tailored job-match panel (targeted mode only) */}
                {tailored !== null && (
                  <div style={{ borderLeft:"1px solid #F1F5F9", paddingLeft:28, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                    <ScoreRing score={tailored} color={gradeColor(tailored)} size={88}/>
                    <p style={{ fontSize:11, fontWeight:700, color:"#0A0A0F", marginTop:8, textAlign:"center" }}>Job Match</p>
                    <span style={{ fontSize:10, color:"#68738A", textAlign:"center", lineHeight:1.4 }}>How well your resume targets this role</span>
                    <span style={{ fontSize:10, fontWeight:700, padding:"2px 9px", borderRadius:99, background:gradeBackground(tailored), color:gradeColor(tailored) }}>
                      {tailored>=75?"Strong fit":tailored>=55?"Partial fit":tailored>=35?"Weak fit":"Mismatch"}
                    </span>
                  </div>
                )}

              </div>
            </div>
          );
        })()}

        {/* ══ Quick Wins strip ══ */}
        {(aiResult?.quickWins?.length ?? 0) > 0 && (() => {
          const PRIORITY_STYLE = {
            high:   { dot:"#F59E0B", bg:"#FFFBEB", border:"#FDE68A", label:"High impact" },
            medium: { dot:"#4361EE", bg:"#EEF2FF", border:"#C7D2FE", label:"Quick fix"   },
          };
          const EFFORT_COLOR: Record<string,string> = { "5 min":"#16A34A", "15 min":"#D97706", "30 min":"#DC2626" };
          return (
            <div style={{ marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                <svg viewBox="0 0 16 16" fill="none" style={{ width:14,height:14 }}><path d="M8 1l1.5 4.5H14l-3.7 2.7 1.4 4.3L8 9.9l-3.7 2.6L5.7 8.2 2 5.5h4.5z" fill="#F59E0B" stroke="#F59E0B" strokeWidth="0.5"/></svg>
                <p style={{ fontSize:12, fontWeight:800, color:"#0A0A0F", letterSpacing:"-0.01em" }}>Quick Wins — top changes by impact</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                {(aiResult!.quickWins ?? []).slice(0,3).map((w, i) => {
                  const ps = PRIORITY_STYLE[w.impact] ?? PRIORITY_STYLE.medium;
                  const ec = EFFORT_COLOR[w.effort] ?? "#68738A";
                  return (
                    <div key={i} onClick={()=>{ if (w.tab==="bullets" && w.bulletRef) setPendingBulletScroll(w.bulletRef); setTab(w.tab); }} style={{ background:"white", borderRadius:14, border:`1px solid ${ps.border}`, padding:"14px 16px", cursor:"pointer", transition:"all 0.12s", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                          <div style={{ width:22, height:22, borderRadius:7, background:ps.bg, border:`1px solid ${ps.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <span style={{ fontSize:10, fontWeight:900, color:ps.dot }}>{i+1}</span>
                          </div>
                          <span style={{ fontSize:12.5, fontWeight:700, color:"#0A0A0F", lineHeight:1.2 }}>{w.title}</span>
                        </div>
                        <span style={{ fontSize:10, fontWeight:700, color:ec, background:`${ec}15`, padding:"1px 6px", borderRadius:99, flexShrink:0, marginLeft:4 }}>{w.effort}</span>
                      </div>
                      <p style={{ fontSize:11.5, color:"#68738A", lineHeight:1.55, margin:"0 0 10px" }}>{w.action}</p>
                      <span style={{ fontSize:10.5, fontWeight:600, color:"#4361EE" }}>Go to {w.tab} tab →</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* ══ Tab navigation ══ */}
        <div style={{ display:"flex", gap:0, borderBottom:"2px solid #E4E8F5", marginBottom:22 }}>
          {([
            ["overview","Overview", aiResult ? `${aiResult.findings.filter(f=>f.type!=="ok").length} issues` : ""],
            ["bullets","Line-by-Line", aiResult?.bullets?.length ? `${aiResult.bullets.length} bullets` : ""],
            ["rewrite","AI Rewrites", ""],
            ...(reviewMode === "targeted" && (aiResult?.keywords?.length ?? 0) > 0
              ? [["keywords","Keywords", `${(aiResult?.keywords??[]).filter(k=>!k.found).length} missing`]]
              : []),
            ["history","History", scoreHistory.length > 0 ? `${scoreHistory.length}` : ""],
          ] as ["overview"|"bullets"|"rewrite"|"keywords"|"history", string, string][]).map(([t, label, badge]) => (
            <button key={t} onClick={()=>setTab(t)} style={{ padding:"12px 22px", border:"none", borderBottom:`2.5px solid ${tab===t?"#4361EE":"transparent"}`, marginBottom:"-2px", background:"transparent", cursor:"pointer", fontSize:14, fontWeight:tab===t?700:500, color:tab===t?"#4361EE":"#68738A", display:"flex", alignItems:"center", gap:6, transition:"color 0.15s", whiteSpace:"nowrap" }}>
              {label}
              {badge && <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:99, background:tab===t?"#EEF2FF":"#F1F5F9", color:tab===t?"#4361EE":"#68738A" }}>{badge}</span>}
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"minmax(0,48%) 1fr", gap:20 }}>
          {/* ── Left: resume viewer ── */}
          <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,0.07)", height:"calc(100vh - 260px)", display:"flex", flexDirection:"column" }}>
            {/* Panel header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:"1px solid #F1F5F9", background:"#FAFBFF", flexShrink:0 }}>
              <div style={{ display:"flex", background:"#F1F5F9", borderRadius:8, padding:3 }}>
                {(["preview","suggestions"] as const).map(m => (
                  <button key={m} onClick={()=>{ setResumeViewMode(m); setActiveSuggestion(null); }} style={{ fontSize:12, fontWeight:600, padding:"5px 14px", borderRadius:6, border:"none", background:resumeViewMode===m?"white":"transparent", color:resumeViewMode===m?"#0A0A0F":"#68738A", cursor:"pointer", boxShadow:resumeViewMode===m?"0 1px 4px rgba(0,0,0,0.12)":"none", transition:"all 0.12s" }}>
                    {m==="suggestions" ? `Suggestions${aiResult?.bullets?.length?` (${aiResult.bullets.length})`:""}`:"Preview"}
                  </button>
                ))}
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {aiResult?.keywords?.some(k=>k.found) && (
                  <button onClick={()=>setTab("keywords")} style={{ fontSize:11, color:"#14532D", background:"#DCFCE7", padding:"3px 10px", borderRadius:99, fontWeight:700, border:"none", cursor:"pointer" }}>
                    {aiResult!.keywords!.filter(k=>k.found).length} keywords found →
                  </button>
                )}
                {resumeViewMode==="suggestions" && !rawFileUrl && (
                  <span style={{ fontSize:11, color:"#92400E", background:"#FEF3C7", padding:"3px 10px", borderRadius:99, fontWeight:700 }}>tap lines for suggestions</span>
                )}
              </div>
            </div>
            {/* Resume view — always show PDF when available; fall back to text renderer */}
            {rawFileUrl
              ? <div style={{ flex:1, position:"relative", minHeight:0, display:"flex", flexDirection:"column" }}>
                  <iframe src={rawFileUrl} style={{ flex:1, width:"100%", border:"none", display:"block", minHeight:0 }} title="Resume"/>
                  {/* Suggestions mode: expandable issue panel anchored to bottom */}
                  {resumeViewMode==="suggestions" && (aiResult?.bullets?.length ?? 0) > 0 && (() => {
                    const wk = aiResult!.bullets!.length;
                    const nm = (aiResult?.wordIssues ?? []).filter(w=>w.type==="weak_verb"||w.type==="cliche").length;
                    return (
                      <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(15,23,42,0.94)", backdropFilter:"blur(10px)", borderTop:"1px solid rgba(255,255,255,0.08)" }}>
                        {/* Summary bar */}
                        <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px" }}>
                          <div style={{ display:"flex", gap:8, flex:1, flexWrap:"wrap" }}>
                            {wk>0 && <span style={{ fontSize:11.5, fontWeight:700, padding:"3px 10px", borderRadius:99, background:"rgba(245,158,11,0.2)", color:"#FCD34D", border:"1px solid rgba(245,158,11,0.3)" }}>{wk} weak bullet{wk!==1?"s":""}</span>}
                            {nm>0 && <span style={{ fontSize:11.5, fontWeight:700, padding:"3px 10px", borderRadius:99, background:"rgba(239,68,68,0.2)", color:"#FCA5A5", border:"1px solid rgba(239,68,68,0.25)" }}>{nm} word issue{nm!==1?"s":""}</span>}
                          </div>
                          <button onClick={()=>setTab("bullets")} style={{ fontSize:12, fontWeight:700, color:"#93C5FD", background:"rgba(96,165,250,0.15)", border:"1px solid rgba(96,165,250,0.25)", borderRadius:8, padding:"5px 12px", cursor:"pointer", whiteSpace:"nowrap" }}>
                            View Line-by-Line →
                          </button>
                        </div>
                        {/* Top-3 bullet previews */}
                        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"10px 16px", display:"flex", flexDirection:"column", gap:7 }}>
                          {aiResult!.bullets!.slice(0,3).map((b, i) => (
                            <div key={i} onClick={()=>{ setTab("bullets"); setActiveSuggestion(i); }} style={{ display:"flex", alignItems:"flex-start", gap:8, cursor:"pointer", padding:"6px 8px", borderRadius:8, background:"rgba(255,255,255,0.04)" }}>
                              <span style={{ flexShrink:0, fontSize:10, fontWeight:700, padding:"2px 6px", borderRadius:99, background:"rgba(245,158,11,0.25)", color:"#FCD34D", marginTop:1 }}>fix</span>
                              <p style={{ fontSize:11.5, color:"rgba(255,255,255,0.7)", lineHeight:1.5, margin:0, flex:1, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" as const }}>{b.before}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              : resumeViewMode==="suggestions"
              ? <div style={{ padding:"20px 22px", overflowY:"auto", flex:1 }}>
                  <SuggestionsResume text={resumeText} bullets={aiResult?.bullets ?? []} wordIssues={aiResult?.wordIssues} activeIdx={activeSuggestion} onClickLine={setActiveSuggestion}/>
                </div>
              : <div style={{ padding:"20px 22px", overflowY:"auto", flex:1 }}>
                  <FormattedResume text={resumeText.slice(0,6000)} keywords={aiResult?.keywords}/>
                </div>
            }
          </div>

          {/* ── Right: analysis panel ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:16, height:"calc(100vh - 260px)", overflowY:"auto" }}>
            {/* ══ OVERVIEW TAB ══ */}
            {tab==="overview" && (() => {
              const CATEGORY_META: Record<string,{label:string;color:string;bg:string;border:string}> = {
                weak_verbs:        { label:"Weak Verbs",      color:"#92400E", bg:"#FFF7ED", border:"#FDE68A" },
                quantify_impact:   { label:"Missing Metrics", color:"#1D4ED8", bg:"#EFF6FF", border:"#BFDBFE" },
                summary:           { label:"Summary",         color:"#6D28D9", bg:"#F5F3FF", border:"#DDD6FE" },
                ats_keywords:      { label:"ATS Keywords",    color:"#065F46", bg:"#ECFDF5", border:"#6EE7B7" },
                repetition:        { label:"Repetition",      color:"#B45309", bg:"#FFFBEB", border:"#FCD34D" },
                readability:       { label:"Readability",     color:"#0369A1", bg:"#EFF6FF", border:"#BAE6FD" },
                dates:             { label:"Dates",           color:"#475569", bg:"#F8FAFC", border:"#CBD5E1" },
                unnecessary_words: { label:"Filler Words",    color:"#B91C1C", bg:"#FEF2F2", border:"#FECACA" },
                contact:           { label:"Contact Info",    color:"#7E22CE", bg:"#FDF4FF", border:"#E9D5FF" },
                format:            { label:"Formatting",      color:"#374151", bg:"#F9FAFB", border:"#E5E7EB" },
              };
              const TAB_FOR: Record<string,"overview"|"bullets"|"rewrite"|"keywords"|"history"> = {
                weak_verbs:"bullets", quantify_impact:"bullets", ats_keywords:"keywords",
                summary:"rewrite", repetition:"bullets", readability:"bullets",
                dates:"overview", unnecessary_words:"bullets", contact:"overview", format:"overview",
              };
              const VERDICT_STYLE: Record<string,{color:string;bg:string;border:string}> = {
                Strong:          { color:"#14532D", bg:"#F0FFF4",  border:"#BBF7D0" },
                Good:            { color:"#1D4ED8", bg:"#EFF6FF",  border:"#BFDBFE" },
                "Needs work":    { color:"#92400E", bg:"#FFF7ED",  border:"#FDE68A" },
                "Weak verbs":    { color:"#B45309", bg:"#FFFBEB",  border:"#FCD34D" },
                "No metrics":    { color:"#1D4ED8", bg:"#EFF6FF",  border:"#BFDBFE" },
                Missing:         { color:"#991B1B", bg:"#FEF2F2",  border:"#FECACA" },
                Incomplete:      { color:"#7E22CE", bg:"#FDF4FF",  border:"#E9D5FF" },
                Generic:         { color:"#475569", bg:"#F8FAFC",  border:"#CBD5E1" },
                "Too long":      { color:"#B45309", bg:"#FFFBEB",  border:"#FCD34D" },
                Outdated:        { color:"#374151", bg:"#F9FAFB",  border:"#E5E7EB" },
              };
              const issuesByCategory: Record<string,number> = {};
              (aiResult?.findings ?? []).filter(f=>f.type!=="ok").forEach(f=>{
                const c = f.category ?? "readability";
                issuesByCategory[c] = (issuesByCategory[c]??0)+1;
              });
              const cats = Object.entries(issuesByCategory).sort((a,b)=>b[1]-a[1]);
              const critical = (aiResult?.findings ?? []).filter(f=>f.type==="critical");
              const warns    = (aiResult?.findings ?? []).filter(f=>f.type==="warn");
              const oks      = (aiResult?.findings ?? []).filter(f=>f.type==="ok");
              const bs       = aiResult?.bulletStats;
              const ss       = aiResult?.sectionScores ?? [];
              const wi       = aiResult?.wordIssues ?? [];

              return (
                <>
                  {/* ── Section scores table ── */}
                  {ss.length > 0 && (
                    <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", padding:"20px 22px", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                      <p style={{ fontSize:13, fontWeight:800, color:"#0A0A0F", marginBottom:14, textTransform:"uppercase", letterSpacing:"0.06em" }}>Section-by-section</p>
                      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        {ss.map((s, si) => {
                          const vs = VERDICT_STYLE[s.verdict] ?? { color:"#68738A", bg:"#F1F5F9", border:"#E4E8F5" };
                          return (
                            <div key={si} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", borderRadius:12, background:"#FAFBFF" }}>
                              <div style={{ width:34, height:34, borderRadius:10, background: s.present?(s.score>=75?"#F0FFF4":s.score>=55?"#EFF6FF":"#FEF2F2"):"#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                                <span style={{ fontSize:14, fontWeight:900, color: s.present?(s.score>=75?"#16A34A":s.score>=55?"#4361EE":"#DC2626"):"#A0AABF" }}>{s.present?s.score:"—"}</span>
                              </div>
                              <span style={{ flex:1, fontSize:13.5, fontWeight:600, color:"#1E2235" }}>{s.name}</span>
                              <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99, background:vs.bg, color:vs.color, border:`1px solid ${vs.border}` }}>{s.present?s.verdict:"Missing"}</span>
                              <div style={{ width:90 }}>
                                <div style={{ height:5, borderRadius:99, background:"#F1F5F9", overflow:"hidden" }}>
                                  <div style={{ width:`${s.present?s.score:0}%`, height:"100%", borderRadius:99, background: s.score>=75?"#16A34A":s.score>=55?"#4361EE":"#DC2626", transition:"width 0.7s ease" }}/>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── Bullet metrics stats ── */}
                  {bs && (
                    <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", padding:"20px 22px", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                      <p style={{ fontSize:13, fontWeight:800, color:"#0A0A0F", marginBottom:14, textTransform:"uppercase", letterSpacing:"0.06em" }}>Bullet quality snapshot</p>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
                        {[
                          { val:bs.total,           label:"Total bullets",   color:"#68738A", bg:"#F8FAFC" },
                          { val:bs.withMetrics,      label:"Have metrics",   color:`${bs.withMetrics/Math.max(bs.total,1)>=0.6?"#16A34A":"#DC2626"}`, bg:`${bs.withMetrics/Math.max(bs.total,1)>=0.6?"#F0FFF4":"#FEF2F2"}` },
                          { val:bs.withStrongVerbs,  label:"Strong verbs",   color:`${bs.withStrongVerbs/Math.max(bs.total,1)>=0.7?"#4361EE":"#D97706"}`, bg:`${bs.withStrongVerbs/Math.max(bs.total,1)>=0.7?"#EEF2FF":"#FFFBEB"}` },
                          { val:bs.weak,             label:"Need work",      color:bs.weak===0?"#16A34A":"#DC2626", bg:bs.weak===0?"#F0FFF4":"#FEF2F2" },
                        ].map((st,i) => (
                          <div key={i} style={{ background:st.bg, borderRadius:12, padding:"14px 10px", textAlign:"center" }}>
                            <p style={{ fontSize:26, fontWeight:900, color:st.color, lineHeight:1, marginBottom:5 }}>{st.val}</p>
                            <p style={{ fontSize:11, color:"#68738A", lineHeight:1.3 }}>{st.label}</p>
                          </div>
                        ))}
                      </div>
                      {bs.total > 0 && (
                        <div style={{ marginTop:14 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                            <span style={{ fontSize:12, color:"#68738A" }}>Quantification rate</span>
                            <span style={{ fontSize:12, fontWeight:700, color:bs.withMetrics/bs.total>=0.6?"#16A34A":"#DC2626" }}>{Math.round((bs.withMetrics/bs.total)*100)}% <span style={{ color:"#A0AABF", fontWeight:400 }}>(target: 60%+)</span></span>
                          </div>
                          <div style={{ height:7, borderRadius:99, background:"#F1F5F9", overflow:"hidden" }}>
                            <div style={{ width:`${Math.round((bs.withMetrics/bs.total)*100)}%`, height:"100%", borderRadius:99, background:bs.withMetrics/bs.total>=0.6?"#16A34A":"#DC2626", transition:"width 0.7s ease" }}/>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Word issues ── */}
                  {wi.length > 0 && (
                    <div style={{ background:"white", borderRadius:16, border:"1px solid #FDE68A", padding:"16px 18px", boxShadow:"0 2px 12px rgba(245,158,11,0.06)" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                        <svg viewBox="0 0 16 16" fill="none" stroke="#D97706" strokeWidth="1.8" style={{ width:14,height:14,flexShrink:0 }}><path d="M2 4h12M2 8h8M2 12h6"/></svg>
                        <p style={{ fontSize:12, fontWeight:800, color:"#92400E", textTransform:"uppercase", letterSpacing:"0.06em" }}>Word problems</p>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                        {wi.map((w,i) => {
                          const TYPE_COLOR: Record<string,{bg:string;color:string;border:string}> = {
                            repetition: { bg:"#FFF7ED",  color:"#92400E", border:"#FDE68A" },
                            filler:     { bg:"#FEF2F2",  color:"#991B1B", border:"#FECACA" },
                            weak_verb:  { bg:"#FFFBEB",  color:"#B45309", border:"#FCD34D" },
                            cliche:     { bg:"#F5F3FF",  color:"#6D28D9", border:"#DDD6FE" },
                          };
                          const tc = TYPE_COLOR[w.type] ?? { bg:"#F1F5F9", color:"#68738A", border:"#E4E8F5" };
                          return (
                            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"9px 12px", background:tc.bg, borderRadius:10, border:`1px solid ${tc.border}` }}>
                              <div style={{ flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                                <span style={{ fontSize:12, fontWeight:800, color:tc.color }}>&quot;{w.word}&quot;</span>
                                <span style={{ fontSize:9.5, fontWeight:700, color:tc.color, opacity:0.7 }}>×{w.count}</span>
                              </div>
                              <div style={{ flex:1, minWidth:0 }}>
                                <span style={{ fontSize:10, fontWeight:700, color:tc.color, background:`${tc.color}18`, padding:"1px 6px", borderRadius:99, textTransform:"capitalize" }}>{w.type.replace("_"," ")}</span>
                                <p style={{ fontSize:11, color:"#68738A", lineHeight:1.5, margin:"4px 0 0" }}>{w.suggestion}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── Issue category bars ── */}
                  {cats.length > 0 && (
                    <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", padding:"16px 18px", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                      <p style={{ fontSize:12, fontWeight:800, color:"#0A0A0F", marginBottom:12, textTransform:"uppercase", letterSpacing:"0.06em" }}>Issues by category</p>
                      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                        {cats.map(([cat, count]) => {
                          const meta = CATEGORY_META[cat] ?? { label:cat, color:"#68738A", bg:"#F1F5F9", border:"#E4E8F5" };
                          const jumpTab = TAB_FOR[cat] ?? null;
                          const maxCount = cats[0][1];
                          return (
                            <div key={cat} style={{ display:"flex", alignItems:"center", gap:10 }}>
                              <div style={{ flex:1 }}>
                                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                                  <span style={{ fontSize:11.5, fontWeight:600, color:"#1E2235" }}>{meta.label}</span>
                                  <span style={{ fontSize:11, fontWeight:700, color:meta.color }}>{count} issue{count>1?"s":""}</span>
                                </div>
                                <div style={{ height:5, borderRadius:99, background:"#F1F5F9", overflow:"hidden" }}>
                                  <div style={{ width:`${(count/maxCount)*100}%`, height:"100%", borderRadius:99, background:meta.color, opacity:0.75 }}/>
                                </div>
                              </div>
                              {jumpTab && jumpTab!=="overview" && (
                                <button onClick={()=>setTab(jumpTab)} style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:6, border:`1px solid ${meta.border}`, background:meta.bg, color:meta.color, cursor:"pointer", flexShrink:0 }}>Fix →</button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── Critical issues ── */}
                  {critical.length > 0 && (
                    <div style={{ background:"white", borderRadius:16, border:"1px solid #FECACA", padding:"16px 18px", boxShadow:"0 2px 12px rgba(220,38,38,0.06)" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                        <svg viewBox="0 0 16 16" fill="#DC2626" style={{ width:14,height:14,flexShrink:0 }}><circle cx="8" cy="8" r="7"/><rect x="7" y="4" width="2" height="5" fill="white"/><rect x="7" y="10" width="2" height="2" fill="white"/></svg>
                        <p style={{ fontSize:12, fontWeight:800, color:"#991B1B", textTransform:"uppercase", letterSpacing:"0.06em" }}>Critical — fix these first</p>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                        {critical.map((f,i) => (
                          <div key={i} style={{ display:"flex", gap:10, padding:"10px 12px", background:"#FEF2F2", borderRadius:10, border:"1px solid #FECACA" }}>
                            <div style={{ width:4, borderRadius:99, background:"#DC2626", flexShrink:0, minHeight:16 }}/>
                            <p style={{ fontSize:12, color:"#7F1D1D", lineHeight:1.6, margin:0, flex:1 }}>{f.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Improvements ── */}
                  {warns.length > 0 && (
                    <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", padding:"16px 18px", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                        <svg viewBox="0 0 16 16" fill="#F59E0B" style={{ width:14,height:14,flexShrink:0 }}><path d="M8 1L1 14h14L8 1z"/><rect x="7" y="6" width="2" height="4" fill="white"/><rect x="7" y="11" width="2" height="2" fill="white"/></svg>
                        <p style={{ fontSize:12, fontWeight:800, color:"#92400E", textTransform:"uppercase", letterSpacing:"0.06em" }}>Improvements</p>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        {warns.map((f,i) => (
                          <div key={i} style={{ display:"flex", gap:10, padding:"9px 12px", background:"#FFFBEB", borderRadius:10, border:"1px solid #FDE68A" }}>
                            <div style={{ width:4, borderRadius:99, background:"#F59E0B", flexShrink:0, minHeight:16 }}/>
                            <p style={{ fontSize:12, color:"#78350F", lineHeight:1.6, margin:0 }}>{f.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── What's working ── */}
                  {oks.length > 0 && (
                    <div style={{ background:"white", borderRadius:16, border:"1px solid #BBF7D0", padding:"14px 18px", boxShadow:"0 2px 12px rgba(22,163,74,0.06)" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                        <svg viewBox="0 0 16 16" fill="none" stroke="#16A34A" strokeWidth="2" style={{ width:13,height:13,flexShrink:0 }}><path d="M3 8l4 4 6-6"/></svg>
                        <p style={{ fontSize:12, fontWeight:800, color:"#14532D", textTransform:"uppercase", letterSpacing:"0.06em" }}>What&apos;s working</p>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                        {oks.map((f,i) => (
                          <div key={i} style={{ display:"flex", gap:8, padding:"6px 8px", borderRadius:8, background: i%2===0?"#F0FFF4":"transparent" }}>
                            <span style={{ color:"#16A34A", fontSize:11, flexShrink:0, marginTop:1 }}>✓</span>
                            <p style={{ fontSize:12, color:"#14532D", lineHeight:1.5, margin:0 }}>{f.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Zari's recommendation ── */}
                  {aiResult?.recommendation && (
                    <div style={{ background:"linear-gradient(135deg,#EEF2FF 0%,#F4F0FF 100%)", borderRadius:16, border:"1px solid #C7D2FE", padding:"16px 18px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                        <div style={{ width:32, height:32, borderRadius:10, background:"linear-gradient(135deg,#4361EE,#7C3AED)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 4px 12px rgba(67,97,238,0.3)" }}>
                          <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.8" style={{ width:14,height:14 }}><path d="M8 2a3 3 0 00-3 3v3a3 3 0 006 0V5a3 3 0 00-3-3z"/><path d="M4 8v1a4 4 0 008 0V8"/></svg>
                        </div>
                        <div>
                          <p style={{ fontSize:11, fontWeight:800, color:"#4361EE", textTransform:"uppercase", letterSpacing:"0.06em" }}>Zari&apos;s top recommendation</p>
                        </div>
                      </div>
                      <p style={{ fontSize:13, color:"#1E1B4B", lineHeight:1.7 }}>{aiResult.recommendation}</p>
                    </div>
                  )}
                </>
              );
            })()}

            {/* ══ BULLETS TAB ══ */}
            {tab==="bullets" && (() => {
              const bs = aiResult?.bulletStats;
              const DIFF_STYLE: Record<string,{label:string;color:string;bg:string;border:string}> = {
                easy:   { label:"Easy fix",   color:"#14532D", bg:"#F0FFF4", border:"#BBF7D0" },
                medium: { label:"Medium",     color:"#92400E", bg:"#FFFBEB", border:"#FDE68A" },
                hard:   { label:"Needs info", color:"#991B1B", bg:"#FEF2F2", border:"#FECACA" },
              };
              return (
                <>
                  {/* Stats header */}
                  {bs && (
                    <div style={{ background:"white", borderRadius:14, border:"1px solid #E4E8F5", padding:"14px 18px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                        <p style={{ fontSize:13, fontWeight:800, color:"#0A0A0F" }}>Line-by-Line Audit</p>
                        <span style={{ fontSize:11, color:"#68738A" }}>{aiResult?.bullets?.length ?? 0} bullet{(aiResult?.bullets?.length??0)!==1?"s":""} need work</span>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
                        {[
                          { val:`${bs.withMetrics}/${bs.total}`, label:"Have metrics", ok:bs.withMetrics/Math.max(bs.total,1)>=0.6 },
                          { val:`${bs.withStrongVerbs}/${bs.total}`, label:"Strong verbs", ok:bs.withStrongVerbs/Math.max(bs.total,1)>=0.7 },
                          { val:bs.weak, label:"Need fixing", ok:bs.weak===0 },
                        ].map((s,i) => (
                          <div key={i} style={{ textAlign:"center", padding:"8px 6px", borderRadius:10, background:s.ok?"#F0FFF4":"#FEF2F2" }}>
                            <p style={{ fontSize:17, fontWeight:900, color:s.ok?"#16A34A":"#DC2626", lineHeight:1, marginBottom:3 }}>{s.val}</p>
                            <p style={{ fontSize:10, color:"#68738A" }}>{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty state */}
                  {!aiResult?.bullets?.length && (
                    <div style={{ background:"white", borderRadius:14, border:"1px solid #BBF7D0", padding:"36px 20px", textAlign:"center", boxShadow:"0 2px 8px rgba(22,163,74,0.06)" }}>
                      <div style={{ width:48, height:48, borderRadius:16, background:"#F0FFF4", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
                        <svg viewBox="0 0 20 20" fill="none" stroke="#16A34A" strokeWidth="2" style={{ width:22,height:22 }}><path d="M5 10l4 4 6-6"/></svg>
                      </div>
                      <p style={{ fontSize:14, color:"#14532D", fontWeight:700 }}>All bullets are solid</p>
                      <p style={{ fontSize:12, color:"#68738A", marginTop:4 }}>No weak bullets found — your impact language is strong.</p>
                    </div>
                  )}

                  {/* Bullet cards */}
                  {(aiResult?.bullets ?? []).map((b, i) => {
                    const mw = magicWrite[i];
                    const improve = b.newScore - b.oldScore;
                    const ds = DIFF_STYLE[b.difficulty ?? "medium"];
                    return (
                      <div key={i} id={`bullet-${i}`} style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", boxShadow:"0 2px 10px rgba(0,0,0,0.04)", scrollMarginTop:16 }}>
                        {/* Card header */}
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", background:"#FAFBFF", borderBottom:"1px solid #F1F5F9", borderRadius:"16px 16px 0 0" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <span style={{ fontSize:11, fontWeight:700, color:"#A0AABF", textTransform:"uppercase", letterSpacing:"0.08em" }}>Bullet {i+1}</span>
                            <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:99, background:ds.bg, color:ds.color, border:`1px solid ${ds.border}` }}>{ds.label}</span>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <span style={{ fontSize:12, fontWeight:800, color:"#DC2626", padding:"2px 7px", borderRadius:6, background:"#FEF2F2" }}>{b.oldScore}</span>
                            <svg viewBox="0 0 24 8" fill="none" style={{ width:22,height:8 }}><path d="M0 4h19" stroke="#CBD5E1" strokeWidth="1.5"/><path d="M16 1l4 3-4 3" stroke="#CBD5E1" strokeWidth="1.5"/></svg>
                            <span style={{ fontSize:12, fontWeight:800, color:"#16A34A", padding:"2px 7px", borderRadius:6, background:"#F0FFF4" }}>{b.newScore}</span>
                            {improve > 0 && <span style={{ fontSize:10, fontWeight:800, color:"#16A34A", background:"#DCFCE7", padding:"1px 7px", borderRadius:99 }}>+{improve} pts</span>}
                          </div>
                        </div>
                        <div style={{ padding:"14px 16px" }}>
                          {/* Why */}
                          <div style={{ display:"flex", gap:8, padding:"8px 11px", background:"#FFFBEB", borderRadius:9, border:"1px solid #FDE68A", marginBottom:10 }}>
                            <svg viewBox="0 0 16 16" fill="#F59E0B" style={{ width:12, height:12, flexShrink:0, marginTop:2 }}><path d="M8 1L1 14h14L8 1z"/><rect x="7" y="6" width="2" height="4" fill="white"/><rect x="7" y="11" width="2" height="2" fill="white"/></svg>
                            <p style={{ fontSize:11.5, color:"#92400E", lineHeight:1.5, margin:0 }}>{b.reason}</p>
                          </div>
                          {/* Before */}
                          <div style={{ marginBottom:4 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5 }}>
                              <div style={{ display:"flex", alignItems:"center", gap:5, background:"#FEE2E2", borderRadius:6, padding:"3px 9px" }}>
                                <svg viewBox="0 0 12 12" fill="#DC2626" style={{ width:9,height:9,flexShrink:0 }}><path d="M2 6h8"/></svg>
                                <span style={{ fontSize:10, fontWeight:800, color:"#991B1B", letterSpacing:"0.07em" }}>BEFORE</span>
                              </div>
                              <span style={{ fontSize:10, color:"#A0AABF" }}>original</span>
                            </div>
                            <div style={{ background:"#FEF2F2", border:"1.5px solid #FECACA", borderRadius:10, padding:"11px 14px", borderLeft:"4px solid #DC2626" }}>
                              <p style={{ fontSize:12, color:"#991B1B", lineHeight:1.65, margin:0, textDecoration:"line-through", opacity:0.85 }}>{b.before}</p>
                            </div>
                          </div>
                          {/* Arrow between before/after */}
                          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:24 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2" style={{ width:18,height:18 }}><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                          </div>
                          {/* After */}
                          <div style={{ marginBottom:10 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5 }}>
                              <div style={{ display:"flex", alignItems:"center", gap:5, background:"#DCFCE7", borderRadius:6, padding:"3px 9px" }}>
                                <svg viewBox="0 0 12 12" fill="none" stroke="#16A34A" strokeWidth="2" style={{ width:9,height:9,flexShrink:0 }}><path d="M2 6h8M6 2l4 4-4 4"/></svg>
                                <span style={{ fontSize:10, fontWeight:800, color:"#14532D", letterSpacing:"0.07em" }}>AFTER</span>
                              </div>
                              <span style={{ fontSize:10, color:"#A0AABF" }}>Zari's rewrite</span>
                            </div>
                            <div style={{ display:"flex", gap:6, alignItems:"flex-start" }}>
                              <div style={{ flex:1, background:"#F0FFF4", border:"1.5px solid #86EFAC", borderRadius:10, padding:"11px 14px", borderLeft:"4px solid #16A34A" }}>
                                <p style={{ fontSize:12, color:"#14532D", lineHeight:1.65, margin:0, fontWeight:500 }}>{b.after}</p>
                              </div>
                              <button onClick={()=>{ void navigator.clipboard.writeText(b.after); }} style={{ padding:"9px 13px", borderRadius:9, border:"1px solid #BBF7D0", background:"white", color:"#16A34A", cursor:"pointer", flexShrink:0, fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>Copy</button>
                            </div>
                          </div>
                          {/* Magic Write */}
                          {!mw ? (
                            <button onClick={()=>openMagicWrite(i)} style={{ fontSize:11.5, fontWeight:700, padding:"7px 15px", borderRadius:9, border:"1.5px solid #C7D2FE", background:"linear-gradient(135deg,#EEF2FF,#F4F0FF)", color:"#4361EE", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:6 }}>
                              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:11, height:11 }}><path d="M13 2l1 4-8.5 8.5L2 16l1.5-3.5L12 4l1-2z"/><path d="M10 4l2 2"/></svg>
                              Magic Write — customize this rewrite
                            </button>
                          ) : (
                            <div style={{ border:"1.5px solid #C7D2FE", borderRadius:12, overflow:"hidden" }}>
                              <div style={{ display:"flex", background:"#F8FAFF", borderBottom:"1px solid #E4E8F5", padding:"8px 12px", gap:4, alignItems:"center", justifyContent:"space-between" }}>
                                <div style={{ display:"flex", gap:4 }}>
                                  {([["refine","Refine"],["describe","I did..."],["variations","3 versions"]] as [MagicWriteMode,string][]).map(([m,l]) => (
                                    <button key={m} onClick={()=>setMagicWrite(p=>({...p,[i]:{...p[i],mode:m,results:[],input:""}}))} style={{ fontSize:10.5, fontWeight:600, padding:"4px 10px", borderRadius:7, border:"none", background:mw.mode===m?"#4361EE":"#F1F5F9", color:mw.mode===m?"white":"#68738A", cursor:"pointer" }}>{l}</button>
                                  ))}
                                </div>
                                <button onClick={()=>closeMagicWrite(i)} style={{ fontSize:13, background:"none", border:"none", color:"#A0AABF", cursor:"pointer", padding:"0 4px" }}>✕</button>
                              </div>
                              <div style={{ padding:12 }}>
                                {mw.mode==="describe" ? (
                                  <textarea value={mw.input} onChange={e=>setMagicWrite(p=>({...p,[i]:{...p[i],input:e.target.value}}))} placeholder="Describe what you actually did — metrics, scale, outcome…" style={{ width:"100%", minHeight:56, border:"1.5px solid #E4E8F5", borderRadius:8, padding:"8px 10px", fontSize:11.5, color:"#1E2235", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"white" }}/>
                                ) : (
                                  <p style={{ fontSize:11, color:"#68738A", margin:"0 0 8px" }}>{mw.mode==="refine"?"Zari will tighten and strengthen the AI suggestion.":"3 meaningfully different takes — different verb, angle, structure."}</p>
                                )}
                                <button onClick={()=>void runMagicWrite(i, b)} disabled={mw.loading||(mw.mode==="describe"&&!mw.input.trim())} style={{ fontSize:12, fontWeight:700, padding:"7px 18px", borderRadius:8, border:"none", background:(!mw.loading&&(mw.mode!=="describe"||mw.input.trim()))?"#4361EE":"#E4E8F5", color:(!mw.loading&&(mw.mode!=="describe"||mw.input.trim()))?"white":"#A0AABF", cursor:(!mw.loading&&(mw.mode!=="describe"||mw.input.trim()))?"pointer":"default" }}>
                                  {mw.loading?"Writing…":"Generate"}
                                </button>
                              </div>
                              {mw.results.length>0 && (
                                <div style={{ padding:"0 12px 12px", display:"flex", flexDirection:"column", gap:7 }}>
                                  {mw.results.map((r,ri)=>(
                                    <div key={ri} style={{ display:"flex", gap:6 }}>
                                      <p style={{ flex:1, fontSize:11.5, color:"#1D4ED8", background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:9, padding:"9px 12px", lineHeight:1.6, margin:0 }}>{r}</p>
                                      <button onClick={()=>{ void navigator.clipboard.writeText(r); setMagicWrite(p=>({...p,[i]:{...p[i],copied:ri}})); setTimeout(()=>setMagicWrite(p=>({...p,[i]:{...p[i],copied:null}})),1500); }} style={{ padding:"7px 10px", borderRadius:8, border:"1px solid #BFDBFE", background:"white", color:mw.copied===ri?"#16A34A":"#1D4ED8", cursor:"pointer", fontSize:10.5, fontWeight:700, flexShrink:0 }}>{mw.copied===ri?"✓":"Copy"}</button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            })()}

            {/* ── AI REWRITES TAB ── */}
            {tab==="rewrite" && (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", padding:"16px 18px", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                  <p style={{ fontSize:13.5, fontWeight:800, color:"#0A0A0F", marginBottom:4 }}>AI Rewrites</p>
                  <p style={{ fontSize:11.5, color:"#68738A" }}>Zari rewrote your key sections. Each card shows the original vs the improved version.</p>
                </div>
                {(aiResult?.rewrittenSections ?? []).map((s, idx) => {
                  const displayed = altVersions[idx] ?? s.text;
                  const isRegen = rewritingIdx === idx;
                  const attempt = altAttempt[idx] ?? 1;
                  const grade = scoreGrade(s.score);
                  const isExperience = s.label.toLowerCase().includes("experience") || s.label.toLowerCase().includes("highlights");

                  // Parse numbered bullets for Experience section: "1. text\n2. text\n3. text"
                  const expBullets = isExperience
                    ? displayed.split("\n").filter(l => /^\d+\.\s/.test(l.trim())).map(l => l.replace(/^\d+\.\s*/, "").trim()).filter(Boolean)
                    : [];
                  const hasExpBullets = expBullets.length > 0;

                  return (
                    <div key={s.label} style={{ borderRadius:16, border:"1px solid #E4E8F5", overflow:"hidden", boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}>
                      {/* Section header */}
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px", background:"linear-gradient(135deg,#F8FAFF,#F4F7FF)", borderBottom:"1px solid #E4E8F5" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <span style={{ fontSize:12, fontWeight:800, textTransform:"uppercase", color:"#4361EE", letterSpacing:"0.1em" }}>{s.label}</span>
                          {attempt > 1 && <span style={{ fontSize:10, color:"#A0AABF", background:"#F1F5F9", padding:"1px 6px", borderRadius:99 }}>v{attempt}</span>}
                          <span style={{ fontSize:11, fontWeight:700, color:grade.color, background: s.score>=85?"#F0FFF4":s.score>=72?"#EFF6FF":s.score>=55?"#FFFBEB":"#FEF2F2", padding:"2px 8px", borderRadius:99 }}>{s.score}/100</span>
                        </div>
                        <button onClick={()=>void rewriteSection(idx, s)} disabled={isRegen} style={{ fontSize:11, fontWeight:600, padding:"6px 13px", borderRadius:8, border:"1px solid #C7D2FE", background:"white", color:isRegen?"#A0AABF":"#4361EE", cursor:isRegen?"default":"pointer" }}>
                          {isRegen ? "Rewriting…" : "Try another version"}
                        </button>
                      </div>

                      <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:12 }}>
                        {/* BEFORE block */}
                        {s.originalText && (
                          <div>
                            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                              <div style={{ background:"#FEE2E2", borderRadius:6, padding:"2px 8px" }}>
                                <span style={{ fontSize:10, fontWeight:800, color:"#991B1B", letterSpacing:"0.07em" }}>ORIGINAL</span>
                              </div>
                            </div>
                            <div style={{ background:"#FEF2F2", border:"1.5px solid #FECACA", borderRadius:10, padding:"11px 14px", borderLeft:"4px solid #DC2626" }}>
                              <p style={{ fontSize:11.5, color:"#991B1B", lineHeight:1.7, margin:0, opacity:0.85, whiteSpace:"pre-wrap" }}>{s.originalText}</p>
                            </div>
                          </div>
                        )}

                        {/* Arrow */}
                        {s.originalText && (
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <div style={{ flex:1, height:1, background:"#E4E8F5" }}/>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" style={{ width:16,height:16,flexShrink:0 }}><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                            <div style={{ flex:1, height:1, background:"#E4E8F5" }}/>
                          </div>
                        )}

                        {/* AFTER block — Experience bullets are individual cards */}
                        <div>
                          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                            <div style={{ background:"#DCFCE7", borderRadius:6, padding:"2px 8px" }}>
                              <span style={{ fontSize:10, fontWeight:800, color:"#14532D", letterSpacing:"0.07em" }}>ZARI'S REWRITE</span>
                            </div>
                            {!hasExpBullets && (
                              <button onClick={()=>{ void navigator.clipboard.writeText(displayed); }} style={{ fontSize:10.5, fontWeight:600, padding:"4px 11px", borderRadius:7, border:"1px solid #BBF7D0", background:"white", color:"#16A34A", cursor:"pointer" }}>Copy</button>
                            )}
                          </div>

                          {hasExpBullets ? (
                            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                              {expBullets.map((bullet, bi) => (
                                <div key={bi} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                                  <div style={{ flex:1, background:"#F0FFF4", border:"1.5px solid #86EFAC", borderRadius:10, padding:"10px 14px", borderLeft:"4px solid #16A34A" }}>
                                    <p style={{ fontSize:12, color:"#14532D", lineHeight:1.65, margin:0, fontWeight:500 }}>{bullet}</p>
                                  </div>
                                  <button onClick={()=>{ void navigator.clipboard.writeText(bullet); }} style={{ padding:"8px 12px", borderRadius:8, border:"1px solid #BBF7D0", background:"white", color:"#16A34A", cursor:"pointer", fontSize:10.5, fontWeight:700, flexShrink:0 }}>Copy</button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div style={{ background: altVersions[idx] ? "#FAFBFF" : "#F0FFF4", border:`1.5px solid ${altVersions[idx]?"#E4E8F5":"#86EFAC"}`, borderRadius:10, padding:"11px 14px", borderLeft:`4px solid ${altVersions[idx]?"#94A3B8":"#16A34A"}` }}>
                              <p style={{ fontSize:12.5, color: altVersions[idx] ? "#1E2235" : "#14532D", lineHeight:1.75, margin:0, whiteSpace:"pre-wrap" }}>{displayed}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button onClick={()=>{ const all=(aiResult?.rewrittenSections??[]).map((s,i)=>`${s.label}:\n${altVersions[i]??s.text}`).join("\n\n"); void navigator.clipboard.writeText(all); }} style={{ fontSize:13, fontWeight:700, padding:"11px", borderRadius:11, border:"none", background:"linear-gradient(135deg,#0A0A0F,#1E2235)", color:"white", cursor:"pointer" }}>
                  Copy all rewrites →
                </button>
              </div>
            )}

            {/* ══ KEYWORDS TAB ══ */}
            {tab==="keywords" && (() => {
              const kws = aiResult?.keywords ?? [];
              const required  = kws.filter(k=>k.importance==="required");
              const preferred = kws.filter(k=>k.importance==="preferred");
              const foundReq  = required.filter(k=>k.found).length;
              const foundPref = preferred.filter(k=>k.found).length;
              const missingReq = required.filter(k=>!k.found);
              const coverage  = kws.length > 0 ? Math.round((kws.filter(k=>k.found).length / kws.length)*100) : 0;
              const reqCoverage = required.length > 0 ? Math.round((foundReq/required.length)*100) : 0;

              // Group by skillType for richer display
              const SKILL_TYPE_META: Record<string,{label:string;color:string;bg:string}> = {
                technical:    { label:"Technical",    color:"#1D4ED8", bg:"#EFF6FF" },
                tool:         { label:"Tool",         color:"#7C3AED", bg:"#F5F3FF" },
                certification:{ label:"Certification",color:"#065F46", bg:"#ECFDF5" },
                domain:       { label:"Domain",       color:"#0369A1", bg:"#EFF6FF" },
                soft:         { label:"Soft skill",   color:"#68738A", bg:"#F8FAFC" },
              };

              return (
                <>
                  {/* Coverage hero */}
                  <div style={{ background:"white", borderRadius:16, border:`1.5px solid ${coverage>=70?"#86EFAC":coverage>=45?"#FDE68A":"#FECACA"}`, padding:"18px 20px", boxShadow:"0 4px 20px rgba(0,0,0,0.05)" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:14 }}>
                      {[
                        { label:"Overall coverage", val:`${coverage}%`, color:coverage>=70?"#16A34A":coverage>=45?"#D97706":"#DC2626", sub:`${kws.filter(k=>k.found).length}/${kws.length} keywords` },
                        { label:"Required found",   val:`${foundReq}/${required.length}`, color:reqCoverage>=70?"#16A34A":reqCoverage>=45?"#D97706":"#DC2626", sub:`${missingReq.length} still missing` },
                        { label:"Preferred found",  val:`${foundPref}/${preferred.length}`, color:foundPref===preferred.length?"#16A34A":"#D97706", sub:"bonus points with recruiter" },
                      ].map((s,i) => (
                        <div key={i} style={{ textAlign:"center", padding:"10px 8px", borderRadius:12, background:"#FAFBFF" }}>
                          <p style={{ fontSize:20, fontWeight:900, color:s.color, lineHeight:1, marginBottom:3 }}>{s.val}</p>
                          <p style={{ fontSize:11, fontWeight:600, color:"#0A0A0F", marginBottom:2 }}>{s.label}</p>
                          <p style={{ fontSize:10, color:"#A0AABF" }}>{s.sub}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                        <span style={{ fontSize:11, fontWeight:600, color:"#68738A" }}>Overall match</span>
                        <span style={{ fontSize:11, fontWeight:700, color:coverage>=70?"#16A34A":coverage>=45?"#D97706":"#DC2626" }}>{coverage>=70?"Strong":"Needs work"}</span>
                      </div>
                      <div style={{ height:8, borderRadius:99, background:"#F1F5F9", overflow:"hidden" }}>
                        <div style={{ width:`${coverage}%`, height:"100%", borderRadius:99, background:`linear-gradient(90deg,${coverage>=70?"#16A34A":coverage>=45?"#F59E0B":"#DC2626"},${coverage>=70?"#22C55E":coverage>=45?"#FCD34D":"#EF4444"})`, transition:"width 1s cubic-bezier(0.4,0,0.2,1)" }}/>
                      </div>
                    </div>
                  </div>

                  {/* Missing required — "Add these" callout */}
                  {missingReq.length > 0 && (
                    <div style={{ background:"linear-gradient(135deg,#FEF2F2,#FFF7ED)", borderRadius:16, border:"1.5px solid #FECACA", padding:"16px 18px", boxShadow:"0 2px 12px rgba(220,38,38,0.06)" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                        <svg viewBox="0 0 16 16" fill="#DC2626" style={{ width:14,height:14,flexShrink:0 }}><circle cx="8" cy="8" r="7"/><rect x="7" y="4" width="2" height="5" fill="white"/><rect x="7" y="10" width="2" height="2" fill="white"/></svg>
                        <p style={{ fontSize:12, fontWeight:800, color:"#991B1B", textTransform:"uppercase", letterSpacing:"0.06em" }}>Add these to your resume</p>
                        <span style={{ fontSize:10, fontWeight:700, padding:"1px 7px", borderRadius:99, background:"#FECACA", color:"#991B1B" }}>{missingReq.length} required missing</span>
                      </div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                        {missingReq.map((kw,i) => {
                          const stm = SKILL_TYPE_META[kw.skillType ?? "technical"] ?? SKILL_TYPE_META.technical;
                          return (
                            <div key={i} style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:99, border:"1.5px solid #FECACA", background:"white", cursor:"default" }}>
                              <svg viewBox="0 0 12 12" fill="none" stroke="#DC2626" strokeWidth="2" style={{ width:9,height:9,flexShrink:0 }}><path d="M2 2l8 8M10 2l-8 8"/></svg>
                              <span style={{ fontSize:12, fontWeight:700, color:"#991B1B" }}>{kw.word}</span>
                              <span style={{ fontSize:9, fontWeight:600, color:stm.color, background:stm.bg, padding:"0 4px", borderRadius:4 }}>{stm.label}</span>
                            </div>
                          );
                        })}
                      </div>
                      <p style={{ fontSize:11.5, color:"#7F1D1D", lineHeight:1.55, marginTop:10 }}>Add these naturally to your Summary, Experience bullets, or Skills section — paired with real evidence of using them.</p>
                    </div>
                  )}

                  {/* Required keywords (all) */}
                  {required.length > 0 && (
                    <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", padding:"16px 18px", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                        <div>
                          <p style={{ fontSize:12.5, fontWeight:800, color:"#0A0A0F" }}>Required Skills</p>
                          <p style={{ fontSize:11, color:"#68738A", marginTop:1 }}>Explicitly required in the job description</p>
                        </div>
                        <span style={{ fontSize:11, fontWeight:700, color:reqCoverage>=70?"#16A34A":"#DC2626", background:reqCoverage>=70?"#F0FFF4":"#FEF2F2", padding:"3px 10px", borderRadius:99 }}>{reqCoverage}% matched</span>
                      </div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                        {required.map((kw,i) => {
                          const stm = SKILL_TYPE_META[kw.skillType ?? "technical"] ?? SKILL_TYPE_META.technical;
                          return (
                            <div key={i} title={kw.found&&kw.context?`Found: "${kw.context}"`:"Missing from resume"} style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:99, border:`1.5px solid ${kw.found?"#86EFAC":"#FECACA"}`, background:kw.found?"#F0FFF4":"#FEF2F2", cursor:"default" }}>
                              {kw.found
                                ? <svg viewBox="0 0 12 12" fill="none" stroke="#16A34A" strokeWidth="2" style={{ width:9,height:9,flexShrink:0 }}><path d="M2 6l3 3 5-5"/></svg>
                                : <svg viewBox="0 0 12 12" fill="none" stroke="#DC2626" strokeWidth="2" style={{ width:9,height:9,flexShrink:0 }}><path d="M2 2l8 8M10 2l-8 8"/></svg>}
                              <span style={{ fontSize:12, fontWeight:700, color:kw.found?"#14532D":"#991B1B" }}>{kw.word}</span>
                              <span style={{ fontSize:9, fontWeight:600, color:stm.color, background:stm.bg, padding:"0 4px", borderRadius:4 }}>{stm.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Preferred keywords */}
                  {preferred.length > 0 && (
                    <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", padding:"16px 18px", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                        <div>
                          <p style={{ fontSize:12.5, fontWeight:800, color:"#0A0A0F" }}>Preferred Skills</p>
                          <p style={{ fontSize:11, color:"#68738A", marginTop:1 }}>Nice to have — adds bonus points with recruiters</p>
                        </div>
                        <span style={{ fontSize:11, fontWeight:700, color:"#4361EE", background:"#EEF2FF", padding:"3px 10px", borderRadius:99 }}>{foundPref}/{preferred.length}</span>
                      </div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                        {preferred.map((kw,i) => {
                          const stm = SKILL_TYPE_META[kw.skillType ?? "soft"] ?? SKILL_TYPE_META.soft;
                          return (
                            <div key={i} title={kw.found&&kw.context?`Found: "${kw.context}"`:"Not found"} style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:99, border:`1.5px solid ${kw.found?"#C7D2FE":"#E4E8F5"}`, background:kw.found?"#EEF2FF":"#F8FAFF", cursor:"default" }}>
                              <span style={{ width:6, height:6, borderRadius:"50%", background:kw.found?"#4361EE":"#CBD5E1", flexShrink:0 }}/>
                              <span style={{ fontSize:12, fontWeight:700, color:kw.found?"#3451D1":"#68738A" }}>{kw.word}</span>
                              <span style={{ fontSize:9, fontWeight:600, color:stm.color, background:stm.bg, padding:"0 4px", borderRadius:4 }}>{stm.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {kws.length===0 && (
                    <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", padding:"48px 20px", textAlign:"center" }}>
                      <div style={{ width:52, height:52, borderRadius:16, background:"#EEF2FF", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
                        <svg viewBox="0 0 20 20" fill="none" stroke="#4361EE" strokeWidth="1.8" style={{ width:22,height:22 }}><circle cx="9" cy="9" r="6"/><path d="M15 15l3 3"/></svg>
                      </div>
                      <p style={{ fontSize:14, fontWeight:700, color:"#0A0A0F" }}>No keyword data</p>
                      <p style={{ fontSize:12.5, color:"#68738A", marginTop:4, lineHeight:1.55 }}>Switch to Targeted mode and paste a job description to see which keywords you&apos;re missing.</p>
                    </div>
                  )}
                </>
              );
            })()}

            {/* ── HISTORY TAB ── */}
            {tab==="history" && (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <p style={{ fontSize:13.5, fontWeight:800, color:"#0A0A0F" }}>Score History</p>
                    <p style={{ fontSize:11.5, color:"#68738A", marginTop:2 }}>Saved locally — persists across sessions</p>
                  </div>
                  {scoreHistory.length > 0 && (
                    <button onClick={()=>{ if(confirm("Clear all history?")) void clearHistory(); }} style={{ fontSize:11, fontWeight:600, padding:"5px 12px", borderRadius:8, border:"1px solid #FECACA", background:"#FEF2F2", color:"#991B1B", cursor:"pointer" }}>Clear all</button>
                  )}
                </div>

                {/* Trend chart */}
                {!historyLoading && scoreHistory.length >= 2 && (() => {
                  const rev = [...scoreHistory].reverse();
                  const vals = rev.map(e=>e.scores.overall);
                  const first = vals[0], last = vals[vals.length-1], trend = last-first;
                  const tc = trend>0?"#16A34A":trend<0?"#DC2626":"#A0AABF";
                  return (
                    <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", padding:"16px 18px", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                        <div>
                          <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F" }}>Overall score progression</p>
                          <p style={{ fontSize:11.5, color:tc, fontWeight:700, marginTop:2 }}>{trend>0?`+${trend} improvement`:trend<0?`${trend} regression`:"No change"} over {scoreHistory.length} submissions</p>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                          <div style={{ textAlign:"center" }}>
                            <p style={{ fontSize:10, color:"#A0AABF", marginBottom:3 }}>Started</p>
                            <p style={{ fontSize:20, fontWeight:900, color:"#68738A", lineHeight:1 }}>{first}</p>
                          </div>
                          <Sparkline values={vals} color={tc} width={120} height={40}/>
                          <div style={{ textAlign:"center" }}>
                            <p style={{ fontSize:10, color:"#A0AABF", marginBottom:3 }}>Latest</p>
                            <p style={{ fontSize:20, fontWeight:900, color:tc, lineHeight:1 }}>{last}</p>
                          </div>
                        </div>
                      </div>
                      {/* Mini bars per dimension */}
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                        {(["ats","impact","clarity"] as (keyof ResumeScores)[]).map(key => {
                          const fv = rev[0].scores[key], lv = rev[rev.length-1].scores[key], d = lv-fv;
                          const c = d>0?"#16A34A":d<0?"#DC2626":"#A0AABF";
                          return (
                            <div key={key} style={{ padding:"8px 10px", background:"#FAFBFF", borderRadius:10, border:"1px solid #F1F5F9", textAlign:"center" }}>
                              <p style={{ fontSize:10, color:"#68738A", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>{key==="ats"?"ATS":key==="impact"?"Impact":"Clarity"}</p>
                              <p style={{ fontSize:17, fontWeight:900, color:c, lineHeight:1 }}>{d>0?"+":""}{d}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {historyLoading && <div style={{ textAlign:"center", padding:"32px 0", color:"#68738A", fontSize:13 }}>Loading…</div>}
                {!historyLoading && scoreHistory.length===0 && (
                  <div style={{ background:"white", borderRadius:16, border:"1px solid #E4E8F5", padding:"40px 20px", textAlign:"center" }}>
                    <div style={{ fontSize:36, marginBottom:10 }}>📈</div>
                    <p style={{ fontSize:14, fontWeight:700, color:"#0A0A0F" }}>No history yet</p>
                    <p style={{ fontSize:12.5, color:"#68738A", marginTop:4 }}>Your score is saved every time you submit a resume. Come back after a few revisions to see your progress.</p>
                  </div>
                )}
                {scoreHistory.map((entry, i) => {
                  const prev = scoreHistory[i+1];
                  const d = (k:keyof ResumeScores) => prev ? entry.scores[k]-prev.scores[k] : null;
                  const g = scoreGrade(entry.scores.overall);
                  return (
                    <div key={entry.id} style={{ background:"white", borderRadius:14, border:`1px solid ${i===0?"#C7D2FE":"#E4E8F5"}`, padding:"14px 16px", boxShadow: i===0?"0 2px 12px rgba(67,97,238,0.1)":"0 1px 4px rgba(0,0,0,0.04)" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                        <div>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <p style={{ fontSize:13, fontWeight:700, color:"#0A0A0F" }}>{entry.filename}</p>
                            {i===0 && <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:99, background:"#EEF2FF", color:"#4361EE" }}>Latest</span>}
                          </div>
                          <p style={{ fontSize:11, color:"#A0AABF", marginTop:2 }}>
                            {new Date(entry.submittedAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"})}
                            {" · "}{entry.mode==="targeted"?`Targeted${entry.targetRole?": "+entry.targetRole:""}` : "General"}
                          </p>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <p style={{ fontSize:24, fontWeight:900, color:g.color, lineHeight:1 }}>{entry.scores.overall}</p>
                          <p style={{ fontSize:10, color:g.color, fontWeight:700 }}>{g.label}</p>
                        </div>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
                        {(["ats","impact","clarity"] as (keyof ResumeScores)[]).map(key => {
                          const delta = d(key);
                          const dc = delta===null?"#A0AABF":delta>0?"#16A34A":delta<0?"#DC2626":"#A0AABF";
                          return (
                            <div key={key} style={{ padding:"6px 8px", background:"#FAFBFF", borderRadius:8, border:"1px solid #F1F5F9" }}>
                              <p style={{ fontSize:9, color:"#A0AABF", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>{key==="ats"?"ATS Match":key==="impact"?"Impact":"Clarity"}</p>
                              <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
                                <span style={{ fontSize:16, fontWeight:900, color:"#0A0A0F" }}>{entry.scores[key]}</span>
                                {delta!==null && delta!==0 && <span style={{ fontSize:10, fontWeight:700, color:dc }}>{delta>0?"+":""}{delta}</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: MOCK INTERVIEW
═══════════════════════════════════════════════════ */
/* ── Per-stage resume screen metadata ── */
const SCREEN_RESUME_META: Record<CareerStage, {
  title: string; desc: string;
  features: { icon:string; title:string; body:string }[];
}> = {
  "job-search": {
    title:"Resume Review",
    desc:"Upload your resume and Zari will score it, rewrite every weak bullet with impact metrics, and give you a job-ready version to send tonight.",
    features:[
      { icon:"🎯", title:"ATS keyword scan",      body:"Checks every bullet against your target job descriptions" },
      { icon:"✏️", title:"Bullet rewrites",        body:"Injects metrics and impact into every weak bullet" },
      { icon:"📊", title:"Before/after score",     body:"Shows your resume score from first draft to final version" },
      { icon:"⬇️", title:"Downloadable version",   body:"Get a job-ready PDF optimized for your target role" },
    ],
  },
  "promotion": {
    title:"Build My Case",
    desc:"Upload your self-assessment or recent work. Zari will build your promotion case with scope, impact, and the narrative your manager needs to go to bat for you.",
    features:[
      { icon:"📋", title:"Gap analysis",       body:"Maps where you are against next-level expectations" },
      { icon:"💪", title:"Impact statements",  body:"Turns your work into manager-ready evidence" },
      { icon:"🎯", title:"Promo narrative",    body:"Builds the story your manager tells the committee" },
      { icon:"🗣️", title:"Pitch dry run",      body:"Practice the exact conversation with your manager" },
    ],
  },
  "salary": {
    title:"Salary Research",
    desc:"Tell Zari your role, level, and location. Zari researches market comps, anchors your number, and preps you with the exact language to use in the conversation.",
    features:[
      { icon:"📈", title:"Market benchmarks",     body:"Levels.fyi, Glassdoor, and Blind data for your exact role" },
      { icon:"💰", title:"Total comp breakdown",  body:"Base, equity, bonus, and benefits comparison" },
      { icon:"🎯", title:"Negotiation anchors",   body:"The number to lead with and the floor to hold" },
      { icon:"📝", title:"Counter-offer scripts", body:"Exact language for every response they'll give you" },
    ],
  },
  "career-change": {
    title:"Reframe Resume",
    desc:"Upload your current resume and tell Zari your target role. Zari rewrites it from scratch — repositioning your experience to speak the language of the industry you're entering.",
    features:[
      { icon:"🔄", title:"Narrative reframe",        body:"Rewrites your story for a new audience" },
      { icon:"🗺️", title:"Transferable skills map",  body:"Shows which of your skills translate directly" },
      { icon:"🎯", title:"Target role alignment",    body:"Optimizes for the exact job descriptions you want" },
      { icon:"📊", title:"Before/after view",        body:"Side-by-side of old positioning vs new" },
    ],
  },
  "leadership": {
    title:"Executive Bio",
    desc:"Upload your current bio or resume. Zari will write a board-ready executive bio, speaker profile, and LinkedIn rewrite that positions you at the level you're actually operating at.",
    features:[
      { icon:"✍️", title:"Board-ready bio",    body:"Written for governance conversations and director roles" },
      { icon:"🎤", title:"Speaker profile",    body:"Optimized for conference and keynote positioning" },
      { icon:"💼", title:"LinkedIn rewrite",   body:"Executive-level headline, about, and experience" },
      { icon:"📖", title:"Narrative arc",      body:"Connects your career story with your leadership thesis" },
    ],
  },
};

/* ── Per-stage interview questions ── */
const STAGE_QUESTIONS: Record<CareerStage, { cat:string; level:string; q:string }[]> = {
  "job-search": [
    { cat:"Cross-functional leadership", level:"Senior PM",      q:"Tell me about a time you led a cross-functional initiative that faced significant resistance. What was your approach and what was the outcome?" },
    { cat:"Prioritization",              level:"Senior PM",      q:"How do you prioritize features when you have competing stakeholder demands and limited engineering capacity?" },
    { cat:"Product strategy",            level:"Senior PM",      q:"Describe your process for defining a product strategy from scratch. Walk me through a real example." },
    { cat:"Conflict resolution",         level:"Senior PM",      q:"Tell me about a time you had a significant disagreement with an engineer or designer. How did you resolve it?" },
  ],
  "promotion": [
    { cat:"Scope expansion",    level:"Promotion pitch", q:"Walk me through the biggest thing you owned in the last 6 months that was above your current level. What was the outcome?" },
    { cat:"Sponsorship",        level:"Promotion pitch", q:"Who are your executive sponsors, and how have you built those relationships intentionally? Give me a specific example." },
    { cat:"Business impact",    level:"Promotion pitch", q:"Tell me about a decision you made that had measurable business impact — revenue, retention, or cost. What was your direct contribution?" },
    { cat:"Manager alignment",  level:"Promotion pitch", q:"Your manager says you're 'not quite ready yet.' How do you respond, and what do you do next?" },
  ],
  "salary": [
    { cat:"Opening move",   level:"Negotiation sim", q:"The hiring manager says: 'We'd like to extend you an offer at $145K base.' What do you say next?" },
    { cat:"Pushback",       level:"Negotiation sim", q:"They say: 'That's above our band. The max we can do is $152K.' How do you respond?" },
    { cat:"Counter offer",  level:"Negotiation sim", q:"Your current employer responds to your resignation with a counter-offer 10% above the new role. What do you say?" },
    { cat:"Internal raise", level:"Negotiation sim", q:"You want to ask your manager for a raise. Walk me through how you'd open that conversation." },
  ],
  "career-change": [
    { cat:"Motivation",           level:"Pivot interview", q:"Why are you switching industries after 6 years? What's driving this change right now?" },
    { cat:"Narrative bridge",     level:"Pivot interview", q:"Your background is in finance. Why would you be better at product than someone who started in it?" },
    { cat:"Transferable skills",  level:"Pivot interview", q:"Give me a specific example where a skill from your previous career directly helped you solve a problem in a new context." },
    { cat:"Gap acknowledgement",  level:"Pivot interview", q:"What's the thing you're most behind on compared to someone who's been in this field their whole career? How are you closing it?" },
  ],
  "leadership": [
    { cat:"Executive communication",      level:"Director+", q:"Walk me through a time you had to communicate a strategic shift to the board or senior leadership. What was your approach?" },
    { cat:"Organizational design",         level:"Director+", q:"Tell me about a time you had to restructure a team or function. How did you navigate the human side of that?" },
    { cat:"Influence without authority",   level:"Director+", q:"Give me an example of driving a company-wide change without having direct authority over the people you needed to change." },
    { cat:"Leadership thesis",             level:"Director+", q:"What's your leadership thesis — the thing you believe about building teams that most leaders get wrong?" },
  ],
};

const SCREEN_INTERVIEW_META: Record<CareerStage, { title:string; subtitle:string }> = {
  "job-search":    { title:"Mock Interview",   subtitle:"STAR practice · Real-time AI scoring · Senior PM behavioral round" },
  "promotion":     { title:"Pitch Practice",   subtitle:"Manager pitch · Committee prep · Objection handling" },
  "salary":        { title:"Negotiation Sim",  subtitle:"Offer conversation · Counter scripts · Objection handling" },
  "career-change": { title:"Pivot Interview",  subtitle:"'Why are you switching?' · Narrative bridging · Hybrid role questions" },
  "leadership":    { title:"Story Practice",   subtitle:"Executive stories · Board communication · Leadership scenarios" },
};

type InterviewFeedback = {
  overallScore: number;
  dimensions: { label: string; score: number }[];
  coachNote: string;
  suggestedResult: string;
};

function dimColor(score: number) {
  if (score >= 75) return "#16A34A";
  if (score >= 55) return "#D97706";
  return "#DC2626";
}

type InterviewQuestion = { cat: string; level: string; q: string };

function ScreenInterview({ stage }: { stage: CareerStage }) {
  const [setupDone,    setSetupDone]    = useState(false);
  const [resumeText,   setResumeText]   = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [jobDesc,      setJobDesc]      = useState("");
  const [jdMode,       setJdMode]       = useState<"paste"|"url">("paste");
  const [jobUrl,       setJobUrl]       = useState("");
  const [fetchingUrl,  setFetchingUrl]  = useState(false);
  const [urlFetchErr,  setUrlFetchErr]  = useState("");
  const [loadingQs,    setLoadingQs]    = useState(false);
  const [aiQuestions,  setAiQuestions]  = useState<InterviewQuestion[] | null>(null);
  const [qIdx,         setQIdx]         = useState(0);
  const [answer,       setAnswer]       = useState("");
  const [submitted,    setSubmitted]    = useState(false);
  const [isRecording,  setIsRecording]  = useState(false);
  const [recTime,      setRecTime]      = useState(0);
  const [isScoring,    setIsScoring]    = useState(false);
  const [feedback,     setFeedback]     = useState<InterviewFeedback | null>(null);


  useEffect(() => {
    if (!isRecording) return;
    const t = setInterval(() => setRecTime(s=>s+1), 1000);
    return () => clearInterval(t);
  }, [isRecording]);

  // Reset when stage changes
  useEffect(() => { setSetupDone(false); setQIdx(0); setAnswer(""); setSubmitted(false); setFeedback(null); setAiQuestions(null); setResumeText(""); setResumeFileName(""); setJobDesc(""); setJobUrl(""); setUrlFetchErr(""); }, [stage]);

  async function handleInterviewFile(file: File) {
    setResumeFileName(file.name);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/zari/extract", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({})) as { text?: string };
      if (data.text) setResumeText(data.text);
      else setResumeFileName(""); // extraction failed, clear filename
    } catch { setResumeFileName(""); }
  }

  async function fetchJdFromUrl() {
    if (!jobUrl.trim()) return;
    setFetchingUrl(true);
    setUrlFetchErr("");
    try {
      const res = await fetch("/api/zari/fetch-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: jobUrl.trim() }),
      });
      const data = await res.json().catch(() => ({})) as { text?: string; error?: string };
      if (data.text) {
        setJobDesc(data.text);
        setUrlFetchErr("");
      } else {
        setUrlFetchErr(data.error ?? "Couldn't extract text — paste the job description instead.");
      }
    } catch {
      setUrlFetchErr("Couldn't reach that URL — paste the job description instead.");
    }
    setFetchingUrl(false);
  }

  async function startInterview() {
    setLoadingQs(true);
    try {
      const res = await fetch("/api/zari/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate-questions", stage, resumeText, jobDescription: jobDesc }),
      });
      const data = await res.json().catch(() => ({})) as { questions?: InterviewQuestion[] };
      if (data.questions?.length) setAiQuestions(data.questions);
    } catch { /* fall back to static */ }
    setLoadingQs(false);
    setSetupDone(true);
    setQIdx(0);
  }

  const QUESTIONS: InterviewQuestion[] = aiQuestions ?? STAGE_QUESTIONS[stage];

  async function submit() {
    if (!answer.trim() || isScoring) return;
    setIsScoring(true);
    setSubmitted(true);
    const q = QUESTIONS[qIdx];
    try {
      const res = await fetch("/api/zari/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "score-answer", question: q.q, answer, stage, category: q.cat, resumeText, jobDescription: jobDesc }),
      });
      const data = await res.json().catch(() => null) as InterviewFeedback | null;
      if (data && data.overallScore) setFeedback(data);
    } catch { /* use fallback */ }
    setIsScoring(false);
  }

  const fmt = (s:number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  /* ── Setup step ── */
  if (!setupDone) return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:620, margin:"0 auto", padding:"48px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,#0F172A,#1E3A8A)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.6" style={{ width:22, height:22 }}><circle cx="10" cy="6" r="3"/><path d="M3 17c0-3.866 3.134-6 7-6s7 2.134 7 6"/></svg>
          </div>
          <h1 style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", marginBottom:8 }}>{SCREEN_INTERVIEW_META[stage].title}</h1>
          <p style={{ fontSize:14, color:"#68738A", lineHeight:1.6 }}>Give Zari your resume and the job you&apos;re targeting — she&apos;ll generate questions specific to you, not generic ones from a textbook.</p>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {/* Resume upload */}
          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:14, padding:16 }}>
            <p style={{ fontSize:12, fontWeight:700, color:"#0A0A0F", marginBottom:10 }}>Your resume <span style={{ color:"#A0AABF", fontWeight:400 }}>(optional but recommended)</span></p>
            {resumeFileName ? (
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 12px", background:"#F0FFF4", border:"1px solid #BBF7D0", borderRadius:9 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="#16A34A" strokeWidth="1.8" style={{ width:14,height:14,flexShrink:0 }}><path d="M14 2H6a1.5 1.5 0 00-1.5 1.5v11A1.5 1.5 0 006 16h8a1.5 1.5 0 001.5-1.5V5.5L14 2z"/><polyline points="14,2 14,5.5 17.5,5.5"/><polyline points="6,9 7.5,10.5 10,8"/></svg>
                  <span style={{ fontSize:12.5, fontWeight:600, color:"#15803D" }}>{resumeFileName}</span>
                </div>
                <label style={{ fontSize:11, color:"#68738A", cursor:"pointer", textDecoration:"underline" }}>
                  Replace
                  <input type="file" accept=".pdf,.docx,.txt" style={{ display:"none" }} onChange={e=>{ const f=e.target.files?.[0]; if(f) void handleInterviewFile(f); e.target.value=""; }}/>
                </label>
              </div>
            ) : (
              <label style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"11px", borderRadius:10, border:"1.5px dashed #CBD5E1", background:"#FAFBFF", cursor:"pointer", fontSize:13, color:"#4361EE", fontWeight:600 }}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:14,height:14 }}><path d="M8 10V3M4 6l4-3 4 3"/><path d="M2 12h12"/></svg>
                Upload resume (PDF, DOCX, TXT)
                <input type="file" accept=".pdf,.docx,.txt" style={{ display:"none" }} onChange={e=>{ const f=e.target.files?.[0]; if(f) void handleInterviewFile(f); e.target.value=""; }}/>
              </label>
            )}
          </div>

          {/* Job description */}
          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:14, padding:16 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <p style={{ fontSize:12, fontWeight:700, color:"#0A0A0F", margin:0 }}>Target job description <span style={{ color:"#A0AABF", fontWeight:400 }}>(optional)</span></p>
              <div style={{ display:"flex", background:"#F1F5F9", borderRadius:8, padding:2 }}>
                {(["paste","url"] as const).map(m => (
                  <button key={m} onClick={()=>{ setJdMode(m); setUrlFetchErr(""); }} style={{ fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:6, border:"none", background:jdMode===m?"white":"transparent", color:jdMode===m?"#0A0A0F":"#68738A", cursor:"pointer", boxShadow:jdMode===m?"0 1px 3px rgba(0,0,0,0.1)":"none", transition:"all 0.15s" }}>
                    {m === "paste" ? "Paste text" : "Job URL"}
                  </button>
                ))}
              </div>
            </div>

            {jdMode === "paste" ? (
              <textarea
                style={{ width:"100%", minHeight:90, border:"1.5px solid #E4E8F5", borderRadius:10, padding:"9px 11px", fontSize:13, color:"#1E2235", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"#FAFBFF", lineHeight:1.6 }}
                placeholder="Paste the job posting you're preparing for…"
                value={jobDesc} onChange={e=>setJobDesc(e.target.value)}
              />
            ) : (
              <div>
                <div style={{ display:"flex", gap:8 }}>
                  <input
                    type="url"
                    value={jobUrl}
                    onChange={e=>{ setJobUrl(e.target.value); setUrlFetchErr(""); }}
                    placeholder="https://jobs.lever.co/… or LinkedIn, Greenhouse, etc."
                    style={{ flex:1, border:"1.5px solid #E4E8F5", borderRadius:10, padding:"9px 11px", fontSize:13, color:"#1E2235", outline:"none", fontFamily:"inherit", background:"#FAFBFF" }}
                    onKeyDown={e=>{ if(e.key==="Enter") void fetchJdFromUrl(); }}
                  />
                  <button
                    onClick={()=>void fetchJdFromUrl()}
                    disabled={fetchingUrl || !jobUrl.trim()}
                    style={{ padding:"9px 16px", borderRadius:10, border:"none", background:jobUrl.trim()&&!fetchingUrl?"#4361EE":"#E4E8F5", color:jobUrl.trim()&&!fetchingUrl?"white":"#A0AABF", fontSize:13, fontWeight:700, cursor:jobUrl.trim()&&!fetchingUrl?"pointer":"default", flexShrink:0, transition:"all 0.15s" }}
                  >
                    {fetchingUrl ? "…" : "Fetch"}
                  </button>
                </div>
                {urlFetchErr && <p style={{ fontSize:12, color:"#DC2626", marginTop:6, marginBottom:0 }}>{urlFetchErr} <button onClick={()=>setJdMode("paste")} style={{ background:"none", border:"none", color:"#4361EE", fontWeight:600, cursor:"pointer", fontSize:12, padding:0 }}>Switch to paste</button></p>}
                {jobDesc && !urlFetchErr && <p style={{ fontSize:11.5, color:"#16A34A", marginTop:6, marginBottom:0 }}>✓ Job description fetched — {jobDesc.length.toLocaleString()} chars</p>}
              </div>
            )}
          </div>
        </div>

        <button onClick={()=>void startInterview()} disabled={loadingQs} style={{ width:"100%", marginTop:18, fontSize:14, fontWeight:700, padding:"12px", borderRadius:12, border:"none", background:"#0F172A", color:"white", cursor:loadingQs?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity:loadingQs?0.7:1 }}>
          {loadingQs ? (
            <><span style={{ width:14,height:14,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"white",animation:"spin-slow 0.7s linear infinite",display:"block" }}/> Generating your questions…</>
          ) : "Start interview →"}
        </button>
        <p style={{ textAlign:"center", fontSize:11.5, color:"#A0AABF", marginTop:10 }}>You can also skip straight in — Zari will use stage defaults.</p>
      </div>
    </div>
  );

  const q = QUESTIONS[qIdx];

  return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:860, margin:"0 auto", padding:28 }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
          <div>
            <h1 style={{ fontSize:22, fontWeight:900, color:"#0A0A0F", letterSpacing:"-0.03em", marginBottom:3 }}>{SCREEN_INTERVIEW_META[stage].title}</h1>
            <p style={{ fontSize:13, color:"#68738A" }}>{SCREEN_INTERVIEW_META[stage].subtitle}</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:12, color:"#68738A" }}>Question {qIdx+1} of {QUESTIONS.length}</span>
            <div style={{ display:"flex", gap:4 }}>
              {QUESTIONS.map((_,i) => <div key={i} style={{ width:32, height:4, borderRadius:99, background:i<=qIdx?"#4361EE":"#E4E8F5", transition:"background 0.3s" }}/>)}
            </div>
          </div>
        </div>

        {/* Question card */}
        <div style={{ background:"linear-gradient(135deg,#0F172A,#1E3A8A)", borderRadius:18, padding:"22px 24px", marginBottom:20, boxShadow:"0 12px 32px rgba(15,23,42,0.25)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:"rgba(255,255,255,0.5)" }}>
              {q.cat} · {q.level}
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {["Situation","Task","Action","Result"].map(s => <span key={s} style={{ fontSize:9.5, fontWeight:600, padding:"2px 8px", borderRadius:99, background:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.75)" }}>{s}</span>)}
            </div>
          </div>
          <p style={{ fontSize:15.5, fontWeight:600, color:"white", lineHeight:1.65 }}>{q.q}</p>
          <div style={{ marginTop:14, fontSize:12, color:"rgba(255,255,255,0.4)" }}>
            Tip: Aim for 2–3 minutes. Lead with the Situation, make the Result specific and measurable.
          </div>
        </div>

        {!submitted ? (
          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:18, padding:22, boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <p style={{ fontSize:14, fontWeight:700, color:"#0A0A0F" }}>Your answer</p>
              <button onClick={() => { setIsRecording(r=>!r); if(isRecording) setRecTime(0); }} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, padding:"7px 16px", borderRadius:99, border:"none", cursor:"pointer", background:isRecording?"#FEF2F2":"#EEF2FF", color:isRecording?"#DC2626":"#4361EE" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:isRecording?"#DC2626":"#4361EE", animation:isRecording?"blink 0.7s step-end infinite":"none" }}/>
                {isRecording ? `Stop · ${fmt(recTime)}` : "Record voice"}
              </button>
            </div>

            {/* Voice waveform when recording */}
            {isRecording && (
              <div style={{ background:"#EEF2FF", borderRadius:12, padding:"14px 18px", marginBottom:14, display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:11, fontWeight:700, color:"#4361EE" }}>Recording…</span>
                <div style={{ display:"flex", gap:2, alignItems:"flex-end", height:24 }}>
                  {Array.from({length:24}).map((_,i) => <div key={i} style={{ width:3, borderRadius:99, background:"#4361EE", height:Math.random()*20+4, animation:`voice-wave ${0.4+Math.random()*0.4}s ease-in-out ${i*0.03}s infinite alternate` }}/>)}
                </div>
              </div>
            )}

            <textarea
              style={{ width:"100%", minHeight:160, border:"1.5px solid #E4E8F5", borderRadius:12, padding:"12px 14px", fontSize:14, lineHeight:1.7, color:"#1E2235", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", transition:"border-color 0.2s" }}
              placeholder="Type your answer here, or click 'Record voice' to speak. Use Situation → Task → Action → Result."
              value={answer} onChange={e=>setAnswer(e.target.value)}
            />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12 }}>
              <span style={{ fontSize:12, color:"#A0AABF" }}>{answer.split(" ").filter(Boolean).length} words · aim for 150–250</span>
              <button onClick={()=>void submit()} disabled={!answer.trim() || isScoring} style={{ fontSize:13.5, fontWeight:700, padding:"10px 24px", borderRadius:12, border:"none", background:answer.trim()&&!isScoring?"#4361EE":"#F1F5F9", color:answer.trim()&&!isScoring?"white":"#CBD5E1", cursor:answer.trim()&&!isScoring?"pointer":"default", boxShadow:answer.trim()&&!isScoring?"0 4px 16px rgba(67,97,238,0.32)":"none" }}>
                {isScoring ? "Scoring…" : "Get feedback →"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {isScoring && (
              <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:18, padding:32, marginBottom:14, textAlign:"center", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:14 }}>
                  {[0,1,2].map(i=><div key={i} style={{ width:9,height:9,borderRadius:"50%",background:"#818CF8",animation:`dot-bounce 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}
                </div>
                <p style={{ fontSize:14, fontWeight:600, color:"#4361EE" }}>Zari is scoring your answer…</p>
                <p style={{ fontSize:12, color:"#A0AABF", marginTop:5 }}>Analyzing STAR structure, impact clarity, and coaching opportunities</p>
              </div>
            )}
            {!isScoring && (
            <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:18, padding:22, marginBottom:14, boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
                <p style={{ fontSize:14, fontWeight:700, color:"#0A0A0F" }}>Zari&apos;s feedback</p>
                <div style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 12px", borderRadius:99, background:"#F0FFF4", border:"1px solid #BBF7D0" }}>
                  <span style={{ fontSize:20, fontWeight:900, color:"#16A34A" }}>{feedback?.overallScore ?? 79}</span>
                  <span style={{ fontSize:11, color:"#16A34A", fontWeight:600 }}>/ 100</span>
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:18 }}>
                {(feedback?.dimensions ?? [
                  { label:"STAR Structure",   score:88 },
                  { label:"Evidence",         score:82 },
                  { label:"Impact clarity",   score:64 },
                  { label:"Concision",        score:58 },
                  { label:"Leadership signal",score:79 },
                  { label:"Stakeholder lens", score:74 },
                ]).map(s => {
                  const color = dimColor(s.score);
                  return (
                    <div key={s.label} style={{ background:"#FAFBFF", border:"1px solid #F1F5F9", borderRadius:10, padding:"10px 12px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                        <span style={{ fontSize:11.5, color:"#68738A" }}>{s.label}</span>
                        <span style={{ fontSize:13, fontWeight:800, color }}>{s.score}</span>
                      </div>
                      <Bar pct={s.score} color={color}/>
                    </div>
                  );
                })}
              </div>

              <div style={{ background:"#F5F7FF", borderRadius:12, padding:16, marginBottom:12 }}>
                <p style={{ fontSize:12, fontWeight:700, color:"#4361EE", marginBottom:6 }}>Coaching note from Zari</p>
                <p style={{ fontSize:13, color:"#3451D1", lineHeight:1.65 }}>{feedback?.coachNote ?? "Strong structure overall. The gap is in your Result — make it specific with a number, timeline, or business outcome. Panels score Result twice as heavily as the other components."}</p>
              </div>

              <div style={{ background:"#F0FFF4", borderRadius:12, padding:"12px 16px" }}>
                <p style={{ fontSize:12, fontWeight:700, color:"#16A34A", marginBottom:5 }}>Suggested Result statement</p>
                <p style={{ fontSize:12.5, color:"#14532D", lineHeight:1.6, fontStyle:"italic" }}>&ldquo;{feedback?.suggestedResult ?? "The outcome was delivered 2 weeks ahead of schedule, which unblocked the next sprint and directly contributed to the Q3 launch target."}&rdquo;</p>
              </div>
            </div>
            )}
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>{setSubmitted(false);setAnswer("");setFeedback(null);}} style={{ flex:1, fontSize:13.5, fontWeight:600, padding:"12px", borderRadius:12, border:"1px solid #E4E8F5", background:"white", color:"#0A0A0F", cursor:"pointer" }}>Try again</button>
              <button onClick={()=>{setQIdx(q=>(q+1)%QUESTIONS.length);setSubmitted(false);setAnswer("");setFeedback(null);}} style={{ flex:1, fontSize:13.5, fontWeight:700, padding:"12px", borderRadius:12, border:"none", background:"#4361EE", color:"white", cursor:"pointer", boxShadow:"0 4px 14px rgba(67,97,238,0.28)" }}>Next question →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: LINKEDIN
═══════════════════════════════════════════════════ */
type LICheck = { name: string; pass: boolean; detail: string };
type LISection = { score: number; verdict: string; rewrite: string | null; checks: LICheck[] };
type LinkedInResult = {
  overall: number;
  headline: LISection;
  summary: LISection;
  experience: LISection;
  education: LISection;
  other: LISection;
  keywords: { present: string[]; missing: string[] };
  missingKeywords: string[];
};

function ScreenLinkedIn({ stage }: { stage: CareerStage }) {
  type LINav = "score"|"headline"|"summary"|"experience"|"education"|"other"|"keywords";
  type InputMethod = "pdf"|"url";
  const [liSection,    setLISection]    = useState<LINav>("score");
  const [inputMode,    setInputMode]    = useState(true);
  const [inputMethod,  setInputMethod]  = useState<InputMethod|null>(null);
  const [urlInput,     setUrlInput]     = useState("");
  const [targetRole,   setTargetRole]   = useState("");
  const [dragOver,     setDragOver]     = useState(false);
  const [parseLoading, setParseLoading] = useState(false);
  const [loadingMsg,   setLoadingMsg]   = useState("");
  const [headline,     setHeadline]     = useState("");
  const [summary,      setSummary]      = useState("");
  const [experience,   setExperience]   = useState("");
  const [education,    setEducation]    = useState("");
  const [skills,       setSkills]       = useState("");
  const [linkedinUrl,  setLinkedinUrl]  = useState("");
  const [hasPhoto,     setHasPhoto]     = useState(false);
  const [result,       setResult]       = useState<LinkedInResult | null>(null);
  const [err,          setErr]          = useState("");
  const [previewTab,   setPreviewTab]   = useState<"current"|"rewritten">("current");
  const [expandedCheck,setExpandedCheck]= useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputMode(true); setInputMethod(null); setResult(null);
    setUrlInput(""); setTargetRole(""); setDragOver(false);
    setHeadline(""); setSummary(""); setExperience(""); setEducation("");
    setSkills(""); setLinkedinUrl(""); setHasPhoto(false); setErr("");
  }, [stage]);

  async function parseAndAnalyze(file?: File, url?: string) {
    if (parseLoading) return;
    setErr(""); setParseLoading(true);

    try {
      // Step 1: parse profile from file or URL
      setLoadingMsg("Extracting your profile…");
      let parsed: { headline:string; summary:string; experience:string; education:string; skills:string; linkedinUrl:string; hasPhoto:boolean } | null = null;

      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        const pr = await fetch("/api/zari/linkedin/parse-profile", { method:"POST", body:fd });
        const pd = await pr.json().catch(() => null);
        if (!pr.ok || !pd || pd.error) { setErr(pd?.error ?? "Could not read your file."); setParseLoading(false); return; }
        parsed = pd;
      } else if (url) {
        const pr = await fetch("/api/zari/linkedin/parse-profile", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ url }),
        });
        const pd = await pr.json().catch(() => null);
        if (!pr.ok || !pd || pd.error) { setErr(pd?.error ?? "Could not fetch that profile."); setParseLoading(false); return; }
        parsed = pd;
      }

      if (!parsed) { setErr("Nothing to analyze."); setParseLoading(false); return; }

      // Step 2: run review with extracted sections
      setLoadingMsg("Analyzing your profile…");
      const reviewRes = await fetch("/api/zari/linkedin/review", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          headline:   parsed.headline,
          summary:    parsed.summary,
          experience: parsed.experience,
          education:  parsed.education,
          skills:     parsed.skills,
          linkedinUrl:parsed.linkedinUrl || url || "",
          hasPhoto:   parsed.hasPhoto,
          targetRole,
        }),
      });
      const data = await reviewRes.json().catch(() => null) as LinkedInResult | null;
      if (data && (data.headline || data.summary)) {
        setHeadline(parsed.headline); setSummary(parsed.summary);
        setExperience(parsed.experience); setEducation(parsed.education);
        setSkills(parsed.skills); setLinkedinUrl(parsed.linkedinUrl || url || "");
        setHasPhoto(parsed.hasPhoto);
        setResult(data); setInputMode(false); setLISection("score");
      } else {
        setErr("Analysis failed — try again.");
      }
    } catch { setErr("Connection error — try again."); }
    setParseLoading(false); setLoadingMsg("");
  }

  function handleFile(f: File) {
    if (!f) return;
    const ext = f.name.toLowerCase();
    if (!ext.endsWith(".pdf") && f.type !== "application/pdf") {
      setErr("Please upload your LinkedIn profile as a PDF file.");
      return;
    }
    void parseAndAnalyze(f, undefined);
  }

  // ── Helpers ──
  function scoreColor(s: number): string {
    if (s >= 8) return "#16A34A";
    if (s >= 6) return "#0077B5";
    if (s >= 4) return "#D97706";
    return "#DC2626";
  }
  function scoreBg(s: number): string {
    if (s >= 8) return "rgba(22,163,74,0.15)";
    if (s >= 6) return "rgba(0,119,181,0.15)";
    if (s >= 4) return "rgba(217,119,6,0.15)";
    return "rgba(220,38,38,0.15)";
  }
  function verdictColor(v: string): string {
    if (v === "Perfect") return "#16A34A";
    if (v === "Good")    return "#0077B5";
    if (v === "Missing") return "#94A3B8";
    return "#D97706";
  }
  function verdictBg(v: string): string {
    if (v === "Perfect") return "#F0FFF4";
    if (v === "Good")    return "#EFF6FF";
    if (v === "Missing") return "#F8FAFC";
    return "#FFFBEB";
  }
  function overallLabel(s: number): string {
    if (s >= 85) return "Excellent";
    if (s >= 70) return "Good";
    if (s >= 55) return "Needs Work";
    return "Weak";
  }

  // ── INPUT STEP ──
  if (inputMode) return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#0A1628" }}>
      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept=".pdf" style={{ display:"none" }}
        onChange={e=>{ const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value=""; }}/>

      {/* Full-height centered layout */}
      <div style={{ minHeight:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px" }}>

        {/* Logo + title */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,#0077B5,#00A0DC)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", boxShadow:"0 8px 28px rgba(0,119,181,0.5)" }}>
            <svg viewBox="0 0 24 24" fill="white" style={{ width:26,height:26 }}><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H6.477v-7H9v7zM7.694 8.717c-.771 0-1.286-.514-1.286-1.2s.514-1.2 1.286-1.2c.771 0 1.286.514 1.286 1.2s-.514 1.2-1.286 1.2zM18 17h-2.442v-3.826c0-1.058-.651-1.302-1.044-1.302-.394 0-1.228.163-1.228 1.302V17h-2.557v-7h2.557v1.302c.325-.652 1.058-1.302 2.276-1.302C17.349 10 18 11.058 18 13.488V17z"/></svg>
          </div>
          <h1 style={{ fontSize:28, fontWeight:900, color:"white", letterSpacing:"-0.04em", marginBottom:8 }}>LinkedIn Profile Reviewer</h1>
          <p style={{ fontSize:14.5, color:"rgba(255,255,255,0.5)", maxWidth:440, margin:"0 auto", lineHeight:1.6 }}>
            Get a detailed score on every section — Headline, Summary, Experience, Education, and more — with AI rewrites.
          </p>
        </div>

        {/* Loading overlay */}
        {parseLoading && (
          <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:"36px 48px", textAlign:"center", maxWidth:380, width:"100%" }}>
            <div style={{ width:48, height:48, borderRadius:"50%", border:"3px solid rgba(0,119,181,0.3)", borderTopColor:"#0077B5", animation:"spin-slow 0.8s linear infinite", margin:"0 auto 20px" }}/>
            <p style={{ fontSize:16, fontWeight:700, color:"white", marginBottom:6 }}>{loadingMsg || "Processing…"}</p>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)" }}>This takes 10–20 seconds</p>
          </div>
        )}

        {!parseLoading && (
          <div style={{ width:"100%", maxWidth:680 }}>
            {err && (
              <div style={{ background:"rgba(220,38,38,0.1)", border:"1px solid rgba(220,38,38,0.3)", borderRadius:12, padding:"12px 16px", marginBottom:20, fontSize:13.5, color:"#FCA5A5", lineHeight:1.5 }}>
                {err}
              </div>
            )}

            {/* Two option cards */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>

              {/* PDF Upload card */}
              <div
                onClick={()=>{ if (!parseLoading) { setInputMethod("pdf"); setErr(""); fileInputRef.current?.click(); } }}
                onDragOver={e=>{ e.preventDefault(); setDragOver(true); setInputMethod("pdf"); }}
                onDragLeave={()=>setDragOver(false)}
                onDrop={e=>{ e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
                style={{ background:dragOver||inputMethod==="pdf"?"rgba(0,119,181,0.15)":"rgba(255,255,255,0.04)", border:`2px ${dragOver?"solid":"dashed"} ${dragOver||inputMethod==="pdf"?"#0077B5":"rgba(255,255,255,0.12)"}`, borderRadius:18, padding:"32px 24px", cursor:"pointer", textAlign:"center", transition:"all 0.15s" }}>
                <div style={{ width:52, height:52, borderRadius:14, background:"rgba(0,119,181,0.2)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0077B5" strokeWidth="1.8" style={{ width:26,height:26 }}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/>
                  </svg>
                </div>
                <p style={{ fontSize:16, fontWeight:800, color:"white", marginBottom:6 }}>Upload LinkedIn PDF</p>
                <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.6 }}>
                  Download your profile from LinkedIn and upload it here for automatic analysis
                </p>
                <div style={{ marginTop:14, display:"inline-flex", alignItems:"center", gap:6, fontSize:12, color:"#38BDF8", fontWeight:600 }}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:12,height:12}}><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>
                  Drop here or click to browse
                </div>
              </div>

              {/* URL card */}
              <div
                onClick={()=>{ if (!parseLoading) { setInputMethod("url"); setErr(""); } }}
                style={{ background:inputMethod==="url"?"rgba(0,119,181,0.15)":"rgba(255,255,255,0.04)", border:`2px solid ${inputMethod==="url"?"#0077B5":"rgba(255,255,255,0.12)"}`, borderRadius:18, padding:"32px 24px", cursor:"pointer", textAlign:"center", transition:"all 0.15s" }}>
                <div style={{ width:52, height:52, borderRadius:14, background:"rgba(0,119,181,0.2)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0077B5" strokeWidth="1.8" style={{ width:26,height:26 }}>
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                  </svg>
                </div>
                <p style={{ fontSize:16, fontWeight:800, color:"white", marginBottom:6 }}>Enter LinkedIn URL</p>
                <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.6 }}>
                  Paste your LinkedIn profile URL — requires a LinkedIn data API key configured on this server
                </p>
                <div style={{ marginTop:14, display:"inline-flex", alignItems:"center", gap:6, fontSize:12, color:"#38BDF8", fontWeight:600 }}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:12,height:12}}><path d="M6 3l5 5-5 5"/></svg>
                  linkedin.com/in/yourname
                </div>
              </div>
            </div>

            {/* URL input — shown when URL method selected */}
            {inputMethod==="url" && (
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"22px 24px", marginBottom:16 }}>
                <label style={{ fontSize:12.5, fontWeight:700, color:"rgba(255,255,255,0.6)", display:"block", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.07em" }}>Your LinkedIn Profile URL</label>
                <div style={{ display:"flex", gap:10 }}>
                  <input
                    autoFocus
                    style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.15)", borderRadius:10, padding:"12px 14px", fontSize:14, color:"white", outline:"none", fontFamily:"inherit" }}
                    placeholder="https://www.linkedin.com/in/yourname"
                    value={urlInput} onChange={e=>setUrlInput(e.target.value)}
                    onKeyDown={e=>{ if (e.key==="Enter" && urlInput.includes("linkedin")) void parseAndAnalyze(undefined, urlInput); }}/>
                  <button
                    onClick={()=>{ if (urlInput.includes("linkedin")) void parseAndAnalyze(undefined, urlInput); else setErr("Please enter a valid LinkedIn profile URL."); }}
                    disabled={!urlInput}
                    style={{ fontSize:13.5, fontWeight:700, padding:"12px 22px", borderRadius:10, border:"none", background:urlInput?"#0077B5":"rgba(255,255,255,0.08)", color:urlInput?"white":"rgba(255,255,255,0.3)", cursor:urlInput?"pointer":"default", whiteSpace:"nowrap" }}>
                    Analyze →
                  </button>
                </div>
              </div>
            )}

            {/* Target role field */}
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"16px 20px", display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ flexShrink:0 }}>
                <svg viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" style={{width:18,height:18}}><circle cx="10" cy="10" r="8"/><circle cx="10" cy="10" r="3"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="10" y1="16" x2="10" y2="18"/><line x1="2" y1="10" x2="4" y2="10"/><line x1="16" y1="10" x2="18" y2="10"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>Target Role <span style={{ fontWeight:400, textTransform:"none", letterSpacing:"normal" }}>(optional — improves keyword analysis)</span></p>
                <input
                  style={{ width:"100%", background:"transparent", border:"none", outline:"none", fontSize:14, color:"white", fontFamily:"inherit" }}
                  placeholder="e.g. Senior Software Engineer, Product Manager…"
                  value={targetRole} onChange={e=>setTargetRole(e.target.value)}/>
              </div>
            </div>

            {/* How to download tip */}
            <div style={{ marginTop:18, textAlign:"center" }}>
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.28)", lineHeight:1.7 }}>
                To download your LinkedIn PDF: LinkedIn.com → Me → Settings &amp; Privacy → Data Privacy → Get a copy of your data → select &quot;Profile&quot; → Request archive
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ── RESULTS STEP ──
  type SecKey = "headline"|"summary"|"experience"|"education"|"other";
  const secData: Record<SecKey, LISection | undefined> = {
    headline:   result?.headline,
    summary:    result?.summary,
    experience: result?.experience,
    education:  result?.education,
    other:      result?.other,
  };
  const secInputs: Record<SecKey, string> = {
    headline:   headline,
    summary:    summary,
    experience: experience,
    education:  education,
    other:      "",
  };
  const secDescriptions: Record<SecKey, string> = {
    headline:   "Your headline appears everywhere your name does — search results, connection requests, messages. It's your single most important SEO field.",
    summary:    "Your About section is your first-person pitch. Recruiters read it to understand who you are before scanning your experience.",
    experience: "Recruiters verify that your experience matches your headline. Strong bullets with metrics convert views into profile visits.",
    education:  "Education signals credibility and context. Even a minimal entry improves searchability and profile completeness.",
    other:      "These profile elements affect your visibility, credibility, and how complete LinkedIn considers your profile.",
  };

  const navItems: { id: LINav; label: string; score?: number }[] = [
    { id:"score",      label:"Overview" },
    { id:"headline",   label:"Headline",   score:result?.headline?.score },
    { id:"summary",    label:"Summary",    score:result?.summary?.score },
    { id:"experience", label:"Experience", score:result?.experience?.score },
    { id:"education",  label:"Education",  score:result?.education?.score },
    { id:"other",      label:"Other",      score:result?.other?.score },
    { id:"keywords",   label:"Keywords" },
  ];

  const activeSecKey: SecKey | null = (liSection !== "score" && liSection !== "keywords") ? liSection as SecKey : null;
  const activeSec = activeSecKey ? secData[activeSecKey] : null;
  const overall = result?.overall ?? 0;

  function renderChecks(checks: LICheck[]) {
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        {checks.map((c, i) => (
          <div key={i} style={{ borderRadius:10, border:`1px solid ${c.pass?"#E7F7EE":"#FEE2E2"}`, overflow:"hidden" }}>
            <div onClick={()=>setExpandedCheck(expandedCheck===i?null:i)}
              style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:c.pass?"#F7FDF9":"#FFF8F8", cursor:"pointer" }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:c.pass?"#DCFCE7":"#FEE2E2", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {c.pass
                  ? <svg viewBox="0 0 16 16" fill="none" style={{width:12,height:12}}><path d="M3 8l3.5 3.5L13 5" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg viewBox="0 0 16 16" fill="none" style={{width:11,height:11}}><path d="M4 4l8 8M12 4l-8 8" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round"/></svg>
                }
              </div>
              <span style={{ flex:1, fontSize:13.5, fontWeight:600, color:"#0F172A" }}>{c.name}</span>
              <svg viewBox="0 0 16 16" fill="none" stroke="#CBD5E1" strokeWidth="1.8"
                style={{ width:14,height:14,flexShrink:0,transform:expandedCheck===i?"rotate(180deg)":"none",transition:"transform 0.15s" }}>
                <path d="M3 6l5 5 5-5"/>
              </svg>
            </div>
            {expandedCheck===i && (
              <div style={{ padding:"10px 16px 14px 52px", fontSize:13, color:"#475569", lineHeight:1.65, background:"white", borderTop:`1px solid ${c.pass?"#E7F7EE":"#FEE2E2"}` }}>
                {c.detail}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ height:"calc(100vh - 56px)", display:"flex", overflow:"hidden" }}>

      {/* ── Left sidebar ── */}
      <div style={{ width:210, background:"#0F1929", flexShrink:0, display:"flex", flexDirection:"column", overflowY:"auto" }}>
        {/* Score ring */}
        <div style={{ padding:"24px 16px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)", textAlign:"center" }}>
          <div style={{ position:"relative", width:84, height:84, margin:"0 auto 10px" }}>
            <svg width={84} height={84} viewBox="0 0 84 84">
              <circle cx={42} cy={42} r={34} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={7}/>
              <circle cx={42} cy={42} r={34} fill="none"
                stroke={overall>=75?"#22C55E":overall>=55?"#38BDF8":"#FBBF24"}
                strokeWidth={7} strokeLinecap="round"
                strokeDasharray={2*Math.PI*34}
                strokeDashoffset={2*Math.PI*34*(1-overall/100)}
                transform="rotate(-90 42 42)"/>
            </svg>
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:24, fontWeight:900, color:"white", lineHeight:1 }}>{overall}</span>
              <span style={{ fontSize:8.5, color:"rgba(255,255,255,0.4)", fontWeight:700, letterSpacing:"0.08em", marginTop:1 }}>/ 100</span>
            </div>
          </div>
          <div style={{ fontSize:12, fontWeight:700, padding:"3px 14px", borderRadius:99, display:"inline-block",
            background:overall>=75?"rgba(34,197,94,0.18)":overall>=55?"rgba(56,189,248,0.18)":"rgba(251,191,36,0.18)",
            color:overall>=75?"#86EFAC":overall>=55?"#7DD3FC":"#FDE68A" }}>
            {overallLabel(overall)}
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ padding:"10px 8px", flex:1 }}>
          {navItems.map(item => {
            const active = liSection === item.id;
            return (
              <button key={item.id} onClick={()=>{ setLISection(item.id); setExpandedCheck(null); }}
                style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 12px", borderRadius:9, border:"none", background:active?"rgba(0,119,181,0.25)":"transparent", cursor:"pointer", marginBottom:1, transition:"background 0.12s" }}>
                <span style={{ fontSize:13, fontWeight:active?700:400, color:active?"white":"rgba(255,255,255,0.5)", letterSpacing:active?"-0.01em":"normal" }}>
                  {item.label}
                </span>
                {item.score !== undefined && (
                  <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:99,
                    background:scoreBg(item.score),
                    color:scoreColor(item.score),
                    minWidth:32, textAlign:"center" }}>
                    {item.score}/10
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ padding:"10px 8px 14px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={()=>setInputMode(true)}
            style={{ width:"100%", fontSize:12, fontWeight:600, padding:"9px", borderRadius:9, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:"rgba(255,255,255,0.4)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:12,height:12}}><path d="M10 3L5 8l5 5"/></svg>
            Re-analyze
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ flex:1, overflowY:"auto", background:"#F4F7FB", padding:"28px 30px" }}>

        {/* OVERVIEW */}
        {liSection==="score" && (
          <>
            <div style={{ marginBottom:22 }}>
              <h2 style={{ fontSize:22, fontWeight:900, color:"#0F172A", letterSpacing:"-0.03em", marginBottom:4 }}>Profile Overview</h2>
              <p style={{ fontSize:13.5, color:"#64748B" }}>Here&apos;s how your LinkedIn profile scores. Click any section to see the full breakdown and AI rewrite.</p>
            </div>

            {/* Score card + quick wins */}
            <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:16, marginBottom:16 }}>
              <div style={{ background:"white", borderRadius:16, padding:"22px 20px", boxShadow:"0 2px 12px rgba(0,0,0,0.05)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                <div style={{ position:"relative", width:110, height:110, marginBottom:12 }}>
                  <svg width={110} height={110} viewBox="0 0 110 110">
                    <circle cx={55} cy={55} r={44} fill="none" stroke="#F1F5F9" strokeWidth={9}/>
                    <circle cx={55} cy={55} r={44} fill="none"
                      stroke={overall>=75?"#16A34A":overall>=55?"#0077B5":"#D97706"}
                      strokeWidth={9} strokeLinecap="round"
                      strokeDasharray={2*Math.PI*44}
                      strokeDashoffset={2*Math.PI*44*(1-overall/100)}
                      transform="rotate(-90 55 55)"/>
                  </svg>
                  <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:30, fontWeight:900, color:overall>=75?"#16A34A":overall>=55?"#0077B5":"#D97706", lineHeight:1 }}>{overall}</span>
                    <span style={{ fontSize:11, color:"#94A3B8", fontWeight:600, marginTop:2 }}>out of 100</span>
                  </div>
                </div>
                <div style={{ fontSize:13, fontWeight:800, padding:"5px 16px", borderRadius:99, border:`1.5px solid ${overall>=75?"#BBF7D0":overall>=55?"#BFDBFE":"#FDE68A"}`, color:overall>=75?"#16A34A":overall>=55?"#0077B5":"#D97706", background:overall>=75?"#F0FFF4":overall>=55?"#EFF6FF":"#FFFBEB" }}>
                  {overallLabel(overall)}
                </div>
                <p style={{ fontSize:11.5, color:"#94A3B8", marginTop:10, textAlign:"center", lineHeight:1.5 }}>Aim for 85+ to stand out to recruiters</p>
              </div>

              <div style={{ background:"white", borderRadius:16, padding:"20px 22px", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
                <p style={{ fontSize:12, fontWeight:800, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>Priority Fixes</p>
                {(["headline","summary","experience","education","other"] as SecKey[]).filter(k => {
                  const s = secData[k];
                  return s && s.verdict !== "Perfect" && s.verdict !== "Good";
                }).slice(0,4).map(k => {
                  const s = secData[k]!;
                  const failCount = s.checks.filter(c=>!c.pass).length;
                  return (
                    <div key={k} onClick={()=>{ setLISection(k); setExpandedCheck(null); }}
                      style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", border:"1px solid #F1F5F9", borderRadius:10, marginBottom:8, cursor:"pointer", background:"#FAFBFF", transition:"background 0.12s" }}>
                      <div style={{ width:34, height:34, borderRadius:9, background:scoreBg(s.score), display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <span style={{ fontSize:14, fontWeight:900, color:scoreColor(s.score) }}>{s.score}</span>
                      </div>
                      <div style={{ flex:1 }}>
                        <p style={{ fontSize:13, fontWeight:700, color:"#0F172A", textTransform:"capitalize" }}>{k}</p>
                        <p style={{ fontSize:11.5, color:"#94A3B8", marginTop:1 }}>{failCount} check{failCount!==1?"s":""} failed</p>
                      </div>
                      <span style={{ fontSize:12, fontWeight:700, color:"#0077B5" }}>Fix →</span>
                    </div>
                  );
                })}
                {(["headline","summary","experience","education","other"] as SecKey[]).every(k => !secData[k] || secData[k]!.verdict === "Perfect" || secData[k]!.verdict === "Good") && (
                  <p style={{ fontSize:13.5, color:"#16A34A", fontWeight:600 }}>All sections are in good shape.</p>
                )}
              </div>
            </div>

            {/* Full breakdown */}
            <div style={{ background:"white", borderRadius:16, padding:"20px 22px", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
              <p style={{ fontSize:12, fontWeight:800, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:16 }}>Section Scores</p>
              {(["headline","summary","experience","education","other"] as SecKey[]).map(k => {
                const s = secData[k];
                if (!s) return null;
                return (
                  <div key={k} style={{ marginBottom:16, cursor:"pointer" }} onClick={()=>{ setLISection(k); setExpandedCheck(null); }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                        <span style={{ fontSize:13.5, fontWeight:700, color:"#0F172A", textTransform:"capitalize" }}>{k}</span>
                        <span style={{ fontSize:11, fontWeight:700, padding:"2px 9px", borderRadius:99, background:verdictBg(s.verdict), color:verdictColor(s.verdict) }}>{s.verdict}</span>
                      </div>
                      <span style={{ fontSize:13, fontWeight:800, color:scoreColor(s.score) }}>{s.score}/10</span>
                    </div>
                    <div style={{ height:6, borderRadius:99, background:"#F1F5F9", overflow:"hidden" }}>
                      <div style={{ width:`${s.score*10}%`, height:"100%", borderRadius:99, background:scoreColor(s.score), transition:"width 1s ease" }}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* SECTION DETAIL */}
        {activeSec && activeSecKey && (
          <>
            {/* Section header */}
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:20, marginBottom:20 }}>
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:"#0F172A", letterSpacing:"-0.03em", marginBottom:5, textTransform:"capitalize" }}>{activeSecKey}</h2>
                <p style={{ fontSize:13.5, color:"#64748B", lineHeight:1.6, maxWidth:480 }}>{secDescriptions[activeSecKey]}</p>
              </div>
              <div style={{ flexShrink:0, textAlign:"center" }}>
                <div style={{ position:"relative", width:74, height:74 }}>
                  <svg width={74} height={74} viewBox="0 0 74 74">
                    <circle cx={37} cy={37} r={29} fill="none" stroke="#F1F5F9" strokeWidth={7}/>
                    <circle cx={37} cy={37} r={29} fill="none" stroke={scoreColor(activeSec.score)} strokeWidth={7} strokeLinecap="round"
                      strokeDasharray={2*Math.PI*29} strokeDashoffset={2*Math.PI*29*(1-activeSec.score/10)} transform="rotate(-90 37 37)"/>
                  </svg>
                  <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:21, fontWeight:900, color:scoreColor(activeSec.score), lineHeight:1 }}>{activeSec.score}</span>
                    <span style={{ fontSize:8, color:"#94A3B8" }}>/ 10</span>
                  </div>
                </div>
                <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99, background:verdictBg(activeSec.verdict), color:verdictColor(activeSec.verdict), display:"inline-block", marginTop:5 }}>
                  {activeSec.verdict}
                </span>
              </div>
            </div>

            {/* Core Checks */}
            <div style={{ background:"white", borderRadius:16, padding:"20px 22px", marginBottom:16, boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <p style={{ fontSize:12, fontWeight:800, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.07em" }}>Core Checks</p>
                <div style={{ display:"flex", gap:10, fontSize:11.5, fontWeight:600 }}>
                  <span style={{ color:"#16A34A" }}>✓ {activeSec.checks.filter(c=>c.pass).length} passed</span>
                  <span style={{ color:"#DC2626" }}>✗ {activeSec.checks.filter(c=>!c.pass).length} failed</span>
                </div>
              </div>
              {renderChecks(activeSec.checks)}
            </div>

            {/* AI Coach — only for sections that have a rewrite */}
            {activeSec.rewrite && (
              <div style={{ background:"white", borderRadius:16, padding:"20px 22px", boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#667EEA,#764BA2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg viewBox="0 0 16 16" fill="white" style={{width:14,height:14}}><path d="M8 1l1.5 3.5L13 6l-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-1.5L8 1z"/></svg>
                  </div>
                  <p style={{ fontSize:15, fontWeight:800, color:"#0F172A" }}>AI Coach — Optimized Rewrite</p>
                </div>
                <p style={{ fontSize:13, color:"#64748B", marginBottom:16 }}>Zari rewrote your {activeSecKey} to be stronger, more keyword-rich, and recruiter-optimized.</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div style={{ background:"#FAFBFF", borderRadius:12, padding:"14px 16px", border:"1px solid #E8EDF5" }}>
                    <p style={{ fontSize:10.5, fontWeight:800, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Current Version</p>
                    <p style={{ fontSize:13, color:"#475569", lineHeight:1.7, whiteSpace:"pre-wrap" }}>
                      {secInputs[activeSecKey] || "(not provided)"}
                    </p>
                  </div>
                  <div style={{ background:"linear-gradient(160deg,#F0FFF8,#F0F7FF)", borderRadius:12, padding:"14px 16px", border:"1px solid #C6F0DC" }}>
                    <p style={{ fontSize:10.5, fontWeight:800, color:"#0077B5", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Zari&apos;s Rewrite</p>
                    <p style={{ fontSize:13, color:"#0F172A", lineHeight:1.7, fontWeight:500, whiteSpace:"pre-wrap" }}>{activeSec.rewrite}</p>
                  </div>
                </div>
                <div style={{ display:"flex", gap:10, marginTop:14 }}>
                  <button onClick={()=>{ try { void navigator.clipboard.writeText(activeSec.rewrite ?? ""); } catch { /**/ } }}
                    style={{ fontSize:13, fontWeight:700, padding:"10px 20px", borderRadius:10, border:"none", background:"#0077B5", color:"white", cursor:"pointer", boxShadow:"0 4px 14px rgba(0,119,181,0.3)", display:"flex", alignItems:"center", gap:7 }}>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13}}><rect x="5" y="2" width="9" height="12" rx="2"/><path d="M3 4H2a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-1"/></svg>
                    Copy rewrite
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* KEYWORDS */}
        {liSection==="keywords" && (
          <>
            <div style={{ marginBottom:20 }}>
              <h2 style={{ fontSize:22, fontWeight:900, color:"#0F172A", letterSpacing:"-0.03em", marginBottom:4 }}>Keywords</h2>
              <p style={{ fontSize:13.5, color:"#64748B" }}>The right keywords make you appear in recruiter searches. Adding missing ones can dramatically increase profile views.</p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
              <div style={{ background:"white", borderRadius:16, padding:"20px 22px", boxShadow:"0 2px 10px rgba(0,0,0,0.05)", border:"1px solid #E7F7EE" }}>
                <p style={{ fontSize:12, fontWeight:800, color:"#16A34A", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>Found in your profile</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {(result?.keywords?.present ?? []).map(k => (
                    <span key={k} style={{ fontSize:12.5, fontWeight:600, padding:"5px 13px", borderRadius:99, background:"#F0FFF4", color:"#15803D", border:"1px solid #BBF7D0" }}>{k}</span>
                  ))}
                  {!(result?.keywords?.present?.length) && <p style={{ fontSize:13, color:"#94A3B8" }}>No strong keywords detected.</p>}
                </div>
              </div>
              <div style={{ background:"white", borderRadius:16, padding:"20px 22px", boxShadow:"0 2px 10px rgba(0,0,0,0.05)", border:"1px solid #FEE2E2" }}>
                <p style={{ fontSize:12, fontWeight:800, color:"#DC2626", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>Missing — add these now</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {(result?.keywords?.missing ?? []).map(k => (
                    <span key={k} style={{ fontSize:12.5, fontWeight:600, padding:"5px 13px", borderRadius:99, background:"#FFF8F8", color:"#DC2626", border:"1px solid #FECACA" }}>{k}</span>
                  ))}
                  {!(result?.keywords?.missing?.length) && <p style={{ fontSize:13, color:"#94A3B8" }}>No critical gaps found.</p>}
                </div>
              </div>
            </div>

            {(result?.missingKeywords ?? []).length > 0 && (
              <div style={{ background:"white", borderRadius:16, padding:"20px 22px", boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
                <p style={{ fontSize:12, fontWeight:800, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>Keywords to add</p>
                <p style={{ fontSize:13, color:"#64748B", marginBottom:14 }}>These appear in similar job postings and would improve your match rate.</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {(result?.missingKeywords ?? []).map(k => (
                    <span key={k} style={{ fontSize:12.5, fontWeight:600, padding:"5px 14px", borderRadius:99, background:"#EFF6FF", color:"#1D4ED8", border:"1px solid #BFDBFE" }}>{k}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Right preview panel ── */}
      <div style={{ width:280, flexShrink:0, borderLeft:"1px solid #E8EDF5", background:"white", overflowY:"auto", display:"flex", flexDirection:"column" }}>
        {/* Tab switcher */}
        <div style={{ padding:"14px 14px 10px", borderBottom:"1px solid #F1F5F9" }}>
          <p style={{ fontSize:10.5, fontWeight:800, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Profile Preview</p>
          <div style={{ display:"flex", gap:3, background:"#F1F5F9", borderRadius:8, padding:3 }}>
            {(["current","rewritten"] as const).map(t => (
              <button key={t} onClick={()=>setPreviewTab(t)}
                style={{ flex:1, fontSize:11.5, fontWeight:600, padding:"5px 6px", borderRadius:6, border:"none", background:previewTab===t?"white":"transparent", color:previewTab===t?"#0F172A":"#68738A", cursor:"pointer", boxShadow:previewTab===t?"0 1px 4px rgba(0,0,0,0.1)":"none", textTransform:"capitalize" }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex:1, padding:"14px 14px 20px", overflowY:"auto" }}>
          {/* LinkedIn profile card */}
          <div style={{ border:"1px solid #E8EDF5", borderRadius:12, overflow:"hidden", marginBottom:12, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
            {/* Banner */}
            <div style={{ height:52, background:"linear-gradient(135deg,#004471,#0077B5,#00A0DC)", position:"relative" }}>
              {previewTab==="rewritten" && <span style={{ position:"absolute", top:6, right:8, fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:99, background:"rgba(34,197,94,0.9)", color:"white" }}>Optimized</span>}
            </div>
            <div style={{ padding:"28px 12px 12px", position:"relative", background:"white" }}>
              <div style={{ width:48, height:48, borderRadius:"50%", background:hasPhoto?"#DCFCE7":"#F1F5F9", border:"3px solid white", position:"absolute", top:-24, left:12, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 6px rgba(0,0,0,0.12)" }}>
                {hasPhoto
                  ? <svg viewBox="0 0 24 24" fill="#16A34A" style={{width:22,height:22}}><path d="M12 12c2.67 0 4.8-2.13 4.8-4.8S14.67 2.4 12 2.4 7.2 4.53 7.2 7.2 9.33 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                  : <svg viewBox="0 0 24 24" fill="#CBD5E1" style={{width:22,height:22}}><path d="M12 12c2.67 0 4.8-2.13 4.8-4.8S14.67 2.4 12 2.4 7.2 4.53 7.2 7.2 9.33 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                }
              </div>
              <p style={{ fontSize:13, fontWeight:800, color:"#0F172A", marginBottom:4 }}>Your Name</p>
              <p style={{ fontSize:11.5, color:"#475569", lineHeight:1.55, marginBottom:hasPhoto?0:4 }}>
                {previewTab==="current"
                  ? (headline || <span style={{color:"#CBD5E1",fontStyle:"italic"}}>Headline will appear here</span>)
                  : (result?.headline?.rewrite || headline || <span style={{color:"#CBD5E1",fontStyle:"italic"}}>Rewritten headline</span>)
                }
              </p>
              {!hasPhoto && <p style={{ fontSize:10, color:"#DC2626", marginTop:3 }}>No photo — add one for 21× more views</p>}
            </div>
          </div>

          {/* About section */}
          <div style={{ border:"1px solid #E8EDF5", borderRadius:12, padding:"12px 12px", marginBottom:10, background:"white" }}>
            <p style={{ fontSize:10.5, fontWeight:800, color:"#0F172A", marginBottom:6 }}>About</p>
            <p style={{ fontSize:11.5, color:"#475569", lineHeight:1.65, maxHeight:110, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:6, WebkitBoxOrient:"vertical" }}>
              {previewTab==="current"
                ? (summary || <span style={{color:"#CBD5E1",fontStyle:"italic"}}>Your About section…</span>)
                : (result?.summary?.rewrite || summary || <span style={{color:"#CBD5E1",fontStyle:"italic"}}>Rewritten About…</span>)}
            </p>
            {previewTab==="rewritten" && result?.summary?.rewrite && (
              <p style={{ fontSize:10, color:"#16A34A", fontWeight:700, marginTop:6 }}>✓ Optimized by Zari</p>
            )}
          </div>

          {/* Experience section */}
          <div style={{ border:"1px solid #E8EDF5", borderRadius:12, padding:"12px 12px", background:"white" }}>
            <p style={{ fontSize:10.5, fontWeight:800, color:"#0F172A", marginBottom:6 }}>Experience</p>
            <p style={{ fontSize:11.5, color:"#475569", lineHeight:1.65, maxHeight:90, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:5, WebkitBoxOrient:"vertical" }}>
              {previewTab==="current"
                ? (experience || <span style={{color:"#CBD5E1",fontStyle:"italic"}}>Your experience…</span>)
                : (result?.experience?.rewrite || experience || <span style={{color:"#CBD5E1",fontStyle:"italic"}}>Rewritten experience…</span>)}
            </p>
            {previewTab==="rewritten" && result?.experience?.rewrite && (
              <p style={{ fontSize:10, color:"#16A34A", fontWeight:700, marginTop:6 }}>✓ Optimized by Zari</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: DOCUMENTS — drag-drop vault
═══════════════════════════════════════════════════ */
function ScreenDocuments() {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  function handleDrop() {
    setDragging(false);
    setUploading(true);
    setTimeout(() => setUploading(false), 2000);
  }

  return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:840, margin:"0 auto", padding:28 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22 }}>
          <div>
            <h1 style={{ fontSize:22, fontWeight:900, letterSpacing:"-0.03em", color:"#0A0A0F", marginBottom:4 }}>My Documents</h1>
            <p style={{ fontSize:13, color:"#68738A" }}>Zari uses these automatically in every session — always up to date</p>
          </div>
          <button style={{ fontSize:13, fontWeight:700, padding:"9px 18px", borderRadius:10, border:"none", background:"#4361EE", color:"white", cursor:"pointer", display:"flex", alignItems:"center", gap:7, boxShadow:"0 4px 14px rgba(67,97,238,0.28)" }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:14,height:14 }}><path d="M10 3v12M4 9l6-6 6 6"/></svg>
            Upload document
          </button>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={e=>{e.preventDefault();setDragging(true);}}
          onDragLeave={()=>setDragging(false)}
          onDrop={e=>{e.preventDefault();handleDrop();}}
          style={{ border:`2px dashed ${dragging?"#4361EE":"#CBD5E1"}`, borderRadius:18, padding:40, textAlign:"center", marginBottom:22, cursor:"pointer", background:dragging?"#EEF2FF":"white", transition:"all 0.2s", position:"relative" }}
        >
          {uploading ? (
            <div>
              <div style={{ width:44, height:44, borderRadius:12, background:"#EEF2FF", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", animation:"sphere-breathe 1s ease-in-out infinite" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#4361EE" strokeWidth="1.8" style={{ width:22,height:22,animation:"spin-slow 1.5s linear infinite" }}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              </div>
              <p style={{ fontSize:14, fontWeight:600, color:"#4361EE" }}>Uploading &amp; indexing…</p>
            </div>
          ) : (
            <>
              <div style={{ width:44, height:44, borderRadius:12, background:"#F5F7FF", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#4361EE" strokeWidth="1.8" style={{ width:22,height:22 }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <p style={{ fontSize:14, fontWeight:600, color:"#0A0A0F", marginBottom:4 }}>Drop resume, cover letter, or LinkedIn export here</p>
              <p style={{ fontSize:12.5, color:"#A0AABF" }}>PDF · DOCX · TXT · LinkedIn PDF export</p>
            </>
          )}
        </div>

        {/* File list */}
        {[
          { name:"Resume_PM_v3.pdf",           type:"Resume",        size:"82 KB", date:"Today",      score:89, color:"#4361EE", bg:"#EEF2FF", status:"Analyzed · Used in 5 sessions" },
          { name:"LinkedIn_profile_export.pdf", type:"LinkedIn",      size:"34 KB", date:"2 days ago", score:91, color:"#16A34A", bg:"#F0FFF4", status:"Analyzed · Optimized" },
          { name:"Cover_letter_Notion.docx",    type:"Cover letter",  size:"12 KB", date:"Last week",  score:null, color:"#8B5CF6", bg:"#F5F3FF", status:"Indexed · Not reviewed yet" },
        ].map(doc => (
          <div key={doc.name} style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:14, padding:"14px 18px", marginBottom:10, display:"flex", alignItems:"center", gap:14, boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ width:44, height:44, borderRadius:12, background:doc.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={doc.color} strokeWidth="1.8" style={{ width:20,height:20 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:13.5, fontWeight:700, color:"#0A0A0F", marginBottom:2 }}>{doc.name}</p>
              <p style={{ fontSize:11, color:"#68738A" }}>{doc.type} · {doc.size} · {doc.date} · {doc.status}</p>
            </div>
            {doc.score && (
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                <ScoreRing score={doc.score} color={doc.color} size={44}/>
              </div>
            )}
            <div style={{ display:"flex", gap:7 }}>
              <button style={{ fontSize:11.5, fontWeight:600, padding:"6px 12px", borderRadius:8, border:"1px solid #E4E8F5", background:"white", color:"#68738A", cursor:"pointer" }}>View</button>
              <button style={{ fontSize:11.5, fontWeight:600, padding:"6px 12px", borderRadius:8, border:"none", background:"#4361EE", color:"white", cursor:"pointer" }}>Review with Zari</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const STAGE_TASKS: Record<CareerStage, { text:string; cat:string; pri:string }[]> = {
  "job-search": [
    { text:"Reframe supply chain project as a product initiative in resume",       cat:"Resume",     pri:"high" },
    { text:"Write 3 STAR stories highlighting cross-functional influence",         cat:"Interview",  pri:"high" },
    { text:"Update LinkedIn headline to product-focused positioning",              cat:"LinkedIn",   pri:"high" },
    { text:"Add 8 missing PM keywords to LinkedIn profile",                        cat:"LinkedIn",   pri:"med"  },
    { text:"Apply to 3 target Senior PM roles at Series B–D tech companies",       cat:"Job Search", pri:"high" },
    { text:"Practice the 'stakeholder resistance' question until score ≥ 85",      cat:"Interview",  pri:"high" },
    { text:"Research top 5 target companies — build tailored talking points",      cat:"Job Search", pri:"med"  },
    { text:"Book follow-up session to practice PM case interview",                 cat:"Session",    pri:"low"  },
  ],
  "promotion": [
    { text:"Document 3 scope-expansion stories with business impact numbers",      cat:"Case",       pri:"high" },
    { text:"Identify 2 executive sponsors and schedule a 30-min conversation",     cat:"Sponsorship",pri:"high" },
    { text:"Write the promotion self-review draft with Zari's framework",          cat:"Docs",       pri:"high" },
    { text:"Practice the manager promotion pitch until it flows naturally",        cat:"Session",    pri:"high" },
    { text:"Map your work to the next-level rubric — identify remaining gaps",     cat:"Planning",   pri:"med"  },
    { text:"Get a written recommendation from your cross-functional stakeholder",  cat:"Sponsorship",pri:"med"  },
    { text:"Schedule the formal promotion conversation with your manager",         cat:"Milestone",  pri:"low"  },
  ],
  "salary": [
    { text:"Research market rate on Levels.fyi, Glassdoor, and Blind",            cat:"Research",   pri:"high" },
    { text:"Build your value case: 3 impact stories with dollar/% outcomes",      cat:"Preparation",pri:"high" },
    { text:"Practice the ask conversation with Zari — role-play 3 scenarios",     cat:"Session",    pri:"high" },
    { text:"Prepare counter-offer response for 3 likely pushbacks",               cat:"Preparation",pri:"med"  },
    { text:"Write the salary ask email draft for async negotiation",              cat:"Docs",       pri:"med"  },
    { text:"Decide your walk-away number and alternatives (competing offer etc.)", cat:"Planning",   pri:"med"  },
  ],
  "career-change": [
    { text:"Rewrite resume to lead with transferable skills for new industry",     cat:"Resume",     pri:"high" },
    { text:"Build your 'why I'm switching' narrative — practice out loud 5x",     cat:"Interview",  pri:"high" },
    { text:"Target 10 roles that are transition-friendly (no 'must have X years')",cat:"Job Search", pri:"high" },
    { text:"Update LinkedIn to signal the new direction clearly",                  cat:"LinkedIn",   pri:"high" },
    { text:"Identify 3 people in target industry for informational interviews",    cat:"Network",    pri:"med"  },
    { text:"Complete 1 relevant project or course to show commitment to pivot",    cat:"Skills",     pri:"med"  },
    { text:"Draft a cover letter narrative that connects past to future clearly",   cat:"Docs",       pri:"low"  },
  ],
  "leadership": [
    { text:"Define your leadership brand: 3 words your team would use about you",  cat:"Brand",      pri:"high" },
    { text:"Practice the board presentation — time it, cut what's over 12 min",   cat:"Session",    pri:"high" },
    { text:"Write 2 strategic leadership stories using the SPEAR framework",       cat:"Narrative",  pri:"high" },
    { text:"Get skip-level feedback on communication clarity (ask directly)",      cat:"Feedback",   pri:"med"  },
    { text:"Identify 3 ways you can create more visibility with senior leadership",cat:"Visibility", pri:"med"  },
    { text:"Restructure 1 recurring update email to lead with insight not status", cat:"Comms",      pri:"med"  },
    { text:"Book a session to practice the difficult conversation you're avoiding",cat:"Session",    pri:"low"  },
  ],
};

/* ═══════════════════════════════════════════════════
   SCREEN: ACTION PLAN
═══════════════════════════════════════════════════ */
type PlanTask = { text: string; cat: string; pri: string };

function ScreenPlan({ stage }: { stage: CareerStage }) {
  const [done,        setDone]        = useState<Set<number>>(new Set([0]));
  const [aiTasks,     setAiTasks]     = useState<PlanTask[] | null>(null);
  const [aiCoachNote, setAiCoachNote] = useState<string | null>(null);
  const [planLoading, setPlanLoading] = useState(false);

  // Fetch AI plan on mount / stage change
  useEffect(() => {
    setDone(new Set([0]));
    setAiTasks(null);
    setAiCoachNote(null);
    setPlanLoading(true);
    fetch("/api/zari/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    })
      .then(r => r.json())
      .then((data: { tasks?: PlanTask[]; coachNote?: string }) => {
        if (data.tasks?.length) {
          setAiTasks(data.tasks);
          setAiCoachNote(data.coachNote ?? null);
        }
      })
      .catch(() => { /* fall back to static tasks */ })
      .finally(() => setPlanLoading(false));
  }, [stage]);

  const TASKS = aiTasks ?? STAGE_TASKS[stage];
  const pct = Math.round((done.size/TASKS.length)*100);

  return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:800, margin:"0 auto", padding:28 }}>
        {planLoading && (
          <div style={{ display:"flex", alignItems:"center", gap:10, background:"#EEF2FF", border:"1px solid rgba(67,97,238,0.2)", borderRadius:12, padding:"12px 16px", marginBottom:18, fontSize:13, color:"#4361EE", fontWeight:600 }}>
            <span style={{ width:14,height:14,borderRadius:"50%",border:"2px solid rgba(67,97,238,0.3)",borderTopColor:"#4361EE",animation:"spin-slow 0.7s linear infinite",display:"block",flexShrink:0 }}/>
            Zari is generating your personalized plan…
          </div>
        )}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:22, flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <h1 style={{ fontSize:22, fontWeight:900, letterSpacing:"-0.03em", color:"#0A0A0F", margin:0 }}>Action Plan</h1>
              <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:99, background: STAGE_META[stage].bg, color: STAGE_META[stage].color, border:`1px solid ${STAGE_META[stage].color}30` }}>{STAGE_ICONS[stage]} {STAGE_META[stage].label}</span>
              {aiTasks && <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:99, background:"#F0FFF4", color:"#16A34A", border:"1px solid #BBF7D0" }}>AI-generated</span>}
            </div>
            <p style={{ fontSize:13, color:"#68738A" }}>Zari personalizes this based on your profile and session history</p>
          </div>
          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:12, padding:"10px 18px", display:"flex", gap:16, alignItems:"center" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:900, color:"#4361EE" }}>{done.size}</div>
              <div style={{ fontSize:10, color:"#A0AABF" }}>Done</div>
            </div>
            <div style={{ width:1, height:32, background:"#E4E8F5" }}/>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:900, color:"#0A0A0F" }}>{TASKS.length - done.size}</div>
              <div style={{ fontSize:10, color:"#A0AABF" }}>Remaining</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:20, marginBottom:20, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
            <span style={{ fontSize:14, fontWeight:700, color:"#0A0A0F" }}>Your progress</span>
            <span style={{ fontSize:14, fontWeight:800, color:"#4361EE" }}>{pct}%</span>
          </div>
          <Bar pct={pct} color="#4361EE" h={10}/>
          <div style={{ display:"flex", gap:14, marginTop:10 }}>
            {["high","med","low"].map(p => {
              const total = TASKS.filter(t=>t.pri===p).length;
              const doneC = TASKS.filter((t,i)=>t.pri===p&&done.has(i)).length;
              return <span key={p} style={{ fontSize:11.5, color:"#68738A" }}>
                <strong style={{ color:p==="high"?"#DC2626":p==="med"?"#D97706":"#4361EE" }}>{doneC}/{total}</strong> {p} priority
              </span>;
            })}
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {TASKS.map((task, i) => {
            const isDone = done.has(i);
            const pc = task.pri==="high"?"#DC2626":task.pri==="med"?"#D97706":"#4361EE";
            const pb = task.pri==="high"?"#FEF2F2":task.pri==="med"?"#FFF7ED":"#EEF2FF";
            return (
              <button key={i} onClick={()=>setDone(d=>{const n=new Set(d);n.has(i)?n.delete(i):n.add(i);return n;})}
                style={{ display:"flex", alignItems:"center", gap:12, background:"white", border:`1px solid ${isDone?"#BBF7D0":"#E4E8F5"}`, borderRadius:14, padding:"12px 16px", cursor:"pointer", textAlign:"left", transition:"all 0.15s" }}>
                <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${isDone?"#16A34A":"#CBD5E1"}`, background:isDone?"#F0FFF4":"white", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {isDone && <svg viewBox="0 0 12 12" fill="none" style={{ width:10,height:10 }}><path d="M1.5 6l3 3 6-6" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round"/></svg>}
                </div>
                <span style={{ flex:1, fontSize:13.5, color:isDone?"#A0AABF":"#0A0A0F", textDecoration:isDone?"line-through":"none", lineHeight:1.4 }}>{task.text}</span>
                <Tag text={task.cat}  color="#68738A" bg="#F5F7FF"/>
                <Tag text={task.pri}  color={pc} bg={pb}/>
              </button>
            );
          })}
        </div>

        {/* Zari insight */}
        <div style={{ marginTop:20, background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", border:"1px solid rgba(67,97,238,0.15)", borderRadius:16, padding:20 }}>
          <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:14, fontWeight:800, color:"white" }}>Z</div>
            <div>
              <p style={{ fontSize:13, fontWeight:700, color:"#4361EE", marginBottom:6 }}>Zari&apos;s coaching note</p>
              <p style={{ fontSize:13, color:"#3451D1", lineHeight:1.65 }}>{aiCoachNote ?? "Your highest-leverage action this week is completing the high-priority tasks. These will create the most momentum — check them off one by one and come back to Zari when you're ready to practice."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PORTAL SHELL
═══════════════════════════════════════════════════ */
export function ZariPortal() {
  const [screen, setScreen] = useState<Screen>("session");
  const [stage, setStage] = useState<CareerStage>("job-search");
  const [stageOpen, setStageOpen] = useState(false);

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", background:"#FAFBFF", fontFamily:"var(--font-geist-sans,Inter,system-ui,sans-serif)" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes bubble-appear { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dot-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes voice-wave { from{height:3px} to{height:100%} }
        @keyframes sphere-breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes aurora-pulse { 0%,100%{opacity:0.8} 50%{opacity:1} }
        @keyframes neural-orbit-a { from{transform:rotate(0deg) translate(28px)} to{transform:rotate(360deg) translate(28px)} }
        @keyframes neural-orbit-b { from{transform:rotate(0deg) translate(20px)} to{transform:rotate(360deg) translate(20px)} }
        @keyframes ring-pulse { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.5);opacity:0} }
        @keyframes listen-ripple { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(1.8);opacity:0} }
        @keyframes eye-glow { 0%,100%{opacity:0.9} 50%{opacity:0.6} }
        @keyframes aurora-a { 0%,100%{transform:translate(-50%,0) scale(1)} 50%{transform:translate(-50%,10px) scale(1.05)} }
        @keyframes aurora-b { 0%,100%{transform:translate(0,0) scale(1)} 60%{transform:translate(-20px,15px) scale(1.04)} }
        @keyframes aurora-c { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(10px,-10px) scale(1.03)} }
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside style={{ width:220, flexShrink:0, background:"white", borderRight:"1px solid #E4E8F5", display:"flex", flexDirection:"column", padding:"0 0 16px 0" }}>
        {/* Logo */}
        <div style={{ padding:"18px 16px 14px", borderBottom:"1px solid #F1F5F9" }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
            <ZariLogo size={26}/>
            <span style={{ fontSize:16, fontWeight:800, color:"#0A0A0F", letterSpacing:"-0.03em" }}>Zari</span>
          </Link>
        </div>

        {/* User chip */}
        <div style={{ margin:"12px 10px 8px", background:"#F5F7FF", borderRadius:12, padding:"10px 12px", display:"flex", gap:10, alignItems:"center" }}>
          <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:"white", flexShrink:0 }}>S</div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#0A0A0F" }}>Steve N.</div>
            <div style={{ fontSize:10.5, color:"#68738A", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>Free plan</div>
          </div>
        </div>

        {/* Career Stage Selector */}
        <div style={{ margin:"0 10px 10px", position:"relative" }}>
          <button
            onClick={() => setStageOpen(o => !o)}
            style={{
              width:"100%", display:"flex", alignItems:"center", gap:8,
              padding:"9px 11px", borderRadius:11,
              border:`1.5px solid ${STAGE_META[stage].color}50`,
              background: STAGE_META[stage].bg,
              cursor:"pointer", fontSize:12.5, fontWeight:700,
              color: STAGE_META[stage].color,
              transition:"all 0.15s",
            }}
          >
            <span style={{ display:"flex", alignItems:"center" }}>{STAGE_ICONS[stage]}</span>
            <span style={{ flex:1, textAlign:"left" }}>{STAGE_META[stage].label}</span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:12, height:12, transition:"transform 0.2s", transform: stageOpen ? "rotate(180deg)" : "rotate(0)" }}><path d="M4 6l4 4 4-4"/></svg>
          </button>

          {/* Dropdown */}
          {stageOpen && (
            <div style={{
              position:"absolute", top:"calc(100% + 6px)", left:0, right:0, zIndex:50,
              background:"white", borderRadius:12, border:"1px solid #E4E8F5",
              boxShadow:"0 8px 32px rgba(0,0,0,0.12)", overflow:"hidden",
              animation:"bubble-appear 0.2s ease",
            }}>
              {(Object.entries(STAGE_META) as [CareerStage, typeof STAGE_META[CareerStage]][]).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => { setStage(key); setStageOpen(false); setScreen("session"); }}
                  style={{
                    width:"100%", display:"flex", alignItems:"center", gap:8,
                    padding:"9px 12px", border:"none", cursor:"pointer", textAlign:"left",
                    background: stage === key ? meta.bg : "white",
                    fontSize:12.5, fontWeight: stage === key ? 700 : 500,
                    color: stage === key ? meta.color : "#1E2235",
                    transition:"background 0.1s",
                  }}
                >
                  <span style={{ display:"flex", alignItems:"center", color: stage === key ? meta.color : "#68738A" }}>{STAGE_ICONS[key]}</span>
                  {meta.label}
                  {stage === key && <svg viewBox="0 0 16 16" fill={meta.color} style={{ width:12,height:12,marginLeft:"auto" }}><path d="M3 8l4 4 6-6" stroke={meta.color} strokeWidth="2.2" fill="none"/></svg>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"0 8px 0" }}>
          {getNav(stage).map(n => (
            <button key={n.id} onClick={()=>setScreen(n.id)}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"9px 10px", borderRadius:10, border:"none", cursor:"pointer", textAlign:"left", marginBottom:2, background:screen===n.id?STAGE_META[stage].bg:"transparent", color:screen===n.id?STAGE_META[stage].color:"#68738A", fontWeight:screen===n.id?700:500, fontSize:13.5, transition:"all 0.15s" }}>
              {n.icon}
              {n.label}
              {n.id==="session" && <span style={{ marginLeft:"auto", fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:99, background:STAGE_META[stage].color, color:"white" }}>Live</span>}
            </button>
          ))}
        </nav>

        {/* Bottom: upgrade */}
        <div style={{ margin:"0 10px", background:"linear-gradient(135deg,#4361EE,#818CF8)", borderRadius:14, padding:"14px 14px", color:"white" }}>
          <div style={{ fontSize:13, fontWeight:700, marginBottom:3 }}>Unlock Pro</div>
          <div style={{ fontSize:11, opacity:0.75, marginBottom:10, lineHeight:1.4 }}>Unlimited sessions, priority coaching, resume downloads</div>
          <button style={{ width:"100%", fontSize:12, fontWeight:700, padding:"7px", borderRadius:8, border:"none", background:"white", color:"#4361EE", cursor:"pointer" }}>Upgrade →</button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        {/* Top bar */}
        <div style={{ flexShrink:0, height:56, background:"white", borderBottom:"1px solid #E4E8F5", display:"flex", alignItems:"center", padding:"0 24px", gap:16 }}>
          <h2 style={{ fontSize:14.5, fontWeight:700, color:"#0A0A0F" }}>
            {getNav(stage).find(n=>n.id===screen)?.label}
          </h2>
          <div style={{ marginLeft:"auto", display:"flex", gap:10, alignItems:"center" }}>
            <button style={{ fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:9, border:"1px solid #E4E8F5", background:"#FAFBFF", color:"#68738A", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:14,height:14 }}><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 10a2 2 0 110-4 2 2 0 010 4z"/></svg>
              Help
            </button>
            <form action="/api/auth/logout" method="POST">
              <button type="submit" style={{ fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:9, border:"1px solid #E4E8F5", background:"white", color:"#68738A", cursor:"pointer" }}>Sign out</button>
            </form>
          </div>
        </div>

        {/* Screen */}
        <div style={{ flex:1, overflow:"hidden" }}>
          {screen==="session"   && <ScreenSession   stage={stage}/>}
          {screen==="resume"    && <ScreenResume    stage={stage}/>}
          {screen==="interview" && <ScreenInterview stage={stage}/>}
          {screen==="linkedin"  && <ScreenLinkedIn stage={stage}/>}
          {screen==="documents" && <ScreenDocuments/>}
          {screen==="plan"      && <ScreenPlan      stage={stage}/>}
        </div>
      </main>
    </div>
  );
}
