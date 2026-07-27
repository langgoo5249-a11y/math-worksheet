import { Metadata } from 'next';
import Link from 'next/link';
import { enArticles, enCategories } from '../../data';
import type { EnCategory } from '../../data';

const BASE_URL = 'https://www.example.com';

// Category SEO configuration
const categorySEOConfig: Record<string, {
  keywords: string[];
  topics: string;
  ability: string;
}> = {
  'Getting Started': {
    keywords: ['learn Chinese for beginners', 'how to learn Chinese', 'Chinese beginner guide', 'start learning Mandarin', 'Chinese for beginners'],
    topics: 'pinyin basics, first characters, study schedules, and foundational Mandarin skills',
    ability: 'Beginner Chinese',
  },
  'Pronunciation': {
    keywords: ['Chinese tones', 'Mandarin pronunciation', 'pinyin chart', 'tone trainer', 'Chinese phonetics'],
    topics: 'tone mastery, pinyin accuracy, and pronunciation techniques',
    ability: 'Chinese Pronunciation',
  },
  'Vocabulary & Characters': {
    keywords: ['Chinese characters', 'learn hanzi', 'Chinese vocabulary', 'stroke order', 'Chinese radicals'],
    topics: 'character memorization, radical recognition, and vocabulary building',
    ability: 'Character & Vocabulary',
  },
  'HSK & Exams': {
    keywords: ['HSK preparation', 'HSK levels', 'Chinese proficiency test', 'HSK vocabulary', 'HSK exam tips'],
    topics: 'HSK level requirements, exam strategies, and study plans',
    ability: 'HSK Exam',
  },
  'Learning Tips': {
    keywords: ['Chinese learning tips', 'Mandarin study strategies', 'best Chinese resources', 'Chinese learning tools', 'learn Chinese online'],
    topics: 'effective study methods, resource recommendations, and learning strategies',
    ability: 'Chinese Learning',
  },
};

const categoryColors: Record<string, string> = {
  'Getting Started': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Pronunciation': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Vocabulary & Characters': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'HSK & Exams': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Learning Tips': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

// Exclude 'All' from category list
const categoryList = enCategories.filter(c => c !== 'All');

export function generateStaticParams() {
  return categoryList.map((category) => ({
    category: category,
  }));
}

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category) as EnCategory;

  // Validate category
  if (!(enCategories as readonly string[]).includes(decodedCategory) || decodedCategory === 'All') {
    return {
      title: 'Category Not Found - SkillXM',
      robots: { index: false, follow: true },
    };
  }

  const config = categorySEOConfig[decodedCategory] || {
    keywords: [],
    topics: 'Chinese learning topics',
    ability: 'Mandarin Chinese',
  };

  const categoryArticles = enArticles.filter(a => a.category === decodedCategory);
  const count = categoryArticles.length;
  const description = `SkillXM ${decodedCategory} category: ${count} original articles covering ${config.topics}. Practical guides and evidence-based strategies for ${config.ability}.`;

  return {
    title: `${decodedCategory} - Chinese Learning Guides | SkillXM`,
    description,
    keywords: config.keywords,
    alternates: {
      canonical: `${BASE_URL}/en/blog/category/${decodedCategory}/`,
    },
    openGraph: {
      title: `${decodedCategory} - Chinese Learning Guides | SkillXM`,
      description,
      type: 'website',
      url: `${BASE_URL}/en/blog/category/${decodedCategory}/`,
      siteName: 'SkillXM',
      locale: 'en_US',
    },
  };
}

