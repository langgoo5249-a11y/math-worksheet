import { getTopicById } from '@/lib/parentGuideConfig';
import JsonLd from '@/app/_components/JsonLd';

/**
 * P4-A：为 6 个家长指南详情页补 Article + BreadcrumbList 结构化数据。
 */
export default async function ParentGuideItemLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const topic = getTopicById(id);
  if (!topic) return <>{children}</>;

  const url = `https://www.skillxm.cn/parent-guide/${topic.id}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: topic.title,
        description: topic.description,
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
        audience: { '@type': 'ParentAudience' },
        keywords: (topic.keyPoints || []).slice(0, 6).join(','),
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
