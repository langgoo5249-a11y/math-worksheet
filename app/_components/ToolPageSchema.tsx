import { TOOLS } from '@/lib/toolRegistry';

interface ToolPageSchemaProps {
  toolPath: string;
}

/**
 * 为单个工具页注入 SoftwareApplication + BreadcrumbList 结构化数据。
 * 包含 dateModified/datePublished 增强内容新鲜度信号。
 */
export default function ToolPageSchema({ toolPath }: ToolPageSchemaProps) {
  const normalizedPath = toolPath.replace(/\/$/, '');
  const tool = TOOLS.find((t) => t.path === normalizedPath && t.active);
  const toolUrl = `https://www.skillxm.cn${normalizedPath}/`;
  if (!tool) return null;

  const dateModified = new Date().toISOString().split('T')[0];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: tool.schemaName,
        applicationCategory: tool.schemaCategory,
        operatingSystem: 'Web Browser',
        url: toolUrl,
        description: tool.schemaDescription,
        dateModified,
        datePublished: '2025-11-01',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CNY',
        },
        provider: {
          '@id': 'https://www.skillxm.cn/#organization',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '练学宝首页',
            item: 'https://www.skillxm.cn/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: '免费教学工具',
            item: 'https://www.skillxm.cn/tools/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: tool.name,
            item: toolUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
