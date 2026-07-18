'use client';

import Link from 'next/link';
import SiteLayout from '@/app/_components/SiteLayout';

const steps = [
  {
    id: 1,
    title: 'AI辅助初稿生成',
    description:
      '利用AI技术快速生成练习题、知识点讲解等内容的初稿，覆盖小学1-6年级数学核心知识点，确保内容结构完整、题型多样。',
    color: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    icon: '🤖',
  },
  {
    id: 2,
    title: '一线教师内容审核',
    description:
      '由具有丰富教学经验的一线数学教师对AI生成的内容进行逐题审核，排查知识点错误、难度不当、表述不清等问题，确保内容准确无误。',
    color: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    icon: '👩‍🏫',
  },
  {
    id: 3,
    title: '课程标准对齐检查',
    description:
      '对照人教版、北师大版、苏教版、青岛版等主流教材，以及《义务教育数学课程标准（2022年版）》对内容进行逐项对齐，确保难度、范围和进度符合课标要求。',
    color: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    icon: '📋',
  },
  {
    id: 4,
    title: '独家案例与实操补充',
    description:
      '结合课堂实际教学场景和多年辅导经验，为每个知识点补充独家解题思路、易错题分析和实操案例，让内容不仅"准确"，而且"好用"。',
    color: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    icon: '🌟',
  },
];

const qualityStandards = [
  {
    title: '准确性',
    description:
      '所有题目答案、知识点表述均经过教师人工审核，确保无知识性错误。每一道练习题都经过至少两轮核对。',
    icon: '✅',
  },
  {
    title: '实用性',
    description:
      '内容紧贴课堂实际需求，练习卷可直接打印使用，知识点讲解通俗易懂，方便家长辅导孩子学习。',
    icon: '🛠️',
  },
  {
    title: '可读性',
    description:
      '语言简练清晰，版面布局合理，符合小学生认知水平。避免使用过于专业的术语，必要时配有通俗解释。',
    icon: '📖',
  },
  {
    title: '时效性',
    description:
      '紧跟最新课程标准和教材版本更新，及时调整和优化内容。定期回顾已发布内容，确保不落后于教育改革步伐。',
    icon: '🔄',
  },
  {
    title: '原创性',
    description:
      '所有内容均为原创或深度改编，拒绝简单搬运和抄袭。每道题目、每个知识点都经过深度加工和个性化处理。',
    icon: '💡',
  },
  {
    title: '独家性',
    description:
      '结合一线教学经验，提供市场独家的解题技巧、易错题分析和实操案例，这些内容来源于真实课堂反馈，具有不可替代的教学价值。',
    icon: '🔑',
  },
];

