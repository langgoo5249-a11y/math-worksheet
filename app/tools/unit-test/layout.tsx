import type { Metadata } from "next";
import { headers } from "next/headers";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "www.skillxm.cn";
  const protocol = host.includes("localhost") ? "http" : "https";
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("x-matched-path") ?? "/tools/unit-test";
  const canonicalUrl = `${protocol}://${host}${pathname}`;
  return {
    title: "小学单元测试卷生成器 - 数语英科全科试卷免费打印 | 练学宝",
    description: "免费生成小学1-6年级单元测试卷，覆盖数学语文英语科学四科305个单元，支持单元测试期中期末三种类型，基础提高拓展三档难度，PDF排版规范一键打印",
    keywords: "单元测试卷,期中试卷,期末试卷,小学数学试卷,小学语文试卷,小学英语试卷,小学科学试卷,试卷生成器,免费试卷打印,人教版试卷,三年级数学试卷,四年级语文试卷,五年级英语试卷,单元测试题,小学全科试卷,期中复习试卷,期末复习试卷",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": "https://www.skillxm.cn/tools/unit-test/",
      "en": "https://www.skillxm.cn/en/tools/unit-test/",
      "ja": "https://www.skillxm.cn/ja/tools/unit-test/",
      "ko": "https://www.skillxm.cn/ko/tools/unit-test/",
      "x-default": "https://www.skillxm.cn/tools/unit-test/",
    },
  },
    openGraph: {
      url: canonicalUrl,
      title: "小学单元测试卷生成器 - 数语英科全科试卷免费打印 | 练学宝",
      description: "免费生成小学1-6年级单元测试卷，覆盖数学语文英语科学四科305个单元，支持单元测试期中期末三种类型，基础提高拓展三档难度，PDF排版规范一键打印",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("单元测试卷生成器")}&category=${encodeURIComponent("综合工具")}&icon=📋`, width: 1200, height: 630, alt: "单元测试卷生成器 - 练学宝" }, { url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "练学宝" }],
    },
  };
}

export default function UnitTestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sr-only">
        <h2>单元测试卷生成器 - 小学数语英科全科试卷免费打印</h2>
        <p>免费生成小学1-6年级单元测试卷，数学语文英语科学四科，305个单元PDF打印。练学宝提供完整的小学单元测试卷生成服务，覆盖人教版、北师大版等主流教材版本，是小学教师备课和考试出题的得力助手。</p>
        <p><strong>一句话摘要：</strong>练学宝单元测试卷生成器是一款免费在线出题工具，覆盖小学1-6年级数学语文英语科学四科305个单元，支持自动组卷和PDF打印，适合教师单元检测和家长辅导。</p>
        <h2>核心功能</h2>
        <ul>
          <li>四科覆盖：支持数学、语文、英语、科学四个学科，满足小学全科测试需求</li>
          <li>305个单元：完整覆盖小学1-6年级所有单元知识点，每个单元都有对应的测试卷</li>
          <li>单元测试/期中/期末：支持单元测试卷、期中测试卷、期末测试卷三种考试类型，全面评估学习成果</li>
          <li>三档难度：提供基础、提高、拓展三个难度等级，适应不同学生的学习水平，实现分层教学</li>
          <li>PDF导出：一键生成PDF格式试卷，排版规范，方便打印分发，支持A4纸张标准格式</li>
        </ul>
        <h2>适用对象</h2>
        <p>单元测试卷生成器适合小学各学科教师、教育培训机构以及学生家长使用。无论是日常单元测验、期中期末考试还是课后练习，都可以通过本工具快速生成高质量的测试试卷，节省教师备课时间，提高教学效率。</p>
        <p>访问 <a href="https://www.skillxm.cn">练学宝</a> 获取更多免费教学工具。</p>
        <h2>相关学习文章</h2>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/xiaoxue-shuxue-lianxi-ziyuan-huizong">最全小学数学练习资源汇总</a></li>
          <li><a href="https://www.skillxm.cn/blog/lianxijuan-xuanze">如何选择适合孩子的练习卷</a></li>
          <li><a href="https://www.skillxm.cn/blog/qimo-fuxi-gonglue-mianfei-gongju">期末复习攻略：用免费工具高效备考</a></li>
          <li><a href="https://www.skillxm.cn/blog/danyuan-ceshijuan-shengcheng-gongju">小学单元测试卷怎么出</a></li>
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
                "name": "单元测试卷覆盖哪些学科？",
                "acceptedAnswer": { "@type": "Answer", "text": "覆盖数学、语文、英语、科学四科，完整支持小学全科测试需求。" }
              },
              {
                "@type": "Question",
                "name": "支持哪些教材版本？",
                "acceptedAnswer": { "@type": "Answer", "text": "主要覆盖人教版1-6年级上下册共305个单元，满足大部分学校的教学进度。" }
              },
              {
                "@type": "Question",
                "name": "可以生成期中期末试卷吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "可以，除单元测试外，还支持期中测试卷和期末测试卷三种考试类型。" }
              },
              {
                "@type": "Question",
                "name": "试卷有不同难度吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "有，提供基础、提高、拓展三个难度等级，适应不同学生的学习水平。" }
              },
              {
                "@type": "Question",
                "name": "单元测试卷生成器免费吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "完全免费，所有功能均可免费使用，PDF导出打印不收取任何费用。" }
              }
            ]
          })
        }}
      />
      <ToolBreadcrumb toolName="单元测试卷" toolPath="/tools/unit-test" />
      {children}
    </>
  );
}
