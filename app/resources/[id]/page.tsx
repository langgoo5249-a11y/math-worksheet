import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionLayout from '@/app/_components/SectionLayout';
import RelatedTools from '@/app/_components/RelatedTools';
import ShareButtons from '@/app/_components/ShareButtons';
import { getAllResources, getResourceById, GRADE_LIST } from '@/lib/resourcesConfig';
import { getResourceFaqs } from '@/lib/resourceFaqs';
import { getResourceDeepContent } from '@/lib/resourceDeepContent';
import { TOOLS } from '@/lib/toolRegistry';
import {
  generateArticleSchema,
  generateLearningResourceSchema,
  generateOpenGraph,
  generateTwitterCard,
  SITE_INFO,
} from '@/lib/seoUtils';

export async function generateStaticParams() {
  return getAllResources().map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const r = getResourceById(id);
  if (!r) return { title: '资源未找到' };
  const pageUrl = `${SITE_INFO.BASE_URL}/resources/${r.id}/`;
  const gradeName = GRADE_LIST.find(g => g.grade === r.grade)?.name || '';
  const title = `${r.title} - 免费PDF下载 | 练学宝`;
  const description = `${r.description} 包含${r.questionCount}道题、${r.pageCount}页，适合${gradeName}${r.knowledgePoint}专项练习。`;

  return {
    title,
    description,
    keywords: [r.title, ...r.tags, `${gradeName}${r.knowledgePoint}`, '小学练习卷', 'PDF下载'],
    alternates: { canonical: pageUrl },
    openGraph: generateOpenGraph({ title, description, url: pageUrl, type: 'article' }),
    twitter: generateTwitterCard({ title, description }),
  };
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = getResourceById(id);
  if (!r) notFound();

  const pageUrl = `${SITE_INFO.BASE_URL}/resources/${r.id}/`;
  const gradeName = GRADE_LIST.find(g => g.grade === r.grade)?.name || '';
  const subjectName = { math: '数学', chinese: '语文', english: '英语', science: '科学' }[r.subject];

  const learningResourceSchema = generateLearningResourceSchema({
    name: r.title,
    description: `${r.description} 适合${gradeName}${r.knowledgePoint}专项练习。`,
    url: pageUrl,
    educationalLevel: `${gradeName}（小学${r.grade}年级）`,
    learningResourceType: '练习卷/练习册',
    teaches: [r.knowledgePoint, ...(r.tags || [])],
    keywords: [r.title, ...r.tags],
  });

  // 逐页定制的 FAQ（lib/resourceFaqs.ts）
  // 变更前：21 个资源页共用同一段 FAQ 模板，其中"如何打印"等条目完全一致，
  // 会把"有 FAQ"做成重复信号放大器。现在每页 4 条，问题与答案均不跨页复用。
  const faqs = getResourceFaqs(r.id);

  // 逐页专属的深度内容：课标定位、典型例题精讲、常见错误纠正、四周练习路径
  // 变更前这里只有 9 个知识点写了内容，其余 12 个落到一句通用兜底文案
  const deep = getResourceDeepContent(r.id);

  // 内容型页面的 Article 结构化数据（补 E-E-A-T 证据）
  const articleSchema = generateArticleSchema({
    title: r.title,
    description: `${r.description} 适合${gradeName}${r.knowledgePoint}专项练习。`,
    url: pageUrl,
    keywords: [r.title, ...r.tags, `${gradeName}${r.knowledgePoint}`],
  });

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
      path={`/resources/${r.id}/`}
      breadcrumb={[
        { label: '首页', href: '/' },
        { label: '资源库', href: '/resources' },
        { label: r.title },
      ]}
      icon={r.subject === 'math' ? '🧮' : r.subject === 'chinese' ? '📖' : '🔤'}
      title={r.title}
      description={r.description}
      keywords={[r.title, ...r.tags, `${gradeName}${r.knowledgePoint}`, '小学练习卷', 'PDF下载']}
      jsonLd={[learningResourceSchema, articleSchema, faqSchema]}
      summary={`${r.title}：${gradeName}${r.knowledgePoint}专项练习卷，${r.pageCount}页、${r.questionCount}道题、难度${r.difficulty}、预计${r.estimatedTime}完成。配套练学宝${subjectName}相关工具使用效果更佳，支持PDF免费下载打印。`}
      keyPoints={[
        `📚 ${gradeName} · ${subjectName} · ${r.knowledgePoint}专项练习`,
        `✏️ ${r.questionCount}道精选题 · ${r.pageCount}页 · 难度${r.difficulty}`,
        `⏱ 预计完成时间：${r.estimatedTime}`,
        `🛠️ 配套工具：${r.subject === 'math' ? '数学练习卷生成器、口算速练' : r.subject === 'chinese' ? '字帖生成器、拼音注音、作文模板' : '英语字帖生成器、单词卡片'}`,
        `📥 PDF免费下载打印 · 无需注册 · 永久免费`,
      ]}
    >
      {/* 资源信息卡片 */}
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
          <div className="text-xs text-slate-400">年级</div>
          <div className="text-lg font-bold text-blue-300 mt-1">{gradeName}</div>
        </div>
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center">
          <div className="text-xs text-slate-400">学科</div>
          <div className="text-lg font-bold text-purple-300 mt-1">{subjectName}</div>
        </div>
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
          <div className="text-xs text-slate-400">题量</div>
          <div className="text-lg font-bold text-emerald-300 mt-1">{r.questionCount}题</div>
        </div>
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg text-center">
          <div className="text-xs text-slate-400">页数</div>
          <div className="text-lg font-bold text-orange-300 mt-1">{r.pageCount}页</div>
        </div>
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-center">
          <div className="text-xs text-slate-400">难度</div>
          <div className="text-lg font-bold text-rose-300 mt-1">{r.difficulty}</div>
        </div>
      </section>

      {/* 知识点与预计时间 */}
      <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-3">📚 知识点与使用建议</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-slate-400 mb-1">核心知识点</div>
            <div className="text-white font-medium">{r.knowledgePoint}</div>
          </div>
          <div>
            <div className="text-slate-400 mb-1">预计完成时间</div>
            <div className="text-white font-medium">{r.estimatedTime}</div>
          </div>
          <div>
            <div className="text-slate-400 mb-1">建议频率</div>
            <div className="text-white font-medium">每周1-2次，持续4周</div>
          </div>
          <div>
            <div className="text-slate-400 mb-1">配套工具</div>
            <div className="text-white font-medium">
              {r.subject === 'math' && '数学练习卷生成器、口算速练'}
              {r.subject === 'chinese' && '字帖生成器、拼音注音、作文模板'}
              {r.subject === 'english' && '英语字帖生成器'}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {r.tags.map((t) => (
            <span key={t} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">#{t}</span>
          ))}
        </div>
      </section>

      {/* 操作按钮区 */}
      <section className="mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">🚀 立即开始练习</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {r.subject === 'math' && (
            <>
              <Link href="/tools/math-worksheet/" className="block p-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">🧮</div>
                <div className="text-white font-medium text-sm">生成同类练习</div>
                <div className="text-xs text-slate-400 mt-1">数学练习卷生成器</div>
              </Link>
              <Link href="/tools/mental-math/" className="block p-4 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-white font-medium text-sm">在线口算</div>
                <div className="text-xs text-slate-400 mt-1">口算速练</div>
              </Link>
              <Link href="/tools/unit-test/" className="block p-4 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">📋</div>
                <div className="text-white font-medium text-sm">单元测试</div>
                <div className="text-xs text-slate-400 mt-1">单元测试卷</div>
              </Link>
            </>
          )}
          {r.subject === 'chinese' && (
            <>
              <Link href="/tools/calligraphy/" className="block p-4 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">✍️</div>
                <div className="text-white font-medium text-sm">字帖练习</div>
                <div className="text-xs text-slate-400 mt-1">字帖生成器</div>
              </Link>
              <Link href="/tools/pinyin/" className="block p-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">📝</div>
                <div className="text-white font-medium text-sm">拼音注音</div>
                <div className="text-xs text-slate-400 mt-1">拼音练习生成器</div>
              </Link>
              <Link href="/tools/writing-template/" className="block p-4 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">📄</div>
                <div className="text-white font-medium text-sm">作文模板</div>
                <div className="text-xs text-slate-400 mt-1">看图写话/作文</div>
              </Link>
            </>
          )}
          {r.subject === 'english' && (
            <>
              <Link href="/tools/english-calligraphy/" className="block p-4 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">🔤</div>
                <div className="text-white font-medium text-sm">英语字帖</div>
                <div className="text-xs text-slate-400 mt-1">四线三格练习</div>
              </Link>
              <Link href="/tools/flashcards/" className="block p-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">🃏</div>
                <div className="text-white font-medium text-sm">单词卡片</div>
                <div className="text-xs text-slate-400 mt-1">识字卡片</div>
              </Link>
              <Link href="/tools/unit-test/" className="block p-4 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">📋</div>
                <div className="text-white font-medium text-sm">英语测试</div>
                <div className="text-xs text-slate-400 mt-1">单元测试卷</div>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* 课标定位与知识点价值 */}
      {deep && (
        <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4">💡 为什么 {r.knowledgePoint} 重要</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <div className="p-4 bg-blue-500/10 border-l-4 border-blue-500/40 rounded-r-lg">
              <div className="text-xs text-blue-300 font-medium mb-1">📘 课标定位</div>
              <p className="text-slate-300">{deep.standard}</p>
            </div>
            <div className="p-4 bg-emerald-500/10 border-l-4 border-emerald-500/40 rounded-r-lg">
              <div className="text-xs text-emerald-300 font-medium mb-1">🔗 在后续学习中的作用</div>
              <p className="text-slate-300">{deep.why}</p>
            </div>
          </div>
        </section>
      )}

      {/* 典型例题精讲 */}
      {deep && (
        <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4">
            ✏️ {r.knowledgePoint} 典型例题精讲
            <span className="ml-2 text-xs text-slate-400 font-normal">{deep.examples.length} 道 · 含分步解析</span>
          </h2>
          <div className="space-y-5">
            {deep.examples.map((ex, i) => (
              <div key={i} className="p-4 bg-slate-900/50 border border-white/10 rounded-xl">
                <div className="flex gap-3 mb-3">
                  <span className="shrink-0 w-6 h-6 flex items-center justify-center bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full">{i + 1}</span>
                  <p className="text-white font-medium text-sm leading-relaxed">{ex.q}</p>
                </div>
                <ol className="space-y-2 mb-3 ml-9">
                  {ex.steps.map((s, j) => (
                    <li key={j} className="text-sm text-slate-300 leading-relaxed flex gap-2">
                      <span className="shrink-0 text-slate-500 text-xs mt-1">{j + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                <div className="ml-9 flex flex-wrap items-center gap-3">
                  <span className="px-2 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs rounded">
                    答案：{ex.answer}
                  </span>
                </div>
                <p className="ml-9 mt-3 text-xs text-amber-300/90 leading-relaxed">
                  ⚠️ 易错提示：{ex.note}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 常见错误与纠正 */}
      {deep && (
        <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4">
            ⚠️ {r.knowledgePoint} 最常见的 {deep.mistakes.length} 个错误
            <span className="ml-2 text-xs text-slate-400 font-normal">错因分析 + 纠正方法</span>
          </h2>
          <div className="space-y-3">
            {deep.mistakes.map((m, i) => (
              <div key={i} className="p-4 bg-slate-900/50 border border-white/10 rounded-xl">
                <div className="flex gap-2 items-start mb-2">
                  <span className="shrink-0 text-rose-400 text-sm">❌</span>
                  <code className="text-sm text-rose-300 break-all">{m.wrong}</code>
                </div>
                <div className="flex gap-2 items-start mb-2 ml-6">
                  <span className="shrink-0 text-slate-500 text-xs mt-[3px]">错因</span>
                  <p className="text-sm text-slate-400 leading-relaxed">{m.reason}</p>
                </div>
                <div className="flex gap-2 items-start ml-6">
                  <span className="shrink-0 text-emerald-400 text-xs mt-[3px]">纠正</span>
                  <p className="text-sm text-slate-300 leading-relaxed">{m.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4 周练习路径 */}
      {deep && (
        <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4">
            🗓️ {r.knowledgePoint} 四周练习路径
            <span className="ml-2 text-xs text-slate-400 font-normal">按周递增，可直接照做</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-slate-400 text-xs">
                  <th className="text-left p-3 border-b border-white/10 font-medium w-20">周次</th>
                  <th className="text-left p-3 border-b border-white/10 font-medium w-40">本周重点</th>
                  <th className="text-left p-3 border-b border-white/10 font-medium">具体任务</th>
                </tr>
              </thead>
              <tbody>
                {deep.plan.map((p, i) => (
                  <tr key={i} className="align-top">
                    <td className="p-3 border-b border-white/5 text-blue-300 font-medium whitespace-nowrap">{p.week}</td>
                    <td className="p-3 border-b border-white/5 text-white">{p.focus}</td>
                    <td className="p-3 border-b border-white/5 text-slate-300 leading-relaxed">{p.task}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <div className="text-xs text-purple-300 font-medium mb-2">🎯 四周后的掌握自检标准</div>
            <ul className="space-y-1.5">
              {deep.mastery.map((m, i) => (
                <li key={i} className="text-sm text-slate-300 leading-relaxed flex gap-2">
                  <span className="shrink-0 text-purple-400">☐</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 知识点说明兜底（深度内容缺失时才显示） */}
      {!deep && (
        <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-3">💡 {r.knowledgePoint} 学习要点</h2>
          <div className="text-slate-300 text-sm space-y-2 leading-relaxed">
            <p>这是一份针对{gradeName}{r.knowledgePoint}的专项练习，配合本站工具使用效果更佳。</p>
          </div>
        </section>
      )}

      {/* FAQ - 逐页定制（每页 4 条，不与其他资源页共用） */}
      <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">❓ 关于{gradeName}{r.knowledgePoint}的常见问题</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="p-4 bg-slate-900/50 border border-white/5 rounded-lg">
              <summary className="text-white font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400 leading-relaxed">
          📌 打印说明：本练习卷为 A4 版式 PDF，打印时请选择「实际大小」并关闭「适应页面缩放」，以保持题目间距与书写空间。建议先打印 1 页样张确认排版，再批量打印。
        </p>
      </section>

      {/* 内容来源说明（原创性与专业性证据） */}
      <section className="mb-8 p-5 bg-slate-800/30 border border-white/10 rounded-2xl">
        <h2 className="text-base font-bold text-white mb-3">📑 内容来源说明</h2>
        <ul className="space-y-2 text-sm text-slate-300 leading-relaxed">
          <li>• 题目依据《义务教育{r.subject === 'math' ? '数学' : r.subject === 'chinese' ? '语文' : '英语'}课程标准（2022 年版）》与{gradeName}{r.knowledgePoint}的教学要求编写，共 {r.pageCount} 页、{r.questionCount} 题。</li>
          <li>• 难度定位为{r.difficulty}，建议单次完成时间 {r.estimatedTime}，按"{r.tags.slice(0, 2).join('、')}"的目标编排题型梯度。</li>
          <li>• 内容由练学宝教研团队整理并复核，最近更新：2026-09。发现题目或解析问题请通过<Link href="/contact" className="text-blue-400 hover:text-blue-300">联系我们</Link>反馈。</li>
        </ul>
        {deep && (
          <>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-xs text-slate-400 mb-2">本页例题与错因分析依据：</div>
              <ul className="space-y-1.5 text-sm text-slate-400 leading-relaxed">
                {deep.sources.map((s, i) => (
                  <li key={i}>· {s}</li>
                ))}
              </ul>
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              说明：本页所有例题均为教研团队按课程标准要求自行编写，用于演示解题方法；文中提到的方法名称（如凑十法、魔法 e、三查清单）为国内小学数学/英语教学中通行的教学用语，非地方性专有名词。页面不含任何未经核实的统计数据。
            </p>
          </>
        )}
      </section>

      {/* 相关工具 */}
      <RelatedTools tools={TOOLS.slice(0, 6)} currentSlug="resources" />

      {/* 分享 */}
      <section className="mt-8">
        <ShareButtons
          url={`https://www.skillxm.cn/resources/${r.id}`}
          title={r.title}
        />
      </section>
    </SectionLayout>
  );
}
