# 练学宝 (skillxm.cn) 第二优先级修复计划

## 📋 修复目标
提升网站内容质量，满足 Google AdSense 审核要求

---

## ✅ 已完成的第一优先级修复

### 已部署的页面
- ✓ 首页
- ✓ /about/ (包含用户反馈、教师资质、成果数据)
- ✓ /contact/ (邮箱已更新)
- ✓ /robots.txt (AI 爬虫已限制)

### 待部署的页面（需要 Cloudflare 重新部署）
- ⏳ /privacy-policy/
- ⏳ /terms-of-service/
- ⏳ /blog/jiaoshi-zhuanlan-di-yi-jiu-jie/

---

## 🔧 第二优先级修复清单

### 1. 工具页面添加 Open Graph 图片
**问题**: 所有工具页面缺少 `og:image` 标签，导致社交分享时无预览图

**修复方案**:
```tsx
// 在每个工具页面的 metadata 中添加:
export const metadata = {
  openGraph: {
    images: [
      {
        url: `https://www.skillxm.cn/og-tools/${toolId}.jpg`,
        width: 1200,
        height: 630,
        alt: `${toolName} - 练学宝`,
      },
    ],
  },
};
```

**涉及页面** (10个):
- /tools/mental-math/ → og-tools/mental-math.jpg
- /tools/math-worksheet/ → og-tools/math-worksheet.jpg
- /tools/calligraphy/ → og-tools/calligraphy.jpg
- /tools/sudoku/ → og-tools/sudoku.jpg
- /tools/flashcards/ → og-tools/flashcards.jpg
- /tools/writing-template/ → og-tools/writing-template.jpg
- /tools/poem-memo/ → og-tools/poem-memo.jpg
- /tools/unit-test/ → og-tools/unit-test.jpg
- /tools/english-calligraphy/ → og-tools/english-calligraphy.jpg
- /tools/pinyin/ → og-tools/pinyin.jpg

**状态**: ⏳ SVG 模板已生成，需要转换为 JPG

---

### 2. 博客文章添加作者信息
**问题**: 现有105篇文章缺少 author 字段

**修复方案**:
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

**状态**: ✅ 教师专栏文章已添加，其他文章需要批量添加

---

### 3. 优化页面加载速度
**问题**: 
- 首页加载时间 3681ms
- 文章页加载时间 9539ms

**修复方案**:
```tsx
// 在 ConsentAwareScripts.tsx 中移除头条推送脚本:
// 删除以下代码:
const TOUTIAO_PUSH_SRC = 'https://lf1-cdn-tos.bytegoofy.com/...';
injectInlineScript(`...ttzz...`);
```

**状态**: ⏳ 待修改

---

### 4. 添加内部链接
**问题**: 工具页面和博客文章之间缺少交叉链接

**修复方案**:
```tsx
// 在工具页面底部添加相关文章:
<section className="mt-8">
  <h2>相关文章</h2>
  <Link href="/blog/xxx/">文章标题</Link>
</section>
```

**状态**: ⏳ 待添加

---

## 📝 具体实施步骤

### 步骤 1: 生成 OG 图片（30分钟）
```bash
# 使用 sharp 库将 SVG 转换为 JPG
npm install sharp --save-dev
node scripts/convert-og-images.cjs
```

### 步骤 2: 更新工具页面 metadata（20分钟）
```bash
# 批量更新所有工具页面的 metadata
node scripts/add-og-images.cjs
```

### 步骤 3: 批量添加作者信息（15分钟）
```bash
# 为现有文章添加作者信息
node scripts/add-authors.cjs
```

### 步骤 4: 移除头条推送脚本（10分钟）
```bash
# 编辑 ConsentAwareScripts.tsx
# 删除头条推送相关代码
```

### 步骤 5: 添加内部链接（30分钟）
```bash
# 为每个工具页面添加相关文章推荐
# 为每篇博客文章添加工具链接
```

---

## ⏰ 执行时间预估

| 任务 | 预计时间 |
|------|---------|
| 生成 OG 图片 | 30 分钟 |
| 更新工具页面 | 20 分钟 |
| 批量添加作者 | 15 分钟 |
| 优化加载速度 | 10 分钟 |
| 添加内部链接 | 30 分钟 |
| **总计** | **约 1.5 小时** |

---

## 🚀 立即开始？

请回复以下任一选项：

1. **"开始"** - 立即执行所有第二优先级修复
2. **"分批"** - 分步骤执行，每步确认后继续
3. **"等待"** - 等待第一优先级部署完成后再执行
4. **"跳过"** - 跳过第二优先级，等待 AdSense 审核结果

---

## 📊 预期效果

| 指标 | 当前 | 目标 |
|------|------|------|
| 首页加载时间 | 3681ms | <2000ms |
| 文章页加载时间 | 9539ms | <3000ms |
| 工具页面 OG 图片 | 0/10 | 10/10 |
| 博客文章作者信息 | 1/106 | 106/106 |
| 内部链接覆盖率 | 低 | 高 |

---

**计划生成时间**: 2026-08-17  
**修复者**: Agnes AI Assistant
