import Link from 'next/link';
import type { Metadata } from 'next';
import PinyinConverter from './PinyinConverter';

export const metadata: Metadata = {
  title: 'Pinyin Converter - Convert Chinese to Pinyin Online Free',
  description:
    'Free online pinyin converter. Paste Chinese text and instantly get pinyin with tone marks. Built-in dictionary of 100+ common characters. No registration, works in your browser.',
  keywords:
    'pinyin converter, Chinese to pinyin, pinyin with tones, convert Chinese text to pinyin, pinyin tone marks, free pinyin tool, Mandarin romanization, hanyu pinyin converter',
  alternates: {
    canonical: 'https://www.skillxm.cn/en/tools/pinyin-converter/',
    languages: {
      'zh-CN': 'https://www.skillxm.cn/',
      en: 'https://www.skillxm.cn/en/tools/pinyin-converter/',
      'x-default': 'https://www.skillxm.cn/',
    },
  },
  openGraph: {
    title: 'Pinyin Converter - Convert Chinese to Pinyin Online Free',
    description:
      'Free online pinyin converter. Paste Chinese text and instantly get pinyin with tone marks. No registration required.',
    url: 'https://www.skillxm.cn/en/tools/pinyin-converter/',
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

const faqs = [
  {
    q: 'What is pinyin?',
    a: 'Pinyin (拼音) is the official romanization system for Mandarin Chinese. It uses the Latin alphabet to represent the pronunciation of Chinese characters, with diacritical marks above the vowels to indicate the four tones.',
  },
  {
    q: 'Does this pinyin converter work offline?',
    a: 'Yes. The tool ships with a built-in dictionary of over 100 of the most common Chinese characters, so conversion runs entirely in your browser. No data is sent to a server.',
  },
  {
    q: 'Why do some characters show the wrong pinyin?',
    a: 'Chinese has many polyphonic characters whose pronunciation changes with context. This lightweight converter uses each character’s most common reading. For full context-aware conversion of long texts, use a larger dictionary-based tool.',
  },
  {
    q: 'Can I copy the converted pinyin?',
    a: 'Absolutely. After converting your text, click "Copy pinyin" to copy the tone-marked pinyin to your clipboard, ready to paste anywhere.',
  },
];

export default function PinyinConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Pinyin Converter',
        applicationCategory: 'EducationApplication',
        operatingSystem: 'Web',
        inLanguage: 'en',
        url: 'https://www.skillxm.cn/en/tools/pinyin-converter/',
        description:
          'Free online pinyin converter. Paste Chinese text and instantly get pinyin with tone marks.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        isAccessibleForFree: true,
        provider: { '@id': 'https://www.skillxm.cn/#organization' },
        author: { '@id': 'https://www.skillxm.cn/#person-chenlaoshi' },
        educationalUse: ['Practice', 'Homework', 'Classroom Aid', 'Self-Study'],
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: ['Student', 'Parent', 'Teacher'],
        },
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
            name: 'Tools',
            item: 'https://www.skillxm.cn/en/tools/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Pinyin Converter',
            item: 'https://www.skillxm.cn/en/tools/pinyin-converter/',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
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
            <Link href="/en/tools/" className="hover:text-[#FFD700] transition-colors">
              Tools
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#D4AF37]/50">/</li>
          <li className="text-[#FFD700]">Pinyin Converter</li>
        </ol>
      </nav>

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
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-14 pb-16 text-center">
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 flex items-center justify-center text-2xl font-bold text-[#F5F0E8] rotate-3 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 100%)',
                border: '2px solid #D4AF37',
                borderRadius: '4px',
                boxShadow:
                  '0 0 0 1px #8B0000, 0 0 20px rgba(212,175,55,0.4), inset 0 0 12px rgba(0,0,0,0.4)',
              }}
              aria-hidden="true"
            >
              拼
            </div>
          </div>
          <p
            className="text-4xl sm:text-5xl font-bold mb-3 tracking-[0.15em] select-none"
            style={{
              background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            aria-hidden="true"
          >
            拼音转换器
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F5F0E8] tracking-tight mb-4">
            Pinyin Converter
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} aria-hidden="true" />
            <span className="text-[#D4AF37] text-lg" aria-hidden="true">❖</span>
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} aria-hidden="true" />
          </div>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 max-w-2xl mx-auto leading-relaxed">
            Convert any Chinese text into pinyin with accurate tone marks. Paste
            a sentence or a single character and see the pronunciation instantly —
            free, with no sign-up.
          </p>
        </div>
      </section>

      {/* ===== Interactive tool ===== */}
      <section className="relative py-12 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-4xl mx-auto">
          <PinyinConverter />
        </div>
      </section>

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
            About Pinyin
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 mb-6">
            What Is a Pinyin Converter and Why Use One?
          </h2>
          <div className="space-y-5 text-[#1a1a1a]/80 leading-relaxed text-base sm:text-lg">
            <p>
              A <strong className="text-[#8B0000]">pinyin converter</strong> is a
              tool that takes Chinese characters and outputs their romanized
              pronunciation, complete with the tone marks that distinguish
              meaning in Mandarin. Pinyin — short for <em>Hànyǔ Pīnyīn</em>
              (汉语拼音) — was developed in the 1950s and is now the international
              standard for representing Chinese sounds with the Latin alphabet.
              For beginners, a converter is the fastest way to learn how an
              unfamiliar character is pronounced, and for teachers it is an
              easy way to annotate reading passages so students can read aloud
              with confidence.
            </p>
            <p>
              Mandarin is a tonal language, which means the pitch contour of a
              syllable changes its meaning entirely. The syllable <em>ma</em>
              can be <em>mā</em> (mother), <em>má</em> (hemp), <em>mǎ</em>{' '}
              (horse) or <em>mà</em> (to scold), and a fifth neutral tone exists
              for unstressed syllables. Because tone marks are essential to
              correct pronunciation, our converter always includes them. Whether
              you are typing a quick greeting like 你好 (nǐ hǎo) or pasting a full
              paragraph, the diacritics appear automatically above the correct
              vowel, so you never have to add them by hand.
            </p>
            <p>
              This free pinyin converter runs entirely in your browser using a
              built-in dictionary of more than 100 of the most common Chinese
              characters, so it works without an internet connection and never
              sends your text to a server. It is a perfect companion to our
              other free tools: pair it with the{' '}
              <Link href="/en/tools/tone-trainer/" className="text-[#8B0000] font-semibold hover:underline">
                Tone Trainer
              </Link>{' '}
              to hear how each tone should sound, the{' '}
              <Link href="/en/tools/stroke-order/" className="text-[#8B0000] font-semibold hover:underline">
                Stroke Order
              </Link>{' '}
              tool to learn to write the characters, and the{' '}
              <Link href="/en/tools/hsk-flashcards/" className="text-[#8B0000] font-semibold hover:underline">
                HSK Flashcards
              </Link>{' '}
              to grow your vocabulary. Together they form a complete, no-cost
              toolkit for learning Mandarin from your very first pinyin syllable
              to confident reading.
            </p>
          </div>

          {/* Keyword chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              'pinyin converter',
              'Chinese to pinyin',
              'tone marks',
              'hanyu pinyin',
              'Mandarin romanization',
              'free pinyin tool',
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

      {/* ===== FAQ ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">
              Pinyin Converter Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-[#D4AF37]/25 bg-[#3d0606]/40 p-5"
              >
                <h3 className="text-[#FFD700] font-semibold mb-2">{f.q}</h3>
                <p className="text-[#F5F0E8]/75 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Back links ===== */}
      <section className="relative py-14 px-4 sm:px-6 bg-[#0f0303]">
        <div className="max-w-3xl mx-auto text-center">
          <div
            aria-hidden="true"
            className="h-px w-full mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }}
          />
          <h2 className="text-xl font-bold text-[#F5F0E8] mb-5">
            Keep Exploring
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/en/tools/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-[#1a0808]"
              style={{ background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)' }}
            >
              <span aria-hidden="true">←</span> All Tools
            </Link>
            <Link
              href="/en/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-[#FFD700] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-colors"
            >
              <span aria-hidden="true">⌂</span> Home
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
