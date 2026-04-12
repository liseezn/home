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

  const bgmRef = useRef(null);
  const [isMusicPlay, setIsMusicPlay] = useState(false);
  const contextRef = useRef(null);
  const [contextPos, setContextPos] = useState({ x: 0, y: 0 });

  const typingTexts = [
    '你发现了一个小彩蛋~',
    '鼠标到处点点有惊喜',
    '试试输入 Konami 代码',
    '滚动到底部看看火箭'
  ];
  const [typing, setTyping] = useState(typingTexts[0]);

  // 粒子
  const addParticle = (x, y) => {
    const emojis = ['✨', '💖', '🌟', '🔥', '🚀', '😎'];
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  };

  // 碎屏
  const createBurst = (x, y) => {
    for (let i = 0; i < 20; i++) {
      addParticle(x + (Math.random() - 0.5) * 100, y + (Math.random() - 0.5) * 100);
    }
  };

  // 鼠标移动
  useEffect(() => {
    const move = (e) => {
      if (Math.random() > 0.92) addParticle(e.clientX, e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // 点击空白
  useEffect(() => {
    const click = (e) => {
      if (!e.target.closest('a') && !e.target.closest('button') && !e.target.closest('input')) {
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
    if (konami === 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba') {
      alert('🎉 Konami 彩蛋触发！');
      setKonami('');
    }
    return () => window.removeEventListener('keydown', keyDown);
  }, [konami]);

  // 滚动火箭
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
    if (hoverCount >= 4) setShowSecretBtn(true);
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
      contextRef.current.classList.remove('hidden');
    };
    const close = () => contextRef.current?.classList.add('hidden');
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

  return (
    <main className={`min-h-screen ${dark ? 'dark bg-slate-900 text-white' : 'bg-gray-50 text-dark'}`}>
      <audio ref={bgmRef} loop>
        <source src="https://cdn.freesound.org/previews/640/640251_1299461-lq.mp3" type="audio/mpeg" />
      

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

      {/* 导航 */}
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

        {/* 个人站点 */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">个人站点</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name:'主页', url:'https://www.liseezn.top' },
              { name:'博客', url:'https://blog.liseezn.top' },
              { name:'导航', url:'https://web.liseezn.top' },
              { name:'网盘', url:'https://pan.liseezn.top' },
            ].map((d,i)=>(
              <motion.a key={i} href={d.url} target="_blank"
                whileHover={{ scale:1.03 }}
                className="bg-white dark:bg-slate-800 p-4 rounded-lg nav-item">
                <div>
                  <div className="font-medium">{d.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{d.url}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* 秘密按钮 */}
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
        <div className="mt-2 text-sm">
          <a href="https://icp.gov.moe/?keyword=20258868" target="_blank" className="mr-4">萌ICP备20258868</a>
          <a href="https://icp.gov.moe/?keyword=20266626" target="_blank">萌ICP备20266626</a>
        </div>
      </footer>
    </main>
  );
}
