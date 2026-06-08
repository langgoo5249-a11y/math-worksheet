import type { Metadata } from 'next';
import Link from 'next/link';
import SectionLayout from '@/app/_components/SectionLayout';
import { TEXTBOOKS } from '@/lib/textbookConfig';

export const metadata: Metadata = {
  title: '小学教材同步练习专区 - 人教版/北师大版/苏教版/部编版 | 练学宝',
  description: '小学教材同步练习专区，覆盖人教版（PEP）、北师大版、苏教版、部编版（统编版）1-6年级数学语文英语练习卷，与课堂进度完全同步。',
  keywords: ['小学教材同步练习', '人教版', '北师大版', '苏教版', '部编版', 'PEP', '小学数学下册', '小学语文下册'],
  alternates: {
    canonical: 'https://www.skillxm.cn/textbook',
  },
};

export default function TextbookIndex() {
  return (
    <SectionLayout
      breadcrumb={[{ label: '首页', href: '/' }, { label: '教材同步专区' }]}
      icon="📚"
      title="小学教材同步练习专区"
      description="按教材版本组织的练习卷，与孩子课堂进度完全同步。每天跟着学校学，回家跟着练学宝练。"
    >
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEXTBOOKS.map((tb) => (
          <div
            key={tb.id}
            className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">📖</span>
              <div>
                <h2 className="text-xl font-bold text-white">{tb.name}</h2>
                <p className="text-xs text-slate-400">{tb.publisher}</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-4">{tb.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tb.scope.map((s) => (
                <span key={s} className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">
                  {s}
                </span>
              ))}
            </div>
            <div className="space-y-2">
              {tb.grades.map((g) => (
                <Link
                  key={g.grade}
                  href={`/textbook/${tb.id}/grade-${g.grade}`}
                  className="flex items-center justify-between px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors text-sm"
                >
                  <span className="text-white">
                    {tb.name} · {g.grade}年级
                  </span>
                  <span className="text-slate-400 text-xs">
                    {g.units.length}个单元 →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-blue-300 mb-3">📖 如何选教材版本？</h2>
        <ul className="text-slate-200 space-y-2 text-sm">
          <li>• <strong>查孩子课本封面</strong>：封面左下角或书脊上会印着"人民教育出版社""北京师范大学出版社"等字样</li>
          <li>• <strong>看孩子课本目录</strong>：每个版本目录顺序不同，单元数也不同</li>
          <li>• <strong>问孩子老师</strong>：直接询问班主任"我们班用的是哪个版本"</li>
          <li>• <strong>不确定选什么？</strong>：选"人教版"（使用最广，覆盖90%以上地区）</li>
        </ul>
      </section>
    </SectionLayout>
  );
}
