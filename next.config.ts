import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },

  turbopack: { root: '.' },

  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 注意：i18n 配置在 App Router 和 output: 'export' 中不兼容
  // 使用 next-intl 的 [locale] 路由处理国际化
  // 缓存策略优化 - 为静态资源设置长期缓存
  headers: async () => [
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=2592000, stale-while-revalidate=86400',
        },
      ],
    },
    {
      source: '/favicons/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=2592000',
        },
      ],
    },
    {
      source: '/:path(.*).css',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/:path(.*).js',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};

// 创建 next-intl 插件
const withNextIntl = createNextIntlPlugin('./i18n.ts');

export default withNextIntl(nextConfig);
