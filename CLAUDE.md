# 项目保护规则

## 受保护文件清单（修改前必须获得用户明确授权）

以下文件包含敏感配置（广告ID、发布商ID、API密钥等），未经用户明确授权，禁止修改：

| 文件路径 | 保护内容 | 当前值 |
|---------|---------|--------|
| `public/ads.txt` | AdSense 发布商ID | `pub-4710405779358793` |
| `app/_components/ConsentAwareScripts.tsx` | AdSense 发布商ID | `ca-pub-4710405779358793` |
| `app/blog/_components/BlogPostPage.tsx` | 广告代码中的 data-ad-client | `ca-pub-4710405779358793` |
| `public/_redirects` | URL重定向规则 | - |
| `public/robots.txt` | AI爬虫规则 | - |
| `public/_headers` | 安全头和CSP规则 | - |
| `app/layout.tsx` | Schema.org 结构化数据 | - |
| `lib/seoUtils.ts` | SEO工具函数 | - |
| `next.config.ts` | Next.js 构建配置 | - |

## 规则

1. **只读不改**：上述文件默认为只读状态
2. **授权前置**：如需修改任何受保护文件，必须先向用户说明：
   - 要修改哪个文件
   - 修改什么内容
   - 为什么需要修改
   - 修改前后的具体差异
3. **获得授权后才可修改**：用户明确回复"同意"或"可以"后才能执行修改
4. **修改后验证**：修改完成后必须构建验证，确保不影响网站功能

## 项目信息

- 网站名称：练学宝
- 官网：https://www.example.com/
- AdSense 发布商ID：pub-4710405779358793
- 部署平台：Cloudflare Pages
- 最后更新：2026-07-05
