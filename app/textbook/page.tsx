import type { Metadata } from 'next';
import Link from 'next/link';
import SectionLayout from '@/app/_components/SectionLayout';
import { TEXTBOOKS } from '@/lib/textbookConfig';
import { generateItemListSchema, generateOrganizationSchema } from '@/lib/seoUtils';

export const metadata: Metadata = {
  title: '小学教材同步练习专区 - 人教版/北师大版/苏教版/部编版 | 练学宝',
  description: '小学教材同步练习专区，覆盖人教版（PEP）、北师大版、苏教版、部编版（统编版）1-6年级数学语文英语练习卷，与课堂进度完全同步。',
  keywords: ['小学教材同步练习', '人教版', '北师大版', '苏教版', '部编版', 'PEP', '小学数学下册', '小学语文下册', '教材同步'],
  alternates: {
    canonical: 'https://www.example.com/textbook/',
  },
  openGraph: {
    title: '小学教材同步练习专区 - 练学宝',
    description: '人教版/北师大版/苏教版/部编版 4 个版本，1-6 年级数学语文英语练习卷',
    url: 'https://www.example.com/textbook',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '小学教材同步练习专区 - 练学宝',
    description: '4 个版本，1-6 年级数学语文英语同步练习',
  },
};

export default function TextbookIndex() {
  return (
    <SectionLayout
      breadcrumb={[{ label: '首页', href: '/' }, { label: '教材同步专区' }]}
      icon="📚"
      title="小学教材同步练习专区"
      description="按教材版本组织的练习卷，与孩子课堂进度完全同步。每天跟着学校学，回家跟着练学宝练。"
      keywords={['小学教材同步练习', '人教版', '北师大版', '苏教版', '部编版', 'PEP', '小学数学下册']}
      path="/textbook"
      datePublished="2025-12-01"
      dateModified={new Date().toISOString().slice(0, 10)}
      summary={'练学宝教材同步专区覆盖 4 个主流教材版本（人教版 PEP、北师大版 BSD、苏教版、部编版），每个版本按 1-6 年级、单元组织同步练习卷。家长搜索"人教版三年级数学下册练习题"等长尾词可精准匹配到对应页面。'}
      keyPoints={[
        '覆盖 4 个主流版本：人教/北师/苏教/部编',
        '每个版本 1-6 年级全覆盖（共 24 个年级页）',
        '按教材单元组织，配套单元测试',
        '与学校课堂进度完全同步',
        '全部 PDF 免费下载打印',
      ]}
      jsonLd={[
        generateItemListSchema({
          name: '小学教材同步练习专区',
          description: '人教版/北师大版/苏教版/部编版 1-6年级同步练习',
          url: 'https://www.example.com/textbook',
          items: TEXTBOOKS.map((tb, i) => ({
            name: tb.name,
            url: `https://www.example.com/textbook/${tb.id}/grade-1`,
            position: i + 1,
            description: tb.description,
          })),
        }),
        generateOrganizationSchema(),
      ]}
    >
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEXTBOOKS.map((tb) => (
          <div
            key={tb.id}
            className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">📖</span>
              <div>
                <h2 className="text-xl font-bold text-white">{tb.name}</h2>
                <p className="text-xs text-slate-400">{tb.publisher}</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-4">{tb.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tb.scope.map((s) => (
                <span key={s} className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">
                  {s}
                </span>
              ))}
            </div>
            <div className="space-y-2">
              {tb.grades.map((g) => (
                <Link
                  key={g.grade}
                  href={`/textbook/${tb.id}/grade-${g.grade}`}
                  className="flex items-center justify-between px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors text-sm"
                  aria-label={`${tb.name} ${g.grade}年级同步练习`}
                >
                  <span className="text-white">
                    {tb.name} · {g.grade}年级
                  </span>
                  <span className="text-slate-400 text-xs">
                    {g.units.length}个单元 →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-blue-300 mb-3">📖 如何选教材版本？</h2>
        <ul className="text-slate-200 space-y-2 text-sm list-disc list-inside">
          <li><strong>查孩子课本封面</strong>：封面左下角或书脊上会印着"人民教育出版社""北京师范大学出版社"等字样</li>
          <li><strong>看孩子课本目录</strong>：每个版本目录顺序不同，单元数也不同</li>
          <li><strong>问孩子老师</strong>：直接询问班主任"我们班用的是哪个版本"</li>
          <li><strong>不确定选什么？</strong>：选"人教版"（使用最广，覆盖90%以上地区）</li>
        </ul>
      </section>

      {/* AI 友好的 FAQ 区 */}
      <section className="mt-10 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">❓ 关于教材同步的常见问题</h2>
        <div className="space-y-4">
          <details className="group" open>
            <summary className="cursor-pointer text-white font-medium hover:text-blue-300 list-none flex items-center justify-between p-3 bg-slate-900/40 rounded-lg">
              <span>人教版、北师大版、苏教版有什么区别？</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-4">
              人教版（PEP）由人民教育出版社出版，使用范围最广，覆盖90%以上地区。北师大版注重思维训练，难度略高，主要在北方使用。苏教版主要在江苏、安徽等省份使用。
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer text-white font-medium hover:text-blue-300 list-none flex items-center justify-between p-3 bg-slate-900/40 rounded-lg">
              <span>部编版和人教版语文教材一样吗？</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-4">
              部编版（统编版）是2017年后全国统一的语文新教材，由教育部组织编写。目前小学语文基本全部使用部编版。数学、英语仍由人教版、北师大版等版本出版。
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer text-white font-medium hover:text-blue-300 list-none flex items-center justify-between p-3 bg-slate-900/40 rounded-lg">
              <span>同步练习卷是按单元组织的吗？</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-4">
              是的，每个年级页都按教材单元列出所有单元的练习卷，按教材目录顺序排列，与孩子在校学习进度完全对应。
            </p>
          </details>
        </div>
      </section>
    </SectionLayout>
  );
}
