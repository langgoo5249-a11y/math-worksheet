import Link from 'next/link';
import Breadcrumb, { CrumbItem } from './Breadcrumb';

export default function SectionLayout({
  breadcrumb,
  title,
  description,
  icon,
  children,
}: {
  breadcrumb: CrumbItem[];
  title: string;
  description: string;
  icon?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
      </header>

      {children}

      {/* 站内推荐 */}
      <section className="mt-12 pt-8 border-t border-white/10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">探索更多</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: '年级专区', href: '/grade/grade-1', icon: '🎓' },
            { name: '教材同步', href: '/textbook', icon: '📚' },
            { name: '知识点专题', href: '/knowledge', icon: '💡' },
            { name: '资源库', href: '/resources', icon: '📁' },
            { name: '家长指导', href: '/parent-guide', icon: '👨‍👩‍👧' },
            { name: '每日一练', href: '/daily', icon: '📅' },
            { name: '博客', href: '/blog', icon: '✏️' },
            { name: '工具首页', href: '/', icon: '🏠' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 p-3 bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-lg transition-all text-sm"
            >
              <span>{item.icon}</span>
              <span className="text-white">{item.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
