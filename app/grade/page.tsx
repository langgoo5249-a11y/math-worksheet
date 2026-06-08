import type { Metadata } from 'next';
import Link from 'next/link';
import SectionLayout from '@/app/_components/SectionLayout';
import { GRADES } from '@/lib/gradeConfig';

export const metadata: Metadata = {
  title: '小学年级学习专区 - 1-6年级完整学习方案 | 练学宝',
  description: '练学宝为小学1-6年级学生提供完整的学习专区，包含各年级数学语文英语的练习题、学习工具、知识点汇总。所有内容免费，支持PDF下载打印。',
  keywords: ['小学年级学习', '一年级学习', '二年级学习', '三年级学习', '四年级学习', '五年级学习', '六年级学习', '小升初'],
  alternates: {
    canonical: 'https://www.skillxm.cn/grade',
  },
};

export default function GradeIndex() {
  return (
    <SectionLayout
      breadcrumb={[{ label: '首页', href: '/' }, { label: '年级专区' }]}
      icon="🎓"
      title="小学年级学习专区"
      description="覆盖小学1-6年级完整学习方案。每个年级都为你准备：核心知识点、配套练习工具、家长指导建议。"
    >
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GRADES.map((g) => (
          <Link
            key={g.grade}
            href={`/grade/grade-${g.grade}`}
            className="group block p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 hover:from-slate-700/70 hover:to-slate-800/70 border border-white/10 hover:border-blue-500/50 rounded-2xl transition-all"
          >
            <div className="text-4xl mb-3">🎓</div>
            <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
              {g.name}
            </h2>
            <div className="flex flex-wrap gap-2 mb-3 text-xs">
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded">{g.ageRange}</span>
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded">{g.semester}</span>
            </div>
            <p className="text-sm text-slate-300 line-clamp-3 mb-4">{g.description}</p>
            <div className="text-sm text-blue-400 group-hover:text-blue-300">
              进入{g.name}专区 →
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-10 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-yellow-300 mb-3">💡 选年级的建议</h2>
        <ul className="text-slate-200 space-y-2 text-sm">
          <li>• 选孩子<strong>当前在读</strong>的年级（不是年龄对应的年级）</li>
          <li>• 暑假可以<strong>预习下学期</strong>内容，提前适应</li>
          <li>• 数学有<strong>薄弱环节</strong>，可从低一个年级开始补基础</li>
          <li>• 小升初阶段重点使用<strong>5-6年级专区</strong></li>
        </ul>
      </section>
    </SectionLayout>
  );
}
