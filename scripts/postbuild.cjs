// Post-build: copy static assets and fix nested route HTML files
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const outDir = path.join(process.cwd(), 'out');
const publicDir = path.join(process.cwd(), 'public');

// 0. Generate RSS feed (so it ends up in /out/rss.xml)
try {
  execSync('node scripts/generate-rss.cjs', { stdio: 'inherit', cwd: process.cwd() });
  const rssSrc = path.join(publicDir, 'rss.xml');
  const rssDst = path.join(outDir, 'rss.xml');
  if (fs.existsSync(rssSrc)) {
    fs.copyFileSync(rssSrc, rssDst);
    console.log('Copied rss.xml to out/');
  }
} catch (e) {
  console.warn('RSS generation failed:', e.message);
}

// 1. Copy Cloudflare-specific files
const files = ['_redirects', '_headers', '_routes.json', 'robots.txt', 'ads.txt'];
for (const file of files) {
  const src = path.join(publicDir, file);
  const dst = path.join(outDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`Copied ${file} to out/`);
  }
}

// 2. Fix nested route HTML files
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
        console.log(`Fixed: ${path.relative(outDir, htmlFile)} -> ${path.relative(outDir, indexFile)}`);
      }
    }
  }
}

fixNestedRoutes(path.join(outDir, 'tools'));
fixNestedRoutes(path.join(outDir, 'blog'));
fixNestedRoutes(path.join(outDir, 'grade'));
fixNestedRoutes(path.join(outDir, 'textbook'));
// textbook has nested [version]/[grade] - need deeper fix
fixDeepNestedRoutes(path.join(outDir, 'textbook'));
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
      // 检查子目录下是否有 .html 文件
      const files = fs.readdirSync(subDir);
      for (const f of files) {
        if (f.endsWith('.html')) {
          const subName = f.replace('.html', '');
          const innerDir = path.join(subDir, subName);
          if (fs.existsSync(innerDir) && fs.statSync(innerDir).isDirectory()) {
            const indexFile = path.join(innerDir, 'index.html');
            if (!fs.existsSync(indexFile)) {
              fs.copyFileSync(path.join(subDir, f), indexFile);
              console.log(`Fixed deep: ${path.relative(outDir, path.join(subDir, f))} -> ${path.relative(outDir, indexFile)}`);
            }
          }
        }
      }
    }
  }
}
