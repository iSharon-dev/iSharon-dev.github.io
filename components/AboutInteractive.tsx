"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import Header from "@/components/Header";

const records = [
  { id: "experience", label: "EXPERIENCE", title: "经历档案", body: "中国电信宁波分公司视觉设计实习生；学院办公室学生助理；党支部组织委员与党校负责人。" },
  { id: "awards", label: "SELECTED AWARDS", title: "荣誉与奖项", body: "全国大学生广告艺术大赛浙江赛区一等奖、三创赛省级三等奖、挑战杯校级三等奖、美育教学成果展评三等奖。" },
  { id: "skills", label: "TOOLBOX", title: "设计工具", body: "Illustrator / Photoshop / After Effects / Premiere / InDesign / Figma / AIGC" },
];

export default function AboutInteractive() {
  const portrait = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState("experience");
  const parallax = (event: PointerEvent<HTMLDivElement>) => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    portrait.current?.style.setProperty("--portrait-x", `${x * 10}px`);
    portrait.current?.style.setProperty("--portrait-y", `${y * 8}px`);
  };
  return <main className="paper-page about-page-v2"><Header />
    <section className="about-hero-v2 section-shell">
      <div className="about-portrait-stage" onPointerMove={parallax} onPointerLeave={() => { portrait.current?.style.setProperty("--portrait-x", "0px"); portrait.current?.style.setProperty("--portrait-y", "0px") }}>
        <div className="about-portrait-paper about-portrait-paper--back">PERSONAL FILE / 001</div>
        <div ref={portrait} className="about-portrait-image"><Image src="/about-portrait-bright.png" alt="应俐萱手持饮品的完整个人照片" fill priority sizes="(max-width: 720px) 92vw, 42vw" /></div>
        <span className="about-coordinate">X 0724<br />Y 0418</span>
      </div>
      <div className="about-copy"><span>ABOUT / YLX</span><h1>你好，我是<br />应俐萱。</h1><p className="about-lead">关注品牌叙事、地方文化与数字体验的视觉传达设计师。</p><p>我喜欢先把复杂问题整理清楚，再把它转化成有温度、可理解、能落地的视觉语言。</p><div className="about-actions"><a href="/downloads/resume.pdf" download>下载简历 ↓</a><a href="mailto:2998236578@qq.com">发送邮件 ↗</a></div></div>
    </section>
    <section className="about-records section-shell" aria-label="个人档案">
      {records.map((record, index) => <article key={record.id} className={open === record.id ? "is-open" : ""} onPointerEnter={() => setOpen(record.id)}><button onClick={() => setOpen(open === record.id ? "" : record.id)} aria-expanded={open === record.id}><span>0{index + 1} / {record.label}</span><strong>{record.title}</strong><b>{open === record.id ? "−" : "+"}</b></button><div><p>{record.body}</p></div></article>)}
    </section>
  </main>;
}
