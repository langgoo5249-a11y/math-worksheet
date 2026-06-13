import { notFound } from 'next/navigation';
import { articles, defaultAuthor } from '../data';
import type { Metadata } from 'next';
import BlogPostPage from '../_components/BlogPostPage';

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.id }));
}

// 为每篇文章生成独特的og:image
function generateOgImage(article: { title: string; category: string; id: string }): string {
  // 使用动态OG图片生成服务
  // 这里使用placeholder服务，实际部署时可替换为自定义图片生成服务
  const encodedTitle = encodeURIComponent(article.title.slice(0, 50));
  return `https://og.skillxm.cn/api/og?title=${encodedTitle}&category=${encodeURIComponent(article.category)}&id=${article.id}`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(a => a.id === slug);
  if (!article) return { title: '文章未找到' };
  
  // 为每篇文章生成独特的og:image
  const ogImage = generateOgImage(article);
  
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
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: ['练学宝'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
          type: 'image/png',
        },
        // 备用默认图片
        {
          url: 'https://www.skillxm.cn/og-image.jpg',
          width: 1200,
          height: 630,
          alt: '练学宝',
        },
      ],
      siteName: '练学宝',
      locale: 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImage],
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
    "dateModified": article.date,
    "image": generateOgImage(article),
    "author": {
      "@type": "Person",
      "name": article.author?.name || defaultAuthor.name,
      "description": article.author?.bio || defaultAuthor.bio,
      "url": "https://www.skillxm.cn/about"
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
    "wordCount": article.content.length,
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
          "item": "https://www.skillxm.cn/blog/${article.id}/"
        }
      ]
    };
  }

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
