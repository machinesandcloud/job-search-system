"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ZariLogo } from "@/components/zari-logo";
import { ZariAvatar, type AvatarState } from "@/components/zari-avatar";


/* ═══════════════════════════════════════════════════
   DOC VAULT  (localStorage-backed shared document store)
═══════════════════════════════════════════════════ */
type DocType = "resume" | "cover-letter" | "linkedin" | "upload";
type DocEntry = {
  id: string;
  type: DocType;
  name: string;
  content: string;
  meta: Record<string, string>;
  createdAt: number;
};

const VAULT_KEY = "zari-vault-v1";

function vaultRead(): DocEntry[] {
  try { return JSON.parse(localStorage.getItem(VAULT_KEY) ?? "[]") as DocEntry[]; }
  catch { return []; }
}

function vaultSave(entry: Omit<DocEntry, "id" | "createdAt">): void {
  const docs = vaultRead();
  const idx = docs.findIndex(d => d.type === entry.type && d.name === entry.name);
  const record: DocEntry = { ...entry, id: entry.type + "_" + Date.now(), createdAt: Date.now() };
  if (idx > -1) docs[idx] = record; else docs.unshift(record);
  localStorage.setItem(VAULT_KEY, JSON.stringify(docs));
  window.dispatchEvent(new CustomEvent("vault-updated"));
}

function vaultRemove(id: string): void {
  const docs = vaultRead().filter(d => d.id !== id);
  localStorage.setItem(VAULT_KEY, JSON.stringify(docs));
  window.dispatchEvent(new CustomEvent("vault-updated"));
}

