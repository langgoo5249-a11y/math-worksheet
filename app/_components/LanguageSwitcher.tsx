'use client';

import { useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // 构建新的路径
    let newPath: string;
    if (newLocale === 'zh') {
      // 中文是默认语言，移除语言前缀
      newPath = pathname.replace(/^\/(en|ja|ko)/, '') || '/';
    } else {
      // 其他语言，添加语言前缀
      const pathWithoutLocale = pathname.replace(/^\/(en|ja|ko)/, '') || '/';
      newPath = `/${newLocale}${pathWithoutLocale}`;
    }

    startTransition(() => {
      router.push(newPath);
      setIsOpen(false);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="切换语言"
      >
        <span className="text-base">🌐</span>
        <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute right-0 top-full mt-1 bg-slate-800 border border-white/10 rounded-xl shadow-2xl p-1.5 min-w-[140px] z-50"
            role="listbox"
            aria-label="选择语言"
          >
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                  locale === currentLocale
                    ? 'text-white bg-blue-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                role="option"
                aria-selected={locale === currentLocale}
              >
                <span className="w-5 text-center">
                  {locale === currentLocale && '✓'}
                </span>
                <span>{localeNames[locale]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
