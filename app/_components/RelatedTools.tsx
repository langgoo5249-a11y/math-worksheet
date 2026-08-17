import Link from 'next/link';
import { TOOLS, type ToolConfig } from '@/lib/toolRegistry';

export default function RelatedTools({
  currentSlug,
  limit = 3,
  title = '相关学习工具',
  tools,
}: {
  currentSlug?: string;
  limit?: number;
  title?: string;
  tools?: ToolConfig[];
}) {
  // 如果传入了自定义工具列表，使用它；否则从注册表中过滤
  const related = (tools || TOOLS)
    .filter((t) => t.active !== false && t.path !== currentSlug)
    .slice(0, limit);

  return (
    <section className="mt-12 pt-8 border-t border-white/10">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link
            key={tool.path}
            href={tool.path}
            className="group flex items-center gap-3 p-4 bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all"
          >
            <span className="text-2xl shrink-0">{tool.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white text-sm sm:text-base truncate group-hover:text-blue-400 transition-colors">
                {tool.name}
              </div>
              <div className="text-xs text-slate-400 truncate">
                {tool.desc}
              </div>
            </div>
            <span className="text-slate-500 group-hover:text-blue-400 transition-colors shrink-0">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
