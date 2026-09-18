import { Metadata } from 'next';
import Link from 'next/link';
import { enArticles, enCategories } from '../../data';
import type { EnCategory } from '../../data';
import { DEFAULT_OG_IMAGE } from '@/lib/seoUtils';

const BASE_URL = 'https://www.skillxm.cn';

// Category SEO configuration
const categorySEOConfig: Record<string, {
  keywords: string[];
  topics: string;
  ability: string;
  intro: [string, string];
  faq: { q: string; a: string }[];
}> = {
  'Getting Started': {
    keywords: ['learn Chinese for beginners', 'how to learn Chinese', 'Chinese beginner guide', 'start learning Mandarin', 'Chinese for beginners'],
    topics: 'pinyin basics, first characters, study schedules, and foundational Mandarin skills',
    ability: 'Beginner Chinese',
    intro: [
      'Everyone starts Mandarin in the same place: pinyin, the four tones, and the first hundred characters. The mistake most beginners make is trying to do everything at once — memorising characters before their pronunciation is stable, or grinding grammar rules before they can read a syllable aloud. The guides in this category take the opposite approach: a small, ordered set of steps you can follow fifteen minutes a day, with clear milestones for the first month.',
      'You will learn how to set up a study routine that survives a busy schedule, which free tools to use at each stage, and how to tell real progress from the illusion of progress. Every recommendation links to a free tool on this site, so nothing here requires a purchase or an account.',
    ],
    faq: [
      {
        q: 'What should I learn first in Mandarin?',
        a: 'Pinyin and the four tones, before characters. Pinyin gives you a written form for every sound, so you can read and pronounce new words without a teacher. Spend the first two weeks with the Pinyin Chart and the Tone Trainer, then start characters. Learners who skip this step tend to fossilise pronunciation errors that take far longer to fix later.',
      },
      {
        q: 'How much time do I need each day?',
        a: 'Fifteen to twenty focused minutes daily beats a two-hour weekend session. Retention depends on spacing: five short sessions across a week produce measurably better recall than one long block. A workable beginner routine is ten minutes of tone drills, ten minutes of characters, and five minutes reviewing work from the previous day.',
      },
      {
        q: 'How long until I can hold a simple conversation?',
        a: 'Most self-directed learners who study consistently reach basic conversational ability — greetings, self-introduction, ordering food, asking directions — in three to six months with roughly 300 to 500 characters. Fluency, not perfection, is the goal at this stage; the fastest route is speaking from week one rather than waiting until you feel ready.',
      },
    ],
  },
  'Pronunciation': {
    keywords: ['Chinese tones', 'Mandarin pronunciation', 'pinyin chart', 'tone trainer', 'Chinese phonetics'],
    topics: 'tone mastery, pinyin accuracy, and pronunciation techniques',
    ability: 'Chinese Pronunciation',
    intro: [
      'Mandarin is a tonal language: the pitch pattern of a syllable is part of its meaning, so mā (mother), má (hemp), mǎ (horse) and mà (scold) are four different words. Pronunciation is therefore not a refinement you postpone — it is the foundation everything else sits on. These guides break the four tones plus the neutral tone into pitch contours you can hear, hum and compare, rather than abstract numbers to memorise.',
      'The most effective practice is short and frequent: drill tone pairs, listen to minimal contrasts, and record yourself. The free Tone Trainer and Pinyin Chart on this site exist exactly for this stage, and every guide here tells you which drill to run and for how long.',
    ],
    faq: [
      {
        q: 'How many tones does Mandarin have?',
        a: 'Four main tones plus a neutral tone. The first tone is high and flat (mā), the second rises (má), the third dips and then rises (mǎ), and the fourth falls sharply (mà). The neutral tone is short and unstressed, as in the second syllable of 妈妈 (māma). Every syllable carries one of these patterns, and changing the pattern changes the word.',
      },
      {
        q: 'Why do native speakers seem to ignore the third tone?',
        a: 'Because in natural speech a third tone followed by another third tone changes: the first one is spoken as a second tone. 你好 is written nǐ hǎo but pronounced ní hǎo. This tone sandhi rule also applies to 不 and 一. Learning it early makes your speech sound far more natural.',
      },
      {
        q: 'Can adults still learn correct tones?',
        a: 'Yes. Adults rarely reach a native-like accent, but accurate, comprehensible tones are achievable with deliberate practice: pitch-contour drills, minimal-pair listening, and recording yourself. The limiting factor is usually ear training rather than age, which is why short daily tone drills beat occasional long sessions.',
      },
    ],
  },
  'Vocabulary & Characters': {
    keywords: ['Chinese characters', 'learn hanzi', 'Chinese vocabulary', 'stroke order', 'Chinese radicals'],
    topics: 'character memorization, radical recognition, and vocabulary building',
    ability: 'Character & Vocabulary',
    intro: [
      'Chinese characters look like an impossible mountain — tens of thousands of them — until you learn two facts. First, the top 800 or so characters cover the large majority of everyday text, so a beginner\u2019s goal is small and finite. Second, characters are built from around 200 recurring components called radicals, which turn memorisation from raw recall into pattern recognition: 好 is not eleven random strokes, it is 女 (woman) beside 子 (child).',
      'The guides in this category cover how to build vocabulary with spaced repetition, how radicals speed up character learning, how to practise stroke order so your hand learns the correct shapes, and a documented case study of learning 800 characters in three months with free tools.',
    ],
    faq: [
      {
        q: 'How many characters do I need to read a newspaper?',
        a: 'Around 3,000 characters cover roughly 99 percent of running text in modern Chinese, and the 2,500 most frequent characters cover about 98 percent. Beginners should aim for 800 to 1,000 first, which already covers the majority of everyday writing. Frequency lists matter far more than total counts.',
      },
      {
        q: 'What are radicals and why do they matter?',
        a: 'Radicals are the recurring components that characters are built from, around 200 in total. 好 combines 女 (woman) and 子 (child); 妈 combines 女 with 马 (horse), which supplies the sound. Learning radicals turns memorisation into pattern recognition, which is why radical-based study consistently outperforms rote stroke memorisation.',
      },
      {
        q: 'Should I learn to write characters by hand?',
        a: 'Handwriting helps retention, but you do not need to write every character fluently. A practical compromise: learn stroke order for new characters, which also improves recognition, then move to typing and reading for volume. If your goal is reading and typing rather than calligraphy, recognition matters more than production.',
      },
    ],
  },
  'HSK & Exams': {
    keywords: ['HSK preparation', 'HSK levels', 'Chinese proficiency test', 'HSK vocabulary', 'HSK exam tips'],
    topics: 'HSK level requirements, exam strategies, and study plans',
    ability: 'HSK Exam',
    intro: [
      'The HSK (Hanyu Shuiping Kaoshi) is the standard Mandarin proficiency exam, running from HSK 1 (about 150 words) up to HSK 6 (about 5,000 words). Whatever level you target, preparation comes down to the same loop: learn words in context, test yourself at real exam difficulty, and read more than the exam requires so that exam day feels easy.',
      'These guides explain what each level actually demands, how to build an HSK study plan around spaced-repetition flashcards, and how to avoid the classic trap of recognising a word on a card but not in a sentence. Pair them with the free HSK Flashcards and the graded Reading Reader for daily practice.',
    ],
    faq: [
      {
        q: 'What are the HSK levels and their vocabulary requirements?',
        a: 'The HSK 2.0 scale runs from HSK 1 (about 150 words) to HSK 6 (5,000 words and above), with HSK 2 at 300, HSK 3 at 600, HSK 4 at 1,200 and HSK 5 at 2,500. Each level tests listening and reading, and from HSK 3 upward also writing. A revised HSK 3.0 standard with nine bands is being phased in, so check which version your target institution uses.',
      },
      {
        q: 'How long does it take to pass HSK 4?',
        a: 'From zero, most learners need roughly 12 to 18 months of consistent study for HSK 4 and its 1,200 words. If you already know about 600 words at HSK 3 level, allow four to six months. The variable that matters most is daily consistency with spaced repetition, not total hours.',
      },
      {
        q: 'Is the HSK certificate worth taking?',
        a: 'Yes, if you need it for a concrete purpose: university admission in China typically asks for HSK 4 to 6, and some employers request HSK 5. If you are learning purely out of interest the exam is optional, but the vocabulary targets still make a useful roadmap even without sitting the test.',
      },
    ],
  },
  'Learning Tips': {
    keywords: ['Chinese learning tips', 'Mandarin study strategies', 'best Chinese resources', 'Chinese learning tools', 'learn Chinese online'],
    topics: 'effective study methods, resource recommendations, and learning strategies',
    ability: 'Chinese Learning',
    intro: [
      'Most Mandarin learners do not fail from lack of talent — they fail from an unsustainable method: two-hour weekend sessions followed by silent weeks, apps opened in the wrong order, or grammar books read before the first conversation. The guides in this category collect study strategies that survive real life: short daily routines, deliberate practice on your weakest skill, and honest ways to measure progress.',
      'Everything here is free to apply and tool-agnostic. Each guide names the exact free tool or resource for the job, so you can assemble a study system that costs nothing and fits the time you actually have. If you are unsure where to begin, start with the Getting Started category, then return here once your routine is running.',
    ],
    faq: [
      {
        q: 'What is the biggest mistake Chinese learners make?',
        a: 'Studying without speaking. Many learners accumulate vocabulary for months before their first conversation, then find they cannot retrieve any of it under real-time pressure. Start speaking from the first week, even alone and even badly, and treat output as practice rather than performance.',
      },
      {
        q: 'How do I stay consistent when progress feels invisible?',
        a: 'Track input rather than feelings: characters known, minutes listened, consecutive days practised. Language progress is invisible day to day but measurable month to month. Keeping a simple log and reviewing it monthly is one of the most reliable motivators available.',
      },
      {
        q: 'Do I need to live in China to become fluent?',
        a: 'No. Immersion accelerates progress, but a disciplined self-study routine with graded reading, listening and speaking practice takes most learners to strong conversational fluency without leaving home. What immersion mainly adds is forced daily output, which you can replicate by scheduling regular conversations.',
      },
    ],
  },
};

