import type { Metadata } from 'next';
import Link from 'next/link';
import SectionLayout from '@/app/_components/SectionLayout';
import { KNOWLEDGE_POINTS } from '@/lib/knowledgeConfig';

export const metadata: Metadata = {
  title: '小学知识点专题 - 数学语文英语核心知识点详解 | 练学宝',
  description: '小学知识点专题库，覆盖数学（凑十法、乘法口诀、百分数等）、语文（拼音、阅读理解、看图写话）、英语（字母、单词记忆）等核心知识点，每个知识点配练习工具。',
  keywords: ['小学知识点', '凑十法', '破十法', '乘法口诀', '百分数应用题', '拼音学习', '阅读理解', '英语单词记忆'],
  alternates: {
    canonical: 'https://www.skillxm.cn/knowledge',
  },
};

export default function KnowledgeIndex() {
  const mathKP = KNOWLEDGE_POINTS.filter((k) => k.subject === 'math');
  const chineseKP = KNOWLEDGE_POINTS.filter((k) => k.subject === 'chinese');
  const englishKP = KNOWLEDGE_POINTS.filter((k) => k.subject === 'english');

  return (
    <SectionLayout
      breadcrumb={[{ label: '首页', href: '/' }, { label: '知识点专题' }]}
      icon="💡"
      title="小学知识点专题库"
      description="每个核心知识点都配详解、典型例题、易错点、配套练习工具。"
    >
      {[
        { name: '数学', icon: '🧮', list: mathKP, color: 'from-blue-900/30 to-indigo-900/30 border-blue-500/20' },
        { name: '语文', icon: '📖', list: chineseKP, color: 'from-red-900/30 to-pink-900/30 border-red-500/20' },
        { name: '英语', icon: '🔤', list: englishKP, color: 'from-green-900/30 to-emerald-900/30 border-green-500/20' },
      ].map((sec) => (
        <section key={sec.name} className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">{sec.icon}</span>
            {sec.name}知识点
          </h2>
          <div className={`p-6 bg-gradient-to-br ${sec.color} border rounded-2xl`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sec.list.map((kp) => (
                <Link
                  key={kp.id}
                  href={`/knowledge/${kp.slug}`}
                  className="block p-4 bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 rounded-lg transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{kp.icon}</span>
                    <span className="font-medium text-white">{kp.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      kp.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                      kp.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {kp.difficulty === 'easy' ? '基础' : kp.difficulty === 'medium' ? '进阶' : '拔高'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{kp.shortDesc}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {kp.grades.map((g) => (
                      <span key={g} className="text-xs px-1.5 py-0.5 bg-blue-500/20 text-blue-300 rounded">
                        {g}年级
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
    </SectionLayout>
  );
}
