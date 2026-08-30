"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/components/Header";
import { ArchiveLink, usePageTransition } from "@/components/PageTransition";
import type { Project } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CaseStudy({ project, next }: { project: Project; next: Project | null }) {
  const root = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState(project.sections[0]?.id ?? "");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const { navigate } = usePageTransition();
  const allMedia = useMemo(() => project.sections.flatMap((item) => item.media), [project]);

  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.utils.toArray<HTMLElement>(".case-media-card").forEach((card) => {
      gsap.fromTo(card,
        { y: 70, opacity: 0, rotate: 0.35 },
        { y: 0, opacity: 1, rotate: 0, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 86%", once: true } },
      );
    });
    gsap.to(".case-progress__fill", { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true } });
  }, { scope: root, dependencies: [project.slug] });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)), { rootMargin: "-30% 0px -55%" });
    project.sections.forEach((item) => { const node = document.getElementById(item.id); if (node) observer.observe(node) });
    return () => observer.disconnect();
  }, [project]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((current) => current === null ? null : (current + 1) % allMedia.length);
      if (event.key === "ArrowLeft") setLightboxIndex((current) => current === null ? null : (current - 1 + allMedia.length) % allMedia.length);
    };
    addEventListener("keydown", key); document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", key); document.body.style.overflow = "" };
  }, [allMedia.length, lightboxIndex]);

  const backToArchive = () => {
    const savedFilter = sessionStorage.getItem("ylx-archive-filter");
    navigate(savedFilter && savedFilter !== "all" ? `/work?category=${savedFilter}#all-work` : "/work#all-work", "BACK / ARCHIVE");
  };

  return (
    <main ref={root} className="paper-page case-page-v2" style={{ "--accent": project.paperColor } as React.CSSProperties}>
      <Header />
      <div className="case-progress"><span className="case-progress__fill" /></div>
      <article>
        <header className="case-hero-v2 section-shell">
          <button onClick={backToArchive} className="back-link">← BACK TO ARCHIVE</button><span className="case-number">CASE / {project.index}</span>
          <h1>{project.title}</h1><p className="case-en">{project.titleEn}</p><p className="case-summary">{project.summary}</p>
          <dl><div><dt>YEAR</dt><dd>{project.year}</dd></div><div><dt>ROLE</dt><dd>{project.roles.join(" / ")}</dd></div><div><dt>TOOLS</dt><dd>{project.tools.join(" / ")}</dd></div></dl>
        </header>
        <nav className="case-chapters section-shell" aria-label="项目章节">
          {project.sections.map((item) => <a key={item.id} className={activeSection === item.id ? "is-active" : ""} href={`#${item.id}`}><span>{item.label.split(" / ")[0]}</span>{item.title}</a>)}
        </nav>
        <div className="case-sections">
          {project.sections.map((item) => (
            <section id={item.id} className="case-section section-shell" key={item.id}>
              <header><span>{item.label}</span><h2>{item.title}</h2>{item.description && <p>{item.description}</p>}</header>
              <div className="case-media-list">
                {item.media.map((media) => {
                  const index = allMedia.findIndex((candidate) => candidate.src === media.src);
                  return <figure className="case-media-card" key={media.src}><button onClick={() => { setLightboxIndex(index); setZoom(1) }} aria-label={`放大查看：${media.caption}`}><Image src={media.previewSrc} alt={media.alt} width={1600} height={1131} sizes="(max-width: 720px) 96vw, 1180px" quality={95} /><span className="zoom-cursor">ZOOM +</span></button><figcaption><span>PORTFOLIO / P.{media.portfolioPage}</span><b>{media.caption}</b></figcaption></figure>;
                })}
              </div>
            </section>
          ))}
        </div>
        {project.videoUrl && <div className="case-video section-shell"><a href={project.videoUrl} target="_blank" rel="noreferrer">WATCH THE MOTION FILM ↗</a></div>}
        <footer className="next-case section-shell"><span>{next ? "NEXT CASE" : "FINAL FILE"}</span><ArchiveLink href={next ? `/work/${next.slug}` : "/thanks"} transitionLabel={next ? `CASE ${next.index} / ${next.titleEn.toUpperCase()}` : "THANKS / CONTACT"}>{next ? next.title : "THANKS FOR WATCHING"}<b>↗</b></ArchiveLink></footer>
      </article>
      {lightboxIndex !== null && <div className="case-lightbox" role="dialog" aria-modal="true" aria-label="高清作品查看器">
        <div className="case-lightbox__bar"><span>P.{allMedia[lightboxIndex].portfolioPage} / {allMedia[lightboxIndex].caption}</span><div><button onClick={() => setZoom((value) => value >= 2 ? 1 : value + 0.5)}>ZOOM {zoom.toFixed(1)}×</button><button onClick={() => setLightboxIndex(null)}>CLOSE ×</button></div></div>
        <div className="case-lightbox__stage" onClick={() => setZoom((value) => value >= 2 ? 1 : value + 0.5)}><Image key={allMedia[lightboxIndex].src} src={allMedia[lightboxIndex].src} alt={allMedia[lightboxIndex].alt} width={3508} height={2481} unoptimized style={{ transform: `scale(${zoom})` }} /></div>
        <button className="case-lightbox__prev" onClick={() => { setLightboxIndex((lightboxIndex - 1 + allMedia.length) % allMedia.length); setZoom(1) }}>←</button><button className="case-lightbox__next" onClick={() => { setLightboxIndex((lightboxIndex + 1) % allMedia.length); setZoom(1) }}>→</button>
      </div>}
    </main>
  );
}
