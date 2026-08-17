import type { Metadata } from 'next';
import SiteLayout from '../_components/SiteLayout';

export const metadata: Metadata = {
  title: '使用条款 - 练学宝',
  description: '练学宝使用条款：详细说明用户使用本站服务的相关规定。',
  alternates: {
    canonical: 'https://www.skillxm.cn/terms-of-service/',
  },
};

export default function TermsOfServicePage() {
  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">使用条款</h1>
        <p className="text-gray-300 leading-relaxed mb-4">最后更新日期：2026年8月17日</p>
        <p className="text-gray-300 leading-relaxed mb-4">
          欢迎使用练学宝。在使用本站服务之前，请您仔细阅读本使用条款。
        </p>
        <h2 className="text-xl font-bold text-white mb-3 mt-6">一、服务说明</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          练学宝是一个免费的在线小学教育工具平台。
        </p>
        <h2 className="text-xl font-bold text-white mb-3 mt-6">二、联系我们</h2>
        <p className="text-gray-300 leading-relaxed">
          如果您对本使用条款有任何疑问，请通过邮件联系我们：<a href="mailto:lang@skillxm.cn" className="text-blue-400 hover:underline">lang@skillxm.cn</a>
        </p>
      </div>
    </SiteLayout>
  );
}