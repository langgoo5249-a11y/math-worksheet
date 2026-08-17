/**
 * 补充修复脚本 v2 — 修复第一次未成功匹配的问题
 */
const fs = require('fs');
const path = require('path');

// ============================================================
// 修复 1：根 layout Person schema - 添加 sameAs/alumniOf/knowsAbout
// ============================================================
function fixPersonSchema() {
  console.log('\n=== 修复 Person Schema ===');
  const layoutPath = path.join(__dirname, '..', 'app', 'layout.tsx');
  let content = fs.readFileSync(layoutPath, 'utf-8');

  // 精确匹配现有 Person schema
  const oldPerson = `name: "林远",
        description: "练学宝中文学习与小学数学教育内容作者，专注于儿童中文学习方法和小学数学教学研究",
        jobTitle: "教育内容作者",
        affiliation: {
          "@id": "https://www.skillxm.cn/#organization"
        },
        url: "https://www.skillxm.cn/about",`;

  const newPerson = `name: "林远",
        description: "练学宝创始人，具备教育技术和全栈开发双重背景。两个孩子的父亲，持续关注小学教育技术领域，致力于为家长和老师提供免费优质的教育资源。",
        jobTitle: "教育内容作者",
        sameAs: [
          "https://github.com/jm6-lang",
          "https://www.skillxm.cn/about"
        ],
        alumniOf: {
          "@type": "Organization",
          "name": "练学宝"
        },
        knowsAbout: [
          "小学教育",
          "教育技术",
          "数学启蒙",
          "语文写字教学",
          "英语自然拼读"
        ],
        affiliation: {
          "@id": "https://www.skillxm.cn/#organization"
        },
        url: "https://www.skillxm.cn/about",`;

  if (content.includes(oldPerson)) {
    content = content.replace(oldPerson, newPerson);
    console.log('  已更新 Person schema');
  } else {
    console.log('  未找到 Person schema 匹配');
  }

  // 更新 Organization dateModified
  content = content.replace(
    /dateModified: "2026-06-19"/g,
    'dateModified: "2026-06-21"'
  );

  fs.writeFileSync(layoutPath, content, 'utf-8');
}

// ============================================================
// 修复 2：文章 dateModified - 处理 TypeScript 格式 (date: 无引号)
// ============================================================
function fixArticleDateModifiedV2() {
  console.log('\n=== 修复文章 dateModified (TypeScript格式) ===');
  const dataPath = path.join(__dirname, '..', 'app', 'blog', 'data.ts');
  let content = fs.readFileSync(dataPath, 'utf-8');

  // 匹配 TypeScript 格式: date: "YYYY-MM-DD",
  let count = 0;
  content = content.replace(
    /(date: "(\d{4}-\d{2}-\d{2})",\n)(\s+)(?!dateModified)(category:)/g,
    (match, dateLine, dateVal, spaces, category) => {
      count++;
      return `${dateLine}${spaces}dateModified: "2026-06-21",\n${spaces}${category}`;
    }
  );

  console.log(`  已为 ${count} 篇文章添加 dateModified`);
  fs.writeFileSync(dataPath, content, 'utf-8');
}

// ============================================================
// 主流程
// ============================================================
function main() {
  console.log('=== 补充修复脚本 v2 ===\n');
  
  fixPersonSchema();
  fixArticleDateModifiedV2();
  
  console.log('\n=== 修复完成 ===');
}

main();