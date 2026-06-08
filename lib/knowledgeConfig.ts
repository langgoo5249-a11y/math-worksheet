// 知识点专题配置
export interface KnowledgePoint {
  id: string;
  slug: string;
  name: string;
  subject: 'math' | 'chinese' | 'english';
  subjectName: string;
  category: string;
  icon: string;
  shortDesc: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  grades: number[];
  learningGoal: string;
  keySteps: string[];
  commonMistakes: string[];
  practiceAdvice: string;
  relatedTools: { name: string; href: string; icon: string; desc: string }[];
}

export const KNOWLEDGE_POINTS: KnowledgePoint[] = [
  // ===== 数学知识点 =====
  {
    id: 'kp-coushi-fa',
    slug: 'coushi-fa',
    name: '凑十法',
    subject: 'math',
    subjectName: '数学',
    category: '20以内进位加法',
    icon: '🧮',
    shortDesc: '把一个数拆成两部分，先凑10再加剩余，是20以内进位加法的核心方法。',
    metaTitle: '凑十法 - 20以内进位加法核心方法详解 | 练学宝',
    metaDescription: '凑十法是20以内进位加法的核心方法。本文详解凑十法的原理、步骤、典型例题和练习建议，配合练学宝数学练习卷，1年级孩子必学。',
    metaKeywords: ['凑十法', '20以内进位加法', '一年级数学', '凑十法练习', '凑十法怎么教', '凑十破十法'],
    description: '凑十法是20以内进位加法（如9+5、8+7）的核心方法。其本质是把第二个加数拆成"1+几"的形式，先凑出10，再加上剩余。',
    difficulty: 'easy',
    grades: [1],
    learningGoal: '理解"凑十"的核心思想，能熟练用凑十法计算20以内进位加法，正确率达90%以上。',
    keySteps: [
      '看大数，拆小数：把第二个加数拆成"1+几"',
      '凑出十：先用大数加1凑出10',
      '加剩余：10再加上拆出来的"几"',
      '写出得数',
    ],
    commonMistakes: [
      '不知道拆哪个数：应该拆较小的、靠近10的数',
      '拆错：例如9+5，应该拆5=1+4，不是5=2+3',
      '凑错：9+1=10，但11+几就凑不出来了',
      '忘了加剩余：凑出10后忘了加剩下的数',
    ],
    practiceAdvice: '每天10-15道凑十法专项题，坚持2-3周。先慢后快，从"想得到"过渡到"不用想"。',
    relatedTools: [
      { name: '口算速练', href: '/tools/mental-math', icon: '⚡', desc: '20以内进位加法计时' },
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮', desc: '凑十法专项卷' },
    ],
  },
  {
    id: 'kp-poshi-fa',
    slug: 'poshi-fa',
    name: '破十法',
    subject: 'math',
    subjectName: '数学',
    category: '20以内退位减法',
    icon: '🧮',
    shortDesc: '把被减数拆成10+几，先用10减，再加剩余，是20以内退位减法的核心方法。',
    metaTitle: '破十法 - 20以内退位减法核心方法详解 | 练学宝',
    metaDescription: '破十法是20以内退位减法（如13-5、12-8）的核心方法。本文详解破十法原理、步骤和练习方法，配练学宝数学练习卷。',
    metaKeywords: ['破十法', '20以内退位减法', '一年级数学', '破十法怎么教', '凑十破十法'],
    description: '破十法是20以内退位减法的核心方法。其本质是把被减数拆成"10+几"，先用10减减数，再加剩余的"几"。',
    difficulty: 'easy',
    grades: [1],
    learningGoal: '理解"破十"的核心思想，能用破十法计算20以内退位减法，正确率达90%以上。',
    keySteps: [
      '拆被减数：把被减数拆成"10+几"',
      '用10减：10减减数',
      '加剩余：结果加上拆出的"几"',
      '写出得数',
    ],
    commonMistakes: [
      '不知道拆哪个数：应该拆被减数（被减的那个）',
      '忘了加剩余：用10减完后，忘了加上拆出的"几"',
      '混淆凑十和破十：凑十是加法，破十是减法',
    ],
    practiceAdvice: '破十法和凑十法配合练习。先学凑十，再学破十，最后混合练习。每天10道题。',
    relatedTools: [
      { name: '口算速练', href: '/tools/mental-math', icon: '⚡', desc: '20以内退位减法' },
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮', desc: '破十法专项' },
    ],
  },
  {
    id: 'kp-cfkb',
    slug: 'chengfa-koujue',
    name: '乘法口诀',
    subject: 'math',
    subjectName: '数学',
    category: '表内乘除法',
    icon: '✖️',
    shortDesc: '九九乘法表是小学数学的基石，必须背熟到能条件反射的程度。',
    metaTitle: '九九乘法口诀表 - 记忆方法+练习卷 | 练学宝',
    metaDescription: '九九乘法口诀是小学二年级数学核心。本文提供科学的口诀记忆方法、记忆规律、易错点分析，配练学宝口算速练工具。',
    metaKeywords: ['九九乘法表', '乘法口诀', '乘法口诀表', '二年级数学', '乘法口诀记忆', '乘法口诀练习'],
    description: '九九乘法表共81句（1×1到9×9）。背熟到能2秒内说出答案是后续所有乘除法学习的基础。',
    difficulty: 'medium',
    grades: [2],
    learningGoal: '九九乘法表倒背如流，看到任意一句能2秒内反应出答案。',
    keySteps: [
      '理解乘法的意义：3×4表示3个4相加',
      '按规律背诵：横背、竖背、倒背',
      '找规律记忆：比如五的口诀末位都是0或5',
      '配合口算练习巩固',
    ],
    commonMistakes: [
      '四八三十六，常和三八二十四搞混',
      '六八四十八，常和六九五十四搞混',
      '七九六十三，常和八九七十二搞混',
      '乘法和加法混淆：3×4=12，但3+4=7',
    ],
    practiceAdvice: '建议用"一周攻克一行"的方式：每天背一行新口诀，复习前面所有。每天15分钟，1个月能背完。',
    relatedTools: [
      { name: '口算速练', href: '/tools/mental-math', icon: '⚡', desc: '乘法口诀计时' },
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮', desc: '表内乘除法卷' },
    ],
  },
  {
    id: 'kp-baifenshu',
    slug: 'baifenshu',
    name: '百分数应用题',
    subject: 'math',
    subjectName: '数学',
    category: '小升初重点',
    icon: '💯',
    shortDesc: '求一个数比另一个数多/少百分之几，是小升初必考题型。',
    metaTitle: '百分数应用题 - 小升初必考题型详解 | 练学宝',
    metaDescription: '百分数应用题是六年级小升初必考题型。本文详解"求一个数比另一个数多/少百分之几"、"已知一个数的百分之几是多少求这个数"等典型题型。',
    metaKeywords: ['百分数应用题', '百分数', '小升初数学', '六年级数学', '百分数怎么算', '求百分数'],
    description: '百分数应用题主要包括三类：求一个数是另一个数的百分之几、求一个数比另一个数多/少百分之几、已知一个数的百分之几是多少求这个数。',
    difficulty: 'hard',
    grades: [6],
    learningGoal: '能识别百分数应用题的类型，套用正确公式，准确计算。',
    keySteps: [
      '找单位"1"：通常在"比""是"字后面',
      '判断类型：求百分数 / 求具体量',
      '套公式：求百分数=比较量÷单位"1"',
      '列出算式并计算',
    ],
    commonMistakes: [
      '搞反：把"多"和"少"对应的运算搞反',
      '单位"1"找错：单位"1"不同，算法不同',
      '百分号忘记乘：结果要乘100%',
    ],
    practiceAdvice: '先按类型分专题练习，每类10-20道。熟练后再做综合应用题。每天30分钟。',
    relatedTools: [
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮', desc: '百分数专项' },
      { name: '单元测试卷', href: '/tools/unit-test', icon: '📋', desc: '百分数单元测' },
    ],
  },
  {
    id: 'kp-yuan',
    slug: 'yuan-zhouchang-mianji',
    name: '圆的周长和面积',
    subject: 'math',
    subjectName: '数学',
    category: '小升初重点',
    icon: '⭕',
    shortDesc: '圆的周长C=2πr，面积S=πr²，是六年级几何核心。',
    metaTitle: '圆的周长和面积公式 - 小学六年级几何 | 练学宝',
    metaDescription: '圆的周长C=2πr，面积S=πr²。本文详解公式推导、典型例题、易错点分析，配练学宝数学练习卷。',
    metaKeywords: ['圆的周长', '圆的面积', 'π', '圆周率', '六年级数学', '小升初几何'],
    description: '圆的周长C=2πr，面积S=πr²（r为半径）。注意直径d=2r，公式也可以写成C=πd，S=π(d/2)²。',
    difficulty: 'medium',
    grades: [6],
    learningGoal: '熟记公式，能区分周长和面积问题，准确计算。',
    keySteps: [
      '判断求的是周长还是面积',
      '确定半径r（注意题目给的是半径还是直径）',
      '套公式计算',
      '根据实际情况取近似值',
    ],
    commonMistakes: [
      '把直径当半径用：d=10，r=5，r才是半径',
      '公式混淆：C=2πr和S=πr²',
      '单位忘换算：周长是长度单位，面积是平方单位',
    ],
    practiceAdvice: '公式要背熟，关键是分清周长和面积。配练学宝口算速练，每天5分钟巩固。',
    relatedTools: [
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮', desc: '圆的专项' },
    ],
  },

  // ===== 语文知识点 =====
  {
    id: 'kp-shengmu-yunmu',
    slug: 'shengmu-yunmu',
    name: '声母和韵母',
    subject: 'chinese',
    subjectName: '语文',
    category: '拼音基础',
    icon: '🅰️',
    shortDesc: '23个声母+24个韵母+16个整体认读音节，是一年级语文的核心。',
    metaTitle: '声母韵母表 - 一年级拼音学习 | 练学宝',
    metaDescription: '23个声母、24个韵母、16个整体认读音节，是一年级语文拼音的核心。本文提供完整的拼音表、记忆方法和练习工具。',
    metaKeywords: ['声母表', '韵母表', '整体认读音节', '一年级拼音', '拼音学习', '汉语拼音'],
    description: '汉语拼音有23个声母（b p m f d t n l g k h j q x zh ch sh r z c s y w）、24个韵母、16个整体认读音节。',
    difficulty: 'easy',
    grades: [1],
    learningGoal: '熟背23个声母、24个韵母、16个整体认读音节，能准确拼读。',
    keySteps: [
      '先学声母表：b p m f d t n l',
      '再学单韵母：a o e i u ü',
      '接着学复韵母：ai ei ui ao ou iu',
      '最后学整体认读音节：不教拼读，直接认',
    ],
    commonMistakes: [
      'b和d分不清：可以记"听广播(b)听得到"',
      'p和q分不清：可以记"气球(q)上天"',
      'n和l分不清：可以记"奶奶(n)带l了"',
      '平翘舌音混淆：z c s 和 zh ch sh',
    ],
    practiceAdvice: '建议配合练学宝拼音注音工具，每天15分钟拼读练习，2-3周能基本掌握。',
    relatedTools: [
      { name: '拼音注音', href: '/tools/pinyin', icon: '📝', desc: '拼音四线三格' },
      { name: '字帖生成器', href: '/tools/calligraphy', icon: '✍️', desc: '拼音练字纸' },
    ],
  },
  {
    id: 'kp-kantuxiehua',
    slug: 'kantuxiehua',
    name: '看图写话',
    subject: 'chinese',
    subjectName: '语文',
    category: '作文入门',
    icon: '🖼️',
    shortDesc: '看图写话是低年级作文入门，要求把图中内容用完整句子表达出来。',
    metaTitle: '看图写话 - 二年级作文入门方法 | 练学宝',
    metaDescription: '看图写话是二年级作文入门的核心训练。本文提供"四步法"（看、想、写、查），配合练学宝作文模板工具。',
    metaKeywords: ['看图写话', '二年级作文', '作文入门', '看图写话技巧', '看图写话范文', '小学作文'],
    description: '看图写话是低年级（1-2年级）作文入门训练，要求孩子观察图片内容，用完整的句子（包括时间、地点、人物、事件）表达出来。',
    difficulty: 'easy',
    grades: [2],
    learningGoal: '能根据图片写出3-5个完整句子，包含时间地点人物事件。',
    keySteps: [
      '看：仔细观察图片（人物+背景+动作）',
      '想：思考发生了什么事，结果是什么',
      '写：按"什么时候+谁+在哪里+做什么+结果怎样"写',
      '查：检查句子是否通顺，有没有错别字',
    ],
    commonMistakes: [
      '流水账：只写"做了什么"，不写"为什么"',
      '不会用形容词：可以加"高兴地""认真地"',
      '对话不会写：人物对话要用"XX说"引出',
      '不会分段：一年级可以不分段，二年级建议分段',
    ],
    practiceAdvice: '建议每周2-3篇，配合练学宝作文模板工具中的"看图写话"模板。',
    relatedTools: [
      { name: '作文模板', href: '/tools/writing-template', icon: '📄', desc: '看图写话模板' },
      { name: '字帖生成器', href: '/tools/calligraphy', icon: '✍️', desc: '好词好句练字' },
    ],
  },
  {
    id: 'kp-yuedu-lijie',
    slug: 'yuedu-lijie',
    name: '阅读理解',
    subject: 'chinese',
    subjectName: '语文',
    category: '语文核心',
    icon: '📚',
    shortDesc: '阅读理解是语文考试的最大得分模块，需要掌握5W1H拆解法。',
    metaTitle: '阅读理解答题技巧 - 小学语文核心 | 练学宝',
    metaDescription: '阅读理解是小学语文考试的核心模块。本文提供5W1H拆解法（谁、什么、什么时候、在哪里、为什么、怎么样），帮助孩子系统提升阅读理解能力。',
    metaKeywords: ['阅读理解', '阅读理解技巧', '小学语文阅读', '5W1H阅读法', '阅读理解答题', '如何提高阅读'],
    description: '阅读理解是语文考试的核心模块，分值通常占30-40%。需要孩子具备信息提取、信息整合、推断三种能力。',
    difficulty: 'medium',
    grades: [3, 4, 5, 6],
    learningGoal: '能稳定拿到阅读理解基础分（80%以上），逐步提升到90%+。',
    keySteps: [
      '5W1H拆解：读完文章用6个问题过一遍',
      '找中心句：通常在段首或段尾',
      '找关键词：标注人物、动作、原因',
      '规范答题：分点作答，引用原文',
    ],
    commonMistakes: [
      '答非所问：没看清问题问什么',
      '摘抄过多：不会"压缩"答案',
      '分析不深入：只答表层，不答深层',
      '不引用原文：答案没有依据',
    ],
    practiceAdvice: '建议每天15-20分钟拆解训练。先练"找主角"和"压缩信息"，再练因果分析。配合练学宝识字卡片积累词汇。',
    relatedTools: [
      { name: '识字卡片', href: '/tools/flashcards', icon: '🃏', desc: '积累核心词汇' },
      { name: '字帖生成器', href: '/tools/calligraphy', icon: '✍️', desc: '记录好词好句' },
    ],
  },

  // ===== 英语知识点 =====
  {
    id: 'kp-yingyu-zimu',
    slug: 'yingyu-zimu',
    name: '26个英语字母',
    subject: 'english',
    subjectName: '英语',
    category: '英语基础',
    icon: '🔤',
    shortDesc: '26个字母是英语学习的第一步，包括大小写、笔顺、发音。',
    metaTitle: '26个英语字母 - 书写+发音+练习 | 练学宝',
    metaDescription: '26个英语字母是英语学习的第一步。本文详解字母大小写、笔顺、发音、常见错误，配练学宝英语字帖。',
    metaKeywords: ['26个英语字母', '英语字母表', '英语字母书写', '英语字母发音', '英语字帖', '一年级英语'],
    description: '英语26个字母是英语学习的基石。需要掌握：大小写、笔顺顺序、字母发音（特别是元音字母）。',
    difficulty: 'easy',
    grades: [2, 3],
    learningGoal: '能正确书写26个字母大小写，准确读出字母名（letter name）。',
    keySteps: [
      '先学大写：26个大写字母',
      '再学小写：26个小写字母',
      '注意笔顺：比如大写E先写竖',
      '配合发音：元音字母发音特殊',
    ],
    commonMistakes: [
      '笔顺不对：印刷体和手写体不一样',
      '小写l和大写I混淆',
      '小写f和t的横笔位置错误',
      '元音字母发音错误：a/e/i/o/u',
    ],
    practiceAdvice: '建议配合练学宝英语字帖工具，每天练习3-5个字母的书写+发音。2周能掌握。',
    relatedTools: [
      { name: '英语字帖', href: '/tools/english-calligraphy', icon: '🔤', desc: '字母四线三格' },
    ],
  },
  {
    id: 'kp-yingyu-danci',
    slug: 'yingyu-danci-jiyi',
    name: '英语单词记忆法',
    subject: 'english',
    subjectName: '英语',
    category: '英语核心',
    icon: '📝',
    shortDesc: '用艾宾浩斯间隔重复法记单词，比死记硬背效率高5倍。',
    metaTitle: '英语单词记忆方法 - 间隔重复法详解 | 练学宝',
    metaDescription: '英语单词记不住？本文详解基于艾宾浩斯遗忘曲线的间隔重复记忆法，配合练学宝英语字帖工具，半年词汇量翻6倍。',
    metaKeywords: ['英语单词记忆', '间隔重复', '艾宾浩斯遗忘曲线', '背单词方法', '小学英语', '英语词汇量'],
    description: '死记硬背单词效率极低（1个月后只记得21%）。用艾宾浩斯间隔重复法，1-3-5-7-15-30天复习，长期留存率可达90%以上。',
    difficulty: 'medium',
    grades: [3, 4, 5, 6],
    learningGoal: '掌握科学单词记忆法，每周背30个新单词，半年新增1000+词汇。',
    keySteps: [
      '每天10个新词：符合工作记忆容量',
      'Day 1/2/4/7/15/30复习：间隔重复',
      '主动回忆测试：白纸默写，不用认读',
      '漏斗复习：只复习未掌握的',
    ],
    commonMistakes: [
      '一次背太多：超过工作记忆容量效率骤降',
      '不复习：1天后只记得34%',
      '只认读不默写：熟悉感错觉',
      '不在句子中使用：单词是死的',
    ],
    practiceAdvice: '配合练学宝英语字帖做书写强化，每天15-20分钟，坚持3个月见效。',
    relatedTools: [
      { name: '英语字帖', href: '/tools/english-calligraphy', icon: '🔤', desc: '单词书写' },
      { name: '口算速练', href: '/tools/mental-math', icon: '⚡', desc: '快速测试' },
    ],
  },
];

export function getKnowledgePoint(slug: string): KnowledgePoint | undefined {
  return KNOWLEDGE_POINTS.find((k) => k.slug === slug);
}

export function getKnowledgeBySubject(subject: string): KnowledgePoint[] {
  return KNOWLEDGE_POINTS.filter((k) => k.subject === subject);
}
