import Link from 'next/link';
import type { Metadata } from 'next';
import PinyinChart from './PinyinChart';
import { enArticles } from '@/app/en/blog/data';

export const metadata: Metadata = {
  title: 'Pinyin Chart - Interactive Chinese Pronunciation Table with Audio',
  description:
    'Complete interactive pinyin chart with 23 initials and 24 finals. Click any cell to hear pronunciation, switch between 4 tones, and learn pronunciation rules like tone sandhi. Free Mandarin pinyin table.',
  keywords:
    'pinyin chart, pinyin table, Chinese pronunciation chart, initials and finals, Mandarin pinyin, pinyin with audio, Chinese phonetics, pinyin sounds, learn pinyin, Chinese syllable chart',
  alternates: {
    canonical: 'https://www.skillxm.cn/en/tools/pinyin-chart/',
    languages: {
      'zh-CN': 'https://www.skillxm.cn/',
      en: 'https://www.skillxm.cn/en/tools/pinyin-chart/',
      'x-default': 'https://www.skillxm.cn/',
    },
  },
  openGraph: {
    title: 'Pinyin Chart - Interactive Chinese Pronunciation Table with Audio',
    description:
      'Complete interactive pinyin chart with 23 initials and 24 finals. Click any cell to hear pronunciation, switch between 4 tones.',
    url: 'https://www.skillxm.cn/en/tools/pinyin-chart/',
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

const relatedArticleIds = [
  'how-to-start-learning-chinese-from-zero',
  'mastering-chinese-tones-scientific-approach',
];
const relatedArticles = enArticles.filter((a) => relatedArticleIds.includes(a.id)).slice(0, 3);

export default function PinyinChartPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Pinyin Chart',
        applicationCategory: 'EducationApplication',
        operatingSystem: 'Web',
        inLanguage: 'en',
        url: 'https://www.skillxm.cn/en/tools/pinyin-chart/',
        description:
          'Complete interactive pinyin chart with 23 initials and 24 finals. Click any cell to hear pronunciation, switch between 4 tones, and learn pronunciation rules.',
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
          { '@type': 'ListItem', position: 3, name: 'Pinyin Chart', item: 'https://www.skillxm.cn/en/tools/pinyin-chart/' },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#1a0808] text-[#F5F0E8]">
      {/* ===== Breadcrumb ===== */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 text-sm text-[#F5F0E8]/55">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/en/" className="hover:text-[#FFD700] transition-colors">Home</Link></li>
          <li aria-hidden="true" className="text-[#D4AF37]/50">/</li>
          <li><Link href="/en/tools/" className="hover:text-[#FFD700] transition-colors">Tools</Link></li>
          <li aria-hidden="true" className="text-[#D4AF37]/50">/</li>
          <li className="text-[#FFD700]">Pinyin Chart</li>
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
              音
            </div>
          </div>
          <p
            className="text-4xl sm:text-5xl font-bold mb-3 tracking-[0.15em] select-none"
            style={{ background: 'linear-gradient(180deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            aria-hidden="true"
          >
            拼音图表
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F5F0E8] tracking-tight mb-4">
            Pinyin Chart
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} aria-hidden="true" />
            <span className="text-[#D4AF37] text-lg" aria-hidden="true">❖</span>
            <span className="h-px w-16 sm:w-24" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} aria-hidden="true" />
          </div>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 max-w-2xl mx-auto leading-relaxed">
            Explore every Mandarin syllable with this complete interactive pinyin
            chart. See all 23 initials and 24 finals, click any cell to hear the
            pronunciation, switch between the four tones, and learn the
            pronunciation rules that make your Chinese sound natural.
          </p>
        </div>
      </section>

      {/* ===== Interactive chart ===== */}
      <section className="relative py-12 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-6xl mx-auto">
          <PinyinChart />
        </div>
      </section>

      {/* ===== SEO content ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#F5F0E8] text-[#1a1a1a]">
        <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1.5" style={{ background: 'linear-gradient(90deg, #8B0000 0%, #C41E3A 30%, #D4AF37 50%, #C41E3A 70%, #8B0000 100%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-[#C41E3A] text-sm font-medium tracking-[0.3em] uppercase">About the Pinyin Chart</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-3 mb-6">
            What Is a Pinyin Chart and Why Is It the Foundation of Chinese Learning?
          </h2>
          <div className="space-y-5 text-[#1a1a1a]/80 leading-relaxed text-base sm:text-lg">
            <p>
              A <strong className="text-[#8B0000]">pinyin chart</strong> is the
              periodic table of Mandarin Chinese — it maps every possible
              syllable in the language by combining 23 initial consonants
              (声母) with 24 final sounds (韵母). The intersection of each row
              and column represents a valid syllable, and mastering this grid
              unlocks the pronunciation of every Chinese word. With just over
              400 valid combinations across four tones, the entire phonetic
              system of Mandarin is compact and learnable — far smaller than
              the thousands of characters you will eventually need to read.
            </p>
            <p>
              The chart is organized so you can see patterns at a glance.
              Initials are grouped by where in the mouth they are produced:
              bilabial sounds (b, p, m) use both lips, alveolar sounds (d, t,
              n, l) place the tongue behind the teeth, retroflex sounds (zh,
              ch, sh, r) curl the tongue back, and palatal sounds (j, q, x)
              raise the tongue body. Finals are organized into three
              categories: simple single vowels, compound diphthongs, and nasal
              finals that end in -n or -ng. Understanding these patterns
              helps you predict the sounds of new syllables you encounter.
            </p>
            <p>
              Our interactive chart goes beyond a static table. Click any
              cell to <strong className="text-[#8B0000]">hear the audio</strong>{' '}
              spoken by a native-sounding voice. Switch between the four tones
              (flat, rising, dip, falling) plus the neutral tone, and compare
              how the same syllable changes meaning with tone. Use the
              all-tone view to see all four tones of a syllable at once. The
              legend lets you filter by initial group, and arrow keys let you
              navigate the grid without a mouse. Pair this chart with our{' '}
              <Link href="/en/tools/tone-trainer/" className="text-[#8B0000] font-semibold hover:underline">Tone Trainer</Link>{' '}
              to drill tone recognition, the{' '}
              <Link href="/en/tools/pinyin-converter/" className="text-[#8B0000] font-semibold hover:underline">Pinyin Converter</Link>{' '}
              to see tone marks on real text, and the{' '}
              <Link href="/en/tools/hsk-flashcards/" className="text-[#8B0000] font-semibold hover:underline">HSK Flashcards</Link>{' '}
              to build vocabulary with correct pronunciation from day one.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {['pinyin chart', 'Chinese pronunciation', 'initials and finals', 'pinyin table', 'Mandarin syllables', 'pinyin audio', 'Chinese phonetics'].map((kw) => (
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

      {/* ===== Initial groups detail ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#1a0808]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Initials</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">The 23 Initial Consonants (声母)</h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto mt-3 text-sm">
              Each initial belongs to a group based on where in the mouth it is produced. Understanding these groups helps you position your tongue and lips correctly.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { group: 'Bilabial', zh: '双唇音', initials: 'b, p, m', desc: 'Both lips come together. b is unaspirated (like "p" in "spy"), p is aspirated (like "p" in "pie"), m is nasal.' },
              { group: 'Labiodental', zh: '唇齿音', initials: 'f', desc: 'Lower lip touches upper teeth — identical to English "f".' },
              { group: 'Alveolar', zh: '舌尖中音', initials: 'd, t, n, l', desc: 'Tongue tip touches the alveolar ridge. d is unaspirated, t is aspirated, n is nasal, l is a lateral.' },
              { group: 'Velar', zh: '舌根音', initials: 'g, k, h', desc: 'Back of tongue touches soft palate. g is unaspirated, k is aspirated, h is like the Scottish "loch" but softer.' },
              { group: 'Palatal', zh: '舌面音', initials: 'j, q, x', desc: 'Tongue body raised to hard palate. j is unaspirated, q is aspirated, x is a soft hissing sound.' },
              { group: 'Retroflex', zh: '翘舌音', initials: 'zh, ch, sh, r', desc: 'Tongue tip curled back. zh is unaspirated, ch is aspirated, sh is like "sh" but with curled tongue. r is a voiced fricative.' },
              { group: 'Dental Sibilant', zh: '平舌音', initials: 'z, c, s', desc: 'Tongue tip behind lower teeth. z is unaspirated (like "dz"), c is aspirated (like "ts"), s is like English "s".' },
              { group: 'Approximant', zh: '半元音', initials: 'y, w', desc: 'Glide sounds that transition into the following vowel. y is like "y" in "yes", w is like "w" in "we".' },
            ].map((g) => (
              <div
                key={g.group}
                className="rounded-xl border border-[#D4AF37]/20 p-5"
                style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.85) 0%, rgba(26,8,8,0.95) 100%)' }}
              >
                <h3 className="text-[#FFD700] font-bold text-sm mb-1">{g.group}</h3>
                <p className="text-[#D4AF37]/80 text-xs mb-2">{g.zh}</p>
                <p className="text-[#F5F0E8] font-mono text-lg mb-2">{g.initials}</p>
                <p className="text-[#F5F0E8]/65 text-xs leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Finals detail ===== */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#0f0303]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase">Finals</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-3">The 24 Finals (韵母)</h2>
            <p className="text-[#F5F0E8]/60 max-w-2xl mx-auto mt-3 text-sm">
              Finals are the vowel and ending sound of a syllable. They fall into three categories: simple vowels, compound diphthongs, and nasal finals.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div
              className="rounded-xl border border-[#D4AF37]/20 p-6"
              style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.85) 0%, rgba(26,8,8,0.95) 100%)' }}
            >
              <h3 className="text-[#FFD700] font-bold mb-3">Simple Finals</h3>
              <p className="text-[#F5F0E8]/60 text-xs mb-4">单韵母 — single vowel sounds</p>
              <div className="flex flex-wrap gap-2">
                {['a', 'o', 'e', 'i', 'u', 'ü'].map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-lg text-sm font-serif text-[#F5F0E8] border border-[#D4AF37]/30" style={{ background: 'rgba(212,175,55,0.1)' }}>{f}</span>
                ))}
              </div>
              <p className="text-[#F5F0E8]/65 text-xs mt-3 leading-relaxed">
                These are the six basic vowels. ü is the most challenging for English speakers — round your lips as if to say "oo" but say "ee" instead.
              </p>
            </div>
            <div
              className="rounded-xl border border-[#D4AF37]/20 p-6"
              style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.85) 0%, rgba(26,8,8,0.95) 100%)' }}
            >
              <h3 className="text-[#FFD700] font-bold mb-3">Compound Finals</h3>
              <p className="text-[#F5F0E8]/60 text-xs mb-4">复韵母 — two or three vowels together</p>
              <div className="flex flex-wrap gap-2">
                {['ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 'üe', 'er'].map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-lg text-sm font-serif text-[#F5F0E8] border border-[#D4AF37]/30" style={{ background: 'rgba(212,175,55,0.1)' }}>{f}</span>
                ))}
              </div>
              <p className="text-[#F5F0E8]/65 text-xs mt-3 leading-relaxed">
                These glide from one vowel position to another. The first vowel is the main one; move smoothly toward the second without a break.
              </p>
            </div>
            <div
              className="rounded-xl border border-[#D4AF37]/20 p-6"
              style={{ background: 'linear-gradient(160deg, rgba(60,10,10,0.85) 0%, rgba(26,8,8,0.95) 100%)' }}
            >
              <h3 className="text-[#FFD700] font-bold mb-3">Nasal Finals</h3>
              <p className="text-[#F5F0E8]/60 text-xs mb-4">鼻韵母 — ending with -n or -ng</p>
              <div className="flex flex-wrap gap-2">
                {['an', 'en', 'in', 'un', 'ün', 'ang', 'eng', 'ing', 'ong'].map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-lg text-sm font-serif text-[#F5F0E8] border border-[#D4AF37]/30" style={{ background: 'rgba(212,175,55,0.1)' }}>{f}</span>
                ))}
              </div>
              <p className="text-[#F5F0E8]/65 text-xs mt-3 leading-relaxed">
                These end with a nasal consonant. -n finals place the tongue tip behind the teeth; -ng finals raise the back of the tongue.
              </p>
            </div>
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