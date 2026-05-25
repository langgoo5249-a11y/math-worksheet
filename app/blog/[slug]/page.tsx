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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostPage slug={slug} />

      {/* ===== 微信小程序浮动二维码 ===== */}
      <div className="fixed right-4 bottom-24 z-50 group" id="miniapp-float">
        <div className="relative">
          {/* 展开的二维码卡片 */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white rounded-2xl shadow-2xl p-4 w-52 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📱</span>
                <span className="text-sm font-bold text-gray-800">微信小程序使用</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-2 mb-2">
                <img src="/miniapp-qrcode.jpg" alt="微信小程序二维码" className="w-full h-auto rounded-lg" />
              </div>
              <p className="text-xs text-gray-500 text-center">微信扫码 → 即刻使用</p>
            </div>
            {/* 小三角 */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
          </div>
          {/* 浮动按钮 */}
          <div className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-xl">
            <span className="text-white text-xl">📱</span>
          </div>
        </div>
      </div>
    </>
  );
}
