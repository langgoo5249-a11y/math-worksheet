import Link from 'next/link';

export interface CrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: CrumbItem[] }) {
  return (
    <nav aria-label="面包屑导航" className="text-sm mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-slate-400">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-white font-medium' : ''}>
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-slate-600">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
