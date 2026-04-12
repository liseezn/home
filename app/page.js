'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User, Hammer, Wrench, Package, Github, Video, Mail,
  Sun, Moon, ChevronRight, Clock, Terminal, HelpCircle
} from 'lucide-react';
// 导航数据
const NAV_DATA = {
  personal: {
    title: '个人站点',
    desc: '我的主要网络存在',
    items: [
      { name: '主页', url: 'https://www.liseezn.top', icon: User, desc: '个人首页' },
      { name: '博客', url: 'https://blog.liseezn.top', icon: Terminal, desc: '技术 & 生活记录' },
      { name: '导航', url: 'https://web.liseezn.top', icon: ChevronRight, desc: '常用链接聚合' },
      { name: '网盘', url: 'https://pan.liseezn.top', icon: Package, desc: '文件共享' },
    ],
  },
  minecraft: {
    title: 'Minecraft 服务器',
    desc: '我的世界相关服务',
    items: [
      { name: '官网', url: 'https://mc.liseezn.top', icon: Hammer, desc: '服务器主页' },
      { name: '论坛', url: 'https://bbs.mc.liseezn.top', icon: HelpCircle, desc: '玩家社区' },
      { name: '地图', url: 'https://map.mc.liseezn.top', icon: ChevronRight, desc: '在线地图' },
      { name: '面板', url: 'https://panel.mc.liseezn.top', icon: Terminal, desc: '管理面板' },
    ],
  },
  tools: {
    title: '实用工具',
    desc: '自托管服务集合',
    items: [
      { name: '证书', url: 'https://certd.liseezn.top', icon: Terminal, desc: 'HTTPS 证书管理' },
      { name: 'IT工具', url: 'https://litool.liseezn.top', icon: Wrench, desc: '开发常用' },
      { name: '地图', url: 'https://seemap.liseezn.top', icon: ChevronRight, desc: '位置工具' },
      { name: '监测', url: 'https://uptime.liseezn.top', icon: Clock, desc: '网站状态' },
      { name: '影音', url: 'https://vert.liseezn.top', icon: Video, desc: '图片/视频处理' },
      { name: '运动', url: 'https://sport.liseezn.top', icon: User, desc: '健身记录' },
    ],
  },
  resources: {
    title: '资源分享',
    desc: '学习与娱乐资料',
    items: [
      { name: '英语', url: 'https://seeen.liseezn.top', icon: ChevronRight, desc: '英语学习资源' },
      { name: '游戏', url: 'https://game.liseezn.top', icon: Hammer, desc: '游戏下载与模组' },
    ],
  },
};

// 技术栈配置
const TECH_STACK = [
  { category: '前端', items: ['React', 'Next.js', 'Tailwind', 'TypeScript'] },
  { category: '后端', items: ['Node.js', 'Python', 'MongoDB', 'Vercel'] },
  { category: '工具', items: ['Figma', 'VSCode', 'Git', 'Notion'] },
];

