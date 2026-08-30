import type { CSSProperties, ReactNode } from "react";

type FolderGraphicProps = {
  open?: boolean;
  className?: string;
  style?: CSSProperties;
  showTabs?: boolean;
  showSheet?: boolean;
  frontTitle?: string;
  frontSubtitle?: string;
  backLabel?: string;
  decorative?: boolean;
  onFrontClick?: () => void;
  frontExpanded?: boolean;
  frontLabel?: string;
  children?: ReactNode;
};

const tabs = [
  { label: "BRAND", color: "#315f55" },
  { label: "UI / UX", color: "#b9dbe1" },
  { label: "PACKAGING", color: "#f0c94f" },
  { label: "ILLUSTRATION", color: "#df8797" },
  { label: "OTHER", color: "#9fbd98" },
];

export default function FolderGraphic({
  open = false,
  className = "",
  style,
  showTabs = true,
  showSheet = true,
  frontTitle = "YLX",
  frontSubtitle = "VISUAL COMMUNICATION",
  backLabel = "2023—2027",
  decorative = true,
  onFrontClick,
  frontExpanded,
  frontLabel = "打开文件夹",
  children,
}: FolderGraphicProps) {
  return (
    <div className={`folder-graphic ${open ? "is-open" : ""} ${className}`} style={style} aria-hidden={decorative || undefined}>
      <div className="folder-back">
        <span className="folder-back__tab">{backLabel}</span>
      </div>
      {showSheet && <div className="folder-sheet">
        <span className="folder-sheet__eyebrow">VISUAL ARCHIVE · 001</span>
        <strong>个人作品集</strong>
        <em>PORTFOLIO</em>
        <i>应俐萱 / YLX</i>
      </div>}
      {showTabs && <div className="folder-tabs">
        {tabs.map((tab, index) => (
          <span key={tab.label} style={{ "--tab-color": tab.color, "--tab-index": index } as CSSProperties}>
            {tab.label}
          </span>
        ))}
      </div>}
      {children && <div className="folder-content">{children}</div>}
      {onFrontClick ? <button type="button" className="folder-front" onClick={onFrontClick} aria-expanded={frontExpanded} aria-label={frontLabel}>
        <span>{frontTitle}</span>
        <small>{frontSubtitle}</small>
      </button> : <div className="folder-front">
        <span>{frontTitle}</span>
        <small>{frontSubtitle}</small>
      </div>}
    </div>
  );
}
