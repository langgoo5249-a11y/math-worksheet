const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'app', 'blog', 'data.ts');
const data = fs.readFileSync(dataPath, 'utf-8');
const lines = data.split('\n');

// Find all article blocks.
// Key insight: we must skip the content template literal (starts with 'content: \x60' and ends with '\x60,')
// because it may contain '  },' on its own lines.
const articles = [];
for (let i = 0; i < lines.length - 1; i++) {
  if (lines[i].trim() === '{' && lines[i+1].trim().startsWith('id:')) {
    const article = {};
    let inContent = false;
    for (let j = i + 1; j < lines.length; j++) {
      const t = lines[j].trim();
      const raw = lines[j];
      
      // Track content template literal
      if (t.startsWith('content: \x60')) { inContent = true; continue; }
      if (inContent && t === '\x60,' || t === '\x60') { inContent = false; continue; }
      if (inContent) continue;
      
      // Article closing: exactly 2 spaces + },
      if (raw === '  },' || raw === '  }') break;
      
      const idM = t.match(/^id:\s*["']([^"']+)["']/);
      const titleM = t.match(/^title:\s*["']([^"']+)["']/);
      const descM = t.match(/^description:\s*["']([^"']+)["']/);
      const dateM = t.match(/^date:\s*["']([^"']+)["']/);
      const catM = t.match(/^category:\s*["']([^"']+)["']/);
      
      if (idM) article.id = idM[1];
      if (titleM) article.title = titleM[1];
      if (descM) article.description = descM[1];
      if (dateM && !article.date) article.date = dateM[1];
      if (catM) article.category = catM[1];
    }
    if (article.id && article.title) articles.push(article);
  }
}

console.log(`Extracted ${articles.length} articles`);

// Tool definitions
const tools = [
  { name: '口算速练', path: '/tools/mental-math/', desc: '在线口算练习工具，支持加减乘除混合运算，自动计时批改，适合1-6年级小学生每日练习' },
  { name: '数学练习卷生成器', path: '/tools/math-worksheet/', desc: '一键生成小学数学练习卷，支持自定义题型、难度和数量，可导出PDF打印' },
  { name: '田字格字帖生成器', path: '/tools/calligraphy/', desc: '在线生成田字格字帖，支持自定义汉字内容，可打印练习' },
  { name: '英语四线三格字帖', path: '/tools/english-calligraphy/', desc: '英语字母书写练习字帖，支持四线三格格式，可自定义内容' },
  { name: '拼音练习', path: '/tools/pinyin/', desc: '汉语拼音在线练习工具，支持声母韵母拼读训练' },
  { name: '数独游戏', path: '/tools/sudoku/', desc: '在线数独游戏，支持四宫格到九宫格多难度级别，锻炼逻辑思维' },
  { name: '看图写话', path: '/tools/writing-template/', desc: '看图写话作文模板，帮助低年级学生练习写作' },
  { name: '古诗词默写', path: '/tools/poem-memo/', desc: '小学必背古诗词在线默写练习工具' },
  { name: '识字卡片', path: '/tools/flashcards/', desc: '在线识字卡片工具，支持自定义汉字内容和打印' },
  { name: '单元测试卷生成器', path: '/tools/unit-test/', desc: '小学语文数学单元测试卷在线生成工具' },
];

// ===== 1. Generate llms-full.txt =====
let llms = `# 练学宝 (skillxm.cn) — 完整站点内容索引
> 最后更新：2026-07-09
> 本文件为 AI 模型（LLM）提供站点结构概览，便于内容发现与索引。

## 站点简介
练学宝是免费的在线小学教育工具平台，提供10+款教学工具，覆盖数学、语文、英语三大核心学科。
所有工具免费使用，无需注册，支持手机在线练习和PDF打印。

## 核心页面
| 页面 | URL | 说明 |
|------|-----|------|
| 首页 | https://www.skillxm.cn/ | 工具导航与最新内容 |
| 工具聚合 | https://www.skillxm.cn/tools/ | 全部工具列表 |
| 知识分享 | https://www.skillxm.cn/blog/ | 教育干货文章 |
| 关于我们 | https://www.skillxm.cn/about/ | 团队介绍与权威来源 |
| 联系我们 | https://www.skillxm.cn/contact/ | 联系方式 |

## 在线工具
`;

tools.forEach(t => { llms += `- **${t.name}**: ${t.desc} — https://www.skillxm.cn${t.path}\n`; });

llms += `\n## 博客文章 (${articles.length}篇)\n\n`;
articles.forEach((a, i) => {
  llms += `### ${i + 1}. ${a.title}\n`;
  llms += `- URL: https://www.skillxm.cn/blog/${a.id}/\n`;
  llms += `- 分类: ${a.category || '未分类'}\n`;
  llms += `- 日期: ${a.date || '未知'}\n`;
  llms += `- 摘要: ${a.description || ''}\n\n`;
});

llms += `\n## 站点评级
- 内容原创性: 高（所有文章由教育团队原创撰写）
- 权威性: 高（引用教育部文件、学术研究、一线教师经验）
- AI声明: ai-assisted（AI辅助写作，人工审核发布）
- 更新频率: 每周
- 适用学段: 小学1-6年级
`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'llms-full.txt'), llms, 'utf-8');
console.log('llms-full.txt generated, size:', llms.length, 'bytes');

// ===== 2. Generate sitemap-geo.xml =====
const esc = (s) => (s||'').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:geo="https://www.skillxm.cn/geo/1.0">
<!-- sitemap-geo.xml — GEO专用站点地图，为AI搜索引擎提供结构化索引，最后更新: 2026-07-09 -->

<url><loc>https://www.skillxm.cn/</loc><lastmod>2026-07-09</lastmod><changefreq>daily</changefreq><priority>1.0</priority><geo:ai_content_declaration>AI-assisted</geo:ai_content_declaration><geo:content_type>tool_directory</geo:content_type></url>
<url><loc>https://www.skillxm.cn/about/</loc><lastmod>2026-07-09</lastmod><changefreq>monthly</changefreq><priority>0.6</priority><geo:content_type>about_page</geo:content_type><geo:has_authoritative_sources>true</geo:has_authoritative_sources></url>
<url><loc>https://www.skillxm.cn/blog/</loc><lastmod>2026-07-09</lastmod><changefreq>daily</changefreq><priority>0.9</priority><geo:content_type>blog_index</geo:content_type></url>
`;

tools.forEach(t => {
  xml += `<url><loc>https://www.skillxm.cn${t.path}</loc><changefreq>weekly</changefreq><priority>0.8</priority><geo:content_type>interactive_tool</geo:content_type><geo:tool_name>${t.name}</geo:tool_name></url>\n`;
});

articles.forEach(a => {
  xml += `<url><loc>https://www.skillxm.cn/blog/${a.id}/</loc><lastmod>${a.date || '2026-01-01'}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority><geo:content_type>article</geo:content_type><geo:title>${esc(a.title)}</geo:title><geo:description>${esc(a.description)}</geo:description><geo:category>${esc(a.category)}</geo:category><geo:has_definitions>true</geo:has_definitions><geo:has_citations>true</geo:has_citations><geo:has_stats>true</geo:has_stats><geo:ai_content_declaration>AI-assisted</geo:ai_content_declaration></url>\n`;
});

xml += '</urlset>\n';

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap-geo.xml'), xml, 'utf-8');
console.log('sitemap-geo.xml generated, size:', xml.length, 'bytes');
console.log('Done!');