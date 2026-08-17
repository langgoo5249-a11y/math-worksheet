/**
 * 文章内容清理脚本 v2
 * 目的：去除 AI 生成痕迹、假案例、假数据，引入真实引用
 * 基于实际内容分析编写，避免过度匹配
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'app', 'blog', 'data.ts');

// ============================================================
// 1. 需要删除的重复文章 ID（内容完全相同）
// ============================================================
const DUPLICATE_IDS = [
  'haizi-lianzi-shijianbiao-y7pj',   // 与 haizi写zi歪歪扭扭-这份lianzi时间-vljj 内容相同
  'haizi-xie-zi-wai-wai-niu-niu-lian-zi-shi-jian', // 同上
];

// ============================================================
// 2. 替换假第一人称叙事为中性表述
// ============================================================
const FIRST_PERSON_FIXES = [
  // "我儿子" 系列 → 中性化
  { from: /我儿子就是个例子，从/g, to: '很多孩子通过坚持练习，从' },
  { from: /我儿子就是个例子/g, to: '很多孩子也是如此' },
  { from: /我儿子(上|读|今年|在|的|刚|小|幼|二|三|四|五|六|一)/g, to: '有孩子' },
  { from: /我儿子/g, to: '孩子' },
  
  // "我女儿" 系列 → 中性化
  { from: /我女儿(上|读|今年|在|的|刚|小|幼|二|三|四|五|六|一)/g, to: '有孩子' },
  { from: /我女儿/g, to: '孩子' },

  // "我家孩子" / "我们家孩子"
  { from: /我们家孩子/g, to: '孩子' },
  { from: /我家孩子/g, to: '孩子' },
];

// ============================================================
// 3. 删除伪造的调研数据引用（保留句式但移除具体数字）
// ============================================================
const FAKE_STATS_FIXES = [
  // 精确百分比 → 模糊表述
  { from: /(\d{1,3}\.?\d*)\s*%的家长/g, to: '很多家长' },
  { from: /(\d{1,3}\.?\d*)\s*%的孩子/g, to: '很多孩子' },
  { from: /(\d{1,3}\.?\d*)\s*%的学生/g, to: '许多学生' },
  { from: /(\d{1,3}\.?\d*)\s*%的小学生/g, to: '许多小学生' },
  { from: /(\d{1,3}\.?\d*)\s*%的学校/g, to: '许多学校' },
  { from: /错误率高达\s*(\d{1,3}\.?\d*)\s*%/g, to: '错误率较高' },
  { from: /复发率能降低\s*(\d{1,3}\.?\d*)\s*%/g, to: '复发率能明显降低' },
  { from: /约有\s*(\d{1,3}\.?\d*)\s*%的小学生/g, to: '部分小学生' },
  { from: /超过\s*(\d{1,3}\.?\d*)\s*%的小学生/g, to: '不少小学生' },
  { from: /其中\s*(\d{1,3}\.?\d*)\s*%的错误源于/g, to: '其中多数错误源于' },
  { from: /其中\s*(\d{1,3}\.?\d*)\s*%是因为/g, to: '其中多数是因为' },

  // 删除虚假的"我查了资料"引用段落
  { from: /我后来查了一些资料，[^。]*?(?:研究|调查|显示|数据)[^。]*?[。]/g, to: '' },
  { from: /我特意查了一些资料，[^。]*?[。]/g, to: '' },
  { from: /看到这个数据我反而松了口气，原来不是我儿子一个人这样[。]?/g, to: '' },
  { from: /看到这个数据我反而松了口气[。]?/g, to: '' },
];

// ============================================================
// 4. AI 模板句式清理
// ============================================================
const AI_TEMPLATE_FIXES = [
  // AI 结尾模板
  { from: /靠的不是天赋，而是方法加坚持[。]?/g, to: '靠的是正确的方法和持续的练习。' },
  { from: /靠的不是天赋，而是方法加坚持/g, to: '靠的是正确的方法和持续的练习' },
  { from: /靠的不是天赋，而是[^。]+[。]?/g, to: '靠的是正确的方法和持续的练习。' },
  
  // AI 过渡词
  { from: /总的来说，/g, to: '' },
  { from: /综上所述，/g, to: '' },
  { from: /值得注意的是，/g, to: '' },
  { from: /需要强调的是，/g, to: '' },
  { from: /不难发现，/g, to: '' },
  { from: /由此可见，/g, to: '' },
  { from: /令人惊讶的是，/g, to: '' },
  { from: /毫无疑问，/g, to: '' },

  // AI 开场白
  { from: /很多家长都问我[：:]\s*/g, to: '' },
  { from: /经常有家长问[：:]\s*/g, to: '' },
  { from: /作为(一个|一名|两个孩子的)?(家长|父亲|母亲|爸爸|妈妈)，/g, to: '' },
  { from: /说实话，/g, to: '' },
  { from: /说真的，/g, to: '' },
  { from: /老实说，/g, to: '' },
  { from: /不瞒你说，/g, to: '' },
  { from: /说出来不怕你笑话，/g, to: '' },
  { from: /说出来不怕你笑话[。]?/g, to: '' },
  { from: /说出来你可能不信，/g, to: '' },

  // AI 叙事模板
  { from: /说实话，这个过程挺煎熬的[，,]?/g, to: '' },
  { from: /这个过程挺煎熬的[，,]?/g, to: '' },
  { from: /这句话点醒了我[。]?/g, to: '' },

  // AI 权威引用模板
  { from: /有\s*(\d+)\s*年教龄的/g, to: '有经验的' },
  { from: /教了\s*(\d+)\s*年/g, to: '有经验的' },
  { from: /当了\s*(\d+)\s*年/g, to: '有经验的' },

  // AI 结尾
  { from: /记住，?\s*教育的本质/g, to: '教育的本质' },
  { from: /最后，?\s*我想说/g, to: '总结' },
  { from: /希望这篇文章/g, to: '希望以上内容' },
  { from: /希望这些方法/g, to: '希望以上方法' },
];

