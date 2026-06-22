import type { Metadata } from "next";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';
import ToolPageSchema from '@/app/_components/ToolPageSchema';

export async function generateMetadata(): Promise<Metadata> {
    const canonicalUrl = 'https://www.skillxm.cn/tools/mental-math/';
  return {
    title: "口算速练 - 在线口算计时挑战 | 练学宝",
    description: "免费在线口算速练工具，支持AI智能出题、进度追踪、学习报告推送。4个难度级别涵盖加减乘除，自动分析薄弱点生成针对性练习，适合小学1-6年级学生日常口算打卡训练。",
    keywords: "口算速练,口算练习,心算训练,速算练习,在线口算,数学口算题,计时口算,口算天天练,一年级口算,二年级口算,三年级口算,口算题生成,免费口算练习,口算速度提升,手机口算练习",
    alternates: {
    canonical: canonicalUrl,
  },
    openGraph: {
      url: canonicalUrl,
      title: "口算速练 - 免费在线口算计时挑战 | 练学宝",
      description: "免费在线口算速练工具，支持AI智能出题、进度追踪、学习报告推送。4个难度级别涵盖加减乘除，自动分析薄弱点生成针对性练习。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("口算速练")}&category=${encodeURIComponent("数学工具")}&icon=⚡`, width: 1200, height: 630, alt: "口算速练 - 练学宝" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "口算速练 - 免费在线口算计时挑战 | 练学宝",
      description: "免费在线口算速练工具，支持AI智能出题、进度追踪、学习报告推送。4个难度级别涵盖加减乘除，自动分析薄弱点生成针对性练习。",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("口算速练")}&category=${encodeURIComponent("数学工具")}&icon=⚡`, width: 1200, height: 630, alt: "口算速练 - 练学宝" }],
    },
  };
}

export default function MentalMathLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 服务端渲染的 SEO 内容 -- 搜索引擎可直接抓取 */}
      <div className="sr-only">
        <p>口算速练 - 在线计时口算练习</p>
        <p>免费在线口算速练，4个难度级别，计时挑战即时反馈，一二年级到五六年级全覆盖。通过限时口算训练快速提升计算能力，支持加减乘除全运算类型，答题即时判定对错，训练结束自动统计正确率和用时，适合日常口算打卡练习。</p>
        <p>练学宝口算速练是一款免费在线口算计时练习工具，支持4个难度级别和加减乘除全运算类型，AI智能出题自动分析薄弱点，适合小学1-6年级学生日常口算打卡训练。</p>
        <p>核心功能</p>
        <ul>
          <li>4个难度级别：入门级（10以内加减）、基础级（20以内加减）、提高级（100以内加减乘除）、挑战级（大数运算混合），匹配不同年级水平</li>
          <li>计时挑战模式：倒计时答题，营造紧迫感，提升计算速度和专注力</li>
          <li>即时反馈判定：每道题答完立即显示对错，错误题目可回顾复习</li>
          <li>加减乘除全覆盖：支持加法、减法、乘法、除法及混合运算，全面训练计算能力</li>
          <li>成绩统计报告：训练结束后自动统计正确率、答题数量、用时等数据</li>
          <li>完全免费：无需注册登录，打开即练，不限制练习次数</li>
        </ul>
        <p>适用对象</p>
        <p>小学1-6年级学生、需要提升计算速度的中小学生、家长辅导孩子口算练习、教师课堂口算训练。适合每日口算打卡、课前热身练习、期末口算复习、假期计算能力巩固等场景。</p>
        <p>访问 <a href="https://www.skillxm.cn">练学宝</a> 获取更多免费教学工具，包括数学练习卷生成器、字帖生成器、英语字帖、数独游戏等。</p>
        <p>相关学习文章</p>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/kousuan-sudu-tisheng-shizhan-20ti">口算速度提升实战：从每分钟5题到20题</a></li>
          <li><a href="https://www.skillxm.cn/blog/kousuan-xunlian-fangfa">如何培养孩子的口算能力</a></li>
          <li><a href="https://www.skillxm.cn/blog/kousuan-xunlian-fangfa">口算训练方法与技巧</a></li>
          <li><a href="https://www.skillxm.cn/blog/shuxue-siwei-shudu-kousuan-shuangguan">数学思维训练：数独+口算双管齐下</a></li>
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "如何使用口算速练工具",
            "description": "口算速练工具使用教程，5步快速开始口算计时挑战，提升计算能力",
            "totalTime": "PT5M",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "选择难度级别",
                "text": "入门/进阶/挑战/极限四个级别"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "选择运算类型",
                "text": "加减法、乘除法或混合运算"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "开始计时挑战",
                "text": "点击开始按钮，系统自动出题并计时"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "逐题作答",
                "text": "输入答案后自动跳转下一题"
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "查看成绩统计",
                "text": "完成后显示正确率、用时、排名等数据"
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
                "acceptedAnswer": { "@type": "Answer", "text": "不需要注册，打开网页即可开始练习，完全免费。练习记录保存在浏览器本地，不会丢失。" }
              },
              {
                "@type": "Question",
                "name": "什么是AI智能出题？",
                "acceptedAnswer": { "@type": "Answer", "text": "AI智能出题会分析孩子的历史练习数据，自动找出薄弱的运算类型（如乘法、除法），然后生成70%针对薄弱点+30%混合练习的题目，帮助孩子高效提升。" }
              },
              {
                "@type": "Question",
                "name": "学习报告功能怎么用？",
                "acceptedAnswer": { "@type": "Answer", "text": "每次练习后系统自动记录成绩，在「学习报告」页面可以查看累计统计、7天正确率趋势、薄弱点分析，还可以将学习报告通过邮件发送给家长。" }
              },
              {
                "@type": "Question",
                "name": "家长如何接收孩子的学习报告？",
                "acceptedAnswer": { "@type": "Answer", "text": "在学习报告页面点击「发送给家长」，输入邮箱地址即可将本周学习报告发送到家长邮箱，包含练习次数、正确率、薄弱点分析和改进建议。" }
              }
            ]
          })
        }}
      />
            <ToolPageSchema toolPath="/tools/mental-math/" />
      <ToolBreadcrumb toolName="口算速练" toolPath="/tools/mental-math" />
      <div className="max-w-4xl mx-auto px-4 mt-4 mb-2">
        <p className="text-sm text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-3 leading-relaxed">
          在线口算计时训练工具，AI智能出题、进度追踪、学习报告推送，4个难度级别涵盖加减乘除，适合小学1-6年级日常口算打卡训练。
        </p>
      </div>
      {children}
    </>
  );
}
