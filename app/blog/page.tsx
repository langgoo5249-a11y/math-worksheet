'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { articles, categories } from './data';
import type { Category } from './data';
import { TOOLS } from '@/lib/toolRegistry';

const categoryColors: Record<string, string> = {
  '数学学习': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  '语文学习': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  '英语学习': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  '思维训练': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  '学习方法': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  '升学指导': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  '工具推荐': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  '关于我们': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
};

export default function BlogPage() {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState<Category>('全部');
  
  useEffect(() => {
    document.title = '知识分享 - 实用教育方法和学习技巧 | 练学宝';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', '练学宝知识分享：90+篇原创教育文章，涵盖数学学习、语文学习、英语学习、思维训练等，助力孩子成长。');
    }
    // 设置canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://www.skillxm.cn/blog/');
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://www.skillxm.cn/blog/';
      document.head.appendChild(link);
    }
  }, []);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  // 移动端菜单打开时锁定body滚动
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenu]);

  const filteredArticles = (activeCategory === '全部'
    ? articles
    : articles.filter(a => a.category === activeCategory)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-base shadow-lg shadow-blue-500/20">
                📚
              </div>
              <a href="/" className="text-lg font-bold text-white hover:opacity-80 transition-opacity">
                练学宝
              </a>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              <a href="/" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">首页</a>

              {/* 学习工具下拉 */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  🛠️ 学习工具
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute left-0 top-full mt-1 bg-slate-800 border border-white/10 rounded-xl shadow-2xl p-2 min-w-[200px] z-50 max-h-[60vh] overflow-y-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {TOOLS.filter(t => t.active).map(tool => (
                    <a key={tool.path} href={tool.path} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                      <span className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center text-sm">{tool.icon}</span>
                      <div><div className="text-white font-medium">{tool.name}</div><div className="text-xs text-gray-500">{tool.desc}</div></div>
                    </a>
                  ))}
                </div>
              </div>

              <span className="px-3 py-1.5 text-sm text-white bg-white/10 rounded-lg font-medium">📰 知识分享</span>

              <a href="/search" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">🔍 搜索</a>

              <a href="/about" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">关于我们</a>
              <a href="/contact" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">联系我们</a>
            </div>
            {/* 移动端汉堡菜单按钮 */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label={mobileMenu ? '关闭菜单' : '打开菜单'}
            >
              {mobileMenu ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* 移动端侧滑菜单 */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${mobileMenu ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenu ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileMenu(false)} />
        <div className={`absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-slate-900 border-l border-white/10 shadow-2xl transition-transform duration-300 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-base">📚</div>
              <span className="text-lg font-bold text-white">练学宝</span>
            </div>
          </div>
          <div className="p-3 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 60px)' }}>
            <a href="/" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <span>🏠</span><span>首页</span>
            </a>
            <div className="px-3 py-2 text-xs text-gray-500 font-bold uppercase">🛠️ 学习工具</div>
            {TOOLS.filter(t => t.active).map(tool => (
              <a key={tool.path} href={tool.path} onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <span className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center text-sm">{tool.icon}</span>
                <span>{tool.name}</span>
              </a>
            ))}
            <div className="border-t border-white/10 my-2" />
            <a href="/search" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <span>🔍</span><span>搜索</span>
            </a>
            <a href="/about" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <span>ℹ️</span><span>关于我们</span>
            </a>
            <a href="/contact" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <span>📧</span><span>联系我们</span>
            </a>
          </div>
        </div>
      </div>

      <main className="pt-14">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
          {/* Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">知识分享</h1>
            <p className="text-gray-400 text-base sm:text-lg">分享实用的教育方法和学习技巧，助力孩子成长</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-700/50 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Article Count */}
          <div className="mb-6 text-sm text-gray-500">
            共 {filteredArticles.length} 篇文章
            {activeCategory !== '全部' && (
              <span>
                {' '}· 分类：<span className="text-gray-300">{activeCategory}</span>
              </span>
            )}
          </div>

          {/* Article Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.id}`}
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

                {/* Date & Arrow */}
                <div className="flex items-center justify-between">
                  <time className="text-gray-500 text-xs">{article.date}</time>
                  <span className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                    阅读全文 &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">该分类暂无文章</p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 px-4 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-400 mb-4">
            <a href="/about" className="hover:text-white transition-colors">关于我们</a>
            <span className="text-gray-600">|</span>
            <a href="/terms" className="hover:text-white transition-colors">服务条款</a>
            <span className="text-gray-600">|</span>
            <a href="/contact" className="hover:text-white transition-colors">联系我们</a>
            <span className="text-gray-600">|</span>
            <a href="/blog" className="hover:text-white transition-colors">知识分享</a>
          </div>
          <div className="text-center text-gray-500 text-sm">
            &copy; 2026 练学宝
          </div>
        </div>
      </footer>

      </div>
  );
}
