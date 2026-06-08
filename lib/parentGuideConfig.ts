// 家长指导中心 - 各专题配置
export interface ParentGuideTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  keyPoints: string[];
  practicalTips: { title: string; content: string }[];
  ageRange: string;
  relatedTools: { name: string; href: string; icon: string }[];
  relatedGrade?: number;
}

export const PARENT_GUIDE_TOPICS: ParentGuideTopic[] = [
  {
    id: 'kindergarten-transition',
    title: '幼小衔接完全指南',
    description: '从幼儿园到小学的过渡准备：心理建设、学习习惯、能力储备，让孩子在9月1日从容入学。',
    icon: '🎒',
    color: 'blue',
    ageRange: '5-7岁',
    keyPoints: [
      '心理准备：提前6个月让孩子熟悉小学生活',
      '能力储备：握笔、坐姿、专注力',
      '知识储备：10以内加减法、拼音字母',
      '习惯培养：自己整理书包、按时作息',
    ],
    practicalTips: [
      {
        title: '心理过渡',
        content: '带孩子参观目标小学1-2次，购买小学相关绘本（如《我上小学了》），让孩子对小学产生向往。',
      },
      {
        title: '能力训练',
        content: '每天20分钟专注力训练（拼图、画画），培养坐得住的能力。练习正确握笔和坐姿。',
      },
      {
        title: '知识衔接',
        content: '暑假提前学10以内加减法、声母韵母、四线三格书写，不要求全会，但要有印象。',
      },
      {
        title: '作息调整',
        content: '开学前1个月调整作息：晚上9点前睡觉，早晨7点起床，保证10小时睡眠。',
      },
    ],
    relatedTools: [
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮' },
      { name: '拼音注音', href: '/tools/pinyin', icon: '📝' },
      { name: '字帖生成器', href: '/tools/calligraphy', icon: '✍️' },
      { name: '数独游戏', href: '/tools/sudoku', icon: '🧩' },
    ],
    relatedGrade: 1,
  },
  {
    id: 'study-habits',
    title: '学习习惯培养12招',
    description: '12个经过验证的学习习惯培养方法，从专注力到复习习惯，让家长少操心。',
    icon: '⭐',
    color: 'emerald',
    ageRange: '6-12岁',
    keyPoints: [
      '专注力训练：番茄钟法（25分钟专注+5分钟休息）',
      '固定学习时间：每天同一时间、同一地点',
      '先复习后作业：避免边翻书边做题',
      '错题本：建立自己的错题集',
    ],
    practicalTips: [
      {
        title: '固定学习角',
        content: '在家里设置一个"学习角"：一张书桌、一盏台灯、必要的文具。让孩子每次都在同一地点学习，形成条件反射。',
      },
      {
        title: '番茄钟学习法',
        content: '低年级：15-20分钟学习+5分钟休息；中年级：25分钟+5分钟；高年级：30分钟+5分钟。完成4个番茄钟后休息15-20分钟。',
      },
      {
        title: '复习三步法',
        content: '每天放学后：①先复习当天内容（10分钟）②再写作业（高效）③最后预习明天内容（10分钟）。',
      },
      {
        title: '错题本使用',
        content: '准备一本错题本，把作业和考试中的错题抄下来，旁边写正确答案和错误原因。每周末复习一次错题本。',
      },
    ],
    relatedTools: [
      { name: '口算速练', href: '/tools/mental-math', icon: '⚡' },
      { name: '单元测试卷', href: '/tools/unit-test', icon: '📋' },
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮' },
    ],
  },
  {
    id: 'homework-coaching',
    title: '辅导作业不吼叫',
    description: '辅导作业是每个家长的"必修课"。教你5个方法，让辅导作业从"鸡飞狗跳"变成"母慈子孝"。',
    icon: '🤝',
    color: 'orange',
    ageRange: '6-12岁',
    keyPoints: [
      '先问孩子"今天的作业是什么"',
      '不要直接告诉答案，要引导',
      '作业分段，中间休息',
      '不要在孩子面前批评老师',
    ],
    practicalTips: [
      {
        title: '角色定位',
        content: '你是"陪伴者"和"引导者"，不是"监工"。作业是孩子的事，家长只负责提供环境和资源。',
      },
      {
        title: '启发式提问',
        content: '孩子遇到难题时，不要直接给答案，而是问："题目说了什么？""你学过类似的吗？""能不能画图试试？"',
      },
      {
        title: '分段完成',
        content: '不要要求孩子"一口气写完"。低年级每30分钟休息一次，高年级45分钟休息一次。',
      },
      {
        title: '先签字后检查',
        content: '作业是孩子对自己负责，不要替孩子检查。让孩子自己检查后再签字，培养责任心。',
      },
    ],
    relatedTools: [
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮' },
      { name: '单元测试卷', href: '/tools/unit-test', icon: '📋' },
    ],
  },
  {
    id: 'time-management',
    title: '时间管理从小抓起',
    description: '孩子拖拉、磨蹭、不会规划时间？3个方法+1个工具，让孩子成为时间的主人。',
    icon: '⏰',
    color: 'rose',
    ageRange: '7-12岁',
    keyPoints: [
      '任务可视化：列清单、打勾完成',
      '时间具象化：用沙漏/倒计时器',
      '优先级训练：先做重要的事',
      '奖惩机制：按时完成有奖励',
    ],
    practicalTips: [
      {
        title: '任务清单法',
        content: '每天放学后，让孩子把今天要做的事写在小白板上：①学校作业 ②阅读 ③练字 ④自由玩耍。每完成一项打勾。',
      },
      {
        title: '时间可视化',
        content: '对于"5分钟""10分钟"没有概念的孩子，使用沙漏或倒计时器。低年级用3分钟/5分钟沙漏，高年级用15分钟/30分钟倒计时器。',
      },
      {
        title: '优先级训练',
        content: '教孩子"四象限法"：重要且紧急（先做）→ 重要不紧急（计划做）→ 紧急不重要（尽快做）→ 都不（不做）。',
      },
      {
        title: '时间银行',
        content: '孩子按时完成作业、节约下来的时间，归孩子"自由支配"。通过正向激励培养时间观念。',
      },
    ],
    relatedTools: [
      { name: '口算速练', href: '/tools/mental-math', icon: '⚡' },
      { name: '数独游戏', href: '/tools/sudoku', icon: '🧩' },
    ],
  },
  {
    id: 'reading-habit',
    title: '阅读习惯培养路线图',
    description: '从亲子阅读到独立阅读，每个阶段有不同的方法。这份路线图告诉你每个年龄段该怎么做。',
    icon: '📚',
    color: 'purple',
    ageRange: '3-12岁',
    keyPoints: [
      '3-6岁：亲子阅读、绘本、睡前故事',
      '6-8岁：桥梁书、注音读物',
      '8-10岁：章节书、科普',
      '10-12岁：经典名著、人物传记',
    ],
    practicalTips: [
      {
        title: '3-6岁亲子阅读',
        content: '每天固定20分钟亲子阅读时间（睡前最佳），选图多字少的绘本，鼓励孩子看图说话、提问。',
      },
      {
        title: '6-8岁桥梁书',
        content: '从绘本过渡到桥梁书（带拼音的短篇），如《不一样的卡梅拉》《神奇校车》。鼓励孩子复述故事。',
      },
      {
        title: '8-10岁章节书',
        content: '选择情节性强的章节书，如《查理和巧克力工厂》《窗边的小豆豆》。每天阅读30分钟，做简单读书笔记。',
      },
      {
        title: '10-12岁经典阅读',
        content: '开始读经典名著，如《西游记》《草房子》《鲁滨逊漂流记》。鼓励写读后感、做人物分析。',
      },
    ],
    relatedTools: [
      { name: '古诗词默写', href: '/tools/poem-memo', icon: '📜' },
      { name: '作文模板', href: '/tools/writing-template', icon: '📄' },
    ],
  },
  {
    id: 'xiaoshengchu-prep',
    title: '小升初择校与备考',
    description: '五六年级家长必看：择校策略、备考规划、心态调整，让孩子从容面对小升初。',
    icon: '🎯',
    color: 'yellow',
    ageRange: '10-12岁',
    keyPoints: [
      '择校要趁早：5年级下学期开始调研',
      '成绩是基础：保持班级前5-10名',
      '特长要突出：奥数、英语、作文、艺术',
      '心理要健康：不要给孩子过大压力',
    ],
    practicalTips: [
      {
        title: '择校三要素',
        content: '①距离（通勤时间不超过45分钟） ②校风（调研往届家长口碑） ③特色（看孩子特长匹配度）。',
      },
      {
        title: '5-6年级学习规划',
        content: '5年级：保持班级前5名，开始接触奥数、英语原版阅读。6年级上：综合复习、查漏补缺。6年级下：模拟考试、面试准备。',
      },
      {
        title: '面试准备',
        content: '面试考察：①自我介绍（1-2分钟） ②时事评论 ③英语口语 ④逻辑思维题 ⑤特长展示。提前2-3个月准备。',
      },
      {
        title: '心态调整',
        content: '家长要保持平常心，不要把焦虑传给孩子。无论择校结果如何，适合孩子的才是最好的。',
      },
    ],
    relatedTools: [
      { name: '单元测试卷', href: '/tools/unit-test', icon: '📋' },
      { name: '数学练习卷', href: '/tools/math-worksheet', icon: '🧮' },
      { name: '英语字帖', href: '/tools/english-calligraphy', icon: '🔤' },
    ],
    relatedGrade: 6,
  },
];

export const TOPIC_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/20' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-300', border: 'border-orange-500/20' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-300', border: 'border-rose-500/20' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-300', border: 'border-purple-500/20' },
  yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-300', border: 'border-yellow-500/20' },
};

export function getTopicById(id: string): ParentGuideTopic | undefined {
  return PARENT_GUIDE_TOPICS.find(t => t.id === id);
}
