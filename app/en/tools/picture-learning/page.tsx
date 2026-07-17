import Link from 'next/link';
import type { Metadata } from 'next';
import PictureLearning from './PictureLearning';

export const metadata: Metadata = {
  title: 'Learn Chinese with Pictures - Visual Vocabulary Builder',
  description:
    'Learn Chinese with pictures and emoji. A free visual vocabulary builder that pairs everyday images with Chinese characters, pinyin and English. Three levels from simple nouns to four-character idioms (chengyu). No sign-up required.',
  keywords:
    'learn Chinese pictures, Chinese visual vocabulary, Chinese picture flashcards, learn Chinese with emoji, Chinese vocabulary builder, picture Chinese learning, chengyu idioms, Chinese characters with images, visual Mandarin, picture flashcards Chinese',
  alternates: {
    canonical: 'https://www.skillxm.cn/en/tools/picture-learning/',
    languages: {
      'zh-CN': 'https://www.skillxm.cn/',
      en: 'https://www.skillxm.cn/en/tools/picture-learning/',
      'x-default': 'https://www.skillxm.cn/',
    },
  },
  openGraph: {
    title: 'Learn Chinese with Pictures - Visual Vocabulary Builder',
    description:
      'A free visual vocabulary builder that pairs pictures and emoji with Chinese characters, pinyin and English. Easy, Hard and Hell (idiom) levels.',
    url: 'https://www.skillxm.cn/en/tools/picture-learning/',
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

const levels = [
  {
    name: 'Easy',
    nameZh: '简单',
    count: '40 words',
    desc: 'Simple everyday nouns — animals, food, nature and common objects — each shown with a clear emoji picture.',
    color: 'from-emerald-600 to-green-800',
  },
  {
    name: 'Hard',
    nameZh: '困难',
    count: '30 words',
    desc: 'Abstract concepts and actions — verbs like run, eat and think, plus ideas like love, wisdom and time.',
    color: 'from-amber-600 to-orange-800',
  },
  {
    name: 'Hell',
    nameZh: '地狱',
    count: '20 idioms',
    desc: 'Four-character chengyu idioms with both their literal story and figurative meaning, from 画蛇添足 to 亡羊补牢.',
    color: 'from-red-700 to-rose-950',
  },
];

const methodSteps = [
  {
    title: 'See the picture',
    text: 'Each card opens with a large emoji image. Before you read anything, let your brain guess what Chinese word might describe it.',
  },
  {
    title: 'Reveal the word',
    text: 'Tap the card to flip open the Chinese characters, the pinyin with tone marks, and the English meaning all at once.',
  },
  {
    title: 'Hear it spoken',
    text: 'Press Listen to play native-rate Mandarin pronunciation through your browser, so sound and image lock together in memory.',
  },
  {
    title: 'Score yourself',
    text: 'Mark "I knew it" or "Didn\'t know". Your known and learning counts are tracked per level as you move through the deck.',
  },
];

export default function PictureLearningPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Learn Chinese with Pictures',
        applicationCategory: 'EducationApplication',
        operatingSystem: 'Web',
        inLanguage: 'en',
        url: 'https://www.skillxm.cn/en/tools/picture-learning/',
        description:
          'Free visual vocabulary builder that pairs pictures and emoji with Chinese characters, pinyin and English. Three levels from simple nouns to four-character idioms.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        isAccessibleForFree: true,
        featureList: [
          'Three difficulty levels: Easy, Hard, Hell',
          'Picture-based flashcards with emoji',
          'Pinyin with tone marks and English meaning',
          'Literal and figurative meaning for idioms',
          'Native Mandarin audio pronunciation',
          'Progress and score tracking',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.skillxm.cn/en/' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.skillxm.cn/en/tools/' },
          { '@type': 'ListItem', position: 3, name: 'Learn Chinese with Pictures', item: 'https://www.skillxm.cn/en/tools/picture-learning/' },
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
          <li className="text-[#FFD700]">Picture Learning</li>
        </ol>
      </nav>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, #C41E3A 0%, #8B0000 35%, #3d0606 70%, #1a0808 100%)' }} />
        <div aria-hidden="true" className="absolute inset-x-4 sm:inset-x-8 top-6 bottom-6 border border-[#D4AF37]/30 rounded-[6px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-14 pb-16 text-center">
          <div className="flex justify-center mb-6 gap-2 text-4xl" aria-hidden="true">
            <span>🖼️</span>
            <span>🐯</span>
            <span>🍜</span>
          </div>
          <p
            className="text-4xl sm:text-5xl font-bold mb-3 tracking-[0.15em] select-none"
            style={{ background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            aria-hidden="true"
          >
            看图识字
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F5F0E8] tracking-tight mb-4">
            Learn Chinese with Pictures
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} aria-hidden="true" />
            <span className="text-[#D4AF37] text-lg" aria-hidden="true">❖</span>
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} aria-hidden="true" />
          </div>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 max-w-2xl mx-auto leading-relaxed">
            A free visual vocabulary builder. See a picture, guess the Chinese
            word, then reveal the characters, pinyin and meaning. Climb from
            everyday nouns to four-character idioms.
          </p>
        </div>
      </section>

      {/* ===== SEO content ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#F5F0E8] text-[#1a1a1a]">
        <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-[#C41E3A] text-sm font-medium tracking-[0.3em] uppercase">Visual Learning Method</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 mb-6">
            Why Pictures Make Chinese Stick
          </h2>
          <div className="space-y-5 text-[#1a1a1a]/80 leading-relaxed text-base sm:text-lg">
            <p>
              Learning Chinese with pictures works because it exploits{' '}
              <strong className="text-[#8B0000]">dual coding</strong> — the
              brain stores verbal and visual information in two separate but
              linked systems. When a learner sees a picture of a cat and at the
              same moment meets the character <strong className="text-[#8B0000]">猫</strong>{' '}
              (māo), the image and the word fire together and form a single,
              durable memory trace. This is especially valuable for Mandarin,
              whose characters give few phonetic clues to a beginner: a vivid
              picture supplies the meaning that the unfamiliar script cannot,
              bridging straight from concept to word without a detour through
              English translation.
            </p>
            <p>
              Picture flashcards also lower the barrier for the very first stage
              of study, where the sheer novelty of tones, characters and pinyin
              can feel overwhelming. A friendly emoji turns each new word into a
              small, self-contained puzzle: <em>what is this picture called in
              Chinese?</em> Because the answer arrives instantly — characters,
              pinyin with tone marks and English meaning together — the learner
              gets a clean confirmation loop and builds confidence quickly. Our
              tool carries the idea from concrete{' '}
              <Link href="/en/tools/hsk-flashcards/" className="text-[#8B0000] font-semibold hover:underline">vocabulary</Link>{' '}
              through abstract actions and feelings all the way to{' '}
              <strong className="text-[#8B0000]">chengyu</strong> (成语), the
              four-character idioms whose memorable origin stories make them
              natural candidates for picture-based recall.
            </p>
            <p>
              To get the most out of picture-based learning, combine it with the
              rest of our free toolkit. Use the{' '}
              <Link href="/en/tools/pinyin-converter/" className="text-[#8B0000] font-semibold hover:underline">Pinyin Converter</Link>{' '}
              to check pronunciation, the{' '}
              <Link href="/en/tools/tone-trainer/" className="text-[#8B0000] font-semibold hover:underline">Tone Trainer</Link>{' '}
              to master the four tones, the{' '}
              <Link href="/en/tools/stroke-order/" className="text-[#8B0000] font-semibold hover:underline">Stroke Order</Link>{' '}
              tool to learn to write each character you meet, and the{' '}
              <Link href="/en/tools/reading-reader/" className="text-[#8B0000] font-semibold hover:underline">Reading Reader</Link>{' '}
              to see your new words in real sentences. A short daily session —
              ten pictures revealed, spoken aloud and self-scored — will grow a
              strong, visually anchored Mandarin vocabulary in a matter of
              weeks.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {['learn Chinese pictures', 'Chinese visual vocabulary', 'Chinese picture flashcards', 'emoji Chinese learning', 'chengyu idioms', 'picture vocabulary builder'].map((kw) => (
              <span key={kw} className="px-3 py-1 text-xs font-medium rounded-full border border-[#8B0000]/25 text-[#8B0000] bg-[#8B0000]/5">{kw}</span>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)' }} />
      </section>

      {/* ===== Levels overview ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">The Climb</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">Three Levels of Challenge</h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto mt-3 text-sm">
              Each level adds a new layer of complexity, from concrete objects
              to abstract ideas to idioms rich in cultural story.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {levels.map((l) => (
              <div
                key={l.name}
                className="relative rounded-2xl border border-[#D4AF37]/25 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.9) 0%, rgba(26,8,8,0.95) 100%)' }}
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${l.color}`} aria-hidden="true" />
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#FFD700]">{l.name}</h3>
                    <span className="text-xs text-[#D4AF37]/80 font-medium">{l.count}</span>
                  </div>
                  <p className="text-[#F5F0E8] font-semibold text-sm mb-2">{l.nameZh}</p>
                  <p className="text-[#F5F0E8]/65 text-sm leading-relaxed">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#0f0303]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">The Loop</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">How the Picture Loop Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {methodSteps.map((s, i) => (
              <div
                key={s.title}
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
                <h3 className="text-[#FFD700] font-bold mb-2">{s.title}</h3>
                <p className="text-[#F5F0E8]/65 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Interactive tool ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#0f0303]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Practice Now</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">Interactive Picture Flashcards</h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto mt-3 text-sm">
              Pick a level, look at the picture and guess the Chinese word. Tap
              to reveal characters, pinyin and meaning, hear it spoken, then
              score yourself. Progress is tracked per level right here in the
              browser.
            </p>
          </div>
          <PictureLearning />
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
