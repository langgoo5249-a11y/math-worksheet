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
  /** 专属 SEO 标题（含长尾搜索词），缺失时回退到 `${title} - 家长指导 | 练学宝` */
  metaTitle?: string;
  /** 专属 SEO 描述，缺失时回退到 description */
  metaDescription?: string;
  /** 专属 SEO 关键词，缺失时回退到自动拼接 */
  metaKeywords?: string[];
}

export const PARENT_GUIDE_TOPICS: ParentGuideTopic[] = [
  {
    id: 'kindergarten-transition',
    title: '幼小衔接完全指南',
    description: '从幼儿园到小学的过渡准备完全指南：心理建设、学习习惯培养、能力储备（握笔坐姿专注力）、知识衔接（10以内加减法与拼音字母），含心理过渡、能力训练、知识衔接、作息调整四大模块，让孩子在9月1日从容入学，配练学宝口算与拼音工具，适合5-7岁大班幼小衔接，家长必备。',
    metaTitle: '幼小衔接准备清单 - 拼音数学专注力训练完全指南 | 练学宝',
    metaDescription: '幼小衔接准备清单大全：拼音启蒙、数学10以内加减法、专注力训练、握笔坐姿矫正四大准备方向，含心理过渡、能力训练、知识衔接、作息调整实操方法。适合5-7岁大班幼升小家长，附入学准备清单与常见误区纠正，让孩子9月1日从容入学。',
    metaKeywords: ['幼小衔接', '幼小衔接准备清单', '幼升小', '幼小衔接拼音', '幼小衔接数学', '专注力训练', '入学准备', '大班幼小衔接', '5-7岁'],
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
    description: '12个经过验证的小学学习习惯培养方法，从专注力训练、固定学习时间、番茄钟学习法到错题本建立与复习三步法，每个方法含具体步骤与执行建议，按低中高年级分层，让家长少操心，适合1-6年级全程使用，配练学宝口算速练与单元测试卷工具巩固。',
    metaTitle: '小学生学习习惯培养 - 12个方法+专注力训练全攻略 | 练学宝',
    metaDescription: '小学生学习习惯培养12个方法：专注力训练、固定学习时间、番茄钟学习法、复习三步法、错题本建立等，每个方法含具体步骤与执行建议，按低中高年级分层。适合1-6年级家长，附习惯养成周期与效果判断标准，让孩子自主学习少操心。',
    metaKeywords: ['小学生学习习惯', '学习习惯培养', '专注力训练', '番茄钟学习法', '错题本怎么整理', '复习方法', '小学学习方法', '自主学习习惯'],
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
    description: '辅导作业是每个家长的"必修课"。教你5个不吼叫的辅导方法：角色定位、启发式提问、分段完成、先签字后检查，含分段时长建议与情绪管理技巧，让辅导作业从"鸡飞狗跳"变成"母慈子孝"，适合1-6年级，配练学宝数学练习卷与单元测试卷工具使用。',
    metaTitle: '辅导作业不吼叫 - 5个方法让家长辅导变轻松 | 练学宝',
    metaDescription: '辅导作业总忍不住发火？5个不吼叫的辅导方法：角色定位（当陪伴者不当监工）、启发式提问、作业分段完成、先签字后检查、情绪管理技巧，含分段时长建议。适合1-6年级家长，让辅导作业从鸡飞狗跳变成母慈子孝。',
    metaKeywords: ['辅导作业', '辅导作业不吼叫', '家长辅导作业', '陪写作业', '作业辅导方法', '小学生作业', '亲子关系', '情绪管理'],
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
    description: '孩子拖拉磨蹭不会规划时间？3个方法（任务清单法、时间可视化、优先级四象限训练）+1个时间银行工具，含沙漏倒计时使用建议与奖励机制，让孩子成为时间的主人，养成按时完成作业的好习惯，适合2-6年级，配练学宝口算速练工具计时训练。',
    metaTitle: '孩子时间管理训练 - 3个方法告别拖拉磨蹭 | 练学宝',
    metaDescription: '孩子写作业拖拉磨蹭、没有时间观念？3个时间管理方法：任务清单法（可视化打勾）、时间可视化（沙漏倒计时）、优先级四象限训练，加1个时间银行激励机制。含分年级时长建议，适合2-6年级，让孩子成为时间的主人。',
    metaKeywords: ['孩子时间管理', '拖拉磨蹭怎么办', '时间管理训练', '任务清单法', '时间可视化', '四象限法', '写作业拖拉', '小学生时间观念'],
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
    description: '从亲子阅读到独立阅读的完整路线图，分3-6岁绘本、6-8岁桥梁书、8-10岁章节书、10-12岁经典名著四个阶段，每个阶段含推荐书单与共读方法，告诉你每个年龄段该怎么做，适合3-12岁全程，配练学宝古诗词默写与作文模板工具延伸。',
    metaTitle: '小学生阅读习惯培养 - 分年级书单与共读方法 | 练学宝',
    metaDescription: '小学生阅读习惯怎么培养？从亲子阅读到独立阅读的完整路线图：3-6岁绘本、6-8岁桥梁书、8-10岁章节书、10-12岁经典名著四阶段，每阶段含推荐书单与共读方法。适合3-12岁，附每日阅读时长建议与不爱看书的对策。',
    metaKeywords: ['阅读习惯培养', '小学生阅读', '分年级书单', '亲子阅读', '桥梁书推荐', '课外阅读', '孩子不爱看书', '阅读路线图'],
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
    description: '五六年级家长必看的小升初择校与备考指南：择校三要素、5-6年级学习规划、面试自我介绍准备、心态调整四大模块，含距离校风特色建议与模拟测试安排，让孩子从容面对小升初，配练学宝单元测试卷与小升初模拟卷工具，适合10-12岁。',
    metaTitle: '小升初备考攻略 - 六年级总复习与择校指南 | 练学宝',
    metaDescription: '小升初怎么准备？五六年级家长必看的择校与备考指南：择校三要素（距离/校风/特色）、5-6年级学习规划、面试自我介绍与常见题型准备、家长心态调整四大模块。含六年级总复习安排与模拟测试建议，让孩子从容面对小升初。',
    metaKeywords: ['小升初', '小升初备考', '小升初择校', '六年级总复习', '小升初面试', '五六年级学习规划', '升学准备', '小升初真题'],
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
