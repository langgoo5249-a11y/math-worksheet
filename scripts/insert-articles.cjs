const fs = require('fs');
const path = require('path');

const dataFile = path.join('/workspace', 'app', 'blog', 'data.ts');

// 读取文章1和文章2
const article1 = fs.readFileSync('/workspace/data/article1.json', 'utf-8');
const article2 = fs.readFileSync('/workspace/data/article2.json', 'utf-8');

// 读取现有数据
let content = fs.readFileSync(dataFile, 'utf-8');

// 找到最后一个 ]; 位置
const endMatch = content.match(/\n\];\s*$/);
if (!endMatch) {
  console.error('❌ 找不到 ]; 结束符');
  process.exit(1);
}

const endPos = content.length - endMatch[0].length;
const before = content.substring(0, endPos);
const after = content.substring(endPos);

// 解析两篇文章为对象
const a1 = JSON.parse(article1);
const a2 = JSON.parse(article2);

// 转成 TS 格式
function toTS(a) {
  return `  {
    id: "${a.id}",
    title: "${a.title}",
    description: "${a.description}",
    date: "${a.date}",
    category: "${a.category}",
    readTime: "${a.readTime}",
    keywords: [
${a.keywords.map(k => `      "${k}"`).join(',\n')}
    ],
    content: ${JSON.stringify(a.content)}
  }`;
}

const newArticles = toTS(a1) + ',\n' + toTS(a2);
const newContent = before + ',\n\n' + newArticles + '\n];\n';

fs.writeFileSync(dataFile, newContent, 'utf-8');
console.log('✅ 成功添加 2 篇文章');
console.log('  1.', a1.title);
console.log('  2.', a2.title);

// 统计
const finalContent = fs.readFileSync(dataFile, 'utf-8');
const count = (finalContent.match(/^  \{$/gm) || []).length;
console.log(`📚 当前共 ${count} 篇文章`);
