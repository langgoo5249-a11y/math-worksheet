'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import type { EnArticle } from './data';

interface EnBlogPostContentProps {
  article: EnArticle;
  relatedArticles: EnArticle[];
}

function parseMarkdown(md: string): string {
  let html = md;

  // Escape HTML entities first
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Restore HTML tags we explicitly allow (links, strong, em, dfn)
  html = html.replace(/&lt;a\s+([^&]*)&gt;/g, '<a $1>');
  html = html.replace(/&lt;\/a&gt;/g, '</a>');
  html = html.replace(/&lt;strong&gt;/g, '<strong>');
  html = html.replace(/&lt;\/strong&gt;/g, '</strong>');
  html = html.replace(/&lt;em&gt;/g, '<em>');
  html = html.replace(/&lt;\/em&gt;/g, '</em>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-[#F5F0E8] mt-6 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl sm:text-2xl font-bold text-[#FFD700] mt-10 mb-4 pb-2 border-b border-[#D4AF37]/20">$1</h2>');

  // Blockquotes
  html = html.replace(
    /^&gt; (.+)$/gm,
    '<blockquote class="border-l-4 border-[#D4AF37]/50 pl-4 my-4 text-[#F5F0E8]/70 italic text-sm leading-relaxed">$1</blockquote>'
  );

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#F5F0E8] font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="text-[#F5F0E8]/80">$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded text-xs font-mono bg-[#D4AF37]/10 text-[#FFD700] border border-[#D4AF37]/20">$1</code>');

  // Definition terms: ==term==
  html = html.replace(
    /==(.+?)==/g,
    '<dfn class="not-italic font-semibold text-[#FFD700] border-b border-dashed border-[#D4AF37]/50 cursor-help" title="$1">$1</dfn>'
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-[#D4AF37]/15" />');

  // Tables
  const tableRegex = /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g;
  html = html.replace(tableRegex, (_match, header, body) => {
    const headerCells = header.split('|').map((c: string) => c.trim()).filter(Boolean);
    const headerHtml = '<tr>' + headerCells.map((c: string) =>
      `<th class="px-4 py-2 text-left text-sm font-semibold text-[#FFD700] border-b border-[#D4AF37]/20 bg-[#D4AF37]/5">${c}</th>`
    ).join('') + '</tr>';

    const bodyRows = body.trim().split('\n').filter(Boolean);
    const bodyHtml = bodyRows.map((row: string) => {
      const cells = row.split('|').map((c: string) => c.trim()).filter(Boolean);
      return '<tr class="border-b border-[#D4AF37]/10">' + cells.map((c: string) =>
        `<td class="px-4 py-2 text-sm text-[#F5F0E8]/80">${c}</td>`
      ).join('') + '</tr>';
    }).join('');

    return `<div class="overflow-x-auto my-6 rounded-xl border border-[#D4AF37]/20"><table class="w-full border-collapse"><thead>${headerHtml}</thead><tbody>${bodyHtml}</tbody></table></div>`;
  });

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="text-[#F5F0E8]/80 leading-relaxed mb-1.5">$1</li>');
  html = html.replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, '<ul class="list-disc pl-5 my-4 space-y-1.5">$1</ul>');

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="text-[#F5F0E8]/80 leading-relaxed mb-1.5">$1</li>');
  html = html.replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, (match) => {
    if (match.includes('<ul')) return match;
    return `<ol class="list-decimal pl-5 my-4 space-y-1.5">${match}</ol>`;
  });

  // Paragraphs (wrap remaining text lines)
  html = html.replace(/^(?!<[a-z/]|$)(.+)$/gm, '<p class="text-[#F5F0E8]/80 leading-relaxed mb-4 text-base">$1</p>');

  // Clean up double-wrapped paragraphs
  html = html.replace(/<p class="[^"]*">(<(?:h[23]|blockquote|table|ul|ol|hr|div)[^>]*>[\s\S]*?<\/\1>)<\/p>/g, '$1');

  return html;
}

