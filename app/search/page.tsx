import type { Metadata } from 'next';
import SearchPageClient from './SearchPageClient';

export const metadata: Metadata = {
  title: '站内搜索 - 教材工具箱',
  description: '搜索教材工具箱的所有内容，包括工具和博客文章。',
  alternates: {
    canonical: 'https://www.skillxm.cn/search',
  },
};

export default function SearchPage() {
  return <SearchPageClient />;
}