const categoryColors: Record<string, string> = {
  'Getting Started': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Pronunciation': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Vocabulary & Characters': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'HSK & Exams': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Learning Tips': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

// Recommended free tools per category (visible internal links)
const categoryIntroTools: Record<string, { label: string; href: string }[]> = {
  'Getting Started': [
    { label: 'Pinyin Chart', href: '/en/tools/pinyin-chart/' },
    { label: 'Tone Trainer', href: '/en/tools/tone-trainer/' },
  ],
  'Pronunciation': [
    { label: 'Tone Trainer', href: '/en/tools/tone-trainer/' },
    { label: 'Pinyin Converter', href: '/en/tools/pinyin-converter/' },
  ],
  'Vocabulary & Characters': [
    { label: 'Radical Explorer', href: '/en/tools/radical-explorer/' },
    { label: 'Stroke Order Practice', href: '/en/tools/stroke-order/' },
  ],
  'HSK & Exams': [
    { label: 'HSK Flashcards', href: '/en/tools/hsk-flashcards/' },
    { label: 'Reading Reader', href: '/en/tools/reading-reader/' },
  ],
  'Learning Tips': [
    { label: 'All Free Tools', href: '/en/tools/' },
  ],
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
  // URL 段必须百分号编码（"&" -> %26、空格 -> %20），与 app/sitemap.ts 的写法逐字节一致。
  // 否则 canonical / og:url 会指向一个和 sitemap 不同的 URL 字符串 —— "&" 是合法的路径
  // 字符（sub-delim），Google 不会把 %26 与 & 归一化，会当作两个不同 URL。
  const categorySeg = encodeURIComponent(decodedCategory);

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
    intro: [] as string[],
    faq: [] as { q: string; a: string }[],
  };

  const categoryArticles = enArticles.filter(a => a.category === decodedCategory);
  const count = categoryArticles.length;
  const description = `SkillXM ${decodedCategory} category: ${count} original articles covering ${config.topics}. Practical guides and evidence-based strategies for ${config.ability}.`;

  return {
    // 品牌后缀由 app/en/layout.tsx 的 title.template 追加（P3-4：此处不再手写）
    title: `${decodedCategory} - Chinese Learning Guides`,
    description,
    keywords: config.keywords,
    alternates: {
      canonical: `${BASE_URL}/en/blog/category/${categorySeg}/`,
      languages: {
        en: `${BASE_URL}/en/blog/category/${categorySeg}/`,
        'x-default': `${BASE_URL}/en/blog/category/${categorySeg}/`,
      },
    },
    openGraph: {
      images: [DEFAULT_OG_IMAGE],
      title: `${decodedCategory} - Chinese Learning Guides | SkillXM`,
      description,
      type: 'website',
      url: `${BASE_URL}/en/blog/category/${categorySeg}/`,
      siteName: 'SkillXM',
      locale: 'en_US',
    },
  };
}

