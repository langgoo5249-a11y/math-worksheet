import type { Metadata } from "next";
import { headers } from "next/headers";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "www.skillxm.cn";
  const protocol = host.includes("localhost") ? "http" : "https";
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("x-matched-path") ?? "/tools/poem-memo";
  const canonicalUrl = `${protocol}://${host}${pathname}`;
  return {
    title: "古诗词默写生成器 - 240首小学必背古诗词在线打印 | 教材工具箱",
    description: "免费生成小学1-6年级必背古诗词默写练习卷，收录240首经典古诗词，支持填空默写、全诗默写、上下句默写三种模式，田字格方格横线格PDF打印，语文教师和家长必备复习工具",
    keywords: "古诗词默写,小学古诗词,必背古诗,古诗打印,默写练习,古诗词填空,唐诗三百首,宋词,古诗文默写,小学必背古诗75首,小学必背古诗80首,一年级古诗,二年级古诗,三年级古诗,古诗词上下句默写,古诗默写练习卷,古诗词复习,语文古诗默写",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      url: canonicalUrl,
      title: "古诗词默写生成器 - 240首小学必背古诗词在线打印 | 教材工具箱",
      description: "免费生成小学1-6年级必背古诗词默写练习卷，收录240首经典古诗词，支持填空默写、全诗默写、上下句默写三种模式，田字格方格横线格PDF打印，语文教师和家长必备复习工具",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("古诗词默写生成器")}&category=${encodeURIComponent("语文工具")}&icon=📜`, width: 1200, height: 630, alt: "古诗词默写生成器 - 教材工具箱" }, { url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "教材工具箱" }],
    },
  };
}

export default function PoemMemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sr-only">
        <h2>古诗词默写生成器 - 240首小学必背古诗词在线打印</h2>
        <p>免费生成小学必背古诗词默写练习卷，240首经典古诗词，三种默写模式PDF打印。教材工具箱收录小学1-6年级全部必背古诗词，支持填空默写、全诗默写、上下句默写等多种练习方式，是语文教师和学生家长必备的古诗词复习工具。</p>
        <h2>核心功能</h2>
        <ul>
          <li>240首古诗词：完整收录小学阶段必背古诗词，涵盖唐诗、宋词、元曲等经典篇目</li>
          <li>1-6年级覆盖：按年级分类，一年级到六年级的古诗词均可选择，方便针对性练习</li>
          <li>填空默写/全诗默写/上下句默写：三种默写模式，从易到难，满足不同学习阶段的需求。填空默写适合初学阶段，全诗默写适合巩固复习，上下句默写适合考试冲刺</li>
          <li>田字格/方格/横线格：支持田字格、方格、横线格三种书写格式，适应不同年级的书写要求</li>
          <li>PDF导出：一键生成PDF文件，方便打印使用，支持A4纸张标准格式</li>
        </ul>
        <h2>适用对象</h2>
        <p>古诗词默写生成器适合小学语文教师、学生家长以及小学各年级学生使用。无论是日常古诗词背诵检查、期中期末考试复习还是假期作业布置，都可以通过本工具快速生成专业的古诗词默写练习卷，提高古诗词学习效率。</p>
        <p>访问 <a href="https://www.skillxm.cn">教材工具箱</a> 获取更多免费教学工具。</p>
        <h2>相关学习文章</h2>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/gushi-shici-moxie-lianxi-fangfa">小学1-6年级必背古诗词完整清单及默写方法</a></li>
          <li><a href="https://www.skillxm.cn/blog/pinyin-xuexi-luxiantu">一年级拼音学习完整攻略</a></li>
          <li><a href="https://www.skillxm.cn/blog/sannianji-zuowen-rumen">三年级作文入门方法</a></li>
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
      <ToolBreadcrumb toolName="古诗词默写" toolPath="/tools/poem-memo" />
      {/* AdSense ad unit */}
      <div className="max-w-4xl mx-auto px-4 my-4">
        <div className="text-center">
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-4710405779358793"
            data-ad-slot=""
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              (adsbygoogle = window.adsbygoogle || []).push({});
            } catch(e) {}
          `,
        }}
      />
      {children}
    </>
  );
}
