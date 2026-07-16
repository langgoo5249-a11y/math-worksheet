import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chinese Reading Practice - Graded Reader with Pinyin',
  description:
    'Free Chinese graded reader with pinyin and English translation. A sample beginner reading passage, reading tips for beginners, and graded reading level descriptions from beginner to advanced. Practice Mandarin reading free.',
  keywords:
    'Chinese reading practice, graded reader Chinese, Chinese reader with pinyin, Chinese reading for beginners, Mandarin reading practice, HSK reading, Chinese passage with pinyin, free Chinese reader, graded Chinese texts',
  alternates: {
    canonical: 'https://www.skillxm.cn/en/tools/reading-reader/',
    languages: {
      'zh-CN': 'https://www.skillxm.cn/',
      en: 'https://www.skillxm.cn/en/tools/reading-reader/',
      'x-default': 'https://www.skillxm.cn/',
    },
  },
  openGraph: {
    title: 'Chinese Reading Practice - Graded Reader with Pinyin',
    description:
      'Free Chinese graded reader with pinyin and English. Sample beginner passage, reading tips and graded level descriptions.',
    url: 'https://www.skillxm.cn/en/tools/reading-reader/',
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

// A short beginner-level (≈HSK 1-2) reading passage. Each line gives the
// Chinese characters, the pinyin with tone marks, and an English translation.
const passage: { hanzi: string; pinyin: string; english: string }[] = [
  {
    hanzi: '我叫小明，我是学生。',
    pinyin: 'Wǒ jiào Xiǎomíng, wǒ shì xuésheng.',
    english: 'My name is Xiaoming; I am a student.',
  },
  {
    hanzi: '我有一个好朋友，她叫小李。',
    pinyin: 'Wǒ yǒu yí ge hǎo péngyou, tā jiào Xiǎolǐ.',
    english: 'I have a good friend; her name is Xiaoli.',
  },
  {
    hanzi: '小李是中国人，她学习英语。',
    pinyin: 'Xiǎolǐ shì Zhōngguó rén, tā xuéxí Yīngyǔ.',
    english: 'Xiaoli is Chinese; she studies English.',
  },
  {
    hanzi: '我们都喜欢喝茶，也喜欢看书。',
    pinyin: 'Wǒmen dōu xǐhuan hē chá, yě xǐhuan kàn shū.',
    english: 'We both like drinking tea and also like reading books.',
  },
  {
    hanzi: '今天天气很好，我们一起去公园。',
    pinyin: 'Jīntiān tiānqì hěn hǎo, wǒmen yìqǐ qù gōngyuán.',
    english: 'Today the weather is very nice; we go to the park together.',
  },
  {
    hanzi: '在公园里，我们很开心。',
    pinyin: 'Zài gōngyuán lǐ, wǒmen hěn kāixīn.',
    english: 'In the park, we are very happy.',
  },
];

const gradedLevels = [
  { level: 'Beginner', hsk: 'HSK 1-2', desc: 'Short, simple sentences using the 300 most common words. Pinyin shown throughout. Topics: greetings, family, daily life.' },
  { level: 'Elementary', hsk: 'HSK 3', desc: 'Short paragraphs of 2-4 sentences. Around 600 words. Pinyin available on demand. Topics: travel, shopping, hobbies.' },
  { level: 'Intermediate', hsk: 'HSK 4', desc: 'Longer texts expressing opinions. About 1,200 words. Pinyin only for new vocabulary. Topics: work, study, society.' },
  { level: 'Upper-Intermediate', hsk: 'HSK 5', desc: 'Articles, light news and essays. Around 2,500 words. No pinyin by default. Topics: culture, current affairs, ideas.' },
  { level: 'Advanced', hsk: 'HSK 6', desc: 'Literature, opinion pieces and professional writing. 5,000+ words. Native-level reading. Topics: anything, including abstract and literary.' },
];

const readingTips = [
  { title: 'Read at your level', text: 'Choose texts where you understand about 80-90% of the words. Too easy is boring; too hard is frustrating. The sweet spot builds confidence and skill.' },
  { title: 'Read with pinyin, then without', text: 'On your first pass, use pinyin to get the meaning. On the second pass, hide the pinyin and try to read the characters alone.' },
  { title: 'Don\'t look up every word', text: 'When you meet an unknown word, guess from context and keep reading. Look up only words that block your understanding of the whole sentence.' },
  { title: 'Read aloud', text: 'Reading aloud links sound, character and meaning, and trains pronunciation and tones at the same time.' },
  { title: 'Re-read for fluency', text: 'Return to a passage a few days later. The second reading is faster and smoother, which is exactly the fluency you want.' },
  { title: 'Build a vocabulary notebook', text: 'Jot down recurring new words with their sentence. Words you meet in context stick far better than isolated lists.' },
];

export default function ReadingReaderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Chinese Reading Reader',
        applicationCategory: 'EducationApplication',
        operatingSystem: 'Web',
        inLanguage: 'en',
        url: 'https://www.skillxm.cn/en/tools/reading-reader/',
        description:
          'Free Chinese graded reader with pinyin and English translation. Includes a sample beginner passage, reading tips and graded level descriptions.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        isAccessibleForFree: true,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.skillxm.cn/en/' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.skillxm.cn/en/tools/' },
          { '@type': 'ListItem', position: 3, name: 'Reading Reader', item: 'https://www.skillxm.cn/en/tools/reading-reader/' },
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
          <li className="text-[#FFD700]">Reading Reader</li>
        </ol>
      </nav>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, #C41E3A 0%, #8B0000 35%, #3d0606 70%, #1a0808 100%)' }} />
        <div aria-hidden="true" className="absolute inset-x-4 sm:inset-x-8 top-6 bottom-6 border border-[#D4AF37]/30 rounded-[6px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-14 pb-16 text-center">
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 flex items-center justify-center text-2xl font-bold text-[#F5F0E8] rotate-3 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 100%)', border: '2px solid #D4AF37', borderRadius: '4px', boxShadow: '0 0 0 1px #8B0000, 0 0 20px rgba(212,175,55,0.4), inset 0 0 12px rgba(0,0,0,0.4)' }}
              aria-hidden="true"
            >
              读
            </div>
          </div>
          <p
            className="text-4xl sm:text-5xl font-bold mb-3 tracking-[0.15em] select-none"
            style={{ background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            aria-hidden="true"
          >
            中文阅读器
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F5F0E8] tracking-tight mb-4">
            Chinese Reading Practice
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} aria-hidden="true" />
            <span className="text-[#D4AF37] text-lg" aria-hidden="true">❖</span>
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} aria-hidden="true" />
          </div>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 max-w-2xl mx-auto leading-relaxed">
            A graded Chinese reader with pinyin and English translation. Read at
            your level, build fluency with real sentences, and grow from
            beginner texts to advanced articles.
          </p>
        </div>
      </section>

      {/* ===== SEO content ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#F5F0E8] text-[#1a1a1a]">
        <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-[#C41E3A] text-sm font-medium tracking-[0.3em] uppercase">Why Reading Matters</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 mb-6">
            Build Fluency Through Graded Reading
          </h2>
          <div className="space-y-5 text-[#1a1a1a]/80 leading-relaxed text-base sm:text-lg">
            <p>
              Reading is the bridge between learning individual words and
              actually using Chinese. When you read, you meet vocabulary in its
              natural habitat — surrounded by grammar, collocations and cultural
              context — which is what makes words stick. A{' '}
              <strong className="text-[#8B0000]">graded reader</strong> makes
              this process gentle and rewarding: the texts are carefully
              calibrated to your level, so you understand most of what you read
              and can guess the rest from context. That sense of comprehension
              is what turns study into genuine fluency. Below you&apos;ll find a
              short beginner passage presented with characters, pinyin and an
              English translation side by side.
            </p>
            <p>
              The key principle of graded reading is the{' '}
              <strong className="text-[#8B0000]">80-90% rule</strong>: choose
              texts where you already know roughly eight or nine out of every
              ten words. If a text is too easy you learn nothing new; if it is
              too hard you spend all your time in the dictionary and lose the
              flow. Graded readers let you climb gradually from HSK 1 sentences
              of a few words up to full HSK 6 articles, always staying in that
              productive zone. Pinyin and translation are there as a safety net,
              not a crutch — use them on the first pass, then try to read the
              characters alone on a second pass.
            </p>
            <p>
              Reading works best as part of a balanced routine. Pair it with our
              free{' '}
              <Link href="/en/tools/hsk-flashcards/" className="text-[#8B0000] font-semibold hover:underline">HSK Flashcards</Link>{' '}
              to pre-learn the vocabulary you&apos;ll meet, the{' '}
              <Link href="/en/tools/pinyin-converter/" className="text-[#8B0000] font-semibold hover:underline">Pinyin Converter</Link>{' '}
              to check any unfamiliar character, the{' '}
              <Link href="/en/tools/tone-trainer/" className="text-[#8B0000] font-semibold hover:underline">Tone Trainer</Link>{' '}
              so you can read aloud with correct tones, and the{' '}
              <Link href="/en/tools/radical-explorer/" className="text-[#8B0000] font-semibold hover:underline">Radical Explorer</Link>{' '}
              to decode new characters. Even ten minutes of reading a day,
              sustained over months, will transform your Chinese from a
              collection of memorized words into a living language you can
              actually understand.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {['Chinese reading practice', 'graded reader', 'Chinese reader with pinyin', 'HSK reading', 'Mandarin reading', 'beginner Chinese passage'].map((kw) => (
              <span key={kw} className="px-3 py-1 text-xs font-medium rounded-full border border-[#8B0000]/25 text-[#8B0000] bg-[#8B0000]/5">{kw}</span>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)' }} />
      </section>

      {/* ===== Sample passage ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Beginner Passage · HSK 1-2</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">
              我的同班同学 <span className="text-[#FFD700] text-xl">My Classmate</span>
            </h2>
          </div>

          <div
            className="rounded-2xl border border-[#D4AF37]/30 p-6 sm:p-8 space-y-6"
            style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.6) 0%, rgba(26,8,8,0.9) 100%)' }}
          >
            {passage.map((line, i) => (
              <div key={i} className="border-b border-[#D4AF37]/15 pb-5 last:border-b-0 last:pb-0">
                <p className="text-2xl sm:text-3xl text-[#F5F0E8] font-serif leading-snug mb-1">
                  {line.hanzi}
                </p>
                <p className="text-[#FFD700] font-serif text-base sm:text-lg leading-snug mb-1">
                  {line.pinyin}
                </p>
                <p className="text-[#F5F0E8]/60 text-sm italic">{line.english}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[#F5F0E8]/45 text-xs mt-4">
            Tip: read the Chinese aloud using the pinyin, then cover the pinyin
            and try again from the characters alone.
          </p>
        </div>
      </section>

      {/* ===== Reading tips ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#0f0303]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Strategy</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">Reading Tips for Beginners</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {readingTips.map((t, i) => (
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

      {/* ===== Graded levels ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">The Ladder</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">Graded Reading Levels</h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto mt-3 text-sm">
              Each level raises the difficulty just enough to keep you in the
              productive 80-90% comprehension zone.
            </p>
          </div>
          <ol className="space-y-4">
            {gradedLevels.map((l, i) => (
              <li
                key={l.level}
                className="flex gap-4 rounded-xl border border-[#D4AF37]/20 bg-[#3d0606]/40 p-5"
              >
                <span
                  className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full font-bold text-[#1a0808]"
                  style={{ background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 100%)' }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <div className="flex items-baseline gap-2 flex-wrap mb-1">
                    <h3 className="text-[#FFD700] font-semibold">{l.level}</h3>
                    <span className="text-xs text-[#D4AF37]/70 font-medium">{l.hsk}</span>
                  </div>
                  <p className="text-[#F5F0E8]/70 text-sm leading-relaxed">{l.desc}</p>
                </div>
              </li>
            ))}
          </ol>
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
