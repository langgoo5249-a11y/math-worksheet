import type { Metadata } from 'next';
import Link from 'next/link';
import SiteLayout from '../_components/SiteLayout';
import { TOOLS, ACTIVE_TOOL_COUNT } from '@/lib/toolRegistry';

export const metadata: Metadata = {
  title: '全部学习工具 - 练学宝免费小学教学工具合集',
  description: '练学宝提供10+款免费小学教学工具，包括数学练习卷生成器、字帖生成器、口算速练、数独游戏、英语字帖、拼音注音、识字卡片、作文模板、古诗词默写、单元测试卷等，支持PDF导出打印。',
  keywords: '练学宝工具,小学教学工具,数学练习卷生成器,字帖生成器,口算速练,数独游戏,英语字帖,拼音注音,识字卡片,作文模板,免费PDF打印',
  alternates: {
    canonical: 'https://www.skillxm.cn/tools/',
  },
  openGraph: {
    title: '全部学习工具 - 练学宝免费小学教学工具合集',
    description: '10+款免费小学教学工具，数学练习卷、字帖、口算、数独、英语字帖等，无需注册即开即用。',
    url: 'https://www.skillxm.cn/tools/',
    siteName: '练学宝',
    type: 'website',
    locale: 'zh_CN',
    images: [
      {
        url: 'https://www.skillxm.cn/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '练学宝全部学习工具',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '全部学习工具 - 练学宝免费小学教学工具合集',
    description: '10+款免费小学教学工具，数学练习卷、字帖、口算、数独、英语字帖等，无需注册即开即用。',
    images: ['https://www.skillxm.cn/og-image.jpg'],
  },
};

const toolColors: Record<string, string> = {
  blue: 'from-blue-500 to-indigo-600',
  emerald: 'from-emerald-500 to-teal-600',
  rose: 'from-rose-500 to-pink-600',
  orange: 'from-orange-500 to-red-600',
  yellow: 'from-yellow-500 to-amber-600',
  purple: 'from-purple-500 to-violet-600',
  teal: 'from-teal-500 to-cyan-600',
};

export default function ToolsPage() {
  const activeTools = TOOLS.filter(t => t.active);
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '练学宝全部学习工具',
    description: `练学宝提供的 ${ACTIVE_TOOL_COUNT} 款免费小学教学工具合集`,
    numberOfItems: activeTools.length,
    itemListElement: activeTools.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tool.name,
      url: `https://www.skillxm.cn${tool.path}`,
      description: tool.desc,
    })),
  };

  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              全部学习工具
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
              练学宝目前上线 {activeTools.length} 款免费小学教学工具，覆盖数学、语文、英语核心学科，无需注册即可使用。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {activeTools.map((tool) => (
              <Link
                key={tool.path}
                href={`${tool.path}/`}
                className="group relative bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 hover:border-cyan-500/40 rounded-2xl p-5 sm:p-6 transition-all hover:-translate-y-1"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${toolColors[tool.color] || toolColors.blue} opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition-opacity`} />
                <div className="relative">
                  <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </h2>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {tool.desc}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-cyan-300 font-medium group-hover:gap-2 transition-all">
                    立即使用
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">没有找到需要的工具？</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              练学宝持续更新小学教学工具。如果你希望增加新功能，欢迎通过联系方式告诉我们，我们会优先开发用户呼声最高的工具。
            </p>
            <a
              href="/contact/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              联系我们
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
