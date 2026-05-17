"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// ─── Storage keys ────────────────────────────────────────────────────────────
const VISITOR_ID_KEY = "_zvid";   // persists across sessions (localStorage)
const SESSION_ID_KEY = "_zsid";   // per-tab session DB id (sessionStorage)
const PAGE_VIEW_KEY  = "_zpvid";  // current pageview id for duration (sessionStorage)

// ─── Module-level state (survives route changes, no React re-renders needed) ─
let _sessionDbId: string | null = null;
let _pageViewId:  string | null = null;
let _eventQueue:  QueuedEvent[] = [];
let _flushTimer:  ReturnType<typeof setTimeout> | null = null;

interface QueuedEvent {
  type: string;
  page: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function skip() {
  if (typeof window === "undefined") return true;
  // Don't track the admin portal itself
  return window.location.pathname.startsWith("/coach-admin");
}

function getOrCreateVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) { id = crypto.randomUUID(); localStorage.setItem(VISITOR_ID_KEY, id); }
    return id;
  } catch { return "anon"; }
}

function ss(key: string): string | null { try { return sessionStorage.getItem(key); } catch { return null; } }
function ssSet(key: string, val: string) { try { sessionStorage.setItem(key, val); } catch { /* */ } }
function ssDel(key: string)              { try { sessionStorage.removeItem(key);   } catch { /* */ } }

function utmParams() {
  try {
    const p = new URLSearchParams(window.location.search);
    const out: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign"]) {
      const v = p.get(k); if (v) out[k] = v;
    }
    return out;
  } catch { return {}; }
}

// ─── Event queue + flush ─────────────────────────────────────────────────────
function enqueue(type: string, data?: Record<string, unknown>) {
  if (!_sessionDbId || skip()) return;
  _eventQueue.push({ type, page: window.location.pathname + window.location.search, data, timestamp: new Date().toISOString() });
  if (!_flushTimer) _flushTimer = setTimeout(flushQueue, 3000);
}

async function flushQueue() {
  _flushTimer = null;
  if (!_sessionDbId || _eventQueue.length === 0) return;
  const batch = _eventQueue.splice(0);
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "events", sessionDbId: _sessionDbId, pageViewId: _pageViewId, events: batch }),
      keepalive: true,
    });
  } catch { /* */ }
}

function flushQueueBeacon() {
  if (_flushTimer) { clearTimeout(_flushTimer); _flushTimer = null; }
  if (!_sessionDbId || _eventQueue.length === 0) return;
  const batch = _eventQueue.splice(0);
  try {
    navigator.sendBeacon("/api/track", new Blob(
      [JSON.stringify({ type: "events", sessionDbId: _sessionDbId, pageViewId: _pageViewId, events: batch })],
      { type: "application/json" },
    ));
  } catch { /* */ }
}

function sendDurationBeacon(pvId: string, seconds: number) {
  if (seconds < 1) return;
  try {
    navigator.sendBeacon("/api/track", new Blob(
      [JSON.stringify({ type: "duration", pageViewId: pvId, duration: seconds })],
      { type: "application/json" },
    ));
  } catch { /* */ }
}

