import type { Metadata } from 'next';
import SearchPageClient from './SearchPageClient';
import JsonLd from '@/app/_components/JsonLd';

export const metadata: Metadata = {
  title: '站内搜索 - 练学宝',
  description: '搜索练学宝的所有内容，包括工具和博客文章。',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://www.skillxm.cn/search/',
    languages: {
      'zh-CN': 'https://www.skillxm.cn/search/',
      'x-default': 'https://www.skillxm.cn/search/',
    },
  },
};

const searchPageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.skillxm.cn/search/#webpage',
      name: '站内搜索',
      description: '练学宝站内搜索，可按工具、知识点、年级与文章快速定位内容',
      url: 'https://www.skillxm.cn/search/',
      inLanguage: 'zh-CN',
      isPartOf: { '@type': 'WebSite', '@id': 'https://www.skillxm.cn/#website' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: 'https://www.skillxm.cn/' },
        { '@type': 'ListItem', position: 2, name: '站内搜索', item: 'https://www.skillxm.cn/search/' },
      ],
    },
  ],
};

export default function SearchPage() {
  return (
    <>
      <JsonLd data={searchPageSchema} />
      <SearchPageClient />
    </>
  );
}
