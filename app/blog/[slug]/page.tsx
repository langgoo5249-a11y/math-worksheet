import { notFound } from 'next/navigation';
import { articles, defaultAuthor } from '../data';
import type { Metadata } from 'next';
import BlogPostPage from '../_components/BlogPostPage';

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(a => a.id === slug);
  if (!article) return { title: '文章未找到' };
  
  return {
    title: `${article.title} | 练学宝`,
    description: article.description,
    authors: [{ name: article.author?.name || defaultAuthor.name }],
    keywords: article.keywords || [article.category, '小学教育', '学习方法', '家长辅导'],
    alternates: {
      canonical: `https://www.skillxm.cn/blog/${slug}/`,
      languages: {
        "zh-CN": `https://www.skillxm.cn/blog/${slug}/`,
        "x-default": `https://www.skillxm.cn/blog/${slug}/`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://www.skillxm.cn/blog/${slug}/`,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.dateModified || article.date,
      authors: [article.author?.name || defaultAuthor.name],
      images: [
        {
          url: 'https://www.skillxm.cn/og-image.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      siteName: '练学宝',
      locale: 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: ['https://www.skillxm.cn/og-image.jpg'],
    },
    other: {
      'article:tag': article.keywords?.join(',') || [article.category, '小学教育', '学习方法', '家长辅导'].join(','),
      'datePublished': article.date,
      'date': article.dateModified || article.date,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find(a => a.id === slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://www.skillxm.cn/blog/${article.id}/#article`,
    "headline": article.title,
    "description": article.description,
    "datePublished": article.date,
    "dateModified": article.dateModified || article.date,
    "image": "https://www.skillxm.cn/og-image.jpg",
    "inLanguage": "zh-CN",
    "isAccessibleForFree": true,
    "author": {
      "@id": "https://www.skillxm.cn/#person-chenlaoshi"
    },
    "reviewedBy": {
      "@id": "https://www.skillxm.cn/#person-chenlaoshi"
    },
    "publisher": {
      "@id": "https://www.skillxm.cn/#organization"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.skillxm.cn/blog/${article.id}/`
    },
    "articleSection": article.category,
    "articleBody": article.content || "",
    "wordCount": article.content ? (article.content.match(/[\u4e00-\u9fff]/g) || []).length + (article.content.match(/[a-zA-Z]+/g) || []).length : 0,
    "keywords": article.keywords?.join(',') || article.category,
    "about": {
      "@type": "Thing",
      "name": article.category,
      "description": article.description
    },
    ...(article.definitions && article.definitions.length > 0 ? {
      "mentions": article.definitions.map((def: { term: string; definition: string }) => ({
        "@type": "DefinedTerm",
        "name": def.term,
        "description": def.definition,
        "termCode": "skillxm-" + def.term,
        "inDefinedTermSet": {
          "@type": "DefinedTermSet",
          "name": article.title + " | 核心概念",
          "url": "https://www.skillxm.cn/blog/" + article.id + "/"
        }
      }))
    } : {}),
    ...(article.citations && article.citations.length > 0 ? {
      "citation": article.citations.map(c => ({
        "@type": "CreativeWork",
        "name": c
      }))
    } : {}),
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".summary", "h2"]
    },
    "license": "https://www.skillxm.cn/terms/",
    "acquireLicensePage": "https://www.skillxm.cn/terms/",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "练学宝",
        "item": "https://www.skillxm.cn/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "知识分享",
        "item": "https://www.skillxm.cn/blog/"
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
      <BlogPostPage slug={slug} />

      </>
  );
}