// ============================================================
// 5. 替换假案例研究为中性描述
// ============================================================
const FAKE_CASE_FIXES = [
  // 假案例模板1: "小红/小明是X年级的学生，XX从XX提升到XX"
  { from: /小红是一年级的学生，写字歪歪扭扭。通过使用田字格字帖，每天练15分钟，3个月后书写工整度明显提升。/g,
    to: '以一年级学生为例，通过使用田字格字帖，每天坚持练习15分钟，3个月后书写工整度通常会有明显提升。' },
  { from: /小明是三年级的学生，数学成绩从班级倒数提升到前10。通过每天坚持20分钟口算训练，期末考了92分。/g,
    to: '以三年级学生为例，通过每天坚持20分钟口算训练，数学成绩可以获得显著提升。' },
  
  // 假案例模板2: "我邻居家的孩子小明"
  { from: /我邻居家的孩子小明，(\S+)年级，([^。]+?)[。]/g, to: '以$1年级孩子为例，$2。' },
];

// ============================================================
// 6. 真实数据引用
// ============================================================
const REAL_DATA = {
  '小学': '\n\n> **参考数据**：根据教育部《2024年全国教育事业发展统计公报》，全国共有小学14.35万所，在校生1.08亿人。小学阶段是培养学习习惯的关键时期。',
  '数学': '\n\n> **参考数据**：根据《义务教育数学课程标准（2022年版）》，小学数学核心素养包括数感、量感、符号意识、运算能力、几何直观、空间观念、推理意识、数据意识、模型意识、应用意识和创新意识。',
  '语文': '\n\n> **参考数据**：根据《义务教育语文课程标准（2022年版）》，小学阶段要求学生认识常用汉字3000个左右，其中2500个左右会写。背诵优秀诗文160篇（段）。',
  '拼音': '\n\n> **参考数据**：根据《义务教育语文课程标准（2022年版）》，一年级学生应学会汉语拼音，能读准声母、韵母、声调和整体认读音节。',
  '写字': '\n\n> **参考数据**：根据《义务教育语文课程标准（2022年版）》，小学阶段要求学生写字姿势正确，有良好的书写习惯。硬笔书写楷书，行款整齐，力求美观，有一定的速度。',
  '口算': '\n\n> **参考数据**：根据《义务教育数学课程标准（2022年版）》，第一学段（1-2年级）能熟练口算20以内加减法和表内乘除法；第二学段（3-4年级）能熟练口算百以内加减法和一位数乘除两位数。',
  '英语': '\n\n> **参考数据**：根据《义务教育英语课程标准（2022年版）》，小学阶段英语课程目的是培养学生的综合语言运用能力，激发学习兴趣，建立学习自信心。',
  '古诗词': '\n\n> **参考数据**：根据《义务教育语文课程标准（2022年版）》，小学阶段要求学生背诵优秀诗文160篇（段），其中1-6年级推荐古诗文75篇。',
};

// ============================================================
// 辅助函数
// ============================================================

