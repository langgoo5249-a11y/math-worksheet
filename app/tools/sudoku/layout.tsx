import type { Metadata } from "next";
import { headers } from "next/headers";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "www.skillxm.cn";
  const protocol = host.includes("localhost") ? "http" : "https";
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("x-matched-path") ?? "/tools/sudoku";
  const canonicalUrl = `${protocol}://${host}${pathname}`;
  return {
    title: "数独游戏在线玩 - 入门/进阶/挑战三档难度 | 练学宝",
    description: "免费在线数独游戏，提供入门进阶挑战三档难度，内置数字键盘和笔记模式，锻炼逻辑思维和专注力。适合小学生课余训练，无需下载打开浏览器即开即玩。",
    keywords: "数独游戏,在线数独,数独挑战,逻辑训练,益智游戏,免费数独,数独解题,儿童数独入门,简单数独打印,小学生数独题,数独技巧,数独入门教程,数独每日挑战,数独在线玩,益智数独,逻辑思维训练,儿童益智游戏",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": "https://www.skillxm.cn/tools/sudoku/",
      "en": "https://www.skillxm.cn/en/tools/sudoku/",
      "ja": "https://www.skillxm.cn/ja/tools/sudoku/",
      "ko": "https://www.skillxm.cn/ko/tools/sudoku/",
      "x-default": "https://www.skillxm.cn/tools/sudoku/",
    },
  },
    openGraph: {
      url: canonicalUrl,
      title: "数独游戏 - 免费在线数独挑战 | 练学宝",
      description: "免费在线数独游戏，提供入门进阶挑战三档难度，内置数字键盘和笔记模式，锻炼逻辑思维和专注力。适合小学生课余训练，无需下载打开浏览器即开即玩。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("数独游戏")}&category=${encodeURIComponent("思维训练")}&icon=🧩`, width: 1200, height: 630, alt: "数独游戏 - 练学宝" }, { url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "练学宝" }],
    },
  };
}

export default function SudokuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 服务端渲染的 SEO 内容 -- 搜索引擎可直接抓取 */}
      <div className="sr-only">
        <p>数独游戏 - 在线益智逻辑训练</p>
        <p>免费在线数独游戏，3档难度，锻炼逻辑思维，适合小学生课余训练。无需下载安装，打开浏览器即可玩数独，支持入门、进阶、挑战三个难度等级，内置数字键盘方便手机操作，即时验证答案正误，帮助提升逻辑推理和专注力。</p>
        <p><strong>一句话摘要：</strong>练学宝数独游戏是一款免费在线数独益智工具，支持4x4、6x6、9x9多种难度级别，自动生成唯一解题目，适合培养孩子的逻辑思维和专注力。</p>
        <p>核心功能</p>
        <ul>
          <li>3档难度等级：入门（适合初学者）、进阶（有一定基础）、挑战（高难度），循序渐进提升</li>
          <li>数字键盘输入：内置虚拟数字键盘，手机平板操作便捷，支持笔记模式</li>
          <li>即时验证反馈：实时检查填写是否正确，错误高亮提示，帮助快速定位问题</li>
          <li>适合各年龄段：小学生到成人都能玩，既是益智游戏也是逻辑训练工具</li>
          <li>计时功能：记录解题用时，挑战自我速度极限</li>
          <li>完全免费：无需注册登录，打开即玩，不限制游戏次数</li>
        </ul>
        <p>适用对象</p>
        <p>小学3-6年级学生、逻辑思维训练爱好者、数独入门学习者、课余时间需要益智活动的中小学生。适合课间休息、家庭亲子互动、逻辑思维训练、数学兴趣培养等场景。</p>
        <p>访问 <a href="https://www.skillxm.cn">练学宝</a> 获取更多免费教学工具，包括数学练习卷生成器、字帖生成器、英语字帖、口算速练等。</p>
        <p>相关学习文章</p>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/shudu-100tian-xunlian-jilu">坚持数独训练100天的变化</a></li>
          <li><a href="https://www.skillxm.cn/blog/shudu-shuxue-bangzhu">数独游戏对儿童思维发展的5大好处</a></li>
          <li><a href="https://www.skillxm.cn/blog/youxiao-xianjie-luoji-siwei-peiyang">有效衔接阶段逻辑思维培养方法</a></li>
          <li><a href="https://www.skillxm.cn/blog/shuxue-siwei-shudu-kousuan-shuangguan">数学思维训练：数独+口算双管齐下</a></li>
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "如何玩数独游戏",
            "description": "数独游戏使用教程，3步开始在线数独挑战，锻炼逻辑思维和专注力",
            "totalTime": "PT1M",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "选择难度等级",
                "text": "选择入门（4x4）、进阶（6x6）或挑战（9x9）难度等级"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "点击数字填入格子",
                "text": "使用内置数字键盘点击空格填入数字，确保每行每列每宫数字不重复"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "验证答案并记录用时",
                "text": "系统自动验证答案正确性，并记录解题用时"
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
                "name": "数独游戏有几个难度？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "有入门、进阶、挑战三个难度等级，入门适合初学者，挑战适合有一定基础的玩家。"
                }
              },
              {
                "@type": "Question",
                "name": "数独游戏适合小学生吗？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "适合，小学3-6年级学生可以通过数独锻炼逻辑思维和专注力，入门难度一二年级也可以尝试。"
                }
              },
              {
                "@type": "Question",
                "name": "可以在手机上玩吗？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "可以，网站采用响应式设计，手机平板电脑都能正常操作，内置数字键盘方便触屏输入。"
                }
              },
              {
                "@type": "Question",
                "name": "数独游戏收费吗？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "完全免费，无需下载安装，打开浏览器即可玩，不限制游戏次数。"
                }
              },
              {
                "@type": "Question",
                "name": "有提示功能吗？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "有即时验证功能，填入数字后会自动检查是否正确，错误会高亮提示。"
                }
              }
            ]
          })
        }}
      />
      <ToolBreadcrumb toolName="数独游戏" toolPath="/tools/sudoku" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          免费在线数独游戏，提供入门/进阶/挑战三档难度，内置数字键盘和笔记模式，锻炼逻辑思维和专注力，无需下载打开即玩。
        </p>
      </div>
      {children}
    </>
  );
}
