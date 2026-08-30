import type { Metadata } from "next";
import { PageTransitionProvider } from "@/components/PageTransition";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import "./globals.css";

export const metadata: Metadata = {
  title: "应俐萱｜视觉设计作品集",
  description: "应俐萱的品牌、交互、包装、插画与动态视觉作品集。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>
        <PageTransitionProvider>
          {children}
          <SmoothScroll />
          <Cursor />
          <Loader />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
