/** @type {import('next').NextConfig} */
const nextConfig = {
    // 启用 Turbopack (Next.js 16 默认开启，此处显式声明)
    turbopack: {},
    // 如果你想继续使用 Webpack，可以删除 turbopack 配置
};

module.exports = nextConfig;
