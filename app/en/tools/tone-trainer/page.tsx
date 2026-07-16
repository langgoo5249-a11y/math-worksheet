import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mandarin Tone Trainer - Master the Four Tones',
  description:
    'Master the four Mandarin tones and the neutral tone. Clear explanations of tones 1-4, a tone-mark diagram, common tone pairs for practice, and tips for tone mastery. Free Mandarin pronunciation trainer.',
  keywords:
    'Mandarin tone trainer, Chinese four tones, Mandarin tones, tone marks, pinyin tones, tone pairs, Chinese pronunciation, neutral tone, Mandarin tone practice, first second third fourth tone',
  alternates: {
    canonical: 'https://www.skillxm.cn/en/tools/tone-trainer/',
    languages: {
      'zh-CN': 'https://www.skillxm.cn/',
      en: 'https://www.skillxm.cn/en/tools/tone-trainer/',
      'x-default': 'https://www.skillxm.cn/',
    },
  },
  openGraph: {
    title: 'Mandarin Tone Trainer - Master the Four Tones',
    description:
      'Learn the four Mandarin tones and neutral tone with diagrams, tone pairs and tips. Free pronunciation trainer.',
    url: 'https://www.skillxm.cn/en/tools/tone-trainer/',
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

const tones = [
  {
    num: 1,
    name: 'First Tone',
    nameZh: '第一声',
    mark: 'ā',
    contour: 'High, flat and steady',
    desc: 'A high, level pitch held steady throughout the syllable, like a sustained musical note. The mark is a straight line (macron) over the vowel.',
    example: 'mā — 妈 (mother)',
  },
  {
    num: 2,
    name: 'Second Tone',
    nameZh: '第二声',
    mark: 'á',
    contour: 'Rising, like a question',
    desc: 'The pitch rises from middle to high, similar to the questioning intonation of "huh?" in English. The mark is an acute accent (rising line).',
    example: 'má — 麻 (hemp)',
  },
  {
    num: 3,
    name: 'Third Tone',
    nameZh: '第三声',
    mark: 'ǎ',
    contour: 'Falling then rising',
    desc: 'The pitch drops to a low point and then rises, forming a dip. In connected speech it is often pronounced as just a low tone. The mark is a caron (v-shaped).',
    example: 'mǎ — 马 (horse)',
  },
  {
    num: 4,
    name: 'Fourth Tone',
    nameZh: '第四声',
    mark: 'à',
    contour: 'Falling sharply, like a command',
    desc: 'A sharp, falling pitch from high to low, as if giving a firm command ("No!"). The mark is a grave accent (falling line).',
    example: 'mà — 骂 (to scold)',
  },
  {
    num: 0,
    name: 'Neutral Tone',
    nameZh: '轻声',
    mark: 'ma',
    contour: 'Light and short, unstressed',
    desc: 'A short, unstressed syllable with no tone mark. Its pitch follows the preceding tone. Common in particles like 吗 (ma) and 的 (de).',
    example: 'ma — 吗 (question particle)',
  },
];

const tonePairs = [
  { pair: '1-1', pinyin: 'gāo gāo', meaning: 'very tall', tip: 'Two level tones — keep both steady and high.' },
  { pair: '2-2', pinyin: 'cháng chéng', meaning: 'the Great Wall', tip: 'Two rising tones — avoid blending them into one rise.' },
  { pair: '3-3', pinyin: 'nǐ hǎo', meaning: 'hello', tip: 'Two third tones become 2-3: say "ní hǎo".' },
  { pair: '4-4', pinyin: 'xiè xie', meaning: 'thank you', tip: 'Two sharp falls — keep each crisp and separate.' },
  { pair: '2-4', pinyin: 'zài jiàn', meaning: 'goodbye', tip: 'Rise then fall — a very common, satisfying contour.' },
  { pair: '4-2', pinyin: 'kuài lái', meaning: 'come quickly', tip: 'Fall then rise — emphasizes urgency.' },
];

const tips = [
  { title: 'Exaggerate at first', text: 'When learning, over-emphasize each tone\'s contour. Exaggeration builds the muscle memory you can later soften into natural speech.' },
  { title: 'Learn the tone-change rules', text: 'Two third tones become 2-3 (nǐ hǎo → ní hǎo), and 不 (bù) becomes bú before a fourth tone. Master these rules so your speech flows.' },
  { title: 'Shadow native speakers', text: 'Listen to a short clip and repeat immediately, mimicking pitch exactly. Shadowing trains your ear and mouth together.' },
  { title: 'Practice tone pairs, not single syllables', text: 'Real speech is a stream of tones. Drill two-syllable combinations so transitions become automatic.' },
  { title: 'Record and compare', text: 'Record yourself and compare with a native sample. Hearing the gap is the fastest way to close it.' },
  { title: 'Hum the melody first', text: 'Before adding consonants and vowels, hum the tone contour of a phrase. This isolates pitch from articulation.' },
];

export default function ToneTrainerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Mandarin Tone Trainer',
        applicationCategory: 'EducationApplication',
        operatingSystem: 'Web',
        inLanguage: 'en',
        url: 'https://www.skillxm.cn/en/tools/tone-trainer/',
        description:
          'Master the four Mandarin tones and the neutral tone with clear explanations, a tone-mark diagram, common tone pairs and tips for tone mastery.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        isAccessibleForFree: true,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.skillxm.cn/en/' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.skillxm.cn/en/tools/' },
          { '@type': 'ListItem', position: 3, name: 'Tone Trainer', item: 'https://www.skillxm.cn/en/tools/tone-trainer/' },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#1a0808] text-[#F5F0E8]">
      {/* ===== Breadcrumb ===== */}
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 text-sm text-[#F5F0E8]/55">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/en/" className="hover:text-[#FFD700] transition-colors">Home</Link></li>
          <li aria-hidden="true" className="text-[#D4AF37]/50">/</li>
          <li><Link href="/en/tools/" className="hover:text-[#FFD700] transition-colors">Tools</Link></li>
          <li aria-hidden="true" className="text-[#D4AF37]/50">/</li>
          <li className="text-[#FFD700]">Tone Trainer</li>
        </ol>
      </nav>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, #C41E3A 0%, #8B0000 35%, #3d0606 70%, #1a0808 100%)' }} />
        <div aria-hidden="true" className="absolute inset-x-4 sm:inset-x-8 top-6 bottom-6 border border-[#D4AF37]/30 rounded-[6px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-14 pb-16 text-center">
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 flex items-center justify-center text-2xl font-bold text-[#F5F0E8] -rotate-3 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 100%)', border: '2px solid #D4AF37', borderRadius: '4px', boxShadow: '0 0 0 1px #8B0000, 0 0 20px rgba(212,175,55,0.4), inset 0 0 12px rgba(0,0,0,0.4)' }}
              aria-hidden="true"
            >
              调
            </div>
          </div>
          <p
            className="text-4xl sm:text-5xl font-bold mb-3 tracking-[0.15em] select-none"
            style={{ background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            aria-hidden="true"
          >
            声调训练
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F5F0E8] tracking-tight mb-4">
            Mandarin Tone Trainer
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} aria-hidden="true" />
            <span className="text-[#D4AF37] text-lg" aria-hidden="true">❖</span>
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} aria-hidden="true" />
          </div>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 max-w-2xl mx-auto leading-relaxed">
            Master the four Mandarin tones and the neutral tone. Learn each
            tone&apos;s pitch contour, drill common tone pairs, and build the
            ear that makes your Chinese sound natural.
          </p>
        </div>
      </section>

      {/* ===== SEO content ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#F5F0E8] text-[#1a1a1a]">
        <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-[#C41E3A] text-sm font-medium tracking-[0.3em] uppercase">Why Tones Matter</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 mb-6">
            The Four Tones Are the Soul of Mandarin
          </h2>
          <div className="space-y-5 text-[#1a1a1a]/80 leading-relaxed text-base sm:text-lg">
            <p>
              Mandarin is a tonal language, which means the pitch of your voice
              is part of the word itself. The same syllable — for example{' '}
              <em>ma</em> — becomes four entirely different words depending on
              its tone: <strong className="text-[#8B0000]">mā</strong> (mother),
              <strong className="text-[#8B0000]"> má</strong> (hemp),
              <strong className="text-[#8B0000]"> mǎ</strong> (horse) and
              <strong className="text-[#8B0000]"> mà</strong> (to scold). Because
              tone changes meaning, getting the tones right is not optional — it
              is the difference between being understood and being completely
              lost. Many learners underestimate tones at first and then hit a
              wall when native speakers cannot follow them, even with perfect
              grammar and vocabulary.
            </p>
            <p>
              The good news is that the system is small and learnable. Mandarin
              has just <strong className="text-[#8B0000]">four lexical tones</strong>{' '}
              plus a light, unstressed neutral tone. The first tone is high and
              flat, the second rises like a question, the third dips low and
              rebounds, and the fourth falls sharply like a command. The neutral
              tone is short and light, with no mark of its own. Each tone has a
              distinctive contour that you can hum, draw and eventually produce
              automatically. Our tone trainer breaks each one down with a clear
              pitch diagram and example words so you can hear and feel the
              difference.
            </p>
            <p>
              The secret to tone mastery is practicing{' '}
              <strong className="text-[#8B0000]">tone pairs</strong> rather than
              single syllables, because real speech strings tones together and
              some combinations change: two third tones in a row become a
              second-tone followed by a third (so 你好 nǐ hǎo is actually spoken
              ní hǎo). Pair this trainer with our free{' '}
              <Link href="/en/tools/pinyin-converter/" className="text-[#8B0000] font-semibold hover:underline">Pinyin Converter</Link>{' '}
              to see tone marks on any text, the{' '}
              <Link href="/en/tools/hsk-flashcards/" className="text-[#8B0000] font-semibold hover:underline">HSK Flashcards</Link>{' '}
              to learn words with their correct tones, and the{' '}
              <Link href="/en/tools/reading-reader/" className="text-[#8B0000] font-semibold hover:underline">Reading Reader</Link>{' '}
              to hear tones in flowing sentences. With a few minutes of
              shadowing practice each day, accurate tones will become second
              nature.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {['Mandarin tone trainer', 'Chinese four tones', 'tone marks', 'pinyin tones', 'tone pairs', 'neutral tone'].map((kw) => (
              <span key={kw} className="px-3 py-1 text-xs font-medium rounded-full border border-[#8B0000]/25 text-[#8B0000] bg-[#8B0000]/5">{kw}</span>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)' }} />
      </section>

      {/* ===== Tone diagram + table ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Pitch Contours</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">The Four Tones + Neutral Tone</h2>
          </div>

          {/* CSS pitch diagram */}
          <div
            className="relative rounded-2xl border border-[#D4AF37]/30 p-6 sm:p-8 mb-10"
            style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.85) 0%, rgba(26,8,8,0.95) 100%)' }}
          >
            <p className="text-center text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
              Tone Pitch Contour Diagram
            </p>
            <div className="relative h-44 mx-auto max-w-md">
              {/* Axes */}
              <div aria-hidden="true" className="absolute left-10 top-2 bottom-7 w-px bg-[#F5F0E8]/20" />
              <div aria-hidden="true" className="absolute left-10 right-4 bottom-7 h-px bg-[#F5F0E8]/20" />
              {/* Y axis labels */}
              <span aria-hidden="true" className="absolute left-1 top-1 text-[10px] text-[#F5F0E8]/50">High</span>
              <span aria-hidden="true" className="absolute left-1 bottom-6 text-[10px] text-[#F5F0E8]/50">Low</span>
              {/* Tone 1: flat high */}
              <span aria-hidden="true" className="absolute left-12 right-6 top-6 h-1 rounded-full" style={{ background: '#FFD700' }} />
              <span className="absolute -top-1 left-12 text-xs text-[#FFD700] font-bold">1</span>
              {/* Tone 2: rising */}
              <span aria-hidden="true" className="absolute left-12 right-6 top-16 h-1 rounded-full origin-left rotate-[-28deg]" style={{ background: '#C41E3A', width: 'calc(100% - 4rem)' }} />
              <span className="absolute top-12 left-12 text-xs text-[#C41E3A] font-bold">2</span>
              {/* Tone 3: dip */}
              <span aria-hidden="true" className="absolute left-12 top-10 text-[#8B0000] text-lg" style={{ transform: 'translateX(40%)' }}>∨</span>
              <span className="absolute top-6 left-1/2 text-xs text-[#8B0000] font-bold">3</span>
              {/* Tone 4: falling */}
              <span aria-hidden="true" className="absolute left-12 right-6 top-6 h-1 rounded-full origin-left rotate-[28deg]" style={{ background: '#D4AF37', width: 'calc(100% - 4rem)' }} />
              <span className="absolute top-1 right-6 text-xs text-[#D4AF37] font-bold">4</span>
              {/* X axis labels */}
              <span aria-hidden="true" className="absolute left-10 bottom-1 text-[10px] text-[#F5F0E8]/50">start</span>
              <span aria-hidden="true" className="absolute right-4 bottom-1 text-[10px] text-[#F5F0E8]/50">end</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4 text-xs">
              <span className="text-[#FFD700]">━ Tone 1 (flat)</span>
              <span className="text-[#C41E3A]">╱ Tone 2 (rising)</span>
              <span className="text-[#8B0000]">∨ Tone 3 (dip)</span>
              <span className="text-[#D4AF37]">╲ Tone 4 (falling)</span>
            </div>
          </div>

          {/* Tone cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tones.map((t) => (
              <div
                key={t.name}
                className="relative rounded-2xl border border-[#D4AF37]/25 p-6"
                style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.9) 0%, rgba(26,8,8,0.95) 100%)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-12 h-12 flex items-center justify-center text-2xl text-[#FFD700] font-serif rounded-lg"
                    style={{ background: 'rgba(139,0,0,0.5)', border: '1px solid rgba(212,175,55,0.4)' }}
                    aria-hidden="true"
                  >
                    {t.mark}
                  </span>
                  <div>
                    <p className="text-[#F5F0E8] font-bold leading-tight">{t.name}</p>
                    <p className="text-[#D4AF37]/80 text-xs">{t.nameZh}</p>
                  </div>
                </div>
                <p className="text-[#FFD700] text-xs font-medium mb-2">{t.contour}</p>
                <p className="text-[#F5F0E8]/65 text-sm leading-relaxed mb-2">{t.desc}</p>
                <p className="text-[#F5F0E8]/85 text-sm font-serif">{t.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Tone pairs ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#0f0303]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Drill</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">Common Tone Pairs for Practice</h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto mt-3 text-sm">
              Real Mandarin flows as a sequence of tones. Practice these
              two-syllable pairs until the transitions feel automatic.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tonePairs.map((p) => (
              <div
                key={p.pair}
                className="flex items-start gap-4 rounded-xl border border-[#D4AF37]/20 bg-[#3d0606]/40 p-5"
              >
                <span
                  className="shrink-0 inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-bold text-[#1a0808]"
                  style={{ background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)' }}
                  aria-hidden="true"
                >
                  {p.pair}
                </span>
                <div>
                  <p className="text-[#FFD700] font-serif text-lg leading-tight">{p.pinyin}</p>
                  <p className="text-[#F5F0E8]/85 text-sm">{p.meaning}</p>
                  <p className="text-[#F5F0E8]/55 text-xs mt-1">{p.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Tips ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Mastery</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">Tips for Tone Mastery</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tips.map((t, i) => (
              <div
                key={t.title}
                className="relative rounded-2xl border border-[#D4AF37]/25 p-6"
                style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.9) 0%, rgba(26,8,8,0.95) 100%)' }}
              >
                <span
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-[#1a0808] mb-3"
                  style={{ background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)' }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="text-[#FFD700] font-bold mb-2">{t.title}</h3>
                <p className="text-[#F5F0E8]/65 text-sm leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Back links ===== */}
      <section className="relative py-14 px-4 sm:px-6 bg-[#0f0303]">
        <div className="max-w-3xl mx-auto text-center">
          <div aria-hidden="true" className="h-px w-full mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />
          <h2 className="text-xl font-bold text-[#F5F0E8] mb-5">Keep Exploring</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/en/tools/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-[#1a0808]" style={{ background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)' }}>
              <span aria-hidden="true">←</span> All Tools
            </Link>
            <Link href="/en/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-[#FFD700] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-colors">
              <span aria-hidden="true">⌂</span> Home
            </Link>
          </div>
        </div>
      </section>

      {/* ===== JSON-LD ===== */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
