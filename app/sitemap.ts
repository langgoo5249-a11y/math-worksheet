import type { MetadataRoute } from 'next';
import { articles, categories } from './blog/data';
import { TOOLS } from '@/lib/toolRegistry';
import { GRADES } from '@/lib/gradeConfig';
import { TEXTBOOKS } from '@/lib/textbookConfig';
import { KNOWLEDGE_POINTS } from '@/lib/knowledgeConfig';
import { PARENT_GUIDE_TOPICS } from '@/lib/parentGuideConfig';
import { getAllResources } from '@/lib/resourcesConfig';
import { enArticles } from '@/app/en/blog/data';

// output: "export" 模式下需要声明为静态生成
export const dynamic = 'force-static';

const BASE_URL = 'https://www.skillxm.cn';

// 站点级固定更新日期（用于没有独立更新时间的静态页）
// 2026-07-18: 更新至最新部署日期，确保 Google 能正确识别页面新鲜度
const SITE_LASTMOD = '2026-07-18';

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
//   - 2026-07-18 修复：
//     1) 移除中文博客文章的 en hreflang alternate（英文博客是独立内容，不是中文翻译版）
//     2) 为英文页面添加独立的 en hreflang，zh-CN/x-default 指向根路径对应页面
//     3) 添加 /editorial-policy/ 页面到站点地图
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

