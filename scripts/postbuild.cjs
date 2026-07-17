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

// 0.5 关键：删除多语言 wrapper 目录（ja/, ko/, zh/）
// 原因：Cloudflare Pages 不会对已存在的静态文件应用 _redirects 规则。
//       Next.js 静态导出生成了 out/ja/index.html、out/ko/index.html 等文件，
//       会让 _redirects 中的 301 重定向失效。
//       删除这些目录后，访问 /ja/ /ko/ /zh/ 时 Cloudflare 才会查找 _redirects 并 301 跳转到中文版。
// 注意：/en/ 不再删除！2026-07-16 起 /en/ 有独立英文版内容（教外国人学中文）。
//       仅删除 ja/ko/zh 的 wrapper 目录。
const localeDirs = ['ja', 'ko', 'zh'];
for (const locale of localeDirs) {
  const localeDir = path.join(outDir, locale);
  if (fs.existsSync(localeDir)) {
    fs.rmSync(localeDir, { recursive: true, force: true });
    console.log(`[CLEANUP] Removed out/${locale}/ - Cloudflare will use _redirects 301 rules`);
  }
}

// 0.6 关键：清理 /en/ 目录中的 [locale] wrapper 重复页面
// 原因：Next.js [locale] 动态路由为 /en/ 生成了所有中文页面的英文翻译版（blog/、
//       tools/math-worksheet/、about/ 等），这些是 wrapper 生成的重复内容，
//       与我们的独立英文版（教外国人学中文）内容完全不同。
//       保留我们手写的 8 个英文页面，删除其余 wrapper 生成的页面。
// 方法：用白名单机制，只保留指定的文件和目录。
const EN_KEEP_DIRS = ['tools', 'blog'];  // /en/ 下保留的子目录
const EN_KEEP_TOOL_DIRS = [
  'pinyin-converter',
  'stroke-order',
  'hsk-flashcards',
  'tone-trainer',
  'reading-reader',
  'radical-explorer',
  'picture-learning',
  'pinyin-chart',
];

const EN_KEEP_BLOG_DIRS = [
  'how-to-start-learning-chinese-from-zero',
  'mastering-chinese-tones-scientific-approach',
  'hsk-guide-roadmap-to-chinese-fluency',
  'chinese-characters-demystifying-writing-system',
  'best-free-resources-learn-chinese-online',
  'category',
];

