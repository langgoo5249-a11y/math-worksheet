import { getGradeConfig } from '@/lib/gradeConfig';
import JsonLd from '@/app/_components/JsonLd';

/**
 * P4-A：为 6 个年级页补 WebPage + BreadcrumbList 结构化数据。
 * 年级页是聚合导航页而非单篇文章，所以用 WebPage 而非 Article。
 */
export default async function GradeItemLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ grade: string }>;
}) {
  const { grade: slug } = await params;
  const gradeNum = parseInt(slug.replace('grade-', ''), 10);
  const config = getGradeConfig(gradeNum);
  if (!config) return <>{children}</>;

  const url = `https://www.skillxm.cn/grade/${slug}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        name: config.metaTitle || config.name,
        description: config.metaDescription || config.description,
        url,
        inLanguage: 'zh-CN',
        isPartOf: { '@type': 'WebSite', '@id': 'https://www.skillxm.cn/#website' },
        about: { '@type': 'Thing', name: `${config.name}学习` },
        keywords: (config.metaKeywords || []).join(','),
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
