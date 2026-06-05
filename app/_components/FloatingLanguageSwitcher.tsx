'use client';

import { useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale, parseLocaleFromPath } from '@/lib/i18n';

export default function FloatingLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = parseLocaleFromPath(pathname);

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    let newPath: string;
    if (newLocale === 'zh') {
      newPath = pathname.replace(/^\/(en|ja|ko)/, '') || '/';
    } else {
      const pathWithoutLocale = pathname.replace(/^\/(en|ja|ko)/, '') || '/';
      newPath = `/${newLocale}${pathWithoutLocale}`;
    }

    startTransition(() => {
      router.push(newPath);
      setIsOpen(false);
    });
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 safe-bottom" id="language-float" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom, 1rem))" }}>
      <div className="relative">
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute bottom-full right-0 mb-3 bg-slate-800 border border-white/10 rounded-xl shadow-2xl p-2 min-w-[140px] z-50">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => handleLocaleChange(locale)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                    locale === currentLocale
                      ? 'text-white bg-blue-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
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

        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isPending}
          className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-xl disabled:opacity-50 group/title"
        >
          <span className="text-white text-xl">🌐</span>
          <span className="absolute bottom-full mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover/title:opacity-100 group-hover/title:visible transition-all duration-200 whitespace-nowrap shadow-lg right-0">
            切换语言
            <div className="absolute top-full right-6 w-2 h-2 bg-gray-800 rotate-45"></div>
          </span>
        </button>
      </div>
    </div>
  );
}