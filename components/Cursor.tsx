"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const moveDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      moveDotX(e.clientX);
      moveDotY(e.clientY);
      moveRingX(e.clientX);
      moveRingY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest<HTMLElement>("a, button, [data-cursor], input, textarea");
      if (!interactive) {
        gsap.to(ring, { scale: 1, backgroundColor: "transparent", duration: 0.25 });
        label.textContent = "";
        document.documentElement.classList.remove("cursor-hover");
        return;
      }
      const cursorLabel = interactive.getAttribute("data-cursor") || "";
      label.textContent = cursorLabel;
      gsap.to(ring, {
        scale: cursorLabel ? 2.6 : 1.7,
        backgroundColor: cursorLabel ? "rgba(245,239,223,0.95)" : "transparent",
        duration: 0.25,
      });
      document.documentElement.classList.add("cursor-hover");
    };

    const onOut = () => {
      gsap.to(ring, { scale: 1, backgroundColor: "transparent", duration: 0.25 });
      label.textContent = "";
      document.documentElement.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} />
      </div>
    </>
  );
}
