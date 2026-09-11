import { TEXTBOOKS } from '@/lib/textbookConfig';
import JsonLd from '@/app/_components/JsonLd';

/**
 * P4-A：为 4 个教材版本页补 WebPage + BreadcrumbList 结构化数据。
 * 教材版本页是聚合导航页，用 WebPage 而非 Article。
 */
export default async function TextbookVersionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ version: string }>;
}) {
  const { version } = await params;
  const tb = TEXTBOOKS.find((t) => t.id === version);
  if (!tb) return <>{children}</>;

  const url = `https://www.skillxm.cn/textbook/${tb.id}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        name: tb.metaTitle || tb.fullName,
        description: tb.metaDescription || tb.description,
        url,
        inLanguage: 'zh-CN',
        isPartOf: { '@type': 'WebSite', '@id': 'https://www.skillxm.cn/#website' },
        about: { '@type': 'Thing', name: tb.fullName },
        keywords: (tb.metaKeywords || []).join(','),
      },
      ],
  };

  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
