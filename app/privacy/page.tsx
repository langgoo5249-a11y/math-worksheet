import type { Metadata } from 'next';
import SiteLayout from '../_components/SiteLayout';

export const metadata: Metadata = {
  title: '隐私政策 - 练学宝',
  description: '练学宝隐私政策。',
  alternates: {
    canonical: 'https://www.skillxm.cn/privacy/',
  },
};

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">隐私政策</h1>
        <p className="text-gray-300 leading-relaxed">
          练学宝非常重视用户隐私保护。本站所有工具均在您的浏览器本地运行，不需要注册账号。
        </p>
      </div>
    </SiteLayout>
  );
}