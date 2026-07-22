import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chinese Stroke Order Practice - Learn to Write Characters',
  description:
    'Learn Chinese character stroke order with clear rules and examples. The 8 basic strokes, general stroke order rules, and common characters broken down stroke by stroke. Free practice guide for beginners.',
  keywords:
    'Chinese stroke order, stroke order rules, how to write Chinese characters, basic strokes of Chinese, 笔顺, Chinese calligraphy strokes, learn to write Chinese, stroke order practice',
  alternates: {
    canonical: 'https://www.skillxm.cn/en/tools/stroke-order/',
    languages: {
      'zh-CN': 'https://www.skillxm.cn/',
      en: 'https://www.skillxm.cn/en/tools/stroke-order/',
      'x-default': 'https://www.skillxm.cn/',
    },
  },
  openGraph: {
    title: 'Chinese Stroke Order Practice - Learn to Write Characters',
    description:
      'Master Chinese stroke order: the 8 basic strokes, general rules, and common characters broken down stroke by stroke. Free.',
    url: 'https://www.skillxm.cn/en/tools/stroke-order/',
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

// The eight fundamental strokes of Chinese calligraphy (永字八法 / Eight
// Principles of Yong), each with its name, pinyin and a simple description.
const basicStrokes = [
  { name: 'Dian', nameZh: '点', pinyin: 'diǎn', desc: 'A dot — a short, slanted press of the brush, the seed of every character.' },
  { name: 'Heng', nameZh: '横', pinyin: 'héng', desc: 'A horizontal line drawn steadily from left to right.' },
  { name: 'Shu', nameZh: '竖', pinyin: 'shù', desc: 'A vertical line drawn straight downward.' },
  { name: 'Pie', nameZh: '撇', pinyin: 'piě', desc: 'A curving stroke falling from upper-right to lower-left.' },
  { name: 'Na', nameZh: '捺', pinyin: 'nà', desc: 'A pressing stroke moving from upper-left to lower-right, ending in a wide tail.' },
  { name: 'Ti', nameZh: '提', pinyin: 'tí', desc: 'A rising stroke flicked from lower-left to upper-right.' },
  { name: 'Zhe', nameZh: '折', pinyin: 'zhé', desc: 'A sharp turn that changes direction, joining two strokes into one.' },
  { name: 'Gou', nameZh: '钩', pinyin: 'gōu', desc: 'A hook — a small upward flick added to the end of another stroke.' },
];

const strokeRules = [
  { rule: 'Top to bottom', example: '三 (sān) — three horizontal lines stacked vertically, written top line first.' },
  { rule: 'Left to right', example: '川 (chuān) — three vertical strokes written from the leftmost to the rightmost.' },
  { rule: 'Horizontal before vertical', example: '十 (shí) — the horizontal stroke is drawn before the vertical one.' },
  { rule: '撇 (pie) before 捺 (na)', example: '人 (rén) — the left-falling pie is drawn before the right-falling na.' },
  { rule: 'Outside before inside', example: '月 (yuè) — the outer frame is drawn before the inner strokes.' },
  { rule: 'Inside before closing', example: '回 (huí) — fill the inside, then draw the closing bottom of the frame last.' },
  { rule: 'Middle before sides', example: '小 (xiǎo) — the center vertical-hook is drawn before the two side dots.' },
];

const exampleCharacters = [
  { char: '一', pinyin: 'yī', meaning: 'one', strokes: '1 stroke', breakdown: 'A single héng (horizontal) stroke.' },
  { char: '人', pinyin: 'rén', meaning: 'person', strokes: '2 strokes', breakdown: 'piě (left-falling) then nà (right-falling).' },
  { char: '大', pinyin: 'dà', meaning: 'big', strokes: '3 strokes', breakdown: 'héng, then piě, then nà — like a person stretching out.' },
  { char: '木', pinyin: 'mù', meaning: 'tree / wood', strokes: '4 strokes', breakdown: 'héng, shù, piě, nà — a trunk with branches.' },
  { char: '日', pinyin: 'rì', meaning: 'sun / day', strokes: '4 strokes', breakdown: 'Outer frame first (shù, héng-zhé, héng), then the inner héng, closed by the bottom héng.' },
  { char: '中', pinyin: 'zhōng', meaning: 'middle', strokes: '4 strokes', breakdown: 'A box (kǒu) drawn first, then the vertical shù through the center.' },
  { char: '水', pinyin: 'shuǐ', meaning: 'water', strokes: '4 strokes', breakdown: 'Center vertical-hook, then the left and right pie and nà.' },
  { char: '好', pinyin: 'hǎo', meaning: 'good', strokes: '6 strokes', breakdown: 'Left part 女 (nǚ) first, then right part 子 (zǐ) — left to right.' },
];

export default function StrokeOrderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Chinese Stroke Order Practice',
        applicationCategory: 'EducationApplication',
        operatingSystem: 'Web',
        inLanguage: 'en',
        url: 'https://www.skillxm.cn/en/tools/stroke-order/',
        description:
          'Learn Chinese character stroke order with clear rules and examples: the 8 basic strokes, general stroke order rules, and common characters broken down stroke by stroke.',
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
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.skillxm.cn/en/' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.skillxm.cn/en/tools/' },
          { '@type': 'ListItem', position: 3, name: 'Stroke Order', item: 'https://www.skillxm.cn/en/tools/stroke-order/' },
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
          <li className="text-[#FFD700]">Stroke Order</li>
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
              笔
            </div>
          </div>
          <p
            className="text-4xl sm:text-5xl font-bold mb-3 tracking-[0.15em] select-none"
            style={{ background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            aria-hidden="true"
          >
            笔顺练习
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F5F0E8] tracking-tight mb-4">
            Chinese Stroke Order Practice
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} aria-hidden="true" />
            <span className="text-[#D4AF37] text-lg" aria-hidden="true">❖</span>
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} aria-hidden="true" />
          </div>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 max-w-2xl mx-auto leading-relaxed">
            Learn to write Chinese characters the right way. Master the eight
            basic strokes, the rules that govern their order, and the
            stroke-by-stroke breakdown of common characters.
          </p>
        </div>
      </section>

      {/* ===== SEO content ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#F5F0E8] text-[#1a1a1a]">
        <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-[#C41E3A] text-sm font-medium tracking-[0.3em] uppercase">Why Stroke Order Matters</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 mb-6">
            The Foundation of Beautiful, Readable Chinese
          </h2>
          <div className="space-y-5 text-[#1a1a1a]/80 leading-relaxed text-base sm:text-lg">
            <p>
              Every Chinese character is built from a small set of basic strokes,
              and the order in which those strokes are drawn — known as{' '}
              <strong className="text-[#8B0000]">bǐshùn (笔顺)</strong>, or stroke
              order — is far more than a stylistic preference. Correct stroke
              order makes characters easier to write quickly and legibly, helps
              your hand flow naturally from one stroke to the next, and is
              essential when you progress to cursive and calligraphy, where
              strokes connect. It also trains muscle memory: once your hand
              knows the path of a character, you recall it as a single fluid
              motion rather than a jumble of lines.
            </p>
            <p>
              Stroke order follows a remarkably consistent set of rules that apply
              to almost every character. You write from top to bottom and from
              left to right; horizontal strokes come before vertical ones; a
              left-falling stroke (piě) comes before a right-falling one (nà);
              the outside of an enclosure is drawn before the inside; and the
              closing stroke at the bottom of a box is saved for last. Once you
              internalize these principles, you can guess the stroke order of an
              unfamiliar character with surprising accuracy, which dramatically
              speeds up learning to write new characters.
            </p>
            <p>
              The best way to practice is to start with the{' '}
              <strong className="text-[#8B0000]">eight basic strokes</strong>{' '}
              that every character is built from — the so-called Eight Principles
              of the character 永 (yǒng, &quot;eternal&quot;). Drill those strokes
              individually until they feel natural, then practice simple
              characters like 一, 人, 大 and 木, and only then move on to more
              complex ones. Pair this stroke-order practice with our free{' '}
              <Link href="/en/tools/pinyin-converter/" className="text-[#8B0000] font-semibold hover:underline">Pinyin Converter</Link>{' '}
              to learn pronunciation, the{' '}
              <Link href="/en/tools/radical-explorer/" className="text-[#8B0000] font-semibold hover:underline">Radical Explorer</Link>{' '}
              to understand what each character means, and{' '}
              <Link href="/en/tools/hsk-flashcards/" className="text-[#8B0000] font-semibold hover:underline">HSK Flashcards</Link>{' '}
              to build vocabulary. With consistent daily practice — even just ten
              characters a day — your handwriting will become both faster and
              more beautiful.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {['Chinese stroke order', '笔顺', 'basic strokes', 'how to write Chinese', 'calligraphy', 'stroke order rules'].map((kw) => (
              <span key={kw} className="px-3 py-1 text-xs font-medium rounded-full border border-[#8B0000]/25 text-[#8B0000] bg-[#8B0000]/5">{kw}</span>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)' }} />
      </section>

      {/* ===== The 8 basic strokes ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">The Building Blocks</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">
              The 8 Basic Strokes <span className="text-[#FFD700]">(永字八法)</span>
            </h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto mt-3 text-sm">
              The character 永 (yǒng, &quot;eternal&quot;) contains all eight fundamental
              strokes of Chinese calligraphy.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {basicStrokes.map((s) => (
              <div
                key={s.name}
                className="relative rounded-2xl border border-[#D4AF37]/25 p-6"
                style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.9) 0%, rgba(26,8,8,0.95) 100%)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-12 h-12 flex items-center justify-center text-2xl text-[#FFD700] font-serif rounded-lg"
                    style={{ background: 'rgba(139,0,0,0.5)', border: '1px solid rgba(212,175,55,0.4)' }}
                    aria-hidden="true"
                  >
                    {s.nameZh}
                  </span>
                  <div>
                    <p className="text-[#F5F0E8] font-bold leading-tight">{s.name}</p>
                    <p className="text-[#D4AF37]/80 text-xs font-serif">{s.pinyin}</p>
                  </div>
                </div>
                <p className="text-[#F5F0E8]/65 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Stroke order rules ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#0f0303]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">The Rules</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">General Stroke Order Rules</h2>
          </div>
          <ol className="space-y-4">
            {strokeRules.map((r, i) => (
              <li
                key={r.rule}
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
                  <h3 className="text-[#FFD700] font-semibold mb-1">{r.rule}</h3>
                  <p className="text-[#F5F0E8]/70 text-sm leading-relaxed">{r.example}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Example characters ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Practice</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">
              Common Characters, Stroke by Stroke
            </h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto mt-3 text-sm">
              Work through these beginner characters in order — each one
              introduces a new stroke-order principle.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {exampleCharacters.map((c) => (
              <div
                key={c.char}
                className="relative rounded-2xl border border-[#D4AF37]/25 p-6 text-center"
                style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.9) 0%, rgba(26,8,8,0.95) 100%)' }}
              >
                <div
                  className="mx-auto mb-4 w-20 h-20 flex items-center justify-center text-5xl text-[#F5F0E8] font-serif rounded-xl"
                  style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid rgba(212,175,55,0.35)' }}
                  aria-hidden="true"
                >
                  {c.char}
                </div>
                <p className="text-[#FFD700] font-serif text-sm">{c.pinyin}</p>
                <p className="text-[#F5F0E8] font-semibold mb-1">{c.meaning}</p>
                <p className="text-[#D4AF37]/70 text-xs mb-3">{c.strokes}</p>
                <p className="text-[#F5F0E8]/65 text-xs leading-relaxed">{c.breakdown}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#D4AF37]/30 bg-[#3d0606]/40 p-6 max-w-3xl mx-auto">
            <h3 className="text-[#FFD700] font-bold mb-2">Practice resources & tips</h3>
            <ul className="text-[#F5F0E8]/75 text-sm space-y-2 list-disc list-inside leading-relaxed">
              <li>Trace each character in a squared 格子 (grid) box to keep proportions balanced.</li>
              <li>Write each character at least 10 times, saying the pinyin aloud as you write.</li>
              <li>Pair writing with our <Link href="/en/tools/pinyin-converter/" className="text-[#FFD700] hover:underline">Pinyin Converter</Link> to lock in pronunciation.</li>
              <li>Study components with the <Link href="/en/tools/radical-explorer/" className="text-[#FFD700] hover:underline">Radical Explorer</Link> so complex characters feel familiar.</li>
              <li>Move from regular script (楷书) to faster running script only after stroke order is automatic.</li>
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
