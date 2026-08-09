import Link from 'next/link';
import type { Metadata } from 'next';
import { articles, categories } from './data';
import { TOOLS } from '@/lib/toolRegistry';
import BlogPageClient from './BlogPageClient';
import MiniappFooterButton from '../_components/MiniappFooterButton';

export const metadata: Metadata = {
  title: '知识分享 - 小学教育学习方法指南 | 练学宝',
  description: '小学数学语文英语学习方法文章集锦，覆盖一年级到六年级学习指南，包含口算训练、字帖练习、阅读理解、作文写作等实用教程。',
  alternates: {
    canonical: 'https://www.skillxm.cn/blog/',
    languages: {
      'zh-CN': 'https://www.skillxm.cn/blog/',
      'x-default': 'https://www.skillxm.cn/blog/',
    },
  },
  openGraph: {
    title: '知识分享 - 小学教育学习方法指南 | 练学宝',
    description: '小学数学语文英语学习方法文章集锦，覆盖一年级到六年级学习指南。',
    url: 'https://www.skillxm.cn/blog/',
    type: 'website',
    locale: 'zh_CN',
    siteName: '练学宝',
  },
};

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

// 服务端排序文章（按日期降序）
const sortedArticles = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "练学宝",
                "item": "https://www.skillxm.cn/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "知识分享",
                "item": "https://www.skillxm.cn/blog/"
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "练学宝博客 - 小学教育学习方法指南",
            "description": "小学数学语文英语学习方法文章集锦，覆盖一年级到六年级学习指南，包含口算训练、字帖练习、阅读理解、作文写作等实用教程。",
            "url": "https://www.skillxm.cn/blog",
            "dateModified": "2026-08-07"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "练学宝知识分享 — 最新文章",
            "url": "https://www.skillxm.cn/blog/",
            "numberOfItems": Math.min(sortedArticles.length, 20),
            "itemListElement": sortedArticles.slice(0, 20).map((a, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "url": `https://www.skillxm.cn/blog/${a.id}/`,
              "name": a.title,
              "datePublished": a.date
            }))
          })
        }}
      />
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

              <a href="/search/" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">🔍 搜索</a>

              <a href="/about/" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">关于我们</a>
              <a href="/contact/" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">联系我们</a>
            </div>
            {/* 移动端汉堡菜单按钮 - 由客户端组件处理 */}
            <BlogPageClient type="menuTrigger" />
          </div>
        </div>
      </nav>

      {/* 移动端侧滑菜单 - 由客户端组件处理 */}
      <BlogPageClient type="mobileMenu" tools={TOOLS.filter(t => t.active)} />

      <main className="pt-14">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
          {/* Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">知识分享</h1>
            <p className="text-gray-400 text-base sm:text-lg">分享实用的教育方法和学习技巧，助力孩子成长</p>
          </div>

          {/* Article Grid + Filter + Show More - 客户端组件管理
              只渲染15篇文章到初始HTML，其余通过客户端动态加载，
              页面体积从485KB降到~80KB，大幅提升Core Web Vitals */}
          <BlogPageClient 
            type="articleGrid" 
            categories={categories} 
            articles={sortedArticles.map(a => ({
              id: a.id,
              title: a.title,
              description: a.description,
              category: a.category,
              readTime: a.readTime,
              date: a.date,
              authorName: a.author?.name,
            }))}
            categoryColors={categoryColors}
            initialCount={15}
          />
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 px-4 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-400 mb-4">
            <a href="/about/" className="hover:text-white transition-colors">关于我们</a>
            <span className="text-gray-600">|</span>
            <a href="/terms/" className="hover:text-white transition-colors">服务条款</a>
            <span className="text-gray-600">|</span>
            <a href="/contact/" className="hover:text-white transition-colors">联系我们</a>
            <span className="text-gray-600">|</span>
            <a href="/blog/" className="hover:text-white transition-colors">知识分享</a>
            <span className="text-gray-600">|</span>
            <MiniappFooterButton />
          </div>
          <div className="text-center text-gray-500 text-sm">
            &copy; 2026 练学宝
          </div>
        </div>
      </footer>
    </div>
  );
}
