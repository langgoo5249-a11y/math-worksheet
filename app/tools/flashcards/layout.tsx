import type { Metadata } from "next";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import ToolPageSchema from '@/app/_components/ToolPageSchema';
import ToolContent from '@/app/tools/_components/ToolContent';

export async function generateMetadata(): Promise<Metadata> {
    const canonicalUrl = 'https://www.skillxm.cn/tools/flashcards/';
  return {
    title: "识字卡片生成器免费 - 汉字拼音组词双面卡片PDF打印 | 练学宝",
    description: "免费生成汉字识字卡片，自动标注拼音并提供常用组词，支持双面卡片PDF打印。适合幼儿园大班到小学低年级识字启蒙，涵盖一年级常用300字和二年级常用500字，家长打印即可使用，教师可用于课堂识字教学，支持自定义生字内容与课文同步，配笔顺动画演示，可重复打印永久免费无需注册即用，手机电脑均可使用，适合幼小衔接识字启蒙。",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": canonicalUrl,
      "x-default": canonicalUrl,
    },
  },
    openGraph: { url: canonicalUrl, title: "识字卡片生成器 - 练学宝", description: "免费生成汉字识字卡片，自动标注拼音并提供常用组词，支持双面卡片PDF打印。适合幼儿园大班到小学低年级识字启蒙，涵盖一年级常用300字和二年级常用500字，家长打印即可使用，教师可用于课堂识字教学，支持自定义生字内容与课文同步，配笔顺动画演示，可重复打印永久免费无需注册即用，手机电脑均可使用，适合幼小衔接识字启蒙。", images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("识字卡片生成器")}&category=${encodeURIComponent("语文工具")}&icon=🃏`, width: 1200, height: 630, alt: "识字卡片生成器 - 练学宝" }] },
    twitter: {
      card: "summary_large_image",
      title: "识字卡片生成器 - 练学宝",
      description: "免费生成汉字识字卡片，自动标注拼音并提供常用组词，支持双面卡片PDF打印。适合幼儿园大班到小学低年级识字启蒙，涵盖一年级常用300字和二年级常用500字，家长打印即可使用，教师可用于课堂识字教学，支持自定义生字内容与课文同步，配笔顺动画演示，可重复打印永久免费无需注册即用，手机电脑均可使用，适合幼小衔接识字启蒙。",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("识字卡片生成器")}&category=${encodeURIComponent("语文工具")}&icon=🃏`, width: 1200, height: 630, alt: "识字卡片生成器 - 练学宝" }],
    },
  };
}

