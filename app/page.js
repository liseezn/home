import SiteShell from "./components/site-shell";
export const metadata = { title: "liseezn · 数字花园", description: "个人数字门户，汇集正在构建的项目、常用服务与最新文章。", alternates: { canonical: "/" } };
export default function HomePage() { return <SiteShell page="home" />; }
