import type { Metadata } from 'next';
import Link from 'next/link';
import SectionLayout from '@/app/_components/SectionLayout';
import { PARENT_GUIDE_TOPICS, TOPIC_COLORS } from '@/lib/parentGuideConfig';

export const metadata: Metadata = {
  title: '家长指导中心 - 幼小衔接、学习习惯、小升初指导 | 练学宝',
  description: '练学宝家长指导中心：覆盖幼小衔接、学习习惯培养、辅导作业、时间管理、阅读习惯、小升初择校等家长关心的核心话题，提供可落地的实战方法。',
  keywords: ['家长指导', '幼小衔接', '学习习惯', '辅导作业', '时间管理', '小升初', '亲子教育', '家庭教育'],
  alternates: {
    canonical: 'https://www.skillxm.cn/parent-guide',
  },
};

export default function ParentGuideIndex() {
  return (
    <SectionLayout
      breadcrumb={[{ label: '首页', href: '/' }, { label: '家长指导' }]}
      icon="👨‍👩‍👧"
      title="家长指导中心"
      description="6 大主题、24 个实战方法、20+ 学习工具推荐。从幼小衔接到小升初，陪孩子走好小学每一步。"
    >
      {/* 主题卡片网格 */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PARENT_GUIDE_TOPICS.map((topic) => {
          const c = TOPIC_COLORS[topic.color];
          return (
            <Link
              key={topic.id}
              href={`/parent-guide/${topic.id}`}
              className={`block p-6 ${c.bg} hover:bg-opacity-80 border ${c.border} hover:border-opacity-60 rounded-2xl transition-all`}
            >
              <div className="text-4xl mb-3">{topic.icon}</div>
              <h2 className={`text-xl font-bold ${c.text} mb-2`}>{topic.title}</h2>
              <div className="text-xs text-slate-400 mb-3">适用年龄：{topic.ageRange}</div>
              <p className="text-sm text-slate-300 line-clamp-3 mb-3">{topic.description}</p>
              <ul className="text-xs text-slate-400 space-y-1">
                {topic.keyPoints.slice(0, 2).map((kp, i) => (
                  <li key={i}>• {kp}</li>
                ))}
              </ul>
              <div className={`mt-4 text-sm ${c.text}`}>查看详情 →</div>
            </Link>
          );
        })}
      </section>

      {/* 核心理念 */}
      <section className="mt-10 p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-3">💝 我们的核心理念</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-200">
          <div>
            <div className="font-bold text-emerald-300 mb-2">习惯 &gt; 知识</div>
            <p className="text-slate-400">小学阶段最重要的是<strong>学习习惯</strong>，知识可以补，习惯难重建。</p>
          </div>
          <div>
            <div className="font-bold text-blue-300 mb-2">兴趣 &gt; 成绩</div>
            <p className="text-slate-400">保护孩子的<strong>学习兴趣</strong>比短期成绩更重要。兴趣没了，成绩也没了。</p>
          </div>
          <div>
            <div className="font-bold text-purple-300 mb-2">陪伴 &gt; 督促</div>
            <p className="text-slate-400">做孩子的<strong>陪伴者</strong>，而不是督促者。陪着学，而不是看着学。</p>
          </div>
        </div>
      </section>

      {/* 学段推荐 */}
      <section className="mt-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">🎯 按学段找指导</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Link href="/parent-guide/kindergarten-transition" className="block p-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-sm text-blue-200 transition-colors">
            <div className="font-bold mb-1">🎒 幼小衔接</div>
            <div className="text-xs text-slate-400">幼儿园 → 一年级</div>
          </Link>
          <Link href="/parent-guide/study-habits" className="block p-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-sm text-emerald-200 transition-colors">
            <div className="font-bold mb-1">⭐ 学习习惯</div>
            <div className="text-xs text-slate-400">1-6 年级通用</div>
          </Link>
          <Link href="/parent-guide/homework-coaching" className="block p-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-lg text-sm text-orange-200 transition-colors">
            <div className="font-bold mb-1">🤝 辅导作业</div>
            <div className="text-xs text-slate-400">1-6 年级通用</div>
          </Link>
          <Link href="/parent-guide/time-management" className="block p-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg text-sm text-rose-200 transition-colors">
            <div className="font-bold mb-1">⏰ 时间管理</div>
            <div className="text-xs text-slate-400">2-6 年级</div>
          </Link>
          <Link href="/parent-guide/reading-habit" className="block p-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg text-sm text-purple-200 transition-colors">
            <div className="font-bold mb-1">📚 阅读习惯</div>
            <div className="text-xs text-slate-400">3-12 岁</div>
          </Link>
          <Link href="/parent-guide/xiaoshengchu-prep" className="block p-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 rounded-lg text-sm text-yellow-200 transition-colors">
            <div className="font-bold mb-1">🎯 小升初</div>
            <div className="text-xs text-slate-400">5-6 年级</div>
          </Link>
        </div>
      </section>
    </SectionLayout>
  );
}
