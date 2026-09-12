#!/usr/bin/env node
/**
 * 构建期生成图片尺寸表 → lib/imageDims.ts
 *
 * 背景（P5-2）：全站 118 张正文/封面图片都没有 width/height 属性，
 * 浏览器在图片加载完成前无法预留空间，造成累积布局偏移（CLS），
 * 属于 Core Web Vitals 扣分项。
 *
 * 做法：扫描 public/images 下所有 webp/png/jpg，读取真实像素尺寸，
 * 生成一张「路径 → [宽, 高]」的表，供 <img> 注入 width/height。
 *
 * 该脚本挂在 build 之前运行（package.json 的 build 链首）。
 * 任何异常都不得中断构建：出错时保留上一版生成文件，exit 0。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'public', 'images');
const OUT_TS = path.join(ROOT, 'lib', 'imageDims.ts');

/** 应用最广的默认比例：1000×684（≈1.462），用于未来新增但未扫到的图片 */
const DEFAULT_W = 1000;
const DEFAULT_H = 684;

function webpSize(b) {
  if (b.length < 30) return null;
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null;
  let pos = 12;
  while (pos + 8 <= b.length) {
    const fourcc = b.toString('ascii', pos, pos + 4);
    const size = b.readUInt32LE(pos + 4);
    if (fourcc === 'VP8 ') {
      const dataStart = pos + 8;
      const w = b.readUInt16LE(dataStart + 6) & 0x3fff;
      const h = b.readUInt16LE(dataStart + 8) & 0x3fff;
      return [w, h];
    }
    if (fourcc === 'VP8L') {
      const bits = b.readUInt32LE(pos + 9);
      return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
    }
    if (fourcc === 'VP8X') {
      const d = pos + 8;
      const w = (b[d + 4] | (b[d + 5] << 8) | (b[d + 6] << 16)) + 1;
      const h = (b[d + 7] | (b[d + 8] << 8) | (b[d + 9] << 16)) + 1;
      return [w, h];
    }
    pos += 8 + size + (size & 1);
  }
  return null;
}

function pngSize(b) {
  if (b.length < 24) return null;
  if (b[0] !== 0x89 || b.toString('ascii', 1, 4) !== 'PNG') return null;
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

function jpgSize(b) {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
      return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    }
    if (m === 0xd8 || m === 0xd9 || (m >= 0xd0 && m <= 0xd7)) { i += 2; continue; }
    const seglen = b.readUInt16BE(i + 2);
    i += 2 + seglen;
  }
  return null;
}

function walk(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
}

function main() {
  if (!fs.existsSync(IMG_DIR)) {
    console.log('[image-dims] public/images 不存在，保留上一版生成文件');
    return;
  }
  const files = [];
  walk(IMG_DIR, files);
  const map = {};
  let ok = 0, bad = 0;
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    let dims = null;
    try {
      const b = fs.readFileSync(f);
      if (ext === '.webp') dims = webpSize(b);
      else if (ext === '.png') dims = pngSize(b);
      else if (ext === '.jpg' || ext === '.jpeg') dims = jpgSize(b);
      else continue;
    } catch (e) { dims = null; }
    if (!dims || !dims[0] || !dims[1]) { bad++; continue; }
    const rel = '/images/' + path.relative(IMG_DIR, f).split(path.sep).join('/');
    map[rel] = dims;
    ok++;
  }
  const keys = Object.keys(map).sort();
  const body = keys.map(k => `  ${JSON.stringify(k)}: [${map[k][0]}, ${map[k][1]}],`).join('\n');
  const ts = `// ⚠️ 本文件由 scripts/gen-image-dims.cjs 自动生成，请勿手工编辑。
// 作用：为 <img> 提供真实像素尺寸，消除累积布局偏移（CLS）。
// 重新生成：node scripts/gen-image-dims.cjs
export const IMAGE_DIMS: Record<string, [number, number]> = {
${body}
};

export const DEFAULT_IMAGE_DIMS: [number, number] = [${DEFAULT_W}, ${DEFAULT_H}];

/** 取图片真实尺寸；表里没有时回退到站点最常见比例（1000×684）。 */
export function getImageDims(src?: string): [number, number] {
  if (!src) return DEFAULT_IMAGE_DIMS;
  const clean = src.split('?')[0].split('#')[0];
  return IMAGE_DIMS[clean] || DEFAULT_IMAGE_DIMS;
}
`;
  fs.writeFileSync(OUT_TS, ts, 'utf8');
  console.log(`[image-dims] 解析 ${ok} 张图片尺寸（失败 ${bad}）→ lib/imageDims.ts`);
}

try {
  main();
} catch (e) {
  console.warn('[image-dims] 生成失败，沿用现有文件：', e && e.message);
}
process.exit(0);
