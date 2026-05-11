import { Metadata } from 'next';
import Link from 'next/link';
import { articles, categories } from '../../data';
import type { Category } from '../../data';

const BASE_URL = 'https://www.skillxm.cn';

// 分类 SEO 配置
const categorySEOConfig: Record<string, {
  keywords: string[];
  topics: string;
  ability: string;
}> = {
  '数学学习': {
    keywords: ['小学数学学习方法', '数学学习技巧', '数学提分', '数学思维训练', '小学数学辅导'],
    topics: '应用题解题技巧、计算能力提升、数学思维培养等核心内容',
    ability: '数学',
  },
  '语文学习': {
    keywords: ['小学语文学习方法', '语文学习技巧', '阅读理解', '作文写作', '语文提分'],
    topics: '阅读理解技巧、作文写作方法、基础知识积累等核心内容',
    ability: '语文',
  },
  '英语学习': {
    keywords: ['小学英语学习方法', '英语学习技巧', '英语单词记忆', '英语口语', '英语提分'],
    topics: '单词记忆方法、口语练习技巧、语法基础等核心内容',
    ability: '英语',
  },
  '思维训练': {
    keywords: ['儿童思维训练', '逻辑思维培养', '数独训练', '记忆力训练', '专注力训练'],
    topics: '逻辑思维培养、记忆力训练、专注力提升等核心内容',
    ability: '思维能力',
  },
  '学习方法': {
    keywords: ['小学生学习方法', '学习习惯培养', '时间管理', '错题本', '作业效率'],
    topics: '学习习惯培养、时间管理技巧、高效作业方法等核心内容',
    ability: '综合学习',
  },
  '升学指导': {
    keywords: ['幼升小准备', '小升初', '升学面试', '择校指南', '升学政策'],
    topics: '升学政策解读、面试准备技巧、择校建议等核心内容',
    ability: '升学竞争力',
  },
  '工具推荐': {
    keywords: ['免费教学工具', '在线教育工具', '小学学习工具', '学习软件推荐', '教育APP'],
    topics: '免费教学工具、在线学习平台、教育APP推荐等核心内容',
    ability: '学习效率',
  },
  '关于我们': {
    keywords: ['教材工具箱介绍', '教育工具团队', '关于我们', '教育理念', '团队介绍'],
    topics: '团队介绍、教育理念、产品更新等核心内容',
    ability: '教育认知',
  },
};

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

// 排除'全部'的分类列表
const categoryList = categories.filter(c => c !== '全部');

