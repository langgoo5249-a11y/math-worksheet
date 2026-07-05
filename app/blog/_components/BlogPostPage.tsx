'use client';

import Link from 'next/link';
import { articles, defaultAuthor } from '../data';
import SiteLayout from '@/app/_components/SiteLayout';

interface BlogPostPageProps {
  slug: string;
}

function parseMarkdown(markdown: string): string {
  let html = markdown;

  // Headers: ## and ###
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-8 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-8 mb-4">$1</h2>');

  // Definition terms: <dfn>term</dfn> or ==term==
  html = html.replace(/<dfn>([^<]+)<\/dfn>/g, '<dfn class="text-emerald-300 font-semibold border-b border-dashed border-emerald-500/50 cursor-help" title="$1">$1</dfn>');
  html = html.replace(/==([^=]+)==/g, '<dfn class="text-emerald-300 font-semibold border-b border-dashed border-emerald-500/50 cursor-help" title="$1">$1</dfn>');

  // Bold: **text**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');

  // Italic: *text*
  html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');

  // Code blocks: ~~~...~~~ or ```...```
  html = html.replace(/~~~([\s\S]*?)~~~/g, '<pre class="bg-slate-900 border border-white/10 rounded-xl p-4 my-4 overflow-x-auto"><code class="text-sm text-green-400">$1</code></pre>');
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-900 border border-white/10 rounded-xl p-4 my-4 overflow-x-auto"><code class="text-sm text-green-400">$1</code></pre>');

  // Inline code: `code`
  html = html.replace(/`([^`]+?)`/g, '<code class="bg-slate-700 px-1.5 py-0.5 rounded text-sm text-blue-300">$1</code>');

  // Unordered lists: - item
  html = html.replace(/^- (.+)$/gm, '<li class="text-gray-300 leading-relaxed ml-4 list-disc">$1</li>');

  // Ordered lists: 1. item
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="text-gray-300 leading-relaxed ml-4 list-decimal">$1</li>');

  // Blockquotes: > text
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-500/40 pl-4 py-2 my-4 text-gray-400 italic bg-blue-500/5 rounded-r-lg">$1</blockquote>');

  // Table rows
  html = html.replace(/^\|(.+)\|$/gm, (match) => {
    const cells = match.split('|').filter(c => c.trim());
    if (cells.every(c => /^[\s-:]+$/.test(c))) {
      return '<!-- table separator -->';
    }
    const cellHtml = cells.map(c => `<td class="border border-white/10 px-3 py-2 text-gray-300 text-sm">${c.trim()}</td>`).join('');
    return `<tr>${cellHtml}</tr>`;
  });

  // Wrap consecutive <tr> in table
  html = html.replace(/((?:<tr>[\s\S]*?<\/tr>\s*)+)/g, '<table class="w-full border-collapse my-4 rounded-xl overflow-hidden">$1</table>');

  // Paragraphs: lines that are not already wrapped in HTML tags
  const lines = html.split('\n');
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed === '' ||
      trimmed.startsWith('<h') ||
      trimmed.startsWith('<li') ||
      trimmed.startsWith('<tr') ||
      trimmed.startsWith('<table') ||
      trimmed.startsWith('</table') ||
      trimmed.startsWith('<!--') ||
      trimmed.startsWith('<pre') ||
      trimmed.startsWith('<div') ||
      trimmed.startsWith('<blockquote')
    ) {
      result.push(line);
    } else {
      result.push(`<p class="text-gray-300 leading-relaxed mb-4">${trimmed}</p>`);
    }
  }

  return result.join('\n');
}

export default function BlogPostPage({ slug }: BlogPostPageProps) {
  const article = articles.find(a => a.id === slug);

  if (!article) {
    return (
      <SiteLayout>
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl mb-4">文章未找到</p>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            返回博客列表
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const categoryColors: Record<string, string> = {
    '数学学习': 'bg-blue-500/20 text-blue-300',
    '语文学习': 'bg-emerald-500/20 text-emerald-300',
    '英语学习': 'bg-rose-500/20 text-rose-300',
    '思维训练': 'bg-orange-500/20 text-orange-300',
    '学习方法': 'bg-purple-500/20 text-purple-300',
    '升学指导': 'bg-yellow-500/20 text-yellow-300',
    '工具推荐': 'bg-teal-500/20 text-teal-300',
    '关于我们': 'bg-pink-500/20 text-pink-300',
  };

  // 相关文章推荐：同分类优先，然后是其他分类的最新文章
  const sameCategoryArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 6);
  
  const otherCategoryArticles = articles
    .filter(a => a.category !== article.category)
    .slice(0, 6 - sameCategoryArticles.length);
  
  const relatedArticles = [...sameCategoryArticles, ...otherCategoryArticles];
  
  // 最新文章（用于底部推荐）
  const latestArticles = articles
    .filter(a => a.id !== article.id)
    .slice(0, 8);

  return (
    <SiteLayout>
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center gap-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-white transition-colors">首页</a>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog/" className="hover:text-white transition-colors">知识分享</Link>
            </li>
            <li>/</li>
            <li className="text-gray-300 truncate max-w-[200px]">{article.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[article.category] || 'bg-gray-500/20 text-gray-300'}`}>
              {article.category}
            </span>
            <span className="text-gray-500 text-sm">{article.readTime}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time>{article.date}</time>
            </div>
            {/* 作者信息 */}
            <div className="flex items-center gap-3 py-2 px-4 bg-slate-800/50 rounded-lg border border-white/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {(article.author?.name || defaultAuthor.name).charAt(0)}
              </div>
              <div>
                <div className="text-white font-medium text-sm">
                  {article.author?.name || defaultAuthor.name}
                  <span className="text-gray-500 text-xs ml-1.5 font-normal">
                    {article.author?.title || defaultAuthor.title}
                  </span>
                </div>
                <div className="text-gray-500 text-xs leading-relaxed">
                  {article.author?.credentials || defaultAuthor.credentials}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* GEO优化：前置摘要 — 使用 blockquote 格式帮助AI提取关键信息 */}
        <section className="mb-8">
          <blockquote className="summary border-l-4 border-blue-500 pl-5 py-4 bg-blue-500/5 rounded-r-xl">
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-2">📋 文章摘要</p>
            <p className="text-gray-200 text-sm leading-relaxed">
              {article.summary || article.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-gray-500">
              <span className="bg-slate-800/70 px-2 py-0.5 rounded">{article.category}</span>
              <span className="bg-slate-800/70 px-2 py-0.5 rounded">{article.readTime}</span>
              <span className="bg-slate-800/70 px-2 py-0.5 rounded">作者：{article.author?.name || defaultAuthor.name}</span>
              <meta name="datePublished" content={article.date} />
              <span className="bg-slate-800/70 px-2 py-0.5 rounded">发布：{article.date}</span>
              {article.dateModified && article.dateModified !== article.date && (
                <span className="bg-slate-800/70 px-2 py-0.5 rounded">更新：{article.dateModified}</span>
              )}
            </div>
          </blockquote>
        </section>

        {/* 核心概念定义 — 帮助AI模型提取术语解释 */}
        {article.definitions && article.definitions.length > 0 && (
          <section className="mb-8 p-5 bg-emerald-500/5 border border-emerald-500/15 rounded-xl">
            <h2 className="text-sm font-semibold text-emerald-300 uppercase tracking-wide mb-3">🔑 核心概念</h2>
            <dl className="space-y-3">
              {article.definitions.map((def, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                  <dt className="text-emerald-300 font-semibold text-sm shrink-0 sm:w-28">
                    <dfn>{def.term}</dfn>
                  </dt>
                  <dd className="text-gray-300 text-sm leading-relaxed">{def.definition}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* 数据支撑 — 嵌入研究数据标注来源 */}
        {article.stats && article.stats.length > 0 && (
          <section className="mb-8 p-5 bg-amber-500/5 border border-amber-500/15 rounded-xl">
            <h2 className="text-sm font-semibold text-amber-300 uppercase tracking-wide mb-3">📊 关键数据</h2>
            <ul className="space-y-2">
              {article.stats.map((stat, idx) => (
                <li key={idx} className="text-gray-300 text-sm leading-relaxed flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5 shrink-0">▸</span>
                  <span>{stat.value}</span>
                  <cite className="text-gray-500 text-xs not-italic shrink-0">— {stat.source}</cite>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Article Content */}
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(article.content || '') }}
        />

        {/* AdSense In-Content Ad Unit */}
        <div className="my-8 p-4 bg-slate-800/20 border border-white/5 rounded-xl text-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-4710405779358793"
            data-ad-slot="1234567890"
          />
        </div>

        {/* 参考来源 */}
        {article.citations && article.citations.length > 0 && (
          <div className="mt-8 p-6 bg-slate-800/50 rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-3">📚 参考文献与数据来源</h3>
            <ul className="space-y-1.5">
              {article.citations.map((citation, idx) => (
                <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">[{idx + 1}]</span>
                  <cite className="not-italic">{citation}</cite>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 联系方式 — 增强网站可信度信号 */}
        <div className="mt-8 p-6 bg-slate-800/30 rounded-xl border border-white/5">
          <h3 className="text-lg font-bold text-white mb-2">💬 联系我们</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            如果您对本文内容有任何疑问或建议，欢迎通过以下方式联系我们：
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="text-blue-400">✉</span> jm6_lang@163.com
            </span>
            <a href="https://github.com/jm6-lang/math-worksheet" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
              <span className="text-blue-400">⌂</span> GitHub
            </a>
            <a href="/about/" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
              <span className="text-blue-400">ℹ</span> 关于练学宝
            </a>
          </div>
        </div>

        {/* 相关文章推荐 - 增强版 */}
        {relatedArticles.length > 0 && (
          <div className="mt-8 p-6 bg-slate-800/50 rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">📌 相关推荐</h3>
            <ul className="space-y-3">
              {relatedArticles.map((related) => (
                <li key={related.id}>
                  <Link
                    href={`/blog/${related.id}`}
                    className="flex items-start gap-3 group"
                  >
                    <span className="text-blue-400 mt-0.5">→</span>
                    <div>
                      <span className="text-gray-300 font-medium group-hover:text-blue-400 transition-colors">
                        {related.title}
                      </span>
                      <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${categoryColors[related.category] || 'bg-gray-500/20 text-gray-300'}`}>
                        {related.category}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Back Button & Related Articles */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-white/10 text-gray-300 hover:text-white rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回博客列表
          </Link>

          {/* Related Articles Grid - 增强版 */}
          {relatedArticles.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-bold text-white mb-4">📖 相关文章推荐</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedArticles.slice(0, 6).map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.id}`}
                    className="bg-slate-800/50 border border-white/10 rounded-xl p-4 hover:border-white/20 hover:bg-slate-700/50 transition-all group"
                  >
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${categoryColors[related.category] || 'bg-gray-500/20 text-gray-300'}`}>
                      {related.category}
                    </span>
                    <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-gray-500 text-xs mt-2">{related.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* 最新文章推荐 */}
          <div className="mt-10">
            <h3 className="text-lg font-bold text-white mb-4">🆕 最新文章</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {latestArticles.slice(0, 4).map((latest) => (
                <Link
                  key={latest.id}
                  href={`/blog/${latest.id}`}
                  className="bg-slate-800/30 border border-white/5 rounded-lg p-3 hover:border-white/10 transition-all group"
                >
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium mb-1 ${categoryColors[latest.category] || 'bg-gray-500/20 text-gray-300'}`}>
                    {latest.category}
                  </span>
                  <h4 className="text-xs font-medium text-gray-300 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {latest.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
