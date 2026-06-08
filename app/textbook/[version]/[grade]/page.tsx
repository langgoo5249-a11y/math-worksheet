import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionLayout from '@/app/_components/SectionLayout';
import { TEXTBOOKS, getTextbook } from '@/lib/textbookConfig';
import {
  generateCourseSchema,
  generateOpenGraph,
  generateTwitterCard,
  SITE_INFO,
} from '@/lib/seoUtils';

export function generateStaticParams() {
  const params: { version: string; grade: string }[] = [];
  for (const tb of TEXTBOOKS) {
    for (const g of tb.grades) {
      params.push({ version: tb.id, grade: `grade-${g.grade}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ version: string; grade: string }> }): Promise<Metadata> {
  const { version, grade } = await params;
  const tb = getTextbook(version);
  const gradeNum = parseInt(grade.replace('grade-', ''), 10);
  if (!tb) return { title: '教材未找到' };
  const gradeInfo = tb.grades.find((g) => g.grade === gradeNum);
  if (!gradeInfo) return { title: '年级未找到' };

  const pageUrl = `${SITE_INFO.BASE_URL}/textbook/${version}/${grade}/`;
  const title = `${tb.name}${gradeNum}年级${tb.scope[0]}同步练习 - ${tb.fullName} | 练学宝`;
  const description = `${tb.fullName}小学${gradeNum}年级${tb.scope.join('、')}同步练习卷，按教材单元组织，与课堂进度完全同步，全部免费PDF下载打印。`;

  return {
    title,
    description,
    keywords: [
      `${tb.name}${gradeNum}年级`,
      `${tb.name}练习题`,
      `${tb.name}下册`,
      `${tb.name}同步练习`,
      `${tb.name}单元测试`,
      `${gradeNum}年级${tb.scope[0]}`,
    ],
    alternates: { canonical: pageUrl },
    openGraph: generateOpenGraph({ title, description, url: pageUrl, type: 'article' }),
    twitter: generateTwitterCard({ title, description }),
  };
}

export default async function TextbookGradePage({ params }: { params: Promise<{ version: string; grade: string }> }) {
  const { version, grade } = await params;
  const tb = getTextbook(version);
  const gradeNum = parseInt(grade.replace('grade-', ''), 10);
  if (!tb) notFound();
  const gradeInfo = tb.grades.find((g) => g.grade === gradeNum);
  if (!gradeInfo) notFound();

  const pageUrl = `${SITE_INFO.BASE_URL}/textbook/${version}/${grade}/`;
  const courseSchema = generateCourseSchema({
    name: `${tb.name} ${gradeNum}年级 同步练习`,
    description: `${tb.fullName}，按${gradeNum}年级教材单元组织，配套${tb.scope.join('、')}等学科同步练习。`,
    url: pageUrl,
    educationalLevel: `小学${gradeNum}年级（中国${tb.name}）`,
    teaches: [
      ...tb.scope,
      `${gradeNum}年级核心知识点`,
      '单元同步练习',
      'PDF练习卷',
    ],
  });

  const faqs = [
    {
      q: `${tb.name}${gradeNum}年级教材有哪些单元？`,
      a: `${tb.fullName}${gradeNum}年级共${gradeInfo.units.length}个单元，按教学大纲组织：${gradeInfo.units.slice(0, 6).join('、')}${gradeInfo.units.length > 6 ? '等' : ''}。每个单元均配套同步练习卷。`,
    },
    {
      q: `如何获取${tb.name}${gradeNum}年级练习题？`,
      a: `访问本页查看所有单元列表，点击配套工具（数学练习卷生成器、单元测试卷、口算速练）即可即时生成同类练习，支持PDF下载打印，无需注册完全免费。`,
    },
    {
      q: `${tb.name}与${tb.fullName}是什么关系？`,
      a: `${tb.name}是${tb.fullName}的简称，是中国小学阶段使用最广泛的主流教材版本之一。本页所有内容严格对齐${tb.name}${gradeNum}年级教材单元编排。`,
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
      path={`/textbook/${version}/${grade}/`}
      breadcrumb={[
        { label: '首页', href: '/' },
        { label: '教材专区', href: '/textbook' },
        { label: tb.name },
        { label: `${gradeNum}年级` },
      ]}
      icon="📖"
      title={`${tb.name} · ${gradeNum}年级同步练习`}
      description={`${tb.fullName}，按${gradeNum}年级教材单元组织。配套${tb.scope.join('、')}等学科。`}
      keywords={[
        `${tb.name}${gradeNum}年级`,
        `${tb.name}练习题`,
        `${tb.name}下册`,
        `${tb.name}同步练习`,
        `${tb.name}单元测试`,
      ]}
      jsonLd={[courseSchema, faqSchema]}
      summary={`${tb.name}${gradeNum}年级同步练习专题：本页按${tb.fullName}${gradeNum}年级教材单元编排，覆盖${tb.scope.join('、')}等学科，共${gradeInfo.units.length}个单元，提供配套PDF练习卷生成与下载。所有内容由练学宝教学团队按教学大纲整理，免费、即时、可打印。`}
      keyPoints={[
        `✅ 严格对齐${tb.name}${gradeNum}年级教材大纲，共${gradeInfo.units.length}个单元`,
        `✅ 配套${tb.scope.join('、')}等${tb.scope.length}个学科同步练习`,
        `✅ 数学练习卷、单元测试卷、口算速练等工具即时生成同类题`,
        `✅ 全部PDF免费下载打印，无需注册，永久免费`,
        `✅ 适合家长辅导、孩子自学、教师课堂教学使用`,
      ]}
    >
      <section className="mb-8 p-5 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/20 rounded-2xl">
        <p className="text-slate-200 leading-relaxed">{tb.description}</p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          {gradeNum}年级单元列表
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {gradeInfo.units.map((unit, idx) => (
            <div
              key={unit}
              className="flex items-center gap-3 p-4 bg-slate-800/50 border border-white/10 rounded-lg"
            >
              <span className="shrink-0 w-8 h-8 bg-blue-500/20 text-blue-300 rounded-full flex items-center justify-center text-sm font-medium">
                {idx + 1}
              </span>
              <span className="text-white">{unit}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-purple-300 mb-3">🎯 配套学习工具</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Link
            href="/tools/math-worksheet"
            aria-label="数学练习卷生成器"
            className="p-3 bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 rounded-lg text-sm text-white text-center transition-colors"
          >
            🧮 数学练习卷
          </Link>
          <Link
            href="/tools/unit-test"
            aria-label="单元测试卷生成器"
            className="p-3 bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 rounded-lg text-sm text-white text-center transition-colors"
          >
            📋 单元测试卷
          </Link>
          <Link
            href="/tools/mental-math"
            aria-label="口算速练"
            className="p-3 bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 rounded-lg text-sm text-white text-center transition-colors"
          >
            ⚡ 口算速练
          </Link>
        </div>
      </section>

      {/* 其他年级切换 */}
      <section className="mt-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">其他年级</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {tb.grades.map((g) => (
            <Link
              key={g.grade}
              href={`/textbook/${tb.id}/grade-${g.grade}`}
              aria-label={`${tb.name}${g.grade}年级同步练习`}
              className={`p-3 text-center rounded-lg border transition-all text-sm ${
                g.grade === gradeNum
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                  : 'bg-slate-800/50 border-white/10 text-slate-300 hover:bg-slate-700/70 hover:border-blue-500/50'
              }`}
            >
              {g.grade}年级
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ - 帮助 AI 引擎提取 Q&A */}
      <section className="mt-10 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">❓ 常见问题</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="p-4 bg-slate-900/50 border border-white/5 rounded-lg"
            >
              <summary className="text-white font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </SectionLayout>
  );
}
