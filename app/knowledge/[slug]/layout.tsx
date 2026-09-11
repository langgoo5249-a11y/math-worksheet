import { getKnowledgePoint } from '@/lib/knowledgeConfig';
import JsonLd from '@/app/_components/JsonLd';

/**
 * P4-A：为 11 个知识点详情页补 Article + BreadcrumbList 结构化数据。
 */
export default async function KnowledgeItemLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const kp = getKnowledgePoint(slug);
  if (!kp) return <>{children}</>;

  const url = `https://www.skillxm.cn/knowledge/${kp.slug}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: kp.metaTitle || kp.name,
        description: kp.metaDescription || kp.shortDesc,
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
        about: { '@type': 'Thing', name: kp.name },
        keywords: (kp.metaKeywords || []).join(','),
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