function vaultHas(type: DocType): boolean {
  return vaultRead().some(d => d.type === type);
}

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
type Screen = "session" | "resume" | "interview" | "cover-letter" | "linkedin" | "documents" | "plan";
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
function ScoreRing({ score, color="#4361EE", size=56, dark=false }: { score:number; color?:string; size?:number; dark?:boolean }) {
  const sw = Math.max(5, size * 0.065);
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - score / 100);
  const trackColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const textColor = dark ? "white" : color;
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <filter id={`glow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={trackColor} strokeWidth={sw}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={dash}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ filter:`drop-shadow(0 0 ${sw*0.8}px ${color}88)`, transition:"stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      <span style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.24, fontWeight:900, color:textColor, letterSpacing:"-0.03em" }}>{score}</span>
    </div>
  );
}

function Bar({ pct, color="#4361EE", h=5 }: { pct:number; color?:string; h?:number }) {
  return (
    <div style={{ height:h, borderRadius:99, background:"rgba(0,0,0,0.07)", overflow:"hidden" }}>
      <div style={{ width:`${pct}%`, height:"100%", background:`linear-gradient(90deg, ${color}CC, ${color})`, borderRadius:99, transition:"width 0.8s cubic-bezier(0.4,0,0.2,1)", boxShadow:`0 0 6px ${color}55` }}/>
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

/* ─── PDF.js loader (pdfjs-dist npm 4.10.38) ───────────────────────────── */
let _pdfJsLoad: Promise<unknown> | null = null;
function loadPdfJs(): Promise<unknown> {
  if (_pdfJsLoad) return _pdfJsLoad;
  _pdfJsLoad = (async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfjs = await import("pdfjs-dist") as any;
    // Worker pre-copied to /public/ at matching version — same-origin, no CORS
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    return pdfjs;
  })();
  return _pdfJsLoad;
}

/** Re-extract PDF text in visual reading order (top→bottom, left→right) using PDF.js positions.
 *  Handles letter-spaced headings by merging items with tiny gaps. */
async function extractPositionedText(pdfUrl: string): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lib = await loadPdfJs() as any;
  const arrayBuf = await fetch(pdfUrl).then(r => r.arrayBuffer());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdf = await lib.getDocument({ data: arrayBuf }).promise as any;
  const pageLines: string[] = [];

  for (let p = 1; p <= pdf.numPages; p++) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const page = await pdf.getPage(p) as any;
    const content = await page.getTextContent({ includeMarkedContent: false }) as { items: Array<{ str?: string; transform?: number[]; width?: number }> };

    // Group items into visual lines by Y bucket (PDF Y is from bottom of page)
    const byY = new Map<number, Array<{ x: number; text: string; width: number }>>();
    for (const item of content.items) {
      if (!item || !item.transform || !item.str) continue;
      const y = Math.round(item.transform[5] / 2) * 2; // 2-unit bucket
      if (!byY.has(y)) byY.set(y, []);
      byY.get(y)!.push({ x: item.transform[4], text: item.str, width: item.width ?? 0 });
    }

    // Sort lines top→bottom (higher Y = higher on page in PDF coordinate space)
    const sortedYs = [...byY.keys()].sort((a, b) => b - a);

    for (const y of sortedYs) {
      const items = byY.get(y)!.sort((a, b) => a.x - b.x);
      let line = "";
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (i === 0) {
          line = item.text;
        } else {
          const prev = items[i - 1];
          const expectedEnd = prev.x + (prev.width > 0 ? prev.width : prev.text.length * 5.5);
          const gap = item.x - expectedEnd;
          // Gap < 3px → letter-spaced text, merge without space; otherwise add space
          line += (gap < 3 ? "" : " ") + item.text;
        }
      }
      const t = line.trim();
      if (t) pageLines.push(t);
    }
    if (p < pdf.numPages) pageLines.push("");
  }

  return pageLines.join("\n");
}

type PdfHl = { x: number; y: number; w: number; h: number; bulletIdx: number };
type PdfPageData = { dataUrl: string; width: number; height: number; highlights: PdfHl[] };

function PdfHighlightViewer({
  pdfUrl, bullets, activeIdx, onClickLine,
}: {
  pdfUrl: string; bullets: ResumeBullet[];
  activeIdx: number | null; onClickLine: (idx: number | null) => void;
}) {
  const [pages, setPages] = useState<PdfPageData[]>([]);
  const [status, setStatus] = useState<"loading"|"done"|"error">("loading");
  const [errMsg, setErrMsg] = useState("");
  const [popup, setPopup] = useState<{pg:number;hi:number}|null>(null);
  const BC = /^[•\-\*\u2022►▸]\s*/;

  useEffect(() => {
    let dead = false;
    setStatus("loading"); setPages([]); setPopup(null);

    (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pdfjs = await loadPdfJs() as any;
        const arrayBuf = await fetch(pdfUrl).then(r => r.arrayBuffer());
        const pdfDoc = await pdfjs.getDocument({ data: arrayBuf }).promise;
        const numPages: number = pdfDoc.numPages;
        const out: PdfPageData[] = [];
        const SCALE = 1.8;

        for (let pn = 1; pn <= numPages; pn++) {
          const page = await pdfDoc.getPage(pn);
          const vp = page.getViewport({ scale: SCALE });
          const W: number = vp.width, H: number = vp.height;

          const cvs = document.createElement("canvas");
          cvs.width = Math.round(W); cvs.height = Math.round(H);
          const ctx = cvs.getContext("2d")!;
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, cvs.width, cvs.height);
          try {
            await page.render({ canvasContext: ctx, viewport: vp }).promise;
          } catch (renderErr) {
            console.warn("[PdfHighlight] render page", pn, renderErr);
          }

          // includeMarkedContent:false excludes TextMarkedContent items (no transform/str)
          let tcItems: Array<{str?:string;transform?:number[];width?:number}> = [];
          try {
            const tc = await page.getTextContent({ includeMarkedContent: false });
            tcItems = tc?.items ?? [];
          } catch { /* page has no extractable text */ }

          const buckets = new Map<number, Array<{str:string;tx:number[];width:number}>>();
          for (const item of tcItems) {
            if (!item || !item.transform || !item.str?.trim()) continue;
            const bucket = Math.round(item.transform[5] / 3) * 3;
            if (!buckets.has(bucket)) buckets.set(bucket, []);
            buckets.get(bucket)!.push({ str: item.str, tx: item.transform, width: item.width ?? 0 });
          }

          const highlights: PdfHl[] = [];
          for (const items of buckets.values()) {
            if (!items.length) continue;
            const lineText = items.map(i => i.str).join("").trim();
            if (lineText.length < 10) continue;
            const normLine = lineText.toLowerCase().replace(BC, "").replace(/\s+/g, " ");

            for (let bi = 0; bi < bullets.length; bi++) {
              const normB = bullets[bi].before.toLowerCase().replace(BC, "").replace(/\s+/g, " ");
              let matched = false;
              for (const len of [50, 35, 22]) {
                const prefix = normB.slice(0, len).trim();
                if (prefix.length >= 10 && normLine.includes(prefix)) { matched = true; break; }
              }
              if (!matched) continue;

              try {
                const first = items.reduce((a,b) => a.tx[4] < b.tx[4] ? a : b);
                const last  = items.reduce((a,b) => (a.tx[4]+a.width) > (b.tx[4]+b.width) ? a : b);
                const [x1, yBase] = vp.convertToViewportPoint(first.tx[4], first.tx[5]) as [number,number];
                const [x2]        = vp.convertToViewportPoint(last.tx[4] + last.width, last.tx[5]) as [number,number];
                const [, yTop]    = vp.convertToViewportPoint(first.tx[4], first.tx[5] + Math.abs(first.tx[3] ?? 0)) as [number,number];
                const top = Math.min(yBase, yTop) - 2;
                const bot = Math.max(yBase, yTop) + 4;
                highlights.push({ x: Math.min(x1,x2)-4, y: top, w: Math.abs(x2-x1)+8, h: bot-top, bulletIdx: bi });
              } catch { /* skip highlight if coordinate conversion fails */ }
              break;
            }
          }

          out.push({ dataUrl: cvs.toDataURL("image/jpeg", 0.9), width: cvs.width, height: cvs.height, highlights });
        }
        if (!dead) { setPages(out); setStatus("done"); }
      } catch(e) {
        console.error("[PdfHighlight]", e);
        if (!dead) { setErrMsg(e instanceof Error ? e.message : String(e)); setStatus("error"); }
      }
    })();
    return () => { dead = true; };
  }, [pdfUrl, bullets]);

  const HL_STYLE = { bg:"rgba(245,158,11,0.2)", border:"#F59E0B" };

  if (status === "loading") return (
    <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:"#2A2A2A", color:"rgba(255,255,255,0.4)", fontSize:13, gap:8, flexDirection:"column" as const }}>
      <div style={{ width:20, height:20, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.15)", borderTop:"2px solid rgba(255,255,255,0.6)" }}/>
      Rendering PDF…
    </div>
  );
  if (status === "error") return (
    <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:"#2A2A2A", flexDirection:"column" as const, gap:6, padding:"0 24px", textAlign:"center" as const }}>
      <span style={{ color:"#F87171", fontSize:13 }}>Could not render PDF — try the Preview tab</span>
      {errMsg && <span style={{ color:"rgba(248,113,113,0.55)", fontSize:10.5, maxWidth:340 }}>{errMsg}</span>}
    </div>
  );

  return (
    <div style={{ flex:1, overflowY:"auto", background:"#2D2D2D", padding:"20px 12px", display:"flex", flexDirection:"column" as const, alignItems:"center", gap:14 }}
      onClick={() => { setPopup(null); onClickLine(null); }}>
      {pages.map((pg, pi) => (
        <div key={pi} style={{ position:"relative", width:Math.min(pg.width, 800), maxWidth:"100%", boxShadow:"0 6px 32px rgba(0,0,0,0.5)", borderRadius:2, flexShrink:0 }}>
          <img src={pg.dataUrl} alt={`Page ${pi+1}`} draggable={false}
            style={{ display:"block", width:"100%", height:"auto", borderRadius:2 }}/>
          {pg.highlights.map((hl, hi) => {
            const isActive = hl.bulletIdx === activeIdx;
            const hasPopup = popup?.pg === pi && popup?.hi === hi;
            const bullet = bullets[hl.bulletIdx];
            return (
              <div key={hi}>
                <div onClick={e => {
                    e.stopPropagation();
                    onClickLine(isActive ? null : hl.bulletIdx);
                    setPopup(hasPopup ? null : { pg: pi, hi });
                  }}
                  style={{
                    position:"absolute",
                    left:`${(hl.x/pg.width)*100}%`, top:`${(hl.y/pg.height)*100}%`,
                    width:`${(hl.w/pg.width)*100}%`, height:`${(hl.h/pg.height)*100}%`,
                    background: isActive ? HL_STYLE.bg : "rgba(245,158,11,0.1)",
                    border:`1.5px solid ${HL_STYLE.border}`,
                    borderRadius:3, cursor:"pointer", transition:"all 0.12s", boxSizing:"border-box" as const,
                    boxShadow: isActive ? `0 0 0 2px rgba(245,158,11,0.4)` : "none",
                  }}
                />
                {hasPopup && bullet && (
                  <div onClick={e => e.stopPropagation()}
                    style={{
                      position:"absolute", zIndex:20,
                      left:`${(hl.x/pg.width)*100}%`,
                      top:`${((hl.y+hl.h+4)/pg.height)*100}%`,
                      width:"min(380px,88%)", background:"white", borderRadius:12,
                      boxShadow:"0 8px 32px rgba(0,0,0,0.22)", border:"1px solid #FCD34D", overflow:"hidden",
                      fontFamily:"var(--font-geist-sans,Inter,system-ui,sans-serif)",
                    }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 14px", background:"#FEF3C7", borderBottom:"1px solid #FCD34D" }}>
                      <span style={{ fontSize:11.5, fontWeight:700, color:"#92400E" }}>{bullet.reason}</span>
                      <button onClick={() => { setPopup(null); onClickLine(null); }} style={{ background:"none", border:"none", fontSize:16, color:"#A0AABF", cursor:"pointer", lineHeight:1, padding:"0 2px" }}>×</button>
                    </div>
                    <div style={{ padding:"12px 14px" }}>
                      <p style={{ fontSize:10, fontWeight:700, color:"#A0AABF", textTransform:"uppercase" as const, letterSpacing:"0.07em", marginBottom:6 }}>Zari&apos;s Rewrite</p>
                      <p style={{ fontSize:12.5, color:"#14532D", lineHeight:1.6, margin:"0 0 10px", fontFamily:"Georgia,serif" }}>{bullet.after}</p>
                      <button onClick={() => void navigator.clipboard.writeText(bullet.after)}
                        style={{ fontSize:11, fontWeight:700, padding:"6px 12px", borderRadius:8, border:"1.5px solid #6EE7B7", background:"white", color:"#059669", cursor:"pointer" }}>
                        Copy rewrite
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {pi === 0 && pg.highlights.length > 0 && (
            <div style={{ position:"absolute", top:8, right:8, background:"rgba(245,158,11,0.9)", color:"white", fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:99, pointerEvents:"none" }}>
              {pg.highlights.length} issue{pg.highlights.length!==1?"s":""}
            </div>
          )}
        </div>
      ))}
    </div>
  );
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
  const lines = text.slice(0, 14000).split("\n");

  // Line → bullet index matching
  const lineMatch: Record<number, number> = {};
  lines.forEach((line, li) => {
    const norm = line.trim().replace(BULLET_CHAR_RE, "").toLowerCase().replace(/\s+/g, " ");
    if (norm.length < 12) return;
    let bestBi = -1;
    bullets.forEach((b, bi) => {
      if (lineMatch[li] !== undefined) return;
      const bNorm = b.before.trim().replace(BULLET_CHAR_RE, "").toLowerCase().replace(/\s+/g, " ");
      const slices = [50, 35, 25];
      for (const len of slices) {
        if (norm.slice(0, len) && bNorm.includes(norm.slice(0, len))) { bestBi = bi; break; }
        if (bNorm.slice(0, len) && norm.includes(bNorm.slice(0, len))) { bestBi = bi; break; }
      }
    });
    if (bestBi >= 0) lineMatch[li] = bestBi;
  });

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

  // Word issue highlight map
  const wiMap = new Map<string, { bg: string; color: string }>();
  (wordIssues ?? []).forEach(w => {
    const style = w.type === "weak_verb"
      ? { bg: "rgba(245,158,11,0.22)", color: "#92400E" }
      : w.type === "cliche"
      ? { bg: "rgba(239,68,68,0.18)", color: "#991B1B" }
      : { bg: "rgba(234,179,8,0.22)", color: "#713F12" };
    wiMap.set(w.word.toLowerCase(), style);
  });

  function hlText(str: string): React.ReactNode {
    if (!wiMap.size) return str;
    const words = [...wiMap.keys()].map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const re = new RegExp(`\\b(${words.join("|")})\\b`, "gi");
    const parts = str.split(re);
    if (parts.length <= 1) return str;
    return parts.map((part, i) => {
      const s = wiMap.get(part.toLowerCase());
      return s
        ? <mark key={i} style={{ background: s.bg, color: s.color, padding: "1px 3px", borderRadius: 3, fontWeight: 700, fontStyle: "normal", fontFamily: "inherit" }}>{part}</mark>
        : part;
    });
  }

  const FLAG_META: Record<string, {
    dotColor: string; lineBg: string; activeLineBg: string; leftBar: string;
    badge: string; badgeBg: string; badgeColor: string; badgeBorder: string;
    popupBorder: string; popupBg: string; popupHeaderBg: string;
  }> = {
    weak: {
      dotColor: "#F59E0B", lineBg: "rgba(245,158,11,0.07)", activeLineBg: "rgba(245,158,11,0.14)", leftBar: "#F59E0B",
      badge: "✦ rewrite", badgeBg: "rgba(245,158,11,0.15)", badgeColor: "#92400E", badgeBorder: "rgba(245,158,11,0.4)",
      popupBorder: "#FCD34D", popupBg: "#FFFBEB", popupHeaderBg: "#FEF3C7",
    },
    no_metric: {
      dotColor: "#EAB308", lineBg: "rgba(234,179,8,0.07)", activeLineBg: "rgba(234,179,8,0.13)", leftBar: "#EAB308",
      badge: "# add metric", badgeBg: "rgba(234,179,8,0.15)", badgeColor: "#713F12", badgeBorder: "rgba(234,179,8,0.4)",
      popupBorder: "#FDE68A", popupBg: "#FEFCE8", popupHeaderBg: "#FEF9C3",
    },
    too_long: {
      dotColor: "#3B82F6", lineBg: "rgba(59,130,246,0.06)", activeLineBg: "rgba(59,130,246,0.12)", leftBar: "#3B82F6",
      badge: "↔ too long", badgeBg: "rgba(59,130,246,0.12)", badgeColor: "#1D4ED8", badgeBorder: "rgba(59,130,246,0.35)",
      popupBorder: "#93C5FD", popupBg: "#EFF6FF", popupHeaderBg: "#DBEAFE",
    },
    passive: {
      dotColor: "#A855F7", lineBg: "rgba(168,85,247,0.06)", activeLineBg: "rgba(168,85,247,0.12)", leftBar: "#A855F7",
      badge: "~ passive", badgeBg: "rgba(168,85,247,0.12)", badgeColor: "#6B21A8", badgeBorder: "rgba(168,85,247,0.35)",
      popupBorder: "#C4B5FD", popupBg: "#FAF5FF", popupHeaderBg: "#F3E8FF",
    },
  };

  function getTip(flag: LineFlag): string {
    if (flag.kind === "no_metric") return "Add a number to quantify this achievement — %, $, headcount, time saved, or scale (e.g. '50K users').";
    if (flag.kind === "too_long") return `This bullet is ${flag.words} words. Aim for under 25 words — cut filler and lead with the result.`;
    if (flag.kind === "passive") return "Rewrite in active voice. Start with a strong action verb: Led, Built, Increased, Reduced, Launched, Drove…";
    return "";
  }

  const totalIssues = Object.keys(lineMatch).length + lines.filter((l,i)=>{const f=getFlag(l,i);return f&&f.kind!=="weak";}).length;

  return (
    <div style={{ fontFamily: "inherit" }}>
      {/* ── Issue legend bar ── */}
      <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:14, padding:"8px 14px", background:"rgba(248,250,255,0.8)", borderRadius:10, border:"1px solid #E8EBF4", flexWrap:"wrap" }}>
        <span style={{ fontSize:11, fontWeight:700, color:"#A0AABF", textTransform:"uppercase", letterSpacing:"0.08em" }}>Highlights</span>
        {[
          { color:"#F59E0B", label:"Weak bullet" },
          { color:"#EAB308", label:"No metric" },
          { color:"#3B82F6", label:"Too long" },
          { color:"#A855F7", label:"Passive voice" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:9, height:9, borderRadius:99, background:color }}/>
            <span style={{ fontSize:11, color:"#68738A" }}>{label}</span>
          </div>
        ))}
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <mark style={{ background:"rgba(245,158,11,0.22)", color:"#92400E", padding:"0 5px", borderRadius:3, fontSize:10, fontWeight:700, fontFamily:"inherit" }}>word</mark>
          <span style={{ fontSize:11, color:"#68738A" }}>Weak verb / cliché</span>
        </div>
        {totalIssues > 0 && (
          <span style={{ marginLeft:"auto", fontSize:11.5, fontWeight:700, color:"#F59E0B", background:"rgba(245,158,11,0.1)", padding:"2px 9px", borderRadius:99, border:"1px solid rgba(245,158,11,0.25)" }}>
            {totalIssues} issue{totalIssues !== 1 ? "s" : ""} found
          </span>
        )}
      </div>

      {/* ── Paper document ── */}
      <div style={{
        background: "white",
        borderRadius: 6,
        boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.05)",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.06)",
      }}>
        <div style={{ padding: "40px 44px", fontFamily: "Georgia, 'Times New Roman', serif" }}>
          {lines.map((raw, li) => {
            const trimmed = raw.trim();
            if (!trimmed) return <div key={li} style={{ height: 8 }} />;

            // Section header (ALL CAPS)
            if (HEADER_RE.test(trimmed) && trimmed.length <= 60) {
              return (
                <div key={li} style={{ marginTop: 22, marginBottom: 8, paddingBottom: 5, borderBottom: "1.5px solid #1A1A2E", display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#1A1A2E", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "inherit" }}>{trimmed}</span>
                </div>
              );
            }

            const flag = getFlag(raw, li);
            const isActive = flag?.kind === "weak" ? activeIdx === flag.bulletIdx : activeTip === li;
            const fm = flag ? FLAG_META[flag.kind] : null;

            return (
              <div key={li} style={{ margin: "0 -44px", padding: "0 44px" }}>
                <div
                  onClick={() => {
                    if (!flag) return;
                    if (flag.kind === "weak") onClickLine(isActive ? null : flag.bulletIdx);
                    else setActiveTip(isActive ? null : li);
                  }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 0,
                    padding: "4px 0", marginBottom: 1,
                    background: fm ? (isActive ? fm.activeLineBg : fm.lineBg) : "transparent",
                    borderLeft: fm ? `3px solid ${isActive ? fm.leftBar : fm.leftBar + "88"}` : "3px solid transparent",
                    paddingLeft: fm ? "41px" : "0",
                    marginLeft: fm ? "-44px" : "0",
                    paddingRight: "8px",
                    cursor: flag ? "pointer" : "default",
                    transition: "background 0.12s",
                    borderRadius: "0 4px 4px 0",
                    position: "relative",
                  }}
                >
                  {/* Margin dot */}
                  {fm && (
                    <div style={{
                      position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                      width: 7, height: 7, borderRadius: "50%", background: fm.dotColor,
                      boxShadow: `0 0 6px ${fm.dotColor}88`, flexShrink: 0,
                    }}/>
                  )}
                  <div style={{ flex: 1, whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 13.5, lineHeight: 1.65, color: "#1A1A2E", fontFamily: "inherit" }}>
                    {hlText(trimmed)}
                  </div>
                  {fm && (
                    <span style={{
                      flexShrink: 0, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 99, marginLeft: 8, alignSelf: "center",
                      background: fm.badgeBg, color: fm.badgeColor, border: `1px solid ${fm.badgeBorder}`,
                      whiteSpace: "nowrap", fontFamily: "var(--font-geist-sans, Inter, system-ui, sans-serif)",
                    }}>
                      {fm.badge}
                    </span>
                  )}
                </div>

                {/* Popup: AI rewrite for weak bullets */}
                {flag?.kind === "weak" && isActive && (
                  <div style={{ margin: "8px 0 12px", border: `1px solid ${fm!.popupBorder}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontFamily: "var(--font-geist-sans, Inter, system-ui, sans-serif)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: fm!.popupHeaderBg, borderBottom: `1px solid ${fm!.popupBorder}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B" }}/>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#92400E" }}>{bullets[flag.bulletIdx].reason}</span>
                      </div>
                      <button onClick={e => { e.stopPropagation(); onClickLine(null); }} style={{ fontSize: 16, background: "none", border: "none", color: "#A0AABF", cursor: "pointer", lineHeight: 1, padding: "0 2px" }}>×</button>
                    </div>
                    <div style={{ padding: "14px 16px", background: fm!.popupBg, display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: "#A0AABF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Suggested rewrite</p>
                        <p style={{ fontSize: 13.5, color: "#14532D", lineHeight: 1.6, margin: 0, fontFamily: "Georgia, serif" }}>{bullets[flag.bulletIdx].after}</p>
                      </div>
                      <button onClick={() => void navigator.clipboard.writeText(bullets[flag.bulletIdx].after)} style={{ fontSize: 12, fontWeight: 700, padding: "7px 14px", borderRadius: 9, border: "1.5px solid #6EE7B7", background: "white", color: "#059669", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>Copy</button>
                    </div>
                  </div>
                )}

                {/* Popup: tips for no_metric / too_long / passive */}
                {flag && flag.kind !== "weak" && isActive && (
                  <div style={{ margin: "8px 0 12px", border: `1px solid ${fm!.popupBorder}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontFamily: "var(--font-geist-sans, Inter, system-ui, sans-serif)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "13px 16px", background: fm!.popupBg }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flex: 1 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: fm!.dotColor, marginTop: 6, flexShrink: 0 }}/>
                        <p style={{ fontSize: 13.5, color: "#1E2235", lineHeight: 1.65, margin: 0 }}>{getTip(flag)}</p>
                      </div>
                      <button onClick={e => { e.stopPropagation(); setActiveTip(null); }} style={{ fontSize: 16, background: "none", border: "none", color: "#A0AABF", cursor: "pointer", lineHeight: 1, padding: "0 2px", flexShrink: 0, marginLeft: 8 }}>×</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {text.length > 10000 && (
            <p style={{ fontSize: 11, color: "#A0AABF", marginTop: 14, fontFamily: "var(--font-geist-sans, Inter, system-ui, sans-serif)" }}>[Truncated — showing first 14,000 characters]</p>
          )}
        </div>
      </div>
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
        ? <mark key={i} style={{ background:"rgba(22,163,74,0.15)", color:"#14532D", borderRadius:3, padding:"0 3px", fontWeight:700, fontFamily:"inherit" }}>{p}</mark>
        : p
    );
  }

  const HEADER_RE = /^[A-Z][A-Z\s&\/\-]{3,}$/;
  const lines = text.split("\n");

  return (
    <div style={{
      background: "white",
      borderRadius: 6,
      boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.08)",
      border: "1px solid rgba(0,0,0,0.06)",
      overflow: "hidden",
    }}>
      <div style={{ padding: "40px 44px", fontFamily: "Georgia, 'Times New Roman', serif" }}>
        {lines.map((line, li) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={li} style={{ height: 8 }}/>;

          if (HEADER_RE.test(trimmed) && trimmed.length <= 60) {
            return (
              <div key={li} style={{ marginTop: 22, marginBottom: 8, paddingBottom: 5, borderBottom: "1.5px solid #1A1A2E" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#1A1A2E", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "inherit" }}>
                  {trimmed}
                </span>
              </div>
            );
          }

          return (
            <div key={li} style={{ whiteSpace:"pre-wrap", wordBreak:"break-word", fontSize: 13.5, lineHeight: 1.65, marginBottom: 2, color: "#1A1A2E", fontFamily: "inherit" }}>
              {hlLine(line)}
            </div>
          );
        })}
        {text.length > 3000 && <p style={{ fontSize:11, color:"#A0AABF", marginTop:14, fontFamily:"var(--font-geist-sans,Inter,sans-serif)" }}>[…truncated for preview]</p>}
      </div>
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
  "cover-letter": <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/><path d="M3 7l7 5 7-5"/></svg>,
  linkedin:  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><rect x="2" y="2" width="16" height="16" rx="3"/><path d="M6 9v5M6 6.5v.5M9 14V11a2.5 2.5 0 015 0v3M9 11v3"/></svg>,
  documents: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><path d="M5 2h7l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M12 2v4h4"/></svg>,
  plan:      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:18,height:18}}><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M6 2v4M14 2v4M3 9h14"/><path d="M7 13l2 2 4-4"/></svg>,
};

const STAGE_NAV_LABELS: Record<CareerStage, Record<Screen, string>> = {
  "job-search": {
    session:        "Talk to Zari",
    resume:         "Resume Review",
    interview:      "Mock Interview",
    "cover-letter": "Cover Letter",
    linkedin:       "LinkedIn",
    documents:      "My Documents",
    plan:           "Action Plan",
  },
  "promotion": {
    session:        "Talk to Zari",
    resume:         "Build My Case",
    interview:      "Pitch Practice",
    "cover-letter": "Cover Letter",
    linkedin:       "LinkedIn",
    documents:      "My Documents",
    plan:           "Promotion Plan",
  },
  "salary": {
    session:        "Talk to Zari",
    resume:         "Salary Research",
    interview:      "Negotiation Sim",
    "cover-letter": "Cover Letter",
    linkedin:       "LinkedIn",
    documents:      "My Documents",
    plan:           "Negotiation Plan",
  },
  "career-change": {
    session:        "Talk to Zari",
    resume:         "Reframe Resume",
    interview:      "Pivot Interview",
    "cover-letter": "Cover Letter",
    linkedin:       "LinkedIn",
    documents:      "My Documents",
    plan:           "Transition Plan",
  },
  "leadership": {
    session:        "Talk to Zari",
    resume:         "Executive Bio",
    interview:      "Story Practice",
    "cover-letter": "Cover Letter",
    linkedin:       "LinkedIn",
    documents:      "My Documents",
    plan:           "Leadership Plan",
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
// Navigation labels for {{GO:screen}} markers Zari can embed in responses
const NAV_LABELS: Partial<Record<Screen, string>> = {
  resume:          "Open Resume Review →",
  linkedin:        "Open LinkedIn Review →",
  "cover-letter":  "Open Cover Letter →",
  interview:       "Open Interview Prep →",
  plan:            "Open Action Plan →",
};

function renderMsgText(text: string, onNav?: (s: Screen) => void): React.ReactNode {
  const tokens = text.split(/(\{\{GO:[a-z-]+\}\}|\n)/);
  return (
    <>
      {tokens.map((t, i) => {
        const nav = t.match(/^\{\{GO:([a-z-]+)\}\}$/);
        if (nav && onNav) {
          const s = nav[1] as Screen;
          return (
            <button key={i} onClick={() => onNav(s)} style={{
              display:"inline-flex", alignItems:"center", gap:5,
              fontSize:12, fontWeight:700, color:"#4361EE",
              background:"rgba(67,97,238,0.09)", border:"1px solid rgba(67,97,238,0.22)",
              borderRadius:8, padding:"4px 11px", cursor:"pointer", margin:"5px 3px 0",
              transition:"background 0.15s",
            }}>
              {NAV_LABELS[s] ?? `Open ${s} →`}
            </button>
          );
        }
        if (t === "\n") return <br key={i}/>;
        return t;
      })}
    </>
  );
}

const STAGE_PROMPTS: Record<CareerStage, string[]> = {
  "job-search": [
    "Review my resume",
    "Practice a tough interview question",
    "Help me answer 'Tell me about yourself'",
    "Write a cold outreach message",
    "Help me negotiate this offer",
    "What should I focus on today?",
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
    "What's market rate for my role?",
    "Help me counter a low offer",
    "Run the negotiation conversation",
    "How do I ask for a raise?",
    "Write my salary counter message",
    "What if they push back hard?",
  ],
  "career-change": [
    "Review my resume for this pivot",
    "How do I reframe my background?",
    "Help me answer 'Why are you switching?'",
    "What transferable skills do I have?",
    "Which roles should I target first?",
    "Write my pivot narrative",
  ],
  "leadership": [
    "Review my executive bio",
    "Help me build my board narrative",
    "Practice a leadership story",
    "How do I communicate strategic vision?",
    "Help me lead a difficult conversation",
    "What does VP-level impact look like?",
  ],
};

function ScreenSession({ stage, onNavigate }: { stage: CareerStage; onNavigate?: (s: Screen) => void }) {
  const [avatarState, setAvatarState] = useState<AvatarState>("speaking");
  const [input, setInput] = useState("");
  const [isVoice, setIsVoice] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [fileProcessing, setFileProcessing] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Snapshot all section data from localStorage to give Zari full context
  function readSectionContext() {
    const ctx: Record<string, unknown> = {};
    try {
      const rs = localStorage.getItem("zari_resume_session_v2");
      if (rs) {
        const p = JSON.parse(rs) as { fileName?: string; resumeText?: string; aiResult?: Record<string, unknown> };
        ctx.resume = {
          fileName:  p.fileName,
          score:     (p.aiResult as {overall?: number})?.overall,
          ats:       (p.aiResult as {ats?: number})?.ats,
          impact:    (p.aiResult as {impact?: number})?.impact,
          clarity:   (p.aiResult as {clarity?: number})?.clarity,
          keyIssues: ((p.aiResult as {bullets?: {before: string}[]})?.bullets ?? []).slice(0, 6).map(b => b.before),
          excerpt:   p.resumeText?.slice(0, 1200),
        };
      }
    } catch { /* non-fatal */ }
    return ctx;
  }

  /* ── Generate a dynamic, AI-powered opening message ── */
  async function generateOpening(sid: string | null, cancelled: () => boolean) {
    setIsLoading(true);
    setAvatarState("thinking");
    try {
      const res = await fetch("/api/zari/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "__opening__",
          stage,
          history: [],
          sessionId: sid,
          sectionContext: readSectionContext(),
          isOpening: true,
        }),
      });
      const data = await res.json().catch(() => ({})) as { message?: string };
      if (!cancelled() && data.message) {
        setMsgs([{ role: "coach", text: data.message.trim() }]);
      }
      if (!cancelled()) {
        setAvatarState("speaking");
        setTimeout(() => setAvatarState("listening"), 3000);
      }
    } catch {
      // Opening failed silently — user can still type
    } finally {
      if (!cancelled()) { setIsLoading(false); setSessionReady(true); }
    }
  }

  /* ── Load or create a live session on mount / stage change ── */
  useEffect(() => {
    setSessionReady(false);
    setMsgs([]);
    setElapsed(0);
    let dead = false;
    const cancelled = () => dead;

    async function initSession() {
      let sid: string | null = null;
      try {
        const res = await fetch("/api/sessions", { cache: "no-store" });
        const data = await res.json().catch(() => ({})) as {
          sessions?: Array<{
            id: string; status: string; mode: string;
            transcript?: Array<{ role: string; message: string }>;
          }>;
        };
        if (dead) return;
        const sessions = data.sessions ?? [];
        const live = sessions.find(s => s.status === "live");
        if (live) {
          sid = live.id;
          setSessionId(live.id);
          const transcript = (live.transcript ?? []).filter(t => t.message?.trim());
          if (transcript.length > 0) {
            setMsgs(transcript.map(t => ({ role: t.role, text: t.message })));
            setSessionReady(true);
            setAvatarState("listening");
            return;
          }
        } else {
          const createRes = await fetch("/api/sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mode: "career", title: `${STAGE_META[stage].label} Session` }),
          });
          const created = await createRes.json().catch(() => ({})) as { id?: string };
          if (!dead && created.id) { sid = created.id; setSessionId(created.id); }
        }
      } catch { /* non-fatal */ }

      if (!dead) await generateOpening(sid, cancelled);
    }

    void initSession();
    return () => { dead = true; };
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { const t = setInterval(() => setElapsed(e => e+1), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [msgs, isLoading]);
  useEffect(() => { if (sessionReady) setSessionReady(true); }, [sessionReady]);

  const fmt = (s:number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  async function sendMessage(
    text: string,
    opts?: { uploadedContent?: string; uploadedFileName?: string; skipUserMsg?: boolean; historyOverride?: ChatMsg[] }
  ) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

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

    if (!opts?.skipUserMsg) {
      setMsgs(m => [...m, { role: "user", text: trimmed }]);
    }
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
          history: opts?.historyOverride ?? msgs,
          sessionId: sid,
          sectionContext: readSectionContext(),
          uploadedContent:  opts?.uploadedContent,
          uploadedFileName: opts?.uploadedFileName,
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

  async function handleFileUpload(file: File) {
    const name = file.name.toLowerCase();
    const docType = name.includes("cover") ? "cover letter"
      : name.includes("linkedin") ? "LinkedIn profile"
      : "resume";

    // Show the file attachment as a user message
    const fileMsg: ChatMsg = { role: "user", text: `📎 ${file.name}` };
    setMsgs(m => [...m, fileMsg]);
    setAvatarState("thinking");
    setIsLoading(true);
    setFileProcessing(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const extractRes = await fetch("/api/zari/extract", { method: "POST", body: fd });
      const extractData = await extractRes.json().catch(() => ({})) as { text?: string };
      const extractedText = extractData.text ?? "";

      if (!extractedText) {
        setMsgs(m => [...m, { role: "coach", text: "I couldn't read that file — try uploading it again, or paste the content directly." }]);
        setAvatarState("idle");
        return;
      }

      // Send to Zari with the extracted content as context
      const prompt = `I just uploaded my ${docType}. Take a look and give me your honest read — what's working, what isn't, and what's the most important thing to fix?`;
      const historyWithFile = [...msgs, fileMsg];

      await sendMessage(prompt, {
        uploadedContent: extractedText,
        uploadedFileName: file.name,
        skipUserMsg: false,
        historyOverride: historyWithFile,
      });
    } catch {
      setMsgs(m => [...m, { role: "coach", text: "Couldn't process that file — try again or paste the text directly." }]);
      setAvatarState("idle");
    } finally {
      setFileProcessing(false);
      // setIsLoading is reset inside sendMessage's finally
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
                {msg.role === "coach" ? renderMsgText(msg.text, onNavigate) : msg.text}
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
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            style={{ display:"none" }}
            onChange={e => {
              const f = e.target.files?.[0];
              if (f) void handleFileUpload(f);
              e.target.value = "";
            }}
          />
          <div style={{ position:"relative", background:"#FAFBFF", border:`1.5px solid ${isLoading ? "#C7D2FE" : "#E0E4EF"}`, borderRadius:14, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", transition:"border-color 0.2s" }}>
            <textarea
              style={{ width:"100%", border:"none", outline:"none", fontSize:14, color:"#0A0A0F", background:"transparent", resize:"none", padding:"12px 96px 12px 14px", fontFamily:"inherit", lineHeight:1.6, display:"block", opacity: isLoading ? 0.5 : 1 }}
              rows={3}
              placeholder={fileProcessing ? "Reading your file…" : isLoading ? "Zari is thinking…" : isVoice ? "Voice mode active — speak or type…" : "Ask Zari anything, upload a file, or practice a question…"}
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();void sendMessage(input);} }}
              disabled={isLoading}
            />
            {/* Attach file button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              title="Upload resume, cover letter, or LinkedIn profile"
              style={{ position:"absolute", bottom:10, right:52, width:34,height:34,borderRadius:10,border:"none",cursor:isLoading?"default":"pointer", background:"#F5F7FF", color:"#68738A", display:"flex",alignItems:"center",justifyContent:"center", transition:"all 0.15s" }}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width:15,height:15 }}>
                <path d="M15.172 7l-6.586 6.586a2 2 0 01-2.828-2.828l6.414-6.586a4 4 0 015.656 5.656l-6.415 6.585a6 6 0 01-8.485-8.485l6.586-6.586"/>
              </svg>
            </button>
            {/* Send button */}
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
          <p style={{ textAlign:"center", fontSize:10, color:"#C4CDD8", marginTop:6 }}>Enter to send · Shift+Enter for newline · 📎 attach a file · Powered by Zari AI</p>
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
  // ── Regexes ──────────────────────────────────────────────────
  const BULLET_RE    = /^[•\-\*\u2022►▸→]\s/;
  const DATE_RE      = /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|\d{4})\b.{0,40}\b(20\d{2}|19\d{2}|Present|Current|Now)\b/i;
  const CONTACT_RE   = /@|\(\d{3}\)|\d{3}[\-.\s]\d{3}[\-.\s]\d{4}|linkedin\.com|github\.com/i;
  const SKILL_CAT_RE = /^[A-Za-z][A-Za-z\s&]{2,35}:\s+\S/;
  const NAME_RE      = /^[A-Z][A-Z\s\.]{3,39}[A-Z]$/;

  // Known section titles — matched case-insensitively
  const KNOWN_SECTIONS = [
    "PROFESSIONAL SUMMARY","SUMMARY","OBJECTIVE","PROFILE","ABOUT",
    "SKILLS","TECHNICAL SKILLS","CORE COMPETENCIES","KEY SKILLS","AREAS OF EXPERTISE",
    "PROFESSIONAL EXPERIENCE","EXPERIENCE","EMPLOYMENT HISTORY","WORK EXPERIENCE",
    "EDUCATION","ACADEMIC BACKGROUND",
    "CERTIFICATIONS","CERTIFICATION","LICENSES","LICENSURE",
    "PROJECTS","AWARDS","ACHIEVEMENTS","ACCOMPLISHMENTS",
    "VOLUNTEER","COMMUNITY","INTERESTS","ACTIVITIES","REFERENCES","PUBLICATIONS","CONTACT",
  ];

  // Canonical section render order (matches substring of title)
  const SECTION_ORDER = [
    "SUMMARY","OBJECTIVE","PROFILE","ABOUT",
    "COMPETENCIES","SKILL","EXPERTISE",
    "EXPERIENCE","EMPLOYMENT","WORK",
    "EDUCATION","ACADEMIC",
    "CERTIFICATION","LICENSE",
    "PROJECT","AWARD","ACHIEVEMENT","ACCOMPLISHMENT",
    "VOLUNTEER","COMMUNITY","INTEREST","ACTIVIT","REFERENCE","PUBLICATION","CONTACT",
  ];

  const SECTION_VOCAB = /\b(EXPERIENCE|EDUCATION|CERTIFICATION|LICENSE|SKILL|SUMMARY|OBJECTIVE|AWARD|PROJECT|VOLUNTEER|REFERENCE|PUBLICATION|EMPLOYMENT|HISTORY|WORK|ACADEMIC|BACKGROUND|COMPETENC|EXPERTISE|INTEREST|ACTIVIT|COMMUNITY|CONTACT|PROFILE|ABOUT)\b/;

  const isSectionHeader = (t: string): boolean => {
    if (!t) return false;
    const u = t.toUpperCase().trim();
    // Exact match against known section keywords
    if (KNOWN_SECTIONS.includes(u)) return true;
    // General ALL-CAPS: must contain a recognised section word (prevents names & job titles matching)
    return /^[A-Z][A-Z\s&\/\-]{2,49}$/.test(u)
      && u.split(/\s+/).length <= 5
      && !/\d/.test(u)
      && !/\bPRESENT\b|\bCURRENT\b/.test(u)
      && SECTION_VOCAB.test(u);
  };

  const sectionRank = (title: string): number => {
    const u = title.toUpperCase();
    for (let i = 0; i < SECTION_ORDER.length; i++) {
      if (u.includes(SECTION_ORDER[i])) return i;
    }
    return 999;
  };

  // ── Phase 1: split into header + sections ──────────────────
  interface Sec { title: string; lines: string[]; }
  const headerLines: string[] = [];
  const sections: Sec[] = [];
  let cur: Sec | null = null;
  let inHeader = true;

  for (const raw of text.split("\n")) {
    const t = raw.trim();
    if (isSectionHeader(t)) {
      inHeader = false;
      cur = { title: t, lines: [] };
      sections.push(cur);
    } else if (inHeader) {
      if (t) headerLines.push(t);
    } else if (cur) {
      cur.lines.push(t);
    }
  }

  // ── Phase 2: sort sections into canonical order ────────────
  sections.sort((a, b) => sectionRank(a.title) - sectionRank(b.title));

  // ── Phase 3: render section content lines ─────────────────
  // autoBullet: experience/work sections auto-wrap body paragraphs as <li>
  function renderLines(lines: string[], autoBullet = false): string {
    // Pre-join: if a line doesn't end in sentence punctuation and the NEXT line
    // starts with lowercase, merge them (handles PDF-wrapped long sentences).
    const joined: string[] = [];
    for (let i = 0; i < lines.length; i++) {
      const t = lines[i].trim();
      if (!t) { joined.push(""); continue; }
      let combined = t;
      while (
        i + 1 < lines.length &&
        !/[.!?]$/.test(combined) &&
        lines[i + 1].trim().length > 0 &&
        /^[a-z]/.test(lines[i + 1].trim())
      ) {
        i++;
        combined += " " + lines[i].trim();
      }
      joined.push(combined);
    }

    let html = "";
    let inList = false;
    // pending: either a company/title label, or "__date__<dateStr>" when a date
    // line appears before its company name (common in this PDF's extraction order).
    let pending: string | null = null;
    let afterJobEntry = false;

    const closeList = () => { if (inList) { html += "</ul>\n"; inList = false; } };
    const flushPending = (date?: string) => {
      if (pending === null) return;
      const isDatePending = pending.startsWith("__date__");
      if (isDatePending) {
        // Stored date waiting for a company name that never came — emit standalone
        html += `<p class="date-standalone">${escHtml(pending.slice(8))}</p>\n`;
      } else if (date) {
        html += `<div class="job-hdr"><span class="company">${escHtml(pending)}</span><span class="date-r">${escHtml(date)}</span></div>\n`;
        afterJobEntry = true;
      } else {
        html += `<p class="bold-line">${escHtml(pending)}</p>\n`;
        afterJobEntry = true;
      }
      pending = null;
    };

    for (const t of joined) {
      if (!t) { closeList(); flushPending(); html += "<br>\n"; continue; }

      // Bullet: char-only (no space required) OR hyphen/asterisk with space
      if (/^[•\u2022►▸→]/.test(t) || /^[-*]\s/.test(t)) {
        flushPending();
        if (!inList) { html += "<ul>\n"; inList = true; afterJobEntry = false; }
        html += `  <li>${escHtml(t.replace(/^[•\u2022►▸→\-*]\s*/, ""))}</li>\n`;
        continue;
      }
      closeList();

      if (CONTACT_RE.test(t) && t.length < 160) {
        flushPending(); html += `<p class="contact">${escHtml(t)}</p>\n`; continue;
      }

      if (SKILL_CAT_RE.test(t) && t.length < 200) {
        flushPending();
        const ci = t.indexOf(":");
        html += `<p class="skill-line"><strong>${escHtml(t.slice(0, ci))}:</strong>${escHtml(t.slice(ci + 1))}</p>\n`;
        continue;
      }

      if (DATE_RE.test(t) && t.length < 90) {
        if (pending !== null && !pending.startsWith("__date__")) {
          // Company name is buffered → emit job-hdr (company left, date right)
          flushPending(t);
        } else {
          // Date arrives before company name → store it, wait for company on next line
          flushPending(); // flush any leftover date-pending first
          pending = `__date__${t}`;
        }
        continue;
      }

      // Short line without trailing sentence punctuation → company name or job title.
      // Lines ending in period/comma are sentence tails and must NOT be bolded.
      if (t.length < 80 && t.split(/\s+/).length <= 7 && !/[.,:;]$/.test(t)) {
        if (pending && pending.startsWith("__date__")) {
          // A date was waiting — this short line IS the company name → job-hdr
          const savedDate = pending.slice(8);
          html += `<div class="job-hdr"><span class="company">${escHtml(t)}</span><span class="date-r">${escHtml(savedDate)}</span></div>\n`;
          pending = null;
          afterJobEntry = true;
        } else {
          flushPending();
          pending = t;
        }
        continue;
      }

      // Auto-bullet: in experience sections, body paragraphs after a job entry → <li>
      if (autoBullet && afterJobEntry) {
        flushPending();
        if (!inList) { html += "<ul>\n"; inList = true; }
        html += `  <li>${escHtml(t)}</li>\n`;
        continue;
      }

      flushPending();
      html += `<p>${escHtml(t)}</p>\n`;
    }
    closeList();
    flushPending();
    return html;
  }

  // ── Phase 4: render header ─────────────────────────────────
  let headerHtml = "";
  for (const t of headerLines) {
    if (
      NAME_RE.test(t) &&
      t.split(/\s+/).length >= 2 &&
      t.split(/\s+/).length <= 6 &&
      !/\b(EXPERIENCE|EDUCATION|SKILLS|SUMMARY|CERTIFICATIONS?|EMPLOYMENT|PROFESSIONAL|OBJECTIVE)\b/i.test(t)
    ) {
      headerHtml += `<p class="name">${escHtml(t)}</p>\n`;
    } else {
      headerHtml += `<p class="contact">${escHtml(t)}</p>\n`;
    }
  }

  // ── Phase 5: assemble ──────────────────────────────────────
  let body = headerHtml;
  for (const sec of sections) {
    body += `<div class="sec-hdr">${escHtml(sec.title.toUpperCase())}</div>\n`;
    const isExpSec = /experience|employment|work/i.test(sec.title);
    body += renderLines(sec.lines, isExpSec);
  }

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

const RESUME_SESSION_KEY = "zari_resume_session_v2";
const RESUME_PDF_KEY     = "zari_resume_pdf_v2";
function loadResumeSession(): { resumeText:string; fileName:string; aiResult:ResumeAnalysis; reviewMode:"general"|"targeted"; targetRoleInput:string; careerLevel:CareerLevel } | null {
  try {
    const raw = localStorage.getItem(RESUME_SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as { resumeText:string; fileName:string; aiResult:ResumeAnalysis; reviewMode:"general"|"targeted"; targetRoleInput:string; careerLevel:CareerLevel; savedAt:string };
    // Expire sessions older than 7 days
    if (Date.now() - new Date(s.savedAt).getTime() > 7 * 86400_000) { localStorage.removeItem(RESUME_SESSION_KEY); return null; }
    return s;
  } catch { return null; }
}

function ScreenResume({ stage, onNavigate }: { stage: CareerStage; onNavigate?: (screen: string) => void }) {
  const _saved = loadResumeSession();
  const [step, setStep]         = useState<ResumeStep>(_saved ? "results" : "choose");
  const [progress, setProgress] = useState(0);
  const [tab, setTab]           = useState<"overview"|"bullets"|"rewrite"|"keywords"|"history">("overview");
  const [careerLevel, setCareerLevel] = useState<CareerLevel>(_saved?.careerLevel ?? "mid");
  const [dragging, setDragging] = useState(false);
  const [resumeText,  setResumeText]  = useState(_saved?.resumeText ?? "");
  const [fileName,    setFileName]    = useState(_saved?.fileName ?? "");
  const [aiResult,    setAiResult]    = useState<ResumeAnalysis | null>(_saved?.aiResult ?? null);
  const [analyzeErr,  setAnalyzeErr]  = useState("");
  // History
  const [scoreHistory,    setScoreHistory]    = useState<ResumeHistoryEntry[]>([]);
  const [historyLoading,  setHistoryLoading]  = useState(false);
  // Per-section alternative rewrites
  const [altVersions,     setAltVersions]     = useState<Record<string, string>>({});
  const [rewritingIdx,    setRewritingIdx]     = useState<number | null>(null);
  const [altAttempt,      setAltAttempt]       = useState<Record<number, number>>({});
  const [reviewMode,      setReviewMode]      = useState<"general"|"targeted">(_saved?.reviewMode ?? "general");
  const [targetRoleInput, setTargetRoleInput] = useState(_saved?.targetRoleInput ?? "");
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

  // Restore PDF blob URL from localStorage when loading a saved session
  useEffect(() => {
    if (!_saved) return;
    try {
      const b64 = localStorage.getItem(RESUME_PDF_KEY);
      if (!b64) return;
      const base64Data = b64.includes(",") ? b64.split(",")[1] : b64;
      const byteStr = atob(base64Data);
      const bytes = new Uint8Array(byteStr.length);
      for (let i = 0; i < byteStr.length; i++) bytes[i] = byteStr.charCodeAt(i);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      rawFileUrlRef.current = url;
      setRawFileUrl(url);
    } catch { /* PDF not stored or corrupted — re-upload fallback shown */ }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  async function buildRevisedHtml(): Promise<string> {
    if (!aiResult) return "";
    // Use positionally-extracted text so sections come out in visual reading order,
    // not the potentially-scrambled order from the server-side PDF parser.
    let baseText = resumeText;
    if (rawFileUrl) {
      try { baseText = await extractPositionedText(rawFileUrl); } catch { /* fall back */ }
    }
    let revised = baseText;
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
      const html = await buildRevisedHtml();
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

    // Persist PDF as base64 so it survives page refresh (skip files >3 MB)
    if (file.size < 3 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        try { localStorage.setItem(RESUME_PDF_KEY, reader.result as string); } catch { /* storage full */ }
      };
      reader.readAsDataURL(file);
    }

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
        // Persist session so page refresh lands back on results
        try { localStorage.setItem(RESUME_SESSION_KEY, JSON.stringify({ resumeText:textToAnalyze, fileName:fileName||"resume", aiResult:data, reviewMode, targetRoleInput, careerLevel, savedAt:new Date().toISOString() })); } catch { /* non-fatal */ }
        // Save to doc vault
        try { vaultSave({ type:"resume", name:fileName||"Resume", content:textToAnalyze, meta:{ score:String(data.overall), targetRole:targetRoleInput||"" } }); } catch { /* non-fatal */ }
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
        setAnalyzeErr((data as {error?:string}|null)?.error ?? "Analysis failed — try again.");
      }
    } catch (e) {
      clearInterval(interval);
      setStep("paste");
      setAnalyzeErr("Connection error — " + (e instanceof Error ? e.message : "try again."));
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
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#0A1628" }}>
      <div style={{ maxWidth:720, margin:"0 auto", padding:"40px 24px 64px" }}>

        {/* Dark hero banner */}
        <div style={{ background:"linear-gradient(135deg,#1A1240,#0D1321)", borderRadius:20, padding:"32px 36px 36px", marginBottom:28, boxShadow:"0 12px 48px rgba(0,0,0,0.22)", border:"1px solid rgba(255,255,255,0.07)", position:"relative", overflow:"hidden" }}>
          {/* Glow blob */}
          <div style={{ position:"absolute", top:-60, right:-40, width:260, height:260, background:"radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%)", pointerEvents:"none" }}/>
          <div style={{ position:"relative" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(99,102,241,0.18)", border:"1px solid rgba(99,102,241,0.35)", borderRadius:99, padding:"5px 14px", marginBottom:16 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#818CF8" }}/>
              <span style={{ fontSize:11.5, fontWeight:700, color:"#A5B4FC", letterSpacing:"0.06em" }}>RESUME REVIEW</span>
            </div>
            <h1 style={{ fontSize:28, fontWeight:900, letterSpacing:"-0.04em", color:"white", marginBottom:10, lineHeight:1.2 }}>Upload your resume.<br/>Get a score that matters.</h1>
            <p style={{ fontSize:14.5, color:"rgba(255,255,255,0.45)", lineHeight:1.65, maxWidth:480 }}>Zari scores ATS compatibility, impact language, and clarity — then rewrites every weak line into something you can send tonight.</p>
          </div>
        </div>

        {/* Two path cards */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:18 }}>
          {/* Score My Resume */}
          <button
            onClick={()=>{ setReviewMode("general"); setStep("upload"); }}
            style={{ textAlign:"left", padding:"22px 20px", borderRadius:18, border:"1px solid rgba(67,97,238,0.3)", background:"rgba(67,97,238,0.08)", cursor:"pointer", transition:"all 0.18s", position:"relative", overflow:"hidden" }}
            onMouseEnter={e=>(e.currentTarget.style.background="rgba(67,97,238,0.14)",e.currentTarget.style.transform="translateY(-2px)")}
            onMouseLeave={e=>(e.currentTarget.style.background="rgba(67,97,238,0.08)",e.currentTarget.style.transform="translateY(0)")}
          >
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:"linear-gradient(180deg,#4361EE,#818CF8)", borderRadius:"18px 0 0 18px" }}/>
            <div style={{ width:40, height:40, borderRadius:12, background:"rgba(67,97,238,0.25)", border:"1px solid rgba(67,97,238,0.4)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="#818CF8" strokeWidth="1.8" style={{ width:18,height:18 }}><rect x="3" y="2" width="14" height="16" rx="2"/><path d="M7 7h6M7 10h6M7 13h4"/></svg>
            </div>
            <p style={{ fontSize:16, fontWeight:800, color:"white", marginBottom:5, letterSpacing:"-0.02em" }}>Score My Resume</p>
            <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.45)", lineHeight:1.55, marginBottom:14 }}>Instant feedback. Zari scores ATS, impact, and clarity against universal standards.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:16 }}>
              {["ATS compatibility","Bullet rewrites","Impact scoring","Downloadable version"].map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <svg viewBox="0 0 12 12" fill="none" stroke="#4ADE80" strokeWidth="2" style={{ width:10,height:10,flexShrink:0 }}><path d="M2 6l3 3 5-5"/></svg>
                  <span style={{ fontSize:11.5, color:"rgba(255,255,255,0.6)" }}>{f}</span>
                </div>
              ))}
            </div>
            <span style={{ fontSize:12.5, fontWeight:700, padding:"7px 16px", borderRadius:9, background:"rgba(67,97,238,0.4)", color:"#A5B4FC", border:"1px solid rgba(67,97,238,0.5)", display:"inline-block" }}>Start →</span>
          </button>

          {/* Targeted Resume */}
          <button
            onClick={()=>{ setReviewMode("targeted"); setStep("job"); }}
            style={{ textAlign:"left", padding:"22px 20px", borderRadius:18, border:"1px solid rgba(124,58,237,0.35)", background:"rgba(124,58,237,0.08)", cursor:"pointer", transition:"all 0.18s", position:"relative", overflow:"hidden" }}
            onMouseEnter={e=>(e.currentTarget.style.background="rgba(124,58,237,0.14)",e.currentTarget.style.transform="translateY(-2px)")}
            onMouseLeave={e=>(e.currentTarget.style.background="rgba(124,58,237,0.08)",e.currentTarget.style.transform="translateY(0)")}
          >
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:"linear-gradient(180deg,#7C3AED,#A78BFA)", borderRadius:"18px 0 0 18px" }}/>
            <div style={{ position:"absolute", top:14, right:14, background:"rgba(167,139,250,0.2)", border:"1px solid rgba(167,139,250,0.4)", color:"#C4B5FD", fontSize:9.5, fontWeight:800, padding:"2px 9px", borderRadius:99, letterSpacing:"0.06em" }}>RECOMMENDED</div>
            <div style={{ width:40, height:40, borderRadius:12, background:"rgba(124,58,237,0.25)", border:"1px solid rgba(124,58,237,0.4)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="#A78BFA" strokeWidth="1.8" style={{ width:18,height:18 }}><circle cx="9" cy="9" r="5.5"/><path d="M15 15l3 3"/><path d="M7 9l2 2 4-4"/></svg>
            </div>
            <p style={{ fontSize:16, fontWeight:800, color:"white", marginBottom:5, letterSpacing:"-0.02em" }}>Targeted Resume</p>
            <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.45)", lineHeight:1.55, marginBottom:14 }}>Applying to a specific job? Paste the JD and Zari scores against every requirement.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:16 }}>
              {["Keyword match vs. JD","Job Match score","JD-tuned rewrites","Missing skills callout"].map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <svg viewBox="0 0 12 12" fill="none" stroke="#C4B5FD" strokeWidth="2" style={{ width:10,height:10,flexShrink:0 }}><path d="M2 6l3 3 5-5"/></svg>
                  <span style={{ fontSize:11.5, color:"rgba(255,255,255,0.6)" }}>{f}</span>
                </div>
              ))}
            </div>
            <span style={{ fontSize:12.5, fontWeight:700, padding:"7px 16px", borderRadius:9, background:"rgba(124,58,237,0.35)", color:"#C4B5FD", border:"1px solid rgba(124,58,237,0.5)", display:"inline-block" }}>Start →</span>
          </button>
        </div>

        {/* Feature strip */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
          {[
            { icon:<svg viewBox="0 0 16 16" fill="none" stroke="#818CF8" strokeWidth="1.6" style={{width:13,height:13}}><path d="M13 3L6 11l-3-3"/></svg>, label:"ATS-optimized" },
            { icon:<svg viewBox="0 0 16 16" fill="none" stroke="#818CF8" strokeWidth="1.6" style={{width:13,height:13}}><path d="M8 2v8M4 7l4 4 4-4"/><path d="M2 13h12"/></svg>, label:"Download ready" },
            { icon:<svg viewBox="0 0 16 16" fill="none" stroke="#818CF8" strokeWidth="1.6" style={{width:13,height:13}}><path d="M3 8l4-8 3 5 2-3 3 6"/></svg>, label:"Score history" },
            { icon:<svg viewBox="0 0 16 16" fill="none" stroke="#818CF8" strokeWidth="1.6" style={{width:13,height:13}}><path d="M13 2l1 4-8.5 8.5L2 16l1.5-3.5L12 4l1-2z"/></svg>, label:"Magic Write" },
          ].map((f,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.04)", borderRadius:11, border:"1px solid rgba(255,255,255,0.08)", padding:"9px 11px", textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              {f.icon}
              <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontWeight:600, margin:0 }}>{f.label}</p>
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
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#0A1628" }}>
      <div style={{ maxWidth:580, margin:"0 auto", padding:"44px 24px 56px" }}>

        {/* Step progress */}
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:0, marginBottom:32 }}>
          {(["1. The Job","2. Your Resume"] as const).map((label, i) => {
            const active = i === 0;
            return (
              <div key={i} style={{ display:"flex", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:99, background:active?"rgba(67,97,238,0.3)":"rgba(255,255,255,0.05)", border:`1.5px solid ${active?"rgba(67,97,238,0.6)":"rgba(255,255,255,0.1)"}` }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:active?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:10.5, fontWeight:800, color:active?"white":"rgba(255,255,255,0.3)" }}>{i+1}</span>
                  </div>
                  <span style={{ fontSize:12, fontWeight:700, color:active?"white":"rgba(255,255,255,0.3)" }}>{label}</span>
                </div>
                {i === 0 && <div style={{ width:28, height:1.5, background:"rgba(255,255,255,0.12)" }}/>}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:20, border:"1px solid rgba(255,255,255,0.1)", padding:"28px 28px 24px" }}>
          <h2 style={{ fontSize:22, fontWeight:900, letterSpacing:"-0.03em", color:"white", marginBottom:4 }}>1. Paste your job description</h2>
          <p style={{ fontSize:13.5, color:"rgba(255,255,255,0.45)", lineHeight:1.6, marginBottom:24 }}>Copy and paste the full job description — Zari will match your resume against every requirement.</p>

          {/* Career level */}
          <div style={{ marginBottom:20 }}>
            <p style={{ fontSize:11.5, fontWeight:700, color:"rgba(255,255,255,0.5)", marginBottom:8 }}>Your career level</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7 }}>
              {([["entry","Entry","0–2 yrs"],["mid","Mid-Level","3–7 yrs"],["senior","Senior","8–15 yrs"],["executive","Executive","VP+"]] as [CareerLevel,string,string][]).map(([lvl,label,sub])=>(
                <button key={lvl} onClick={()=>setCareerLevel(lvl)} style={{ padding:"8px 6px", borderRadius:10, border:`1.5px solid ${careerLevel===lvl?"rgba(67,97,238,0.7)":"rgba(255,255,255,0.1)"}`, background:careerLevel===lvl?"rgba(67,97,238,0.25)":"rgba(255,255,255,0.04)", cursor:"pointer", textAlign:"center", transition:"all 0.12s" }}>
                  <p style={{ fontSize:12, fontWeight:700, color:careerLevel===lvl?"#A5B4FC":"rgba(255,255,255,0.65)", margin:0 }}>{label}</p>
                  <p style={{ fontSize:10, color:"rgba(255,255,255,0.3)", margin:0 }}>{sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Job title */}
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:11.5, fontWeight:700, color:"rgba(255,255,255,0.5)", display:"block", marginBottom:6 }}>Target job title <span style={{ color:"rgba(255,255,255,0.25)", fontWeight:400 }}>(optional)</span></label>
            <input
              type="text"
              value={targetRoleInput}
              onChange={e=>{ setTargetRoleInput(e.target.value); if(analyzeErr) setAnalyzeErr(""); }}
              placeholder="e.g. Senior DevOps Engineer, Staff SRE, Product Manager…"
              style={{ width:"100%", border:"1.5px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"10px 12px", fontSize:13.5, color:"rgba(255,255,255,0.85)", outline:"none", fontFamily:"inherit", boxSizing:"border-box", background:"rgba(255,255,255,0.05)" }}
            />
          </div>

          {/* JD input */}
          <div style={{ marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
              <label style={{ fontSize:11.5, fontWeight:700, color:"rgba(255,255,255,0.5)" }}>Job description <span style={{ color:"#F87171", fontWeight:700 }}>*</span></label>
              <div style={{ display:"flex", background:"rgba(255,255,255,0.06)", borderRadius:8, padding:2 }}>
                {(["paste","url"] as const).map(m=>(
                  <button key={m} onClick={()=>{ setJdInputMode(m); setJdUrlErr(""); }} style={{ fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:6, border:"none", background:jdInputMode===m?"rgba(255,255,255,0.12)":"transparent", color:jdInputMode===m?"white":"rgba(255,255,255,0.35)", cursor:"pointer", transition:"all 0.12s" }}>
                    {m==="paste"?"Paste text":"Job URL"}
                  </button>
                ))}
              </div>
            </div>
            {jdInputMode==="paste" ? (
              <textarea
                value={jobDescription}
                onChange={e=>{ setJobDescription(e.target.value); if(analyzeErr) setAnalyzeErr(""); }}
                placeholder={"Paste the full job posting here…"}
                style={{ width:"100%", minHeight:160, border:"1.5px solid rgba(255,255,255,0.12)", borderRadius:12, padding:"12px 14px", fontSize:13, color:"rgba(255,255,255,0.85)", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"rgba(255,255,255,0.04)", lineHeight:1.65 }}
              />
            ) : (
              <div>
                <div style={{ display:"flex", gap:8 }}>
                  <input type="url" value={jdUrl} onChange={e=>{ setJdUrl(e.target.value); setJdUrlErr(""); }} placeholder="https://jobs.lever.co/…" style={{ flex:1, border:"1.5px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"10px 11px", fontSize:13, color:"rgba(255,255,255,0.85)", outline:"none", fontFamily:"inherit", background:"rgba(255,255,255,0.05)" }} onKeyDown={e=>{ if(e.key==="Enter") void fetchResumeJdFromUrl(); }}/>
                  <button onClick={()=>void fetchResumeJdFromUrl()} disabled={fetchingJdUrl||!jdUrl.trim()} style={{ padding:"10px 18px", borderRadius:10, border:"none", background:jdUrl.trim()&&!fetchingJdUrl?"#4361EE":"rgba(255,255,255,0.06)", color:jdUrl.trim()&&!fetchingJdUrl?"white":"rgba(255,255,255,0.25)", fontSize:13, fontWeight:700, cursor:jdUrl.trim()&&!fetchingJdUrl?"pointer":"default", flexShrink:0 }}>
                    {fetchingJdUrl?"…":"Fetch"}
                  </button>
                </div>
                {jdUrlErr && <p style={{ fontSize:12, color:"#F87171", marginTop:6, marginBottom:0 }}>{jdUrlErr} <button onClick={()=>setJdInputMode("paste")} style={{ background:"none", border:"none", color:"#818CF8", fontWeight:600, cursor:"pointer", fontSize:12, padding:0 }}>Paste instead</button></p>}
                {jobDescription && !jdUrlErr && <p style={{ fontSize:11.5, color:"#4ADE80", marginTop:6, marginBottom:0, fontWeight:600 }}>✓ Fetched — {jobDescription.length.toLocaleString()} characters</p>}
              </div>
            )}
          </div>

          {/* Info tip */}
          <div style={{ display:"flex", gap:8, padding:"10px 12px", background:"rgba(124,58,237,0.1)", borderRadius:10, border:"1px solid rgba(124,58,237,0.25)", marginBottom:20 }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="#A78BFA" strokeWidth="1.6" style={{ width:14,height:14,flexShrink:0,marginTop:1 }}><circle cx="8" cy="8" r="6"/><path d="M8 5v4M8 10v1"/></svg>
            <p style={{ fontSize:12, color:"#C4B5FD", lineHeight:1.55, margin:0 }}>Paste the roles, responsibilities, and qualifications. Skip the &quot;About Us&quot;, benefits, and salary sections — those don&apos;t affect keyword matching.</p>
          </div>

          {analyzeErr && <div style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:10, padding:"9px 14px", marginBottom:14, fontSize:13, color:"#FCA5A5" }}>{analyzeErr}</div>}

          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>setStep("choose")} style={{ fontSize:13, fontWeight:600, padding:"11px 20px", borderRadius:11, border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.5)", cursor:"pointer" }}>← Back</button>
            <button
              onClick={()=>setStep("upload")}
              disabled={!jobDescription.trim() && !targetRoleInput.trim()}
              style={{ flex:1, fontSize:14, fontWeight:700, padding:"11px", borderRadius:11, border:"none", background:(jobDescription.trim()||targetRoleInput.trim())?"linear-gradient(135deg,#4361EE,#818CF8)":"rgba(255,255,255,0.06)", color:(jobDescription.trim()||targetRoleInput.trim())?"white":"rgba(255,255,255,0.2)", cursor:(jobDescription.trim()||targetRoleInput.trim())?"pointer":"default", boxShadow:(jobDescription.trim()||targetRoleInput.trim())?"0 6px 20px rgba(67,97,238,0.4)":"none", transition:"all 0.2s" }}
            >
              Next: Upload your resume →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (step === "paste") return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#0A1628" }}>
      <div style={{ minHeight:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"44px 24px 56px" }}>
        <div style={{ width:"100%", maxWidth:560 }}>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"rgba(255,255,255,0.3)", marginBottom:10 }}>Resume Review</p>
            <h1 style={{ fontSize:26, fontWeight:900, letterSpacing:"-0.04em", color:"white", marginBottom:8 }}>Paste your resume text</h1>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)" }}>Copy and paste your full resume below — Zari will score and rewrite it.</p>
          </div>
          {analyzeErr && <div style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:10, padding:"10px 14px", marginBottom:14, fontSize:13, color:"#FCA5A5" }}>{analyzeErr}</div>}
          <textarea
            style={{ width:"100%", minHeight:280, border:"1.5px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"16px 18px", fontSize:13.5, lineHeight:1.7, color:"rgba(255,255,255,0.85)", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"rgba(255,255,255,0.04)", boxShadow:"none" }}
            placeholder={"Paste your full resume here...\n\nName\nJob Title · Location · Email\n\nSummary\n...\n\nExperience\n..."}
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
          />
          <div style={{ display:"flex", gap:10, marginTop:14 }}>
            <button onClick={() => setStep("upload")} style={{ fontSize:13, fontWeight:600, padding:"10px 20px", borderRadius:10, border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.5)", cursor:"pointer" }}>← Back</button>
            <button onClick={() => void runAnalysis()} disabled={!resumeText.trim() || targetedInvalid}
              style={{ flex:1, fontSize:14, fontWeight:700, padding:"11px", borderRadius:10, border:"none", background:resumeText.trim()&&!targetedInvalid?"linear-gradient(135deg,#4361EE,#818CF8)":"rgba(255,255,255,0.06)", color:resumeText.trim()&&!targetedInvalid?"white":"rgba(255,255,255,0.2)", cursor:resumeText.trim()&&!targetedInvalid?"pointer":"default", boxShadow:resumeText.trim()&&!targetedInvalid?"0 6px 20px rgba(67,97,238,0.4)":"none", transition:"all 0.2s" }}>
              Analyze with Zari →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (step === "upload") return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#0A1628" }}>
      <div style={{ minHeight:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"44px 24px 56px" }}>
        <div style={{ width:"100%", maxWidth:520 }}>

          {/* Step label */}
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"rgba(255,255,255,0.3)", marginBottom:10 }}>
              {reviewMode==="targeted" ? "Step 2 of 2" : "Resume Review"}
            </p>
            <h1 style={{ fontSize:28, fontWeight:900, color:"white", letterSpacing:"-0.04em", marginBottom:10, lineHeight:1.15 }}>
              {reviewMode==="targeted" ? "Now upload your resume" : "Upload your resume"}
            </h1>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", lineHeight:1.6, maxWidth:380, margin:"0 auto" }}>
              Zari scores ATS compatibility, rewrites every weak bullet, and gives you a job-ready version to send tonight.
            </p>
            {reviewMode==="targeted" && (jobDescription||targetRoleInput) && (
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:14, background:"rgba(74,222,128,0.1)", border:"1px solid rgba(74,222,128,0.25)", borderRadius:99, padding:"5px 13px" }}>
                <svg viewBox="0 0 12 12" fill="none" stroke="#4ADE80" strokeWidth="2" style={{ width:10,height:10,flexShrink:0 }}><path d="M2 6l3 3 5-5"/></svg>
                <span style={{ fontSize:11.5, color:"#86EFAC", fontWeight:600 }}>
                  {targetRoleInput ? `Targeting: ${targetRoleInput}` : "Job description loaded"}
                </span>
                <button onClick={()=>setStep("job")} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.35)", fontWeight:600, cursor:"pointer", fontSize:11, padding:"0 0 0 4px" }}>Edit</button>
              </div>
            )}
          </div>

          {analyzeErr && <div style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:10, padding:"9px 14px", marginBottom:14, fontSize:13, color:"#FCA5A5" }}>{analyzeErr}</div>}

          {/* Drop zone */}
          <label
            onDragOver={e=>{e.preventDefault();setDragging(true);}}
            onDragLeave={()=>setDragging(false)}
            onDrop={e=>{e.preventDefault();setDragging(false);const f=e.dataTransfer.files?.[0];if(f)void handleFile(f);}}
            style={{ display:"block", border:`2px dashed ${dragging?"#4361EE":"rgba(255,255,255,0.15)"}`, borderRadius:20, padding:"44px 32px", textAlign:"center", cursor:"pointer", background:dragging?"rgba(67,97,238,0.12)":"rgba(255,255,255,0.03)", transition:"all 0.2s", boxShadow:dragging?"0 0 0 4px rgba(67,97,238,0.15)":"none", marginBottom:14 }}
          >
            <input type="file" accept=".pdf,.docx,.txt" style={{ display:"none" }} onChange={e=>{ const f=e.target.files?.[0]; if(f) void handleFile(f); e.target.value=""; }}/>
            <div style={{ width:54, height:54, borderRadius:15, background:"rgba(67,97,238,0.2)", border:"1px solid rgba(67,97,238,0.4)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.8" style={{ width:24, height:24 }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <p style={{ fontSize:16, fontWeight:700, color:"white", marginBottom:5 }}>Drop your resume here</p>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.35)", marginBottom:18 }}>PDF, DOCX, or TXT — or click to browse</p>
            <span style={{ fontSize:12.5, fontWeight:700, padding:"8px 22px", borderRadius:99, background:"rgba(67,97,238,0.3)", color:"#A5B4FC", border:"1px solid rgba(67,97,238,0.4)" }}>Choose file</span>
          </label>

          {/* Level + controls */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:9, padding:"5px 12px" }}>
              <span style={{ fontSize:11.5, color:"rgba(255,255,255,0.4)" }}>Level:</span>
              <select value={careerLevel} onChange={e=>setCareerLevel(e.target.value as CareerLevel)}
                style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.85)", background:"transparent", border:"none", outline:"none", cursor:"pointer", fontFamily:"inherit" }}>
                <option value="entry">Entry</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
                <option value="executive">Executive</option>
              </select>
            </div>
            <button onClick={()=>setStep("paste")} style={{ background:"none", border:"none", color:"#818CF8", fontWeight:600, cursor:"pointer", fontSize:12.5, padding:0 }}>paste text instead</button>
          </div>

          {/* Feature list */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
            {SCREEN_RESUME_META[stage].features.map(f => (
              <div key={f.title} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:13, padding:"12px 14px", display:"flex", gap:10, alignItems:"flex-start" }}>
                <span style={{ fontSize:18, lineHeight:1, flexShrink:0 }}>{f.icon}</span>
                <div>
                  <p style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.8)", marginBottom:2 }}>{f.title}</p>
                  <p style={{ fontSize:11, color:"rgba(255,255,255,0.35)", lineHeight:1.5 }}>{f.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <button onClick={()=>setStep(reviewMode==="targeted"?"job":"choose")} style={{ fontSize:12.5, fontWeight:600, padding:"9px 16px", borderRadius:10, border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.5)", cursor:"pointer" }}>← Back</button>
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", gap:5 }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width:11,height:11 }}><rect x="3" y="7" width="10" height="8" rx="1.5"/><path d="M5 7V5a3 3 0 016 0v2"/></svg>
              Private &amp; secure
            </p>
          </div>

        </div>
      </div>
    </div>
  );

  if (step === "analyzing") return (
    <div style={{ height:"calc(100vh - 56px)", display:"flex", alignItems:"center", justifyContent:"center", background:"#F0F2F8" }}>
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
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#F0F2F8" }}>

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

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"24px 32px 48px" }}>

        {/* ── Top bar ── */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, gap:12, flexWrap:"wrap" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button onClick={()=>{ setStep("choose"); setAiResult(null); setResumeText(""); setFileName(""); setAltVersions({}); setAltAttempt({}); setMagicWrite({}); setTab("overview"); if (rawFileUrlRef.current) { URL.revokeObjectURL(rawFileUrlRef.current); rawFileUrlRef.current = null; } setRawFileUrl(null); try { localStorage.removeItem(RESUME_SESSION_KEY); localStorage.removeItem(RESUME_PDF_KEY); } catch { /* ignore */ } }} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, fontWeight:600, color:"#68738A", background:"white", border:"1px solid #E4E8F5", borderRadius:8, padding:"6px 12px", cursor:"pointer" }}>
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
            <div style={{ background:"linear-gradient(135deg, #0D1321 0%, #141E30 100%)", borderRadius:20, border:"1px solid rgba(255,255,255,0.07)", padding:"24px 28px", marginBottom:20, boxShadow:"0 12px 48px rgba(0,0,0,0.22)", position:"relative", overflow:"hidden" }}>
              {/* Ambient glow blobs */}
              <div style={{ position:"absolute", top:-50, right:tailored!==null?200:80, width:220, height:220, background:`radial-gradient(circle,${lcolor}22 0%,transparent 70%)`, pointerEvents:"none" }}/>
              <div style={{ position:"absolute", bottom:-60, left:40, width:160, height:160, background:"radial-gradient(circle,rgba(67,97,238,0.12) 0%,transparent 70%)", pointerEvents:"none" }}/>

              <div style={{ display:"grid", gridTemplateColumns: tailored!==null ? "168px 1fr 168px" : "168px 1fr", gap:28, alignItems:"center", position:"relative" }}>

                {/* Big overall score ring */}
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                  <div style={{ position:"relative" }}>
                    <ScoreRing score={overall} color={lcolor} size={116} dark={true}/>
                    <div style={{ position:"absolute", bottom:-8, left:"50%", transform:"translateX(-50%)", background:"rgba(255,255,255,0.1)", backdropFilter:"blur(6px)", color:"rgba(255,255,255,0.9)", fontSize:10.5, fontWeight:800, padding:"3px 11px", borderRadius:99, border:"1px solid rgba(255,255,255,0.15)", whiteSpace:"nowrap", boxShadow:"0 2px 8px rgba(0,0,0,0.2)" }}>
                      {lgrade} · {grade.label}
                    </div>
                  </div>
                  <p style={{ fontSize:11.5, fontWeight:700, color:"rgba(255,255,255,0.4)", marginTop:14, letterSpacing:"0.05em", textTransform:"uppercase" }}>Overall</p>
                  {overallDelta !== null && (
                    <span style={{ fontSize:11, color:overallDelta>0?"#4ADE80":overallDelta<0?"#F87171":"rgba(255,255,255,0.3)", fontWeight:700, display:"flex", alignItems:"center", gap:3 }}>
                      {overallDelta>0?"+":""}{overallDelta} vs last {overallDelta>0?"↑":overallDelta<0?"↓":"="}
                    </span>
                  )}
                </div>

                {/* Sub-score bars */}
                <div style={{ display:"flex", flexDirection:"column", gap:16, paddingLeft: tailored!==null ? 4 : 16 }}>
                  {subScores.map(sc => {
                    const prev = aiResult?.previousScores?.[sc.key] ?? null;
                    const d = prev !== null ? sc.score - prev : null;
                    return (
                      <div key={sc.label}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                            <span style={{ color:sc.color }}>{sc.icon}</span>
                            <span style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.85)" }}>{sc.label}</span>
                            <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>{sc.note}</span>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            {d !== null && d !== 0 && (
                              <span style={{ fontSize:10.5, fontWeight:700, color:d>0?"#4ADE80":"#F87171", background:d>0?"rgba(74,222,128,0.12)":"rgba(248,113,113,0.12)", padding:"1px 7px", borderRadius:99 }}>
                                {d>0?"+":""}{d}
                              </span>
                            )}
                            <span style={{ fontSize:22, fontWeight:900, color:sc.color, lineHeight:1, letterSpacing:"-0.03em", textShadow:`0 0 16px ${sc.color}66` }}>{sc.score}</span>
                          </div>
                        </div>
                        <div style={{ height:6, borderRadius:99, background:"rgba(255,255,255,0.08)", overflow:"hidden" }}>
                          <div style={{ width:`${sc.score}%`, height:"100%", borderRadius:99, background:`linear-gradient(90deg, ${sc.color}88, ${sc.color})`, transition:"width 1s cubic-bezier(0.4,0,0.2,1)", boxShadow:`0 0 8px ${sc.color}66` }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tailored job-match panel */}
                {tailored !== null && (
                  <div style={{ borderLeft:"1px solid rgba(255,255,255,0.07)", paddingLeft:28, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                    <ScoreRing score={tailored} color={gradeColor(tailored)} size={92} dark={true}/>
                    <p style={{ fontSize:11.5, fontWeight:700, color:"rgba(255,255,255,0.7)", marginTop:10, textAlign:"center" }}>Job Match</p>
                    <span style={{ fontSize:10.5, color:"rgba(255,255,255,0.35)", textAlign:"center", lineHeight:1.45 }}>How closely you target this role</span>
                    <span style={{ fontSize:11, fontWeight:700, padding:"3px 11px", borderRadius:99, background:`${gradeColor(tailored)}22`, color:gradeColor(tailored), border:`1px solid ${gradeColor(tailored)}44`, marginTop:2 }}>
                      {tailored>=75?"Strong fit":tailored>=55?"Partial fit":tailored>=35?"Weak fit":"Mismatch"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ══ Score Trend sparkline ══ */}
        {scoreHistory.length > 1 && (() => {
          const last5 = scoreHistory.slice(-5);
          const minS = Math.max(0, Math.min(...last5.map(s=>s.scores.overall)) - 8);
          const maxS = Math.min(100, Math.max(...last5.map(s=>s.scores.overall)) + 8);
          const W = 200, H = 44;
          const pts = last5.map((s,i) => {
            const x = last5.length > 1 ? (i / (last5.length-1)) * W : W/2;
            const y = H - ((s.scores.overall - minS) / Math.max(1, maxS - minS)) * H;
            return `${x},${y}`;
          }).join(" ");
          const first = last5[0], latest = last5[last5.length-1];
          const delta = latest.scores.overall - first.scores.overall;
          const fmtDate = (iso: string) => { try { return new Date(iso).toLocaleDateString("en-US",{month:"short",day:"numeric"}); } catch { return iso; }};
          return (
            <div style={{ background:"white", border:"1px solid rgba(0,0,0,0.07)", borderRadius:16, padding:"14px 20px", marginBottom:20, display:"flex", alignItems:"center", gap:20, boxShadow:"0 2px 12px rgba(0,0,0,0.05)", flexWrap:"wrap" }}>
              <div>
                <p style={{ fontSize:10.5, fontWeight:700, color:"#A0AABF", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Score Trend</p>
                <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow:"visible" }}>
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4361EE" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#4361EE"/>
                    </linearGradient>
                  </defs>
                  <polyline points={pts} fill="none" stroke="url(#sparkGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  {last5.map((s, i) => {
                    const x = last5.length > 1 ? (i/(last5.length-1))*W : W/2;
                    const y = H - ((s.scores.overall - minS) / Math.max(1, maxS-minS)) * H;
                    const isLast = i === last5.length-1;
                    return (
                      <g key={i}>
                        {isLast && <circle cx={x} cy={y} r={9} fill="rgba(67,97,238,0.1)"/>}
                        <circle cx={x} cy={y} r={isLast?5:3.5} fill={isLast?"#4361EE":"white"} stroke="#4361EE" strokeWidth="2"/>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div style={{ width:1, height:44, background:"#E4E8F5", flexShrink:0 }}/>
              <div>
                <p style={{ fontSize:11, color:"#A0AABF", marginBottom:4 }}>{fmtDate(first.submittedAt)} → {fmtDate(latest.submittedAt)}</p>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:26, fontWeight:900, color:"#0A0A0F", letterSpacing:"-0.04em", lineHeight:1 }}>{latest.scores.overall}</span>
                  {delta !== 0 && <span style={{ fontSize:13, fontWeight:800, color:delta>0?"#16A34A":"#DC2626", background:delta>0?"#F0FFF4":"#FEF2F2", padding:"3px 10px", borderRadius:99, border:`1px solid ${delta>0?"#BBF7D0":"#FECACA"}` }}>{delta>0?"+":""}{delta} pts</span>}
                </div>
              </div>
              <div style={{ display:"flex", gap:10, marginLeft:"auto" }}>
                {last5.map((s,i) => (
                  <div key={i} style={{ textAlign:"center" }}>
                    <div style={{ fontSize:12, fontWeight:800, color:i===last5.length-1?"#4361EE":"#68738A" }}>{s.scores.overall}</div>
                    <div style={{ fontSize:9.5, color:"#A0AABF", whiteSpace:"nowrap" }}>{fmtDate(s.submittedAt).split(",")[0]}</div>
                  </div>
                ))}
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

        <div style={{ display:"grid", gridTemplateColumns:"minmax(0,48%) 1fr", gap:24 }}>
          {/* ── Left: resume viewer ── */}
          <div style={{ background:"#ECEEF5", borderRadius:16, overflow:"hidden", height:"calc(100vh - 260px)", display:"flex", flexDirection:"column", border:"1px solid rgba(0,0,0,0.06)" }}>
            {/* Panel header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", background:"#F4F6FC", borderBottom:"1px solid rgba(0,0,0,0.07)", flexShrink:0 }}>
              <div style={{ display:"flex", background:"rgba(255,255,255,0.7)", borderRadius:9, padding:3, backdropFilter:"blur(4px)" }}>
                {(["preview","suggestions"] as const).map(m => (
                  <button key={m} onClick={()=>{ setResumeViewMode(m); setActiveSuggestion(null); }} style={{ fontSize:12, fontWeight:600, padding:"5px 14px", borderRadius:7, border:"none", background:resumeViewMode===m?"white":"transparent", color:resumeViewMode===m?"#0A0A0F":"#68738A", cursor:"pointer", boxShadow:resumeViewMode===m?"0 1px 6px rgba(0,0,0,0.1)":"none", transition:"all 0.12s" }}>
                    {m==="suggestions" ? `Suggestions${aiResult?.bullets?.length?` (${aiResult.bullets.length})`:""}`:"Preview"}
                  </button>
                ))}
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {aiResult?.keywords?.some(k=>k.found) && (
                  <button onClick={()=>setTab("keywords")} style={{ fontSize:11, color:"#14532D", background:"rgba(220,252,231,0.8)", padding:"3px 10px", borderRadius:99, fontWeight:700, border:"1px solid rgba(22,163,74,0.2)", cursor:"pointer" }}>
                    {aiResult!.keywords!.filter(k=>k.found).length} keywords ✓
                  </button>
                )}
              </div>
            </div>
            {/* Resume view */}
            {resumeViewMode==="suggestions"
              ? rawFileUrl
                ? <PdfHighlightViewer pdfUrl={rawFileUrl} bullets={aiResult?.bullets ?? []} activeIdx={activeSuggestion} onClickLine={setActiveSuggestion}/>
                : <div style={{ padding:"16px 14px", overflowY:"auto", flex:1 }}>
                    <SuggestionsResume text={resumeText} bullets={aiResult?.bullets ?? []} wordIssues={aiResult?.wordIssues} activeIdx={activeSuggestion} onClickLine={setActiveSuggestion}/>
                  </div>
              : rawFileUrl
              ? <iframe src={`${rawFileUrl}#toolbar=0&navpanes=0`} style={{ flex:1, width:"100%", border:"none", display:"block", minHeight:0 }} title="Resume"/>
              : <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, background:"#F9FAFB" }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <p style={{ fontSize:13, color:"#6B7280", margin:0, textAlign:"center", maxWidth:220 }}>Re-upload your PDF to restore the preview</p>
                  <label style={{ fontSize:12.5, fontWeight:600, color:"#4361EE", cursor:"pointer", padding:"7px 16px", borderRadius:8, border:"1.5px solid #4361EE", background:"rgba(67,97,238,0.05)" }}>
                    Upload PDF
                    <input type="file" accept=".pdf" style={{ display:"none" }} onChange={e => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      if (rawFileUrlRef.current) URL.revokeObjectURL(rawFileUrlRef.current);
                      const url = URL.createObjectURL(f);
                      rawFileUrlRef.current = url;
                      setRawFileUrl(url);
                    }}/>
                  </label>
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
                  {/* ── Interview Prep CTA ── */}
                  <div style={{ marginTop:20, marginBottom:24, background:"linear-gradient(135deg,#1A1240,#0D1321)", borderRadius:16, padding:"18px 22px", position:"relative" }}>
                    <div style={{ position:"absolute", top:-20, right:-20, width:120, height:120, background:"radial-gradient(circle,rgba(245,158,11,0.18) 0%,transparent 70%)", pointerEvents:"none", borderRadius:"50%", overflow:"hidden" }}/>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:14 }}>
                      <div>
                        <p style={{ fontSize:13.5, fontWeight:800, color:"white", marginBottom:4, letterSpacing:"-0.02em" }}>Ready to practice interviews?</p>
                        <p style={{ fontSize:12, color:"rgba(255,255,255,0.45)", lineHeight:1.5 }}>Zari can generate interview questions tailored to the bullets and experience on this resume.</p>
                      </div>
                      <button onClick={onNavigate ? ()=>onNavigate("session") : undefined} style={{ flexShrink:0, fontSize:12.5, fontWeight:700, padding:"10px 20px", borderRadius:10, border:"none", background:"rgba(245,158,11,0.9)", color:"#0A0A0F", cursor:"pointer", whiteSpace:"nowrap", boxShadow:"0 4px 14px rgba(245,158,11,0.35)" }}>
                        Practice Interview →
                      </button>
                    </div>
                  </div>
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

                  // Parse numbered bullets — handles both "\n1. text\n2. text" and inline "1. text 2. text"
                  function parseNumberedBullets(txt: string): string[] {
                    // Normalise inline: insert newline before every "N. " that isn't already at line start
                    const norm = txt.replace(/([^\n])\s+(\d+)\.\s+/g, "$1\n$2. ");
                    const lines = norm.split("\n").map(l => l.trim()).filter(Boolean);
                    const numbered = lines.filter(l => /^\d+\.\s/.test(l));
                    if (numbered.length > 1) return numbered.map(l => l.replace(/^\d+\.\s*/, "").trim());
                    return [];
                  }
                  const expBullets = isExperience ? parseNumberedBullets(displayed) : [];
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
const SCREEN_INTERVIEW_META: Record<CareerStage, { title:string }> = {
  "job-search":    { title:"Mock Interview"  },
  "promotion":     { title:"Pitch Practice"  },
  "salary":        { title:"Negotiation Sim" },
  "career-change": { title:"Pivot Interview" },
  "leadership":    { title:"Story Practice"  },
};

type InterviewRound = "recruiter" | "hiring-manager" | "technical" | "panel";

const ROUND_META: Record<InterviewRound, { label:string; badge:string; desc:string; color:string; bg:string; sections:string[] }> = {
  "recruiter":      { label:"Recruiter Screen",  badge:"~30 min", desc:"Fit, motivation, salary expectations, and logistics",             color:"#0284C7", bg:"rgba(2,132,199,0.12)",   sections:["Background & Motivation","Logistics & Expectations"] },
  "hiring-manager": { label:"Hiring Manager",    badge:"~45 min", desc:"Behavioral stories, leadership signals, and situational judgment", color:"#7C3AED", bg:"rgba(124,58,237,0.12)", sections:["Behavioral","Leadership & Influence","Situational Judgment"] },
  "technical":      { label:"Technical Round",   badge:"~60 min", desc:"Role-specific depth, problem solving, and domain knowledge",       color:"#059669", bg:"rgba(5,150,105,0.12)",  sections:["Technical Depth","Problem Solving","Domain Knowledge"] },
  "panel":          { label:"Panel Interview",   badge:"~60–90 min", desc:"Mixed format — behavioral, technical, strategic, and cultural", color:"#D97706", bg:"rgba(217,119,6,0.12)",  sections:["Behavioral","Technical","Strategic Thinking","Culture & Values"] },
};

type InterviewQuestion = { cat: string; level: string; q: string };
type InterviewSection  = { name: string; description: string; questions: InterviewQuestion[] };

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

function ScreenInterview({ stage }: { stage: CareerStage }) {
  const [setupDone,    setSetupDone]    = useState(false);
  const [resumeText,   setResumeText]   = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [linkedinText,     setLinkedinText]     = useState("");
  const [jobDesc,          setJobDesc]          = useState("");
  const [jdMode,           setJdMode]           = useState<"paste"|"url">("paste");
  const [jobUrl,           setJobUrl]           = useState("");
  const [fetchingUrl,      setFetchingUrl]      = useState(false);
  const [urlFetchErr,      setUrlFetchErr]      = useState("");
  const [round,            setRound]            = useState<InterviewRound | null>(null);
  const [loadingQs,        setLoadingQs]        = useState(false);
  const [sections,         setSections]         = useState<InterviewSection[] | null>(null);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [qIdx,             setQIdx]             = useState(0);
  const [answer,           setAnswer]           = useState("");
  const [submitted,        setSubmitted]        = useState(false);
  const [isRecording,      setIsRecording]      = useState(false);
  const [recTime,          setRecTime]          = useState(0);
  const [isScoring,        setIsScoring]        = useState(false);
  const [feedback,         setFeedback]         = useState<InterviewFeedback | null>(null);

  useEffect(() => {
    if (!isRecording) return;
    const t = setInterval(() => setRecTime(s=>s+1), 1000);
    return () => clearInterval(t);
  }, [isRecording]);

  useEffect(() => {
    setSetupDone(false); setSetupStep(1); setQIdx(0); setActiveSectionIdx(0); setAnswer(""); setSubmitted(false);
    setFeedback(null); setSections(null); setRound(null); setResumeText(""); setResumeFileName("");
    setLinkedinText(""); setJobDesc(""); setJobUrl(""); setUrlFetchErr("");
  }, [stage]);

  async function handleInterviewFile(file: File) {
    setResumeFileName(file.name);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/zari/extract", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({})) as { text?: string };
      if (data.text) setResumeText(data.text);
      else setResumeFileName("");
    } catch { setResumeFileName(""); }
  }

  async function fetchJdFromUrl() {
    if (!jobUrl.trim()) return;
    setFetchingUrl(true); setUrlFetchErr("");
    try {
      const res = await fetch("/api/zari/fetch-url", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ url: jobUrl.trim() }) });
      const data = await res.json().catch(() => ({})) as { text?: string; error?: string };
      if (data.text) { setJobDesc(data.text); setUrlFetchErr(""); }
      else setUrlFetchErr(data.error ?? "Couldn't extract text — paste the job description instead.");
    } catch { setUrlFetchErr("Couldn't reach that URL — paste the job description instead."); }
    setFetchingUrl(false);
  }

  async function startInterview() {
    if (!round) return;
    setLoadingQs(true);
    try {
      const combinedProfile = [resumeText, linkedinText].filter(Boolean).join("\n\n---\n\n");
      const res = await fetch("/api/zari/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate-questions", stage, resumeText: combinedProfile, jobDescription: jobDesc, round }),
      });
      const data = await res.json().catch(() => ({})) as { sections?: InterviewSection[] };
      if (data.sections?.length) setSections(data.sections);
    } catch { /* sections stays null, handled below */ }
    setLoadingQs(false);
    setSetupDone(true);
    setActiveSectionIdx(0);
    setQIdx(0);
  }

  const ACTIVE_SECTION: InterviewSection | undefined = sections?.[activeSectionIdx];
  const SECTION_QUESTIONS: InterviewQuestion[] = ACTIVE_SECTION?.questions ?? [];

  async function submit() {
    if (!answer.trim() || isScoring || !SECTION_QUESTIONS.length) return;
    setIsScoring(true);
    setSubmitted(true);
    const q = SECTION_QUESTIONS[qIdx];
    try {
      const res = await fetch("/api/zari/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "score-answer", question: q.q, answer, stage, category: q.cat, round, resumeText: [resumeText, linkedinText].filter(Boolean).join("\n\n---\n\n"), jobDescription: jobDesc }),
      });
      const data = await res.json().catch(() => null) as InterviewFeedback | null;
      if (data && data.overallScore) setFeedback(data);
    } catch { /* use fallback */ }
    setIsScoring(false);
  }

  const fmt = (s:number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  const [setupStep,      setSetupStep]      = useState(1); // 1=resume, 2=jd, 3=round
  const [resumeDragOver, setResumeDragOver] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Shared dark wrapper for setup steps
  const STEP_TITLES = ["Your resume", "Job description", "Interview round"];
  const STEP_SUBTITLES = [
    "Zari reads your background to generate questions specific to you, not generic ones.",
    "The job posting shapes every question — role, seniority, and required skills.",
    "Different rounds have different objectives. Pick the one you're preparing for.",
  ];

  /* ── Setup step ── */
  if (!setupDone) return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#0A1628" }}>
      <input ref={resumeInputRef} type="file" accept=".pdf,.docx,.txt" style={{ display:"none" }}
        onChange={e=>{ const f=e.target.files?.[0]; if(f) { void handleInterviewFile(f); } e.target.value=""; }}/>

      <div style={{ minHeight:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"48px 24px" }}>

        {/* Step dots */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:40 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", border:`2px solid ${s < setupStep ? "#4ADE80" : s === setupStep ? "#4361EE" : "rgba(255,255,255,0.15)"}`, background:s < setupStep ? "rgba(74,222,128,0.15)" : s === setupStep ? "rgba(67,97,238,0.2)" : "transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s" }}>
                {s < setupStep
                  ? <svg viewBox="0 0 12 12" fill="none" stroke="#4ADE80" strokeWidth="2" style={{width:12,height:12}}><polyline points="2,6 5,9 10,3"/></svg>
                  : <span style={{ fontSize:11, fontWeight:700, color:s === setupStep ? "#818CF8" : "rgba(255,255,255,0.25)" }}>{s}</span>
                }
              </div>
              {s < 3 && <div style={{ width:32, height:2, borderRadius:99, background:s < setupStep ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.08)", transition:"all 0.3s" }}/>}
            </div>
          ))}
        </div>

        {loadingQs ? (
          <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:"40px 56px", textAlign:"center", maxWidth:360, width:"100%" }}>
            <div style={{ width:48, height:48, borderRadius:"50%", border:"3px solid rgba(67,97,238,0.3)", borderTopColor:"#4361EE", animation:"spin-slow 0.8s linear infinite", margin:"0 auto 20px" }}/>
            <p style={{ fontSize:16, fontWeight:700, color:"white", marginBottom:6 }}>Generating your questions…</p>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)" }}>Tailored to your background and this role</p>
          </div>
        ) : (
          <div style={{ width:"100%", maxWidth:520 }}>

            {/* Step heading */}
            <div style={{ textAlign:"center", marginBottom:32 }}>
              <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"rgba(255,255,255,0.35)", marginBottom:8 }}>Step {setupStep} of 3</p>
              <h1 style={{ fontSize:28, fontWeight:900, color:"white", letterSpacing:"-0.04em", marginBottom:10 }}>{STEP_TITLES[setupStep-1]}</h1>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.45)", lineHeight:1.6, maxWidth:380, margin:"0 auto" }}>{STEP_SUBTITLES[setupStep-1]}</p>
            </div>

            {/* ── Step 1: Resume ── */}
            {setupStep === 1 && (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {resumeFileName ? (
                  <div style={{ background:"rgba(74,222,128,0.08)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:18, padding:"18px 22px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:40, height:40, borderRadius:11, background:"rgba(74,222,128,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <svg viewBox="0 0 20 20" fill="none" stroke="#4ADE80" strokeWidth="1.8" style={{ width:18,height:18 }}><path d="M13 2H5a1.5 1.5 0 00-1.5 1.5v13A1.5 1.5 0 005 18h10a1.5 1.5 0 001.5-1.5V6L13 2z"/><polyline points="4,11 7,14 11,9"/></svg>
                      </div>
                      <div>
                        <p style={{ fontSize:14, fontWeight:600, color:"white", margin:0 }}>{resumeFileName}</p>
                        <p style={{ fontSize:11.5, color:"rgba(255,255,255,0.4)", margin:0 }}>Resume uploaded successfully</p>
                      </div>
                    </div>
                    <label style={{ fontSize:11.5, fontWeight:600, color:"rgba(255,255,255,0.4)", cursor:"pointer", padding:"6px 14px", borderRadius:9, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", flexShrink:0 }}>
                      Replace<input type="file" accept=".pdf,.docx,.txt" style={{ display:"none" }} onChange={e=>{ const f=e.target.files?.[0]; if(f) void handleInterviewFile(f); e.target.value=""; }}/>
                    </label>
                  </div>
                ) : (
                  <div
                    onClick={()=>resumeInputRef.current?.click()}
                    onDragOver={e=>{ e.preventDefault(); setResumeDragOver(true); }}
                    onDragLeave={()=>setResumeDragOver(false)}
                    onDrop={e=>{ e.preventDefault(); setResumeDragOver(false); const f=e.dataTransfer.files?.[0]; if(f) void handleInterviewFile(f); }}
                    style={{ background:resumeDragOver?"rgba(67,97,238,0.18)":"rgba(255,255,255,0.04)", border:`2px dashed ${resumeDragOver?"#4361EE":"rgba(255,255,255,0.15)"}`, borderRadius:20, padding:"44px 32px", cursor:"pointer", textAlign:"center", transition:"all 0.15s" }}>
                    <div style={{ width:52, height:52, borderRadius:14, background:"rgba(67,97,238,0.2)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.8" style={{ width:24,height:24 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
                    </div>
                    <p style={{ fontSize:16, fontWeight:700, color:"white", marginBottom:6 }}>{resumeDragOver ? "Drop your resume here" : "Upload your resume"}</p>
                    <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", marginBottom:16 }}>Drag and drop, or click to browse</p>
                    <span style={{ fontSize:12, fontWeight:700, padding:"7px 18px", borderRadius:99, background:"rgba(67,97,238,0.3)", color:"#A5B4FC", border:"1px solid rgba(67,97,238,0.4)" }}>Choose file · PDF, DOCX, TXT</span>
                  </div>
                )}
                <button onClick={()=>setSetupStep(2)} disabled={!resumeText}
                  style={{ width:"100%", fontSize:14.5, fontWeight:700, padding:"14px", borderRadius:14, border:"none", background:resumeText?"linear-gradient(135deg,#4361EE,#818CF8)":"rgba(255,255,255,0.06)", color:resumeText?"white":"rgba(255,255,255,0.25)", cursor:resumeText?"pointer":"default", boxShadow:resumeText?"0 8px 24px rgba(67,97,238,0.4)":"none", transition:"all 0.2s" }}>
                  Continue →
                </button>
              </div>
            )}

            {/* ── Step 2: Job description ── */}
            {setupStep === 2 && (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:18, padding:18 }}>
                  <div style={{ display:"flex", background:"rgba(255,255,255,0.06)", borderRadius:8, padding:2, marginBottom:14, width:"fit-content" }}>
                    {(["paste","url"] as const).map(m => (
                      <button key={m} onClick={()=>{ setJdMode(m); setUrlFetchErr(""); }} style={{ fontSize:12, fontWeight:600, padding:"6px 16px", borderRadius:6, border:"none", background:jdMode===m?"rgba(255,255,255,0.12)":"transparent", color:jdMode===m?"white":"rgba(255,255,255,0.45)", cursor:"pointer", transition:"all 0.15s" }}>
                        {m === "paste" ? "Paste text" : "Job URL"}
                      </button>
                    ))}
                  </div>
                  {jdMode === "paste" ? (
                    <textarea
                      style={{ width:"100%", minHeight:160, border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"12px 14px", fontSize:13, color:"white", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"rgba(255,255,255,0.06)", lineHeight:1.65 }}
                      placeholder="Paste the full job posting you're preparing for…"
                      value={jobDesc} onChange={e=>setJobDesc(e.target.value)}
                    />
                  ) : (
                    <div>
                      <div style={{ display:"flex", gap:8 }}>
                        <input type="url" value={jobUrl} onChange={e=>{ setJobUrl(e.target.value); setUrlFetchErr(""); }} onKeyDown={e=>{ if(e.key==="Enter") void fetchJdFromUrl(); }}
                          placeholder="https://jobs.lever.co/… or LinkedIn, Greenhouse, etc."
                          style={{ flex:1, border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"11px 14px", fontSize:13, color:"white", outline:"none", fontFamily:"inherit", background:"rgba(255,255,255,0.06)" }}/>
                        <button onClick={()=>void fetchJdFromUrl()} disabled={fetchingUrl||!jobUrl.trim()}
                          style={{ padding:"11px 20px", borderRadius:10, border:"none", background:jobUrl.trim()&&!fetchingUrl?"#4361EE":"rgba(255,255,255,0.08)", color:jobUrl.trim()&&!fetchingUrl?"white":"rgba(255,255,255,0.3)", fontSize:13, fontWeight:700, cursor:jobUrl.trim()&&!fetchingUrl?"pointer":"default", flexShrink:0 }}>
                          {fetchingUrl ? "…" : "Fetch"}
                        </button>
                      </div>
                      {urlFetchErr && <p style={{ fontSize:12, color:"#FCA5A5", marginTop:8, marginBottom:0 }}>{urlFetchErr} <button onClick={()=>setJdMode("paste")} style={{ background:"none", border:"none", color:"#A5B4FC", fontWeight:600, cursor:"pointer", fontSize:12, padding:0 }}>Switch to paste</button></p>}
                      {jobDesc && !urlFetchErr && <p style={{ fontSize:12, color:"#4ADE80", marginTop:8, marginBottom:0 }}>✓ Fetched — {jobDesc.length.toLocaleString()} chars</p>}
                    </div>
                  )}
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <button onClick={()=>setSetupStep(1)} style={{ padding:"14px 20px", borderRadius:14, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:"rgba(255,255,255,0.45)", fontSize:14, fontWeight:600, cursor:"pointer" }}>← Back</button>
                  <button onClick={()=>setSetupStep(3)} disabled={!jobDesc.trim()}
                    style={{ flex:1, fontSize:14.5, fontWeight:700, padding:"14px", borderRadius:14, border:"none", background:jobDesc.trim()?"linear-gradient(135deg,#4361EE,#818CF8)":"rgba(255,255,255,0.06)", color:jobDesc.trim()?"white":"rgba(255,255,255,0.25)", cursor:jobDesc.trim()?"pointer":"default", boxShadow:jobDesc.trim()?"0 8px 24px rgba(67,97,238,0.4)":"none", transition:"all 0.2s" }}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 3: Round selection ── */}
            {setupStep === 3 && (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {(Object.entries(ROUND_META) as [InterviewRound, typeof ROUND_META[InterviewRound]][]).map(([id, meta]) => (
                    <button key={id} onClick={()=>setRound(id)}
                      style={{ padding:"16px", borderRadius:16, border:`1.5px solid ${round===id ? meta.color : "rgba(255,255,255,0.1)"}`, background:round===id ? meta.bg : "rgba(255,255,255,0.03)", cursor:"pointer", textAlign:"left", transition:"all 0.15s" }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                        <span style={{ fontSize:13.5, fontWeight:700, color:"white" }}>{meta.label}</span>
                        <span style={{ fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:99, background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.4)" }}>{meta.badge}</span>
                      </div>
                      <p style={{ fontSize:11.5, color:"rgba(255,255,255,0.4)", margin:"0 0 10px", lineHeight:1.4 }}>{meta.desc}</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                        {meta.sections.map(s => <span key={s} style={{ fontSize:9.5, fontWeight:600, padding:"2px 8px", borderRadius:99, background:round===id?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.05)", color:round===id?"rgba(255,255,255,0.65)":"rgba(255,255,255,0.28)" }}>{s}</span>)}
                      </div>
                    </button>
                  ))}
                </div>
                <div style={{ display:"flex", gap:10, marginTop:4 }}>
                  <button onClick={()=>setSetupStep(2)} style={{ padding:"14px 20px", borderRadius:14, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:"rgba(255,255,255,0.45)", fontSize:14, fontWeight:600, cursor:"pointer" }}>← Back</button>
                  <button onClick={()=>void startInterview()} disabled={!round || loadingQs}
                    style={{ flex:1, fontSize:14.5, fontWeight:700, padding:"14px", borderRadius:14, border:"none", background:round?"linear-gradient(135deg,#4361EE,#818CF8)":"rgba(255,255,255,0.06)", color:round?"white":"rgba(255,255,255,0.25)", cursor:round?"pointer":"default", boxShadow:round?"0 8px 24px rgba(67,97,238,0.4)":"none", transition:"all 0.2s" }}>
                    Generate my questions →
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );

  if (!sections) return (
    <div style={{ height:"calc(100vh - 56px)", display:"flex", alignItems:"center", justifyContent:"center", background:"#F0F2F8" }}>
      <p style={{ fontSize:13, color:"#A0AABF" }}>No questions generated — go back and try again.</p>
    </div>
  );

  const activeRound = round ? ROUND_META[round] : null;
  const q = SECTION_QUESTIONS[qIdx];

  return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#F0F2F8" }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"24px 28px" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
              <h1 style={{ fontSize:21, fontWeight:900, color:"#0A0A0F", letterSpacing:"-0.03em" }}>{SCREEN_INTERVIEW_META[stage].title}</h1>
              {activeRound && <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99, background:activeRound.bg, color:activeRound.color, border:`1px solid ${activeRound.color}40` }}>{activeRound.label}</span>}
            </div>
            <p style={{ fontSize:12.5, color:"#68738A" }}>{ACTIVE_SECTION?.name} · Question {qIdx+1} of {SECTION_QUESTIONS.length}</p>
          </div>
          <button onClick={()=>{ setSetupDone(false); setSetupStep(1); setSections(null); setRound(null); setQIdx(0); setActiveSectionIdx(0); setAnswer(""); setSubmitted(false); setFeedback(null); }}
            style={{ fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:9, border:"1px solid #E4E8F5", background:"white", color:"#68738A", cursor:"pointer" }}>
            ← Start over
          </button>
        </div>

        {/* Section tabs */}
        <div style={{ display:"flex", gap:6, marginBottom:20, overflowX:"auto", paddingBottom:2 }}>
          {sections.map((sec, i) => (
            <button key={i} onClick={()=>{ setActiveSectionIdx(i); setQIdx(0); setSubmitted(false); setAnswer(""); setFeedback(null); }}
              style={{ flexShrink:0, padding:"8px 16px", borderRadius:10, border:`1.5px solid ${activeSectionIdx===i?"#4361EE":"#E4E8F5"}`, background:activeSectionIdx===i?"#EEF2FF":"white", color:activeSectionIdx===i?"#4361EE":"#68738A", fontSize:12.5, fontWeight:activeSectionIdx===i?700:500, cursor:"pointer", transition:"all 0.15s", display:"flex", alignItems:"center", gap:6 }}>
              {sec.name}
              <span style={{ fontSize:10.5, fontWeight:600, padding:"1px 7px", borderRadius:99, background:activeSectionIdx===i?"rgba(67,97,238,0.15)":"#F1F5F9", color:activeSectionIdx===i?"#4361EE":"#A0AABF" }}>
                {sec.questions.length}
              </span>
            </button>
          ))}
        </div>

        {/* Section description */}
        {ACTIVE_SECTION?.description && (
          <div style={{ background:"#F5F7FF", borderRadius:10, padding:"10px 14px", marginBottom:18, fontSize:12.5, color:"#3451D1", lineHeight:1.5 }}>
            <strong>This section: </strong>{ACTIVE_SECTION.description}
          </div>
        )}

        {/* Progress dots for current section */}
        <div style={{ display:"flex", gap:4, marginBottom:20 }}>
          {SECTION_QUESTIONS.map((_,i) => <div key={i} style={{ height:4, flex:1, borderRadius:99, background:i<qIdx?"#4361EE":i===qIdx?"#818CF8":"#E4E8F5", transition:"background 0.3s" }}/>)}
        </div>

        {/* Question card */}
        {q && (
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
        )}

        {!submitted ? (
          <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:18, padding:22, boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <p style={{ fontSize:14, fontWeight:700, color:"#0A0A0F" }}>Your answer</p>
              <button onClick={() => { setIsRecording(r=>!r); if(isRecording) setRecTime(0); }} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, padding:"7px 16px", borderRadius:99, border:"none", cursor:"pointer", background:isRecording?"#FEF2F2":"#EEF2FF", color:isRecording?"#DC2626":"#4361EE" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:isRecording?"#DC2626":"#4361EE", animation:isRecording?"blink 0.7s step-end infinite":"none" }}/>
                {isRecording ? `Stop · ${fmt(recTime)}` : "Record voice"}
              </button>
            </div>
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
                  {(feedback?.dimensions ?? []).map(s => {
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
                  <p style={{ fontSize:13, color:"#3451D1", lineHeight:1.65 }}>{feedback?.coachNote}</p>
                </div>
                {feedback?.suggestedResult && (
                  <div style={{ background:"#F0FFF4", borderRadius:12, padding:"12px 16px" }}>
                    <p style={{ fontSize:12, fontWeight:700, color:"#16A34A", marginBottom:5 }}>Suggested Result statement</p>
                    <p style={{ fontSize:12.5, color:"#14532D", lineHeight:1.6, fontStyle:"italic" }}>&ldquo;{feedback.suggestedResult}&rdquo;</p>
                  </div>
                )}
              </div>
            )}
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>{setSubmitted(false);setAnswer("");setFeedback(null);}} style={{ flex:1, fontSize:13.5, fontWeight:600, padding:"12px", borderRadius:12, border:"1px solid #E4E8F5", background:"white", color:"#0A0A0F", cursor:"pointer" }}>Try again</button>
              <button onClick={()=>{
                const nextQ = qIdx + 1;
                if (nextQ < SECTION_QUESTIONS.length) { setQIdx(nextQ); }
                else {
                  const nextSec = activeSectionIdx + 1;
                  if (nextSec < sections.length) { setActiveSectionIdx(nextSec); setQIdx(0); }
                }
                setSubmitted(false); setAnswer(""); setFeedback(null);
              }} style={{ flex:1, fontSize:13.5, fontWeight:700, padding:"12px", borderRadius:12, border:"none", background:"#4361EE", color:"white", cursor:"pointer", boxShadow:"0 4px 14px rgba(67,97,238,0.28)" }}>
                {qIdx+1 < SECTION_QUESTIONS.length ? "Next question →" : activeSectionIdx+1 < sections.length ? `Next section: ${sections[activeSectionIdx+1]?.name} →` : "All done ✓"}
              </button>
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
type LIJob   = { company: string; title: string; dateRange: string; description?: string; score: number; verdict: string; rewrite: string | null; checks: LICheck[] };
type LISection = { score: number; verdict: string; rewrite: string | null; checks: LICheck[]; jobs?: LIJob[] };
type ParsedJob = { company: string; title: string; dateRange: string; description: string };
type LinkedInResult = {
  overall: number;
  headline: LISection;
  summary: LISection;
  experience: LISection;
  education: LISection;
  other: LISection;
  networking: LISection;
  keywords: { present: string[]; missing: string[] };
  missingKeywords: string[];
};

function ScreenLinkedIn({ stage }: { stage: CareerStage }) {
  type LINav = "score"|"headline"|"summary"|"experience"|"education"|"other"|"networking"|"keywords";
  const [liSection,      setLISection]      = useState<LINav>("score");
  const [inputMode,      setInputMode]      = useState(true);
  const [targetRole,     setTargetRole]     = useState("");
  const [dragOver,       setDragOver]       = useState(false);
  const [parseLoading,   setParseLoading]   = useState(false);
  const [loadingMsg,     setLoadingMsg]     = useState("");
  const [headline,       setHeadline]       = useState("");
  const [summary,        setSummary]        = useState("");
  const [experienceJobs, setExperienceJobs] = useState<ParsedJob[]>([]);
  const [education,      setEducation]      = useState("");
  const [skills,         setSkills]         = useState("");
  const [linkedinUrl,    setLinkedinUrl]    = useState("");
  const [hasPhoto,     setHasPhoto]     = useState(false);
  const [result,       setResult]       = useState<LinkedInResult | null>(null);
  const [err,          setErr]          = useState("");
  const [previewTab,   setPreviewTab]   = useState<"current"|"rewritten">("current");
  const [expandedCheck,setExpandedCheck]= useState<number | null>(null);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [jobsExpanded, setJobsExpanded] = useState<Record<number,boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputMode(true); setResult(null); setTargetRole(""); setDragOver(false);
    setHeadline(""); setSummary(""); setExperienceJobs([]); setEducation("");
    setSkills(""); setLinkedinUrl(""); setHasPhoto(false); setErr("");
  }, [stage]);

  async function parseAndAnalyze(file: File) {
    if (parseLoading) return;
    setErr(""); setParseLoading(true);
    try {
      setLoadingMsg("Extracting your profile…");
      const fd = new FormData();
      fd.append("file", file);
      const pr = await fetch("/api/zari/linkedin/parse-profile", { method:"POST", body:fd });
      const pd = await pr.json().catch(() => null);
      if (!pr.ok || !pd || pd.error) {
        const msg = pd?.error ?? `Upload failed (HTTP ${pr.status}). Try again or check your PDF.`;
        setErr(msg); setParseLoading(false); return;
      }
      const parsed = pd as { headline:string; summary:string; experienceJobs:ParsedJob[]; education:string; skills:string; linkedinUrl:string; hasPhoto:boolean; recommendations:string };

      setLoadingMsg("Analyzing your profile…");
      const reviewRes = await fetch("/api/zari/linkedin/review", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          headline:       parsed.headline,
          summary:        parsed.summary,
          experienceJobs: parsed.experienceJobs ?? [],
          education:      parsed.education,
          skills:         parsed.skills,
          linkedinUrl:    parsed.linkedinUrl,
          hasPhoto:       parsed.hasPhoto,
          recommendations:parsed.recommendations,
          targetRole,
        }),
      });
      const reviewData = await reviewRes.json().catch(() => null) as (LinkedInResult & { error?: string }) | null;
      if (reviewData && (reviewData.headline || reviewData.summary)) {
        setHeadline(parsed.headline); setSummary(parsed.summary);
        setExperienceJobs(parsed.experienceJobs ?? []); setEducation(parsed.education);
        setSkills(parsed.skills); setLinkedinUrl(parsed.linkedinUrl);
        setHasPhoto(parsed.hasPhoto);
        setResult(reviewData); setInputMode(false); setLISection("score");
        // Save to doc vault
        vaultSave({ type:"linkedin", name:parsed.headline||"LinkedIn Profile", content:[parsed.headline,parsed.summary].join("\n\n"), meta:{ score:String(reviewData.overall??0), headline:parsed.headline||"", targetRole } });
      } else {
        setErr(reviewData?.error ?? `Analysis failed (HTTP ${reviewRes.status}) — try again.`);
      }
    } catch { setErr("Connection error — try again."); }
    setParseLoading(false); setLoadingMsg("");
  }

  function handleFile(f: File) {
    if (!f) return;
    if (!f.name.toLowerCase().endsWith(".pdf") && f.type !== "application/pdf") {
      setErr("Please upload your LinkedIn profile as a PDF file.");
      return;
    }
    void parseAndAnalyze(f);
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
      <input ref={fileInputRef} type="file" accept=".pdf" style={{ display:"none" }}
        onChange={e=>{ const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value=""; }}/>

      <div style={{ minHeight:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px" }}>

        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,#0077B5,#00A0DC)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", boxShadow:"0 8px 28px rgba(0,119,181,0.5)" }}>
            <svg viewBox="0 0 24 24" fill="white" style={{ width:26,height:26 }}><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H6.477v-7H9v7zM7.694 8.717c-.771 0-1.286-.514-1.286-1.2s.514-1.2 1.286-1.2c.771 0 1.286.514 1.286 1.2s-.514 1.2-1.286 1.2zM18 17h-2.442v-3.826c0-1.058-.651-1.302-1.044-1.302-.394 0-1.228.163-1.228 1.302V17h-2.557v-7h2.557v1.302c.325-.652 1.058-1.302 2.276-1.302C17.349 10 18 11.058 18 13.488V17z"/></svg>
          </div>
          <h1 style={{ fontSize:28, fontWeight:900, color:"white", letterSpacing:"-0.04em", marginBottom:8 }}>LinkedIn Profile Reviewer</h1>
          <p style={{ fontSize:14.5, color:"rgba(255,255,255,0.5)", maxWidth:420, margin:"0 auto", lineHeight:1.6 }}>
            Upload your LinkedIn profile PDF and get a detailed score on every section with AI rewrites.
          </p>
        </div>

        {parseLoading ? (
          <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:"40px 56px", textAlign:"center", maxWidth:360, width:"100%" }}>
            <div style={{ width:48, height:48, borderRadius:"50%", border:"3px solid rgba(0,119,181,0.3)", borderTopColor:"#0077B5", animation:"spin-slow 0.8s linear infinite", margin:"0 auto 20px" }}/>
            <p style={{ fontSize:16, fontWeight:700, color:"white", marginBottom:6 }}>{loadingMsg || "Processing…"}</p>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)" }}>This takes 10–20 seconds</p>
          </div>
        ) : (
          <div style={{ width:"100%", maxWidth:520 }}>
            {err && (
              <div style={{ background:"rgba(220,38,38,0.1)", border:"1px solid rgba(220,38,38,0.3)", borderRadius:12, padding:"12px 16px", marginBottom:18, fontSize:13.5, color:"#FCA5A5", lineHeight:1.5 }}>
                {err}
              </div>
            )}

            {/* Drop zone */}
            <div
              onClick={()=>{ setErr(""); fileInputRef.current?.click(); }}
              onDragOver={e=>{ e.preventDefault(); setDragOver(true); }}
              onDragLeave={()=>setDragOver(false)}
              onDrop={e=>{ e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
              style={{ background:dragOver?"rgba(0,119,181,0.18)":"rgba(255,255,255,0.04)", border:`2px dashed ${dragOver?"#0077B5":"rgba(255,255,255,0.15)"}`, borderRadius:20, padding:"48px 32px", cursor:"pointer", textAlign:"center", transition:"all 0.15s", marginBottom:16 }}>
              <div style={{ width:56, height:56, borderRadius:16, background:"rgba(0,119,181,0.2)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#0077B5" strokeWidth="1.8" style={{ width:28,height:28 }}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/>
                </svg>
              </div>
              <p style={{ fontSize:17, fontWeight:800, color:"white", marginBottom:6 }}>
                {dragOver ? "Drop your PDF here" : "Upload your LinkedIn PDF"}
              </p>
              <p style={{ fontSize:13.5, color:"rgba(255,255,255,0.45)", marginBottom:14 }}>
                Drag and drop, or click to browse
              </p>
              <span style={{ fontSize:12, fontWeight:700, padding:"6px 16px", borderRadius:99, background:"rgba(0,119,181,0.3)", color:"#7DD3FC", border:"1px solid rgba(0,119,181,0.4)" }}>
                Choose PDF file
              </span>
            </div>

            {/* Target role */}
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"14px 18px", display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" style={{width:16,height:16,flexShrink:0}}><circle cx="10" cy="10" r="8"/><circle cx="10" cy="10" r="3"/></svg>
              <input
                style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:14, color:"white", fontFamily:"inherit" }}
                placeholder="Target role (optional) — e.g. Senior Product Manager"
                value={targetRole} onChange={e=>setTargetRole(e.target.value)}/>
            </div>

            {/* How-to tip */}
            <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:12, padding:"14px 16px" }}>
              <p style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>How to get your LinkedIn PDF</p>
              <ol style={{ margin:0, paddingLeft:18, fontSize:12.5, color:"rgba(255,255,255,0.35)", lineHeight:2 }}>
                <li>Go to LinkedIn.com → click <strong style={{color:"rgba(255,255,255,0.5)"}}>Me</strong> → <strong style={{color:"rgba(255,255,255,0.5)"}}>View Profile</strong></li>
                <li>Click the <strong style={{color:"rgba(255,255,255,0.5)"}}>More</strong> button → <strong style={{color:"rgba(255,255,255,0.5)"}}>Save to PDF</strong></li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ── RESULTS STEP ──
  type SecKey = "headline"|"summary"|"experience"|"education"|"other"|"networking";
  const secData: Record<SecKey, LISection | undefined> = {
    headline:   result?.headline,
    summary:    result?.summary,
    experience: result?.experience,
    education:  result?.education,
    other:      result?.other,
    networking: result?.networking,
  };
  const secInputs: Record<SecKey, string> = {
    headline:   headline,
    summary:    summary,
    experience: experienceJobs.map(j => `${j.title} @ ${j.company}\n${j.description}`).join("\n\n"),
    education:  education,
    other:      "",
    networking: "",
  };
  const secDescriptions: Record<SecKey, string> = {
    headline:   "Your headline appears everywhere your name does — search results, connection requests, messages. It's your single most important SEO field.",
    summary:    "Your About section is your first-person pitch. Recruiters read it to understand who you are before scanning your experience.",
    experience: "Recruiters verify that your experience matches your headline. Strong bullets with metrics convert views into profile visits.",
    education:  "Education signals credibility and context. Even a minimal entry improves searchability and profile completeness.",
    other:      "These profile elements affect your visibility, credibility, and how complete LinkedIn considers your profile.",
    networking: "Your network size and social proof signals directly affect how often LinkedIn surfaces your profile to recruiters.",
  };

  const navItems: { id: LINav; label: string; score?: number }[] = [
    { id:"score",      label:"Overview" },
    { id:"headline",   label:"Headline",   score:result?.headline?.score },
    { id:"summary",    label:"Summary",    score:result?.summary?.score },
    { id:"experience", label:"Experience", score:result?.experience?.score },
    { id:"education",  label:"Education",  score:result?.education?.score },
    { id:"other",      label:"Other",      score:result?.other?.score },
    { id:"networking", label:"Networking", score:result?.networking?.score },
    { id:"keywords",   label:"Keywords" },
  ];

  const activeSecKey: SecKey | null = (liSection !== "score" && liSection !== "keywords") ? liSection as SecKey : null;
  const activeSec = activeSecKey ? secData[activeSecKey] : null;
  const overall = result?.overall ?? 0;

  function renderChecks(checks: LICheck[]) {
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        {checks.map((c, i) => {
          const isExpanded = !c.pass || expandedCheck === i;
          return (
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
                {c.pass && (
                  <svg viewBox="0 0 16 16" fill="none" stroke="#CBD5E1" strokeWidth="1.8"
                    style={{ width:14,height:14,flexShrink:0,transform:isExpanded?"rotate(180deg)":"none",transition:"transform 0.15s" }}>
                    <path d="M3 6l5 5 5-5"/>
                  </svg>
                )}
              </div>
              {isExpanded && (
                <div style={{ padding:"10px 16px 14px 52px", fontSize:13, color:c.pass?"#475569":"#7F1D1D", lineHeight:1.65, background:c.pass?"white":"#FFF5F5", borderTop:`1px solid ${c.pass?"#E7F7EE":"#FEE2E2"}` }}>
                  {c.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ height:"calc(100vh - 56px)", display:"flex", overflow:"hidden" }}>

      {/* ── Left sidebar ── */}
      <div style={{ width:224, background:"linear-gradient(180deg,#0D1321 0%,#0A1628 60%,#0D1321 100%)", flexShrink:0, display:"flex", flexDirection:"column", overflowY:"auto", position:"relative" }}>
        {/* ambient glow blob */}
        <div style={{ position:"absolute", top:"-30px", left:"50%", transform:"translateX(-50%)", width:160, height:160, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,119,181,0.18) 0%,transparent 70%)", pointerEvents:"none" }}/>

        {/* Score hero block */}
        <div style={{ padding:"22px 16px 18px", borderBottom:"1px solid rgba(255,255,255,0.07)", position:"relative" }}>
          <p style={{ fontSize:9.5, fontWeight:800, color:"rgba(255,255,255,0.35)", letterSpacing:"0.1em", textTransform:"uppercase", textAlign:"center", marginBottom:14 }}>LinkedIn Score</p>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}>
            <ScoreRing
              score={overall}
              color={overall>=75?"#22C55E":overall>=55?"#0077B5":"#FBBF24"}
              size={88}
              dark
            />
          </div>
          <div style={{ textAlign:"center", marginBottom:14 }}>
            <span style={{ fontSize:11.5, fontWeight:700, padding:"4px 14px", borderRadius:99, display:"inline-block",
              background:overall>=75?"rgba(34,197,94,0.15)":overall>=55?"rgba(0,119,181,0.18)":"rgba(251,191,36,0.15)",
              color:overall>=75?"#86EFAC":overall>=55?"#7DD3FC":"#FDE68A",
              border:`1px solid ${overall>=75?"rgba(34,197,94,0.3)":overall>=55?"rgba(0,119,181,0.4)":"rgba(251,191,36,0.3)"}` }}>
              {overallLabel(overall)}
            </span>
          </div>
          {/* Sub-score bars */}
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            {(["headline","summary","experience","education","other","networking"] as SecKey[]).map(k => {
              const s = secData[k];
              if (!s) return null;
              const pct = s.score * 10;
              const c = s.score>=8?"#22C55E":s.score>=6?"#38BDF8":"#FBBF24";
              return (
                <div key={k} style={{ cursor:"pointer" }} onClick={()=>{ setLISection(k); setExpandedCheck(null); }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                    <span style={{ fontSize:10.5, fontWeight:600, color:"rgba(255,255,255,0.55)", textTransform:"capitalize", letterSpacing:"0.01em" }}>{k}</span>
                    <span style={{ fontSize:11, fontWeight:800, color:c, textShadow:`0 0 8px ${c}88` }}>{s.score}</span>
                  </div>
                  <div style={{ height:3, borderRadius:99, background:"rgba(255,255,255,0.07)", overflow:"hidden" }}>
                    <div style={{ width:`${pct}%`, height:"100%", borderRadius:99, background:`linear-gradient(90deg,${c}99,${c})`, boxShadow:`0 0 6px ${c}55`, transition:"width 0.9s cubic-bezier(0.4,0,0.2,1)" }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ padding:"10px 8px", flex:1 }}>
          {navItems.map(item => {
            const active = liSection === item.id;
            return (
              <button key={item.id} onClick={()=>{ setLISection(item.id); setExpandedCheck(null); }}
                style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 12px", borderRadius:9, border:"none", background:active?"rgba(0,119,181,0.22)":"transparent", cursor:"pointer", marginBottom:1, transition:"background 0.12s", position:"relative", overflow:"hidden" }}>
                {active && <div style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:"linear-gradient(180deg,#0077B5,#38BDF8)", borderRadius:"0 2px 2px 0", boxShadow:"0 0 8px rgba(0,119,181,0.7)" }}/>}
                <span style={{ fontSize:12.5, fontWeight:active?700:400, color:active?"white":"rgba(255,255,255,0.45)", letterSpacing:active?"-0.01em":"normal", paddingLeft:active?4:0, transition:"all 0.12s" }}>
                  {item.label}
                </span>
                {item.score !== undefined && (
                  <span style={{ fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:99,
                    background:item.score>=8?"rgba(34,197,94,0.15)":item.score>=6?"rgba(56,189,248,0.15)":"rgba(251,191,36,0.15)",
                    color:item.score>=8?"#86EFAC":item.score>=6?"#7DD3FC":"#FDE68A",
                    minWidth:28, textAlign:"center" }}>
                    {item.score}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ padding:"10px 8px 14px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={()=>setInputMode(true)}
            style={{ width:"100%", fontSize:11.5, fontWeight:600, padding:"9px", borderRadius:9, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.4)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, transition:"all 0.15s" }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:12,height:12}}><path d="M10 3L5 8l5 5"/></svg>
            Re-analyze
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ flex:1, overflowY:"auto", background:"#F0F2F8", padding:"28px 30px" }}>

        {/* OVERVIEW */}
        {liSection==="score" && (
          <>
            <div style={{ marginBottom:22 }}>
              <h2 style={{ fontSize:22, fontWeight:900, color:"#0F172A", letterSpacing:"-0.03em", marginBottom:4 }}>Profile Overview</h2>
              <p style={{ fontSize:13.5, color:"#64748B" }}>Here&apos;s how your LinkedIn profile scores. Click any section to see the full breakdown and AI rewrite.</p>
            </div>

            {/* Score card + quick wins */}
            <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:16, marginBottom:16 }}>
              <div style={{ background:"linear-gradient(135deg,#0D1321,#141E30)", borderRadius:16, padding:"26px 20px", boxShadow:"0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", border:"1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ position:"absolute", top:"-40px", left:"50%", transform:"translateX(-50%)", width:200, height:200, borderRadius:"50%", background:`radial-gradient(circle,${overall>=75?"rgba(34,197,94,0.12)":overall>=55?"rgba(0,119,181,0.12)":"rgba(251,191,36,0.12)"} 0%,transparent 70%)`, pointerEvents:"none" }}/>
                <p style={{ fontSize:9.5, fontWeight:800, color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16, position:"relative" }}>Overall Score</p>
                <div style={{ position:"relative", marginBottom:14 }}>
                  <ScoreRing
                    score={overall}
                    color={overall>=75?"#22C55E":overall>=55?"#0077B5":"#FBBF24"}
                    size={104}
                    dark
                  />
                </div>
                <div style={{ fontSize:12, fontWeight:700, padding:"5px 16px", borderRadius:99, display:"inline-block", position:"relative",
                  background:overall>=75?"rgba(34,197,94,0.15)":overall>=55?"rgba(0,119,181,0.18)":"rgba(251,191,36,0.15)",
                  color:overall>=75?"#86EFAC":overall>=55?"#7DD3FC":"#FDE68A",
                  border:`1px solid ${overall>=75?"rgba(34,197,94,0.3)":overall>=55?"rgba(0,119,181,0.4)":"rgba(251,191,36,0.3)"}`,
                  marginBottom:10 }}>
                  {overallLabel(overall)}
                </div>
                <p style={{ fontSize:11, color:"rgba(255,255,255,0.3)", textAlign:"center", lineHeight:1.5, position:"relative" }}>Aim for 85+ to stand out to recruiters</p>
              </div>

              <div style={{ background:"white", borderRadius:16, padding:"20px 22px", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
                <p style={{ fontSize:12, fontWeight:800, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>Priority Fixes</p>
                {(["headline","summary","experience","education","other","networking"] as SecKey[]).filter(k => {
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
                {(["headline","summary","experience","education","other","networking"] as SecKey[]).every(k => !secData[k] || secData[k]!.verdict === "Perfect" || secData[k]!.verdict === "Good") && (
                  <p style={{ fontSize:13.5, color:"#16A34A", fontWeight:600 }}>All sections are in good shape.</p>
                )}
              </div>
            </div>

            {/* Full breakdown */}
            <div style={{ background:"white", borderRadius:16, padding:"20px 22px", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
              <p style={{ fontSize:12, fontWeight:800, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:16 }}>Section Scores</p>
              {(["headline","summary","experience","education","other","networking"] as SecKey[]).map(k => {
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

        {/* SECTION DETAIL — non-experience, non-networking */}
        {activeSec && activeSecKey && activeSecKey !== "experience" && activeSecKey !== "networking" && (
          <>
            {/* Section header */}
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:20, marginBottom:20 }}>
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:"#0F172A", letterSpacing:"-0.03em", marginBottom:5, textTransform:"capitalize" }}>{activeSecKey}</h2>
                <p style={{ fontSize:13.5, color:"#64748B", lineHeight:1.6, maxWidth:480 }}>{secDescriptions[activeSecKey]}</p>
              </div>
              <div style={{ flexShrink:0, textAlign:"center" }}>
                <ScoreRing score={activeSec.score * 10} color={scoreColor(activeSec.score)} size={74}/>
                <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99, background:verdictBg(activeSec.verdict), color:verdictColor(activeSec.verdict), display:"inline-block", marginTop:8 }}>
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
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#667EEA,#764BA2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg viewBox="0 0 16 16" fill="white" style={{width:14,height:14}}><path d="M8 1l1.5 3.5L13 6l-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-1.5L8 1z"/></svg>
                  </div>
                  <p style={{ fontSize:15, fontWeight:800, color:"#0F172A" }}>AI Coach — Suggested Rewrite</p>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div style={{ background:"#FAFBFF", borderRadius:12, padding:"14px 16px", border:"1px solid #E8EDF5" }}>
                    <p style={{ fontSize:10.5, fontWeight:800, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Current</p>
                    <p style={{ fontSize:13, color:"#475569", lineHeight:1.7, whiteSpace:"pre-wrap" }}>{secInputs[activeSecKey] || "(not provided)"}</p>
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

        {/* EXPERIENCE — per-job cards */}
        {liSection === "experience" && result?.experience && (
          <>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:20, marginBottom:20 }}>
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:"#0F172A", letterSpacing:"-0.03em", marginBottom:5 }}>Experience</h2>
                <p style={{ fontSize:13.5, color:"#64748B", lineHeight:1.6, maxWidth:480 }}>{secDescriptions.experience}</p>
              </div>
              <div style={{ flexShrink:0, textAlign:"center" }}>
                <div style={{ position:"relative", width:74, height:74 }}>
                  <svg width={74} height={74} viewBox="0 0 74 74">
                    <circle cx={37} cy={37} r={29} fill="none" stroke="#F1F5F9" strokeWidth={7}/>
                    <circle cx={37} cy={37} r={29} fill="none" stroke={scoreColor(result.experience.score)} strokeWidth={7} strokeLinecap="round"
                      strokeDasharray={2*Math.PI*29} strokeDashoffset={2*Math.PI*29*(1-result.experience.score/10)} transform="rotate(-90 37 37)"/>
                  </svg>
                  <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:21, fontWeight:900, color:scoreColor(result.experience.score), lineHeight:1 }}>{result.experience.score}</span>
                    <span style={{ fontSize:8, color:"#94A3B8" }}>/ 10</span>
                  </div>
                </div>
                <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99, background:verdictBg(result.experience.verdict), color:verdictColor(result.experience.verdict), display:"inline-block", marginTop:5 }}>
                  {result.experience.verdict}
                </span>
              </div>
            </div>

            {/* Overall experience checks */}
            {result.experience.checks.length > 0 && (
              <div style={{ background:"white", borderRadius:16, padding:"20px 22px", marginBottom:16, boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                  <p style={{ fontSize:12, fontWeight:800, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.07em" }}>Overall Checks</p>
                  <div style={{ display:"flex", gap:10, fontSize:11.5, fontWeight:600 }}>
                    <span style={{ color:"#16A34A" }}>✓ {result.experience.checks.filter(c=>c.pass).length} passed</span>
                    <span style={{ color:"#DC2626" }}>✗ {result.experience.checks.filter(c=>!c.pass).length} failed</span>
                  </div>
                </div>
                {renderChecks(result.experience.checks)}
              </div>
            )}

            {/* Per-job cards */}
            {(result.experience.jobs ?? []).map((job, ji) => (
              <div key={ji} style={{ background:"white", borderRadius:16, padding:"20px 22px", marginBottom:14, boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
                {/* Job header */}
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:16 }}>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:15, fontWeight:800, color:"#0F172A", marginBottom:2 }}>{job.title}</p>
                    <p style={{ fontSize:13, color:"#0077B5", fontWeight:600 }}>{job.company}</p>
                    <p style={{ fontSize:11.5, color:"#94A3B8", marginTop:2 }}>{job.dateRange}</p>
                  </div>
                  <div style={{ textAlign:"center", flexShrink:0 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:scoreBg(job.score), display:"flex", alignItems:"center", justifyContent:"center", marginBottom:4 }}>
                      <span style={{ fontSize:16, fontWeight:900, color:scoreColor(job.score) }}>{job.score}</span>
                    </div>
                    <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:99, background:verdictBg(job.verdict), color:verdictColor(job.verdict) }}>{job.verdict}</span>
                  </div>
                </div>

                {/* Job checks */}
                <div style={{ marginBottom:16 }}>
                  <p style={{ fontSize:11, fontWeight:800, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>Checks</p>
                  {renderChecks(job.checks)}
                </div>

                {/* AI Coach — Current vs Rewrite */}
                {job.rewrite && (
                  <div style={{ borderTop:"1px solid #F1F5F9", paddingTop:16 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                      <div style={{ width:24, height:24, borderRadius:7, background:"linear-gradient(135deg,#667EEA,#764BA2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <svg viewBox="0 0 16 16" fill="white" style={{width:12,height:12}}><path d="M8 1l1.5 3.5L13 6l-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-1.5L8 1z"/></svg>
                      </div>
                      <p style={{ fontSize:14, fontWeight:800, color:"#0F172A" }}>AI Coach — Suggested Rewrite</p>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                      <div style={{ background:"#FAFBFF", borderRadius:12, padding:"14px 16px", border:"1px solid #E8EDF5" }}>
                        <p style={{ fontSize:10.5, fontWeight:800, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Current</p>
                        <p style={{ fontSize:13, color:"#475569", lineHeight:1.7, whiteSpace:"pre-wrap" }}>
                          {(experienceJobs[ji]?.description) || "(not provided)"}
                        </p>
                      </div>
                      <div style={{ background:"linear-gradient(160deg,#F0FFF8,#F0F7FF)", borderRadius:12, padding:"14px 16px", border:"1px solid #C6F0DC" }}>
                        <p style={{ fontSize:10.5, fontWeight:800, color:"#0077B5", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Zari&apos;s Rewrite</p>
                        <p style={{ fontSize:13, color:"#0F172A", lineHeight:1.7, fontWeight:500, whiteSpace:"pre-wrap" }}>{job.rewrite}</p>
                      </div>
                    </div>
                    <div style={{ marginTop:12 }}>
                      <button onClick={()=>{ try { void navigator.clipboard.writeText(job.rewrite ?? ""); } catch { /**/ } }}
                        style={{ fontSize:13, fontWeight:700, padding:"10px 20px", borderRadius:10, border:"none", background:"#0077B5", color:"white", cursor:"pointer", boxShadow:"0 4px 14px rgba(0,119,181,0.3)", display:"flex", alignItems:"center", gap:7 }}>
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:13,height:13}}><rect x="5" y="2" width="9" height="12" rx="2"/><path d="M3 4H2a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-1"/></svg>
                        Copy rewrite
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* NETWORKING */}
        {liSection === "networking" && result?.networking && (
          <>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:20, marginBottom:20 }}>
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:"#0F172A", letterSpacing:"-0.03em", marginBottom:5 }}>Networking</h2>
                <p style={{ fontSize:13.5, color:"#64748B", lineHeight:1.6, maxWidth:480 }}>{secDescriptions.networking}</p>
              </div>
              <div style={{ flexShrink:0, textAlign:"center" }}>
                <div style={{ position:"relative", width:74, height:74 }}>
                  <svg width={74} height={74} viewBox="0 0 74 74">
                    <circle cx={37} cy={37} r={29} fill="none" stroke="#F1F5F9" strokeWidth={7}/>
                    <circle cx={37} cy={37} r={29} fill="none" stroke={scoreColor(result.networking.score)} strokeWidth={7} strokeLinecap="round"
                      strokeDasharray={2*Math.PI*29} strokeDashoffset={2*Math.PI*29*(1-result.networking.score/10)} transform="rotate(-90 37 37)"/>
                  </svg>
                  <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:21, fontWeight:900, color:scoreColor(result.networking.score), lineHeight:1 }}>{result.networking.score}</span>
                    <span style={{ fontSize:8, color:"#94A3B8" }}>/ 10</span>
                  </div>
                </div>
                <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99, background:verdictBg(result.networking.verdict), color:verdictColor(result.networking.verdict), display:"inline-block", marginTop:5 }}>
                  {result.networking.verdict}
                </span>
              </div>
            </div>
            <div style={{ background:"white", borderRadius:16, padding:"20px 22px", boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <p style={{ fontSize:12, fontWeight:800, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.07em" }}>Networking Signals</p>
                <div style={{ display:"flex", gap:10, fontSize:11.5, fontWeight:600 }}>
                  <span style={{ color:"#16A34A" }}>✓ {result.networking.checks.filter(c=>c.pass).length} passed</span>
                  <span style={{ color:"#DC2626" }}>✗ {result.networking.checks.filter(c=>!c.pass).length} failed</span>
                </div>
              </div>
              {renderChecks(result.networking.checks)}
            </div>
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
          {(()=>{ const txt = previewTab==="current" ? summary : (result?.summary?.rewrite || summary); const long = txt && txt.length > 200; return (
          <div style={{ border:"1px solid #E8EDF5", borderRadius:12, padding:"12px 12px", marginBottom:10, background:"white" }}>
            <p style={{ fontSize:10.5, fontWeight:800, color:"#0F172A", marginBottom:6 }}>About</p>
            <p style={{ fontSize:11.5, color:"#475569", lineHeight:1.65, whiteSpace:"pre-wrap", ...(!aboutExpanded && long ? { maxHeight:110, overflow:"hidden" } : {}) }}>
              {txt || <span style={{color:"#CBD5E1",fontStyle:"italic"}}>Your About section…</span>}
            </p>
            {long && <button onClick={()=>setAboutExpanded(!aboutExpanded)} style={{ fontSize:10.5, fontWeight:700, color:"#0077B5", background:"none", border:"none", padding:"4px 0 0", cursor:"pointer" }}>{aboutExpanded?"Show less ↑":"Show more ↓"}</button>}
            {previewTab==="rewritten" && result?.summary?.rewrite && (
              <p style={{ fontSize:10, color:"#16A34A", fontWeight:700, marginTop:4 }}>✓ Optimized by Zari</p>
            )}
          </div>); })()}

          {/* Experience section */}
          <div style={{ border:"1px solid #E8EDF5", borderRadius:12, padding:"12px 12px", background:"white" }}>
            <p style={{ fontSize:10.5, fontWeight:800, color:"#0F172A", marginBottom:8 }}>Experience</p>
            {experienceJobs.length === 0 && (
              <p style={{ fontSize:11.5, color:"#CBD5E1", fontStyle:"italic" }}>Your experience…</p>
            )}
            {experienceJobs.map((job, ji) => {
              const rewrittenJob = previewTab === "rewritten" ? (result?.experience?.jobs ?? [])[ji] : null;
              const descText = rewrittenJob?.rewrite || job.description || "";
              const isLong = descText.length > 150;
              const isExp = !!jobsExpanded[ji];
              return (
                <div key={ji} style={{ marginBottom: ji < experienceJobs.length - 1 ? 10 : 0, paddingBottom: ji < experienceJobs.length - 1 ? 10 : 0, borderBottom: ji < experienceJobs.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:6 }}>
                    <div>
                      <p style={{ fontSize:11.5, fontWeight:700, color:"#0F172A" }}>{job.title}</p>
                      <p style={{ fontSize:10.5, color:"#0077B5", fontWeight:600 }}>{job.company}</p>
                      <p style={{ fontSize:10, color:"#94A3B8" }}>{job.dateRange}</p>
                    </div>
                    {rewrittenJob && <span style={{ fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:99, background:"#DCFCE7", color:"#16A34A", flexShrink:0, marginTop:2 }}>Optimized</span>}
                  </div>
                  {descText && (
                    <>
                      <p style={{ fontSize:10.5, color:"#475569", lineHeight:1.6, marginTop:5, whiteSpace:"pre-wrap", ...(!isExp && isLong ? { maxHeight:80, overflow:"hidden" } : {}) }}>
                        {descText}
                      </p>
                      {isLong && (
                        <button onClick={()=>setJobsExpanded(p=>({...p,[ji]:!isExp}))}
                          style={{ fontSize:10, fontWeight:700, color:"#0077B5", background:"none", border:"none", padding:"3px 0 0", cursor:"pointer" }}>
                          {isExp ? "Show less ↑" : "Show more ↓"}
                        </button>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: DOCUMENTS — drag-drop vault
═══════════════════════════════════════════════════ */
function ScreenDocuments({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [docs,        setDocs]        = useState<DocEntry[]>([]);
  const [preview,     setPreview]     = useState<DocEntry | null>(null);
  const [dragging,    setDragging]    = useState(false);
  const [uploading,   setUploading]   = useState(false);
  const fileInputRef  = useRef<HTMLInputElement>(null);

  function reload() { setDocs(vaultRead()); }
  useEffect(() => {
    reload();
    window.addEventListener("vault-updated", reload);
    return () => window.removeEventListener("vault-updated", reload);
  }, []);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const fd = new FormData(); fd.append("file", file);
      const res  = await fetch("/api/zari/extract", { method:"POST", body:fd });
      const data = await res.json().catch(() => ({})) as { text?: string };
      const text = data.text ?? await file.text();
      vaultSave({ type:"upload", name:file.name, content:text, meta:{ size:String(Math.round(file.size/1024))+"KB" } });
      reload();
    } catch { /* silent */ }
    setUploading(false);
  }

  function downloadDoc(doc: DocEntry) {
    const blob = new Blob([doc.content], { type:"text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = doc.name.replace(/[^a-zA-Z0-9_\-. ]/g,"_") + ".txt";
    a.click();
  }

  const TYPE_META: Record<DocType, { label:string; color:string; bg:string; icon: React.ReactNode; section: string }> = {
    "resume":       { label:"Resume",       color:"#7C3AED", bg:"#F5F3FF", section:"resume",       icon:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:18,height:18}}><path d="M13 2H5a1.5 1.5 0 00-1.5 1.5v13A1.5 1.5 0 005 18h10a1.5 1.5 0 001.5-1.5V6L13 2z"/><path d="M13 2v4h4"/><path d="M7 9h6M7 12h4"/></svg> },
    "linkedin":     { label:"LinkedIn",     color:"#0A66C2", bg:"#EFF6FF", section:"linkedin",     icon:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:18,height:18}}><rect x="2" y="2" width="16" height="16" rx="3"/><path d="M6 9v5M6 7v.01M10 14v-3a2 2 0 014 0v3M10 9v5"/></svg> },
    "cover-letter": { label:"Cover Letter", color:"#059669", bg:"#ECFDF5", section:"cover-letter", icon:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:18,height:18}}><path d="M17 4H3a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1z"/><path d="M1 5l9 7 9-7"/></svg> },
    "upload":       { label:"Uploaded",     color:"#68738A", bg:"#F5F7FF", section:"documents",    icon:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:18,height:18}}><path d="M14 2H6a1.5 1.5 0 00-1.5 1.5v13A1.5 1.5 0 006 18h8a1.5 1.5 0 001.5-1.5V6L14 2z"/><path d="M14 2v4h4"/></svg> },
  };

  const SECTION_CARDS = [
    { type:"resume"       as DocType, label:"Resume Review",   desc:"Upload and analyze your resume",          section:"resume",       color:"#7C3AED", bg:"#F5F3FF" },
    { type:"linkedin"     as DocType, label:"LinkedIn Profile", desc:"Review and optimize your LinkedIn",       section:"linkedin",     color:"#0A66C2", bg:"#EFF6FF" },
    { type:"cover-letter" as DocType, label:"Cover Letter",     desc:"Generate a tailored cover letter",        section:"cover-letter", color:"#059669", bg:"#ECFDF5" },
  ];

  const missing = SECTION_CARDS.filter(c => !docs.some(d => d.type === c.type));
  const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#F0F2F8" }}>
      {/* Preview modal */}
      {preview && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}
          onClick={()=>setPreview(null)}>
          <div style={{ background:"white", borderRadius:20, width:"100%", maxWidth:680, maxHeight:"80vh", display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"0 24px 80px rgba(0,0,0,0.25)" }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ padding:"16px 20px", borderBottom:"1px solid #F1F5F9", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
              <div>
                <span style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:TYPE_META[preview.type].color }}>{TYPE_META[preview.type].label}</span>
                <p style={{ fontSize:14, fontWeight:700, color:"#0A0A0F", margin:0 }}>{preview.name}</p>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>downloadDoc(preview)} style={{ fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:9, border:"1px solid #E4E8F5", background:"white", color:"#68738A", cursor:"pointer" }}>Download</button>
                <button onClick={()=>setPreview(null)} style={{ width:30, height:30, borderRadius:"50%", border:"none", background:"#F1F5F9", color:"#68738A", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700 }}>×</button>
              </div>
            </div>
            <div style={{ padding:"20px 24px", overflowY:"auto", flex:1 }}>
              <pre style={{ fontFamily:"Georgia,'Times New Roman',serif", fontSize:13, lineHeight:1.8, color:"#1E2235", whiteSpace:"pre-wrap", margin:0 }}>{preview.content}</pre>
            </div>
          </div>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt" style={{ display:"none" }}
        onChange={e=>{ const f=e.target.files?.[0]; if(f) void handleFile(f); e.target.value=""; }}/>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"28px 28px 56px" }}>

        {/* ── Hero header ── */}
        <div style={{ background:"linear-gradient(135deg,#1E293B,#0F172A)", borderRadius:18, padding:"24px 28px", marginBottom:24, boxShadow:"0 12px 40px rgba(0,0,0,0.2)", border:"1px solid rgba(255,255,255,0.07)", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-40, right:-20, width:160, height:160, background:"radial-gradient(circle,rgba(100,116,139,0.15) 0%,transparent 70%)", pointerEvents:"none" }}/>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:16, flexWrap:"wrap", position:"relative" }}>
            <div>
              <div style={{ fontSize:10.5, fontWeight:700, color:"rgba(148,163,184,0.7)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>Document Vault</div>
              <h1 style={{ fontSize:22, fontWeight:900, letterSpacing:"-0.03em", color:"white", marginBottom:4 }}>My Documents</h1>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)" }}>
                {docs.length === 0 ? "Your vault is empty — complete sections or upload files to get started" : `${docs.length} document${docs.length!==1?"s":""} · resume, cover letters, LinkedIn · all in one place`}
              </p>
            </div>
            <button onClick={()=>fileInputRef.current?.click()} style={{ fontSize:13, fontWeight:700, padding:"10px 20px", borderRadius:11, border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.1)", color:"white", cursor:"pointer", display:"flex", alignItems:"center", gap:8, backdropFilter:"blur(4px)", flexShrink:0 }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width:14,height:14 }}><path d="M10 3v12M4 9l6-6 6 6"/></svg>
              Upload file
            </button>
          </div>
          {/* Doc type quick stats */}
          {docs.length > 0 && (
            <div style={{ display:"flex", gap:12, marginTop:18, flexWrap:"wrap", position:"relative" }}>
              {(["resume","cover-letter","linkedin","upload"] as DocType[]).map(t => {
                const count = docs.filter(d=>d.type===t).length;
                if (!count) return null;
                const meta = TYPE_META[t];
                return (
                  <div key={t} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:99, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)" }}>
                    <span style={{ color:meta.color }}>{meta.icon}</span>
                    <span style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.65)" }}>{count} {meta.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drop zone */}
        <div
          onDragOver={e=>{e.preventDefault();setDragging(true);}}
          onDragLeave={()=>setDragging(false)}
          onDrop={e=>{ e.preventDefault(); setDragging(false); const f=e.dataTransfer.files?.[0]; if(f) void handleFile(f); }}
          onClick={()=>fileInputRef.current?.click()}
          style={{ border:`2px dashed ${dragging?"#4361EE":"rgba(0,0,0,0.12)"}`, borderRadius:14, padding:"20px 32px", textAlign:"center", marginBottom:24, cursor:"pointer", background:dragging?"rgba(67,97,238,0.05)":"rgba(255,255,255,0.6)", transition:"all 0.2s", backdropFilter:"blur(2px)" }}>
          {uploading ? (
            <p style={{ fontSize:13, fontWeight:600, color:"#4361EE" }}>Uploading and indexing…</p>
          ) : (
            <>
              <p style={{ fontSize:13, fontWeight:600, color:"#0A0A0F", marginBottom:3 }}>Drop a file to add it to your vault</p>
              <p style={{ fontSize:12, color:"#A0AABF" }}>PDF · DOCX · TXT — resume, notes, job descriptions, anything</p>
            </>
          )}
        </div>

        {/* Missing section nudges */}
        {missing.length > 0 && (
          <div style={{ marginBottom:24 }}>
            <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"#A0AABF", marginBottom:12 }}>Complete these to unlock your full vault</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:10 }}>
              {missing.map(c => (
                <button key={c.type} onClick={()=>onNavigate(c.section)}
                  style={{ background:"white", border:`1.5px dashed ${c.color}50`, borderRadius:14, padding:"14px 16px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:12, transition:"all 0.15s" }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:c.color }}>{TYPE_META[c.type].icon}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#0A0A0F", marginBottom:2 }}>{c.label}</div>
                    <div style={{ fontSize:11, color:"#68738A" }}>{c.desc}</div>
                  </div>
                  <svg viewBox="0 0 16 16" fill="none" stroke={c.color} strokeWidth="2" style={{width:12,height:12,marginLeft:"auto",flexShrink:0}}><path d="M4 8h8M9 4l4 4-4 4"/></svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Document list */}
        {docs.length === 0 ? (
          <div style={{ background:"white", borderRadius:16, padding:"60px 32px", textAlign:"center", boxShadow:"0 2px 12px rgba(0,0,0,0.05)", border:"1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ width:60, height:60, borderRadius:16, background:"linear-gradient(135deg,#F1F5F9,#E8EBF4)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", color:"#A0AABF" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{width:26,height:26}}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <p style={{ fontSize:16, fontWeight:800, color:"#0A0A0F", marginBottom:6, letterSpacing:"-0.02em" }}>Your vault is empty</p>
            <p style={{ fontSize:13.5, color:"#68738A", marginBottom:0 }}>Complete a section above or upload a file to get started</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {docs.map(doc => {
              const m = TYPE_META[doc.type];
              const date = new Date(doc.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
              const wc   = words(doc.content);
              return (
                <div key={doc.id} style={{ background:"white", border:"1px solid rgba(0,0,0,0.07)", borderLeft:`3.5px solid ${m.color}`, borderRadius:"0 14px 14px 0", padding:"14px 18px", display:"flex", alignItems:"center", gap:14, boxShadow:"0 1px 6px rgba(0,0,0,0.05)", transition:"box-shadow 0.15s" }}>
                  <div style={{ width:42, height:42, borderRadius:11, background:m.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:m.color }}>{m.icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:13.5, fontWeight:700, color:"#0A0A0F", marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{doc.name}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                      <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:99, background:m.bg, color:m.color, border:`1px solid ${m.color}30` }}>{m.label}</span>
                      <span style={{ fontSize:11, color:"#A0AABF" }}>{wc.toLocaleString()} words · {date}</span>
                      {doc.meta.score && <span style={{ fontSize:11, fontWeight:700, color:"#16A34A", background:"#F0FFF4", padding:"1px 7px", borderRadius:99 }}>Score {doc.meta.score}</span>}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                    <button onClick={()=>setPreview(doc)} style={{ fontSize:11.5, fontWeight:600, padding:"6px 12px", borderRadius:8, border:"1px solid #E4E8F5", background:"white", color:"#68738A", cursor:"pointer" }}>Preview</button>
                    <button onClick={()=>downloadDoc(doc)} style={{ fontSize:11.5, fontWeight:600, padding:"6px 12px", borderRadius:8, border:"1px solid #E4E8F5", background:"white", color:"#68738A", cursor:"pointer" }}>↓</button>
                    <button onClick={()=>onNavigate(m.section)} style={{ fontSize:11.5, fontWeight:700, padding:"6px 16px", borderRadius:8, border:"none", background:`linear-gradient(135deg,${m.color}DD,${m.color})`, color:"white", cursor:"pointer", boxShadow:`0 2px 8px ${m.color}44` }}>Open →</button>
                    <button onClick={()=>{ vaultRemove(doc.id); }} style={{ fontSize:14, fontWeight:700, padding:"5px 9px", borderRadius:8, border:"1px solid #FEE2E2", background:"#FEF2F2", color:"#DC2626", cursor:"pointer", lineHeight:1 }}>×</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
   SCREEN: COVER LETTER
═══════════════════════════════════════════════════ */
function ScreenCoverLetter() {
  const [step,          setStep]          = useState(1); // 1=background, 2=jd, 3=customize
  const [profileText,   setProfileText]   = useState("");
  const [profileFile,   setProfileFile]   = useState("");
  const [profileDrag,   setProfileDrag]   = useState(false);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const [jobDesc,       setJobDesc]       = useState("");
  const [jdMode,        setJdMode]        = useState<"paste"|"url">("paste");
  const [jobUrl,        setJobUrl]        = useState("");
  const [fetchingUrl,   setFetchingUrl]   = useState(false);
  const [urlFetchErr,   setUrlFetchErr]   = useState("");
  const [company,       setCompany]       = useState("");
  const [targetRole,    setTargetRole]    = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [tone,          setTone]          = useState<"professional"|"conversational"|"enthusiastic">("professional");
  const [generating,    setGenerating]    = useState(false);
  const [result,        setResult]        = useState<{ subject: string; coverLetter: string } | null>(null);
  const [editMode,      setEditMode]      = useState(false);
  const [editedLetter,  setEditedLetter]  = useState("");
  const [copied,        setCopied]        = useState(false);
  const [error,         setError]         = useState("");
  const [showDlMenu,    setShowDlMenu]    = useState(false);

  async function handleUpload(file: File) {
    setProfileFile(file.name);
    try {
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/zari/extract", { method:"POST", body:fd });
      const data = await res.json().catch(() => ({})) as { text?: string };
      if (data.text) setProfileText(data.text); else setProfileFile("");
    } catch { setProfileFile(""); }
  }

  async function fetchJd() {
    if (!jobUrl.trim()) return;
    setFetchingUrl(true); setUrlFetchErr("");
    try {
      const res = await fetch("/api/zari/fetch-url", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ url:jobUrl.trim() }) });
      const data = await res.json().catch(() => ({})) as { text?: string; error?: string };
      if (data.text) { setJobDesc(data.text); setUrlFetchErr(""); }
      else setUrlFetchErr(data.error ?? "Couldn't extract text — paste instead.");
    } catch { setUrlFetchErr("Couldn't reach that URL — paste instead."); }
    setFetchingUrl(false);
  }

  async function generate() {
    if (generating) return;
    setGenerating(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/zari/cover-letter", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ profileText, jobDescription:jobDesc, company, targetRole, tone, candidateName }),
      });
      const data = await res.json().catch(() => null) as { subject?: string; coverLetter?: string; error?: string } | null;
      if (data?.coverLetter) { setResult({ subject:data.subject ?? "", coverLetter:data.coverLetter }); setEditedLetter(data.coverLetter);
        // Save to doc vault
        vaultSave({ type:"cover-letter", name:data.subject||targetRole||"Cover Letter", content:data.coverLetter, meta:{ subject:data.subject??"", targetRole, company, tone } }); }
      else setError(data?.error ?? "Generation failed — try again.");
    } catch { setError("Something went wrong — try again."); }
    setGenerating(false);
  }

  function copy() {
    const text = editMode ? editedLetter : (result?.coverLetter ?? "");
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }
  function getLetterText() { return editMode ? editedLetter : (result?.coverLetter ?? ""); }
  function safeName() { return (targetRole || "cover_letter").replace(/\s+/g,"_"); }

  function buildLetterHtml(forPrint: boolean) {
    const text = getLetterText();
    const subject = result?.subject ?? "Cover Letter";
    const esc = (s: string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

    if (forPrint) {
      const lines = text.split("\n");
      const closingKw = ["best regards","sincerely","warm regards","kind regards","respectfully"];
      let closingIdx = -1;
      for (let i = lines.length - 1; i >= 0; i--) {
        if (closingKw.some(k => lines[i].toLowerCase().includes(k))) { closingIdx = i; break; }
      }
      const bodyLines    = closingIdx > -1 ? lines.slice(0, closingIdx) : lines;
      const closingLines = closingIdx > -1 ? lines.slice(closingIdx)    : [];

      const bodyHtml = bodyLines.map(l =>
        l.trim() ? "<p>" + esc(l) + "</p>" : "<div class=\"gap\"></div>"
      ).join("");

      const sigHtml = closingLines.filter(l => l.trim()).map((l, i) =>
        i === 0
          ? "<p class=\"closing\">" + esc(l) + "</p>"
          : "<div class=\"sig\">" + esc(l) + "</div>"
      ).join("");

      const today = new Date().toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" });
      const gfont = "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap";

      return [
        "<!DOCTYPE html><html><head>",
        "<meta charset=\"UTF-8\">",
        "<title>", esc(subject), "</title>",
        "<link rel=\"stylesheet\" href=\"", gfont, "\">",
        "<style>",
        "@page{margin:0;size:A4;}",
        "*{margin:0;padding:0;box-sizing:border-box;}",
        "body{font-family:Georgia,'Times New Roman',serif;font-size:10.5pt;line-height:1.68;color:#1a1a1a;padding:2.4cm 3.2cm 2.2cm;}",
        ".meta{margin-bottom:0.55cm;}",
        ".subject-label{font-size:7.5pt;font-weight:700;color:#999;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:0.12cm;}",
        ".subject-val{font-size:11pt;font-weight:700;color:#111;margin-bottom:0.18cm;}",
        ".date{font-size:9pt;color:#aaa;}",
        ".divider{height:1px;background:#e8e8e8;margin:0.45cm 0 0.55cm;}",
        "p{margin-bottom:0.32cm;}",
        ".gap{height:0.18cm;}",
        ".closing{margin-top:0.55cm;margin-bottom:0.05cm;}",
        ".sig{font-family:'Dancing Script','Brush Script MT',cursive;font-size:26pt;color:#1a1a1a;line-height:1.2;margin-top:0.1cm;}",
        "@media print{@page{margin:0;size:A4;}body{padding:2.4cm 3.2cm 2.2cm;}}",
        "</style>",
        "<scr" + "ipt>",
        "window.onload=function(){",
        "  if(document.fonts&&document.fonts.ready){",
        "    document.fonts.ready.then(function(){setTimeout(function(){window.print();},200);});",
        "  } else { setTimeout(function(){window.print();},600); }",
        "};",
        "</scr" + "ipt>",
        "</head><body>",
        "<div class=\"meta\">",
        "<div class=\"subject-label\">Cover Letter</div>",
        "<div class=\"subject-val\">", esc(subject), "</div>",
        "<div class=\"date\">", today, "</div>",
        "</div>",
        "<div class=\"divider\"></div>",
        bodyHtml,
        sigHtml,
        "</body></html>",
      ].join("");
    }

    // Word (.doc) version
    const lines = text.split("\n").map(l =>
      l.trim() ? "<p>" + esc(l) + "</p>" : "<p style=\"margin:0;height:9pt\"></p>"
    ).join("");
    return [
      "<!DOCTYPE html><html><head>",
      "<meta charset=\"UTF-8\">",
      "<style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.6;margin:2.5cm;}p{margin:0 0 9pt;}</style>",
      "</head><body>", lines, "</body></html>",
    ].join("");
  }

  function downloadWord() {
    const blob = new Blob([buildLetterHtml(false)], { type:"application/msword" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = safeName() + ".doc"; a.click();
  }

  function downloadPdf() {
    const win = window.open("","_blank");
    if (!win) return;
    win.document.write(buildLetterHtml(true));
    win.document.close();
  }

  const STEP_TITLES    = ["Your background", "Job description", "Customize"];
  const STEP_SUBTITLES = [
    "Paste your resume or LinkedIn profile — Zari uses this to write in your voice.",
    "The job posting gives Zari the context to tailor every sentence.",
    "Add the company, role, and the tone that fits the culture.",
  ];

  // ── Show result page once generated ──
  if (result || generating) return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#F0F2F8" }}>
      <div style={{ maxWidth:760, margin:"0 auto", padding:"28px 24px 56px" }}>
        {generating ? (
          <div style={{ background:"linear-gradient(135deg,#0D1321,#141E30)", borderRadius:20, padding:"72px 32px", textAlign:"center", boxShadow:"0 12px 48px rgba(0,0,0,0.22)", border:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:20 }}>
              {[0,1,2].map(i=><div key={i} style={{ width:11,height:11,borderRadius:"50%",background:"#818CF8",animation:`dot-bounce 1.2s ease-in-out ${i*0.2}s infinite`, boxShadow:"0 0 10px rgba(129,140,248,0.5)" }}/>)}
            </div>
            <p style={{ fontSize:17, fontWeight:800, color:"white", marginBottom:8, letterSpacing:"-0.02em" }}>Zari is writing your letter…</p>
            <p style={{ fontSize:13.5, color:"rgba(255,255,255,0.4)" }}>Tailoring every sentence to your background and the role</p>
          </div>
        ) : result && (
          <>
            {/* ── Hero header ── */}
            <div style={{ background:"linear-gradient(135deg,#064E3B,#065F46)", borderRadius:18, padding:"22px 28px", marginBottom:20, boxShadow:"0 8px 32px rgba(5,150,105,0.2)", border:"1px solid rgba(255,255,255,0.07)", position:"relative" }}>
              {/* glow blob — clipped in its own container so the dropdown isn't cut */}
              <div style={{ position:"absolute", inset:0, borderRadius:18, overflow:"hidden", pointerEvents:"none" }}>
                <div style={{ position:"absolute", top:-30, right:-30, width:140, height:140, background:"radial-gradient(circle,rgba(52,211,153,0.18) 0%,transparent 70%)" }}/>
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap", position:"relative" }}>
                <div>
                  <div style={{ fontSize:10.5, fontWeight:700, color:"rgba(52,211,153,0.8)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:5 }}>Cover Letter Ready</div>
                  <p style={{ fontSize:17, fontWeight:800, color:"white", letterSpacing:"-0.025em", margin:0 }}>{result.subject || "Cover Letter"}</p>
                  {(company||targetRole) && (
                    <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.5)", marginTop:4 }}>
                      {[targetRole, company].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  <button onClick={()=>{ setResult(null); setStep(1); }} style={{ fontSize:12, fontWeight:600, padding:"7px 14px", borderRadius:9, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.7)", cursor:"pointer" }}>← Start over</button>
                  <button onClick={()=>setEditMode(e=>!e)} style={{ fontSize:12, fontWeight:600, padding:"7px 14px", borderRadius:9, border:`1px solid ${editMode?"rgba(52,211,153,0.6)":"rgba(255,255,255,0.15)"}`, background:editMode?"rgba(52,211,153,0.15)":"rgba(255,255,255,0.08)", color:editMode?"#34D399":"rgba(255,255,255,0.7)", cursor:"pointer" }}>{editMode?"Preview":"Edit"}</button>
                  <button onClick={copy} style={{ fontSize:12, fontWeight:600, padding:"7px 14px", borderRadius:9, border:"none", background:copied?"rgba(52,211,153,0.2)":"rgba(255,255,255,0.1)", color:copied?"#34D399":"rgba(255,255,255,0.8)", cursor:"pointer", transition:"all 0.2s" }}>{copied?"✓ Copied":"Copy"}</button>
                  <div style={{ position:"relative" }}>
                    <button onClick={()=>setShowDlMenu(m=>!m)} style={{ fontSize:12, fontWeight:700, padding:"7px 18px", borderRadius:9, border:"none", background:"rgba(52,211,153,0.9)", color:"#064E3B", cursor:"pointer", display:"flex", alignItems:"center", gap:6, boxShadow:"0 4px 12px rgba(52,211,153,0.3)" }}>
                      Download
                      <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2" style={{width:10,height:10,transition:"transform 0.15s",transform:showDlMenu?"rotate(180deg)":"rotate(0deg)"}}><path d="M1 1l4 4 4-4"/></svg>
                    </button>
                    {showDlMenu && (
                      <div style={{ position:"absolute", top:"calc(100% + 6px)", right:0, background:"white", border:"1px solid #E4E8F5", borderRadius:12, boxShadow:"0 12px 40px rgba(0,0,0,0.15)", overflow:"hidden", minWidth:150, zIndex:99 }}>
                        <button onClick={()=>{ downloadPdf(); setShowDlMenu(false); }} style={{ width:"100%", padding:"11px 16px", border:"none", background:"transparent", textAlign:"left", fontSize:13, fontWeight:600, color:"#0A0A0F", cursor:"pointer", display:"flex", alignItems:"center", gap:9, borderBottom:"1px solid #F1F5F9" }}>
                          <svg viewBox="0 0 16 16" fill="none" stroke="#DC2626" strokeWidth="1.6" style={{width:15,height:15,flexShrink:0}}><rect x="2" y="1" width="10" height="13" rx="1.5"/><path d="M5 5h4M5 7.5h4M5 10h2.5"/><path d="M10 1v3h2" strokeLinejoin="round"/></svg>
                          PDF
                        </button>
                        <button onClick={()=>{ downloadWord(); setShowDlMenu(false); }} style={{ width:"100%", padding:"11px 16px", border:"none", background:"transparent", textAlign:"left", fontSize:13, fontWeight:600, color:"#0A0A0F", cursor:"pointer", display:"flex", alignItems:"center", gap:9 }}>
                          <svg viewBox="0 0 16 16" fill="none" stroke="#2563EB" strokeWidth="1.6" style={{width:15,height:15,flexShrink:0}}><rect x="2" y="1" width="10" height="13" rx="1.5"/><path d="M5 5h4M5 7.5h4M5 10h4"/><path d="M10 1v3h2" strokeLinejoin="round"/></svg>
                          Word
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Letter paper document ── */}
            <div style={{ background:"white", borderRadius:10, boxShadow:"0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.1)", border:"1px solid rgba(0,0,0,0.06)", overflow:"hidden" }}>
              <div style={{ padding:"52px 56px 56px", fontFamily:"Georgia,'Times New Roman',serif" }}>
                {editMode ? (
                  <textarea style={{ width:"100%", minHeight:560, border:"1.5px solid #E4E8F5", borderRadius:10, padding:"16px", fontSize:14, lineHeight:1.9, color:"#1A1A2E", outline:"none", resize:"vertical", fontFamily:"Georgia,'Times New Roman',serif", boxSizing:"border-box" }}
                    value={editedLetter} onChange={e=>setEditedLetter(e.target.value)}/>
                ) : (
                  <div style={{ fontSize:14, lineHeight:1.95, color:"#1A1A2E", fontFamily:"inherit", whiteSpace:"pre-wrap" }}>{result.coverLetter}</div>
                )}
              </div>
            </div>
          </>
        )}
        {error && <p style={{ fontSize:13, color:"#DC2626", textAlign:"center", marginTop:16 }}>{error} <button onClick={()=>void generate()} style={{ background:"none", border:"none", color:"#4361EE", fontWeight:600, cursor:"pointer", fontSize:13 }}>Try again</button></p>}
      </div>
    </div>
  );

  // ── Setup wizard ──
  return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#0A1628" }}>
      <input ref={profileInputRef} type="file" accept=".pdf,.docx,.txt" style={{ display:"none" }}
        onChange={e=>{ const f=e.target.files?.[0]; if(f) { void handleUpload(f); } e.target.value=""; }}/>

      <div style={{ minHeight:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"48px 24px" }}>

        {/* Step dots */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:40 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", border:`2px solid ${s < step ? "#4ADE80" : s === step ? "#4361EE" : "rgba(255,255,255,0.15)"}`, background:s < step ? "rgba(74,222,128,0.15)" : s === step ? "rgba(67,97,238,0.2)" : "transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s" }}>
                {s < step
                  ? <svg viewBox="0 0 12 12" fill="none" stroke="#4ADE80" strokeWidth="2" style={{width:12,height:12}}><polyline points="2,6 5,9 10,3"/></svg>
                  : <span style={{ fontSize:11, fontWeight:700, color:s === step ? "#818CF8" : "rgba(255,255,255,0.25)" }}>{s}</span>
                }
              </div>
              {s < 3 && <div style={{ width:32, height:2, borderRadius:99, background:s < step ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.08)", transition:"all 0.3s" }}/>}
            </div>
          ))}
        </div>

        <div style={{ width:"100%", maxWidth:520 }}>
          {/* Step heading */}
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"rgba(255,255,255,0.35)", marginBottom:8 }}>Step {step} of 3</p>
            <h1 style={{ fontSize:28, fontWeight:900, color:"white", letterSpacing:"-0.04em", marginBottom:10 }}>{STEP_TITLES[step-1]}</h1>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.45)", lineHeight:1.6, maxWidth:380, margin:"0 auto" }}>{STEP_SUBTITLES[step-1]}</p>
          </div>

          {/* ── Step 1: Background ── */}
          {step === 1 && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {/* Paste or upload toggle */}
              <div style={{ display:"flex", background:"rgba(255,255,255,0.06)", borderRadius:10, padding:2, width:"fit-content" }}>
                {(["paste","upload"] as const).map(m => (
                  <button key={m} onClick={()=>{ if(m==="upload") profileInputRef.current?.click(); }}
                    style={{ fontSize:12, fontWeight:600, padding:"6px 18px", borderRadius:8, border:"none", background:"transparent", color:"rgba(255,255,255,0.5)", cursor:"pointer" }}>
                    {m === "paste" ? "Paste text" : "Upload file"}
                  </button>
                ))}
              </div>

              {profileFile ? (
                <div style={{ background:"rgba(74,222,128,0.08)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:18, padding:"18px 22px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:40, height:40, borderRadius:11, background:"rgba(74,222,128,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg viewBox="0 0 20 20" fill="none" stroke="#4ADE80" strokeWidth="1.8" style={{ width:18,height:18 }}><path d="M13 2H5a1.5 1.5 0 00-1.5 1.5v13A1.5 1.5 0 005 18h10a1.5 1.5 0 001.5-1.5V6L13 2z"/><polyline points="4,11 7,14 11,9"/></svg>
                    </div>
                    <div>
                      <p style={{ fontSize:14, fontWeight:600, color:"white", margin:0 }}>{profileFile}</p>
                      <p style={{ fontSize:11.5, color:"rgba(255,255,255,0.4)", margin:0 }}>Uploaded successfully</p>
                    </div>
                  </div>
                  <label style={{ fontSize:11.5, fontWeight:600, color:"rgba(255,255,255,0.4)", cursor:"pointer", padding:"6px 14px", borderRadius:9, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", flexShrink:0 }}>
                    Replace<input type="file" accept=".pdf,.docx,.txt" style={{ display:"none" }} onChange={e=>{ const f=e.target.files?.[0]; if(f) void handleUpload(f); e.target.value=""; }}/>
                  </label>
                </div>
              ) : (
                <>
                  <div
                    onClick={()=>profileInputRef.current?.click()}
                    onDragOver={e=>{ e.preventDefault(); setProfileDrag(true); }}
                    onDragLeave={()=>setProfileDrag(false)}
                    onDrop={e=>{ e.preventDefault(); setProfileDrag(false); const f=e.dataTransfer.files?.[0]; if(f) void handleUpload(f); }}
                    style={{ background:profileDrag?"rgba(67,97,238,0.18)":"rgba(255,255,255,0.04)", border:`2px dashed ${profileDrag?"#4361EE":"rgba(255,255,255,0.15)"}`, borderRadius:20, padding:"32px 24px", cursor:"pointer", textAlign:"center", transition:"all 0.15s" }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:"rgba(67,97,238,0.2)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.8" style={{ width:22,height:22 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
                    </div>
                    <p style={{ fontSize:15, fontWeight:700, color:"white", marginBottom:5 }}>{profileDrag ? "Drop your file here" : "Upload resume or LinkedIn PDF"}</p>
                    <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.4)", marginBottom:14 }}>Drag and drop, or click to browse</p>
                    <span style={{ fontSize:12, fontWeight:700, padding:"6px 16px", borderRadius:99, background:"rgba(67,97,238,0.3)", color:"#A5B4FC", border:"1px solid rgba(67,97,238,0.4)" }}>Choose file · PDF, DOCX, TXT</span>
                  </div>
                  <p style={{ textAlign:"center", fontSize:12, color:"rgba(255,255,255,0.25)", margin:0 }}>— or paste below —</p>
                  <textarea
                    style={{ width:"100%", minHeight:130, border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, padding:"12px 14px", fontSize:13, color:"white", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"rgba(255,255,255,0.05)", lineHeight:1.65 }}
                    placeholder="Paste your resume text, LinkedIn About section, or a summary of your background…"
                    value={profileText} onChange={e=>setProfileText(e.target.value)}
                  />
                </>
              )}
              <button onClick={()=>setStep(2)} disabled={!profileText.trim() && !profileFile}
                style={{ width:"100%", fontSize:14.5, fontWeight:700, padding:"14px", borderRadius:14, border:"none", background:(profileText.trim()||profileFile)?"linear-gradient(135deg,#4361EE,#818CF8)":"rgba(255,255,255,0.06)", color:(profileText.trim()||profileFile)?"white":"rgba(255,255,255,0.25)", cursor:(profileText.trim()||profileFile)?"pointer":"default", boxShadow:(profileText.trim()||profileFile)?"0 8px 24px rgba(67,97,238,0.4)":"none", transition:"all 0.2s" }}>
                Continue →
              </button>
            </div>
          )}

          {/* ── Step 2: Job description ── */}
          {step === 2 && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:18, padding:18 }}>
                <div style={{ display:"flex", background:"rgba(255,255,255,0.06)", borderRadius:8, padding:2, marginBottom:14, width:"fit-content" }}>
                  {(["paste","url"] as const).map(m => (
                    <button key={m} onClick={()=>{ setJdMode(m); setUrlFetchErr(""); }} style={{ fontSize:12, fontWeight:600, padding:"6px 16px", borderRadius:6, border:"none", background:jdMode===m?"rgba(255,255,255,0.12)":"transparent", color:jdMode===m?"white":"rgba(255,255,255,0.45)", cursor:"pointer", transition:"all 0.15s" }}>
                      {m === "paste" ? "Paste text" : "Job URL"}
                    </button>
                  ))}
                </div>
                {jdMode === "paste" ? (
                  <textarea
                    style={{ width:"100%", minHeight:180, border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"12px 14px", fontSize:13, color:"white", outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box", background:"rgba(255,255,255,0.06)", lineHeight:1.65 }}
                    placeholder="Paste the full job posting…"
                    value={jobDesc} onChange={e=>setJobDesc(e.target.value)}
                  />
                ) : (
                  <div>
                    <div style={{ display:"flex", gap:8 }}>
                      <input type="url" value={jobUrl} onChange={e=>{ setJobUrl(e.target.value); setUrlFetchErr(""); }} onKeyDown={e=>{ if(e.key==="Enter") void fetchJd(); }}
                        placeholder="https://jobs.lever.co/… or LinkedIn, Greenhouse, etc."
                        style={{ flex:1, border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"11px 14px", fontSize:13, color:"white", outline:"none", fontFamily:"inherit", background:"rgba(255,255,255,0.06)" }}/>
                      <button onClick={()=>void fetchJd()} disabled={fetchingUrl||!jobUrl.trim()}
                        style={{ padding:"11px 20px", borderRadius:10, border:"none", background:jobUrl.trim()&&!fetchingUrl?"#4361EE":"rgba(255,255,255,0.08)", color:jobUrl.trim()&&!fetchingUrl?"white":"rgba(255,255,255,0.3)", fontSize:13, fontWeight:700, cursor:jobUrl.trim()&&!fetchingUrl?"pointer":"default", flexShrink:0 }}>
                        {fetchingUrl ? "…" : "Fetch"}
                      </button>
                    </div>
                    {urlFetchErr && <p style={{ fontSize:12, color:"#FCA5A5", marginTop:8, marginBottom:0 }}>{urlFetchErr} <button onClick={()=>setJdMode("paste")} style={{ background:"none", border:"none", color:"#A5B4FC", fontWeight:600, cursor:"pointer", fontSize:12, padding:0 }}>Switch to paste</button></p>}
                    {jobDesc && !urlFetchErr && <p style={{ fontSize:12, color:"#4ADE80", marginTop:8, marginBottom:0 }}>✓ Fetched — {jobDesc.length.toLocaleString()} chars</p>}
                  </div>
                )}
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={()=>setStep(1)} style={{ padding:"14px 20px", borderRadius:14, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:"rgba(255,255,255,0.45)", fontSize:14, fontWeight:600, cursor:"pointer" }}>← Back</button>
                <button onClick={()=>setStep(3)} disabled={!jobDesc.trim()}
                  style={{ flex:1, fontSize:14.5, fontWeight:700, padding:"14px", borderRadius:14, border:"none", background:jobDesc.trim()?"linear-gradient(135deg,#4361EE,#818CF8)":"rgba(255,255,255,0.06)", color:jobDesc.trim()?"white":"rgba(255,255,255,0.25)", cursor:jobDesc.trim()?"pointer":"default", boxShadow:jobDesc.trim()?"0 8px 24px rgba(67,97,238,0.4)":"none", transition:"all 0.2s" }}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Customize ── */}
          {step === 3 && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {/* Company + role */}
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:18, padding:18, display:"flex", flexDirection:"column", gap:10 }}>
                <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"rgba(255,255,255,0.35)", margin:0 }}>Role details (optional)</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company name"
                    style={{ border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"11px 14px", fontSize:13, color:"white", outline:"none", fontFamily:"inherit", background:"rgba(255,255,255,0.06)" }}/>
                  <input value={targetRole} onChange={e=>setTargetRole(e.target.value)} placeholder="Target role"
                    style={{ border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"11px 14px", fontSize:13, color:"white", outline:"none", fontFamily:"inherit", background:"rgba(255,255,255,0.06)" }}/>
                </div>
                <input value={candidateName} onChange={e=>setCandidateName(e.target.value)} placeholder="Your name (for the signature)"
                  style={{ border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"11px 14px", fontSize:13, color:"white", outline:"none", fontFamily:"inherit", background:"rgba(255,255,255,0.06)", width:"100%", boxSizing:"border-box" }}/>
              </div>
              {/* Tone */}
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:18, padding:18 }}>
                <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"rgba(255,255,255,0.35)", marginBottom:12 }}>Tone</p>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {([
                    { id:"professional"   as const, label:"Professional",  desc:"Formal, confident, results-oriented — every sentence earns its place" },
                    { id:"conversational" as const, label:"Conversational", desc:"Warm and direct — reads like a smart person talking, not a template" },
                    { id:"enthusiastic"   as const, label:"Enthusiastic",   desc:"Energetic and genuine — shows real excitement for this specific role" },
                  ]).map(t => (
                    <button key={t.id} onClick={()=>setTone(t.id)}
                      style={{ padding:"14px 16px", borderRadius:12, border:`1.5px solid ${tone===t.id?"#4361EE":"rgba(255,255,255,0.1)"}`, background:tone===t.id?"rgba(67,97,238,0.15)":"rgba(255,255,255,0.03)", cursor:"pointer", textAlign:"left", transition:"all 0.15s", display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${tone===t.id?"#4361EE":"rgba(255,255,255,0.2)"}`, background:tone===t.id?"#4361EE":"transparent", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        {tone===t.id && <div style={{ width:6, height:6, borderRadius:"50%", background:"white" }}/>}
                      </div>
                      <div>
                        <div style={{ fontSize:13.5, fontWeight:700, color:"white", marginBottom:2 }}>{t.label}</div>
                        <div style={{ fontSize:11.5, color:"rgba(255,255,255,0.4)", lineHeight:1.4 }}>{t.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={()=>setStep(2)} style={{ padding:"14px 20px", borderRadius:14, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", color:"rgba(255,255,255,0.45)", fontSize:14, fontWeight:600, cursor:"pointer" }}>← Back</button>
                <button onClick={()=>void generate()}
                  style={{ flex:1, fontSize:14.5, fontWeight:700, padding:"14px", borderRadius:14, border:"none", background:"linear-gradient(135deg,#4361EE,#818CF8)", color:"white", cursor:"pointer", boxShadow:"0 8px 24px rgba(67,97,238,0.4)", transition:"all 0.2s" }}>
                  Write my cover letter →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCREEN: ACTION PLAN
═══════════════════════════════════════════════════ */
type PlanTask = { text: string; cat: string; pri: string };

function ScreenPlan({ stage, onNavigate }: { stage: CareerStage; onNavigate: (s: string) => void }) {
  const [done,        setDone]        = useState<Set<number>>(new Set());
  const [aiTasks,     setAiTasks]     = useState<PlanTask[] | null>(null);
  const [aiCoachNote, setAiCoachNote] = useState<string | null>(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [docs,        setDocs]        = useState<DocEntry[]>([]);

  useEffect(() => {
    setDocs(vaultRead());
    const onVaultUpdate = () => setDocs(vaultRead());
    window.addEventListener("vault-updated", onVaultUpdate);
    return () => window.removeEventListener("vault-updated", onVaultUpdate);
  }, [stage]);

  const hasResume  = docs.some(d => d.type === "resume");
  const hasLI      = docs.some(d => d.type === "linkedin");
  const hasCL      = docs.some(d => d.type === "cover-letter");
  const readyCount = [hasResume, hasLI, hasCL].filter(Boolean).length;
  const isReady    = readyCount >= 1;

  const SECTION_CARDS = [
    { type:"resume"       as DocType, key:"resume",       label:"Resume Review",   desc:"Analyze your resume — Zari scores it and finds gaps", color:"#7C3AED", bg:"#F5F3FF", done:hasResume },
    { type:"linkedin"     as DocType, key:"linkedin",     label:"LinkedIn Profile", desc:"Review your profile and get an overall LinkedIn score", color:"#0A66C2", bg:"#EFF6FF", done:hasLI },
    { type:"cover-letter" as DocType, key:"cover-letter", label:"Cover Letter",     desc:"Generate a tailored cover letter for a specific role",  color:"#059669", bg:"#ECFDF5", done:hasCL },
  ];

  useEffect(() => {
    if (!isReady) return;
    setDone(new Set());
    setAiTasks(null);
    setAiCoachNote(null);
    setPlanLoading(true);
    const resumeDoc = docs.find(d => d.type === "resume");
    const liDoc     = docs.find(d => d.type === "linkedin");
    const clDoc     = docs.find(d => d.type === "cover-letter");
    fetch("/api/zari/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stage,
        resumeSnippet:   resumeDoc ? resumeDoc.content.slice(0,600) : "",
        liHeadline:      liDoc     ? (liDoc.meta.headline||"") : "",
        liScore:         liDoc     ? (liDoc.meta.score||"")    : "",
        resumeScore:     resumeDoc ? (resumeDoc.meta.score||"")    : "",
        targetRole:      resumeDoc?.meta.targetRole || clDoc?.meta.targetRole || "",
        completedSections: [hasResume?"resume":"", hasLI?"linkedin":"", hasCL?"cover-letter":""].filter(Boolean),
      }),
    })
      .then(r => r.json())
      .then((data: { tasks?: PlanTask[]; coachNote?: string }) => {
        if (data.tasks?.length) { setAiTasks(data.tasks); setAiCoachNote(data.coachNote ?? null); }
      })
      .catch(() => {})
      .finally(() => setPlanLoading(false));
  }, [stage, isReady, docs.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Empty state: not enough context ──
  if (!isReady) return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#FAFBFF" }}>
      <div style={{ maxWidth:700, margin:"0 auto", padding:"48px 28px" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:64, height:64, borderRadius:18, background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", boxShadow:"0 8px 24px rgba(67,97,238,0.3)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" style={{width:28,height:28}}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>
          </div>
          <h1 style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.03em", color:"#0A0A0F", marginBottom:10 }}>Your Action Plan isn&apos;t ready yet</h1>
          <p style={{ fontSize:14, color:"#68738A", lineHeight:1.65, maxWidth:460, margin:"0 auto" }}>
            Zari needs to see at least one completed section to build a personalized plan.
            Complete the steps below and come back — your plan will be waiting.
          </p>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {SECTION_CARDS.map((c, i) => (
            <button key={c.key} onClick={()=>c.done ? undefined : onNavigate(c.key)}
              style={{ background:"white", border:`1.5px solid ${c.done?"#BBF7D0":"#E4E8F5"}`, borderRadius:16, padding:"18px 20px", cursor:c.done?"default":"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:16, transition:"all 0.15s", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ width:44, height:44, borderRadius:12, background:c.done?"#F0FFF4":c.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {c.done
                  ? <svg viewBox="0 0 20 20" fill="none" stroke="#16A34A" strokeWidth="2.2" style={{width:20,height:20}}><path d="M4 10l5 5 7-7"/></svg>
                  : <span style={{ fontSize:13, fontWeight:800, color:c.color }}>{i+1}</span>
                }
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:c.done?"#16A34A":"#0A0A0F", marginBottom:3 }}>{c.label} {c.done && <span style={{ fontSize:11, fontWeight:600, color:"#16A34A" }}>✓ Done</span>}</div>
                <div style={{ fontSize:12.5, color:"#68738A", lineHeight:1.45 }}>{c.desc}</div>
              </div>
              {!c.done && (
                <div style={{ flexShrink:0, width:32, height:32, borderRadius:10, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", color:c.color }}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" style={{width:14,height:14}}><path d="M4 8h8M9 4l4 4-4 4"/></svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ marginTop:28, background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", border:"1px solid rgba(67,97,238,0.15)", borderRadius:16, padding:"16px 20px", display:"flex", gap:12, alignItems:"flex-start" }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:14, fontWeight:800, color:"white" }}>Z</div>
          <p style={{ fontSize:13, color:"#3451D1", lineHeight:1.65 }}>The more sections you complete, the more specific your action plan gets. After your resume review Zari already knows what to fix — after LinkedIn it can sequence the work. Give it both and the plan is surgical.</p>
        </div>
      </div>
    </div>
  );

  const TASKS = aiTasks ?? STAGE_TASKS[stage];
  const pct   = TASKS.length ? Math.round((done.size / TASKS.length) * 100) : 0;

  const CAT_COLORS: Record<string, { color: string; bg: string; border: string }> = {
    Resume:          { color:"#7C3AED", bg:"#F5F3FF", border:"#DDD6FE" },
    LinkedIn:        { color:"#0A66C2", bg:"#EFF6FF", border:"#BFDBFE" },
    Interview:       { color:"#D97706", bg:"#FFF7ED", border:"#FDE68A" },
    "Job Search":    { color:"#4361EE", bg:"#EEF2FF", border:"#C7D2FE" },
    "Cover Letter":  { color:"#059669", bg:"#ECFDF5", border:"#6EE7B7" },
    Session:         { color:"#6366F1", bg:"#EEF2FF", border:"#C7D2FE" },
    Network:         { color:"#0891B2", bg:"#ECFEFF", border:"#A5F3FC" },
    Research:        { color:"#BE185D", bg:"#FDF2F8", border:"#F9A8D4" },
  };

  const TIMELINE_GROUPS = [
    {
      id: "high",
      label: "This Week",
      sublabel: "High-impact moves — start here",
      accent: "#DC2626",
      accentBg: "linear-gradient(135deg, #FEF2F2, #FFF1F2)",
      accentBorder: "#FECACA",
      icon: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16}}>
          <circle cx="10" cy="10" r="8"/><path d="M10 6v4l3 3"/>
        </svg>
      ),
    },
    {
      id: "med",
      label: "This Month",
      sublabel: "Build momentum over the next few weeks",
      accent: "#D97706",
      accentBg: "linear-gradient(135deg, #FFFBEB, #FFF7ED)",
      accentBorder: "#FDE68A",
      icon: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16}}>
          <rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M8 4V2M12 4V2"/>
        </svg>
      ),
    },
    {
      id: "low",
      label: "On the Horizon",
      sublabel: "Worth doing when you have bandwidth",
      accent: "#4361EE",
      accentBg: "linear-gradient(135deg, #EEF2FF, #EDE9FE)",
      accentBorder: "#C7D2FE",
      icon: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16}}>
          <path d="M2 14c3-4 6-6 8-6s5 2 8 6"/><path d="M10 8V5M4 11l-2-1M16 11l2-1"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ height:"calc(100vh - 56px)", overflow:"auto", background:"#F8F9FF" }}>
      <div style={{ maxWidth:860, margin:"0 auto", padding:"28px 28px 48px" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom:28 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                <h1 style={{ fontSize:26, fontWeight:900, letterSpacing:"-0.04em", color:"#0A0A0F", margin:0 }}>Your Action Plan</h1>
                {aiTasks && (
                  <span style={{ fontSize:10.5, fontWeight:800, padding:"3px 9px", borderRadius:99, background:"linear-gradient(135deg,#DCFCE7,#D1FAE5)", color:"#059669", border:"1px solid #6EE7B7", letterSpacing:"0.02em" }}>
                    AI · PERSONALIZED
                  </span>
                )}
              </div>
              <p style={{ fontSize:13.5, color:"#68738A", lineHeight:1.5 }}>
                Based on your {[hasResume&&"resume",hasLI&&"LinkedIn",hasCL&&"cover letter"].filter(Boolean).join(", ")} · {readyCount}/3 sections complete
              </p>
            </div>

            {/* Stats pill */}
            <div style={{ display:"flex", gap:0, background:"white", border:"1px solid #E4E8F5", borderRadius:14, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
              {[
                { label:"Done", value:done.size, color:"#059669" },
                { label:"Remaining", value:TASKS.length - done.size, color:"#4361EE" },
                { label:"Total", value:TASKS.length, color:"#68738A" },
              ].map((s, i) => (
                <div key={s.label} style={{ padding:"12px 20px", textAlign:"center", borderLeft: i ? "1px solid #E4E8F5" : "none" }}>
                  <div style={{ fontSize:22, fontWeight:900, color:s.color, lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:10.5, color:"#A0AABF", marginTop:3, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.04em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {planLoading && (
          <div style={{ display:"flex", alignItems:"center", gap:12, background:"white", border:"1px solid rgba(67,97,238,0.2)", borderRadius:14, padding:"14px 18px", marginBottom:22, boxShadow:"0 2px 12px rgba(67,97,238,0.06)" }}>
            <span style={{ width:16,height:16,borderRadius:"50%",border:"2.5px solid rgba(67,97,238,0.25)",borderTopColor:"#4361EE",animation:"spin-slow 0.7s linear infinite",display:"block",flexShrink:0 }}/>
            <span style={{ fontSize:13.5, color:"#4361EE", fontWeight:600 }}>Zari is analyzing your sections and building a personalized plan…</span>
          </div>
        )}

        {/* ── Progress bar ── */}
        <div style={{ background:"white", border:"1px solid #E4E8F5", borderRadius:16, padding:"18px 22px", marginBottom:24, boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontSize:13, fontWeight:700, color:"#0A0A0F" }}>Overall Progress</span>
            <span style={{ fontSize:18, fontWeight:900, color:pct===100?"#059669":"#4361EE" }}>{pct}%</span>
          </div>
          <div style={{ height:10, background:"#F1F5F9", borderRadius:99, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${pct}%`, background:pct===100?"linear-gradient(90deg,#059669,#10B981)":"linear-gradient(90deg,#4361EE,#818CF8)", borderRadius:99, transition:"width 0.5s ease" }}/>
          </div>
          <div style={{ display:"flex", gap:16, marginTop:12 }}>
            {TIMELINE_GROUPS.map(g => {
              const total = TASKS.filter(t=>t.pri===g.id).length;
              const doneC = TASKS.filter((t,i)=>t.pri===g.id&&done.has(i)).length;
              return (
                <div key={g.id} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:8, height:8, borderRadius:99, background:g.accent }}/>
                  <span style={{ fontSize:12, color:"#68738A" }}>
                    <strong style={{ color:g.accent, fontWeight:700 }}>{doneC}/{total}</strong> {g.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Context chips ── */}
        <div style={{ display:"flex", gap:8, marginBottom:28, flexWrap:"wrap", alignItems:"center" }}>
          <span style={{ fontSize:12, color:"#A0AABF", fontWeight:600 }}>Sections:</span>
          {SECTION_CARDS.map(c => (
            <button key={c.key} onClick={()=>onNavigate(c.key)}
              style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:99, border:`1.5px solid ${c.done?c.color+"50":"#E4E8F5"}`, background:c.done?c.bg:"white", cursor:"pointer", fontSize:12, fontWeight:600, color:c.done?c.color:"#A0AABF", transition:"all 0.15s" }}>
              {c.done
                ? <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" style={{width:10,height:10}}><path d="M1.5 6l3 3 6-6"/></svg>
                : <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" style={{width:10,height:10}}><circle cx="6" cy="6" r="4.5"/></svg>
              }
              {c.label}
            </button>
          ))}
          {!SECTION_CARDS.every(c=>c.done) && (
            <span style={{ fontSize:12, color:"#A0AABF", fontStyle:"italic" }}>Complete more for a sharper plan</span>
          )}
        </div>

        {/* ── Zari's coaching note (prominent) ── */}
        <div style={{ marginBottom:28, background:"linear-gradient(135deg, #0A1628, #1E3A5F)", borderRadius:18, padding:"20px 24px", position:"relative", overflow:"hidden", boxShadow:"0 8px 32px rgba(10,22,40,0.18)" }}>
          <div style={{ position:"absolute", top:-20, right:-20, width:100, height:100, background:"radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)", pointerEvents:"none" }}/>
          <div style={{ display:"flex", gap:14, alignItems:"flex-start", position:"relative" }}>
            <div style={{ width:38, height:38, borderRadius:11, background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:15, fontWeight:900, color:"white", boxShadow:"0 4px 12px rgba(67,97,238,0.4)" }}>Z</div>
            <div>
              <p style={{ fontSize:11.5, fontWeight:700, color:"rgba(129,140,248,0.9)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.08em" }}>Zari&apos;s Coaching Note</p>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.88)", lineHeight:1.7, margin:0 }}>
                {aiCoachNote ?? "Start with the high-priority tasks — they have the highest leverage right now. Each one you check off makes your search sharper. Come back as you complete sections and your plan will automatically get more specific."}
              </p>
            </div>
          </div>
        </div>

        {/* ── Tasks by timeline group ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
          {TIMELINE_GROUPS.map(group => {
            const groupTasks = TASKS.map((t,i)=>({...t,idx:i})).filter(t=>t.pri===group.id);
            if (!groupTasks.length) return null;
            const groupDone  = groupTasks.filter(t=>done.has(t.idx)).length;
            const groupTotal = groupTasks.length;
            const groupPct   = groupTotal ? Math.round((groupDone/groupTotal)*100) : 0;

            return (
              <div key={group.id}>
                {/* Group header */}
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <div style={{ width:32, height:32, borderRadius:9, background:group.accentBg, border:`1.5px solid ${group.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", color:group.accent }}>
                    {group.icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
                      <span style={{ fontSize:15, fontWeight:800, color:"#0A0A0F", letterSpacing:"-0.02em" }}>{group.label}</span>
                      <span style={{ fontSize:12, color:group.accent, fontWeight:700 }}>{groupDone}/{groupTotal}</span>
                    </div>
                    <div style={{ fontSize:12, color:"#A0AABF", marginTop:1 }}>{group.sublabel}</div>
                  </div>
                  <div style={{ width:60, height:5, background:"#E4E8F5", borderRadius:99, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${groupPct}%`, background:group.accent, borderRadius:99, transition:"width 0.4s ease" }}/>
                  </div>
                </div>

                {/* Task cards */}
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {groupTasks.map(task => {
                    const isDone = done.has(task.idx);
                    const cc = CAT_COLORS[task.cat] ?? { color:"#68738A", bg:"#F5F7FF", border:"#E4E8F5" };
                    return (
                      <button key={task.idx}
                        onClick={()=>setDone(d=>{const n=new Set(d);n.has(task.idx)?n.delete(task.idx):n.add(task.idx);return n;})}
                        style={{ display:"flex", alignItems:"flex-start", gap:12, background:"white", border:`1px solid ${isDone?"#BBF7D0":"#E4E8F5"}`, borderLeft:`3.5px solid ${isDone?"#16A34A":group.accent}`, borderRadius:"0 14px 14px 0", padding:"13px 16px", cursor:"pointer", textAlign:"left", transition:"all 0.15s", boxShadow:`0 1px 6px rgba(0,0,0,0.04)` }}>
                        <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${isDone?"#16A34A":"#CBD5E1"}`, background:isDone?"#DCFCE7":"white", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                          {isDone && <svg viewBox="0 0 12 12" fill="none" style={{width:10,height:10}}><path d="M1.5 6l3 3 6-6" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        <div style={{ flex:1 }}>
                          <p style={{ fontSize:13.5, color:isDone?"#A0AABF":"#0A0A0F", textDecoration:isDone?"line-through":"none", lineHeight:1.5, margin:0 }}>{task.text}</p>
                        </div>
                        <span style={{ flexShrink:0, fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:99, background:cc.bg, color:cc.color, border:`1px solid ${cc.border}`, whiteSpace:"nowrap", alignSelf:"center" }}>{task.cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════
   MAIN PORTAL SHELL
═══════════════════════════════════════════════════ */
export function ZariPortal() {
  const [screen, setScreen] = useState<Screen>(() => {
    try { return (localStorage.getItem("zari_screen") as Screen) || "session"; } catch { return "session"; }
  });
  const [stage, setStage] = useState<CareerStage>("job-search");
  const [stageOpen, setStageOpen] = useState(false);

  // Persist active screen so refresh lands back on the same section
  const navigate = (s: Screen) => { setScreen(s); try { localStorage.setItem("zari_screen", s); } catch { /* ignore */ } };

  // Section accent colors for topbar context
  const SCREEN_ACCENTS: Record<string, { color: string; gradient: string; label: string }> = {
    session:      { color:"#7C3AED", gradient:"linear-gradient(135deg,#7C3AED,#A78BFA)", label:"AI Coaching Session" },
    resume:       { color:"#4361EE", gradient:"linear-gradient(135deg,#4361EE,#818CF8)", label:"Resume Analysis" },
    interview:    { color:"#D97706", gradient:"linear-gradient(135deg,#D97706,#FBBF24)", label:"Interview Prep" },
    "cover-letter":{ color:"#059669", gradient:"linear-gradient(135deg,#059669,#34D399)", label:"Cover Letter" },
    linkedin:     { color:"#0A66C2", gradient:"linear-gradient(135deg,#0A66C2,#60A5FA)", label:"LinkedIn Review" },
    documents:    { color:"#475569", gradient:"linear-gradient(135deg,#334155,#64748B)", label:"Documents" },
    plan:         { color:"#E11D48", gradient:"linear-gradient(135deg,#E11D48,#FB7185)", label:"Action Plan" },
  };
  const accentInfo = SCREEN_ACCENTS[screen] ?? SCREEN_ACCENTS["session"];

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", background:"#F0F2F8", fontFamily:"var(--font-geist-sans,Inter,system-ui,sans-serif)" }}>
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
        @keyframes nav-glow { 0%,100%{box-shadow:0 0 12px rgba(255,255,255,0.04)} 50%{box-shadow:0 0 20px rgba(255,255,255,0.08)} }
        @keyframes sidebar-shimmer { 0%{opacity:0.4} 50%{opacity:0.7} 100%{opacity:0.4} }
        .zari-nav-btn:hover { background: rgba(255,255,255,0.06) !important; }
        .zari-nav-btn.active { background: rgba(255,255,255,0.1) !important; }
      `}</style>

      {/* ── DARK SIDEBAR ── */}
      <aside style={{ width:232, flexShrink:0, background:"linear-gradient(180deg,#0D1321 0%,#111827 60%,#0D1321 100%)", display:"flex", flexDirection:"column", padding:"0 0 20px 0", position:"relative", overflow:"hidden", boxShadow:"4px 0 24px rgba(0,0,0,0.25)" }}>
        {/* Ambient glow blobs */}
        <div style={{ position:"absolute", top:-40, left:-40, width:180, height:180, background:"radial-gradient(circle,rgba(67,97,238,0.12) 0%,transparent 70%)", pointerEvents:"none", animation:"sidebar-shimmer 6s ease infinite" }}/>
        <div style={{ position:"absolute", bottom:80, right:-30, width:140, height:140, background:"radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)", pointerEvents:"none", animation:"sidebar-shimmer 8s ease infinite 2s" }}/>

        {/* Logo */}
        <div style={{ padding:"20px 18px 16px", position:"relative" }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
            <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px rgba(67,97,238,0.5)", flexShrink:0 }}>
              <ZariLogo size={18}/>
            </div>
            <div>
              <span style={{ fontSize:18, fontWeight:900, color:"white", letterSpacing:"-0.04em", lineHeight:1 }}>Zari</span>
              <div style={{ fontSize:9.5, color:"rgba(255,255,255,0.35)", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", marginTop:1 }}>Career AI</div>
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div style={{ height:1, margin:"0 16px 14px", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)" }}/>

        {/* User chip */}
        <div style={{ margin:"0 12px 14px", background:"rgba(255,255,255,0.06)", borderRadius:13, padding:"10px 13px", display:"flex", gap:10, alignItems:"center", border:"1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ width:36, height:36, borderRadius:11, background:"linear-gradient(135deg,#4361EE,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"white", flexShrink:0, boxShadow:"0 2px 8px rgba(67,97,238,0.4)" }}>S</div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.9)" }}>Steve N.</div>
            <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>Free plan</div>
          </div>
          <div style={{ marginLeft:"auto", width:8, height:8, borderRadius:"50%", background:"#34D399", boxShadow:"0 0 6px rgba(52,211,153,0.6)", flexShrink:0 }}/>
        </div>

        {/* Career Stage Selector */}
        <div style={{ margin:"0 12px 14px", position:"relative" }}>
          <button
            onClick={() => setStageOpen(o => !o)}
            style={{
              width:"100%", display:"flex", alignItems:"center", gap:8,
              padding:"9px 12px", borderRadius:11,
              border:`1px solid rgba(255,255,255,0.1)`,
              background:"rgba(255,255,255,0.07)",
              cursor:"pointer", fontSize:12.5, fontWeight:700,
              color:"rgba(255,255,255,0.8)",
              transition:"all 0.15s",
            }}
          >
            <span style={{ display:"flex", alignItems:"center", opacity:0.9 }}>{STAGE_ICONS[stage]}</span>
            <span style={{ flex:1, textAlign:"left" }}>{STAGE_META[stage].label}</span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:12, height:12, transition:"transform 0.2s", transform: stageOpen ? "rotate(180deg)" : "rotate(0)", opacity:0.5 }}><path d="M4 6l4 4 4-4"/></svg>
          </button>

          {/* Dropdown */}
          {stageOpen && (
            <div style={{
              position:"absolute", top:"calc(100% + 6px)", left:0, right:0, zIndex:50,
              background:"#1A2235", borderRadius:13, border:"1px solid rgba(255,255,255,0.1)",
              boxShadow:"0 16px 48px rgba(0,0,0,0.5)", overflow:"hidden",
              animation:"bubble-appear 0.2s ease",
            }}>
              {(Object.entries(STAGE_META) as [CareerStage, typeof STAGE_META[CareerStage]][]).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => { setStage(key); setStageOpen(false); navigate("session"); }}
                  style={{
                    width:"100%", display:"flex", alignItems:"center", gap:9,
                    padding:"9px 14px", border:"none", cursor:"pointer", textAlign:"left",
                    background: stage === key ? "rgba(67,97,238,0.2)" : "transparent",
                    fontSize:12.5, fontWeight: stage === key ? 700 : 500,
                    color: stage === key ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)",
                    transition:"background 0.1s",
                    borderBottom:"1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span style={{ display:"flex", alignItems:"center", color: stage === key ? meta.color : "rgba(255,255,255,0.4)" }}>{STAGE_ICONS[key]}</span>
                  {meta.label}
                  {stage === key && <svg viewBox="0 0 16 16" style={{ width:12,height:12,marginLeft:"auto" }}><path d="M3 8l4 4 6-6" stroke={meta.color} strokeWidth="2.2" fill="none"/></svg>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Section label */}
        <div style={{ padding:"0 18px 8px", fontSize:9.5, fontWeight:700, color:"rgba(255,255,255,0.25)", letterSpacing:"0.12em", textTransform:"uppercase" }}>Navigation</div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"0 10px", display:"flex", flexDirection:"column", gap:2 }}>
          {getNav(stage).map(n => {
            const isActive = screen === n.id;
            const sa = SCREEN_ACCENTS[n.id];
            return (
              <button key={n.id} onClick={()=>navigate(n.id as Screen)} className={`zari-nav-btn${isActive?" active":""}`}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 11px", borderRadius:11, border:"none", cursor:"pointer", textAlign:"left", background:isActive?"rgba(255,255,255,0.1)":"transparent", color:isActive?"white":"rgba(255,255,255,0.5)", fontWeight:isActive?700:500, fontSize:13.5, transition:"all 0.15s", position:"relative" }}>
                {isActive && (
                  <div style={{ position:"absolute", left:0, top:"50%", transform:"translateY(-50%)", width:3, height:"60%", borderRadius:"0 2px 2px 0", background:sa?.color ?? "#4361EE", boxShadow:`0 0 8px ${sa?.color ?? "#4361EE"}` }}/>
                )}
                <span style={{ display:"flex", alignItems:"center", opacity:isActive?1:0.7, color:isActive?(sa?.color ?? "white"):"inherit" }}>{n.icon}</span>
                <span style={{ flex:1 }}>{n.label}</span>
                {n.id==="session" && <span style={{ fontSize:9, fontWeight:800, padding:"2px 6px", borderRadius:99, background:"rgba(52,211,153,0.15)", color:"#34D399", border:"1px solid rgba(52,211,153,0.25)", letterSpacing:"0.06em" }}>LIVE</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom: upgrade */}
        <div style={{ margin:"0 12px", background:"linear-gradient(135deg,rgba(67,97,238,0.9),rgba(129,140,248,0.85))", borderRadius:15, padding:"16px 16px", color:"white", position:"relative", overflow:"hidden", border:"1px solid rgba(255,255,255,0.15)" }}>
          <div style={{ position:"absolute", top:-15, right:-15, width:80, height:80, background:"radial-gradient(circle,rgba(255,255,255,0.15) 0%,transparent 70%)", pointerEvents:"none" }}/>
          <div style={{ fontSize:13.5, fontWeight:800, marginBottom:3, letterSpacing:"-0.02em" }}>Unlock Pro</div>
          <div style={{ fontSize:11.5, opacity:0.7, marginBottom:12, lineHeight:1.45 }}>Unlimited sessions, priority coaching, resume downloads</div>
          <button style={{ width:"100%", fontSize:12.5, fontWeight:800, padding:"8px", borderRadius:9, border:"none", background:"white", color:"#4361EE", cursor:"pointer", letterSpacing:"-0.01em" }}>Upgrade →</button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        {/* Top bar */}
        <div style={{ flexShrink:0, height:58, background:"white", borderBottom:"1px solid #E8EBF4", display:"flex", alignItems:"center", padding:"0 24px", gap:14, boxShadow:"0 1px 8px rgba(0,0,0,0.04)" }}>
          {/* Section accent dot + title */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:6, height:28, borderRadius:99, background:accentInfo.gradient }}/>
            <h2 style={{ fontSize:15.5, fontWeight:800, color:"#0A0A0F", letterSpacing:"-0.025em", margin:0 }}>
              {accentInfo.label}
            </h2>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", gap:8, alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:99, background:"#F8F9FF", border:"1px solid #E4E8F5" }}>
              <span style={{ display:"inline-flex", alignItems:"center", color:STAGE_META[stage].color }}>{STAGE_ICONS[stage]}</span>
              <span style={{ fontSize:12, fontWeight:600, color:STAGE_META[stage].color }}>{STAGE_META[stage].label}</span>
            </div>
            <form action="/api/auth/logout" method="POST">
              <button type="submit" style={{ fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:9, border:"1px solid #E4E8F5", background:"white", color:"#68738A", cursor:"pointer" }}>Sign out</button>
            </form>
          </div>
        </div>

        {/* Screen — all kept mounted, hidden when inactive to preserve state */}
        <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
          <div style={{ display:screen==="session"      ? "block" : "none", height:"100%" }}><ScreenSession      stage={stage} onNavigate={navigate}/></div>
          <div style={{ display:screen==="resume"       ? "block" : "none", height:"100%" }}><ScreenResume       stage={stage} onNavigate={s=>navigate(s as Screen)}/></div>
          <div style={{ display:screen==="interview"    ? "block" : "none", height:"100%" }}><ScreenInterview    stage={stage}/></div>
          <div style={{ display:screen==="cover-letter" ? "block" : "none", height:"100%" }}><ScreenCoverLetter/></div>
          <div style={{ display:screen==="linkedin"     ? "block" : "none", height:"100%" }}><ScreenLinkedIn     stage={stage}/></div>
          <div style={{ display:screen==="documents"    ? "block" : "none", height:"100%" }}><ScreenDocuments onNavigate={s=>navigate(s as Screen)}/></div>
          <div style={{ display:screen==="plan"         ? "block" : "none", height:"100%" }}><ScreenPlan stage={stage} onNavigate={s=>navigate(s as Screen)}/></div>
        </div>
      </main>
    </div>
  );
}
