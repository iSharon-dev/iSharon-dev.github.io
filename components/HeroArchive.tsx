"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/components/Header";
import FolderGraphic from "@/components/FolderGraphic";
import EmojiBurst from "@/components/EmojiBurst";
import { usePageTransition } from "@/components/PageTransition";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroArchive() {
  const root = useRef<HTMLElement>(null);
  const folderButton = useRef<HTMLButtonElement>(null);
  const arrow = useRef<HTMLDivElement>(null);
  const { navigate, busy } = usePageTransition();
  const [hovered, setHovered] = useState(false);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    if (!reduced) {
      gsap.set(".hero-folder-button", { pointerEvents: "none" });
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".site-header", { y: -28, opacity: 0, duration: 0.55 })
        .from(".hero-kicker, .coord, .hero-note", { opacity: 0, duration: 0.35 }, "-=0.2")
        .from(".portfolio-word", { yPercent: 35, opacity: 0, duration: 0.8 }, "-=0.15")
        .from(".hero-folder-button", { y: window.innerHeight * 0.72, rotate: -3, opacity: 0, duration: 1.08, ease: "back.out(1.18)" }, "-=0.5")
        .set(".hero-folder-button", { pointerEvents: "auto" })
        .from(".open-hint", { opacity: 0, y: 12, duration: 0.35 }, "-=0.15");
    }
    if (reduced || mobile) return;
    const hero = root.current?.querySelector<HTMLElement>(".hero-page");
    const folder = folderButton.current;
    if (!hero || !folder) return;
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.8 },
    });
    timeline
      .to(hero, { backgroundColor: "#4f91a7", color: "#f5efdf", duration: 1 }, 0)
      .to(".portfolio-word", { color: "transparent", webkitTextStrokeColor: "#f5efdf", scale: 1.03, duration: 1 }, 0)
      .to(folder, { y: -18, scale: 1.04, duration: 1 }, 0)
      .add(() => folder.querySelector(".folder-graphic")?.classList.add("is-open"), 0.95)
      .to(hero, { backgroundColor: "#f0c94f", color: "#252625", duration: 1 }, 1)
      .to(".portfolio-word", { webkitTextStrokeColor: "#252625", letterSpacing: "0.055em", duration: 1 }, 1)
      .to(folder, { y: -32, rotate: 1, scale: 1.065, duration: 1 }, 1)
      .to(hero, { backgroundColor: "#f5efdf", duration: 1 }, 2)
      .to(".portfolio-word", { color: "rgba(79,145,167,.12)", webkitTextStrokeColor: "#284d56", scale: 1, duration: 1 }, 2)
      .to(folder, { y: -10, rotate: 0, scale: 1, duration: 1 }, 2)
      .to(".open-hint", { opacity: 1, y: -8, duration: 0.4 }, 2.55);
  }, { scope: root });

  useEffect(() => {
    const hero = root.current?.querySelector<HTMLElement>(".hero-page");
    if (!hero || !arrow.current || window.matchMedia("(pointer: coarse)").matches) return;
    pointer.current = { x: innerWidth * 0.64, y: innerHeight * 0.53, tx: innerWidth * 0.64, ty: innerHeight * 0.53 };
    const move = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      pointer.current.tx = event.clientX - rect.left;
      pointer.current.ty = event.clientY - rect.top;
      const folder = folderButton.current;
      if (!folder) return;
      const box = folder.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      const proximity = Math.max(0, 1 - Math.hypot(dx, dy) / 430);
      gsap.to(folder, { x: gsap.utils.clamp(-12, 12, dx * 0.035), rotateY: gsap.utils.clamp(-2, 2, dx * 0.008), rotateX: gsap.utils.clamp(-2, 2, -dy * 0.008), scale: 1 + proximity * 0.08, duration: 0.45, ease: "power3.out", overwrite: "auto" });
    };
    let frame = 0;
    const render = () => {
      pointer.current.x += (pointer.current.tx - pointer.current.x) * 0.14;
      pointer.current.y += (pointer.current.ty - pointer.current.y) * 0.14;
      if (arrow.current) arrow.current.style.transform = `translate3d(${pointer.current.x}px,${pointer.current.y}px,0) rotate(-20deg) scale(${hovered ? 0.76 : 1})`;
      frame = requestAnimationFrame(render);
    };
    hero.addEventListener("pointermove", move);
    frame = requestAnimationFrame(render);
    return () => { hero.removeEventListener("pointermove", move); cancelAnimationFrame(frame) };
  }, [hovered]);

  return (
    <main ref={root} className="home-scroll">
      <section className="hero-page">
        <Header />
        <span className="coord coord--x">X 0724</span><span className="coord coord--y">Y 0418</span>
        <span className="hero-note hero-note--left">VISUAL<br />ARCHIVE</span><span className="hero-note hero-note--right">NINGBO<br />CHINA</span>
        <div className="hero-kicker">VISUAL COMMUNICATION DESIGNER</div>
        <div className="portfolio-word" aria-hidden="true">PORTFOLIO</div>
        <div className="hero-folder-anchor">
          <button ref={folderButton} className="hero-folder-button" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} onClick={() => navigate("/work?entered=1", "WORK / ARCHIVE")} disabled={busy} aria-label="打开应俐萱的作品档案">
            <FolderGraphic
              frontTitle="个人作品集"
              frontSubtitle="应俐萱 · VISUAL COMMUNICATION DESIGN / 2023—2027"
            />
          </button>
        </div>
        <EmojiBurst className="hero-emoji-burst" delay={1.72} />
        <div ref={arrow} className="cursor-arrow" aria-hidden="true"><svg viewBox="0 0 44 54"><path d="M3 3L39 29L23 33L17 50L3 3Z" fill="currentColor" stroke="#f5efdf" strokeWidth="2" /></svg></div>
        <p className="open-hint">{hovered ? "OPEN MY ARCHIVE ↗" : "SCROLL TO OPEN / 点击打开"}</p>
        <footer className="hero-footer"><span>应俐萱 · VISUAL DESIGNER</span><span>NINGBO, CN</span></footer>
      </section>
    </main>
  );
}
