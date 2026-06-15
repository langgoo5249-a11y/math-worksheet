import type { MetadataRoute } from 'next';
import { articles, categories } from './blog/data';
import { TOOLS } from '@/lib/toolRegistry';
import { GRADES } from '@/lib/gradeConfig';
import { TEXTBOOKS } from '@/lib/textbookConfig';
import { KNOWLEDGE_POINTS } from '@/lib/knowledgeConfig';
import { PARENT_GUIDE_TOPICS } from '@/lib/parentGuideConfig';
import { getAllResources } from '@/lib/resourcesConfig';

// output: "export" 模式下需要声明为静态生成
export const dynamic = 'force-static';

const BASE_URL = 'https://www.skillxm.cn';

// =====================================================================
// Sitemap 配置说明
// ---------------------------------------------------------------------
// 历史变更：
//   - 2026-06-15 之前：sitemap 包含 4 个语言版本（zh/en/ja/ko）
//     但 /en/, /ja/, /ko/ 路由是"伪多语言"——返回中文内容，造成
//     Google 索引时把同一个页面识别为 4 个独立 URL，触发重复内容惩罚。
//   - 2026-06-15 修复：sitemap 只包含中文（zh-CN）版本。
//     /en/, /ja/, /ko/ 通过 _redirects 301 跳转到 /（或对应路径），
//     [locale]/layout.tsx 给这些页面统一设置 noindex。
//     因此 sitemap 排除这些被重定向的 URL，避免 Googlebot 浪费抓取预算。
// =====================================================================

// 单个 sitemap 条目
type SitemapEntryOptions = {
  lastModified: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
};

function makeEntry(
  path: string,
  options: SitemapEntryOptions
): MetadataRoute.Sitemap[number] {
  const url = `${BASE_URL}${path}`;
  return {
    url,
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      // x-default 指向中文版
      languages: {
        'zh-CN': url,
        'x-default': url,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split('T')[0];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // ========== 首页 ==========
  sitemapEntries.push(makeEntry('/', {
    lastModified: today,
    changeFrequency: 'daily',
    priority: 1.0,
  }));

  // ========== 静态页面 ==========
  const staticPages: Array<{ path: string; priority: number; freq: SitemapEntryOptions['changeFrequency'] }> = [
    { path: '/about/', priority: 0.6, freq: 'monthly' },
    { path: '/contact/', priority: 0.4, freq: 'monthly' },
    { path: '/terms/', priority: 0.3, freq: 'yearly' },
    { path: '/privacy/', priority: 0.3, freq: 'yearly' },
    { path: '/ads.txt/', priority: 0.1, freq: 'yearly' },
  ];
  staticPages.forEach(({ path, priority, freq }) => {
    sitemapEntries.push(makeEntry(path, {
      lastModified: today,
      changeFrequency: freq,
      priority,
    }));
  });

  // ========== 博客首页 ==========
  sitemapEntries.push(makeEntry('/blog/', {
    lastModified: today,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // ========== 工具页面 ==========
  TOOLS.filter(t => t.active).forEach(tool => {
    sitemapEntries.push(makeEntry(tool.path + '/', {
      lastModified: today,
      changeFrequency: 'weekly',
      priority: tool.priority || 0.8,
    }));
  });

  // ========== 博客文章（94 篇，2026-06-15）==========
  articles.forEach(article => {
    sitemapEntries.push(makeEntry(`/blog/${article.id}/`, {
      lastModified: article.date,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  });

  // ========== 博客分类 ==========
  categories
    .filter(c => c !== '全部')
    .forEach(cat => {
      sitemapEntries.push(makeEntry(`/blog/category/${cat}/`, {
        lastModified: today,
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    });

  // ========== 顶级聚合页 ==========
  const aggregatePages: Array<{ path: string; priority: number; freq: SitemapEntryOptions['changeFrequency'] }> = [
    { path: '/grade/', priority: 0.85, freq: 'weekly' },
    { path: '/textbook/', priority: 0.85, freq: 'weekly' },
    { path: '/knowledge/', priority: 0.85, freq: 'weekly' },
    { path: '/resources/', priority: 0.85, freq: 'weekly' },
    { path: '/parent-guide/', priority: 0.85, freq: 'weekly' },
    { path: '/daily/', priority: 0.7, freq: 'daily' },
    { path: '/changelog/', priority: 0.4, freq: 'monthly' },
  ];
  aggregatePages.forEach(({ path, priority, freq }) => {
    sitemapEntries.push(makeEntry(path, {
      lastModified: today,
      changeFrequency: freq,
      priority,
    }));
  });

  // ========== 年级详情页 ==========
  GRADES.forEach(g => {
    sitemapEntries.push(makeEntry(`/grade/grade-${g.grade}/`, {
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  });

  // ========== 教材详情页 ==========
  TEXTBOOKS.forEach(tb => {
    tb.grades.forEach(g => {
      sitemapEntries.push(makeEntry(`/textbook/${tb.id}/${g.grade}/`, {
        lastModified: today,
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    });
  });

  // ========== 知识点详情页 ==========
  KNOWLEDGE_POINTS.forEach(kp => {
    sitemapEntries.push(makeEntry(`/knowledge/${kp.slug}/`, {
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.75,
    }));
  });

  // ========== 资源详情页 ==========
  getAllResources().forEach(r => {
    sitemapEntries.push(makeEntry(`/resources/${r.id}/`, {
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.75,
    }));
  });

  // ========== 家长指导详情页 ==========
  PARENT_GUIDE_TOPICS.forEach(t => {
    sitemapEntries.push(makeEntry(`/parent-guide/${t.id}/`, {
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  });

  return sitemapEntries;
}
