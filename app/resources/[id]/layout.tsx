import { getResourceById } from '@/lib/resourcesConfig';
import JsonLd from '@/app/_components/JsonLd';

/**
 * P4-A：为 22 个学习资源详情页补 Article + BreadcrumbList 结构化数据。
 * 之前这些页面完全没有 JSON-LD，拿不到富媒体摘要与面包屑展示。
 */
export default async function ResourceItemLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const r = getResourceById(id);
  if (!r) return <>{children}</>;

  const url = `https://www.skillxm.cn/resources/${r.id}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: r.title,
        description: r.description,
        url,
        inLanguage: 'zh-CN',
        author: {
          '@type': 'Organization',
          '@id': 'https://www.skillxm.cn/#organization',
          name: '练学宝',
        },
        publisher: {
          '@type': 'Organization',
          '@id': 'https://www.skillxm.cn/#organization',
          name: '练学宝',
        },
        about: { '@type': 'Thing', name: r.knowledgePoint },
        keywords: (r.tags || []).join(','),
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
