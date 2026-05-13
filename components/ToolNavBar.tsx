'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { getNavBarLinks } from '@/lib/toolRegistry';
import { type Locale, defaultLocale } from '@/lib/i18n';

const navLinks = getNavBarLinks();

// 动态导入 LanguageSwitcher，避免服务端渲染问题
const LanguageSwitcher = dynamic(
  () => import('@/app/_components/LanguageSwitcher'),
  { ssr: false }
);

interface ToolNavBarProps {
  /** 当前页面的路径，用于高亮 */
  currentPath?: string;
  /** 页面标题（显示在 Logo 旁） */
  title?: string;
  /** 当前语言，undefined 时默认 'zh'（向后兼容） */
  locale?: Locale;
}

export default function ToolNavBar({ currentPath = '', title, locale = defaultLocale }: ToolNavBarProps) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const t = useTranslations();
  const isEn = locale !== 'zh';

  /** 为链接添加 locale 前缀（中文不加前缀） */
  const localeHref = (href: string) => {
    if (locale === 'zh') return href;
    return `/${locale}${href}`;
  };

  /** 判断当前路径是否匹配（考虑 locale 前缀） */
  const isActive = (href: string) => {
    const fullHref = localeHref(href);
    return currentPath === fullHref || currentPath === href;
  };

  // Logo 文字：非中文时使用翻译
  const logoText = isEn ? t('nav.home') : '教材工具箱';
  // 首页链接文字
  const homeText = isEn ? 'Home' : '首页';

  return (
    <nav className="print:hidden fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-base shadow-lg shadow-blue-500/20">
              📚
            </div>
            <a href={localeHref('/')} className="text-base font-bold text-white hover:opacity-80 transition-opacity">
              {logoText}
            </a>
            {title && (
              <>
                <span className="text-gray-600">/</span>
                <span className="text-sm font-medium text-gray-300 hidden sm:inline">{title}</span>
              </>
            )}
          </div>

          {/* 桌面端导航 */}
          <div className="hidden lg:flex items-center gap-0.5">
            <a href={localeHref('/')} className="px-2.5 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              {homeText}
            </a>
            {navLinks.map(tool => (
              <a
                key={tool.href}
                href={localeHref(tool.href)}
                className={`px-2.5 py-1.5 text-xs rounded-lg transition-all ${
                  isActive(tool.href)
                    ? 'text-white bg-white/10 font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {isEn ? t(tool.nameKey as Parameters<typeof t>[0]) : tool.name}
              </a>
            ))}
            {isEn && <LanguageSwitcher currentLocale={locale} />}
          </div>

          {/* 移动端汉堡按钮 */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isEn ? 'Menu' : '菜单'}
          >
            {mobileMenu ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      {mobileMenu && (
        <div className="lg:hidden bg-[#1a1a1a] border-t border-white/10 py-3 px-4 max-h-[70vh] overflow-y-auto">
          <a href={localeHref('/')} className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            🏠 {homeText}
          </a>
          {navLinks.map(tool => (
            <a
              key={tool.href}
              href={localeHref(tool.href)}
              className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                isActive(tool.href)
                  ? 'text-white bg-white/10 font-medium'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {isEn ? t(tool.nameKey as Parameters<typeof t>[0]) : tool.name}
            </a>
          ))}
          {isEn && (
            <div className="mt-2 pt-2 border-t border-white/10">
              <LanguageSwitcher currentLocale={locale} />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
