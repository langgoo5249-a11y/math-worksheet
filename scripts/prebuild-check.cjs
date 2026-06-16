// 构建前验证：检测 output: 'export' 静态导出模式下的不兼容文件
// 
// 本项目使用 Next.js output: 'export' 静态导出，以下文件类型不被支持：
//   - route.ts / route.js / route.jsx（Route Handler）
//   - 任何依赖运行时 API（cookies, headers 等）的代码
//
// 添加 route.ts 文件会导致工具页面（'use client' 组件）RSC payload 生成异常，
// 所有工具页面的内容将无法渲染。此脚本在构建前拦截此类问题。
//
// 白名单：app/ads.txt/route.ts（Google AdSense 必需，已验证兼容）

const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(process.cwd(), 'app');

// 白名单 — 这些 route 文件已验证与 output: 'export' 兼容
const WHITELIST = [
  'app/ads.txt/route.ts',
];

function die(msg) {
  console.error('\n========================================');
  console.error('  BUILD BLOCKED: 静态导出兼容性错误');
  console.error('========================================');
  console.error(msg);
  console.error('\n原因：此项目使用 output: "export" 静态导出。');
  console.error('route.ts 文件是 Route Handler，不被静态导出支持。');
  console.error('添加 route.ts 会导致所有工具页面内容无法渲染。');
  console.error('（此问题已发生过 2 次，现已加入构建拦截）');
  console.error('\n解决方案：');
  console.error('  1. 如果不需要 route.ts，请删除它');
  console.error('  2. 如果需要服务端逻辑，请使用 Cloudflare Pages Functions');
  console.error('  3. 如果需要添加到白名单，请确认兼容性后修改此脚本');
  console.error('========================================\n');
  process.exit(1);
}

// 递归扫描 app/ 目录，查找所有 route.* 文件
function findRouteFiles(dir, basePath) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  
  const items = fs.readdirSync(dir);
  for (const item of items) {
    // 跳过 Next.js 内部目录和 node_modules
    if (item === 'node_modules' || item.startsWith('.')) continue;
    
    const fullPath = path.join(dir, item);
    const relativePath = path.relative(APP_DIR, fullPath);
    
    if (fs.statSync(fullPath).isDirectory()) {
      results.push(...findRouteFiles(fullPath, basePath));
    } else if (item.startsWith('route.') && (item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.js') || item.endsWith('.jsx'))) {
      results.push('app/' + relativePath);
    }
  }
  return results;
}

// 主检测逻辑
const routeFiles = findRouteFiles(APP_DIR);

if (routeFiles.length === 0) {
  console.log('[PREBUILD] No route.ts files found — static export compatibility check passed.');
  process.exit(0);
}

// 检查是否全部在白名单中
const unlisted = routeFiles.filter(f => !WHITELIST.includes(f));

if (unlisted.length > 0) {
  const list = unlisted.map(f => `  - ${f}`).join('\n');
  die(`发现不被允许的 route 文件：\n${list}\n`);
} else {
  console.log(`[PREBUILD] Found ${routeFiles.length} route file(s) in whitelist — check passed.`);
  process.exit(0);
}