export default function FlashcardsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sr-only">
        <p>识字卡片生成器 - 汉字卡片免费打印</p>
        <p>免费生成汉字识字卡片，支持拼音组词，双面卡片PDF打印。练学宝提供在线识字卡片制作工具，帮助小学语文教师和家长快速生成专业的汉字识字卡，适合课堂教学和家庭辅导使用。</p>
        <p>练学宝识字卡片是一款免费在线汉字学习工具，支持自定义汉字和词语，自动生成带拼音的识字卡片，PDF导出打印，适合小学低年级识字教学。</p>
        <p>核心功能</p>
        <ul>
          <li>自定义汉字：输入任意汉字即可生成对应的识字卡片，支持批量添加多个汉字</li>
          <li>拼音标注：自动为每个汉字标注标准拼音，帮助小学生正确认读</li>
          <li>组词示例：为每个汉字提供常用组词，拓展词汇学习</li>
          <li>双面打印：生成双面卡片PDF，正面显示汉字和拼音，背面显示组词和笔画，方便打印裁剪后使用</li>
        </ul>
        <p>适用对象</p>
        <p>识字卡片生成器适合小学语文教师、幼儿园教师、学生家长以及从事汉字教学的培训机构使用。无论是课堂教学、课后辅导还是家庭早教，都可以通过本工具快速生成专业的识字卡片，提高汉字学习效率。</p>
        <p>访问 <a href="https://www.skillxm.cn/">练学宝</a> 获取更多免费教学工具。</p>
        <p>相关学习文章</p>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/shizi-fangfa-tisheng/">小学识字方法大比拼</a></li>
          <li><a href="https://www.skillxm.cn/blog/pinyin-xuexi-luxiantu/">一年级拼音学习完整攻略</a></li>
          <li><a href="https://www.skillxm.cn/blog/yinianji-pinyin-shizi-kousuan-gonglue/">一年级家长必看：拼音+识字+口算全攻略</a></li>
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "如何生成识字卡片",
            "description": "识字卡片生成器使用教程，4步快速生成汉字识字卡片，支持PDF打印",
            "totalTime": "PT3M",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "输入汉字",
                "text": "输入需要学习的汉字，支持批量添加多个汉字"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "查看拼音和组词",
                "text": "系统自动为每个汉字标注拼音并提供常用组词"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "预览卡片效果",
                "text": "预览正面汉字+拼音、背面组词+笔画的双面卡片效果"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "导出PDF打印",
                "text": "一键生成双面卡片PDF，打印裁剪后即可使用"
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
                "name": "识字卡片生成器怎么用？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "输入想要学习的汉字，系统自动标注拼音并提供常用组词，支持批量添加多个汉字，生成双面卡片PDF。"
                }
              },
              {
                "@type": "Question",
                "name": "识字卡片可以打印吗？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "可以，生成双面卡片PDF文件，正面显示汉字和拼音，背面显示组词和笔画，打印裁剪后即可使用。"
                }
              },
              {
                "@type": "Question",
                "name": "适合多大孩子使用？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "适合幼儿园大班到小学低年级（5-8岁）的识字启蒙和巩固练习。"
                }
              },
              {
                "@type": "Question",
                "name": "识字卡片生成器收费吗？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "完全免费，无需注册，所有功能均可免费使用。"
                }
              },
              {
                "@type": "Question",
                "name": "可以自定义卡片内容吗？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "可以，支持输入任意汉字，系统自动标注拼音和组词，也可以手动编辑。"
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
            "@id": "https://www.skillxm.cn/tools/flashcards/#speakable",
            "cssSelector": [
              "h1",
              "h2",
              ".seo-content h3",
              ".seo-content p"
            ]
          })
        }}
      />
      <ToolPageSchema toolPath="/tools/flashcards/" />
      <ToolBreadcrumb toolName="识字卡片" toolPath="/tools/flashcards" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          免费生成汉字识字卡片，自动标注拼音并提供常用组词，支持双面卡片PDF打印。适合小学语文教师和家长快速生成专业识字卡。
        </p>
      </div>
      {children}

      {/* 可见 SEO 内容区域 -- 爬虫可直接抓取 */}
      <section className="max-w-4xl mx-auto px-4 mt-12 mb-8 print:hidden">
        <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-6 md:p-8 text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-100 mb-4">识字卡片生成器 - 免费汉字卡片与拼音识字在线制作</h2>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">工具介绍</h3>
          <p className="mb-3">
            练学宝<strong>识字卡片</strong>生成器是一款专为幼儿和小学低年级学生设计的汉字学习工具。本工具支持输入任意汉字，系统自动标注标准拼音并提供常用组词，生成专业的<strong>生字卡片</strong>供打印使用。无论是幼儿园大班的<strong>拼音识字</strong>启蒙，还是小学一二年级的课后生字巩固，本工具都能提供高效的学习支持。
          </p>
          <p className="mb-3">
            与传统购买的识字卡不同，本工具允许完全自定义卡片内容，家长可以根据孩子的课本生字表或薄弱环节有针对性地制作卡片。生成的卡片采用双面设计，正面显示汉字和拼音，背面显示组词和笔画信息，方便进行翻卡测试和记忆训练。所有功能完全免费，无需注册登录，批量生成后即可导出PDF打印。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用指南</h3>
          <p className="mb-2">制作识字卡片只需简单几步：</p>
          <ul className="list-disc list-inside space-y-1 mb-3 ml-2">
            <li><strong>输入汉字：</strong>在输入框中填写需要学习的汉字，支持批量添加多个汉字，建议每次制作10-20张卡片。</li>
            <li><strong>查看拼音和组词：</strong>系统自动为每个汉字标注标准拼音并提供常用组词，也可手动编辑调整。</li>
            <li><strong>预览卡片效果：</strong>确认正面汉字+拼音、背面组词+笔画的双面卡片排版是否符合需求。</li>
            <li><strong>导出PDF打印：</strong>一键生成双面卡片PDF，使用A4纸打印后沿裁切线剪开即可使用。</li>
            <li><strong>翻卡练习：</strong>将卡片正面朝上让孩子认读，翻转到背面核对组词和笔画，反复练习加深记忆。</li>
          </ul>
          <p className="mb-3">
            建议家长每周根据课本生字表制作一批新卡片，每天利用碎片时间进行5-10分钟的翻卡练习。对于容易混淆的形近字，可以单独制作对比卡片进行专项训练。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">常见问题 FAQ</h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-slate-200">Q1：识字卡片生成器怎么用？</p>
              <p className="text-sm">输入想要学习的汉字，系统自动标注拼音并提供常用组词，支持批量添加多个汉字，生成双面卡片PDF。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q2：识字卡片可以打印吗？</p>
              <p className="text-sm">可以，生成双面卡片PDF文件，正面显示汉字和拼音，背面显示组词和笔画，打印裁剪后即可使用。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q3：适合多大孩子使用？</p>
              <p className="text-sm">适合幼儿园大班到小学低年级（5-8岁）的识字启蒙和巩固练习。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q4：识字卡片生成器收费吗？</p>
              <p className="text-sm">完全免费，无需注册，所有功能均可免费使用，不限制生成次数。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q5：可以自定义卡片内容吗？</p>
              <p className="text-sm">可以，支持输入任意汉字，系统自动标注拼音和组词，也可以手动编辑调整内容。</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">为何选择此工具</h3>
          <p className="mb-3">
            识字卡片的设计基于赫尔曼·艾宾浩斯遗忘曲线和"间隔重复"原理。研究发现，信息在首次学习后的20分钟内遗忘速度最快，1小时后遗忘约50%，1天后仅保留约30%。本工具的双面卡片设计（正面汉字加拼音、背面组词）正是为了实施高效的间隔复习——将待复习的旧字卡与学习的新字卡混合排列，在遗忘临界点进行主动回忆，大幅提升长期记忆效果。艾宾浩斯遗忘曲线在识字中的应用已被国内外教育研究反复验证，是科学识字的核心策略。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用建议</h3>
          <p className="mb-3">
            幼儿园大班到一年级上学期，识字目标为常用汉字400-600个，建议每天学习3-5个新字，复习10-15个旧字，每次练习5-8分钟。一年级下学期到二年级，累计识字量目标1200-1500个，每天新学5-8个字，复习15-20个旧字。建议采用"3-5-3法则"：新字连续3天巩固，间隔1天复习，间隔3天再复习，间隔5天最后确认掌握后移入已掌握字库。形近字如"已己巳"、"末未"等建议制作对比卡片集中攻克，每周专门安排一次易混字复习。
          </p>
        </div>
      </section>

      <ToolContent toolId="flashcards" />
    </>
  );
}
