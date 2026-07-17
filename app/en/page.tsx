import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn Chinese Free - Pinyin, Stroke Order, HSK, Picture Learning | SkillXM',
  description:
    'Free online tools to learn Chinese (Mandarin). Pinyin converter, stroke order, HSK flashcards, tone trainer, picture learning, pinyin chart, graded reader, and radical explorer. No registration required.',
  keywords:
    'learn Chinese, learn Mandarin, Chinese for beginners, pinyin converter, stroke order, HSK practice, Chinese characters, free Chinese learning, Mandarin tones, picture learning, pinyin chart, Chinese reading',
  openGraph: {
    title: 'Learn Chinese Free - Online Mandarin Learning Tools',
    description:
      'Free interactive tools for learning Chinese: pinyin converter, stroke order practice, HSK flashcards, tone trainer, and more.',
    url: 'https://www.skillxm.cn/en/',
    siteName: 'SkillXM',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.skillxm.cn/en/',
    languages: {
      'zh-CN': 'https://www.skillxm.cn/',
      en: 'https://www.skillxm.cn/en/',
      'x-default': 'https://www.skillxm.cn/',
    },
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
    description:
      'Convert any Chinese text into pinyin with accurate tone marks. Paste a paragraph or a single character and instantly see the pronunciation.',
    accent: 'from-red-700 to-rose-900',
  },
  {
    name: 'Stroke Order Practice',
    nameZh: '笔顺练习',
    href: '/en/tools/stroke-order/',
    emoji: '🖌️',
    description:
      'Learn to write Chinese characters with the correct stroke order. Animated guides show every stroke so beginners build proper habits from day one.',
    accent: 'from-amber-700 to-yellow-900',
  },
  {
    name: 'HSK Flashcards',
    nameZh: 'HSK词汇卡',
    href: '/en/tools/hsk-flashcards/',
    emoji: '🗂️',
    description:
      'Practice HSK 1 through HSK 6 vocabulary with spaced repetition. Track which words you know and focus your review where it matters most.',
    accent: 'from-rose-700 to-red-950',
  },
  {
    name: 'Tone Trainer',
    nameZh: '声调训练',
    href: '/en/tools/tone-trainer/',
    emoji: '🎵',
    description:
      'Master the four Mandarin tones through listening and comparison drills. Train your ear to distinguish mā, má, mǎ and mà with confidence.',
    accent: 'from-yellow-600 to-amber-900',
  },
  {
    name: 'Chinese Reading Reader',
    nameZh: '中文阅读器',
    href: '/en/tools/chinese-reader/',
    emoji: '📖',
    description:
      'Graded reading passages with on-demand pinyin annotation and tap-to-translate vocabulary. Read at your level and grow your understanding naturally.',
    accent: 'from-red-800 to-rose-950',
  },
  {
    name: 'Radical Explorer',
    nameZh: '部首探索',
    href: '/en/tools/radical-explorer/',
    emoji: '🧩',
    description:
      'Decompose any character into its radicals and components. Discover the meaning behind each building block and remember characters faster.',
    accent: 'from-amber-600 to-red-900',
  },
  {
    name: 'Picture Learning',
    nameZh: '看图学中文',
    href: '/en/tools/picture-learning/',
    emoji: '🖼️',
    description:
      'Learn Chinese vocabulary through pictures. Three difficulty levels from everyday nouns to four-character idioms, with audio pronunciation.',
    accent: 'from-purple-600 to-pink-900',
  },
  {
    name: 'Pinyin Chart',
    nameZh: '拼音图表',
    href: '/en/tools/pinyin-chart/',
    emoji: '📊',
    description:
      'Complete interactive pinyin table with 23 initials and 24 finals. Click any cell to hear pronunciation, switch between tones, and learn phonetics rules.',
    accent: 'from-blue-600 to-indigo-900',
  },
];

const features = [
  {
    icon: '🆓',
    title: 'Completely Free',
    text: 'Every tool is free forever. No paywalls, no premium tiers, no hidden upsells — learn Mandarin without spending a cent.',
  },
  {
    icon: '🚫',
    title: 'No Registration',
    text: 'Skip the sign-up form. Open any tool and start practising immediately. Your progress stays private on your own device.',
  },
  {
    icon: '📱',
    title: 'Works on All Devices',
    text: 'Responsive design adapts to phones, tablets and desktops. Practise pinyin on the metro or study stroke order at your desk.',
  },
  {
    icon: '🖨️',
    title: 'PDF Export',
    text: 'Turn worksheets, flashcards and reading sheets into printable PDFs. Study offline or hand them out in a classroom.',
  },
];

