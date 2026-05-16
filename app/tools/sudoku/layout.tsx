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
    title: "数独游戏在线玩 - 入门/进阶/挑战三档难度 | 教材工具箱",
    description: "免费在线数独游戏，提供入门进阶挑战三档难度，内置数字键盘和笔记模式，锻炼逻辑思维和专注力。适合小学生课余训练，无需下载打开浏览器即开即玩。",
    keywords: "数独游戏,在线数独,数独挑战,逻辑训练,益智游戏,免费数独,数独解题,儿童数独入门,简单数独打印,小学生数独题,数独技巧,数独入门教程,数独每日挑战,数独在线玩,益智数独,逻辑思维训练,儿童益智游戏",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      url: canonicalUrl,
      title: "数独游戏 - 免费在线数独挑战 | 教材工具箱",
      description: "免费在线数独游戏，提供入门进阶挑战三档难度，内置数字键盘和笔记模式，锻炼逻辑思维和专注力。适合小学生课余训练，无需下载打开浏览器即开即玩。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("数独游戏")}&category=${encodeURIComponent("思维训练")}&icon=🧩`, width: 1200, height: 630, alt: "数独游戏 - 教材工具箱" }, { url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "教材工具箱" }],
    },
  };
}

export default function SudokuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 服务端渲染的 SEO 内容 -- 搜索引擎可直接抓取 */}
      <div className="sr-only">
        <h2>数独游戏 - 在线益智逻辑训练</h2>
        <p>免费在线数独游戏，3档难度，锻炼逻辑思维，适合小学生课余训练。无需下载安装，打开浏览器即可玩数独，支持入门、进阶、挑战三个难度等级，内置数字键盘方便手机操作，即时验证答案正误，帮助提升逻辑推理和专注力。</p>
        <h2>核心功能</h2>
        <ul>
          <li>3档难度等级：入门（适合初学者）、进阶（有一定基础）、挑战（高难度），循序渐进提升</li>
          <li>数字键盘输入：内置虚拟数字键盘，手机平板操作便捷，支持笔记模式</li>
          <li>即时验证反馈：实时检查填写是否正确，错误高亮提示，帮助快速定位问题</li>
          <li>适合各年龄段：小学生到成人都能玩，既是益智游戏也是逻辑训练工具</li>
          <li>计时功能：记录解题用时，挑战自我速度极限</li>
          <li>完全免费：无需注册登录，打开即玩，不限制游戏次数</li>
        </ul>
        <h2>适用对象</h2>
        <p>小学3-6年级学生、逻辑思维训练爱好者、数独入门学习者、课余时间需要益智活动的中小学生。适合课间休息、家庭亲子互动、逻辑思维训练、数学兴趣培养等场景。</p>
        <p>访问 <a href="https://www.skillxm.cn">教材工具箱</a> 获取更多免费教学工具，包括数学练习卷生成器、字帖生成器、英语字帖、口算速练等。</p>
        <h2>相关学习文章</h2>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/shudu-100tian-xunlian-jilu">坚持数独训练100天的变化</a></li>
          <li><a href="https://www.skillxm.cn/blog/shudu-shuxue-bangzhu">数独游戏对儿童思维发展的5大好处</a></li>
          <li><a href="https://www.skillxm.cn/blog/shuxue-siwei-meiri">每天15分钟帮孩子建立数学思维</a></li>
          <li><a href="https://www.skillxm.cn/blog/shuxue-siwei-shudu-kousuan-shuangguan">数学思维训练：数独+口算双管齐下</a></li>
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
