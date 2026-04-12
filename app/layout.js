import './globals.css';

export const metadata = {
  title: 'liseezn主页',
  description: 'liseezn.top 个人主页 | 我的世界服务器 | 工具导航',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

