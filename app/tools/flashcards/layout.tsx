import type { Metadata } from "next";
import { headers } from "next/headers";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "www.skillxm.cn";
  const protocol = host.includes("localhost") ? "http" : "https";
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("x-matched-path") ?? "/tools/flashcards";
  const canonicalUrl = `${protocol}://${host}${pathname}`;
  return {
    title: "识字卡片生成器 - 汉字拼音识字卡 | 练学宝",
    description: "免费生成汉字识字卡片，自动标注拼音并提供常用组词，支持双面卡片PDF打印。适合小学语文教师和家长快速生成专业识字卡，用于课堂教学和家庭辅导。",
    keywords: "识字卡片,汉字卡片,拼音识字,识字练习,小学识字,免费识字卡,汉字学习,识字卡打印,一年级识字卡片,二年级生字卡片,学前识字,幼小衔接识字,汉字拼音卡片,识字卡片制作,生字卡片打印,识字游戏,学前班识字,幼儿园识字卡",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": "https://www.skillxm.cn/tools/flashcards/",
      "en": "https://www.skillxm.cn/en/tools/flashcards/",
      "ja": "https://www.skillxm.cn/ja/tools/flashcards/",
      "ko": "https://www.skillxm.cn/ko/tools/flashcards/",
      "x-default": "https://www.skillxm.cn/tools/flashcards/",
    },
  },
    openGraph: { url: canonicalUrl, title: "识字卡片生成器 - 练学宝", description: "免费生成汉字识字卡片，自动标注拼音并提供常用组词，支持双面卡片PDF打印。适合小学语文教师和家长快速生成专业识字卡，用于课堂教学和家庭辅导。", images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("识字卡片生成器")}&category=${encodeURIComponent("语文工具")}&icon=🃏`, width: 1200, height: 630, alt: "识字卡片生成器 - 练学宝" }, { url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "练学宝" }] },
  };
}

export default function FlashcardsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sr-only">
        <h2>识字卡片生成器 - 汉字卡片免费打印</h2>
        <p>免费生成汉字识字卡片，支持拼音组词，双面卡片PDF打印。练学宝提供在线识字卡片制作工具，帮助小学语文教师和家长快速生成专业的汉字识字卡，适合课堂教学和家庭辅导使用。</p>
        <h2>核心功能</h2>
        <ul>
          <li>自定义汉字：输入任意汉字即可生成对应的识字卡片，支持批量添加多个汉字</li>
          <li>拼音标注：自动为每个汉字标注标准拼音，帮助小学生正确认读</li>
          <li>组词示例：为每个汉字提供常用组词，拓展词汇学习</li>
          <li>双面打印：生成双面卡片PDF，正面显示汉字和拼音，背面显示组词和笔画，方便打印裁剪后使用</li>
        </ul>
        <h2>适用对象</h2>
        <p>识字卡片生成器适合小学语文教师、幼儿园教师、学生家长以及从事汉字教学的培训机构使用。无论是课堂教学、课后辅导还是家庭早教，都可以通过本工具快速生成专业的识字卡片，提高汉字学习效率。</p>
        <p>访问 <a href="https://www.skillxm.cn">练学宝</a> 获取更多免费教学工具。</p>
        <h2>相关学习文章</h2>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/shizi-fangfa-tisheng">小学识字方法大比拼</a></li>
          <li><a href="https://www.skillxm.cn/blog/pinyin-xuexi-luxiantu">一年级拼音学习完整攻略</a></li>
          <li><a href="https://www.skillxm.cn/blog/yinianji-pinyin-shizi-kousuan-gonglue">一年级家长必看：拼音+识字+口算全攻略</a></li>
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
      <ToolBreadcrumb toolName="识字卡片" toolPath="/tools/flashcards" />

    </>
  );
}