export default async function EnCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category) as EnCategory;

  // Validate category
  const isValidCategory = (enCategories as readonly string[]).includes(decodedCategory) && decodedCategory !== 'All';

  if (!isValidCategory) {
    return (
      <main className="min-h-screen bg-[#1a0808] text-[#F5F0E8]">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-[#F5F0E8] mb-4">Category Not Found</h1>
          <p className="text-[#F5F0E8]/50 mb-8">The category you are looking for does not exist.</p>
          <Link
            href="/en/blog/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-[#1a0808]"
            style={{
              background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
            }}
          >
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const config = categorySEOConfig[decodedCategory] || {
    keywords: [],
    topics: 'Chinese learning topics',
    ability: 'Mandarin Chinese',
  };

  const categoryArticles = enArticles
    .filter(a => a.category === decodedCategory)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const count = categoryArticles.length;
  const description = `SkillXM ${decodedCategory} category: ${count} original articles covering ${config.topics}. Practical guides and evidence-based strategies for ${config.ability}.`;

  // JSON-LD CollectionPage
  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${decodedCategory} - Chinese Learning Guides | SkillXM`,
    description,
    url: `${BASE_URL}/en/blog/category/${decodedCategory}/`,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'SkillXM',
      url: `${BASE_URL}/en/`,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: count,
      itemListElement: categoryArticles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          name: article.title,
          description: article.description,
          url: `${BASE_URL}/en/blog/${article.id}/`,
          datePublished: article.date,
        },
      })),
    },
  };

  // JSON-LD BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/en/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${BASE_URL}/en/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: decodedCategory,
        item: `${BASE_URL}/en/blog/category/${decodedCategory}/`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-[#1a0808] text-[#F5F0E8]">
        {/* ===== Decorative top bar ===== */}
        <div
          aria-hidden="true"
          className="h-2 w-full"
          style={{
            background:
              'linear-gradient(90deg, #8B0000 0%, #C41E3A 25%, #D4AF37 50%, #C41E3A 75%, #8B0000 100%)',
          }}
        />

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[#F5F0E8]/50" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/en/" itemProp="item" className="hover:text-[#FFD700] transition-colors">
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-[#F5F0E8]/30" aria-hidden="true">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/en/blog/" itemProp="item" className="hover:text-[#FFD700] transition-colors">
                  <span itemProp="name">Blog</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className="text-[#F5F0E8]/30" aria-hidden="true">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" className="text-[#FFD700]">{decodedCategory}</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <header className="text-center mb-10">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${categoryColors[decodedCategory] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
              {decodedCategory}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F5F0E8] mb-4">{decodedCategory}</h1>
            <p className="text-[#F5F0E8]/60 text-lg max-w-2xl mx-auto">
              {count} original article{count !== 1 ? 's' : ''} with practical {decodedCategory.toLowerCase()} guides and strategies
            </p>
          </header>

          {/* sr-only SEO text block */}
          <div className="sr-only">
            <h2>{decodedCategory} Article List</h2>
            <p>{description}</p>
            <p>Keywords: {config.keywords.join(', ')}</p>
            <ul>
              {categoryArticles.map((article) => (
                <li key={article.id}>
                  {article.title} - {article.description} - Published: {article.date} - Read time: {article.readTime}
                </li>
              ))}
            </ul>
          </div>

          {/* Article Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryArticles.map((article) => (
              <Link
                key={article.id}
                href={`/en/blog/${article.id}/`}
                className="group relative block rounded-2xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(60,10,10,0.9) 0%, rgba(26,8,8,0.95) 100%)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                }}
              >
                {/* Gold corner ornaments */}
                <span
                  aria-hidden="true"
                  className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#D4AF37]/50 rounded-tl"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#D4AF37]/50 rounded-tr"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#D4AF37]/50 rounded-bl"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#D4AF37]/50 rounded-br"
                />

                <div className="p-7">
                  {/* Category badge + date */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[article.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}
                    >
                      {article.category}
                    </span>
                    <span className="text-xs text-[#F5F0E8]/40">{article.date}</span>
                  </div>

                  <h2 className="text-lg font-bold text-[#F5F0E8] group-hover:text-[#FFD700] transition-colors mb-3 leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-sm text-[#F5F0E8]/60 leading-relaxed mb-5 line-clamp-3">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#F5F0E8]/40">
                      {article.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#FFD700] group-hover:gap-3 transition-all">
                      Read more
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>

                {/* Hover gold sheen */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(120deg, transparent 40%, rgba(255,215,0,0.06) 50%, transparent 60%)',
                  }}
                />
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {categoryArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#F5F0E8]/50 text-lg">No articles in this category yet.</p>
            </div>
          )}

          {/* Other Categories - internal links */}
          <div className="mt-16 pt-10 border-t border-[#D4AF37]/20">
            <h2 className="text-xl font-bold text-[#F5F0E8] mb-6">Browse Other Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categoryList
                .filter(c => c !== decodedCategory)
                .map((cat) => {
                  const catCount = enArticles.filter(a => a.category === cat).length;
                  return (
                    <Link
                      key={cat}
                      href={`/en/blog/category/${cat}`}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all hover:scale-105 ${categoryColors[cat] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}
                    >
                      {cat} ({catCount})
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-10 text-center">
            <Link
              href="/en/blog/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-[#FFD700] border border-[#D4AF37]/50 hover:border-[#FFD700] hover:bg-[#D4AF37]/10 transition-colors"
            >
              <span aria-hidden="true">←</span>
              Back to All Articles
            </Link>
          </div>
        </div>

        {/* ===== Footer ===== */}
        <footer className="border-t border-[#D4AF37]/20 py-8 px-4 mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-[#F5F0E8]/50 mb-4">
              <Link href="/en/" className="hover:text-[#FFD700] transition-colors">Home</Link>
              <span className="text-[#F5F0E8]/20">|</span>
              <Link href="/en/blog/" className="hover:text-[#FFD700] transition-colors">Blog</Link>
              <span className="text-[#F5F0E8]/20">|</span>
              <Link href="https://www.example.com/privacy/" className="hover:text-[#FFD700] transition-colors">Privacy</Link>
              <span className="text-[#F5F0E8]/20">|</span>
              <Link href="https://www.example.com/terms/" className="hover:text-[#FFD700] transition-colors">Terms</Link>
            </div>
            <div className="text-center text-[#F5F0E8]/30 text-sm">
              &copy; {new Date().getFullYear()} SkillXM. Learn Chinese Free.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}