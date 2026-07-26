import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';  // 必须导入

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'liseezn · 主页',
  description: '极简黑白灰个人主页，藏有二十个交互彩蛋',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <meta name="baidu-site-verification" content="codeva-pFSTct68ix" />
        {children}
        <Script
          id="matomo-analytics"
          strategy="afterInteractive"
        >
          {`
            var _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="//stats.liseezn.top/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '1']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
