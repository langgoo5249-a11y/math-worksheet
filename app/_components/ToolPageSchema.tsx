import { TOOLS } from '@/lib/toolRegistry';

interface ToolPageSchemaProps {
  toolPath: string;
}

/**
 * 为单个工具页注入 SoftwareApplication + BreadcrumbList 结构化数据。
 * 包含 dateModified/datePublished 增强内容新鲜度信号。
 * 包含 typicalAgeRange、educationalLevel、offers 等完整字段，增强 AI Overviews 引用概率。
 * 注意：不包含 aggregateRating 或 review，因为这些必须来自真实用户提交，否则违反 Google 政策。
 */
export default function ToolPageSchema({ toolPath }: ToolPageSchemaProps) {
  const normalizedPath = toolPath.replace(/\/$/, '');
  const tool = TOOLS.find((t) => t.path === normalizedPath && t.active);
  const toolUrl = `https://www.skillxm.cn${normalizedPath}/`;
  if (!tool) return null;

  const dateModified = new Date().toISOString().split('T')[0];

  // 根据 grades 计算典型年龄范围（中国小学：一年级通常6-7岁）
  const grades = tool.grades || [];
  const minGrade = Math.min(...grades);
  const maxGrade = Math.max(...grades);
  const typicalAgeRange = `${minGrade + 5}-${maxGrade + 6}`;

  // 根据 grades 生成年级描述
  function getGradeLabel(g: number[]): string {
    if (g.length === 0) return '小学';
    const min = Math.min(...g);
    const max = Math.max(...g);
    if (min === max) return `小学${min}年级`;
    return `小学${min}-${max}年级`;
  }

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: tool.schemaName,
        applicationCategory: tool.schemaCategory,
        operatingSystem: 'Web Browser, Any',
        url: toolUrl,
        description: tool.schemaDescription,
        dateModified,
        datePublished: '2025-11-01',
        softwareVersion: '1.0',
        inLanguage: 'zh-CN',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CNY',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2027-12-31',
        },
        typicalAgeRange,
        educationalLevel: {
          '@type': 'EducationalLevel',
          name: getGradeLabel(grades),
        },
        provider: {
          '@id': 'https://www.skillxm.cn/#organization',
        },
        author: {
          '@id': 'https://www.skillxm.cn/#person-chenlaoshi',
        },
        isAccessibleForFree: true,
        educationalUse: ['练习', '家庭作业', '课堂辅助', '自学'],
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: ['学生', '家长', '教师'],
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