import type { Metadata } from "next";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import ToolPageSchema from '@/app/_components/ToolPageSchema';

export async function generateMetadata(): Promise<Metadata> {
    const canonicalUrl = 'https://www.skillxm.cn/tools/english-calligraphy/';
  return {
    title: "英文字帖生成器 - 四线三格英文书写练习 | 练学宝",
    description: "免费生成四线三格英文字帖，支持手写体印刷体等多种字体，可自定义单词句子内容，PDF导出A4打印。适合小学生英语书写练习，帮助规范英文字母书写格式。",
    keywords: "英语字帖,四线三格,英语练习,英文字帖,英语书写,英语打印,免费英语字帖,英文字母描红,小学英语书写练习,英语字母练习,英语单词书写,英语手写体,英语印刷体,三年级英语字帖,英语书写规范,英语抄写本,英语练字",
    alternates: {
    canonical: canonicalUrl,
  },
    openGraph: {
      url: canonicalUrl,
      title: "英语字帖生成器 - 免费四线三格英语练习 | 练学宝",
      description: "免费生成四线三格英文字帖，支持手写体印刷体等多种字体，可自定义单词句子内容，PDF导出A4打印。适合小学生英语书写练习，帮助规范英文字母书写格式。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("英语字帖生成器")}&category=${encodeURIComponent("英语工具")}&icon=🔤`, width: 1200, height: 630, alt: "英语字帖生成器 - 练学宝" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "英语字帖生成器 - 免费四线三格英语练习 | 练学宝",
      description: "免费生成四线三格英文字帖，支持手写体印刷体等多种字体，可自定义单词句子内容，PDF导出A4打印。适合小学生英语书写练习，帮助规范英文字母书写格式。",
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
            <ToolPageSchema toolPath="/tools/english-calligraphy/" />
      <ToolBreadcrumb toolName="英语字帖" toolPath="/tools/english-calligraphy" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          免费生成四线三格英文字帖，支持手写体、印刷体等多种字体，自定义单词句子内容，PDF导出A4打印。帮助小学生规范英文字母书写格式。
        </p>
      </div>
      {children}
    </>
  );
}
