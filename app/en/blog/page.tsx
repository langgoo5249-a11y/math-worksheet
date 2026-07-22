import Link from 'next/link';
import type { Metadata } from 'next';
import { enArticles, enCategories } from './data';
import EnBlogPageClient from './EnBlogPageClient';

export const metadata: Metadata = {
  title: 'Chinese Learning Blog - Guides, Tips & Strategies | SkillXM',
  description:
    'Free Chinese learning guides, tips, and strategies for Mandarin learners. Articles on pinyin, tones, HSK, characters, pronunciation, and the best free resources. Updated for 2026.',
  keywords:
    'Chinese learning blog, learn Chinese guide, Mandarin tips, Chinese language blog, HSK guide, Chinese characters guide, Chinese pronunciation, free Chinese resources',
  alternates: {
    canonical: 'https://www.skillxm.cn/en/blog/',
    languages: {
      'zh-CN': 'https://www.skillxm.cn/blog/',
      en: 'https://www.skillxm.cn/en/blog/',
      'x-default': 'https://www.skillxm.cn/blog/',
    },
  },
  openGraph: {
    title: 'Chinese Learning Blog - Guides, Tips & Strategies | SkillXM',
    description:
      'Free Chinese learning guides, tips, and strategies for Mandarin learners.',
    url: 'https://www.skillxm.cn/en/blog/',
    siteName: 'SkillXM',
    locale: 'en_US',
    type: 'website',
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

const sortedArticles = [...enArticles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function EnBlogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': 'https://www.skillxm.cn/en/blog/#blog',
        name: 'SkillXM Chinese Learning Blog',
        description:
          'Free Chinese learning guides, tips, and strategies for Mandarin learners.',
        url: 'https://www.skillxm.cn/en/blog/',
        inLanguage: 'en',
        publisher: {
          '@id': 'https://www.skillxm.cn/#organization',
        },
        blogPost: sortedArticles.map((a) => ({
          '@type': 'BlogPosting',
          headline: a.title,
          description: a.description,
          url: `https://www.skillxm.cn/en/blog/${a.id}/`,
          datePublished: a.date,
          dateModified: a.dateModified || a.date,
          author: {
            '@id': 'https://www.skillxm.cn/#person-chenlaoshi',
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.skillxm.cn/en/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://www.skillxm.cn/en/blog/',
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#1a0808] text-[#F5F0E8]">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, #C41E3A 0%, #8B0000 35%, #3d0606 70%, #1a0808 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-4 sm:inset-x-8 top-6 bottom-6 border border-[#D4AF37]/30 rounded-[6px]"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-20 sm:pt-24 sm:pb-24 text-center">
          <div className="flex justify-center mb-7">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-2xl font-bold text-[#F5F0E8] -rotate-3 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 100%)',
                border: '2px solid #D4AF37',
                borderRadius: '4px',
                boxShadow:
                  '0 0 0 1px #8B0000, 0 0 20px rgba(212,175,55,0.4), inset 0 0 12px rgba(0,0,0,0.4)',
              }}
              aria-hidden="true"
            >
              文
            </div>
          </div>
          <p
            className="text-5xl sm:text-7xl font-bold mb-4 tracking-[0.15em] select-none"
            style={{
              background:
                'linear-gradient(180deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
            }}
            aria-hidden="true"
          >
            学习博客
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F5F0E8] tracking-tight mb-5 drop-shadow-2xl">
            Chinese Learning{' '}
            <span
              style={{
                background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Blog
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span
              className="h-px w-16 sm:w-24"
              style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }}
              aria-hidden="true"
            />
            <span className="text-[#D4AF37] text-lg" aria-hidden="true">
              ❖
            </span>
            <span
              className="h-px w-16 sm:w-24"
              style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }}
              aria-hidden="true"
            />
          </div>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 max-w-2xl mx-auto mb-8 leading-relaxed">
            In-depth guides, evidence-based strategies, and practical tips for
            learning Mandarin Chinese. From your first pinyin syllable to HSK 6
            fluency — all free, all original.
          </p>
          <div className="inline-flex items-center gap-3 text-sm">
            <Link
              href="/en/tools/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-[#1a0808]"
              style={{
                background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
              }}
            >
              <span aria-hidden="true">←</span> Explore Tools
            </Link>
            <Link
              href="/en/"
              className="px-6 py-2.5 rounded-full font-medium text-[#FFD700] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-24"
          style={{ background: 'linear-gradient(180deg, transparent, #1a0808)' }}
        />
      </section>

      {/* ===== Articles grid ===== */}
      <EnBlogPageClient articles={sortedArticles} categories={enCategories} />

      {/* ===== SEO content ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#F5F0E8] text-[#1a1a1a]">
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-1.5"
          style={{
            background:
              'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-[#C41E3A] text-sm font-medium tracking-[0.3em] uppercase">
            Learning Hub
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 mb-6">
            Your Complete Chinese Learning Resource Center
          </h2>
          <div className="space-y-5 text-[#1a1a1a]/80 leading-relaxed text-base sm:text-lg">
            <p>
              The SkillXM Chinese Learning Blog publishes original, in-depth
              guides covering every aspect of Mandarin Chinese learning. Our
              articles are written by experienced Chinese language educators
              and backed by research in linguistics, cognitive science, and
              language pedagogy. Whether you are an absolute beginner wondering
              where to start, or an intermediate learner preparing for the HSK
              exam, our guides provide actionable strategies and free tools to
              accelerate your progress.
            </p>
            <p>
              Each article includes real data from authoritative sources — the
              Chinese Ministry of Education, the Confucius Institute, FSI, and
              peer-reviewed linguistics journals — so you can trust the
              information. Internal links connect you to our free{' '}
              <Link
                href="/en/tools/"
                className="text-[#8B0000] font-semibold hover:underline"
              >
                Chinese learning tools
              </Link>
              , and external links point to additional resources like the
              Chinese Grammar Wiki, Pleco dictionary, and official HSK
              materials.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              'Chinese learning blog',
              'learn Chinese guide',
              'Mandarin tips',
              'HSK preparation',
              'Chinese characters',
              'Chinese pronunciation',
              'free Chinese resources',
            ].map((kw) => (
              <span
                key={kw}
                className="px-3 py-1 text-xs font-medium rounded-full border border-[#8B0000]/25 text-[#8B0000] bg-[#8B0000]/5"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-1.5"
          style={{
            background:
              'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)',
          }}
        />
      </section>

      {/* ===== JSON-LD ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}