import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionLayout from '@/app/_components/SectionLayout';
import { TEXTBOOKS, getTextbook } from '@/lib/textbookConfig';

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

  return {
    title: `${tb.name}${gradeNum}年级${tb.scope[0]}同步练习 - ${tb.fullName} | 练学宝`,
    description: `${tb.fullName}小学${gradeNum}年级${tb.scope.join('、')}同步练习卷，按教材单元组织，与课堂进度完全同步，全部免费PDF下载打印。`,
    keywords: [`${tb.name}${gradeNum}年级`, `${tb.name}练习题`, `${tb.name}下册`, `${tb.name}同步练习`, `${tb.name}单元测试`],
    alternates: {
      canonical: `https://www.skillxm.cn/textbook/${version}/${grade}/`,
    },
  };
}

export default async function TextbookGradePage({ params }: { params: Promise<{ version: string; grade: string }> }) {
  const { version, grade } = await params;
  const tb = getTextbook(version);
  const gradeNum = parseInt(grade.replace('grade-', ''), 10);
  if (!tb) notFound();
  const gradeInfo = tb.grades.find((g) => g.grade === gradeNum);
  if (!gradeInfo) notFound();

  return (
    <SectionLayout
      breadcrumb={[
        { label: '首页', href: '/' },
        { label: '教材专区', href: '/textbook' },
        { label: tb.name },
        { label: `${gradeNum}年级` },
      ]}
      icon="📖"
      title={`${tb.name} · ${gradeNum}年级同步练习`}
      description={`${tb.fullName}，按${gradeNum}年级教材单元组织。配套${tb.scope.join('、')}等学科。`}
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
            className="p-3 bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 rounded-lg text-sm text-white text-center transition-colors"
          >
            🧮 数学练习卷
          </Link>
          <Link
            href="/tools/unit-test"
            className="p-3 bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 rounded-lg text-sm text-white text-center transition-colors"
          >
            📋 单元测试卷
          </Link>
          <Link
            href="/tools/mental-math"
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
    </SectionLayout>
  );
}
