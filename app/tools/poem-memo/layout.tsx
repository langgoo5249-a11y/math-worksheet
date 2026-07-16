import type { Metadata } from "next";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import ToolPageSchema from '@/app/_components/ToolPageSchema';
import ToolContent from '@/app/tools/_components/ToolContent';

export async function generateMetadata(): Promise<Metadata> {
    const canonicalUrl = 'https://www.skillxm.cn/tools/poem-memo/';
  return {
    title: "古诗词默写生成器免费 - 240首小学必背古诗填空全诗打印 | 练学宝",
    description: "免费生成小学1-6年级必背古诗词默写练习卷，收录240首经典古诗词，支持填空默写、全诗默写、上下句默写三种模式，田字格方格排版一键导出PDF打印。与部编版教材同步，适合课后复习和考前冲刺默写训练，配答案详解和易错字标注，可重复打印永久免费，家长教师零成本使用即开即用，手机电脑均可使用，适合期末复习考前冲刺。",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": canonicalUrl,
      "x-default": canonicalUrl,
    },
  },
    openGraph: {
      url: canonicalUrl,
      title: "古诗词默写生成器 - 240首小学必背古诗词在线打印 | 练学宝",
      description: "免费生成小学1-6年级必背古诗词默写练习卷，收录240首经典古诗词，支持填空默写、全诗默写、上下句默写三种模式，田字格方格排版一键导出PDF打印。与部编版教材同步，适合课后复习和考前冲刺默写训练，配答案详解和易错字标注，可重复打印永久免费，家长教师零成本使用即开即用，手机电脑均可使用，适合期末复习考前冲刺。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("古诗词默写生成器")}&category=${encodeURIComponent("语文工具")}&icon=📜`, width: 1200, height: 630, alt: "古诗词默写生成器 - 练学宝" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "古诗词默写生成器 - 240首小学必背古诗词在线打印 | 练学宝",
      description: "免费生成小学1-6年级必背古诗词默写练习卷，收录240首经典古诗词，支持填空默写、全诗默写、上下句默写三种模式，田字格方格排版一键导出PDF打印。与部编版教材同步，适合课后复习和考前冲刺默写训练，配答案详解和易错字标注，可重复打印永久免费，家长教师零成本使用即开即用，手机电脑均可使用，适合期末复习考前冲刺。",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("古诗词默写生成器")}&category=${encodeURIComponent("语文工具")}&icon=📜`, width: 1200, height: 630, alt: "古诗词默写生成器 - 练学宝" }],
    },
  };
}

export default function PoemMemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sr-only">
        <p>古诗词默写生成器 - 240首小学必背古诗词在线打印</p>
        <p>免费生成小学必背古诗词默写练习卷，240首经典古诗词，三种默写模式PDF打印。练学宝收录小学1-6年级全部必背古诗词，支持填空默写、全诗默写、上下句默写等多种练习方式，是语文教师和学生家长必备的古诗词复习工具。</p>
        <p>练学宝古诗词默写是一款免费在线诗词学习工具，收录小学必背240首古诗词，支持填空默写和全文背诵两种模式，适合小学生古诗文积累和考前复习。</p>
        <p>核心功能</p>
        <ul>
          <li>240首古诗词：完整收录小学阶段必背古诗词，涵盖唐诗、宋词、元曲等经典篇目</li>
          <li>1-6年级覆盖：按年级分类，一年级到六年级的古诗词均可选择，方便针对性练习</li>
          <li>填空默写/全诗默写/上下句默写：三种默写模式，从易到难，满足不同学习阶段的需求。填空默写适合初学阶段，全诗默写适合巩固复习，上下句默写适合考试冲刺</li>
          <li>田字格/方格/横线格：支持田字格、方格、横线格三种书写格式，适应不同年级的书写要求</li>
          <li>PDF导出：一键生成PDF文件，方便打印使用，支持A4纸张标准格式</li>
        </ul>
        <p>适用对象</p>
        <p>古诗词默写生成器适合小学语文教师、学生家长以及小学各年级学生使用。无论是日常古诗词背诵检查、期中期末考试复习还是假期作业布置，都可以通过本工具快速生成专业的古诗词默写练习卷，提高古诗词学习效率。</p>
        <p>访问 <a href="https://www.skillxm.cn/">练学宝</a> 获取更多免费教学工具。</p>
        <p>相关学习文章</p>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/gushi-shici-moxie-lianxi-fangfa/">小学1-6年级必背古诗词完整清单及默写方法</a></li>
          <li><a href="https://www.skillxm.cn/blog/pinyin-xuexi-luxiantu/">一年级拼音学习完整攻略</a></li>
          <li><a href="https://www.skillxm.cn/blog/sannianji-zuowen-rumen/">三年级作文入门方法</a></li>
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "如何使用古诗词默写生成器",
            "description": "古诗词默写生成器使用教程，5步快速生成小学必背古诗词默写练习卷，支持PDF打印",
            "totalTime": "PT5M",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "选择年级和册次",
                "text": "覆盖1-6年级上下册"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "选择默写模式",
                "text": "填空默写、全诗默写、上下句默写"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "选择格子格式",
                "text": "田字格、方格、横线格"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "预览默写卷",
                "text": "在线预览效果，确认内容无误"
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "导出PDF打印",
                "text": "一键生成A4格式默写卷，打印使用"
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
                "name": "收录了多少首古诗词？",
                "acceptedAnswer": { "@type": "Answer", "text": "收录240首经典古诗词，完整覆盖小学1-6年级必背古诗词及课外拓展篇目。" }
              },
              {
                "@type": "Question",
                "name": "支持哪些默写模式？",
                "acceptedAnswer": { "@type": "Answer", "text": "支持填空默写、全诗默写、上下句默写三种模式，从易到难满足不同学习阶段需求。" }
              },
              {
                "@type": "Question",
                "name": "可以按年级筛选古诗吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "可以，所有古诗词按年级分类，一年级到六年级的古诗词均可单独选择。" }
              },
              {
                "@type": "Question",
                "name": "生成的默写卷可以打印吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "可以，一键生成PDF文件，支持田字格、方格、横线格三种书写格式，A4纸直接打印。" }
              },
              {
                "@type": "Question",
                "name": "古诗词默写生成器收费吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "完全免费，无需注册，所有功能均可免费使用。" }
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
            "@id": "https://www.skillxm.cn/tools/poem-memo/#speakable",
            "cssSelector": [
              "h1",
              "h2",
              ".seo-content h3",
              ".seo-content p"
            ]
          })
        }}
      />
      <ToolPageSchema toolPath="/tools/poem-memo/" />
      <ToolBreadcrumb toolName="古诗词默写" toolPath="/tools/poem-memo" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          收录240首小学必背古诗词，支持填空默写、全诗默写、上下句默写三种模式，田字格方格横线格PDF打印，语文教师和家长必备复习工具。
        </p>
      </div>
      {children}

      {/* 可见 SEO 内容区域 -- 爬虫可直接抓取 */}
      <section className="max-w-4xl mx-auto px-4 mt-12 mb-8 print:hidden">
        <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-6 md:p-8 text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-100 mb-4">古诗词默写生成器 - 240首小学必背古诗词填空与在线打印</h2>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">工具介绍</h3>
          <p className="mb-3">
            练学宝<strong>古诗词默写</strong>生成器是一款专为小学生古诗文学习设计的复习工具，完整收录240首<strong>小学必背古诗</strong>，涵盖唐诗、宋词、元曲等经典篇目。本工具支持填空默写、全诗默写、上下句默写三种练习模式，并提供田字格、方格、横线格三种书写格式，是语文教师备课和家长辅导的必备工具。
          </p>
          <p className="mb-3">
            古诗文积累是小学语文教学的重要内容，也是考试中的必考题型。很多孩子在背诵时流利顺畅，但在默写时却出现错别字、漏字或顺序错误。本工具通过<strong>古诗填空</strong>模式，将诗句中的关键字词留空让孩子填写，既能检验背诵效果，又能强化对重点字词的记忆。全诗默写模式则适合考前冲刺和阶段性复习，帮助孩子全面巩固诗词内容。所有练习卷均可免费导出PDF打印。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用指南</h3>
          <p className="mb-2">使用古诗词默写生成器制作练习卷非常简单：</p>
          <ul className="list-disc list-inside space-y-1 mb-3 ml-2">
            <li><strong>选择年级和册次：</strong>按1-6年级上下册筛选需要练习的古诗词，确保与学校教学进度同步。</li>
            <li><strong>选择默写模式：</strong>初学阶段建议使用填空默写，巩固阶段使用全诗默写，考前复习使用上下句默写。</li>
            <li><strong>选择书写格式：</strong>低年级建议使用田字格，中高年级可使用方格或横线格，与平时作业格式保持一致。</li>
            <li><strong>预览默写卷：</strong>在线查看默写卷效果，确认留空位置和诗词内容是否正确。</li>
            <li><strong>导出PDF打印：</strong>一键生成A4格式默写卷，打印后让孩子在规定时间内完成，模拟真实考试场景。</li>
          </ul>
          <p className="mb-3">
            建议每学完一个单元就生成一份对应的默写练习，及时检验掌握情况。期中期末考试前一周，可集中生成全诗默写卷进行系统复习。对于容易写错的字词，建议单独抄写强化记忆。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">常见问题 FAQ</h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-slate-200">Q1：收录了多少首古诗词？</p>
              <p className="text-sm">收录240首经典古诗词，完整覆盖小学1-6年级必背古诗词及课外拓展篇目。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q2：支持哪些默写模式？</p>
              <p className="text-sm">支持填空默写、全诗默写、上下句默写三种模式，从易到难满足不同学习阶段需求。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q3：可以按年级筛选古诗吗？</p>
              <p className="text-sm">可以，所有古诗词按年级分类，一年级到六年级的古诗词均可单独选择。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q4：生成的默写卷可以打印吗？</p>
              <p className="text-sm">可以，一键生成PDF文件，支持田字格、方格、横线格三种书写格式，A4纸直接打印。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q5：古诗词默写生成器收费吗？</p>
              <p className="text-sm">完全免费，无需注册，所有功能均可免费使用，不限制生成和打印次数。</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">为何选择此工具</h3>
          <p className="mb-3">
            古诗词背诵是小学语文核心素养的重要组成部分，其教育价值远不止应对考试。从语言学角度看，古诗词语言高度凝练、韵律感强，背诵积累能显著提升儿童的语言节奏感和词汇量。从认知心理学角度看，本工具支持的三种默写模式——填空、全诗、上下句——分别对应了"识别回忆"、"自主提取"、"关联触发"三种不同的记忆层级。这种多层级测试策略比单纯的反复朗读效果高出2-3倍，体现了"测试效应"在教育中的应用价值，也是新课标必背古诗词要求的科学实践方法。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用建议</h3>
          <p className="mb-3">
            建议采用艾宾浩斯曲线制定复习计划：学完一首新诗后，第1天默写检查、第3天再次默写、第7天第三次巩固、第21天最终确认。日常使用中，填空默写适合初学阶段（每天1-2首），全诗默写适合周复习（每周5-8首），上下句默写适合考前冲刺（每天10-15首）。一年级每学期掌握8-10首即可，三年级每学期15-20首，五六年级每学期25-30首。新课标要求小学阶段必背古诗词共75首，本工具收录240首将拓展篇目也纳入其中，满足不同层次需求。
          </p>
        </div>
      </section>

      <ToolContent toolId="poem-memo" />
    </>
  );
}
