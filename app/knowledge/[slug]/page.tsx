import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SectionLayout from '@/app/_components/SectionLayout';
import { KNOWLEDGE_POINTS, getKnowledgePoint } from '@/lib/knowledgeConfig';
import {
  generateArticleSchema,
  generateLearningResourceSchema,
  generateOpenGraph,
  generateTwitterCard,
  SITE_INFO,
} from '@/lib/seoUtils';

export function generateStaticParams() {
  return KNOWLEDGE_POINTS.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const kp = getKnowledgePoint(slug);
  if (!kp) return { title: '知识点未找到' };
  const pageUrl = `${SITE_INFO.BASE_URL}/knowledge/${slug}/`;
  return {
    title: kp.metaTitle,
    description: kp.metaDescription,
    keywords: kp.metaKeywords,
    alternates: { canonical: pageUrl },
    openGraph: generateOpenGraph({
      title: kp.metaTitle,
      description: kp.metaDescription,
      url: pageUrl,
      type: 'article',
    }),
    twitter: generateTwitterCard({
      title: kp.metaTitle,
      description: kp.metaDescription,
    }),
  };
}

// Simple markdown renderer for detailed sections content
function renderMarkdownContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let tableRows: string[][] = [];
  let inTable = false;
  let inOrderedList = false;
  let inUnorderedList = false;
  let listItems: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (inOrderedList && listItems.length > 0) {
      elements.push(
        <ol key={`ol-${listKey}`} className="list-decimal list-inside space-y-1 my-2 text-slate-200 text-sm leading-relaxed">
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ol>
      );
    } else if (inUnorderedList && listItems.length > 0) {
      elements.push(
        <ul key={`ul-${listKey}`} className="list-disc list-inside space-y-1 my-2 text-slate-200 text-sm leading-relaxed">
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    }
    listItems = [];
    inOrderedList = false;
    inUnorderedList = false;
    listKey++;
  };

  const flushTable = () => {
    if (inTable && tableRows.length >= 2) {
      const [header, ...rows] = tableRows;
      elements.push(
        <div key={`tbl-${listKey}`} className="overflow-x-auto my-3">
          <table className="w-full text-sm text-slate-200 border-collapse">
            <thead>
              <tr className="bg-slate-700/50">
                {header.map((h, idx) => (
                  <th key={idx} className="border border-slate-600 px-3 py-2 text-left font-medium">{h.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-slate-800/30' : 'bg-slate-800/10'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border border-slate-600 px-3 py-2">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableRows = [];
    inTable = false;
    listKey++;
  };

  const renderInline = (text: string): React.ReactNode => {
    // Handle **bold** syntax
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  while (i < lines.length) {
    const line = lines[i];

    // Table detection
    if (line.startsWith('|') && line.endsWith('|')) {
      flushList();
      if (!inTable) inTable = true;
      const cells = line.split('|').filter(c => c.trim() !== '');
      // Skip separator rows (e.g. |---|---|---|)
      if (!cells.every(c => /^[-:]+$/.test(c.trim()))) {
        tableRows.push(cells);
      }
      i++;
      continue;
    } else {
      flushTable();
    }

    // Ordered list detection
    const orderedMatch = line.match(/^(\d+)[\.\、]\s+(.+)/);
    if (orderedMatch) {
      flushTable();
      if (!inOrderedList) { flushList(); inOrderedList = true; }
      listItems.push(orderedMatch[2]);
      i++;
      continue;
    } else {
      if (inOrderedList) flushList();
    }

    // Unordered list detection
    const unorderedMatch = line.match(/^[-*]\s+(.+)/);
    if (unorderedMatch) {
      flushTable();
      if (!inUnorderedList) { flushList(); inUnorderedList = true; }
      listItems.push(unorderedMatch[1]);
      i++;
      continue;
    } else {
      if (inUnorderedList) flushList();
    }

    // Empty line = paragraph break
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="text-slate-200 text-sm leading-relaxed mb-2">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  flushList();
  flushTable();

  return <>{elements}</>;
}

export default async function KnowledgePointPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kp = getKnowledgePoint(slug);
  if (!kp) notFound();

  const pageUrl = `${SITE_INFO.BASE_URL}/knowledge/${slug}/`;

  const articleSchema = generateArticleSchema({
    title: kp.name,
    description: kp.metaDescription,
    url: pageUrl,
    keywords: kp.metaKeywords,
  });

  const learningResourceSchema = generateLearningResourceSchema({
    name: kp.name,
    description: kp.shortDesc,
    url: pageUrl,
    educationalLevel: kp.grades.map((g) => `小学${g}年级`).join('、'),
    learningResourceType: '知识点专题',
    teaches: kp.keySteps,
    keywords: kp.metaKeywords,
  });

  const faqs = [
    {
      q: `什么是${kp.name}？`,
      a: kp.shortDesc,
    },
    {
      q: `${kp.name}的${kp.subjectName}年级学习重点是什么？`,
      a: `学习目标：${kp.learningGoal}。建议按照本页核心步骤进行学习，每天练习15-30分钟，2-4周可达到熟练掌握。`,
    },
    {
      q: `${kp.name}的${kp.subjectName}年级常见错误有哪些？`,
      a: `常见错误包括：${kp.commonMistakes.slice(0, 3).join('；')}。建议家长辅导时重点关注这些易错点。`,
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
      path={`/knowledge/${slug}/`}
      breadcrumb={[
        { label: '首页', href: '/' },
        { label: '知识点', href: '/knowledge' },
        { label: kp.name },
      ]}
      icon={kp.icon}
      title={kp.name}
      description={kp.shortDesc}
      keywords={kp.metaKeywords}
      jsonLd={[articleSchema, learningResourceSchema, faqSchema]}
      summary={`${kp.name}（${kp.subjectName}）专题：${kp.shortDesc} 适用年级：${kp.grades.map((g) => `${g}年级`).join('、')}，难度：${kp.difficulty === 'easy' ? '基础' : kp.difficulty === 'medium' ? '进阶' : '拔高'}。本页提供完整学习目标、${kp.keySteps.length}步核心方法、${kp.commonMistakes.length}个常见错误、配套练习工具推荐。`}
      keyPoints={[
        `📚 ${kp.subjectName} · ${kp.difficulty === 'easy' ? '基础' : kp.difficulty === 'medium' ? '进阶' : '拔高'} · 适用${kp.grades.join('、')}年级`,
        `🎯 学习目标：${kp.learningGoal}`,
        `📝 ${kp.keySteps.length} 步核心方法，按步骤循序渐进`,
        `⚠️ ${kp.commonMistakes.length} 个常见错误，提前规避`,
        `🛠️ 配套练习工具：${kp.relatedTools.slice(0, 3).map((t) => t.name).join('、')}`,
      ]}
    >
      {/* 概览卡片 */}
      <section className={`mb-10 p-6 bg-gradient-to-br ${
        kp.subject === 'math' ? 'from-blue-900/30 to-indigo-900/30 border-blue-500/20' :
        kp.subject === 'chinese' ? 'from-red-900/30 to-pink-900/30 border-red-500/20' :
        'from-green-900/30 to-emerald-900/30 border-green-500/20'
      } border rounded-2xl`}>
        <p className="text-slate-200 leading-relaxed text-base sm:text-lg">{kp.description}</p>
        <div className="flex flex-wrap gap-3 mt-4 text-sm">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
            学科：{kp.subjectName}
          </span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
            难度：{kp.difficulty === 'easy' ? '基础' : kp.difficulty === 'medium' ? '进阶' : '拔高'}
          </span>
          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full">
            年级：{kp.grades.map((g) => `${g}年级`).join('、')}
          </span>
        </div>
      </section>

      {/* 学习目标 */}
      <section className="mb-10 p-6 bg-slate-800/50 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
          <span>🎯</span>学习目标
        </h2>
        <p className="text-slate-200 leading-relaxed">{kp.learningGoal}</p>
      </section>

      {/* 学习步骤 */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>📝</span>核心步骤
        </h2>
        <ol className="space-y-3">
          {kp.keySteps.map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-4 bg-slate-800/50 border border-white/10 rounded-xl"
            >
              <span className="shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
                {i + 1}
              </span>
              <span className="text-slate-200 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 常见错误 */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>⚠️</span>常见错误
        </h2>
        <ul className="space-y-2">
          {kp.commonMistakes.map((m, i) => (
            <li
              key={i}
              className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
            >
              <span className="text-red-400 mt-0.5">✗</span>
              <span className="text-slate-200 text-sm">{m}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 练习建议 */}
      <section className="mb-10 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-emerald-300 mb-3 flex items-center gap-2">
          <span>💡</span>练习建议
        </h2>
        <p className="text-slate-200 leading-relaxed">{kp.practiceAdvice}</p>
      </section>

      {/* 详细教学内容（1500+字深度长文） */}
      {kp.detailedSections && kp.detailedSections.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>📖</span>深度学习：{kp.name}完全指南
          </h2>
          <div className="space-y-8">
            {kp.detailedSections.map((section, idx) => (
              <div key={idx} className="p-5 bg-slate-800/30 border border-white/10 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-3">{section.title}</h3>
                <div className="text-slate-300 leading-relaxed">
                  {renderMarkdownContent(section.content)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 配套工具 */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🛠️</span>配套练习工具
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kp.relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              aria-label={tool.name}
              className="group flex items-center gap-3 p-4 bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all"
            >
              <span className="text-2xl shrink-0">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </div>
                <div className="text-xs text-slate-400 mt-1">{tool.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ - 帮助 AI 引擎抓取 */}
      <section className="mb-10 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
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

      {/* 相关知识点 */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">相关知识点</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {KNOWLEDGE_POINTS
            .filter((k) => k.id !== kp.id && k.subject === kp.subject)
            .slice(0, 6)
            .map((k) => (
              <Link
                key={k.id}
                href={`/knowledge/${k.slug}`}
                aria-label={k.name}
                className="block p-3 bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 rounded-lg transition-all"
              >
                <div className="flex items-center gap-2">
                  <span>{k.icon}</span>
                  <span className="text-white text-sm">{k.name}</span>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </SectionLayout>
  );
}
