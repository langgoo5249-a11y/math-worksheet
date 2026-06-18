import type { Metadata } from "next";
import { headers } from "next/headers";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "www.skillxm.cn";
  const protocol = host.includes("localhost") ? "http" : "https";
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("x-matched-path") ?? "/tools/pinyin";
  const canonicalUrl = `${protocol}://${host}${pathname}`;
  return {
    title: "拼音学习工具 - 声母韵母/拼音注音/四线三格 | 练学宝",
    description: "免费拼音学习工具，完整收录声母韵母和整体认读音节，采用四线三格标准格式，支持PDF导出A4打印。帮助小学生规范拼音书写，打好语文学习基础。",
    keywords: "拼音练习,拼音注音,声母韵母,整体认读音节,拼音学习,小学拼音,拼音打印,一年级拼音练习,声母韵母练习,拼音四线三格,拼音描红,拼音书写,幼小衔接拼音,拼音启蒙,拼音学习资料,拼音练习纸,拼音测试题",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": "https://www.skillxm.cn/tools/pinyin/",
      "en": "https://www.skillxm.cn/en/tools/pinyin/",
      "ja": "https://www.skillxm.cn/ja/tools/pinyin/",
      "ko": "https://www.skillxm.cn/ko/tools/pinyin/",
      "x-default": "https://www.skillxm.cn/tools/pinyin/",
    },
  },
    openGraph: {
      url: canonicalUrl,
      title: "拼音注音练习 - 免费在线拼音学习工具 | 练学宝",
      description: "免费拼音学习工具，完整收录声母韵母和整体认读音节，采用四线三格标准格式，支持PDF导出A4打印。帮助小学生规范拼音书写，打好语文学习基础。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("拼音注音练习")}&category=${encodeURIComponent("语文工具")}&icon=📝`, width: 1200, height: 630, alt: "拼音注音练习 - 练学宝" }, { url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "练学宝" }],
    },
  };
}

export default function PinyinLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sr-only">
        <h2>拼音学习工具 - 声母韵母四线三格练习免费打印</h2>
        <p>免费拼音学习工具，声母韵母练习，四线三格标准格式PDF打印。练学宝提供专业的拼音书写练习工具，涵盖声母、韵母、整体认读音节全部内容，采用标准四线三格格式，帮助小学生规范拼音书写。</p>
        <h2>核心功能</h2>
        <ul>
          <li>声母练习：完整收录23个声母（b p m f d t n l g k h j q x zh ch sh r z c s y w），提供标准四线三格书写练习</li>
          <li>韵母练习：完整收录24个韵母（单韵母、复韵母、鼻韵母），帮助学生掌握韵母的正确书写方式</li>
          <li>整体认读音节：收录16个整体认读音节（zhi chi shi ri zi ci si yi wu yu ye yue yuan yin yun ying），方便专项练习</li>
          <li>四线三格标准格式：采用标准四线三格排版，与教材格式一致，培养学生规范的拼音书写习惯</li>
          <li>PDF导出：一键生成PDF文件，方便打印使用，支持A4纸张标准格式，可反复练习</li>
        </ul>
        <h2>适用对象</h2>
        <p>拼音学习工具适合小学一年级语文教师、幼儿园大班教师、学生家长以及从事拼音教学的培训机构使用。无论是课堂教学、课后辅导还是家庭早教，都可以通过本工具生成专业的拼音书写练习纸，帮助孩子打好拼音基础。</p>
        <p>访问 <a href="https://www.skillxm.cn">练学宝</a> 获取更多免费教学工具。</p>
        <h2>相关学习文章</h2>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/pinyin-xuexi-luxiantu">一年级拼音学习完整攻略</a></li>
          <li><a href="https://www.skillxm.cn/blog/yinianji-pinyin-shizi-kousuan-gonglue">一年级家长必看：拼音+识字+口算全攻略</a></li>
          <li><a href="https://www.skillxm.cn/blog/shizi-fangfa-tisheng">小学识字方法大比拼</a></li>
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
      <ToolBreadcrumb toolName="拼音注音" toolPath="/tools/pinyin" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          拼音学习工具，完整收录声母韵母和整体认读音节，四线三格标准格式，PDF导出A4打印。帮助小学生规范拼音书写，打好语文基础。
        </p>
      </div>
      {children}
    </>
  );
}
