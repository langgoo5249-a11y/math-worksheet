import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionLayout from '@/app/_components/SectionLayout';
import RelatedTools from '@/app/_components/RelatedTools';
import ShareButtons from '@/app/_components/ShareButtons';
import { PARENT_GUIDE_TOPICS, TOPIC_COLORS, getTopicById } from '@/lib/parentGuideConfig';
import { TOOLS } from '@/lib/toolRegistry';
import {
  generateArticleSchema,
  generateOpenGraph,
  generateTwitterCard,
  SITE_INFO,
} from '@/lib/seoUtils';

export async function generateStaticParams() {
  return PARENT_GUIDE_TOPICS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = getTopicById(id);
  if (!t) return { title: '专题未找到' };
  const pageUrl = `${SITE_INFO.BASE_URL}/parent-guide/${t.id}/`;
  const title = `${t.title} - 家长指导 | 练学宝`;
  return {
    title,
    description: t.description,
    keywords: [t.title, '家长指导', '家庭教育', t.ageRange, ...t.keyPoints.slice(0, 3)],
    alternates: { canonical: pageUrl },
    openGraph: generateOpenGraph({ title, description: t.description, url: pageUrl, type: 'article' }),
    twitter: generateTwitterCard({ title, description: t.description }),
  };
}

export default async function ParentGuideDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = getTopicById(id);
  if (!t) notFound();

  const pageUrl = `${SITE_INFO.BASE_URL}/parent-guide/${t.id}/`;
  const c = TOPIC_COLORS[t.color];
  const relatedTopics = PARENT_GUIDE_TOPICS.filter(x => x.id !== t.id).slice(0, 4);

  const articleSchema = generateArticleSchema({
    title: t.title,
    description: t.description,
    url: pageUrl,
    keywords: [t.title, '家长指导', '家庭教育', t.ageRange],
  });

  const faqs = [
    {
      q: `${t.title}适用多大孩子？`,
      a: `本专题适用年龄段：${t.ageRange}。${t.relatedGrade ? `重点对应小学${t.relatedGrade}年级。` : '适合全学段参考。'}所有方法均按儿童认知发展规律设计，可根据孩子实际情况灵活调整。`,
    },
    {
      q: `${t.title}有哪些核心要点？`,
      a: `核心要点：${t.keyPoints.join('；')}。建议家长先理解核心理念，再按实战方法分步骤执行，每个方法坚持2-4周可看到效果。`,
    },
    {
      q: `如何配合练学宝工具实践${t.title}？`,
      a: `练学宝提供${t.relatedTools.length}款配套学习工具${t.relatedTools.length > 0 ? `（${t.relatedTools.map((tool) => tool.name).join('、')}）` : ''}，建议家长结合工具使用，让孩子在实际操作中巩固学习效果。`,
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
      path={`/parent-guide/${t.id}/`}
      breadcrumb={[
        { label: '首页', href: '/' },
        { label: '家长指导', href: '/parent-guide' },
        { label: t.title },
      ]}
      icon={t.icon}
      title={t.title}
      description={t.description}
      keywords={[t.title, '家长指导', '家庭教育', t.ageRange, ...t.keyPoints.slice(0, 3)]}
      jsonLd={[articleSchema, faqSchema]}
      summary={`${t.title}：${t.description} 适用年龄：${t.ageRange}。本页提供 ${t.keyPoints.length} 个核心要点、${t.practicalTips.length} 个实战方法、${t.relatedTools.length} 款配套学习工具。所有方法由练学宝教学团队综合儿童心理学、家庭教育理论整理，可直接落地执行。`}
      keyPoints={[
        `👶 适用年龄：${t.ageRange}${t.relatedGrade ? `（重点对应小学${t.relatedGrade}年级）` : ''}`,
        `🎯 ${t.keyPoints.length} 个核心要点：${t.keyPoints.slice(0, 2).join('；')}`,
        `🛠️ ${t.practicalTips.length} 个实战方法，每步可执行`,
        `📱 配套 ${t.relatedTools.length} 款学习工具推荐`,
        `💝 由练学宝教学团队综合儿童心理学理论整理`,
      ]}
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
                aria-label={tool.name}
                className="block p-3 bg-slate-800/60 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-lg text-center transition-all"
              >
                <div className="text-2xl mb-1">{tool.icon}</div>
                <div className="text-sm text-white">{tool.name}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ - 帮助 AI 引擎抓取 */}
      <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">❓ 常见问题</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="p-4 bg-slate-900/50 border border-white/5 rounded-lg">
              <summary className="text-white font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

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
                aria-label={rt.title}
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
