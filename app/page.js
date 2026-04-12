'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showEggModal, setShowEggModal] = useState(false);
  const [rocket, setRocket] = useState(false);
  const [konami, setKonami] = useState('');
  const [secretInput, setSecretInput] = useState('');
  const [showSecretBtn, setShowSecretBtn] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [onlineCount] = useState(42);
  const [isOnline] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [isGameMode, setIsGameMode] = useState(false);
  const [nikoMessage, setNikoMessage] = useState({ show: false, text: '' });

  const bgmRef = useRef(null);
  const [isMusicPlay, setIsMusicPlay] = useState(false);
  const contextRef = useRef(null);
  const [contextPos, setContextPos] = useState({ x: 0, y: 0 });
  const glowRef = useRef(null);
  const navItemsRef = useRef([]);

  // WordPress 文章相关状态
  const [wpPosts, setWpPosts] = useState([]);
  const [wpLoading, setWpLoading] = useState(true);
  const [wpError, setWpError] = useState(false);

  // 音效初始化
  const hoverSound = useRef(new Howl({ src: ['https://assets.codepen.io/21542/hover.mp3'], volume: 0.2 }));
  const selectSound = useRef(new Howl({ src: ['https://assets.codepen.io/21542/select.mp3'], volume: 0.3 }));
  const clickSound = useRef(new Howl({ src: ['https://assets.codepen.io/21542/click.mp3'], volume: 0.25 }));

  // 粒子效果
  const addParticle = (x, y) => {
    if (typeof document === 'undefined') return;
    const emojis = ['✨', '💖', '🌟', '🔥', '🚀', '😎', '💫', '⚡', '🌈'];
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.color = `hsl(${Math.random() * 60 + 180}, 80%, 60%)`;
    p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  };

  // 碎屏特效
  const createBurst = (x, y) => {
    for (let i = 0; i < 24; i++) {
      addParticle(x + (Math.random() - 0.5) * 150, y + (Math.random() - 0.5) * 150);
    }
  };

  // 鼠标光影跟随
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
        glowRef.current.style.opacity = '0.6';
      }
      if (Math.random() > 0.92) addParticle(e.clientX, e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 点击粒子
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

  // 火箭
  useEffect(() => {
    const scroll = () => {
      if (window.scrollY + window.innerHeight > document.body.scrollHeight - 100) setRocket(true);
    };
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  }, []);

  // 加载
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // 秘密按钮
  const handleSecretHover = () => {
    setHoverCount(c => c + 1);
    if (hoverCount + 1 >= 5) setShowSecretBtn(true);
  };

  // 音乐
  const toggleMusic = () => {
    if (!bgmRef.current) return;
    isMusicPlay ? bgmRef.current.pause() : bgmRef.current.play();
    setIsMusicPlay(!isMusicPlay);
  };

  // 右键菜单
  useEffect(() => {
    const handleContext = (e) => {
      e.preventDefault();
      setContextPos({ x: e.clientX, y: e.clientY });
      contextRef.current?.classList.remove('hidden');
    };
    const close = () => contextRef.current?.classList.add('hidden');
    window.addEventListener('contextmenu', handleContext);
    window.addEventListener('click', close);
    return () => {
      window.removeEventListener('contextmenu', handleContext);
      window.removeEventListener('click', close);
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

  // 获取文章
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://blog.liseezn.top/wp-json/wp/v2/posts?per_page=6&_embed');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setWpPosts(data);
      } catch {
        setWpError(true);
      } finally {
        setWpLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // 🎮 键盘导航
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isGameMode) return;
      
      const items = navItemsRef.current.filter(item => item);
      if (items.length === 0) return;

      switch(e.key) {
        case 'j':
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIdx(prev => (prev + 1) % items.length);
          hoverSound.current.play();
          if (navigator.vibrate) navigator.vibrate(10);
          break;
        case 'k':
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIdx(prev => (prev - 1 + items.length) % items.length);
          hoverSound.current.play();
          if (navigator.vibrate) navigator.vibrate(10);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIdx >= 0 && items[selectedIdx]) {
            selectSound.current.play();
            if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
            items[selectedIdx].click();
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsGameMode(false);
          setSelectedIdx(-1);
          clickSound.current.play();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameMode, selectedIdx]);

  // 激活游戏模式
  const activateGameMode = useCallback(() => {
    setIsGameMode(true);
    setSelectedIdx(0);
    clickSound.current.play();
    if (navigator.vibrate) navigator.vibrate(50);
    setNikoMessage({ show: true, text: '🎮 游戏模式已启动！用 J/K 选择，Enter 打开' });
    setTimeout(() => setNikoMessage({ show: false, text: '' }), 3000);
  }, []);

  // 点击Niko
  const handleNikoClick = () => {
    const messages = [
      '✨ 今天也要开心哦！',
      '🎮 按 G 键可以启动游戏模式～',
      '🌟 你找到彩蛋了吗？',
      '💫 Niko 永远陪着你！',
      '🕹️ 试试键盘导航吧！'
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setNikoMessage({ show: true, text: randomMsg });
    clickSound.current.play();
    setTimeout(() => setNikoMessage({ show: false, text: '' }), 2500);
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('zh-CN');
  const trimExcerpt = (html, len = 70) => {
    const text = html.replace(/<[^>]+>/g, '');
    return text.length > len ? text.slice(0, len) + '...' : text;
  };

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden pixel-font">
      <div ref={glowRef} className="glow-spot" style={{ left: mousePos.x, top: mousePos.y }} />

      <audio ref={bgmRef} loop>
        <source src="https://cdn.freesound.org/previews/640/640251_1299461-lq.mp3" type="audio/mpeg" />
      </audio>

      {/* 右键菜单 */}
      <div ref={contextRef} className="custom-context-menu hidden" style={{ left: contextPos.x, top: contextPos.y }}>
        <div onClick={toggleMusic}>{isMusicPlay ? '⏸ 暂停音乐' : '🎵 播放音乐'}</div>
        <div onClick={() => createBurst(window.innerWidth/2, window.innerHeight/2)}>💥 碎屏特效</div>
      </div>

      {/* 加载动画 */}
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity:1 }} exit={{ opacity:0 }}
            className="loading-screen fixed inset-0 z-50 flex items-center justify-center text-2xl font-bold">
            <motion.span animate={{ scale:[1,1.2,1], opacity:[1,0.6,1] }} transition={{ repeat:Infinity, duration:1.5 }}>
              🚀 加载中...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 导航栏 */}
      <nav className="fixed top-0 w-full flex justify-between items-center p-5 z-40 backdrop-blur-md bg-black/20 border-b-2 border-[#2a1f4c]">
        <motion.div whileHover={{ scale:1.05 }} className="text-2xl font-bold cursor-pointer pixel-corners" onClick={() => setShowEggModal(true)}>
          <span className="neon-text">liseezn.top</span>
        </motion.div>
        
        {/* 实时状态 */}
        <div className="flex items-center gap-3 px-4 py-2 bg-black/40 pixel-border">
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
          <span className="text-sm">{onlineCount} 人在线</span>
          <button 
            onClick={activateGameMode}
            className="ml-2 px-3 py-1 text-xs bg-purple-800/60 pixel-border hover:bg-purple-700/80 transition-colors"
          >
            🎮 G键启动游戏模式
          </button>
        </div>
      </nav>

      <div className="pt-28 px-4 max-w-6xl mx-auto pb-40 relative z-10">
        {/* Hero */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text pixel-text-shadow">探索我的数字宇宙</h1>
          <p className="text-white/70 text-lg">你发现了一个小彩蛋~</p>

          <div className="mt-8 max-w-sm mx-auto">
            <input value={secretInput} onChange={(e) => setSecretInput(e.target.value)}
              placeholder="输入 secret 触发彩蛋"
              className="w-full p-4 pixel-border bg-black/40 text-white placeholder-white/40 text-center" />
            {secretInput === 'secret' && (
              <p className="mt-3 text-[#00f2fe] font-bold animate-pulse">🔒 隐藏彩蛋已解锁</p>
            )}
          </div>
        </motion.div>

        {/* 板块渲染 */}
        <Section title="个人站点" icon="🌐">
          <NavGrid items={[
            { name:'主页', url:'https://www.liseezn.top', icon:'🏠' },
            { name:'博客', url:'https://blog.liseezn.top', icon:'✍️' },
            { name:'导航', url:'https://web.liseezn.top', icon:'🧭' },
            { name:'网盘', url:'https://pan.liseezn.top', icon:'☁️' },
          ]} ref={navItemsRef} selectedIdx={selectedIdx} isGameMode={isGameMode} startIdx={0} />
        </Section>

        <Section title="我的世界服务器" icon="⛏️">
          <NavGrid items={[
            { name:'官网', url:'https://mc.liseezn.top', icon:'🏰' },
            { name:'论坛', url:'https://bbs.mc.liseezn.top', icon:'💬' },
            { name:'地图', url:'https://map.mc.liseezn.top', icon:'🗺️' },
            { name:'面板', url:'https://panel.mc.liseezn.top', icon:'📊' },
          ]} ref={navItemsRef} selectedIdx={selectedIdx} isGameMode={isGameMode} startIdx={4} />
        </Section>

        <Section title="实用工具集" icon="🛠️">
          <NavGrid items={[
            { name:'证书管理', url:'https://certd.liseezn.top', icon:'🔐' },
            { name:'IT工具', url:'https://litool.liseezn.top', icon:'💻' },
            { name:'地图工具', url:'https://seemap.liseezn.top', icon:'🌍' },
            { name:'网站监测', url:'https://uptime.liseezn.top', icon:'📈' },
            { name:'图片视频', url:'https://vert.liseezn.top', icon:'🎬' },
            { name:'运动工具', url:'https://sport.liseezn.top', icon:'🏋️' },
          ]} ref={navItemsRef} selectedIdx={selectedIdx} isGameMode={isGameMode} startIdx={8} />
        </Section>

        <Section title="资源分享" icon="📚">
          <NavGrid items={[
            { name:'英语资源', url:'https://seeen.liseezn.top', icon:'🇬🇧' },
            { name:'游戏资源', url:'https://game.liseezn.top', icon:'🎮' },
          ]} ref={navItemsRef} selectedIdx={selectedIdx} isGameMode={isGameMode} startIdx={14} />
        </Section>

        {/* 博客文章 */}
        <Section title="最新博文" icon="📝">
          <div className="glass-card p-6">
            {wpLoading && <div className="text-center py-8 text-white/50">加载中...</div>}
            {wpError && <div className="text-center py-8 text-red-400">加载失败</div>}
            {!wpLoading && !wpError && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wpPosts.map((post, idx) => (
                  <a key={post.id} href={post.link} target="_blank" 
                    className="nav-card block !p-4"
                    data-nav-index={16 + idx}
                    ref={el => { if (el) navItemsRef.current[16 + idx] = el; }}>
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{post.title.rendered}</h3>
                    <p className="text-white/60 text-sm mb-3 line-clamp-3" dangerouslySetInnerHTML={{ __html: trimExcerpt(post.excerpt.rendered) }} />
                    <div className="text-xs text-[#00f2fe]">{formatDate(post.date)}</div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* 社交 */}
        <Section title="社交链接" icon="🔗">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { href:'https://github.com/liseezn', icon:'🐙', label:'GitHub' },
              { href:'https://space.bilibili.com/586867478', icon:'📺', label:'Bilibili' },
              { href:'mailto:hi@liseezn.top', icon:'📧', label:'Email' },
            ].map((s,i)=>(
              <a key={i} href={s.href} target="_blank" 
                className="flex flex-col items-center gap-2 p-4 pixel-border glass-card hover:!bg-white/10"
                data-nav-index={22 + i}
                ref={el => { if (el) navItemsRef.current[22 + i] = el; }}>
                <span className="text-3xl">{s.icon}</span>
                <span className="text-sm text-white/80">{s.label}</span>
              </a>
            ))}
          </div>
        </Section>

        {/* 秘密按钮 */}
        <div onMouseEnter={handleSecretHover} className="w-1 h-1 mx-auto mt-8" />
        <AnimatePresence>
          {showSecretBtn && (
            <motion.button initial={{ scale:0 }} animate={{ scale:1 }} className="btn-primary mx-auto block mt-4"
              onClick={() => alert('🥚 终极彩蛋！')}>✨ 超级彩蛋 ✨</motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 火箭 */}
      <AnimatePresence>
        {rocket && (
          <motion.div initial={{ x:-100, opacity:0 }} animate={{ x:0, opacity:1 }} exit={{ x:1000, opacity:0 }}
            transition={{ duration:2 }} className="fixed bottom-10 right-10 text-6xl z-50">🚀</motion.div>
        )}
      </AnimatePresence>

      {/* 弹窗 */}
      <AnimatePresence>
        {showEggModal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setShowEggModal(false)}>
            <div className="glass-card p-8 max-w-sm text-center pixel-border" onClick={e=>e.stopPropagation()}>
              <h2 className="text-2xl font-bold mb-3 neon-text">🥚 彩蛋</h2>
              <p className="mb-6 text-white/80">欢迎来到 liseezn 主页</p>
              <button onClick={() => setShowEggModal(false)} className="btn-primary">关闭</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Niko 宠物 */}
      <div className="fixed bottom-20 left-6 z-50">
        <AnimatePresence>
          {nikoMessage.show && (
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:10 }}
              className="absolute bottom-full mb-2 left-0 bg-black/80 pixel-border p-3 text-sm whitespace-nowrap">
              {nikoMessage.text}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div 
          whileHover={{ scale:1.1 }}
          whileTap={{ scale:0.95 }}
          className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 pixel-border cursor-pointer flex items-center justify-center text-3xl shadow-lg"
          onClick={handleNikoClick}
        >
          🐱
        </motion.div>
        <div className="text-xs text-center mt-1 text-white/60">Niko</div>
      </div>

      <footer className="py-8 text-center text-white/40 text-sm border-t-2 border-[#2a1f4c]">
        <p>© 2024-2026 liseezn.top</p>
        <div className="mt-2 space-x-4">
          <a href="https://icp.gov.moe/?keyword=20258868" target="_blank">萌ICP备20258868</a>
          <a href="https://icp.gov.moe/?keyword=20266626" target="_blank">萌ICP备20266626</a>
        </div>
      </footer>
    </main>
  );
}

// 辅助组件
function Section({ title, icon, children }) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 pixel-text-shadow">
        <span className="text-3xl">{icon}</span>
        <span className="bg-gradient-to-r from-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent">{title}</span>
      </h2>
      {children}
    </section>
  );
}

function NavGrid({ items, ref, selectedIdx, isGameMode, startIdx }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((item, i) => {
        const globalIdx = startIdx + i;
        const isSelected = isGameMode && selectedIdx === globalIdx;
        return (
          <motion.a key={i} href={item.url} target="_blank" whileHover={{ y:-3 }}
            className={`nav-card pixel-border transition-all ${isSelected ? '!border-[#00f2fe] !bg-purple-900/60 scale-105' : ''}`}
            data-nav-index={globalIdx}
            ref={el => { if (el && ref) ref.current[globalIdx] = el; }}>
            <span className="text-2xl">{item.icon}</span>
            <div>
              <div className="font-medium text-white">{item.name}</div>
              <div className="text-xs text-white/40 truncate">{item.url.replace('https://', '')}</div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
