import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SectionLayout from '@/app/_components/SectionLayout';
import { KNOWLEDGE_POINTS, getKnowledgePoint } from '@/lib/knowledgeConfig';

export function generateStaticParams() {
  return KNOWLEDGE_POINTS.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const kp = getKnowledgePoint(slug);
  if (!kp) return { title: '知识点未找到' };
  return {
    title: kp.metaTitle,
    description: kp.metaDescription,
    keywords: kp.metaKeywords,
    alternates: {
      canonical: `https://www.skillxm.cn/knowledge/${slug}/`,
    },
  };
}

export default async function KnowledgePointPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kp = getKnowledgePoint(slug);
  if (!kp) notFound();

  return (
    <SectionLayout
      breadcrumb={[
        { label: '首页', href: '/' },
        { label: '知识点', href: '/knowledge' },
        { label: kp.name },
      ]}
      icon={kp.icon}
      title={kp.name}
      description={kp.shortDesc}
    >
      {/* 概览卡片 */}
      <section className={`mb-10 p-6 bg-gradient-to-br ${
        kp.subject === 'math' ? 'from-blue-900/30 to-indigo-900/30 border-blue-500/20' :
        kp.subject === 'chinese' ? 'from-red-900/30 to-pink-900/30 border-red-500/20' :
        'from-green-900/30 to-emerald-900/30 border-green-500/20'
      } border rounded-2xl`}>
        <p className="text-slate-200 leading-relaxed text-base sm:text-lg">{kp.description}</p>
        <div className="flex flex-wrap gap-3 mt-4 text-sm">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
            学科：{kp.subjectName}
          </span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
            难度：{kp.difficulty === 'easy' ? '基础' : kp.difficulty === 'medium' ? '进阶' : '拔高'}
          </span>
          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full">
            年级：{kp.grades.map((g) => `${g}年级`).join('、')}
          </span>
        </div>
      </section>

      {/* 学习目标 */}
      <section className="mb-10 p-6 bg-slate-800/50 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
          <span>🎯</span>学习目标
        </h2>
        <p className="text-slate-200 leading-relaxed">{kp.learningGoal}</p>
      </section>

      {/* 学习步骤 */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>📝</span>核心步骤
        </h2>
        <ol className="space-y-3">
          {kp.keySteps.map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-4 bg-slate-800/50 border border-white/10 rounded-xl"
            >
              <span className="shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
                {i + 1}
              </span>
              <span className="text-slate-200 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 常见错误 */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>⚠️</span>常见错误
        </h2>
        <ul className="space-y-2">
          {kp.commonMistakes.map((m, i) => (
            <li
              key={i}
              className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
            >
              <span className="text-red-400 mt-0.5">✗</span>
              <span className="text-slate-200 text-sm">{m}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 练习建议 */}
      <section className="mb-10 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-emerald-300 mb-3 flex items-center gap-2">
          <span>💡</span>练习建议
        </h2>
        <p className="text-slate-200 leading-relaxed">{kp.practiceAdvice}</p>
      </section>

      {/* 配套工具 */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🛠️</span>配套练习工具
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kp.relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-center gap-3 p-4 bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all"
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
      </section>

      {/* 相关知识点 */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">相关知识点</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {KNOWLEDGE_POINTS
            .filter((k) => k.id !== kp.id && k.subject === kp.subject)
            .slice(0, 6)
            .map((k) => (
              <Link
                key={k.id}
                href={`/knowledge/${k.slug}`}
                className="block p-3 bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 rounded-lg transition-all"
              >
                <div className="flex items-center gap-2">
                  <span>{k.icon}</span>
                  <span className="text-white text-sm">{k.name}</span>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </SectionLayout>
  );
}
