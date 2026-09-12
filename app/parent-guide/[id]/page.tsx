import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionLayout from '@/app/_components/SectionLayout';
import RelatedTools from '@/app/_components/RelatedTools';
import ShareButtons from '@/app/_components/ShareButtons';
import { PARENT_GUIDE_TOPICS, TOPIC_COLORS, getTopicById } from '@/lib/parentGuideConfig';
import { getParentGuideContent } from '@/lib/parentGuideFaqs';
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
    alternates: {
      canonical: pageUrl,
      languages: {
        'zh-CN': pageUrl,
        'x-default': pageUrl,
      },
    },
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

  // 逐页专属 FAQ 与常见误区（lib/parentGuideFaqs.ts）
  // 变更前 6 个页面共用同一段 FAQ 模板，仅把标题代入，属于模板化重复内容
  const deep = getParentGuideContent(t.id);
  const faqs = deep?.faqs ?? [];
  const pitfalls = deep?.pitfalls ?? [];
  const signals = deep?.signals ?? [];

  const faqSchema = faqs.length > 0 ? {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

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
      jsonLd={[articleSchema, ...(faqSchema ? [faqSchema] : [])]}
      summary={`${t.title}：${t.description} 适用年龄：${t.ageRange}。本页提供 ${t.keyPoints.length} 个核心要点、${t.practicalTips.length} 个实战方法、${pitfalls.length} 条家长常见误区与对应纠正做法、${signals.length} 条效果判断指标，以及 ${faqs.length} 个家长最常问的问题。所有方法由练学宝教学团队综合儿童发展规律与家庭教育实践经验整理，可直接落地执行。`}
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

      {/* 常见误区 */}
      {pitfalls.length > 0 && (
        <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4">
            ⚠️ 家长最容易做错的 {pitfalls.length} 件事
            <span className="ml-2 text-xs text-slate-400 font-normal">很多做法看着合理，实际会起反效果</span>
          </h2>
          <div className="space-y-4">
            {pitfalls.map((p, i) => (
              <div key={i} className="p-4 bg-slate-900/50 border border-white/10 rounded-xl">
                <div className="flex gap-2 items-start mb-3">
                  <span className="shrink-0 text-rose-400 text-sm">❌</span>
                  <p className="text-white font-medium text-sm leading-relaxed">{p.wrong}</p>
                </div>
                <div className="flex gap-2 items-start mb-3 ml-6">
                  <span className="shrink-0 text-amber-400 text-xs mt-[3px]">为什么</span>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.why}</p>
                </div>
                <div className="flex gap-2 items-start ml-6">
                  <span className="shrink-0 text-emerald-400 text-xs mt-[3px]">怎么做</span>
                  <p className="text-sm text-slate-300 leading-relaxed">{p.right}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 效果判断信号 */}
      {signals.length > 0 && (
        <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4">📈 怎么判断这套方法有没有效果</h2>
          <p className="text-sm text-slate-400 mb-4">
            不要凭"孩子今天听话了"判断效果。下面几条是更稳定的观察指标，达到越多说明方法在起作用：
          </p>
          <ul className="space-y-2">
            {signals.map((s, i) => (
              <li key={i} className="flex gap-3 items-start p-3 bg-slate-900/40 rounded-lg">
                <span className="shrink-0 text-purple-400">☐</span>
                <span className="text-sm text-slate-300 leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ - 逐页专属（每页 5 条，问题与答案均不跨页复用） */}
      <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">❓ 家长最常问的 {faqs.length} 个问题</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="p-4 bg-slate-900/50 border border-white/5 rounded-lg">
              <summary className="text-white font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 内容来源与适用范围 */}
      <section className="mb-8 p-5 bg-slate-800/30 border border-white/10 rounded-2xl">
        <h2 className="text-base font-bold text-white mb-3">📑 内容来源与适用范围</h2>
        <ul className="space-y-2 text-sm text-slate-300 leading-relaxed">
          <li>• 本页内容适用年龄段为 {t.ageRange}{t.relatedGrade ? `，重点对应小学${t.relatedGrade === 1 ? '一' : t.relatedGrade === 2 ? '二' : t.relatedGrade === 3 ? '三' : t.relatedGrade === 4 ? '四' : t.relatedGrade === 5 ? '五' : '六'}年级` : ''}，共 {t.keyPoints.length} 个核心要点、{t.practicalTips.length} 个实战方法、{pitfalls.length} 条常见误区。</li>
          <li>• 内容由练学宝教学团队结合儿童发展规律与家庭教育实践经验整理，最近更新：2026-09。方法为非医疗、非诊断性的教育建议，孩子存在持续的情绪或行为困难时，请咨询学校心理老师或专业机构。</li>
          <li>• 页面中提到的时间长度、练习量均为参考区间，需按孩子实际情况调整。发现内容有误或有更好的做法，欢迎通过<Link href="/contact" className="text-blue-400 hover:text-blue-300">联系我们</Link>反馈。</li>
        </ul>
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
