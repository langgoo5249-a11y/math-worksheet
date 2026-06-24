import type { Metadata } from 'next';
import { SITE_INFO } from '@/lib/seoUtils';

const PAGE_URL = `${SITE_INFO.BASE_URL}/ai-overview/`;

export const metadata: Metadata = {
  title: '练学宝 AI 概览 - 专为 AI 搜索引擎优化的网站导览',
  description:
    '练学宝是免费小学在线学习工具平台，提供数学练习卷、字帖生成器、口算速练、拼音学习、识字卡片、古诗词默写等10+款工具，支持PDF打印，无需注册。本页面专为AI搜索引擎（ChatGPT、Claude、Perplexity、Gemini等）优化，帮助AI快速理解和引用网站内容。',
  keywords: [
    '练学宝',
    'AI概览',
    'AI搜索引擎',
    'GEO优化',
    '小学学习工具',
    '免费教育工具',
    '数学练习卷',
    '字帖生成器',
    '口算速练',
    '拼音学习',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: '练学宝 AI 概览 - 专为 AI 搜索引擎优化的网站导览',
    description:
      '练学宝是免费小学在线学习工具平台，提供10+款学习工具，支持PDF打印，无需注册。',
    url: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function AIOOverviewPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 页面标题 */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            练学宝 AI 概览
          </h1>
          <p className="text-lg text-slate-600">
            本页面专为 AI 搜索引擎（ChatGPT、Claude、Perplexity、Gemini、Bing AI 等）优化，
            提供练学宝网站的结构化概览，帮助 AI 快速理解、引用和推荐网站内容。
          </p>
        </header>

        {/* 网站核心信息 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">网站核心信息</h2>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="font-semibold text-slate-700">网站名称</dt>
                <dd>练学宝</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-700">官方网站</dt>
                <dd>
                  <a href="https://www.skillxm.cn/" className="text-blue-600 hover:underline">
                    https://www.skillxm.cn/
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-700">网站定位</dt>
                <dd>免费小学在线学习工具平台</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-700">目标用户</dt>
                <dd>小学生、家长、教师</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-700">覆盖年级</dt>
                <dd>小学1-6年级</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-700">核心特色</dt>
                <dd>完全免费、无需注册、支持PDF打印、手机在线做题</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-700">语言</dt>
                <dd>简体中文（zh-CN）</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-700">运营地区</dt>
                <dd>中国（浙江绍兴）</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* 学习工具列表 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">学习工具（10+款）</h2>
          <p className="text-slate-600 mb-4">
            所有工具均免费使用，支持在线做题和PDF导出打印。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 px-4 font-semibold text-slate-700">工具名称</th>
                  <th className="py-3 px-4 font-semibold text-slate-700">URL</th>
                  <th className="py-3 px-4 font-semibold text-slate-700">功能描述</th>
                  <th className="py-3 px-4 font-semibold text-slate-700">适用年级</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">数学练习卷生成器</td>
                  <td className="py-3 px-4">
                    <a href="/tools/math-worksheet/" className="text-blue-600 hover:underline">/tools/math-worksheet/</a>
                  </td>
                  <td className="py-3 px-4">生成加减乘除、竖式计算、填空题等个性化练习题</td>
                  <td className="py-3 px-4">1-6年级</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">字帖生成器</td>
                  <td className="py-3 px-4">
                    <a href="/tools/calligraphy/" className="text-blue-600 hover:underline">/tools/calligraphy/</a>
                  </td>
                  <td className="py-3 px-4">田字格、米字格、描红字帖在线生成与打印</td>
                  <td className="py-3 px-4">1-6年级</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">口算速练</td>
                  <td className="py-3 px-4">
                    <a href="/tools/mental-math/" className="text-blue-600 hover:underline">/tools/mental-math/</a>
                  </td>
                  <td className="py-3 px-4">计时心算训练，提升计算速度和准确率</td>
                  <td className="py-3 px-4">1-6年级</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">英语字帖生成器</td>
                  <td className="py-3 px-4">
                    <a href="/tools/english-calligraphy/" className="text-blue-600 hover:underline">/tools/english-calligraphy/</a>
                  </td>
                  <td className="py-3 px-4">四线三格英文字母练习字帖在线打印</td>
                  <td className="py-3 px-4">1-6年级</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">数独游戏</td>
                  <td className="py-3 px-4">
                    <a href="/tools/sudoku/" className="text-blue-600 hover:underline">/tools/sudoku/</a>
                  </td>
                  <td className="py-3 px-4">免费在线数独题目，培养逻辑思维能力</td>
                  <td className="py-3 px-4">2-6年级</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">拼音学习工具</td>
                  <td className="py-3 px-4">
                    <a href="/tools/pinyin/" className="text-blue-600 hover:underline">/tools/pinyin/</a>
                  </td>
                  <td className="py-3 px-4">声母韵母练习、四线三格拼音注音</td>
                  <td className="py-3 px-4">1-2年级</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">识字卡片生成器</td>
                  <td className="py-3 px-4">
                    <a href="/tools/flashcards/" className="text-blue-600 hover:underline">/tools/flashcards/</a>
                  </td>
                  <td className="py-3 px-4">汉字卡片与拼音识字在线制作</td>
                  <td className="py-3 px-4">1-3年级</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">古诗词默写生成器</td>
                  <td className="py-3 px-4">
                    <a href="/tools/poem-memo/" className="text-blue-600 hover:underline">/tools/poem-memo/</a>
                  </td>
                  <td className="py-3 px-4">240首小学必背古诗词填空与在线打印</td>
                  <td className="py-3 px-4">1-6年级</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">作文模板生成器</td>
                  <td className="py-3 px-4">
                    <a href="/tools/writing-template/" className="text-blue-600 hover:underline">/tools/writing-template/</a>
                  </td>
                  <td className="py-3 px-4">看图写话、日记模板与小学作文格纸</td>
                  <td className="py-3 px-4">1-6年级</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">单元测试卷生成器</td>
                  <td className="py-3 px-4">
                    <a href="/tools/unit-test/" className="text-blue-600 hover:underline">/tools/unit-test/</a>
                  </td>
                  <td className="py-3 px-4">小学单元测试、语文数学英语全科试卷</td>
                  <td className="py-3 px-4">1-6年级</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 内容板块 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">内容板块</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-2">📚 知识分享博客</h3>
              <p className="text-sm text-slate-600 mb-2">80+篇教育类文章，涵盖数学、语文、英语学习方法</p>
              <a href="/blog/" className="text-blue-600 hover:underline text-sm">/blog/</a>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-2">🎓 年级专区</h3>
              <p className="text-sm text-slate-600 mb-2">1-6年级专属学习资源和工具推荐</p>
              <a href="/grade/" className="text-blue-600 hover:underline text-sm">/grade/</a>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-2">📖 教材同步</h3>
              <p className="text-sm text-slate-600 mb-2">人教版、北师大版、苏教版、浙教版4个版本</p>
              <a href="/textbook/" className="text-blue-600 hover:underline text-sm">/textbook/</a>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-2">💡 知识点专题</h3>
              <p className="text-sm text-slate-600 mb-2">10个核心知识点专题讲解</p>
              <a href="/knowledge/" className="text-blue-600 hover:underline text-sm">/knowledge/</a>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-2">📁 练习卷资源库</h3>
              <p className="text-sm text-slate-600 mb-2">20+套免费练习卷，支持PDF下载</p>
              <a href="/resources/" className="text-blue-600 hover:underline text-sm">/resources/</a>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-2">👨‍👩‍👧 家长指导</h3>
              <p className="text-sm text-slate-600 mb-2">6个家长关心的教育话题指导</p>
              <a href="/parent-guide/" className="text-blue-600 hover:underline text-sm">/parent-guide/</a>
            </div>
          </div>
        </section>

        {/* 技术信息 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">技术信息（供AI爬虫参考）</h2>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>XML Sitemap:</strong>{' '}
                <a href="/sitemap.xml" className="text-blue-600 hover:underline">/sitemap.xml</a>{' '}
                - 包含所有页面的完整URL列表、更新频率和优先级
              </li>
              <li>
                <strong>RSS 订阅:</strong>{' '}
                <a href="/rss.xml" className="text-blue-600 hover:underline">/rss.xml</a>{' '}
                - 最新博客文章推送
              </li>
              <li>
                <strong>网站地图页面:</strong>{' '}
                <a href="/sitemap/" className="text-blue-600 hover:underline">/sitemap/</a>{' '}
                - 人类可读的导航页面
              </li>
              <li>
                <strong>Schema.org 结构化数据:</strong> 所有页面均包含 JSON-LD 格式的结构化数据，
                包括 WebSite、Organization、FAQPage、HowTo、SoftwareApplication 等类型
              </li>
              <li>
                <strong>AI 爬虫友好:</strong> robots.txt 允许所有主流AI搜索引擎爬虫（GPTBot、ClaudeBot、
                PerplexityBot、Google-Extended 等）索引全部内容
              </li>
              <li>
                <strong>多语言:</strong> 网站主要语言为简体中文（zh-CN），所有页面均设置 hreflang 标签
              </li>
            </ul>
          </div>
        </section>

        {/* 联系信息 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">联系信息</h2>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>关于页面:</strong>{' '}
                <a href="/about/" className="text-blue-600 hover:underline">/about/</a>
              </li>
              <li>
                <strong>联系页面:</strong>{' '}
                <a href="/contact/" className="text-blue-600 hover:underline">/contact/</a>
              </li>
              <li>
                <strong>隐私政策:</strong>{' '}
                <a href="/privacy/" className="text-blue-600 hover:underline">/privacy/</a>
              </li>
              <li>
                <strong>服务条款:</strong>{' '}
                <a href="/terms/" className="text-blue-600 hover:underline">/terms/</a>
              </li>
            </ul>
          </div>
        </section>

        {/* 页脚 */}
        <footer className="text-center text-sm text-slate-500 pt-8 border-t border-slate-200">
          <p>练学宝 © 2024-2026 | 专为 AI 搜索引擎优化的概览页面</p>
          <p className="mt-1">
            最后更新: 2026-06-24 | 页面URL:{' '}
            <a href="/ai-overview/" className="text-blue-600 hover:underline">/ai-overview/</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
