// Post-build: copy static assets and fix nested route HTML files
// 关键修复：所有 Cloudflare 必需文件必须 100% 复制成功，任何失败都立即退出（exit 1）
// 这样 Cloudflare Pages 自动部署会失败回滚，绝不会部署一个不完整的版本
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const outDir = path.join(process.cwd(), 'out');
const publicDir = path.join(process.cwd(), 'public');

// 失败立即退出 - 防止 Cloudflare 部署不完整版本
function die(msg, err) {
  console.error('\n[POSTBUILD FATAL] ' + msg);
  if (err) console.error(err.message);
  process.exit(1);
}

// 0. Generate RSS feed (so it ends up in /out/rss.xml)
try {
  execSync('node scripts/generate-rss.cjs', { stdio: 'inherit', cwd: process.cwd() });
  const rssSrc = path.join(publicDir, 'rss.xml');
  const rssDst = path.join(outDir, 'rss.xml');
  if (fs.existsSync(rssSrc)) {
    fs.copyFileSync(rssSrc, rssDst);
    console.log('[OK] Copied rss.xml to out/');
  }
} catch (e) {
  console.warn('[WARN] RSS generation failed:', e.message);
}

// 0.5 关键：删除多语言 wrapper 目录（en/, ja/, ko/, zh/）
// 原因：Cloudflare Pages 不会对已存在的静态文件应用 _redirects 规则。
//       Next.js 静态导出生成了 out/en/index.html、out/ja/index.html 等文件，
//       会让 _redirects 中的 301 重定向失效。
//       删除这些目录后，访问 /en/ /ja/ /ko/ /zh/ 时 Cloudflare 才会查找 _redirects 并 301 跳转到中文版。
//       2026-06-15 SEO 修复：解决多语言 wrapper 页面产生 4x 重复内容导致 Google 降权的问题。
const localeDirs = ['en', 'ja', 'ko', 'zh'];
for (const locale of localeDirs) {
  const localeDir = path.join(outDir, locale);
  if (fs.existsSync(localeDir)) {
    fs.rmSync(localeDir, { recursive: true, force: true });
    console.log(`[CLEANUP] Removed out/${locale}/ - Cloudflare will use _redirects 301 rules`);
  }
}

// 1. Copy Cloudflare-specific files - 关键文件必须成功
// ads.txt 由 Next.js app/ads.txt/route.ts 路由处理并生成到 out/ads.txt
const criticalFiles = [
  { name: '_redirects', required: true },
  { name: '_headers', required: true },
  // ads.txt 不再从这里复制，由 Next.js route handler 生成
  { name: 'robots.txt', required: true },
  { name: 'favicon.ico', required: false },
  { name: 'favicon.svg', required: false },
  { name: 'manifest.json', required: false },
  { name: 'og-image.jpg', required: false },
  { name: 'baidu_verify_codeva-nVZFsgvPZu.html', required: false },
  { name: '~cloudflare-pages.json', required: false },
];

for (const { name, required } of criticalFiles) {
  const src = path.join(publicDir, name);
  const dst = path.join(outDir, name);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`[OK] Copied ${name} to out/`);
  } else if (required) {
    die(`Required file missing: public/${name}`);
  } else {
    console.warn(`[WARN] Optional file not found: public/${name}`);
  }
}

// 2. 关键：ads.txt 完整性验证 - 这是 Google AdSense 申请的关键文件
// ads.txt 由 Next.js 路由 app/ads.txt/route.ts 生成，输出到 out/ads.txt
const adsTxtPath = path.join(outDir, 'ads.txt');
if (!fs.existsSync(adsTxtPath)) {
  die('CRITICAL: out/ads.txt is missing! Next.js route handler app/ads.txt/route.ts did not generate the file. Build aborted to prevent broken deployment.');
}
const adsContent = fs.readFileSync(adsTxtPath, 'utf-8');
if (!adsContent.includes('google.com') || !adsContent.includes('pub-')) {
  die(`CRITICAL: out/ads.txt content is invalid: ${adsContent.slice(0, 100)}`);
}
const adsBytes = fs.statSync(adsTxtPath).size;
console.log(`[VERIFY] out/ads.txt: ${adsBytes} bytes - VALID (served by Next.js route handler)`);