export default function EnBlogPostContent({ article, relatedArticles }: EnBlogPostContentProps) {
  const contentHtml = useMemo(() => parseMarkdown(article.content), [article.content]);

  return (
    <div className="relative py-12 px-4 sm:px-6 bg-[#1a0808]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ===== Main content ===== */}
          <article className="flex-1 min-w-0">
            {/* Summary block */}
            {article.summary && (
              <div
                className="rounded-xl border border-[#D4AF37]/25 p-5 mb-8"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(212,175,55,0.08) 0%, rgba(26,8,8,0.95) 100%)',
                }}
              >
                <p className="text-[#F5F0E8]/85 text-sm leading-relaxed">
                  <span className="text-[#FFD700] font-semibold">Summary: </span>
                  {article.summary}
                </p>
              </div>
            )}

            {/* Article body */}
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Definitions */}
            {article.definitions && article.definitions.length > 0 && (
              <div className="mt-10 p-5 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5">
                <h3 className="text-sm font-bold text-[#FFD700] mb-3 tracking-[0.2em] uppercase">
                  Key Terms
                </h3>
                <dl className="space-y-3">
                  {article.definitions.map((d) => (
                    <div key={d.term}>
                      <dt className="text-sm font-semibold text-[#F5F0E8]">
                        {d.term}
                      </dt>
                      <dd className="text-xs text-[#F5F0E8]/60 mt-1 leading-relaxed">
                        {d.definition}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Stats */}
            {article.stats && article.stats.length > 0 && (
              <div className="mt-8 p-5 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5">
                <h3 className="text-sm font-bold text-[#FFD700] mb-3 tracking-[0.2em] uppercase">
                  Data & Sources
                </h3>
                <ul className="space-y-2.5">
                  {article.stats.map((s, i) => (
                    <li key={i} className="text-xs text-[#F5F0E8]/70 leading-relaxed">
                      <span className="text-[#FFD700] font-semibold">{s.value}</span>
                      {' — '}{s.source}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Citations */}
            {article.citations && article.citations.length > 0 && (
              <div className="mt-8 p-5 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5">
                <h3 className="text-sm font-bold text-[#FFD700] mb-3 tracking-[0.2em] uppercase">
                  References
                </h3>
                <ol className="space-y-1.5 list-decimal pl-5">
                  {article.citations.map((c, i) => (
                    <li key={i} className="text-xs text-[#F5F0E8]/60 leading-relaxed">
                      {c}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Author bio */}
            {article.author && (
              <div className="mt-10 p-5 rounded-xl border border-[#D4AF37]/20" style={{ background: 'rgba(60,10,10,0.5)' }}>
                <div className="flex items-start gap-4">
                  <span
                    className="w-12 h-12 flex items-center justify-center text-lg font-bold text-[#F5F0E8] rounded shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 100%)',
                      border: '1px solid #D4AF37',
                    }}
                    aria-hidden="true"
                  >
                    {article.author.avatar}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#F5F0E8]">
                      {article.author.name}
                    </p>
                    <p className="text-xs text-[#D4AF37] mb-1">{article.author.title}</p>
                    <p className="text-xs text-[#F5F0E8]/60 leading-relaxed">
                      {article.author.bio}
                    </p>
                    {article.author.credentials && (
                      <p className="text-xs text-[#F5F0E8]/50 leading-relaxed mt-1 italic">
                        {article.author.credentials}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Editorial declaration — E-E-A-T signals */}
            <div className="mt-6 p-5 rounded-xl border border-[#D4AF37]/20" style={{ background: 'rgba(60,10,10,0.4)' }}>
              <h3 className="text-sm font-bold text-[#FFD700] mb-3 tracking-[0.2em] uppercase">
                Editorial Review
              </h3>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#F5F0E8]/60">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">&#10003;</span>
                  <span>Content reviewed by Chen Laoshi (certified instructor)</span>
                </div>
                {article.dateReviewed && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#D4AF37]">&#10003;</span>
                    <span>Reviewed: {article.dateReviewed}</span>
                  </div>
                )}
                {article.hasExclusiveContent && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#FFD700]">&#9670;</span>
                    <span>Contains exclusive content</span>
                  </div>
                )}
                {article.exclusiveContentTypes && article.exclusiveContentTypes.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#FFD700]">&#9670;</span>
                    <span>{article.exclusiveContentTypes.join(' / ')}</span>
                  </div>
                )}
                {article.dateModified && article.dateModified !== article.date && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#D4AF37]">&#8635;</span>
                    <span>Last updated: {article.dateModified}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <span className="text-[#FFD700]">&#9873;</span>
                  <span>SkillXM Editorial Team</span>
                </div>
                <Link
                  href="/editorial-policy/"
                  className="flex items-center gap-1.5 hover:text-[#FFD700] transition-colors ml-auto"
                >
                  <span className="text-[#D4AF37]">&#128203;</span>
                  <span>Editorial Policy</span>
                </Link>
              </div>
            </div>
          </article>

          {/* ===== Sidebar ===== */}
          {relatedArticles.length > 0 && (
            <aside className="lg:w-72 shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div
                  className="rounded-xl border border-[#D4AF37]/20 p-5"
                  style={{
                    background:
                      'linear-gradient(160deg, rgba(60,10,10,0.85) 0%, rgba(26,8,8,0.95) 100%)',
                  }}
                >
                  <h3 className="text-sm font-bold text-[#FFD700] mb-4 tracking-[0.2em] uppercase">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map((ra) => (
                      <Link
                        key={ra.id}
                        href={`/en/blog/${ra.id}/`}
                        className="block group"
                      >
                        <h4 className="text-sm font-medium text-[#F5F0E8] group-hover:text-[#FFD700] transition-colors leading-snug mb-1">
                          {ra.title}
                        </h4>
                        <p className="text-xs text-[#F5F0E8]/40">
                          {ra.date} · {ra.readTime}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-xl border border-[#D4AF37]/20 p-5"
                  style={{
                    background:
                      'linear-gradient(160deg, rgba(60,10,10,0.85) 0%, rgba(26,8,8,0.95) 100%)',
                  }}
                >
                  <h3 className="text-sm font-bold text-[#FFD700] mb-4 tracking-[0.2em] uppercase">
                    Free Tools
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Pinyin Chart', href: '/en/tools/pinyin-chart/' },
                      { label: 'Tone Trainer', href: '/en/tools/tone-trainer/' },
                      { label: 'HSK Flashcards', href: '/en/tools/hsk-flashcards/' },
                      { label: 'Picture Learning', href: '/en/tools/picture-learning/' },
                      { label: 'Stroke Order', href: '/en/tools/stroke-order/' },
                      { label: 'Radical Explorer', href: '/en/tools/radical-explorer/' },
                    ].map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        className="block text-xs text-[#F5F0E8]/60 hover:text-[#FFD700] transition-colors py-1 border-b border-[#D4AF37]/10 last:border-b-0"
                      >
                        {t.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}