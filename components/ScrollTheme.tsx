"use client";

import { useEffect } from "react";

const projectColors = [
  "#4f91a7", "#b9dbe1", "#f0c94f", "#df8797", "#9fbd98", "#e89b8f",
  "#4d78b5", "#e8b899", "#a9b8c4",
];

function readableForeground(bg: string) {
  const hex = bg.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#1a1a1a" : "#f5efdf";
}

export default function ScrollTheme() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".work-page");
    if (!main) return;

    const sections: Array<{ el: HTMLElement; bg: string; fg: string }> = [];
    sections.push({ el: main.querySelector("#all-work") ?? main, bg: "#f5efdf", fg: "#252625" });
    main.querySelectorAll<HTMLElement>(".project-folder-card").forEach((card) => {
      const color = getComputedStyle(card).getPropertyValue("--paper").trim();
      const bg = color || "#f5efdf";
      sections.push({ el: card, bg, fg: readableForeground(bg) });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const hit = sections.find((s) => s.el === entry.target);
          if (!hit) return;
          main.style.setProperty("--page-bg", hit.bg);
          main.style.setProperty("--page-fg", hit.fg);
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
  }, []);

  return null;
}