// 中文页面条目：仅包含 zh-CN 和 x-default hreflang
// 英文博客是独立内容，不是中文博客的翻译版，因此不添加 en hreflang alternate
function makeZhEntry(
  path: string,
  options: SitemapEntryOptions
): MetadataRoute.Sitemap[number] {
  const url = `${BASE_URL}${path}`;
  const entry: MetadataRoute.Sitemap[number] = {
    url,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
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

// 英文页面条目：包含 en hreflang（指向自身），zh-CN/x-default 指向根路径对应页面
function makeEnEntry(
  path: string,
  zhFallbackPath: string,
  options: SitemapEntryOptions
): MetadataRoute.Sitemap[number] {
  const url = `${BASE_URL}${path}`;
  const zhUrl = `${BASE_URL}${zhFallbackPath}`;
  const entry: MetadataRoute.Sitemap[number] = {
    url,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: {
        'en': url,
        'zh-CN': zhUrl,
        'x-default': zhUrl,
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
  sitemapEntries.push(makeZhEntry('/', {
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
    { path: '/editorial-policy/', priority: 0.4, freq: 'monthly', lastmod: SITE_LASTMOD },
  ];
  staticPages.forEach(({ path, priority, freq, lastmod }) => {
    sitemapEntries.push(makeZhEntry(path, {
      lastModified: lastmod,
      changeFrequency: freq,
      priority,
    }));
  });

  // ========== 博客首页 ==========
  sitemapEntries.push(makeZhEntry('/blog/', {
    lastModified: SITE_LASTMOD,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // ========== 工具聚合页 ==========
  sitemapEntries.push(makeZhEntry('/tools/', {
    lastModified: SITE_LASTMOD,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // ========== 工具页面 ==========
  TOOLS.filter(t => t.active).forEach(tool => {
    sitemapEntries.push(makeZhEntry(tool.path + '/', {
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
      sitemapEntries.push(makeZhEntry(`/blog/${article.id}/`, {
        lastModified: article.date,
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    });

  // ========== 博客分类（2026-06-16: 过滤中文分类名，Next.js 静态导出不支持非ASCII路由）==========
  categories
    .filter(c => c !== '全部' && isValidUrlSlug(c))
    .forEach(cat => {
      sitemapEntries.push(makeZhEntry(`/blog/category/${cat}/`, {
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
    sitemapEntries.push(makeZhEntry(path, {
      lastModified: SITE_LASTMOD,
      changeFrequency: freq,
      priority,
    }));
  });

  // ========== 年级详情页 ==========
  GRADES.forEach(g => {
    sitemapEntries.push(makeZhEntry(`/grade/grade-${g.grade}/`, {
      lastModified: SITE_LASTMOD,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  });

  // ========== 教材详情页（URL 与 generateStaticParams 保持一致）==========
  TEXTBOOKS.forEach(tb => {
    tb.grades.forEach(g => {
      sitemapEntries.push(makeZhEntry(`/textbook/${tb.id}/grade-${g.grade}/`, {
        lastModified: SITE_LASTMOD,
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    });
  });

  // ========== 知识点详情页 ==========
  KNOWLEDGE_POINTS.forEach(kp => {
    sitemapEntries.push(makeZhEntry(`/knowledge/${kp.slug}/`, {
      lastModified: SITE_LASTMOD,
      changeFrequency: 'monthly',
      priority: 0.75,
    }));
  });

  // ========== 资源详情页 ==========
  getAllResources().forEach(r => {
    sitemapEntries.push(makeZhEntry(`/resources/${r.id}/`, {
      lastModified: SITE_LASTMOD,
      changeFrequency: 'monthly',
      priority: 0.75,
    }));
  });

  // ========== 家长指导详情页 ==========
  PARENT_GUIDE_TOPICS.forEach(t => {
    sitemapEntries.push(makeZhEntry(`/parent-guide/${t.id}/`, {
      lastModified: SITE_LASTMOD,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  });

  // ========== AI 搜索引擎优化概览页 ==========
  sitemapEntries.push(makeZhEntry('/ai-overview/', {
    lastModified: SITE_LASTMOD,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // ========== 英文版页面（教外国人学中文）==========
  // /en/ 已有独立内容，不再 301 重定向
  // 英文页面使用 makeEnEntry：en hreflang 指向自身，zh-CN/x-default 指向根路径对应页面
  // 英文工具页面无中文对应页，zh-CN/x-default 回退到 /tools/ 聚合页
  const enPages: Array<{ path: string; zhFallback: string; priority: number; freq: SitemapEntryOptions['changeFrequency'] }> = [
    { path: '/en/', zhFallback: '/', priority: 0.9, freq: 'weekly' },
    { path: '/en/tools/', zhFallback: '/tools/', priority: 0.85, freq: 'weekly' },
    { path: '/en/tools/pinyin-converter/', zhFallback: '/tools/', priority: 0.8, freq: 'weekly' },
    { path: '/en/tools/stroke-order/', zhFallback: '/tools/', priority: 0.8, freq: 'monthly' },
    { path: '/en/tools/hsk-flashcards/', zhFallback: '/tools/', priority: 0.8, freq: 'weekly' },
    { path: '/en/tools/tone-trainer/', zhFallback: '/tools/', priority: 0.8, freq: 'monthly' },
    { path: '/en/tools/reading-reader/', zhFallback: '/tools/', priority: 0.8, freq: 'monthly' },
    { path: '/en/tools/radical-explorer/', zhFallback: '/tools/', priority: 0.8, freq: 'monthly' },
    { path: '/en/tools/picture-learning/', zhFallback: '/tools/', priority: 0.8, freq: 'weekly' },
    { path: '/en/tools/pinyin-chart/', zhFallback: '/tools/', priority: 0.85, freq: 'weekly' },
    { path: '/en/blog/', zhFallback: '/blog/', priority: 0.85, freq: 'weekly' },
  ];
  enPages.forEach(({ path, zhFallback, priority, freq }) => {
    sitemapEntries.push(makeEnEntry(path, zhFallback, {
      lastModified: SITE_LASTMOD,
      changeFrequency: freq,
      priority,
    }));
  });

  // English blog articles（独立内容，无中文对应文章，zh-CN/x-default 回退到 /blog/）
  enArticles.forEach((a) => {
    sitemapEntries.push(makeEnEntry(`/en/blog/${a.id}/`, '/blog/', {
      lastModified: a.dateModified || a.date,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  });

  return sitemapEntries;
}
