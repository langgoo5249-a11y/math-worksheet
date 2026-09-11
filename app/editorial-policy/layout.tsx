import type { Metadata } from 'next';

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
  alternates: { canonical: PAGE_URL },
  openGraph: {
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

export default function EditorialPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
