import type { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "www.skillxm.cn";
  const protocol = host.includes("localhost") ? "http" : "https";
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("x-matched-path") ?? "/tools/mental-math";
  const canonicalUrl = `${protocol}://${host}${pathname}`;
  return {
    title: "口算速练 - 在线口算计时挑战 | 教材工具箱",
    description: "免费在线口算速练工具，提供4个难度级别，涵盖加减乘除全运算类型，计时挑战即时反馈，适合小学一二年级到五六年级学生日常口算打卡训练。",
    keywords: "口算速练,口算练习,口算计时,速算训练,数学口算,口算题,在线口算,一年级口算题,二年级口算练习,100道口算题,口算题生成器,口算天天练,20以内加减法口算,100以内口算,口算打卡,口算比赛,口算训练,口算测试",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      url: canonicalUrl,
      title: "口算速练 - 免费在线口算计时挑战 | 教材工具箱",
      description: "免费在线口算速练工具，提供4个难度级别，涵盖加减乘除全运算类型，计时挑战即时反馈，适合小学一二年级到五六年级学生日常口算打卡训练。",
      type: "website",
      images: [{ url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "教材工具箱" }],
    },
  };
}

export default function MentalMathLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 服务端渲染的 SEO 内容 -- 搜索引擎可直接抓取 */}
      <div className="sr-only">
        <h2>口算速练 - 在线计时口算练习</h2>
        <p>免费在线口算速练，4个难度级别，计时挑战即时反馈，一二年级到五六年级全覆盖。通过限时口算训练快速提升计算能力，支持加减乘除全运算类型，答题即时判定对错，训练结束自动统计正确率和用时，适合日常口算打卡练习。</p>
        <h2>核心功能</h2>
        <ul>
          <li>4个难度级别：入门级（10以内加减）、基础级（20以内加减）、提高级（100以内加减乘除）、挑战级（大数运算混合），匹配不同年级水平</li>
          <li>计时挑战模式：倒计时答题，营造紧迫感，提升计算速度和专注力</li>
          <li>即时反馈判定：每道题答完立即显示对错，错误题目可回顾复习</li>
          <li>加减乘除全覆盖：支持加法、减法、乘法、除法及混合运算，全面训练计算能力</li>
          <li>成绩统计报告：训练结束后自动统计正确率、答题数量、用时等数据</li>
          <li>完全免费：无需注册登录，打开即练，不限制练习次数</li>
        </ul>
        <h2>适用对象</h2>
        <p>小学1-6年级学生、需要提升计算速度的中小学生、家长辅导孩子口算练习、教师课堂口算训练。适合每日口算打卡、课前热身练习、期末口算复习、假期计算能力巩固等场景。</p>
        <p>访问 <a href="https://www.skillxm.cn">教材工具箱</a> 获取更多免费教学工具，包括数学练习卷生成器、字帖生成器、英语字帖、数独游戏等。</p>
        <h2>相关学习文章</h2>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/kousuan-sudu-tisheng">口算速度提升方法：从每分钟5题到20题</a></li>
          <li><a href="https://www.skillxm.cn/blog/kousuan-xunlian-fangfa">如何培养孩子的口算能力</a></li>
          <li><a href="https://www.skillxm.cn/blog/kousuan-app-ceping-dibi">市面主流口算APP测评对比</a></li>
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
                "name": "口算速练有几个难度级别？",
                "acceptedAnswer": { "@type": "Answer", "text": "有4个难度级别：入门级（10以内加减）、基础级（20以内加减）、提高级（100以内加减乘除）、挑战级（大数运算混合）。" }
              },
              {
                "@type": "Question",
                "name": "口算速练适合几年级？",
                "acceptedAnswer": { "@type": "Answer", "text": "适合小学1-6年级，入门级适合一二年级，基础级适合二三年级，提高级适合三四年级，挑战级适合五六年级。" }
              },
              {
                "@type": "Question",
                "name": "口算练习有时间限制吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "有计时挑战模式，也可以自由练习模式，学生可以根据自己的水平选择。" }
              },
              {
                "@type": "Question",
                "name": "做错的题目可以回顾吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "可以，训练结束后会显示错题回顾，方便学生查漏补缺。" }
              },
              {
                "@type": "Question",
                "name": "口算速练需要注册吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "不需要注册，打开网页即可开始练习，完全免费。" }
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
