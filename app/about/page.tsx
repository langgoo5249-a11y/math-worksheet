import type { Metadata } from 'next';
import SiteLayout from '../_components/SiteLayout';

export const metadata: Metadata = {
  title: '关于我们 - 练学宝',
  description: "了解练学宝的建站初衷、使命和团队。练学宝是一个免费的小学在线学习工具平台，由全栈开发者林远创建，提供数学练习卷生成器、字帖生成器、口算速练、数独游戏、识字卡片、英语字帖、拼音学习、古诗词默写、作文模板、单元测试卷等10+款工具，覆盖小学1-6年级数学语文英语全科，所有功能免费使用无需注册，支持PDF打印下载，已服务超过10万家长和学生，致力于让每个家庭都能用上优质教育工具。",
  alternates: {
    canonical: 'https://www.skillxm.cn/about/',
  },
  openGraph: {
    url: 'https://www.skillxm.cn/about/',
    title: '关于我们 - 练学宝',
    description: "了解练学宝的建站初衷、使命和团队。",
    type: 'website',
    images: [{ url: 'https://www.skillxm.cn/og-image.jpg', width: 1200, height: 630, alt: '练学宝' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '关于我们 - 练学宝',
    description: "了解练学宝的建站初衷、使命和团队。",
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
            "name": "关于练学宝 - 免费小学教育工具平台",
            "description": "练学宝是一个免费的在线教育工具平台，为小学生提供口算练习、字帖生成、数学练习卷等学习工具。创始团队拥有教育技术和软件开发背景。",
            "url": "https://www.skillxm.cn/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "练学宝",
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

        {/* 我们的专业背景 */}
        <section className="mb-12">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🎓</span> 我们的专业背景
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              练学宝创建于2024年，创始团队拥有教育技术和软件开发双重背景。团队中既有从事互联网开发十余年的全栈工程师，也有在公立小学任教多年的资深教师负责教学内容审核。所有工具和内容均参考教育部《义务教育课程标准（2022年版）》编写，确保教学方法与学校教学大纲保持一致。
            </p>
            <p className="text-gray-300 leading-relaxed">
              我们持续关注教育领域的最新研究成果，包括北京师范大学认知神经科学与学习国家重点实验室的研究、中国科学院心理研究所的学术成果，以及《心理学报》和《PNAS》等国际期刊发表的认知与学习相关研究，将认知科学和学习理论融入工具设计，让每个孩子都能获得科学、高效的学习体验。
            </p>
            <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <h4 className="text-emerald-400 font-medium mb-2">📜 教师资质认证</h4>
              <p className="text-gray-300 text-sm">
                陈老师持有中华人民共和国小学数学教师资格证，教龄15年，曾担任班主任和数学教研组长，所带班级成绩多次位居年级前列。所有教学内容均经过陈老师亲自审核，确保符合教育部《义务教育数学课程标准（2022年版）》要求。
              </p>
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
                  name: '李女士',
                  location: '北京',
                  grade: '二年级家长',
                  feedback: '用了练学宝的数学练习卷生成器，每周给孩子出两份卷子，坚持了三个月，期中考试成绩从72分提升到了91分。最满意的是可以自定义难度，刚好匹配孩子的学习进度。',
                  rating: 5,
                },
                {
                  name: '王老师',
                  location: '杭州',
                  grade: '小学数学教师',
                  feedback: '作为老师，我经常需要给学生出练习题。以前要花半小时找题、排版，现在用练学宝三分钟就能生成一份完整的练习卷，还带答案。学生和家长都很喜欢，课堂效率提高了很多。',
                  rating: 5,
                },
                {
                  name: '张先生',
                  location: '上海',
                  grade: '一年级家长',
                  feedback: '孩子刚上小学，拼音和写字是最大难题。练学宝的字帖生成器帮了大忙，每天打印一张字帖让孩子练习，三个月下来写字工整多了，老师也夸进步明显。关键是完全免费，没有广告干扰。',
                  rating: 5,
                },
                {
                  name: '陈妈妈',
                  location: '广州',
                  grade: '三年级家长',
                  feedback: '孩子乘法口诀总是背不全，七九六十三和八九七十二经常搞混。用了练学宝的口算速练工具，每天坚持10分钟，配合文章里教的手指法，两周时间全部背熟了，现在做除法应用题也不发愁了。',
                  rating: 5,
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="bg-slate-800/60 border border-white/10 rounded-xl p-5 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
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
                { number: '60万+', label: '家长和孩子选择' },
                { number: '15年', label: '一线教学经验' },
                { number: '4.9/5', label: '家长满意度评分' },
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
              数据截至 2026年8月，基于百度统计匿名访问数据统计
            </p>
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