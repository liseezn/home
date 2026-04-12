'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [secretInput, setSecretInput] = useState('');
  const [rocket, setRocket] = useState(false);
  const [wpPosts, setWpPosts] = useState([]);
  const [wpLoading, setWpLoading] = useState(true);

  // 滚动火箭
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.scrollY + window.innerHeight > document.body.scrollHeight - 100;
      setRocket(nearBottom);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // WordPress 文章
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://blog.liseezn.top/wp-json/wp/v2/posts?per_page=3&_embed');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setWpPosts(data);
      } catch (err) {
        console.error('博客加载失败');
      } finally {
        setWpLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* 左侧边栏 */}
      <aside className="sidebar w-full md:w-72 md:min-h-screen p-6 md:sticky md:top-0 flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl font-light tracking-tight">liseezn</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">个人导航 & 博客聚合</p>
        </div>

        {/* 秘密输入框 */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="输入 secret"
            value={secretInput}
            onChange={(e) => setSecretInput(e.target.value)}
            className="w-full"
          />
          {secretInput === 'secret' && (
            <p className="text-xs text-gray-500 mt-2 ml-2">✨ 隐藏彩蛋已解锁</p>
          )}
        </div>

        {/* 快捷导航 */}
        <nav className="space-y-1">
          <NavSection title="个人站点">
            <NavItem href="https://www.liseezn.top">主页</NavItem>
            <NavItem href="https://blog.liseezn.top">博客</NavItem>
            <NavItem href="https://web.liseezn.top">导航</NavItem>
            <NavItem href="https://pan.liseezn.top">网盘</NavItem>
          </NavSection>

          <NavSection title="Minecraft">
            <NavItem href="https://mc.liseezn.top">官网</NavItem>
            <NavItem href="https://bbs.mc.liseezn.top">论坛</NavItem>
            <NavItem href="https://map.mc.liseezn.top">地图</NavItem>
            <NavItem href="https://panel.mc.liseezn.top">面板</NavItem>
          </NavSection>

          <NavSection title="工具">
            <NavItem href="https://certd.liseezn.top">证书</NavItem>
            <NavItem href="https://litool.liseezn.top">IT工具</NavItem>
            <NavItem href="https://seemap.liseezn.top">地图</NavItem>
            <NavItem href="https://uptime.liseezn.top">监测</NavItem>
            <NavItem href="https://vert.liseezn.top">影音</NavItem>
            <NavItem href="https://sport.liseezn.top">运动</NavItem>
          </NavSection>

          <NavSection title="资源">
            <NavItem href="https://seeen.liseezn.top">英语</NavItem>
            <NavItem href="https://game.liseezn.top">游戏</NavItem>
          </NavSection>
        </nav>

        {/* 社交链接 */}
        <div className="mt-auto pt-8 flex gap-4 text-sm text-gray-500">
          <a href="https://github.com/liseezn" target="_blank" className="hover:text-black dark:hover:text-white">GitHub</a>
          <a href="https://space.bilibili.com/586867478" target="_blank" className="hover:text-black dark:hover:text-white">Bilibili</a>
          <a href="mailto:hi@liseezn.top" className="hover:text-black dark:hover:text-white">Email</a>
        </div>
      </aside>

      {/* 右侧内容区 */}
      <div className="flex-1 p-6 md:p-10">
        {/* 最新文章 */}
        <section className="mb-12">
          <h2 className="text-xl font-light mb-6 pb-2 border-b border-[var(--border)]">最新文章</h2>
          {wpLoading ? (
            <div className="text-gray-400 text-sm">加载中...</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {wpPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.link}
                  target="_blank"
                  className="card p-5 block"
                >
                  <h3 className="font-medium mb-2 line-clamp-2">{post.title.rendered}</h3>
                  <div
                    className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3"
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 80) + '...'
                    }}
                  />
                  <div className="text-xs text-gray-400">{formatDate(post.date)}</div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* 项目展示区（可选） */}
        <section>
          <h2 className="text-xl font-light mb-6 pb-2 border-b border-[var(--border)]">关于</h2>
          <div className="card p-6 max-w-2xl">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              这里是 liseezn 的个人主页，聚合了我的所有站点和最新动态。
              设计遵循极简黑白灰，专注于内容与链接。
            </p>
          </div>
        </section>
      </div>

      {/* 底部火箭彩蛋（保留简化版） */}
      <AnimatePresence>
        {rocket && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.4 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 1 }}
            className="rocket"
          >
            🚀
          </motion.div>
        )}
      </AnimatePresence>

      {/* 页脚（移动端可见） */}
      <footer className="md:hidden p-6 text-center text-xs text-gray-400 border-t border-[var(--border)]">
        © 2024-2026 liseezn.top
      </footer>
    </main>
  );
}

// 辅助组件
function NavSection({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">{title}</h3>
      <ul className="space-y-0.5">
        {children}
      </ul>
    </div>
  );
}

function NavItem({ href, children }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        className="block py-1.5 px-2 -ml-2 text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors rounded-md hover:bg-[var(--hover-bg)]"
      >
        {children}
      </a>
    </li>
  );
}
