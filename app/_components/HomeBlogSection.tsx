import Link from 'next/link';
import { articles } from '@/app/blog/data';

const categoryColors: Record<string, string> = {
  '数学学习': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  '语文学习': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  '英语学习': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  '思维训练': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  '学习方法': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  '升学指导': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  '工具推荐': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  '关于我们': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  '综合教育': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  '数学': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  '工具教程': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
};

export default function HomeBlogSection() {
  const latestArticles = articles.slice(0, 6);

  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <div className="text-xs sm:text-sm text-indigo-300 font-medium mb-2">📝 知识分享</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              精选博客
            </h2>
            <p className="text-slate-400 text-sm mt-2 hidden sm:block">
              一线教师原创教育干货，覆盖数学、语文、英语全学科学习方法
            </p>
          </div>
          <Link
            href="/blog/"
            className="hidden sm:flex items-center gap-1.5 text-sm text-indigo-300 hover:text-indigo-200 font-medium shrink-0"
          >
            查看全部文章
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {latestArticles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}/`}
              className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 hover:border-indigo-500/50 rounded-2xl p-4 sm:p-5 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${categoryColors[article.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
                  {article.category}
                </span>
                <span className="text-xs text-slate-500 ml-auto">{article.date}</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-3">{article.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{article.readTime}</span>
                <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">
                  阅读 →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view all link */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-sm text-indigo-300 hover:text-indigo-200 font-medium"
          >
            查看全部文章
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}