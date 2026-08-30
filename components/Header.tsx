"use client";

import { usePathname } from "next/navigation";
import { ArchiveLink } from "@/components/PageTransition";

const links = [
  { href: "/work", label: "WORK" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export default function Header({ light = false }: { light?: boolean }) {
  const pathname = usePathname();
  return (
    <header className={`site-header ${light ? "site-header--light" : ""}`}>
      <ArchiveLink className="monogram" href="/" transitionLabel="HOME / COVER" aria-label="返回首页">
        <span>Y</span><span>L</span><span>X</span>
      </ArchiveLink>
      <nav aria-label="主导航">
        {links.map((link) => (
          <ArchiveLink
            key={link.href}
            href={link.href}
            className={pathname.startsWith(link.href) ? "is-active" : ""}
            transitionLabel={`${link.label} / ARCHIVE`}
          >
            {link.label}
          </ArchiveLink>
        ))}
      </nav>
      <span className="header-year">2023—2027</span>
    </header>
  );
}
