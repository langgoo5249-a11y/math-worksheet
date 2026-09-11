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

  // 缓存策略说明（2026-09-11）
  // ------------------------------------------------------------------
  // 此处曾有一整块 headers() 配置（/_next/static、/fonts、/images、
  // /favicons、*.css、*.js 的 Cache-Control），但 output: "export" 下
  // Next.js 明确不支持自定义响应头，构建时会打印：
  //   ⚠ Specified "headers" will not automatically work with "output: export"
  // 也就是说这块配置一直是空转，从未上线生效。
  //
  // 真正生效的是 public/_headers（由 postbuild.cjs 复制进 out/，
  // Cloudflare Pages 原生读取）。缓存头已全部在 public/_headers 中重新声明：
  //   /_next/static/*  31536000 immutable
  //   /*.webp/*.jpg/*.png/*.svg  长期缓存
  //   /images/*  /favicons/*  2592000
  // 删除此块可消除构建噪声，且不损失任何实际行为。
  // 如需调整缓存策略，请改 public/_headers，不要改这里。
  // ------------------------------------------------------------------
};

// 创建 next-intl 插件
const withNextIntl = createNextIntlPlugin('./i18n.ts');

export default withNextIntl(nextConfig);
