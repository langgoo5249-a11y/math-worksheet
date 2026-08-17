/**
 * 为工具页面生成 Open Graph 图片
 * 运行方式: node scripts/generate-og-images.cjs
 */

const fs = require('fs');
const path = require('path');

// 工具列表
const tools = [
  { id: 'mental-math', name: '口算速练', color: '#3B82F6' },
  { id: 'math-worksheet', name: '数学练习卷', color: '#10B981' },
  { id: 'calligraphy', name: '字帖生成器', color: '#8B5CF6' },
  { id: 'sudoku', name: '数独游戏', color: '#F59E0B' },
  { id: 'flashcards', name: '识字卡片', color: '#EC4899' },
  { id: 'writing-template', name: '作文模板', color: '#06B6D4' },
  { id: 'poem-memo', name: '古诗词默写', color: '#84CC16' },
  { id: 'unit-test', name: '单元测试卷', color: '#F97316' },
  { id: 'english-calligraphy', name: '英语字帖', color: '#14B8A6' },
  { id: 'pinyin', name: '拼音学习', color: '#A855F7' },
];

// 生成 SVG 内容（因为无法直接使用图像库）
function generateSVG(tool) {
  return `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="600" y="280" font-family="system-ui, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">${tool.name}</text>
  <text x="600" y="360" font-family="system-ui, sans-serif" font-size="36" fill="#94a3b8" text-anchor="middle">练学宝 - 免费小学教学工具</text>
  <text x="600" y="440" font-family="system-ui, sans-serif" font-size="24" fill="#64748b" text-anchor="middle">https://www.skillxm.cn/tools/${tool.id}/</text>
</svg>
`.trim();
}

// 创建输出目录
const outputDir = 'public/og-tools';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 为每个工具生成 SVG
tools.forEach(tool => {
  const svg = generateSVG(tool);
  const filename = path.join(outputDir, `${tool.id}.svg`);
  fs.writeFileSync(filename, svg, 'utf8');
  console.log(`✓ 生成 ${tool.name}: ${filename}`);
});

console.log('\n完成！请手动将 SVG 转换为 JPG 格式用于 Open Graph 图片。');