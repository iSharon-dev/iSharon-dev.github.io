"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ArchiveLink } from "@/components/PageTransition";
import { categoryDetails, categoryLabels, projects, type ProjectFilter } from "@/data/projects";

gsap.registerPlugin(Flip);

type Filter = ProjectFilter;
const filters: Filter[] = ["all", "brand", "ui", "packaging", "illustration", "other"];

export default function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [motionKey, setMotionKey] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const value = new URLSearchParams(location.search).get("category") as Filter | null;
    if (value && filters.includes(value)) setFilter(value);
    const saved = sessionStorage.getItem("ylx-archive-scroll");
    if (saved && location.hash === "#all-work") {
      requestAnimationFrame(() => scrollTo({ top: Number(saved), behavior: "instant" }));
      sessionStorage.removeItem("ylx-archive-scroll");
    }
  }, []);

  const choose = (value: Filter) => {
    if (value === filter) return;
    const grid = gridRef.current;
    if (grid && !matchMedia("(prefers-reduced-motion: reduce)").matches && !matchMedia("(pointer: coarse)").matches) {
      const state = Flip.getState(grid.querySelectorAll(".project-folder-card"));
      setFilter(value); setMotionKey((key) => key + 1);
      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: 0.62,
          ease: "power3.inOut",
          stagger: 0.045,
          scale: true,
          absolute: true,
          onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 26, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out", stagger: 0.04, overwrite: "auto" }),
          onLeave: (els) => gsap.to(els, { opacity: 0, y: -18, scale: 0.92, duration: 0.28, ease: "power2.in", overwrite: "auto" }),
        });
      });
    } else {
      setFilter(value); setMotionKey((key) => key + 1);
    }
    router.replace(value === "all" ? "/work#all-work" : `/work?category=${value}#all-work`, { scroll: false });
  };
  const visible = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "other") return projects.filter((project) => project.category === "graphic" || project.category === "motion");
    return projects.filter((project) => project.category === filter);
  }, [filter]);
  const detail = categoryDetails[filter];

  const tilt = (event: PointerEvent<HTMLAnchorElement>) => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${x * 1.5}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${y * -1.5}deg`);
  };

  return (
    <section id="all-work" className="project-index section-shell">
      <header className="section-heading"><span>ALL FILES / 10</span><h2>完整作品目录</h2><p>每一个文件夹都保留原作品集中的完整过程、视觉系统与成果页面。</p></header>
      <div className="archive-filter" style={{ "--active-color": detail.color } as React.CSSProperties}>
        <div className="archive-filter__rail" role="tablist" aria-label="作品分类筛选" onKeyDown={(event) => {
          if (!(["ArrowLeft", "ArrowRight"] as string[]).includes(event.key)) return;
          event.preventDefault();
          const index = filters.indexOf(filter); const step = event.key === "ArrowRight" ? 1 : -1;
          choose(filters[(index + step + filters.length) % filters.length]);
        }}>
          {filters.map((value) => <button key={value} role="tab" aria-selected={filter === value} className={filter === value ? "is-active" : ""} onClick={() => choose(value)}><span>{categoryDetails[value].index}</span>{categoryLabels[value]}</button>)}
        </div>
        <div key={motionKey} className="archive-filter__readout"><strong>{detail.index}</strong><div><b>{detail.title}</b><span>{detail.description}</span></div><em>PROJECTS {String(visible.length).padStart(2, "0")}</em></div>
      </div>
      <div ref={gridRef} className="project-folder-grid">
        {visible.map((project, cardIndex) => (
          <ArchiveLink
            className="project-folder-card"
            key={project.slug}
            href={`/work/${project.slug}`}
            transitionLabel={`CASE ${project.index} / ${project.titleEn.toUpperCase()}`}
            style={{ "--paper": project.paperColor, "--folder-shadow": project.folderShadow ?? "#284d56" } as React.CSSProperties}
            onPointerMove={tilt}
            onPointerLeave={(event) => { event.currentTarget.style.setProperty("--tilt-x", "0deg"); event.currentTarget.style.setProperty("--tilt-y", "0deg") }}
            onClick={() => { sessionStorage.setItem("ylx-archive-scroll", String(scrollY)); sessionStorage.setItem("ylx-archive-filter", filter) }}
          >
            <div className="project-folder-back" aria-hidden="true" />
            <span className="project-folder-tab">{categoryLabels[project.category]} / {project.index}</span>
            <div className="project-folder-sheet"><Image src={project.cover} alt={`${project.title}项目预览`} fill sizes="(max-width: 720px) 92vw, 45vw" loading={cardIndex < 2 ? "eager" : "lazy"} /></div>
            <div className="project-folder-front">
              {project.award && <span className="award-tag">AWARD WINNER · {project.award}</span>}
              <span className="project-folder-meta">{project.index} / {project.year}</span>
              <div><strong>{project.title}</strong><em>{project.titleEn}</em></div>
              <b className="view-case">VIEW CASE <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12L12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" /></svg></b>
            </div>
            <i className="project-folder-peel" aria-hidden="true" />
          </ArchiveLink>
        ))}
      </div>
    </section>
  );
}
