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
    authors: [{ name: '练学宝' }],
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
      authors: ['练学宝'],
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
    "headline": article.title,
    "description": article.description,
    "datePublished": article.date,
    "dateModified": article.dateModified || article.date,
    "image": "https://www.skillxm.cn/og-image.jpg",
    "inLanguage": "zh-CN",
    "isAccessibleForFree": true,
    "author": {
      "@type": "Person",
      "name": article.author?.name || defaultAuthor.name,
      "description": article.author?.credentials || article.author?.bio || defaultAuthor.bio,
      "jobTitle": article.author?.title || defaultAuthor.title,
      "url": "https://www.skillxm.cn/about/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "练学宝",
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
    "articleBody": article.content || "",
    "wordCount": article.content ? (article.content.match(/[\u4e00-\u9fff]/g) || []).length : 0,
    "keywords": article.keywords?.join(',') || article.category,
    "about": {
      "@type": "Thing",
      "name": article.category,
      "description": article.description
    },
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
    "license": "https://www.skillxm.cn/",
    "acquireLicensePage": "https://www.skillxm.cn/contact/",
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
