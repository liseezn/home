import Link from 'next/link';
export const metadata={title:'隐私政策 · liseezn',description:'liseezn.top 个人主页隐私政策'};
const sections=[
['1. 适用范围','本政策适用于 liseezn.top 个人主页。通过本站链接访问的博客、网盘、游戏服务或其他第三方网站，适用其各自的隐私政策。'],
['2. 信息处理','本站目前是个人展示与导航主页，不提供本站账号注册、登录或在线支付功能。网站托管、网络基础设施或服务器可能按运行机制处理访问时间、请求地址、浏览器与设备信息、访问页面等技术日志；具体字段及保存期限取决于实际服务配置。'],
['3. 访问统计','本站代码加载由 stats.liseezn.top 提供的 Matomo 访问统计脚本。该服务可能处理页面访问、来源页面、浏览器及设备等统计信息。本站尚未核实当前 Matomo 的 IP 匿名化、Cookie 使用及数据保留配置，因此不对这些设置作未经核实的承诺。'],
['4. 本地存储','主页使用浏览器 localStorage 保存主题偏好（浅色、深色或自动主题）。该设置保存在你的浏览器中，不代表本站建立了用户账户。你可通过浏览器设置清除网站数据。'],
['5. 第三方内容','本站会从 blog.liseezn.top 的 WordPress REST API 获取并展示最新文章，并提供指向其他独立站点及第三方服务的链接。访问这些站点后，相关信息处理由对应服务提供者负责，本站不控制其隐私做法。'],
['6. 信息用途与共享','相关技术信息用于提供和维护网站、了解访问情况及排查运行问题。本站不会通过主页表单主动收集身份证件、支付信息或账号密码。托管、网络及统计服务提供者可能依据其自身条款处理服务运行所需的数据。'],
['7. 安全与保存','我们会根据个人网站的实际运营能力采取合理措施保护相关信息。不同基础设施的日志和统计数据保存期限可能不同；由于未核实所有服务端配置，本政策不承诺固定保存期限。'],
['8. 政策更新','当网站功能、统计配置或适用要求发生变化时，本政策可能更新。更新版本会发布在本页面并注明日期。'],
['9. 联系方式','如对本政策或本站信息处理有疑问，可通过 mail@liseezn.top 联系。']];
export default function PrivacyPage(){return <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 py-12 md:px-10"><article className="mx-auto max-w-3xl"><Link href="/" className="text-sm text-[var(--text-secondary)] hover:underline">← 返回 liseezn 首页</Link><header className="mt-10 mb-10 border-b border-[var(--border)] pb-8"><p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">Legal / Privacy</p><h1 className="mt-3 text-4xl font-light tracking-tight">隐私政策</h1><p className="mt-4 text-sm text-[var(--text-secondary)]">适用网站：liseezn.top · 最近更新：2026 年 11 月 21 日</p></header><p className="mb-8 leading-8 text-[var(--text-secondary)]">我们重视访问者的隐私。本页面说明个人主页在提供页面、访问统计和外部内容链接时可能涉及的信息及其用途。</p><div className="space-y-8">{sections.map(([title,body])=><section key={title}><h2 className="mb-3 text-xl font-medium">{title}</h2><p className="leading-8 text-[var(--text-secondary)]">{body}</p></section>)}</div><footer className="mt-12 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-secondary)]"><Link href="/terms" className="hover:underline">服务条款</Link><span className="mx-3">·</span><Link href="/" className="hover:underline">返回首页</Link></footer></article></main>}