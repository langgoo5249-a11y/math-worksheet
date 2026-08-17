import type { Metadata } from 'next';
import SiteLayout from '../_components/SiteLayout';

export const metadata: Metadata = {
  title: '联系我们 - 练学宝',
  description: '联系练学宝团队。如有任何问题或建议，请发送邮件至 lang@skillxm.cn。',
  alternates: {
    canonical: 'https://www.skillxm.cn/contact/',
  },
};

export default function ContactPage() {
  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">联系我们</h1>
        <p className="text-gray-300 leading-relaxed mb-4">
          如果您有任何问题、建议或合作意向，请通过以下方式联系我们：
        </p>
        <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">联系方式</h2>
          <p className="text-gray-300 mb-2">
            邮箱：<a href="mailto:lang@skillxm.cn" className="text-blue-400 hover:underline">lang@skillxm.cn</a>
          </p>
          <p className="text-gray-400 text-sm mt-4">
            我们承诺在 1-2 个工作日内回复您的邮件。
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}