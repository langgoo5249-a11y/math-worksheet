import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute:
      'Free Chinese Learning Tools - Pinyin, Stroke Order, HSK | SkillXM',
  },
  description:
    'Explore six free online tools for learning Mandarin Chinese: a pinyin converter, stroke order practice, HSK 1-6 flashcards, a tone trainer, a graded reading reader and a radical explorer. No registration required.',
  keywords:
    'Chinese learning tools, pinyin converter, stroke order practice, HSK flashcards, Mandarin tone trainer, Chinese reading reader, radical explorer, learn Chinese free, free Mandarin tools',
  alternates: {
    canonical: 'https://www.skillxm.cn/en/tools/',
    languages: {
      'zh-CN': 'https://www.skillxm.cn/tools/',
      en: 'https://www.skillxm.cn/en/tools/',
      'x-default': 'https://www.skillxm.cn/tools/',
    },
  },
  openGraph: {
    title:
      'Free Chinese Learning Tools - Pinyin, Stroke Order, HSK | SkillXM',
    description:
      'Six free online tools for learning Mandarin Chinese: pinyin converter, stroke order practice, HSK flashcards, tone trainer, graded reader and radical explorer.',
    url: 'https://www.skillxm.cn/en/tools/',
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

const tools = [
  {
    name: 'Pinyin Converter',
    nameZh: '拼音转换器',
    href: '/en/tools/pinyin-converter/',
    emoji: '🔤',
    description: 'Convert Chinese text to pinyin with tone marks.',
    accent: 'from-red-700 to-rose-900',
  },
  {
    name: 'Stroke Order Practice',
    nameZh: '笔顺练习',
    href: '/en/tools/stroke-order/',
    emoji: '🖌️',
    description: 'Learn Chinese character stroke order with animations.',
    accent: 'from-amber-700 to-yellow-900',
  },
  {
    name: 'HSK Flashcards',
    nameZh: 'HSK词汇卡',
    href: '/en/tools/hsk-flashcards/',
    emoji: '🗂️',
    description: 'Practice HSK 1-6 vocabulary with spaced repetition.',
    accent: 'from-rose-700 to-red-950',
  },
  {
    name: 'Tone Trainer',
    nameZh: '声调训练',
    href: '/en/tools/tone-trainer/',
    emoji: '🎵',
    description: 'Master the four Mandarin tones with audio.',
    accent: 'from-yellow-600 to-amber-900',
  },
  {
    name: 'Chinese Reading Reader',
    nameZh: '中文阅读器',
    href: '/en/tools/reading-reader/',
    emoji: '📖',
    description: 'Graded reading with pinyin annotation.',
    accent: 'from-red-800 to-rose-950',
  },
  {
    name: 'Radical Explorer',
    nameZh: '部首探索',
    href: '/en/tools/radical-explorer/',
    emoji: '🧩',
    description: 'Decompose characters into radicals.',
    accent: 'from-amber-600 to-red-900',
  },
];

export default function EnglishToolsPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://www.skillxm.cn/en/tools/#tools',
    name: 'Free Chinese Learning Tools',
    description:
      'Six free online tools for learning Mandarin Chinese: pinyin converter, stroke order practice, HSK flashcards, tone trainer, graded reader and radical explorer.',
    inLanguage: 'en',
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      description: tool.description,
      url: `https://www.skillxm.cn${tool.href}`,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
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
        name: 'Tools',
        item: 'https://www.skillxm.cn/en/tools/',
      },
    ],
  };

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        {/* Deep red palace background */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, #C41E3A 0%, #8B0000 35%, #3d0606 70%, #1a0808 100%)',
          }}
        />
        {/* Gold cloud pattern overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 40c0-6 4-10 10-10s10 4 10 10c0-6 4-10 10-10s10 4 10 10M20 40c0 6 4 10 10 10s10-4 10-10c0 6 4 10 10 10s10-4 10-10' stroke='%23FFD700' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
            backgroundSize: '80px 80px',
          }}
        />
        {/* Glowing lanterns */}
        <div
          aria-hidden="true"
          className="absolute top-10 left-[10%] w-32 h-32 rounded-full opacity-25 blur-2xl"
          style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute top-16 right-[12%] w-40 h-40 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }}
        />

        {/* Gold border frame */}
        <div
          aria-hidden="true"
          className="absolute inset-x-4 sm:inset-x-8 top-6 bottom-6 border border-[#D4AF37]/30 rounded-[6px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-5 sm:inset-x-10 top-8 bottom-8 border border-[#D4AF37]/20 rounded-[3px]"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-20 sm:pt-24 sm:pb-24 text-center">
          {/* Seal stamp */}
          <div className="flex justify-center mb-7">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-2xl font-bold text-[#F5F0E8] rotate-3 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 100%)',
                border: '2px solid #D4AF37',
                borderRadius: '4px',
                boxShadow:
                  '0 0 0 1px #8B0000, 0 0 20px rgba(212,175,55,0.4), inset 0 0 12px rgba(0,0,0,0.4)',
              }}
              aria-hidden="true"
            >
              器
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
            学习工具
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F5F0E8] tracking-tight mb-5 drop-shadow-2xl">
            Free Chinese{' '}
            <span
              style={{
                background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Learning Tools
            </span>
          </h1>

          {/* Ornamental divider */}
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
            Six focused tools to practise every core Mandarin skill — pinyin,
            stroke order, HSK vocabulary, tones, reading and radicals. All free,
            with no sign-up required.
          </p>

          {/* Language switcher */}
          <div className="inline-flex items-center gap-3 text-sm">
            <span className="text-[#F5F0E8]/60">Language:</span>
            <span className="text-[#FFD700] font-semibold px-2.5 py-0.5 rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/10">
              English
            </span>
            <Link
              href="https://www.skillxm.cn/tools/"
              className="text-[#F5F0E8]/80 hover:text-[#FFD700] transition-colors px-2.5 py-0.5 rounded-full border border-transparent hover:border-[#D4AF37]/50"
            >
              中文
            </Link>
          </div>
        </div>

        {/* Bottom ink-wash fade */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-24"
          style={{ background: 'linear-gradient(180deg, transparent, #1a0808)' }}
        />
      </section>

      {/* ===== Tools grid ===== */}
      <section className="relative py-20 px-4 sm:px-6 bg-[#1a0808]">
        {/* Subtle rice paper texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23F5F0E8'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">
              Six Practice Tools
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F0E8] mt-3 mb-4">
              Choose a Tool to{' '}
              <span className="text-[#FFD700]">Start Practising</span>
            </h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto">
              Each tool targets one core skill so you can study deliberately,
              from your first pinyin syllable to advanced HSK 6 reading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
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
                  {/* Icon medallion */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 bg-gradient-to-br ${tool.accent} shadow-lg group-hover:scale-110 transition-transform`}
                    style={{ border: '1px solid rgba(212,175,55,0.4)' }}
                  >
                    <span aria-hidden="true">{tool.emoji}</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                    <h3 className="text-xl font-bold text-[#F5F0E8] group-hover:text-[#FFD700] transition-colors">
                      {tool.name}
                    </h3>
                    <span className="text-sm text-[#D4AF37]/80 font-medium">
                      {tool.nameZh}
                    </span>
                  </div>

                  <p className="text-sm text-[#F5F0E8]/65 leading-relaxed mb-5">
                    {tool.description}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#FFD700] group-hover:gap-3 transition-all">
                    Open tool
                    <span aria-hidden="true">→</span>
                  </span>
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
        </div>
      </section>

      {/* ===== SEO content section ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#F5F0E8] text-[#1a1a1a]">
        {/* Top gold border */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-1.5"
          style={{
            background:
              'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="text-[#C41E3A] text-sm font-medium tracking-[0.3em] uppercase">
            All Tools, Zero Cost
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 mb-5">
            One Toolkit for the Whole Mandarin Journey
          </h2>
          <p className="text-[#1a1a1a]/75 leading-relaxed text-base sm:text-lg">
            These six free tools cover the full path from absolute beginner to
            advanced reader. Start with the{' '}
            <Link
              href="/en/tools/pinyin-converter/"
              className="text-[#8B0000] font-semibold hover:underline"
            >
              Pinyin Converter
            </Link>{' '}
            and{' '}
            <Link
              href="/en/tools/tone-trainer/"
              className="text-[#8B0000] font-semibold hover:underline"
            >
              Tone Trainer
            </Link>{' '}
            to build pronunciation, learn characters with{' '}
            <Link
              href="/en/tools/stroke-order/"
              className="text-[#8B0000] font-semibold hover:underline"
            >
              Stroke Order
            </Link>{' '}
            and the{' '}
            <Link
              href="/en/tools/radical-explorer/"
              className="text-[#8B0000] font-semibold hover:underline"
            >
              Radical Explorer
            </Link>
            , then grow your vocabulary and reading with{' '}
            <Link
              href="/en/tools/hsk-flashcards/"
              className="text-[#8B0000] font-semibold hover:underline"
            >
              HSK Flashcards
            </Link>{' '}
            and the{' '}
            <Link
              href="/en/tools/reading-reader/"
              className="text-[#8B0000] font-semibold hover:underline"
            >
              Reading Reader
            </Link>
            . No accounts, no fees — just open a tool and practise.
          </p>

          {/* Keyword chips */}
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            {[
              'free Chinese tools',
              'pinyin converter',
              'stroke order',
              'HSK flashcards',
              'Mandarin tones',
              'graded reader',
              'Chinese radicals',
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

        {/* Bottom gold border */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-1.5"
          style={{
            background:
              'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)',
          }}
        />
      </section>

      {/* ===== JSON-LD structured data ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
