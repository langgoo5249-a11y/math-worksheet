// 生成 RSS XML 静态文件
// 运行：node scripts/generate-rss.cjs
const fs = require('fs');
const path = require('path');

// 加载博客数据
const dataFile = path.join(__dirname, '..', 'app', 'blog', 'data.ts');
let articles = [];
try {
  // 简单的解析：提取 id, title, description, date
  const content = fs.readFileSync(dataFile, 'utf-8');
  const articleRegex = /\{\s*id:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*description:\s*['"]([^'"]+)['"],\s*date:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = articleRegex.exec(content)) !== null) {
    articles.push({ id: m[1], title: m[2], description: m[3], date: m[4] });
  }
} catch (e) {
  console.error('Failed to read blog data:', e.message);
  process.exit(1);
}

const BASE_URL = 'https://www.skillxm.cn';
const SITE_TITLE = '练学宝 - 小学数学语文英语学习工具与练习资源';
const SITE_DESC = '练学宝为小学1-6年级学生提供数学口算、字帖练习、单元测试、拼音注音等免费学习工具，以及丰富的练习卷资源和家长指导。';

// 按日期倒序
articles.sort((a, b) => b.date.localeCompare(a.date));
const recent = articles;

const escapeXml = (str) => str
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const buildDate = new Date().toUTCString();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>${escapeXml(SITE_TITLE)}</title>
  <link>${BASE_URL}/blog/</link>
  <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  <description>${escapeXml(SITE_DESC)}</description>
  <language>zh-CN</language>
  <lastBuildDate>${buildDate}</lastBuildDate>
  <generator>练学宝 RSS Generator</generator>
  <image>
    <url>${BASE_URL}/favicon.svg</url>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE_URL}/</link>
  </image>
${recent.map(a => `  <item>
    <title>${escapeXml(a.title)}</title>
    <link>${BASE_URL}/blog/${a.id}/</link>
    <guid isPermaLink="true">${BASE_URL}/blog/${a.id}/</guid>
    <description>${escapeXml(a.description)}</description>
    <pubDate>${new Date(a.date + 'T08:00:00Z').toUTCString()}</pubDate>
    <category>知识分享</category>
  </item>`).join('\n')}
</channel>
</rss>`;

const outPath = path.join(__dirname, '..', 'public', 'rss.xml');
fs.writeFileSync(outPath, xml, 'utf-8');
console.log(`✅ Generated ${outPath} with ${recent.length} articles (out of ${articles.length} total)`);
