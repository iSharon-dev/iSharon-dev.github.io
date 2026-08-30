"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const items = [
  { emoji: "🔥", x: -0.34, lift: 122, rotate: -22 },
  { emoji: "✨", x: -0.12, lift: 164, rotate: 18 },
  { emoji: "❤️‍🔥", x: 0.15, lift: 146, rotate: -14 },
  { emoji: "🤩", x: 0.35, lift: 112, rotate: 20 },
];

type EmojiBurstProps = {
  className?: string;
  delay?: number;
  replayKey?: number;
};

export default function EmojiBurst({ className = "", delay = 0, replayKey = 0 }: EmojiBurstProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const nodes = gsap.utils.toArray<HTMLElement>(".emoji-burst__item");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    const landingY = innerHeight * (coarse ? 0.28 : 0.38);

    gsap.killTweensOf(nodes);
    if (reduced) {
      nodes.forEach((node, index) => gsap.set(node, { opacity: 1, scale: 0.82, x: innerWidth * items[index].x, y: landingY, rotate: items[index].rotate * 0.25 }));
      return;
    }

    nodes.forEach((node, index) => {
      const item = items[index];
      const targetX = innerWidth * item.x;
      const timeline = gsap.timeline({ delay: delay + index * 0.11 });
      timeline
        .set(node, { opacity: 0, scale: 0.35, x: 0, y: 0, rotate: 0 })
        .to(node, { opacity: 1, scale: coarse ? 0.78 : 0.92, x: targetX * 0.48, y: -item.lift, rotate: item.rotate, duration: 0.42, ease: "power3.out" })
        .to(node, { x: targetX, y: landingY, rotate: item.rotate * 2.1, duration: 0.82, ease: "power2.in" })
        .to(node, { y: landingY - 19, duration: 0.16, ease: "power2.out" })
        .to(node, { y: landingY, duration: 0.28, ease: "bounce.out" });
    });
  }, { scope: root, dependencies: [delay, replayKey] });

  return <div ref={root} className={`emoji-burst ${className}`} aria-hidden="true">
    {items.map((item) => <span className="emoji-burst__item" key={item.emoji}>{item.emoji}</span>)}
  </div>;
}
