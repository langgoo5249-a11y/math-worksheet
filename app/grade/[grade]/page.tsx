import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionLayout from '@/app/_components/SectionLayout';
import { GRADES, getGradeConfig } from '@/lib/gradeConfig';
import { KNOWLEDGE_POINTS } from '@/lib/knowledgeConfig';
import { articles as blogPosts } from '@/app/blog/data';
import { generateCourseSchema, generateOrganizationSchema } from '@/lib/seoUtils';

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

// 根据年级生成 FAQ 数据
function generateGradeFaqs(config: ReturnType<typeof getGradeConfig>) {
  if (!config) return [];
  const grade = config.grade;
  const subjectNames = config.subjects.map(s => s.name).join('、');
  const mathItems = config.subjects.find(s => s.name === '数学')?.items.slice(0, 4).join('、') ?? '';
  const chineseItems = config.subjects.find(s => s.name === '语文')?.items.slice(0, 4).join('、') ?? '';

  const faqs = [
    {
      q: `${config.name}数学主要学什么？`,
      a: `${config.name}数学主要学习${mathItems}等内容。${config.description.split('。')[0]}。建议使用口算速练和数学练习卷生成器每天进行10-15分钟练习。`,
    },
    {
      q: `${config.name}语文重点掌握哪些内容？`,
      a: `${config.name}语文重点掌握${chineseItems}等内容。建议配合字帖生成器练习书写，使用古诗词默写工具巩固古诗。`,
    },
    {
      q: `${config.name}每天应该练习多长时间？`,
      a: `建议${config.name}学生每天练习${grade <= 2 ? '20-30分钟' : grade <= 4 ? '30-45分钟' : '45-60分钟'}。其中数学练习${grade <= 2 ? '10分钟' : '15-20分钟'}，语文练习${grade <= 2 ? '10分钟' : '15分钟'}，英语${grade >= 3 ? '10-15分钟' : ''}。所有练习卷均可在练学宝免费下载打印。`,
    },
    {
      q: `${config.name}口算速度应该达到什么标准？`,
      a: `${grade === 1 ? '一年级口算达标标准为每分钟8-10题（10以内加减法）' : grade === 2 ? '二年级口算达标标准为每分钟10-15题（100以内加减法和表内乘除法）' : grade <= 4 ? `${config.name}口算达标标准为每分钟12-18题（${grade === 3 ? '万以内加减法' : '三位数乘除法'}）` : `${config.name}口算达标标准为每分钟15-20题（${grade === 5 ? '小数乘除法' : '百分数和比例'}）`}。使用口算速练工具可计时训练并自动统计正确率。`,
    },
    {
      q: `${config.name}需要报课外辅导班吗？`,
      a: `${grade <= 2 ? '一二年级通常不需要报辅导班，重点放在培养学习习惯和基础计算能力上。每天坚持使用练学宝的免费工具练习即可。' : grade <= 4 ? '三四年级如果某科有明显薄弱环节，可考虑针对性补习，但日常练习仍以练学宝为主，辅以单元测试卷检测学习效果。' : '五六年级面临小升初压力，建议根据孩子实际情况选择。练学宝提供全套免费小升初复习资源，包括模拟试卷、知识点汇总等。'}`,
    },
    {
      q: `练学宝的${config.name}练习题是免费的吗？`,
      a: `完全免费。练学宝所有${config.name}练习卷、口算题、字帖、试卷等资源均可免费下载PDF打印，无需注册登录，不限制使用次数。`,
    },
  ];

  // 英语相关（3年级以上）
  if (grade >= 3) {
    const engItems = config.subjects.find(s => s.name === '英语')?.items.slice(0, 4).join('、') ?? '';
    faqs.splice(2, 0, {
      q: `${config.name}英语从零开始怎么学？`,
      a: `${config.name}英语重点学习${engItems}。建议每天听读15分钟，使用英语字帖练习单词书写，配合识字卡片记忆核心单词。${grade === 3 ? '三年级是英语启蒙关键期，重点是培养兴趣和语感。' : `${config.name}英语要开始注重${grade >= 5 ? '语法和写作' : '阅读和句型'}训练。`}`,
    });
  }

  return faqs;
}

