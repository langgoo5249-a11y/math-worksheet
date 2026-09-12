import type { Metadata } from 'next';
import JsonLd from '@/app/_components/JsonLd';
import { DEFAULT_OG_IMAGE } from '@/lib/seoUtils';

// ⚠️ app/editorial-policy/page.tsx 是 'use client' 组件，无法导出 metadata，
//    导致该页继承了根 layout 的 alternates.canonical（指向首页 https://www.skillxm.cn/）。
//    后果：Google 会把 /editorial-policy/ 当成首页副本而不索引，但它又在 sitemap 里 —— 信号矛盾。
//    修复：用这个 server 组件 layout 提供页面级 metadata 与自指 canonical（P3-4）。
const PAGE_URL = 'https://www.skillxm.cn/editorial-policy/';

export const metadata: Metadata = {
  title: '编辑政策与内容审核流程',
  description:
    '练学宝编辑政策：所有教育内容均经一线教师逐题审核，遵循「AI辅助初稿 + 人工审核」流程，对齐2022版课程标准，覆盖人教版、北师大版、苏教版、青岛版，确保内容准确可靠。',
  keywords: [
    '练学宝编辑政策',
    '内容审核流程',
    '内容质量标准',
    'AI辅助内容',
    '教育内容审核',
    '教师审核',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'zh-CN': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: '编辑政策与内容审核流程 | 练学宝',
    description:
      '所有教育内容均经一线教师逐题审核，遵循「AI辅助初稿 + 人工审核」流程，对齐2022版课程标准。',
    url: PAGE_URL,
    siteName: '练学宝',
    type: 'website',
    locale: 'zh_CN',
  },
  robots: { index: true, follow: true },
};

// P5-3：补齐 BreadcrumbList。page.tsx 是客户端组件，结构化数据放在这个 server layout 里渲染。
const editorialPolicySchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.skillxm.cn/editorial-policy/#webpage',
      name: '编辑政策与内容审核流程',
      description:
        '练学宝编辑政策：所有教育内容均经一线教师逐题审核，遵循「AI辅助初稿 + 人工审核」流程，对齐 2022 版课程标准。',
      url: 'https://www.skillxm.cn/editorial-policy/',
      inLanguage: 'zh-CN',
      isPartOf: { '@type': 'WebSite', '@id': 'https://www.skillxm.cn/#website' },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://www.skillxm.cn/#organization',
        name: '练学宝',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: 'https://www.skillxm.cn/' },
        { '@type': 'ListItem', position: 2, name: '编辑政策', item: 'https://www.skillxm.cn/editorial-policy/' },
      ],
    },
  ],
};

export default function EditorialPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={editorialPolicySchema} />
      {children}
    </>
  );
}
