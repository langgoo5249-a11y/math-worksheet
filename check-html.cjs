// Check the actual HTML structure of the built page
const fs = require('fs');
const html = fs.readFileSync('/workspace/out/tools/calligraphy/index.html', 'utf-8');

// Find the body content
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
if (!bodyMatch) {
  console.log('No body found');
  process.exit(1);
}

const body = bodyMatch[1];

// Find all top-level elements in body
// Look for the structure after <body>
const elements = [];
let pos = 0;
const tagRegex = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)[^>]*(\/?)>/g;
let match;
let depth = 0;

// Find key markers
const markers = [
  { name: 'body start', regex: /<body[^>]*>/ },
  { name: 'hidden div', regex: /<div hidden>/ },
  { name: 'noscript', regex: /<noscript>/ },
  { name: 'cookie consent', regex: /class="fixed bottom-0/ },
  { name: 'sr-only div', regex: /class="sr-only"/ },
  { name: 'h1', regex: /<h1[^>]*>/ },
  { name: 'nav', regex: /<nav[^>]*>/ },
  { name: 'ToolNavBar', regex: /ToolNavBar|navbar|nav-bar/i },
  { name: 'miniapp-float', regex: /id="miniapp-float"/ },
  { name: 'runtime script _R_', regex: /id="_R_"/ },
  { name: '__next_f push [0]', regex: /__next_f=self\.__next_f/ },
  { name: '__next_f push [1]', regex: /__next_f\.push\(\[1/ },
];

for (const m of markers) {
  const found = m.regex.exec(body);
  if (found) {
    console.log(`${m.name}: found at position ${found.index}`);
  } else {
    console.log(`${m.name}: NOT FOUND`);
  }
}

// Check for CalligraphyPage content markers
const pageMarkers = [
  '免费字帖生成器',
  '田字格/米字格',
  '模板类型',
  '输入练习文字',
  '选择字体',
  '格子大小',
  '练习行数',
  '下载 PDF',
  '直接打印',
];

console.log('\n=== Page content markers ===');
for (const marker of pageMarkers) {
  const found = body.includes(marker);
  console.log(`${marker}: ${found ? 'FOUND' : 'NOT FOUND'}`);
}

// Check what's between sr-only div and miniapp-float
const srOnlyPos = body.indexOf('class="sr-only"');
const miniappPos = body.indexOf('id="miniapp-float"');
if (srOnlyPos > 0 && miniappPos > 0) {
  const between = body.substring(srOnlyPos, miniappPos);
  console.log(`\n=== Between sr-only and miniapp-float (${between.length} chars) ===`);
  console.log(between.substring(0, 500));
  console.log('...');
  console.log(between.substring(between.length - 500));
}

// Check total body size
console.log(`\nBody total length: ${body.length}`);