// 生成学期学习计划
function generateSemesterPlan(config: ReturnType<typeof getGradeConfig>) {
  if (!config) return null;
  const grade = config.grade;

  return {
    firstSemester: {
      title: `${config.name}上学期学习重点`,
      tips: grade <= 2
        ? ['开学前两周适应课堂节奏，建立每天课后练习的习惯', '期中前完成基础计算能力达标', '期末前一个月开始系统复习']
        : grade <= 4
        ? ['开学第一个月复习巩固上学期薄弱知识点', '期中检测薄弱科目，针对性补强', '期末前两周完成全部单元复习']
        : ['开学即进入状态，制定小升初备考计划', '每月进行一次模拟测试，追踪进步', '期末前系统梳理全学段知识点'],
    },
    secondSemester: {
      title: `${config.name}下学期学习重点`,
      tips: grade <= 2
        ? ['寒假保持每天15分钟口算练习，避免开学退步', '下学期开始逐步增加练习量和难度', '暑假做好升年级准备，预习下一级内容']
        : grade <= 4
        ? ['寒假完成上学期错题回顾', '下学期重点攻克新知识点（如乘法口诀/分数/面积）', '暑假利用练学宝预习工具提前了解下一级内容']
        : ['寒假集中复习小升初重点', '下学期全力冲刺，每周至少2次模拟测试', '暑假做好小升初衔接准备'],
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

  const relatedBlogs = blogPosts
    .filter((p) => config.blogCategories.some((c) => p.category === c))
    .slice(0, 6);

  const faqs = generateGradeFaqs(config);
  const semesterPlan = generateSemesterPlan(config);

  const faqSchema = faqs.length > 0 ? {
    '@type': 'FAQPage' as const,
    'mainEntity': faqs.map((f) => ({
      '@type': 'Question' as const,
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer' as const, 'text': f.a },
    })),
  } : null;

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
                🍂 {semesterPlan.firstSemester.title}
              </h3>
              <ul className="space-y-2">
                {semesterPlan.firstSemester.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-orange-400 shrink-0 mt-0.5">{i + 1}.</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-2xl">
              <h3 className="text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
                🌱 {semesterPlan.secondSemester.title}
              </h3>
              <ul className="space-y-2">
                {semesterPlan.secondSemester.tips.map((tip, i) => (
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

      {/* ========== 家长辅导指南 ========== */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          👨‍👩‍👧 {config.name}家长辅导指南
        </h2>
        <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
          <div className="space-y-4">
            {gradeNum <= 2 && (
              <>
                <div className="flex gap-3">
                  <span className="text-2xl shrink-0">1️⃣</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">培养每天固定练习时间</h3>
                    <p className="text-sm text-slate-300">低年级重在养成习惯。建议每天固定一个时间段（如晚饭后），坚持15-20分钟。使用口算速练和字帖生成器，让练习变得有趣。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl shrink-0">2️⃣</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">多鼓励少批评</h3>
                    <p className="text-sm text-slate-300">一二年级孩子自信心脆弱，多鼓励"做对了"而不是批评"做错了"。使用练学宝的计时模式做游戏化练习，孩子在不知不觉中提升计算速度。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl shrink-0">3️⃣</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">拼音和识字是重中之重</h3>
                    <p className="text-sm text-slate-300">拼音熟练度直接影响后期阅读速度。每天用拼音注音工具做5分钟拼读练习，用识字卡片巩固300个常用字。</p>
                  </div>
                </div>
              </>
            )}
            {gradeNum >= 3 && gradeNum <= 4 && (
              <>
                <div className="flex gap-3">
                  <span className="text-2xl shrink-0">1️⃣</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">关注"三年级滑坡"现象</h3>
                    <p className="text-sm text-slate-300">三年级数学难度陡增（万以内加减法、多位数乘除法），很多孩子出现成绩下滑。关键在于每天坚持练习，使用单元测试卷定期检测薄弱环节。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl shrink-0">2️⃣</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">英语学习从兴趣开始</h3>
                    <p className="text-sm text-slate-300">三年级开始学英语，重点是培养兴趣和语感。每天听读15分钟，使用英语字帖练习单词书写，不必急于求成。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl shrink-0">3️⃣</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">作文从300字起步</h3>
                    <p className="text-sm text-slate-300">三年级作文要求从"写话"过渡到"写文"。使用作文模板工具，先搭框架再填充内容，逐步提升写作能力。</p>
                  </div>
                </div>
              </>
            )}
            {gradeNum >= 5 && (
              <>
                <div className="flex gap-3">
                  <span className="text-2xl shrink-0">1️⃣</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">制定小升初备考计划</h3>
                    <p className="text-sm text-slate-300">{gradeNum === 5 ? '五年级是小升初准备的起点，现在开始系统梳理知识点，到六年级就不会手忙脚乱。' : '六年级是冲刺阶段，每月至少做2次模拟测试，查漏补缺。'}使用单元测试卷工具定期检测，追踪进步。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl shrink-0">2️⃣</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">数学攻克应用题难关</h3>
                    <p className="text-sm text-slate-300">{gradeNum === 5 ? '五年级应用题从两步变为三步，对阅读理解能力要求高。' : '六年级的百分数应用题、比例应用题是小升初必考。'}每日用数学练习卷生成器做5道应用题专项训练。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl shrink-0">3️⃣</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">英语打好小升初基础</h3>
                    <p className="text-sm text-slate-300">小升初英语要求掌握{gradeNum === 5 ? '1500+' : '1800+'}个单词和所有基本时态。使用英语字帖每天练习10个单词，配合口算速练工具保持数学手感。</p>
                  </div>
                </div>
              </>
            )}
          </div>
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
          练学宝为小学1-6年级提供全套免费学习资源，包括数学练习卷、口算速练、字帖生成、拼音学习、英语字帖等工具。
        </p>
      </section>
    </SectionLayout>
  );
}