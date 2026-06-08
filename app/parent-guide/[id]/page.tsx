import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionLayout from '@/app/_components/SectionLayout';
import RelatedTools from '@/app/_components/RelatedTools';
import ShareButtons from '@/app/_components/ShareButtons';
import { PARENT_GUIDE_TOPICS, TOPIC_COLORS, getTopicById } from '@/lib/parentGuideConfig';
import { TOOLS } from '@/lib/toolRegistry';

export async function generateStaticParams() {
  return PARENT_GUIDE_TOPICS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = getTopicById(id);
  if (!t) return { title: '专题未找到' };
  return {
    title: `${t.title} - 家长指导 | 练学宝`,
    description: t.description,
    keywords: [t.title, '家长指导', '家庭教育', t.ageRange],
    alternates: {
      canonical: `https://www.skillxm.cn/parent-guide/${t.id}`,
    },
  };
}

export default async function ParentGuideDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = getTopicById(id);
  if (!t) notFound();

  const c = TOPIC_COLORS[t.color];
  const relatedTopics = PARENT_GUIDE_TOPICS.filter(x => x.id !== t.id).slice(0, 4);

  return (
    <SectionLayout
      breadcrumb={[
        { label: '首页', href: '/' },
        { label: '家长指导', href: '/parent-guide' },
        { label: t.title },
      ]}
      icon={t.icon}
      title={t.title}
      description={t.description}
    >
      {/* 概览卡片 */}
      <section className={`mb-8 p-6 ${c.bg} border ${c.border} rounded-2xl`}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`px-3 py-1 ${c.bg} ${c.text} text-xs rounded-full`}>
            适用年龄：{t.ageRange}
          </span>
          {t.relatedGrade && (
            <Link href={`/grade/grade-${t.relatedGrade}`} className={`px-3 py-1 ${c.bg} ${c.text} text-xs rounded-full hover:underline`}>
              相关年级：{t.relatedGrade === 1 ? '一年级' : t.relatedGrade === 2 ? '二年级' : t.relatedGrade === 3 ? '三年级' : t.relatedGrade === 4 ? '四年级' : t.relatedGrade === 5 ? '五年级' : '六年级'}
            </Link>
          )}
        </div>
        <h2 className={`text-lg font-bold ${c.text} mb-3`}>核心要点</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          {t.keyPoints.map((kp, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={`${c.text} font-bold`}>✓</span>
              <span>{kp}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 实战方法 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🎯 实战方法</h2>
        <div className="space-y-4">
          {t.practicalTips.map((tip, i) => (
            <div key={i} className="p-5 bg-slate-800/50 border border-white/10 rounded-xl">
              <h3 className={`text-lg font-bold ${c.text} mb-2`}>
                {i + 1}. {tip.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{tip.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 配套学习工具 */}
      {t.relatedTools.length > 0 && (
        <section className="mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4">🛠️ 配套学习工具</h2>
          <p className="text-sm text-slate-400 mb-4">配合以下工具使用，学习效果更佳：</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {t.relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block p-3 bg-slate-800/60 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-lg text-center transition-all"
              >
                <div className="text-2xl mb-1">{tool.icon}</div>
                <div className="text-sm text-white">{tool.name}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 相关推荐 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">📖 相关指导</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {relatedTopics.map((rt) => {
            const rc = TOPIC_COLORS[rt.color];
            return (
              <Link
                key={rt.id}
                href={`/parent-guide/${rt.id}`}
                className={`block p-4 ${rc.bg} hover:bg-opacity-80 border ${rc.border} rounded-xl transition-all`}
              >
                <div className="text-2xl mb-2">{rt.icon}</div>
                <div className={`text-sm font-bold ${rc.text} line-clamp-1`}>{rt.title}</div>
                <div className="text-xs text-slate-400 line-clamp-2 mt-1">{rt.description}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 相关工具 */}
      <RelatedTools tools={TOOLS.slice(0, 6)} currentSlug="parent-guide" />

      {/* 分享 */}
      <section className="mt-8">
        <ShareButtons
          url={`https://www.skillxm.cn/parent-guide/${t.id}`}
          title={t.title}
        />
      </section>
    </SectionLayout>
  );
}
