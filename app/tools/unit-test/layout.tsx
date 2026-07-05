import type { Metadata } from "next";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import ToolPageSchema from '@/app/_components/ToolPageSchema';
import ToolContent from '@/app/tools/_components/ToolContent';

export async function generateMetadata(): Promise<Metadata> {
    const canonicalUrl = 'https://www.skillxm.cn/tools/unit-test/';
  return {
    title: "小学单元测试卷生成器免费 - 数语英科全科试卷在线打印 | 练学宝",
    description: "免费生成小学1-6年级单元测试卷，覆盖数学语文英语科学四科305个单元，支持单元测试、期中、期末三种类型，基础提高拓展三档难度，一键导出PDF打印答案分离。与主流教材同步，适合家长在家模拟考试训练，配详细解析和评分标准，可重复打印永久免费，教师可用于课堂测验即开即用，手机电脑均可使用，适合期末复习模拟考试。",
    keywords: "单元测试卷,期中试卷,期末试卷,小学数学试卷,小学语文试卷,小学英语试卷,小学科学试卷,试卷生成器,免费试卷打印,人教版试卷,三年级数学试卷,四年级语文试卷,五年级英语试卷,单元测试题,小学全科试卷,期中复习试卷,期末复习试卷",
    alternates: {
    canonical: canonicalUrl,
  },
    openGraph: {
      url: canonicalUrl,
      title: "小学单元测试卷生成器 - 数语英科全科试卷免费打印 | 练学宝",
      description: "免费生成小学1-6年级单元测试卷，覆盖数学语文英语科学四科305个单元，支持单元测试、期中、期末三种类型，基础提高拓展三档难度，一键导出PDF打印答案分离。与主流教材同步，适合家长在家模拟考试训练，配详细解析和评分标准，可重复打印永久免费，教师可用于课堂测验即开即用，手机电脑均可使用，适合期末复习模拟考试。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("单元测试卷生成器")}&category=${encodeURIComponent("综合工具")}&icon=📋`, width: 1200, height: 630, alt: "单元测试卷生成器 - 练学宝" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "小学单元测试卷生成器 - 数语英科全科试卷免费打印 | 练学宝",
      description: "免费生成小学1-6年级单元测试卷，覆盖数学语文英语科学四科305个单元，支持单元测试、期中、期末三种类型，基础提高拓展三档难度，一键导出PDF打印答案分离。与主流教材同步，适合家长在家模拟考试训练，配详细解析和评分标准，可重复打印永久免费，教师可用于课堂测验即开即用，手机电脑均可使用，适合期末复习模拟考试。",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("单元测试卷生成器")}&category=${encodeURIComponent("综合工具")}&icon=📋`, width: 1200, height: 630, alt: "单元测试卷生成器 - 练学宝" }],
    },
  };
}

export default function UnitTestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sr-only">
        <p>单元测试卷生成器 - 小学数语英科全科试卷免费打印</p>
        <p>免费生成小学1-6年级单元测试卷，数学语文英语科学四科，305个单元PDF打印。练学宝提供完整的小学单元测试卷生成服务，覆盖人教版、北师大版等主流教材版本，是小学教师备课和考试出题的得力助手。</p>
        <p>练学宝单元测试卷生成器是一款免费在线出题工具，覆盖小学1-6年级数学语文英语科学四科305个单元，支持自动组卷和PDF打印，适合教师单元检测和家长辅导。</p>
        <p>核心功能</p>
        <ul>
          <li>四科覆盖：支持数学、语文、英语、科学四个学科，满足小学全科测试需求</li>
          <li>305个单元：完整覆盖小学1-6年级所有单元知识点，每个单元都有对应的测试卷</li>
          <li>单元测试/期中/期末：支持单元测试卷、期中测试卷、期末测试卷三种考试类型，全面评估学习成果</li>
          <li>三档难度：提供基础、提高、拓展三个难度等级，适应不同学生的学习水平，实现分层教学</li>
          <li>PDF导出：一键生成PDF格式试卷，排版规范，方便打印分发，支持A4纸张标准格式</li>
        </ul>
        <p>适用对象</p>
        <p>单元测试卷生成器适合小学各学科教师、教育培训机构以及学生家长使用。无论是日常单元测验、期中期末考试还是课后练习，都可以通过本工具快速生成高质量的测试试卷，节省教师备课时间，提高教学效率。</p>
        <p>访问 <a href="https://www.skillxm.cn/">练学宝</a> 获取更多免费教学工具。</p>
        <p>相关学习文章</p>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/xiaoxue-shuxue-lianxi-ziyuan-huizong/">最全小学数学练习资源汇总</a></li>
          <li><a href="https://www.skillxm.cn/blog/lianxijuan-xuanze/">如何选择适合孩子的练习卷</a></li>
          <li><a href="https://www.skillxm.cn/blog/qimo-fuxi-gonglue-mianfei-gongju/">期末复习攻略：用免费工具高效备考</a></li>
          <li><a href="https://www.skillxm.cn/blog/danyuan-ceshijuan-shengcheng-gongju/">小学单元测试卷怎么出</a></li>
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "单元测试卷覆盖哪些学科？",
                "acceptedAnswer": { "@type": "Answer", "text": "覆盖数学、语文、英语、科学四科，完整支持小学全科测试需求。" }
              },
              {
                "@type": "Question",
                "name": "支持哪些教材版本？",
                "acceptedAnswer": { "@type": "Answer", "text": "主要覆盖人教版1-6年级上下册共305个单元，满足大部分学校的教学进度。" }
              },
              {
                "@type": "Question",
                "name": "可以生成期中期末试卷吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "可以，除单元测试外，还支持期中测试卷和期末测试卷三种考试类型。" }
              },
              {
                "@type": "Question",
                "name": "试卷有不同难度吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "有，提供基础、提高、拓展三个难度等级，适应不同学生的学习水平。" }
              },
              {
                "@type": "Question",
                "name": "单元测试卷生成器免费吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "完全免费，所有功能均可免费使用，PDF导出打印不收取任何费用。" }
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
            "@id": "https://www.skillxm.cn/tools/unit-test/#speakable",
            "cssSelector": [
              "h1",
              "h2",
              ".seo-content h3",
              ".seo-content p"
            ]
          })
        }}
      />
      <ToolPageSchema toolPath="/tools/unit-test/" />
      <ToolBreadcrumb toolName="单元测试卷" toolPath="/tools/unit-test" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          免费生成小学1-6年级单元测试卷，覆盖数学语文英语科学四科305个单元，支持单元测试/期中/期末三种类型，PDF排版规范一键打印。
        </p>
      </div>
      {children}

      {/* 可见 SEO 内容区域 -- 爬虫可直接抓取 */}
      <section className="max-w-4xl mx-auto px-4 mt-12 mb-8 print:hidden">
        <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-6 md:p-8 text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-100 mb-4">单元测试卷生成器 - 免费小学单元测试、语文数学英语全科试卷</h2>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">工具介绍</h3>
          <p className="mb-3">
            练学宝<strong>单元测试卷</strong>生成器是一款面向小学全科教学的免费在线出题工具，覆盖<strong>数学单元测试</strong>、<strong>语文单元测试</strong>、英语和科学四个学科，完整收录1-6年级共305个单元的测试题目。本工具支持单元测试、期中测试、期末测试三种考试类型，并提供基础、提高、拓展三档难度，满足不同学校和学生的差异化需求。
          </p>
          <p className="mb-3">
            教师手动编写单元测试卷往往耗时费力，且难以保证题目质量和覆盖面。本工具基于主流教材版本的知识点体系，自动生成结构完整、难度适中的测试试卷，包含选择题、填空题、判断题、计算题、应用题等多种题型。教师只需选择学科、年级、单元和难度，即可在几秒钟内获得一份排版规范的试卷，大幅提升备课和出题效率。所有试卷均可免费导出PDF打印。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用指南</h3>
          <p className="mb-2">使用单元测试卷生成器制作试卷非常简单：</p>
          <ul className="list-disc list-inside space-y-1 mb-3 ml-2">
            <li><strong>选择学科和年级：</strong>从数学、语文、英语、科学四科中选择，再确定1-6年级中的对应学段。</li>
            <li><strong>选择单元和考试类型：</strong>按教学进度选择当前单元，考试类型可选择单元测试、期中测试或期末测试。</li>
            <li><strong>设置难度等级：</strong>基础难度适合大部分学生，提高难度适合中等以上学生，拓展难度适合拔尖训练。</li>
            <li><strong>预览试卷效果：</strong>在线查看试卷排版和题目内容，确认题量、难度和知识点覆盖是否符合要求。</li>
            <li><strong>导出PDF打印：</strong>一键生成A4标准格式PDF试卷，直接打印分发给学生，答案另行提供方便批改。</li>
          </ul>
          <p className="mb-3">
            建议教师在每个单元教学结束后生成一份单元测试卷，检验学生掌握情况。期中考试前可生成综合复习卷，期末考试前可生成模拟测试卷。家长也可利用本工具为孩子进行家庭自测，及时发现学习薄弱环节。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">常见问题 FAQ</h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-slate-200">Q1：单元测试卷覆盖哪些学科？</p>
              <p className="text-sm">覆盖数学、语文、英语、科学四科，完整支持小学全科测试需求。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q2：支持哪些教材版本？</p>
              <p className="text-sm">主要覆盖人教版1-6年级上下册共305个单元，满足大部分学校的教学进度。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q3：可以生成期中期末试卷吗？</p>
              <p className="text-sm">可以，除单元测试外，还支持期中测试卷和期末测试卷三种考试类型。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q4：试卷有不同难度吗？</p>
              <p className="text-sm">有，提供基础、提高、拓展三个难度等级，适应不同学生的学习水平。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q5：单元测试卷生成器免费吗？</p>
              <p className="text-sm">完全免费，所有功能均可免费使用，PDF导出打印不收取任何费用。</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">为何选择此工具</h3>
          <p className="mb-3">
            "形成性评估"是教育评估理论的核心概念，与"终结性评估"（期末考）不同，形成性评估在教学过程中持续进行，目的是及时发现学习问题并调整教学策略。本工具支持的单元测试正是形成性评估的最佳实践——每个单元结束后进行一次低风险测试，检验学生对当前知识点的掌握情况。基于教学评估研究的复习方法表明，每单元进行一次形成性评估，配合针对性的反馈和复习，能将学生的最终学业成绩提升约15-20个百分点。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用建议</h3>
          <p className="mb-3">
            每个单元教学结束后立即生成一份单元测试卷（当天或次日），基础难度适合全班检测，用时约30-40分钟。批改后提高难度卷用于成绩前50%学生的提升训练，拓展难度用于前15%优秀学生的拔尖训练。期中考试前一周建议生成综合复习卷进行模拟测试；期末考试前两周生成模拟卷加查漏补缺。家长在家使用时，建议每月生成一份综合练习卷检验整体掌握情况，重点关注连续两次出错的知识点模块，有针对性地进行专项强化。
          </p>
        </div>
      </section>

      <ToolContent toolId="unit-test" />
    </>
  );
}
