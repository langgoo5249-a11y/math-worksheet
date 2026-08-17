const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'app', 'blog', 'data.ts');
let data = fs.readFileSync(dataPath, 'utf8');

const article1 = JSON.parse(fs.readFileSync(path.join(__dirname, 'article1.json'), 'utf8'));
const article2 = JSON.parse(fs.readFileSync(path.join(__dirname, 'article2.json'), 'utf8'));

function formatArticle(article) {
  const lines = [];
  lines.push('  {');
  lines.push(`    id: ${JSON.stringify(article.id)},`);
  lines.push(`    title: ${JSON.stringify(article.title)},`);
  lines.push(`    description: ${JSON.stringify(article.description)},`);
  lines.push(`    date: ${JSON.stringify(article.date)},`);
  lines.push(`    dateModified: ${JSON.stringify(article.dateModified)},`);
  lines.push(`    category: ${JSON.stringify(article.category)},`);
  lines.push(`    readTime: ${JSON.stringify(article.readTime)},`);
  if (article.keywords && article.keywords.length > 0) {
    lines.push(`    keywords: ${JSON.stringify(article.keywords)},`);
  }
  lines.push(`    content: \`${article.content.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\$/g, '\\$')}\`,`);
  if (article.citations && article.citations.length > 0) {
    lines.push(`    citations: ${JSON.stringify(article.citations)},`);
  }
  if (article.definitions && article.definitions.length > 0) {
    lines.push(`    definitions: ${JSON.stringify(article.definitions)},`);
  }
  if (article.stats && article.stats.length > 0) {
    lines.push(`    stats: ${JSON.stringify(article.stats)},`);
  }
  lines.push('  },');
  return lines.join('\n');
}

const insertContent = '\n' + formatArticle(article1) + '\n' + formatArticle(article2);

// Insert before the final ]; (handle trailing whitespace)
const marker = '];';
const trimEnd = data.trimEnd();
if (!trimEnd.endsWith(marker)) {
  console.error('Could not find the closing ]; of articles array');
  process.exit(1);
}

data = trimEnd.slice(0, -marker.length) + insertContent + '\n];';

fs.writeFileSync(dataPath, data, 'utf8');
console.log('Injected 2 articles into app/blog/data.ts');