export default async function EnCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category) as EnCategory;
  // URL 段必须百分号编码（"&" -> %26、空格 -> %20），与 app/sitemap.ts 的写法逐字节一致。
  // 否则 canonical / og:url 会指向一个和 sitemap 不同的 URL 字符串 —— "&" 是合法的路径
  // 字符（sub-delim），Google 不会把 %26 与 & 归一化，会当作两个不同 URL。
  const categorySeg = encodeURIComponent(decodedCategory);

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
    intro: [] as string[],
    faq: [] as { q: string; a: string }[],
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
    url: `${BASE_URL}/en/blog/category/${categorySeg}/`,
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
        item: `${BASE_URL}/en/blog/category/${categorySeg}/`,
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
      {/* FAQPage must have matching visible content on the page (see the FAQ section below) */}
      {config.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: config.faq.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />
      )}

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

          {/* ===== Visible category intro (P7) ===== */}
          {config.intro.length > 0 && (
            <section className="mb-12 rounded-2xl border border-[#D4AF37]/25 bg-[#3d0606]/30 p-6 sm:p-8" aria-labelledby="category-intro-heading">
              <h2 id="category-intro-heading" className="text-xl font-bold text-[#F5F0E8] mb-4">
                About the {decodedCategory} Guides
              </h2>
              <div className="space-y-4">
                {config.intro.map((para, i) => (
                  <p key={i} className="text-[#F5F0E8]/75 text-sm sm:text-base leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              {(categoryIntroTools[decodedCategory] || []).length > 0 && (
                <div className="mt-6 pt-5 border-t border-[#D4AF37]/15">
                  <p className="text-sm text-[#F5F0E8]/50 mb-3">Recommended free tools:</p>
                  <div className="flex flex-wrap gap-3">
                    {(categoryIntroTools[decodedCategory] || []).map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        className="px-4 py-1.5 rounded-full text-sm font-medium text-[#FFD700] border border-[#D4AF37]/40 hover:border-[#FFD700] hover:bg-[#D4AF37]/10 transition-colors"
                      >
                        {t.label} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ===== Visible FAQ (P7 deep pass) — must stay visible while FAQPage JSON-LD exists ===== */}
          {config.faq.length > 0 && (
            <section className="mb-12" aria-labelledby="category-faq-heading">
              <h2 id="category-faq-heading" className="text-xl font-bold text-[#F5F0E8] mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {config.faq.map((f) => (
                  <div
                    key={f.q}
                    className="rounded-xl border border-[#D4AF37]/20 bg-[#3d0606]/25 p-5"
                  >
                    <h3 className="text-[#FFD700] font-semibold mb-2">{f.q}</h3>
                    <p className="text-[#F5F0E8]/75 text-sm sm:text-base leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

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
              <Link href="https://www.skillxm.cn/privacy/" className="hover:text-[#FFD700] transition-colors">Privacy</Link>
              <span className="text-[#F5F0E8]/20">|</span>
              <Link href="https://www.skillxm.cn/terms/" className="hover:text-[#FFD700] transition-colors">Terms</Link>
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