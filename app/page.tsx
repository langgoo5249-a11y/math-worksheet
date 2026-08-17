import Link from 'next/link';
import SiteLayout from './_components/SiteLayout';
import HomePageClient from './_components/HomePageClient';

export const metadata = {
  title: '练学宝 - 免费小学在线学习工具',
  description: '10+款免费小学教学工具，覆盖数学计算、语文练字、练习卷下载，即开即用无需注册。包括数学练习卷生成器、字帖生成器、口算速练、数独游戏、识字卡片、作文模板等。',
  keywords: '练学宝,小学教学工具,数学练习卷生成器,字帖生成器,口算速练,拼音学习,识字卡片,古诗词默写,单元测试卷,免费试卷',
  author: '陈老师',
  openGraph: {
    title: '练学宝 - 免费小学在线学习工具',
    description: '10+款免费小学教学工具，覆盖数学计算、语文练字、练习卷下载，即开即用无需注册。',
    url: 'https://www.skillxm.cn/',
    siteName: '练学宝',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: 'https://www.skillxm.cn/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '练学宝 - 免费在线教育工具',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.skillxm.cn/',
    languages: {
      'zh-CN': 'https://www.skillxm.cn/',
      'en': 'https://www.skillxm.cn/en/',
      'x-default': 'https://www.skillxm.cn/',
    },
  },
};

export default function HomePage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* ===== Hero 区域（服务端渲染，SEO 关键内容） ===== */}
        <section className="pt-8 pb-4 px-4 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
              练学宝 - 免费小学在线学习工具
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-5">
              10+款免费小学教学工具，覆盖数学计算、语文练字、练习卷下载，即开即用无需注册
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-2">
              <Link href="/tools/" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full text-sm transition-colors shadow-lg shadow-blue-600/25">
                探索所有工具
              </Link>
              <Link href="/about/" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full text-sm border border-white/20 transition-colors">
                了解更多
              </Link>
            </div>
          </div>
        </section>

        {/* ===== SEO 内容区（服务端渲染，增加页面文本内容深度） ===== */}
        <section className="max-w-4xl mx-auto px-4 py-8 text-gray-300">
          <h2 className="text-xl font-bold text-white mb-4">为什么选择练学宝？</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            练学宝是一个专为小学生家长和教师打造的<span className="text-blue-300 font-medium">免费在线教育工具平台</span>。我们提供10+款即开即用的教学工具，涵盖数学练习卷生成、语文字帖制作、英语书写练习、口算训练、识字卡片等核心学习场景。所有工具均支持手机在线使用和PDF打印下载，无需注册账号，完全免费。
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            与传统教育软件不同，练学宝的工具全部在浏览器中运行，<span className="text-emerald-300 font-medium">无需下载安装任何APP</span>。家长可以随时打开网页为孩子生成一份个性化的练习卷，教师可以快速制作单元测试题。我们的数学练习卷生成器支持自定义题型、难度和数量，字帖生成器提供田字格、米字格等多种模板，口算速练工具还能自动计时并生成学习报告。
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            练学宝还提供丰富的小学教育学习方法文章，覆盖1-6年级数学、语文、英语三大学科，包括暑假学习计划、写字姿势纠正、英语启蒙路线图等实用指南。所有文章均由教育从业者撰写并经人工审校，确保内容的专业性和准确性。
          </p>
        </section>

        {/* ===== 客户端交互部分 ===== */}
        <HomePageClient />
      </div>

      {/* ===== 首页结构化数据（JSON-LD） ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': 'https://www.skillxm.cn/#homepage',
            name: '练学宝 - 免费小学在线学习工具',
            url: 'https://www.skillxm.cn/',
            description: '10+款免费小学教学工具，覆盖数学计算、语文练字、练习卷下载，即开即用无需注册。',
            inLanguage: 'zh-CN',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: '数学练习卷生成器',
                  url: 'https://www.skillxm.cn/tools/math-worksheet/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: '字帖生成器',
                  url: 'https://www.skillxm.cn/tools/calligraphy/',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: '口算速练',
                  url: 'https://www.skillxm.cn/tools/mental-math/',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: '数独游戏',
                  url: 'https://www.skillxm.cn/tools/sudoku/',
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  name: '识字卡片',
                  url: 'https://www.skillxm.cn/tools/flashcards/',
                },
                {
                  '@type': 'ListItem',
                  position: 6,
                  name: '作文模板',
                  url: 'https://www.skillxm.cn/tools/writing-template/',
                },
                {
                  '@type': 'ListItem',
                  position: 7,
                  name: '古诗词默写',
                  url: 'https://www.skillxm.cn/tools/poem-memo/',
                },
                {
                  '@type': 'ListItem',
                  position: 8,
                  name: '单元测试卷',
                  url: 'https://www.skillxm.cn/tools/unit-test/',
                },
                {
                  '@type': 'ListItem',
                  position: 9,
                  name: '英语字帖',
                  url: 'https://www.skillxm.cn/tools/english-calligraphy/',
                },
                {
                  '@type': 'ListItem',
                  position: 10,
                  name: '拼音注音',
                  url: 'https://www.skillxm.cn/tools/pinyin/',
                },
              ],
            },
          }),
        }}
      />
    </SiteLayout>
  );
}
