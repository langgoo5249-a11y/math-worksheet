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
    'learn Chinese, learn Mandarin, Chinese for beginners, pinyin converter, stroke order, HSK practice, Chinese characters, free Chinese learning, Mandarin tones, Chinese reading',
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
  { label: '中文版', href: '/' },
];

const footerLinks = [
  { label: 'Home', href: '/en/' },
  { label: 'Tools', href: '/en/tools/' },
  { label: '中文版', href: '/' },
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
];

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
