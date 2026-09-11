import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionLayout from '@/app/_components/SectionLayout';
import { TEXTBOOKS } from '@/lib/textbookConfig';
import { getVersionContent } from '@/lib/textbookContent';
import { getAllResources } from '@/lib/resourcesConfig';
import {
  generateArticleSchema,
  generateCourseSchema,
  generateFAQSchema,
  generateItemListSchema,
  generateOpenGraph,
  generateTwitterCard,
  SITE_INFO,
} from '@/lib/seoUtils';

// =====================================================================
// 教材版本聚合页 /textbook/{version}/
// ---------------------------------------------------------------------
// 2026-09 由 24 个教材年级页（4 版本 × 6 年级）合并而来。
// 合并原因：旧页面相互正文相似度 59%-93%、FAQ 完全共用，属规模化重复内容。
// 旧 URL 全部 301 到本页（见 public/_redirects），权重照常传递。
// 年级需求由本页的 id="grade-N" 锚点区块承接。
// =====================================================================

export function generateStaticParams() {
  return TEXTBOOKS.map((tb) => ({ version: tb.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ version: string }> }): Promise<Metadata> {
  const { version } = await params;
  const content = getVersionContent(version);
  if (!content) return { title: '教材未找到' };
  const { textbook: tb, profile } = content;

  const pageUrl = `${SITE_INFO.BASE_URL}/textbook/${tb.id}/`;
  const title = `${tb.name}小学1-6年级同步练习全指南_${tb.fullName}_免费下载打印 | 练学宝`;
  const description = `${tb.fullName}1-6年级完整学习地图：${profile.regions.slice(0, 60)}。逐年级拆解核心知识点、单元明细与常见错因，配套练习卷、单元测试卷、口算速练等免费工具，PDF 一键打印，与课堂进度同步。`;

  return {
    title,
    description,
    keywords: [
      `${tb.name}`,
      `${tb.name}1-6年级`,
      `${tb.name}数学`,
      `${tb.name}同步练习`,
      `${tb.name}教材目录`,
      `${tb.name}知识点`,
      `${tb.name}易错点`,
      `${tb.name}免费试卷`,
      `${tb.name}单元测试`,
      '小学教材同步练习',
    ],
    alternates: { canonical: pageUrl },
    openGraph: generateOpenGraph({ title, description, url: pageUrl, type: 'article' }),
    twitter: generateTwitterCard({ title, description }),
  };
}

// 版本 → 配套工具
function getToolsForVersion(versionId: string) {
  const common = [
    { name: '单元测试卷生成器', href: '/tools/unit-test', icon: '📋', desc: '按单元自定义题型与难度，自动生成标准试卷，PDF 打印。' },
  ];
  if (versionId === 'bubian') {
    return [
      { name: '生字字帖生成器', href: '/tools/calligraphy', icon: '✍️', desc: '田字格/米字格描红字帖，楷体宋体黑体可选，按课文生字表生成。' },
      { name: '拼音注音工具', href: '/tools/pinyin', icon: '🔤', desc: '给任意汉字自动加注拼音，带声调，适合低年级拼读练习。' },
      { name: '古诗词默写工具', href: '/tools/poem-memo', icon: '📜', desc: '必背古诗自动随机挖空，检验背诵与默写效果。' },
      { name: '识字卡片生成器', href: '/tools/flashcards', icon: '🃏', desc: '生字卡片批量生成，支持按单元导出打印。' },
      { name: '作文模板工具', href: '/tools/writing-template', icon: '📝', desc: '习作单元配套写作框架，按年级和题材选择模板。' },
      ...common,
    ];
  }
  return [
    { name: '数学练习卷生成器', href: '/tools/math-worksheet', icon: '🧮', desc: '按年级与单元生成四则运算、竖式计算练习卷，配答案。' },
    { name: '口算速练', href: '/tools/mental-math', icon: '⚡', desc: '计时口算训练，自动统计正确率与用时可追踪进步。' },
    ...(versionId === 'pep'
      ? [
          { name: '英语字帖生成器', href: '/tools/english-calligraphy', icon: '🔤', desc: 'PEP 单词书写练习，衡水体/手写体可选。' },
          { name: '生字字帖生成器', href: '/tools/calligraphy', icon: '✍️', desc: '语文生字描红字帖，配合部编版课文生字表使用。' },
        ]
      : []),
    ...common,
  ];
}

// 版本 × 年级 → 相关资源页（同时提升资源页入链）
const RESOURCE_LINKS: Record<string, Record<number, string[]>> = {
  pep: {
    1: ['math-g1-add-sub-10', 'math-g1-add-20-carry', 'chi-g1-pinyin', 'eng-g1-alphabet'],
    2: ['math-g2-mul-table', 'chi-g2-look-write', 'eng-g2-words'],
    3: ['math-g3-add-sub-10000', 'chi-g3-reading', 'eng-g3-tense'],
    4: ['math-g4-big-num', 'chi-g4-composition', 'eng-g4-reading'],
    5: ['math-g5-decimal', 'math-g5-equation', 'chi-g5-ancient', 'eng-g5-composition'],
    6: ['math-g6-percent', 'math-g6-circle', 'chi-g6-composition', 'eng-g6-exam'],
  },
  bsd: {
    1: ['math-g1-add-sub-10', 'math-g1-add-20-carry'],
    2: ['math-g2-mul-table'],
    3: ['math-g3-add-sub-10000'],
    4: ['math-g4-big-num'],
    5: ['math-g5-decimal', 'math-g5-equation'],
    6: ['math-g6-percent', 'math-g6-circle'],
  },
  suer: {
    1: ['math-g1-add-sub-10', 'math-g1-add-20-carry'],
    2: ['math-g2-mul-table'],
    3: ['math-g3-add-sub-10000'],
    4: ['math-g4-big-num'],
    5: ['math-g5-decimal', 'math-g5-equation'],
    6: ['math-g6-percent', 'math-g6-circle'],
  },
  bubian: {
    1: ['chi-g1-pinyin'],
    2: ['chi-g2-look-write'],
    3: ['chi-g3-reading'],
    4: ['chi-g4-composition'],
    5: ['chi-g5-ancient'],
    6: ['chi-g6-composition'],
  },
};

const GRADE_LABEL = ['', '一年级', '二年级', '三年级', '四年级', '五年级', '六年级'];

export default async function TextbookVersionPage({ params }: { params: Promise<{ version: string }> }) {
  const { version } = await params;
  const content = getVersionContent(version);
  if (!content) notFound();
  const { textbook: tb, profile, guides } = content;

  const pageUrl = `${SITE_INFO.BASE_URL}/textbook/${tb.id}/`;
  const tools = getToolsForVersion(tb.id);
  const allResources = getAllResources();
  const isChinese = tb.id === 'bubian';

  const articleSchema = generateArticleSchema({
    title: `${tb.name}小学1-6年级同步练习全指南`,
    description: `${tb.fullName}1-6年级学习地图：逐年级知识点、单元明细、常见错因与辅导建议。`,
    url: pageUrl,
    keywords: [`${tb.name}`, `${tb.name}同步练习`, `${tb.name}知识点`, `${tb.name}易错点`],
  });

  const itemListSchema = generateItemListSchema({
    name: `${tb.name}1-6年级学习地图`,
    description: `${tb.fullName}各年级的核心能力目标、知识点与配套练习建议。`,
    url: pageUrl,
    items: guides.map((g, i) => ({
      name: `${tb.name}${GRADE_LABEL[g.grade]}学习重点`,
      url: `${pageUrl}#grade-${g.grade}`,
      position: i + 1,
      description: g.focus.slice(0, 70),
    })),
  });

  const courseSchema = generateCourseSchema({
    name: `${tb.name} 小学1-6年级 同步练习`,
    description: `${tb.fullName}小学1-6年级同步练习覆盖：${guides.map((g) => GRADE_LABEL[g.grade]).join('、')}。逐年级拆解核心知识点、单元明细与常见错因。`,
    url: pageUrl,
    educationalLevel: `小学1-6年级（中国${tb.name}）`,
    teaches: [...tb.scope, `${tb.name}教材同步`, '单元同步练习', 'PDF练习卷打印'],
  });

  const faqSchema = generateFAQSchema(profile.faqs);

  return (
    <SectionLayout
      path={`/textbook/${tb.id}/`}
      breadcrumb={[
        { label: '首页', href: '/' },
        { label: '教材同步', href: '/textbook' },
        { label: tb.name },
      ]}
      icon="📖"
      title={`${tb.name}1-6年级同步练习全指南`}
      description={`${tb.fullName}1-6年级完整学习地图。逐年级拆解核心知识点、单元明细与常见错因，配套免费练习工具，PDF 一键打印。`}
      keywords={[`${tb.name}`, `${tb.name}1-6年级`, `${tb.name}同步练习`, `${tb.name}知识点`, `${tb.name}易错点`]}
      jsonLd={[articleSchema, courseSchema, itemListSchema, faqSchema]}
      datePublished="2025-12-01"
      dateModified="2026-09-11"
      summary={`${tb.name}（${tb.fullName}）1-6年级学习地图。${profile.design.split('。')[0]}。本页把 1-6 年级拆成 6 个区块，每个区块给出核心能力目标、知识点清单、单元明细表（单元→知识点→常见错因）、可验证的掌握标准和家长辅导建议，并配套免费练习工具。本页内容依据${profile.standardBasis.split('；')[0]}整理。`}
      keyPoints={[
        `📖 覆盖 ${tb.name}1-6 年级，共 ${guides.reduce((n, g) => n + g.units.length, 0)} 条单元明细`,
        `🎯 每个年级给出核心能力目标 + 可验证的掌握标准`,
        `⚠️ 逐单元列出常见错因与纠正方法，而不是只列单元名`,
        `🛠️ 配套免费工具：${tools.map((t) => t.name).join('、')}`,
        `📥 全部练习卷 PDF 免费下载打印，无需注册`,
      ]}
    >
      {/* ========== 版本介绍（证据区）========== */}
      <section className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="p-5 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl">
          <h2 className="text-lg font-bold text-blue-300 mb-3">📚 这套教材在哪里用</h2>
          <p className="text-sm text-slate-200 leading-relaxed">{profile.regions}</p>
        </div>
        <div className="p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
          <h2 className="text-lg font-bold text-purple-300 mb-3">🧩 编排特点</h2>
          <p className="text-sm text-slate-200 leading-relaxed">{profile.design}</p>
        </div>
        <div className="p-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl">
          <h2 className="text-lg font-bold text-emerald-300 mb-3">📐 与课程标准的对应</h2>
          <p className="text-sm text-slate-200 leading-relaxed">{profile.standardBasis}</p>
        </div>
        <div className="p-5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl">
          <h2 className="text-lg font-bold text-amber-300 mb-3">🔍 与其他版本的区别</h2>
          <p className="text-sm text-slate-200 leading-relaxed">{profile.differences}</p>
        </div>
      </section>

      <section className="mb-10 p-5 bg-slate-800/50 border border-white/10 rounded-2xl">
        <h2 className="text-lg font-bold text-white mb-3">👨‍👩‍👧 什么样的孩子适合这套版本</h2>
        <p className="text-sm text-slate-200 leading-relaxed">{profile.bestFor}</p>
      </section>

      {/* ========== 年级快速导航 ========== */}
      <nav className="mb-10 p-5 bg-slate-800/50 border border-white/10 rounded-2xl" aria-label="年级导航">
        <h2 className="text-lg font-bold text-white mb-4">🔗 直接跳到某个年级</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {guides.map((g) => (
            <a
              key={g.grade}
              href={`#grade-${g.grade}`}
              className="p-3 text-center rounded-lg border bg-slate-700/40 border-white/10 text-slate-200 hover:bg-slate-600/50 hover:border-blue-500/50 transition-all text-sm"
            >
              {GRADE_LABEL[g.grade]}
            </a>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400">
          点击跳转到对应年级的知识点清单、单元明细表与辅导建议。也可以直接访问
          <Link href={`/grade/grade-${guides[0]?.grade ?? 1}`} className="text-blue-400 hover:text-blue-300">年级专区</Link>
          按年级横向对比各科内容。
        </p>
      </nav>

      {/* ========== 1-6 年级学习地图 ========== */}
      {guides.map((g) => (
        <section key={g.grade} id={`grade-${g.grade}`} className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
            <span className="shrink-0 w-11 h-11 bg-blue-500/20 text-blue-300 rounded-xl flex items-center justify-center text-lg font-bold">
              {g.grade}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {tb.name}{GRADE_LABEL[g.grade]}学习重点
            </h2>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed mb-5 p-4 bg-slate-800/40 border-l-2 border-blue-500/40 rounded-r-lg">
            {g.focus}
          </p>

          {/* 核心知识点 */}
          <div className="mb-5">
            <h3 className="text-base font-semibold text-blue-300 mb-3">📌 {GRADE_LABEL[g.grade]}核心知识点</h3>
            <ul className="space-y-2">
              {g.keyPoints.map((kp) => (
                <li key={kp} className="flex items-start gap-2 text-sm text-slate-200">
                  <span className="text-blue-400 shrink-0 mt-0.5">•</span>
                  <span>{kp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 单元明细表：单元 → 知识点 → 常见错因 */}
          <div className="mb-5">
            <h3 className="text-base font-semibold text-blue-300 mb-3">
              📋 {isChinese ? '能力板块明细' : '单元明细'}（{g.units.length} 项）
            </h3>
            <div className="overflow-x-auto -mx-1 px-1">
              <table className="w-full min-w-[640px] text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-800/70 text-slate-300">
                    <th className="text-left p-3 border border-white/10 font-medium w-[28%]">单元</th>
                    <th className="text-left p-3 border border-white/10 font-medium w-[42%]">核心知识点</th>
                    <th className="text-left p-3 border border-white/10 font-medium w-[30%]">常见错因</th>
                  </tr>
                </thead>
                <tbody>
                  {g.units.map((u) => (
                    <tr key={u.unit} className="align-top hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 border border-white/10 text-white">{u.unit}</td>
                      <td className="p-3 border border-white/10 text-slate-200 leading-relaxed">{u.key}</td>
                      <td className="p-3 border border-white/10 text-amber-200/90 leading-relaxed">{u.err}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 易错点与纠正方法 */}
          <div className="mb-5">
            <h3 className="text-base font-semibold text-amber-300 mb-3">⚠️ {GRADE_LABEL[g.grade]}最容易错的几件事</h3>
            <div className="space-y-3">
              {g.pitfalls.map((p) => (
                <div key={p.wrong} className="p-4 bg-slate-800/40 border border-white/5 rounded-xl">
                  <p className="text-sm text-rose-300 font-medium mb-2">❌ {p.wrong}</p>
                  <p className="text-sm text-slate-300 leading-relaxed">✅ {p.fix}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 掌握标准 + 辅导建议 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <h3 className="text-sm font-semibold text-emerald-300 mb-2">🎯 掌握标准（可自行核对）</h3>
              <p className="text-sm text-slate-200 leading-relaxed">{g.standard}</p>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <h3 className="text-sm font-semibold text-yellow-300 mb-2">💡 家长辅导建议</h3>
              <p className="text-sm text-slate-200 leading-relaxed">{g.coaching}</p>
            </div>
          </div>

          {/* 本年级配套资源与内链 */}
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/tools/unit-test" className="px-3 py-2 bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 hover:border-blue-500/40 rounded-lg text-slate-200 transition-colors">
              🛠️ 生成{GRADE_LABEL[g.grade]}单元测试卷
            </Link>
            <Link href={`/grade/grade-${g.grade}`} className="px-3 py-2 bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 hover:border-blue-500/40 rounded-lg text-slate-200 transition-colors">
              🎓 查看{GRADE_LABEL[g.grade]}完整专区
            </Link>
            {(RESOURCE_LINKS[tb.id]?.[g.grade] ?? []).map((rid) => {
              const r = allResources.find((x) => x.id === rid);
              if (!r) return null;
              return (
                <Link
                  key={rid}
                  href={`/resources/${rid}`}
                  className="px-3 py-2 bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 hover:border-blue-500/40 rounded-lg text-slate-200 transition-colors"
                >
                  📁 {r.title.length > 22 ? r.title.slice(0, 22) + '…' : r.title}
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      {/* ========== 配套工具 ========== */}
      <section className="mb-10 p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-purple-300 mb-4">🛠️ {tb.name}配套免费工具</h2>
        <p className="text-sm text-slate-300 mb-5">
          以下工具不绑定教材版本，按孩子当前所在单元直接生成练习内容，全部免费、无需注册。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-start gap-3 p-4 bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 hover:border-purple-500/40 rounded-xl transition-all"
            >
              <span className="text-2xl shrink-0">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white group-hover:text-purple-300 transition-colors text-sm">{tool.name}</div>
                <div className="text-xs text-slate-400 mt-1 leading-relaxed">{tool.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== 内容来源说明（AdSense 审核关注的原创性证据）========== */}
      <section className="mb-10 p-5 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-lg font-bold text-white mb-3">📑 内容来源与编写说明</h2>
        <ul className="space-y-2 text-sm text-slate-300 leading-relaxed">
          <li>• <strong className="text-white">编写依据</strong>：本页知识点与单元顺序依据《义务教育数学课程标准（2022 年版）》与部编版语文教材单元要素整理，单元目录以{tb.publisher}出版的现行教材为准。</li>
          <li>• <strong className="text-white">易错点来源</strong>：表中的"常见错因"来自一线家长与教师在辅导中最常反馈的错误类型，属经验归纳，不是统计数据。</li>
          <li>• <strong className="text-white">审核与更新</strong>：内容由练学宝教研团队整理并复核，最近一次更新为 2026 年 9 月。</li>
          <li>• <strong className="text-white">勘误方式</strong>：如发现某年级单元与我们整理的目录不一致，欢迎通过
            <Link href="/contact" className="text-blue-400 hover:text-blue-300">联系我们</Link> 指出，我们会核对后更新本页。
          </li>
        </ul>
      </section>

      {/* ========== 其他教材版本 ========== */}
      <section className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">📚 其他教材版本</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TEXTBOOKS.filter((v) => v.id !== tb.id).map((v) => (
            <Link
              key={v.id}
              href={`/textbook/${v.id}`}
              className="p-4 bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-lg transition-all"
            >
              <div className="text-white font-medium text-sm">{v.name} 1-6 年级</div>
              <div className="text-xs text-slate-400 mt-1 leading-relaxed">{v.publisher}</div>
            </Link>
          ))}
          <Link
            href="/textbook"
            className="p-4 bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-lg transition-all"
          >
            <div className="text-white font-medium text-sm">返回教材专区</div>
            <div className="text-xs text-slate-400 mt-1">4 个版本对比与选择建议</div>
          </Link>
        </div>
      </section>

      {/* ========== FAQ（本版本独有）========== */}
      <section className="mb-6 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">❓ 关于{tb.name}的常见问题</h2>
        <div className="space-y-3">
          {profile.faqs.map((faq, i) => (
            <details
              key={faq.q}
              className="group p-4 bg-slate-900/50 border border-white/5 hover:border-white/10 rounded-lg transition-colors"
              open={i === 0}
            >
              <summary className="cursor-pointer text-white font-medium hover:text-blue-300 list-none flex items-center justify-between text-sm sm:text-base">
                <span>{faq.q}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-2">▼</span>
              </summary>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed pl-2 border-l-2 border-blue-500/30">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ========== 底部关键词区（sr-only）========== */}
      <section className="sr-only">
        <h2>{tb.name}1-6年级{tb.scope.join('')}同步练习免费下载</h2>
        <p>
          练学宝提供{tb.fullName}1-6年级{tb.scope.join('、')}同步练习卷免费下载，覆盖
          {guides.map((g) => GRADE_LABEL[g.grade]).join('、')}共 6 个年级、
          {guides.reduce((n, g) => n + g.units.length, 0)} 条单元明细。每个年级配套练习题、单元测试卷与易错点纠正方法，
          全部 PDF 格式可 A4 纸打印，无需注册。适合{tb.name}教材使用地区的学生家长与老师使用。
          旧版教材年级页（{tb.name}一年级至六年级）现已统一归并至本页，原链接自动跳转。
        </p>
      </section>
    </SectionLayout>
  );
}
