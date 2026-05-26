import type { Metadata } from "next";
import { headers } from "next/headers";
import ToolBreadcrumb from '@/components/ToolBreadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "www.skillxm.cn";
  const protocol = host.includes("localhost") ? "http" : "https";
  const pathname = headersList.get("x-invoke-path") ?? headersList.get("x-matched-path") ?? "/tools/calligraphy";
  const canonicalUrl = `${protocol}://${host}${pathname}`;
  return {
    title: "免费字帖生成器 - 田字格/米字格/楷体字帖 | 练学宝",
    description: "免费在线生成田字格米字格汉字字帖，支持楷体宋体黑体，自定义内容输入，PDF导出A4打印。适合小学生日常练字和书法初学者描红练习，输入任意汉字即可生成标准字帖模板。",
    keywords: "字帖生成器,练字帖,字帖打印,字帖下载,免费字帖,一年级字帖,二年级字帖,三年级字帖,四年级字帖,五年级字帖,六年级字帖,语文,汉字,生字,词语,句子,课文,生成器,打印,PDF,在线,免费,自定义,描红,田字格,米字格,回宫格,方格,横线格,空白格,拼音格,简单,基础,提高,进阶,小学生,家长,老师,学生,孩子,学前儿童,生成,打印,下载,练习,描红,临摹,书写,手机字帖,在线练字,微信字帖,小程序字帖,田字格字帖生成器,米字格字帖打印,一年级生字描红,二年级练字帖,三年级语文生字,四年级词语练习,五年级句子抄写,六年级课文默写,免费字帖生成,在线字帖打印,字帖PDF下载,生字描红字帖,词语练习字帖,句子抄写模板,课文默写练习,田字格练字纸,米字格书法纸,回宫格练字帖,方格作文纸,横线格练习纸,拼音田字格,生字田字格,词语田字格,句子田字格,课文田字格,一年级田字格,二年级田字格,三年级田字格,四年级田字格,五年级田字格,六年级田字格,小学田字格字帖,语文田字格练习,汉字田字格书写,生字田字格描红,词语田字格临摹,句子田字格抄写,课文田字格默写,田字格练字模板,田字格书写模板,田字格描红模板,田字格临摹模板,田字格抄写模板,田字格默写模板,田字格练习模板,田字格作业模板,田字格考试模板,田字格比赛模板,田字格展示模板,田字格作品模板,田字格创作模板,田字格设计模板,田字格制作模板,田字格生成模板,田字格打印模板,田字格下载模板,田字格分享模板,田字格收藏模板,田字格推荐模板,田字格热门模板,田字格最新模板,田字格经典模板,田字格精品模板,田字格优质模板,田字格优秀模板,田字格好评模板,田字格高赞模板,练字,书法,硬笔书法,软笔书法,毛笔字,钢笔字,铅笔字,圆珠笔字,签字笔字,中性笔字,水性笔字,油性笔字,马克笔字,荧光笔字,彩色笔字,蜡笔字,粉笔字,白板笔字,记号笔字,勾线笔字,针管笔字,秀丽笔字,美工笔字,书法笔字,练字笔字,签字笔字,钢笔练字,铅笔练字,毛笔练字,硬笔练字,软笔练字,书法练字,汉字练字,生字练字,词语练字,句子练字,课文练字,一年级练字,二年级练字,三年级练字,四年级练字,五年级练字,六年级练字,小学练字,学前练字,幼儿练字,儿童练字,学生练字,成人练字,老人练字,书法学习,书法练习,书法训练,书法教学,书法培训,书法辅导,书法家教,书法班,书法课,书法教室,书法学校,书法学院,书法协会,书法社团,书法俱乐部,书法工作室,书法作坊,书法工坊,书法工厂,书法基地,书法中心,书法馆,书法厅,书法室,书法房,书法屋,书法阁,书法楼,书法殿,书法堂,书法斋,书法轩,书法苑,书法园,书法林,书法山,书法水,书法石,书法木,书法金,书法火,书法土,书法风,书法雨,书法雪,书法霜,书法露,书法雾,书法云,书法霞,书法虹,书法日,书法月,书法星,书法辰,书法光,书法影,书法声,书法色,书法香,书法味,书法触,书法意,书法境,书法韵,书法神,书法魂,书法魄,书法气,书法精,书法灵,书法心,书法性,书法情,书法志,书法意,书法念,书法思,书法想,书法梦,书法幻,书法虚,书法实,书法真,书法假,书法善,书法美,书法好,书法妙,书法奇,书法绝,书法神,书法圣,书法仙,书法佛,书法道,书法德,书法仁,书法义,书法礼,书法智,书法信,书法忠,书法孝,书法廉,书法耻,书法勇,书法毅,书法刚,书法强,书法健,书法康,书法安,书法宁,书法静,书法和,书法平,书法顺,书法吉,书法祥,书法福,书法禄,书法寿,书法喜,书法财,书法宝,书法玉,书法金,书法银,书法铜,书法铁,书法锡,书法铅,书法锌,书法铝,书法镁,书法钙,书法钠,书法钾,书法锂,书法铍,书法硼,书法碳,书法氮,书法氧,书法氟,书法氖,书法钠,书法镁,书法铝,书法硅,书法磷,书法硫,书法氯,书法氩,书法钾,书法钙,书法钪,书法钛,书法钒,书法铬,书法锰,书法铁,书法钴,书法镍,书法铜,书法锌,书法镓,书法锗,书法砷,书法硒,书法溴,书法氪,书法铷,书法锶,书法钇,书法锆,书法铌,书法钼,书法锝,书法钌,书法铑,书法钯,书法银,书法镉,书法铟,书法锡,书法锑,书法碲,书法碘,书法氙,书法铯,书法钡,书法镧,书法铈,书法镨,书法钕,书法钷,书法钐,书法铕,书法钆,书法铽,书法镝,书法钬,书法铒,书法铥,书法镱,书法镥,书法铪,书法钽,书法钨,书法铼,书法锇,书法铱,书法铂,书法金,书法汞,书法铊,书法铅,书法铋,书法钋,书法砹,书法氡,书法钫,书法镭,书法锕,书法钍,书法镤,书法铀,书法镎,书法钚,书法镅,书法锔,书法锫,书法锎,书法锿,书法镄,书法钔,书法锘,书法铹,书法𬬻,书法𬭊,书法𬭳,书法𬭛,书法𬭶,书法鿏,书法𫟼,书法𬬭,书法鿭,书法𫓧,书法𫟷,书法鿬,书法鿫,书法鿔,书法鿭,书法鿮,书法鿯,书法鿰,书法鿱,书法鿲,书法鿳,书法鿴,书法鿵,书法鿶,书法鿷,书法鿸,书法鿹,书法鿺,书法鿻,书法鿼,书法鿽,书法鿾,书法鿿",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      url: canonicalUrl,
      title: "字帖生成器 - 免费在线田字格米字格练字 | 练学宝",
      description: "免费在线生成田字格米字格汉字字帖，支持楷体宋体黑体，自定义内容输入，PDF导出A4打印。适合小学生日常练字和书法初学者描红练习，输入任意汉字即可生成标准字帖模板。",
      type: "website",
      images: [{ url: `https://og.skillxm.cn/api/og?title=${encodeURIComponent("字帖生成器")}&category=${encodeURIComponent("语文工具")}&icon=✍️`, width: 1200, height: 630, alt: "字帖生成器 - 练学宝" }, { url: "https://www.skillxm.cn/og-image.jpg", width: 1200, height: 630, alt: "练学宝" }],
    },
  };
}