const SIGNATURES = [
  '探索我的数字花园',
  '代码与文字的交汇',
  '保持好奇，保持简单',
  '试试输入 secret',
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('blog');
  const [secretInput, setSecretInput] = useState('');
  const [rocket, setRocket] = useState(false);
  const [wpPosts, setWpPosts] = useState([]);
  const [wpLoading, setWpLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [signatureIndex, setSignatureIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [theme, setTheme] = useState('auto');
  const [loading, setLoading] = useState(true);
  const [konami, setKonami] = useState('');
  const [showSecretBtn, setShowSecretBtn] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const [gameMode, setGameMode] = useState(false);
  const [selectedNavIndex, setSelectedNavIndex] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalCmd, setTerminalCmd] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([]);

  const mainRef = useRef(null);
  const logoClickCount = useRef(0);

  // 时间更新
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 打字机签名
  useEffect(() => {
    const fullText = SIGNATURES[signatureIndex];
    let i = 0;
    setIsTyping(true);
    setTypingText('');
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypingText(fullText.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [signatureIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSignatureIndex(prev => (prev + 1) % SIGNATURES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 加载动画
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // 滚动火箭
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.scrollY + window.innerHeight > document.body.scrollHeight - 100;
      setRocket(nearBottom);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 获取文章
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://blog.liseezn.top/wp-json/wp/v2/posts?per_page=6&_embed');
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

  // 粒子
  const addParticle = useCallback((x, y, isClick = false) => {
    if (typeof document === 'undefined') return;
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    if (isClick) {
      p.style.width = '12px';
      p.style.height = '12px';
      p.style.opacity = '0.5';
    }
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (Math.random() > 0.95) addParticle(e.clientX, e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [addParticle]);

  useEffect(() => {
    const click = (e) => {
      const target = e.target;
      if (!target.closest('a') && !target.closest('button') && !target.closest('input')) {
        addParticle(e.clientX, e.clientY, true);
      }
    };
    window.addEventListener('click', click);
    return () => window.removeEventListener('click', click);
  }, [addParticle]);

  // Konami
  useEffect(() => {
    const keydown = (e) => {
      setKonami(prev => (prev + e.key).slice(-10));
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, []);
  useEffect(() => {
    if (konami === 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba') {
      alert('🎉 Konami Code Activated!');
      setKonami('');
    }
  }, [konami]);

  // 右键菜单
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setContextMenu({ show: true, x: e.clientX, y: e.clientY });
    };
    const closer = () => setContextMenu({ show: false, x: 0, y: 0 });
    window.addEventListener('contextmenu', handler);
    window.addEventListener('click', closer);
    return () => {
      window.removeEventListener('contextmenu', handler);
      window.removeEventListener('click', closer);
    };
  }, []);

  // 键盘导航
  useEffect(() => {
    const keydown = (e) => {
      if (e.key === 'g' || e.key === 'G') {
        setGameMode(prev => !prev);
        if (!gameMode) setTerminalOutput(['🎮 游戏模式启动！', '使用 J/K 导航，Enter 打开']);
      }
      if (gameMode) {
        const categories = ['blog', 'personal', 'minecraft', 'tools', 'resources'];
        if (e.key === 'j' || e.key === 'ArrowDown') {
          setSelectedNavIndex(prev => (prev + 1) % categories.length);
        } else if (e.key === 'k' || e.key === 'ArrowUp') {
          setSelectedNavIndex(prev => (prev - 1 + categories.length) % categories.length);
        } else if (e.key === 'Enter') {
          setActiveCategory(categories[selectedNavIndex]);
        } else if (e.key === 'Escape') {
          setGameMode(false);
        }
      }
      if (e.key === 't' || e.key === 'T') {
        setTerminalOpen(prev => !prev);
      }
      if (e.key === 's' || e.key === 'S') {
        if (activeCategory === 'blog' && wpPosts.length) {
          setWpPosts([...wpPosts].sort((a, b) => a.title.rendered.localeCompare(b.title.rendered)));
        }
      }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [gameMode, selectedNavIndex, activeCategory, wpPosts]);

  // 秘密按钮
  const handleSecretAreaHover = () => {
    setHoverCount(c => c + 1);
    if (hoverCount + 1 >= 5) setShowSecretBtn(true);
  };

  // 双击返回顶部
  useEffect(() => {
    const dblclick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setRocket(true);
      setTimeout(() => setRocket(false), 2000);
    };
    window.addEventListener('dblclick', dblclick);
    return () => window.removeEventListener('dblclick', dblclick);
  }, []);

  // 打印彩蛋
  useEffect(() => {
    const beforePrint = () => {
      const style = document.createElement('style');
      style.innerHTML = `body:after { content: '❤️ liseezn.top · 保持好奇'; position: fixed; bottom: 20px; right: 20px; font-size: 12px; }`;
      document.head.appendChild(style);
    };
    window.addEventListener('beforeprint', beforePrint);
    return () => window.removeEventListener('beforeprint', beforePrint);
  }, []);

  // Logo 点击彩蛋
  const handleLogoClick = () => {
    logoClickCount.current += 1;
    if (logoClickCount.current >= 5) {
      alert('🥚 彩蛋弹窗：欢迎来到 liseezn 主页');
      logoClickCount.current = 0;
    }
    setActiveCategory('blog');
  };

  // 时间格式化
  const formatTime = (date) => date.toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit' });
  const formatDate = (date) => date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  // 博客视图（含技术栈）
  const renderBlogView = () => (
    <div className="space-y-8">
      <div className="card">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--hover)] flex items-center justify-center text-2xl">🌱</div>
          <div>
            <h3 className="text-xl font-medium mb-1">liseezn 的数字花园</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              探索我的数字花园 · 不定期记录技术、生活与 Minecraft 服务器动态。
            </p>
          </div>
        </div>
      </div>

      {/* 技术栈模块 */}
      <div className="py-2">
        <div className="flex flex-wrap gap-8 justify-center">
          {TECH_STACK.map((group) => (
            <div key={group.category} className="text-center">
              <div className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-3">{group.category}</div>
              <div className="flex flex-wrap gap-3 justify-center">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] hover:underline underline-offset-4 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-light tracking-wide">最新文章</h2>
      {wpLoading ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-[var(--border)] rounded w-3/4 mb-3" />
              <div className="h-3 bg-[var(--border)] rounded w-full mb-2" />
              <div className="h-3 bg-[var(--border)] rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {wpPosts.map((post) => (
            <a key={post.id} href={post.link} target="_blank" className="card group" rel="noopener noreferrer">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg group-hover:underline decoration-1 underline-offset-4">
                  {post.title.rendered}
                </h3>
                <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap ml-2">
                  {new Date(post.date).toLocaleDateString('zh-CN', { month:'numeric', day:'numeric' })}
                </span>
              </div>
              <div
                className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3"
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 100) + '...'
                }}
              />
              <div className="flex items-center text-xs text-[var(--text-secondary)]">
                <span>阅读全文</span>
                <ChevronRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const renderCategoryView = (catKey) => {
    const data = NAV_DATA[catKey];
    if (!data) return null;
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-light tracking-wide">{data.title}</h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1">{data.desc}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a key={idx} href={item.url} target="_blank" className="card flex items-start gap-4" rel="noopener noreferrer">
                <div className="p-2 rounded-xl bg-[var(--hover)]">
                  <Icon size={22} />
                </div>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-[var(--text-secondary)] mt-0.5">{item.desc}</div>
                  <div className="text-xs text-[var(--text-secondary)] truncate mt-1">{item.url.replace('https://', '')}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  };

const RightPanel = () => (
    <div className="w-[240px] pl-6 border-l border-[var(--border)] hidden lg:block">
      <div className="sticky top-8 space-y-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">本地时间</span>
            <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="p-1 rounded hover:bg-[var(--hover)]">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
          <div className="text-4xl font-light tracking-tight">{formatTime(currentTime)}</div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">{formatDate(currentTime)}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">今日签名</div>
          <div className="text-sm leading-relaxed min-h-[3rem]">
            {typingText}
            {isTyping && <span className="typing-cursor" />}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">彩蛋入口</div>
          <input
            type="text"
            placeholder="输入 secret"
            value={secretInput}
            onChange={(e) => setSecretInput(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--text-secondary)] transition"
          />
          {secretInput === 'secret' && (
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-xs text-[var(--text-secondary)] mt-2">
              ✨ 彩蛋已解锁
            </motion.p>
          )}
          <div className="mt-4 h-2 w-full" onMouseEnter={handleSecretAreaHover} />
          {showSecretBtn && (
            <motion.button
              initial={{ scale:0 }} animate={{ scale:1 }}
              className="mt-2 text-xs underline"
              onClick={() => alert('🥚 终极彩蛋！')}
            >
              超级彩蛋
            </motion.button>
          )}
        </div>
      </div>
    </div>
);

const TerminalPanel = () => (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div initial={{ y: 100 }} animate={{ y:0 }} exit={{ y:100 }}
          className="fixed bottom-0 left-0 right-0 lg:left-20 lg:right-60 bg-[var(--card)] border-t border-[var(--border)] p-4 z-40 font-mono text-sm"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Terminal size={16} />
              <span>liseezn@home:~$</span>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {terminalOutput.map((line, i) => (
                <div key={i} className="text-[var(--text-secondary)]">{line}</div>
              ))}
            </div>
            <div className="flex items-center mt-2">
              <span className="mr-2">$</span>
              <input
                type="text"
                value={terminalCmd}
                onChange={(e) => setTerminalCmd(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (terminalCmd === 'help') {
                      setTerminalOutput([...terminalOutput, '> help', '可用命令: help, clear, about, easteregg']);
                    } else if (terminalCmd === 'clear') {
                      setTerminalOutput([]);
                    } else if (terminalCmd === 'about') {
                      setTerminalOutput([...terminalOutput, '> about', 'liseezn 个人主页 v2.0 · 内置 20 个彩蛋']);
                    } else if (terminalCmd === 'easteregg') {
                      setTerminalOutput([...terminalOutput, '> easteregg', '🥚 恭喜你发现了隐藏终端彩蛋！']);
                      addParticle(window.innerWidth/2, window.innerHeight/2);
                    } else {
                      setTerminalOutput([...terminalOutput, `> ${terminalCmd}`, '命令未找到，输入 help 查看可用命令']);
                    }
                    setTerminalCmd('');
                  }
                }}
                className="flex-1 bg-transparent border-none outline-none"
                autoFocus
              />
              <button onClick={() => setTerminalOpen(false)} className="ml-4 text-xs underline">关闭</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
);


  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}>
          <span className="text-3xl font-light">liseezn</span>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex bg-[var(--bg)] text-[var(--text)]">
      {/* 左侧边栏 */}
      <aside className="sidebar w-20 flex flex-col items-center py-6 border-r border-[var(--border)] sticky top-0 h-screen">
        <div className="mb-8 cursor-pointer" onClick={handleLogoClick}>
          <div className="w-10 h-10 rounded-xl bg-[var(--text)] text-[var(--bg)] flex items-center justify-center font-medium text-sm">L</div>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          {[
            { key: 'blog', icon: Terminal, label: '博客' },
            { key: 'personal', icon: User, label: '个人' },
            { key: 'minecraft', icon: Pickaxe, label: 'MC' },
            { key: 'tools', icon: Wrench, label: '工具' },
            { key: 'resources', icon: Package, label: '资源' },
          ].map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeCategory === item.key;
            const isGameSelected = gameMode && selectedNavIndex === idx;
            return (
              <button
                key={item.key}
                onClick={() => setActiveCategory(item.key)}
                className={`sidebar-icon ${isActive ? 'active' : ''} ${isGameSelected ? 'ring-1 ring-[var(--text)]' : ''}`}
                title={item.label}
              >
                <Icon size={22} />
              </button>
            );
          })}
        </nav>
        <div className="flex flex-col gap-3">
          <a href="https://github.com/liseezn" target="_blank" className="text-[var(--text-secondary)] hover:text-[var(--text)] transition" rel="noopener noreferrer"><Github size={20} /></a>
          <a href="https://space.bilibili.com/586867478" target="_blank" className="text-[var(--text-secondary)] hover:text-[var(--text)] transition" rel="noopener noreferrer"><Video size={20} /></a>
          <a href="mailto:hi@liseezn.top" className="text-[var(--text-secondary)] hover:text-[var(--text)] transition"><Mail size={20} /></a>
        </div>
      </aside>

      {/* 中间主区 */}
      <div className="flex-1 px-6 md:px-10 py-8 overflow-y-auto" ref={mainRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-10 }}
            transition={{ duration:0.2 }}
          >
            {activeCategory === 'blog' && renderBlogView()}
            {activeCategory === 'personal' && renderCategoryView('personal')}
            {activeCategory === 'minecraft' && renderCategoryView('minecraft')}
            {activeCategory === 'tools' && renderCategoryView('tools')}
            {activeCategory === 'resources' && renderCategoryView('resources')}
          </motion.div>
        </AnimatePresence>
        <footer className="mt-16 pt-8 border-t border-[var(--border)] text-center text-xs text-[var(--text-secondary)]">
          <p>© 2024–2026 liseezn.top · 萌ICP备20258868号 · 萌ICP备20266626号</p>
          <p className="mt-1 opacity-50">Built with curiosity · 内置 20 个交互彩蛋</p>
        </footer>
      </div>

      <RightPanel />

      {contextMenu.show && (
        <div className="context-menu" style={{ left: contextMenu.x, top: contextMenu.y }}>
          <div className="context-menu-item" onClick={() => { setTheme(t => t==='dark'?'light':'dark'); setContextMenu({show:false}); }}>
            切换主题
          </div>
          <div className="context-menu-item" onClick={() => { setTerminalOpen(true); setContextMenu({show:false}); }}>
            打开终端
          </div>
          <div className="context-menu-item" onClick={() => { navigator.clipboard?.writeText(formatTime(currentTime)); setContextMenu({show:false}); }}>
            复制当前时间
          </div>
        </div>
      )}

      <AnimatePresence>
        {rocket && (
          <motion.div
            initial={{ x: 100, opacity:0 }}
            animate={{ x:0, opacity:0.3 }}
            exit={{ x:-100, opacity:0 }}
            transition={{ type:'spring', damping:15 }}
            className="rocket"
          >
            🚀
          </motion.div>
        )}
      </AnimatePresence>

      <TerminalPanel />

      <AnimatePresence>
        {gameMode && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed bottom-4 left-24 bg-[var(--card)] border border-[var(--border)] px-4 py-2 rounded-full text-xs flex items-center gap-2 z-50"
          >
            <span>🎮 游戏模式 · J/K 导航</span>
            <button onClick={() => setGameMode(false)} className="ml-2 underline">退出</button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