export function generateStaticParams() {
  return categoryList.map((category) => ({
    category: category,
  }));
}

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;

  // 验证分类是否有效
  if (!categoryList.includes(category as (typeof categoryList)[number])) {
    return {
      title: '分类未找到 - 教材工具箱',
    };
  }

  const config = categorySEOConfig[category] || {
    keywords: [],
    topics: '相关教育内容',
    ability: '综合',
  };

  const categoryArticles = articles.filter(a => a.category === category);
  const count = categoryArticles.length;
  const description = `教材工具箱${category}专栏：共${count}篇原创文章，涵盖${config.topics}。分享实用的${category}经验和方法，帮助小学生提升${config.ability}能力。`;

  return {
    title: `${category} - 教材工具箱教育博客`,
    description,
    keywords: config.keywords,
    alternates: {
      canonical: `${BASE_URL}/blog/category/${category}/`,
    },
    openGraph: {
      title: `${category} - 教材工具箱教育博客`,
      description,
      type: 'website',
      url: `${BASE_URL}/blog/category/${category}/`,
      siteName: '教材工具箱',
      locale: 'zh_CN',
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  // 验证分类是否有效
  const isValidCategory = categoryList.includes(category as (typeof categoryList)[number]);

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
                <a href="/" className="text-lg font-bold text-white hover:opacity-80 transition-opacity">
                  教材工具箱
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-14">
          <div className="max-w-5xl mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">分类未找到</h1>
            <p className="text-gray-400 mb-8">您访问的分类不存在</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              返回博客列表
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const config = categorySEOConfig[category] || {
    keywords: [],
    topics: '相关教育内容',
    ability: '综合',
  };

  const categoryArticles = articles
    .filter(a => a.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const count = categoryArticles.length;
  const description = `教材工具箱${category}专栏：共${count}篇原创文章，涵盖${config.topics}。分享实用的${category}经验和方法，帮助小学生提升${config.ability}能力。`;

  // JSON-LD 结构化数据
  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category} - 教材工具箱教育博客`,
    description,
    url: `${BASE_URL}/blog/category/${category}/`,
    isPartOf: {
      '@type': 'WebSite',
      name: '教材工具箱',
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
        name: '首页',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '教育博客',
        item: `${BASE_URL}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category,
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
                <a href="/" className="text-lg font-bold text-white hover:opacity-80 transition-opacity">
                  教材工具箱
                </a>
              </div>
              <div className="hidden lg:flex items-center gap-1">
                <a href="/" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">首页</a>
                <a href="/blog" className="px-3 py-1.5 text-sm text-white bg-white/10 rounded-lg font-medium">教育博客</a>
                <a href="/about" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">关于我们</a>
                <a href="/contact" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">联系我们</a>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-14">
          <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm" aria-label="面包屑导航">
              <ol className="flex items-center gap-2 text-gray-400" itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <a href="/" itemProp="item" className="hover:text-white transition-colors">
                    <span itemProp="name">首页</span>
                  </a>
                  <meta itemProp="position" content="1" />
                </li>
                <li className="text-gray-600">/</li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href="/blog" itemProp="item" className="hover:text-white transition-colors">
                    <span itemProp="name">教育博客</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <li className="text-gray-600">/</li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span itemProp="name" className="text-gray-300">{category}</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>

            {/* Page Header */}
            <header className="text-center mb-10">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${categoryColors[category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
                {category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{category}</h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                共 {count} 篇原创文章，分享实用的{category}经验和方法
              </p>
            </header>

            {/* sr-only SEO 文本块 */}
            <div className="sr-only">
              <h2>{category}专栏文章列表</h2>
              <p>{description}</p>
              <p>关键词：{config.keywords.join('、')}</p>
              <ul>
                {categoryArticles.map((article) => (
                  <li key={article.id}>
                    {article.title} - {article.description} - 发布日期：{article.date} - 预计阅读时间：{article.readTime}
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.id}`}
                  className="text-left bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-slate-700/50 transition-all group"
                >
                  {/* Category & Read Time */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[article.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
                      {article.category}
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
                      阅读全文 &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {categoryArticles.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">该分类暂无文章</p>
              </div>
            )}

            {/* Other Categories - 内部链接 */}
            <div className="mt-16 pt-10 border-t border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">浏览其他分类</h2>
              <div className="flex flex-wrap gap-3">
                {categoryList
                  .filter(c => c !== category)
                  .map((cat) => {
                    const catCount = articles.filter(a => a.category === cat).length;
                    return (
                      <Link
                        key={cat}
                        href={`/blog/category/${cat}`}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all hover:scale-105 ${categoryColors[cat] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}
                      >
                        {cat}（{catCount}）
                      </Link>
                    );
                  })}
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-white/10 text-gray-300 hover:text-white rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回博客列表
              </Link>
            </div>
          </div>
        </main>

        <footer className="border-t border-white/10 py-8 px-4 mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-400 mb-4">
              <a href="/about" className="hover:text-white transition-colors">关于我们</a>
              <span className="text-gray-600">|</span>
              <a href="/terms" className="hover:text-white transition-colors">服务条款</a>
              <span className="text-gray-600">|</span>
              <a href="/contact" className="hover:text-white transition-colors">联系我们</a>
              <span className="text-gray-600">|</span>
              <a href="/blog" className="hover:text-white transition-colors">教育博客</a>
            </div>
            <div className="text-center text-gray-500 text-sm">
              &copy; 2026 教材工具箱
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
