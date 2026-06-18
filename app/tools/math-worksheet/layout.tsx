import type { Metadata } from "next";
import { headers } from "next/headers";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "www.skillxm.cn";
  const protocol = host.includes("localhost") ? "http" : "https";
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("x-matched-path") ?? "/tools/math-worksheet";
  const canonicalUrl = `${protocol}://${host}${pathname}`;
  return {
    title: "小学数学练习卷生成器 - 1-6年级免费在线出题PDF打印 | 练学宝",
    description: "免费在线生成小学1-6年级数学练习卷，支持加减乘除、竖式计算、填空题、应用题等11种题型，随机出题PDF打印",
    keywords: "数学练习卷生成器,小学数学练习题,口算题生成,竖式计算打印,数学作业PDF,加减乘除出题,1-6年级数学试卷,免费数学出题器,在线数学练习,应用题生成器,数学每日一练,数学思维训练,混合运算练习题,小学数学题库,免费打印试卷",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": "https://www.skillxm.cn/tools/math-worksheet/",
      "en": "https://www.skillxm.cn/en/tools/math-worksheet/",
      "ja": "https://www.skillxm.cn/ja/tools/math-worksheet/",
      "ko": "https://www.skillxm.cn/ko/tools/math-worksheet/",
      "x-default": "https://www.skillxm.cn/tools/math-worksheet/",
    },
  },
    openGraph: {
      url: canonicalUrl,
      title: "数学练习卷生成器 - 免费在线出题打印 | 练学宝",
      description: "免费在线生成小学1-6年级数学练习卷，支持加减乘除、竖式计算、填空题、应用题等11种题型，随机出题PDF打印",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("数学练习卷生成器")}&category=${encodeURIComponent("数学工具")}&icon=🧮`, width: 1200, height: 630, alt: "数学练习卷生成器 - 练学宝" }, { url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "练学宝" }],
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
        <p><strong>一句话摘要：</strong>练学宝数学练习卷生成器是一款免费在线出题工具，支持11种题型和1-6年级全学段，可一键生成个性化数学练习卷并导出PDF打印，适合教师和家长日常使用。</p>
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
        <p>访问 <a href="https://www.skillxm.cn">练学宝</a> 获取更多免费教学工具，包括字帖生成器、英语字帖、数独游戏、口算速练等。</p>
        <p>相关学习文章</p>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/yinianji-shuxue-ruxue">一年级数学入学准备：从数数到20以内加减法的完整路径</a></li>
          <li><a href="https://www.skillxm.cn/blog/kousuan-sudu-tisheng-shizhan-20ti">口算速度提升实战：从每分钟5题到20题</a></li>
          <li><a href="https://www.skillxm.cn/blog/xueba-xuexi-xiguan">学霸学习习惯养成方法</a></li>
          <li><a href="https://www.skillxm.cn/blog/shushi-jisuan-jiaoxue">小学数学竖式计算全攻略</a></li>
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
      <ToolBreadcrumb toolName="数学练习卷" toolPath="/tools/math-worksheet" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          免费生成小学1-6年级数学练习卷，支持加减乘除、竖式计算、填空题、应用题等11种题型，随机出题PDF打印，可自定义年级和难度。
        </p>
      </div>
      {children}
    </>
  );
}
