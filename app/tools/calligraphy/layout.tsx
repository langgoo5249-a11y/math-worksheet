import type { Metadata } from "next";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import ToolPageSchema from '@/app/_components/ToolPageSchema';
import ToolContent from '@/app/tools/_components/ToolContent';

export async function generateMetadata(): Promise<Metadata> {
    const canonicalUrl = 'https://www.skillxm.cn/tools/calligraphy/';
  return {
    title: "免费字帖生成器在线打印 - 田字格米字格描红练字帖 | 练学宝",
    description: "免费在线生成田字格、米字格汉字字帖，支持楷体描红和临摹双模式，可自定义输入任意汉字、古诗词、课文内容，一键导出PDF打印。适合小学1-6年级语文生字练习和课后练字作业，替代传统描红字帖本，与部编版教材同步生字表，家长教师零成本使用，支持自定义字体大小和格数，可重复打印永久免费无需注册即开即用，手机电脑均可使用。",
    keywords: "字帖生成器,练字帖生成,田字格字帖,米字格练习,汉字书写练习,楷体字帖打印,小学生练字,免费字帖下载,自定义字帖,硬笔书法练习,笔画笔顺,生字练习,描红字帖,书法入门,PDF字帖打印",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": canonicalUrl,
      "x-default": canonicalUrl,
    },
  },
    openGraph: {
      url: canonicalUrl,
      title: "字帖生成器 - 免费在线田字格米字格练字 | 练学宝",
      description: "免费在线生成田字格、米字格汉字字帖，支持楷体描红和临摹双模式，可自定义输入任意汉字、古诗词、课文内容，一键导出PDF打印。适合小学1-6年级语文生字练习和课后练字作业，替代传统描红字帖本，与部编版教材同步生字表，家长教师零成本使用，支持自定义字体大小和格数，可重复打印永久免费无需注册即开即用，手机电脑均可使用。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("字帖生成器")}&category=${encodeURIComponent("语文工具")}&icon=✍️`, width: 1200, height: 630, alt: "字帖生成器 - 练学宝" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "字帖生成器 - 免费在线田字格米字格练字 | 练学宝",
      description: "免费在线生成田字格、米字格汉字字帖，支持楷体描红和临摹双模式，可自定义输入任意汉字、古诗词、课文内容，一键导出PDF打印。适合小学1-6年级语文生字练习和课后练字作业，替代传统描红字帖本，与部编版教材同步生字表，家长教师零成本使用，支持自定义字体大小和格数，可重复打印永久免费无需注册即开即用，手机电脑均可使用。",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("字帖生成器")}&category=${encodeURIComponent("语文工具")}&icon=✍️`, width: 1200, height: 630, alt: "字帖生成器 - 练学宝" }],
    },
  };
}

export default function CalligraphyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 服务端渲染的 SEO 内容 -- 搜索引擎可直接抓取 */}
      <div className="sr-only">
        <p>字帖生成器 - 田字格米字格汉字字帖免费打印</p>
        <p>免费在线生成田字格米字格汉字字帖，支持楷体宋体黑体，自定义内容输入，PDF导出A4打印。适合小学生练字、书法初学者描红练习，输入任意汉字即可生成标准字帖模板，支持笔画顺序展示，一键打印高清字帖。</p>
        <p>练学宝字帖生成器是一款免费在线汉字书写练习工具，支持自定义内容和多种格子样式，PDF导出打印，适合小学生练字和书法入门。</p>
        <p>核心功能</p>
        <ul>
          <li>四种格子样式：田字格、米字格、回宫格、空白格，满足不同练字阶段需求</li>
          <li>三种字体选择：楷体、宋体、黑体，适合不同书写风格练习</li>
          <li>自定义内容输入：支持输入任意汉字、词语、古诗、课文内容生成字帖</li>
          <li>PDF导出A4打印：一键生成高清PDF文件，A4纸张直接打印，字迹清晰</li>
          <li>描红与临摹模式：支持描红练习和空白临摹两种模式切换</li>
          <li>完全免费：无需注册登录，打开即用，不限制使用次数</li>
        </ul>
        <p>适用对象</p>
        <p>小学1-6年级学生、书法初学者、汉字书写需要提升的中小学生、语文教师布置练字作业。适合日常练字、书法兴趣培养、汉字书写规范训练等场景。</p>
        <p>访问 <a href="https://www.skillxm.cn/">练学宝</a> 获取更多免费教学工具，包括数学练习卷生成器、英语字帖、数独游戏、口算速练等。</p>
        <p>相关学习文章</p>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/haizi-lianzi-shijianbiao/">孩子写字歪歪扭扭？练字时间表和方法</a></li>
          <li><a href="https://www.skillxm.cn/blog/ertong-lianzi-nianling/">小学生练字最佳年龄和方法</a></li>
          <li><a href="https://www.skillxm.cn/blog/fanggezhi-tianzige/">田字格、米字格、方格纸的使用场景和选择</a></li>
          <li><a href="https://www.skillxm.cn/blog/mianfei-zitie-shengchengqi-tuijian/">免费字帖生成器推荐</a></li>
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "如何使用字帖生成器",
            "description": "字帖生成器使用教程，5步快速生成田字格米字格汉字字帖，支持PDF打印",
            "totalTime": "PT5M",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "输入要练习的汉字或词语",
                "text": "支持自定义内容，也可选择常用生字"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "选择格子类型",
                "text": "田字格、米字格、回宫格等"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "选择字体和字号",
                "text": "楷体、宋体、黑体等"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "设置描红模式",
                "text": "描红/临摹/空白三种模式"
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "生成PDF打印",
                "text": "一键导出A4格式字帖，直接打印练习"
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
                "name": "字帖生成器支持哪些格子样式？",
                "acceptedAnswer": { "@type": "Answer", "text": "支持田字格、米字格、回宫格、空白格四种格子样式，满足不同练字阶段需求。" }
              },
              {
                "@type": "Question",
                "name": "可以自定义字帖内容吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "可以，支持输入任意汉字、词语、古诗、课文内容生成字帖，完全自定义。" }
              },
              {
                "@type": "Question",
                "name": "字帖生成器是免费的吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "完全免费，无需注册登录，不限制使用次数，生成的字帖可自由打印。" }
              },
              {
                "@type": "Question",
                "name": "支持哪些字体？",
                "acceptedAnswer": { "@type": "Answer", "text": "支持楷体、宋体、黑体三种字体，适合不同书写风格练习。" }
              },
              {
                "@type": "Question",
                "name": "生成的字帖怎么打印？",
                "acceptedAnswer": { "@type": "Answer", "text": "点击下载PDF按钮保存文件，用A4纸打印即可，支持描红和临摹两种模式。" }
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
            "@id": "https://www.skillxm.cn/tools/calligraphy/#speakable",
            "cssSelector": [
              "h1",
              "h2",
              ".seo-content h3",
              ".seo-content p"
            ]
          })
        }}
      />
      <ToolPageSchema toolPath="/tools/calligraphy/" />
      <ToolBreadcrumb toolName="字帖生成器" toolPath="/tools/calligraphy" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          免费在线生成田字格、米字格汉字字帖，支持楷体/宋体/黑体等多种字体，自定义内容输入，一键PDF导出A4打印。适合小学生日常练字和书法初学者描红练习。
        </p>
      </div>
      {children}

      {/* 可见 SEO 内容区域 -- 爬虫可直接抓取 */}
      <section className="max-w-4xl mx-auto px-4 mt-12 mb-8 print:hidden">
        <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-6 md:p-8 text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-100 mb-4">字帖生成器 - 免费田字格米字格练字帖在线打印</h2>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">工具介绍</h3>
          <p className="mb-3">
            练学宝<strong>字帖生成器</strong>是一款专业的在线汉字书写练习工具，专为小学生和书法初学者设计。本工具支持<strong>田字格</strong>、<strong>米字格</strong>、回宫格和空白格四种经典格子样式，帮助孩子在不同练字阶段掌握正确的笔画位置和结构比例。无论是刚入学的一年级新生，还是希望提升书写水平的高年级学生，都能通过本工具获得针对性的练字支持。
          </p>
          <p className="mb-3">
            本工具提供楷体、宋体、黑体三种常用字体，并支持<strong>描红字帖</strong>和临摹两种练习模式。描红模式适合初学者熟悉笔画走势，临摹模式则适合巩固书写技能。用户可以输入任意汉字、词语、古诗或课文内容，系统会自动生成标准格式的练字帖，一键导出高清PDF文件，A4纸张直接打印即可使用。所有功能完全免费，无需注册登录。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用指南</h3>
          <p className="mb-2">使用字帖生成器制作专属练字帖非常简单：</p>
          <ul className="list-disc list-inside space-y-1 mb-3 ml-2">
            <li><strong>输入练习内容：</strong>在输入框中填写需要练习的汉字、词语或句子，支持批量输入多个内容。</li>
            <li><strong>选择格子类型：</strong>初学者建议使用田字格或米字格，掌握结构后可切换到回宫格或空白格。</li>
            <li><strong>设置字体和模式：</strong>楷书适合规范书写训练，描红模式适合初学阶段，临摹模式适合进阶练习。</li>
            <li><strong>调整排版参数：</strong>可设置每行字数、字体大小等参数，确保打印效果符合个人需求。</li>
            <li><strong>导出PDF打印：</strong>预览满意后点击下载，保存PDF文件并用A4纸打印，即可获得专业级<strong>练字帖</strong>。</li>
          </ul>
          <p className="mb-3">
            建议家长根据孩子的课本生字表每周生成一份字帖，每天练习15-20分钟。对于书法兴趣培养，可以选择米字格进行笔画精练；对于日常作业辅助，田字格是最佳选择。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">常见问题 FAQ</h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-slate-200">Q1：字帖生成器支持哪些格子样式？</p>
              <p className="text-sm">支持田字格、米字格、回宫格、空白格四种格子样式，满足不同练字阶段需求。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q2：可以自定义字帖内容吗？</p>
              <p className="text-sm">可以，支持输入任意汉字、词语、古诗、课文内容生成字帖，完全自定义。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q3：字帖生成器是免费的吗？</p>
              <p className="text-sm">完全免费，无需注册登录，不限制使用次数，生成的字帖可自由打印。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q4：支持哪些字体？</p>
              <p className="text-sm">支持楷体、宋体、黑体三种字体，适合不同书写风格练习。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q5：描红和临摹有什么区别？</p>
              <p className="text-sm">描红模式显示灰色范字供描摹，适合初学；临摹模式仅显示范字轮廓或空白格，适合巩固书写技能。</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">为何选择此工具</h3>
          <p className="mb-3">
            书写能力的发展与儿童精细动作发育密切相关。教育心理学研究表明，6-8岁是汉字书写结构感知的黄金期，此时引入田字格和米字格训练，能帮助孩子建立"左-右、上-下、内-外"的空间方位感和结构对称意识。本工具提供的描红练习正是基于"支架式教学"理念——描红阶段工具提供完整示范，待孩子掌握笔画位置后逐步撤除支架，过渡到临摹和自主书写，最终实现独立书写能力。此外，本工具严格遵循小学语文课程标准中的书写要求，各年级书写目标与教材同步，确保课外练习与课堂教学形成有效互补。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用建议</h3>
          <p className="mb-3">
            一二年级学生建议从田字格描红开始，每天书写4-6个字，每个字描红3遍加临摹2遍，重点掌握基本笔画和笔顺规则。三年级后切换到米字格，关注字形结构的平衡感，每天练习6-8个字。对于书写基础薄弱的孩子，回宫格能提供更细化的空间参照。字体方面，楷体是最适合规范书写的选择，建议至少坚持使用一学期。每次练字控制在15-20分钟，过长容易导致手部疲劳和握笔姿势变形。家长需关注孩子的坐姿和握笔方式，正确的书写姿势比练字数量更重要。
          </p>
        </div>
      </section>

      <ToolContent toolId="calligraphy" />
    </>
  );
}
