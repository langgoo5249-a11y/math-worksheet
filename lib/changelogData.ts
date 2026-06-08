// 练学宝更新日志数据
export interface ChangelogEntry {
  version: string;
  date: string;
  type: 'major' | 'feature' | 'improvement' | 'fix';
  title: string;
  highlights: string[];
  details?: { category: string; items: string[] }[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: 'v2.6.0',
    date: '2026-06-08',
    type: 'major',
    title: '大规模内容板块扩展 - 9个新板块上线',
    highlights: [
      '新增年级学习专区（6个年级详情页）',
      '新增教材同步练习专区（4版本×6年级=24页）',
      '新增知识点专题（10个详情页）',
      '新增免费练习卷资源库',
      '新增家长指导中心（6个主题）',
      '新增每日一练、HTML网站地图、RSS订阅、更新日志',
    ],
    details: [
      {
        category: '📚 内容板块',
        items: [
          '/grade/ - 1-6年级完整学习方案',
          '/textbook/ - 人教/北师/苏教/部编4版本同步练习',
          '/knowledge/ - 凑十法、乘法口诀、拼音等10个专题',
          '/resources/ - 20+套高质量练习卷',
          '/parent-guide/ - 幼小衔接、学习习惯、小升初指导',
          '/daily/ - 每日智能出题打卡',
        ],
      },
      {
        category: '🛠️ 功能优化',
        items: [
          '面包屑导航组件',
          '相关工具推荐组件',
          '社交分享按钮（微信/微博/QQ/Twitter/复制）',
          '板块统一布局（SectionLayout）',
          'XML sitemap 扩展至 200+ 页面',
        ],
      },
    ],
  },
  {
    version: 'v2.5.0',
    date: '2026-06-07',
    type: 'feature',
    title: '国际化与博客系统升级',
    highlights: [
      '完善四语言支持（中文/英语/日语/韩语）',
      '新增 hreflang 国际化标签',
      '博客文章增至 80+ 篇',
      '新增 2 篇原创高质量文章（3700+字）',
    ],
  },
  {
    version: 'v2.4.0',
    date: '2026-05-20',
    type: 'feature',
    title: 'PDF 导出与打印体验优化',
    highlights: [
      '数学练习卷 PDF 导出',
      '字帖生成器 PDF 导出',
      '打印友好的 CSS 优化',
      'A4 / Letter 双纸张支持',
    ],
  },
  {
    version: 'v2.3.0',
    date: '2026-05-10',
    type: 'improvement',
    title: '性能与 SEO 优化',
    highlights: [
      '首屏加载速度提升 40%',
      'JSON-LD 结构化数据完善',
      'Core Web Vitals 全面达标',
      'Open Graph 优化',
    ],
  },
  {
    version: 'v2.2.0',
    date: '2026-04-25',
    type: 'feature',
    title: '新增 4 款学习工具',
    highlights: [
      '数独游戏（多难度）',
      '英语字帖（四线三格）',
      '口算速练（在线计时）',
      '作文模板（多文体）',
    ],
  },
  {
    version: 'v2.1.0',
    date: '2026-04-15',
    type: 'feature',
    title: 'AdSense 接入与界面优化',
    highlights: [
      'Google AdSense 接入完成',
      '隐私政策与服务条款完善',
      'Cookie 同意提示',
      '多语言切换组件',
    ],
  },
  {
    version: 'v2.0.0',
    date: '2026-04-01',
    type: 'major',
    title: 'Next.js 15 重构上线',
    highlights: [
      '从 PHP/WordPress 迁移到 Next.js 15',
      'App Router 架构',
      '静态导出 + Cloudflare Pages 部署',
      '首屏加载 < 1s',
    ],
  },
  {
    version: 'v1.0.0',
    date: '2025-12-01',
    type: 'major',
    title: '练学宝正式上线',
    highlights: [
      '首批 6 款学习工具上线',
      '数学练习卷生成器',
      '字帖生成器',
      '拼音注音',
      '识字卡片',
      '古诗词默写',
      '单元测试卷',
    ],
  },
];
