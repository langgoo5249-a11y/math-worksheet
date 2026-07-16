import type { Metadata } from "next";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import ToolPageSchema from '@/app/_components/ToolPageSchema';
import ToolContent from '@/app/tools/_components/ToolContent';

export async function generateMetadata(): Promise<Metadata> {
    const canonicalUrl = 'https://www.skillxm.cn/tools/english-calligraphy/';
  return {
    title: "英文字帖生成器在线打印 - 四线三格衡水体字母单词练习 | 练学宝",
    description: "免费生成四线三格英文字帖，支持衡水体、手写印刷体两种字体，可自定义26个字母、单词、句子内容，一键导出PDF打印。适合小学3-6年级英语书写练习和课后作业，与课本同步，帮助养成规范书写习惯，教师家长免费使用，可批量生成全班字帖，支持自定义行数和字数，可重复打印永久免费无需注册即开即用，手机电脑均可使用。",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": canonicalUrl,
      "x-default": canonicalUrl,
    },
  },
    openGraph: {
      url: canonicalUrl,
      title: "英语字帖生成器 - 免费四线三格英语练习 | 练学宝",
      description: "免费生成四线三格英文字帖，支持衡水体、手写印刷体两种字体，可自定义26个字母、单词、句子内容，一键导出PDF打印。适合小学3-6年级英语书写练习和课后作业，与课本同步，帮助养成规范书写习惯，教师家长免费使用，可批量生成全班字帖，支持自定义行数和字数，可重复打印永久免费无需注册即开即用，手机电脑均可使用。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("英语字帖生成器")}&category=${encodeURIComponent("英语工具")}&icon=🔤`, width: 1200, height: 630, alt: "英语字帖生成器 - 练学宝" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "英语字帖生成器 - 免费四线三格英语练习 | 练学宝",
      description: "免费生成四线三格英文字帖，支持衡水体、手写印刷体两种字体，可自定义26个字母、单词、句子内容，一键导出PDF打印。适合小学3-6年级英语书写练习和课后作业，与课本同步，帮助养成规范书写习惯，教师家长免费使用，可批量生成全班字帖，支持自定义行数和字数，可重复打印永久免费无需注册即开即用，手机电脑均可使用。",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("英语字帖生成器")}&category=${encodeURIComponent("英语工具")}&icon=🔤`, width: 1200, height: 630, alt: "英语字帖生成器 - 练学宝" }],
    },
  };
}

export default function EnglishCalligraphyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 服务端渲染的 SEO 内容 -- 搜索引擎可直接抓取 */}
      <div className="sr-only">
        <p>英语字帖生成器 - 四线三格英文字帖免费打印</p>
        <p>免费生成四线三格英文字帖，多种字体，PDF导出A4打印。适合小学生英语书写练习，支持输入单词、句子、课文内容生成标准四线三格英文字帖，帮助规范英文字母书写格式，提升英语书写水平。</p>
        <p>练学宝英语字帖是一款免费在线英语书写练习工具，支持26个字母、单词和句子的四线三格标准书写，PDF导出打印，适合小学生英语书写启蒙。</p>
        <p>核心功能</p>
        <ul>
          <li>四线三格标准格式：符合英语书写规范的四线三格模板，帮助掌握字母占格规则</li>
          <li>多种英文字体：提供手写体、印刷体等多种英文字体选择</li>
          <li>自定义单词句子：支持输入任意英文单词、短语、句子生成字帖</li>
          <li>PDF导出A4打印：一键生成高清PDF文件，A4纸张直接打印，线条清晰</li>
          <li>大小写字母练习：支持单独练习大写字母、小写字母及完整单词书写</li>
          <li>完全免费：无需注册登录，打开即用，不限制使用次数</li>
        </ul>
        <p>适用对象</p>
        <p>小学3-6年级学生、英语初学者、英文字母书写需要规范的中学生、英语教师布置书写练习作业。适合英语课堂书写训练、课后练习、英语书写竞赛准备等场景。</p>
        <p>访问 <a href="https://www.skillxm.cn/">练学宝</a> 获取更多免费教学工具，包括数学练习卷生成器、汉字字帖、数独游戏、口算速练等。</p>
        <p>相关学习文章</p>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/xiaoxue-yingyu-shuxie/">小学英语四线三格书写规范</a></li>
          <li><a href="https://www.skillxm.cn/blog/ziran-pindu-rumen/">英语自然拼读入门</a></li>
          <li><a href="https://www.skillxm.cn/blog/xiaoxue-yingyu-xuexi-ziyuan-tuijian/">小学英语学习资源推荐</a></li>
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "如何使用英语字帖生成器",
            "description": "英语字帖生成器使用教程，4步快速生成四线三格英语书写练习纸，支持PDF打印",
            "totalTime": "PT3M",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "选择字体样式",
                "text": "从手写体、印刷体等多种英文字体中选择适合的书写风格"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "输入练习内容",
                "text": "输入英文单词、短语或句子，支持自定义任意内容"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "预览并调整设置",
                "text": "调整行高、字体大小等参数，预览四线三格效果"
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
                "name": "英语字帖是什么格式？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "采用标准四线三格格式，符合英语书写规范，帮助孩子掌握字母占格规则。"
                }
              },
              {
                "@type": "Question",
                "name": "支持哪些英文字体？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "提供手写体、印刷体等多种英文字体选择，适合不同学习阶段。"
                }
              },
              {
                "@type": "Question",
                "name": "可以自定义字帖内容吗？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "可以，支持输入任意英文单词、短语、句子生成字帖，比如课文内容或单词表。"
                }
              },
              {
                "@type": "Question",
                "name": "英语字帖适合几年级？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "主要适合小学3-6年级学生，英文字母书写需要规范的中学生也可以使用。"
                }
              },
              {
                "@type": "Question",
                "name": "英语字帖生成器免费吗？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "完全免费，无需注册，生成的字帖可自由打印使用。"
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
            "@id": "https://www.skillxm.cn/tools/english-calligraphy/#speakable",
            "cssSelector": [
              "h1",
              "h2",
              ".seo-content h3",
              ".seo-content p"
            ]
          })
        }}
      />
      <ToolPageSchema toolPath="/tools/english-calligraphy/" />
      <ToolBreadcrumb toolName="英语字帖" toolPath="/tools/english-calligraphy" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          免费生成四线三格英文字帖，支持手写体、印刷体等多种字体，自定义单词句子内容，PDF导出A4打印。帮助小学生规范英文字母书写格式。
        </p>
      </div>
      {children}

      {/* 可见 SEO 内容区域 -- 爬虫可直接抓取 */}
      <section className="max-w-4xl mx-auto px-4 mt-12 mb-8 print:hidden">
        <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-6 md:p-8 text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-100 mb-4">英语字帖生成器 - 免费四线三格英文字母练习在线打印</h2>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">工具介绍</h3>
          <p className="mb-3">
            练学宝<strong>英语字帖</strong>生成器是一款专为小学生设计的英文书写练习工具，采用标准的<strong>四线三格</strong>格式，帮助孩子掌握英文字母的正确占格规则。本工具支持手写体、印刷体等多种英文字体，可输入任意单词、短语或句子生成个性化练习纸，是<strong>英语书写</strong>启蒙和规范训练的得力助手。
          </p>
          <p className="mb-3">
            小学三年级开始系统学习英语书写，很多孩子在字母占格、笔画顺序和字母间距上存在困难。本工具生成的<strong>英文字母练习</strong>纸严格遵循四线三格规范，大写字母占上两格，小写字母根据形状分别占中间一格或上中下三格。通过反复描摹和临摹，孩子能够逐步养成规范的英文书写习惯，为日后的英语学习和考试卷面整洁打下坚实基础。所有功能完全免费，无需注册。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用指南</h3>
          <p className="mb-2">使用英语字帖生成器制作练习纸非常简单：</p>
          <ul className="list-disc list-inside space-y-1 mb-3 ml-2">
            <li><strong>选择字体样式：</strong>手写体（Cursive）适合培养连笔书写能力，印刷体（Print）适合初学阶段规范字母形状。</li>
            <li><strong>输入练习内容：</strong>可以输入课本单词表、重点句子或自定义内容，建议每次练习20-30个单词为宜。</li>
            <li><strong>设置行高和字号：</strong>低年级学生建议调大行高和字号，便于描摹；高年级可适当缩小，提升书写密度。</li>
            <li><strong>预览四线三格效果：</strong>确认字母占格和排版是否符合需求，不满意可随时调整参数。</li>
            <li><strong>导出PDF打印：</strong>一键生成A4格式PDF文件，使用普通A4纸打印即可，建议使用稍厚的纸张以获得更好的书写手感。</li>
          </ul>
          <p className="mb-3">
            建议家长根据学校教学进度每周生成1-2份英语字帖，每天练习10-15分钟。初学阶段以26个字母的单独书写为主，进阶后可练习常用单词和课本句子。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">常见问题 FAQ</h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-slate-200">Q1：英语字帖是什么格式？</p>
              <p className="text-sm">采用标准四线三格格式，符合英语书写规范，帮助孩子掌握字母占格规则。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q2：支持哪些英文字体？</p>
              <p className="text-sm">提供手写体、印刷体等多种英文字体选择，适合不同学习阶段的书写需求。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q3：可以自定义字帖内容吗？</p>
              <p className="text-sm">可以，支持输入任意英文单词、短语、句子生成字帖，比如课文内容或单词表。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q4：英语字帖适合几年级？</p>
              <p className="text-sm">主要适合小学3-6年级学生，英文字母书写需要规范的中学生也可以使用。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q5：英语字帖生成器免费吗？</p>
              <p className="text-sm">完全免费，无需注册，生成的字帖可自由打印使用，不限制次数。</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">为何选择此工具</h3>
          <p className="mb-3">
            英文书写不仅仅是"写得好看"的技能训练，更是英语学习的认知基础。应用语言学研究指出，手写字母的过程能激活大脑中负责字母识别的梭状回区域，对单词拼写和阅读流畅度都有正向影响。四线三格规范书写的核心价值在于建立字母的视觉-空间表征——每个字母在三格中的占格位置（如b占上中格、p占中下格）形成了独特的空间记忆。这种多感官编码比单纯的视觉认读更能加深记忆，是英语教学实践中验证的重要原则。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用建议</h3>
          <p className="mb-3">
            三年级英语书写启蒙阶段，建议按照字母组合特征分组学习：先学"一线字母"（a、c、e等占中间一格），再学"两线字母"（b、d、f等占上中格），最后学"三线字母"（g、j、p等占中下格）。每周练习3-4次，每次10-15分钟，每次重点练4-6个字母。印刷体适合三年级初学阶段，手写体建议四年级以后引入。书写姿势方面注意：脚平放、背挺直、纸略向左倾斜（右利手）、握笔高度离笔尖约2-3厘米，这些细节对书写质量影响显著。
          </p>
        </div>
      </section>

      <ToolContent toolId="english-calligraphy" />
    </>
  );
}
