import type { Metadata } from 'next';
import SiteLayout from '../_components/SiteLayout';

export const metadata: Metadata = {
  title: '使用条款 - 练学�?,
  description: "练学宝使用条款：详细说明用户使用本站服务的相关规定。练学宝提供免费的在线小学教学工具，包括数学练习卷生成器、字帖生成器、口算速练等，所有工具免费使用，无需注册。用户需遵守相关法律法规，不得用于商业用途�?,
  alternates: {
    canonical: 'https://www.skillxm.cn/terms-of-service/',
  },
  openGraph: {
    url: 'https://www.skillxm.cn/terms-of-service/',
    title: '使用条款 - 练学�?,
    description: "练学宝使用条款：详细说明用户使用本站服务的相关规定。练学宝提供免费的在线小学教学工具，所有工具免费使用，无需注册�?,
    type: 'website',
    images: [{ url: 'https://www.skillxm.cn/og-image.jpg', width: 1200, height: 630, alt: '练学�? }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '使用条款 - 练学�?,
    description: "练学宝使用条款：详细说明用户使用本站服务的相关规定�?,
    images: ['https://www.skillxm.cn/og-image.jpg'],
  },
};

export default function TermsOfServicePage() {
  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">使用条款</h1>
          <p className="text-gray-400">最后更新日期：2026�?�?7�?/p>
          <p className="text-gray-500 text-sm mt-2">生效日期�?026�?�?7�?/p>
        </div>

        {/* 接受条款 */}
        <section className="mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">📋</span> 一、接受条�?            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              欢迎使用练学宝（以下简�?本站"�?我们"）。在使用本站服务之前，请您仔细阅读本使用条款。一旦您访问或使用本站，即表示您同意受本条款的约束�?            </p>
            <p className="text-gray-300 leading-relaxed">
              如果您不同意本条款的任何部分，请立即停止使用本站服务�?            </p>
          </div>
        </section>

        {/* 服务说明 */}
        <section className="mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">🛠�?/span> 二、服务说�?            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                练学宝是一个免费的在线小学教育工具平台，提供以下服务：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>数学练习卷生成器</strong>：一键生成小�?-6年级数学练习卷，支持加减乘除、竖式计算等多种题型</li>
                <li><strong>字帖生成�?/strong>：在线生成田字格、米字格字帖，支持楷体、宋体等多种字体</li>
                <li><strong>口算速练</strong>：在线计时口算练习工具，支持多难度级�?/li>
                <li><strong>英语字帖</strong>：生成标准四线三格英语练习纸</li>
                <li><strong>拼音注音</strong>：汉字拼音注音练习工�?/li>
                <li><strong>识字卡片</strong>：免费在线生成识字卡�?/li>
                <li><strong>古诗词默�?/strong>：收�?40首经典古诗词默写练习</li>
                <li><strong>数独游戏</strong>：在线数独游戏，支持多个难度等级</li>
                <li><strong>单元测试�?/strong>：免费在线生成小学单元测试卷</li>
                <li><strong>作文模板</strong>：提供看图写话、日记、书信等多种作文模板</li>
              </ul>
              <p className="mt-4">
                所有工具均在用户浏览器本地运行，不需要注册账号，不需要上传任何个人信息，完全免费使用�?              </p>
            </div>
          </div>
        </section>

        {/* 用户责任 */}
        <section className="mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">👤</span> 三、用户责�?            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>使用本站服务时，您同意遵守以下规定：</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>不得将本站服务用于任何商业目的，包括但不限于转售、出租、分发本站生成的内容用于盈利�?/li>
                <li>不得利用本站服务生成违反法律法规的内容�?/li>
                <li>不得对本站进行反向工程、反编译或试图提取源代码�?/li>
                <li>不得试图访问未授权的数据或系统�?/li>
                <li>不得传播恶意软件或病毒�?/li>
                <li>不得干扰或破坏网站的正常运行�?/li>
              </ol>
              <p className="mt-4">
                如果您违反上述任何规定，我们有权立即终止向您提供服务，并保留追究法律责任的权利�?              </p>
            </div>
          </div>
        </section>

        {/* 知识产权 */}
        <section className="mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">©�?/span> 四、知识产�?            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                本站的所有内容，包括但不限于文字、图片、图形�?logo、图标、程序代码、页面结构、版式设计等，均受中华人民共和国著作权法、商标法、专利法及其他相关法律法规和国际条约的保护�?              </p>
              <p>
                本站生成的练习卷、字帖等内容，用户可用于个人学习目的，但不得用于商业分发或转售�?              </p>
              <p>
                未经许可，不得复制、修改、传播本站的任何内容。违反上述声明者，我们将依法追究其法律责任�?              </p>
            </div>
          </div>
        </section>

        {/* 免责声明 */}
        <section className="mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">⚠️</span> 五、免责声�?            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                本站提供的工具和服务仅供参考，不构成任何专业建议。用户应自行判断和承担使用本站服务的风险�?              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>本站不对工具生成内容的准确性、完整性、及时性做任何明示或暗示的保证�?/li>
                <li>本站不对因使用本站服务而导致的任何直接或间接损失承担责任�?/li>
                <li>本站内容参考教育部课程标准，但不替代学校教学，请以学校老师的指导为准�?/li>
                <li>本站可能包含第三方链接，我们对第三方网站的内容和责任不承担义务�?/li>
              </ul>
              <p className="mt-4">
                您理解并同意，使用本站服务的风险由您自行承担。在法律允许的最大范围内，本站及其开发者不对任何间接、偶然、特殊、继发性或惩罚性损害承担责任�?              </p>
            </div>
          </div>
        </section>

        {/* 服务变更 */}
        <section className="mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">🔄</span> 六、服务变�?            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              我们保留随时修改或中断服务（或其任何部分）的权利，无需事先通知您。您有权在发现变更后停止使用本站服务�?            </p>
            <p className="text-gray-300 leading-relaxed">
              如果您继续在本条款变更后使用本站，即视为您接受变更后的条款。我们会在本页面更新"最后更新日�?以通知您条款的变更�?            </p>
          </div>
        </section>

        {/* 联系我们 */}
        <section>
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-4 sm:p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <span className="text-xl">📧</span> 联系我们
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              如果您对本使用条款有任何疑问，请通过以下方式联系我们�?            </p>
            <p className="text-gray-300">
              邮箱�?a href="mailto:lang@skillxm.cn" className="text-blue-400 hover:underline">lang@skillxm.cn</a>
            </p>
            <p className="text-gray-500 text-sm mt-4">
              我们会在收到您的邮件后尽快回复，通常不超�?个工作日�?            </p>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
