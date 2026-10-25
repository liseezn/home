# liseezn · 数字花园

个人数字门户，汇集项目、常用服务、博客文章与关于页面。基于 Next.js App Router、React、Tailwind CSS 与 Lucide。

## 功能
- 首页、项目、服务、博客、关于五个独立路由
- 深色 / 浅色主题切换，并记住用户选择
- 全站搜索（Command/Ctrl + K），可搜索页面、项目与服务
- WordPress 文章通过 Next.js Route Handler 获取，缓存 5 分钟；博客不可用时其他页面仍可使用
- 精选彩蛋：Logo 连点、Konami 代码、隐藏终端（按 T 或点击页脚入口）
- 响应式布局、减少动态效果偏好、页面 metadata 与 404 页面

## 开发
运行 npm install 安装依赖，然后运行 npm run dev 并访问 http://localhost:3000。

## 验证与生产构建
运行 npm run lint 和 npm run build。Next.js 16 不再提供 next lint 命令，项目改用 ESLint 9 与 eslint-config-next。

## 博客数据源
app/api/posts/route.js 从 WordPress REST API 获取最多 12 篇文章，使用 5 分钟缓存和 8 秒请求超时。上游不可用时返回错误，不阻塞其他页面。

## 部署
保留现有 Vercel + Next.js 部署方式。仓库当前未包含 GitHub Actions 工作流或锁文件；合并后继续使用现有 Vercel Git 集成，并在部署环境确认 Node.js 版本与依赖安装策略。
