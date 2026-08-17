/**
 * 工具间关联推荐 — 增强 Topic Mesh 内链密度，提升站点整体质量评分
 */
export interface RelatedTool {
  toolId: string;
  toolName: string;
  reason: string;
  path: string;
}

export const relatedToolsMap: Record<string, RelatedTool[]> = {
  calligraphy: [
    { toolId: 'english-cursive', toolName: '英语字帖', reason: '练习英语字母书写和四线三格规范', path: '/tools/english-cursive/' },
    { toolId: 'pinyin', toolName: '拼音注音', reason: '配合字帖练习汉字正确拼音', path: '/tools/pinyin/' },
    { toolId: 'flashcard', toolName: '识字卡片', reason: '生字卡片辅助记忆，与练字交替使用', path: '/tools/flashcard/' },
  ],
  'english-cursive': [
    { toolId: 'calligraphy', toolName: '字帖生成器', reason: '中文书写练习的对应工具', path: '/tools/calligraphy/' },
    { toolId: 'oral-math', toolName: '口算速练', reason: '练完字帖做口算，注意力转换训练', path: '/tools/oral-math/' },
  ],
  pinyin: [
    { toolId: 'calligraphy', toolName: '字帖生成器', reason: '拼音+汉字练字，双重巩固', path: '/tools/calligraphy/' },
    { toolId: 'flashcard', toolName: '识字卡片', reason: '拼音标注生字卡片，音形义结合', path: '/tools/flashcard/' },
    { toolId: 'poem-memo', toolName: '古诗词默写', reason: '古诗中的多音字和生僻字拼音练习', path: '/tools/poem-memo/' },
  ],
  'math-worksheet': [
    { toolId: 'oral-math', toolName: '口算速练', reason: '先口算热身，再挑战综合练习卷', path: '/tools/oral-math/' },
    { toolId: 'sudoku', toolName: '数独游戏', reason: '数学逻辑思维训练，趣味强化', path: '/tools/sudoku/' },
    { toolId: 'unit-test', toolName: '单元测试卷', reason: '综合检测单元知识掌握情况', path: '/tools/unit-test/' },
  ],
  'oral-math': [
    { toolId: 'math-worksheet', toolName: '数学练习卷', reason: '口算巩固后进行完整试卷练习', path: '/tools/math-worksheet/' },
    { toolId: 'sudoku', toolName: '数独游戏', reason: '数学逻辑思维趣味训练', path: '/tools/sudoku/' },
  ],
  sudoku: [
    { toolId: 'math-worksheet', toolName: '数学练习卷', reason: '游戏思维→学科练习，循序渐进', path: '/tools/math-worksheet/' },
    { toolId: 'oral-math', toolName: '口算速练', reason: '数独锻炼逻辑，口算训练速度', path: '/tools/oral-math/' },
  ],
  flashcard: [
    { toolId: 'calligraphy', toolName: '字帖生成器', reason: '卡片识字+字帖写字，输入输出闭环', path: '/tools/calligraphy/' },
    { toolId: 'pinyin', toolName: '拼音注音', reason: '识字与拼音同步学习', path: '/tools/pinyin/' },
  ],
  composition: [
    { toolId: 'calligraphy', toolName: '字帖生成器', reason: '练好字再写作文，卷面分不丢', path: '/tools/calligraphy/' },
    { toolId: 'poem-memo', toolName: '古诗词默写', reason: '积累优美词句，为作文打底', path: '/tools/poem-memo/' },
  ],
  'poem-memo': [
    { toolId: 'calligraphy', toolName: '字帖生成器', reason: '古诗字帖：边写边背，双重记忆', path: '/tools/calligraphy/' },
    { toolId: 'pinyin', toolName: '拼音注音', reason: '古诗生僻字拼音查询', path: '/tools/pinyin/' },
  ],
  'unit-test': [
    { toolId: 'math-worksheet', toolName: '数学练习卷', reason: '针对性章节练习→综合自检', path: '/tools/math-worksheet/' },
    { toolId: 'poem-memo', toolName: '古诗词默写', reason: '语文单元测试古诗文专项准备', path: '/tools/poem-memo/' },
    { toolId: 'oral-math', toolName: '口算速练', reason: '口算是数学卷的基础，考前热身', path: '/tools/oral-math/' },
  ],
};
