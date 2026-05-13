'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { articles, categories } from '../../blog/data';
import type { Category } from '../../blog/data';
import LanguageSwitcher from '../../_components/LanguageSwitcher';
import { defaultLocale, type Locale } from '@/lib/i18n';
import { translateShortText } from '@/lib/translation';

const categoryColors: Record<string, string> = {
  '数学学习': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  '语文学习': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  '英语学习': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  '思维训练': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  '学习方法': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  '升学指导': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  '工具推荐': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  '关于我们': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
};

// 获取分类的翻译键
const getCategoryKey = (category: string): string => {
  const keyMap: Record<string, string> = {
    '全部': 'all',
    '数学学习': 'math',
    '数学': 'math',
    '语文学习': 'chinese',
    '英语学习': 'english',
    '思维训练': 'thinking',
    '学习方法': 'studyMethods',
    '升学指导': 'admissions',
    '工具推荐': 'tools',
    '工具教程': 'tools',
    '关于我们': 'about',
    '综合教育': 'general',
  };
  return keyMap[category] || category;
};

interface BlogPageProps {
  params: { locale: Locale };
}

export default function BlogPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || defaultLocale;
  const t = useTranslations('blog');
  const [activeCategory, setActiveCategory] = useState<Category>('全部');
  const isNonZh = locale !== 'zh';
  const [translations, setTranslations] = useState<Record<string, { title: string; desc: string }>>({});

  // 翻译所有文章的标题和描述
  useEffect(() => {
    if (!isNonZh) return;

    const articlesToTranslate = articles;
    let cancelled = false;

    const translateAll = async () => {
      // 分批翻译，每批 5 篇
      for (let i = 0; i < articlesToTranslate.length; i += 5) {
        if (cancelled) break;
        const batch = articlesToTranslate.slice(i, i + 5);
        const results = await Promise.all(
          batch.map(async (article) => {
            const [title, desc] = await Promise.all([
              translateShortText(article.title, locale),
              translateShortText(article.description, locale),
            ]);
            return { id: article.id, title, desc };
          })
        );
        
        if (!cancelled) {
          setTranslations(prev => {
            const next = { ...prev };
            results.forEach(r => {
              next[r.id] = { title: r.title, desc: r.desc };
            });
            return next;
          });
        }
      }
    };

    translateAll();
    return () => { cancelled = true; };
  }, [locale, isNonZh]);

  const filteredArticles = (activeCategory === '全部'
    ? articles
    : articles.filter(a => a.category === activeCategory)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getBlogLink = (path: string) => {
    return locale === 'zh' ? path : `/${locale}${path}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-base shadow-lg shadow-blue-500/20">
                📚
              </div>
              <a href={locale === 'zh' ? '/' : `/${locale}`} className="text-lg font-bold text-white hover:opacity-80 transition-opacity">
                {t('siteName')}
              </a>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              <a href={locale === 'zh' ? '/' : `/${locale}`} className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                {t('nav.home')}
              </a>
              <span className="px-3 py-1.5 text-sm text-white bg-white/10 rounded-lg font-medium">
                {t('nav.blog')}
              </span>
              <a href={getBlogLink('/about')} className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                {t('nav.about')}
              </a>
              <a href={getBlogLink('/contact')} className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                {t('nav.contact')}
              </a>
              <div className="border-l border-white/10 ml-2 pl-2">
                <LanguageSwitcher currentLocale={locale} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-14">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h1>
            <p className="text-gray-400 text-lg">{t('description')}</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-700/50 border border-white/10'
                }`}
              >
                {cat === '全部' ? t('categories.all') : t(`categories.${getCategoryKey(cat)}`)}
              </button>
            ))}
          </div>

          {/* Article Count */}
          <div className="mb-6 text-sm text-gray-500">
            {t('articleCount', { count: filteredArticles.length })}
            {activeCategory !== '全部' && (
              <span>
                {' '}· {t('currentCategory')}: <span className="text-gray-300">
                  {t(`categories.${getCategoryKey(activeCategory)}`)}
                </span>
              </span>
            )}
          </div>

          {/* Article Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={getBlogLink(`/blog/${article.id}`)}
                className="text-left bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-slate-700/50 transition-all group"
              >
                {/* Category & Read Time */}
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[article.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
                    {t(`categories.${getCategoryKey(article.category)}`)}
                  </span>
                  <span className="text-gray-500 text-xs">{article.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-snug">
                  {translations[article.id]?.title || article.title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {translations[article.id]?.desc || article.description}
                </p>

                {/* Date & Arrow */}
                <div className="flex items-center justify-between">
                  <time className="text-gray-500 text-xs">{article.date}</time>
                  <span className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                    {t('readMore')} &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">{t('noArticles')}</p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 px-4 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-400 mb-4">
            <a href={getBlogLink('/about')} className="hover:text-white transition-colors">{t('nav.about')}</a>
            <span className="text-gray-600">|</span>
            <a href={getBlogLink('/terms')} className="hover:text-white transition-colors">{t('nav.terms')}</a>
            <span className="text-gray-600">|</span>
            <a href={getBlogLink('/contact')} className="hover:text-white transition-colors">{t('nav.contact')}</a>
            <span className="text-gray-600">|</span>
            <a href={getBlogLink('/blog')} className="hover:text-white transition-colors">{t('nav.blog')}</a>
          </div>
          <div className="text-center text-gray-500 text-sm">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
}
