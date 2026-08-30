export type ProjectCategory = "brand" | "ui" | "packaging" | "illustration" | "graphic" | "motion";
export type ArchiveCategoryKey = "brand" | "ui" | "packaging" | "illustration" | "other";
export type ProjectFilter = ProjectCategory | "all" | "other";

export type ProjectMedia = { src: string; previewSrc: string; alt: string; caption: string; portfolioPage: number; width: number; height: number };
export type ProjectSection = { id: string; label: string; title: string; description?: string; media: ProjectMedia[] };
export type Project = {
  slug: string; index: string; title: string; titleEn: string; category: ProjectCategory; year: string; featured: boolean;
  award?: string; cover: string; summary: string; roles: string[]; tools: string[]; sections: ProjectSection[]; videoUrl?: string;
  paperColor: string; folderShadow?: string; scatter: { x: number; y: number; rotate: number; depth: number };
};
export type ArchiveCategory = { index: string; category: ArchiveCategoryKey; title: string; titleEn: string; description: string; color: string; scatter: { x: number; y: number; rotate: number } };

export const categoryLabels: Record<ProjectFilter, string> = { all: "全部", brand: "品牌", ui: "UI/UX", packaging: "包装", illustration: "插画", graphic: "平面", motion: "动态", other: "其他" };

export const categoryDetails: Record<ProjectFilter, { index: string; title: string; description: string; color: string }> = {
  all: { index: "00", title: "ALL ARCHIVES", description: "品牌 / 交互 / 包装 / 插画 / 平面 / 动态", color: "#284d56" },
  brand: { index: "01", title: "BRAND DESIGN", description: "品牌策略 / 视觉识别 / 延展应用", color: "#4f91a7" },
  ui: { index: "02", title: "INTERACTION DESIGN", description: "用户研究 / 信息架构 / 界面系统", color: "#b9dbe1" },
  packaging: { index: "03", title: "PACKAGING DESIGN", description: "包装结构 / 系列陈列 / 场景展示", color: "#f0c94f" },
  illustration: { index: "04", title: "ILLUSTRATION DESIGN", description: "角色语言 / 场景叙事 / 物料延展", color: "#df8797" },
  graphic: { index: "05", title: "GRAPHIC DESIGN", description: "海报 / 书籍 / 文创 / 摄影", color: "#9fbd98" },
  motion: { index: "06", title: "MOTION DESIGN", description: "数字影像 / 动态视觉 / 特效合成", color: "#4f91a7" },
  other: { index: "05", title: "OTHER DESIGN", description: "海报 / 书籍 / 文创 / 摄影 / 动态", color: "#9fbd98" },
};

export const archiveCategories: ArchiveCategory[] = [
  { index: "01", category: "brand", title: "品牌设计", titleEn: "Brand Design", description: "建立从识别到应用的完整品牌视觉档案。", color: "#4f91a7", scatter: { x: -72, y: 8, rotate: -6 } },
  { index: "02", category: "ui", title: "交互设计", titleEn: "Interaction Design", description: "把功能、路径和情绪组织成可使用的数字体验。", color: "#b9dbe1", scatter: { x: 0, y: -8, rotate: 3 } },
  { index: "03", category: "packaging", title: "包装设计", titleEn: "Packaging Design", description: "让地方物产通过结构与陈列形成清晰记忆。", color: "#f0c94f", scatter: { x: 72, y: 8, rotate: 6 } },
  { index: "04", category: "illustration", title: "插画设计", titleEn: "Illustration Design", description: "用角色、场景与叙事建立可延展的视觉语言。", color: "#df8797", scatter: { x: 104, y: 3, rotate: 5 } },
  { index: "05", category: "other", title: "其他设计", titleEn: "Other Design", description: "收录海报、书籍、文创、摄影与动态影像。", color: "#9fbd98", scatter: { x: 138, y: 10, rotate: 7 } },
];

const media = (slug: string, page: number, caption: string, alt: string): ProjectMedia => ({
  src: `/portfolio/${slug}/p${String(page).padStart(2, "0")}.webp`, previewSrc: `/portfolio/${slug}/p${String(page).padStart(2, "0")}-preview.webp`,
  alt, caption, portfolioPage: page, width: 3508, height: 2481,
});
const section = (slug: string, id: string, label: string, title: string, pages: Array<[number, string]>, description?: string): ProjectSection => ({
  id, label, title, description, media: pages.map(([page, caption]) => media(slug, page, caption, `${title} - ${caption}`)),
});

