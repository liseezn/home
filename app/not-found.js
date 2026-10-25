import Link from "next/link";
export const metadata = { title: "页面不存在", description: "没有找到你要访问的页面。" };
export default function NotFound() { return <main className="not-found-page"><p className="eyebrow">404 / NOT FOUND</p><h1>这里暂时没有内容。</h1><p>链接可能已经变化，或者你输入的地址不正确。</p><Link href="/" className="button button-primary">返回首页 →</Link></main>; }
