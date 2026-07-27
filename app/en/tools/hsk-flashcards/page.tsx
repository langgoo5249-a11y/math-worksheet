import Link from 'next/link';
import type { Metadata } from 'next';
import HSKFlashcards from './HSKFlashcards';
import { enArticles } from '@/app/en/blog/data';

export const metadata: Metadata = {
  title: 'HSK Flashcards - Free HSK 1-6 Vocabulary Practice',
  description:
    'Free HSK 1-6 flashcards to practice Mandarin vocabulary with spaced repetition. HSK level descriptions, sample HSK 1 vocabulary with pinyin and English, and proven study tips for the Hanyu Shuiping Kaoshi exam.',
  keywords:
    'HSK flashcards, HSK 1 vocabulary, HSK practice, HSK 1-6, Hanyu Shuiping Kaoshi, Chinese vocabulary flashcards, spaced repetition Chinese, HSK exam prep, free HSK words',
  alternates: {
    canonical: 'https://www.example.com/en/tools/hsk-flashcards/',
    languages: {
      'zh-CN': 'https://www.example.com/',
      en: 'https://www.example.com/en/tools/hsk-flashcards/',
      'x-default': 'https://www.example.com/',
    },
  },
  openGraph: {
    title: 'HSK Flashcards - Free HSK 1-6 Vocabulary Practice',
    description:
      'Practice HSK 1-6 vocabulary with spaced repetition. Level descriptions, sample HSK 1 words and study tips. Free.',
    url: 'https://www.example.com/en/tools/hsk-flashcards/',
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

const hskLevels = [
  { level: 'HSK 1', words: '150 words', title: 'Beginner', desc: 'Greetings, numbers, basic phrases and self-introduction. Understand simple everyday expressions.', color: 'from-red-600 to-rose-800' },
  { level: 'HSK 2', words: '300 words', title: 'Elementary', desc: 'Daily life and simple conversations. Handle brief, routine exchanges on familiar topics.', color: 'from-rose-600 to-red-800' },
  { level: 'HSK 3', words: '600 words', title: 'Pre-Intermediate', desc: 'Travel, shopping and routine topics. Communicate on familiar matters in daily life.', color: 'from-amber-600 to-red-800' },
  { level: 'HSK 4', words: '1,200 words', title: 'Intermediate', desc: 'Work, study and opinion exchange. Discuss a range of topics and express viewpoints.', color: 'from-red-700 to-amber-900' },
  { level: 'HSK 5', words: '2,500 words', title: 'Upper-Intermediate', desc: 'News, essays and abstract ideas. Read Chinese newspapers and watch films comfortably.', color: 'from-rose-700 to-yellow-900' },
  { level: 'HSK 6', words: '5,000+ words', title: 'Advanced', desc: 'Fluent reading and professional use. Understand lengthy, complex texts with ease.', color: 'from-yellow-600 to-red-950' },
];

// A sample of 24 high-frequency HSK 1 words with pinyin and English.
const hsk1Sample = [
  { word: '我', pinyin: 'wǒ', english: 'I, me' },
  { word: '你', pinyin: 'nǐ', english: 'you' },
  { word: '他', pinyin: 'tā', english: 'he, him' },
  { word: '她', pinyin: 'tā', english: 'she, her' },
  { word: '我们', pinyin: 'wǒmen', english: 'we, us' },
  { word: '好', pinyin: 'hǎo', english: 'good, well' },
  { word: '是', pinyin: 'shì', english: 'to be (am/is/are)' },
  { word: '不', pinyin: 'bù', english: 'not, no' },
  { word: '有', pinyin: 'yǒu', english: 'to have, there is' },
  { word: '在', pinyin: 'zài', english: 'at, in, on; to be present' },
  { word: '人', pinyin: 'rén', english: 'person, people' },
  { word: '中国', pinyin: 'Zhōngguó', english: 'China' },
  { word: '中文', pinyin: 'Zhōngwén', english: 'Chinese language' },
  { word: '学', pinyin: 'xué', english: 'to learn, to study' },
  { word: '生', pinyin: 'shēng', english: 'student; to be born' },
  { word: '老师', pinyin: 'lǎoshī', english: 'teacher' },
  { word: '朋友', pinyin: 'péngyou', english: 'friend' },
  { word: '爱', pinyin: 'ài', english: 'to love' },
  { word: '吃', pinyin: 'chī', english: 'to eat' },
  { word: '喝', pinyin: 'hē', english: 'to drink' },
  { word: '看', pinyin: 'kàn', english: 'to look, to read, to watch' },
  { word: '谢谢', pinyin: 'xièxie', english: 'thank you' },
  { word: '再见', pinyin: 'zàijiàn', english: 'goodbye' },
  { word: '什么', pinyin: 'shénme', english: 'what' },
];

const studyTips = [
  { title: 'Use spaced repetition', text: 'Review words right before you forget them. Short, frequent sessions beat long cramming sessions, and a spaced-repetition schedule multiplies retention.' },
  { title: 'Learn words in context', text: 'Memorize example sentences, not isolated words. Context gives you grammar, collocations and usage — and makes the word stick.' },
  { title: 'Connect sound, form and meaning', text: 'Say the pinyin aloud, write the character, and recall the English together. Engaging multiple senses builds stronger memory traces.' },
  { title: 'Group by theme and radical', text: 'Cluster words by topic (food, family, travel) and by shared radicals. Patterns make a large vocabulary feel manageable.' },
  { title: 'Practice output, not just recognition', text: 'After reviewing, write your own sentence with each new word. Active recall and production cement knowledge far better than passive reading.' },
  { title: 'Take mock exams regularly', text: 'Every few weeks, do a timed HSK paper at your target level. It reveals weak spots and trains you for the real test format.' },
];

const relatedArticleIds = [
  'hsk-guide-roadmap-to-chinese-fluency',
  'how-to-start-learning-chinese-from-zero',
  'best-free-resources-learn-chinese-online',
];
const relatedArticles = enArticles.filter((a) => relatedArticleIds.includes(a.id)).slice(0, 3);

export default function HskFlashcardsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'HSK Flashcards',
        applicationCategory: 'EducationApplication',
        operatingSystem: 'Web',
        inLanguage: 'en',
        url: 'https://www.example.com/en/tools/hsk-flashcards/',
        description:
          'Free HSK 1-6 flashcards to practice Mandarin vocabulary with spaced repetition. Includes level descriptions, sample HSK 1 vocabulary and study tips.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        isAccessibleForFree: true,
        provider: { '@id': 'https://www.example.com/#organization' },
        author: { '@id': 'https://www.example.com/#person-chenlaoshi' },
        educationalUse: ['Practice', 'Homework', 'Classroom Aid', 'Self-Study'],
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: ['Student', 'Parent', 'Teacher'],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.example.com/en/' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.example.com/en/tools/' },
          { '@type': 'ListItem', position: 3, name: 'HSK Flashcards', item: 'https://www.example.com/en/tools/hsk-flashcards/' },
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
          <li className="text-[#FFD700]">HSK Flashcards</li>
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
              词
            </div>
          </div>
          <p
            className="text-4xl sm:text-5xl font-bold mb-3 tracking-[0.15em] select-none"
            style={{ background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            aria-hidden="true"
          >
            HSK词汇卡
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F5F0E8] tracking-tight mb-4">
            HSK Flashcards
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} aria-hidden="true" />
            <span className="text-[#D4AF37] text-lg" aria-hidden="true">❖</span>
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} aria-hidden="true" />
          </div>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 max-w-2xl mx-auto leading-relaxed">
            Free HSK 1 to HSK 6 vocabulary practice with spaced repetition.
            Learn the words, levels and strategies that take you from beginner
            to advanced Mandarin.
          </p>
        </div>
      </section>

      {/* ===== SEO content ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#F5F0E8] text-[#1a1a1a]">
        <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-[#C41E3A] text-sm font-medium tracking-[0.3em] uppercase">About the HSK</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 mb-6">
            Master Mandarin Vocabulary, Level by Level
          </h2>
          <div className="space-y-5 text-[#1a1a1a]/80 leading-relaxed text-base sm:text-lg">
            <p>
              The <strong className="text-[#8B0000]">HSK</strong> — short for{' '}
              <em>Hànyǔ Shuǐpíng Kǎoshì</em> (汉语水平考试), the Chinese Proficiency
              Test — is the internationally recognized standard for measuring
              Mandarin ability. It runs from HSK 1, which requires only about 150
              words and the most basic greetings, all the way up to HSK 6, which
              demands a vocabulary of more than 5,000 words and the ability to
              read complex newspapers and academic texts fluently. Because the
              HSK provides a clear, level-by-level ladder, it gives learners a
              concrete sense of progress and a meaningful goal to work toward.
            </p>
            <p>
              Vocabulary is the single biggest factor in HSK success, and the
              most efficient way to learn it is with{' '}
              <strong className="text-[#8B0000]">flashcards built on spaced
              repetition</strong>. The idea is simple but powerful: you review a
              word just before you would otherwise forget it, which presses it
              deeper into long-term memory with the minimum number of
              repetitions. Our free HSK flashcards let you drill words at every
              level, from the first 150 HSK 1 words to the advanced vocabulary of
              HSK 6, without any sign-up or cost. Each card shows the Chinese
              character, its pinyin with tone marks, and a clear English
              translation so you can practice recognition, recall and production
              all at once.
            </p>
            <p>
              To get the most out of HSK flashcards, combine them with the rest
              of our free toolkit. Use the{' '}
              <Link href="/en/tools/pinyin-converter/" className="text-[#8B0000] font-semibold hover:underline">Pinyin Converter</Link>{' '}
              to check the pronunciation of any unfamiliar word, the{' '}
              <Link href="/en/tools/tone-trainer/" className="text-[#8B0000] font-semibold hover:underline">Tone Trainer</Link>{' '}
              to internalize the four tones, the{' '}
              <Link href="/en/tools/stroke-order/" className="text-[#8B0000] font-semibold hover:underline">Stroke Order</Link>{' '}
              tool to learn to write each character, and the{' '}
              <Link href="/en/tools/reading-reader/" className="text-[#8B0000] font-semibold hover:underline">Reading Reader</Link>{' '}
              to meet your new words in context. A little daily practice — twenty
              flashcards and one short reading — is enough to climb steadily from
              HSK 1 to HSK 6 over a year or two of consistent study.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {['HSK flashcards', 'HSK 1 vocabulary', 'HSK practice', 'spaced repetition', 'Chinese vocabulary', 'Hanyu Shuiping Kaoshi'].map((kw) => (
              <span key={kw} className="px-3 py-1 text-xs font-medium rounded-full border border-[#8B0000]/25 text-[#8B0000] bg-[#8B0000]/5">{kw}</span>
            ))}
          </div>

          {/* Related blog articles */}
          <div className="mt-10 pt-8 border-t border-[#8B0000]/15">
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Related Blog Articles</h3>
            <div className="space-y-3">
              {relatedArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/en/blog/${article.id}/`}
                  className="block group"
                >
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#8B0000]/5 transition-colors">
                    <span className="shrink-0 mt-0.5 text-[#C41E3A] text-sm" aria-hidden="true">
                      &#128214;
                    </span>
                    <div>
                      <p className="text-[#8B0000] font-semibold group-hover:underline text-sm leading-snug">
                        {article.title}
                      </p>
                      <p className="text-[#1a1a1a]/55 text-xs mt-0.5 line-clamp-1">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/en/blog/"
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-[#8B0000] hover:text-[#C41E3A] transition-colors"
            >
              View All Articles <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)' }} />
      </section>

      {/* ===== HSK levels ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">The Ladder</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">HSK Levels at a Glance</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hskLevels.map((l) => (
              <div
                key={l.level}
                className="relative rounded-2xl border border-[#D4AF37]/25 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.9) 0%, rgba(26,8,8,0.95) 100%)' }}
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${l.color}`} aria-hidden="true" />
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#FFD700]">{l.level}</h3>
                    <span className="text-xs text-[#D4AF37]/80 font-medium">{l.words}</span>
                  </div>
                  <p className="text-[#F5F0E8] font-semibold text-sm mb-2">{l.title}</p>
                  <p className="text-[#F5F0E8]/65 text-sm leading-relaxed">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Sample HSK 1 vocabulary ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#0f0303]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Free Starter Set</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">Sample HSK 1 Vocabulary</h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto mt-3 text-sm">
              24 high-frequency words from the HSK 1 list. Each shows the
              character, pinyin with tones and English meaning.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hsk1Sample.map((w) => (
              <div
                key={w.word}
                className="flex items-center gap-4 rounded-xl border border-[#D4AF37]/20 bg-[#3d0606]/40 p-4"
              >
                <span
                  className="shrink-0 w-14 h-14 flex items-center justify-center text-2xl text-[#F5F0E8] font-serif rounded-lg"
                  style={{ background: 'rgba(139,0,0,0.5)', border: '1px solid rgba(212,175,55,0.4)' }}
                  aria-hidden="true"
                >
                  {w.word}
                </span>
                <div className="min-w-0">
                  <p className="text-[#FFD700] font-serif text-sm">{w.pinyin}</p>
                  <p className="text-[#F5F0E8]/85 text-sm leading-snug">{w.english}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Interactive flashcard practice ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#0f0303]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Practice Now</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">Interactive HSK Flashcards</h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto mt-3 text-sm">
              Pick a level, flip each card to reveal the pinyin and meaning,
              and mark how well you know the word. Your progress is tracked
              right here in the browser.
            </p>
          </div>
          <HSKFlashcards />
        </div>
      </section>

      {/* ===== Study tips ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Study Strategy</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">Tips for HSK Preparation</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {studyTips.map((t, i) => (
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