export const projects: Project[] = [
  {
    slug: "lushan-tea", index: "01", title: "鹿山茶寮", titleEn: "Lushan Tea Garden", category: "brand", year: "2026", featured: true,
    cover: "/portfolio/lushan-tea/p05-preview.webp", summary: "为东钱湖生态茶园建立兼具宋韵气质与现代传播力的品牌视觉系统。",
    roles: ["品牌策略", "标志设计", "视觉规范", "延展物料"], tools: ["Illustrator", "Photoshop"], paperColor: "#4f91a7", folderShadow: "#2f6679", scatter: { x: -31, y: -15, rotate: -8, depth: 5 },
    sections: [
      section("lushan-tea", "intro", "01 / CONCEPT", "品牌概念", [[5, "品牌主视觉"], [6, "项目背景"]], "从东钱湖茶园、宋韵文化与近郊茶旅体验中建立品牌定位。"),
      section("lushan-tea", "identity", "02 / IDENTITY", "视觉识别系统", [[7, "品牌标志"], [8, "品牌色彩"], [9, "品牌字体"]]),
      section("lushan-tea", "application", "03 / APPLICATION", "品牌延展", [[10, "场景应用"], [11, "延展物料"], [12, "系列应用"]]),
    ],
  },
  {
    slug: "supnice", index: "02", title: "超能植愈花园", titleEn: "Supnice Healing Garden", category: "ui", year: "2026", featured: true,
    cover: "/portfolio/supnice/p14-preview.webp", summary: "围绕消费、花种收集、花园养成与社区互动，构建自然疗愈的小程序体验。",
    roles: ["用户研究", "信息架构", "UI设计", "组件系统"], tools: ["Figma", "Illustrator", "Photoshop"], paperColor: "#b9dbe1", folderShadow: "#6f9faa", scatter: { x: 2, y: -24, rotate: 4, depth: 7 },
    sections: [
      section("supnice", "intro", "01 / INTRO", "体验概念", [[14, "项目封面"], [15, "项目简介"]]),
      section("supnice", "research", "02 / RESEARCH", "用户与架构", [[16, "UI框架与用户画像"]]),
      section("supnice", "system", "03 / SYSTEM", "视觉与组件系统", [[17, "字体、色彩与图标"], [18, "组件化设计"]]),
      section("supnice", "interface", "04 / INTERFACE", "高保真界面", [[19, "界面展示一"], [20, "界面展示二"]]),
    ],
  },
  {
    slug: "ninghai-loquat", index: "03", title: "宁海白枇杷", titleEn: "Ninghai White Loquat", category: "packaging", year: "2026", featured: true,
    cover: "/portfolio/ninghai-loquat/p22-preview.webp", summary: "以宁海地理物产为线索，完成从包装结构到系列陈列的地方伴手礼设计。",
    roles: ["包装策略", "视觉设计", "刀版设计", "效果呈现"], tools: ["Illustrator", "Photoshop"], paperColor: "#f0c94f", folderShadow: "#ad8418", scatter: { x: 34, y: -12, rotate: 9, depth: 4 },
    sections: [
      section("ninghai-loquat", "concept", "01 / CONCEPT", "包装概念", [[22, "项目封面"], [23, "品牌与系列设定"]]),
      section("ninghai-loquat", "structure", "02 / STRUCTURE", "包装结构", [[24, "刀版结构一"], [25, "刀版结构二"]]),
      section("ninghai-loquat", "product", "03 / PRODUCT", "产品系列", [[26, "单品展示"], [27, "系列展示"]]),
      section("ninghai-loquat", "outcome", "04 / OUTCOME", "场景成果", [[28, "效果图展示"]]),
    ],
  },
  {
    slug: "shengyangtai", index: "04", title: "昇阳泰品牌墙绘", titleEn: "Shengyangtai Mural", category: "illustration", year: "2026", featured: false,
    cover: "/portfolio/shengyangtai/p30-preview.webp", summary: "用扁平插画连接老字号糕点、宁波市井文化与便利店临街场景。",
    roles: ["概念设计", "插画设计", "场景推演", "物料延展"], tools: ["Illustrator", "Photoshop"], paperColor: "#df8797", folderShadow: "#9e4d63", scatter: { x: -22, y: 13, rotate: -6, depth: 2 },
    sections: [
      section("shengyangtai", "concept", "01 / MURAL", "墙绘概念", [[30, "品牌墙绘主视觉"], [31, "墙绘方案与项目背景"]]),
      section("shengyangtai", "scene", "02 / SCENE", "场景落地", [[32, "便利店墙绘效果"], [33, "真实场景模拟"]]),
      section("shengyangtai", "extension", "03 / EXTENSION", "视觉延展", [[34, "创意海报"], [35, "延展物料"]]),
    ],
  },
  {
    slug: "yunnan-baiyao", index: "05", title: "云南白药创意招贴", titleEn: "Yunnan Baiyao Posters", category: "graphic", year: "2025", featured: false, award: "省级一等奖",
    cover: "/portfolio/yunnan-baiyao/p37-preview.webp", summary: "运用图形同构连接牙齿、钻戒、珍珠与灯泡，直观表达产品亮白卖点。", folderShadow: "#597a55",
    roles: ["创意概念", "图形设计", "广告文案"], tools: ["Illustrator", "Photoshop"], paperColor: "#9fbd98", scatter: { x: 25, y: 17, rotate: 7, depth: 1 },
    sections: [section("yunnan-baiyao", "poster", "01 / POSTER", "获奖系列招贴", [[37, "云南白药光钻白牙膏创意海报"]])],
  },
  {
    slug: "snake-posters", index: "06", title: "蛇年主题海报", titleEn: "Year of the Snake", category: "graphic", year: "2025", featured: false,
    cover: "/portfolio/snake-posters/p38-preview.webp", summary: "以几何拼接、曲线正负形和像素语言塑造三种现代灵蛇形象。", folderShadow: "#aa5e52",
    roles: ["视觉概念", "版式设计", "系列海报"], tools: ["Illustrator", "Photoshop"], paperColor: "#e89b8f", scatter: { x: -8, y: 24, rotate: -3, depth: 0 },
    sections: [section("snake-posters", "poster", "01 / POSTER", "蛇年主题系列", [[38, "三款蛇年主题创意海报"]])],
  },
  {
    slug: "bo-mo-yongcheng", index: "07", title: "《泊墨甬城》", titleEn: "Bo Mo Yongcheng", category: "graphic", year: "2025", featured: false,
    cover: "/portfolio/bo-mo-yongcheng/p39-preview.webp", summary: "以宁波城市文化为线索，完成书籍封面、章节索引与内页信息层级的系统编排。", folderShadow: "#2d4f7a",
    roles: ["书籍装帧", "信息编排", "版式设计"], tools: ["InDesign", "Illustrator", "Photoshop"], paperColor: "#4d78b5", scatter: { x: 12, y: 18, rotate: 3, depth: 0 },
    sections: [section("bo-mo-yongcheng", "book", "01 / EDITORIAL", "宁波主题书籍", [[39, "封面与目录系统"], [40, "内页版式与内容编排"]], "围绕宁波地方文化建立统一的蓝色视觉系统，强调阅读路径与图文秩序。")],
  },
  {
    slug: "campus-tote", index: "08", title: "校园图书馆帆布袋", titleEn: "Campus Library Tote", category: "graphic", year: "2025", featured: false,
    cover: "/portfolio/campus-tote/p41-preview.webp", summary: "提取校园建筑与阅读人物元素，构建兼具实用性和纪念意义的校园文创。", folderShadow: "#a66f55",
    roles: ["文创设计", "图形设计", "成品落地"], tools: ["Illustrator", "Photoshop"], paperColor: "#e8b899", scatter: { x: 17, y: 27, rotate: 5, depth: 0 },
    sections: [section("campus-tote", "design", "01 / CULTURAL PRODUCT", "校园文创", [[41, "帆布袋平面设计"], [42, "成品展示"]])],
  },
  {
    slug: "ningbo-street-photo", index: "09", title: "甬城纪实摄影", titleEn: "Ningbo Street Photography", category: "graphic", year: "2025", featured: false,
    cover: "/portfolio/ningbo-street-photo/p43-preview.webp", summary: "从街头劳动、出行与日常片段中记录宁波城市生活的真实节奏。", folderShadow: "#657684",
    roles: ["纪实摄影", "影像选择", "叙事编排"], tools: ["Camera", "Photoshop"], paperColor: "#a9b8c4", scatter: { x: -15, y: 22, rotate: -4, depth: 0 },
    sections: [section("ningbo-street-photo", "photo", "01 / DOCUMENTARY", "街头巷尾的生活奏鸣", [[43, "甬城纪实摄影组图"]])],
  },
  {
    slug: "meta-city", index: "10", title: "《元城市》数字特效", titleEn: "Meta City", category: "motion", year: "2025", featured: false,
    cover: "/portfolio/meta-city/p44-preview.webp", summary: "通过粒子、线框模型和动态光效，可视化演绎智能交通与数字互联。", folderShadow: "#2d6374",
    roles: ["动态设计", "视觉合成", "特效制作"], tools: ["After Effects", "Premiere"], paperColor: "#4f91a7", scatter: { x: 35, y: 26, rotate: 8, depth: 0 }, videoUrl: "https://www.bilibili.com/video/BV1t23Y6gEXi/",
    sections: [section("meta-city", "motion", "01 / MOTION", "数字特效短片", [[44, "元城市关键画面与视频入口"]])],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export function getProject(slug: string) { return projects.find((project) => project.slug === slug) }
