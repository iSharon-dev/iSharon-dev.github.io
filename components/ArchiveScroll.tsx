"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArchiveLink } from "@/components/PageTransition";
import { archiveCategories } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ArchiveScroll() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = matchMedia("(max-width: 767px)").matches;
    const compact = matchMedia("(max-width: 1199px)").matches;
    const cards = gsap.utils.toArray<HTMLElement>(".archive-category-card");
    if (mobile) { gsap.set(cards, { opacity: 1, xPercent: 0, yPercent: 0, rotate: 0, scale: 1 }); return }
    if (reduced) {
      const finalX = compact ? [-110, 0, 110, -55, 55] : [-212, -106, 0, 106, 212];
      const finalY = compact ? [-158, -158, -158, -52, -52] : [-106, -106, -106, -106, -106];
      cards.forEach((card, index) => gsap.set(card, { opacity: 1, xPercent: finalX[index], yPercent: finalY[index], rotate: 0, scale: 1 }));
      gsap.set(".archive-category-copy", { opacity: 1, y: 0 });
      return;
    }
    const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=190%", pin: ".archive-stage", scrub: 0.8, anticipatePin: 1 } });
    // 第 1 幕：前盖轻微打开，三张纸仍在袋口内部。
    timeline
      .to(".archive-intro", { y: -25, opacity: 0, duration: 0.35 }, 0)
      .to(".archive-folder-frontmask", { rotateX: -38, yPercent: 4, duration: 0.62, ease: "power2.out" }, 0.06)
      .to(".archive-folder-cover", { rotate: -2.2, y: -10, duration: 0.55, ease: "power2.out" }, 0.06);
    // 第 2 幕：三张卡片只向上抽出，完整越过袋口后才横向散开。
    const initialX = [-110, -55, 0, 55, 110];
    const initialY = [-18, -24, -29, -24, -18];
    cards.forEach((card, index) => {
      timeline.fromTo(card,
        { yPercent: initialY[index], xPercent: initialX[index], rotate: [-5, -2.5, 0, 2.5, 5][index], scale: 0.82, opacity: 1 },
        { yPercent: -112 - Math.abs(index - 2) * 2, xPercent: (index - 2) * 4, rotate: 0, scale: 0.92, duration: 0.66, ease: "power3.out" }, 0.38 + index * 0.075);
    });
    // 第 3 幕：卡片已完全离开文件夹，展开到三个入口位置。
    cards.forEach((card, index) => {
      const rotate = Number(card.dataset.rotate ?? 0);
      timeline.to(card, { xPercent: [-128, -64, 0, 64, 128][index], yPercent: -106 - Math.abs(index - 2) * 2, rotate, scale: 0.96, duration: 0.72, ease: "power3.out" }, 1.08 + index * 0.04);
    });
    const finalX = compact ? [-110, 0, 110, -55, 55] : [-212, -106, 0, 106, 212];
    const finalY = compact ? [-158, -158, -158, -52, -52] : [-106, -106, -106, -106, -106];
    timeline
      .to(cards, { xPercent: (index) => finalX[index], yPercent: (index) => finalY[index], rotate: 0, scale: 1, duration: 0.82, ease: "power3.inOut", stagger: 0.025 }, 1.7)
      .to(".archive-category-copy", { opacity: 1, y: 0, duration: 0.32, stagger: 0.05 }, 2.0)
      .to(".archive-progress__fill", { scaleX: 1, duration: 2.45, ease: "none" }, 0);
  }, { scope: root });

  return (
    <section ref={root} className="archive-scroll" aria-label="作品档案滚动展示">
      <div className="archive-stage">
        <div className="archive-intro"><span>SELECTED ARCHIVE</span><h1>滑动打开我的<br />设计档案</h1><p>SCROLL TO UNPACK ↓</p></div>
        <div className="archive-folder-assembly">
          <div className="archive-folder-shell" aria-hidden="true"><div className="archive-folder-back"><span>2023—2027 / YLX</span></div></div>
          <div className="archive-category-cards">
            {archiveCategories.map((category, index) => (
              <ArchiveLink key={category.category} href={`/work?category=${category.category}#all-work`} transitionLabel={`${category.titleEn.toUpperCase()} / ${category.index}`} className="archive-category-card" data-x={category.scatter.x} data-y={category.scatter.y} data-rotate={category.scatter.rotate} style={{ "--paper": category.color, "--card-index": index } as React.CSSProperties}>
                <span className="archive-category-index">{category.index}</span><span className="archive-category-type">{category.category === "ui" ? "UI / UX" : category.category.toUpperCase()}</span>
                <div className="archive-category-copy"><strong>{category.title}</strong><p>{category.description}</p><b>OPEN CATEGORY ↗</b></div>
              </ArchiveLink>
            ))}
          </div>
          <div className="archive-folder-cover" aria-hidden="true"><small>VISUAL ARCHIVE · DIRECTORY</small><strong>个人作品集</strong><em>PORTFOLIO</em></div>
          <div className="archive-folder-frontmask"><b>YLX</b><span>VISUAL COMMUNICATION</span></div>
        </div>
        <div className="archive-progress"><span className="archive-progress__fill" /></div>
      </div>
    </section>
  );
}