const enDir = path.join(outDir, 'en');
if (fs.existsSync(enDir)) {
  let removedCount = 0;

  // 1. 删除 /en/ 根目录下不需要的子目录（保留 tools/）
  const enRootEntries = fs.readdirSync(enDir, { withFileTypes: true });
  for (const entry of enRootEntries) {
    if (entry.isDirectory() && !EN_KEEP_DIRS.includes(entry.name)) {
      fs.rmSync(path.join(enDir, entry.name), { recursive: true, force: true });
      removedCount++;
      console.log(`[CLEANUP] Removed out/en/${entry.name}/ - duplicate wrapper content`);
    }
  }

  // 2. 清理 /en/tools/ 下不需要的工具页（保留我们的 8 个工具）
  const enToolsDir = path.join(enDir, 'tools');
  if (fs.existsSync(enToolsDir)) {
    const toolsEntries = fs.readdirSync(enToolsDir, { withFileTypes: true });
    for (const entry of toolsEntries) {
      if (entry.isDirectory() && !EN_KEEP_TOOL_DIRS.includes(entry.name)) {
        fs.rmSync(path.join(enToolsDir, entry.name), { recursive: true, force: true });
        removedCount++;
        console.log(`[CLEANUP] Removed out/en/tools/${entry.name}/ - duplicate wrapper tool`);
      }
    }
  }

  // 2.5 清理 /en/blog/ 下不需要的博客页（保留我们的 5 篇英文文章）
  const enBlogDir = path.join(enDir, 'blog');
  if (fs.existsSync(enBlogDir)) {
    const blogEntries = fs.readdirSync(enBlogDir, { withFileTypes: true });
    for (const entry of blogEntries) {
      if (entry.isDirectory() && !EN_KEEP_BLOG_DIRS.includes(entry.name)) {
        fs.rmSync(path.join(enBlogDir, entry.name), { recursive: true, force: true });
        removedCount++;
        console.log(`[CLEANUP] Removed out/en/blog/${entry.name}/ - duplicate wrapper blog`);
      }
    }
  }

  // 3. 验证保留的页面
  const expectedPages = [
    'en/index.html',
    'en/tools/index.html',
    'en/tools/pinyin-converter/index.html',
    'en/tools/stroke-order/index.html',
    'en/tools/hsk-flashcards/index.html',
    'en/tools/tone-trainer/index.html',
    'en/tools/reading-reader/index.html',
    'en/tools/radical-explorer/index.html',
    'en/tools/picture-learning/index.html',
    'en/tools/pinyin-chart/index.html',
    'en/blog/index.html',
    'en/blog/how-to-start-learning-chinese-from-zero/index.html',
    'en/blog/mastering-chinese-tones-scientific-approach/index.html',
    'en/blog/hsk-guide-roadmap-to-chinese-fluency/index.html',
    'en/blog/chinese-characters-demystifying-writing-system/index.html',
    'en/blog/best-free-resources-learn-chinese-online/index.html',
  ];
  let keptCount = 0;
  for (const p of expectedPages) {
    if (fs.existsSync(path.join(outDir, p))) keptCount++;
  }
  console.log(`[CLEANUP] Removed ${removedCount} duplicate /en/ wrapper pages`);
  console.log(`[OK] out/en/ cleaned - ${keptCount}/${expectedPages.length} English pages preserved`);
} else {
  console.warn('[WARN] out/en/ not found - English pages may not have been generated');
}

// 1. Copy Cloudflare-specific files - 关键文件必须成功
const criticalFiles = [
  { name: '_redirects', required: true },
  { name: '_headers', required: true },
  { name: 'robots.txt', required: true },
  { name: 'llms.txt', required: true },
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

// 2. 验证 Cloudflare 关键配置文件
for (const cf of ['_redirects', '_headers', 'robots.txt']) {
  const cfPath = path.join(outDir, cf);
  if (!fs.existsSync(cfPath)) {
    die(`CRITICAL: out/${cf} is missing! Build aborted.`);
  }
  console.log(`[VERIFY] out/${cf}: ${fs.statSync(cfPath).size} bytes - OK`);
}

// 3. 验证根 HTML 文件存在
const indexPath = path.join(outDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  die('CRITICAL: out/index.html is missing! Next.js build did not produce root page.');
}
console.log(`[VERIFY] out/index.html: ${fs.statSync(indexPath).size} bytes - OK`);

// 4. 修复嵌套路由 HTML 文件
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

// 5. 复制 Cloudflare Pages Functions 到输出目录
// 注意：Pages Functions 的响应不受 _headers 文件规则影响，
// 可精确控制 HTTP 头部，用于绕过区域级安全头（如 nosniff）。
const functionsDir = path.join(process.cwd(), 'functions');
const outFunctionsDir = path.join(outDir, 'functions');
if (fs.existsSync(functionsDir)) {
  if (!fs.existsSync(outFunctionsDir)) {
    fs.mkdirSync(outFunctionsDir, { recursive: true });
  }
  const funcFiles = fs.readdirSync(functionsDir);
  for (const f of funcFiles) {
    fs.copyFileSync(path.join(functionsDir, f), path.join(outFunctionsDir, f));
    console.log(`[OK] Copied functions/${f} to out/functions/`);
  }
  // 删除静态 ads.txt，让 Function 接管该路径
  // Cloudflare Pages Functions 优先级高于静态文件
  const staticAdsTxt = path.join(outDir, 'ads.txt');
  if (fs.existsSync(staticAdsTxt)) {
    fs.unlinkSync(staticAdsTxt);
    console.log('[OK] Removed out/ads.txt - Function will handle /ads.txt requests');
  }
}

console.log('\n[POSTBUILD] All critical files verified. Build is deployment-ready.');