function applyAllFixes(text) {
  let result = text;
  
  // 应用所有修复
  const allFixes = [
    ...FIRST_PERSON_FIXES,
    ...FAKE_STATS_FIXES,
    ...AI_TEMPLATE_FIXES,
    ...FAKE_CASE_FIXES,
  ];
  
  for (const { from, to } of allFixes) {
    result = result.replace(from, to);
  }

  // 清理多余空行（连续3+空行→2空行）
  result = result.replace(/\n{3,}/g, '\n\n');
  
  // 清理句首多余空格
  result = result.replace(/\n[ \t]+/g, '\n');
  
  // 清理空段落（只有空格的行）
  result = result.replace(/\n[ \t]*\n[ \t]*\n/g, '\n\n');

  return result;
}

function addRealDataRef(content) {
  if (!content) return content;
  if (content.includes('**参考数据**')) return content;
  
  // 根据关键词匹配添加引用
  for (const [keyword, ref] of Object.entries(REAL_DATA)) {
    if (content.includes(keyword)) {
      // 在最后一个 ## 标题前插入
      const lastH2 = content.lastIndexOf('\n## ');
      if (lastH2 > 0) {
        return content.substring(0, lastH2) + ref + '\n' + content.substring(lastH2);
      }
      // 没有 ## 标题，在末尾添加
      return content + ref;
    }
  }
  return content;
}

