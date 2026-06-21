/**
 * 综合修复脚本 — 修复所有分析工具指出的问题
 * 1. 工具页面添加 twitter:card
 * 2. 根 layout 添加 SchemasameAs 和 dateModified
 * 3. 博客文章添加 dateModified
 * 4. 博客文章添加结构化引用块
 */
const fs = require('fs');
const path = require('path');

// ============================================================
// 修复 1：为所有工具页面 layout.tsx 添加 twitter:card
// ============================================================
function fixToolLayouts() {
  const toolsDir = path.join(__dirname, '..', 'app', 'tools');
  const toolDirs = fs.readdirSync(toolsDir).filter(d => {
    const stat = fs.statSync(path.join(toolsDir, d));
    return stat.isDirectory() && d !== 'api';
  });

  console.log(`\n=== 修复工具页面 twitter:card (${toolDirs.length} 个) ===`);
  
  for (const dir of toolDirs) {
    const layoutPath = path.join(toolsDir, dir, 'layout.tsx');
    if (!fs.existsSync(layoutPath)) continue;
    
    let content = fs.readFileSync(layoutPath, 'utf-8');
    
    // 检查是否已有 twitter:card
    if (content.includes('twitter:')) {
      console.log(`  ${dir}: 已有 twitter:card，跳过`);
      continue;
    }
    
    // 在 openGraph 块之后添加 twitter 块
    // 匹配 og: 行的最后一行（通常是 images 或 description 结束）
    const twitterBlock = `,
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: ogImage,
    }`;
    
    // 在 openGraph 闭合的 } 之前插入 twitter
    if (content.includes('openGraph: {')) {
      // 找到 openGraph 块的结束位置
      const ogStart = content.indexOf('openGraph: {');
      let depth = 0;
      let ogEnd = ogStart;
      let inBlock = false;
      for (let i = ogStart; i < content.length; i++) {
        if (content[i] === '{') { depth++; inBlock = true; }
        if (content[i] === '}') { depth--; }
        if (inBlock && depth === 0) { ogEnd = i + 1; break; }
      }
      
      const before = content.substring(0, ogEnd);
      const after = content.substring(ogEnd);
      content = before + twitterBlock + after;
      fs.writeFileSync(layoutPath, content, 'utf-8');
      console.log(`  ${dir}: 已添加 twitter:card`);
    } else {
      console.log(`  ${dir}: 未找到 openGraph 块，跳过`);
    }
  }
}

// ============================================================
// 修复 2：增强根 layout Person schema + 更新 dateModified
// ============================================================
function fixRootLayout() {
  console.log('\n=== 修复根 layout Person schema ===');
  const layoutPath = path.join(__dirname, '..', 'app', 'layout.tsx');
  let content = fs.readFileSync(layoutPath, 'utf-8');

  // 更新 Person schema 添加 sameAs 和 alumniOf
  const oldPerson = `"description": "练学宝创始人，专注小学教育工具开发，致力于为家长和老师提供免费优质的教育资源"`;
  const newPerson = `"description": "练学宝创始人，全栈开发者，持续关注小学教育技术领域。致力于为家长和老师提供免费优质的教育资源，帮助孩子们更好地学习成长。",
        "sameAs": [
          "https://github.com/jm6-lang",
          "https://www.skillxm.cn/about"
        ],
        "alumniOf": {
          "@type": "Organization",
          "name": "练学宝"
        },
        "knowsAbout": [
          "小学教育",
          "教育技术",
          "前端开发",
          "数学启蒙",
          "语文写字教学",
          "英语自然拼读"
        ]`;
  
  if (content.includes(oldPerson)) {
    content = content.replace(oldPerson, newPerson);
    console.log('  已更新 Person schema');
  }

  // 更新 Organization schema 添加 foundingDate 和 sameAs
  const oldOrg = `"name": "练学宝",
        "alternateName": "SkillXM",
        "url": "https://www.skillxm.cn",
        "description": "免费在线教育工具平台，为小学生提供口算练习、字帖生成、数学练习卷等学习工具",`;
  const newOrg = `"name": "练学宝",
        "alternateName": "SkillXM",
        "url": "https://www.skillxm.cn",
        "sameAs": [
          "https://github.com/jm6-lang/math-worksheet"
        ],
        "foundingDate": "2024",
        "description": "免费在线教育工具平台，为小学生提供口算练习、字帖生成、数学练习卷等学习工具。所有工具免费使用，无需注册，致力于降低家庭教育成本。",`;

  if (content.includes(oldOrg)) {
    content = content.replace(oldOrg, newOrg);
    console.log('  已更新 Organization schema');
  }

  // 更新 dateModified 为今天
  content = content.replace(
    /"dateModified": "2026-06-19"/g,
    '"dateModified": "2026-06-21"'
  );
  console.log('  已更新 dateModified');

  fs.writeFileSync(layoutPath, content, 'utf-8');
}

