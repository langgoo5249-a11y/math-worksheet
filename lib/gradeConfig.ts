// 年级配置数据 - 各年级对应的工具、知识点、推荐博客
export interface GradeConfig {
  grade: number;
  name: string;
  nameEn: string;
  ageRange: string;
  semester: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  description: string;
  longDescription: string;
  subjects: { name: string; icon: string; items: string[] }[];
  recommendTools: { name: string; href: string; icon: string; desc: string }[];
  knowledgePoints: string[];
  blogCategories: string[];
}

export const GRADES: GradeConfig[] = [
  {
    grade: 1,
    name: '一年级',
    nameEn: '一年级',
    ageRange: '6-7岁',
    semester: '上学期 / 下学期',
    metaTitle: '一年级学习专区 - 小学1年级数学语文练习题 | 练学宝',
    metaDescription: '专为小学一年级学生设计的免费学习资源。包含一年级数学口算、拼音学习、识字卡片、10以内加减法练习、20以内进位加法等核心知识点练习，全部PDF免费下载打印。',
    metaKeywords: ['一年级数学题', '一年级口算', '10以内加减法', '20以内进位加法', '小学一年级拼音', '一年级识字', '一年级练习题'],
    description: '一年级的核心任务是养成学习习惯 + 掌握基础计算与拼音识字。所有练习均围绕课标设计，可直接打印使用。',
    longDescription: '小学一年级是整个学习生涯的起点。这一年孩子要完成从幼儿园到小学的过渡：学习习惯要建立，专注力要培养，基础能力要打牢。一年级的数学重点是10以内加减法和20以内进位加法（凑十法、破十法），语文重点是拼音（声母、韵母、整体认读音节）和识字（300个常用字）。练学宝为一年级孩子准备了完整的练习资源：10以内加减法口算、20以内进位加法专项练习、拼音四线三格练习纸、识字卡片、字帖练习等。所有练习卷均支持PDF下载打印，完全免费。',
    subjects: [
      {
        name: '数学',
        icon: '🧮',
        items: ['10以内加减法', '20以内进位加法', '凑十法专项', '破十法专项', '看图列式', '比大小', '认识钟表', '认识图形'],
      },
      {
        name: '语文',
        icon: '📖',
        items: ['声母练习', '韵母练习', '整体认读音节', '看图说话', '识字300字', '笔画笔顺', '田字格练字', '简单造句'],
      },
      {
        name: '习惯',
        icon: '⭐',
        items: ['专注力训练', '握笔姿势', '坐姿训练', '听写练习', '复习习惯'],
      },
    ],
    recommendTools: [
      { name: '口算速练', href: '/tools/mental-math', icon: '⚡', desc: '10以内加减法计时练习' },
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮', desc: '20以内加减法专项卷' },
      { name: '拼音注音', href: '/tools/pinyin', icon: '📝', desc: '声母韵母四线三格' },
      { name: '识字卡片', href: '/tools/flashcards', icon: '🃏', desc: '一年级300字卡片' },
      { name: '字帖生成器', href: '/tools/calligraphy', icon: '✍️', desc: '田字格练字纸' },
      { name: '数独游戏', href: '/tools/sudoku', icon: '🧩', desc: '4x4入门数独' },
    ],
    knowledgePoints: [
      '10以内加减法',
      '20以内进位加法（凑十法）',
      '20以内退位减法（破十法）',
      '认识数字0-100',
      '比大小与排序',
      '认识图形（正方形、三角形、圆）',
      '认识钟表（整点、半点）',
      '位置与方向（上下前后）',
    ],
    blogCategories: ['语文学习', '学习方法'],
  },
  {
    grade: 2,
    name: '二年级',
    nameEn: '二年级',
    ageRange: '7-8岁',
    semester: '上学期 / 下学期',
    metaTitle: '二年级学习专区 - 小学2年级数学语文练习题 | 练学宝',
    metaDescription: '专为小学二年级学生设计的免费学习资源。包含二年级乘法口诀、100以内加减法、乘法启蒙、看图写话、阅读理解入门、字帖练习等核心知识点。',
    metaKeywords: ['二年级数学题', '乘法口诀', '100以内加减法', '二年级乘法', '看图写话', '二年级阅读', '二年级口算'],
    description: '二年级是关键转折期：乘法口诀、100以内加减法、初步写作能力培养。',
    longDescription: '小学二年级是数学思维的重要转折点：孩子从"加减法"过渡到"乘法"，九九乘法表是这一年的核心任务。语文上开始"看图写话"和简单的阅读理解，要求孩子把所见所想用完整句子表达出来。练学宝为二年级孩子准备了：乘法口诀专项练习、100以内加减法口算卷、看图写话模板、字帖练习、阅读理解入门等资源。',
    subjects: [
      {
        name: '数学',
        icon: '🧮',
        items: ['乘法口诀', '100以内加减法', '表内除法', '认识时间', '认识长度', '认识人民币', '简单统计', '找规律'],
      },
      {
        name: '语文',
        icon: '📖',
        items: ['看图写话', '阅读理解入门', '古诗背诵', '字词积累', '日记启蒙', '近反义词', '多音字', '成语故事'],
      },
      {
        name: '英语',
        icon: '🔤',
        items: ['26个字母', '基础单词100个', '日常对话', '字母书写'],
      },
    ],
    recommendTools: [
      { name: '口算速练', href: '/tools/mental-math', icon: '⚡', desc: '乘法口诀计时' },
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮', desc: '表内乘除法卷' },
      { name: '字帖生成器', href: '/tools/calligraphy', icon: '✍️', desc: '看图写话练字' },
      { name: '英语字帖', href: '/tools/english-calligraphy', icon: '🔤', desc: '字母书写练习' },
      { name: '作文模板', href: '/tools/writing-template', icon: '📄', desc: '看图写话模板' },
      { name: '数独游戏', href: '/tools/sudoku', icon: '🧩', desc: '6x6进阶数独' },
    ],
    knowledgePoints: [
      '九九乘法表',
      '表内除法',
      '100以内加减法',
      '认识时间（时、分）',
      '认识长度单位（厘米、米）',
      '认识人民币（元、角、分）',
      '简单的数据收集',
      '轴对称图形',
    ],
    blogCategories: ['数学学习', '语文学习'],
  },
  {
    grade: 3,
    name: '三年级',
    nameEn: '三年级',
    ageRange: '8-9岁',
    semester: '上学期 / 下学期',
    metaTitle: '三年级学习专区 - 小学3年级数学语文英语练习 | 练学宝',
    metaDescription: '专为小学三年级学生设计的免费学习资源。包含三年级数学万以内加减法、多位数乘除法、英语单词、英语字帖、阅读理解、作文入门等核心练习。',
    metaKeywords: ['三年级数学题', '万以内加减法', '三年级英语', '三年级作文', '多位数乘法', '三年级阅读理解', '三年级口算'],
    description: '三年级开始有英语课，数学从具体思维向抽象思维过渡，作文从写话到成文。',
    longDescription: '小学三年级是"分水岭"：数学难度陡增（万以内加减法、多位数乘除法、分数初步），语文开始要求300字以上的作文，英语正式成为主科。这一年孩子的学习压力会明显增加，练习量要跟上。练学宝为三年级孩子准备了：万以内加减法口算、多位数乘除法练习、英语单词字帖、阅读理解专项、作文模板等。',
    subjects: [
      {
        name: '数学',
        icon: '🧮',
        items: ['万以内加减法', '多位数乘除法', '分数初步', '周长面积', '年月日', '时分秒', '可能性', '搭配问题'],
      },
      {
        name: '语文',
        icon: '📖',
        items: ['作文入门（300字）', '阅读理解专项', '古诗默写', '说明文阅读', '多音字辨析', '成语积累', '文言文启蒙', '标点符号'],
      },
      {
        name: '英语',
        icon: '🔤',
        items: ['核心单词500个', '日常对话', '英语阅读入门', '英语书写', '听力训练', '英语儿歌'],
      },
    ],
    recommendTools: [
      { name: '口算速练', href: '/tools/mental-math', icon: '⚡', desc: '万以内加减法' },
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮', desc: '多位数乘除法' },
      { name: '单元测试卷', href: '/tools/unit-test', icon: '📋', desc: '全科单元测试' },
      { name: '英语字帖', href: '/tools/english-calligraphy', icon: '🔤', desc: '英语单词书写' },
      { name: '作文模板', href: '/tools/writing-template', icon: '📄', desc: '作文框架' },
      { name: '古诗词默写', href: '/tools/poem-memo', icon: '📜', desc: '必背古诗' },
    ],
    knowledgePoints: [
      '万以内加减法',
      '多位数乘一位数',
      '多位数除以一位数',
      '分数的初步认识',
      '长方形正方形周长',
      '年、月、日',
      '24小时计时法',
      '可能性（事件）',
    ],
    blogCategories: ['数学学习', '语文学习', '英语学习'],
  },
  {
    grade: 4,
    name: '四年级',
    nameEn: '四年级',
    ageRange: '9-10岁',
    semester: '上学期 / 下学期',
    metaTitle: '四年级学习专区 - 小学4年级数学语文英语练习 | 练学宝',
    metaDescription: '专为小学四年级学生设计的免费学习资源。包含四年级大数的认识、三位数乘除法、平行四边形、面积公式、英语句型、作文进阶等核心知识点。',
    metaKeywords: ['四年级数学题', '大数的认识', '三位数乘除法', '四年级英语', '面积公式', '四年级作文', '四年级应用题'],
    description: '四年级开始接触大数、面积、平行四边形等抽象几何，应用题难度明显加大。',
    longDescription: '小学四年级数学进入"抽象思维"阶段：大数的认识、三位数乘除法、平行四边形和梯形的面积计算。同时应用题从两步变成三步，对阅读理解能力提出更高要求。语文上，作文从300字到500字过渡，开始要求结构清晰、详略得当。英语要求掌握1000+单词和基本句型。练学宝为四年级孩子准备了完整的学习方案。',
    subjects: [
      {
        name: '数学',
        icon: '🧮',
        items: ['大数的认识', '三位数乘除法', '平行四边形', '梯形面积', '三角形特性', '小数加减法', '角的度量', '复式条形统计图'],
      },
      {
        name: '语文',
        icon: '📖',
        items: ['作文进阶（500字）', '阅读理解深入', '古诗默写', '说明文阅读', '文言文入门', '缩写扩写', '修改病句', '排序题'],
      },
      {
        name: '英语',
        icon: '🔤',
        items: ['核心单词1000个', '一般现在时', '一般过去时', '现在进行时', '英语阅读', '英语小作文', '听力训练'],
      },
    ],
    recommendTools: [
      { name: '口算速练', href: '/tools/mental-math', icon: '⚡', desc: '三位数乘除法' },
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮', desc: '大数与面积' },
      { name: '单元测试卷', href: '/tools/unit-test', icon: '📋', desc: '期中期末测试' },
      { name: '英语字帖', href: '/tools/english-calligraphy', icon: '🔤', desc: '英语句型' },
      { name: '作文模板', href: '/tools/writing-template', icon: '📄', desc: '作文框架' },
      { name: '数独游戏', href: '/tools/sudoku', icon: '🧩', desc: '9x9标准数独' },
    ],
    knowledgePoints: [
      '亿以内数的认识',
      '三位数乘两位数',
      '除数是两位数的除法',
      '平行四边形和梯形',
      '三角形内角和',
      '小数加减法',
      '角的度量（量角器）',
      '复式条形统计图',
    ],
    blogCategories: ['数学学习', '语文学习', '英语学习'],
  },
  {
    grade: 5,
    name: '五年级',
    nameEn: '五年级',
    ageRange: '10-11岁',
    semester: '上学期 / 下学期',
    metaTitle: '五年级学习专区 - 小学5年级数学语文英语练习 | 练学宝',
    metaDescription: '专为小学五年级学生设计的免费学习资源。包含五年级小数乘除法、方程、组合图形面积、英语时态、阅读理解、作文500字以上等核心练习。',
    metaKeywords: ['五年级数学题', '小数乘除法', '简易方程', '组合图形面积', '五年级英语', '五年级作文', '五年级应用题'],
    description: '五年级数学进入"代数"起步：小数乘除法、方程、组合图形面积；语文作文要求500字以上。',
    longDescription: '小学五年级是"小升初"准备的开始：数学进入代数领域（方程、因数倍数、组合图形面积），难度陡增；语文作文要求500字以上，对结构和思想性提出要求；英语要求掌握1500+单词和多种时态。练学宝为五年级孩子准备了完整的学习资源。',
    subjects: [
      {
        name: '数学',
        icon: '🧮',
        items: ['小数乘除法', '简易方程', '因数与倍数', '组合图形面积', '质数合数', '异分母分数加减', '可能性', '位置'],
      },
      {
        name: '语文',
        icon: '📖',
        items: ['作文500字+', '文言文阅读', '名著阅读', '说明方法', '古诗鉴赏', '缩写故事', '辩论稿', '应用文'],
      },
      {
        name: '英语',
        icon: '🔤',
        items: ['核心单词1500个', '五种基本时态', '阅读理解', '英语小作文', '听力训练', '口语对话'],
      },
    ],
    recommendTools: [
      { name: '口算速练', href: '/tools/mental-math', icon: '⚡', desc: '小数乘除法' },
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮', desc: '方程与面积' },
      { name: '单元测试卷', href: '/tools/unit-test', icon: '📋', desc: '小升初模拟' },
      { name: '英语字帖', href: '/tools/english-calligraphy', icon: '🔤', desc: '英语时态' },
      { name: '作文模板', href: '/tools/writing-template', icon: '📄', desc: '500字作文' },
      { name: '古诗词默写', href: '/tools/poem-memo', icon: '📜', desc: '必背古诗80首' },
    ],
    knowledgePoints: [
      '小数乘除法',
      '解简易方程',
      '因数与倍数',
      '质数与合数',
      '组合图形面积',
      '异分母分数加减法',
      '可能性（概率）',
      '位置（数对）',
    ],
    blogCategories: ['数学学习', '语文学习', '英语学习', '升学指导'],
  },
  {
    grade: 6,
    name: '六年级',
    nameEn: '六年级',
    ageRange: '11-12岁',
    semester: '上学期 / 下学期',
    metaTitle: '六年级学习专区 - 小学6年级数学语文英语总复习 | 练学宝',
    metaDescription: '专为小学六年级学生设计的免费学习资源。包含六年级小升初数学总复习、百分数应用题、圆与圆柱、比例、英语语法、毕业作文等核心练习。',
    metaKeywords: ['六年级数学题', '小升初数学', '百分数应用题', '圆与圆柱', '比例', '六年级英语', '六年级作文', '小升初复习'],
    description: '六年级是小学总复习阶段：百分数、圆、比例、立体几何；语文要求600字以上；英语要求1800+单词。',
    longDescription: '小学六年级是整个小学阶段的总结：数学涵盖百分数、圆和圆柱、比例、立体几何等综合知识；语文要求600字以上的优秀作文，包括命题作文、半命题作文、话题作文等；英语要求掌握1800+单词和小升初语法体系。练学宝为六年级孩子准备了小升初总复习专项资源。',
    subjects: [
      {
        name: '数学',
        icon: '🧮',
        items: ['百分数应用题', '圆与圆柱', '比例', '正反比例', '立体几何', '扇形统计图', '数学广角', '小升初总复习'],
      },
      {
        name: '语文',
        icon: '📖',
        items: ['作文600字+', '小升初作文', '文言文阅读', '名著阅读', '古诗鉴赏', '应用文', '辩论稿', '综合复习'],
      },
      {
        name: '英语',
        icon: '🔤',
        items: ['核心单词1800个', '八大时态', '阅读理解', '英语作文50词', '听力训练', '小升初模拟'],
      },
    ],
    recommendTools: [
      { name: '口算速练', href: '/tools/mental-math', icon: '⚡', desc: '百分数口算' },
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮', desc: '小升初总复习' },
      { name: '单元测试卷', href: '/tools/unit-test', icon: '📋', desc: '小升初模拟卷' },
      { name: '英语字帖', href: '/tools/english-calligraphy', icon: '🔤', desc: '英语作文' },
      { name: '作文模板', href: '/tools/writing-template', icon: '📄', desc: '600字作文' },
      { name: '古诗词默写', href: '/tools/poem-memo', icon: '📜', desc: '小升初必背' },
    ],
    knowledgePoints: [
      '百分数应用题',
      '圆的周长和面积',
      '圆柱和圆锥',
      '比例的意义和性质',
      '正比例和反比例',
      '扇形统计图',
      '数学广角（鸡兔同笼）',
      '总复习（数与代数）',
    ],
    blogCategories: ['数学学习', '语文学习', '英语学习', '升学指导'],
  },
];

export function getGradeConfig(grade: number): GradeConfig | undefined {
  return GRADES.find((g) => g.grade === grade);
}
