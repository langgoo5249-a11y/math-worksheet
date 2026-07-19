import Link from 'next/link';
import type { Metadata } from 'next';
import { enArticles } from '../data';
import EnBlogPostContent from '../EnBlogPostContent';

export function generateStaticParams() {
  return enArticles.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = enArticles.find((a) => a.id === slug);
  if (!article) return { title: 'Article Not Found' };

  const url = `https://www.skillxm.cn/en/blog/${slug}/`;

  return {
    title: `${article.title} | SkillXM`,
    description: article.description,
    keywords: article.keywords?.join(', '),
    alternates: {
      canonical: url,
      languages: {
        'zh-CN': 'https://www.skillxm.cn/blog/',
        en: url,
        'x-default': 'https://www.skillxm.cn/blog/',
      },
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url,
      siteName: 'SkillXM',
      locale: 'en_US',
      publishedTime: article.date,
      modifiedTime: article.dateModified || article.date,
      authors: [article.author?.name || 'Lin Yuan'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function EnBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = enArticles.find((a) => a.id === slug);

  if (!article) {
    return (
      <main className="min-h-screen bg-[#1a0808] text-[#F5F0E8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3">Article Not Found</h1>
          <Link href="/en/blog/" className="text-[#FFD700] hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const relatedArticles = enArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        url: `https://www.skillxm.cn/en/blog/${slug}/`,
        datePublished: article.date,
        dateModified: article.dateModified || article.date,
        ...(article.dateReviewed && { dateReviewed: article.dateReviewed }),
        author: {
          '@type': 'Person',
          name: article.author?.name || 'Lin Yuan',
          description: article.author?.bio,
          jobTitle: article.author?.title,
        },
        publisher: {
          '@type': 'Organization',
          name: 'SkillXM',
          url: 'https://www.skillxm.cn/',
          publishingPrinciples: 'https://www.skillxm.cn/editorial-policy/',
        },
        inLanguage: 'en',
        keywords: article.keywords?.join(', '),
        articleBody: article.content?.replace(/<[^>]*>/g, '').substring(0, 5000),
        ...(article.citations && {
          citation: article.citations,
        }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.skillxm.cn/en/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.skillxm.cn/en/blog/' },
          { '@type': 'ListItem', position: 3, name: article.title, item: `https://www.skillxm.cn/en/blog/${slug}/` },
        ],
      },
      ...(article.definitions
        ? article.definitions.map((d) => ({
            '@type': 'DefinedTerm',
            name: d.term,
            description: d.definition,
          }))
        : []),
    ],
  };

  return (
    <main className="min-h-screen bg-[#1a0808] text-[#F5F0E8]">
      {/* ===== Breadcrumb ===== */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 text-sm text-[#F5F0E8]/55"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/en/" className="hover:text-[#FFD700] transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#D4AF37]/50">/</li>
          <li>
            <Link href="/en/blog/" className="hover:text-[#FFD700] transition-colors">
              Blog
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#D4AF37]/50">/</li>
          <li className="text-[#FFD700] truncate max-w-[200px]">
            {article.title}
          </li>
        </ol>
      </nav>

      {/* ===== Article header ===== */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, #C41E3A 0%, #8B0000 35%, #3d0606 70%, #1a0808 100%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-14 pb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="px-3 py-0.5 rounded-full text-xs font-medium border border-[#D4AF37]/30 text-[#FFD700] bg-[#D4AF37]/10"
            >
              {article.category}
            </span>
            <span className="text-[#F5F0E8]/40 text-sm">{article.date}</span>
            <span className="text-[#F5F0E8]/40 text-sm">·</span>
            <span className="text-[#F5F0E8]/40 text-sm">{article.readTime}</span>
            {article.dateReviewed && (
              <>
                <span className="text-[#F5F0E8]/40 text-sm">·</span>
                <span className="text-[#F5F0E8]/40 text-sm">Reviewed: {article.dateReviewed}</span>
              </>
            )}
            {article.hasExclusiveContent && (
              <>
                <span className="text-[#F5F0E8]/40 text-sm">·</span>
                <span className="text-[#FFD700] text-sm">&#9670; Exclusive Content</span>
              </>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#F5F0E8] tracking-tight mb-4 leading-tight">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-[#F5F0E8]/65 max-w-3xl leading-relaxed">
            {article.description}
          </p>
          {article.author && (
            <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[#D4AF37]/15">
              <span
                className="w-10 h-10 flex items-center justify-center text-sm font-bold text-[#F5F0E8] rounded"
                style={{
                  background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 100%)',
                  border: '1px solid #D4AF37',
                }}
                aria-hidden="true"
              >
                {article.author.avatar}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#F5F0E8]">
                  {article.author.name}
                </p>
                <p className="text-xs text-[#F5F0E8]/50">{article.author.title}</p>
              </div>
            </div>
          )}
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-16"
          style={{ background: 'linear-gradient(180deg, transparent, #1a0808)' }}
        />
      </section>

      {/* ===== Article content ===== */}
      <EnBlogPostContent
        article={article}
        relatedArticles={relatedArticles}
      />

      {/* ===== Back to blog ===== */}
      <section className="relative py-14 px-4 sm:px-6 bg-[#0f0303]">
        <div className="max-w-3xl mx-auto text-center">
          <div
            aria-hidden="true"
            className="h-px w-full mb-8"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
            }}
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/en/blog/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-[#1a0808]"
              style={{
                background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
              }}
            >
              <span aria-hidden="true">←</span> All Articles
            </Link>
            <Link
              href="/en/tools/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-[#FFD700] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-colors"
            >
              Free Tools
            </Link>
            <Link
              href="/editorial-policy/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-[#FFD700] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-colors"
            >
              Editorial Policy
            </Link>
          </div>
        </div>
      </section>

      {/* ===== JSON-LD ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}