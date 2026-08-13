// 生成 RSS XML 静态文件
// 运行：node scripts/generate-rss.cjs
const fs = require('fs');
const path = require('path');

// 加载博客数据
const dataFile = path.join(__dirname, '..', 'app', 'blog', 'data.ts');
let articles = [];
try {
  const content = fs.readFileSync(dataFile, 'utf-8');
  // 健壮解析：按 id 字段切块，再在块内按行提取 title/description/date，
  // 不依赖字段顺序（文章对象可能含 image/summary/dateModified 等字段，位置不定）
  const idRe = /id:\s*['"]([^'"]+)['"]/g;
  const marks = [];
  let m;
  while ((m = idRe.exec(content)) !== null) {
    marks.push({ slug: m[1], start: m.index });
  }
  for (let i = 0; i < marks.length; i++) {
    const start = marks[i].start;
    const end = i + 1 < marks.length ? marks[i + 1].start : content.length;
    const block = content.slice(start, end);
    const get = (key) => {
      const re = new RegExp('^[ \\t]*' + key + ':[ \\t]*[\'"]([^\'"]*)[\'"]', 'm');
      const mm = block.match(re);
      return mm ? mm[1] : '';
    };
    const title = get('title');
    const description = get('description');
    const date = get('date');
    if (title && description && date) {
      articles.push({ id: marks[i].slug, title, description, date });
    } else {
      console.warn(`跳过文章（字段缺失）: ${marks[i].slug}`);
    }
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
console.log(`Generated ${outPath} with ${recent.length} articles (out of ${articles.length} total)`);
