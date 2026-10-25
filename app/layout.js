import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import Analytics from "./components/analytics";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
export const metadata = {
  metadataBase: new URL("https://www.liseezn.top"),
  title: { default: "liseezn · 数字花园", template: "%s · liseezn" },
  description: "个人数字门户，汇集正在构建的项目、常用服务与最新文章。", applicationName: "liseezn",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "zh_CN", url: "https://www.liseezn.top", siteName: "liseezn · 数字花园", title: "liseezn · 数字花园", description: "把想法，变成正在发生的事。" },
  twitter: { card: "summary", title: "liseezn · 数字花园", description: "把想法，变成正在发生的事。" },
  other: { "baidu-site-verification": "codeva-pFSTct68ix" },
};
export default function RootLayout({ children }) { return <html lang="zh-CN" className={inter.variable + " " + playfair.variable} suppressHydrationWarning><body>{children}<Analytics /></body></html>; }
