import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionLayout from '@/app/_components/SectionLayout';
import { GRADES, getGradeConfig } from '@/lib/gradeConfig';
import { getGradeFaqs } from '@/lib/gradeFaqs';
import { KNOWLEDGE_POINTS } from '@/lib/knowledgeConfig';
import { articles as blogPosts } from '@/app/blog/data';
import { generateArticleSchema, generateCourseSchema, generateOrganizationSchema } from '@/lib/seoUtils';

export function generateStaticParams() {
  return GRADES.map((g) => ({ grade: `grade-${g.grade}` }));
}

export async function generateMetadata({ params }: { params: Promise<{ grade: string }> }): Promise<Metadata> {
  const { grade: slug } = await params;
  const gradeNum = parseInt(slug.replace('grade-', ''), 10);
  const config = getGradeConfig(gradeNum);
  if (!config) return { title: '年级未找到' };

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.metaKeywords,
    alternates: {
      canonical: `https://www.skillxm.cn/grade/${slug}/`,
    },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `https://www.skillxm.cn/grade/${slug}/`,
      type: 'article',
      locale: 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.metaTitle,
      description: config.metaDescription,
    },
  };
}

// 将年级知识点名称映射到知识点专题 slug
function mapKnowledgePointToSlug(kpName: string): string | null {
  const matched = KNOWLEDGE_POINTS.find((kp) => {
    // 年级知识点名称包含知识点专题名称，或知识点专题名称包含年级知识点名称
    return kpName.includes(kp.name) || kp.name.includes(kpName);
  });
  return matched ? `/knowledge/${matched.slug}/` : null;
}

