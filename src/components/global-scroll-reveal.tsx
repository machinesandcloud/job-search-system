"use client";

import { useEffect } from "react";

export function GlobalScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js-sr");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("sr-in");
            io.unobserve(el);

            // Stagger direct children cards when parent section enters
            if (el.tagName === "SECTION") {
              el.querySelectorAll(".sr-card").forEach((card, i) => {
                (card as HTMLElement).style.transitionDelay = `${i % 6 * 65}ms`;
                card.classList.add("sr-in");
              });
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -48px 0px" }
    );

    // Mark keyword chip spans (brand-colored pill chips)
    document.querySelectorAll("span").forEach((span) => {
      const cls = span.className;
      if (cls.includes("rounded-full") && cls.includes("brand")) {
        span.classList.add("kw-chip");
      }
    });

    // Mark before/after cards
    document.querySelectorAll("div").forEach((div) => {
      const cls = div.className;
      if (cls.includes("bg-red-50") && cls.includes("rounded")) {
        div.classList.add("ba-before");
      } else if (cls.includes("bg-emerald-50") && cls.includes("rounded")) {
        div.classList.add("ba-after");
      } else if (cls.includes("rounded-xl") && cls.includes("bg-\\[var\\(--bg\\)\\]") && div.previousElementSibling?.classList.contains("ba-after")) {
        div.classList.add("ba-what-changed");
      }
    });

    // Mark FAQ items
    document.querySelectorAll("div").forEach((div) => {
      const cls = div.className;
      if (cls.includes("rounded-xl") && cls.includes("border") && div.querySelector("p.font-bold")) {
        div.classList.add("faq-item");
      }
    });

    // Mark compare task rows
    document.querySelectorAll("div").forEach((div) => {
      if (div.className.includes("rounded-2xl") && div.className.includes("border") && div.className.includes("overflow-hidden")) {
        div.classList.add("sr-card");
      }
    });

    // Observe all sections
    document.querySelectorAll("section").forEach((section, i) => {
      if (i === 0) {
        section.classList.add("sr-in"); // hero instantly visible
      } else {
        section.classList.add("sr-section");
        io.observe(section);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}
