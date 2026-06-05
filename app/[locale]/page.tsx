'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { getHomeToolCards, TOOLS } from '@/lib/toolRegistry';
import { defaultLocale, parseLocaleFromPath, localePath, type Locale } from '@/lib/i18n';

// 轮播图数据
const getCarouselItems = (locale: Locale) => [
  {
    id: 1,
    icon: '🧮',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    link: locale === 'zh' ? '/tools/math-worksheet' : `/${locale}/tools/math-worksheet`,
  },
  {
    id: 2,
    icon: '✍️',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    link: locale === 'zh' ? '/tools/calligraphy' : `/${locale}/tools/calligraphy`,
  },
  {
    id: 3,
    icon: '🔤',
    gradient: 'from-rose-500 via-pink-500 to-red-500',
    link: locale === 'zh' ? '/tools/english-calligraphy' : `/${locale}/tools/english-calligraphy`,
  },
  {
    id: 4,
    icon: '🧩',
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    link: locale === 'zh' ? '/tools/sudoku' : `/${locale}/tools/sudoku`,
  },
  {
    id: 5,
    icon: '⚡',
    gradient: 'from-yellow-500 via-amber-500 to-orange-500',
    link: locale === 'zh' ? '/tools/mental-math' : `/${locale}/tools/mental-math`,
  },
  {
    id: 6,
    icon: '🃏',
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
    link: locale === 'zh' ? '/tools/flashcards' : `/${locale}/tools/flashcards`,
  },
  {
    id: 7,
    icon: '📝',
    gradient: 'from-teal-500 via-cyan-500 to-blue-500',
    link: locale === 'zh' ? '/tools/writing-template' : `/${locale}/tools/writing-template`,
  },
];

// 功能介绍卡片图标
const FEATURE_ICONS = ['⚡', '🖨️', '📐'];

// 获取带 locale 前缀的链接（使用通用函数）
// const localePath 已被 localePath 替代

// 颜色映射
const COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue-500 hover:bg-blue-600',
  emerald: 'bg-emerald-500 hover:bg-emerald-600',
  orange: 'bg-orange-500 hover:bg-orange-600',
  rose: 'bg-rose-500 hover:bg-rose-600',
  gray: 'bg-gray-400',
};

