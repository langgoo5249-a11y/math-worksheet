import type { Metadata } from 'next';
import Link from 'next/link';
import SectionLayout from '@/app/_components/SectionLayout';
import { TEXTBOOKS } from '@/lib/textbookConfig';
import { VERSION_PROFILES } from '@/lib/textbookContent';
import { generateItemListSchema, generateOrganizationSchema } from '@/lib/seoUtils';

// 说明：2026-09 起，教材专区不再逐个年级链接（原来 24 个年级页已合并为
// 4 个版本聚合页），改为链接版本页并用锚点定位年级。

export const metadata: Metadata = {
  title: '小学教材同步练习专区 - 人教版/北师大版/苏教版/部编版全解 | 练学宝',
  description: '小学教材同步练习专区，覆盖人教版（PEP）、北师大版、苏教版、部编版（统编版）1-6年级数学语文英语，每个版本提供逐年级知识点、单元明细、常见错因与配套免费练习卷，PDF 免费下载打印。',
  keywords: ['小学教材同步练习', '人教版', '北师大版', '苏教版', '部编版', 'PEP', '小学数学下册', '小学语文下册', '教材同步', '教材版本对比'],
  alternates: {
    canonical: 'https://www.skillxm.cn/textbook/',
  },
  openGraph: {
    title: '小学教材同步练习专区 - 练学宝',
    description: '人教版/北师大版/苏教版/部编版 4 个版本，1-6 年级学习地图与免费练习卷',
    url: 'https://www.skillxm.cn/textbook',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '小学教材同步练习专区 - 练学宝',
    description: '4 个版本，1-6 年级同步练习',
  },
};

const GRADE_LABEL = ['', '一年级', '二年级', '三年级', '四年级', '五年级', '六年级'];

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
      dateModified="2026-09-11"
      summary={'练学宝教材同步专区覆盖 4 个主流教材版本（人教版 PEP、北师大版 BSD、苏教版、部编版）。每个版本提供一个从一年级到六年级的完整学习地图：逐年级给出核心知识点、单元明细表（单元 → 知识点 → 常见错因）、可验证的掌握标准与家长辅导建议。家长搜索"人教版三年级数学下册练习题"等长尾词可直接跳转到对应版本的三年级区块。'}
      keyPoints={[
        '覆盖 4 个主流版本：人教 / 北师 / 苏教 / 部编',
        '每个版本承载 1-6 年级完整学习地图（共 4 个版本页）',
        '逐单元列出"知识点 + 常见错因"，不只是罗列单元名',
        '每页附版本独有的常见问题解答与内容来源说明',
        '全部 PDF 免费下载打印，无需注册',
      ]}
      jsonLd={[
        generateItemListSchema({
          name: '小学教材同步练习专区',
          description: '人教版/北师大版/苏教版/部编版 1-6年级同步练习',
          url: 'https://www.skillxm.cn/textbook',
          items: TEXTBOOKS.map((tb, i) => ({
            name: `${tb.name}1-6年级同步练习`,
            url: `https://www.skillxm.cn/textbook/${tb.id}/`,
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
            <div className="grid grid-cols-3 gap-2 mb-4">
              {tb.grades.map((g) => (
                <Link
                  key={g.grade}
                  href={`/textbook/${tb.id}/#grade-${g.grade}`}
                  className="px-2 py-2 bg-slate-700/50 hover:bg-blue-500/20 border border-white/5 hover:border-blue-500/30 rounded-lg text-center text-xs text-slate-300 hover:text-blue-200 transition-colors"
                  aria-label={`${tb.name} ${GRADE_LABEL[g.grade]}学习重点`}
                >
                  {GRADE_LABEL[g.grade]}
                </Link>
              ))}
            </div>
            <Link
              href={`/textbook/${tb.id}`}
              className="flex items-center justify-between px-4 py-2.5 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/25 rounded-lg transition-colors text-sm"
            >
              <span className="text-blue-200 font-medium">查看 {tb.name} 1-6 年级完整学习地图</span>
              <span className="text-blue-300 text-xs">→</span>
            </Link>
            {VERSION_PROFILES[tb.id] && (
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                {VERSION_PROFILES[tb.id].regions.slice(0, 78)}…
              </p>
            )}
          </div>
        ))}
      </section>

      <section className="mt-10 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-blue-300 mb-3">📖 如何选教材版本？</h2>
        <ul className="text-slate-200 space-y-2 text-sm list-disc list-inside">
          <li><strong>查孩子课本封面</strong>：封面左下角或书脊上会印着"人民教育出版社""北京师范大学出版社"等字样</li>
          <li><strong>看孩子课本目录</strong>：每个版本目录顺序不同，单元数也不同</li>
          <li><strong>问孩子老师</strong>：直接询问班主任"我们班用的是哪个版本"</li>
          <li><strong>注意学科可能不同版本</strong>：语文现在全国基本都用部编版，数学可能是人教版或北师大版，这属正常组合</li>
          <li><strong>不确定选什么？</strong>：数学选"人教版"（使用最广），语文直接看部编版页</li>
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
              人教版由人民教育出版社出版，使用范围最广；北师大版由北京师范大学出版社出版，采用"情境 + 问题串"编排，知识点推进更早（三年级就有小数和混合运算）；苏教版由江苏教育出版社出版，编排细密，从三年级起每册设"解决问题的策略"专章。三者的核心知识点都依据同一份课程标准，差异在编排顺序与呈现方式。
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer text-white font-medium hover:text-blue-300 list-none flex items-center justify-between p-3 bg-slate-900/40 rounded-lg">
              <span>部编版和人教版语文教材一样吗？</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-4">
              不一样。部编版（统编版）是 2017 年后由教育部组织统一编写的语文教材，同样由人民教育出版社出版，目前小学语文基本全部使用。人教版语文是人民教育出版社过去自行编写的版本。数学、英语仍由人教版、北师大版、苏教版等分别出版。
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer text-white font-medium hover:text-blue-300 list-none flex items-center justify-between p-3 bg-slate-900/40 rounded-lg">
              <span>原来的教材年级页去哪了？链接还有效吗？</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-4">
              2026 年 9 月起，原先按"版本 × 年级"拆分的教材页已合并为 4 个版本页，每个版本页内含 1-6 年级的完整内容区块。旧链接（如 /textbook/pep/grade-3/）会自动 301 跳转到对应版本页，页面权重照常传递，不会出现 404。
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer text-white font-medium hover:text-blue-300 list-none flex items-center justify-between p-3 bg-slate-900/40 rounded-lg">
              <span>同步练习卷是按单元组织的吗？</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-4">
              是的。每个版本的年级区块内都列出了该年级的完整单元明细表，标注了每个单元的核心知识点与常见错因，配套的练习卷生成器可按单元生成对应难度的题目，与孩子在校学习进度对应。
            </p>
          </details>
        </div>
      </section>
    </SectionLayout>
  );
}
