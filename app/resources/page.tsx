import type { Metadata } from 'next';
import Link from 'next/link';
import SectionLayout from '@/app/_components/SectionLayout';
import { RESOURCE_CATEGORIES, GRADE_LIST, getAllResources } from '@/lib/resourcesConfig';
import {
  generateItemListSchema,
  generateOpenGraph,
  generateTwitterCard,
  SITE_INFO,
} from '@/lib/seoUtils';

const PAGE_URL = `${SITE_INFO.BASE_URL}/resources/`;

export const metadata: Metadata = {
  title: '免费练习卷资源库 - 小学1-6年级各科练习卷下载 | 练学宝',
  description: '练学宝免费练习卷资源库：覆盖小学1-6年级数学、语文、英语全科练习卷，按年级+学科+知识点分类，所有资源支持PDF免费下载打印。',
  keywords: ['小学练习卷', '免费练习卷下载', '一年级练习卷', '六年级练习卷', '数学练习卷', '语文练习卷', '英语练习卷', 'PDF下载', '练习题库'],
  alternates: { canonical: PAGE_URL },
  openGraph: generateOpenGraph({
    title: '免费练习卷资源库 - 小学1-6年级各科练习卷下载 | 练学宝',
    description: '覆盖小学1-6年级数学语文英语全科练习卷，按年级+学科+知识点分类，所有资源支持PDF免费下载打印。',
    url: PAGE_URL,
  }),
  twitter: generateTwitterCard({
    title: '免费练习卷资源库 - 小学1-6年级各科练习卷 | 练学宝',
    description: '覆盖小学1-6年级数学语文英语全科练习卷，全部PDF免费下载打印。',
  }),
};

export default function ResourcesIndex() {
  const all = getAllResources();
  const totalQuestions = all.reduce((s, r) => s + r.questionCount, 0);
  const totalPages = all.reduce((s, r) => s + r.pageCount, 0);

  const itemListSchema = generateItemListSchema({
    name: '练学宝免费练习卷资源库',
    description: '小学1-6年级数学语文英语全科练习卷资源列表',
    url: PAGE_URL,
    items: all.map((r, i) => ({
      name: r.title,
      url: `${SITE_INFO.BASE_URL}/resources/${r.id}`,
      position: i + 1,
      description: r.description,
    })),
  });

  const faqs = [
    {
      q: '练学宝资源库的练习卷是免费的吗？',
      a: '是的，练学宝资源库所有练习卷完全免费，支持PDF免费下载打印，无需注册账号。所有内容由练学宝教学团队按教学大纲整理，质量有保证。',
    },
    {
      q: '如何按年级找到对应练习卷？',
      a: '资源库按学科分类（数学、语文、英语等），每套练习卷都标注了年级、知识点、题量、页数、难度和预计完成时间。点击进入详情页可查看完整介绍并跳转到配套工具即时生成同类练习。',
    },
    {
      q: '练习卷可以打印吗？纸张大小有要求吗？',
      a: '所有练习卷均支持PDF下载和直接打印。推荐使用A4纸打印，建议在打印设置中选择「实际大小」和「无边距」以获得最佳效果。',
    },
  ];

  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <SectionLayout
      path="/resources/"
      breadcrumb={[{ label: '首页', href: '/' }, { label: '资源库' }]}
      icon="📁"
      title="免费练习卷资源库"
      description={`精选 ${all.length} 套高质量小学练习卷，覆盖1-6年级数学语文英语。共 ${totalPages} 页、${totalQuestions} 道题，全部PDF免费下载。`}
      keywords={['小学练习卷', '免费练习卷下载', '数学练习卷', '语文练习卷', '英语练习卷', 'PDF下载', '练习题库']}
      jsonLd={[itemListSchema, faqSchema]}
      summary={`练学宝免费练习卷资源库收录 ${all.length} 套精选练习卷，覆盖小学1-6年级数学、语文、英语三大主科，共计 ${totalPages} 页、${totalQuestions}+ 道题。按学科分类组织，每套均标注年级、知识点、题量、难度和预计完成时间。所有练习卷均支持PDF免费下载打印，无需注册，永久免费。`}
      keyPoints={[
        `✅ 收录 ${all.length} 套高质量练习卷，覆盖 1-6 年级三大主科`,
        `✅ 共 ${totalPages} 页、${totalQuestions}+ 道精选题目`,
        `✅ 按学科分类（数学 / 语文 / 英语），按年级分层`,
        `✅ 每套标注：年级、知识点、题量、难度、预计时间`,
        `✅ 全部 PDF 免费下载打印，无需注册永久免费`,
      ]}
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
                aria-label={r.title}
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

      {/* FAQ - 帮助 AI 引擎抓取 */}
      <section className="mt-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">❓ 常见问题</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="p-4 bg-slate-900/50 border border-white/5 rounded-lg">
              <summary className="text-white font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </SectionLayout>
  );
}
