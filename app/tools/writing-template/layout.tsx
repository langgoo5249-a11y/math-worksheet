import type { Metadata } from "next";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import ToolPageSchema from '@/app/_components/ToolPageSchema';
import ToolContent from '@/app/tools/_components/ToolContent';

export async function generateMetadata(): Promise<Metadata> {
    const canonicalUrl = 'https://www.skillxm.cn/tools/writing-template/';
  return {
    title: "作文模板生成器免费 - 看图写话日记作文格纸PDF打印 | 练学宝",
    description: "免费生成小学作文格纸模板，涵盖看图写话、日记、作文格子纸等多种格式，支持田字格方格横线格，可设置300-600字篇幅，一键导出PDF打印。适合小学1-6年级语文写作练习和课后作业，与课堂教学同步使用，家长教师免费使用，可重复打印，支持自定义格数和行距，永久免费无需注册即开即用，手机电脑均可使用，适合日常写作训练。",
    keywords: "作文模板,看图写话,日记模板,作文格纸,小学作文,写作练习,作文纸打印,作文格子,三年级作文模板,看图写话练习纸,小学生日记格式,作文开头结尾,写人作文模板,记事作文模板,写景作文模板,作文素材,低年级写话,作文格子纸",
    alternates: {
    canonical: canonicalUrl,
  },
    openGraph: { url: canonicalUrl, title: "作文模板生成器 - 练学宝", description: "免费生成小学作文格纸模板，涵盖看图写话、日记、作文格子纸等多种格式，支持田字格方格横线格，可设置300-600字篇幅，一键导出PDF打印。适合小学1-6年级语文写作练习和课后作业，与课堂教学同步使用，家长教师免费使用，可重复打印，支持自定义格数和行距，永久免费无需注册即开即用，手机电脑均可使用，适合日常写作训练。", images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("作文模板生成器")}&category=${encodeURIComponent("语文工具")}&icon=📄`, width: 1200, height: 630, alt: "作文模板生成器 - 练学宝" }] },
    twitter: {
      card: "summary_large_image",
      title: "作文模板生成器 - 练学宝",
      description: "免费生成小学作文格纸模板，涵盖看图写话、日记、作文格子纸等多种格式，支持田字格方格横线格，可设置300-600字篇幅，一键导出PDF打印。适合小学1-6年级语文写作练习和课后作业，与课堂教学同步使用，家长教师免费使用，可重复打印，支持自定义格数和行距，永久免费无需注册即开即用，手机电脑均可使用，适合日常写作训练。",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("作文模板生成器")}&category=${encodeURIComponent("语文工具")}&icon=📄`, width: 1200, height: 630, alt: "作文模板生成器 - 练学宝" }],
    },
  };
}

