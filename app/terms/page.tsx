import type { Metadata } from 'next';
import SiteLayout from '../_components/SiteLayout';

export const metadata: Metadata = {
  title: '使用条款 - 练学宝',
  description: '练学宝使用条款。',
  alternates: {
    canonical: 'https://www.skillxm.cn/terms/',
  },
};

export default function TermsPage() {
  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">使用条款</h1>
        <p className="text-gray-300 leading-relaxed">
          欢迎使用练学宝。在使用本站服务之前，请您仔细阅读本使用条款。
        </p>
      </div>
    </SiteLayout>
  );
}