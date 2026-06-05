'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { articles } from '@/app/blog/data';
import { TOOLS } from '@/lib/toolRegistry';
import SiteLayout from '@/app/_components/SiteLayout';

export default function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const results = useMemo(() => {
    if (!query.trim()) return { tools: [], articles: [] };

    const lowerQuery = query.toLowerCase();

    const matchedTools = TOOLS.filter(tool => 
      tool.active && (
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.desc.toLowerCase().includes(lowerQuery) ||
        tool.schemaName.toLowerCase().includes(lowerQuery) ||
        tool.schemaDescription.toLowerCase().includes(lowerQuery)
      )
    );

    const matchedArticles = articles.filter(article =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.category.toLowerCase().includes(lowerQuery) ||
      article.content.toLowerCase().includes(lowerQuery)
    );

    return { tools: matchedTools, articles: matchedArticles };
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const totalResults = results.tools.length + results.articles.length;

  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* 搜索框 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">🔍 站内搜索</h1>
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索工具、文章..."
              className="flex-1 px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
            >
              搜索
            </button>
          </form>
        </div>

        {/* 搜索结果 */}
        {query.trim() && (
          <div>
            <p className="text-gray-400 mb-6">
              找到 <span className="text-white font-medium">{totalResults}</span> 个结果
              {results.tools.length > 0 && (
                <span>（{results.tools.length} 个工具，{results.articles.length} 篇文章）</span>
              )}
            </p>

            {/* 工具结果 */}
            {results.tools.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🛠️</span> 相关工具
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.tools.map((tool) => (
                    <Link
                      key={tool.path}
                      href={tool.path}
                      className="bg-slate-800/50 border border-white/10 rounded-xl p-4 hover:border-white/20 hover:bg-slate-700/50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{tool.icon}</span>
                        <div>
                          <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-gray-500 text-sm">{tool.desc}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 文章结果 */}
            {results.articles.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>📰</span> 相关文章
                </h2>
                <div className="space-y-3">
                  {results.articles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/blog/${article.id}`}
                      className="block bg-slate-800/50 border border-white/10 rounded-xl p-4 hover:border-white/20 hover:bg-slate-700/50 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors mb-1">
                            {article.title}
                          </h3>
                          <p className="text-gray-500 text-sm line-clamp-2">{article.description}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full shrink-0">
                          {article.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span>{article.date}</span>
                        <span>·</span>
                        <span>{article.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 无结果 */}
            {totalResults === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-400 text-lg">没有找到相关内容</p>
                <p className="text-gray-500 text-sm mt-2">试试其他关键词？</p>
              </div>
            )}
          </div>
        )}

        {/* 热门搜索 */}
        {!query.trim() && (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">热门搜索：</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['数学练习', '字帖', '口算', '古诗词', '数独', '作文'].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => {
                    setQuery(keyword);
                    router.push(`/search?q=${encodeURIComponent(keyword)}`);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-full text-gray-300 hover:text-white text-sm transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ===== 微信小程序浮动二维码 ===== */}
      <div className="fixed right-4 bottom-24 z-50 group" id="miniapp-float">
        <div className="relative">
          {/* 展开的二维码卡片 */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white rounded-2xl shadow-2xl p-4 w-52 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📱</span>
                <span className="text-sm font-bold text-gray-800">微信小程序使用</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-2 mb-2">
                <img src="/miniapp-qrcode.jpg" alt="微信小程序二维码" className="w-full h-auto rounded-lg" />
              </div>
              <p className="text-xs text-gray-500 text-center">微信扫码 → 即刻使用</p>
            </div>
            {/* 小三角 */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
          </div>
          {/* 浮动按钮 */}
          <div className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-xl group/title">
            <span className="text-white text-xl">📱</span>
            <span className="absolute bottom-full mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover/title:opacity-100 group-hover/title:visible transition-all duration-200 whitespace-nowrap shadow-lg">
              小程序使用
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
            </span>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
