import type { Metadata } from "next";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import ToolPageSchema from '@/app/_components/ToolPageSchema';

export async function generateMetadata(): Promise<Metadata> {
    const canonicalUrl = 'https://www.skillxm.cn/tools/pinyin/';
  return {
    title: "拼音学习工具 - 声母韵母/拼音注音/四线三格 | 练学宝",
    description: "免费拼音学习工具，完整收录声母韵母和整体认读音节，采用四线三格标准格式，支持PDF导出A4打印。帮助小学生规范拼音书写，打好语文学习基础。",
    keywords: "拼音练习,拼音注音,声母韵母,整体认读音节,拼音学习,小学拼音,拼音打印,一年级拼音练习,声母韵母练习,拼音四线三格,拼音描红,拼音书写,幼小衔接拼音,拼音启蒙,拼音学习资料,拼音练习纸,拼音测试题",
    alternates: {
    canonical: canonicalUrl,
  },
    openGraph: {
      url: canonicalUrl,
      title: "拼音注音练习 - 免费在线拼音学习工具 | 练学宝",
      description: "免费拼音学习工具，完整收录声母韵母和整体认读音节，采用四线三格标准格式，支持PDF导出A4打印。帮助小学生规范拼音书写，打好语文学习基础。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("拼音注音练习")}&category=${encodeURIComponent("语文工具")}&icon=📝`, width: 1200, height: 630, alt: "拼音注音练习 - 练学宝" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "拼音注音练习 - 免费在线拼音学习工具 | 练学宝",
      description: "免费拼音学习工具，完整收录声母韵母和整体认读音节，采用四线三格标准格式，支持PDF导出A4打印。帮助小学生规范拼音书写，打好语文学习基础。",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("拼音注音练习")}&category=${encodeURIComponent("语文工具")}&icon=📝`, width: 1200, height: 630, alt: "拼音注音练习 - 练学宝" }],
    },
  };
}

export default function PinyinLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sr-only">
        <p>拼音学习工具 - 声母韵母四线三格练习免费打印</p>
        <p>免费拼音学习工具，声母韵母练习，四线三格标准格式PDF打印。练学宝提供专业的拼音书写练习工具，涵盖声母、韵母、整体认读音节全部内容，采用标准四线三格格式，帮助小学生规范拼音书写。</p>
        <p>练学宝拼音学习工具是一款免费在线拼音练习工具，完整收录23个声母、24个韵母和16个整体认读音节，采用四线三格标准格式支持PDF打印，适合一年级学生拼音启蒙。</p>
        <p>核心功能</p>
        <ul>
          <li>声母练习：完整收录23个声母（b p m f d t n l g k h j q x zh ch sh r z c s y w），提供标准四线三格书写练习</li>
          <li>韵母练习：完整收录24个韵母（单韵母、复韵母、鼻韵母），帮助学生掌握韵母的正确书写方式</li>
          <li>整体认读音节：收录16个整体认读音节（zhi chi shi ri zi ci si yi wu yu ye yue yuan yin yun ying），方便专项练习</li>
          <li>四线三格标准格式：采用标准四线三格排版，与教材格式一致，培养学生规范的拼音书写习惯</li>
          <li>PDF导出：一键生成PDF文件，方便打印使用，支持A4纸张标准格式，可反复练习</li>
        </ul>
        <p>适用对象</p>
        <p>拼音学习工具适合小学一年级语文教师、幼儿园大班教师、学生家长以及从事拼音教学的培训机构使用。无论是课堂教学、课后辅导还是家庭早教，都可以通过本工具生成专业的拼音书写练习纸，帮助孩子打好拼音基础。</p>
        <p>访问 <a href="https://www.skillxm.cn/">练学宝</a> 获取更多免费教学工具。</p>
        <p>相关学习文章</p>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/pinyin-xuexi-luxiantu/">一年级拼音学习完整攻略</a></li>
          <li><a href="https://www.skillxm.cn/blog/yinianji-pinyin-shizi-kousuan-gonglue/">一年级家长必看：拼音+识字+口算全攻略</a></li>
          <li><a href="https://www.skillxm.cn/blog/shizi-fangfa-tisheng/">小学识字方法大比拼</a></li>
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "如何使用拼音学习工具",
            "description": "拼音学习工具使用教程，4步快速生成拼音四线三格练习纸，支持PDF打印",
            "totalTime": "PT3M",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "选择拼音类型",
                "text": "选择声母、韵母或整体认读音节类型"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "选择具体拼音内容",
                "text": "从23个声母、24个韵母或16个整体认读音节中选择需要练习的内容"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "预览四线三格练习纸",
                "text": "预览标准四线三格格式的拼音书写练习纸效果"
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
                "name": "拼音学习工具包含哪些内容？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "完整收录23个声母、24个韵母和16个整体认读音节，涵盖小学一年级拼音学习全部内容。"
                }
              },
              {
                "@type": "Question",
                "name": "拼音练习纸是什么格式？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "采用标准四线三格格式，与教材格式一致，帮助孩子养成规范的拼音书写习惯。"
                }
              },
              {
                "@type": "Question",
                "name": "可以打印拼音练习纸吗？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "可以，一键生成PDF文件，A4纸张直接打印，可反复练习。"
                }
              },
              {
                "@type": "Question",
                "name": "适合什么时候开始学拼音？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "适合幼小衔接阶段（大班下学期）和小学一年级上学期使用。"
                }
              },
              {
                "@type": "Question",
                "name": "拼音学习工具免费吗？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "完全免费，无需注册登录，所有拼音练习内容均可免费使用和打印。"
                }
              }
            ]
          })
        }}
      />
            <ToolPageSchema toolPath="/tools/pinyin/" />
      <ToolBreadcrumb toolName="拼音注音" toolPath="/tools/pinyin" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          拼音学习工具，完整收录声母韵母和整体认读音节，四线三格标准格式，PDF导出A4打印。帮助小学生规范拼音书写，打好语文基础。
        </p>
      </div>
      {children}

      {/* 可见 SEO 内容区域 -- 爬虫可直接抓取 */}
      <section className="max-w-4xl mx-auto px-4 mt-12 mb-8 print:hidden">
        <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-6 md:p-8 text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-100 mb-4">拼音学习工具 - 免费声母韵母练习与四线三格拼音注音</h2>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">工具介绍</h3>
          <p className="mb-3">
            练学宝<strong>拼音学习</strong>工具是一款专为幼小衔接和小学一年级学生设计的拼音练习工具，完整收录23个<strong>声母</strong>、24个<strong>韵母</strong>和16个整体认读音节。本工具采用标准<strong>四线三格</strong>格式，与小学语文教材完全一致，帮助孩子从认读拼音过渡到规范书写，打好语文学习的基础。
          </p>
          <p className="mb-3">
            拼音是小学语文学习的第一个难关，很多孩子能够认读拼音却在书写时出现问题，如占格错误、笔画顺序不对等。本工具提供每个拼音字母的标准<strong>拼音标注</strong>和书写示范，孩子可以在四线三格中反复描摹和练习，逐步养成规范的书写习惯。无论是幼儿园大班的拼音启蒙，还是一年级上学期的课堂巩固，本工具都能提供有效的练习支持。所有内容完全免费，可导出PDF反复打印练习。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">使用指南</h3>
          <p className="mb-2">使用拼音学习工具进行规范练习非常简单：</p>
          <ul className="list-disc list-inside space-y-1 mb-3 ml-2">
            <li><strong>选择拼音类型：</strong>先练习23个声母，再学习24个韵母，最后掌握16个整体认读音节，循序渐进。</li>
            <li><strong>观察书写示范：</strong>仔细查看每个拼音字母在四线三格中的占格位置和笔画顺序，这是规范书写的关键。</li>
            <li><strong>描摹练习：</strong>初学者可先沿灰色示范字母描摹，熟悉后再进行独立书写练习。</li>
            <li><strong>听写测试：</strong>家长读出拼音，让孩子在空白四线三格中写出对应的字母，检验掌握程度。</li>
            <li><strong>导出PDF打印：</strong>将需要重点练习的拼音内容生成PDF文件，打印后反复练习，直到完全掌握。</li>
          </ul>
          <p className="mb-3">
            建议每天练习5-8个拼音字母，每次10-15分钟。声母和韵母分别掌握后，再进行拼读组合练习。整体认读音节需要单独记忆，不要尝试拆分拼读。
          </p>

          <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">常见问题 FAQ</h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-slate-200">Q1：拼音学习工具包含哪些内容？</p>
              <p className="text-sm">完整收录23个声母、24个韵母和16个整体认读音节，涵盖小学一年级拼音学习全部内容。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q2：拼音练习纸是什么格式？</p>
              <p className="text-sm">采用标准四线三格格式，与教材格式一致，帮助孩子养成规范的拼音书写习惯。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q3：可以打印拼音练习纸吗？</p>
              <p className="text-sm">可以，一键生成PDF文件，A4纸张直接打印，可反复练习。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q4：适合什么时候开始学拼音？</p>
              <p className="text-sm">适合幼小衔接阶段（大班下学期）和小学一年级上学期使用，是语文学习的基础。</p>
            </div>
            <div>
              <p className="font-medium text-slate-200">Q5：拼音学习工具免费吗？</p>
              <p className="text-sm">完全免费，无需注册登录，所有拼音练习内容均可免费使用和打印。</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
