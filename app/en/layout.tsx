import type { Metadata } from 'next';
import Link from 'next/link';

// Layout-level metadata for all English pages.
export const metadata: Metadata = {
  metadataBase: new URL('https://www.skillxm.cn'),
  title: {
    default: 'Learn Chinese Free | SkillXM',
    template: '%s | SkillXM',
  },
  description:
    'Free online tools to learn Chinese (Mandarin): pinyin converter, stroke order practice, HSK flashcards, tone trainer, graded reader and radical explorer. No registration required.',
  keywords:
    'learn Chinese, learn Mandarin, Chinese for beginners, pinyin converter, pinyin chart, stroke order, HSK practice, Chinese characters, free Chinese learning, Mandarin tones, picture learning, Chinese reading',
  alternates: {
    canonical: 'https://www.skillxm.cn/en/',
    languages: {
      'zh-CN': 'https://www.skillxm.cn/',
      'en': 'https://www.skillxm.cn/en/',
      'x-default': 'https://www.skillxm.cn/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'SkillXM',
    locale: 'en_US',
    url: 'https://www.skillxm.cn/en/',
    title: 'Learn Chinese Free - Online Mandarin Learning Tools',
    description:
      'Free interactive tools for learning Chinese: pinyin converter, stroke order, HSK flashcards, tone trainer, and more.',
    images: [
      {
        url: 'https://www.skillxm.cn/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Learn Chinese Free - SkillXM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn Chinese Free - Online Mandarin Learning Tools',
    description:
      'Free interactive tools for learning Chinese: pinyin converter, stroke order, HSK flashcards, tone trainer, and more.',
    images: ['https://www.skillxm.cn/og-image.jpg'],
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

const navLinks = [
  { label: 'Home', href: '/en/' },
  { label: 'Tools', href: '/en/tools/' },
  { label: 'Blog', href: '/en/blog/' },
  { label: '中文版', href: '/' },
];

const footerLinks = [
  { label: 'Home', href: '/en/' },
  { label: 'Tools', href: '/en/tools/' },
  { label: 'Blog', href: '/en/blog/' },
  { label: '中文版', href: '/' },
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
];

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const enSchemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.skillxm.cn/en/#website",
        name: "SkillXM - Learn Chinese Free",
        url: "https://www.skillxm.cn/en/",
        description:
          "Free online tools to learn Chinese (Mandarin): pinyin converter, stroke order practice, HSK flashcards, tone trainer, graded reader, radical explorer, picture learning, and pinyin chart. No registration required.",
        inLanguage: "en",
        dateModified: "2026-08-09",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.skillxm.cn/en/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
        publisher: {
          "@id": "https://www.skillxm.cn/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://www.skillxm.cn/#organization",
        name: "SkillXM",
        url: "https://www.skillxm.cn/en/",
        logo: {
          "@type": "ImageObject",
          url: "https://www.skillxm.cn/favicon.svg",
          width: 512,
          height: 512,
        },
        description:
          "SkillXM provides free online tools for learning Chinese (Mandarin). Pinyin converter, stroke order, HSK flashcards, tone trainer, picture learning, pinyin chart, graded reader, and radical explorer — all free, no registration.",
        foundingDate: "2025-12-01",
        knowsAbout: [
          "Chinese language learning",
          "Mandarin Chinese",
          "Pinyin",
          "HSK exam preparation",
          "Chinese characters",
          "Stroke order",
          "Chinese tones",
          "Chinese radicals",
          "Online education",
          "Language learning tools",
        ],
        sameAs: [
          "https://github.com/langgoo5249-a11y/math-worksheet",
          "https://www.skillxm.cn/en/",
          "https://www.skillxm.cn/",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "contact@skillxm.cn",
          contactType: "customer support",
          availableLanguage: ["English", "Chinese", "Japanese", "Korean"],
        },
        areaServed: {
          "@type": "Country",
          name: "Worldwide",
        },
      },
      {
        "@type": "Person",
        "@id": "https://www.skillxm.cn/#person-chenlaoshi",
        name: "Chen Laoshi",
        description: "Founder of SkillXM, experienced Chinese language educator and full-stack developer.",
        jobTitle: "Educational Content Author",
        sameAs: [
          "https://github.com/langgoo5249-a11y",
          "https://www.skillxm.cn/about/"
        ],
        knowsAbout: ["Chinese Language Education", "HSK Preparation", "Chinese Character Writing", "Pinyin Instruction", "Educational Technology"],
        affiliation: { "@id": "https://www.skillxm.cn/#organization" },
        url: "https://www.skillxm.cn/about/"
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.skillxm.cn/en/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is SkillXM?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SkillXM is a free online platform for learning Chinese (Mandarin). It provides 8 interactive tools including pinyin converter, stroke order practice, HSK flashcards, tone trainer, picture learning, pinyin chart, graded reader, and radical explorer. No registration required, completely free to use."
            }
          },
          {
            "@type": "Question",
            "name": "Are the tools free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all SkillXM tools are completely free. There are no paywalls, no premium tiers, and no registration required. You can access all 8 Chinese learning tools — pinyin converter, stroke order, HSK flashcards, tone trainer, picture learning, pinyin chart, reading reader, and radical explorer — without paying anything."
            }
          },
          {
            "@type": "Question",
            "name": "What HSK levels does SkillXM cover?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SkillXM covers HSK 1 through HSK 6, supporting learners from absolute beginner (HSK 1, 150 words) to advanced proficiency (HSK 6, 5,000+ words). Our HSK flashcards provide vocabulary by level, the reading reader offers graded passages, and the pinyin chart and tone trainer build the pronunciation foundation needed at every level."
            }
          }
        ]
      },
      {
        '@type': 'SpeakableSpecification',
        '@id': 'https://www.skillxm.cn/en/#speakable',
        xpath: [
          '/html/head/title',
          "/html/head/meta[@name='description']/@content",
        ],
      },
    ],
  };

  return (
    <>
      {/* JSON-LD structured data for English pages */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(enSchemaOrg) }}
      />
      {/* Decorative top band */}
      <div
        aria-hidden="true"
        className="h-1.5 w-full"
        style={{
          background:
            'linear-gradient(90deg, #8B0000 0%, #C41E3A 25%, #D4AF37 50%, #C41E3A 75%, #8B0000 100%)',
        }}
      />

      {/* ===== Navigation bar ===== */}
      <header className="sticky top-0 z-40 border-b border-[#D4AF37]/30 bg-gradient-to-r from-[#5c0a0a] via-[#8B0000] to-[#5c0a0a]">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/en/" className="flex items-center gap-2 shrink-0">
            <span
              className="w-9 h-9 flex items-center justify-center text-base font-bold text-[#F5F0E8] rounded"
              style={{
                background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 100%)',
                border: '1px solid #D4AF37',
              }}
              aria-hidden="true"
            >
              学
            </span>
            <span className="text-lg font-bold text-[#F5F0E8]">SkillXM</span>
          </Link>
          <ul className="flex items-center gap-1 sm:gap-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="px-3 py-1.5 rounded-full text-[#F5F0E8]/80 hover:text-[#FFD700] hover:bg-[#D4AF37]/10 border border-transparent hover:border-[#D4AF37]/40 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* ===== Page content ===== */}
      <main>{children}</main>

      {/* ===== Footer ===== */}
      <footer className="relative bg-[#0f0303] text-[#F5F0E8] pt-12 pb-8 px-4 sm:px-6">
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-1"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #8B0000 20%, #D4AF37 50%, #8B0000 80%, transparent 100%)',
          }}
        />
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <Link href="/en/" className="flex items-center gap-2">
              <span
                className="w-9 h-9 flex items-center justify-center text-base font-bold text-[#F5F0E8] rounded"
                style={{
                  background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 100%)',
                  border: '1px solid #D4AF37',
                }}
                aria-hidden="true"
              >
                学
              </span>
              <span className="text-lg font-bold text-[#F5F0E8]">SkillXM</span>
            </Link>
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#F5F0E8]/70 hover:text-[#FFD700] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div
            aria-hidden="true"
            className="h-px w-full mb-6"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
            }}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F5F0E8]/40">
            <p className="flex items-center gap-2">
              <span aria-hidden="true" className="text-[#D4AF37]">☁</span>
              &copy; 2026 SkillXM. Learn Chinese Free.
            </p>
            <p>Free Mandarin learning tools for the world.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
