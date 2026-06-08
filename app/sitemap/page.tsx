import type { Metadata } from 'next';
import Link from 'next/link';
import { TOOLS } from '@/lib/toolRegistry';
import { GRADES } from '@/lib/gradeConfig';
import { TEXTBOOKS } from '@/lib/textbookConfig';
import { KNOWLEDGE_POINTS } from '@/lib/knowledgeConfig';
import { PARENT_GUIDE_TOPICS } from '@/lib/parentGuideConfig';
import { getAllResources } from '@/lib/resourcesConfig';

export const metadata: Metadata = {
  title: '网站地图 - 练学宝全部页面导航 | 练学宝',
  description: '练学宝全站页面导航地图，包含10个学习工具、6个年级专区、4个教材版本、10个知识点专题、6个家长指导专题、20+练习卷资源，方便用户和搜索引擎发现所有内容。',
  keywords: ['网站地图', '站点导航', '练学宝', 'sitemap'],
  alternates: {
    canonical: 'https://www.skillxm.cn/sitemap',
  },
};

export default function SitemapIndex() {
  const resources = getAllResources();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <nav className="text-sm text-slate-400 mb-4">
        <Link href="/" className="hover:text-blue-400">首页</Link> / 网站地图
      </nav>

      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">🗺️ 网站地图</h1>
        <p className="text-base sm:text-lg text-slate-300">
          收录练学宝全站核心页面。点击直达你需要的内容。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 学习工具 */}
        <section className="p-5 bg-slate-800/50 border border-white/10 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>🛠️</span> 学习工具
            <span className="text-xs text-slate-400 font-normal">({TOOLS.length})</span>
          </h2>
          <ul className="space-y-1.5 text-sm">
            <li><Link href="/tools" className="text-slate-300 hover:text-blue-400">全部工具</Link></li>
            {TOOLS.map((t) => (
              <li key={t.path}>
                <Link href={t.path} className="text-slate-300 hover:text-blue-400">
                  {t.icon} {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 年级专区 */}
        <section className="p-5 bg-slate-800/50 border border-white/10 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>🎓</span> 年级专区
            <span className="text-xs text-slate-400 font-normal">({GRADES.length})</span>
          </h2>
          <ul className="space-y-1.5 text-sm">
            <li><Link href="/grade" className="text-slate-300 hover:text-blue-400">年级专区首页</Link></li>
            {GRADES.map((g) => (
              <li key={g.grade}>
                <Link href={`/grade/grade-${g.grade}`} className="text-slate-300 hover:text-blue-400">
                  {g.name}（{g.ageRange}）
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 教材同步 */}
        <section className="p-5 bg-slate-800/50 border border-white/10 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>📚</span> 教材同步
            <span className="text-xs text-slate-400 font-normal">({TEXTBOOKS.length * 6})</span>
          </h2>
          <ul className="space-y-1.5 text-sm">
            <li><Link href="/textbook" className="text-slate-300 hover:text-blue-400">教材专区首页</Link></li>
            {TEXTBOOKS.map((tb) => (
              <li key={tb.id}>
                <div className="text-slate-200 font-medium mt-2 mb-1">{tb.name}</div>
                <ul className="ml-3 space-y-1">
                  {tb.grades.map((g) => (
                    <li key={g.grade}>
                      <Link href={`/textbook/${tb.id}/${g.grade}`} className="text-slate-300 hover:text-blue-400">
                        {g.grade === 1 ? '一年级' : g.grade === 2 ? '二年级' : g.grade === 3 ? '三年级' : g.grade === 4 ? '四年级' : g.grade === 5 ? '五年级' : '六年级'}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* 知识点专题 */}
        <section className="p-5 bg-slate-800/50 border border-white/10 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>💡</span> 知识点专题
            <span className="text-xs text-slate-400 font-normal">({KNOWLEDGE_POINTS.length})</span>
          </h2>
          <ul className="space-y-1.5 text-sm">
            <li><Link href="/knowledge" className="text-slate-300 hover:text-blue-400">知识点专题首页</Link></li>
            {KNOWLEDGE_POINTS.map((k) => (
              <li key={k.slug}>
                <Link href={`/knowledge/${k.slug}`} className="text-slate-300 hover:text-blue-400">
                  {k.name}（{k.subject}）
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 资源库 */}
        <section className="p-5 bg-slate-800/50 border border-white/10 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>📁</span> 资源库
            <span className="text-xs text-slate-400 font-normal">({resources.length})</span>
          </h2>
          <ul className="space-y-1.5 text-sm max-h-96 overflow-y-auto">
            <li><Link href="/resources" className="text-slate-300 hover:text-blue-400">资源库首页</Link></li>
            {resources.map((r) => (
              <li key={r.id}>
                <Link href={`/resources/${r.id}`} className="text-slate-300 hover:text-blue-400 line-clamp-1">
                  📄 {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 家长指导 */}
        <section className="p-5 bg-slate-800/50 border border-white/10 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>👨‍👩‍👧</span> 家长指导
            <span className="text-xs text-slate-400 font-normal">({PARENT_GUIDE_TOPICS.length})</span>
          </h2>
          <ul className="space-y-1.5 text-sm">
            <li><Link href="/parent-guide" className="text-slate-300 hover:text-blue-400">家长指导首页</Link></li>
            {PARENT_GUIDE_TOPICS.map((t) => (
              <li key={t.id}>
                <Link href={`/parent-guide/${t.id}`} className="text-slate-300 hover:text-blue-400">
                  {t.icon} {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 内容板块 */}
        <section className="p-5 bg-slate-800/50 border border-white/10 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>📚</span> 内容板块
          </h2>
          <ul className="space-y-1.5 text-sm">
            <li><Link href="/blog" className="text-slate-300 hover:text-blue-400">✏️ 教育博客（80+篇）</Link></li>
            <li><Link href="/daily" className="text-slate-300 hover:text-blue-400">📅 每日一练</Link></li>
            <li><Link href="/changelog" className="text-slate-300 hover:text-blue-400">📝 更新日志</Link></li>
            <li><Link href="/sitemap" className="text-slate-300 hover:text-blue-400">🗺️ 网站地图</Link></li>
            <li><a href="/rss.xml" className="text-slate-300 hover:text-blue-400">📡 RSS 订阅</a></li>
            <li><a href="/sitemap.xml" className="text-slate-300 hover:text-blue-400">🤖 XML Sitemap（搜索引擎）</a></li>
          </ul>
        </section>

        {/* 关于 */}
        <section className="p-5 bg-slate-800/50 border border-white/10 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>ℹ️</span> 关于
          </h2>
          <ul className="space-y-1.5 text-sm">
            <li><Link href="/about" className="text-slate-300 hover:text-blue-400">关于练学宝</Link></li>
            <li><Link href="/contact" className="text-slate-300 hover:text-blue-400">联系我们</Link></li>
            <li><Link href="/privacy" className="text-slate-300 hover:text-blue-400">隐私政策</Link></li>
            <li><Link href="/terms" className="text-slate-300 hover:text-blue-400">服务条款</Link></li>
            <li><Link href="/search" className="text-slate-300 hover:text-blue-400">🔍 全站搜索</Link></li>
          </ul>
        </section>

        {/* 学科导航 */}
        <section className="p-5 bg-slate-800/50 border border-white/10 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>🧭</span> 学科分类
          </h2>
          <ul className="space-y-1.5 text-sm">
            <li><Link href="/blog/category/数学学习" className="text-slate-300 hover:text-blue-400">🧮 数学学习</Link></li>
            <li><Link href="/blog/category/语文学习" className="text-slate-300 hover:text-blue-400">📖 语文学习</Link></li>
            <li><Link href="/blog/category/英语学习" className="text-slate-300 hover:text-blue-400">🔤 英语学习</Link></li>
            <li><Link href="/blog/category/学习方法" className="text-slate-300 hover:text-blue-400">📚 学习方法</Link></li>
            <li><Link href="/blog/category/升学指导" className="text-slate-300 hover:text-blue-400">🎯 升学指导</Link></li>
            <li><Link href="/blog/category/思维训练" className="text-slate-300 hover:text-blue-400">💡 思维训练</Link></li>
            <li><Link href="/blog/category/工具推荐" className="text-slate-300 hover:text-blue-400">🛠️ 工具推荐</Link></li>
          </ul>
        </section>
      </div>

      {/* SEO 提示 */}
      <section className="mt-10 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-lg font-bold text-white mb-2">🤖 给搜索引擎</h2>
        <p className="text-sm text-slate-400">
          推荐使用 <a href="/sitemap.xml" className="text-blue-400 hover:underline">XML 格式的 sitemap</a>（位于 <code className="px-1 py-0.5 bg-slate-800 rounded">/sitemap.xml</code>），
          它包含了所有页面的优先级和更新频率信息。也可以订阅 <a href="/rss.xml" className="text-blue-400 hover:underline">RSS 订阅</a> 第一时间获取最新博客文章。
        </p>
      </section>
    </main>
  );
}