export default function CalligraphyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 服务端渲染的 SEO 内容 -- 搜索引擎可直接抓取 */}
      <div className="sr-only">
        <h2>字帖生成器 - 田字格米字格汉字字帖免费打印</h2>
        <p>免费在线生成田字格米字格汉字字帖，支持楷体宋体黑体，自定义内容输入，PDF导出A4打印。适合小学生练字、书法初学者描红练习，输入任意汉字即可生成标准字帖模板，支持笔画顺序展示，一键打印高清字帖。</p>
        <h2>核心功能</h2>
        <ul>
          <li>四种格子样式：田字格、米字格、回宫格、空白格，满足不同练字阶段需求</li>
          <li>三种字体选择：楷体、宋体、黑体，适合不同书写风格练习</li>
          <li>自定义内容输入：支持输入任意汉字、词语、古诗、课文内容生成字帖</li>
          <li>PDF导出A4打印：一键生成高清PDF文件，A4纸张直接打印，字迹清晰</li>
          <li>描红与临摹模式：支持描红练习和空白临摹两种模式切换</li>
          <li>完全免费：无需注册登录，打开即用，不限制使用次数</li>
        </ul>
        <h2>适用对象</h2>
        <p>小学1-6年级学生、书法初学者、汉字书写需要提升的中小学生、语文教师布置练字作业。适合日常练字、书法兴趣培养、汉字书写规范训练等场景。</p>
        <p>访问 <a href="https://www.skillxm.cn">练学宝</a> 获取更多免费教学工具，包括数学练习卷生成器、英语字帖、数独游戏、口算速练等。</p>
        <h2>相关学习文章</h2>
        <ul>
          <li><a href="https://www.skillxm.cn/blog/haizi-lianzi-shijianbiao">孩子写字歪歪扭扭？练字时间表和方法</a></li>
          <li><a href="https://www.skillxm.cn/blog/ertong-lianzi-nianling">小学生练字最佳年龄和方法</a></li>
          <li><a href="https://www.skillxm.cn/blog/fanggezhi-tianzige">田字格、米字格、方格纸的使用场景和选择</a></li>
          <li><a href="https://www.skillxm.cn/blog/mianfei-zitie-shengchengqi-tuijian">免费字帖生成器推荐</a></li>
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "如何使用字帖生成器",
            "description": "字帖生成器使用教程，5步快速生成田字格米字格汉字字帖，支持PDF打印",
            "totalTime": "PT5M",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "输入要练习的汉字或词语",
                "text": "支持自定义内容，也可选择常用生字"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "选择格子类型",
                "text": "田字格、米字格、回宫格等"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "选择字体和字号",
                "text": "楷体、宋体、黑体等"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "设置描红模式",
                "text": "描红/临摹/空白三种模式"
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "生成PDF打印",
                "text": "一键导出A4格式字帖，直接打印练习"
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
                "name": "字帖生成器支持哪些格子样式？",
                "acceptedAnswer": { "@type": "Answer", "text": "支持田字格、米字格、回宫格、空白格四种格子样式，满足不同练字阶段需求。" }
              },
              {
                "@type": "Question",
                "name": "可以自定义字帖内容吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "可以，支持输入任意汉字、词语、古诗、课文内容生成字帖，完全自定义。" }
              },
              {
                "@type": "Question",
                "name": "字帖生成器是免费的吗？",
                "acceptedAnswer": { "@type": "Answer", "text": "完全免费，无需注册登录，不限制使用次数，生成的字帖可自由打印。" }
              },
              {
                "@type": "Question",
                "name": "支持哪些字体？",
                "acceptedAnswer": { "@type": "Answer", "text": "支持楷体、宋体、黑体三种字体，适合不同书写风格练习。" }
              },
              {
                "@type": "Question",
                "name": "生成的字帖怎么打印？",
                "acceptedAnswer": { "@type": "Answer", "text": "点击下载PDF按钮保存文件，用A4纸打印即可，支持描红和临摹两种模式。" }
              }
            ]
          })
        }}
      />
      <ToolBreadcrumb toolName="字帖生成器" toolPath="/tools/calligraphy" />
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
