import type { MetadataRoute } from 'next';
import { articles, categories } from './blog/data';
import { TOOLS } from '@/lib/toolRegistry';
import { locales, defaultLocale } from '@/lib/i18n';

// output: "export" 模式下需要声明为静态生成
export const dynamic = 'force-static';

const BASE_URL = 'https://www.skillxm.cn';

// 支持的语言列表
const SUPPORTED_LOCALES = locales; // ['zh', 'en', 'ja', 'ko']

// 生成所有语言版本的 URL
function generateLocalizedUrls(path: string): { locale: string; url: string }[] {
  return SUPPORTED_LOCALES.map(locale => ({
    locale,
    url: locale === defaultLocale 
      ? `${BASE_URL}${path}` 
      : `${BASE_URL}/${locale}${path}`,
  }));
}

// 生成单个页面的 sitemap 条目（包含所有语言版本）
function generateSitemapEntry(
  path: string,
  options: {
    lastModified: string;
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    priority: number;
  }
): MetadataRoute.Sitemap {
  const localizedUrls = generateLocalizedUrls(path);
  
  return localizedUrls.map(({ locale, url }) => ({
    url,
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: generateHreflangAlternates(path),
    },
  }));
}

// 生成 hreflang 交替链接
function generateHreflangAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  
  SUPPORTED_LOCALES.forEach(locale => {
    const langCode = locale === 'zh' ? 'zh-CN' : locale;
    const url = locale === defaultLocale 
      ? `${BASE_URL}${path}` 
      : `${BASE_URL}/${locale}${path}`;
    alternates[langCode] = url;
  });
  
  // 添加 x-default
  alternates['x-default'] = `${BASE_URL}${path}`;
  
  return alternates;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split('T')[0];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 首页 - 所有语言版本
  SUPPORTED_LOCALES.forEach(locale => {
    const url = locale === defaultLocale ? BASE_URL : `${BASE_URL}/${locale}/`;
    sitemapEntries.push({
      url,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          'zh-CN': `${BASE_URL}/`,
          'en': `${BASE_URL}/en/`,
          'ja': `${BASE_URL}/ja/`,
          'ko': `${BASE_URL}/ko/`,
          'x-default': `${BASE_URL}/`,
        },
      },
    });
  });

  // 静态页面 - 所有语言版本
  const staticPaths = ['/about/', '/contact/', '/terms/', '/privacy/'];
  staticPaths.forEach(path => {
    SUPPORTED_LOCALES.forEach(locale => {
      const url = locale === defaultLocale 
        ? `${BASE_URL}${path}` 
        : `${BASE_URL}/${locale}${path}`;
      sitemapEntries.push({
        url,
        lastModified: path === '/about/' ? today : '2026-04-23',
        changeFrequency: 'monthly',
        priority: path === '/about/' ? 0.6 : 0.3,
        alternates: {
          languages: {
            'zh-CN': `${BASE_URL}${path}`,
            'en': `${BASE_URL}/en${path}`,
            'ja': `${BASE_URL}/ja${path}`,
            'ko': `${BASE_URL}/ko${path}`,
            'x-default': `${BASE_URL}${path}`,
          },
        },
      });
    });
  });

  // 博客首页 - 所有语言版本
  SUPPORTED_LOCALES.forEach(locale => {
    const url = locale === defaultLocale 
      ? `${BASE_URL}/blog/` 
      : `${BASE_URL}/${locale}/blog/`;
    sitemapEntries.push({
      url,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'zh-CN': `${BASE_URL}/blog/`,
          'en': `${BASE_URL}/en/blog/`,
          'ja': `${BASE_URL}/ja/blog/`,
          'ko': `${BASE_URL}/ko/blog/`,
          'x-default': `${BASE_URL}/blog/`,
        },
      },
    });
  });

  // 工具页面 - 所有语言版本
  TOOLS.filter(t => t.active).forEach(tool => {
    SUPPORTED_LOCALES.forEach(locale => {
      const url = locale === defaultLocale 
        ? `${BASE_URL}${tool.path}/` 
        : `${BASE_URL}/${locale}${tool.path}/`;
      sitemapEntries.push({
        url,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: tool.priority || 0.8,
        alternates: {
          languages: {
            'zh-CN': `${BASE_URL}${tool.path}/`,
            'en': `${BASE_URL}/en${tool.path}/`,
            'ja': `${BASE_URL}/ja${tool.path}/`,
            'ko': `${BASE_URL}/ko${tool.path}/`,
            'x-default': `${BASE_URL}${tool.path}/`,
          },
        },
      });
    });
  });

  // 博客文章 - 所有语言版本
  articles.forEach(article => {
    SUPPORTED_LOCALES.forEach(locale => {
      const url = locale === defaultLocale 
        ? `${BASE_URL}/blog/${article.id}/` 
        : `${BASE_URL}/${locale}/blog/${article.id}/`;
      sitemapEntries.push({
        url,
        lastModified: article.date,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            'zh-CN': `${BASE_URL}/blog/${article.id}/`,
            'en': `${BASE_URL}/en/blog/${article.id}/`,
            'ja': `${BASE_URL}/ja/blog/${article.id}/`,
            'ko': `${BASE_URL}/ko/blog/${article.id}/`,
            'x-default': `${BASE_URL}/blog/${article.id}/`,
          },
        },
      });
    });
  });

  // 博客分类页面 - 所有语言版本
  categories
    .filter(c => c !== '全部')
    .forEach(cat => {
      SUPPORTED_LOCALES.forEach(locale => {
        const url = locale === defaultLocale 
          ? `${BASE_URL}/blog/category/${cat}/` 
          : `${BASE_URL}/${locale}/blog/category/${cat}/`;
        sitemapEntries.push({
          url,
          lastModified: today,
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: {
            languages: {
              'zh-CN': `${BASE_URL}/blog/category/${cat}/`,
              'en': `${BASE_URL}/en/blog/category/${cat}/`,
              'ja': `${BASE_URL}/ja/blog/category/${cat}/`,
              'ko': `${BASE_URL}/ko/blog/category/${cat}/`,
              'x-default': `${BASE_URL}/blog/category/${cat}/`,
            },
          },
        });
      });
    });

  return sitemapEntries;
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
