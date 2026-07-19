import { notFound } from 'next/navigation';
import { articles, defaultAuthor } from '../../../blog/data';
import type { Metadata } from 'next';
import BlogPostPageClient from './BlogPostPageClient';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

export function generateStaticParams() {
  // 仅生成中文版本（zh）的静态页面。
  // 英文博客由 app/en/blog/[slug]/page.tsx 独立处理，拥有独立的数据源和设计。
  // 日文/韩文版本暂不生成，避免生成大量 404 页面浪费抓取预算。
  return articles.map(a => ({ slug: a.id, locale: 'zh' as const }));
}

// 为每篇文章生成独特的og:image
function generateOgImage(article: { title: string; category: string; id: string }): string {
  const encodedTitle = encodeURIComponent(article.title.slice(0, 50));
  return `https://og.skillxm.cn/api/og?title=${encodedTitle}&category=${encodeURIComponent(article.category)}&id=${article.id}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = articles.find(a => a.id === slug);
  const t = await getTranslations({ locale, namespace: 'blog' });

  if (!article) {
    return {
      title: t('articleNotFound'),
    };
  }

  const ogImage = generateOgImage(article);
  const siteName = t('siteName');

  // 非中文版本的博客文章内容未翻译，使用 noindex 避免被搜索引擎判定为低质量内容
  const isNonZh = locale !== 'zh';

  return {
    title: `${article.title} | ${siteName}`,
    description: article.description,
    authors: [{ name: siteName }],
    keywords: article.keywords || [article.category, t('keywords.primary'), t('keywords.secondary'), t('keywords.tertiary')],
    // 非中文版本不索引，避免低质量内容判定
    robots: isNonZh ? { index: false, follow: true } : undefined,
    alternates: isNonZh ? undefined : {
      canonical: `https://www.skillxm.cn/blog/${slug}/`,
      languages: {
        'zh-CN': `https://www.skillxm.cn/blog/${slug}/`,
        'x-default': `https://www.skillxm.cn/blog/${slug}/`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.dateModified || article.date,
      authors: [siteName],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
          type: 'image/png',
        },
        {
          url: 'https://www.skillxm.cn/og-image.jpg',
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
      siteName: siteName,
      locale: locale === 'zh' ? 'zh_CN' : locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug, locale } = await params;
  const article = articles.find(a => a.id === slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });
  const siteName = t('siteName');

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.date,
    "dateModified": article.dateModified || article.date,
    "image": generateOgImage(article),
    "author": {
      "@type": "Person",
      "name": article.author?.name || defaultAuthor.name,
      "description": article.author?.bio || defaultAuthor.bio,
      "url": `https://www.skillxm.cn/${locale === 'zh' ? '' : locale + '/'}about/`
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": "https://www.skillxm.cn/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.skillxm.cn/favicon.svg",
        "width": 512,
        "height": 512
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.skillxm.cn/blog/${article.id}/`
    },
    "articleSection": article.category,
    "wordCount": article.content?.length || 0,
    "inLanguage": locale === 'zh' ? 'zh-CN' : locale,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": siteName,
        "item": "https://www.skillxm.cn/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('nav.blog'),
        "item": `https://www.skillxm.cn/${locale === 'zh' ? '' : locale + '/'}blog/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://www.skillxm.cn/blog/${article.id}/`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />
      <BlogPostPageClient slug={slug} locale={locale} />
    </>
  );
}
