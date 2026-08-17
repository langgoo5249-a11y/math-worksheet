import type { Metadata } from 'next';
import SiteLayout from '../_components/SiteLayout';

export const metadata: Metadata = {
  title: '隐私政策 - 练学宝',
  description: '练学宝隐私政策：详细说明我们如何收集、使用、存储和保护用户个人信息。',
  alternates: {
    canonical: 'https://www.skillxm.cn/privacy-policy/',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">隐私政策</h1>
        <p className="text-gray-300 leading-relaxed mb-4">最后更新日期：2026年8月17日</p>
        <p className="text-gray-300 leading-relaxed mb-4">
          练学宝（以下简称"我们"）非常重视用户隐私保护。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的信息。
        </p>
        <h2 className="text-xl font-bold text-white mb-3 mt-6">一、我们收集的信息</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          本站所有工具均在您的浏览器本地运行，不需要注册账号，不要求您提供姓名、邮箱、电话等任何个人身份信息。
        </p>
        <h2 className="text-xl font-bold text-white mb-3 mt-6">二、联系我们</h2>
        <p className="text-gray-300 leading-relaxed">
          如果您对本隐私政策有任何疑问，请通过邮件联系我们：<a href="mailto:lang@skillxm.cn" className="text-blue-400 hover:underline">lang@skillxm.cn</a>
        </p>
      </div>
    </SiteLayout>
  );
}