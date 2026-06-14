'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { articles, defaultAuthor } from '../../../blog/data';
import SiteLayout from '../../../_components/SiteLayout';
import AdUnit from '../../../_components/AdUnit';
import LanguageSwitcher from '../../../_components/LanguageSwitcher';
import GoogleTranslateWidget from '../../../_components/GoogleTranslateWidget';
import { localePath, type Locale } from '@/lib/i18n';
import { useTranslation, translateShortText } from '@/lib/translation';

interface BlogPostPageClientProps {
  slug: string;
  locale: Locale;
}

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

function parseMarkdown(markdown: string): string {
  let html = markdown;

  // Headers: ## and ###
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-8 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-8 mb-4">$1</h2>');

  // Bold: **text**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');

  // Italic: *text*
  html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');

  // Code blocks: ~~~...~~~ or ```...```
  html = html.replace(/~~~([\s\S]*?)~~~/g, '<pre class="bg-slate-900 border border-white/10 rounded-xl p-4 my-4 overflow-x-auto"><code class="text-sm text-green-400">$1</code></pre>');
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-900 border border-white/10 rounded-xl p-4 my-4 overflow-x-auto"><code class="text-sm text-green-400">$1</code></pre>');

  // Inline code: `code`
  html = html.replace(/`([^`]+?)`/g, '<code class="bg-slate-700 px-1.5 py-0.5 rounded text-sm text-blue-300">$1</code>');

  // Unordered lists: - item
  html = html.replace(/^- (.+)$/gm, '<li class="text-gray-300 leading-relaxed ml-4 list-disc">$1</li>');

  // Ordered lists: 1. item
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="text-gray-300 leading-relaxed ml-4 list-decimal">$1</li>');

  // Table rows
  html = html.replace(/^\|(.+)\|$/gm, (match) => {
    const cells = match.split('|').filter(c => c.trim());
    if (cells.every(c => /^[\s-:]+$/.test(c))) {
      return '<!-- table separator -->';
    }
    const cellHtml = cells.map(c => `<td class="border border-white/10 px-3 py-2 text-gray-300 text-sm">${c.trim()}</td>`).join('');
    return `<tr>${cellHtml}</tr>`;
  });

  // Wrap consecutive <tr> in table
  html = html.replace(/((?:<tr>[\s\S]*?<\/tr>\s*)+)/g, '<table class="w-full border-collapse my-4 rounded-xl overflow-hidden">$1</table>');

  // Paragraphs: lines that are not already wrapped in HTML tags
  const lines = html.split('\n');
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed === '' ||
      trimmed.startsWith('<h') ||
      trimmed.startsWith('<li') ||
      trimmed.startsWith('<tr') ||
      trimmed.startsWith('<table') ||
      trimmed.startsWith('</table') ||
      trimmed.startsWith('<!--') ||
      trimmed.startsWith('<pre') ||
      trimmed.startsWith('<div')
    ) {
      result.push(line);
    } else {
      result.push(`<p class="text-gray-300 leading-relaxed mb-4">${trimmed}</p>`);
    }
  }

  return result.join('\n');
}

export default function BlogPostPageClient({ slug, locale }: BlogPostPageClientProps) {
  const t = useTranslations('blog');
  const article = articles.find(a => a.id === slug);
  const isNonZh = locale !== 'zh';

  // 翻译状态
  const [translatedTitle, setTranslatedTitle] = useState('');
  const [translatedDesc, setTranslatedDesc] = useState('');
  const [translatedBio, setTranslatedBio] = useState('');
  const { translatedText: translatedContent, isTranslating, translate: translateContent } = useTranslation(locale);

  // 翻译文章内容
  useEffect(() => {
    if (!article || !isNonZh) return;
    
    // 翻译标题和描述（短文本，快速）
    translateShortText(article.title, locale).then(setTranslatedTitle);
    translateShortText(article.description, locale).then(setTranslatedDesc);
    translateShortText(article.author?.bio || defaultAuthor.bio, locale).then(setTranslatedBio);
    
    // 翻译正文（长文本，异步）
    translateContent(article.content || '');
  }, [article, locale, isNonZh, translateContent]);

  const displayTitle = isNonZh && translatedTitle ? translatedTitle : (article?.title || '');
  const displayDesc = isNonZh && translatedDesc ? translatedDesc : (article?.description || '');
  const displayBio = isNonZh && translatedBio ? translatedBio : (article?.author?.bio || defaultAuthor.bio);
  const displayContent = isNonZh && translatedContent ? translatedContent : (article?.content || '');

  if (!article) {
    return (
      <SiteLayout>
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl mb-4">{t('articleNotFound')}</p>
          <Link
            href={localePath('/blog', locale)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {t('backToBlog')}
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const categoryColors: Record<string, string> = {
    '数学学习': 'bg-blue-500/20 text-blue-300',
    '语文学习': 'bg-emerald-500/20 text-emerald-300',
    '英语学习': 'bg-rose-500/20 text-rose-300',
    '思维训练': 'bg-orange-500/20 text-orange-300',
    '学习方法': 'bg-purple-500/20 text-purple-300',
    '升学指导': 'bg-yellow-500/20 text-yellow-300',
    '工具推荐': 'bg-teal-500/20 text-teal-300',
    '关于我们': 'bg-pink-500/20 text-pink-300',
  };

  // 相关文章推荐：同分类优先，然后是其他分类的最新文章
  const sameCategoryArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 6);

  const otherCategoryArticles = articles
    .filter(a => a.category !== article.category)
    .slice(0, 6 - sameCategoryArticles.length);

  const relatedArticles = [...sameCategoryArticles, ...otherCategoryArticles];

  // 最新文章（用于底部推荐）
  const latestArticles = articles
    .filter(a => a.id !== article.id)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Google Translate Widget for automatic translation */}
      <GoogleTranslateWidget locale={locale} />
      
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
              <a href={localePath('/blog', locale)} className="px-3 py-1.5 text-sm text-white bg-white/10 rounded-lg font-medium">
                {t('nav.blog')}
              </a>
              <a href={localePath('/about', locale)} className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                {t('nav.about')}
              </a>
              <a href={localePath('/contact', locale)} className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
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
        <article className="max-w-3xl mx-auto px-4 py-12">
          {/* Language Notice - 非中文语言时显示 */}
          {locale !== 'zh' && (
            <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-amber-400 text-lg">🌐</span>
                <div>
                  <p className="text-amber-200 font-medium mb-1">{t('languageNotice.title')}</p>
                  <p className="text-amber-200/70 text-sm">{t('languageNotice.description')}</p>
                  {isTranslating && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                      <span className="text-amber-200/70 text-xs">Translating...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-gray-400">
              <li>
                <a href={locale === 'zh' ? '/' : `/${locale}`} className="hover:text-white transition-colors">{t('nav.home')}</a>
              </li>
              <li>/</li>
              <li>
                <Link href={localePath('/blog', locale)} className="hover:text-white transition-colors">{t('nav.blog')}</Link>
              </li>
              <li>/</li>
              <li className="text-gray-300 truncate max-w-[200px]">{displayTitle}</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[article.category] || 'bg-gray-500/20 text-gray-300'}`}>
                {t(`categories.${getCategoryKey(article.category)}`)}
              </span>
              <span className="text-gray-500 text-sm">{article.readTime}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              {isTranslating && !translatedTitle ? (
                <span className="inline-block w-3/4 h-8 bg-slate-700 rounded animate-pulse" />
              ) : (
                displayTitle
              )}
            </h1>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time>{article.date}</time>
              </div>
              {/* 作者信息 */}
              <div className="flex items-center gap-3 py-2 px-4 bg-slate-800/50 rounded-lg border border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {(article.author?.name || defaultAuthor.name).charAt(0)}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{article.author?.name || defaultAuthor.name}</div>
                  <div className="text-gray-500 text-xs">{displayBio}</div>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          {isTranslating && !translatedContent ? (
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-slate-700/50 rounded animate-pulse" style={{ width: `${85 - Math.random() * 30}%` }} />
              ))}
            </div>
          ) : (
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(displayContent) }}
            />
          )}

          {/* 广告位 */}
          <AdUnit />

          {/* 相关文章推荐 - 增强版 */}
          {relatedArticles.length > 0 && (
            <div className="mt-8 p-6 bg-slate-800/50 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">📌 {t('relatedArticles')}</h3>
              <ul className="space-y-3">
                {relatedArticles.map((related) => (
                  <li key={related.id}>
                    <Link
                      href={localePath(`/blog/${related.id}`, locale)}
                      className="flex items-start gap-3 group"
                    >
                      <span className="text-blue-400 mt-0.5">→</span>
                      <div>
                        <span className="text-gray-300 font-medium group-hover:text-blue-400 transition-colors">
                          {related.title}
                        </span>
                        <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${categoryColors[related.category] || 'bg-gray-500/20 text-gray-300'}`}>
                          {t(`categories.${getCategoryKey(related.category)}`)}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Back Button & Related Articles */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <Link
              href={localePath('/blog', locale)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-white/10 text-gray-300 hover:text-white rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('backToBlog')}
            </Link>

            {/* Related Articles Grid - 增强版 */}
            {relatedArticles.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-bold text-white mb-4">📖 {t('relatedArticles')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedArticles.slice(0, 6).map((related) => (
                    <Link
                      key={related.id}
                      href={localePath(`/blog/${related.id}`, locale)}
                      className="bg-slate-800/50 border border-white/10 rounded-xl p-4 hover:border-white/20 hover:bg-slate-700/50 transition-all group"
                    >
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${categoryColors[related.category] || 'bg-gray-500/20 text-gray-300'}`}>
                        {t(`categories.${getCategoryKey(related.category)}`)}
                      </span>
                      <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-gray-500 text-xs mt-2">{related.readTime}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 最新文章推荐 */}
            <div className="mt-10">
              <h3 className="text-lg font-bold text-white mb-4">🆕 {t('latestArticles')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {latestArticles.slice(0, 4).map((latest) => (
                  <Link
                    key={latest.id}
                    href={localePath(`/blog/${latest.id}`, locale)}
                    className="bg-slate-800/30 border border-white/5 rounded-lg p-3 hover:border-white/10 transition-all group"
                  >
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-1 ${categoryColors[latest.category] || 'bg-gray-500/20 text-gray-300'}`}>
                      {t(`categories.${getCategoryKey(latest.category)}`)}
                    </span>
                    <h4 className="text-xs font-medium text-gray-300 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {latest.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="border-t border-white/10 py-8 px-4 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-400 mb-4">
            <a href={localePath('/about', locale)} className="hover:text-white transition-colors">{t('nav.about')}</a>
            <span className="text-gray-600">|</span>
            <a href={localePath('/terms', locale)} className="hover:text-white transition-colors">{t('nav.terms')}</a>
            <span className="text-gray-600">|</span>
            <a href={localePath('/contact', locale)} className="hover:text-white transition-colors">{t('nav.contact')}</a>
            <span className="text-gray-600">|</span>
            <a href={localePath('/blog', locale)} className="hover:text-white transition-colors">{t('nav.blog')}</a>
          </div>
          <div className="text-center text-gray-500 text-sm">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
}
