import Link from 'next/link';

interface ToolBreadcrumbProps {
  toolName: string;
  toolPath: string;
}

export default function ToolBreadcrumb({ toolName, toolPath }: ToolBreadcrumbProps) {
  return (
    <nav className="print:hidden pt-16 pb-2 px-4 max-w-7xl mx-auto" aria-label="面包屑导航">
      <ol className="flex items-center gap-1.5 text-xs text-gray-500">
        <li>
          <a href="/" className="hover:text-gray-300 transition-colors">首页</a>
        </li>
        <li>
          <svg className="w-3 h-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </li>
        <li>
          <Link href="/blog" className="hover:text-gray-300 transition-colors">学习工具</Link>
        </li>
        <li>
          <svg className="w-3 h-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </li>
        <li className="text-gray-300 font-medium truncate max-w-[200px]">{toolName}</li>
      </ol>
    </nav>
  );
}
