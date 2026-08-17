/**
 * ToolContent - 工具页面教育内容服务端渲染组件
 * 
 * 此组件必须是 Server Component（不使用 'use client'）
 * 确保搜索引擎爬虫在初始 HTML 中看到完整的教育内容。
 */

import { toolPageContents } from '@/lib/toolContentData';
import { relatedToolsMap } from '@/lib/relatedTools';
import { TOOLS } from '@/lib/toolRegistry';
import Link from 'next/link';

interface ToolContentProps {
  toolId: string;
}

export default function ToolContent({ toolId }: ToolContentProps) {
  const content = toolPageContents[toolId];
  if (!content) return null;

  const related = relatedToolsMap[toolId] || [];
  const tool = TOOLS.find((t) => t.path === `/tools/${toolId}`);
  const grades = tool?.grades || [];
  // 生成 lastModified 日期 — 帮助 Passage Ranking 和 Freshness 信号
  // 在 force-static 构建模式下，此日期随每次部署自动更新
  const now = new Date();
  const lastModified = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const lastModifiedISO = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T00:00:00+08:00`;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12 space-y-6">
      {/* 工具简介 */}
      <section id="tool-intro" className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-bold text-white mb-3">📖 工具介绍</h2>
        <p className="text-gray-400 leading-relaxed text-sm md:text-base">{content.intro}</p>
      </section>

      {/* 正文描述 */}
      <section id="tool-description" className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-bold text-white mb-4">📝 详细说明</h2>
        <div className="text-gray-400 leading-relaxed space-y-4 text-sm md:text-base">
          {content.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* 核心功能 */}
      <section id="tool-features" className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-bold text-white mb-4">⭐ 核心功能</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {content.features.map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{f.icon}</span>
                <h3 className="font-bold text-gray-200 text-sm">{f.title}</h3>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">{f.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 分年级建议 */}
      <section id="tool-grade-advice" className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-bold text-white mb-4">🎓 分年级使用建议</h2>
        <div className="space-y-3">
          {content.gradeAdvice.map((g, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">{g.grade}</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{g.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 教育技巧 */}
      <section id="tool-education-tips" className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-bold text-white mb-4">💡 教育使用技巧</h2>
        <div className="space-y-3">
          {content.educationTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/10 rounded-xl px-4 py-3">
              <span className="text-amber-400 mt-0.5 shrink-0">▸</span>
              <span className="text-gray-300 text-xs md:text-sm leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 常见问题 FAQ */}
      <section id="tool-faq" className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-bold text-white mb-4">❓ 常见问题</h2>
        <div className="space-y-2">
          {content.faqs.map((faq, i) => {
            const faqId = `faq-${i + 1}`;
            return (
              <div key={i} id={faqId} className="border border-white/10 rounded-xl p-4">
                <h3 className="text-gray-200 font-medium text-sm mb-1">Q: {faq.q}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">A: {faq.a}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* E-E-A-T 信任栏 */}
      <section id="tool-eeat" className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">🛡️ 内容质量保证</h2>
          <span className="text-gray-500 text-xs">最后更新：{lastModified}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">陈</span>
              <span className="font-medium text-gray-200 text-sm">陈老师</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              公立小学一线教师，负责审核所有教学内容的准确性和年级适配性，确保与教育部课程标准一致。
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold">林</span>
              <span className="font-medium text-gray-200 text-sm">林远 · 开发者</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              十余年全栈开发经验，两个孩子的父亲。所有工具从真实家庭教育场景出发设计开发。
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📚</span>
              <span className="font-medium text-gray-200 text-sm">权威参考</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              内容参考教育部《义务教育课程标准（2022年版）》、北师大认知神经科学实验室及中科院心理所研究成果。
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/about" className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
              了解更多关于练学宝团队 →
            </Link>
            <Link href="/blog/" className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors">
              📖 查看学习方法文章 →
            </Link>
            <Link href="/tools/" className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
              🔧 浏览全部学习工具 →
            </Link>
            <Link href="/privacy/" className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-400 transition-colors">
              隐私政策
            </Link>
          </div>
        </div>
      </section>

      {/* 年级专题内链 — 强化年级页权重 */}
      {grades.length > 0 && (
        <section id="tool-grade-links" className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-white mb-4">🎒 按年级查看相关学习内容</h2>
          <div className="flex flex-wrap gap-3">
            {grades.map((g) => (
              <Link
                key={g}
                href={`/grade/grade-${g}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/25 rounded-lg text-sm text-purple-300 hover:text-purple-200 transition-colors"
              >
                {g} 年级学习资源 →
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 相关工具推荐 — Topic Mesh 内链 */}
      {related.length > 0 && (
        <section id="tool-related" className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-white mb-4">🔗 相关工具推荐</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map((r, i) => (
              <Link
                key={i}
                href={r.path}
                className="flex items-start gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-xl p-4 transition-all group"
              >
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-lg shrink-0">
                  🔧
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-200 text-sm group-hover:text-blue-300 transition-colors">{r.toolName}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mt-1">{r.reason}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 回到首页 */}
      <div className="text-center pt-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
          ← 返回练学宝首页，发现更多免费学习工具
        </Link>
      </div>
    </div>
  );
}

