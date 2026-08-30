"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visited = sessionStorage.getItem("ylx-loaded");
    if (reduced || visited) { setHidden(true); return; }

    const root = rootRef.current;
    if (!root) return;

    const duration = 1.9;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / (duration * 1000));
      setCount(Math.round(progress * 100));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const reveal = gsap.timeline({ onComplete: () => { setHidden(true); sessionStorage.setItem("ylx-loaded", "1"); } });
    reveal
      .to(".loader-count", { opacity: 0, y: -14, duration: 0.22, ease: "power2.in" })
      .to(".loader-panel--top", { yPercent: -101, duration: 0.6, ease: "expo.inOut" }, "-=0.05")
      .to(".loader-panel--bottom", { yPercent: 101, duration: 0.6, ease: "expo.inOut" }, "<");

    return () => { reveal.kill() };
  }, []);

  if (hidden) return null;

  return (
    <div ref={rootRef} className="loader" aria-hidden="true">
      <div className="loader-panel loader-panel--top" />
      <div className="loader-panel loader-panel--bottom" />
      <div className="loader-core">
        <span className="loader-word">YLX</span>
        <span className="loader-count">{count}</span>
      </div>
    </div>
  );
}