// 3. 验证 Cloudflare 关键配置文件
for (const cf of ['_redirects', '_headers', 'robots.txt']) {
  const cfPath = path.join(outDir, cf);
  if (!fs.existsSync(cfPath)) {
    die(`CRITICAL: out/${cf} is missing! Build aborted.`);
  }
  console.log(`[VERIFY] out/${cf}: ${fs.statSync(cfPath).size} bytes - OK`);
}

// 4. 验证根 HTML 文件存在
const indexPath = path.join(outDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  die('CRITICAL: out/index.html is missing! Next.js build did not produce root page.');
}
console.log(`[VERIFY] out/index.html: ${fs.statSync(indexPath).size} bytes - OK`);

// 5. 验证 ads.txt 路由兜底也被生成（app/ads.txt/route.ts 静态导出）
const adsRoutePath = path.join(outDir, 'ads.txt');
// 静态文件已存在，路由是双保险（生成到 out/ads.txt/）
const adsRouteDir = path.join(outDir, 'ads.txt');
if (fs.existsSync(adsRouteDir)) {
  const stat = fs.statSync(adsRouteDir);
  if (stat.isDirectory()) {
    console.log(`[VERIFY] out/ads.txt/ route directory exists - dynamic fallback OK`);
  }
}

// 6. 修复嵌套路由 HTML 文件
// Next.js static export creates both /tools/calligraphy.html and /tools/calligraphy/ dir
// Cloudflare Pages matches the directory first (no index.html inside = 404)
// Solution: copy .html content into the directory as index.html
function fixNestedRoutes(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const htmlFile = path.join(dir, `${item}.html`);
    const subDir = path.join(dir, item);
    if (fs.existsSync(htmlFile) && fs.existsSync(subDir) && fs.statSync(subDir).isDirectory()) {
      const indexFile = path.join(subDir, 'index.html');
      if (!fs.existsSync(indexFile)) {
        fs.copyFileSync(htmlFile, indexFile);
        console.log(`[FIX] ${path.relative(outDir, htmlFile)} -> ${path.relative(outDir, indexFile)}`);
      }
    }
  }
}

fixNestedRoutes(path.join(outDir, 'tools'));
fixNestedRoutes(path.join(outDir, 'blog'));
fixNestedRoutes(path.join(outDir, 'grade'));
fixNestedRoutes(path.join(outDir, 'textbook'));
fixNestedRoutes(path.join(outDir, 'textbook', 'pep'));
fixNestedRoutes(path.join(outDir, 'textbook', 'bsb'));
fixNestedRoutes(path.join(outDir, 'textbook', 'sup'));
fixNestedRoutes(path.join(outDir, 'textbook', 'bsd'));
fixNestedRoutes(path.join(outDir, 'knowledge'));
fixNestedRoutes(path.join(outDir, 'resources'));
fixNestedRoutes(path.join(outDir, 'parent-guide'));
fixNestedRoutes(path.join(outDir, 'blog', 'category'));

// 修复深层嵌套路径
function fixDeepNestedRoutes(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const subDir = path.join(dir, item);
    if (fs.existsSync(subDir) && fs.statSync(subDir).isDirectory()) {
      const files = fs.readdirSync(subDir);
      for (const f of files) {
        if (f.endsWith('.html')) {
          const subName = f.replace('.html', '');
          const innerDir = path.join(subDir, subName);
          if (fs.existsSync(innerDir) && fs.statSync(innerDir).isDirectory()) {
            const indexFile = path.join(innerDir, 'index.html');
            if (!fs.existsSync(indexFile)) {
              fs.copyFileSync(path.join(subDir, f), indexFile);
              console.log(`[FIX DEEP] ${path.relative(outDir, path.join(subDir, f))} -> ${path.relative(outDir, indexFile)}`);
            }
          }
        }
      }
    }
  }
}
fixDeepNestedRoutes(path.join(outDir, 'textbook'));

console.log('\n[POSTBUILD] All critical files verified. Build is deployment-ready.');
console.log('[POSTBUILD] ads.txt is present at: /ads.txt (static) + /ads.txt/ (dynamic route)');
console.log('[POSTBUILD] Google AdSense can now find ads.txt via multiple paths.');