export default function EditorialPolicyPage() {
  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* ===== 页面标题 ===== */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            编辑政策与内容审核流程
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            练学宝致力于为家长和老师提供准确、可靠、符合课程标准的教育内容
          </p>
          <p className="text-gray-500 text-sm mt-2">最后更新日期：2026年7月18日</p>
        </div>

        {/* ===== 核心承诺 ===== */}
        <section className="mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">🎯</span> 核心承诺
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              练学宝深知教育内容的准确性对学生学习的深远影响。我们坚持
              <span className="text-blue-400 font-medium">"AI辅助 + 人工把关"</span>
              的双重保障机制，确保平台上发布的每一道练习题、每一个知识点讲解都经过严格审核。
            </p>
            <p className="text-gray-300 leading-relaxed mb-3">
              我们的编辑团队由一线小学数学教师和教育内容专家组成，他们将多年课堂教学经验与AI技术的高效产出能力相结合，在保证内容质量的前提下，持续为家长和老师提供丰富的学习资源。
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-gray-300 ml-2">
              <li>所有内容均由一线教师逐题审核，不做"AI一键生成直接发布"</li>
              <li>内容审核覆盖4个主流教材版本，对齐最新课程标准</li>
              <li>每道练习题都经过至少两道审核工序</li>
              <li>定期回顾和更新已发布内容，保证时效性</li>
            </ul>
          </div>
        </section>

        {/* ===== 四步审核流程 ===== */}
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-xl">⚙️</span> 四步审核流程
            </h2>
            <p className="text-gray-400 text-sm">
              练学宝的内容从生成到发布，遵循以下严格的四步审核流程：
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`bg-gradient-to-br ${step.color} ${step.border} border rounded-2xl p-4 sm:p-6 relative`}
              >
                {/* 步骤编号 */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
                  {step.id}
                </div>

                {/* 图标 */}
                <div className="text-3xl mb-3">{step.icon}</div>

                {/* 标题 */}
                <h3 className={`text-lg font-bold ${step.text} mb-2`}>
                  {step.title}
                </h3>

                {/* 描述 */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* 流程箭头（移动端隐藏） */}
          <div className="hidden sm:flex items-center justify-center gap-2 mt-4 text-gray-500 text-xs">
            <span>AI初稿</span>
            <span className="text-blue-400">→</span>
            <span>教师审核</span>
            <span className="text-emerald-400">→</span>
            <span>课标对齐</span>
            <span className="text-amber-400">→</span>
            <span>实操补充</span>
            <span className="text-purple-400">→</span>
            <span className="text-white font-medium">发布</span>
          </div>
        </section>

        {/* ===== 内容质量标准 ===== */}
        <section className="mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-xl">📊</span> 内容质量标准
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              练学宝的内容遵循以下六大质量标准，每一项都是我们衡量内容是否合格的重要维度：
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {qualityStandards.map((standard) => (
                <div
                  key={standard.title}
                  className="bg-slate-900/50 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{standard.icon}</span>
                    <h3 className="text-white font-bold">{standard.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {standard.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 作者团队介绍 ===== */}
        <section className="mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">👥</span> 作者团队介绍
            </h2>

            {/* 主要作者：陈老师 */}
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-4 sm:p-6 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl shrink-0">
                  👩‍🏫
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">
                    陈老师 <span className="text-blue-400 text-sm font-normal">—— 主编 & 首席内容审核</span>
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    拥有超过15年小学数学一线教学经验，长期担任班主任和数学教研组长。熟悉人教版、北师大版、苏教版、青岛版等多套教材体系，对小学各年级数学知识点衔接和教学难点有深刻理解。
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    陈老师负责练学宝所有教育内容的最终审核把关，确保每一道练习题、每一个知识点讲解都符合教学实际，能够真正帮助孩子巩固知识、提升能力。
                  </p>
                </div>
              </div>
            </div>

            {/* 团队其他说明 */}
            <p className="text-gray-300 leading-relaxed mb-3">
              除陈老师外，练学宝还汇聚了多位一线数学教师和教育内容创作者，他们分别负责不同年级和知识板块的内容审核工作。团队成员均具有：
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-gray-300 ml-2">
              <li>5年以上小学数学教学经验</li>
              <li>熟悉主流教材版本和课程标准</li>
              <li>了解小学生常见学习误区和易错点</li>
              <li>具备教育内容编写和审核能力</li>
            </ul>
          </div>
        </section>

        {/* ===== AI使用声明 ===== */}
        <section className="mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">🤖</span> AI使用声明
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              练学宝在内容生产过程中使用AI技术作为辅助工具，以提高内容产出效率。但我们始终坚持以下原则：
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-lg shrink-0 mt-0.5">1.</span>
                <div>
                  <h3 className="text-white font-medium mb-1">AI仅负责初稿，不直接发布</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    AI生成的内容仅作为初稿，必须经过一线教师的人工审核和修改后才能发布。我们不会将AI直接生成的内容未经审核就交付给用户。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-lg shrink-0 mt-0.5">2.</span>
                <div>
                  <h3 className="text-white font-medium mb-1">人工审核比例达到100%</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    平台上所有练习题、知识点讲解、家长指导文章等内容，均经过至少一位一线教师的完整审核。AI是工具，教师是质量保障的核心。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-lg shrink-0 mt-0.5">3.</span>
                <div>
                  <h3 className="text-white font-medium mb-1">持续优化AI辅助流程</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    我们持续收集教师审核过程中的反馈，不断优化AI提示词和生成策略，以提高AI初稿的质量，减少教师审核的工作量，但不会因此降低审核标准。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-lg shrink-0 mt-0.5">4.</span>
                <div>
                  <h3 className="text-white font-medium mb-1">独有的教学经验不可替代</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    练学宝的独家解题技巧、易错题分析和实操案例均来源于一线教师的教学经验积累，这些内容无法由AI生成，是我们内容的核心竞争力。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 反馈与联系我们 ===== */}
        <section>
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">📬</span> 反馈与联系我们
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              我们非常重视用户的反馈意见。如果您发现任何内容错误、有改进建议，或希望加入我们的作者团队，欢迎通过以下方式联系我们：
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-blue-400 text-lg">📧</span>
                <a
                  href="mailto:lang@skillxm.cn"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  lang@skillxm.cn
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-400 text-lg">🌐</span>
                <Link
                  href="/contact/"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  联系页面
                </Link>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              我们会在收到反馈后3个工作日内回复。对于内容纠错类反馈，我们将在核实后第一时间修正并更新。
            </p>
          </div>
        </section>

        {/* ===== 相关链接 ===== */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/about/" className="text-gray-400 hover:text-white transition-colors">
            关于我们
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="/privacy/" className="text-gray-400 hover:text-white transition-colors">
            隐私政策
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="/terms/" className="text-gray-400 hover:text-white transition-colors">
            服务条款
          </Link>
          <span className="text-gray-600">|</span>
          <Link href="/contact/" className="text-gray-400 hover:text-white transition-colors">
            联系我们
          </Link>
        </div>
      </div>

      {/* ===== JSON-LD 结构化数据 ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: '编辑政策与内容审核流程',
            description:
              '练学宝编辑政策：所有教育内容经一线教师审核，遵循AI辅助初稿+人工审核的流程，确保内容准确、可靠、符合课程标准。',
            url: 'https://www.skillxm.cn/editorial-policy/',
            publisher: { '@id': 'https://www.skillxm.cn/#organization' },
            dateModified: '2026-07-18',
            about: { '@type': 'Thing', name: '内容编辑政策' },
          }),
        }}
      />
    </SiteLayout>
  );
}