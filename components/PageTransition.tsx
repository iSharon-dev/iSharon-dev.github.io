"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, type AnchorHTMLAttributes, type MouseEvent, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";

type TransitionContextValue = { navigate: (href: string, label?: string) => void; busy: boolean };
const TransitionContext = createContext<TransitionContextValue>({ navigate: () => undefined, busy: false });

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [label, setLabel] = useState("YLX ARCHIVE");

  const reveal = useCallback(() => {
    const node = overlay.current;
    if (!node || !pending.current) return;
    pending.current = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.timeline({ onComplete: () => setBusy(false) })
      .to(node.querySelector(".transition-label"), { opacity: 0, y: -12, duration: reduced ? 0.05 : 0.18 })
      .to(node.querySelector(".transition-panel--top"), { yPercent: -102, duration: reduced ? 0.08 : 0.42, ease: "expo.inOut" }, reduced ? 0 : "-=0.02")
      .to(node.querySelector(".transition-panel--bottom"), { yPercent: 102, duration: reduced ? 0.08 : 0.42, ease: "expo.inOut" }, "<")
      .set(node, { pointerEvents: "none" });
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(reveal, 45);
    return () => window.clearTimeout(timer);
  }, [pathname, reveal]);

  const navigate = useCallback((href: string, nextLabel = "OPEN ARCHIVE") => {
    if (busy || href === pathname) return;
    const node = overlay.current;
    if (!node) return router.push(href);
    setBusy(true);
    setLabel(nextLabel);
    pending.current = true;
    router.prefetch(href);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(node, { pointerEvents: "auto" });
    gsap.timeline({ onComplete: () => router.push(href) })
      .set(node.querySelector(".transition-label"), { opacity: 0, y: 12 })
      .to(node.querySelector(".transition-panel--top"), { yPercent: 0, duration: reduced ? 0.08 : 0.44, ease: "expo.inOut" })
      .to(node.querySelector(".transition-panel--bottom"), { yPercent: 0, duration: reduced ? 0.08 : 0.44, ease: "expo.inOut" }, "<")
      .to(node.querySelector(".transition-label"), { opacity: 1, y: 0, duration: reduced ? 0.05 : 0.2 }, "-=0.08");
  }, [busy, pathname, router]);

  return (
    <TransitionContext.Provider value={{ navigate, busy }}>
      {children}
      <div ref={overlay} className="page-transition" aria-hidden="true">
        <div className="transition-panel transition-panel--top" />
        <div className="transition-panel transition-panel--bottom" />
        <div className="transition-label"><span>{label}</span><b>YLX / VISUAL ARCHIVE</b></div>
      </div>
    </TransitionContext.Provider>
  );
}

export function usePageTransition() { return useContext(TransitionContext) }

type ArchiveLinkProps = LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { transitionLabel?: string; children: ReactNode; onClick?: (event: MouseEvent<HTMLAnchorElement>) => void };

export function ArchiveLink({ href, transitionLabel, children, onClick, ...props }: ArchiveLinkProps) {
  const { navigate } = usePageTransition();
  const url = typeof href === "string" ? href : href.pathname ?? "/";
  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || url.startsWith("#")) return;
        event.preventDefault();
        navigate(url, transitionLabel);
      }}
    >
      {children}
    </Link>
  );
}
