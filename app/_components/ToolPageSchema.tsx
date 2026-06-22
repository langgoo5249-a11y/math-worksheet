import { TOOLS } from '@/lib/toolRegistry';

interface ToolPageSchemaProps {
  toolPath: string;
}

/**
 * 为单个工具页注入 SoftwareApplication + BreadcrumbList 结构化数据。
 * 与 layout 中的 HowTo/FAQPage 配合，增强 GEO/AI 搜索引擎对工具的理解。
 */
export default function ToolPageSchema({ toolPath }: ToolPageSchemaProps) {
  const normalizedPath = toolPath.replace(/\/$/, '');
  const tool = TOOLS.find((t) => t.path === normalizedPath && t.active);
  if (!tool) return null;

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: tool.schemaName,
        applicationCategory: tool.schemaCategory,
        operatingSystem: 'Web Browser',
        url: `https://www.skillxm.cn${tool.path}`,
        description: tool.schemaDescription,
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
            name: '首页',
            item: 'https://www.skillxm.cn/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: tool.name,
            item: `https://www.skillxm.cn${tool.path}`,
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
