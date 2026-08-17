# 第二优先级修复计划

## 📋 修复目标
提升网站内容质量，满足 Google AdSense 审核要求

---

## 🔧 需要修复的问题

### 1. 工具页面缺少 Open Graph 图片
**问题**: 所有工具页面缺少 `og:image` 标签，导致社交分享时无预览图

**修复方案**:
- 为每个工具页面生成 1200x630 的预览图
- 在页面 meta 中添加 og:image 标签

**涉及页面**:
- /tools/mental-math/
- /tools/math-worksheet/
- /tools/calligraphy/
- /tools/sudoku/
- /tools/flashcards/
- /tools/writing-template/
- /tools/poem-memo/
- /tools/unit-test/
- /tools/english-calligraphy/
- /tools/pinyin/

---

### 2. 博客文章缺少作者信息
**问题**: 所有博客文章的 authorName 字段为 `$undefined`

**修复方案**:
- 在 blog/data.ts 中为每篇文章添加 author 字段
- 使用统一的陈老师作者信息

---

### 3. 页面加载速度慢
**问题**: 
- 首页加载时间 3681ms
- 文章页加载时间 9539ms

**修复方案**:
- 移除头条推送脚本 (ttzz-push)
- 优化图片加载
- 启用 Brotli 压缩

---

### 4. 缺少内部链接
**问题**: 工具页面和博客文章之间缺少交叉链接

**修复方案**:
- 在工具页面添加相关博客文章推荐
- 在博客文章中添加工具链接
- 创建"相关文章"板块

---

## 📝 具体实施步骤

### 步骤 1: 生成 OG 图片
```bash
# 为每个工具生成预览图
# 尺寸: 1200x630
# 格式: JPG
# 位置: public/og-tools/
```

### 步骤 2: 更新工具页面
```tsx
// 在每个工具页面的 metadata 中添加:
openGraph: {
  images: [
    {
      url: `https://www.skillxm.cn/og-tools/${toolId}.jpg`,
      width: 1200,
      height: 630,
      alt: `${toolName} - 练学宝`,
    },
  ],
}
```

### 步骤 3: 修复作者信息
```typescript
// 在 blog/data.ts 中为每篇文章添加:
author: {
  name: '陈老师',
  avatar: '/authors/chenlaoshi.jpg',
  bio: '公立小学数学教师，教龄15年',
  credentials: '中华人民共和国小学数学教师资格证',
  title: '练学宝教学内容顾问 & 小学教师',
}
```

### 步骤 4: 优化加载速度
```tsx
// 在 ConsentAwareScripts.tsx 中移除头条推送:
// 删除以下代码:
// const TOUTIAO_PUSH_SRC = 'https://lf1-cdn-tos.bytegoofy.com/...';
// injectInlineScript(`...ttzz...`);
```

### 步骤 5: 添加内部链接
```tsx
// 在工具页面添加相关文章:
<section className="mt-8">
  <h2>相关文章</h2>
  <Link href="/blog/xxx/">文章标题</Link>
</section>
```

---

## ⏰ 执行时间预估

| 任务 | 预计时间 |
|------|---------|
| 生成 OG 图片 | 30 分钟 |
| 更新工具页面 | 20 分钟 |
| 修复作者信息 | 15 分钟 |
| 优化加载速度 | 10 分钟 |
| 添加内部链接 | 30 分钟 |
| **总计** | **约 1.5 小时** |

---

## 🚀 立即开始？

请回复"开始"或"继续"，我将立即执行第二优先级修复。
