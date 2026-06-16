# 项目规则 - Math Worksheet / SkillXM

## 静态导出模式（CRITICAL —— 已发生过2次事故）

本项目使用 Next.js `output: "export"` 静态导出，部署在 Cloudflare Pages。

**绝对不允许在 `app/` 目录下创建 `route.ts` / `route.js` / `route.jsx` 文件。**

原因：
- Route Handler 不被 `output: 'export'` 支持
- 添加 route.ts 会破坏所有工具页面（`'use client'` 组件）的 RSC payload 生成
- 症状：所有工具页面返回 200 但内容空白

唯一例外（已在 `scripts/prebuild-check.cjs` 白名单中）：
- `app/ads.txt/route.ts` — Google AdSense 必需，已验证兼容

如果需要新建 `route.ts`，必须先添加到 `scripts/prebuild-check.cjs` 的白名单中并验证兼容性。

**但更建议的方案：创建 `public/` 下的静态文件**来替代 route.ts 功能。

构建前会自动运行 `scripts/prebuild-check.cjs` 拦截违规文件。

## 构建命令

```bash
npm run build        # 完整构建（含 prebuild-check → next build → postbuild）
npm run dev          # 开发服务器
```

## 部署

使用 Cloudflare Pages + wrangler CLI：
```bash
CLOUDFLARE_API_TOKEN="..." npx wrangler pages deploy out --project-name=math-worksheet --branch=master
```

## 重要文件

- `public/_redirects` — Cloudflare Pages 重定向规则
- `public/_headers` — Cloudflare Pages 自定义 HTTP 头（含 CSP）
- `scripts/postbuild.cjs` — 构建后处理（复制关键文件、修复嵌套路由）
- `scripts/prebuild-check.cjs` — 构建前静态导出兼容性检测
- `next.config.ts` — Next.js 配置（含 output: 'export'）