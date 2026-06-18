import type { Metadata } from "next";
import { headers } from "next/headers";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "www.skillxm.cn";
  const protocol = host.includes("localhost") ? "http" : "https";
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("x-matched-path") ?? "/tools/calligraphy";
  const canonicalUrl = `${protocol}://${host}${pathname}`;
  return {
    title: "免费字帖生成器 - 田字格/米字格/楷体字帖 | 练学宝",
    description: "免费在线生成田字格米字格汉字字帖，支持楷体宋体黑体，自定义内容输入，PDF导出A4打印。适合小学生日常练字和书法初学者描红练习，输入任意汉字即可生成标准字帖模板。",
    keywords: "字帖生成器,练字帖生成,田字格字帖,米字格练习,汉字书写练习,楷体字帖打印,小学生练字,免费字帖下载,自定义字帖,硬笔书法练习,笔画笔顺,生字练习,描红字帖,书法入门,PDF字帖打印",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": "https://www.skillxm.cn/tools/calligraphy/",
      "en": "https://www.skillxm.cn/en/tools/calligraphy/",
      "ja": "https://www.skillxm.cn/ja/tools/calligraphy/",
      "ko": "https://www.skillxm.cn/ko/tools/calligraphy/",
      "x-default": "https://www.skillxm.cn/tools/calligraphy/",
    },
  },
    openGraph: {
      url: canonicalUrl,
      title: "字帖生成器 - 免费在线田字格米字格练字 | 练学宝",
      description: "免费在线生成田字格米字格汉字字帖，支持楷体宋体黑体，自定义内容输入，PDF导出A4打印。适合小学生日常练字和书法初学者描红练习，输入任意汉字即可生成标准字帖模板。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("字帖生成器")}&category=${encodeURIComponent("语文工具")}&icon=✍️`, width: 1200, height: 630, alt: "字帖生成器 - 练学宝" }, { url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "练学宝" }],
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
        <p><strong>一句话摘要：</strong>练学宝字帖生成器是一款免费在线汉字书写练习工具，支持自定义内容和多种格子样式，PDF导出打印，适合小学生练字和书法入门。</p>
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
        <p>访问 <a href="https://www.skillxm.cn">练学宝</a> 获取更多免费教学工具，包括数学练习卷生成器、英语字帖、数独游戏、口算速练等。</p>
        <p>相关学习文章</p>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/haizi-lianzi-shijianbiao">孩子写字歪歪扭扭？练字时间表和方法</a></li>
          <li><a href="https://www.skillxm.cn/blog/ertong-lianzi-nianling">小学生练字最佳年龄和方法</a></li>
          <li><a href="https://www.skillxm.cn/blog/fanggezhi-tianzige">田字格、米字格、方格纸的使用场景和选择</a></li>
          <li><a href="https://www.skillxm.cn/blog/mianfei-zitie-shengchengqi-tuijian">免费字帖生成器推荐</a></li>
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
      <ToolBreadcrumb toolName="字帖生成器" toolPath="/tools/calligraphy" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          免费在线生成田字格、米字格汉字字帖，支持楷体/宋体/黑体等多种字体，自定义内容输入，一键PDF导出A4打印。适合小学生日常练字和书法初学者描红练习。
        </p>
      </div>
      {children}
    </>
  );
}
