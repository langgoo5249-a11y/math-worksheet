import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SectionLayout from '@/app/_components/SectionLayout';
import { TEXTBOOKS, getTextbook } from '@/lib/textbookConfig';
import {
  generateCourseSchema,
  generateOpenGraph,
  generateTwitterCard,
  SITE_INFO,
} from '@/lib/seoUtils';

export function generateStaticParams() {
  const params: { version: string; grade: string }[] = [];
  for (const tb of TEXTBOOKS) {
    for (const g of tb.grades) {
      params.push({ version: tb.id, grade: `grade-${g.grade}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ version: string; grade: string }> }): Promise<Metadata> {
  const { version, grade } = await params;
  const tb = getTextbook(version);
  const gradeNum = parseInt(grade.replace('grade-', ''), 10);
  if (!tb) return { title: '教材未找到' };
  const gradeInfo = tb.grades.find((g) => g.grade === gradeNum);
  if (!gradeInfo) return { title: '年级未找到' };

  const pageUrl = `${SITE_INFO.BASE_URL}/textbook/${version}/${grade}/`;
  const title = `${tb.name}${gradeNum}年级${tb.scope[0]}同步练习_${tb.fullName}_免费下载打印 | 练学宝`;
  const description = `${tb.fullName}小学${gradeNum}年级${tb.scope.join('、')}下册上册同步练习卷免费下载，共${gradeInfo.units.length}个单元，按教材单元组织，与课堂进度完全同步，涵盖数学语文英语科学全科，支持PDF一键打印，配答案详解可重复打印，适合家长课后辅导和考前复习，永久免费无需注册。`;

  return {
    title,
    description,
    keywords: [
      `${tb.name}${gradeNum}年级`,
      `${tb.name}${gradeNum}年级${tb.scope[0]}练习`,
      `${tb.name}练习题`,
      `${tb.name}下册`,
      `${tb.name}同步练习`,
      `${tb.name}单元测试`,
      `${tb.name}免费试卷`,
      `${gradeNum}年级${tb.scope[0]}`,
      `${tb.name}${tb.scope.join('')}同步`,
      '小学教材同步练习',
    ],
    alternates: { canonical: pageUrl },
    openGraph: generateOpenGraph({ title, description, url: pageUrl, type: 'article' }),
    twitter: generateTwitterCard({ title, description }),
  };
}

// 根据教材版本和年级生成工具推荐
function getToolRecommendations(tbId: string, gradeNum: number, units: string[]) {
  const baseTools: { name: string; href: string; icon: string; desc: string }[] = [];

  // 数学练习卷 - 所有版本都有
  if (['pep', 'bsd', 'suer'].includes(tbId)) {
    baseTools.push({
      name: `${gradeNum}年级数学练习卷`,
      href: '/tools/math-worksheet',
      icon: '🧮',
      desc: `生成${gradeNum}年级四则运算、${gradeNum <= 2 ? '加减法' : gradeNum <= 4 ? '乘除法' : '分数小数'}练习卷，对应${units[0]}等单元。`,
    });
    baseTools.push({
      name: `${gradeNum}年级口算速练`,
      href: '/tools/mental-math',
      icon: '⚡',
      desc: `${gradeNum}年级计时口算训练，${gradeNum <= 2 ? '20以内加减法' : gradeNum <= 4 ? '100以内四则' : '200以内四则'}，自动统计正确率。`,
    });
  }

  // 语文相关
  if (['pep', 'bubian'].includes(tbId)) {
    baseTools.push({
      name: `${gradeNum}年级生字字帖`,
      href: '/tools/calligraphy',
      icon: '✍️',
      desc: `生成${gradeNum}年级语文生字描红字帖，田字格/米字格，楷体宋体黑体，PDF打印。`,
    });
    baseTools.push({
      name: `古诗词默写练习`,
      href: '/tools/poem-memo',
      icon: '📜',
      desc: `${gradeNum}年级必背古诗词填空默写，自动随机挖空，检验背诵效果。`,
    });
  }

  // 英语相关
  if (tbId === 'pep') {
    baseTools.push({
      name: `${gradeNum}年级英语字帖`,
      href: '/tools/english-calligraphy',
      icon: '🔤',
      desc: `${gradeNum}年级英语单词书写练习，衡水体/手写体，巩固课堂单词记忆。`,
    });
  }

  // 通用工具
  baseTools.push({
    name: `单元测试卷`,
    href: '/tools/unit-test',
    icon: '📋',
    desc: `自定义${gradeNum}年级单元测试卷，选择题型和难度，自动生成标准试卷。`,
  });

  return baseTools;
}

// 生成学期划分（通常上学期对应前4个单元，下学期对应后4个单元）
function getSemesterUnits(units: string[]) {
  const mid = Math.ceil(units.length / 2);
  return {
    firstSemester: units.slice(0, mid),
    secondSemester: units.slice(mid),
  };
}

// 生成扩展FAQ
function generateExtendedFaqs(tb: ReturnType<typeof getTextbook>, gradeNum: number, units: string[]) {
  if (!tb) return [];

  const semesterUnits = getSemesterUnits(units);
  const scopeStr = tb.scope.join('、');

  return [
    {
      q: `${tb.name}${gradeNum}年级${tb.scope[0]}教材有哪些单元？`,
      a: `${tb.fullName}${gradeNum}年级${tb.scope[0]}共${units.length}个单元：${units.join('、')}。其中上学期主要学习${semesterUnits.firstSemester.join('、')}；下学期主要学习${semesterUnits.secondSemester.join('、')}。每个单元均可在练学宝免费下载同步练习卷。`,
    },
    {
      q: `${tb.name}${gradeNum}年级${tb.scope[0]}上下册分别学什么？`,
      a: `上册（上学期）学习${semesterUnits.firstSemester.join('、')}；下册（下学期）学习${semesterUnits.secondSemester.join('、')}。家长可以根据学期进度使用练学宝的单元测试卷进行针对性检测。`,
    },
    {
      q: `${tb.name}${gradeNum}年级${scopeStr}练习卷在哪里下载？`,
      a: `练学宝提供${tb.name}${gradeNum}年级${scopeStr}全套练习卷免费下载。点击本页面的配套工具（数学练习卷生成器、单元测试卷、口算速练等），即可生成与教材同步的练习题，支持PDF下载A4打印，无需注册完全免费。`,
    },
    {
      q: `${tb.name}和其他版本教材有什么区别？`,
      a: `${tb.fullName}。与其他版本（北师大版、苏教版等）在知识点的编排顺序和侧重点上有差异，但核心知识点（四则运算、几何初步、分数等）基本一致。练学宝同时支持人教版、北师大版、苏教版和部编版四个版本。`,
    },
    {
      q: `如何利用练学宝做${tb.name}${gradeNum}年级课后辅导？`,
      a: `三步法：①每天课后用口算速练做5-10分钟计时训练；②每学完一个单元用单元测试卷检测掌握情况；③考前用数学练习卷生成器做综合模拟。所有工具免费，配套${tb.name}教材体系。`,
    },
    {
      q: `${tb.name}${gradeNum}年级期中考试范围是哪些单元？`,
      a: `一般情况下，${gradeNum}年级上学期期中考试范围为${semesterUnits.firstSemester.slice(0, Math.ceil(semesterUnits.firstSemester.length / 2)).join('、')}等前半部分单元；下学期期中考试范围为${semesterUnits.secondSemester.slice(0, Math.ceil(semesterUnits.secondSemester.length / 2)).join('、')}等。可使用练学宝单元测试卷工具针对性备考。`,
    },
  ];
}

export default async function TextbookGradePage({ params }: { params: Promise<{ version: string; grade: string }> }) {
  const { version, grade } = await params;
  const tb = getTextbook(version);
  const gradeNum = parseInt(grade.replace('grade-', ''), 10);
  if (!tb) notFound();
  const gradeInfo = tb.grades.find((g) => g.grade === gradeNum);
  if (!gradeInfo) notFound();

  const pageUrl = `${SITE_INFO.BASE_URL}/textbook/${version}/${grade}/`;
  const tools = getToolRecommendations(tb.id, gradeNum, gradeInfo.units);
  const semesterUnits = getSemesterUnits(gradeInfo.units);
  const faqs = generateExtendedFaqs(tb, gradeNum, gradeInfo.units);

  const courseSchema = generateCourseSchema({
    name: `${tb.name} ${gradeNum}年级 ${tb.scope[0]}同步练习`,
    description: `${tb.fullName}小学${gradeNum}年级${tb.scope.join('、')}同步练习。按${gradeNum}年级教材单元编排：${gradeInfo.units.join('、')}。配套${tb.scope.join('、')}等学科${tb.scope.length}科同步练习。`,
    url: pageUrl,
    educationalLevel: `小学${gradeNum}年级（中国${tb.name}）`,
    teaches: [
      ...tb.scope,
      `${gradeNum}年级单元同步练习`,
      `${tb.name}教材同步`,
      'PDF练习卷打印',
    ],
  });

  const faqSchema = faqs.length > 0 ? {
    '@type': 'FAQPage' as const,
    'mainEntity': faqs.map((f) => ({
      '@type': 'Question' as const,
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer' as const, 'text': f.a },
    })),
  } : null;

  return (
    <SectionLayout
      path={pageUrl}
      breadcrumb={[
        { label: '首页', href: '/' },
        { label: '教程同步', href: '/textbook' },
        { label: tb.name },
        { label: `${gradeNum}年级` },
      ]}
      icon="📖"
      title={`${tb.name} · ${gradeNum}年级同步练习`}
      description={`${tb.fullName}小学${gradeNum}年级${tb.scope.join('、')}同步练习。按教材单元编排，共${gradeInfo.units.length}个单元。配套练习卷免费下载打印，与课堂进度完全同步。`}
      keywords={[
        `${tb.name}${gradeNum}年级`,
        `${tb.name}${gradeNum}年级${tb.scope[0]}练习`,
        `${tb.name}练习题下载`,
        `${tb.name}同步练习`,
        `${tb.name}单元测试`,
        `${tb.name}免费试卷`,
        `小学${gradeNum}年级${tb.scope[0]}`,
      ]}
      jsonLd={[courseSchema, ...(faqSchema ? [faqSchema] : [])]}
      summary={`${tb.name}${gradeNum}年级${tb.scope.join('、')}同步练习专题：本页按${tb.fullName}${gradeNum}年级教材单元编排，覆盖${tb.scope.join('、')}共${tb.scope.length}个学科，全册共${gradeInfo.units.length}个单元。提供配套PDF练习卷免费下载、单元测试自动生成、口算速练每日训练。所有内容由练学宝教学团队按教学大纲整理，免费、即时、可打印。${gradeNum === 6 ? '六年级面临小升初，本页提供全册总复习资源。' : `${gradeNum + 1}年级是下一步，本页帮孩子打好基础。`}`}
      keyPoints={[
        `📖 严格对齐${tb.name}${gradeNum}年级教材大纲，共${gradeInfo.units.length}个单元`,
        `📐 配套${tb.scope.join('、')}共${tb.scope.length}个学科同步练习`,
        `🖨️ 数学练习卷、单元测试卷、口算速练等工具即时生成同类练习题`,
        `📥 全部PDF免费下载打印，无需注册，永久免费`,
        `👨‍👩‍👧 适合家长辅导作业、孩子自主学习、教师课堂教学备课使用`,
      ]}
    >
      {/* ========== 教材概览 ========== */}
      <section className="mb-8 p-5 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/20 rounded-2xl">
        <p className="text-slate-200 leading-relaxed text-sm sm:text-base">{tb.description}</p>
        <div className="flex flex-wrap gap-3 mt-4 text-xs sm:text-sm">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
            出版社：{tb.publisher}
          </span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
            学科：{tb.scope.join('、')}
          </span>
          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full">
            {gradeInfo.units.length}个单元
          </span>
        </div>
      </section>

      {/* ========== 上下学期单元划分 ========== */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          📅 {tb.name}{gradeNum}年级上下册单元划分
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
            <h3 className="text-lg font-semibold text-orange-300 mb-3 flex items-center gap-2">
              🍂 上学期（上册）
            </h3>
            <div className="space-y-2">
              {semesterUnits.firstSemester.map((unit, idx) => (
                <div key={unit} className="flex items-center gap-3 p-3 bg-slate-800/40 border border-white/5 rounded-lg">
                  <span className="shrink-0 w-7 h-7 bg-orange-500/20 text-orange-300 rounded-full flex items-center justify-center text-xs font-medium">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-white font-medium">{unit}</span>
                  </div>
                  {tb.scope.includes('数学') && (
                    <Link
                      href="/tools/math-worksheet/"
                      className="shrink-0 text-xs text-orange-300 hover:text-orange-200 bg-orange-500/10 px-2 py-1 rounded"
                    >
                      练一练
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-2xl">
            <h3 className="text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
              🌱 下学期（下册）
            </h3>
            <div className="space-y-2">
              {semesterUnits.secondSemester.map((unit, idx) => (
                <div key={unit} className="flex items-center gap-3 p-3 bg-slate-800/40 border border-white/5 rounded-lg">
                  <span className="shrink-0 w-7 h-7 bg-green-500/20 text-green-300 rounded-full flex items-center justify-center text-xs font-medium">
                    {semesterUnits.firstSemester.length + idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-white font-medium">{unit}</span>
                  </div>
                  {tb.scope.includes('数学') && (
                    <Link
                      href="/tools/math-worksheet/"
                      className="shrink-0 text-xs text-green-300 hover:text-green-200 bg-green-500/10 px-2 py-1 rounded"
                    >
                      练一练
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-400">
          💡 每学完一个单元，点击右侧"练一练"即可生成对应难度练习卷。也可使用<a href="/tools/unit-test/" className="text-blue-400 hover:text-blue-300">单元测试卷工具</a>做整章检测。
        </p>
      </section>

      {/* ========== 全部单元列表（完整索引） ========== */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          📋 {tb.name}{gradeNum}年级全部单元列表
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {gradeInfo.units.map((unit, idx) => (
            <div
              key={unit}
              className="flex items-center gap-3 p-4 bg-slate-800/50 border border-white/10 rounded-lg hover:border-blue-500/30 transition-colors"
            >
              <span className="shrink-0 w-8 h-8 bg-blue-500/20 text-blue-300 rounded-full flex items-center justify-center text-sm font-medium">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-white text-sm">{unit}</span>
                <div className="flex gap-2 mt-1">
                  {tb.scope.includes('数学') && (
                    <Link href="/tools/math-worksheet/" className="text-xs text-blue-400 hover:text-blue-300">
                      数学练习
                    </Link>
                  )}
                  {tb.scope.includes('语文') && (
                    <Link href="/tools/calligraphy/" className="text-xs text-purple-400 hover:text-purple-300">
                      生字练习
                    </Link>
                  )}
                  {(tb.scope.includes('语文') || tb.scope.includes('英语')) && (
                    <Link href="/tools/unit-test/" className="text-xs text-green-400 hover:text-green-300">
                      单元测试
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 配套学习工具 ========== */}
      <section className="mb-10 p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-purple-300 mb-4">
          🛠️ {tb.name}{gradeNum}年级配套学习工具
        </h2>
        <p className="text-sm text-slate-300 mb-5">
          以下工具均与{tb.name}{gradeNum}年级教材内容同步，可用于课后练习、单元复习及考前冲刺。
          全部免费，无需注册，点击即可使用。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-start gap-3 p-4 bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 hover:border-purple-500/40 rounded-xl transition-all"
            >
              <span className="text-2xl shrink-0">{tool.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white group-hover:text-purple-300 transition-colors text-sm">
                  {tool.name}
                </div>
                <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {tool.desc}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400 text-center">
          💡 以上工具完全免费，生成的练习卷和试卷均可下载PDF打印，与{tb.name}教材体系完全同步。
        </p>
      </section>

      {/* ========== 学习建议 ========== */}
      <section className="mb-10 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
        <h2 className="text-xl font-bold text-yellow-300 mb-4">
          💡 {tb.name}{gradeNum}年级学习建议
        </h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="text-xl shrink-0">📅</span>
            <div>
              <h3 className="text-white font-medium text-sm mb-1">每日练习计划</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                每天{gradeNum <= 2 ? '15-20分钟' : gradeNum <= 4 ? '25-30分钟' : '30-40分钟'}：
                口算速练{tb.scope.includes('数学') ? '5-10分钟' : ''}
                {tb.scope.includes('语文') ? ' + 生字练习10分钟' : ''}
                {tb.scope.includes('英语') ? ' + 英语单词5分钟' : ''}。
                每学完一个单元立即做单元检测，及时发现问题。
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-xl shrink-0">🎯</span>
            <div>
              <h3 className="text-white font-medium text-sm mb-1">考前复习策略</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {gradeNum <= 2
                  ? '期中/期末前两周，每天打印1-2张数学练习卷做回顾。低年级重在习惯养成，不要追求难题。'
                  : gradeNum <= 4
                  ? '考试前一周集中做3-5套单元测试卷，重点标记错题类型（计算错误/审题不清/知识遗漏），针对性补强。'
                  : '考前一个月开始系统复习：第1-2周回顾所有单元知识点，第3周做真题模拟卷，第4周查漏补缺。'}{gradeNum === 6 ? '小升初复习建议从六年级上学期就开始准备，不要等到下学期才冲刺。' : ''}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-xl shrink-0">👨‍👩‍👧</span>
            <div>
              <h3 className="text-white font-medium text-sm mb-1">家长辅导要点</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                了解{tb.name}教材编排特点是高效辅导的前提。{tb.description.split('。')[0]}。
                建议家长先浏览本页单元列表，对孩子本学期要学的内容心中有数，再借助练学宝的免费工具陪伴练习。
                {gradeNum <= 2
                  ? '低年级重点是培养兴趣，多鼓励少批评。'
                  : gradeNum <= 4
                  ? '中年级开始出现知识分化，及时关注薄弱学科。'
                  : '高年级面临升学压力，合理安排练习时间不过度疲劳。'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 其他年级切换 ========== */}
      <section className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          🔗 {tb.name}其他年级
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {tb.grades.map((g) => (
            <Link
              key={g.grade}
              href={`/textbook/${tb.id}/grade-${g.grade}`}
              aria-label={`${tb.name}${g.grade}年级同步练习，${tb.scope.join('、')}等${tb.scope.length}个学科`}
              className={`p-3 text-center rounded-lg border transition-all text-sm ${
                g.grade === gradeNum
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 font-medium'
                  : 'bg-slate-800/50 border-white/10 text-slate-300 hover:bg-slate-700/70 hover:border-blue-500/50'
              }`}
            >
              {g.grade}年级
            </Link>
          ))}
        </div>
      </section>

      {/* ========== 其他教材版本 ========== */}
      <section className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          📚 其他教材版本{gradeNum}年级同步
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TEXTBOOKS.filter((v) => v.id !== tb.id).map((v) => {
            const hasGrade = v.grades.some((g) => g.grade === gradeNum);
            return hasGrade ? (
              <Link
                key={v.id}
                href={`/textbook/${v.id}/grade-${gradeNum}`}
                className="p-3 text-center bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-lg transition-all text-sm text-slate-300"
              >
                {v.name}{gradeNum}年级
              </Link>
            ) : (
              <Link
                key={v.id}
                href={`/textbook/${v.id}`}
                className="p-3 text-center bg-slate-800/50 hover:bg-slate-700/70 border border-white/10 hover:border-blue-500/50 rounded-lg transition-all text-sm text-slate-300"
              >
                {v.name}
              </Link>
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">
          练学宝同时支持人教版、北师大版、苏教版和部编版，点击查看对应版本{gradeNum}年级同步练习。
        </p>
      </section>

      {/* ========== FAQ区（GEO关键） ========== */}
      {faqs.length > 0 && (
        <section className="mb-6 p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4">
            ❓ {tb.name}{gradeNum}年级常见问题
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group p-4 bg-slate-900/50 border border-white/5 hover:border-white/10 rounded-lg transition-colors"
                open={i === 0}
              >
                <summary className="cursor-pointer text-white font-medium hover:text-blue-300 list-none flex items-center justify-between text-sm sm:text-base">
                  <span>{faq.q}</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-2">▼</span>
                </summary>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed pl-2 border-l-2 border-blue-500/30">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-400">
            📌 更多教程同步问题？查看<a href="/textbook/" className="text-blue-400 hover:text-blue-300">所有教材版本</a>或访问<a href="/blog/" className="text-blue-400 hover:text-blue-300">练学宝博客</a>。
          </p>
        </section>
      )}

      {/* ========== 底部SEO关键词区域 ========== */}
      <section className="sr-only">
        <h2>{tb.name}{gradeNum}年级{tb.scope.join('')}同步练习下载</h2>
        <p>
          练学宝提供{tb.fullName}{gradeNum}年级{tb.scope.join('、')}同步练习卷免费下载。
          包含{gradeInfo.units.join('、')}共{gradeInfo.units.length}个单元，每个单元配套练习题和测试卷，
          全部PDF格式可A4纸打印。支持{tb.name}{gradeNum}年级{tb.scope[0]}下册、上册练习卷生成，
          {tb.scope.join('、')}单元测试卷，口算题免费打印。适合{tb.name}教材使用地区的学生家长和老师使用。
        </p>
      </section>
    </SectionLayout>
  );
}