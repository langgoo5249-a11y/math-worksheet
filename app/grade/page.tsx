import type { Metadata } from 'next';
import Link from 'next/link';
import SectionLayout from '@/app/_components/SectionLayout';
import { GRADES } from '@/lib/gradeConfig';
import { generateItemListSchema, generateOrganizationSchema } from '@/lib/seoUtils';

export const metadata: Metadata = {
  title: '小学年级学习专区 - 1-6年级完整学习方案 | 练学宝',
  description: '练学宝为小学1-6年级学生提供完整的学习专区，包含各年级数学语文英语的练习题、学习工具、知识点汇总。所有内容免费，支持PDF下载打印。',
  keywords: ['小学年级学习', '一年级学习', '二年级学习', '三年级学习', '四年级学习', '五年级学习', '六年级学习', '小升初', '年级专区'],
  alternates: {
    canonical: 'https://www.skillxm.cn/grade',
  },
  openGraph: {
    title: '小学年级学习专区 - 练学宝',
    description: '小学1-6年级完整学习方案：核心知识点、配套练习工具、学习路径全覆盖',
    url: 'https://www.skillxm.cn/grade',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '小学年级学习专区 - 练学宝',
    description: '小学1-6年级完整学习方案',
  },
};

export default function GradeIndex() {
  return (
    <SectionLayout
      breadcrumb={[{ label: '首页', href: '/' }, { label: '年级专区' }]}
      icon="🎓"
      title="小学年级学习专区"
      description="覆盖小学1-6年级完整学习方案。每个年级都为你准备：核心知识点、配套练习工具、家长指导建议。"
      keywords={['小学年级学习', '一年级学习', '二年级学习', '三年级学习', '四年级学习', '五年级学习', '六年级学习', '小升初']}
      path="/grade"
      datePublished="2025-12-01"
      dateModified={new Date().toISOString().slice(0, 10)}
      summary="练学宝年级专区按 1-6 年级分页组织，每个年级提供：核心知识点清单、推荐学习工具、家长指导建议、配套练习资源。支持按学期切换，覆盖数学、语文、英语三大主科。"
      keyPoints={[
        '6 个独立年级详情页，覆盖小学全学段',
        '每个年级配套 10+ 款学习工具',
        '核心知识点按学期、学科系统化整理',
        '家长指导建议贯穿全学段',
        '配套免费练习卷与 PDF 下载',
      ]}
      jsonLd={[
        generateItemListSchema({
          name: '练学宝年级学习专区',
          description: '小学1-6年级完整学习方案',
          url: 'https://www.skillxm.cn/grade',
          items: GRADES.map((g, i) => ({
            name: `${g.name}学习专区`,
            url: `https://www.skillxm.cn/grade/grade-${g.grade}`,
            position: i + 1,
            description: g.description,
          })),
        }),
        generateOrganizationSchema(),
      ]}
    >
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GRADES.map((g) => (
          <Link
            key={g.grade}
            href={`/grade/grade-${g.grade}`}
            className="group block p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 hover:from-slate-700/70 hover:to-slate-800/70 border border-white/10 hover:border-blue-500/50 rounded-2xl transition-all"
            aria-label={`${g.name}学习专区 - ${g.ageRange}`}
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
        <ul className="text-slate-200 space-y-2 text-sm list-disc list-inside">
          <li>选孩子<strong>当前在读</strong>的年级（不是年龄对应的年级）</li>
          <li>暑假可以<strong>预习下学期</strong>内容，提前适应</li>
          <li>数学有<strong>薄弱环节</strong>，可从低一个年级开始补基础</li>
          <li>小升初阶段重点使用<strong>5-6年级专区</strong></li>
        </ul>
      </section>

      {/* AI 友好的 FAQ 区（对 GEO 至关重要） */}
      <section className="mt-10 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">❓ 关于年级专区的常见问题</h2>
        <div className="space-y-4">
          <details className="group" open>
            <summary className="cursor-pointer text-white font-medium hover:text-blue-300 list-none flex items-center justify-between p-3 bg-slate-900/40 rounded-lg">
              <span>如何选择合适的年级？</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-4">
              建议选择孩子当前在读年级。如果是暑假期间，可以预习下学期内容；如果数学基础薄弱，可从低一年级开始补习。
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer text-white font-medium hover:text-blue-300 list-none flex items-center justify-between p-3 bg-slate-900/40 rounded-lg">
              <span>年级专区包含哪些学习内容？</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-4">
              每个年级专区包含：核心知识点清单、配套学习工具、家长指导建议、免费练习卷、相关博客文章。覆盖数学、语文、英语三大主科。
            </p>
          </details>
          <details className="group">
            <summary className="cursor-pointer text-white font-medium hover:text-blue-300 list-none flex items-center justify-between p-3 bg-slate-900/40 rounded-lg">
              <span>5-6年级专区对小升初有帮助吗？</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-4">
              5-6年级专区包含小升初必考的百分数应用题、圆的周长和面积、立体几何、英语1800+单词等核心内容，并提供择校与备考指导。
            </p>
          </details>
        </div>
      </section>
    </SectionLayout>
  );
}
