import type { Metadata } from 'next';
import Link from 'next/link';
import SectionLayout from '@/app/_components/SectionLayout';
import { RESOURCE_CATEGORIES, GRADE_LIST, getAllResources } from '@/lib/resourcesConfig';

export const metadata: Metadata = {
  title: '免费练习卷资源库 - 小学1-6年级各科练习卷下载 | 练学宝',
  description: '练学宝免费练习卷资源库：覆盖小学1-6年级数学、语文、英语全科练习卷，按年级+学科+知识点分类，所有资源支持PDF免费下载打印。',
  keywords: ['小学练习卷', '免费练习卷下载', '一年级练习卷', '六年级练习卷', '数学练习卷', '语文练习卷', '英语练习卷', 'PDF下载'],
  alternates: {
    canonical: 'https://www.skillxm.cn/resources',
  },
};

export default function ResourcesIndex() {
  const all = getAllResources();
  const totalQuestions = all.reduce((s, r) => s + r.questionCount, 0);
  const totalPages = all.reduce((s, r) => s + r.pageCount, 0);

  return (
    <SectionLayout
      breadcrumb={[{ label: '首页', href: '/' }, { label: '资源库' }]}
      icon="📁"
      title="免费练习卷资源库"
      description={`精选 ${all.length} 套高质量小学练习卷，覆盖1-6年级数学语文英语。共 ${totalPages} 页、${totalQuestions} 道题，全部PDF免费下载。`}
    >
      {/* 数据概览 */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="p-4 bg-slate-800/50 border border-white/10 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">{all.length}</div>
          <div className="text-xs text-slate-400 mt-1">练习卷</div>
        </div>
        <div className="p-4 bg-slate-800/50 border border-white/10 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-400">{totalPages}</div>
          <div className="text-xs text-slate-400 mt-1">总页数</div>
        </div>
        <div className="p-4 bg-slate-800/50 border border-white/10 rounded-lg text-center">
          <div className="text-2xl font-bold text-emerald-400">{totalQuestions}+</div>
          <div className="text-xs text-slate-400 mt-1">题目数量</div>
        </div>
        <div className="p-4 bg-slate-800/50 border border-white/10 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-400">100%</div>
          <div className="text-xs text-slate-400 mt-1">免费</div>
        </div>
      </section>

      {/* 按学科分类 */}
      {RESOURCE_CATEGORIES.map((cat) => (
        <section key={cat.subject.name} className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">{cat.subject.icon}</span>
            {cat.subject.name}练习卷
            <span className="text-sm text-slate-400 font-normal">（{cat.resources.length}套）</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.resources.map((r) => (
              <Link
                key={r.id}
                href={`/resources/${r.id}`}
                className="block p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 hover:from-slate-700/70 hover:to-slate-800/70 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all"
              >
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">
                    {GRADE_LIST.find(g => g.grade === r.grade)?.name}
                  </span>
                  <span className={`px-2 py-0.5 text-xs rounded ${
                    r.difficulty === '基础' ? 'bg-emerald-500/20 text-emerald-300' :
                    r.difficulty === '进阶' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-rose-500/20 text-rose-300'
                  }`}>
                    {r.difficulty}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{r.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">{r.description}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>📄 {r.pageCount}页</span>
                  <span>✏️ {r.questionCount}题</span>
                  <span>⏱ {r.estimatedTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* 使用说明 */}
      <section className="mt-10 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-blue-300 mb-3">📥 如何使用资源库</h2>
        <ol className="text-slate-200 space-y-2 text-sm list-decimal list-inside">
          <li>按<strong>年级 + 学科 + 知识点</strong>找到对应练习卷</li>
          <li>点击进入资源详情页，查看题目预览与SEO描述</li>
          <li>使用本站工具（数学练习卷、字帖、单元测试等）即时生成同类练习</li>
          <li>或下载PDF版打印使用（每份资源均有独立下载页）</li>
        </ol>
      </section>
    </SectionLayout>
  );
}
