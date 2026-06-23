import Link from 'next/link';
import SiteLayout from './_components/SiteLayout';
import HomePageClient from './_components/HomePageClient';

export const metadata = {
  title: '练学宝 - 免费小学在线学习工具',
  description: '10+款免费小学教学工具，覆盖数学计算、语文练字、练习卷下载，即开即用无需注册。包括数学练习卷生成器、字帖生成器、口算速练、数独游戏、识字卡片、作文模板等。',
  openGraph: {
    title: '练学宝 - 免费小学在线学习工具',
    description: '10+款免费小学教学工具，覆盖数学计算、语文练字、练习卷下载，即开即用无需注册。',
    url: 'https://www.skillxm.cn/',
    siteName: '练学宝',
    locale: 'zh_CN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.skillxm.cn/',
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
              ],
            },
          }),
        }}
      />
    </SiteLayout>
  );
}
