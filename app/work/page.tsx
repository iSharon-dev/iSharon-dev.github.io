import Header from "@/components/Header";
import ArchiveScroll from "@/components/ArchiveScroll";
import ProjectGrid from "@/components/ProjectGrid";
import ScrollTheme from "@/components/ScrollTheme";

export default function WorkPage() {
  return (
    <main id="top" className="paper-page work-page">
      <ScrollTheme />
      <Header />
      <ArchiveScroll />
      <ProjectGrid />
      <footer className="page-footer section-shell">
        <span>YLX © 2026</span><a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