// ─── Component ───────────────────────────────────────────────────────────────
export function VisitorTracker() {
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const pageStart    = useRef(Date.now());
  const initialized  = useRef(false);

  // ── 1. Init session once per tab ─────────────────────────────────────────
  useEffect(() => {
    if (initialized.current || skip()) return;
    initialized.current = true;

    const existing = ss(SESSION_ID_KEY);
    if (existing) {
      _sessionDbId = existing;
      return;
    }

    const utms = utmParams();
    fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type:             "session",
        visitorId:        getOrCreateVisitorId(),
        landingPage:      window.location.pathname + window.location.search,
        landingPageTitle: document.title.slice(0, 300),
        referrer:         document.referrer || undefined,
        utmSource:        utms.utm_source,
        utmMedium:        utms.utm_medium,
        utmCampaign:      utms.utm_campaign,
        language:         navigator.language,
        screenWidth:      window.screen?.width,
        screenHeight:     window.screen?.height,
      }),
      keepalive: true,
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.sessionDbId) { _sessionDbId = d.sessionDbId; ssSet(SESSION_ID_KEY, d.sessionDbId); }
      })
      .catch(() => { /* */ });
  }, []);

  // ── 2. Page view on every route change ───────────────────────────────────
  useEffect(() => {
    if (skip()) return;

    // Flush previous page duration + queued events
    const prevPv = ss(PAGE_VIEW_KEY);
    if (prevPv) {
      sendDurationBeacon(prevPv, Math.round((Date.now() - pageStart.current) / 1000));
      ssDel(PAGE_VIEW_KEY);
      _pageViewId = null;
    }
    flushQueueBeacon();
    pageStart.current = Date.now();

    const page = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    const track = async () => {
      let dbId = _sessionDbId || ss(SESSION_ID_KEY);
      if (!dbId) {
        await new Promise((r) => setTimeout(r, 1000));
        dbId = _sessionDbId || ss(SESSION_ID_KEY);
      }
      if (!dbId) return;
      _sessionDbId = dbId;

      try {
        const res = await fetch("/api/track", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ type: "pageview", sessionDbId: dbId, page, title: document.title, referrer: document.referrer || undefined }),
          keepalive: true,
        });
        const d = await res.json();
        if (d.pageViewId) { _pageViewId = d.pageViewId; ssSet(PAGE_VIEW_KEY, d.pageViewId); }
      } catch { /* */ }
    };

    track();
  }, [pathname, searchParams]);

  // ── 3. Granular event listeners ───────────────────────────────────────────
  useEffect(() => {
    if (skip()) return;

    // ── Scroll depth (rAF-throttled, cumulative milestones) ─────────────────
    const scrolled = new Set<number>();
    let _rafId: number | null = null;

    const checkScroll = () => {
      const root  = document.documentElement;
      const total = root.scrollHeight - root.clientHeight;
      if (total <= 0) return;
      // window.scrollY is the standard; scrollTop is the fallback
      const scrollY = window.scrollY ?? root.scrollTop;
      const pct = Math.round((scrollY / total) * 100);
      for (const m of [25, 50, 75, 90]) {
        if (pct >= m && !scrolled.has(m)) { scrolled.add(m); enqueue("scroll", { depth: m }); }
      }
    };

    const onScroll = () => {
      if (_rafId !== null) return;
      _rafId = requestAnimationFrame(() => { _rafId = null; checkScroll(); });
    };

    // Check once on mount — catches pre-scrolled pages or very short pages
    checkScroll();

    // ── Click tracking (composedPath + SVG-aware + aria-label) ───────────────
    const INTERACTIVE = "a,button,[role='button'],[role='link'],label[for],select,summary";

    // Extract the best human-readable label from an element.
    // Priority: aria-label → title → direct text (SVG children excluded).
    function getClickLabel(el: Element): string {
      const explicit = (el as HTMLElement).getAttribute?.("aria-label") ||
                       (el as HTMLElement).getAttribute?.("title");
      if (explicit) return explicit.slice(0, 80);

      let text = "";
      for (const child of Array.from(el.childNodes)) {
        if (child.nodeType === 3) {                       // Text node
          text += (child.textContent || "").trim() + " ";
        } else if (child.nodeType === 1) {               // Element node
          const c = child as Element;
          // Skip SVG subtrees — they're icons, not labels
          if (c.namespaceURI !== "http://www.w3.org/2000/svg") {
            text += ((c as HTMLElement).innerText || c.textContent || "").trim() + " ";
          }
        }
      }
      text = text.trim().replace(/\s+/g, " ").slice(0, 80);
      return text || (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 80);
    }

    let lastClickMs   = 0;
    const clickBurst: { t: number; x: number; y: number }[] = [];

    const onClick = (e: MouseEvent) => {
      const now = Date.now();

      // composedPath() gives the full DOM path from innermost to outermost;
      // this is more accurate than e.target for SVG children and shadow DOM.
      const composed = (e.composedPath ? e.composedPath() : [e.target]) as EventTarget[];

      // Walk the path upward to find the first interactive element
      let el: Element | null = null;
      for (const node of composed) {
        if (!(node instanceof Element)) continue;
        if (node === document.body || node === document.documentElement) break;
        if (node.matches(INTERACTIVE)) { el = node; break; }
      }

      // If no interactive parent found, check if the click was inside SVG.
      // Walk from the raw target up to SVG root, then look for a button/link
      // immediately outside the SVG (e.g. <button><svg>…</svg></button>).
      if (!el) {
        const rawTarget = composed[0] as Element | null;
        if (rawTarget instanceof Element) {
          const svgRoot = rawTarget.closest?.("svg");
          if (svgRoot) {
            const outside = svgRoot.parentElement?.closest(INTERACTIVE);
            if (outside) {
              el = outside;
            } else {
              // Pure decorative SVG with no interactive wrapper — skip
              return;
            }
          } else {
            el = rawTarget;
          }
        }
      }
      if (!el) return;

      // Rage-click: 3+ clicks within 1 s within 80 px area
      const fresh = clickBurst.filter((c) => now - c.t < 1000);
      fresh.push({ t: now, x: e.clientX, y: e.clientY });
      if (fresh.length >= 3) {
        const xs = fresh.map((c) => c.x), ys = fresh.map((c) => c.y);
        if (Math.max(...xs) - Math.min(...xs) + (Math.max(...ys) - Math.min(...ys)) < 80) {
          enqueue("rage_click", { count: fresh.length });
          fresh.length = 0;
        }
      }
      clickBurst.splice(0, clickBurst.length, ...fresh);

      // Throttle regular clicks to 1 per 300 ms
      if (now - lastClickMs < 300) return;
      lastClickMs = now;

      const text     = getClickLabel(el);
      const href     = (el as HTMLAnchorElement).href || el.closest?.("a")?.href;
      const isExternal = href && !href.startsWith(window.location.origin);

      enqueue("click", {
        element: el.tagName?.toLowerCase(),
        text:    text || undefined,
        href:    href ? (isExternal ? href : href.replace(window.location.origin, "")) : undefined,
        id:      (el as HTMLElement).id || undefined,
      });
    };

    // Form: field touched + submit
    const touched = new Set<string>();
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLInputElement;
      if (!["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) return;
      const form    = el.closest("form");
      const formKey = form?.id || form?.getAttribute("name") || form?.action || "form";
      if (touched.has(formKey)) return;
      touched.add(formKey);
      enqueue("form_start", { form: formKey !== "form" ? formKey : undefined, field: el.name || el.type || el.tagName.toLowerCase() });
    };

    const onSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      enqueue("form_submit", { form: form.id || form.getAttribute("name") || undefined });
    };

    // Copy (captures intent — not the actual content for privacy)
    const onCopy = () => {
      const sel = window.getSelection()?.toString().trim();
      if (sel && sel.length > 5) enqueue("copy", { length: sel.length, preview: sel.slice(0, 60) });
    };

    window.addEventListener("scroll",    onScroll,   { passive: true });
    document.addEventListener("click",    onClick,    { passive: true });
    document.addEventListener("focusin",  onFocusIn,  { passive: true });
    document.addEventListener("submit",   onSubmit);
    document.addEventListener("copy",     onCopy,     { passive: true });

    return () => {
      window.removeEventListener("scroll",    onScroll);
      document.removeEventListener("click",    onClick);
      document.removeEventListener("focusin",  onFocusIn);
      document.removeEventListener("submit",   onSubmit);
      document.removeEventListener("copy",     onCopy);
    };
  }, [pathname]); // re-attach on navigation (resets scroll milestones naturally)

  // ── 4. Flush on tab hide / close ─────────────────────────────────────────
  useEffect(() => {
    const flush = () => {
      const pvId = ss(PAGE_VIEW_KEY);
      if (pvId) sendDurationBeacon(pvId, Math.round((Date.now() - pageStart.current) / 1000));
      flushQueueBeacon();
    };
    const onVis = () => { if (document.visibilityState === "hidden") flush(); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("beforeunload", flush);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("beforeunload", flush);
    };
  }, []);

  return null;
}
