import Link from 'next/link';
export const metadata={title:'服务条款 · liseezn',description:'liseezn.top 个人主页访问与使用条款'};
const sections=[
['1. 条款适用','访问或使用 liseezn.top，即表示你已阅读并理解本条款。若不同意，请停止使用本站。本站是个人展示与导航主页，并非承诺持续可用性的商业平台。'],
['2. 网站内容与服务','本站提供个人介绍、文章摘要、站点导航、技术信息及其他展示内容。部分内容来自独立运行的博客或第三方服务。本站可因维护、调整或外部服务变化而修改、暂停或移除部分功能。'],
['3. 合理使用','你不得利用本站从事违法活动，不得尝试未经授权访问、干扰或破坏本站及其关联基础设施，不得利用本站传播恶意代码、侵害他人权利或违反适用法律法规。'],
['4. 第三方链接','本站可能链接至博客、Minecraft 相关服务、工具、资源或其他第三方网站。链接仅为访问便利，不代表本站对第三方内容、产品、安全性或持续可用性作出保证。你应自行阅读第三方服务的条款与隐私政策。'],
['5. 知识产权','除另有说明外，本站原创文字、页面设计及相关内容的权利归相应权利人所有。第三方名称、商标、软件及内容归其各自权利人所有。未经权利人许可，不得擅自复制、传播或用于商业用途。'],
['6. 免责声明','本站按现状提供。我们会尽力维护内容准确性与服务稳定性，但不保证信息始终完整、准确、最新，也不保证网站或外部链接不间断、无错误或始终安全。在法律允许范围内，对于使用本站或第三方服务产生的损失，本站不承担超出适用法律规定范围的责任。'],
['7. 条款变更','本站可能根据功能或法律要求更新本条款。更新内容发布于本页面并注明日期；更新后继续使用本站，即表示你接受更新后的条款。'],
['8. 联系方式','如对本条款有疑问，请通过 mail@liseezn.top 联系。']];
export default function TermsPage(){return <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 py-12 md:px-10"><article className="mx-auto max-w-3xl"><Link href="/" className="text-sm text-[var(--text-secondary)] hover:underline">← 返回 liseezn 首页</Link><header className="mt-10 mb-10 border-b border-[var(--border)] pb-8"><p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">Legal / Terms</p><h1 className="mt-3 text-4xl font-light tracking-tight">服务条款</h1><p className="mt-4 text-sm text-[var(--text-secondary)]">适用网站：liseezn.top · 最近更新：2026 年 11 月 21 日</p></header><p className="mb-8 leading-8 text-[var(--text-secondary)]">本条款适用于你对 liseezn.top 个人主页的访问和使用。请在使用前阅读以下内容。</p><div className="space-y-8">{sections.map(([title,body])=><section key={title}><h2 className="mb-3 text-xl font-medium">{title}</h2><p className="leading-8 text-[var(--text-secondary)]">{body}</p></section>)}</div><footer className="mt-12 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-secondary)]"><Link href="/privacy" className="hover:underline">隐私政策</Link><span className="mx-3">·</span><Link href="/" className="hover:underline">返回首页</Link></footer></article></main>}