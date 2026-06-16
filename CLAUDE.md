# 练学宝 (skillxm.cn) 项目开发规范

## 项目概述

- **站名**: 练学宝 (LianXueBao / skillxm.cn)
- **定位**: 儿童中文学习与小学数学教育工具网站
- **技术栈**: Next.js 16 (App Router) + React 19 + TypeScript + Turbopack
- **国际化**: next-intl 4.x, `localePrefix: 'as-needed'`（默认中文无前缀，en/ja/ko 有前缀）
- **部署**: 静态导出 (`output: 'export'`) → Cloudflare Pages
- **CI/CD**: GitHub Actions → 推送 main 分支自动构建部署

---

## ⚠️ 规则 1：Server Component 包装 Client Component 必须使用 async（最重要）

**这是项目中最容易出错且后果最严重的规则。违反此规则会导致页面完全空白，所有工具不可用。**

### 问题背景

Next.js 16 + 静态导出 (`output: 'export'`) 环境下，**同步 Server Component** 渲染 Client Component 时会产生空的 RSC 边界：
```html
<div hidden=""><!--$--><!--/$--></div>
```
导致页面组件完全不渲染，用户看到的只有 layout.tsx 中的 sr-only SEO 占位内容。

### 正确模式

```tsx
// ✅ 正确：async Server Component
import ToolPage from './ToolPage';

export default async function Page() {
  return <ToolPage />;
}
```

```tsx
// ❌ 错误：同步 Server Component（会导致页面空白）
import ToolPage from './ToolPage';

export default function Page() {
  return <ToolPage />;
}
```

### 检查清单

- [ ] `app/tools/*/page.tsx` 必须是 async 函数
- [ ] `app/[locale]/tools/*/page.tsx` 必须是 async 函数
- [ ] 任何 page.tsx 如果导入并渲染 Client Component，都必须 async
- [ ] 修改后必须在本地验证 zh 和 en 两个版本都能正常渲染

---

## ⚠️ 规则 2：page.tsx 禁止使用 'use client' 指令

在静态导出模式下，`app/tools/*/page.tsx` **绝对不能**是 Client Component。

### 正确架构

```
app/tools/calligraphy/
├── layout.tsx       ← Server Component: SEO 元数据、结构化数据、sr-only 内容
├── page.tsx         ← async Server Component: 包装器，导入 ToolPage
└── ToolPage.tsx     ← 'use client' Component: 所有交互逻辑和 UI
```

### 错误模式

```tsx
// ❌ 绝对禁止：page.tsx 直接使用 'use client'
'use client';
export default function CalligraphyPage() { ... }
```

如果 page.tsx 是 `'use client'`，在静态导出时整个页面组件内容不会出现在 HTML 中，SEO 完全失效。

---

## ⚠️ 规则 3：工具页面 SEO/GEO 架构

每个工具页面有三层结构：

### layout.tsx（SEO/GEO 层）
- `generateMetadata()`: title, description, keywords, canonical, alternates, Open Graph
- `sr-only` div: 搜索引擎可抓取的文本内容（核心功能、适用对象、相关文章链接）
- JSON-LD 结构化数据: HowTo、FAQPage
- Breadcrumb 导航

### page.tsx（路由层）
- 必须是 async Server Component
- 仅负责导入并渲染 ToolPage

### ToolPage.tsx（交互层）
- `'use client'` 组件
- 包含所有交互逻辑和 UI
- 可接受 `locale` 参数用于国际化

---

## ⚠️ 规则 4：新增工具的标准流程

1. 在 `lib/toolRegistry.ts` 中添加工具配置
2. 创建 `app/tools/[tool-name]/` 目录，包含：
   - `layout.tsx`（从现有工具复制，修改 SEO 内容）
   - `page.tsx`（async Server Component 包装器）
   - `ToolPage.tsx`（客户端组件）
3. 在 `app/[locale]/tools/[tool-name]/` 创建 `page.tsx`（async，导入 ToolPage）
4. 运行 `npm run build` 确认构建成功
5. 本地验证：`/tools/[tool-name]/` 和 `/en/tools/[tool-name]/` 都能正常渲染

---

## 构建与部署

### 本地构建
```bash
npm run build    # next build
```

### 部署流程
1. 推送代码到 GitHub main 分支
2. GitHub Actions 自动触发 `Deploy to Cloudflare Pages` workflow
3. 构建成功 → 自动部署到 skillxm.cn

### 关键配置
- `next.config.ts`: `output: "export"`, `trailingSlash: true`
- `middleware.ts`: next-intl, `localePrefix: 'as-needed'`
- `i18n.ts`: 默认语言 zh, 支持 en/ja/ko

---

## SEO/GEO 检查清单

每次修改代码后，必须验证以下内容在静态 HTML 中完整存在：

### SEO 基础
- [ ] `<title>` 标签正确
- [ ] `<meta name="description">` 完整
- [ ] `<meta name="keywords">` 完整
- [ ] `<link rel="canonical">` 正确
- [ ] `<meta name="robots">` 为 index, follow
- [ ] Open Graph 标签完整 (og:title, og:description, og:image, og:url, og:type)
- [ ] Twitter Card 标签完整

### GEO（结构化数据）
- [ ] Website + SearchAction schema
- [ ] Organization schema（含 logo、地址、联系方式）
- [ ] Person schema（作者）
- [ ] SoftwareApplication x N（每个工具）
- [ ] BreadcrumbList schema
- [ ] WebPage + ItemList schema
- [ ] HowTo schema（含 HowToStep）
- [ ] FAQPage schema（含 Question + Answer）
- [ ] SpeakableSpecification schema（语音搜索）

### 中文搜索
- [ ] 百度验证 meta 标签
- [ ] 百度主动推送脚本
- [ ] 头条搜索主动推送脚本
- [ ] sr-only 中有完整的中文文本内容

---

## 常见陷阱

1. **页面空白**: 99% 是因为 page.tsx 同步渲染 Client Component → 改为 async
2. **构建失败 on Windows**: Turbopack 动态段路径解析问题，不影响 Linux CI 构建
3. **GitHub 推送失败**: 网络环境中 git 协议可能被阻断，可使用 GitHub API 替代推送
4. **Google Search Console 验证码**: 当前使用占位符 `YOUR_GSC_VERIFICATION_CODE`，需要配置真实值