import type { Metadata } from 'next';
import Link from 'next/link';
import SectionLayout from '@/app/_components/SectionLayout';
import { KNOWLEDGE_POINTS } from '@/lib/knowledgeConfig';
import {
  generateItemListSchema,
  generateOpenGraph,
  generateTwitterCard,
  SITE_INFO,
} from '@/lib/seoUtils';

const PAGE_URL = `${SITE_INFO.BASE_URL}/knowledge/`;

export const metadata: Metadata = {
  title: '小学知识点专题 - 数学语文英语核心知识点详解 | 练学宝',
  description: '小学知识点专题库，覆盖数学（凑十法、乘法口诀、百分数等）、语文（拼音、阅读理解、看图写话）、英语（字母、单词记忆）等核心知识点，每个知识点配详解、例题、易错点和配套练习工具。',
  keywords: ['小学知识点', '凑十法', '破十法', '乘法口诀', '百分数应用题', '拼音学习', '阅读理解', '英语单词记忆', '小学数学知识点', '小学语文知识点', '小学英语知识点'],
  alternates: { canonical: PAGE_URL },
  openGraph: generateOpenGraph({
    title: '小学知识点专题库 - 数学语文英语核心知识点详解 | 练学宝',
    description: '覆盖小学1-6年级数学语文英语核心知识点，每个知识点含详解、典型例题、易错点、配套练习工具。',
    url: PAGE_URL,
  }),
  twitter: generateTwitterCard({
    title: '小学知识点专题库 - 数学语文英语核心知识点 | 练学宝',
    description: '覆盖小学1-6年级数学语文英语核心知识点，每个知识点含详解、典型例题、易错点、配套练习工具。',
  }),
};

export default function KnowledgeIndex() {
  const mathKP = KNOWLEDGE_POINTS.filter((k) => k.subject === 'math');
  const chineseKP = KNOWLEDGE_POINTS.filter((k) => k.subject === 'chinese');
  const englishKP = KNOWLEDGE_POINTS.filter((k) => k.subject === 'english');

  const itemListSchema = generateItemListSchema({
    name: '小学知识点专题库',
    description: '小学1-6年级数学语文英语核心知识点专题列表',
    url: PAGE_URL,
    items: KNOWLEDGE_POINTS.map((kp, i) => ({
      name: kp.name,
      url: `${SITE_INFO.BASE_URL}/knowledge/${kp.slug}`,
      position: i + 1,
      description: kp.shortDesc,
    })),
  });

  const faqs = [
    {
      q: '小学数学有哪些核心知识点？',
      a: '小学数学核心知识点包括：10以内加减法、凑十法、破十法、乘法口诀、万以内加减法、简易方程、百分数应用题等。练学宝为每个知识点提供详解、典型例题、易错点和配套练习工具。',
    },
    {
      q: '语文拼音应该怎么学？',
      a: '小学语文拼音学习应分三步：①先认读声母（23个）和韵母（24个）的发音；②在四线三格上规范书写；③通过拼读练习掌握整体认读音节。练学宝拼音注音工具提供大量练习。',
    },
    {
      q: '英语零基础怎么入门？',
      a: '小学英语零基础入门建议：①先认读26个字母的大小写和发音；②按主题学习高频单词（颜色、数字、动物、家庭等）；③通过字母字帖练习规范书写。练学宝英语字帖工具适合入门学习。',
    },
  ];

  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <SectionLayout
      path="/knowledge/"
      breadcrumb={[{ label: '首页', href: '/' }, { label: '知识点专题' }]}
      icon="💡"
      title="小学知识点专题库"
      description="每个核心知识点都配详解、典型例题、易错点、配套练习工具。"
      keywords={['小学知识点', '数学知识点', '语文知识点', '英语知识点', '小学学习', '知识点专题']}
      jsonLd={[itemListSchema, faqSchema]}
      summary={`练学宝小学知识点专题库收录 ${KNOWLEDGE_POINTS.length} 个核心知识点，覆盖数学（${mathKP.length}个）、语文（${chineseKP.length}个）、英语（${englishKP.length}个）三大主科。每个知识点均提供：详细概念讲解、典型例题演示、常见错误分析、配套练习工具推荐。适合小学1-6年级学生日常学习、考前复习、家长辅导使用。`}
      keyPoints={[
        `✅ 覆盖数学/语文/英语三大主科 ${KNOWLEDGE_POINTS.length} 个核心知识点`,
        '✅ 每个知识点配：详解、典型例题、常见错误、配套工具',
        '✅ 按年级分层（基础/进阶/拔高），难度递进',
        '✅ 配套练学宝原创工具：数学练习卷、字帖、拼音注音、口算速练等',
        '✅ 全部内容免费、无需注册、永久可访问',
      ]}
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
                  aria-label={`${kp.name}知识点详解`}
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

      {/* FAQ - 帮助 AI 引擎抓取 */}
      <section className="mt-10 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">❓ 常见问题</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="p-4 bg-slate-900/50 border border-white/5 rounded-lg">
              <summary className="text-white font-medium cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </SectionLayout>
  );
}
