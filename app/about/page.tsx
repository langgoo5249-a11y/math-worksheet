import type { Metadata } from 'next';
import SiteLayout from '../_components/SiteLayout';

export const metadata: Metadata = {
  title: '关于我们 - 练学宝',
  description: '了解练学宝的建站初衷、使命和团队。我们致力于为每个孩子提供免费、好用的在线教育工具。',
  alternates: {
    canonical: 'https://www.skillxm.cn/about/',
  },
  openGraph: {
    url: 'https://www.skillxm.cn/about/',
    title: '关于我们 - 练学宝',
    description: '练学宝由一群热爱教育的家长开发者创建，致力于为小学生提供免费优质的教学工具。',
    type: 'website',
    images: [{ url: 'https://www.skillxm.cn/og-image.jpg', width: 1200, height: 630, alt: '练学宝' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '关于我们 - 练学宝',
    description: '练学宝由一群热爱教育的家长开发者创建，致力于为小学生提供免费优质的教学工具。',
    images: ['https://www.skillxm.cn/og-image.jpg'],
  },
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">关于练学宝</h1>
          <p className="text-gray-400 text-base sm:text-lg">一群家长开发者，为孩子们打造的免费教育工具平台</p>
        </div>

        {/* 建站初衷 */}
        <section className="mb-12">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span> 建站初衷
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              作为家长，我们都希望给孩子最好的教育资源。然而在实际生活中，我们发现市面上的教育工具存在诸多问题：要么收费昂贵，动辄几百上千元的会员费让普通家庭望而却步；要么功能单一，一个工具只能做一件事，需要安装十几个APP才能满足基本的学习需求。
            </p>
            <p className="text-gray-300 leading-relaxed">
              更让人头疼的是，很多工具充斥着弹窗和推广链接，严重干扰孩子的学习体验。于是，我们决定自己动手，开发一套免费、好用的在线教育工具，让每一个孩子都能平等地享受优质的教育资源。
            </p>
          </div>
        </section>

        {/* 我们的使命 */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span> 我们的使命</h2>
            <p className="text-gray-200 leading-relaxed text-lg">
              让每个孩子都能免费使用优质的教育工具，不受经济条件限制。
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              我们相信，教育公平是社会公平的基石。每一个孩子都值得拥有好的学习工具，无论他们的家庭经济状况如何。通过互联网技术，我们可以打破资源的壁垒，让优质教育工具触手可及。
            </p>
          </div>
        </section>

        {/* 我们的工具 */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">🛠️</span> 我们的工具</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: '🧮',
                name: '数学练习卷',
                desc: '一键生成小学1-6年级数学练习卷，支持加减乘除、竖式计算、填空题等11种题型。每次随机出题，可自定义数字范围和题目数量，导出PDF直接打印。',
              },
              {
                icon: '✍️',
                name: '字帖生成器',
                desc: '在线生成田字格、米字格、方格等多种格式的字帖。支持楷体、宋体、黑体等多种字体，可自定义练习内容，适合小学生日常练字使用。',
              },
              {
                icon: '📜',
                name: '古诗词默写',
                desc: '收录240首经典古诗词默写练习卷，覆盖小学1-6年级必背古诗词及课外拓展，支持填空默写、全诗默写、上下句默写三种模式。',
              },
              {
                icon: '📋',
                name: '单元测试卷',
                desc: '免费在线生成小学单元测试卷，支持数学、语文、英语、科学四科，覆盖人教版1-6年级上下册共305个单元，PDF导出即印即用。',
              },
              {
                icon: '🔤',
                name: '英语字帖',
                desc: '生成标准四线三格英语练习纸，支持英文字母、单词和句子的书写练习。可调整行高和字体大小，帮助孩子养成良好的英文书写习惯。',
              },
              {
                icon: '🧩',
                name: '数独游戏',
                desc: '在线数独游戏，支持简单、中等、困难、专家四个难度等级。内置数字键盘和笔记功能，自动校验答案，是锻炼逻辑思维的好帮手。',
              },
              {
                icon: '⚡',
                name: '口算速练',
                desc: '在线计时口算练习工具，支持4个难度级别和多种题目数量。即时反馈对错，完成后显示成绩统计和错题回顾，有效提升口算速度和准确率。',
              },
              {
                icon: '🃏',
                name: '识字卡片',
                desc: '免费在线生成识字卡片，支持自定义汉字、拼音和组词。提供年级预设字库，可导出PDF打印制作实体卡片，方便随时随地学习。',
              },
              {
                icon: '📝',
                name: '作文模板',
                desc: '提供看图写话、日记、书信、读后感等多种作文模板。选择年级和稿纸样式后可实时预览效果，辅助孩子完成不同类型的写作练习。',
              },
              {
                icon: '📝',
                name: '拼音注音',
                desc: '汉字拼音注音练习工具，支持声母、韵母和整体认读音节的专项练习。自动标注拼音，帮助孩子掌握正确的发音和拼读规则。',
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

        {/* 我们的承诺 */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">🤝</span> 我们的承诺</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: '🆓',
                title: '永久免费',
                desc: '所有功能永久免费使用，不设任何付费门槛，不搞会员制，不收订阅费。通过 Google AdSense 非侵入式广告维持网站运营和工具开发。',
              },
              {
                icon: '🛡️',
                title: '安全可靠',
                desc: '所有数据在浏览器本地处理，不上传任何个人信息，保护用户隐私安全。',
              },
              {
                icon: '🔒',
                title: '保护用户隐私',
                desc: '不收集个人信息，不需要注册登录。使用百度统计了解匿名访问趋势，用户可通过Cookie横幅选择关闭追踪，保护每一位用户的隐私。',
              },
              {
                icon: '🔄',
                title: '持续更新',
                desc: '团队持续开发和优化工具功能，根据用户反馈不断改进，定期推出新工具。',
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
                  role: '创始人 / 全栈开发者',
                  avatar: '林',
                  color: 'from-blue-500 to-purple-600',
                  bio: '十余年开发经验，两个孩子的父亲'
                },
                {
                  name: '周琳',
                  role: 'UI 设计师',
                  avatar: '周',
                  color: 'from-pink-500 to-rose-600',
                  bio: '专注用户体验设计'
                },
                {
                  name: '陈老师',
                  role: '教学内容顾问',
                  avatar: '陈',
                  color: 'from-emerald-500 to-teal-600',
                  bio: '公立小学教师，负责内容把关'
                },
                {
                  name: '明宇',
                  role: '前端开发工程师',
                  avatar: '明',
                  color: 'from-orange-500 to-amber-600',
                  bio: '互联网大厂前端开发经验'
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
                <h3 className="text-white font-medium mb-2">创始人故事</h3>
                <p className="mb-3">
                  练学宝的创始人林远，是一名有十余年经验的全栈开发者，同时也是两个孩子的父亲。2025 年底，大儿子刚上小学一年级，林远发现每天辅导作业时，最费时间的不是教知识本身，而是找练习题、出卷子、打印字帖这些"准备工作"。市面上的教育 APP 要么收费贵，要么广告弹窗满天飞，孩子用着用着就被引导去玩游戏了。
                </p>
                <p className="mb-3">
                  "我既然会写代码，为什么不自己做一个呢？"抱着这个想法，林远在业余时间开始开发第一个工具——数学练习卷生成器。起初只是给自己家用，后来分享给身边几位家长朋友，反响出乎意料地好。大家纷纷提出需求：能不能加个字帖生成？能不能做英语练习纸？于是工具越做越多，最终形成了现在的练学宝平台。
                </p>
                <p>
                  2026 年初，林远组建了"练学宝团队"，几位志同道合的朋友陆续加入：有从事 UI 设计工作的周琳，有在公立小学任教的陈老师（负责教学内容的准确性和实用性把关），还有一位在互联网大厂做前端的明宇。团队成员利用工作之余的时间维护和迭代，所有工具坚持免费开放。
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">我们的理念</h3>
                <p>
                  我们多数成员本身也是家长，深刻理解辅导孩子学习时的痛点和需求。我们开发的每一个工具，都源自真实的家庭教育场景。我们不仅是在写代码，更是在为自己的孩子和千千万万的孩子创造更好的学习条件。我们相信，好的教育工具不应该成为家庭的负担，而应该是每个孩子都能轻松获取的资源。
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">联系我们</h3>
                <p className="mb-2">
                  公司名称：练学宝<br />
                  地址：浙江省绍兴市嵊州三江街道花园社区75号<br />
                  电话：0575-64972527<br />
                  邮箱：<a href="mailto:lang@skillxm.cn" className="text-blue-400 hover:underline">lang@skillxm.cn</a>
                </p>
                <p>
                  如果您有任何建议、反馈或合作意向，欢迎通过邮件或电话与我们联系。我们也欢迎教育工作者和开发者加入我们，一起为孩子们打造更多好用的工具。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 技术保障 */}
        <section className="mb-12">
          <div className="bg-slate-800 rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl sm:text-2xl">⚙️</span>
              <h3 className="text-white text-base sm:text-lg font-bold">技术保障</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl mb-2">⚡</div>
                <div className="text-white font-medium text-sm sm:text-base">极速加载</div>
                <div className="text-slate-400 text-xs sm:text-sm">全球CDN加速，毫秒级响应</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl mb-2">🛡️</div>
                <div className="text-white font-medium text-sm sm:text-base">安全可靠</div>
                <div className="text-slate-400 text-xs sm:text-sm">数据本地处理，隐私安全保障</div>
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
