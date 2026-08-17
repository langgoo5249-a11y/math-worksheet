import type { Metadata } from 'next';
import SectionLayout from '@/app/_components/SectionLayout';
import { CHANGELOG } from '@/lib/changelogData';
import {
  generateOpenGraph,
  generateTwitterCard,
  SITE_INFO,
} from '@/lib/seoUtils';

const PAGE_URL = `${SITE_INFO.BASE_URL}/changelog/`;

export const metadata: Metadata = {
  title: '更新日志 - 练学宝功能更新与新工具发布记录 | 练学宝',
  description: '练学宝更新日志：记录所有新工具上线、功能优化、Bug修复、新增资源。见证练学宝与孩子们一起成长。',
  keywords: ['更新日志', '练学宝更新', '新功能', 'changelog', '版本更新', '功能上线'],
  alternates: { canonical: PAGE_URL },
  openGraph: generateOpenGraph({
    title: '更新日志 - 练学宝功能更新与新工具发布记录 | 练学宝',
    description: '记录所有新工具上线、功能优化、Bug修复、新增资源。',
    url: PAGE_URL,
  }),
  twitter: generateTwitterCard({
    title: '更新日志 - 练学宝功能更新记录 | 练学宝',
    description: '记录所有新工具上线、功能优化、Bug修复、新增资源。',
  }),
};

const TYPE_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  major: { label: '重大更新', color: 'blue', icon: '🎉' },
  feature: { label: '新功能', color: 'emerald', icon: '✨' },
  improvement: { label: '体验优化', color: 'purple', icon: '⚡' },
  fix: { label: '问题修复', color: 'orange', icon: '🐛' },
};

const COLOR_CLASSES: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/30' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-300', border: 'border-purple-500/30' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-300', border: 'border-orange-500/30' },
};

// 构造 Article schema - 把每个版本作为一篇文章
const articleSchemas = CHANGELOG.map((entry) => ({
  '@type': 'Article',
  headline: `${entry.version} - ${entry.title}`,
  description: entry.highlights.join('；'),
  url: `${SITE_INFO.BASE_URL}/changelog/#${entry.version}`,
  datePublished: entry.date,
  dateModified: entry.date,
  inLanguage: 'zh-CN',
  author: { '@type': 'Organization', name: '练学宝团队', url: SITE_INFO.BASE_URL },
  publisher: { '@type': 'Organization', name: '练学宝', logo: { '@type': 'ImageObject', url: SITE_INFO.SITE_LOGO } },
  isPartOf: { '@id': `${SITE_INFO.BASE_URL}/#website` },
}));

const faqs = [
  {
    q: '练学宝的更新频率是多久？',
    a: '练学宝保持每1-2周发布一次更新。更新内容涵盖：新工具上线、新功能发布、体验优化、问题修复等。所有更新均通过本更新日志对外公开。',
  },
  {
    q: '如何第一时间获取练学宝更新？',
    a: '推荐两种方式：①订阅 /rss.xml RSS订阅，新内容第一时间推送；②收藏 /changelog 本页，每1-2周回来看一次更新记录。',
  },
  {
    q: '我可以反馈问题或建议吗？',
    a: '非常欢迎！请通过 /contact 联系我们，或发送邮件至 lang@example.com。每条反馈都会被认真阅读，优秀建议会进入下一个版本的更新计划。',
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

export default function ChangelogPage() {
  return (
    <SectionLayout
      path="/changelog/"
      breadcrumb={[{ label: '首页', href: '/' }, { label: '更新日志' }]}
      icon="📝"
      title="更新日志"
      description="记录练学宝每一次成长。新工具上线、功能优化、Bug修复，一目了然。"
      keywords={['更新日志', '练学宝更新', '新功能', 'changelog', '版本更新']}
      jsonLd={[...articleSchemas, faqSchema]}
      summary={`练学宝更新日志 - 记录 ${CHANGELOG.length} 次版本发布。见证练学宝与孩子们一起成长。所有更新涵盖：新工具上线、新功能发布、体验优化、问题修复四大类。每1-2周发布一次更新，由练学宝教学与产品团队协作完成。`}
      keyPoints={[
        `📝 共 ${CHANGELOG.length} 次版本发布记录`,
        '🔄 每1-2周发布一次更新，持续迭代',
        '📅 涵盖：新工具上线、新功能发布、体验优化、Bug修复',
        '🔔 推荐订阅 /rss.xml 第一时间获取更新',
        '💌 反馈建议：lang@example.com',
      ]}
    >
      <section className="relative">
        {/* 时间线主轴 */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-transparent" />

        <div className="space-y-8">
          {CHANGELOG.map((entry, idx) => {
            const type = TYPE_CONFIG[entry.type];
            const colors = COLOR_CLASSES[type.color];
            const isLeft = idx % 2 === 0;
            return (
              <article
                key={entry.version}
                id={entry.version}
                className={`relative flex flex-col sm:flex-row ${isLeft ? '' : 'sm:flex-row-reverse'} gap-4 sm:gap-8`}
              >
                {/* 时间线节点 */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-slate-900 z-10" />

                {/* 占位 */}
                <div className="hidden sm:block sm:w-1/2" />

                {/* 卡片 */}
                <div className="ml-12 sm:ml-0 sm:w-1/2">
                  <div className={`p-5 ${colors.bg} border ${colors.border} rounded-2xl`}>
                    {/* 头部 */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} text-xs rounded font-mono`}>
                        {entry.version}
                      </span>
                      <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} text-xs rounded`}>
                        {type.icon} {type.label}
                      </span>
                      <time className="text-xs text-slate-400 ml-auto" dateTime={entry.date}>{entry.date}</time>
                    </div>
                    {/* 标题 */}
                    <h2 className={`text-lg sm:text-xl font-bold ${colors.text} mb-3`}>{entry.title}</h2>
                    {/* 高亮 */}
                    <ul className="space-y-1.5 text-sm text-slate-200">
                      {entry.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className={`${colors.text} flex-shrink-0`}>•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    {/* 详情 */}
                    {entry.details && (
                      <div className="mt-4 space-y-3 pt-3 border-t border-white/10">
                        {entry.details.map((d, i) => (
                          <div key={i}>
                            <div className={`text-sm font-bold ${colors.text} mb-1`}>{d.category}</div>
                            <ul className="space-y-0.5 text-xs text-slate-300">
                              {d.items.map((it, j) => (
                                <li key={j} className="flex items-start gap-1.5">
                                  <span className="text-slate-500">-</span>
                                  <span>{it}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 订阅提示 */}
      <section className="mt-12 p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-2">🔔 第一时间获取更新</h2>
        <p className="text-sm text-slate-300 mb-3">
          订阅 <a href="/rss.xml" className="text-blue-400 hover:underline">RSS 订阅</a>，新文章、新工具、新资源第一时间推送。
        </p>
        <p className="text-xs text-slate-400">
          练学宝持续迭代中，每1-2周发布一次更新。如有问题或建议，欢迎 <a href="/contact/" className="text-blue-400 hover:underline">联系我们</a>。
        </p>
      </section>

      {/* FAQ - 帮助 AI 引擎抓取 */}
      <section className="mt-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
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
    </SectionLayout>
  );
}
