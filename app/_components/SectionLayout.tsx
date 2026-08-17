import Link from 'next/link';
import Breadcrumb, { CrumbItem } from './Breadcrumb';
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
  SITE_INFO,
} from '@/lib/seoUtils';

export interface SectionLayoutProps {
  breadcrumb: CrumbItem[];
  title: string;
  description: string;
  icon?: string;
  /** 该页面的关键词（SEO）*/
  keywords?: string[];
  /** 该页面的 JSON-LD 结构化数据（会自动合并基础 schema）*/
  jsonLd?: object[];
  /** URL 路径（用于 canonical 和结构化数据）*/
  path: string;
  /** 该页面的 E-E-A-T 信息 */
  author?: string;
  datePublished?: string;
  dateModified?: string;
  /** 摘要/导读（用于 AI 搜索引擎快速理解页面）*/
  summary?: string;
  /** 主要要点（用列表形式让 AI 抓取）*/
  keyPoints?: string[];
  children: React.ReactNode;
}

export default function SectionLayout({
  breadcrumb,
  title,
  description,
  icon,
  keywords,
  jsonLd = [],
  path,
  author = '练学宝团队',
  datePublished,
  dateModified,
  summary,
  keyPoints,
  children,
}: SectionLayoutProps) {
  const fullUrl = `${SITE_INFO.BASE_URL}${path}`;

  // 基础 schema（每个页面都有）
  const baseSchemas = [
    generateWebPageSchema({
      name: title,
      description,
      url: fullUrl,
      keywords,
      datePublished,
      dateModified,
    }),
    generateBreadcrumbSchema(
      breadcrumb.map((b) => ({
        label: b.label,
        href: b.href,
      }))
    ),
    // 组织信息（让搜索引擎知道这是哪家机构的内容）
    { '@id': `${SITE_INFO.BASE_URL}/#organization` },
  ];

  const allSchemas = [...baseSchemas, ...jsonLd];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Schema.org 结构化数据 - AI 搜索引擎核心抓取点 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': allSchemas.filter((s) => s && typeof s === 'object'),
          }),
        }}
      />

      <Breadcrumb items={breadcrumb} />

      {/* 标题区 */}
      <header className="mb-8 sm:mb-10">
        <div className="flex items-center gap-3 mb-3">
          {icon && <span className="text-3xl sm:text-4xl">{icon}</span>}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {title}
          </h1>
        </div>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {description}
        </p>
        {/* E-E-A-T 元信息（对 AI 评估内容质量有帮助） */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>👤 作者：{author}</span>
          {datePublished && <span>📅 发布：{datePublished}</span>}
          {dateModified && <span>🔄 更新：{dateModified}</span>}
          <span>🌐 语言：简体中文</span>
        </div>
      </header>

      {/* AI 友好的摘要区（隐藏在视觉中但爬虫可读） */}
      {(summary || (keyPoints && keyPoints.length > 0)) && (
        <aside
          className="mb-6 sm:mb-8 p-4 sm:p-5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl"
          aria-label="页面摘要"
        >
          {summary && (
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-3">
              <strong className="text-blue-300">📌 导读：</strong>
              {summary}
            </p>
          )}
          {keyPoints && keyPoints.length > 0 && (
            <div>
              <strong className="text-blue-300 text-sm">🎯 本页核心要点：</strong>
              <ul className="mt-2 space-y-1 text-sm text-slate-200">
                {keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 flex-shrink-0">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      )}

      {children}

      {/* 站内推荐 - 增强内链密度 */}
      <section className="mt-12 pt-8 border-t border-white/10" aria-label="站内导航">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">探索更多</h2>
        <p className="text-sm text-slate-400 mb-6">练学宝按年级、教材、知识点三大维度系统化组织学习内容</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: '年级专区', href: '/grade/grade-1', icon: '🎓', desc: '1-6年级' },
            { name: '教材同步', href: '/textbook', icon: '📚', desc: '4版本' },
            { name: '知识点专题', href: '/knowledge', icon: '💡', desc: '10专题' },
            { name: '资源库', href: '/resources', icon: '📁', desc: '20+套' },
            { name: '家长指导', href: '/parent-guide', icon: '👨‍👩‍👧', desc: '6主题' },
            { name: '每日一练', href: '/daily', icon: '📅', desc: '天天打卡' },
            { name: '博客', href: '/blog', icon: '✏️', desc: '80+篇' },
            { name: '工具首页', href: '/', icon: '🏠', desc: '10+工具' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-lg transition-all text-sm"
            >
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate group-hover:text-blue-300 transition-colors">{item.name}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
