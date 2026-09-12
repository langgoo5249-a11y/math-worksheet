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
  /** P4：分类专属导语，用于降低各分类页之间的内容相似度 */
  intro: string;
}> = {
  '数学学习': {
    keywords: ['小学数学学习方法', '数学学习技巧', '数学提分', '数学思维训练', '小学数学辅导'],
    topics: '应用题解题技巧、计算能力提升、数学思维培养等核心内容',
    ability: '数学',
    intro: '小学数学的难点不在「算得快」，而在「想得清」。低年级卡在进退位和乘除意义的理解，中年级开始出现两步以上的应用题，高年级则要在分数、小数、比例之间来回转换。我们观察到，多数孩子的错题并非不会算，而是没读懂题目在问什么——审题阶段出错的比例，明显高于计算阶段。这个专栏收录应用题拆解、计算能力训练、错题本用法等具体方法，每篇都给出可以照着做的步骤，而不是空泛的「多练习」。',
  },
  '语文学习': {
    keywords: ['小学语文学习方法', '语文学习技巧', '阅读理解', '作文写作', '语文提分'],
    topics: '阅读理解技巧、作文写作方法、基础知识积累等核心内容',
    ability: '语文',
    intro: '语文是小学阶段最不容易立竿见影的科目。字词、默写、阅读理解、作文四条线并行，任何一条掉队都会拖累整体。其中作文和阅读理解是家长最难介入的部分——因为标准答案缺失，孩子写了也不知道好坏。本专栏的重点是把「感觉」变成「标准」：阅读理解按题型给答题框架，作文给可套用的结构与素材积累方法，基础知识部分则给出高频易错字词清单。',
  },
  '英语学习': {
    keywords: ['小学英语学习方法', '英语学习技巧', '英语单词记忆', '英语口语', '英语提分'],
    topics: '单词记忆方法、口语练习技巧、语法基础等核心内容',
    ability: '英语',
    intro: '小学英语的核心矛盾是「单词记不住、开口不敢说」。课内进度偏慢但考试要求并不低，课外又容易陷入背了忘、忘了背的循环。这个专栏围绕三个问题展开：如何用间隔重复把短期记忆变成长期记忆、如何在没有语言环境的情况下练听力与口语、如何把自然拼读和音标结合起来用。方法按年级做了区分，低年级侧重兴趣与语感，中高年级侧重词汇量与语法框架。',
  },
  '思维训练': {
    keywords: ['儿童思维训练', '逻辑思维培养', '数独训练', '记忆力训练', '专注力训练'],
    topics: '逻辑思维培养、记忆力训练、专注力提升等核心内容',
    ability: '思维能力',
    intro: '思维能力不是靠刷题刷出来的，而是靠「有意识地想」练出来的。数独、逻辑推理、记忆训练、专注力练习，表面上是不同活动，底层训练的是同一件事：能否在信息不完整的情况下，一步步逼近答案。这个专栏整理了适合小学生的思维训练方式，包含难度分级与每日时长建议，也说明了哪些训练在几年级开始更合适，避免过早介入反而消耗兴趣。',
  },
  '学习方法': {
    keywords: ['小学生学习方法', '学习习惯培养', '时间管理', '错题本', '作业效率'],
    topics: '学习习惯培养、时间管理技巧、高效作业方法等核心内容',
    ability: '综合学习',
    intro: '同样坐在书桌前两小时，效果可能差三倍。差别不在时间长度，而在有没有形成闭环：预习、听课、作业、错题、复习。这个专栏讲的是「怎么学」而不是「学什么」——时间怎么分配、错题本怎么用才真的有效、作业拖拉怎么处理、考前一周该做什么。所有方法都来自可验证的做法，而不是笼统的「要专心」「要认真」。',
  },
  '升学指导': {
    keywords: ['幼升小准备', '小升初', '升学面试', '择校指南', '升学政策'],
    topics: '升学政策解读、面试准备技巧、择校建议等核心内容',
    ability: '升学竞争力',
    intro: '幼升小和小升初的焦虑，多半来自信息不对称。政策每年微调，学校要求各不相同，家长听到的往往是二手消息。这个专栏梳理升学关键节点的时间线、面试常见题型与准备节奏、择校时需要核实的几项硬指标。需要说明的是，各地政策差异很大，具体内容请以当地教育部门的官方发布为准。',
  },
  '工具推荐': {
    keywords: ['免费教学工具', '在线教育工具', '小学学习工具', '学习软件推荐', '教育APP'],
    topics: '免费教学工具、在线学习平台、教育APP推荐等核心内容',
    ability: '学习效率',
    intro: '免费工具的价值不在于「免费」，而在于能不能真的省下时间。这个专栏整理适合小学生使用的在线工具：练习卷生成、口算速练、字帖生成、拼音学习等，说明各自适合什么场景、什么年级，以及有哪些使用上的坑。评测标准统一：是否免费无门槛、是否支持打印、内容是否符合课标。除工具清单外，这里也有单个工具的分步实操（例如作文素材类工具怎么用才有效），按「什么时候用、怎么用、用完之后做什么」写清流程。',
  },
  '关于我们': {
    keywords: ['练学宝介绍', '教育工具团队', '关于我们', '教育理念', '团队介绍'],
    topics: '团队介绍、教育理念、产品更新等核心内容',
    ability: '教育认知',
    intro: '这里记录练学宝的产品更新、教育理念与团队思考。我们做这套工具的出发点很简单：家长辅导孩子需要具体的「抓手」，而不是抽象的方法论。所以练学宝的工具都围绕一个目标——把老师布置的练习需求，变成可以立刻生成、直接打印的页面。这个专栏也会公开我们在内容准确性上的做法与修正记录。',
  },
  '综合教育': {
    keywords: ['家庭教育', '厌学疏导', '时间管理', '亲子沟通', '小学生心理'],
    topics: '跨科目的家庭教育话题：厌学疏导、时间规划、亲子沟通',
    ability: '家庭教育',
    intro: '有些问题不属于任何单一学科，却深刻影响学习效果——孩子不想上学怎么办、放学后的时间怎么安排、要不要拿「别人家的孩子」做比较。这个专栏收录这类跨科目的家庭教育内容，重点是给出可以照着做的应对方式，而不是停留在道理层面。',
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
  const decodedCategory = decodeURIComponent(category) as Category;

  // 验证分类是否有效（使用全部 categories 而非 categoryList，因为 decodedCategory 类型包含"全部"）
  if (!(categories as readonly string[]).includes(decodedCategory) || decodedCategory === '全部') {
    return {
      title: '分类未找到 - 练学宝',
      robots: { index: false, follow: true },
    };
  }

  const config = categorySEOConfig[decodedCategory] || {
    keywords: [],
    topics: '相关教育内容',
    ability: '综合',
    intro: '',
  };

  const categoryArticles = articles.filter(a => a.category === decodedCategory);
  const count = categoryArticles.length;
  const description = `练学宝${decodedCategory}专栏：共${count}篇原创文章，涵盖${config.topics}。分享实用的${decodedCategory}经验和方法，帮助小学生提升${config.ability}能力。`;

  return {
    title: `${decodedCategory} - 练学宝知识分享`,
    description,
    keywords: config.keywords,
    alternates: {
      canonical: `${BASE_URL}/blog/category/${decodedCategory}/`,
      languages: {
        'zh-CN': `${BASE_URL}/blog/category/${decodedCategory}/`,
        'x-default': `${BASE_URL}/blog/category/${decodedCategory}/`,
      },
    },
    openGraph: {
      title: `${decodedCategory} - 练学宝知识分享`,
      description,
      type: 'website',
      url: `${BASE_URL}/blog/category/${decodedCategory}/`,
      siteName: '练学宝',
      locale: 'zh_CN',
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  // 对 URL 编码的中文分类名进行解码（确保兼容不同浏览器/蜘蛛的编码方式）
  const decodedCategory = decodeURIComponent(category) as Category;

  // 验证分类是否有效
  const isValidCategory = (categories as readonly string[]).includes(decodedCategory) && decodedCategory !== '全部';

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
                  练学宝
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
              href="/blog/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              返回博客列表
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const config = categorySEOConfig[decodedCategory] || {
    keywords: [],
    topics: '相关教育内容',
    ability: '综合',
    intro: '',
  };

  const categoryArticles = articles
    .filter(a => a.category === decodedCategory)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const count = categoryArticles.length;
  const description = `练学宝${decodedCategory}专栏：共${count}篇原创文章，涵盖${config.topics}。分享实用的${decodedCategory}经验和方法，帮助小学生提升${config.ability}能力。`;

  // JSON-LD 结构化数据
  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${decodedCategory} - 练学宝知识分享`,
    description,
    url: `${BASE_URL}/blog/category/${decodedCategory}/`,
    isPartOf: {
      '@type': 'WebSite',
      name: '练学宝',
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
        name: '知识分享',
        item: `${BASE_URL}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: decodedCategory,
        item: `${BASE_URL}/blog/category/${decodedCategory}/`,
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
                  练学宝
                </a>
              </div>
              <div className="hidden lg:flex items-center gap-1">
                <a href="/" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">首页</a>
                <a href="/blog/" className="px-3 py-1.5 text-sm text-white bg-white/10 rounded-lg font-medium">知识分享</a>
                <a href="/about/" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">关于我们</a>
                <a href="/contact/" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">联系我们</a>
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
                  <Link href="/blog/" itemProp="item" className="hover:text-white transition-colors">
                    <span itemProp="name">知识分享</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <li className="text-gray-600">/</li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span itemProp="name" className="text-gray-300">{decodedCategory}</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>

            {/* Page Header */}
            <header className="text-center mb-10">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${categoryColors[decodedCategory] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
                {decodedCategory}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{decodedCategory}</h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                共 {count} 篇原创文章，分享实用的{decodedCategory}经验和方法
              </p>
            </header>

            {/* 分类专属导语（P4：各分类页正文差异化的关键，避免列表页高度雷同） */}
            {config.intro && (
              <section className="mb-10 p-5 sm:p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
                <h2 className="text-lg font-bold text-white mb-3">
                  {decodedCategory}：这个专栏解决什么问题
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {config.intro}
                </p>
              </section>
            )}

            {/* sr-only SEO 文本块 */}
            <div className="sr-only">
              <h2>{decodedCategory}专栏文章列表</h2>
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
                  .filter(c => c !== decodedCategory)
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
                href="/blog/"
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
              <a href="/about/" className="hover:text-white transition-colors">关于我们</a>
              <span className="text-gray-600">|</span>
              <a href="/terms/" className="hover:text-white transition-colors">服务条款</a>
              <span className="text-gray-600">|</span>
              <a href="/contact/" className="hover:text-white transition-colors">联系我们</a>
              <span className="text-gray-600">|</span>
              <a href="/blog/" className="hover:text-white transition-colors">知识分享</a>
            </div>
            <div className="text-center text-gray-500 text-sm">
              &copy; 2026 练学宝
            </div>
          </div>
        </footer>

        </div>
    </>
  );
}
