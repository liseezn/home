import SiteShell from "../components/site-shell";
export const metadata = { title: "博客与笔记", description: "技术实践、产品思考与个人记录。", alternates: { canonical: "/blog" } };
export default function BlogPage() { return <SiteShell page="blog" />; }
