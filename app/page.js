'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEggModal, setShowEggModal] = useState(false);
  const [rocket, setRocket] = useState(false);
  const [konami, setKonami] = useState('');
  const [secretInput, setSecretInput] = useState('');
  const [showSecretBtn, setShowSecretBtn] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const [typing] = useState('你发现了一个小彩蛋~');

  const bgmRef = useRef(null);
  const [isMusicPlay, setIsMusicPlay] = useState(false);
  const contextRef = useRef(null);
  const [contextPos, setContextPos] = useState({ x: 0, y: 0 });

  // WordPress 文章相关状态
  const [wpPosts, setWpPosts] = useState([]);
  const [wpLoading, setWpLoading] = useState(true);
  const [wpError, setWpError] = useState(false);

  // 粒子效果
  const addParticle = (x, y) => {
    if (typeof document === 'undefined') return;
    const emojis = ['✨', '💖', '🌟', '🔥', '🚀', '😎'];
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  };

  const createBurst = (x, y) => {
    for (let i = 0; i < 20; i++) {
      addParticle(x + (Math.random() - 0.5) * 100, y + (Math.random() - 0.5) * 100);
    }
  };

  // 鼠标移动粒子
  useEffect(() => {
    const move = (e) => {
      if (Math.random() > 0.92) addParticle(e.clientX, e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // 点击空白粒子
  useEffect(() => {
    const click = (e) => {
      const target = e.target;
      if (!target.closest('a') && !target.closest('button') && !target.closest('input')) {
        addParticle(e.clientX, e.clientY);
      }
    };
    window.addEventListener('click', click);
    return () => window.removeEventListener('click', click);
  }, []);

  // Konami
  useEffect(() => {
    const keyDown = (e) => {
      setKonami(prev => (prev + e.key).slice(-10));
    };
    window.addEventListener('keydown', keyDown);
    return () => window.removeEventListener('keydown', keyDown);
  }, []);
  useEffect(() => {
    if (konami === 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba') {
      alert('🎉 Konami 彩蛋触发！');
      setKonami('');
    }
  }, [konami]);

  // 滚动火箭
  useEffect(() => {
    const scroll = () => {
      if (window.scrollY + window.innerHeight > document.body.scrollHeight - 100) setRocket(true);
    };
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  }, []);

  // 加载动画
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // 秘密按钮
  const handleSecretHover = () => {
    setHoverCount(c => c + 1);
    if (hoverCount + 1 >= 5) setShowSecretBtn(true);
  };

  // 音乐控制
  const toggleMusic = () => {
    if (!bgmRef.current) return;
    if (isMusicPlay) {
      bgmRef.current.pause();
    } else {
      bgmRef.current.play();
    }
    setIsMusicPlay(!isMusicPlay);
  };

  // 右键菜单
  useEffect(() => {
    const handleContext = (e) => {
      e.preventDefault();
      setContextPos({ x: e.clientX, y: e.clientY });
      if (contextRef.current) {
        contextRef.current.classList.remove('hidden');
      }
    };
    const close = () => {
      if (contextRef.current) {
        contextRef.current.classList.add('hidden');
      }
    };
    window.addEventListener('contextmenu', handleContext);
    window.addEventListener('click', close);
    window.addEventListener('scroll', close);
    return () => {
      window.removeEventListener('contextmenu', handleContext);
      window.removeEventListener('click', close);
      window.removeEventListener('scroll', close);
    };
  }, []);

  // 凌晨提示
  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 0 && h < 6) {
      const tip = document.createElement('div');
      tip.className = 'sleep-tip';
      tip.innerText = '🌙 凌晨啦，快去睡觉';
      document.body.prepend(tip);
    }
  }, []);

  // 获取 WordPress 文章
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://blog.liseezn.top/wp-json/wp/v2/posts?per_page=6&_embed');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setWpPosts(data);
      } catch (err) {
        setWpError(true);
      } finally {
        setWpLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // 格式化日期
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // 截取摘要
  const trimExcerpt = (html, len = 80) => {
    const text = html.replace(/<[^>]+>/g, '');
    return text.length > len ? text.slice(0, len) + '...' : text;
  };

  return (
    <main className={`min-h-screen ${dark ? 'dark bg-slate-900 text-white' : 'bg-gray-50 text-dark'}`}>
      <audio ref={bgmRef} loop>
        <source src="https://cdn.freesound.org/previews/640/640251_1299461-lq.mp3" type="audio/mpeg" />
      </audio>

      {/* 右键菜单 */}
      <div ref={contextRef} className="custom-context-menu hidden"
        style={{ left: contextPos.x + 'px', top: contextPos.y + 'px' }}>
        <div className="px-3 py-2 hover:bg-primary/10 cursor-pointer" onClick={toggleMusic}>
          {isMusicPlay ? '⏸ 暂停音乐' : '🎵 播放音乐'}
        </div>
        <div className="px-3 py-2 hover:bg-primary/10 cursor-pointer" onClick={() => createBurst(window.innerWidth/2, window.innerHeight/2)}>
          💥 碎屏特效
        </div>
        <div className="px-3 py-2 hover:bg-primary/10 cursor-pointer" onClick={() => setDark(!dark)}>
          🌙 暗黑模式
        </div>
      </div>

      {/* 加载动画 */}
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 bg-black text-white flex items-center justify-center text-xl">
            🚀 加载中...
          </motion.div>
        )}
      </AnimatePresence>

      {/* 导航栏 */}
      <nav className="fixed top-0 w-full flex justify-between items-center p-5 backdrop-blur z-40">
        <motion.div whileHover={{ scale:1.1 }} className="text-xl font-bold text-primary cursor-pointer"
          onClick={() => setShowEggModal(true)}>
          liseezn.top
        </motion.div>
        <button onClick={() => setDark(!dark)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
          {dark ? '☀️' : '🌙'}
        </button>
      </nav>

      <div className="pt-28 px-4 max-w-6xl mx-auto pb-40">
        {/* Hero */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">liseezn.top 主页</h1>
          <p className="text-gray-600 dark:text-gray-300">{typing}</p>

          <div className="mt-6 max-w-sm mx-auto">
            <input value={secretInput} onChange={(e) => setSecretInput(e.target.value)}
              placeholder="输入 secret 触发彩蛋"
              className="w-full p-3 rounded border dark:bg-slate-800 dark:border-gray-700" />
            {secretInput === 'secret' && (
              <p className="mt-2 text-primary font-bold">🔒 隐藏彩蛋已解锁</p>
            )}
          </div>
        </motion.div>

        {/* ========== 个人站点 ========== */}
        <Section title="个人站点" icon="👤">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name:'主页', url:'https://www.liseezn.top', icon:'🌐' },
              { name:'博客', url:'https://blog.liseezn.top', icon:'📝' },
              { name:'导航', url:'https://web.liseezn.top', icon:'🧭' },
              { name:'网盘', url:'https://pan.liseezn.top', icon:'☁️' },
            ].map((item,i)=>(
              <NavCard key={i} {...item} />
            ))}
          </div>
        </Section>

        {/* ========== 我的世界服务器 ========== */}
        <Section title="我的世界服务器" icon="🎮">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name:'服务器官网', url:'https://mc.liseezn.top', icon:'🏠' },
              { name:'论坛', url:'https://bbs.mc.liseezn.top', icon:'💬' },
              { name:'在线地图', url:'https://map.mc.liseezn.top', icon:'🗺️' },
              { name:'服务器面板', url:'https://panel.mc.liseezn.top', icon:'📊' },
            ].map((item,i)=>(
              <NavCard key={i} {...item} />
            ))}
          </div>
        </Section>

        {/* ========== 实用工具集 ========== */}
        <Section title="实用工具集" icon="🔧">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name:'HTTPS证书管理', url:'https://certd.liseezn.top', icon:'🛡️' },
              { name:'IT工具集', url:'https://litool.liseezn.top', icon:'🛠️' },
              { name:'地图工具', url:'https://seemap.liseezn.top', icon:'📍' },
              { name:'网站检测', url:'https://uptime.liseezn.top', icon:'📈' },
              { name:'图片视频工具', url:'https://vert.liseezn.top', icon:'🖼️' },
              { name:'运动工具', url:'https://sport.liseezn.top', icon:'🏃' },
            ].map((item,i)=>(
              <NavCard key={i} {...item} />
            ))}
          </div>
        </Section>

        {/* ========== 资源分享 ========== */}
        <Section title="资源分享" icon="📦">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name:'英语资源', url:'https://seeen.liseezn.top', icon:'🇬🇧' },
              { name:'游戏资源', url:'https://game.liseezn.top', icon:'🎲' },
            ].map((item,i)=>(
              <NavCard key={i} {...item} />
            ))}
          </div>
        </Section>

        {/* ========== 最新博客文章 ========== */}
        <Section title="最新博客文章" icon="📰">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 md:p-6">
            {wpLoading && (
              <div className="text-center py-8 text-gray-500">
                <div className="animate-spin text-2xl mb-2">⏳</div>
                <p>正在加载最新文章...</p>
              </div>
            )}
            {wpError && (
              <div className="text-center py-8 text-red-500">
                <div className="text-2xl mb-2">⚠️</div>
                <p>文章加载失败，请稍后再试</p>
              </div>
            )}
            {!wpLoading && !wpError && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {wpPosts.map((post) => (
                  <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer"
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 card-hover block">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title.rendered}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3"
                       dangerouslySetInnerHTML={{ __html: trimExcerpt(post.excerpt.rendered) }} />
                    <div className="text-xs text-gray-400 flex items-center justify-between">
                      <span>📅 {formatDate(post.date)}</span>
                      <span>阅读全文 →</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* ========== 联系与社交 ========== */}
        <Section title="联系与社交" icon="🌐">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 flex flex-wrap justify-center gap-6">
            <SocialLink href="https://github.com/liseezn" icon="🐙" label="GitHub" />
            <SocialLink href="https://space.bilibili.com/586867478" icon="📺" label="B站" />
            <SocialLink href="mailto:your-email@example.com" icon="📧" label="邮箱" />
          </div>
        </Section>

        {/* 秘密按钮触发区 */}
        <div onMouseEnter={handleSecretHover} className="w-1 h-1 mx-auto" />
        <AnimatePresence>
          {showSecretBtn && (
            <motion.button initial={{ scale:0 }} animate={{ scale:1 }}
              className="mx-auto px-6 py-3 bg-primary text-white rounded-lg"
              onClick={() => alert('🥚 终极彩蛋！')}>
              超级彩蛋
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 火箭 */}
      <AnimatePresence>
        {rocket && (
          <motion.div initial={{ x:0 }} animate={{ x:1000 }} transition={{ duration:2 }}
            className="fixed bottom-10 right-10 text-5xl">
            🚀
          </motion.div>
        )}
      </AnimatePresence>

      {/* 弹窗 */}
      <AnimatePresence>
        {showEggModal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
            onClick={() => setShowEggModal(false)}>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl max-w-sm text-center">
              <h2 className="text-xl font-bold mb-2">🥚 彩蛋</h2>
              <p className="mb-4">欢迎来到 liseezn 主页</p>
              <button onClick={() => setShowEggModal(false)}
                className="px-4 py-2 bg-primary text-white rounded">
                关闭
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 页脚 */}
      <footer className="bg-dark text-white py-6 text-center">
        <p>© 2024-2026 liseezn.top</p>
        <div className="mt-2 text-sm space-x-4">
          <a href="https://icp.gov.moe/?keyword=20258868" target="_blank">萌ICP备20258868</a>
          <a href="https://icp.gov.moe/?keyword=20266626" target="_blank">萌ICP备20266626</a>
        </div>
      </footer>
    </main>
  );
}

// 辅助组件：板块标题
function Section({ title, icon, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      {children}
    </section>
  );
}

// 辅助组件：导航卡片
function NavCard({ name, url, icon }) {
  return (
    <motion.a href={url} target="_blank" rel="noopener noreferrer"
      whileHover={{ scale:1.02 }}
      className="bg-white dark:bg-slate-800 p-4 rounded-lg nav-item flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{url.replace('https://', '')}</div>
      </div>
    </motion.a>
  );
}

// 辅助组件：社交链接
function SocialLink({ href, icon, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 text-primary card-hover p-3 rounded-lg">
      <span className="text-3xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </a>
  );
}