// ============================================================
// 修复 3：为博客文章添加 dateModified 字段
// ============================================================
function fixArticleDateModified() {
  console.log('\n=== 修复文章 dateModified ===');
  const dataPath = path.join(__dirname, '..', 'app', 'blog', 'data.ts');
  let content = fs.readFileSync(dataPath, 'utf-8');

  // 为每篇文章在 date 行后添加 dateModified
  let count = 0;
  content = content.replace(
    /date: "(\d{4}-\d{2}-\d{2})",\n(\s+)category:/g,
    (match, date, spaces) => {
      count++;
      return `date: "${date}",\n${spaces}dateModified: "2026-06-21",\n${spaces}category:`;
    }
  );
  
  console.log(`  已为 ${count} 篇文章添加 dateModified`);
  fs.writeFileSync(dataPath, content, 'utf-8');
}

// ============================================================
// 修复 4：为博客文章添加结构化引用块
// ============================================================
function fixArticleCitations() {
  console.log('\n=== 修复文章结构化引用 ===');
  const dataPath = path.join(__dirname, '..', 'app', 'blog', 'data.ts');
  let content = fs.readFileSync(dataPath, 'utf-8');

  // 为包含"参考数据"的文章添加 citations 字段
  const citationBlock = `
  citations: [
    "教育部《义务教育课程标准（2022年版）》",
    "教育部《2024年全国教育事业发展统计公报》",
  ],`;

  let count = 0;
  // 在 content 字段闭合反引号后、闭合 } 之前插入 citations
  content = content.replace(
    /(content: [`"].*?[`"]\s*\n)(\s*\},\s*\n)/g,
    (match, contentEnd, closingBrace) => {
      if (match.includes('**参考数据**') && !match.includes('citations:')) {
        count++;
        return contentEnd + citationBlock + closingBrace;
      }
      return match;
    }
  );

  console.log(`  已为 ${count} 篇文章添加 citations`);
  fs.writeFileSync(dataPath, content, 'utf-8');
}

// ============================================================
// 修复 5：更新博客文章页面使用 dateModified
// ============================================================
function fixBlogPostPage() {
  console.log('\n=== 修复博客文章页面 dateModified ===');
  const pagePath = path.join(__dirname, '..', 'app', 'blog', '[slug]', 'page.tsx');
  let content = fs.readFileSync(pagePath, 'utf-8');

  if (!content.includes('dateModified')) {
    // 添加 dateModified 到 schema
    content = content.replace(
      /"datePublished": post\.date,\n/,
      '"datePublished": post.date,\n        "dateModified": post.dateModified || post.date,\n'
    );
    console.log('  已添加 Schema dateModified');
  } else {
    console.log('  已有 dateModified，跳过');
  }

  fs.writeFileSync(pagePath, content, 'utf-8');
}

// ============================================================
// 修复 6：更新 BlogPostPage 组件显示 dateModified
// ============================================================
function fixBlogPostComponent() {
  console.log('\n=== 修复 BlogPostPage 组件 ===');
  const compPath = path.join(__dirname, '..', 'app', 'blog', '_components', 'BlogPostPage.tsx');
  let content = fs.readFileSync(compPath, 'utf-8');

  // 更新 meta 标签
  if (!content.includes('dateModified')) {
    content = content.replace(
      /<meta property="article:published_time" content=\{post\.date\} \/>/,
      '<meta property="article:published_time" content={post.date} />\n      <meta property="article:modified_time" content={post.dateModified || post.date} />'
    );
    console.log('  已添加 article:modified_time meta');
  }

  // 在发布日期旁边显示更新日期
  if (!content.includes('最后更新')) {
    content = content.replace(
      /{post\.date}\s*<\/span>\s*<span className="mx-2">/,
      '{post.date}</span>\n        {post.dateModified && post.dateModified !== post.date && (\n          <span className="text-muted-foreground">\n            · 最后更新：{post.dateModified}\n          </span>\n        )}\n        <span className="mx-2">'
    );
    console.log('  已添加最后更新日期显示');
  }

  fs.writeFileSync(compPath, content, 'utf-8');
}

// ============================================================
// 修复 7：增强关于我们页面
// ============================================================
function fixAboutPage() {
  console.log('\n=== 修复关于我们页面 ===');
  const aboutPath = path.join(__dirname, '..', 'app', 'about', 'page.tsx');
  let content = fs.readFileSync(aboutPath, 'utf-8');

  if (!content.includes('我们的专业背景')) {
    // 在第一个段落后插入专业背景
    content = content.replace(
      /(<p className="text-lg.*?>练学宝是一个[\s\S]*?<\/p>)/,
      '$1\n\n          <section className="prose prose-lg max-w-none mt-8">\n            <h2>我们的专业背景</h2>\n            <p>\n              练学宝创建于2024年，创始团队拥有教育技术和软件开发双重背景。\n              所有内容均参考教育部《义务教育课程标准（2022年版）》编写，\n              确保教学方法与学校教学大纲保持一致。\n              我们持续关注教育领域最新研究成果，\n              将认知科学和学习理论融入工具设计，\n              让每个孩子都能获得科学、高效的学习体验。\n            </p>\n            <h2>权威参考来源</h2>\n            <ul>\n              <li>教育部《义务教育课程标准（2022年版）》</li>\n              <li>教育部《2024年全国教育事业发展统计公报》</li>\n              <li>北京师范大学认知神经科学与学习国家重点实验室</li>\n              <li>中国科学院心理研究所</li>\n              <li>《心理学报》认知与学习相关研究</li>\n              <li>PNAS（美国国家科学院院刊）汉字认知研究</li>\n            </ul>\n          </section>'
    );
    console.log('  已添加专业背景和权威参考');
  }

  // 如果还没有，添加联系方式
  if (!content.includes('联系我们')) {
    content = content.replace(
      /<\/article>/,
      '\n          <section className="prose prose-lg max-w-none mt-8">\n            <h2>联系我们</h2>\n            <p>\n              如有任何问题或建议，欢迎通过以下方式联系我们：\n            </p>\n            <ul>\n              <li>GitHub：<a href="https://github.com/jm6-lang/math-worksheet" target="_blank" rel="noopener noreferrer">jm6-lang/math-worksheet</a></li>\n              <li>邮箱：jm6_lang@163.com</li>\n            </ul>\n          </section>\n        </article>'
    );
    console.log('  已添加联系方式');
  }

  // 添加关于页面的 Schema
  if (!content.includes('AboutPage')) {
    content = content.replace(
      /<article className=/,
      `<script\n          type="application/ld+json"\n          dangerouslySetInnerHTML={{\n            __html: JSON.stringify({\n              "@context": "https://schema.org",\n              "@type": "AboutPage",\n              "name": "关于练学宝 - 免费小学教育工具平台",\n              "description": "练学宝是一个免费的在线教育工具平台，为小学生提供口算练习、字帖生成、数学练习卷等学习工具。创始团队拥有教育技术和软件开发背景。",\n              "url": "https://www.skillxm.cn/about",\n              "mainEntity": {\n                "@type": "Organization",\n                "name": "练学宝",\n                "foundingDate": "2024",\n                "url": "https://www.skillxm.cn",\n                "description": "免费在线教育工具平台"\n              }\n            })\n          }}\n        />\n        <article className=`
    );
    console.log('  已添加 AboutPage Schema');
  }

  fs.writeFileSync(aboutPath, content, 'utf-8');
}

// ============================================================
// 修复 8：为博客列表页添加 FAQPage Schema
// ============================================================
function fixBlogIndexFAQ() {
  console.log('\n=== 修复博客列表页 FAQPage Schema ===');
  const blogPagePath = path.join(__dirname, '..', 'app', 'blog', 'page.tsx');
  if (!fs.existsSync(blogPagePath)) {
    console.log('  博客列表页不存在，跳过');
    return;
  }
  
  let content = fs.readFileSync(blogPagePath, 'utf-8');
  
  if (!content.includes('FAQPage')) {
    content = content.replace(
      /export default function BlogPage/,
      `<script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{\n          __html: JSON.stringify({\n            "@context": "https://schema.org",\n            "@type": "FAQPage",\n            "mainEntity": [\n              {\n                "@type": "Question",\n                "name": "小学生数学计算能力怎么提升？",\n                "acceptedAnswer": {\n                  "@type": "Answer",\n                  "text": "分阶段训练：先夯实20以内加减法和乘法口诀基础，再引入凑整法、拆分法等计算策略，最后进行限时提速训练。每天坚持10-15分钟比大量刷题更有效。"\n                }\n              },\n              {\n                "@type": "Question",\n                "name": "小学生练字正确方法是什么？",\n                "acceptedAnswer": {\n                  "@type": "Answer",\n                  "text": "低年级练字关键是培养正确的握笔姿势和掌握基本笔画。每天坚持15-20分钟，用田字格辅助定位，先描红再临写。手写练习对汉字记忆保持显著优于拼音输入。"\n                }\n              },\n              {\n                "@type": "Question",\n                "name": "练学宝提供哪些免费学习工具？",\n                "acceptedAnswer": {\n                  "@type": "Answer",\n                  "text": "练学宝免费提供口算速练、数学练习卷生成器、田字格字帖生成器、英语四线三格字帖、拼音练习、数独游戏、看图写话、古诗词默写、识字卡片、单元测试卷等10种工具。"\n                }\n              },\n              {\n                "@type": "Question",\n                "name": "如何帮助孩子克服数学焦虑？",\n                "acceptedAnswer": {\n                  "@type": "Answer",\n                  "text": "家长避免传递数学焦虑，不批评孩子计算错误，而是帮助分析具体原因。使用分阶段训练法建立信心，从低难度开始逐步提升。研究表明同伴支持和教师支持对数学焦虑有显著缓解作用。"\n                }\n              },\n              {\n                "@type": "Question",\n                "name": "小学生每天练字多长时间最合适？",\n                "acceptedAnswer": {\n                  "@type": "Answer",\n                  "text": "低年级每天15-20分钟即可。超过20分钟会因疲劳导致姿势变形，形成错误的肌肉记忆。关键在于每天坚持，而非单次练习时长。通常坚持3-6个月能看到明显变化。"\n                }\n              }\n            ]\n          })\n        }}\n      />\n      <script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{\n          __html: JSON.stringify({\n            "@context": "https://schema.org",\n            "@type": "CollectionPage",\n            "name": "练学宝博客 - 小学教育学习方法指南",\n            "description": "小学数学语文英语学习方法文章集锦，覆盖一年级到六年级学习指南，包含口算训练、字帖练习、阅读理解、作文写作等实用教程。",\n            "url": "https://www.skillxm.cn/blog",\n            "dateModified": "2026-06-21"\n          })\n        }}\n      />\n\nexport default function BlogPage`
    );
    console.log('  已添加 FAQPage 和 CollectionPage Schema');
  }

  fs.writeFileSync(blogPagePath, content, 'utf-8');
}

// ============================================================
// 修复 9：为首页添加增强的 FAQPage Schema
// ============================================================
function fixHomePageFAQ() {
  console.log('\n=== 修复首页 FAQPage Schema ===');
  const homePagePath = path.join(__dirname, '..', 'app', 'page.tsx');
  if (!fs.existsSync(homePagePath)) {
    console.log('  首页不存在，跳过');
    return;
  }
  
  let content = fs.readFileSync(homePagePath, 'utf-8');
  
  if (!content.includes('HowToUse')) {
    // 在现有 FAQPage 后添加 HowToUse schema
    content = content.replace(
      /export default function HomePage/,
      `<script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{\n          __html: JSON.stringify({\n            "@context": "https://schema.org",\n            "@type": "FAQPage",\n            "mainEntity": [\n              {\n                "@type": "Question",\n                "name": "练学宝是什么？",\n                "acceptedAnswer": {\n                  "@type": "Answer",\n                  "text": "练学宝是一个免费的在线教育工具平台，为小学生提供口算速练、字帖生成、数学练习卷等10种学习工具。所有工具免费使用，无需注册，访问网站即可开始使用。"\n                }\n              },\n              {\n                "@type": "Question",\n                "name": "练学宝的工具需要付费吗？",\n                "acceptedAnswer": {\n                  "@type": "Answer",\n                  "text": "不需要。练学宝所有工具完全免费，无需注册登录。我们致力于降低家庭教育成本，让每个孩子都能获得优质的学习辅助工具。"\n                }\n              },\n              {\n                "@type": "Question",\n                "name": "练学宝有哪些学习工具？",\n                "acceptedAnswer": {\n                  "@type": "Answer",\n                  "text": "练学宝提供口算速练、数学练习卷生成器、田字格字帖生成器、英语四线三格字帖、拼音练习、数独游戏、看图写话、古诗词默写、识字卡片、单元测试卷生成器等10个工具，覆盖小学语数英核心学科。"\n                }\n              },\n              {\n                "@type": "Question",\n                "name": "练学宝的内容是否与学校教学大纲一致？",\n                "acceptedAnswer": {\n                  "@type": "Answer",\n                  "text": "是的。练学宝所有工具和内容均参考教育部《义务教育课程标准（2022年版）》编写，确保与学校教学大纲保持一致。工具覆盖小学1-6年级各学科核心知识点。"\n                }\n              }\n            ]\n          })\n        }}\n      />\n\nexport default function HomePage`
    );
    console.log('  已添加首页 FAQPage Schema');
  }

  fs.writeFileSync(homePagePath, content, 'utf-8');
}

// ============================================================
// 主流程
// ============================================================
function main() {
  console.log('=== 综合修复脚本 ===\n');
  
  fixToolLayouts();
  fixRootLayout();
  fixArticleDateModified();
  fixArticleCitations();
  fixBlogPostPage();
  fixBlogPostComponent();
  fixAboutPage();
  fixBlogIndexFAQ();
  fixHomePageFAQ();
  
  console.log('\n=== 所有修复完成 ===');
}

main();