/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // 强制Turbopack处理Tailwind的PostCSS配置
    resolveExtensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
  },
  // 显式启用PostCSS
  experimental: {
    turbo: {
      postcss: true,
    },
  },
};

module.exports = nextConfig;
