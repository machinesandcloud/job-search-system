"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const VISITOR_ID_KEY = "_zvid";     // persists in localStorage (cross-session)
const SESSION_ID_KEY = "_zsid";     // persists in sessionStorage (per browser tab)
const PAGE_VIEW_KEY  = "_zpvid";    // current pageview ID for duration tracking

function getOrCreateVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

function getSessionDbId(): string | null {
  try { return sessionStorage.getItem(SESSION_ID_KEY); } catch { return null; }
}

function setSessionDbId(id: string) {
  try { sessionStorage.setItem(SESSION_ID_KEY, id); } catch { /* */ }
}

function getPageViewId(): string | null {
  try { return sessionStorage.getItem(PAGE_VIEW_KEY); } catch { return null; }
}

function setPageViewId(id: string | null) {
  try {
    if (id) sessionStorage.setItem(PAGE_VIEW_KEY, id);
    else sessionStorage.removeItem(PAGE_VIEW_KEY);
  } catch { /* */ }
}

function getUtmParams(): Record<string, string> {
  try {
    const p = new URLSearchParams(window.location.search);
    const out: Record<string, string> = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = p.get(key);
      if (v) out[key] = v;
    }
    return out;
  } catch { return {}; }
}

async function createSession(visitorId: string): Promise<string | null> {
  const utms = getUtmParams();
  try {
    const res = await fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type: "session",
        visitorId,
        landingPage: window.location.pathname + window.location.search,
        referrer: document.referrer || undefined,
        utmSource: utms["utm_source"],
        utmMedium: utms["utm_medium"],
        utmCampaign: utms["utm_campaign"],
        language: navigator.language,
        screenWidth: window.screen?.width,
        screenHeight: window.screen?.height,
      }),
      keepalive: true,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.sessionDbId ?? null;
  } catch { return null; }
}

async function sendPageView(sessionDbId: string, page: string, title: string): Promise<string | null> {
  try {
    const res = await fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type: "pageview",
        sessionDbId,
        page,
        title,
        referrer: document.referrer || undefined,
      }),
      keepalive: true,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.pageViewId ?? null;
  } catch { return null; }
}

async function sendDuration(pageViewId: string, duration: number) {
  if (duration < 1) return;
  try {
    navigator.sendBeacon(
      "/api/track",
      JSON.stringify({ type: "duration", pageViewId, duration }),
    );
  } catch { /* */ }
}

export function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionDbIdRef = useRef<string | null>(null);
  const pageStartRef   = useRef<number>(Date.now());
  const initialized    = useRef(false);

  // Initialize session once on first mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const visitorId = getOrCreateVisitorId();
    const existingSession = getSessionDbId();

    if (existingSession) {
      sessionDbIdRef.current = existingSession;
    } else {
      createSession(visitorId).then((dbId) => {
        if (dbId) {
          sessionDbIdRef.current = dbId;
          setSessionDbId(dbId);
        }
      });
    }
  }, []);

  // Track pageviews on route change
  useEffect(() => {
    // Flush duration for the previous page
    const prevPageViewId = getPageViewId();
    if (prevPageViewId) {
      const elapsed = Math.round((Date.now() - pageStartRef.current) / 1000);
      sendDuration(prevPageViewId, elapsed);
      setPageViewId(null);
    }
    pageStartRef.current = Date.now();

    const page = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    // Wait for session if it's being created
    const track = async () => {
      let sessionDbId = sessionDbIdRef.current || getSessionDbId();
      if (!sessionDbId) {
        // Session not ready yet — wait a bit and retry
        await new Promise((r) => setTimeout(r, 800));
        sessionDbId = sessionDbIdRef.current || getSessionDbId();
      }
      if (!sessionDbId) return;

      const pvId = await sendPageView(sessionDbId, page, document.title);
      if (pvId) setPageViewId(pvId);
    };

    track();
  }, [pathname, searchParams]);

  // Flush duration on tab close / visibility hide
  useEffect(() => {
    const flush = () => {
      const pvId = getPageViewId();
      if (!pvId) return;
      const elapsed = Math.round((Date.now() - pageStartRef.current) / 1000);
      sendDuration(pvId, elapsed);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") flush();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("beforeunload", flush);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("beforeunload", flush);
    };
  }, []);

  return null;
}