const learningPath = [
  { level: 'HSK 1', title: 'Beginner', desc: '150 words · Greetings, numbers, basic phrases', color: 'from-red-600 to-rose-800' },
  { level: 'HSK 2', title: 'Elementary', desc: '300 words · Daily life and simple conversations', color: 'from-rose-600 to-red-800' },
  { level: 'HSK 3', title: 'Pre-Intermediate', desc: '600 words · Travel, shopping and routine topics', color: 'from-amber-600 to-red-800' },
  { level: 'HSK 4', title: 'Intermediate', desc: '1,200 words · Work, study and opinion exchange', color: 'from-red-700 to-amber-900' },
  { level: 'HSK 5', title: 'Upper-Intermediate', desc: '2,500 words · News, essays and abstract ideas', color: 'from-rose-700 to-yellow-900' },
  { level: 'HSK 6', title: 'Advanced', desc: '5,000+ words · Fluent reading and professional use', color: 'from-yellow-600 to-red-950' },
];

export default function EnglishHomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://www.skillxm.cn/en/#website',
        name: 'SkillXM - Learn Chinese Free',
        alternateName: 'Learn Chinese Free',
        url: 'https://www.skillxm.cn/en/',
        description:
          'Free online tools to learn Chinese (Mandarin): pinyin converter, stroke order practice, HSK flashcards, tone trainer, graded reader and radical explorer.',
        inLanguage: 'en',
        publisher: { '@id': 'https://www.skillxm.cn/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.skillxm.cn/en/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://www.skillxm.cn/en/#webapplication',
        name: 'SkillXM Chinese Learning Tools',
        url: 'https://www.skillxm.cn/en/',
        applicationCategory: 'EducationApplication',
        operatingSystem: 'Web',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        inLanguage: 'en',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Pinyin Converter',
          'Stroke Order Practice',
          'HSK Flashcards',
          'Tone Trainer',
          'Chinese Reading Reader',
          'Radical Explorer',
          'Picture Learning',
          'Pinyin Chart',
        ],
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'student',
        },
        isAccessibleForFree: true,
      },
      {
        '@type': 'ItemList',
        '@id': 'https://www.skillxm.cn/en/#tools',
        itemListElement: tools.map((tool, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: tool.name,
          description: tool.description,
          url: `https://www.skillxm.cn${tool.href}`,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#1a0808] text-[#F5F0E8] overflow-hidden">
      {/* ===== Decorative top cloud band ===== */}
      <div
        aria-hidden="true"
        className="h-2 w-full"
        style={{
          background:
            'linear-gradient(90deg, #8B0000 0%, #C41E3A 25%, #D4AF37 50%, #C41E3A 75%, #8B0000 100%)',
        }}
      />

      {/* ===== Language switcher bar ===== */}
      <div className="relative z-20 bg-gradient-to-r from-[#5c0a0a] via-[#8B0000] to-[#5c0a0a] border-b border-[#D4AF37]/40">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs sm:text-sm">
          <span className="text-[#FFD700] font-medium tracking-wide flex items-center gap-1.5">
            <span aria-hidden="true">☁</span>
            <span className="hidden sm:inline">SkillXM · Learn Chinese Free</span>
            <span className="sm:hidden">SkillXM</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[#F5F0E8]/70">Language:</span>
            <Link
              href="https://www.skillxm.cn/"
              className="text-[#F5F0E8]/80 hover:text-[#FFD700] transition-colors px-2 py-0.5 rounded border border-transparent hover:border-[#D4AF37]/50"
            >
              中文
            </Link>
            <span className="text-[#FFD700] font-semibold px-2 py-0.5 rounded border border-[#D4AF37]/60 bg-[#D4AF37]/10">
              English
            </span>
          </div>
        </div>
      </div>

      {/* ===== Hero section ===== */}
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
          className="absolute top-12 left-[8%] w-32 h-32 rounded-full opacity-30 blur-2xl"
          style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute top-20 right-[10%] w-40 h-40 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-64 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #D4AF37 0%, transparent 70%)' }}
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

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
          {/* Seal stamp */}
          <div className="flex justify-center mb-8">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-2xl sm:text-3xl font-bold text-[#F5F0E8] rotate-3 shadow-2xl"
              style={{
                background:
                  'linear-gradient(135deg, #8B0000 0%, #C41E3A 100%)',
                border: '2px solid #D4AF37',
                borderRadius: '4px',
                boxShadow:
                  '0 0 0 1px #8B0000, 0 0 20px rgba(212,175,55,0.4), inset 0 0 12px rgba(0,0,0,0.4)',
              }}
              aria-hidden="true"
            >
              印
            </div>
          </div>

          {/* Decorative Chinese characters */}
          <p
            className="text-7xl sm:text-9xl font-bold mb-4 tracking-[0.15em] select-none"
            style={{
              background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 30px rgba(212,175,55,0.3)',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
            }}
            aria-hidden="true"
          >
            学中文
          </p>

          {/* Main title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#F5F0E8] tracking-tight mb-6 drop-shadow-2xl">
            Learn Chinese{' '}
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Free
            </span>
          </h1>

          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
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

          <p className="text-lg sm:text-xl text-[#F5F0E8]/85 max-w-2xl mx-auto mb-10 leading-relaxed">
            A complete toolkit for learning Mandarin — pinyin, stroke order, HSK vocabulary,
            tones, picture learning, pinyin chart, graded reading and radicals. Free, with no registration, built for
            beginners and serious learners alike.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/en/tools/pinyin-converter/"
              className="group relative px-8 py-3.5 font-semibold text-[#1a0808] rounded-full overflow-hidden transition-transform hover:scale-105"
              style={{
                background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)',
                boxShadow: '0 8px 30px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Learning
                <span aria-hidden="true">→</span>
              </span>
            </Link>
            <Link
              href="#tools"
              className="px-8 py-3.5 font-medium text-[#F5F0E8] rounded-full border border-[#D4AF37]/50 hover:border-[#FFD700] hover:bg-[#D4AF37]/10 transition-colors"
            >
              Explore Tools
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#F5F0E8]/70">
            <span className="flex items-center gap-1.5">
              <span className="text-[#FFD700]" aria-hidden="true">✦</span> 8 free tools
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#FFD700]" aria-hidden="true">✦</span> HSK 1–6 coverage
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#FFD700]" aria-hidden="true">✦</span> No sign-up needed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#FFD700]" aria-hidden="true">✦</span> PDF export included
            </span>
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
      <section id="tools" className="relative py-20 px-4 sm:px-6 bg-[#1a0808]">
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
          {/* Section heading */}
          <div className="text-center mb-14">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">
              Eight Practice Tools
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#F5F0E8] mt-3 mb-4">
              Everything You Need to{' '}
              <span className="text-[#FFD700]">Learn Mandarin</span>
            </h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto">
              From your first pinyin syllable to advanced HSK 6 reading, each tool focuses on
              one core skill so you can practise deliberately.
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

      {/* ===== Features section ===== */}
      <section className="relative py-20 px-4 sm:px-6 bg-[#F5F0E8] text-[#1a1a1a]">
        {/* Top gold border */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-1.5"
          style={{
            background:
              'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)',
          }}
        />
        {/* Cloud pattern decoration */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 50c0-8 6-15 15-15s15 7 15 15c0-8 6-15 15-15s15 7 15 15' stroke='%238B0000' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
            backgroundSize: '100px 100px',
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#C41E3A] text-sm font-medium tracking-[0.3em] uppercase">
              Why SkillXM
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#1a1a1a] mt-3 mb-4">
              Built for Learners,{' '}
              <span className="text-[#8B0000]">Not for Profit</span>
            </h2>
            <p className="text-[#1a1a1a]/60 max-w-2xl mx-auto">
              We remove every obstacle between you and the language. No accounts, no fees,
              no friction — just focused practice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative p-7 rounded-2xl bg-white/70 backdrop-blur border border-[#8B0000]/15 hover:border-[#8B0000]/40 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-5"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, #C41E3A 0%, #8B0000 100%)',
                    boxShadow: '0 6px 18px rgba(139,0,0,0.3)',
                  }}
                >
                  <span aria-hidden="true">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">{feature.text}</p>
              </div>
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

      {/* ===== Learning path section ===== */}
      <section className="relative py-20 px-4 sm:px-6 bg-[#1a0808]">
        {/* Radial red glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(139,0,0,0.4) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">
              Your Roadmap
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#F5F0E8] mt-3 mb-4">
              From HSK 1 to{' '}
              <span className="text-[#FFD700]">HSK 6 Fluency</span>
            </h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto">
              The Hanyu Shuiping Kaoshi is the international standard for Mandarin
              proficiency. Follow this path and measure your progress at every stage.
            </p>
          </div>

          {/* Path with connectors */}
          <div className="relative">
            {/* Connecting line */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-12 left-[8%] right-[8%] h-0.5"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, #8B0000 10%, #C41E3A 50%, #8B0000 90%, transparent 100%)',
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              {learningPath.map((stage, index) => (
                <div key={stage.level} className="relative flex flex-col items-center text-center">
                  {/* Numbered medallion */}
                  <div
                    className={`relative w-24 h-24 rounded-full flex flex-col items-center justify-center mb-4 bg-gradient-to-br ${stage.color} shadow-2xl z-10`}
                    style={{
                      border: '2px solid rgba(212,175,55,0.5)',
                      boxShadow: '0 0 0 4px rgba(26,8,8,1), 0 8px 25px rgba(0,0,0,0.5)',
                    }}
                  >
                    <span className="text-[#FFD700] font-bold text-lg leading-none">
                      {stage.level}
                    </span>
                    <span className="text-[#F5F0E8]/80 text-[10px] mt-1 tracking-wider uppercase">
                      Level {index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#F5F0E8] mb-1">{stage.title}</h3>
                  <p className="text-xs text-[#F5F0E8]/55 leading-relaxed px-1">{stage.desc}</p>

                  {/* Arrow between stages */}
                  {index < learningPath.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden lg:block absolute top-10 -right-5 text-[#D4AF37]/60 text-xl"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/en/tools/hsk-flashcards/"
              className="inline-flex items-center gap-2 px-7 py-3 font-medium text-[#FFD700] rounded-full border border-[#D4AF37]/50 hover:border-[#FFD700] hover:bg-[#D4AF37]/10 transition-colors"
            >
              Start HSK Practice
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SEO content section ===== */}
      <section className="relative py-20 px-4 sm:px-6 bg-[#F5F0E8] text-[#1a1a1a]">
        {/* Ink-wash style decorative blob */}
        <div
          aria-hidden="true"
          className="absolute top-10 right-10 w-48 h-48 opacity-[0.05] rotate-12"
          style={{
            background:
              'radial-gradient(ellipse at 40% 40%, #8B0000 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-10 left-10 w-56 h-56 opacity-[0.04] -rotate-12"
          style={{
            background:
              'radial-gradient(ellipse at 40% 40%, #C41E3A 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#C41E3A] text-sm font-medium tracking-[0.3em] uppercase">
              Learning Guide
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mt-3">
              How to Learn Chinese Effectively
            </h2>
          </div>

          <div className="space-y-6 text-[#1a1a1a]/80 leading-relaxed text-base sm:text-lg">
            <p>
              Learning Chinese is one of the most rewarding journeys a language learner can
              undertake. Mandarin is spoken by over a billion people and opens the door to
              thousands of years of literature, philosophy and culture. For beginners, the
              path to fluency starts with mastering <strong className="text-[#8B0000]">pinyin</strong>{' '}
              — the official romanisation system that teaches correct pronunciation and the
              four tones. Once pinyin is solid, you can begin to{' '}
              <strong className="text-[#8B0000]">learn Chinese characters</strong> through
              their stroke order and radicals, the building blocks that give every character
              its meaning and form.
            </p>

            <p>
              A structured approach is essential for sustainable progress. Most learners
              follow the <strong className="text-[#8B0000]">HSK (Hanyu Shuiping Kaoshi)</strong>{' '}
              framework, which ranges from HSK 1 (roughly 150 words and basic greetings) to
              HSK 6 (5,000+ words and near-native reading ability). Free Chinese learning
              tools like ours let you practise each level deliberately: convert text to
              pinyin, drill vocabulary with spaced-repetition flashcards, train your ear on
              the four Mandarin tones, learn words through pictures, explore the full pinyin
              chart with audio, and read graded passages with on-demand annotation.
              Because every tool is free and requires no registration, you can focus entirely
              on the language itself.
            </p>

            <p>
              Consistency matters more than intensity. Ten focused minutes a day with a
              stroke-order practice tool or a few HSK flashcard reviews will compound into
              real fluency over months. Pair daily practice with authentic input — graded
              readers, slow podcasts, labelled images — and you will steadily understand more
              of the language. Whether your goal is travel, business, reading classical texts
              or simply the joy of a new script, SkillXM gives you the free tools to learn
              Mandarin at your own pace, on any device, anywhere in the world.
            </p>
          </div>

          {/* Keyword chips */}
          <div className="mt-10 flex flex-wrap gap-2 justify-center">
            {[
              'learn Chinese',
              'learn Mandarin',
              'Chinese for beginners',
              'free Chinese learning',
              'pinyin converter',
              'stroke order',
              'HSK practice',
              'Mandarin tones',
              'picture learning',
              'pinyin chart',
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
      </section>

      {/* ===== Footer ===== */}
      <footer className="relative bg-[#0f0303] text-[#F5F0E8] pt-16 pb-8 px-4 sm:px-6">
        {/* Top decorative border */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-1"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #8B0000 20%, #D4AF37 50%, #8B0000 80%, transparent 100%)',
          }}
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold text-[#F5F0E8] rounded"
                  style={{
                    background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 100%)',
                    border: '1px solid #D4AF37',
                  }}
                  aria-hidden="true"
                >
                  学
                </span>
                <span className="text-lg font-bold text-[#F5F0E8]">SkillXM</span>
              </div>
              <p className="text-sm text-[#F5F0E8]/50 leading-relaxed">
                Free Mandarin learning tools for the world. Built with a love for the
                Chinese language and its traditions.
              </p>
            </div>

            {/* Learning tools */}
            <div>
              <h3 className="text-sm font-semibold text-[#FFD700] uppercase tracking-wider mb-4">
                Learning Tools
              </h3>
              <ul className="space-y-2.5 text-sm">
                {tools.map((tool) => (
                  <li key={tool.name}>
                    <Link
                      href={tool.href}
                      className="text-[#F5F0E8]/60 hover:text-[#FFD700] transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning path */}
            <div>
              <h3 className="text-sm font-semibold text-[#FFD700] uppercase tracking-wider mb-4">
                HSK Levels
              </h3>
              <ul className="space-y-2.5 text-sm">
                {learningPath.map((stage) => (
                  <li key={stage.level}>
                    <Link
                      href="/en/tools/hsk-flashcards/"
                      className="text-[#F5F0E8]/60 hover:text-[#FFD700] transition-colors"
                    >
                      {stage.level} · {stage.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Language & links */}
            <div>
              <h3 className="text-sm font-semibold text-[#FFD700] uppercase tracking-wider mb-4">
                Language
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href="https://www.skillxm.cn/"
                    className="text-[#F5F0E8]/60 hover:text-[#FFD700] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span aria-hidden="true">🇨🇳</span> 中文版 (Chinese)
                  </Link>
                </li>
                <li>
                  <span className="text-[#F5F0E8]/60 inline-flex items-center gap-1.5">
                    <span aria-hidden="true">🇬🇧</span> English (current)
                  </span>
                </li>
              </ul>
              <h3 className="text-sm font-semibold text-[#FFD700] uppercase tracking-wider mb-4 mt-6">
                Resources
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href="/en/tools/pinyin-chart/"
                    className="text-[#F5F0E8]/60 hover:text-[#FFD700] transition-colors"
                  >
                    Pinyin Chart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/en/tools/tone-trainer/"
                    className="text-[#F5F0E8]/60 hover:text-[#FFD700] transition-colors"
                  >
                    Mandarin Tones
                  </Link>
                </li>
                <li>
                  <Link
                    href="/en/tools/picture-learning/"
                    className="text-[#F5F0E8]/60 hover:text-[#FFD700] transition-colors"
                  >
                    Picture Dictionary
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.skillxm.cn/about/"
                    className="text-[#F5F0E8]/60 hover:text-[#FFD700] transition-colors"
                  >
                    About SkillXM
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div
            aria-hidden="true"
            className="h-px w-full mb-6"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
            }}
          />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F0E8]/40">
            <p className="flex items-center gap-2">
              <span aria-hidden="true" className="text-[#D4AF37]">☁</span>
              © {new Date().getFullYear()} SkillXM. Learn Chinese Free.
            </p>
            <p className="flex items-center gap-3">
              <Link href="/en/" className="hover:text-[#FFD700] transition-colors">
                Home
              </Link>
              <span aria-hidden="true">·</span>
              <Link
                href="https://www.skillxm.cn/privacy/"
                className="hover:text-[#FFD700] transition-colors"
              >
                Privacy
              </Link>
              <span aria-hidden="true">·</span>
              <Link
                href="https://www.skillxm.cn/terms/"
                className="hover:text-[#FFD700] transition-colors"
              >
                Terms
              </Link>
            </p>
          </div>
        </div>
      </footer>

      {/* ===== JSON-LD structured data ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
