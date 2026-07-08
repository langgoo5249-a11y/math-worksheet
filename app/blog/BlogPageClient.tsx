'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

interface Tool {
  path: string;
  name: string;
  desc: string;
  icon: string;
}

interface ArticleMeta {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  authorName?: string;
}

interface BlogPageClientProps {
  type: 'categoryFilter' | 'menuTrigger' | 'mobileMenu' | 'showMore' | 'articleGrid';
  categories?: readonly string[];
  tools?: Tool[];
  totalArticles?: number;
  initialCount?: number;
  articles?: ArticleMeta[];
  categoryColors?: Record<string, string>;
}

const defaultCategoryColors: Record<string, string> = {
  '全部': 'bg-white/10 text-white border-white/20 hover:bg-white/20',
  '数学学习': 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
  '语文学习': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30',
  '英语学习': 'bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30',
  '思维训练': 'bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30',
  '学习方法': 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30',
  '升学指导': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/30',
  '工具推荐': 'bg-teal-500/20 text-teal-300 border-teal-500/30 hover:bg-teal-500/30',
  '关于我们': 'bg-pink-500/20 text-pink-300 border-pink-500/30 hover:bg-pink-500/30',
};

export default function BlogPageClient({ 
  type, 
  categories = [], 
  tools = [], 
  totalArticles = 0, 
  initialCount = 15,
  articles = [],
  categoryColors = defaultCategoryColors,
}: BlogPageClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [shownCount, setShownCount] = useState(initialCount);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setShownCount(initialCount);
  }, [initialCount]);

  const handleShowMore = useCallback(() => {
    setShownCount((c) => c + 15);
  }, []);

  if (type === 'menuTrigger') {
    return (
      <button
        onClick={() => setMenuOpen(true)}
        className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        aria-label="打开菜单"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    );
  }

  if (type === 'mobileMenu') {
    if (!menuOpen) return null;
    return (
      <div className="fixed inset-0 z-[60] lg:hidden">
        <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-72 bg-slate-900 shadow-2xl p-6 overflow-y-auto">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="关闭菜单"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-1">
            <a href="/" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">首页</a>
            <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider">学习工具</div>
            {tools.map(tool => (
              <a key={tool.path} href={tool.path} className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <span className="text-lg">{tool.icon}</span>
                <span className="text-sm">{tool.name}</span>
              </a>
            ))}
            <div className="border-t border-white/10 my-3" />
            <a href="/blog/" className="block px-4 py-3 text-white bg-white/10 rounded-lg font-medium">📰 知识分享</a>
            <a href="/search/" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">🔍 搜索</a>
            <a href="/about/" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">关于我们</a>
            <a href="/contact/" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">联系我们</a>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'articleGrid') {
    const filtered = activeCategory === '全部'
      ? articles
      : articles.filter(a => a.category === activeCategory);
    const shown = filtered.slice(0, shownCount);
    const hasMore = shownCount < filtered.length;

    return (
      <>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeCategory === category
                  ? (categoryColors[category] || 'bg-white/20 text-white border-white/30')
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Article Count */}
        <div className="mb-6 text-sm text-gray-500">
          共 {filtered.length} 篇文章
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shown.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}/`}
              className="text-left bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-slate-700/50 transition-all group"
            >
              {/* Category & Read Time */}
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[article.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
                  {article.category}
                </span>
                <span className="text-gray-500 text-xs">{article.readTime}</span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-snug">
                {article.title}
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                {article.description}
              </p>

              {/* Author & Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                    {(article.authorName || '林').charAt(0)}
                  </div>
                  <span className="text-gray-500 text-xs">{article.authorName || '林远'}</span>
                  <time className="text-gray-500 text-xs">{article.date}</time>
                </div>
                <span className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                  阅读全文 &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Show More Button */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={handleShowMore}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all font-medium"
            >
              加载更多文章（还有 {filtered.length - shownCount} 篇）
            </button>
          </div>
        )}
      </>
    );
  }

  if (type === 'categoryFilter') {
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeCategory === category
                ? (defaultCategoryColors[category] || 'bg-white/20 text-white border-white/30')
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }

  if (type === 'showMore') {
    if (shownCount >= totalArticles) return null;
    const remaining = totalArticles - shownCount;
    return (
      <div className="text-center mt-8">
        <button
          onClick={handleShowMore}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all font-medium"
        >
          加载更多文章（还有 {remaining} 篇）
        </button>
      </div>
    );
  }

  return null;
}
