"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import gsap from "gsap";
import Header from "@/components/Header";
import { ArchiveLink } from "@/components/PageTransition";
import FolderGraphic from "@/components/FolderGraphic";
import EmojiBurst from "@/components/EmojiBurst";

export default function ThanksArchive() {
  const root = useRef<HTMLElement>(null);
  const folder = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (!open) return;
    const scope = root.current;
    if (!scope) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const strips = scope.querySelectorAll<HTMLElement>(".thanks-contact-strip");
    const folderElement = folder.current;
    const context = gsap.context(() => {
      if (reduced) {
        gsap.set(strips, { clearProps: "all" });
        return;
      }
      folderElement?.classList.add("is-dropping");
      gsap.set(strips, { x: 0, y: 0, xPercent: 0, yPercent: 0, rotate: 0, opacity: 0 });
      gsap.fromTo(folder.current, { yPercent: 72, opacity: 0, scale: 0.88 }, { yPercent: 0, opacity: 1, scale: 1, duration: 0.82, ease: "back.out(1.12)", clearProps: "opacity,scale,yPercent" });
      strips.forEach((strip, index) => {
        const x = [-8, 6, -2][index];
        const y = [-230, -100, 20][index];
        const rotate = [-2.5, 1.6, -0.8][index];
        gsap.timeline({ delay: 0.86 + index * 0.11 })
          .fromTo(strip,
            { xPercent: x, yPercent: y - 8, rotate: rotate * 0.65, opacity: 0 },
            { xPercent: x, yPercent: y + 4, rotate, opacity: 1, duration: 0.38, ease: "power2.in" })
          .to(strip, { yPercent: y, duration: 0.28, ease: "back.out(1.4)", onComplete: () => {
            if (index !== strips.length - 1) return;
            folderElement?.classList.remove("is-dropping");
            gsap.set(strips, { clearProps: "transform,opacity" });
          } });
      });
    }, scope);
    return () => { folderElement?.classList.remove("is-dropping"); context.revert() };
  }, [open, replayKey]);

  const move = (event: PointerEvent<HTMLElement>) => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const button = folder.current; if (!button) return;
    const box = button.getBoundingClientRect(); const dx = event.clientX - (box.left + box.width / 2); const dy = event.clientY - (box.top + box.height / 2);
    gsap.to(button, { x: gsap.utils.clamp(-12, 12, dx * 0.025), y: gsap.utils.clamp(-8, 8, dy * 0.018), rotateY: gsap.utils.clamp(-2, 2, dx * 0.006), rotateX: gsap.utils.clamp(-2, 2, -dy * 0.006), scale: 1 + Math.max(0, 1 - Math.hypot(dx, dy) / 500) * 0.07, duration: 0.4, ease: "power3.out" });
    if (cursor.current) cursor.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0) rotate(-20deg)`;
  };
  const copyWechat = async () => { await navigator.clipboard.writeText("Saladdays_o-0"); setCopied(true); window.setTimeout(() => setCopied(false), 1800) };

  const replay = () => {
    setOpen(true);
    setReplayKey((key) => key + 1);
  };

  return <main ref={root} className="thanks-page" onPointerMove={move}><Header />
    <div className="thanks-outline thanks-outline--top">THANKS FOR</div><div className="thanks-outline thanks-outline--bottom">WATCHING</div>
    <div className="thanks-dots" aria-hidden="true" /><span className="thanks-sticker thanks-sticker--one">✨</span><span className="thanks-sticker thanks-sticker--two">YLX</span>
    <div className="thanks-folder-anchor">
      <div ref={folder} className={`thanks-folder ${open ? "is-open" : ""}`}>
        <FolderGraphic className="thanks-shared-folder" open={open} showTabs={false} showSheet={false} frontTitle="感谢观看" frontSubtitle="YLX / VISUAL ARCHIVE" decorative={false} onFrontClick={() => setOpen((value) => !value)} frontExpanded={open} frontLabel={open ? "收回联系方式" : "展开联系方式"}>
          <div className="thanks-strips">
            <a className="thanks-contact-strip" href="tel:18267438251" onClick={(event) => event.stopPropagation()}><span>☎</span>18267438251</a>
            <a className="thanks-contact-strip" href="mailto:2998236578@qq.com" onClick={(event) => event.stopPropagation()}><span>✉</span>2998236578@qq.com</a>
            <span className="thanks-contact-strip" role="button" tabIndex={0} onClick={(event) => { event.stopPropagation(); copyWechat() }} onKeyDown={(event) => event.key === "Enter" && copyWechat()}><span>◉</span>{copied ? "COPIED!" : "Saladdays_o-0"}</span>
          </div>
        </FolderGraphic>
      </div>
    </div>
    <EmojiBurst className="thanks-emoji-burst" delay={0.72} replayKey={replayKey} />
    <p className="thanks-hint">{open ? "CONTACT FILES OPEN / 点击文件夹收回" : "CLICK TO OPEN CONTACT FILES ↗"}</p>
    <div ref={cursor} className="thanks-cursor" aria-hidden="true"><svg viewBox="0 0 44 54"><path d="M3 3L39 29L23 33L17 50L3 3Z" fill="currentColor" stroke="#f5efdf" strokeWidth="2" /></svg></div>
    <div className="thanks-actions"><button onClick={replay}>REPLAY ↺</button><ArchiveLink href="/" transitionLabel="HOME / COVER">BACK TO COVER ↖</ArchiveLink><a href="/downloads/portfolio.pdf" download>DOWNLOAD PORTFOLIO ↓</a></div>
  </main>;
}
