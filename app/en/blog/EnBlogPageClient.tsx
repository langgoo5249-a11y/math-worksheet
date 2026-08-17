'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import type { EnArticle, EnCategory } from './data';

interface EnBlogPageClientProps {
  articles: EnArticle[];
  categories: readonly string[];
}

const categoryColors: Record<string, string> = {
  'Getting Started': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Pronunciation': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Vocabulary & Characters': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'HSK & Exams': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Learning Tips': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

export default function EnBlogPageClient({ articles, categories }: EnBlogPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [shownCount, setShownCount] = useState(6);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [articles, activeCategory]);

  const visibleArticles = filteredArticles.slice(0, shownCount);
  const hasMore = shownCount < filteredArticles.length;

  return (
    <section className="relative py-16 px-4 sm:px-6 bg-[#1a0808]">
      <div className="max-w-6xl mx-auto">
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`/en/blog/category/${cat}/`}
              onClick={(e) => {
                e.preventDefault();
                setActiveCategory(cat);
                setShownCount(6);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer ${
                activeCategory === cat
                  ? 'border-[#FFD700] bg-[#D4AF37]/15 text-[#FFD700]'
                  : 'border-[#D4AF37]/20 text-[#F5F0E8]/60 hover:text-[#FFD700] hover:border-[#D4AF37]/50'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-1.5 text-xs opacity-50">
                  ({articles.filter((a) => a.category === cat).length})
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleArticles.map((article) => (
            <Link
              key={article.id}
              href={`/en/blog/${article.id}/`}
              className="group relative block rounded-2xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 hover:-translate-y-1"
              style={{
                background:
                  'linear-gradient(160deg, rgba(60,10,10,0.9) 0%, rgba(26,8,8,0.95) 100%)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              {/* Gold corner ornaments */}
              <span
                aria-hidden="true"
                className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#D4AF37]/50 rounded-tl"
              />
              <span
                aria-hidden="true"
                className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#D4AF37]/50 rounded-tr"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#D4AF37]/50 rounded-bl"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#D4AF37]/50 rounded-br"
              />

              <div className="p-7">
                {/* Category badge + date */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[article.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs text-[#F5F0E8]/40">{article.date}</span>
                </div>

                <h3 className="text-lg font-bold text-[#F5F0E8] group-hover:text-[#FFD700] transition-colors mb-3 leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm text-[#F5F0E8]/60 leading-relaxed mb-5 line-clamp-3">
                  {article.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#F5F0E8]/40 flex items-center gap-1.5">
                    <span aria-hidden="true">☕</span> {article.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#FFD700] group-hover:gap-3 transition-all">
                    Read more
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>

              {/* Hover gold sheen */}
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background:
                    'linear-gradient(120deg, transparent 40%, rgba(255,215,0,0.06) 50%, transparent 60%)',
                }}
              />
            </Link>
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShownCount((c) => c + 6)}
              className="px-7 py-3 rounded-full font-medium text-[#FFD700] border border-[#D4AF37]/50 hover:border-[#FFD700] hover:bg-[#D4AF37]/10 transition-colors"
            >
              Load More Articles
            </button>
          </div>
        )}

        {/* Empty state */}
        {visibleArticles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#F5F0E8]/50 text-lg">No articles in this category yet.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 text-[#FFD700] hover:underline text-sm"
            >
              ← Show all articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
}