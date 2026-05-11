import type { MetadataRoute } from 'next';
import { articles, categories } from './blog/data';
import { TOOLS } from '@/lib/toolRegistry';

// output: "export" 模式下需要声明为静态生成
export const dynamic = 'force-static';

const BASE_URL = 'https://www.skillxm.cn';

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split('T')[0];

  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: today, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/about/`, lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact/`, lastModified: '2026-04-23', changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/terms/`, lastModified: '2026-04-23', changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/privacy/`, lastModified: '2026-04-23', changeFrequency: 'monthly', priority: 0.3 },
  ];

  // 博客分页页面（仅保留主页，分页路由暂未实现）
  const blogPaginationPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog/`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // 工具页面
  const toolPages: MetadataRoute.Sitemap = TOOLS.filter(t => t.active).map(tool => ({
    url: `${BASE_URL}${tool.path}/`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: tool.priority || 0.8,
  }));

  // 博客文章（自动从 data.ts 读取）
  const blogPages: MetadataRoute.Sitemap = articles.map(article => ({
    url: `${BASE_URL}/blog/${article.id}/`,
    lastModified: article.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 博客分类页面（排除'全部'）
  const categoryPages: MetadataRoute.Sitemap = categories
    .filter(c => c !== '全部')
    .map(cat => ({
      url: `${BASE_URL}/blog/category/${cat}/`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [...staticPages, ...blogPaginationPages, ...categoryPages, ...toolPages, ...blogPages];
}

// 生成 sitemap 索引文件（用于大量页面）
export function sitemapIndex(): string {
  const today = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
}
