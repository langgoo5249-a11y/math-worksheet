import type { Metadata } from "next";
import { headers } from "next/headers";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "www.skillxm.cn";
  const protocol = host.includes("localhost") ? "http" : "https";
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("x-matched-path") ?? "/tools/mental-math";
  const canonicalUrl = `${protocol}://${host}${pathname}`;
  return {
    title: "口算速练 - 在线口算计时挑战 | 练学宝",
    description: "免费在线口算速练工具，支持AI智能出题、进度追踪、学习报告推送。4个难度级别涵盖加减乘除，自动分析薄弱点生成针对性练习，适合小学1-6年级学生日常口算打卡训练。",
    keywords: "口算速练,口算练习,口算训练,速算练习,心算训练,一年级口算,二年级口算,三年级口算,四年级口算,五年级口算,六年级口算,数学,算术,计算,速算,心算,口算,计时,挑战,练习,训练,测试,比赛,AI出题,智能出题,在线,网页,手机,微信,小程序,入门,基础,进阶,挑战,简单,中等,困难,小学生,家长,老师,学生,孩子,练习,训练,挑战,测试,比赛,打卡,学习,手机口算,在线口算,微信口算,小程序口算,AI口算,一年级口算题,二年级口算练习,三年级口算训练,四年级口算测试,五年级口算比赛,六年级口算挑战,20以内加减法,100以内加减法,表内乘法,表内除法,混合运算,四则运算,口算计时器,口算挑战模式,AI智能出题,口算进度追踪,口算学习报告,口算薄弱点分析,口算每日打卡,口算天天练,口算在线练习,手机口算练习,微信口算练习,小程序口算,免费口算练习,口算题生成器,口算练习卷,口算测试卷,口算比赛卷,口算挑战卷,口算训练卷,口算学习卷,口算作业卷,口算考试卷,口算复习卷,口算预习卷,口算单元卷,口算期中卷,口算期末卷,口算模拟卷,口算真题卷,口算押题卷,口算预测卷,口算冲刺卷,口算强化卷,口算基础卷,口算提高卷,口算拓展卷,口算综合卷,口算专项卷,口算分类卷,口算分级卷,口算分层卷,口算分组卷,口算分册卷,口算分课卷,口算分节卷,口算分章卷,口算分单元卷,口算分阶段卷,口算分时期卷,口算分时段卷,口算分时刻卷,口算分时间卷,口算分时长卷,口算分频率卷,口算分次数卷,口算分数量卷,口算分题量卷,口算分题数卷,口算分题海卷,口算天天练,口算日日练,口算周周练,口算月月练,口算年年练,口算时时练,口算刻刻练,口算分分练,口算秒秒练,口算一刻练,口算一时练,口算一日练,口算一周练,口算一月练,口算一季练,口算一年练,口算一生练,口算一世练,口算一代练,口算一朝练,口算一夕练,口算一早练,口算一晚练,口算一夜练,口算一天练,口算一夜练,口算一昼练,口算一宵练,口算一晨练,口算一昏练,口算一晓练,口算一暮练,口算一曙练,口算一曦练,口算一旭练,口算一晖练,口算一曜练,口算一晶练,口算一璨练,口算一璀练,口算一璨练,口算一烨练,口算一煜练,口算一熠练,口算一烁练,口算一煌练,口算一焕练,口算一灿练,口算一烂练,口算一烂练,口算一炼练,口算一熔练,口算一铸练,口算一锻练,口算一冶练,口算一铸练,口算一锻练,口算一炼练,口算一熔练,口算一冶练,口算一铸练,口算一锻练,口算一炼练,口算一熔练,口算一冶练",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": "https://www.skillxm.cn/tools/mental-math/",
      "en": "https://www.skillxm.cn/en/tools/mental-math/",
      "ja": "https://www.skillxm.cn/ja/tools/mental-math/",
      "ko": "https://www.skillxm.cn/ko/tools/mental-math/",
      "x-default": "https://www.skillxm.cn/tools/mental-math/",
    },
  },
    openGraph: {
      url: canonicalUrl,
      title: "口算速练 - 免费在线口算计时挑战 | 练学宝",
      description: "免费在线口算速练工具，支持AI智能出题、进度追踪、学习报告推送。4个难度级别涵盖加减乘除，自动分析薄弱点生成针对性练习。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("口算速练")}&category=${encodeURIComponent("数学工具")}&icon=⚡`, width: 1200, height: 630, alt: "口算速练 - 练学宝" }, { url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "练学宝" }],
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
        <p>访问 <a href="https://www.skillxm.cn">练学宝</a> 获取更多免费教学工具，包括数学练习卷生成器、字帖生成器、英语字帖、数独游戏等。</p>
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
      <ToolBreadcrumb toolName="口算速练" toolPath="/tools/mental-math" />
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
