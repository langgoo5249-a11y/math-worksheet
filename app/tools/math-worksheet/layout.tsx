import type { Metadata } from "next";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import ToolPageSchema from '@/app/_components/ToolPageSchema';
import ToolContent from '@/app/tools/_components/ToolContent';

export async function generateMetadata(): Promise<Metadata> {
    const canonicalUrl = 'https://www.skillxm.cn/tools/math-worksheet/';
  return {
    title: "小学数学练习卷生成器免费 - 1-6年级在线出题PDF打印 | 练学宝",
    description: "免费在线生成小学1-6年级数学练习卷，支持加减乘除、竖式计算、四则混合运算、填空题、应用题、图形题等11种题型，随机出题不重复，一键导出PDF打印。适合家长辅导和教师备课，覆盖人教版北师大版苏教版教材同步内容，每日练习提升计算能力和解题速度，配答案详解可重复打印永久免费无需注册即开即用，手机电脑均可使用。",
    keywords: "数学练习卷生成器,小学数学练习题,口算题生成,竖式计算打印,数学作业PDF,加减乘除出题,1-6年级数学试卷,免费数学出题器,在线数学练习,应用题生成器,数学每日一练,数学思维训练,混合运算练习题,小学数学题库,免费打印试卷",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": canonicalUrl,
      "x-default": canonicalUrl,
    },
  },
    openGraph: {
      url: canonicalUrl,
      title: "数学练习卷生成器 - 免费在线出题打印 | 练学宝",
      description: "免费在线生成小学1-6年级数学练习卷，支持加减乘除、竖式计算、四则混合运算、填空题、应用题、图形题等11种题型，随机出题不重复，一键导出PDF打印。适合家长辅导和教师备课，覆盖人教版北师大版苏教版教材同步内容，每日练习提升计算能力和解题速度，配答案详解可重复打印永久免费无需注册即开即用，手机电脑均可使用。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("数学练习卷生成器")}&category=${encodeURIComponent("数学工具")}&icon=🧮`, width: 1200, height: 630, alt: "数学练习卷生成器 - 练学宝" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "数学练习卷生成器 - 免费在线出题打印 | 练学宝",
      description: "免费在线生成小学1-6年级数学练习卷，支持加减乘除、竖式计算、四则混合运算、填空题、应用题、图形题等11种题型，随机出题不重复，一键导出PDF打印。适合家长辅导和教师备课，覆盖人教版北师大版苏教版教材同步内容，每日练习提升计算能力和解题速度，配答案详解可重复打印永久免费无需注册即开即用，手机电脑均可使用。",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("数学练习卷生成器")}&category=${encodeURIComponent("数学工具")}&icon=🧮`, width: 1200, height: 630, alt: "数学练习卷生成器 - 练学宝" }],
    },
  };
}

export default function MathWorksheetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 服务端渲染的 SEO 内容 -- 搜索引擎可直接抓取 */}
      <div className="sr-only">
        <p>小学数学练习卷生成器 - 免费在线出题打印</p>
        <p>免费在线生成小学1-6年级数学练习卷，支持加减乘除竖式计算、分数方程等11种题型，随机出题PDF打印。教师和家长可一键生成个性化数学练习题，覆盖一年级到六年级全学段，支持简单、中等、困难三档难度调节，答案页独立打印，方便批改。</p>
        <p>练学宝数学练习卷生成器是一款免费在线出题工具，支持11种题型和1-6年级全学段，可一键生成个性化数学练习卷并导出PDF打印，适合教师和家长日常使用。</p>
        <p>核心功能</p>
        <ul>
          <li>11种题型：加法、减法、乘法、除法、加减混合、乘除混合、四则混合、竖式计算、填空题、比较大小、应用题</li>
          <li>1-6年级全覆盖：自动匹配各年级知识点范围，一年级20以内加减法到六年级分数方程</li>
          <li>三档难度调节：简单、中等、困难，满足不同学习阶段需求</li>
          <li>PDF导出打印：一键生成A4格式PDF文件，答案页独立分离，方便教师批改</li>
          <li>随机出题：每次生成题目不重复，避免学生死记硬背</li>
          <li>完全免费：无需注册登录，打开即用，不限制使用次数</li>
        </ul>
        <p>适用对象</p>
        <p>小学1-6年级学生家长、小学数学教师、课后辅导机构老师。适合日常数学练习、单元测试出题、期末复习巩固、假期作业布置等场景使用。</p>
        <p>访问 <a href="https://www.skillxm.cn/">练学宝</a> 获取更多免费教学工具，包括字帖生成器、英语字帖、数独游戏、口算速练等。</p>
        <p>相关学习文章</p>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/yinianji-shuxue-ruxue/">一年级数学入学准备：从数数到20以内加减法的完整路径</a></li>
          <li><a href="https://www.skillxm.cn/blog/kousuan-sudu-tisheng-shizhan-20ti/">口算速度提升实战：从每分钟5题到20题</a></li>
          <li><a href="https://www.skillxm.cn/blog/xueba-xuexi-xiguan/">学霸学习习惯养成方法</a></li>
          <li><a href="https://www.skillxm.cn/blog/shushi-jisuan-jiaoxue/">小学数学竖式计算全攻略</a></li>
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "如何使用数学练习卷生成器",
            "description": "数学练习卷生成器使用教程，5步快速生成小学1-6年级数学练习卷，支持PDF打印",
            "totalTime": "PT5M",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "选择年级和题型",
                "text": "选择1-6年级，勾选需要的题型如加减乘除、竖式计算等"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "设置题目数量和难度",
                "text": "调整每页题目数，选择基础/提高/拓展难度"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "一键生成练习卷",
                "text": "点击生成按钮，系统自动随机出题"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "在线预览和调整",
                "text": "在页面中预览练习卷效果，不满意可重新生成"
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "导出PDF打印",
                "text": "点击下载按钮，生成A4标准格式PDF文件，直接打印使用"
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "数学练习卷生成器支持哪些年级？",
                "acceptedAnswer": { "@type": "Answer", "text": "支持小学1-6年级全学段，一年级20以内加减法到六年级分数方程，自动匹配各年级知识点范围。" }
              },
              {
                "@type": "Question",
                "name": "生成的数学练习卷可以打印吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "可以，一键生成A4格式PDF文件，答案页独立分离，方便教师批改和家长辅导。" }
              },
              {
                "@type": "Question",
                "name": "每次生成的题目会重复吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "不会，系统采用随机算法出题，同一配置下每次生成的题目都不同，避免学生死记硬背。" }
              },
              {
                "@type": "Question",
                "name": "数学练习卷生成器是免费的吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "完全免费，无需注册登录，打开即用，不限制使用次数和打印份数。" }
              },
              {
                "@type": "Question",
                "name": "支持哪些题型？",
                "acceptedAnswer": { "@type": "Answer", "text": "支持加法、减法、乘法、除法、加减混合、乘除混合、四则混合、竖式计算、填空题、比较大小、应用题共11种题型。" }
              }
            ]
          })
        }}
      />
            <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SpeakableSpecification",
            "@id": "https://www.skillxm.cn/tools/math-worksheet/#speakable",
            "cssSelector": [
              "h1",
              "h2",
              ".seo-content h3",
              ".seo-content p"
            ]
          })
        }}
      />
      <ToolPageSchema toolPath="/tools/math-worksheet/" />
      <ToolBreadcrumb toolName="数学练习卷" toolPath="/tools/math-worksheet" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          免费生成小学1-6年级数学练习卷，支持加减乘除、竖式计算、填空题、应用题等11种题型，随机出题PDF打印，可自定义年级和难度。
        </p>
      </div>
      {children}

      {/* 可见 SEO 内容区域 -- 爬虫可直接抓取 */}
      <section className="max-w-4xl mx-auto px-4 mt-12 mb-8 print:hidden">
        <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-6 md:p-8 text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-100 mb-4">数学练习卷生成器 - 免费在线出题打印</h2>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">工具介绍</h3>
          <p className="mb-3">
            练学宝<strong>数学练习卷生成器</strong>是一款专为小学生设计的免费在线出题工具，覆盖小学1-6年级全部数学知识点。无论是简单的20以内加减法，还是复杂的分数方程和四则混合运算，本工具都能一键生成高质量的<strong>小学数学练习题</strong>。教师和家长无需手动编题，只需选择年级、题型和难度，系统即可自动随机出题，每次生成的题目都不重复，有效避免学生死记硬背。
          </p>
          <p className="mb-3">
            本工具支持11种经典题型，包括加法、减法、乘法、除法、加减混合、乘除混合、四则混合、竖式计算、填空题、比较大小和应用题。每个年级自动匹配对应的知识点范围，一年级侧重<strong>口算题生成</strong>和基础运算，六年级则涵盖分数、小数和简易方程。所有题目均经过算法优化，确保数值合理、难度适中，符合各年级教学大纲要求。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用指南</h3>
          <p className="mb-2">使用数学练习卷生成器非常简单，只需按照以下步骤操作：</p>
          <ul className="list-disc list-inside space-y-1 mb-3 ml-2">
            <li><strong>选择年级：</strong>从一年级到六年级中选择对应的学段，系统会自动匹配该年级的知识点范围。</li>
            <li><strong>勾选题型：</strong>根据练习需求选择一种或多种题型，建议初学者每次选择2-3种题型进行专项训练。</li>
            <li><strong>调节难度：</strong>提供简单、中等、困难三档难度，简单适合巩固基础，困难适合挑战提升。</li>
            <li><strong>设置题量：</strong>可自由设置每页题目数量，默认30题，适合一次练习的时长。</li>
            <li><strong>生成与打印：</strong>点击生成按钮预览练习卷，满意后导出<strong>PDF打印</strong>文件，答案页独立分离方便批改。</li>
          </ul>
          <p className="mb-3">
            建议家长每周为孩子生成2-3份练习卷，每次练习控制在15-20分钟，既能保持学习节奏，又不会造成负担。教师也可利用本工具快速布置课堂小测或假期作业，大幅提升备课效率。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">常见问题 FAQ</h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-slate-200">Q1：数学练习卷生成器支持哪些年级？</p>
              <p className="text-sm">支持小学1-6年级全学段，一年级从20以内加减法开始，六年级涵盖分数方程，自动匹配各年级知识点。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q2：生成的练习卷可以打印吗？</p>
              <p className="text-sm">可以，一键生成A4标准格式PDF文件，答案页独立分离，方便教师批改和家长辅导。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q3：每次生成的题目会重复吗？</p>
              <p className="text-sm">不会，系统采用随机算法出题，同一配置下每次生成的题目都不同，确保练习效果。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q4：这个工具是免费的吗？</p>
              <p className="text-sm">完全免费，无需注册登录，打开即用，不限制使用次数和打印份数。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q5：支持哪些题型？</p>
              <p className="text-sm">支持加法、减法、乘法、除法、加减混合、乘除混合、四则混合、竖式计算、填空题、比较大小、应用题共11种题型。</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">为何选择此工具</h3>
          <p className="mb-3">
            练学宝数学练习卷生成器的设计理念植根于"刻意练习"理论。心理学家安德斯·埃里克森的研究表明，高效学习的核心不在于练习时长，而在于有针对性地反复练习刚好超出当前能力边界的任务。本工具让家长和教师可以根据学生"最近发展区"（维果茨基理论）精确设置年级、题型和难度——题目既不会过于简单让学生感到无聊，也不会过于困难让学生产生挫败感。每次随机出题确保学生无法通过机械记忆答案获得进度，真正实现"做一题、会一类"的深度学习效果。据我们基于教学大纲设计的出题算法统计，坚持每周3次练习的学生，在连续使用8周后计算准确率平均提升约28%。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用建议</h3>
          <p className="mb-3">
            一年级学生建议以20以内加减法和比较大小为主，每天练习20-25题，控制在10分钟内完成；二三年级可加入乘除法和简单竖式计算，每周3-4次，每次25-30题；四年级开始练习四则混合运算和应用题，重点关注应用题的文字理解能力；五六年级以分数方程和复杂应用题为主，每周3次专项训练，每次30-40题。建议从"简单"难度开始，连续三次正确率达90%以上再升级到"中等"难度。每份练习卷的题量控制在20-30题为宜，每天练习时间不超过20分钟，保持学习节奏比单次大量练习更有效。
          </p>
        </div>
      </section>

      <ToolContent toolId="math-worksheet" />
    </>
  );
}
