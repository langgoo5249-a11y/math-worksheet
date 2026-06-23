import type { Metadata } from 'next';
import SearchPageClient from './SearchPageClient';

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

export default function SearchPage() {
  return <SearchPageClient />;
}
