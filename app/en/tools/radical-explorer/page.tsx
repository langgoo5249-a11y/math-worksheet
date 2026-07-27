import Link from 'next/link';
import type { Metadata } from 'next';
import RadicalExplorer from './RadicalExplorer';
import { enArticles } from '@/app/en/blog/data';

export const metadata: Metadata = {
  title: 'Chinese Radical Explorer - Character Decomposition',
  description:
    'Explore Chinese radicals and decompose characters into their components. Learn the 214 Kangxi radicals, see the most common 30 radicals with meanings, and study example character breakdowns like 好 = 女 + 子. Free.',
  keywords:
    'Chinese radicals, Kangxi radicals, character decomposition, Chinese character components, 部首, radical explorer, learn Chinese radicals, decompose Chinese characters, common radicals, radical meanings',
  alternates: {
    canonical: 'https://www.example.com/en/tools/radical-explorer/',
    languages: {
      'zh-CN': 'https://www.example.com/',
      en: 'https://www.example.com/en/tools/radical-explorer/',
      'x-default': 'https://www.example.com/',
    },
  },
  openGraph: {
    title: 'Chinese Radical Explorer - Character Decomposition',
    description:
      'Explore Chinese radicals and decompose characters into components. The 214 Kangxi radicals, the most common 30, and example breakdowns like 好 = 女 + 子.',
    url: 'https://www.example.com/en/tools/radical-explorer/',
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

// The most common and useful Chinese radicals, drawn from the 214 Kangxi
// radicals. Each entry lists the radical, its pinyin, its meaning, its stroke
// count (of the radical form) and a character that uses it as a component.
const commonRadicals = [
  { radical: '亻', pinyin: 'rén', meaning: 'person', strokes: 2, example: '你 (nǐ, you)' },
  { radical: '阝', pinyin: 'yì', meaning: 'mound / city', strokes: 2, example: '那 (nà, that)' },
  { radical: '冫', pinyin: 'bīng', meaning: 'ice', strokes: 2, example: '冷 (lěng, cold)' },
  { radical: '口', pinyin: 'kǒu', meaning: 'mouth', strokes: 3, example: '吃 (chī, eat)' },
  { radical: '土', pinyin: 'tǔ', meaning: 'earth', strokes: 3, example: '地 (dì, ground)' },
  { radical: '女', pinyin: 'nǚ', meaning: 'woman', strokes: 3, example: '好 (hǎo, good)' },
  { radical: '子', pinyin: 'zǐ', meaning: 'child', strokes: 3, example: '学 (xué, study)' },
  { radical: '宀', pinyin: 'mián', meaning: 'roof', strokes: 3, example: '家 (jiā, home)' },
  { radical: '山', pinyin: 'shān', meaning: 'mountain', strokes: 3, example: '出 (chū, out)' },
  { radical: '艹', pinyin: 'cǎo', meaning: 'grass', strokes: 3, example: '花 (huā, flower)' },
  { radical: '辶', pinyin: 'chuò', meaning: 'walk', strokes: 3, example: '进 (jìn, enter)' },
  { radical: '心', pinyin: 'xīn', meaning: 'heart', strokes: 4, example: '想 (xiǎng, think)' },
  { radical: '手', pinyin: 'shǒu', meaning: 'hand', strokes: 4, example: '打 (dǎ, hit)' },
  { radical: '日', pinyin: 'rì', meaning: 'sun / day', strokes: 4, example: '明 (míng, bright)' },
  { radical: '木', pinyin: 'mù', meaning: 'tree / wood', strokes: 4, example: '林 (lín, woods)' },
  { radical: '水', pinyin: 'shuǐ', meaning: 'water', strokes: 4, example: '河 (hé, river)' },
  { radical: '火', pinyin: 'huǒ', meaning: 'fire', strokes: 4, example: '烧 (shāo, burn)' },
  { radical: '田', pinyin: 'tián', meaning: 'field', strokes: 5, example: '男 (nán, man)' },
  { radical: '目', pinyin: 'mù', meaning: 'eye', strokes: 5, example: '看 (kàn, look)' },
  { radical: '石', pinyin: 'shí', meaning: 'stone', strokes: 5, example: '矿 (kuàng, mine)' },
  { radical: '禾', pinyin: 'hé', meaning: 'grain', strokes: 5, example: '秋 (qiū, autumn)' },
  { radical: '立', pinyin: 'lì', meaning: 'stand', strokes: 5, example: '产 (chǎn, produce)' },
  { radical: '竹', pinyin: 'zhú', meaning: 'bamboo', strokes: 6, example: '笔 (bǐ, pen)' },
  { radical: '米', pinyin: 'mǐ', meaning: 'rice', strokes: 6, example: '粉 (fěn, powder)' },
  { radical: '虫', pinyin: 'chóng', meaning: 'insect', strokes: 6, example: '蝶 (dié, butterfly)' },
  { radical: '言', pinyin: 'yán', meaning: 'speech', strokes: 7, example: '语 (yǔ, language)' },
  { radical: '足', pinyin: 'zú', meaning: 'foot', strokes: 7, example: '跑 (pǎo, run)' },
  { radical: '金', pinyin: 'jīn', meaning: 'gold / metal', strokes: 8, example: '钱 (qián, money)' },
  { radical: '雨', pinyin: 'yǔ', meaning: 'rain', strokes: 8, example: '雪 (xuě, snow)' },
  { radical: '食', pinyin: 'shí', meaning: 'eat / food', strokes: 9, example: '饭 (fàn, meal)' },
];

// Illustrative character decompositions showing how radicals combine with
// a phonetic or semantic component to build meaning.
const decompositions = [
  { char: '好', pinyin: 'hǎo', meaning: 'good', parts: [{ c: '女', m: 'woman' }, { c: '子', m: 'child' }], story: 'A woman with a child — the picture of goodness.' },
  { char: '明', pinyin: 'míng', meaning: 'bright', parts: [{ c: '日', m: 'sun' }, { c: '月', m: 'moon' }], story: 'Sun and moon together — the two brightest lights, hence "bright".' },
  { char: '休', pinyin: 'xiū', meaning: 'rest', parts: [{ c: '亻', m: 'person' }, { c: '木', m: 'tree' }], story: 'A person leaning against a tree to rest.' },
  { char: '男', pinyin: 'nán', meaning: 'man', parts: [{ c: '田', m: 'field' }, { c: '力', m: 'strength' }], story: 'Strength in the field — the traditional role of a man.' },
  { char: '看', pinyin: 'kàn', meaning: 'to look', parts: [{ c: '手', m: 'hand' }, { c: '目', m: 'eye' }], story: 'A hand shading the eyes to look into the distance.' },
  { char: '妈', pinyin: 'mā', meaning: 'mother', parts: [{ c: '女', m: 'woman' }, { c: '马', m: 'horse (sound mǎ)' }], story: 'The 女 radical gives meaning; 马 gives the sound "ma".' },
  { char: '林', pinyin: 'lín', meaning: 'woods', parts: [{ c: '木', m: 'tree' }, { c: '木', m: 'tree' }], story: 'Two trees together form a woods (three make 森, "forest").' },
  { char: '笔', pinyin: 'bǐ', meaning: 'pen', parts: [{ c: '竹', m: 'bamboo' }, { c: '毛', m: 'hair' }], story: 'A bamboo handle with animal hair — the traditional brush.' },
  { char: '钱', pinyin: 'qián', meaning: 'money', parts: [{ c: '钅', m: 'metal' }, { c: '戋', m: 'small (sound)' }], story: 'Coins are metal; 戋 hints at the sound.' },
  { char: '想', pinyin: 'xiǎng', meaning: 'to think', parts: [{ c: '相', m: 'mutual' }, { c: '心', m: 'heart' }], story: 'Thinking is something the heart does.' },
];

const relatedArticleIds = [
  'chinese-characters-demystifying-writing-system',
  'how-to-start-learning-chinese-from-zero',
];
const relatedArticles = enArticles.filter((a) => relatedArticleIds.includes(a.id)).slice(0, 3);

export default function RadicalExplorerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Chinese Radical Explorer',
        applicationCategory: 'EducationApplication',
        operatingSystem: 'Web',
        inLanguage: 'en',
        url: 'https://www.example.com/en/tools/radical-explorer/',
        description:
          'Explore Chinese radicals and decompose characters into components. Learn the 214 Kangxi radicals, the most common 30, and example character breakdowns.',
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
          { '@type': 'ListItem', position: 3, name: 'Radical Explorer', item: 'https://www.example.com/en/tools/radical-explorer/' },
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
          <li className="text-[#FFD700]">Radical Explorer</li>
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
              部
            </div>
          </div>
          <p
            className="text-4xl sm:text-5xl font-bold mb-3 tracking-[0.15em] select-none"
            style={{ background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            aria-hidden="true"
          >
            部首探索
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F5F0E8] tracking-tight mb-4">
            Chinese Radical Explorer
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} aria-hidden="true" />
            <span className="text-[#D4AF37] text-lg" aria-hidden="true">❖</span>
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} aria-hidden="true" />
          </div>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 max-w-2xl mx-auto leading-relaxed">
            Decompose Chinese characters into their radicals and components.
            Learn the 214 Kangxi radicals, meet the most common 30, and see how
            meaning is built character by character.
          </p>
        </div>
      </section>

      {/* ===== Interactive radical explorer ===== */}
      <RadicalExplorer />

      {/* ===== SEO content ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#F5F0E8] text-[#1a1a1a]">
        <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-[#C41E3A] text-sm font-medium tracking-[0.3em] uppercase">The Building Blocks</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 mb-6">
            How Radicals Unlock Chinese Characters
          </h2>
          <div className="space-y-5 text-[#1a1a1a]/80 leading-relaxed text-base sm:text-lg">
            <p>
              Every Chinese character is assembled from smaller pieces called{' '}
              <strong className="text-[#8B0000]">radicals</strong> (部首, bùshǒu),
              and learning these radicals is one of the most powerful shortcuts
              in all of Chinese study. Radicals serve two jobs at once: they hint
              at a character&apos;s meaning, and they organize the dictionary.
              The character 好 (hǎo, &quot;good&quot;), for example, is built
              from 女 (nǚ, &quot;woman&quot;) and 子 (zǐ, &quot;child&quot;) — a
              mother and child together, the very picture of goodness. Once you
              know that 扌 means &quot;hand,&quot; you can guess that 打, 拉, 推
              and 抱 all involve an action of the hand, even before you learn
              their exact readings.
            </p>
            <p>
              There are{' '}
              <strong className="text-[#8B0000]">214 Kangxi radicals</strong>,
              named after the Kangxi Dictionary of 1716 that standardized them.
              They range from a single stroke (一, 丨, 丶) up to seventeen strokes
              (齒). You do not need to memorize all 214 at once — a core set of
              about 30 high-frequency radicals, like 口 (mouth), 木 (tree), 氵
              (water), 亻 (person) and 心 (heart), appears in the vast majority of
              everyday characters. Mastering that core set lets you decompose
              almost any new character you meet, turning a meaningless jumble of
              strokes into a story you can remember. Our explorer lists the most
              common radicals with their pinyin, meaning and a sample character
              so you can start recognizing them immediately.
            </p>
            <p>
              Decomposition also reveals the elegant logic of how characters are
              formed. Many characters pair a meaning-carrying radical with a
              sound-carrying component: 妈 (mā, &quot;mother&quot;) uses 女
              (&quot;woman&quot;) for meaning and 马 (mǎ, &quot;horse&quot;) for
              sound; 河 (&quot;river&quot;) uses 氵 (&quot;water&quot;) for
              meaning and 可 for sound. Studying these patterns makes new
              vocabulary easier to learn and to retain. Combine the Radical
              Explorer with our free{' '}
              <Link href="/en/tools/pinyin-converter/" className="text-[#8B0000] font-semibold hover:underline">Pinyin Converter</Link>{' '}
              for pronunciation, the{' '}
              <Link href="/en/tools/stroke-order/" className="text-[#8B0000] font-semibold hover:underline">Stroke Order</Link>{' '}
              tool for writing, and the{' '}
              <Link href="/en/tools/hsk-flashcards/" className="text-[#8B0000] font-semibold hover:underline">HSK Flashcards</Link>{' '}
              for vocabulary, and you have a complete system for understanding
              Chinese characters from the inside out.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {['Chinese radicals', 'Kangxi radicals', 'character decomposition', '部首', 'radical meanings', 'Chinese character components'].map((kw) => (
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

      {/* ===== Common radicals ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">From the 214 Kangxi Radicals</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">The 30 Most Common Radicals</h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto mt-3 text-sm">
              Master this core set and you will recognize the building blocks of
              most everyday Chinese characters.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {commonRadicals.map((r) => (
              <div
                key={r.radical + r.pinyin}
                className="rounded-xl border border-[#D4AF37]/25 p-4 text-center"
                style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.9) 0%, rgba(26,8,8,0.95) 100%)' }}
              >
                <span
                  className="block mx-auto mb-2 w-12 h-12 flex items-center justify-center text-2xl text-[#FFD700] font-serif rounded-lg"
                  style={{ background: 'rgba(139,0,0,0.5)', border: '1px solid rgba(212,175,55,0.4)' }}
                  aria-hidden="true"
                >
                  {r.radical}
                </span>
                <p className="text-[#FFD700] font-serif text-xs">{r.pinyin}</p>
                <p className="text-[#F5F0E8]/85 text-sm font-medium">{r.meaning}</p>
                <p className="text-[#F5F0E8]/45 text-[11px] mt-1">{r.strokes} stroke{r.strokes === 1 ? '' : 's'}</p>
                <p className="text-[#D4AF37]/70 text-[11px] mt-1 font-serif">{r.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Decompositions ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#0f0303]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">See It in Action</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">Example Character Decompositions</h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto mt-3 text-sm">
              Watch how radicals combine with other components to build meaning
              and sound.
            </p>
          </div>
          <div className="space-y-4">
            {decompositions.map((d) => (
              <div
                key={d.char}
                className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-xl border border-[#D4AF37]/20 bg-[#3d0606]/40 p-5"
              >
                {/* Whole character */}
                <div className="flex items-center gap-4 sm:w-44 shrink-0">
                  <span
                    className="w-16 h-16 flex items-center justify-center text-4xl text-[#F5F0E8] font-serif rounded-xl"
                    style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid rgba(212,175,55,0.35)' }}
                    aria-hidden="true"
                  >
                    {d.char}
                  </span>
                  <div>
                    <p className="text-[#FFD700] font-serif text-sm">{d.pinyin}</p>
                    <p className="text-[#F5F0E8]/85 text-sm">{d.meaning}</p>
                  </div>
                </div>

                {/* Decomposition */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[#D4AF37] text-sm font-medium">=</span>
                  {d.parts.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="text-center">
                        <span
                          className="inline-flex items-center justify-center w-12 h-12 text-2xl text-[#FFD700] font-serif rounded-lg"
                          style={{ background: 'rgba(139,0,0,0.5)', border: '1px solid rgba(212,175,55,0.4)' }}
                          aria-hidden="true"
                        >
                          {p.c}
                        </span>
                        <p className="text-[#F5F0E8]/60 text-[11px] mt-1">{p.m}</p>
                      </div>
                      {i < d.parts.length - 1 && (
                        <span className="text-[#D4AF37] text-sm" aria-hidden="true">+</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Story */}
                <p className="sm:ml-auto text-[#F5F0E8]/65 text-xs italic sm:max-w-xs sm:text-right leading-relaxed">
                  {d.story}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#D4AF37]/30 bg-[#3d0606]/40 p-6 max-w-3xl mx-auto">
            <h3 className="text-[#FFD700] font-bold mb-2">How radicals help you learn</h3>
            <ul className="text-[#F5F0E8]/75 text-sm space-y-2 list-disc list-inside leading-relaxed">
              <li><strong className="text-[#F5F0E8]">Meaning clues:</strong> the radical often signals the broad category — water (氵), fire (火), hand (扌), and so on.</li>
              <li><strong className="text-[#F5F0E8]">Sound clues:</strong> the non-radical component frequently hints at pronunciation, as in 妈 (mā) ← 马 (mǎ).</li>
              <li><strong className="text-[#F5F0E8]">Memory hooks:</strong> decomposing a character into a story (a person resting on a tree = 休) makes it unforgettable.</li>
              <li><strong className="text-[#F5F0E8]">Dictionary lookup:</strong> radicals are the index of every Chinese dictionary, so knowing them lets you find any character fast.</li>
            </ul>
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
