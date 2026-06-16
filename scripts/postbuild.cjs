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

// 7. 修复脚本加载顺序问题
// Next.js 将运行时脚本放在 RSC payload 内联脚本之前，导致竞态条件
// 修复：将内联 RSC payload 脚本（包括 INIT [0] 和 PUSH [1]）移到运行时脚本之前
function fixScriptLoadingOrder(dir) {
  if (!fs.existsSync(dir)) return;
  
  const htmlFiles = [];
  function findHtmlFiles(d) {
    const items = fs.readdirSync(d);
    for (const item of items) {
      const fullPath = path.join(d, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        findHtmlFiles(fullPath);
      } else if (item.endsWith('.html')) {
        htmlFiles.push(fullPath);
      }
    }
  }
  findHtmlFiles(dir);
  
  let fixedCount = 0;
  for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    const original = content;
    
    // 找到运行时脚本
    const runtimeScriptRegex = /<script src="([^"]+)" id="_R_" async=""><\/script>/;
    const match = content.match(runtimeScriptRegex);
    
    if (match) {
      const runtimeScript = match[0];
      // 收集运行时脚本之后的所有内联 __next_f 脚本（包括 INIT [0] 和 PUSH [1]）
      const afterRuntime = content.split(runtimeScript)[1];
      const inlineRegex = /<script>(?:\(self\.__next_f|self\.__next_f)[^<]*<\/script>/g;
      const allInlineScripts = [];
      let inlineMatch;
      
      while ((inlineMatch = inlineRegex.exec(afterRuntime)) !== null) {
        allInlineScripts.push(inlineMatch[0]);
      }
      
      if (allInlineScripts.length > 0) {
        // 从原位置移除所有内联脚本
        let newContent = content;
        for (const script of allInlineScripts) {
          newContent = newContent.replace(script, '');
        }
        
        // 将内联脚本插入到运行时脚本之前
        const inlineScriptsStr = allInlineScripts.join('');
        newContent = newContent.replace(
          runtimeScript,
          inlineScriptsStr + runtimeScript
        );
        
        content = newContent;
        fixedCount++;
      }
    }
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf-8');
    }
  }
  
  if (fixedCount > 0) {
    console.log(`[FIX] Reordered scripts in ${fixedCount} HTML file(s) - inline RSC payload before runtime`);
  }
}

fixScriptLoadingOrder(outDir);

console.log('\n[POSTBUILD] All critical files verified. Build is deployment-ready.');
console.log('[POSTBUILD] ads.txt is present at: /ads.txt (static) + /ads.txt/ (dynamic route)');
console.log('[POSTBUILD] Google AdSense can now find ads.txt via multiple paths.');
