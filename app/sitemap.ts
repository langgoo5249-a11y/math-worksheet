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

// 站点级固定更新日期（用于没有独立更新时间的静态页）
// 2026-07-09: 更新至最新部署日期，确保 Google 能正确识别页面新鲜度
const SITE_LASTMOD = '2026-07-10';

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
//   - 2026-06-16 修复：过滤含中文/非ASCII字符的 blog slug 和 category，
//     避免 Next.js 静态导出时中文路由编码不匹配导致软404。
//   - 2026-06-22 修复：
//     1) 教材详情页 URL 改为 /textbook/{version}/grade-{grade}/，与真实路由一致
//     2) 不再把当天日期作为所有页面 lastModified，只有博客文章使用真实发布日期，
//        其余无明确更新时间的页面要么使用固定站点日期，要么省略 lastModified
// =====================================================================

// URL slug 安全校验：仅允许 ASCII 字母、数字、连字符和下划线
// Next.js 静态导出（output: "export"）不支持中文等非 ASCII 路由
function isValidUrlSlug(s: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(s);
}

// 单个 sitemap 条目
type SitemapEntryOptions = {
  // 仅当页面有真实、可验证的更新时间时才提供
  lastModified?: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
};

function makeEntry(
  path: string,
  options: SitemapEntryOptions
): MetadataRoute.Sitemap[number] {
  const url = `${BASE_URL}${path}`;
  const entry: MetadataRoute.Sitemap[number] = {
    url,
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
  if (options.lastModified) {
    entry.lastModified = options.lastModified;
  }
  return entry;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // ========== 首页 ==========
  sitemapEntries.push(makeEntry('/', {
    lastModified: SITE_LASTMOD,
    changeFrequency: 'daily',
    priority: 1.0,
  }));

  // ========== 静态页面（有固定更新时间的法律/介绍页）==========
  const staticPages: Array<{ path: string; priority: number; freq: SitemapEntryOptions['changeFrequency']; lastmod?: string }> = [
    { path: '/about/', priority: 0.6, freq: 'monthly', lastmod: SITE_LASTMOD },
    { path: '/contact/', priority: 0.4, freq: 'monthly', lastmod: SITE_LASTMOD },
    { path: '/terms/', priority: 0.3, freq: 'yearly', lastmod: SITE_LASTMOD },
    { path: '/privacy/', priority: 0.3, freq: 'yearly', lastmod: SITE_LASTMOD },
  ];
  staticPages.forEach(({ path, priority, freq, lastmod }) => {
    sitemapEntries.push(makeEntry(path, {
      lastModified: lastmod,
      changeFrequency: freq,
      priority,
    }));
  });

  // ========== 博客首页 ==========
  sitemapEntries.push(makeEntry('/blog/', {
    lastModified: SITE_LASTMOD,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // ========== 工具聚合页 ==========
  sitemapEntries.push(makeEntry('/tools/', {
    lastModified: SITE_LASTMOD,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // ========== 工具页面 ==========
  TOOLS.filter(t => t.active).forEach(tool => {
    sitemapEntries.push(makeEntry(tool.path + '/', {
      lastModified: SITE_LASTMOD,
      changeFrequency: tool.changefreq || 'weekly',
      priority: tool.priority || 0.8,
    }));
  });

  // ========== 博客文章（过滤无效slug、重复标题）==========
  const seenTitles = new Set<string>();
  articles
    .filter(a => isValidUrlSlug(a.id))
    .filter(a => {
      if (seenTitles.has(a.title)) return false;
      seenTitles.add(a.title);
      return true;
    })
    .forEach(article => {
      sitemapEntries.push(makeEntry(`/blog/${article.id}/`, {
        lastModified: article.date,
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    });

  // ========== 博客分类（2026-06-16: 过滤中文分类名，Next.js 静态导出不支持非ASCII路由）==========
  categories
    .filter(c => c !== '全部' && isValidUrlSlug(c))
    .forEach(cat => {
      sitemapEntries.push(makeEntry(`/blog/category/${cat}/`, {
        lastModified: SITE_LASTMOD,
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
      lastModified: SITE_LASTMOD,
      changeFrequency: freq,
      priority,
    }));
  });

  // ========== 年级详情页 ==========
  GRADES.forEach(g => {
    sitemapEntries.push(makeEntry(`/grade/grade-${g.grade}/`, {
      lastModified: SITE_LASTMOD,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  });

  // ========== 教材详情页（URL 与 generateStaticParams 保持一致）==========
  TEXTBOOKS.forEach(tb => {
    tb.grades.forEach(g => {
      sitemapEntries.push(makeEntry(`/textbook/${tb.id}/grade-${g.grade}/`, {
        lastModified: SITE_LASTMOD,
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    });
  });

  // ========== 知识点详情页 ==========
  KNOWLEDGE_POINTS.forEach(kp => {
    sitemapEntries.push(makeEntry(`/knowledge/${kp.slug}/`, {
      lastModified: SITE_LASTMOD,
      changeFrequency: 'monthly',
      priority: 0.75,
    }));
  });

  // ========== 资源详情页 ==========
  getAllResources().forEach(r => {
    sitemapEntries.push(makeEntry(`/resources/${r.id}/`, {
      lastModified: SITE_LASTMOD,
      changeFrequency: 'monthly',
      priority: 0.75,
    }));
  });

  // ========== 家长指导详情页 ==========
  PARENT_GUIDE_TOPICS.forEach(t => {
    sitemapEntries.push(makeEntry(`/parent-guide/${t.id}/`, {
      lastModified: SITE_LASTMOD,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  });

  // ========== AI 搜索引擎优化概览页 ==========
  sitemapEntries.push(makeEntry('/ai-overview/', {
    lastModified: SITE_LASTMOD,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return sitemapEntries;
}