export default function WritingTemplateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sr-only">
        <p>作文模板生成器 - 小学作文格纸免费打印</p>
        <p>免费生成小学作文格纸模板，看图写话、日记、作文格子纸。练学宝提供多种作文书写模板，涵盖小学低年级到高年级的写作练习需求，支持PDF格式免费打印。</p>
        <p>练学宝作文模板是一款免费在线作文辅助工具，提供看图写话、日记、记叙文等多种作文模板，支持自定义内容和稿纸样式，PDF导出打印，适合小学生作文入门训练。</p>
        <p>核心功能</p>
        <ul>
          <li>看图写话模板：专为小学低年级设计，配有图片区域和拼音格/田字格书写区域，适合一二年级看图写话练习</li>
          <li>日记模板：提供标准日记格式模板，包含日期、天气、星期等栏目，帮助学生养成写日记的习惯</li>
          <li>作文格纸：提供标准作文格子纸模板，支持不同行距和格子大小，适合各年级作文书写练习</li>
          <li>多种格式：支持田字格、方格、横线格等多种书写格式，满足不同年级和不同场景的写作需求</li>
        </ul>
        <p>适用对象</p>
        <p>作文模板生成器适合小学语文教师、学生家长以及小学各年级学生使用。无论是日常写作练习、考试作文训练还是家庭作业，都可以通过本工具快速生成规范的作文书写模板，培养孩子良好的书写习惯。</p>
        <p>访问 <a href="https://www.skillxm.cn/">练学宝</a> 获取更多免费教学工具。</p>
        <p>相关学习文章</p>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/xiaoxue-zuowen-moban/">小学作文不会写？3个模板轻松写出300字</a></li>
          <li><a href="https://www.skillxm.cn/blog/sannianji-zuowen-rumen/">三年级作文入门方法</a></li>
          <li><a href="https://www.skillxm.cn/blog/kantu-xiehua-xunlian/">如何辅导孩子看图写话</a></li>
          <li><a href="https://www.skillxm.cn/blog/xiaoxue-zuowen-fudao-moban-shengcheng/">小学作文辅导：写作不再难</a></li>
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "如何使用作文模板生成器",
            "description": "作文模板生成器使用教程，4步快速生成小学作文格纸模板，支持PDF打印",
            "totalTime": "PT3M",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "选择模板类型",
                "text": "选择看图写话、日记、作文格子纸等模板类型"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "设置格式和字数",
                "text": "选择田字格、方格、横线格等格式，设置300-500字等篇幅"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "预览模板效果",
                "text": "在页面中预览作文格纸模板效果"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "导出PDF打印",
                "text": "一键生成A4格式PDF文件，直接打印使用"
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
                "name": "作文模板有哪些类型？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "提供看图写话、日记、书信、读后感等多种作文模板，涵盖小学低年级到高年级的写作需求。"
                }
              },
              {
                "@type": "Question",
                "name": "看图写话模板适合几年级？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "专为小学一二年级设计，配有图片区域和书写区域，适合低年级看图写话练习。"
                }
              },
              {
                "@type": "Question",
                "name": "作文格子纸支持哪些格式？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "支持田字格、方格、横线格等多种书写格式，满足不同年级和场景的写作需求。"
                }
              },
              {
                "@type": "Question",
                "name": "可以设置不同字数吗？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "可以，支持300字、400字、500字等不同篇幅的作文格子纸。"
                }
              },
              {
                "@type": "Question",
                "name": "作文模板生成器免费吗？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "完全免费，无需注册，所有模板均可免费使用和打印。"
                }
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
            "@id": "https://www.skillxm.cn/tools/writing-template/#speakable",
            "cssSelector": [
              "h1",
              "h2",
              ".seo-content h3",
              ".seo-content p"
            ]
          })
        }}
      />
      <ToolPageSchema toolPath="/tools/writing-template/" />
      <ToolBreadcrumb toolName="作文模板" toolPath="/tools/writing-template" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          免费生成小学作文格纸模板，涵盖看图写话、日记、作文格子纸等格式，支持田字格方格横线格，PDF导出A4打印。
        </p>
      </div>
      {children}

      {/* 可见 SEO 内容区域 -- 爬虫可直接抓取 */}
      <section className="max-w-4xl mx-auto px-4 mt-12 mb-8 print:hidden">
        <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-6 md:p-8 text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-100 mb-4">作文模板生成器 - 免费看图写话、日记模板与小学作文格纸</h2>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">工具介绍</h3>
          <p className="mb-3">
            练学宝<strong>作文模板</strong>生成器是一款专为小学生写作训练设计的辅助工具，涵盖<strong>看图写话</strong>、日记、记叙文、读后感等多种作文格式。本工具提供田字格、方格、横线格三种书写模板，支持300字到600字不同篇幅设置，帮助孩子从低年级写话过渡到高年级作文，逐步培养规范的写作习惯。
          </p>
          <p className="mb-3">
            小学低年级学生刚开始接触写作时，常常面临不知从何下笔的困难。<strong>看图写话</strong>模板配有图片区域和拼音格书写区域，引导孩子观察图片内容并按照"时间、地点、人物、事件"的结构进行表达。日记模板则包含日期、天气、星期等标准栏目，帮助孩子养成记录生活的习惯。<strong>小学作文</strong>格纸模板适合中高年级，标准格子排版让卷面更加整洁规范。所有模板均可免费导出PDF打印。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用指南</h3>
          <p className="mb-2">使用作文模板生成器制作写作练习纸非常简单：</p>
          <ul className="list-disc list-inside space-y-1 mb-3 ml-2">
            <li><strong>选择模板类型：</strong>一二年级建议选择看图写话模板，三年级以上可选择日记模板或作文格纸。</li>
            <li><strong>设置格式和字数：</strong>低年级建议使用田字格和300字篇幅，高年级可选择方格或横线格以及500-600字篇幅。</li>
            <li><strong>预览模板效果：</strong>在页面中查看作文格纸的排版效果，确认格子大小和行距是否适合孩子的书写习惯。</li>
            <li><strong>导出PDF打印：</strong>一键生成A4格式PDF文件，建议使用稍厚的纸张打印，获得更好的书写体验。</li>
            <li><strong>配合写作指导：</strong>家长可根据模板类型给予孩子相应的写作提示，如看图写话时引导孩子描述图中人物的动作和表情。</li>
          </ul>
          <p className="mb-3">
            建议低年级学生每周完成1-2篇看图写话，中高年级每周写1篇日记和1篇命题作文。坚持使用规范模板，孩子的写作条理性和卷面整洁度都会明显提升。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">常见问题 FAQ</h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-slate-200">Q1：作文模板有哪些类型？</p>
              <p className="text-sm">提供看图写话、日记、书信、读后感等多种作文模板，涵盖小学低年级到高年级的写作需求。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q2：看图写话模板适合几年级？</p>
              <p className="text-sm">专为小学一二年级设计，配有图片区域和书写区域，适合低年级看图写话练习。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q3：作文格子纸支持哪些格式？</p>
              <p className="text-sm">支持田字格、方格、横线格等多种书写格式，满足不同年级和场景的写作需求。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q4：可以设置不同字数吗？</p>
              <p className="text-sm">可以，支持300字、400字、500字、600字等不同篇幅的作文格子纸。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q5：作文模板生成器免费吗？</p>
              <p className="text-sm">完全免费，无需注册，所有模板均可免费使用和打印，不限制次数。</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">为何选择此工具</h3>
          <p className="mb-3">
            写作能力的培养遵循"模仿—仿写—独立创作"的三阶段发展路径，这与维果茨基"最近发展区"理论高度吻合。一二年级的看图写话训练属于"模仿"阶段——通过观察图片内容并在模板引导下组织语言，帮助孩子建立"时间、地点、人物、事件"的基本叙事框架。三四年级的日记和读后感训练进入"仿写"阶段，学习运用开头结尾、过渡承接等写作技巧。本工具根据不同年级提供差异化的模板支持，正是基于语文课程标准的写作能力层级要求，为每个阶段的学生提供恰到好处的写作支架。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用建议</h3>
          <p className="mb-3">
            一二年级写作以看图写话为主，建议每周2次，每次20-30分钟写50-100字，重点使用"谁在哪里做什么"的基本句式。三年级开始使用日记模板，每周写3篇，每篇100-150字，鼓励记录观察到的细节而非流水账。四五六年级使用作文格纸，每周写1篇完整的记叙文或读后感，每篇300-500字。格子大小的选择：低年级使用田字格（格子大方便书写），中年级用大方格，高年级用横线格更接近考试作文纸格式。模板使用建议先"扶着写"再"放手写"，逐步培养独立创作能力。
          </p>
        </div>
      </section>

      <ToolContent toolId="writing-template" />
    </>
  );
}