export default function HomePage() {
  const pathname = usePathname();
  const locale = parseLocaleFromPath(pathname);
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 获取当前语言的轮播图数据
  const carouselItems = getCarouselItems(locale);

  const handleCopy = () => {
    navigator.clipboard.writeText('https://www.skillxm.cn');
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // 自动轮播
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, carouselItems.length]);

  // 公告滚动 - 使用CSS动画实现
  // 无需JS逻辑，CSS animation已在全局样式中定义

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toolCards = getHomeToolCards();

  return (
    <>
    <h1 className="sr-only">练学宝 - 免费小学教学工具</h1>
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* ===== 顶部导航 ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-base shadow-lg shadow-blue-500/20">
                📚
              </div>
              <a href={`/${locale === 'zh' ? '' : locale}`} className="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
                {t('nav.home')}
              </a>
            </div>

            {/* 桌面导航 */}
            <div className="hidden lg:flex items-center gap-1">
              <a href={`/${locale === 'zh' ? '' : locale}`} className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                {t('nav.home')}
              </a>

              {/* 学习工具下拉 */}
              <div className="relative"
                onMouseEnter={() => setShowToolsMenu(true)}
                onMouseLeave={() => setShowToolsMenu(false)}
              >
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  🛠️ {t('nav.tools')}
                  <svg className={`w-3.5 h-3.5 transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {showToolsMenu && (
                  <div className="absolute left-0 top-full mt-1 bg-slate-800 border border-white/10 rounded-xl shadow-2xl p-2 min-w-[200px] z-50 max-h-[60vh] overflow-y-auto">
                    {TOOLS.filter(t => t.active).map(tool => (
                      <a key={tool.path} href={locale === 'zh' ? tool.path : `/${locale}${tool.path}`} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <span className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center text-sm">{tool.icon}</span>
                        <div><div className="text-white font-medium">{t(`tools.${tool.id}.name`)}</div><div className="text-xs text-gray-500">{t(`tools.${tool.id}.description`)}</div></div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href={localePath('/blog', locale)} className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                📰 {t('nav.blog')}
              </a>

              <a href={localePath('/search', locale)} className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                🔍 {t('nav.search')}
              </a>

              <button onClick={() => setShowTutorial(true)} className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                📖 使用教程
              </button>
              <button onClick={() => setShowShare(true)} className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                🔗 分享
              </button>
              <button onClick={() => setShowDonate(true)} className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                💝 赞助支持
              </button>

                          </div>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label={mobileMenu ? '关闭菜单' : '打开菜单'}
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
            >
              {mobileMenu ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${mobileMenu ? 'visible' : 'invisible'}`}>
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenu ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileMenu(false)} />
          <div className={`absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-slate-900 border-l border-white/10 shadow-2xl transition-transform duration-300 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-sm">📚</div>
                <span className="text-lg font-bold text-white">{t('nav.home')}</span>
              </div>
              <button onClick={() => setMobileMenu(false)} aria-label="关闭菜单" className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-60px)] py-3 px-3 space-y-1">
              <a href={`/${locale === 'zh' ? '' : locale}`} onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-white bg-white/10 rounded-xl">
                <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">🏠</span>
                {t('nav.home')}
              </a>

                            {/* 工具分组 */}
              <div className="pt-2 pb-1 px-3">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t('nav.tools')}</span>
              </div>
              {toolCards.slice(0, 8).map((tool) => (
                <a key={tool.link} href={locale === 'zh' ? tool.link : `/${locale}${tool.link}`} onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                  <span className={`w-8 h-8 bg-blue-500/15 rounded-lg flex items-center justify-center text-sm`}>{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{t(tool.nameKey)}</div>
                    <div className="text-xs text-gray-500">{t(tool.descKey)}</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
              ))}

              <button onClick={() => { setShowTutorial(true); setMobileMenu(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <span className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-sm">📖</span>
                使用教程
              </button>
              <a href={localePath('/search', locale)} onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <span className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-sm">🔍</span>
                {t('nav.search')}
              </a>
              <button onClick={() => { handleCopy(); setMobileMenu(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <span className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-sm">🔗</span>
                分享给朋友
              </button>
              <button onClick={() => { setShowDonate(true); setMobileMenu(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <span className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-sm">💝</span>
                赞助支持
              </button>

              {/* 关于页脚链接 */}
              <div className="pt-3 pb-1 px-3">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">关于</span>
              </div>
              <a href={localePath('/about', locale)} onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <span className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-sm">ℹ️</span>
                {t('nav.about')}
              </a>
              <a href={localePath('/contact', locale)} onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <span className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-sm">📧</span>
                {t('nav.contact')}
              </a>
              <a href={localePath('/privacy', locale)} onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <span className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-sm">🔒</span>
                {t('footer.privacy')}
              </a>
              <a href={localePath('/terms', locale)} onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <span className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-sm">📋</span>
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== 轮播大图区域 ===== */}
      <section className="pt-14">
        <div
          className="relative h-[350px] sm:h-[400px] md:h-[600px] overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {carouselItems.map((item, index) => (
            <a
              key={item.id}
              href={item.link}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              {/* 背景渐变 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90`} />

              {/* 装饰元素 */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">+</div>
                <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float-delay">−</div>
                <div className="absolute bottom-32 left-1/4 text-7xl opacity-20 animate-float">×</div>
                <div className="absolute bottom-20 right-1/3 text-5xl opacity-20 animate-float-delay">÷</div>

                {/* 网格装饰 */}
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
                  <svg viewBox="0 0 400 600" className="w-full h-full">
                    {[...Array(8)].map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={i * 75 + 50} x2="400" y2={i * 75 + 50} stroke="white" strokeWidth="1" />
                    ))}
                    {[...Array(5)].map((_, i) => (
                      <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="600" stroke="white" strokeWidth="1" />
                    ))}
                  </svg>
                </div>
              </div>

              {/* 内容区域 */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                {/* 3D 悬浮标题 */}
                <div className="perspective-1000 mb-6">
                  <h1
                    className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight"
                    style={{
                      textShadow: '0 4px 0 rgba(0,0,0,0.2), 0 8px 0 rgba(0,0,0,0.1), 0 12px 20px rgba(0,0,0,0.3)',
                      transform: 'translateZ(50px)',
                    }}
                  >
                    {t('home.hero.title')}
                  </h1>
                </div>

                {/* 副标题 */}
                <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white/90 mb-4 drop-shadow-lg">
                  {t('home.hero.subtitle')}
                </p>

                {/* 大图标 */}
                <div className="text-8xl mb-8 animate-bounce-slow drop-shadow-2xl">
                  {item.icon}
                </div>

                {/* 按钮 */}
                <button className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-full shadow-xl hover:scale-105 transition-transform">
                  {t('home.hero.ctaPrimary')} →
                </button>
              </div>
            </a>
          ))}

          {/* 轮播指示器 */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`跳转到第 ${index + 1} 张幻灯片`}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* 左右箭头 */}
          <button
            onClick={() => goToSlide((currentSlide - 1 + carouselItems.length) % carouselItems.length)}
            aria-label="上一张"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl backdrop-blur-sm transition-colors z-20"
          >
            ‹
          </button>
          <button
            onClick={() => goToSlide((currentSlide + 1) % carouselItems.length)}
            aria-label="下一张"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl backdrop-blur-sm transition-colors z-20"
          >
            ›
          </button>
        </div>
      </section>

      {/* ===== 公告滚动条 ===== */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap marquee-container">
          <div className="flex gap-12 marquee-content">
            <span className="text-white font-medium px-4">🎉 {t('home.hero.ctaPrimary')}</span>
            <span className="text-white font-medium px-4">🆕 {t('home.hero.subtitle')}</span>
            <span className="text-white font-medium px-4">📢 {t('home.popularTools')}</span>
            <span className="text-white font-medium px-4">💡 {t('home.features.instant.title')}</span>
            <span className="text-white font-medium px-4">🔥 {t('home.features.pdf.title')}</span>
          </div>
          <div className="flex gap-12 marquee-content" aria-hidden="true">
            <span className="text-white font-medium px-4">🎉 {t('home.hero.ctaPrimary')}</span>
            <span className="text-white font-medium px-4">🆕 {t('home.hero.subtitle')}</span>
            <span className="text-white font-medium px-4">📢 {t('home.popularTools')}</span>
            <span className="text-white font-medium px-4">💡 {t('home.features.instant.title')}</span>
            <span className="text-white font-medium px-4">🔥 {t('home.features.pdf.title')}</span>
          </div>
        </div>
      </section>

      {/* ===== 工具导航分类 ===== */}
      <section className="py-10 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
            🛠️ {t('home.popularTools')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolCards.map((tool) => (
              <a
                key={tool.name}
                href={locale === 'zh' ? tool.link : `/${locale}${tool.link}`}
                className={`group relative bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 rounded-2xl p-6 transition-all ${
                  tool.disabled ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 hover:border-white/20'
                }`}
                onClick={tool.disabled ? (e) => e.preventDefault() : undefined}
              >
                {/* 图标 */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>

                {/* 名称 */}
                <h4 className="text-lg font-bold text-white mb-2">
                  {t(tool.nameKey)}
                  {tool.disabled && <span className="ml-2 text-xs text-gray-400">(开发中)</span>}
                </h4>

                {/* 描述 */}
                <p className="text-gray-400 text-sm">{t(tool.descKey)}</p>

                {/* 箭头 */}
                {!tool.disabled && (
                  <div className="absolute bottom-6 right-6 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all">
                    →
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 功能介绍卡片 ===== */}
      <section className="py-10 sm:py-16 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            ✨ {t('home.popularTools')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { key: 'instant', color: 'from-yellow-500 to-orange-500' },
              { key: 'pdf', color: 'from-blue-500 to-indigo-500' },
              { key: 'templates', color: 'from-emerald-500 to-teal-500' },
            ].map((feature, i) => (
              <div
                key={feature.key}
                className="relative bg-slate-800/50 border border-white/10 rounded-2xl p-5 sm:p-8 hover:border-white/20 transition-all hover:scale-105 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-5 shadow-lg`}
                >
                  {FEATURE_ICONS[i]}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t(`home.features.${feature.key}.title`)}</h3>
                <p className="text-gray-400 leading-relaxed">{t(`home.features.${feature.key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 常见问题 FAQ ===== */}
      <section className="py-10 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            ❓ {t('home.faq.title')}
          </h2>
          <div className="space-y-3">
            {['free', 'watermark', 'grades'].map((key, i) => (
              <div
                key={key}
                className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-white font-medium pr-4">{t(`home.faq.${key}.question`)}</span>
                  <span
                    className={`text-gray-400 text-xl flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}
                >
                  <p className="px-6 pb-5 text-gray-400 leading-relaxed">
                    {t(`home.faq.${key}.answer`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 底部页脚 ===== */}
      <footer className="border-t border-white/10 py-8 px-4 mt-8">
        <div className="max-w-6xl mx-auto">
          {/* 链接行 */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-400 mb-4">
            <a href={localePath('/about', locale)} className="hover:text-white transition-colors">{t('footer.about')}</a>
            <span className="text-gray-600">|</span>
            <a href={localePath('/contact', locale)} className="hover:text-white transition-colors">{t('footer.contact')}</a>
            <span className="text-gray-600">|</span>
            <a href={localePath('/blog', locale)} className="hover:text-white transition-colors">{t('nav.blog')}</a>
            <span className="text-gray-600">|</span>
            <a href={localePath('/terms', locale)} className="hover:text-white transition-colors">{t('footer.terms')}</a>
            <span className="text-gray-600">|</span>
            <a href={localePath('/privacy', locale)} className="hover:text-white transition-colors">{t('footer.privacy')}</a>
          </div>
          {/* 友情链接 */}
          <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
            <p className="mb-2 text-gray-400">{t('footer.friendLinks')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.tokenfind.cn/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">Token聚合平台</a>
            </div>
          </div>
          {/* 版权信息 */}
          <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
            <p>{t('footer.copyright')}</p>
          </div>
          {/* 硬编码友链 - 确保静态HTML中直接渲染 */}
          <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
            <p className="mb-2 text-gray-400">友情链接</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.tokenfind.cn/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">Token聚合平台</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== 使用教程弹窗 ===== */}
      {showTutorial && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowTutorial(false)}>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-4 sm:p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">📖 使用教程</h2>
              <button onClick={() => setShowTutorial(false)} aria-label="关闭使用教程" className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-lg font-bold text-blue-400 mb-3">🧮 {t('tools.mathWorksheet.name')}</h3>
                <ol className="space-y-2 text-gray-300 text-sm list-decimal list-inside">
                  <li>{t('tools.mathWorksheet.description')}</li>
                </ol>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-lg font-bold text-emerald-400 mb-3">✍️ {t('tools.calligraphy.name')}</h3>
                <ol className="space-y-2 text-gray-300 text-sm list-decimal list-inside">
                  <li>{t('tools.calligraphy.description')}</li>
                </ol>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30">
                <h3 className="text-lg font-bold text-white mb-2">💡 温馨提示</h3>
                <ul className="space-y-1 text-gray-300 text-sm list-disc list-inside">
                  <li>{t('home.faq.free.answer')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== 分享弹窗 ===== */}
      {showShare && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowShare(false)}>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-md w-full p-4 sm:p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">🔗 分享</h2>
              <button onClick={() => setShowShare(false)} aria-label="关闭分享弹窗" className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <p className="text-gray-400 text-center mb-4">复制下方链接分享给您的朋友</p>
            <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3 border border-white/10">
              <input
                type="text"
                value="https://www.skillxm.cn"
                readOnly
                className="flex-1 bg-transparent text-white text-sm outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors shrink-0"
              >
                {copySuccess ? '已复制' : '复制'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 赞助弹窗 ===== */}
      {showDonate && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowDonate(false)}>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-md w-full p-4 sm:p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">💝 赞助支持</h2>
              <button onClick={() => setShowDonate(false)} aria-label="关闭赞助弹窗" className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
            </div>
            <p className="text-gray-400 text-center mb-6">
              如果这些工具对您有帮助，欢迎赞助支持开发维护！
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">微信支付</p>
                <img src="/donate/wechat.png" alt="微信支付" className="w-full rounded-xl bg-white p-2" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">支付宝</p>
                <img src="/donate/alipay.jpg" alt="支付宝" className="w-full rounded-xl bg-white p-2" />
              </div>
            </div>
            <p className="text-gray-500 text-xs text-center mt-4">感谢您的支持！❤️</p>
          </div>
        </div>
      )}

      {/* ===== 自定义动画样式 ===== */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
    </>
  );
}
