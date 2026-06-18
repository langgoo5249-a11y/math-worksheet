import type { Metadata } from "next";
import { headers } from "next/headers";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "www.skillxm.cn";
  const protocol = host.includes("localhost") ? "http" : "https";
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("x-matched-path") ?? "/tools/writing-template";
  const canonicalUrl = `${protocol}://${host}${pathname}`;
  return {
    title: "作文模板生成器 - 看图写话/日记/作文格纸 | 练学宝",
    description: "免费生成小学作文格纸模板，涵盖看图写话、日记、作文格子纸等多种格式，支持田字格方格横线格，PDF导出A4打印。适合小学低年级到高年级写作练习。",
    keywords: "作文模板,看图写话,日记模板,作文格纸,小学作文,写作练习,作文纸打印,作文格子,三年级作文模板,看图写话练习纸,小学生日记格式,作文开头结尾,写人作文模板,记事作文模板,写景作文模板,作文素材,低年级写话,作文格子纸",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": "https://www.skillxm.cn/tools/writing-template/",
      "en": "https://www.skillxm.cn/en/tools/writing-template/",
      "ja": "https://www.skillxm.cn/ja/tools/writing-template/",
      "ko": "https://www.skillxm.cn/ko/tools/writing-template/",
      "x-default": "https://www.skillxm.cn/tools/writing-template/",
    },
  },
    openGraph: { url: canonicalUrl, title: "作文模板生成器 - 练学宝", description: "免费生成小学作文格纸模板，涵盖看图写话、日记、作文格子纸等多种格式，支持田字格方格横线格，PDF导出A4打印。适合小学低年级到高年级写作练习。", images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("作文模板生成器")}&category=${encodeURIComponent("语文工具")}&icon=📄`, width: 1200, height: 630, alt: "作文模板生成器 - 练学宝" }, { url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "练学宝" }] },
  };
}

export default function WritingTemplateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sr-only">
        <h2>作文模板生成器 - 小学作文格纸免费打印</h2>
        <p>免费生成小学作文格纸模板，看图写话、日记、作文格子纸。练学宝提供多种作文书写模板，涵盖小学低年级到高年级的写作练习需求，支持PDF格式免费打印。</p>
        <p><strong>一句话摘要：</strong>练学宝作文模板是一款免费在线作文辅助工具，提供看图写话、日记、记叙文等多种作文模板，支持自定义内容和稿纸样式，PDF导出打印，适合小学生作文入门训练。</p>
        <h2>核心功能</h2>
        <ul>
          <li>看图写话模板：专为小学低年级设计，配有图片区域和拼音格/田字格书写区域，适合一二年级看图写话练习</li>
          <li>日记模板：提供标准日记格式模板，包含日期、天气、星期等栏目，帮助学生养成写日记的习惯</li>
          <li>作文格纸：提供标准作文格子纸模板，支持不同行距和格子大小，适合各年级作文书写练习</li>
          <li>多种格式：支持田字格、方格、横线格等多种书写格式，满足不同年级和不同场景的写作需求</li>
        </ul>
        <h2>适用对象</h2>
        <p>作文模板生成器适合小学语文教师、学生家长以及小学各年级学生使用。无论是日常写作练习、考试作文训练还是家庭作业，都可以通过本工具快速生成规范的作文书写模板，培养孩子良好的书写习惯。</p>
        <p>访问 <a href="https://www.skillxm.cn">练学宝</a> 获取更多免费教学工具。</p>
        <h2>相关学习文章</h2>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/xiaoxue-zuowen-moban">小学作文不会写？3个模板轻松写出300字</a></li>
          <li><a href="https://www.skillxm.cn/blog/sannianji-zuowen-rumen">三年级作文入门方法</a></li>
          <li><a href="https://www.skillxm.cn/blog/kantu-xiehua-xunlian">如何辅导孩子看图写话</a></li>
          <li><a href="https://www.skillxm.cn/blog/xiaoxue-zuowen-fudao-moban-shengcheng">小学作文辅导：写作不再难</a></li>
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
      <ToolBreadcrumb toolName="作文模板" toolPath="/tools/writing-template" />
      {children}
    </>
  );
}