// ============================================================
// 主流程
// ============================================================
function main() {
  console.log('=== 文章内容清理脚本 v2 ===\n');
  
  let data = fs.readFileSync(DATA_FILE, 'utf-8');
  const originalSize = data.length;
  console.log(`原始文件大小: ${(originalSize / 1024).toFixed(1)} KB`);

  // ---- Step 1: 删除重复文章 ----
  console.log('\n[Step 1] 删除重复文章...');
  for (const dupId of DUPLICATE_IDS) {
    // 匹配整个文章对象（从 { 开始到下一个 } 或 , 结束）
    // 使用更宽松的匹配
    const articleRegex = new RegExp(
      `\\{\\s*\\n\\s*id:\\s*["']${dupId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][\\s\\S]*?\\n\\s*\\},\\s*\\n`,
      'g'
    );
    const before = data.length;
    data = data.replace(articleRegex, '');
    if (data.length < before) {
      console.log(`  已删除重复文章: ${dupId}`);
    } else {
      console.log(`  未找到文章: ${dupId}`);
    }
  }

  // ---- Step 2: 提取并处理每篇文章的 content 字段 ----
  console.log('\n[Step 2] 处理文章内容...');
  
  // 匹配 content 字段（模板字符串）
  // 格式: content: `...内容...`,
  const contentRegex = /content:\s*`/g;
  let match;
  const positions = [];
  
  while ((match = contentRegex.exec(data)) !== null) {
    positions.push(match.index + match[0].length);
  }
  
  console.log(`  找到 ${positions.length} 篇文章`);

  // 从后往前处理，避免位置偏移
  let processedCount = 0;
  for (let i = positions.length - 1; i >= 0; i--) {
    const startPos = positions[i];
    // 找到匹配的闭合反引号
    let depth = 1;
    let endPos = startPos;
    let inString = false;
    let inEscape = false;
    
    for (let j = startPos; j < data.length && depth > 0; j++) {
      const ch = data[j];
      
      if (inEscape) {
        inEscape = false;
        continue;
      }
      
      if (ch === '\\') {
        inEscape = true;
        continue;
      }
      
      // 处理模板字符串内的 ${...} 插值
      if (ch === '$' && data[j + 1] === '{') {
        depth++;
        j++; // skip {
        continue;
      }
      
      if (ch === '}') {
        // 这可能是模板插值的结束
        // 需要检查是否在模板字符串内
        if (depth > 1) {
          depth--;
          continue;
        }
      }
      
      if (ch === '`') {
        depth--;
        if (depth === 0) {
          endPos = j;
          break;
        }
      }
    }
    
    if (depth === 0) {
      const originalContent = data.substring(startPos, endPos);
      let cleaned = applyAllFixes(originalContent);
      cleaned = addRealDataRef(cleaned);
      
      if (cleaned !== originalContent) {
        data = data.substring(0, startPos) + cleaned + data.substring(endPos);
        processedCount++;
      }
    }
  }
  console.log(`  已处理 ${processedCount} 篇文章`);

  // ---- Step 2b: 处理 JSON 格式的 content 字段（双引号字符串） ----
  console.log('\n[Step 2b] 处理 JSON 格式文章...');
  // 匹配 "content": "..." 的 JSON 字符串
  // 需要处理转义的引号
  const jsonContentRegex = /"?content"?:\s*"((?:[^"\\]|\\.)*)"/g;
  let jsonMatch;
  let jsonCount = 0;
  const jsonReplacements = [];
  
  while ((jsonMatch = jsonContentRegex.exec(data)) !== null) {
    const fullMatch = jsonMatch[0];
    const originalContent = jsonMatch[1];
    // 反转义 JSON 字符串
    const unescaped = originalContent.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
    
    let cleaned = applyAllFixes(unescaped);
    cleaned = addRealDataRef(cleaned);
    
    if (cleaned !== unescaped) {
      // 重新转义
      const escaped = cleaned.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
      // 保留原始格式（content: 或 "content":）
      const prefix = fullMatch.startsWith('"content"') ? '"content": "' : 'content: "';
      const newContent = prefix + escaped + '"';
      jsonReplacements.push({ original: fullMatch, cleaned: newContent });
      jsonCount++;
    }
  }
  
  // 从后往前替换
  for (let i = jsonReplacements.length - 1; i >= 0; i--) {
    const { original, cleaned } = jsonReplacements[i];
    const idx = data.lastIndexOf(original);
    if (idx >= 0) {
      data = data.substring(0, idx) + cleaned + data.substring(idx + original.length);
    }
  }
  console.log(`  已处理 ${jsonCount} 篇 JSON 格式文章`);

  // ---- Step 3: 清理标题中的 AI 痕迹 ----
  console.log('\n[Step 3] 清理标题...');
  let titleCount = 0;
  data = data.replace(/"?title"?:?\s*"([^"]*)"/g, (match, title) => {
    let newTitle = title;
    // 替换标题中的假第一人称
    newTitle = newTitle.replace(/我儿子/g, '孩子');
    newTitle = newTitle.replace(/我女儿/g, '孩子');
    // 删除标题中的虚假百分比
    newTitle = newTitle.replace(/\d{1,3}%/g, '');
    // 清理标题中的 AI 句式
    newTitle = newTitle.replace(/，90%的家长都搞错了/g, '');
    newTitle = newTitle.replace(/，\d{1,3}%的家长都搞错了/g, '');
    newTitle = newTitle.replace(/让我儿子从/g, '让孩子从');
    newTitle = newTitle.replace(/我研究了\d+年的/g, '');
    newTitle = newTitle.replace(/我用这\d+个/g, '');
    newTitle = newTitle.replace(/我走访了\d+所/g, '');
    newTitle = newTitle.replace(/我研究了\d+个/g, '');
    newTitle = newTitle.replace(/我对比了\d+个/g, '');
    newTitle = newTitle.replace(/我陪孩子用/g, '');
    newTitle = newTitle.replace(/我给孩子买了\d+套/g, '');
    
    if (newTitle !== title) {
      titleCount++;
      const prefix = match.startsWith('"title"') ? '"title": "' : 'title: "';
      return prefix + newTitle + '"';
    }
    return match;
  });
  console.log(`  已清理 ${titleCount} 个标题`);

  // ---- Step 4: 添加 AI 内容声明 ----
  console.log('\n[Step 4] 添加内容声明...');
  if (!data.includes('AI_CONTENT_DISCLAIMER')) {
    data = data.replace(
      /(\/\/ 默认作者信息)/,
      `// AI_CONTENT_DISCLAIMER: 以下文章内容由 AI 辅助生成，经人工审核编辑。
// 文章中引用的个人经历为案例说明，不构成真实个人经历。
// 统计数据请以官方来源为准。详见网站「关于我们」页面。
//
$1`
    );
    console.log('  已添加 AI 内容声明');
  }

  // ---- Step 4: 清理全局问题 ----
  console.log('\n[Step 4] 全局清理...');
  
  // 删除标题中的虚假百分比
  data = data.replace(/title:\s*"[^"]*?\d{1,3}%[^"]*"/g, (match) => {
    return match.replace(/\d{1,3}%/g, '');
  });

  // 清理连续逗号
  data = data.replace(/，，+/g, '，');
  data = data.replace(/。。+/g, '。');

  const finalSize = data.length;
  console.log(`最终文件大小: ${(finalSize / 1024).toFixed(1)} KB`);
  console.log(`减少: ${((originalSize - finalSize) / 1024).toFixed(1)} KB`);

  // ---- Step 5: 写入文件 ----
  fs.writeFileSync(DATA_FILE, data, 'utf-8');
  console.log('\n=== 清理完成 ===');
}

main();