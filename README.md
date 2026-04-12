
<div align="center">
  <img src="https://via.placeholder.com/120x120/000000/FFFFFF?text=L" alt="liseezn logo" width="80" />
  <h1>liseezn · 数字花园</h1>
  <p>
    <strong>极简黑白灰个人主页 · 藏有 20 个交互彩蛋</strong>
  </p>
  <p>
    <a href="https://liseezn.top">在线演示</a> ·
    <a href="#-快速开始">快速开始</a> ·
    <a href="#-内置彩蛋">彩蛋清单</a> ·
    <a href="#-自定义配置">自定义</a>
  </p>
  <br />
</div>

## ✨ 项目简介

这是一个基于 **Next.js + Tailwind CSS + Framer Motion** 构建的现代化个人导航主页。采用极简黑白灰设计，结构清晰、交互细腻，同时内置大量隐藏彩蛋，为访客带来沉浸式体验。

项目整合个人站点、我的世界服务器、实用工具、资源分享四大板块，并支持实时同步 WordPress 最新文章，是一套开箱即用的个人数字门户。

---

## 🧩 主要特性

- 三栏极简布局，自适应深色模式
- 清爽黑白灰视觉体系，高级耐看
- 实时同步 WordPress 博客最新文章
- 自定义右键菜单、键盘快捷导航
- 游戏模式、隐藏终端、粒子特效等趣味交互
- 20+ 隐藏彩蛋，可玩性拉满

---

## 🥚 内置彩蛋（20 个）

| # | 彩蛋名称 | 触发方式 |
|---|----------|----------|
| 1 | 鼠标跟随粒子 | 鼠标移动（概率触发） |
| 2 | 点击空白粒子 | 点击页面非交互区域 |
| 3 | Konami 作弊码 | 输入 ↑↑↓↓←→←→BA |
| 4 | Logo 连续点击 | 点击左上角 Logo 5 次 |
| 5 | 底部火箭动画 | 滚动到页面最底部 |
| 6 | 暗黑模式切换 | 右上角主题按钮 |
| 7 | 打字机签名 | 右侧个性签名自动轮播 |
| 8 | 秘密隐藏按钮 | 右侧面板区域悬停 5 次 |
| 9 | 开屏加载动画 | 页面首次加载 |
| 10 | 卡片悬浮动效 | 鼠标悬停任意卡片 |
| 11 | 秘密输入框 | 输入框输入 `secret` |
| 12 | 鼠标背景渐变 | 深色模式下移动鼠标 |
| 13 | 双击返回顶部 | 双击页面空白处 |
| 14 | 自定义右键菜单 | 页面任意位置右键 |
| 15 | 游戏键盘模式 | 按下 `G` 键开启 |
| 16 | 文章快捷排序 | 博客页按 `S` 键 |
| 17 | 隐藏终端面板 | 按下 `T` 键 |
| 18 | 404 趣味页面 | 访问不存在路由 |
| 19 | 深夜专属提示 | 0:00–6:00 访问自动触发 |
| 20 | 打印页面彩蛋 | `Ctrl/Cmd + P` |

---

## 🛠️ 技术栈

- 框架：Next.js (App Router)
- 样式：Tailwind CSS
- 动画：Framer Motion
- 图标：Lucide React
- 数据源：WordPress REST API
- 部署：Vercel

---

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/liseezn/home.git
cd home
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发环境
```bash
npm run dev
```
访问 http://localhost:3000

### 4. 构建生产版本
```bash
npm run build
npm start
```

---

## ⚙️ 自定义配置

### 修改导航链接
在 `app/page.js` 中修改 `NAV_DATA` 中的名称、链接、描述。

### 修改技术栈展示
编辑 `TECH_STACK` 数组，增删前端/后端/其他分类。

### 修改博客源（WordPress）
```javascript
const res = await fetch('https://你的博客/wp-json/wp/v2/posts?per_page=6&_embed')
```

### 调整彩蛋参数
- 秘密区域触发次数：`hoverCount >= 5`
- 粒子出现概率：`Math.random() > 0.95`
- 深夜模式时间：`0 ≤ h < 6`

---

## 📂 项目结构

```
liseezn-homepage/
├── app/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   └── not-found.js
├── public/
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── package.json
```

---

## 🌐 部署

项目已适配 Vercel，一键部署：

1. 推送到 GitHub
2. Vercel 新建项目 → 导入仓库
3. 框架选择 Next.js
4. 直接 Deploy

---

## 🤝 贡献

欢迎提交 Issue、PR，或分享你发现的新彩蛋创意。

---

## 📄 许可证

MIT License

---

## 💬 作者

- GitHub：@liseezn
- 博客：blog.liseezn.top
- 邮箱: mail@liseezn.top

<br />
<div align="center">
✨ 如果对你有帮助，欢迎 Star ✨
</div>
