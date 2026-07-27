import { Metadata } from 'next';
import Link from 'next/link';
import { articles, categories } from '../../../../blog/data';
import type { Category } from '../../../../blog/data';
import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from '../../../../_components/LanguageSwitcher';
import { localePath, type Locale } from '@/lib/i18n';

const BASE_URL = 'https://www.example.com';

// 分类颜色配置
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

// 排除'全部'的分类列表
const categoryList = categories.filter(c => c !== '全部') as Exclude<Category, '全部'>[];

interface PageProps {
  params: Promise<{ category: string; locale: Locale }>;
}

export function generateStaticParams() {
  // 仅生成中文版本（zh）的分类静态页面
  return categoryList.map((category) => ({
    category: category,
    locale: 'zh' as const,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  // 验证分类是否有效
  if (!categoryList.includes(category as Exclude<Category, '全部'>)) {
    return {
      title: t('categoryNotFound'),
    };
  }

  const categoryArticles = articles.filter(a => a.category === category);
  const count = categoryArticles.length;
  const categoryName = t(`categories.${getCategoryKey(category)}`);

  const description = t('categoryPage.description', {
    category: categoryName,
    count: count,
  });

  return {
    title: t('categoryPage.title', { category: categoryName }),
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale === 'zh' ? '' : locale + '/'}blog/category/${category}/`,
      languages: {
        'zh-CN': `${BASE_URL}/blog/category/${category}/`,
        'en': `${BASE_URL}/en/blog/category/${category}/`,
        'ja': `${BASE_URL}/ja/blog/category/${category}/`,
        'ko': `${BASE_URL}/ko/blog/category/${category}/`,
        'x-default': `${BASE_URL}/blog/category/${category}/`,
      },
    },
    openGraph: {
      title: t('categoryPage.title', { category: categoryName }),
      description,
      type: 'website',
      url: `${BASE_URL}/${locale === 'zh' ? '' : locale + '/'}blog/category/${category}/`,
      siteName: t('siteName'),
      locale: locale === 'zh' ? 'zh_CN' : locale,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  // 验证分类是否有效
  const isValidCategory = categoryList.includes(category as Exclude<Category, '全部'>);

  if (!isValidCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
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
            </div>
          </div>
        </nav>
        <main className="pt-14">
          <div className="max-w-5xl mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">{t('categoryNotFound')}</h1>
            <p className="text-gray-400 mb-8">{t('categoryNotFoundDesc')}</p>
            <Link
              href={localePath('/blog', locale)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {t('backToBlog')}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const categoryArticles = articles
    .filter(a => a.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const count = categoryArticles.length;
  const categoryName = t(`categories.${getCategoryKey(category)}`);

  // JSON-LD 结构化数据
  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('categoryPage.title', { category: categoryName }),
    description: t('categoryPage.description', { category: categoryName, count }),
    url: `${BASE_URL}/${locale === 'zh' ? '' : locale + '/'}blog/category/${category}/`,
    isPartOf: {
      '@type': 'WebSite',
      name: t('siteName'),
      url: BASE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: count,
      itemListElement: categoryArticles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          name: article.title,
          description: article.description,
          url: `${BASE_URL}/blog/${article.id}/`,
          datePublished: article.date,
        },
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('nav.home'),
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('nav.blog'),
        item: `${BASE_URL}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryName,
        item: `${BASE_URL}/blog/category/${category}/`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
          <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm" aria-label="breadcrumb">
              <ol className="flex items-center gap-2 text-gray-400" itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <a href={locale === 'zh' ? '/' : `/${locale}`} itemProp="item" className="hover:text-white transition-colors">
                    <span itemProp="name">{t('nav.home')}</span>
                  </a>
                  <meta itemProp="position" content="1" />
                </li>
                <li className="text-gray-600">/</li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href={localePath('/blog', locale)} itemProp="item" className="hover:text-white transition-colors">
                    <span itemProp="name">{t('nav.blog')}</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <li className="text-gray-600">/</li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span itemProp="name" className="text-gray-300">{categoryName}</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>

            {/* Page Header */}
            <header className="text-center mb-10">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${categoryColors[category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
                {categoryName}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{categoryName}</h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {t('categoryPage.articleCount', { count })}
              </p>
            </header>

            {/* Article Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryArticles.map((article) => (
                <Link
                  key={article.id}
                  href={localePath(`/blog/${article.id}`, locale)}
                  className="text-left bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-slate-700/50 transition-all group"
                >
                  {/* Category & Read Time */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[article.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
                      {categoryName}
                    </span>
                    <span className="text-gray-500 text-xs">{article.readTime}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-snug">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {article.description}
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
            {categoryArticles.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">{t('noArticles')}</p>
              </div>
            )}

            {/* Other Categories - 内部链接 */}
            <div className="mt-16 pt-10 border-t border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">{t('categoryPage.otherCategories')}</h2>
              <div className="flex flex-wrap gap-3">
                {categoryList
                  .filter(c => c !== category)
                  .map((cat) => {
                    const catCount = articles.filter(a => a.category === cat).length;
                    return (
                      <Link
                        key={cat}
                        href={localePath(`/blog/category/${cat}`, locale)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all hover:scale-105 ${categoryColors[cat] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}
                      >
                        {t(`categories.${getCategoryKey(cat)}`)}（{catCount}）
                      </Link>
                    );
                  })}
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-10 text-center">
              <Link
                href={localePath('/blog', locale)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-white/10 text-gray-300 hover:text-white rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('backToBlog')}
              </Link>
            </div>
          </div>
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
    </>
  );
}
