import type { Metadata } from "next";
import { headers } from "next/headers";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "www.skillxm.cn";
  const protocol = host.includes("localhost") ? "http" : "https";
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("x-matched-path") ?? "/tools/math-worksheet";
  const canonicalUrl = `${protocol}://${host}${pathname}`;
  return {
    title: "小学数学练习卷生成器 - 1-6年级免费在线出题PDF打印 | 练学宝",
    description: "免费在线生成小学1-6年级数学练习卷，支持加减乘除、竖式计算、填空题、应用题等11种题型，随机出题PDF打印",
    keywords: "数学练习卷,数学出题器,数学练习题,小学数学,数学作业,一年级数学,二年级数学,三年级数学,四年级数学,五年级数学,六年级数学,1-6年级数学,数学,算术,口算,计算,应用题,生成器,出题器,打印,PDF,在线,免费,自动生成,随机出题,竖式,横式,填空,选择,口算题,计算题,简单,基础,提高,拓展,入门,进阶,小学生,家长,老师,教师,学生,孩子,生成,打印,下载,练习,做题,训练,学习,复习,手机出题,在线做题,手机练习,微信做题,小程序出题,一年级数学练习题,二年级数学口算题,三年级数学竖式计算,四年级数学应用题,五年级分数计算题,六年级数学方程练习,小学数学出题器,数学练习卷生成器,免费数学练习题,数学作业生成器,小学数学口算题生成,数学竖式计算打印,数学应用题生成器,一年级数学作业,二年级数学练习卷,三年级数学试卷,四年级数学练习题,五年级数学计算题,六年级数学复习题,小学数学每日一练,数学口算天天练,数学计算题打印,免费数学试卷,数学练习题下载,小学数学在线出题,数学作业自动生成,数学练习卷PDF,数学口算题打印,竖式计算练习题,混合运算练习题,数学填空题生成,小学数学题库,数学练习题大全,数学练习卷模板,数学出题神器,小学数学练习册,数学作业打印,数学练习题网站,在线数学出题,数学练习生成,小学数学天天练,数学口算练习,数学计算训练,数学应用题练习,数学竖式练习,数学脱式计算,数学简便运算,数学四则运算,数学加减乘除,数学速算练习,数学心算训练,数学笔算练习,数学估算练习,数学巧算方法,数学计算技巧,数学口算技巧,数学速算技巧,数学练习方法,数学学习方法,数学提分技巧,数学成绩提高,数学基础训练,数学强化训练,数学专项训练,数学同步练习,数学课后练习,数学家庭作业,数学课堂练习,数学单元测试,数学期中复习,数学期末复习,数学考试准备,数学错题练习,数学易错题,数学重点题,数学难点突破,数学知识巩固,数学能力提升,数学思维训练,数学逻辑训练,数学智力开发,数学兴趣培养,数学习惯养成,数学自主学习,数学在线学习,数学移动学习,数学碎片学习,数学随时练习,数学随身练,数学掌上练习,数学手机APP,数学微信小程序,数学支付宝小程序,数学百度小程序,数学抖音小程序,数学快手小程序,数学QQ小程序,数学头条小程序,数学练习工具,数学学习工具,数学辅助工具,数学教学工具,数学备课工具,数学出题工具,数学组卷工具,数学试卷工具,数学作业工具,数学批改工具,数学测评工具,数学诊断工具,数学分析工具,数学统计工具,数学报告工具,数学追踪工具,数学记录工具,数学打卡工具,数学习惯工具,数学计划工具,数学目标工具,数学激励工具,数学奖励工具,数学游戏工具,数学趣味工具,数学互动工具,数学竞赛工具,数学挑战工具,数学闯关工具,数学等级工具,数学积分工具,数学排行工具,数学分享工具,数学社交工具,数学家长工具,数学老师工具,数学学校工具,数学机构工具,数学辅导班,数学培训班,数学补习班,数学家教,数学一对一,数学小班课,数学大班课,数学网课,数学直播课,数学录播课,数学视频课,数学音频课,数学图文课,数学动画课,数学游戏课,数学故事课,数学绘本课,数学思维课,数学逻辑课,数学益智课,数学启蒙课,数学入门课,数学基础课,数学提高课,数学拓展课,数学冲刺课,数学竞赛课,数学奥赛课,数学杯赛课,数学考级课,数学证书课,数学认证课,数学测评课,数学诊断课,数学规划课,数学方法课,数学技巧课,数学秘诀课,数学绝招课,数学大招课,数学套路课,数学模板课,数学公式课,数学定理课,数学法则课,数学规律课,数学口诀课,数学歌谣课,数学儿歌课,数学童谣课,数学顺口溜,数学绕口令,数学谜语,数学谜题,数学脑筋急转弯,数学智力题,数学趣味题,数学游戏题,数学竞赛题,数学挑战题,数学闯关题,数学冒险题,数学探索题,数学发现题,数学创新题,数学开放题,数学综合题,数学实践题,数学操作题,数学实验题,数学调查题,数学研究题,数学项目题,数学课题,数学主题,数学专题,数学模块,数学单元,数学章节,数学课时,数学课次,数学学期,数学学年,数学假期,数学周末,数学日常,数学每天,数学每周,数学每月,数学每学期,数学每学年,数学阶段,数学时期,数学时段,数学时刻,数学时间,数学时长,数学频率,数学次数,数学数量,数学题量,数学题数,数学题海,数学题库,数学题集,数学题册,数学题本,数学题单,数学题卡,数学题签,数学题帖,数学题纸,数学题卷,数学题套,数学题组,数学题串,数学题链,数学题网,数学题阵,数学题群,数学题系,数学题族,数学题类,数学题型,数学题种,数学题式,数学题样,数学题例,数学题范,数学题典",
    alternates: {
    canonical: canonicalUrl,
    languages: {
      "zh-CN": "https://www.skillxm.cn/tools/math-worksheet/",
      "en": "https://www.skillxm.cn/en/tools/math-worksheet/",
      "ja": "https://www.skillxm.cn/ja/tools/math-worksheet/",
      "ko": "https://www.skillxm.cn/ko/tools/math-worksheet/",
      "x-default": "https://www.skillxm.cn/tools/math-worksheet/",
    },
  },
    openGraph: {
      url: canonicalUrl,
      title: "数学练习卷生成器 - 免费在线出题打印 | 练学宝",
      description: "免费在线生成小学1-6年级数学练习卷，支持加减乘除、竖式计算、填空题、应用题等11种题型，随机出题PDF打印",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("数学练习卷生成器")}&category=${encodeURIComponent("数学工具")}&icon=🧮`, width: 1200, height: 630, alt: "数学练习卷生成器 - 练学宝" }, { url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "练学宝" }],
    },
  };
}

export default function MathWorksheetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 服务端渲染的 SEO 内容 -- 搜索引擎可直接抓取 */}
      <div className="sr-only">
        <h2>小学数学练习卷生成器 - 免费在线出题打印</h2>
        <p>免费在线生成小学1-6年级数学练习卷，支持加减乘除竖式计算、分数方程等11种题型，随机出题PDF打印。教师和家长可一键生成个性化数学练习题，覆盖一年级到六年级全学段，支持简单、中等、困难三档难度调节，答案页独立打印，方便批改。</p>
        <h2>核心功能</h2>
        <ul>
          <li>11种题型：加法、减法、乘法、除法、加减混合、乘除混合、四则混合、竖式计算、填空题、比较大小、应用题</li>
          <li>1-6年级全覆盖：自动匹配各年级知识点范围，一年级20以内加减法到六年级分数方程</li>
          <li>三档难度调节：简单、中等、困难，满足不同学习阶段需求</li>
          <li>PDF导出打印：一键生成A4格式PDF文件，答案页独立分离，方便教师批改</li>
          <li>随机出题：每次生成题目不重复，避免学生死记硬背</li>
          <li>完全免费：无需注册登录，打开即用，不限制使用次数</li>
        </ul>
        <h2>适用对象</h2>
        <p>小学1-6年级学生家长、小学数学教师、课后辅导机构老师。适合日常数学练习、单元测试出题、期末复习巩固、假期作业布置等场景使用。</p>
        <p>访问 <a href="https://www.skillxm.cn">练学宝</a> 获取更多免费教学工具，包括字帖生成器、英语字帖、数独游戏、口算速练等。</p>
        <h2>相关学习文章</h2>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/yinianji-shuxue-qimeng">一年级数学启蒙：从数数到20以内加减法的完整路径</a></li>
          <li><a href="https://www.skillxm.cn/blog/kousuan-sudu-tisheng">口算速度提升方法：从每分钟5题到20题</a></li>
          <li><a href="https://www.skillxm.cn/blog/shuxue-nixi-anli">从班级倒数到前五：数学逆袭之路</a></li>
          <li><a href="https://www.skillxm.cn/blog/shushi-jisuan-jiaoxue">小学数学竖式计算全攻略</a></li>
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "如何使用数学练习卷生成器",
            "description": "数学练习卷生成器使用教程，5步快速生成小学1-6年级数学练习卷，支持PDF打印",
            "totalTime": "PT5M",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "选择年级和题型",
                "text": "选择1-6年级，勾选需要的题型如加减乘除、竖式计算等"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "设置题目数量和难度",
                "text": "调整每页题目数，选择基础/提高/拓展难度"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "一键生成练习卷",
                "text": "点击生成按钮，系统自动随机出题"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "在线预览和调整",
                "text": "在页面中预览练习卷效果，不满意可重新生成"
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "导出PDF打印",
                "text": "点击下载按钮，生成A4标准格式PDF文件，直接打印使用"
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
                "name": "数学练习卷生成器支持哪些年级？",
                "acceptedAnswer": { "@type": "Answer", "text": "支持小学1-6年级全学段，一年级20以内加减法到六年级分数方程，自动匹配各年级知识点范围。" }
              },
              {
                "@type": "Question",
                "name": "生成的数学练习卷可以打印吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "可以，一键生成A4格式PDF文件，答案页独立分离，方便教师批改和家长辅导。" }
              },
              {
                "@type": "Question",
                "name": "每次生成的题目会重复吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "不会，系统采用随机算法出题，同一配置下每次生成的题目都不同，避免学生死记硬背。" }
              },
              {
                "@type": "Question",
                "name": "数学练习卷生成器是免费的吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "完全免费，无需注册登录，打开即用，不限制使用次数和打印份数。" }
              },
              {
                "@type": "Question",
                "name": "支持哪些题型？",
                "acceptedAnswer": { "@type": "Answer", "text": "支持加法、减法、乘法、除法、加减混合、乘除混合、四则混合、竖式计算、填空题、比较大小、应用题共11种题型。" }
              }
            ]
          })
        }}
      />
      <ToolBreadcrumb toolName="数学练习卷" toolPath="/tools/math-worksheet" />
      
      {/* AdSense 展示广告 - 请从 Google AdSense 创建广告单元后替换 data-ad-slot */}
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
