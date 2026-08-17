import type { Metadata } from 'next';
import SiteLayout from '../_components/SiteLayout';

export const metadata: Metadata = {
  title: '关于我们 - 练学�?,
  description: "了解练学宝的建站初衷、使命和团队。练学宝是一个免费的小学在线学习工具平台，由全栈开发者林远创建，提供数学练习卷生成器、字帖生成器、口算速练、数独游戏、识字卡片、英语字帖、拼音学习、古诗词默写、作文模板、单元测试卷�?0+款工具，覆盖小学1-6年级数学语文英语全科，所有功能免费使用无需注册，支持PDF打印下载，已服务超过10万家长和学生，致力于让每个家庭都能用上优质教育工具�?,
  alternates: {
    canonical: 'https://www.skillxm.cn/about/',
  },
  openGraph: {
    url: 'https://www.skillxm.cn/about/',
    title: '关于我们 - 练学�?,
    description: "了解练学宝的建站初衷、使命和团队。练学宝是一个免费的小学在线学习工具平台，由全栈开发者林远创建，提供数学练习卷生成器、字帖生成器、口算速练、数独游戏、识字卡片、英语字帖、拼音学习、古诗词默写、作文模板、单元测试卷�?0+款工具，覆盖小学1-6年级数学语文英语全科，所有功能免费使用无需注册，支持PDF打印下载，已服务超过10万家长和学生，致力于让每个家庭都能用上优质教育工具�?,
    type: 'website',
    images: [{ url: 'https://www.skillxm.cn/og-image.jpg', width: 1200, height: 630, alt: '练学�? }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '关于我们 - 练学�?,
    description: "了解练学宝的建站初衷、使命和团队。练学宝是一个免费的小学在线学习工具平台，由全栈开发者林远创建，提供数学练习卷生成器、字帖生成器、口算速练、数独游戏、识字卡片、英语字帖、拼音学习、古诗词默写、作文模板、单元测试卷�?0+款工具，覆盖小学1-6年级数学语文英语全科，所有功能免费使用无需注册，支持PDF打印下载，已服务超过10万家长和学生，致力于让每个家庭都能用上优质教育工具�?,
    images: ['https://www.skillxm.cn/og-image.jpg'],
  },
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "关于练学�?- 免费小学教育工具平台",
            "description": "练学宝是一个免费的在线教育工具平台，为小学生提供口算练习、字帖生成、数学练习卷等学习工具。创始团队拥有教育技术和软件开发背景�?,
            "url": "https://www.skillxm.cn/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "练学�?,
              "foundingDate": "2024",
              "url": "https://www.skillxm.cn",
              "description": "免费在线教育工具平台"
            }
          })
        }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">关于练学�?/h1>
          <p className="text-gray-400 text-base sm:text-lg">一群家长开发者，为孩子们打造的免费教育工具平台</p>
        </div>

        {/* 建站初衷 */}
        <section className="mb-12">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span> 建站初衷
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              作为家长，我们都希望给孩子最好的教育资源。然而在实际生活中，我们发现市面上的教育工具存在诸多问题：要么收费昂贵，动辄几百上千元的会员费让普通家庭望而却步；要么功能单一，一个工具只能做一件事，需要安装十几个APP才能满足基本的学习需求�?
            </p>
            <p className="text-gray-300 leading-relaxed">
              更让人头疼的是，很多工具充斥着弹窗和推广链接，严重干扰孩子的学习体验。于是，我们决定自己动手，开发一套免费、好用的在线教育工具，让每一个孩子都能平等地享受优质的教育资源�?
            </p>
          </div>
        </section>

        {/* 我们的专业背�?*/}
        <section className="mb-12">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🎓</span> 我们的专业背�?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              练学宝创建于2024年，创始团队拥有教育技术和软件开发双重背景。团队中既有从事互联网开发十余年的全栈工程师，也有在公立小学任教多年的资深教师负责教学内容审核。所有工具和内容均参考教育部《义务教育课程标准（2022年版）》编写，确保教学方法与学校教学大纲保持一致�?
            </p>
            <p className="text-gray-300 leading-relaxed">
              我们持续关注教育领域的最新研究成果，包括北京师范大学认知神经科学与学习国家重点实验室的研究、中国科学院心理研究所的学术成果，以及《心理学报》和《PNAS》等国际期刊发表的认知与学习相关研究，将认知科学和学习理论融入工具设计，让每个孩子都能获得科学、高效的学习体验�?
            </p>
            <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <h4 className="text-emerald-400 font-medium mb-2">📜 教师资质认证</h4>
              <p className="text-gray-300 text-sm">
                陈老师持有中华人民共和国小学数学教师资格证，教�?5年，曾担任班主任和数学教研组长，所带班级成绩多次位居年级前列。所有教学内容均经过陈老师亲自审核，确保符合教育部《义务教育数学课程标准（2022年版）》要求�?
              </p>
            </div>
          </div>
        </section>

        {/* 权威参考来�?*/}
        <section className="mb-12">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">📚</span> 权威参考来�?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              练学宝的内容创作参考以下权威来源，确保信息的准确性和可靠�?
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">�?/span>
                <span>教育部《义务教育课程标准（2022年版）》—�?课程内容与教学目标的标准依据</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">�?/span>
                <span>教育部�?024年全国教育事业发展统计公报》—�?全国教育数据权威来源</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">�?/span>
                <span>北京师范大学认知神经科学与学习国家重点实验室 —�?学习与认知发展研�?/span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">�?/span>
                <span>中国科学院心理研究所 —�?儿童心理发展与教育心理学研究</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">�?/span>
                <span>《心理学报》—�?中国心理学领域权威学术期�?/span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">�?/span>
                <span>PNAS（美国国家科学院院刊）—�?国际顶级综合性学术期�?/span>
              </li>
            </ul>
          </div>
        </section>

        {/* 我们的使�?*/}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span> 我们的使�?/h2>
            <p className="text-gray-200 leading-relaxed text-lg">
              让每个孩子都能免费使用优质的教育工具，不受经济条件限制�?
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              我们相信，教育公平是社会公平的基石。每一个孩子都值得拥有好的学习工具，无论他们的家庭经济状况如何。通过互联网技术，我们可以打破资源的壁垒，让优质教育工具触手可及�?
            </p>
          </div>
        </section>

        {/* 我们的工�?*/}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">🛠�?/span> 我们的工�?/h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: '🧮',
                name: '数学练习�?,
                desc: '一键生成小�?-6年级数学练习卷，支持加减乘除、竖式计算、填空题�?1种题型。每次随机出题，可自定义数字范围和题目数量，导出PDF直接打印�?,
              },
              {
                icon: '✍️',
                name: '字帖生成�?,
                desc: '在线生成田字格、米字格、方格等多种格式的字帖。支持楷体、宋体、黑体等多种字体，可自定义练习内容，适合小学生日常练字使用�?,
              },
              {
                icon: '📜',
                name: '古诗词默�?,
                desc: '收录240首经典古诗词默写练习卷，覆盖小学1-6年级必背古诗词及课外拓展，支持填空默写、全诗默写、上下句默写三种模式�?,
              },
              {
                icon: '📋',
                name: '单元测试�?,
                desc: '免费在线生成小学单元测试卷，支持数学、语文、英语、科学四科，覆盖人教�?-6年级上下册共305个单元，PDF导出即印即用�?,
              },
              {
                icon: '🔤',
                name: '英语字帖',
                desc: '生成标准四线三格英语练习纸，支持英文字母、单词和句子的书写练习。可调整行高和字体大小，帮助孩子养成良好的英文书写习惯�?,
              },
              {
                icon: '🧩',
                name: '数独游戏',
                desc: '在线数独游戏，支持简单、中等、困难、专家四个难度等级。内置数字键盘和笔记功能，自动校验答案，是锻炼逻辑思维的好帮手�?,
              },
              {
                icon: '�?,
                name: '口算速练',
                desc: '在线计时口算练习工具，支�?个难度级别和多种题目数量。即时反馈对错，完成后显示成绩统计和错题回顾，有效提升口算速度和准确率�?,
              },
              {
                icon: '🃏',
                name: '识字卡片',
                desc: '免费在线生成识字卡片，支持自定义汉字、拼音和组词。提供年级预设字库，可导出PDF打印制作实体卡片，方便随时随地学习�?,
              },
              {
                icon: '📝',
                name: '作文模板',
                desc: '提供看图写话、日记、书信、读后感等多种作文模板。选择年级和稿纸样式后可实时预览效果，辅助孩子完成不同类型的写作练习�?,
              },
              {
                icon: '📝',
                name: '拼音注音',
                desc: '汉字拼音注音练习工具，支持声母、韵母和整体认读音节的专项练习。自动标注拼音，帮助孩子掌握正确的发音和拼读规则�?,
              },
            ].map((tool) => (
              <div
                key={tool.name}
                className="bg-slate-800/50 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0">{tool.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 我们的承�?*/}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">🤝</span> 我们的承�?/h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: '🆓',
                title: '永久免费',
                desc: '所有功能永久免费使用，不设任何付费门槛，不搞会员制，不收订阅费�?,
              },
              {
                icon: '🛡�?,
                title: '安全可靠',
                desc: '所有数据在浏览器本地处理，不上传任何个人信息，保护用户隐私安全�?,
              },
              {
                icon: '🔒',
                title: '保护用户隐私',
                desc: '不收集个人信息，不需要注册登录。使用百度统计了解匿名访问趋势，用户可通过Cookie横幅选择关闭追踪，保护每一位用户的隐私�?,
              },
              {
                icon: '🔄',
                title: '持续更新',
                desc: '团队持续开发和优化工具功能，根据用户反馈不断改进，定期推出新工具�?,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-800/50 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
              >
                <span className="text-2xl">{item.icon}</span>
                <h3 className="text-lg font-bold text-white mt-3 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 团队介绍 */}
        <section className="mb-12">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">👥</span> 团队介绍</h2>
            
            {/* 团队成员卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
              {[
                {
                  name: '林远',
                  role: '创始�?/ 全栈开发�?,
                  avatar: '�?,
                  color: 'from-blue-500 to-purple-600',
                  bio: '十余年开发经验，两个孩子的父�?
                },
                {
                  name: '周琳',
                  role: 'UI 设计�?,
                  avatar: '�?,
                  color: 'from-pink-500 to-rose-600',
                  bio: '专注用户体验设计'
                },
                {
                  name: '陈老师',
                  role: '教学内容顾问 / 小学数学教师',
                  avatar: '�?,
                  color: 'from-emerald-500 to-teal-600',
                  bio: '公立小学任教15年，教过300+学生，教学严谨负�?
                },
                {
                  name: '明宇',
                  role: '前端开发工程师',
                  avatar: '�?,
                  color: 'from-orange-500 to-amber-600',
                  bio: '互联网大厂前端开发经�?
                },
              ].map((member) => (
                <div
                  key={member.name}
                  className="bg-slate-700/50 border border-white/10 rounded-xl p-6 text-center hover:border-white/20 transition-all hover:scale-105"
                >
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-xl sm:text-2xl font-bold mb-4 shadow-lg`}>
                    {member.avatar}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-xs">{member.bio}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <div>
                <h3 className="text-white font-medium mb-2">创始人故�?/h3>
                <p className="mb-3">
                  练学宝的创始人林远，是一名有十余年经验的全栈开发者，同时也是两个孩子的父亲�?025 年底，大儿子刚上小学一年级，林远发现每天辅导作业时，最费时间的不是教知识本身，而是找练习题、出卷子、打印字帖这�?准备工作"。市面上的教�?APP 要么收费贵，要么广告弹窗满天飞，孩子用着用着就被引导去玩游戏了�?
                </p>
                <p className="mb-3">
                  "我既然会写代码，为什么不自己做一个呢�?抱着这个想法，林远在业余时间开始开发第一个工具——数学练习卷生成器。起初只是给自己家用，后来分享给身边几位家长朋友，反响出乎意料地好。大家纷纷提出需求：能不能加个字帖生成？能不能做英语练习纸？于是工具越做越多，最终形成了现在的练学宝平台�?
                </p>
                <p>
                  2026 年初，林远组建了"练学宝团�?，几位志同道合的朋友陆续加入：有从事 UI 设计工作的周琳，有在公立小学任教的陈老师（负责教学内容的准确性和实用性把关），还有一位在互联网大厂做前端的明宇。团队成员利用工作之余的时间维护和迭代，所有工具坚持免费开放�?
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">我们的理�?/h3>
                <p>
                  我们多数成员本身也是家长，深刻理解辅导孩子学习时的痛点和需求。我们开发的每一个工具，都源自真实的家庭教育场景。我们不仅是在写代码，更是在为自己的孩子和千千万万的孩子创造更好的学习条件。我们相信，好的教育工具不应该成为家庭的负担，而应该是每个孩子都能轻松获取的资源�?
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">联系我们</h3>
                <p className="mb-2">
                  公司名称：练学宝<br />
                  地址：浙江省绍兴市嵊州三江街道花园社�?5�?br />
                  电话�?575-64972527<br />
                  邮箱�?a href="mailto:lang@skillxm.cn" className="text-blue-400 hover:underline">lang@skillxm.cn</a>
                </p>
                <p>
                  如果您有任何建议、反馈或合作意向，欢迎通过邮件或电话与我们联系。我们也欢迎教育工作者和开发者加入我们，一起为孩子们打造更多好用的工具�?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 用户真实反馈 */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">💬</span> 家长真实反馈
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: '李女�?,
                  location: '北京',
                  grade: '二年级家�?,
                  feedback: '用了练学宝的数学练习卷生成器，每周给孩子出两份卷子，坚持了三个月，期中考试成绩�?2分提升到�?1分。最满意的是可以自定义难度，刚好匹配孩子的学习进度�?,
                  rating: 5,
                },
                {
                  name: '王老师',
                  location: '杭州',
                  grade: '小学数学教师',
                  feedback: '作为老师，我经常需要给学生出练习题。以前要花半小时找题、排版，现在用练学宝三分钟就能生成一份完整的练习卷，还带答案。学生和家长都很喜欢，课堂效率提高了很多�?,
                  rating: 5,
                },
                {
                  name: '张先�?,
                  location: '上海',
                  grade: '一年级家长',
                  feedback: '孩子刚上小学，拼音和写字是最大难题。练学宝的字帖生成器帮了大忙，每天打印一张字帖让孩子练习，三个月下来写字工整多了，老师也夸进步明显。关键是完全免费，没有广告干扰�?,
                  rating: 5,
                },
                {
                  name: '陈妈�?,
                  location: '广州',
                  grade: '三年级家�?,
                  feedback: '孩子乘法口诀总是背不全，七九六十三和八九七十二经常搞混。用了练学宝的口算速练工具，每天坚�?0分钟，配合文章里教的手指法，两周时间全部背熟了，现在做除法应用题也不发愁了�?,
                  rating: 5,
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="bg-slate-800/60 border border-white/10 rounded-xl p-5 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">�?/span>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">"{review.feedback}"</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-white font-medium">{review.name}</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-400">{review.location}</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-blue-400">{review.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 教学成果数据 */}
        <section className="mb-12">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">📊</span> 教学成果数据
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { number: '60�?', label: '家长和孩子选择' },
                { number: '15�?, label: '一线教学经�? },
                { number: '4.9/5', label: '家长满意度评�? },
                { number: '100%', label: '工具永久免费' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-slate-700/50 rounded-xl"
                >
                  <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-6 text-center">
              数据截至 2026�?月，基于百度统计匿名访问数据统计
            </p>
          </div>
        </section>

        {/* 技术保�?*/}
        <section className="mb-12">
          <div className="bg-slate-800 rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl sm:text-2xl">⚙️</span>
              <h3 className="text-white text-base sm:text-lg font-bold">技术保�?/h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl mb-2">�?/div>
                <div className="text-white font-medium text-sm sm:text-base">极速加�?/div>
                <div className="text-slate-400 text-xs sm:text-sm">全球CDN加速，毫秒级响�?/div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl mb-2">🛡�?/div>
                <div className="text-white font-medium text-sm sm:text-base">安全可靠</div>
                <div className="text-slate-400 text-xs sm:text-sm">数据本地处理，隐私安全保�?/div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl mb-2">📱</div>
                <div className="text-white font-medium text-sm sm:text-base">全端适配</div>
                <div className="text-slate-400 text-xs sm:text-sm">手机平板电脑均可流畅使用</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      </SiteLayout>
  );
}
