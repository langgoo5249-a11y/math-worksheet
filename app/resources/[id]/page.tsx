import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionLayout from '@/app/_components/SectionLayout';
import RelatedTools from '@/app/_components/RelatedTools';
import ShareButtons from '@/app/_components/ShareButtons';
import { getAllResources, getResourceById, GRADE_LIST } from '@/lib/resourcesConfig';
import { TOOLS } from '@/lib/toolRegistry';
import {
  generateLearningResourceSchema,
  generateOpenGraph,
  generateTwitterCard,
  SITE_INFO,
} from '@/lib/seoUtils';

export async function generateStaticParams() {
  return getAllResources().map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const r = getResourceById(id);
  if (!r) return { title: '资源未找到' };
  const pageUrl = `${SITE_INFO.BASE_URL}/resources/${r.id}/`;
  const gradeName = GRADE_LIST.find(g => g.grade === r.grade)?.name || '';
  const title = `${r.title} - 免费PDF下载 | 练学宝`;
  const description = `${r.description} 包含${r.questionCount}道题、${r.pageCount}页，适合${gradeName}${r.knowledgePoint}专项练习。`;

  return {
    title,
    description,
    keywords: [r.title, ...r.tags, `${gradeName}${r.knowledgePoint}`, '小学练习卷', 'PDF下载'],
    alternates: { canonical: pageUrl },
    openGraph: generateOpenGraph({ title, description, url: pageUrl, type: 'article' }),
    twitter: generateTwitterCard({ title, description }),
  };
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = getResourceById(id);
  if (!r) notFound();

  const pageUrl = `${SITE_INFO.BASE_URL}/resources/${r.id}/`;
  const gradeName = GRADE_LIST.find(g => g.grade === r.grade)?.name || '';
  const subjectName = { math: '数学', chinese: '语文', english: '英语', science: '科学' }[r.subject];

  const learningResourceSchema = generateLearningResourceSchema({
    name: r.title,
    description: `${r.description} 适合${gradeName}${r.knowledgePoint}专项练习。`,
    url: pageUrl,
    educationalLevel: `${gradeName}（小学${r.grade}年级）`,
    learningResourceType: '练习卷/练习册',
    teaches: [r.knowledgePoint, ...(r.tags || [])],
    keywords: [r.title, ...r.tags],
  });

  const faqs = [
    {
      q: `${r.title}包含多少道题？`,
      a: `本练习卷共${r.pageCount}页、${r.questionCount}道精选题目，预计完成时间${r.estimatedTime}。题目按${r.knowledgePoint}知识点的难易梯度编排，建议每周1-2次、连续4周完成练习，可显著提升${r.knowledgePoint}的掌握程度。`,
    },
    {
      q: `这份练习卷适合哪个年级？`,
      a: `本练习卷专为${gradeName}${r.knowledgePoint}设计，难度等级为${r.difficulty}。如孩子觉得题目偏难或偏易，可调整进度或先练习相邻难度的题目。`,
    },
    {
      q: `如何打印练习卷？`,
      a: '推荐使用A4纸打印本PDF练习卷。打印设置请选择「实际大小」和「无边距」以获得最佳效果。建议家长先打印一份样张检查排版，确认无误后再批量打印。',
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
      path={`/resources/${r.id}/`}
      breadcrumb={[
        { label: '首页', href: '/' },
        { label: '资源库', href: '/resources' },
        { label: r.title },
      ]}
      icon={r.subject === 'math' ? '🧮' : r.subject === 'chinese' ? '📖' : '🔤'}
      title={r.title}
      description={r.description}
      keywords={[r.title, ...r.tags, `${gradeName}${r.knowledgePoint}`, '小学练习卷', 'PDF下载']}
      jsonLd={[learningResourceSchema, faqSchema]}
      summary={`${r.title}：${gradeName}${r.knowledgePoint}专项练习卷，${r.pageCount}页、${r.questionCount}道题、难度${r.difficulty}、预计${r.estimatedTime}完成。配套练学宝${subjectName}相关工具使用效果更佳，支持PDF免费下载打印。`}
      keyPoints={[
        `📚 ${gradeName} · ${subjectName} · ${r.knowledgePoint}专项练习`,
        `✏️ ${r.questionCount}道精选题 · ${r.pageCount}页 · 难度${r.difficulty}`,
        `⏱ 预计完成时间：${r.estimatedTime}`,
        `🛠️ 配套工具：${r.subject === 'math' ? '数学练习卷生成器、口算速练' : r.subject === 'chinese' ? '字帖生成器、拼音注音、作文模板' : '英语字帖生成器、单词卡片'}`,
        `📥 PDF免费下载打印 · 无需注册 · 永久免费`,
      ]}
    >
      {/* 资源信息卡片 */}
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
          <div className="text-xs text-slate-400">年级</div>
          <div className="text-lg font-bold text-blue-300 mt-1">{gradeName}</div>
        </div>
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center">
          <div className="text-xs text-slate-400">学科</div>
          <div className="text-lg font-bold text-purple-300 mt-1">{subjectName}</div>
        </div>
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
          <div className="text-xs text-slate-400">题量</div>
          <div className="text-lg font-bold text-emerald-300 mt-1">{r.questionCount}题</div>
        </div>
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg text-center">
          <div className="text-xs text-slate-400">页数</div>
          <div className="text-lg font-bold text-orange-300 mt-1">{r.pageCount}页</div>
        </div>
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-center">
          <div className="text-xs text-slate-400">难度</div>
          <div className="text-lg font-bold text-rose-300 mt-1">{r.difficulty}</div>
        </div>
      </section>

      {/* 知识点与预计时间 */}
      <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-3">📚 知识点与使用建议</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-slate-400 mb-1">核心知识点</div>
            <div className="text-white font-medium">{r.knowledgePoint}</div>
          </div>
          <div>
            <div className="text-slate-400 mb-1">预计完成时间</div>
            <div className="text-white font-medium">{r.estimatedTime}</div>
          </div>
          <div>
            <div className="text-slate-400 mb-1">建议频率</div>
            <div className="text-white font-medium">每周1-2次，持续4周</div>
          </div>
          <div>
            <div className="text-slate-400 mb-1">配套工具</div>
            <div className="text-white font-medium">
              {r.subject === 'math' && '数学练习卷生成器、口算速练'}
              {r.subject === 'chinese' && '字帖生成器、拼音注音、作文模板'}
              {r.subject === 'english' && '英语字帖生成器'}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {r.tags.map((t) => (
            <span key={t} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">#{t}</span>
          ))}
        </div>
      </section>

      {/* 操作按钮区 */}
      <section className="mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">🚀 立即开始练习</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {r.subject === 'math' && (
            <>
              <Link href="/tools/math-worksheet" className="block p-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">🧮</div>
                <div className="text-white font-medium text-sm">生成同类练习</div>
                <div className="text-xs text-slate-400 mt-1">数学练习卷生成器</div>
              </Link>
              <Link href="/tools/mental-math" className="block p-4 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-white font-medium text-sm">在线口算</div>
                <div className="text-xs text-slate-400 mt-1">口算速练</div>
              </Link>
              <Link href="/tools/unit-test" className="block p-4 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">📋</div>
                <div className="text-white font-medium text-sm">单元测试</div>
                <div className="text-xs text-slate-400 mt-1">单元测试卷</div>
              </Link>
            </>
          )}
          {r.subject === 'chinese' && (
            <>
              <Link href="/tools/calligraphy" className="block p-4 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">✍️</div>
                <div className="text-white font-medium text-sm">字帖练习</div>
                <div className="text-xs text-slate-400 mt-1">字帖生成器</div>
              </Link>
              <Link href="/tools/pinyin" className="block p-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">📝</div>
                <div className="text-white font-medium text-sm">拼音注音</div>
                <div className="text-xs text-slate-400 mt-1">拼音练习生成器</div>
              </Link>
              <Link href="/tools/writing-template" className="block p-4 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">📄</div>
                <div className="text-white font-medium text-sm">作文模板</div>
                <div className="text-xs text-slate-400 mt-1">看图写话/作文</div>
              </Link>
            </>
          )}
          {r.subject === 'english' && (
            <>
              <Link href="/tools/english-calligraphy" className="block p-4 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">🔤</div>
                <div className="text-white font-medium text-sm">英语字帖</div>
                <div className="text-xs text-slate-400 mt-1">四线三格练习</div>
              </Link>
              <Link href="/tools/flashcards" className="block p-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">🃏</div>
                <div className="text-white font-medium text-sm">单词卡片</div>
                <div className="text-xs text-slate-400 mt-1">识字卡片</div>
              </Link>
              <Link href="/tools/unit-test" className="block p-4 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-center transition-colors">
                <div className="text-2xl mb-1">📋</div>
                <div className="text-white font-medium text-sm">英语测试</div>
                <div className="text-xs text-slate-400 mt-1">单元测试卷</div>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* 知识点说明 */}
      <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-3">💡 {r.knowledgePoint} 学习要点</h2>
        <div className="text-slate-300 text-sm space-y-2 leading-relaxed">
          {r.subject === 'math' && r.knowledgePoint === '10以内加减法' && (
            <>
              <p>10以内加减法是一年级数学的起点，孩子需要通过<strong>实物操作</strong>（如小棒、计数器）理解加减法含义，再过渡到抽象计算。</p>
              <p>练习建议：每天10-15题，配合<Link href="/knowledge/凑十法" className="text-blue-400 hover:underline">凑十法</Link>等技巧，1-2周可熟练掌握。</p>
            </>
          )}
          {r.subject === 'math' && r.knowledgePoint === '凑十法' && (
            <>
              <p>凑十法是20以内进位加法的核心方法：把<strong>小数凑成10</strong>，再加上余下的数。例如 9+5=9+1+4=10+4=14。</p>
              <p>练习建议：先练"拆小数"（把5拆成1和4），再练"凑十"一步到位。配合<Link href="/knowledge/凑十法" className="text-blue-400 hover:underline">凑十法专题</Link>效果更佳。</p>
            </>
          )}
          {r.subject === 'math' && r.knowledgePoint === '乘法口诀' && (
            <>
              <p>九九乘法表是二年级数学的<strong>基石</strong>，所有后续的乘除法、面积、单位换算都依赖于此。</p>
              <p>练习建议：先理解乘法的"几个几"含义，再背诵口诀，最后通过反复练习达到<strong>脱口而出</strong>。</p>
            </>
          )}
          {r.subject === 'math' && r.knowledgePoint === '万以内加减法' && (
            <>
              <p>万以内加减法是三年级数学的<strong>核心</strong>，需要孩子掌握竖式计算的进位、退位、验算三大步骤。</p>
              <p>练习建议：先练<strong>相同数位对齐</strong>，再练进位/退位的标记，最后用<strong>逆运算</strong>验算。</p>
            </>
          )}
          {r.subject === 'math' && r.knowledgePoint === '简易方程' && (
            <>
              <p>解简易方程是<strong>代数思维</strong>的起点，孩子需要从"算术思维"过渡到"代数思维"。</p>
              <p>练习建议：理解"方程是等式"的基础上，掌握"移项变号"规则，反复练习直到熟练。</p>
            </>
          )}
          {r.subject === 'math' && r.knowledgePoint === '百分数应用题' && (
            <>
              <p>百分数应用题是<strong>小升初</strong>的必考题型，包括：求一个数比另一个数多/少百分之几、折扣、纳税、利息等。</p>
              <p>练习建议：先理解百分数的含义（表示一个数是另一个数的百分之几），再分类型练习。</p>
            </>
          )}
          {r.subject === 'chinese' && r.knowledgePoint === '声母韵母' && (
            <>
              <p>声母（23个）和韵母（24个）是拼音的基础，需要孩子<strong>认读 + 书写</strong>双向掌握。</p>
              <p>练习建议：先练声母表和韵母表的<strong>整体认读</strong>，再练四线三格的<strong>标准书写</strong>。</p>
            </>
          )}
          {r.subject === 'chinese' && r.knowledgePoint === '看图写话' && (
            <>
              <p>看图写话是<strong>二年级作文的起点</strong>，需要孩子观察图片 + 组织语言 + 完整表达。</p>
              <p>练习建议：使用<strong>时间+人物+事情+结果</strong>的四要素模板，参考范文但用自己的话写。</p>
            </>
          )}
          {r.subject === 'english' && r.knowledgePoint === '26个英语字母' && (
            <>
              <p>26个英文字母是英语学习的<strong>基石</strong>，需要掌握大小写、书写、发音、顺序。</p>
              <p>练习建议：先<strong>认读</strong>字母名称（音），再练<strong>书写</strong>（形），最后<strong>发音</strong>（字母在单词中的常见读音）。</p>
            </>
          )}
          {(!['math', 'chinese', 'english'].includes(r.subject) || !['10以内加减法', '凑十法', '乘法口诀', '万以内加减法', '简易方程', '百分数应用题', '声母韵母', '看图写话', '26个英语字母'].includes(r.knowledgePoint)) && (
            <p>这是一份针对{gradeName}{r.knowledgePoint}的专项练习，配合本站工具使用效果更佳。</p>
          )}
        </div>
      </section>

      {/* FAQ - 帮助 AI 引擎抓取 */}
      <section className="mb-8 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
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

      {/* 相关工具 */}
      <RelatedTools tools={TOOLS.slice(0, 6)} currentSlug="resources" />

      {/* 分享 */}
      <section className="mt-8">
        <ShareButtons
          url={`https://www.skillxm.cn/resources/${r.id}`}
          title={r.title}
        />
      </section>
    </SectionLayout>
  );
}