export default async function GradePage({ params }: { params: Promise<{ grade: string }> }) {
  const { grade: slug } = await params;
  const gradeNum = parseInt(slug.replace('grade-', ''), 10);
  const config = getGradeConfig(gradeNum);
  if (!config) notFound();

  // P3-3：相关博客按「年级主题词命中优先 + 按年级轮转」挑选，
  // 避免相邻年级（如五年级/六年级 blogCategories 相同）列出完全相同的 6 篇，
  // 那会让两页出现 1300+ 字完全一致的正文块。
  const pool = blogPosts.filter((p) => config.blogCategories.some((c) => p.category === c));
  const hints = [config.name, `${gradeNum}年级`];
  const scored = pool.map((p, i) => {
    const text = p.title + p.id + p.description;
    const hit = hints.reduce((n, h) => n + (text.includes(h) ? 1 : 0), 0);
    // 以年级号为偏移做轮转，保证各年级取到不同的 6 篇，且构建结果稳定
    const rot = (i + (gradeNum - 1) * 3) % pool.length;
    return { post: p, hit, rot };
  });
  scored.sort((x, y) => (y.hit - x.hit) || (x.rot - y.rot));
  const relatedBlogs = scored.slice(0, 6).map((x) => x.post);

  // 按年级定制的 FAQ（lib/gradeFaqs.ts，每页 6 条，不与其他年级共用）
  // 变更前：6 个年级页共用同一段模板生成的 FAQ，只有数字随年级变化。
  const faqs = getGradeFaqs(gradeNum);
  // P3-3：学期计划与家长指南改为读取 config 中的年级专属字段，
  // 不再按「1-2 / 3-4 / 5-6」区间生成，消除同区间年级的正文重复。
  const semesterPlan = config.semesterPlan;

  const faqSchema = faqs.length > 0 ? {
    '@type': 'FAQPage' as const,
    'mainEntity': faqs.map((f) => ({
      '@type': 'Question' as const,
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer' as const, 'text': f.a },
    })),
  } : null;

  // 内容型页面的 Article 结构化数据（补 E-E-A-T 证据）
  const articleSchema = generateArticleSchema({
    title: config.metaTitle,
    description: config.metaDescription,
    url: `https://www.skillxm.cn/grade/${slug}/`,
    keywords: config.metaKeywords,
  });

  return (
    <SectionLayout
      breadcrumb={[
        { label: '首页', href: '/' },
        { label: '年级专区', href: '/grade' },
        { label: config.name },
      ]}
      icon="🎓"
      title={`${config.name}学习专区 · 完整学习方案`}
      description={config.description}
      keywords={config.metaKeywords}
      path={`/grade/${slug}`}
      datePublished="2025-12-01"
      dateModified={new Date().toISOString().slice(0, 10)}
      summary={`${config.name}（${config.ageRange}）是${config.semester}的${config.description.split('。')[0]}。本专区提供：核心知识点清单、配套学习工具推荐、上下学期学习计划、家长辅导指南、FAQ常见问题解答${relatedBlogs.length > 0 ? '、' + relatedBlogs.length + ' 篇精选教育文章' : ''}。所有练习资源均可免费下载PDF打印。`}
      keyPoints={config.knowledgePoints.slice(0, 5)}
      jsonLd={[
        generateCourseSchema({
          name: config.metaTitle,
          description: config.metaDescription,
          url: `https://www.skillxm.cn/grade/${slug}/`,
          educationalLevel: config.name,
          teaches: config.knowledgePoints.slice(0, 8),
        }),
        ...(faqSchema ? [faqSchema] : []),
        articleSchema,
        generateOrganizationSchema(),
      ]}
    >
      {/* ========== 年级概览 ========== */}
      <section className="mb-10 p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-2xl">
        <p className="text-slate-200 leading-relaxed text-base sm:text-lg">
          {config.longDescription}
        </p>
        <div className="flex flex-wrap gap-3 mt-4 text-sm">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">适合年龄：{config.ageRange}</span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">覆盖：{config.semester}</span>
          {config.subjects.length > 0 && (
            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full">
              {config.subjects.length}大学科：{config.subjects.map(s => s.name).join('、')}
            </span>
          )}
        </div>
      </section>

      {/* ========== 学期学习计划 ========== */}
      {semesterPlan && (
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
            📅 {config.name}上下学期学习计划
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
              <h3 className="text-lg font-semibold text-orange-300 mb-3 flex items-center gap-2">
                🍂 {config.name}上学期学习重点
              </h3>
              <ul className="space-y-2">
                {semesterPlan.firstSemester.map((tip, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-orange-400 shrink-0 mt-0.5">{i + 1}.</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-2xl">
              <h3 className="text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
                🌱 {config.name}下学期学习重点
              </h3>
              <ul className="space-y-2">
                {semesterPlan.secondSemester.map((tip, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-green-400 shrink-0 mt-0.5">{i + 1}.</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ========== 学科模块 ========== */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          📚 {config.name}学习内容与知识点
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {config.subjects.map((s) => (
            <div key={s.name} className="p-5 bg-slate-800/50 border border-white/10 rounded-xl hover:border-blue-500/30 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">{s.icon}</span>
                {s.name}
              </h3>
              <ul className="space-y-1.5">
                {s.items.map((item) => (
                  <li key={item} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 推荐工具 ========== */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          🛠️ {config.name}推荐学习工具（全部免费）
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {config.recommendTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-start gap-3 p-4 bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all"
            >
              <span className="text-2xl shrink-0">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </div>
                <div className="text-xs text-slate-400 mt-1">{tool.desc}</div>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400 text-center">
          💡 以上工具全部免费，无需注册，支持PDF下载打印。点击任意工具即可开始使用。
        </p>
      </section>

      {/* ========== 核心知识点 ========== */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          🎯 {config.name}核心知识点清单
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {config.knowledgePoints.map((kp) => {
            const slug = mapKnowledgePointToSlug(kp);
            if (slug) {
              return (
                <Link
                  key={kp}
                  href={slug}
                  className="px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-slate-200 hover:border-blue-500/50 hover:bg-slate-700/50 transition-all"
                >
                  <span className="text-blue-400 mr-2">▸</span>
                  {kp}
                </Link>
              );
            }
            return (
              <div
                key={kp}
                className="px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-slate-200"
              >
                <span className="text-blue-400 mr-2">▸</span>
                {kp}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========== 家长辅导指南（年级专属） ========== */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          👨‍👩‍👧 {config.name}家长辅导指南
        </h2>
        <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
          <div className="space-y-4">
            {config.parentGuide.map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-2xl shrink-0">{['1️⃣', '2️⃣', '3️⃣'][i]}</span>
                <div>
                  <h3 className="text-white font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 本年级常见问题（现象 / 原因 / 对策，年级专属） ========== */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          🔍 {config.name}最常见的 3 个问题及对策
        </h2>
        <div className="space-y-4">
          {config.commonProblems.map((item, i) => (
            <div key={i} className="p-5 bg-slate-800/50 border border-white/10 rounded-2xl">
              <h3 className="text-white font-semibold mb-3 flex items-start gap-2">
                <span className="text-rose-400 shrink-0">现象 {i + 1}｜</span>
                <span>{item.problem}</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-2">
                <span className="text-amber-300 font-medium">为什么：</span>
                {item.why}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                <span className="text-emerald-300 font-medium">怎么做：</span>
                {item.fix}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 相关博客 ========== */}
      {relatedBlogs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
            📝 {config.name}家长必读 · 教育文章
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedBlogs.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group block p-4 bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all"
              >
                <div className="text-xs text-slate-400 mb-2">
                  {post.category} · {post.readTime} · {post.date}
                </div>
                <div className="font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </div>
                <div className="text-sm text-slate-400 mt-2 line-clamp-2">
                  {post.description}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/blog/"
              className="inline-block text-blue-400 hover:text-blue-300 text-sm"
            >
              查看更多{config.name}学习建议 →
            </Link>
          </div>
        </section>
      )}

      {/* ========== FAQ区（GEO关键） ========== */}
      {faqs.length > 0 && (
        <section className="mb-10 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            ❓ {config.name}学习常见问题
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group p-4 bg-slate-900/50 border border-white/5 hover:border-white/10 rounded-lg transition-colors"
                open={i === 0}
              >
                <summary className="cursor-pointer text-white font-medium hover:text-blue-300 list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-2">▼</span>
                </summary>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed pl-2 border-l-2 border-blue-500/30">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-400">
            📌 更多问题？查看<a href="/blog/" className="text-blue-400 hover:text-blue-300">练学宝博客</a>获取详细学习指导。
          </p>
        </section>
      )}

      {/* ========== 其他年级导航 ========== */}
      <section className="mb-6" aria-label="其他年级">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">🔗 其他年级专区</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {GRADES.map((g) => (
            <Link
              key={g.grade}
              href={`/grade/grade-${g.grade}`}
              className={`p-3 text-center rounded-lg border transition-all text-sm ${
                g.grade === config.grade
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 font-medium'
                  : 'bg-slate-800/50 border-white/10 text-slate-300 hover:bg-slate-700/70 hover:border-blue-500/50'
              }`}
              aria-label={`${g.name}学习专区 - ${g.ageRange}`}
            >
              {g.name}
            </Link>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">
          {config.name}共 {config.knowledgePoints.length} 个核心知识点、{config.subjects.length} 个学科，上方工具全部可用。练学宝为小学 1-6 年级提供免费学习资源，无需注册、支持 PDF 打印。
        </p>
      </section>
    </SectionLayout>
  );
}